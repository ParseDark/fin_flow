import { useEffect, useState } from "react";
import { fetchAnalytics } from "../lib/api.js";

const REFRESH_MS = 5 * 60 * 1000;

export function useAnalyticsBridge() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function refresh() {
      if (document.visibilityState !== "visible") return;
      try {
        const next = await fetchAnalytics();
        if (!cancelled && !next.error) setAnalytics(next);
      } catch {
        // Keep the last known value visible.
      }
    }

    refresh();
    const interval = setInterval(refresh, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return analytics;
}
