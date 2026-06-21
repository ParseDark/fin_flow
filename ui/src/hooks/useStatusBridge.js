import { useEffect, useState } from "react";
import { fetchStatus } from "../lib/api.js";
import { formatSessionLabel, formatStatusTime } from "../lib/format.js";

const REFRESH_MS = 30000;

export function useStatusBridge() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function refresh() {
      if (document.visibilityState !== "visible") return;
      try {
        const nextStatus = await fetchStatus();
        if (!cancelled) setStatus(nextStatus);
      } catch {
        // Keep the last known status visible.
      }
    }

    refresh();
    const interval = setInterval(refresh, REFRESH_MS);
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("focus", refresh);
    window.addEventListener("pageshow", refresh);

    return () => {
      cancelled = true;
      clearInterval(interval);
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("pageshow", refresh);
    };
  }, []);

  useEffect(() => {
    if (!status) return;

    setText("status-now", status.chinaNow?.isoLike || "--");
    setText("status-session", formatSessionLabel(status.currentTradingSession));
    setText("status-next-run", formatStatusTime(status.nextRunAt));
    setText("status-samples", String(status.samplesToday ?? "--"));
  }, [status]);

  return status;
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

