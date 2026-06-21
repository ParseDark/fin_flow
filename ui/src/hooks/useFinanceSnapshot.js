import { useEffect, useMemo, useState } from "react";
import { fetchFinanceDay } from "../lib/api.js";

export function useFinanceSnapshot() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const nextData = await fetchFinanceDay();
        if (!cancelled) {
          setData(nextData);
          setError(null);
        }
      } catch (nextError) {
        if (!cancelled) setError(nextError);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const index = data ? Math.max(0, Math.min(data.initialIndex || 0, data.samples.length - 1)) : 0;
  const sample = data?.samples?.[index] || null;

  return useMemo(() => ({
    data,
    error,
    index,
    sample,
    loading: !data && !error,
  }), [data, error, index, sample]);
}
