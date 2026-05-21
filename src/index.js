import { DurableObject } from "cloudflare:workers";

const API_URL =
  "https://x-quote.cls.cn/web_quote/plate/plate_list?app=CailianpressWeb&os=web&page=1&rever=1&sv=8.4.6&type=concept&way=main_fund_diff&sign=2cfab3ce449fe7f69f25e951003ed082";

const REVERSE_API_URL =
  "https://x-quote.cls.cn/web_quote/plate/plate_list?app=CailianpressWeb&os=web&page=1&rever=0&sv=8.4.6&type=concept&way=main_fund_diff&sign=4bb3a71eb50aaeff3c50f908503cda5a";

const EMOTION_API_URL =
  "https://x-quote.cls.cn/v2/quote/a/stock/emotion?app=CailianpressWeb&os=web&sv=7.7.5&sign=bf0f367462d8cd70917ba5eab3853bce";

const REQUEST_HEADERS = {
  "Cache-Control": "no-cache",
  "Content-Type": "application/x-www-form-urlencoded",
  Origin: "https://www.cls.cn",
  Pragma: "no-cache",
  Referer: "https://www.cls.cn/",
  "User-Agent": "Mozilla/5.0",
};

const COLLECT_INTERVAL_MS = 10 * 1000;
const DAILY_SAMPLE_LIMIT = 1500;
const RETAIN_DAYS = 7;
const CHINA_TZ = "Asia/Shanghai";
const FLOW_GROUP_SIZE = 10;
const DISPLAY_CONCEPT_COUNT = FLOW_GROUP_SIZE * 2;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/finance") {
      return handleFinanceApi(request, env);
    }

    if (url.pathname === "/api/admin/trigger") {
      return triggerCollection(env);
    }

    if (url.pathname === "/api/admin/reset") {
      return resetCollector(env);
    }

    if (url.pathname === "/api/status") {
      return handleStatusApi(env);
    }

    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(renderHtml(), {
        headers: {
          "content-type": "text/html; charset=UTF-8",
          "cache-control": "no-store",
        },
      });
    }

    return new Response("Not found", { status: 404 });
  },

  async scheduled(controller, env, ctx) {
    ctx.waitUntil(ensureCollector(env, controller.scheduledTime));
  },
};

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
    if (currentAlarm === null) {
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

    // Merge both API results (rever=1 and rever=0), deduplicate by code
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
    if (availableDates.length === 0) {
      return null;
    }

    const todayKey = getChinaDateKey(new Date());
    const targetDate =
      requestedDate && availableDates.includes(requestedDate)
        ? requestedDate
        : availableDates.includes(todayKey)
          ? todayKey
          : availableDates.at(-1);

    const compactSamples = (await this.ctx.storage.get(dayStorageKey(targetDate))) || [];
    if (compactSamples.length === 0) {
      return null;
    }

    const samples = compactSamples.map(expandSample);
    const latest = await this.ctx.storage.get("latest");
    const tracked = trackedSeriesFromSamples(samples);

    return {
      requestedDate: targetDate,
      availableDates,
      updatedAt: latest?.updatedAt || samples.at(-1).updatedAt,
      latestDate: getChinaDateKey(new Date(latest?.updatedAt || samples.at(-1).updatedAt)),
      sampleTimes: samples.map((item) => formatTimeLabel(item.updatedAt)),
      initialIndex: samples.length - 1,
      latestSnapshot: latest || samples.at(-1),
      samples,
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
      },
      emotion: samples.at(-1).emotion || {},
      emotionSeries: {
        degree: samples.map((s) => (s.emotion || {}).degree || null),
        balance: samples.map((s) => (s.emotion || {}).balance || null),
        previewChange: samples.map((s) => (s.emotion || {}).previewChange || null),
        previewBalance: samples.map((s) => (s.emotion || {}).previewBalance || null),
      },
    };
  }

  async getStatus() {
    const now = new Date();
    const chinaNow = getChinaParts(now);
    const todayKey = getChinaDateKey(now);
    const meta = (await this.ctx.storage.get("meta")) || {};
    const compactSamples = (await this.ctx.storage.get(dayStorageKey(todayKey))) || [];
    const latest = await this.ctx.storage.get("latest");
    const availableDates = ((await this.ctx.storage.get("availableDates")) || []).sort();

    return {
      timezone: CHINA_TZ,
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
      nextRunAt: meta.nextRunAt || null,
      latestSnapshotDate: latest?.updatedAt ? getChinaDateKey(new Date(latest.updatedAt)) : null,
    };
  }
}

async function handleFinanceApi(request, env) {
  const url = new URL(request.url);
  const requestedDate = url.searchParams.get("date");

  await ensureCollector(env);
  const stub = getCollectorStub(env);
  let response = await stub.fetch(`https://collector.internal/day${requestedDate ? `?date=${requestedDate}` : ""}`);

  if (response.status === 404) {
    await stub.fetch("https://collector.internal/collect");
    response = await stub.fetch(`https://collector.internal/day${requestedDate ? `?date=${requestedDate}` : ""}`);
  }

  return response;
}

async function triggerCollection(env) {
  const stub = getCollectorStub(env);
  return stub.fetch("https://collector.internal/collect");
}

async function resetCollector(env) {
  const stub = getCollectorStub(env);
  return stub.fetch("https://collector.internal/reset");
}

async function handleStatusApi(env) {
  await ensureCollector(env);
  const stub = getCollectorStub(env);
  return stub.fetch("https://collector.internal/status");
}

async function ensureCollector(env, scheduledTime = Date.now()) {
  const stub = getCollectorStub(env);
  await stub.fetch(`https://collector.internal/ensure?t=${scheduledTime}`);
}

function getCollectorStub(env) {
  const id = env.COLLECTOR.idFromName("capital-flow-primary");
  return env.COLLECTOR.get(id);
}

function summarizeHeadline(list) {
  const topThree = list.slice(0, 3);
  const totalPositiveFlow = topThree.reduce(
    (sum, item) => sum + toNumber(item.main_fund_diff),
    0,
  );

  return {
    topCount: list.filter((item) => toNumber(item.main_fund_diff) > 0).length,
    totalCount: list.length,
    topThreeFlow: totalPositiveFlow,
  };
}

function normalizeConceptList(list) {
  return list.map((item) => ({
    name: item.secu_name,
    code: item.secu_code,
    change: toNumber(item.change),
    mainFundDiff: toNumber(item.main_fund_diff),
    leaderStock: item.first_stock?.secu_name || "-",
  }));
}

