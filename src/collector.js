import { DurableObject } from "cloudflare:workers";
import {
  API_URL,
  REVERSE_API_URL,
  EMOTION_API_URL,
  REQUEST_HEADERS,
  COLLECT_INTERVAL_MS,
  DAILY_SAMPLE_LIMIT,
  DAY_SAMPLE_CHUNK_SIZE,
  RETAIN_DAYS,
  API_SAMPLE_WINDOW,
} from "./constants.js";
import {
  getChinaParts,
  getChinaDateKey,
  formatTimeLabel,
  isTradingTime,
  getTradingSession,
  nextRunAt,
  amountToWanYi,
  amountToYi,
  summarizeHeadline,
  buildFlowGroups,
  buildAnchorTimeline,
  buildAlignedPreviousEmotionSeries,
  buildAlignedPreviousNetFlowSeries,
  previousTradingDateFromAvailableDates,
  fetchAnchorEvents,
  toNumber,
} from "./helpers.js";
import {
  isClosingSnapshot,
  buildAggregatePayload,
} from "./aggregate.js";

export class CapitalFlowCollector extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.ctx = ctx;
    this.env = env;
  }

  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/ensure") {
      await this.ensureScheduled();
      return Response.json({ ok: true });
    }

    if (url.pathname === "/collect") {
      const snapshot = await this.collectOnce();
      return Response.json(snapshot);
    }

    if (url.pathname === "/reset") {
      await this.ctx.storage.deleteAll();
      await this.scheduleNext();
      return Response.json({ ok: true, reset: true });
    }

    if (url.pathname === "/day") {
      const requestedDate = url.searchParams.get("date");
      const payload = await this.getDayPayload(requestedDate);
      if (!payload) {
        return Response.json({ error: "No data for selected date" }, { status: 404 });
      }
      return Response.json(payload, {
        headers: {
          "cache-control": "public, max-age=5, stale-while-revalidate=10",
        },
      });
    }

    if (url.pathname === "/aggregate") {
      const payload = await this.getAggregatePayload(
        url.searchParams.get("start") || "",
        url.searchParams.get("end") || "",
        Number(url.searchParams.get("limit") || 10),
      );
      if (!payload) {
        return Response.json({ error: "No closing data in selected range" }, { status: 404 });
      }
      return Response.json(payload, {
        headers: {
          "cache-control": "public, max-age=60, stale-while-revalidate=120",
        },
      });
    }

    if (url.pathname === "/status") {
      const status = await this.getStatus();
      return Response.json(status, {
        headers: {
          "cache-control": "public, max-age=5, stale-while-revalidate=10",
        },
      });
    }

    return new Response("Not found", { status: 404 });
  }

  async alarm() {
    try {
      if (isTradingTime(new Date())) {
        await this.collectOnce();
      }
    } finally {
      await this.scheduleNext();
    }
  }

  async ensureScheduled() {
    const currentAlarm = await this.ctx.storage.getAlarm();
    if (currentAlarm === null || currentAlarm <= Date.now()) {
      await this.scheduleNext();
    }
  }

  async scheduleNext() {
    const nextTime = nextRunAt(new Date());
    await this.ctx.storage.setAlarm(nextTime.getTime());
    await this.ctx.storage.put("meta", {
      nextRunAt: nextTime.toISOString(),
      scheduledAt: new Date().toISOString(),
    });
  }

  async collectOnce() {
    const [conceptRes, reverseRes, emotionRes] = await Promise.all([
      fetch(API_URL, { headers: REQUEST_HEADERS }),
      fetch(REVERSE_API_URL, { headers: REQUEST_HEADERS }).catch(() => null),
      fetch(EMOTION_API_URL, { headers: REQUEST_HEADERS }).catch(() => null),
    ]);

    if (!conceptRes.ok) {
      throw new Error(`Upstream request failed: ${conceptRes.status}`);
    }

    const json = await conceptRes.json();
    const list = json?.data?.plate_data || [];

    let reverseList = [];
    if (reverseRes && reverseRes.ok) {
      const revJson = await reverseRes.json();
      reverseList = revJson?.data?.plate_data || [];
    }

    const merged = new Map();
    for (const item of [...list, ...reverseList]) {
      if (!merged.has(item.secu_code)) {
        merged.set(item.secu_code, item);
      }
    }
    const allPlates = [...merged.values()];
    const groups = buildFlowGroups(allPlates);

    let emotion = null;
    if (emotionRes && emotionRes.ok) {
      const emoJson = await emotionRes.json();
      const emoData = emoJson?.data || {};
      const chg = emoData.shsz_balance_change_px || "";
      const previewChg = emoData.preview_balance_change_px || "";
      emotion = {
        degree: parseFloat(emoData.market_degree) || 0,
        balance: amountToWanYi(emoData.shsz_balance || ""),
        balanceChange: amountToYi(chg),
        previewChange: amountToYi(previewChg),
        previewChangeStr: previewChg,
        previewBalance: amountToWanYi(emoData.preview_balance || ""),
        previewBalanceStr: emoData.preview_balance || "",
        balanceStr: emoData.shsz_balance || "",
        balanceChangeStr: chg,
        upRatio: parseFloat(emoData.up_ratio) || 0,
        performance: parseFloat(emoData.performance) || 0,
        upOpenRatio: parseFloat(emoData.up_open_ratio) || 0,
        profitRatio: parseFloat(emoData.profit_ratio) || 0,
        riseNum: emoData.up_down_dis?.rise_num ?? 0,
        fallNum: emoData.up_down_dis?.fall_num ?? 0,
        upNum: emoData.up_down_dis?.up_num ?? 0,
        downNum: emoData.up_down_dis?.down_num ?? 0,
      };
    }

    const latestSnapshot = {
      updatedAt: new Date().toISOString(),
      headline: summarizeHeadline(list),
      leaders: groups.leaders,
      laggards: groups.laggards,
      concepts: groups.ranking,
      ranking: groups.ranking,
      emotion: emotion || {},
    };

    const dateKey = getChinaDateKey(new Date(latestSnapshot.updatedAt));
    const sample = compactSample(latestSnapshot);
    await appendSampleToDay(this.ctx.storage, dateKey, sample);
    await this.ctx.storage.put("latest", latestSnapshot);
    await this.ctx.storage.put("lastSuccessAt", latestSnapshot.updatedAt);

    return latestSnapshot;
  }

  async getDayPayload(requestedDate) {
    const availableDates = ((await this.ctx.storage.get("availableDates")) || []).sort();
    if (availableDates.length === 0) return null;

    const todayKey = getChinaDateKey(new Date());
    const targetDate =
      requestedDate && availableDates.includes(requestedDate)
        ? requestedDate
        : availableDates.includes(todayKey)
          ? todayKey
          : availableDates.at(-1);

    const compactSamples = await readSampledDaySamples(this.ctx.storage, targetDate, API_SAMPLE_WINDOW);
    if (compactSamples.length === 0) return null;

    const samples = compactSamples.map(expandSample);
    const previousDate = previousTradingDateFromAvailableDates(availableDates, targetDate);
    const previousSamples = previousDate
      ? (await readSampledDaySamples(this.ctx.storage, previousDate, API_SAMPLE_WINDOW)).map(expandSample)
      : [];
    const previousEmotionSeries = buildAlignedPreviousEmotionSeries(samples, previousSamples);
    const previousNetFlowSeries = buildAlignedPreviousNetFlowSeries(samples, previousSamples);
    const latest = await this.ctx.storage.get("latest");
    const tracked = trackedSeriesFromSamples(samples);
    const sampleTimes = samples.map((item) => formatTimeLabel(item.updatedAt));
    const anchors = buildAnchorTimeline(await fetchAnchorEvents(targetDate), sampleTimes);

    return {
      requestedDate: targetDate,
      availableDates,
      updatedAt: latest?.updatedAt || samples.at(-1).updatedAt,
      latestDate: getChinaDateKey(new Date(latest?.updatedAt || samples.at(-1).updatedAt)),
      sampleTimes,
      initialIndex: samples.length - 1,
      latestSnapshot: latest || samples.at(-1),
      samples,
      anchors,
      chart: {
        series: tracked.map((item) => ({
          code: item.code,
          name: item.name,
          data: samples.map((sample) => {
            const match = [...sample.leaders, ...sample.laggards].find((entry) => entry.code === item.code);
            return match ? match.mainFundDiff : null;
          }),
        })),
        netFlow: samples.map((sample) => {
          const all = [...sample.leaders, ...sample.laggards];
          return all.reduce((sum, item) => sum + (item.mainFundDiff || 0), 0);
        }),
        previousNetFlow: previousNetFlowSeries,
      },
      emotion: samples.at(-1).emotion || {},
      emotionSeries: {
        degree: samples.map((s) => (s.emotion || {}).degree || null),
        balance: samples.map((s) => (s.emotion || {}).balance || null),
        previewChange: samples.map((s) => (s.emotion || {}).previewChange || null),
        previewBalance: samples.map((s) => (s.emotion || {}).previewBalance || null),
        previousDate,
        previousDegree: previousEmotionSeries.degree,
        previousBalance: previousEmotionSeries.balance,
      },
    };
  }

  // 区间汇总：数据源是 DO 存储的按日 chunked 样本（与本地 QuestDB 不同）。
  // 每个交易日只取最后一个快照作为收盘快照，避免把当日全部样本读入内存。
  async getAggregatePayload(startDate, endDate, limit) {
    const availableDates = ((await this.ctx.storage.get("availableDates")) || []).sort();
    if (!availableDates.length) return null;

    const defaultEnd = endDate || availableDates.at(-1);
    // 默认取最近 7 天（含首尾，即最新交易日往前 6 天），与 RETAIN_DAYS 保留窗口一致。
    const defaultStart = startDate || addDaysToDateKey(defaultEnd, -(RETAIN_DAYS - 1));
    const safeLimit = Math.min(Math.max(Number(limit) || 10, 1), 50);

    const closes = [];
    const excluded = [];
    for (const dateKey of availableDates) {
      if (dateKey < defaultStart || dateKey > defaultEnd) continue;

      const lastSample = await readDayLastSample(this.ctx.storage, dateKey);
      if (!lastSample) continue;

      const expanded = expandSample(lastSample);
      if (!isClosingSnapshot(expanded.updatedAt)) {
        excluded.push(dateKey);
        continue;
      }
      if (!Array.isArray(expanded.concepts) || !expanded.concepts.length) continue;

      closes.push({
        date: dateKey,
        updatedAt: expanded.updatedAt,
        concepts: expanded.concepts,
      });
    }

    return buildAggregatePayload(closes, excluded, {
      startDate: defaultStart,
      endDate: defaultEnd,
      limit: safeLimit,
      availableDates,
    });
  }

  async getStatus() {
    const now = new Date();
    const chinaNow = getChinaParts(now);
    const todayKey = getChinaDateKey(now);
    const meta = (await this.ctx.storage.get("meta")) || {};
    const compactSamples = await readDaySamples(this.ctx.storage, todayKey);
    const latest = await this.ctx.storage.get("latest");
    const availableDates = ((await this.ctx.storage.get("availableDates")) || []).sort();

    const parsedNextRunAt = meta.nextRunAt ? new Date(meta.nextRunAt) : null;
    const effectiveNextRunAt =
      parsedNextRunAt instanceof Date && Number.isFinite(parsedNextRunAt.getTime()) && parsedNextRunAt.getTime() > now.getTime()
        ? parsedNextRunAt.toISOString()
        : nextRunAt(now).toISOString();

    return {
      timezone: "Asia/Shanghai",
      chinaNow: {
        isoLike: `${todayKey} ${String(chinaNow.hour).padStart(2, "0")}:${String(chinaNow.minute).padStart(2, "0")}:${String(chinaNow.second).padStart(2, "0")}`,
        weekday: chinaNow.weekday,
      },
      isTradingTime: isTradingTime(now),
      currentTradingSession: getTradingSession(now),
      collectIntervalSeconds: COLLECT_INTERVAL_MS / 1000,
      todayDate: todayKey,
      samplesToday: compactSamples.length,
      retainedDays: RETAIN_DAYS,
      availableDates,
      lastSuccessAt: latest?.updatedAt || null,
      nextRunAt: effectiveNextRunAt,
      latestSnapshotDate: latest?.updatedAt ? getChinaDateKey(new Date(latest.updatedAt)) : null,
    };
  }
}

