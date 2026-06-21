import { DISPLAY_CONCEPT_COUNT } from "../../../src/constants.js";
import { filteredFlowGroups, sortedFlowSources } from "../lib/flow.js";
import { formatFund, formatPercent } from "../lib/format.js";

export function ConceptPanel({ sample, loading }) {
  const concepts = sample?.concepts?.length
    ? sample.concepts
    : [...(sample?.leaders || []), ...(sample?.laggards || [])];
  const { inflow, outflow } = sample ? filteredFlowGroups(sample) : { inflow: [], outflow: [] };
  const totals = sample ? sortedFlowSources(concepts, sample) : { inflow: [], outflow: [] };
  const hasTwoColumns = inflow.length > 0 && outflow.length > 0;

  return (
    <section className="panel concepts-panel loading-dim" aria-busy={loading ? "true" : "false"}>
      <div className="concepts-head">
        <div>
          <div className="chart-title" style={{ fontSize: 24 }}>概念板块资金流</div>
          <div className="chart-note">左列为净流入概念，右列为净流出概念。可通过上方筛选器自由选择关注的板块。</div>
        </div>
        <div className="metric-sub">Top {DISPLAY_CONCEPT_COUNT} Concepts</div>
      </div>

      <div className={`concepts-grid${hasTwoColumns ? " has-two-columns" : ""}`} id="concepts-grid">
        <ConceptColumn items={inflow} label="📈 净流入" colorClass="up" total={totals.inflow.length} />
        <ConceptColumn items={outflow} label="📉 净流出" colorClass="down" total={totals.outflow.length} />
      </div>

      <LoadingOverlay />
    </section>
  );
}

function ConceptColumn({ items, label, colorClass, total }) {
  return (
    <div className="concept-column">
      <h3 className={`concept-column-title ${colorClass}`}>{label} ({items.length}/{total})</h3>
      {items.length === 0 ? (
        <p className="muted" style={{ padding: "20px 0", textAlign: "center" }}>暂无数据</p>
      ) : (
        items.map((item, index) => (
          <ConceptCard item={item} rank={index + 1} key={item.code || `${item.name}-${index}`} />
        ))
      )}
    </div>
  );
}

function ConceptCard({ item, rank }) {
  const isInflow = item.mainFundDiff >= 0;
  const flowClass = isInflow ? "flow-in" : "flow-out";
  const valueClass = isInflow ? "up" : "down";
  const changeClass = item.change >= 0 ? "up" : "down";
  const sideLabel = isInflow ? "净流入" : "净流出";

  return (
    <article
      className={`card concept-item group/item ${flowClass}`}
      role="button"
      tabIndex="0"
      data-concept-code={item.code}
      data-tooltip={`${item.name} · ${sideLabel}`}
      data-side="top"
    >
      <header className="concept-top">
        <div>
          <div className="concept-rank">#{String(rank).padStart(2, "0")}</div>
          <h2 className="concept-name">{item.name}</h2>
        </div>
        <span className={valueClass} style={{ fontWeight: 600, fontSize: 11 }}>{sideLabel}</span>
      </header>
      <section>
        <div className={`concept-flow ${valueClass}`}>{formatFund(item.mainFundDiff)}</div>
        <div className={changeClass} style={{ fontSize: 12 }}>涨跌幅 {formatPercent(item.change)}</div>
      </section>
      <footer className="concept-foot">
        <p className="muted">代表股 {item.leaderStock}</p>
        <span className="concept-action">查看个股分时</span>
      </footer>
    </article>
  );
}

function LoadingOverlay() {
  return (
    <div className="loading-overlay" aria-hidden="true">
      <div className="loading-stack">
        <div className="loading-label">正在整理概念资金流...</div>
        <div className="loading-concepts">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="skeleton-card skeleton-concept" key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