function buildFlowGroups(list) {
  const normalized = normalizeConceptList(list);
  const topInflow = normalized
    .filter((item) => Number.isFinite(item.mainFundDiff) && item.mainFundDiff > 0)
    .sort((a, b) => b.mainFundDiff - a.mainFundDiff)
    .slice(0, FLOW_GROUP_SIZE);

  const topOutflow = normalized
    .filter((item) => Number.isFinite(item.mainFundDiff) && item.mainFundDiff < 0)
    .sort((a, b) => a.mainFundDiff - b.mainFundDiff)
    .slice(0, FLOW_GROUP_SIZE);

  // Ranking: 10 inflow + 10 outflow, each sorted by abs desc within group
  const ranking = [
    ...topInflow,
    ...topOutflow,
  ].sort((a, b) => Math.abs(b.mainFundDiff) - Math.abs(a.mainFundDiff));

  return { leaders: topInflow, laggards: topOutflow, ranking };
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

function compactItem(item) {
  return {
    n: item.name,
    c: item.code,
    ch: item.change,
    f: item.mainFundDiff,
    l: item.leaderStock,
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

function expandItem(item) {
  return {
    name: item.n,
    code: item.c,
    change: item.ch,
    mainFundDiff: item.f,
    leaderStock: item.l,
  };
}

async function appendSampleToDay(storage, dateKey, sample) {
  const key = dayStorageKey(dateKey);
  const current = (await storage.get(key)) || [];
  current.push(sample);
  const next = current.slice(-DAILY_SAMPLE_LIMIT);
  await storage.put(key, next);

  const availableDates = ((await storage.get("availableDates")) || []).filter(Boolean);
  if (!availableDates.includes(dateKey)) {
    availableDates.push(dateKey);
    availableDates.sort();
  }

  while (availableDates.length > RETAIN_DAYS) {
    const expired = availableDates.shift();
    await storage.delete(dayStorageKey(expired));
  }

  await storage.put("availableDates", availableDates);
}

function trackedSeriesFromSamples(samples) {
  const latest = samples.at(-1);
  const all = latest.concepts?.length ? latest.concepts : [...latest.leaders, ...latest.laggards];
  // Take top 5 inflow + top 5 outflow for cleaner chart
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

function dayStorageKey(dateKey) {
  return `day:${dateKey}`;
}

function toNumber(value) {
  return typeof value === "number" ? value : 0;
}

function parseChineseAmount(value) {
  if (!value) return 0;
  const numeric = parseFloat(String(value).replace(/[^\d.-]/g, ""));
  if (!Number.isFinite(numeric)) return 0;

  // Order matters: "万亿" contains both "万" and "亿".
  if (value.includes("万亿")) return numeric * 1000000000000;
  if (value.includes("亿")) return numeric * 100000000;
  if (value.includes("万")) return numeric * 10000;
  return numeric;
}

function amountToWanYi(value) {
  return parseChineseAmount(value) / 1000000000000;
}

function amountToYi(value) {
  return parseChineseAmount(value) / 100000000;
}

function isTradingTime(now) {
  const parts = getChinaParts(now);
  if (parts.weekday === "Sat" || parts.weekday === "Sun") {
    return false;
  }

  const minutes = parts.hour * 60 + parts.minute;
  const inMorning = minutes >= 9 * 60 + 30 && minutes <= 11 * 60 + 30;
  const inAfternoon = minutes >= 13 * 60 && minutes <= 15 * 60;
  return inMorning || inAfternoon;
}

function getTradingSession(now) {
  const parts = getChinaParts(now);
  if (parts.weekday === "Sat" || parts.weekday === "Sun") {
    return "closed";
  }

  const minutes = parts.hour * 60 + parts.minute;
  if (minutes >= 9 * 60 + 30 && minutes <= 11 * 60 + 30) {
    return "morning";
  }
  if (minutes >= 13 * 60 && minutes <= 15 * 60) {
    return "afternoon";
  }
  if (minutes > 11 * 60 + 30 && minutes < 13 * 60) {
    return "lunch_break";
  }
  return "closed";
}

function nextRunAt(now) {
  if (isTradingTime(now)) {
    return new Date(now.getTime() + COLLECT_INTERVAL_MS);
  }

  const parts = getChinaParts(now);
  const minutes = parts.hour * 60 + parts.minute;
  const isWeekday = parts.weekday !== "Sat" && parts.weekday !== "Sun";

  if (isWeekday && minutes < 9 * 60 + 30) {
    return chinaWallClockToUtc(parts.year, parts.month, parts.day, 9, 30, 0);
  }

  if (isWeekday && minutes > 11 * 60 + 30 && minutes < 13 * 60) {
    return chinaWallClockToUtc(parts.year, parts.month, parts.day, 13, 0, 0);
  }

  const nextDay = nextWeekday(parts.year, parts.month, parts.day);
  return chinaWallClockToUtc(nextDay.year, nextDay.month, nextDay.day, 9, 30, 0);
}

function nextWeekday(year, month, day) {
  let cursor = chinaWallClockToUtc(year, month, day, 12, 0, 0);
  for (;;) {
    cursor = new Date(cursor.getTime() + 24 * 60 * 60 * 1000);
    const parts = getChinaParts(cursor);
    if (parts.weekday !== "Sat" && parts.weekday !== "Sun") {
      return parts;
    }
  }
}

function getChinaDateKey(date) {
  const parts = getChinaParts(date);
  return `${parts.year}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;
}

function formatTimeLabel(dateString) {
  const parts = getChinaParts(new Date(dateString));
  return `${String(parts.hour).padStart(2, "0")}:${String(parts.minute).padStart(2, "0")}:${String(parts.second).padStart(2, "0")}`;
}

function getChinaParts(date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: CHINA_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    weekday: "short",
  });

  const map = {};
  for (const part of formatter.formatToParts(date)) {
    if (part.type !== "literal") {
      map[part.type] = part.value;
    }
  }

  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    hour: Number(map.hour),
    minute: Number(map.minute),
    second: Number(map.second),
    weekday: map.weekday,
  };
}

function chinaWallClockToUtc(year, month, day, hour, minute, second) {
  return new Date(Date.UTC(year, month - 1, day, hour - 8, minute, second));
}

function renderHtml() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Capital Flow Replay</title>
    <script>
      (() => {
        try {
          const stored = localStorage.getItem('themeMode');
          if (stored ? stored === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
          }
        } catch (_) {}

        const apply = dark => {
          document.documentElement.classList.toggle('dark', dark);
          try { localStorage.setItem('themeMode', dark ? 'dark' : 'light'); } catch (_) {}
        };

        document.addEventListener('basecoat:theme', (event) => {
          const mode = event.detail?.mode;
          apply(
            mode === 'dark'
              ? true
              : mode === 'light'
                ? false
                : !document.documentElement.classList.contains('dark')
          );
        });
      })();
    </script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/basecoat-css@0.3.11/dist/basecoat.cdn.min.css">
    <script src="https://cdn.jsdelivr.net/npm/basecoat-css@0.3.11/dist/js/basecoat.min.js" defer></script>
    <style>
      :root {
        color-scheme: light;
        --bg: #fafafa;
        --bg-2: #ffffff;
        --panel: rgba(255, 255, 255, 0.92);
        --panel-strong: rgba(255, 255, 255, 0.98);
        --line: rgba(39, 39, 42, 0.12);
        --line-soft: rgba(39, 39, 42, 0.08);
        --text: #18181b;
        --muted: rgba(39, 39, 42, 0.62);
        --up: #dc2626;
        --down: #16a34a;
        --gold: #a16207;
        --accent: #3f3f46;
        --shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
      }

      .dark {
        color-scheme: dark;
        --bg: #09090b;
        --bg-2: #18181b;
        --panel: rgba(24, 24, 27, 0.88);
        --panel-strong: rgba(24, 24, 27, 0.96);
        --line: rgba(244, 244, 245, 0.12);
        --line-soft: rgba(244, 244, 245, 0.08);
        --text: #fafafa;
        --muted: rgba(244, 244, 245, 0.6);
        --up: #f87171;
        --down: #4ade80;
        --gold: #facc15;
        --accent: #e4e4e7;
        --shadow: 0 8px 30px rgba(0, 0, 0, 0.24);
      }

      * { box-sizing: border-box; }

      body {
        margin: 0;
        min-height: 100vh;
        color: var(--text);
        background:
          linear-gradient(180deg, var(--bg), var(--bg-2));
        font-family: "Avenir Next", "Segoe UI", sans-serif;
      }

      .page {
        width: min(1320px, calc(100% - 28px));
        margin: 0 auto;
        padding: 28px 0 44px;
      }

      .hero {
        display: grid;
        grid-template-columns: 1.4fr 0.8fr;
        gap: 16px;
        margin-bottom: 18px;
      }

      h1 {
        margin: 0 0 8px;
        font-size: clamp(34px, 6vw, 64px);
        letter-spacing: -0.05em;
        line-height: 0.94;
      }

      .lead {
        margin: 0;
        max-width: 760px;
        color: var(--muted);
        line-height: 1.7;
      }

      .panel {
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 24px;
        padding: 18px;
        backdrop-filter: blur(10px);
        box-shadow: var(--shadow);
        position: relative;
        overflow: hidden;
      }

      .card {
        background: var(--panel);
        border-color: var(--line);
        box-shadow: var(--shadow);
        border-radius: 24px;
      }

      .card > header h2 {
        margin: 0;
        letter-spacing: -0.02em;
      }

      .card > header p {
        color: var(--muted);
      }

      button,
      input,
      .concept-card,
      .panel {
        transition: all 0.2s ease;
      }

      .panel::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(140deg, rgba(255,255,255,0.45), transparent 34%);
        pointer-events: none;
      }

      .hero-copy,
      .hero-side {
        min-height: 168px;
      }

      .eyebrow {
        margin-bottom: 10px;
        color: var(--accent);
        font-size: 12px;
        letter-spacing: 0.24em;
        text-transform: uppercase;
      }

      .hero-side {
        display: grid;
        align-content: space-between;
        gap: 16px;
      }

      .status-rail {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px;
      }

      .status-pill {
        padding: 12px 14px;
        border: 1px solid var(--line-soft);
        border-radius: 16px;
        background: rgba(15, 23, 42, 0.02);
      }

      .status-pill .label {
        font-size: 11px;
        color: var(--muted);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        margin-bottom: 4px;
      }

      .status-pill .value {
        font-size: 14px;
        color: var(--text);
      }

      .controls {
        display: grid;
        grid-template-columns: 280px minmax(220px, 1fr) 140px;
        gap: 12px;
        align-items: end;
        margin: 18px 0 16px;
      }

      .control-field {
        display: grid;
        gap: 8px;
      }

      .control-label {
        color: var(--muted);
        font-size: 12px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }

      .select button {
        width: 100%;
        justify-content: space-between;
      }

      .select {
        position: relative;
      }

      .select [data-popover] {
        display: none;
        position: absolute;
        top: calc(100% + 6px);
        left: 0;
        right: 0;
        z-index: 50;
        background: var(--panel-strong);
        border: 1px solid var(--line);
        border-radius: 18px;
        backdrop-filter: blur(10px);
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.18);
        overflow: hidden;
        padding: 8px;
      }

      .select [data-popover][aria-hidden="false"] {
        display: block;
      }

      .select [data-popover] header {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 4px 6px 8px;
        border-bottom: 1px solid var(--line-soft);
        margin-bottom: 4px;
      }

      .select [data-popover] header input {
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        color: var(--text);
        font-size: 13px;
      }

      .select [data-popover] header input::placeholder {
        color: var(--muted);
      }

      .select [data-popover] header svg {
        flex-shrink: 0;
        color: var(--muted);
      }

      .select [role="listbox"] {
        max-height: 260px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .select [role="option"] {
        padding: 8px 12px;
        border-radius: 10px;
        cursor: pointer;
        font-size: 13px;
        color: var(--text);
        transition: background 0.12s;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .select [role="option"]:hover {
        background: rgba(63, 63, 70, 0.06);
      }

      .select [role="option"][data-selected] {
        background: rgba(63, 63, 70, 0.1);
      }

      .select [role="option"][data-highlighted] {
        background: rgba(63, 63, 70, 0.08);
      }

      .select [role="option"][hidden] {
        display: none;
      }

      .btn:hover,
      .btn-secondary:hover,
      .btn-outline:hover,
      .select button:hover,
      .input:hover {
        transform: translateY(-1px);
      }

      .btn:focus-visible,
      .btn-secondary:focus-visible,
      .btn-outline:focus-visible,
      .select button:focus-visible,
      .input:focus-visible {
        outline: 2px solid rgba(63, 63, 70, 0.18);
        outline-offset: 2px;
      }

      .btn:active,
      .btn-secondary:active,
      .btn-outline:active,
      .select button:active {
        transform: translateY(0);
      }

      .metric-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 12px;
        margin-bottom: 16px;
      }

      .metric {
        min-height: 112px;
      }

      .metric-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      .metric-label {
        color: var(--muted);
        font-size: 12px;
        margin-bottom: 6px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }

      .metric-value {
        font-size: 32px;
        letter-spacing: -0.05em;
      }

      .metric-sub {
        margin-top: 6px;
        font-size: 12px;
        color: var(--muted);
      }

      .chart-panel {
        margin-bottom: 16px;
        padding: 20px;
      }

      #chart {
        height: 540px;
      }

      .chart-custom-legend {
        display: flex;
        gap: 16px;
        padding: 8px 0 0;
        flex-wrap: wrap;
      }

      .chart-legend-col {
        flex: 1;
        min-width: 200px;
      }

      .chart-legend-col h4 {
        font-size: 11px;
        font-weight: 600;
        margin: 0 0 4px;
      }

      .chart-legend-item {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 2px 8px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 11px;
        transition: opacity 0.15s;
      }

      .chart-legend-item:hover {
        background: rgba(63, 63, 70, 0.06);
      }

      .chart-legend-item.is-hidden {
        opacity: 0.35;
      }

      .chart-legend-swatch {
        display: inline-block;
        width: 14px;
        height: 4px;
        border-radius: 2px;
        flex-shrink: 0;
      }

      #chart,
      #netflow-chart,
      #emotion-chart {
        border: 1px solid rgba(24, 24, 27, 0.14);
        border-radius: 20px;
        background:
          linear-gradient(180deg, rgba(24, 24, 27, 0.96), rgba(39, 39, 42, 0.94)),
          radial-gradient(circle at top, rgba(255,255,255,0.04), transparent 38%);
        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, 0.04),
          0 8px 30px rgba(0, 0, 0, 0.08);
      }

      .dark #chart,
      .dark #netflow-chart,
      .dark #emotion-chart {
        border-color: rgba(244, 244, 245, 0.08);
        background:
          linear-gradient(180deg, rgba(9, 9, 11, 0.98), rgba(24, 24, 27, 0.96)),
          radial-gradient(circle at top, rgba(255,255,255,0.05), transparent 38%);
        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, 0.03),
          0 8px 30px rgba(0, 0, 0, 0.2);
      }

      #chart .highcharts-point.top-marker {
        animation: pulse-marker 1.15s ease-in-out infinite;
        transform-origin: center;
        transform-box: fill-box;
      }

      #chart .highcharts-point.bottom-marker {
        opacity: 0.68;
      }

      #chart .highcharts-series.trail-series path {
        filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.16));
        opacity: 0.95;
      }

      @keyframes pulse-marker {
        0%, 100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.58;
          transform: scale(1.28);
        }
      }

      .chart-head {
        display: flex;
        justify-content: space-between;
        align-items: end;
        gap: 16px;
        margin-bottom: 14px;
      }

      .chart-title {
        font-size: 28px;
        letter-spacing: -0.04em;
      }

      .chart-note {
        color: var(--muted);
        font-size: 13px;
        max-width: 540px;
      }

      .chart-stats {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;
        margin-top: 10px;
      }

      .mini-stat-card {
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 6px 12px;
        border: 1px solid var(--line-soft);
        border-radius: 10px;
        background: rgba(15, 23, 42, 0.03);
        min-width: 80px;
      }

      .dark .mini-stat-card {
        background: rgba(244, 244, 245, 0.04);
      }

      .mini-stat-label {
        font-size: 10px;
        color: var(--muted);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .mini-stat-value {
        font-size: 14px;
        font-weight: 600;
        letter-spacing: -0.03em;
      }

      .speed-group {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
      }

      .speed-btn.is-active {
        border-color: var(--accent);
        background: rgba(63, 63, 70, 0.08);
      }

      .chart-filter-tags {
        display: inline-flex;
        gap: 4px;
        flex-wrap: wrap;
      }

      .chart-filter-btn {
        font-size: 11px;
        padding: 2px 8px;
      }

      .chart-filter-btn.is-active {
        border-color: var(--accent);
        background: rgba(63, 63, 70, 0.08);
      }

      .toggle-label {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        font-size: 12px;
        color: var(--muted);
        user-select: none;
      }

      .toggle-label input[type="checkbox"] {
        accent-color: var(--accent);
      }

      .featured-legend {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 10px;
      }

      .featured-item {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 10px;
        border: 1px solid var(--line-soft);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.04);
        font-size: 12px;
      }

      .featured-shape {
        display: inline-block;
        width: 10px;
        height: 10px;
      }

      .shape-circle {
        border-radius: 999px;
      }

      .shape-square {
        border-radius: 2px;
      }

      .shape-triangle {
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 10px solid currentColor;
      }

      .scrubber {
        margin-top: 14px;
        padding-top: 14px;
        border-top: 1px solid var(--line-soft);
      }

      .scrubber-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        margin-bottom: 8px;
      }

      .timeline {
        width: 100%;
      }

      input[type="range"].input {
        width: 100%;
      }

      .concepts-panel {
        padding: 20px;
      }

      .concepts-head {
        display: flex;
        justify-content: space-between;
        align-items: end;
        gap: 16px;
        margin-bottom: 14px;
      }

      .concepts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 10px;
      }

      .concepts-grid.has-two-columns {
        grid-template-columns: 1fr 1fr;
      }

      .concept-column {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .concept-column-title {
        font-size: 13px;
        font-weight: 600;
        letter-spacing: -0.02em;
        padding-bottom: 4px;
        border-bottom: 1px solid var(--line-soft);
      }

      .concept-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 10px 14px;
        border-radius: 12px;
      }

      .concept-item.flow-in {
        border-color: rgba(220, 38, 38, 0.14);
        background: rgba(220, 38, 38, 0.03);
      }

      .concept-item.flow-out {
        border-color: rgba(22, 163, 74, 0.14);
        background: rgba(22, 163, 74, 0.03);
      }

      .concept-item:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
      }

      .concept-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
      }

      .concept-rank {
        color: var(--muted);
        font-size: 10px;
      }

      .concept-name {
        font-size: 13px;
        line-height: 1.2;
      }

      .concept-flow {
        margin: 2px 0;
        font-size: 18px;
        letter-spacing: -0.04em;
      }

      .concept-foot {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 6px;
        font-size: 11px;
      }

      .concept-chip {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        width: fit-content;
        padding: 5px 9px;
        border-radius: 999px;
        background: rgba(255,255,255,0.04);
        color: var(--muted);
        font-size: 11px;
      }

      .muted { color: var(--muted); }
      .up { color: var(--up); }
      .down { color: var(--down); }
      .gold { color: var(--gold); }
      .blue { color: var(--blue); }

      @media (max-width: 920px) {
        .hero,
        .controls,
        .metric-grid,
        .status-rail,
        .concepts-grid {
          grid-template-columns: 1fr;
        }

        #chart {
          height: 380px;
        }
      }
    </style>
  </head>
  <body>
    <main class="page">
      <section class="hero">
        <article class="panel hero-copy">
          <div class="eyebrow">Concept Flow Replay / 20 Signals</div>
          <h1>把一天的题材资金流<br>拉成可回放的盘面。</h1>
          <p class="lead">
            后台自动采集并按天存储概念板块主力资金流。你现在看到的是 20 个概念的日内轨迹，
            可以按交易日切换、拖动到具体时间点，或者直接播放整天的资金迁移过程。
          </p>
        </article>
        <article class="panel hero-side">
          <div>
            <div class="flex items-start justify-between gap-3">
              <div>
                <div class="metric-label">当前模式</div>
                <div class="metric-value" style="font-size:34px;">20 概念回放</div>
                <div class="metric-sub">基于 cls.cn 概念板块数据，按净流入 / 净流出各取前 10 展示</div>
              </div>
              <button
                type="button"
                aria-label="切换明暗主题"
                data-tooltip="切换主题"
                data-side="bottom"
                onclick="document.dispatchEvent(new CustomEvent('basecoat:theme'))"
                class="btn-icon-outline size-8"
              >
                <span class="hidden dark:block">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                </span>
                <span class="block dark:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                </span>
              </button>
            </div>
          </div>
          <div class="status-rail">
            <div class="status-pill">
              <div class="label">上海时间</div>
              <div class="value"><span class="badge" id="status-now">--</span></div>
            </div>
            <div class="status-pill">
              <div class="label">交易阶段</div>
              <div class="value"><span class="badge" id="status-session">--</span></div>
            </div>
            <div class="status-pill">
              <div class="label">下次采集</div>
              <div class="value"><kbd id="status-next-run">--</kbd></div>
            </div>
            <div class="status-pill">
              <div class="label">今日样本</div>
              <div class="value"><kbd id="status-samples">--</kbd></div>
            </div>
          </div>

        </article>
      </section>

      <section class="controls">
        <div class="control-field">
          <span class="control-label">交易日</span>
          <div id="date-combobox" class="select">
            <button type="button" class="btn" id="date-combobox-trigger" aria-haspopup="listbox" aria-expanded="false" aria-controls="date-combobox-listbox">
              <span class="truncate">选择交易日</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m7 15 5 5 5-5"></path>
                <path d="m7 9 5-5 5 5"></path>
              </svg>
            </button>
            <div id="date-combobox-popover" data-popover aria-hidden="true">
              <header>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
                <input type="text" value="" placeholder="搜索交易日..." autocomplete="off" autocorrect="off" spellcheck="false" aria-autocomplete="list" role="combobox" aria-expanded="false" aria-controls="date-combobox-listbox" aria-labelledby="date-combobox-trigger">
              </header>
              <div role="listbox" id="date-combobox-listbox" aria-orientation="vertical" aria-labelledby="date-combobox-trigger" data-empty="暂无交易日数据"></div>
            </div>
            <input id="date-combobox-value" type="hidden" name="trade-date" value="">
          </div>
        </div>

        <div class="panel" style="padding:12px 14px;">
          <div class="metric-label">当前市场切片</div>
          <div id="current-time" class="metric-value" style="font-size:24px;">--:--:--</div>
        </div>
        <div class="control-field">
          <span class="control-label">最新交易日</span>
          <button id="latest-btn" class="btn-secondary" type="button">跳到最新</button>
        </div>
      </section>

      <section class="metric-grid">
        <article class="card metric">
          <header class="metric-row">
            <div>
              <h2 class="metric-label">最近采集时间</h2>
              <p class="sr-only">实时更新</p>
            </div>
            <span class="badge">Live</span>
          </header>
          <section>
            <div class="metric-value" id="updated-at">--:--:--</div>
          </section>
        </article>
        <article class="card metric">
          <header class="metric-row">
            <div>
              <h2 class="metric-label">所选交易日</h2>
              <p class="sr-only">中国市场</p>
            </div>
            <kbd class="kbd">CN</kbd>
          </header>
          <section>
            <div class="metric-value" id="selected-date">--</div>
          </section>
        </article>
        <article class="card metric">
          <header class="metric-row">
            <div>
              <h2 class="metric-label">净流入 / 净流出</h2>
              <p class="sr-only">概念分布</p>
            </div>
            <span class="badge-secondary">分布</span>
          </header>
          <section>
            <div class="metric-value" id="positive-count">--</div>
            <p class="metric-sub" id="positive-sub">--</p>
          </section>
        </article>
        <article class="card metric">
          <header class="metric-row">
            <div>
              <h2 class="metric-label">净流入 Top3</h2>
              <p class="sr-only">流入主力资金</p>
            </div>
            <span class="badge-outline">📈</span>
          </header>
          <section>
            <div class="metric-value up" id="inflow-top3-card">--</div>
            <p class="metric-sub">买入端前三规模</p>
          </section>
        </article>
        <article class="card metric">
          <header class="metric-row">
            <div>
              <h2 class="metric-label">净流出 Top3</h2>
              <p class="sr-only">流出主力资金</p>
            </div>
            <span class="badge-outline">📉</span>
          </header>
          <section>
            <div class="metric-value down" id="outflow-top3-card">--</div>
            <p class="metric-sub">卖出端前三规模</p>
          </section>
        </article>
        <article class="card metric">
          <header class="metric-row">
            <div>
              <h2 class="metric-label">流入集中</h2>
              <p class="sr-only">流入前三占比</p>
            </div>
            <span class="badge-outline up">📈</span>
          </header>
          <section>
            <div class="metric-value" id="top-three-share">--</div>
            <p class="metric-sub">占流入总量比例</p>
          </section>
        </article>
        <article class="card metric">
          <header class="metric-row">
            <div>
              <h2 class="metric-label">流出集中</h2>
              <p class="sr-only">流出前三占比</p>
            </div>
            <span class="badge-outline down">📉</span>
          </header>
          <section>
            <div class="metric-value" id="concentration-badge">--</div>
            <p class="metric-sub">占流出总量比例</p>
          </section>
        </article>
        <article class="card metric">
          <header class="metric-row">
            <div>
              <h2 class="metric-label">市场净资金</h2>
              <p class="sr-only">整体资金强度</p>
            </div>
            <span class="badge-outline">📊</span>
          </header>
          <section>
            <div class="metric-value" id="net-flow-stat">--</div>
            <p class="metric-sub">净流入 + 净流出总和</p>
          </section>
        </article>
        <article class="card metric">
          <header class="metric-row">
            <div>
              <h2 class="metric-label">市场温度</h2>
              <p class="sr-only">市场情绪</p>
            </div>
            <span class="badge-outline">🌡️</span>
          </header>
          <section>
            <div class="metric-value" id="emotion-degree">--</div>
            <p class="metric-sub">成交 <span id="emotion-balance">--</span> <span id="emotion-balchg">--</span> · 预估 <span id="emotion-preview">--</span></p>
          </section>
        </article>
        <article class="card metric">
          <header class="metric-row">
            <div>
              <h2 class="metric-label">涨停板</h2>
              <p class="sr-only">市场强度</p>
            </div>
            <span class="badge-outline">📋</span>
          </header>
          <section>
            <div class="metric-value" id="emotion-updown">--</div>
            <p class="metric-sub">封板率 <span id="emotion-ratio">--</span></p>
          </section>
        </article>
        <article class="card metric">
          <header class="metric-row">
            <div>
              <h2 class="metric-label">昨日涨停表现</h2>
              <p class="sr-only">溢价</p>
            </div>
            <span class="badge-outline">📊</span>
          </header>
          <section>
            <div class="metric-value" id="emotion-perf">--</div>
            <p class="metric-sub">高开 <span id="emotion-open">--</span> · 盈利 <span id="emotion-profit">--</span></p>
          </section>
        </article>
        <article class="card metric">
          <header class="metric-row">
            <div>
              <h2 class="metric-label">上涨 / 下跌</h2>
              <p class="sr-only">涨跌家数</p>
            </div>
            <span class="badge-outline">📈📉</span>
          </header>
          <section>
            <div class="metric-value" id="emotion-risefall">--</div>
            <p class="metric-sub">涨停 <span id="emotion-up">--</span> · 跌停 <span id="emotion-down">--</span></p>
          </section>
        </article>
      </section>

      <section class="panel chart-panel">
        <div class="chart-head">
          <div>
            <div class="chart-title">日内资金曲线</div>
            <div class="chart-note">把主力净流入前 10 和净流出前 10 的概念全部叠到同一张时间轴。光标所在位置，就是你当前查看的市场切片。</div>
            <div class="chart-stats">
              <span class="chart-filter-tags">
                <button class="btn-outline size-sm chart-filter-btn is-active" data-filter="all">全部</button>
                <button class="btn-outline size-sm chart-filter-btn" data-filter="top3">关注前三</button>
                <button class="btn-outline size-sm chart-filter-btn" data-filter="inflow">只看净流入</button>
                <button class="btn-outline size-sm chart-filter-btn" data-filter="outflow">只看净流出</button>
              </span>
            </div>
            <div class="featured-legend" id="featured-legend"></div>
          </div>
          <div class="speed-group">
            <button id="play-btn" class="btn" type="button">播放日内轨迹</button>
            <button class="btn-secondary speed-btn" data-speed="20" type="button">20x</button>
            <button class="btn-secondary speed-btn" data-speed="40" type="button">40x</button>
            <button class="btn-secondary speed-btn" data-speed="60" type="button">60x</button>

          </div>
        </div>
        <div id="chart"></div>
        <div class="chart-custom-legend" id="chart-custom-legend"></div>
        <div id="netflow-chart" style="height:120px;margin-top:8px;"></div>
        <div id="emotion-chart" style="height:180px;margin-top:8px;"></div>
        <div class="scrubber">
          <div class="scrubber-head">
            <div class="muted">时间进度</div>
            <kbd id="sample-progress">0 / 0</kbd>
          </div>
          <input id="timeline" class="timeline input w-full" type="range" min="0" max="0" value="0" step="1">
        </div>
      </section>

      <section class="panel concepts-panel">
        <div class="concepts-head">
          <div>
            <div class="chart-title" style="font-size:24px;">概念板块资金流</div>
            <div class="chart-note">左列为净流入概念，右列为净流出概念。可通过上方筛选器自由选择关注的板块。</div>
          </div>
          <div class="metric-sub">Top 20 Concepts</div>
        </div>
        <div class="concepts-grid" id="concepts-grid"></div>
      </section>
    </main>

    <script src="https://code.highcharts.com/12/highcharts.js"></script>
    <script>
      const REFRESH_MS = 10000;
      const BASE_PLAY_INTERVAL_MS = 100;
      const COLORS = [
        "#38bdf8",
        "#22c55e",
        "#f59e0b",
        "#a78bfa",
        "#f97316",
        "#14b8a6",
        "#8b5cf6",
        "#84cc16",
        "#0ea5e9",
        "#eab308",
        "#10b981",
        "#c084fc",
      ];

      const state = {
        data: null,
        index: 0,
        playing: false,
        timer: null,
        colorMap: {},
        playbackSpeed: 40,
        chartFilter: "all",
      };

      readUrlParams();

      const dateCombobox = document.getElementById("date-combobox");
      const dateTrigger = document.getElementById("date-combobox-trigger");
      const datePopover = document.getElementById("date-combobox-popover");
      const dateListbox = document.getElementById("date-combobox-listbox");
      const dateValueInput = document.getElementById("date-combobox-value");
      const dateFilterInput = datePopover ? datePopover.querySelector("input") : null;

      const playBtn = document.getElementById("play-btn");
      const latestBtn = document.getElementById("latest-btn");
      const timeline = document.getElementById("timeline");
      const speedButtons = Array.from(document.querySelectorAll(".speed-btn"));
      let chart;
      let netFlowChart;
      let emotionChart;
      let dateController;
      function initCombobox({ trigger, popover, listbox, valueInput, filterInput, onSelect }) {
        let open = false;
        let highlightedIndex = -1;

        function getVisibleOptions() {
          return Array.from(listbox.querySelectorAll('[role="option"]:not([hidden])'));
        }

        function openPopover() {
          open = true;
          popover.setAttribute("aria-hidden", "false");
          trigger.setAttribute("aria-expanded", "true");
          highlightedIndex = -1;
          updateHighlight();
          if (filterInput) {
            filterInput.value = "";
            filterOptions("");
            setTimeout(() => filterInput.focus(), 50);
          }
        }

        function closePopover() {
          open = false;
          popover.setAttribute("aria-hidden", "true");
          trigger.setAttribute("aria-expanded", "false");
          highlightedIndex = -1;
          updateHighlight();
        }

        function selectOption(optionEl) {
          const value = optionEl.getAttribute("data-value");
          const label = optionEl.querySelector(".option-label")?.textContent || optionEl.textContent.trim();
          valueInput.value = value;
          const triggerText = trigger.querySelector(".truncate");
          if (triggerText) triggerText.textContent = label;
          closePopover();
          if (onSelect) onSelect(value, label);
        }

        function updateHighlight() {
          const options = getVisibleOptions();
          options.forEach((opt, i) => {
            if (i === highlightedIndex) {
              opt.setAttribute("data-highlighted", "");
            } else {
              opt.removeAttribute("data-highlighted");
            }
          });
        }

        function filterOptions(query) {
          const lower = query.toLowerCase();
          const options = Array.from(listbox.querySelectorAll('[role="option"]'));
          options.forEach((opt) => {
            const text = opt.textContent.toLowerCase();
            if (!lower || text.includes(lower)) {
              opt.removeAttribute("hidden");
            } else {
              opt.setAttribute("hidden", "");
            }
          });
          highlightedIndex = -1;
          updateHighlight();
        }

        function focusOption(direction) {
          const options = getVisibleOptions();
          if (options.length === 0) return;
          if (direction === "next") {
            highlightedIndex = (highlightedIndex + 1) % options.length;
          } else if (direction === "prev") {
            highlightedIndex = highlightedIndex <= 0 ? options.length - 1 : highlightedIndex - 1;
          } else if (direction === "first") {
            highlightedIndex = 0;
          } else if (direction === "last") {
            highlightedIndex = options.length - 1;
          }
          updateHighlight();
          const opt = options[highlightedIndex];
          if (opt) opt.scrollIntoView({ block: "nearest" });
        }

        trigger.addEventListener("click", (e) => {
          e.stopPropagation();
          if (open) {
            closePopover();
          } else {
            openPopover();
          }
        });

        listbox.addEventListener("click", (e) => {
          const option = e.target.closest('[role="option"]');
          if (!option) return;
          selectOption(option);
        });

        if (filterInput) {
          filterInput.addEventListener("input", () => {
            filterOptions(filterInput.value);
          });

          filterInput.addEventListener("keydown", (e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              focusOption("next");
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              focusOption("prev");
            } else if (e.key === "Enter") {
              e.preventDefault();
              const options = getVisibleOptions();
              if (highlightedIndex >= 0 && highlightedIndex < options.length) {
                selectOption(options[highlightedIndex]);
              } else if (options.length > 0) {
                selectOption(options[0]);
              }
            } else if (e.key === "Escape") {
              closePopover();
              trigger.focus();
            }
          });

          filterInput.addEventListener("blur", () => {
            setTimeout(() => {
              if (open && !popover.contains(document.activeElement)) {
                closePopover();
              }
            }, 150);
          });
        }

        document.addEventListener("click", (e) => {
          if (open && !trigger.contains(e.target) && !popover.contains(e.target)) {
            closePopover();
          }
        });

        return {
          open: () => openPopover(),
          close: () => closePopover(),
          selectByValue(value) {
            if (!value) return;
            const option = listbox.querySelector('[role="option"][data-value="' + CSS.escape(value) + '"]');
            if (option) {
              const label = option.textContent.trim();
              const triggerText = trigger.querySelector(".truncate");
              if (triggerText) triggerText.textContent = label;
              valueInput.value = value;
            }
          },
        };
      }

      function formatFund(value) {
        const abs = Math.abs(value);
        if (abs >= 1e12) return (value / 1e12).toFixed(2) + "万亿";
        if (abs >= 1e8) return (value / 1e8).toFixed(abs >= 1e10 ? 0 : 2) + "亿";
        if (abs >= 1e4) return (value / 1e4).toFixed(2) + "万";
        return String(value);
      }

      function formatPercent(value) {
        return (value * 100).toFixed(2) + "%";
      }

      function readUrlParams() {
        // No longer store concept filters in URL
      }

      function syncUrl() {
        const params = new URLSearchParams(window.location.search);
        if (state.data?.requestedDate) {
          params.set("date", state.data.requestedDate);
        } else {
          params.delete("date");
        }
        const newUrl = window.location.pathname + (params.toString() ? "?" + params.toString() : "");
        history.replaceState(null, "", newUrl);
      }

      function concentrationMeta(sample) {
        const concepts = sample.concepts && sample.concepts.length
          ? sample.concepts
          : [...sample.leaders, ...sample.laggards];
        const all = concepts.slice(0, 20);
        const inflow = all.filter((item) => item.mainFundDiff > 0).sort((a, b) => b.mainFundDiff - a.mainFundDiff);
        const outflow = all.filter((item) => item.mainFundDiff < 0).sort((a, b) => a.mainFundDiff - b.mainFundDiff);

        const inflowTop3Abs = inflow.slice(0, 3).reduce((sum, item) => sum + item.mainFundDiff, 0);
        const outflowTop3Abs = outflow.slice(0, 3).reduce((sum, item) => sum + Math.abs(item.mainFundDiff || 0), 0);

        const inflowTotal = inflow.reduce((sum, item) => sum + item.mainFundDiff, 0);
        const outflowTotal = outflow.reduce((sum, item) => sum + Math.abs(item.mainFundDiff || 0), 0);

        const inflowShare = inflowTotal > 0 ? inflowTop3Abs / inflowTotal : 0;
        const outflowShare = outflowTotal > 0 ? outflowTop3Abs / outflowTotal : 0;

        function concentrationLabel(share) {
          if (share > 0.45) return "高集中";
          if (share >= 0.3) return "中等集中";
          return "分散";
        }

        return {
          inflowTop3Abs,
          outflowTop3Abs,
          inflowShare,
          outflowShare,
          inflowLabel: concentrationLabel(inflowShare),
          outflowLabel: concentrationLabel(outflowShare),
        };
      }

      function concentrationSeriesData(samples) {
        return samples.map((sample) => {
          const meta = concentrationMeta(sample);
          return {
            inflow: meta.inflowShare * 100,
            outflow: meta.outflowShare * 100,
          };
        });
      }

      function concentrationAxisRange(seriesData) {
        const allValues = seriesData.flatMap((d) => [d?.inflow ?? 0, d?.outflow ?? 0]);
        const visible = allValues.filter((value) => Number.isFinite(value));
        if (visible.length === 0) {
          return { min: 0, max: 100 };
        }

        const min = Math.min(...visible);
        const max = Math.max(...visible);
        const pad = Math.max(2, (max - min) * 0.35 || 4);
        return {
          min: Math.max(0, Math.floor((min - pad) * 10) / 10),
          max: Math.min(100, Math.ceil((max + pad) * 10) / 10),
        };
      }

      function formatSessionLabel(session) {
        const map = {
          morning: "早盘",
          afternoon: "午盘",
          lunch_break: "午间休市",
          closed: "休市",
        };
        return map[session] || session || "--";
      }

      function formatStatusTime(value) {
        if (!value) return "--";
        const date = new Date(value);
        return new Intl.DateTimeFormat("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Shanghai",
        }).format(date);
      }

      function buildColorMap(data) {
        const conceptCodes = data.chart.series.map((item) => item.code);
        const allCodes = [...conceptCodes];
        state.colorMap = Object.fromEntries(
          allCodes.map((code, index) => [code, COLORS[index % COLORS.length]]),
        );
      }

      function colorForCode(code) {
        return state.colorMap[code] || COLORS[0];
      }

      function setComboboxValue(value) {
        if (dateController) dateController.selectByValue(value);
      }

      function renderDateOptions(availableDates, selectedDate) {
        dateListbox.innerHTML = availableDates
          .map((date) => '<div role="option" data-value="' + date + '">' + date + '</div>')
          .join("");
        setComboboxValue(selectedDate);
      }

      function updateSliderPaint() {
        const min = parseFloat(timeline.min || 0);
        const max = parseFloat(timeline.max || 100);
        const value = parseFloat(timeline.value || 0);
        const percent = max === min ? 0 : ((value - min) / (max - min)) * 100;
        timeline.style.setProperty("--slider-value", percent + "%");
      }

      function updateSpeedButtons() {
        speedButtons.forEach((button) => {
          button.classList.toggle("is-active", Number(button.dataset.speed) === state.playbackSpeed);
        });
      }

      async function fetchStatus() {
        const response = await fetch("/api/status", { cache: "no-store" });
        if (!response.ok) return;
        const status = await response.json();
        document.getElementById("status-now").textContent = status.chinaNow?.isoLike || "--";
        document.getElementById("status-session").textContent = formatSessionLabel(status.currentTradingSession);
        document.getElementById("status-next-run").textContent = formatStatusTime(status.nextRunAt);
        document.getElementById("status-samples").textContent = String(status.samplesToday ?? "--");
      }

      function stopPlayback() {
        if (state.timer) clearInterval(state.timer);
        state.timer = null;
        state.playing = false;
        playBtn.textContent = "播放日内轨迹";
      }

      function startPlayback() {
        if (!state.data || state.data.samples.length === 0) return;
        stopPlayback();
        state.playing = true;
        playBtn.textContent = "暂停回放";
        state.timer = setInterval(() => {
          if (state.index >= state.data.samples.length - 1) {
            stopPlayback();
            return;
          }
          setIndex(state.index + 1);
        }, Math.max(8, Math.floor(BASE_PLAY_INTERVAL_MS / state.playbackSpeed)));
      }

      function togglePlayback() {
        if (state.playing) {
          stopPlayback();
        } else {
          if (state.index >= state.data.samples.length - 1) {
            setIndex(0);
          }
          startPlayback();
        }
      }

      function ensureNetFlowChart() {
        if (netFlowChart) return netFlowChart;
        netFlowChart = Highcharts.chart("netflow-chart", {
          chart: {
            backgroundColor: "transparent",
            animation: false,
            spacing: [0, 8, 4, 8],
            height: 120,
          },
          title: { text: "市场净资金", align: "left", style: { color: "rgba(244,244,245,0.7)", fontSize: "11px", fontWeight: "400" } },
          credits: { enabled: false },
          exporting: { enabled: false },
          legend: { enabled: false },
          xAxis: {
            categories: [],
            tickLength: 0,
            lineWidth: 0,
            labels: { enabled: false },
          },
          yAxis: {
            title: { text: null },
            gridLineWidth: 1,
            gridLineColor: "rgba(244,244,245,0.06)",
            labels: {
              style: { color: "rgba(244,244,245,0.5)", fontSize: "10px" },
              formatter() { return formatFund(this.value); },
            },
            plotLines: [{ value: 0, color: "rgba(250,250,250,0.2)", width: 1, zIndex: 4 }],
          },
          tooltip: {
            backgroundColor: "rgba(9,9,11,0.96)",
            borderColor: "rgba(244,244,245,0.08)",
            style: { color: "#fafafa", fontSize: "11px" },
            useHTML: true,
            formatter() { return '<div style="font-size:12px;font-weight:600;margin-bottom:4px;">' + this.x + '</div><div style="display:flex;justify-content:space-between;gap:12px;font-size:11px;"><span>净资金</span><span style="font-weight:500;">' + formatFund(this.y) + '</span></div>'; },
          },
          plotOptions: {
            column: {
              grouping: false,
              groupPadding: 0,
              pointPadding: 0.05,
              borderWidth: 0,
              animation: { duration: 200 },
            },
          },
          series: [{
            id: "netflow-bars",
            type: "column",
            name: "净资金",
            zIndex: 1,
            data: [],
          }],
        });
        return netFlowChart;
      }

      function ensureEmotionChart() {
        if (emotionChart) return emotionChart;
        emotionChart = Highcharts.chart("emotion-chart", {
          chart: {
            backgroundColor: "transparent",
            animation: false,
            spacing: [0, 8, 4, 8],
            height: 160,
          },
          title: { text: "市场情绪", align: "left", style: { color: "rgba(244,244,245,0.7)", fontSize: "11px", fontWeight: "400" } },
          credits: { enabled: false },
          exporting: { enabled: false },
          legend: { enabled: true, align: "right", verticalAlign: "top", layout: "horizontal", itemStyle: { color: "rgba(244,244,245,0.7)", fontSize: "10px" }, itemDistance: 14, symbolRadius: 2, symbolWidth: 14, symbolHeight: 3, margin: 0 },
          xAxis: {
            categories: [],
            tickLength: 0,
            lineWidth: 0,
            labels: { enabled: false },
          },
          yAxis: [{
            title: { text: null },
            gridLineWidth: 1,
            gridLineColor: "rgba(244,244,245,0.06)",
            labels: { style: { color: "rgba(244,244,245,0.5)", fontSize: "10px" } },
          }, {
            title: { text: null },
            opposite: true,
            gridLineWidth: 0,
            labels: { style: { color: "rgba(244,244,245,0.4)", fontSize: "10px" }, formatter() { return this.value + "万亿"; } },
          }],
          tooltip: {
            shared: true,
            useHTML: true,
            backgroundColor: "rgba(9,9,11,0.96)",
            borderColor: "rgba(244,244,245,0.08)",
            style: { color: "#fafafa", fontSize: "11px" },
            formatter() {
              return '<div style="font-size:12px;font-weight:600;margin-bottom:4px;">' + this.x + '</div>' +
                this.points.map((p) =>
                  '<div style="display:flex;justify-content:space-between;gap:12px;font-size:11px;line-height:1.4;">' +
                  '<span>' + p.series.name + '</span>' +
                  '<span style="font-weight:500;">' + (p.series.options.id === "emo-balance" || p.series.options.id === "emo-preview" ? p.y + "万亿" : p.y) + '</span>' +
                  '</div>'
                ).join("");
            },
          },
          plotOptions: {
            series: { animation: { duration: 200 }, marker: { enabled: false } },
          },
          series: [{
            id: "emo-degree", type: "spline", name: "市场温度", yAxis: 0, color: "#f59e0b", lineWidth: 2, zIndex: 2, data: [],
          }, {
            id: "emo-balance", type: "area", name: "成交量", yAxis: 1, color: "rgba(59,130,246,0.2)", lineColor: "rgba(59,130,246,0.6)", lineWidth: 1.5, fillOpacity: 0.15, zIndex: 1, data: [],
          }, {
            id: "emo-preview", type: "spline", name: "预估成交量", yAxis: 1, color: "rgba(59,130,246,0.5)", lineWidth: 1.2, dashStyle: "Dash", zIndex: 0, data: [],
          }],
        });
        return emotionChart;
      }

      function ensureChart() {
        if (chart) return chart;
        chart = Highcharts.chart("chart", {
          chart: {
            backgroundColor: "transparent",
            plotBackgroundColor: "rgba(9, 9, 11, 0.18)",
            animation: false,
            spacing: [12, 8, 8, 8],
            marginBottom: 16,
          },
          title: { text: null },
          credits: { enabled: false },
          exporting: { enabled: false },
          legend: {
            enabled: false,
          },
          xAxis: {
            categories: [],
            tickLength: 0,
            lineColor: "rgba(244,244,245,0.14)",
            gridLineWidth: 1,
            gridLineColor: "rgba(244,244,245,0.05)",
            labels: {
              formatter() {
                const label = String(this.value || "");
                const index = this.pos;
                const total = this.axis.categories.length - 1;
                const parts = label.split(":");
                const hh = parts[0];
                const mm = parts[1];
                if (index === 0 || index === total) return hh + ":" + mm;
                if (mm === "00" || mm === "30") return hh + ":" + mm;
                return "";
              },
              style: { color: "rgba(244,244,245,0.62)" },
            },
          },
          yAxis: [
            {
              title: { text: null },
              gridLineWidth: 1,
              gridLineColor: "rgba(244,244,245,0.08)",
              labels: {
                style: { color: "rgba(244,244,245,0.62)" },
                formatter() { return formatFund(this.value); },
              },
              plotLines: [{ id: "zero-line", value: 0, color: "rgba(250,250,250,0.24)", width: 1.2, zIndex: 4 }],
            },
            {
              title: { text: null },
              opposite: true,
              gridLineWidth: 0,
              labels: {
                style: { color: "rgba(244,244,245,0.52)" },
                formatter() { return this.value + "%"; },
              },
            },
          ],
          tooltip: {
            shared: true,
            backgroundColor: "rgba(9,9,11,0.96)",
            borderColor: "rgba(244,244,245,0.08)",
            style: { color: "#fafafa" },
            useHTML: true,
            formatter() {
              const pts = this.points.filter((p) => p.series.options.id !== "net-flow-bars" && !p.series.options.id?.startsWith("conc-"));
              const inflowPts = pts.filter((p) => p.y > 0).sort((a, b) => b.y - a.y);
              const outflowPts = pts.filter((p) => p.y < 0).sort((a, b) => a.y - b.y);

              let html = '<div style="font-size:13px;font-weight:600;margin-bottom:6px;">' + this.x + '</div>';
              html += '<div style="display:flex;gap:16px;">';

              // Inflow column
              html += '<div style="flex:1;min-width:140px;">';
              html += '<div style="font-size:10px;color:#dc2626;margin-bottom:4px;">📈 净流入</div>';
              inflowPts.forEach((p) => {
                html += '<div style="display:flex;justify-content:space-between;gap:8px;font-size:11px;line-height:1.5;">';
                html += '<span style="color:' + p.color + ';">● ' + p.series.name + '</span>';
                html += '<span style="color:' + (p.y >= 0 ? '#dc2626' : '#16a34a') + ';font-weight:500;">' + formatFund(p.y) + '</span>';
                html += '</div>';
              });
              html += '</div>';

              // Outflow column
              html += '<div style="flex:1;min-width:140px;">';
              html += '<div style="font-size:10px;color:#16a34a;margin-bottom:4px;">📉 净流出</div>';
              outflowPts.forEach((p) => {
                html += '<div style="display:flex;justify-content:space-between;gap:8px;font-size:11px;line-height:1.5;">';
                html += '<span style="color:' + p.color + ';">● ' + p.series.name + '</span>';
                html += '<span style="color:' + (p.y >= 0 ? '#dc2626' : '#16a34a') + ';font-weight:500;">' + formatFund(p.y) + '</span>';
                html += '</div>';
              });
              html += '</div>';

              html += '</div>';
              return html;
            },
          },
          plotOptions: {
            series: {
              animation: { duration: 350 },
              marker: { enabled: false },
              lineWidth: 1.8,
              opacity: 0.82,
              connectNulls: false,
              states: {
                inactive: {
                  opacity: 0.12,
                },
              },
            },
          },
          series: [],
        });
        return chart;
      }

      function visiblePlaybackData(dataPoints) {
        return dataPoints.map((value, index) => (index <= state.index ? value : null));
      }

      function trailPlaybackData(dataPoints, windowSize = 5) {
        const start = Math.max(0, state.index - windowSize + 1);
        return dataPoints.map((value, index) => (
          index >= start && index <= state.index ? value : null
        ));
      }

      function featuredSeries(data) {
        const sample = data.samples?.[state.index];
        const concepts = sample?.concepts || [];
        const inflow = concepts.filter((item) => item.mainFundDiff > 0).sort((a, b) => b.mainFundDiff - a.mainFundDiff);
        const outflow = concepts.filter((item) => item.mainFundDiff < 0).sort((a, b) => a.mainFundDiff - b.mainFundDiff);
        const symbols = ["circle", "triangle", "square"];

        return {
          top: inflow.slice(0, 3).map((item, index) => ({
            ...item,
            symbol: symbols[index] || "circle",
          })),
          bottom: outflow.slice(0, 3).map((item, index) => ({
            ...item,
            symbol: symbols[index] || "circle",
          })),
        };
      }

      function renderFeaturedLegend(data) {
        const featured = featuredSeries(data);
        const items = [
          ...featured.top.map((item, index) => ({
            ...item,
            rankLabel: "Top " + (index + 1),
            tone: "up",
          })),
          ...featured.bottom.map((item, index) => ({
            ...item,
            rankLabel: "Bottom " + (index + 1),
            tone: "down",
          })),
        ];

        document.getElementById("featured-legend").innerHTML = items.map((item) => {
          const shapeClass = item.symbol === "triangle"
            ? "shape-triangle"
            : item.symbol === "square"
              ? "shape-square"
              : "shape-circle";
          const color = colorForCode(item.code);
          return '<div class="featured-item">' +
            '<span class="featured-shape ' + shapeClass + '" style="color:' + color + ';background:' + (item.symbol === "triangle" ? "transparent" : color) + '"></span>' +
            '<span class="' + item.tone + '">' + item.rankLabel + '</span>' +
            '<span>' + item.name + '</span>' +
          '</div>';
        }).join("");
      }

      function renderCustomLegend(data) {
        const series = data.chart.series;
        const inflow = series.filter((item) => {
          const last = item.data.findLast((v) => v != null);
          return last != null && last > 0;
        });
        const outflow = series.filter((item) => {
          const last = item.data.findLast((v) => v != null);
          return last != null && last < 0;
        });

        function legendItem(item) {
          const color = colorForCode(item.code);
          return '<span class="chart-legend-item" data-code="' + item.code + '">' +
            '<span class="chart-legend-swatch" style="background:' + color + ';"></span>' +
            '<span>' + item.name + '</span>' +
          '</span>';
        }

        const container = document.getElementById("chart-custom-legend");
        container.innerHTML =
          '<div class="chart-legend-col">' +
            '<h4 class="up">📈 净流入</h4>' +
            inflow.map(legendItem).join("") +
          '</div>' +
          '<div class="chart-legend-col">' +
            '<h4 class="down">📉 净流出</h4>' +
            outflow.map(legendItem).join("") +
          '</div>';

        // Click to toggle series visibility
        container.querySelectorAll(".chart-legend-item").forEach((el) => {
          el.addEventListener("click", () => {
            const code = el.dataset.code;
            const s = chart.series.find((ser) => ser.options.id === code);
            if (s) {
              if (s.visible) {
                s.hide();
                el.classList.add("is-hidden");
              } else {
                s.show();
                el.classList.remove("is-hidden");
              }
            }
          });
        });
      }

      function renderChart(data) {
        const currentChart = ensureChart();
        currentChart.xAxis[0].setCategories(data.sampleTimes, false);
        let visibleSeries = data.chart.series;

        // Apply chart filter
        if (state.chartFilter === "inflow") {
          visibleSeries = visibleSeries.filter((item) => {
            const last = item.data.findLast((v) => v != null);
            return last != null && last > 0;
          });
        } else if (state.chartFilter === "outflow") {
          visibleSeries = visibleSeries.filter((item) => {
            const last = item.data.findLast((v) => v != null);
            return last != null && last < 0;
          });
        } else if (state.chartFilter === "top3") {
          const sample = data.samples[state.index];
          const concepts = sample?.concepts || [];
          const top3In = concepts.filter((c) => c.mainFundDiff > 0).slice(0, 3).map((c) => c.code);
          const top3Out = concepts.filter((c) => c.mainFundDiff < 0).slice(0, 3).map((c) => c.code);
          const top3Codes = new Set([...top3In, ...top3Out]);
          visibleSeries = visibleSeries.filter((item) => top3Codes.has(item.code));
        }
        const featured = featuredSeries(data);
        const concentrationData = visiblePlaybackData(concentrationSeriesData(data.samples));
        const concentrationRange = concentrationAxisRange(concentrationData);

        currentChart.yAxis[1].setExtremes(concentrationRange.min, concentrationRange.max, false, false);

        visibleSeries.forEach((item) => {
          const existing = currentChart.series.find((series) => series.options.id === item.code);
          const color = colorForCode(item.code);
          const options = {
            id: item.code,
            type: "spline",
            name: item.name,
            color,
            zoneAxis: "y",
            zones: [
              { value: 0, color: "#22c55e" },
              { color },
            ],
            data: visiblePlaybackData(item.data),
          };

          if (existing) {
            existing.update({ name: item.name, color, zones: options.zones }, false);
            existing.setData(options.data, false, { duration: 300 });
          } else {
            currentChart.addSeries(options, false, { duration: 300 });
          }
        });

        // Inflow concentration
        const concInData = concentrationData.map((d) => d?.inflow ?? null);
        const concInPt = concInData[state.index];
        [{id:"conc-inflow",name:"流入集中度",color:"#dc2626",dash:"ShortDash",data:concInData},
         {id:"conc-outflow",name:"流出集中度",color:"#16a34a",dash:"ShortDot",data:concentrationData.map((d) => d?.outflow ?? null)}].forEach((sc) => {
          const ex = currentChart.series.find((s) => s.options.id === sc.id);
          const opts = { id:sc.id, type:"spline", name:sc.name, yAxis:1, color:sc.color, lineWidth:2.4, dashStyle:sc.dash, enableMouseTracking:true, marker:{enabled:false}, data:sc.data, zIndex:5 };
          if (ex) { ex.setData(sc.data, false, { duration: 260 }); }
          else { currentChart.addSeries(opts, false, { duration: 260 }); }
        });
        [{id:"conc-inflow-marker",y:concInPt,symbol:"diamond",color:"#dc2626"},
         {id:"conc-outflow-marker",y:concentrationData[state.index]?.outflow ?? null,symbol:"triangle",color:"#16a34a"}].forEach((sc) => {
          const ex = currentChart.series.find((s) => s.options.id === sc.id);
          const opts = { id:sc.id, type:"scatter", name:sc.id, yAxis:1, showInLegend:false, enableMouseTracking:false, zIndex:8, data:sc.y==null?[]:[{x:state.index,y:sc.y,className:"top-marker"}], marker:{enabled:true,symbol:sc.symbol,radius:5,lineWidth:2,lineColor:"rgba(255,255,255,0.85)",fillColor:sc.color} };
          if (ex) { ex.update({marker:opts.marker},false); ex.setData(opts.data,false,{duration:220}); }
          else { currentChart.addSeries(opts,false,{duration:220}); }
        });

        featured.top.forEach((item) => {
          const baseSeries = visibleSeries.find((series) => series.code === item.code);
          if (!baseSeries) return;

          const markerId = "marker-" + item.code;
          const trailId = "trail-" + item.code;
          const existing = currentChart.series.find((series) => series.options.id === markerId);
          const trailExisting = currentChart.series.find((series) => series.options.id === trailId);
          const markerColor = colorForCode(item.code);
          const visibleData = visiblePlaybackData(baseSeries.data);
          const trailData = trailPlaybackData(baseSeries.data, 6);
          const pointValue = visibleData[state.index];
          const markerSeries = {
            id: markerId,
            type: "scatter",
            name: item.name + " marker",
            linkedTo: item.code,
            enableMouseTracking: false,
            showInLegend: false,
            zIndex: 7,
            data: pointValue == null ? [] : [{
              x: state.index,
              y: pointValue,
              className: "top-marker",
            }],
            marker: {
              enabled: true,
              symbol: item.symbol,
              radius: 7,
              lineWidth: 2,
              lineColor: "rgba(255,255,255,0.85)",
              fillColor: markerColor,
            },
          };
          const trailSeries = {
            id: trailId,
            type: "spline",
            name: item.name + " trail",
            linkedTo: item.code,
            enableMouseTracking: false,
            showInLegend: false,
            zIndex: 6,
            className: "trail-series",
            color: markerColor,
            lineWidth: 4,
            opacity: 0.35,
            data: trailData,
          };

          if (existing) {
            existing.update({ marker: markerSeries.marker }, false);
            existing.setData(markerSeries.data, false, { duration: 240 });
          } else {
            currentChart.addSeries(markerSeries, false, { duration: 240 });
          }

          if (trailExisting) {
            trailExisting.setData(trailSeries.data, false, { duration: 240 });
          } else {
            currentChart.addSeries(trailSeries, false, { duration: 240 });
          }
        });

        featured.bottom.forEach((item) => {
          const baseSeries = visibleSeries.find((series) => series.code === item.code);
          if (!baseSeries) return;

          const markerId = "marker-bottom-" + item.code;
          const existing = currentChart.series.find((series) => series.options.id === markerId);
          const markerColor = colorForCode(item.code);
          const visibleData = visiblePlaybackData(baseSeries.data);
          const pointValue = visibleData[state.index];
          const markerSeries = {
            id: markerId,
            type: "scatter",
            name: item.name + " bottom marker",
            linkedTo: item.code,
            enableMouseTracking: false,
            showInLegend: false,
            zIndex: 6,
            data: pointValue == null ? [] : [{
              x: state.index,
              y: pointValue,
              className: "bottom-marker",
            }],
            marker: {
              enabled: true,
              symbol: item.symbol,
              radius: 4.5,
              lineWidth: 1,
              lineColor: "rgba(255,255,255,0.4)",
              fillColor: markerColor,
            },
          };

          if (existing) {
            existing.update({ marker: markerSeries.marker }, false);
            existing.setData(markerSeries.data, false, { duration: 220 });
          } else {
            currentChart.addSeries(markerSeries, false, { duration: 220 });
          }
        });

        currentChart.series
          .filter((series) => {
            const isPrimary = visibleSeries.some((item) => item.code === series.options.id);
            const isConcentration = series.options.id === "conc-inflow" || series.options.id === "conc-outflow";
            const isTopMarker = featured.top.some((item) => ("marker-" + item.code) === series.options.id);
            const isTrail = featured.top.some((item) => ("trail-" + item.code) === series.options.id);
            const isBottomMarker = featured.bottom.some((item) => ("marker-bottom-" + item.code) === series.options.id);
            const isConcentrationMarker = series.options.id === "conc-inflow-marker" || series.options.id === "conc-outflow-marker";
            return !isPrimary && !isConcentration && !isConcentrationMarker && !isTopMarker && !isTrail && !isBottomMarker;
          })
          .forEach((series) => series.remove(false));

        // Net flow bar chart (separate chart below)
        const nfChart = ensureNetFlowChart();
        const netFlowData = data.chart.netFlow || [];
        const netFlowVisible = visiblePlaybackData(netFlowData);
        nfChart.xAxis[0].setCategories(data.sampleTimes, false);
        const nfSeries = nfChart.series[0];
        nfSeries.setData(netFlowVisible.map((v, i) => ({
          x: i,
          y: v,
          color: v != null ? (v >= 0 ? "rgba(22,163,74,0.5)" : "rgba(220,38,38,0.5)") : "transparent",
        })), false);
        nfChart.redraw();
        // Draw cursor line on net flow chart too
        nfChart.xAxis[0].removePlotLine("nf-playhead");
        nfChart.xAxis[0].addPlotLine({ id: "nf-playhead", value: state.index, color: "#ffd36b", width: 1.5, zIndex: 5 });

        // Remove inline net flow series from main chart if it exists
        const oldNf = currentChart.series.find((s) => s.options.id === "net-flow-bars");
        if (oldNf) oldNf.remove(false);

        // Emotion chart (temperature + volume, shared xAxis)
        const emoChart = ensureEmotionChart();
        const emoData = data.emotionSeries || { degree: [], balance: [] };
        emoChart.xAxis[0].setCategories(data.sampleTimes, false);
        const degreeSeries = emoChart.series.find((s) => s.options.id === "emo-degree");
        const balanceSeries = emoChart.series.find((s) => s.options.id === "emo-balance");
        const previewSeries = emoChart.series.find((s) => s.options.id === "emo-preview");
        degreeSeries.setData(visiblePlaybackData(emoData.degree), false);
        balanceSeries.setData(visiblePlaybackData(emoData.balance), false);
        previewSeries.setData(visiblePlaybackData(emoData.previewBalance || []), false);
        emoChart.redraw();
        emoChart.xAxis[0].removePlotLine("emo-playhead");
        emoChart.xAxis[0].addPlotLine({ id: "emo-playhead", value: state.index, color: "#ffd36b", width: 1.5, zIndex: 5 });

        currentChart.redraw();
        drawCursor();
        renderFeaturedLegend(data);
        renderCustomLegend(data);
      }

      function drawCursor() {
        if (!chart || !state.data) return;
        const xAxis = chart.xAxis[0];
        const label = state.data.sampleTimes[state.index];

        xAxis.removePlotLine("playhead");
        xAxis.addPlotLine({
          id: "playhead",
          value: state.index,
          color: "#ffd36b",
          width: 1.5,
          zIndex: 5,
          dashStyle: "Dash",
          label: {
            text: label,
            rotation: 0,
            y: 14,
            style: {
              color: "#ffd36b",
              fontSize: "10px",
            },
          },
        });
      }

      function renderConceptGrid(sample) {
        const concepts = sample.concepts && sample.concepts.length
          ? sample.concepts
          : [...sample.leaders, ...sample.laggards];
        const filtered = concepts;
        const allInflow = filtered.filter((item) => item.mainFundDiff >= 0);
        const allOutflow = filtered.filter((item) => item.mainFundDiff < 0);
        const inflow = allInflow.slice(0, 10);
        const outflow = allOutflow.slice(0, 10);

        function renderColumn(items, label, colorClass, total) {
          if (items.length === 0) {
            return '<div class="concept-column">' +
              '<h3 class="concept-column-title ' + colorClass + '">' + label + ' (0/' + total + ')</h3>' +
              '<p class="muted" style="padding:20px 0;text-align:center;">暂无数据</p>' +
            '</div>';
          }
          let idx = 0;
          return '<div class="concept-column">' +
            '<h3 class="concept-column-title ' + colorClass + '">' + label + ' (' + items.length + '/' + total + ')</h3>' +
            items.map((item) => {
              idx += 1;
              const flowClass = item.mainFundDiff >= 0 ? "flow-in" : "flow-out";
              const valueClass = item.mainFundDiff >= 0 ? "up" : "down";
              const changeClass = item.change >= 0 ? "up" : "down";
              const sideLabel = item.mainFundDiff >= 0 ? "净流入" : "净流出";
              return '<article class="card concept-item group/item ' + flowClass + '" data-tooltip="' + item.name + ' · ' + sideLabel + '" data-side="top">' +
                '<header class="concept-top">' +
                  '<div><div class="concept-rank">#' + String(idx).padStart(2, "0") + '</div><h2 class="concept-name">' + item.name + '</h2></div>' +
                  '<span class="' + valueClass + '" style="font-weight:600;font-size:11px;">' + sideLabel + '</span>' +
                '</header>' +
                '<section>' +
                  '<div class="concept-flow ' + valueClass + '">' + formatFund(item.mainFundDiff) + '</div>' +
                  '<div class="' + changeClass + '" style="font-size:12px;">涨跌幅 ' + formatPercent(item.change) + '</div>' +
                '</section>' +
                '<footer class="concept-foot">' +
                  '<p class="muted">代表股 ' + item.leaderStock + '</p>' +
                '</footer>' +
              '</article>';
            }).join("") +
          '</div>';
        }

        document.getElementById("concepts-grid").innerHTML =
          renderColumn(inflow, "📈 净流入", "up", allInflow.length) +
          renderColumn(outflow, "📉 净流出", "down", allOutflow.length);

        document.getElementById("concepts-grid").classList.toggle("has-two-columns", inflow.length > 0 && outflow.length > 0);
      }

      function renderMetrics(sample) {
        const concentration = concentrationMeta(sample);
        document.getElementById("current-time").textContent = state.data.sampleTimes[state.index] || "--:--:--";
        document.getElementById("updated-at").textContent = new Intl.DateTimeFormat("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date(state.data.updatedAt));
        document.getElementById("selected-date").textContent = state.data.requestedDate;
        const infCnt = sample.concepts?.filter((c) => c.mainFundDiff > 0).length || 0;
        const outfCnt = sample.concepts?.filter((c) => c.mainFundDiff < 0).length || 0;
        document.getElementById("positive-count").textContent = infCnt + " / " + outfCnt;
        document.getElementById("positive-sub").textContent = "流入 " + infCnt + " 个 · 流出 " + outfCnt + " 个";
        document.getElementById("inflow-top3-card").textContent = formatFund(concentration.inflowTop3Abs);
        document.getElementById("outflow-top3-card").textContent = formatFund(concentration.outflowTop3Abs);
        document.getElementById("top-three-share").textContent = formatPercent(concentration.inflowShare) + " " + concentration.inflowLabel;
        document.getElementById("concentration-badge").textContent = formatPercent(concentration.outflowShare) + " " + concentration.outflowLabel;
        // Net flow
        const all = [...sample.leaders, ...sample.laggards];
        const netFlow = all.reduce((sum, item) => sum + (item.mainFundDiff || 0), 0);
        const netEl = document.getElementById("net-flow-stat");
        netEl.textContent = formatFund(netFlow);
        netEl.className = "metric-value " + (netFlow >= 0 ? "up" : "down");
        document.getElementById("sample-progress").textContent = (state.index + 1) + " / " + state.data.samples.length;
        renderEmotion(state.data);
      }

      function renderEmotion(data) {
        const emo = data.emotion || {};
        document.getElementById("emotion-degree").textContent = "温度 " + (emo.degree || "--") + "°";
        document.getElementById("emotion-balance").textContent = emo.balanceStr || "--";
        const chgEl = document.getElementById("emotion-balchg");
        const chg = emo.balanceChange || 0;
        chgEl.textContent = (chg >= 0 ? "+" : "") + formatFund(chg);
        chgEl.className = chg >= 0 ? "up" : "down";
        document.getElementById("emotion-preview").textContent = emo.previewBalanceStr || "--";
        document.getElementById("emotion-updown").textContent = (emo.riseNum || "--") + " / " + (emo.fallNum || "--");
        document.getElementById("emotion-ratio").textContent = (emo.upRatio ? emo.upRatio + "%" : "--");
        document.getElementById("emotion-perf").textContent = emo.performance ? emo.performance + "%" : "--";
        document.getElementById("emotion-open").textContent = emo.upOpenRatio ? emo.upOpenRatio + "%" : "--";
        document.getElementById("emotion-profit").textContent = emo.profitRatio ? emo.profitRatio + "%" : "--";
        document.getElementById("emotion-risefall").textContent = (emo.riseNum || "--") + " / " + (emo.fallNum || "--");
        document.getElementById("emotion-up").textContent = emo.upNum || "--";
        document.getElementById("emotion-down").textContent = emo.downNum || "--";
      }

      function setIndex(index) {
        if (!state.data) return;
        state.index = Math.max(0, Math.min(index, state.data.samples.length - 1));
        timeline.value = String(state.index);
        updateSliderPaint();
        const sample = state.data.samples[state.index];
        renderChart(state.data);
        renderMetrics(sample);
        renderConceptGrid(sample);
      }

      async function fetchDay(date) {
        const query = date ? "?date=" + encodeURIComponent(date) : "";
        const response = await fetch("/api/finance" + query, { cache: "no-store" });
        if (!response.ok) {
          throw new Error("加载交易日数据失败");
        }

        const data = await response.json();
        buildColorMap(data);
        state.data = data;
        state.index = data.initialIndex;

        if (data.availableDates.length > 0) {
          renderDateOptions(data.availableDates, data.requestedDate);
        }
        syncUrl();

        timeline.max = String(Math.max(0, data.samples.length - 1));
        renderChart(data);
        setIndex(state.index);
        updateSliderPaint();
      }

      async function refreshLiveIfNeeded() {
        if (!state.data) return;
        if (state.data.requestedDate !== state.data.latestDate) return;
        if (state.playing) return;

        const currentDate = state.data.requestedDate;
        const keepAtEnd = state.index >= state.data.samples.length - 1;
        await fetchDay(currentDate);
        if (!keepAtEnd) {
          setIndex(Math.min(state.index, state.data.samples.length - 1));
        }
      }

      dateController = initCombobox({
        trigger: dateTrigger,
        popover: datePopover,
        listbox: dateListbox,
        valueInput: dateValueInput,
        filterInput: dateFilterInput,
        onSelect: async (value) => {
          stopPlayback();
          await fetchDay(value);
          syncUrl();
        },
      });

      playBtn.addEventListener("click", togglePlayback);
      latestBtn.addEventListener("click", async () => {
        stopPlayback();
        await fetchDay();
      });
      timeline.addEventListener("input", () => {
        stopPlayback();
        setIndex(Number(timeline.value));
        updateSliderPaint();
      });
      speedButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const nextSpeed = Number(button.dataset.speed) || 1;
          state.playbackSpeed = nextSpeed;
          updateSpeedButtons();
          if (state.playing) {
            startPlayback();
          }
        });
      });


      const filterButtons = Array.from(document.querySelectorAll(".chart-filter-btn"));
      filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          state.chartFilter = btn.dataset.filter;
          filterButtons.forEach((b) => b.classList.toggle("is-active", b.dataset.filter === state.chartFilter));
          if (state.data) renderChart(state.data);
        });
      });

      fetchDay().then(() => {
        fetchStatus();
        updateSpeedButtons();
        updateSliderPaint();
        setInterval(refreshLiveIfNeeded, REFRESH_MS);
        setInterval(fetchStatus, REFRESH_MS);
      });
    </script>
  </body>
</html>`;
}