// ---- Storage helpers ----

function dayStorageKey(dateKey) {
  return `day:${dateKey}`;
}

function addDaysToDateKey(dateKey, days) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + days));
  return date.toISOString().slice(0, 10);
}

function dayMetaKey(dateKey) {
  return `day:${dateKey}:meta`;
}

function dayChunkKey(dateKey, index) {
  return `day:${dateKey}:chunk:${index}`;
}

function chunkArray(items, chunkSize) {
  const chunks = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    chunks.push(items.slice(i, i + chunkSize));
  }
  return chunks;
}

async function ensureDayStorageMeta(storage, dateKey) {
  const existingMeta = await storage.get(dayMetaKey(dateKey));
  if (existingMeta) return existingMeta;

  const legacySamples = (await storage.get(dayStorageKey(dateKey))) || [];
  if (legacySamples.length === 0) {
    return { chunkCount: 0, totalSamples: 0 };
  }

  return writeDaySamples(storage, dateKey, legacySamples.slice(-DAILY_SAMPLE_LIMIT));
}

async function readDaySamples(storage, dateKey) {
  const meta = await storage.get(dayMetaKey(dateKey));
  if (!meta || !meta.chunkCount) {
    return (await storage.get(dayStorageKey(dateKey))) || [];
  }

  const chunkReads = [];
  for (let index = 0; index < meta.chunkCount; index += 1) {
    chunkReads.push(storage.get(dayChunkKey(dateKey, index)));
  }

  const chunks = await Promise.all(chunkReads);
  return chunks.flatMap((chunk) => chunk || []);
}

