import { CHINA_TZ } from "./constants.js";

// 收盘快照判定。
// 数据源差异：本 Worker 只在交易时段采集（9:30-11:30 / 13:00-15:00），
// 每日最后一个快照即收盘快照。若最后快照早于 14:55，说明采集中断，
// 该日资金被低估，必须剔除，否则当日排名失真。
export function isClosingSnapshot(updatedAt) {
  if (!updatedAt) return false;
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: CHINA_TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date(updatedAt));

  const hour = Number(parts.find((part) => part.type === "hour")?.value);
  const minute = Number(parts.find((part) => part.type === "minute")?.value);
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return false;

  const minutes = hour * 60 + minute;
  return minutes >= 14 * 60 + 55;
}

// 横截面分位数：当日已保存概念按资金净额排序后的位置（0=最差，100=最好）。
// 直接累加 mainFundDiff 会退化成“概念规模榜”——成分股多的概念绝对值天然大，
// 且全市场主力净额结构性为负，所以必须先做当日内的相对化再跨日聚合。
export function buildAggregate(closes, { minCoverage = 0.8 } = {}) {
  const stats = new Map();

  for (const close of closes) {
    const ranked = [...close.concepts]
      .filter((item) => item && item.name)
      .sort((a, b) => (a.mainFundDiff || 0) - (b.mainFundDiff || 0));
    const denom = Math.max(ranked.length - 1, 1);

    ranked.forEach((item, index) => {
      let entry = stats.get(item.name);
      if (!entry) {
        entry = {
          name: item.name,
          code: item.code || "",
          percentiles: [],
          netFlow: 0,
          compound: 1,
          days: 0,
          positiveDays: 0,
          leaderStock: "",
        };
        stats.set(item.name, entry);
      }
      const flow = item.mainFundDiff || 0;
      entry.percentiles.push((index / denom) * 100);
      entry.netFlow += flow;
      entry.compound *= 1 + (item.change || 0);
      entry.days += 1;
      if (flow > 0) entry.positiveDays += 1;
      if (item.leaderStock) entry.leaderStock = item.leaderStock;
    });
  }

  const required = closes.length * minCoverage;
  const rows = [];
  for (const entry of stats.values()) {
    if (entry.days < required) continue;
    const avg = entry.percentiles.reduce((sum, v) => sum + v, 0) / entry.percentiles.length;
    rows.push({
      name: entry.name,
      code: entry.code,
      leaderStock: entry.leaderStock,
      percentile: avg,
      netFlow: entry.netFlow,
      // 日涨幅按复利连乘，不能简单相加：加总日百分比会显著夸大大幅下跌的区间。
      change: entry.compound - 1,
      days: entry.days,
      positiveDays: entry.positiveDays,
    });
  }
  rows.sort((a, b) => b.percentile - a.percentile);
  return rows;
}

// 半月对比：资金“意图”体现在月内的迁移方向，而非月末的静态排名。
export function buildTrend(closes, limit) {
  if (closes.length < 4) return { first: null, second: null, rising: [], falling: [] };

  const mid = Math.floor(closes.length / 2);
  const firstHalf = closes.slice(0, mid);
  const secondHalf = closes.slice(mid);

  const toMap = (rows) => new Map(rows.map((row) => [row.name, row]));
  const a = toMap(buildAggregate(firstHalf));
  const b = toMap(buildAggregate(secondHalf));

  const deltas = [];
  for (const [name, second] of b.entries()) {
    const first = a.get(name);
    if (!first) continue;
    deltas.push({
      name,
      code: second.code,
      delta: second.percentile - first.percentile,
      firstHalf: first.percentile,
      secondHalf: second.percentile,
      netFlow: second.netFlow + first.netFlow,
      change: (1 + first.change) * (1 + second.change) - 1,
    });
  }
  deltas.sort((x, y) => y.delta - x.delta);

  return {
    first: { start: firstHalf[0].date, end: firstHalf[firstHalf.length - 1].date, days: firstHalf.length },
    second: { start: secondHalf[0].date, end: secondHalf[secondHalf.length - 1].date, days: secondHalf.length },
    rising: deltas.slice(0, limit),
    falling: deltas.slice(-limit).reverse(),
  };
}

// 组装区间汇总 payload。
// closes：每日收盘快照 [{ date, updatedAt, concepts }]；excluded：被剔除的交易日。
export function buildAggregatePayload(closes, excluded, { startDate, endDate, limit = 10, availableDates = [] }) {
  if (!closes.length) return null;

  const ranked = buildAggregate(closes);
  if (!ranked.length) return null;

  const byNetFlow = [...ranked].sort((x, y) => y.netFlow - x.netFlow);
  const byChange = [...ranked].sort((x, y) => y.change - x.change);

  return {
    range: { start: startDate, end: endDate },
    tradingDays: closes.length,
    dates: closes.map((close) => close.date),
    excludedDates: excluded,
    conceptCount: ranked.length,
    limit,
    favored: ranked.slice(0, limit),
    abandoned: ranked.slice(-limit).reverse(),
    topNetFlow: byNetFlow.slice(0, limit),
    bottomNetFlow: byNetFlow.slice(-limit).reverse(),
    topChange: byChange.slice(0, limit),
    bottomChange: byChange.slice(-limit).reverse(),
    trend: buildTrend(closes, limit),
    availableDates,
  };
}

// ---- Markdown 输出，供下游 AI / LLM 直接消费 ----

