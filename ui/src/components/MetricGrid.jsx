import { concentrationMeta } from "../lib/flow.js";
import { formatFund, formatPercent } from "../lib/format.js";

export function MetricGrid({ data, sample, loading }) {
  const metrics = buildMetrics(data, sample);

  return (
    <section className="metric-grid loading-dim" aria-busy={loading ? "true" : "false"}>
      <MetricCard label="最近采集时间" badge="Live" valueId="updated-at" value={metrics.updatedAt} />
      <MetricCard label="所选交易日" badge="CN" badgeClassName="kbd" valueId="selected-date" value={metrics.selectedDate} />
      <MetricCard label="净流入 / 净流出" badge="分布" valueId="positive-count" value={metrics.positiveCount} subId="positive-sub" sub={metrics.positiveSub} />
      <MetricCard label="净流入 Top3" badge="📈" valueId="inflow-top3-card" value={metrics.inflowTop3} valueClassName="up" sub="买入端前三规模" />
      <MetricCard label="净流出 Top3" badge="📉" valueId="outflow-top3-card" value={metrics.outflowTop3} valueClassName="down" sub="卖出端前三规模" />
      <MetricCard label="流入集中" badge="📈" badgeClassName="badge-outline up" valueId="top-three-share" value={metrics.inflowShare} sub="占流入总量比例" />
      <MetricCard label="流出集中" badge="📉" badgeClassName="badge-outline down" valueId="concentration-badge" value={metrics.outflowShare} sub="占流出总量比例" />
      <MetricCard label="市场净资金" badge="📊" valueId="net-flow-stat" value={metrics.netFlow} valueClassName={metrics.netFlowClass} sub="净流入 + 净流出总和" />
      <MetricCard label="市场温度" badge="🌡️" valueId="emotion-degree" value={metrics.emotionDegree} sub={<span>成交 <span id="emotion-balance">{metrics.emotionBalance}</span> <span id="emotion-balchg" className={metrics.emotionBalanceChangeClass}>{metrics.emotionBalanceChange}</span> · 预估 <span id="emotion-preview">{metrics.emotionPreview}</span></span>} />
      <MetricCard label="涨停板" badge="📋" valueId="emotion-updown" value={metrics.emotionUpDown} sub={<span>封板率 <span id="emotion-ratio">{metrics.emotionRatio}</span></span>} />
      <MetricCard label="昨日涨停表现" badge="📊" valueId="emotion-perf" value={metrics.emotionPerformance} sub={<span>高开 <span id="emotion-open">{metrics.emotionOpen}</span> · 盈利 <span id="emotion-profit">{metrics.emotionProfit}</span></span>} />
      <MetricCard label="上涨 / 下跌" badge="📈📉" valueId="emotion-risefall" value={metrics.emotionRiseFall} sub={<span>涨停 <span id="emotion-up">{metrics.emotionUp}</span> · 跌停 <span id="emotion-down">{metrics.emotionDown}</span></span>} />
      <LoadingOverlay />
    </section>
  );
}

function MetricCard({
  label,
  badge,
  badgeClassName = "badge-outline",
  valueId,
  value,
  valueClassName = "",
  subId,
  sub,
}) {
  return (
    <article className="card metric">
      <header className="metric-row">
        <div>
          <h2 className="metric-label">{label}</h2>
          <p className="sr-only">实时指标</p>
        </div>
        <span className={badgeClassName}>{badge}</span>
      </header>
      <section>
        <div className={`metric-value ${valueClassName}`.trim()} id={valueId}>{value}</div>
        {sub ? <p className="metric-sub" id={subId}>{sub}</p> : null}
      </section>
    </article>
  );
}

function LoadingOverlay() {
  return (
    <div className="loading-overlay" aria-hidden="true">
      <div className="loading-stack">
        <div className="loading-label">正在加载交易日数据...</div>
        <div className="loading-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <div className="skeleton-card" key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function buildMetrics(data, sample) {
  if (!data || !sample) {
    return {
      updatedAt: "--:--:--",
      selectedDate: "--",
      positiveCount: "--",
      positiveSub: "--",
      inflowTop3: "--",
      outflowTop3: "--",
      inflowShare: "--",
      outflowShare: "--",
      netFlow: "--",
      netFlowClass: "",
      emotionDegree: "--",
      emotionBalance: "--",
      emotionBalanceChange: "--",
      emotionBalanceChangeClass: "",
      emotionPreview: "--",
      emotionUpDown: "--",
      emotionRatio: "--",
      emotionPerformance: "--",
      emotionOpen: "--",
      emotionProfit: "--",
      emotionRiseFall: "--",
      emotionUp: "--",
      emotionDown: "--",
    };
  }

  const concentration = concentrationMeta(sample);
  const concepts = sample.concepts?.length ? sample.concepts : [...(sample.leaders || []), ...(sample.laggards || [])];
  const inflowCount = concepts.filter((item) => item.mainFundDiff > 0).length;
  const outflowCount = concepts.filter((item) => item.mainFundDiff < 0).length;
  const netFlow = concepts.reduce((sum, item) => sum + (item.mainFundDiff || 0), 0);
  const emotion = data.emotion || sample.emotion || {};
  const balanceChange = emotion.balanceChange || 0;

  return {
    updatedAt: new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date(data.updatedAt)),
    selectedDate: data.requestedDate || "--",
    positiveCount: `${inflowCount} / ${outflowCount}`,
    positiveSub: `流入 ${inflowCount} 个 · 流出 ${outflowCount} 个`,
    inflowTop3: formatFund(concentration.inflowTop3Abs),
    outflowTop3: formatFund(concentration.outflowTop3Abs),
    inflowShare: `${formatPercent(concentration.inflowShare)} ${concentration.inflowLabel}`,
    outflowShare: `${formatPercent(concentration.outflowShare)} ${concentration.outflowLabel}`,
    netFlow: formatFund(netFlow),
    netFlowClass: netFlow >= 0 ? "up" : "down",
    emotionDegree: `温度 ${emotion.degree || "--"}°`,
    emotionBalance: emotion.balanceStr || "--",
    emotionBalanceChange: `${balanceChange >= 0 ? "+" : ""}${formatFund(balanceChange)}`,
    emotionBalanceChangeClass: balanceChange >= 0 ? "up" : "down",
    emotionPreview: emotion.previewBalanceStr || "--",
    emotionUpDown: `${emotion.riseNum || "--"} / ${emotion.fallNum || "--"}`,
    emotionRatio: emotion.upRatio ? `${emotion.upRatio}%` : "--",
    emotionPerformance: emotion.performance ? `${emotion.performance}%` : "--",
    emotionOpen: emotion.upOpenRatio ? `${emotion.upOpenRatio}%` : "--",
    emotionProfit: emotion.profitRatio ? `${emotion.profitRatio}%` : "--",
    emotionRiseFall: `${emotion.riseNum || "--"} / ${emotion.fallNum || "--"}`,
    emotionUp: emotion.upNum || "--",
    emotionDown: emotion.downNum || "--",
  };
}

