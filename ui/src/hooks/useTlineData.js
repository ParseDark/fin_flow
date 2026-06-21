import { useEffect, useState, useCallback, useRef } from "react";

const POLL_INTERVAL_MS = 10_000;

/**
 * Fetch real-time tline data for a list of stock codes from CLS API.
 * Returns a Map<code, { points: [{time, price, volume, ...}], name, prevClose, ... }>
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
 * Also supports bracket style: ?group1=[sz002008,sz300750]&group2=[sz600519]
 */
function parseGroups(search) {
  const params = new URLSearchParams(search);
  const groups = {};
  for (const [key, value] of params.entries()) {
    if (!key.startsWith("group")) continue;
    // Strip brackets if present
    const cleaned = value.replace(/^\[|\]$/g, "").trim();
    if (!cleaned) continue;
    const codes = cleaned
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (codes.length > 0) groups[key] = codes;
  }
  return groups;
}

/**
 * Normalize CLS tline API response into a uniform series.
 * API response: { code: 200, data: { date, preclose_px, line: [{minute, last_px, av_px, ...}] } }
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
 * Hook: polls tline data for given stock codes every 10s.
 */
export function useTlineData(codes) {
  const [seriesMap, setSeriesMap] = useState(new Map());
  const [metaMap, setMetaMap] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const timerRef = useRef(null);

  const refresh = useCallback(async () => {
    if (codes.length === 0) return;
    try {
      const rawMap = await fetchTlineBatch(codes);
      setSeriesMap((prev) => {
        const next = new Map(prev);
        for (const [code, raw] of rawMap) {
          next.set(code, normalizeTline(raw));
        }
        return next;
      });
      setMetaMap((prev) => {
        const next = new Map(prev);
        for (const [code, raw] of rawMap) {
          next.set(code, {
            name: getStockName(raw),
            prevClose: getPrevClose(raw),
          });
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
    setLoading(true);
    refresh();
    timerRef.current = setInterval(refresh, POLL_INTERVAL_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [refresh, codes.join(",")]);

  return { seriesMap, metaMap, loading, error, refresh };
}

export { parseGroups, normalizeTline };