// 只读当日最后一个样本（最后一个 chunk 的末尾元素），
// 避免区间汇总把整日 1500 条样本全部读进内存。
async function readDayLastSample(storage, dateKey) {
  const meta = await storage.get(dayMetaKey(dateKey));
  if (!meta || !meta.chunkCount) {
    const legacySamples = (await storage.get(dayStorageKey(dateKey))) || [];
    return legacySamples.at(-1) || null;
  }

  const lastChunk = (await storage.get(dayChunkKey(dateKey, meta.chunkCount - 1))) || [];
  return lastChunk.at(-1) || null;
}

function buildSampleWindowIndices(totalSamples, limit) {
  if (totalSamples <= limit) {
    return Array.from({ length: totalSamples }, (_, index) => index);
  }

  const indices = [];
  for (let position = 0; position < limit; position += 1) {
    const remainingSlots = limit - position - 1;
    const maxIndexForPosition = totalSamples - remainingSlots - 1;
    const rawIndex = Math.round((position * (totalSamples - 1)) / (limit - 1));
    const previousIndex = indices[position - 1] ?? -1;
    const nextIndex = Math.max(previousIndex + 1, Math.min(rawIndex, maxIndexForPosition));
    indices.push(nextIndex);
  }

  return indices;
}

async function readSampledDaySamples(storage, dateKey, limit) {
  const meta = await storage.get(dayMetaKey(dateKey));
  if (!meta || !meta.chunkCount) {
    const legacySamples = (await storage.get(dayStorageKey(dateKey))) || [];
    const indices = buildSampleWindowIndices(legacySamples.length, limit);
    return indices.map((index) => legacySamples[index]).filter(Boolean);
  }

  const totalSamples = meta.totalSamples || 0;
  const indices = buildSampleWindowIndices(totalSamples, limit);
  if (indices.length === 0) return [];

  const chunkToOffsets = new Map();
  for (const index of indices) {
    const chunkIndex = Math.floor(index / DAY_SAMPLE_CHUNK_SIZE);
    const offset = index % DAY_SAMPLE_CHUNK_SIZE;
    if (!chunkToOffsets.has(chunkIndex)) {
      chunkToOffsets.set(chunkIndex, []);
    }
    chunkToOffsets.get(chunkIndex).push(offset);
  }

  const orderedChunkIndexes = [...chunkToOffsets.keys()].sort((a, b) => a - b);
  const chunkEntries = await Promise.all(
    orderedChunkIndexes.map(async (chunkIndex) => [chunkIndex, (await storage.get(dayChunkKey(dateKey, chunkIndex))) || []]),
  );
  const chunkMap = new Map(chunkEntries);

  return indices
    .map((index) => {
      const chunkIndex = Math.floor(index / DAY_SAMPLE_CHUNK_SIZE);
      const offset = index % DAY_SAMPLE_CHUNK_SIZE;
      return chunkMap.get(chunkIndex)?.[offset] || null;
    })
    .filter(Boolean);
}