export function renderAggregateMarkdown(payload, section = "") {
  const yi = (value) => {
    const v = value / 1e8;
    return (Math.abs(v) >= 1000 ? v.toFixed(0) : v.toFixed(1)) + "亿";
  };
  const pct = (value) => (value * 100).toFixed(1) + "%";

  const rankTable = (rows) => {
    const head = "| # | 概念 | 资金分位 | 累计净额 | 区间涨跌 | 正流入天数 | 龙头 |\n"
      + "|---|---|---:|---:|---:|---:|---|";
    const body = rows.map((row, i) =>
      `| ${i + 1} | ${row.name} | ${row.percentile.toFixed(1)} | ${yi(row.netFlow)} `
      + `| ${pct(row.change)} | ${row.positiveDays}/${row.days} | ${row.leaderStock || "-"} |`
    ).join("\n");
    return head + "\n" + body;
  };

  const trendTable = (rows) => {
    const head = "| # | 概念 | 分位变化 | 前段 | 后段 | 区间涨跌 |\n|---|---|---:|---:|---:|---:|";
    const body = rows.map((row, i) =>
      `| ${i + 1} | ${row.name} | ${row.delta > 0 ? "+" : ""}${row.delta.toFixed(1)} `
      + `| ${row.firstHalf.toFixed(1)} | ${row.secondHalf.toFixed(1)} | ${pct(row.change)} |`
    ).join("\n");
    return head + "\n" + body;
  };

  const blocks = new Map();
  blocks.set("favored", `## 资金最青睐 TOP${payload.limit}（按资金分位）\n\n${rankTable(payload.favored)}`);
  blocks.set("abandoned", `## 资金最抛弃 BOTTOM${payload.limit}（按资金分位）\n\n${rankTable(payload.abandoned)}`);
  blocks.set("netflow", `## 累计净流入 TOP${payload.limit}\n\n${rankTable(payload.topNetFlow)}\n\n`
    + `## 累计净流出 BOTTOM${payload.limit}\n\n${rankTable(payload.bottomNetFlow)}`);
  blocks.set("change", `## 区间涨幅 TOP${payload.limit}\n\n${rankTable(payload.topChange)}\n\n`
    + `## 区间跌幅 BOTTOM${payload.limit}\n\n${rankTable(payload.bottomChange)}`);

  const trend = payload.trend;
  blocks.set("trend", trend && trend.first
    ? `## 资金持续加仓（后段分位抬升）\n\n`
      + `前段 ${trend.first.start}~${trend.first.end}（${trend.first.days}天）`
      + ` 对比 后段 ${trend.second.start}~${trend.second.end}（${trend.second.days}天）\n\n`
      + `${trendTable(trend.rising)}\n\n`
      + `## 资金持续撤退（后段分位回落）\n\n${trendTable(trend.falling)}`
    : `## 区间趋势\n\n区间过短，无法做前后段对比（至少需要 4 个交易日）。`);

  const header = `# 概念资金流汇总 ${payload.range.start} ~ ${payload.range.end}\n\n`
    + `- 交易日：${payload.tradingDays} 天\n`
    + `- 概念数：${payload.conceptCount}\n`
    + (payload.excludedDates.length
      ? `- 已剔除采集中断日：${payload.excludedDates.join("、")}\n`
      : `- 区间内所有交易日均取到有效收盘快照\n`);

  // 口径说明必须随数据一起下发：下游模型看不到页面上的注解，
  // 缺了这段极易把「累计净额」当成强弱排名，或把日涨幅简单相加。
  const notes = `## 口径说明（重要，勿跳过）\n\n`
    + `- **资金分位**：每个交易日把已保存的概念按主力资金净额排序，取该概念所处位置`
    + `（0=当日最差，100=当日最好），再对区间内所有交易日求平均。这是默认排序口径。\n`
    + `- **数据范围**：本站每个快照只保存主力净额 Top10 + Bottom10 共 20 个信号概念，`
    + `分位排名是在当日已保存概念集合内计算的相对位置，未上榜概念不参与排名。`
    + `这与全量概念版本不同，榜单反映的是「已跟踪信号概念之间的相对强弱」。\n`
    + `- **不要直接用「累计净额」判断强弱**：成分股多的概念绝对净额天然偏大，`
    + `且全市场主力净额结构性为负，直接排序得到的是「概念规模榜」而非资金偏好榜。`
    + `绝对值大的概念（如芯片产业链）往往只是体量大，不代表最弱。\n`
    + `- **区间涨跌**：原始 change 字段是「单日」盘中涨幅、每日归零，`
    + `此处已按复利连乘 Π(1+change)-1 计算。不要把日涨幅简单相加，会显著夸大跌幅。\n`
    + `- **收盘口径**：采集在 15:00 停止，每个交易日取最后一个快照作为收盘快照。`
    + `若最后快照早于 14:55（采集中断），当日资金被低估，已剔除。\n`
    + `- **交叉验证**：资金分位与区间涨跌是两个独立口径。二者背离时值得注意——`
    + `例如价格大跌但资金分位不低，说明资金并未离场。\n`;

  if (section && blocks.has(section)) {
    return `${header}\n${blocks.get(section)}\n\n${notes}`;
  }

  // 块之间必须留空行，否则表格末行会紧贴下一个标题，严格的 Markdown 解析器无法闭合表格。
  return [
    header,
    blocks.get("favored"),
    blocks.get("abandoned"),
    blocks.get("trend"),
    notes,
  ].join("\n\n") + "\n";
}
