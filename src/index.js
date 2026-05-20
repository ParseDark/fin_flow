import { DurableObject } from "cloudflare:workers";

const API_URL =
  "https://x-quote.cls.cn/web_quote/plate/plate_list?app=CailianpressWeb&os=web&page=1&rever=1&sv=8.4.6&type=concept&way=main_fund_diff&sign=2cfab3ce449fe7f69f25e951003ed082";

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
    const response = await fetch(API_URL, { headers: REQUEST_HEADERS });
    if (!response.ok) {
      throw new Error(`Upstream request failed: ${response.status}`);
    }

    const json = await response.json();
    const list = json?.data?.plate_data || [];
    const groups = buildFlowGroups(list);

    const latestSnapshot = {
      updatedAt: new Date().toISOString(),
      headline: summarizeHeadline(list),
      leaders: groups.leaders,
      laggards: groups.laggards,
      concepts: groups.ranking,
      ranking: groups.ranking,
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
  const leaders = normalized
    .filter((item) => Number.isFinite(item.mainFundDiff) && item.mainFundDiff > 0)
    .sort((a, b) => b.mainFundDiff - a.mainFundDiff)
    .slice(0, FLOW_GROUP_SIZE);

  const laggards = normalized
    .filter((item) => Number.isFinite(item.mainFundDiff) && item.mainFundDiff < 0)
    .sort((a, b) => a.mainFundDiff - b.mainFundDiff)
    .slice(0, FLOW_GROUP_SIZE);

  const ranking = normalized
    .slice()
    .sort((a, b) => Math.abs(b.mainFundDiff) - Math.abs(a.mainFundDiff))
    .slice(0, DISPLAY_CONCEPT_COUNT);

  return { leaders, laggards, ranking };
}

