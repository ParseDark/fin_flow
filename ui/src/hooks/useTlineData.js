import { useEffect, useState, useCallback, useRef } from "react";

const POLL_INTERVAL_MS = 10_000;

/**
 * Check if current time is within A-share trading hours (Shanghai time).
 * Morning: 9:00 - 11:35, Afternoon: 13:00 - 15:30
 */
function isTradingTime() {
  const now = new Date();
  // Get Shanghai time (UTC+8)
  const shanghaiTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Shanghai" }));
  const hours = shanghaiTime.getHours();
  const minutes = shanghaiTime.getMinutes();
  const day = shanghaiTime.getDay();
  
  // Weekend
  if (day === 0 || day === 6) return false;
  
  const totalMinutes = hours * 60 + minutes;
  
  // Morning: 9:00 (540) - 11:35 (695)
  if (totalMinutes >= 540 && totalMinutes <= 695) return true;
  
  // Afternoon: 13:00 (780) - 15:30 (930)
  if (totalMinutes >= 780 && totalMinutes <= 930) return true;
  
  return false;
}

/**
 * Fetch real-time tline data for a list of stock codes from CLS API.
 */
async function fetchTlineBatch(codes) {
  const results = await Promise.allSettled(
    codes.map(async (code) => {
      const url = `/api/tline?code=${encodeURIComponent(code)}`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${code}`);
      const json = await res.json();
      return { code, data: json };
    }),
  );

  const map = new Map();
  for (const r of results) {
    if (r.status === "fulfilled") {
      map.set(r.value.code, r.value.data);
    }
  }
  return map;
}

/**
 * Parse URL search params into groups.
 * Supports: ?group1=sz002008,sz300750&group2=sz600519
 */
function parseGroups(search) {
  const params = new URLSearchParams(search);
  const groups = {};
  for (const [key, value] of params.entries()) {
    if (!key.startsWith("group")) continue;
    const cleaned = value.replace(/^\[|\]$/g, "").trim();
    if (!cleaned) continue;
    const codes = cleaned.split(",").map((s) => s.trim()).filter(Boolean);
    if (codes.length > 0) groups[key] = codes;
  }
  return groups;
}

/**
 * Normalize CLS tline API response.
 */
function normalizeTline(raw) {
  if (!raw) return [];
  const line = raw?.data?.line;
  if (!Array.isArray(line)) return [];

  return line.map((entry) => ({
    time: entry.minute,
    price: entry.last_px,
    avg: entry.av_px,
    volume: entry.business_amount,
    amount: entry.business_balance,
    change: entry.change,
    changePx: entry.change_px,
  }));
}

function getStockName(raw) {
  return raw?.data?.name || raw?.data?.secu_name || "";
}

function getPrevClose(raw) {
  return raw?.data?.preclose_px ?? null;
}

/**
 * Hook: polls tline data every 10s during trading hours, otherwise fetches once.
 */
export function useTlineData(codes) {
  const [seriesMap, setSeriesMap] = useState(new Map());
  const [metaMap, setMetaMap] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tradingTime, setTradingTime] = useState(isTradingTime());
  const timerRef = useRef(null);

  const refresh = useCallback(async () => {
    if (codes.length === 0) return;
    try {
      const rawMap = await fetchTlineBatch(codes);
      setSeriesMap((prev) => {
        const next = new Map(prev);
        for (const [code, raw] of rawMap) next.set(code, normalizeTline(raw));
        return next;
      });
      setMetaMap((prev) => {
        const next = new Map(prev);
        for (const [code, raw] of rawMap) {
          next.set(code, { name: getStockName(raw), prevClose: getPrevClose(raw) });
        }
        return next;
      });
      setError(null);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [codes.join(",")]);

  useEffect(() => {
    if (codes.length === 0) {
      setLoading(false);
      return;
    }

    // Always fetch once
    setLoading(true);
    refresh();

    // Set up polling if in trading time
    if (tradingTime) {
      timerRef.current = setInterval(refresh, POLL_INTERVAL_MS);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [refresh, codes.join(","), tradingTime]);

  // Check trading time every minute to start/stop polling
  useEffect(() => {
    const checkInterval = setInterval(() => {
      const nowTrading = isTradingTime();
      if (nowTrading !== tradingTime) {
        setTradingTime(nowTrading);
      }
    }, 60_000);

    return () => clearInterval(checkInterval);
  }, [tradingTime]);

  return { seriesMap, metaMap, loading, error, refresh, tradingTime };
}

export { parseGroups, normalizeTline };
