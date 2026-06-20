import { CHINA_TZ, PRIMARY_SITE_URL, PRIMARY_SITE_ORIGIN, API_NOINDEX_VALUE } from "./constants.js";

export function getChinaParts(date) {
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

export function chinaWallClockToUtc(year, month, day, hour, minute, second) {
  return new Date(Date.UTC(year, month - 1, day, hour - 8, minute, second));
}

export function isTradingTime(now) {
  const parts = getChinaParts(now);
  if (parts.weekday === "Sat" || parts.weekday === "Sun") {
    return false;
  }

  const minutes = parts.hour * 60 + parts.minute;
  const inMorning = minutes >= 9 * 60 + 30 && minutes <= 11 * 60 + 30;
  const inAfternoon = minutes >= 13 * 60 && minutes <= 15 * 60;
  return inMorning || inAfternoon;
}

export function getTradingSession(now) {
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

export function nextRunAt(now) {
  if (isTradingTime(now)) {
    return new Date(now.getTime() + 20 * 1000); // COLLECT_INTERVAL_MS
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

export function nextWeekday(year, month, day) {
  let cursor = chinaWallClockToUtc(year, month, day, 12, 0, 0);
  for (;;) {
    cursor = new Date(cursor.getTime() + 24 * 60 * 60 * 1000);
    const parts = getChinaParts(cursor);
    if (parts.weekday !== "Sat" && parts.weekday !== "Sun") {
      return parts;
    }
  }
}

export function getChinaDateKey(date) {
  const parts = getChinaParts(date);
  return `${parts.year}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;
}

export function formatTimeLabel(dateString) {
  const parts = getChinaParts(new Date(dateString));
  return `${String(parts.hour).padStart(2, "0")}:${String(parts.minute).padStart(2, "0")}:${String(parts.second).padStart(2, "0")}`;
}

export function normalizeAnchorTimeLabel(value) {
  if (!value) return null;
  const raw = String(value).trim();
  const match = raw.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  if (!match) return null;
  const [, hour, minute, second = "00"] = match;
  return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}:${second.padStart(2, "0")}`;
}

export function secondsFromTimeLabel(value) {
  const normalized = normalizeAnchorTimeLabel(value);
  if (!normalized) return null;
  const [hour, minute, second] = normalized.split(":").map(Number);
  if (![hour, minute, second].every(Number.isFinite)) return null;
  return hour * 3600 + minute * 60 + second;
}

export function toNumber(value) {
  return typeof value === "number" ? value : 0;
}

export function parseChineseAmount(value) {
  if (!value) return 0;
  const numeric = parseFloat(String(value).replace(/[^\d.-]/g, ""));
  if (!Number.isFinite(numeric)) return 0;

  if (value.includes("万亿")) return numeric * 1000000000000;
  if (value.includes("亿")) return numeric * 100000000;
  if (value.includes("万")) return numeric * 10000;
  return numeric;
}

export function amountToWanYi(value) {
  return parseChineseAmount(value) / 1000000000000;
}

export function amountToYi(value) {
  return parseChineseAmount(value) / 100000000;
}

export function normalizeAnchorDirection(value) {
  if (value === "up" || value === "down") return value;
  return "flat";
}

export function findSampleIndexForTime(sampleTimes, timeLabel) {
  const target = secondsFromTimeLabel(timeLabel);
  if (target == null || sampleTimes.length === 0) return null;

  for (let index = 0; index < sampleTimes.length; index += 1) {
    const current = secondsFromTimeLabel(sampleTimes[index]);
    if (current != null && current >= target) {
      return index;
    }
  }

  return sampleTimes.length - 1;
}

export async function fetchAnchorEvents(dateKey) {
  const { ANCHOR_API_URL, REQUEST_HEADERS } = await import("./constants.js");
  const url = `${ANCHOR_API_URL}&cdate=${dateKey}`;

  try {
    const response = await fetch(url, {
      headers: {
        ...REQUEST_HEADERS,
        "Content-Type": "application/json;charset=utf-8",
        Referer: "https://www.cls.cn/finance",
      },
    });

    if (!response.ok) {
      return [];
    }

    const json = await response.json();
    const list = Array.isArray(json?.data) ? json.data : [];
    return list
      .map((item) => ({
        time: normalizeAnchorTimeLabel(item.c_time),
        name: item.symbol_name || "-",
        direction: normalizeAnchorDirection(item.float),
      }))
      .filter((item) => item.time && item.name);
  } catch {
    return [];
  }
}

export function buildAnchorTimeline(anchorItems, sampleTimes) {
  return anchorItems
    .map((item) => {
      const index = findSampleIndexForTime(sampleTimes, item.time);
      if (index == null) return null;
      return { ...item, index };
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (a.index !== b.index) return a.index - b.index;
      return a.name.localeCompare(b.name, "zh-CN");
    });
}

export function buildAlignedPreviousEmotionSeries(samples, previousSamples) {
  if (!previousSamples.length) {
    return {
      degree: samples.map(() => null),
      balance: samples.map(() => null),
    };
  }

  const previousPoints = previousSamples
    .map((sample) => ({
      second: secondsFromTimeLabel(formatTimeLabel(sample.updatedAt)),
      degree: (sample.emotion || {}).degree ?? null,
      balance: (sample.emotion || {}).balance ?? null,
    }))
    .filter((point) => point.second != null)
    .sort((a, b) => a.second - b.second);

  if (!previousPoints.length) {
    return {
      degree: samples.map(() => null),
      balance: samples.map(() => null),
    };
  }

  const alignedDegree = [];
  const alignedBalance = [];
  let cursor = 0;

  samples.forEach((sample) => {
    const targetSecond = secondsFromTimeLabel(formatTimeLabel(sample.updatedAt));
    if (targetSecond == null) {
      alignedDegree.push(null);
      alignedBalance.push(null);
      return;
    }

    while (
      cursor + 1 < previousPoints.length &&
      previousPoints[cursor + 1].second <= targetSecond
    ) {
      cursor += 1;
    }

    const matchedPoint = previousPoints[cursor];
    if (matchedPoint.second > targetSecond) {
      alignedDegree.push(null);
      alignedBalance.push(null);
      return;
    }

    alignedDegree.push(matchedPoint.degree);
    alignedBalance.push(matchedPoint.balance);
  });

  return { degree: alignedDegree, balance: alignedBalance };
}

export function buildAlignedPreviousNetFlowSeries(samples, previousSamples) {
  if (!previousSamples.length) {
    return samples.map(() => null);
  }

  const previousPoints = previousSamples
    .map((sample) => ({
      second: secondsFromTimeLabel(formatTimeLabel(sample.updatedAt)),
      value: [...sample.leaders, ...sample.laggards].reduce(
        (sum, item) => sum + (item.mainFundDiff || 0),
        0,
      ),
    }))
    .filter((point) => point.second != null)
    .sort((a, b) => a.second - b.second);

  if (!previousPoints.length) {
    return samples.map(() => null);
  }

  const aligned = [];
  let cursor = 0;

  samples.forEach((sample) => {
    const targetSecond = secondsFromTimeLabel(formatTimeLabel(sample.updatedAt));
    if (targetSecond == null) {
      aligned.push(null);
      return;
    }

    while (
      cursor + 1 < previousPoints.length &&
      previousPoints[cursor + 1].second <= targetSecond
    ) {
      cursor += 1;
    }

    const matchedPoint = previousPoints[cursor];
    aligned.push(matchedPoint.second > targetSecond ? null : matchedPoint.value);
  });

  return aligned;
}

export function normalizeConceptList(list) {
  return list.map((item) => ({
    name: item.secu_name,
    code: item.secu_code,
    change: toNumber(item.change),
    mainFundDiff: toNumber(item.main_fund_diff),
    leaderStock: item.first_stock?.secu_name || "-",
  }));
}

export function buildFlowGroups(list) {
  const normalized = normalizeConceptList(list);
  const topInflow = normalized
    .filter((item) => Number.isFinite(item.mainFundDiff) && item.mainFundDiff > 0)
    .sort((a, b) => b.mainFundDiff - a.mainFundDiff)
    .slice(0, 10);

  const topOutflow = normalized
    .filter((item) => Number.isFinite(item.mainFundDiff) && item.mainFundDiff < 0)
    .sort((a, b) => a.mainFundDiff - b.mainFundDiff)
    .slice(0, 10);

  const ranking = [...topInflow, ...topOutflow].sort(
    (a, b) => Math.abs(b.mainFundDiff) - Math.abs(a.mainFundDiff),
  );

  return { leaders: topInflow, laggards: topOutflow, ranking };
}

export function summarizeHeadline(list) {
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

// ---- HTML/Response helpers ----

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function escapeXml(value) {
  return escapeHtml(value).replaceAll("'", "&apos;");
}

export function buildCanonicalUrl(url, forcedPath = null) {
  const canonical = new URL(forcedPath || url.pathname || "/", PRIMARY_SITE_URL);
  return canonical.toString();
}

export function redirectToPrimaryHost(url) {
  if (url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname === "::1") {
    return null;
  }
  if (url.origin === PRIMARY_SITE_ORIGIN) {
    return null;
  }
  const target = new URL(url.pathname + url.search, PRIMARY_SITE_URL);
  return Response.redirect(target.toString(), 301);
}

export function renderWebAnalyticsScript(token) {
  const normalized = typeof token === "string" ? token.trim() : "";
  if (!normalized) return "";
  const beaconConfig = JSON.stringify({ token: normalized });
  return `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='${beaconConfig}'></script>`;
}

export function withNoIndex(response) {
  const nextHeaders = new Headers(response.headers);
  nextHeaders.set("x-robots-tag", API_NOINDEX_VALUE);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: nextHeaders,
  });
}

export function previousTradingDateFromAvailableDates(availableDates, targetDate) {
  const targetIndex = availableDates.indexOf(targetDate);
  if (targetIndex <= 0) return null;
  return availableDates[targetIndex - 1];
}