function compactSample(snapshot) {
  return {
    updatedAt: snapshot.updatedAt,
    headline: snapshot.headline,
    leaders: snapshot.leaders.map(compactItem),
    laggards: snapshot.laggards.map(compactItem),
    concepts: snapshot.concepts.map(compactItem),
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
  const tracked = latest.concepts?.length ? latest.concepts : [...latest.leaders, ...latest.laggards];
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
        --up: #15803d;
        --down: #be123c;
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
        --up: #4ade80;
        --down: #fb7185;
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

      .hero-badge {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        width: fit-content;
        padding: 10px 14px;
        border: 1px solid var(--line);
        border-radius: 999px;
        background: rgba(15, 23, 42, 0.03);
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

      .hero-dot {
        width: 10px;
        height: 10px;
        border-radius: 999px;
        background: var(--accent);
        box-shadow: 0 0 0 0 rgba(63, 63, 70, 0.18);
        animation: pulse 1.8s infinite;
      }

      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(63, 63, 70, 0.18); }
        70% { box-shadow: 0 0 0 12px rgba(63, 63, 70, 0); }
        100% { box-shadow: 0 0 0 0 rgba(63, 63, 70, 0); }
      }

      .controls {
        display: grid;
        grid-template-columns: 280px 160px minmax(220px, 1fr) 140px;
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

      .select [data-popover] {
        background: var(--panel-strong);
        border: 1px solid var(--line);
        border-radius: 18px;
        backdrop-filter: blur(10px);
      }

      .select [role="option"] {
        color: var(--text);
      }

      .select [role="option"][data-selected] {
        background: rgba(63, 63, 70, 0.1);
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
        height: 520px;
        border: 1px solid var(--line-soft);
        border-radius: 20px;
        background: linear-gradient(180deg, rgba(15, 23, 42, 0.025), rgba(15, 23, 42, 0.01));
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
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
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 12px;
      }

      .concept-item {
        display: flex;
        flex-direction: column;
        gap: 10px;
        border-radius: 20px;
      }

      .concept-item.flow-in {
        box-shadow: inset 0 1px 0 rgba(102, 240, 203, 0.08);
      }

      .concept-item.flow-out {
        box-shadow: inset 0 1px 0 rgba(255, 125, 151, 0.08);
      }

      .concept-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(15, 23, 42, 0.06);
      }

      .concept-top {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 10px;
      }

      .concept-rank {
        color: var(--muted);
        font-size: 12px;
      }

      .concept-name {
        font-size: 15px;
        line-height: 1.3;
      }

      .concept-flow {
        margin: 8px 0 4px;
        font-size: 22px;
        letter-spacing: -0.04em;
      }

      .concept-foot {
        display: grid;
        gap: 4px;
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

      .concept-code {
        width: fit-content;
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
                <div class="metric-sub">10 个正向资金 + 10 个逆向资金，同时追踪</div>
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
          <div class="hero-badge">
            <span class="hero-dot"></span>
            <span>后台 10 秒采集，前端只读快照</span>
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
        <div class="control-field">
          <span class="control-label">概念筛选</span>
          <div id="concept-combobox" class="select">
            <button type="button" class="btn" id="concept-combobox-trigger" aria-haspopup="listbox" aria-expanded="false" aria-controls="concept-combobox-listbox">
              <span class="truncate">全部概念</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m7 15 5 5 5-5"></path>
                <path d="m7 9 5-5 5 5"></path>
              </svg>
            </button>
            <div id="concept-combobox-popover" data-popover aria-hidden="true">
              <header>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
                <input type="text" value="" placeholder="搜索概念..." autocomplete="off" autocorrect="off" spellcheck="false" aria-autocomplete="list" role="combobox" aria-expanded="false" aria-controls="concept-combobox-listbox" aria-labelledby="concept-combobox-trigger">
              </header>
              <div role="listbox" id="concept-combobox-listbox" aria-orientation="vertical" aria-labelledby="concept-combobox-trigger" data-empty="暂无概念数据"></div>
            </div>
            <input id="concept-combobox-value" type="hidden" name="concept-code" value="">
          </div>
        </div>
        <div class="panel" style="padding:12px 14px;">
          <div class="metric-label">当前市场切片</div>
          <div id="current-time" class="metric-value" style="font-size:24px;">--:--:--</div>
        </div>
        <div class="control-field">
          <span class="control-label">回放控制</span>
          <div class="flex gap-2">
            <button id="play-btn" class="btn" type="button">播放日内轨迹</button>
            <button id="latest-btn" class="btn-secondary" type="button">最新交易日</button>
          </div>
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
              <h2 class="metric-label">正向资金概念数</h2>
              <p class="sr-only">市场广度</p>
            </div>
            <span class="badge-secondary">Breadth</span>
          </header>
          <section>
            <div class="metric-value" id="positive-count">--</div>
            <p class="metric-sub" id="positive-sub">--</p>
          </section>
        </article>
        <article class="card metric">
          <header class="metric-row">
            <div>
              <h2 class="metric-label">前三主力规模</h2>
              <p class="sr-only">当前切片统计</p>
            </div>
            <span class="badge-outline">Top 3</span>
          </header>
          <section>
            <div class="metric-value" id="top-three-flow">--</div>
            <p class="metric-sub">按当前时间切片计算</p>
          </section>
        </article>
      </section>

      <section class="panel chart-panel">
        <div class="chart-head">
          <div>
            <div class="chart-title">日内资金曲线</div>
            <div class="chart-note">把主力净流入前 10 和净流出前 10 的概念全部叠到同一张时间轴。光标所在位置，就是你当前查看的市场切片。</div>
          </div>
          <div class="metric-sub">Highcharts / Replay</div>
        </div>
        <div id="chart"></div>
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
            <div class="chart-title" style="font-size:24px;">20 个概念当前切片</div>
            <div class="chart-note">按主力资金绝对值排序展示 20 个概念。即使当天几乎全是净流入，页面也会稳定保持 20 张卡片。</div>
          </div>
          <div class="metric-sub">Top 20 Concepts</div>
        </div>
        <div class="concepts-grid" id="concepts-grid"></div>
      </section>
    </main>

    <script src="https://code.highcharts.com/12/highcharts.js"></script>
    <script>
      const REFRESH_MS = 10000;
      const PLAY_INTERVAL_MS = 250;
      const COLORS = ["#6ff0cf", "#74b9ff", "#ffd36f", "#ff83b7", "#ff8398", "#c7a6ff", "#7ee787", "#ffa657"];

      const state = {
        data: null,
        index: 0,
        playing: false,
        timer: null,
        conceptFilter: "",
      };

      const dateCombobox = document.getElementById("date-combobox");
      const dateListbox = document.getElementById("date-combobox-listbox");
      const dateValueInput = document.getElementById("date-combobox-value");
      const conceptCombobox = document.getElementById("concept-combobox");
      const conceptListbox = document.getElementById("concept-combobox-listbox");
      const conceptValueInput = document.getElementById("concept-combobox-value");
      const playBtn = document.getElementById("play-btn");
      const latestBtn = document.getElementById("latest-btn");
      const timeline = document.getElementById("timeline");
      let chart;

      function formatFund(value) {
        const abs = Math.abs(value);
        if (abs >= 1e8) return (value / 1e8).toFixed(abs >= 1e10 ? 0 : 2) + "亿";
        if (abs >= 1e4) return (value / 1e4).toFixed(2) + "万";
        return String(value);
      }

      function formatPercent(value) {
        return (value * 100).toFixed(2) + "%";
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

      function colorForCode(code) {
        let hash = 0;
        for (let i = 0; i < code.length; i += 1) hash = (hash * 31 + code.charCodeAt(i)) >>> 0;
        return COLORS[hash % COLORS.length];
      }

      function setComboboxValue(value) {
        if (!dateCombobox) return;
        dateValueInput.value = value || "";
        const triggerText = document.querySelector("#date-combobox-trigger .truncate");
        if (triggerText) triggerText.textContent = value || "选择交易日";
        if (typeof dateCombobox.selectByValue === "function" && value) {
          dateCombobox.selectByValue(value);
        }
      }

      function setConceptComboboxValue(value, label) {
        if (!conceptCombobox) return;
        conceptValueInput.value = value || "";
        const triggerText = document.querySelector("#concept-combobox-trigger .truncate");
        if (triggerText) triggerText.textContent = label || "全部概念";
        if (typeof conceptCombobox.selectByValue === "function") {
          conceptCombobox.selectByValue(value || "__all__");
        }
      }

      function renderDateOptions(availableDates, selectedDate) {
        dateListbox.innerHTML = availableDates
          .map((date) => '<div role="option" data-value="' + date + '">' + date + '</div>')
          .join("");
        setComboboxValue(selectedDate);
      }

      function renderConceptOptions(data) {
        const concepts = data.samples[data.initialIndex]?.concepts || data.latestSnapshot?.concepts || [];
        conceptListbox.innerHTML = [
          '<div role="option" data-value="__all__">全部概念</div>',
          ...concepts.map((item) => '<div role="option" data-value="' + item.code + '">' + item.name + '</div>'),
        ].join("");

        const active = concepts.some((item) => item.code === state.conceptFilter)
          ? state.conceptFilter
          : "";
        const activeLabel = concepts.find((item) => item.code === active)?.name || "全部概念";
        state.conceptFilter = active;
        setConceptComboboxValue(active || "__all__", activeLabel);
      }

      function updateSliderPaint() {
        const min = parseFloat(timeline.min || 0);
        const max = parseFloat(timeline.max || 100);
        const value = parseFloat(timeline.value || 0);
        const percent = max === min ? 0 : ((value - min) / (max - min)) * 100;
        timeline.style.setProperty("--slider-value", percent + "%");
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
        }, PLAY_INTERVAL_MS);
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

      function ensureChart() {
        if (chart) return chart;
        chart = Highcharts.chart("chart", {
          chart: {
            backgroundColor: "transparent",
            plotBackgroundColor: "transparent",
            animation: false,
            spacing: [12, 8, 8, 8],
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
            lineColor: "rgba(255,255,255,0.14)",
            labels: {
              step: 6,
              style: { color: "rgba(237,246,255,0.54)" },
            },
          },
          yAxis: {
            title: { text: null },
            gridLineColor: "rgba(255,255,255,0.08)",
            labels: {
              style: { color: "rgba(237,246,255,0.54)" },
              formatter() { return formatFund(this.value); },
            },
            plotLines: [{ id: "zero-line", value: 0, color: "rgba(255,255,255,0.16)", width: 1 }],
          },
          tooltip: {
            shared: true,
            backgroundColor: "rgba(9,18,31,0.94)",
            borderColor: "rgba(255,255,255,0.08)",
            style: { color: "#edf6ff" },
            formatter() {
              return "<b>" + this.x + "</b><br />" + this.points.map((point) =>
                '<span style="color:' + point.color + '">●</span> ' + point.series.name + ': ' + formatFund(point.y)
              ).join("<br />");
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

      function renderChart(data) {
        const currentChart = ensureChart();
        currentChart.xAxis[0].setCategories(data.sampleTimes, false);
        const visibleSeries = state.conceptFilter
          ? data.chart.series.filter((item) => item.code === state.conceptFilter)
          : data.chart.series;

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
              { value: 0, color: "#ff8398" },
              { color },
            ],
            data: item.data,
          };

          if (existing) {
            existing.update({ name: item.name, color, zones: options.zones }, false);
            existing.setData(item.data, false, { duration: 350 });
          } else {
            currentChart.addSeries(options, false, { duration: 350 });
          }
        });

        currentChart.series
          .filter((series) => !visibleSeries.some((item) => item.code === series.options.id))
          .forEach((series) => series.remove(false));

        currentChart.redraw();
        drawCursor();
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
        const filteredConcepts = state.conceptFilter
          ? concepts.filter((item) => item.code === state.conceptFilter)
          : concepts;
        document.getElementById("concepts-grid").innerHTML = filteredConcepts.map((item, index) => {
          const flowClass = item.mainFundDiff >= 0 ? "flow-in" : "flow-out";
          const valueClass = item.mainFundDiff >= 0 ? "up" : "down";
          const changeClass = item.change >= 0 ? "up" : "down";
          const sideLabel = item.mainFundDiff >= 0 ? "净流入" : "净流出";
          return '<article class="card concept-item group/item ' + flowClass + '" data-tooltip="' + item.name + ' · ' + sideLabel + '" data-side="top">' +
            '<header class="concept-top">' +
              '<div><div class="concept-rank">#' + String(index + 1).padStart(2, "0") + '</div><h2 class="concept-name">' + item.name + '</h2></div>' +
              '<span class="' + (item.mainFundDiff >= 0 ? "badge-secondary" : "badge-destructive") + '">' + sideLabel + '</span>' +
            '</header>' +
            '<section>' +
              '<div class="concept-flow ' + valueClass + '">' + formatFund(item.mainFundDiff) + '</div>' +
              '<div class="' + changeClass + '">涨跌幅 ' + formatPercent(item.change) + '</div>' +
            '</section>' +
            '<footer class="concept-foot">' +
              '<p class="muted">代表股 ' + item.leaderStock + '</p>' +
              '<kbd class="kbd concept-code">' + item.code + '</kbd>' +
            '</footer>' +
          '</article>';
        }).join("");
      }

      function renderMetrics(sample) {
        document.getElementById("current-time").textContent = state.data.sampleTimes[state.index] || "--:--:--";
        document.getElementById("updated-at").textContent = new Intl.DateTimeFormat("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date(state.data.updatedAt));
        document.getElementById("selected-date").textContent = state.data.requestedDate;
        document.getElementById("positive-count").textContent = sample.headline.topCount;
        document.getElementById("positive-sub").textContent = "总概念数 " + sample.headline.totalCount;
        document.getElementById("top-three-flow").textContent = formatFund(sample.headline.topThreeFlow);
        document.getElementById("sample-progress").textContent = (state.index + 1) + " / " + state.data.samples.length;
      }

      function setIndex(index) {
        if (!state.data) return;
        state.index = Math.max(0, Math.min(index, state.data.samples.length - 1));
        timeline.value = String(state.index);
        updateSliderPaint();
        const sample = state.data.samples[state.index];
        renderMetrics(sample);
        renderConceptGrid(sample);
        drawCursor();
      }

      async function fetchDay(date) {
        const query = date ? "?date=" + encodeURIComponent(date) : "";
        const response = await fetch("/api/finance" + query, { cache: "no-store" });
        if (!response.ok) {
          throw new Error("加载交易日数据失败");
        }

        const data = await response.json();
        state.data = data;
        state.index = data.initialIndex;

        if (data.availableDates.length > 0) {
          renderDateOptions(data.availableDates, data.requestedDate);
        }
        renderConceptOptions(data);

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

      playBtn.addEventListener("click", togglePlayback);
      latestBtn.addEventListener("click", async () => {
        stopPlayback();
        await fetchDay();
      });
      dateCombobox.addEventListener("change", async (event) => {
        stopPlayback();
        await fetchDay(event.detail.value);
      });
      conceptCombobox.addEventListener("change", (event) => {
        state.conceptFilter = event.detail.value === "__all__" ? "" : event.detail.value;
        const concepts = state.data?.samples[state.index]?.concepts || [];
        const label = concepts.find((item) => item.code === state.conceptFilter)?.name || "全部概念";
        setConceptComboboxValue(state.conceptFilter || "__all__", label);
        if (state.data) {
          renderChart(state.data);
          renderConceptGrid(state.data.samples[state.index]);
        }
      });
      timeline.addEventListener("input", () => {
        stopPlayback();
        setIndex(Number(timeline.value));
        updateSliderPaint();
      });

      fetchDay().then(() => {
        fetchStatus();
        updateSliderPaint();
        setInterval(refreshLiveIfNeeded, REFRESH_MS);
        setInterval(fetchStatus, REFRESH_MS);
      });
    </script>
  </body>
</html>`;
}