async function writeDaySamples(storage, dateKey, samples, previousMeta = null) {
  const trimmed = samples.slice(-DAILY_SAMPLE_LIMIT);
  const chunks = chunkArray(trimmed, DAY_SAMPLE_CHUNK_SIZE);
  const oldMeta = previousMeta || (await storage.get(dayMetaKey(dateKey))) || { chunkCount: 0, totalSamples: 0 };

  await Promise.all(chunks.map((chunk, index) => storage.put(dayChunkKey(dateKey, index), chunk)));

  for (let index = chunks.length; index < (oldMeta.chunkCount || 0); index += 1) {
    await storage.delete(dayChunkKey(dateKey, index));
  }

  const nextMeta = { chunkCount: chunks.length, totalSamples: trimmed.length };
  await storage.put(dayMetaKey(dateKey), nextMeta);
  await storage.delete(dayStorageKey(dateKey));
  return nextMeta;
}

async function deleteDaySamples(storage, dateKey) {
  const meta = await storage.get(dayMetaKey(dateKey));
  if (meta?.chunkCount) {
    for (let index = 0; index < meta.chunkCount; index += 1) {
      await storage.delete(dayChunkKey(dateKey, index));
    }
  }
  await storage.delete(dayMetaKey(dateKey));
  await storage.delete(dayStorageKey(dateKey));
}

