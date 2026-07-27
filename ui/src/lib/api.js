export async function fetchStatus() {
  const response = await fetch("/api/status", { cache: "no-store" });
  if (!response.ok) throw new Error("加载状态失败");
  return response.json();
}

export async function fetchAnalytics() {
  const response = await fetch("/api/analytics", { cache: "no-store" });
  if (!response.ok) throw new Error("加载访问统计失败");
  return response.json();
}

export async function fetchFinanceDay(date) {
  const query = date ? `?date=${encodeURIComponent(date)}` : "";
  const response = await fetch(`/api/finance${query}`, { cache: "no-store" });
  if (!response.ok) throw new Error("加载交易日数据失败");
  return response.json();
}

export async function fetchPlateStocks({ date, code }) {
  const params = new URLSearchParams();
  if (date) params.set("date", date);
  params.set("code", code);

  const response = await fetch(`/api/plate-stocks?${params.toString()}`, { cache: "no-store" });
  if (!response.ok) throw new Error("加载板块个股分时失败");
  return response.json();
}

