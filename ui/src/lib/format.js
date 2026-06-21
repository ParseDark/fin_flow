export function formatFund(value) {
  const numeric = Number(value || 0);
  const abs = Math.abs(numeric);
  if (abs >= 1e12) return `${(numeric / 1e12).toFixed(2)}万亿`;
  if (abs >= 1e8) return `${(numeric / 1e8).toFixed(abs >= 1e10 ? 0 : 2)}亿`;
  if (abs >= 1e4) return `${(numeric / 1e4).toFixed(2)}万`;
  return String(numeric);
}

export function formatPercent(value) {
  return `${(Number(value || 0) * 100).toFixed(2)}%`;
}

export function formatSessionLabel(session) {
  const labels = {
    morning: "早盘",
    afternoon: "午盘",
    lunch_break: "午间休市",
    closed: "休市",
  };
  return labels[session] || session || "--";
}

export function formatStatusTime(value) {
  if (!value) return "--";
  return new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Shanghai",
  }).format(new Date(value));
}