function compactItem(item) {
  return {
    n: item.name,
    c: item.code,
    ch: item.change,
    f: item.mainFundDiff,
    l: item.leaderStock,
  };
}

function expandItem(item) {
  return {
    name: item.n,
    code: item.c,
    change: item.ch,
    mainFundDiff: item.f,
    leaderStock: item.l,
  };
}

function compactSample(snapshot) {
  return {
    updatedAt: snapshot.updatedAt,
    headline: snapshot.headline,
    leaders: snapshot.leaders.map(compactItem),
    laggards: snapshot.laggards.map(compactItem),
    concepts: snapshot.concepts.map(compactItem),
    em: snapshot.emotion || {},
  };
}

function expandSample(sample) {
  return {
    updatedAt: sample.updatedAt,
    headline: sample.headline,
    leaders: sample.leaders.map(expandItem),
    laggards: sample.laggards.map(expandItem),
    concepts: (sample.concepts || []).map(expandItem),
    emotion: sample.em || {},
  };
}

function trackedSeriesFromSamples(samples) {
  const latest = samples.at(-1);
  const all = latest.concepts?.length ? latest.concepts : [...latest.leaders, ...latest.laggards];
  const topIn = all.filter((item) => item.mainFundDiff > 0).slice(0, 10);
  const topOut = all.filter((item) => item.mainFundDiff < 0).slice(0, 10);
  const tracked = [...topIn, ...topOut].sort((a, b) => Math.abs(b.mainFundDiff) - Math.abs(a.mainFundDiff));
  const deduped = new Map();

  tracked.forEach((item) => {
    if (!deduped.has(item.code)) {
      deduped.set(item.code, { code: item.code, name: item.name });
    }
  });

  return [...deduped.values()];
}

async function appendSampleToDay(storage, dateKey, sample) {
  const meta = await ensureDayStorageMeta(storage, dateKey);

  if (meta.totalSamples >= DAILY_SAMPLE_LIMIT) {
    const current = await readDaySamples(storage, dateKey);
    const next = [...current.slice(-(DAILY_SAMPLE_LIMIT - 1)), sample];
    await writeDaySamples(storage, dateKey, next, meta);
  } else {
    let nextMeta = { ...meta };
    let chunkIndex = nextMeta.chunkCount - 1;
    let chunk = [];

    if (chunkIndex < 0) {
      chunkIndex = 0;
      nextMeta.chunkCount = 1;
    } else {
      chunk = (await storage.get(dayChunkKey(dateKey, chunkIndex))) || [];
    }

    if (chunk.length >= DAY_SAMPLE_CHUNK_SIZE) {
      chunkIndex = nextMeta.chunkCount;
      nextMeta.chunkCount += 1;
      chunk = [];
    }

    chunk.push(sample);
    nextMeta.totalSamples += 1;

    await storage.put(dayChunkKey(dateKey, chunkIndex), chunk);
    await storage.put(dayMetaKey(dateKey), nextMeta);
    await storage.delete(dayStorageKey(dateKey));
  }

  const availableDates = ((await storage.get("availableDates")) || []).filter(Boolean);
  if (!availableDates.includes(dateKey)) {
    availableDates.push(dateKey);
    availableDates.sort();
  }

  while (availableDates.length > RETAIN_DAYS) {
    const expired = availableDates.shift();
    await deleteDaySamples(storage, expired);
  }

  await storage.put("availableDates", availableDates);
}
