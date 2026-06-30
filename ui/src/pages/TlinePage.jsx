import { useMemo, useState, useCallback, useRef } from "react";
import { useTlineData, parseGroups } from "../hooks/useTlineData.js";

const GROUP_COLORS = [
  "#4f8cff",
  "#ff6b6b",
  "#51cf66",
  "#ffd43b",
  "#cc5de8",
  "#20c997",
  "#ff922b",
  "#748ffc",
];

const W = 960;
const PAD = { top: 24, right: 80, bottom: 36, left: 64 };
const plotW = W - PAD.left - PAD.right;

// Full trading day: 9:30-11:30 (120 min) + 13:00-15:30 (150 min) = 270 min → 271 data points
const FULL_TRADING_DAY_LEN = 271;

export function TlinePage() {
  const groups = useMemo(() => parseGroups(window.location.search), []);
  const allCodes = useMemo(() => {
    const set = new Set();
    for (const codes of Object.values(groups)) {
      for (const c of codes) set.add(c);
    }
    return [...set];
  }, [groups]);

  const { seriesMap, metaMap, loading, error, tradingTime } = useTlineData(allCodes);

  if (Object.keys(groups).length === 0) {
    return (
      <main className="page">
        <section className="panel" style={{ maxWidth: 560, margin: "80px auto", textAlign: "center" }}>
          <div className="eyebrow">Stock Tline Compare</div>
          <h1 style={{ fontSize: 28, marginBottom: 16 }}>分时对比工具</h1>
          <p className="lead" style={{ marginBottom: 20 }}>
            通过 URL 参数指定股票分组，按组对比分时走势和成交量。
          </p>
          <div style={{ 
            padding: 14, 
            background: "rgba(63,63,70,0.04)", 
            borderRadius: 12,
            fontFamily: "monospace",
            fontSize: 13,
            color: "var(--muted)"
          }}>
            /tline?group1=sz002008,sz300750&group2=sz600519
          </div>
        </section>
      </main>
    );
  }

  const groupEntries = Object.entries(groups);

  return (
    <main className="page tline-page">
      <TlineHeader groups={groups} loading={loading} tradingTime={tradingTime} />

      {/* Each group gets its own chart block with price + volume */}
      {groupEntries.map(([groupName, codes], gi) => (
        <GroupChartBlock
          key={groupName}
          groupName={groupName}
          codes={codes}
          groupIndex={gi}
          seriesMap={seriesMap}
          metaMap={metaMap}
          loading={loading}
        />
      ))}

      <TlineTable
        groups={groups}
        seriesMap={seriesMap}
        metaMap={metaMap}
      />
      {error && <div className="tline-error">部分数据加载失败：{error.message}</div>}
    </main>
  );
}

/* ---- Header ---- */

function TlineHeader({ groups, loading, tradingTime }) {
  const totalCount = Object.values(groups).reduce((s, g) => s + g.length, 0);
  const refreshLabel = tradingTime ? "交易时段 · 每10秒刷新" : "非交易时段 · 仅加载一次";

  return (
    <section className="panel hero-copy" style={{ marginBottom: 16 }}>
      <div className="eyebrow">Stock Tline / {totalCount} Symbols</div>
      <h1 style={{ fontSize: 48, marginBottom: 12 }}>分时走势对比</h1>
      <p className="lead">
        {Object.entries(groups).map(([name, codes]) => (
          <span key={name}>
            <strong>{name}</strong>: {codes.join(", ")}
            {" "}
          </span>
        ))}
      </p>
      <div className="status-rail" style={{ marginTop: 16 }}>
        <StatusPill label="股票数量" value={`${totalCount} 只`} />
        <StatusPill label="刷新状态" value={loading ? "加载中..." : refreshLabel} />
        <StatusPill label="数据状态" value={tradingTime ? "🟢 交易中" : "⚪ 休市"} />
        <StatusPill label="对比维度" value="涨跌幅 %" />
      </div>
    </section>
  );
}

function StatusPill({ label, value }) {
  return (
    <div className="status-pill">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </div>
  );
}

/* ---- Group Chart Block: Price + Volume for one group ---- */

function GroupChartBlock({ groupName, codes, groupIndex, seriesMap, metaMap, loading }) {
  // Build lines for this group only
  const { minPct, maxPct, lines } = useMemo(() => {
    let min = Infinity, max = -Infinity;
    const lines = [];

    for (let ci = 0; ci < codes.length; ci++) {
      const code = codes[ci];
      const series = seriesMap.get(code) || [];
      const meta = metaMap.get(code) || {};
      const color = GROUP_COLORS[(groupIndex * 5 + ci) % GROUP_COLORS.length];
      const dashArray = ci > 0 ? `${3 + ci * 2} ${2 + ci}` : undefined;
      const prevClose = meta.prevClose;

      const pctSeries = series.map((pt) => {
        if (prevClose && pt.price != null) {
          const pct = ((pt.price - prevClose) / prevClose) * 100;
          if (pct < min) min = pct;
          if (pct > max) max = pct;
          return { ...pt, pct };
        }
        return { ...pt, pct: 0 };
      });

      lines.push({ code, name: meta.name || code, groupName, series: pctSeries, color, dashArray });
    }

    if (!isFinite(min)) { min = -1; max = 1; }
    const pad = (max - min) * 0.1 || 0.5;
    return { minPct: min - pad, maxPct: max + pad, lines };
  }, [codes, groupIndex, seriesMap, metaMap]);

  if (lines.length === 0) {
    return (
      <section className="panel chart-panel">
        <div className="chart-head">
          <div>
            <div className="chart-title">{groupName}</div>
            <div className="chart-note">暂无数据</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="panel chart-panel loading-dim" aria-busy={loading ? "true" : "false"} style={{ marginBottom: 16 }}>
      {/* Group title bar */}
      <div className="chart-head">
        <div>
          <div className="chart-title" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="badge" style={{ fontSize: 14, padding: "2px 10px" }}>{groupName}</span>
            <span>分时走势 + 成交量</span>
          </div>
          <div className="chart-stats" style={{ marginTop: 6 }}>
            {lines.map((l) => (
              <span key={l.code} className="chart-legend-item" style={{ color: l.color }}>
                <span className="chart-legend-swatch" style={{ background: l.color }} />
                {l.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Price sub-chart */}
      <GroupPriceChart lines={lines} minPct={minPct} maxPct={maxPct} />

      {/* Volume sub-chart */}
      <GroupVolumeChart lines={lines} seriesMap={seriesMap} codes={codes} />
    </section>
  );
}

/* ---- Price Sub-Chart (per group) ---- */

function GroupPriceChart({ lines, minPct, maxPct }) {
  const [tooltip, setTooltip] = useState(null);
  const svgRef = useRef(null);

  const H = 320;
  const plotH = H - PAD.top - PAD.bottom;
  const dataMaxLen = lines.length > 0 ? Math.max(...lines.map((l) => l.series.length)) : 1;
  const maxLen = Math.max(dataMaxLen, FULL_TRADING_DAY_LEN);

  const xScale = (i) => PAD.left + (i / Math.max(1, maxLen - 1)) * plotW;
  const yScale = (v) => PAD.top + ((maxPct - v) / (maxPct - minPct)) * plotH;

  const handleMouseMove = useCallback((e) => {
    if (!svgRef.current || lines.length === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * W;
    const idx = Math.round(((mouseX - PAD.left) / plotW) * (maxLen - 1));
    if (idx < 0 || idx >= maxLen) { setTooltip(null); return; }

    const items = lines.map((l) => {
      const pt = l.series[idx];
      if (!pt) return null;
      return { name: l.name, color: l.color, price: pt.price, pct: pt.pct, time: pt.time, amount: pt.amount };
    }).filter(Boolean);

    if (items.length === 0) { setTooltip(null); return; }
    setTooltip({ x: xScale(idx), time: items[0]?.time, items, side: xScale(idx) > W / 2 ? "left" : "right" });
  }, [lines, maxLen, W, plotW, xScale]);

  const handleMouseLeave = useCallback(() => setTooltip(null), []);

  const yTicks = [];
  const yStep = (maxPct - minPct) / 5;
  for (let i = 0; i <= 5; i++) yTicks.push(minPct + yStep * i);

  const zeroY = (minPct <= 0 && maxPct >= 0) ? yScale(0) : null;

  const xTicks = getXTicks(maxLen, xScale);

  return (
    <div className="tline-chart-wrapper" style={{ position: "relative" }}>
      <div style={{ padding: "0 16px", fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>涨跌幅 (%)</div>
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="tline-svg" preserveAspectRatio="xMidYMid meet"
           onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ cursor: "crosshair" }}>
        {yTicks.map((v) => (
          <g key={v}>
            <line x1={PAD.left} x2={W - PAD.right} y1={yScale(v)} y2={yScale(v)} className="tline-grid-line" />
            <text x={PAD.left - 8} y={yScale(v)} textAnchor="end" dominantBaseline="middle" className="tline-axis-label">
              {v >= 0 ? "+" : ""}{v.toFixed(2)}%
            </text>
          </g>
        ))}
        {zeroY != null && (
          <g>
            <line x1={PAD.left} x2={W - PAD.right} y1={zeroY} y2={zeroY} className="tline-prev-close" />
            <text x={W - PAD.right + 6} y={zeroY} dominantBaseline="middle" className="tline-axis-label" style={{ fontSize: 10 }}>0%</text>
          </g>
        )}
        {lines.map((l) => {
          if (l.series.length === 0) return null;
          const d = l.series.map((pt, i) => `${i === 0 ? "M" : "L"}${xScale(i)},${yScale(pt.pct)}`).join(" ");
          return <path key={l.code} d={d} fill="none" stroke={l.color} strokeWidth={1.8} strokeDasharray={l.dashArray} className="tline-path" />;
        })}
        {lines.map((l) => {
          if (l.series.length === 0) return null;
          const i = l.series.length - 1;
          return <circle key={`dot-${l.code}`} cx={xScale(i)} cy={yScale(l.series[i].pct)} r={4} fill={l.color} stroke="rgba(24,24,27,0.9)" strokeWidth={2} />;
        })}
        {xTicks.map((t) => (
          <text key={t.label} x={t.x} y={H - 6} textAnchor="middle" className="tline-axis-label">{t.label}</text>
        ))}
        {tooltip && (
          <g>
            <line x1={tooltip.x} x2={tooltip.x} y1={PAD.top} y2={H - PAD.bottom} stroke="rgba(244,244,245,0.3)" strokeWidth={1} strokeDasharray="4 4" pointerEvents="none" />
            {tooltip.items.map((item, i) => (
              <circle key={i} cx={tooltip.x} cy={yScale(item.pct)} r={5} fill={item.color} stroke="rgba(24,24,27,0.9)" strokeWidth={2} pointerEvents="none" />
            ))}
          </g>
        )}
        <rect x={PAD.left} y={PAD.top} width={plotW} height={plotH} fill="transparent" />
      </svg>
      {tooltip && (
        <div className="tline-tooltip" style={{ position: "absolute", top: 10, [tooltip.side === "left" ? "right" : "left"]: 90, pointerEvents: "none" }}>
          <div className="tline-tooltip-time">{formatTime(tooltip.time)}</div>
          {tooltip.items.map((item, i) => (
            <div key={i} className="tline-tooltip-row">
              <span className="tline-tooltip-dot" style={{ background: item.color }} />
              <span className="tline-tooltip-name">{item.name}</span>
              <span className="tline-tooltip-pct" style={{ color: item.pct >= 0 ? "var(--up)" : "var(--down)" }}>
                {item.pct >= 0 ? "+" : ""}{item.pct.toFixed(2)}%
              </span>
              <span className="tline-tooltip-price">{item.price?.toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---- Volume Sub-Chart (per group) ---- */

function GroupVolumeChart({ lines, seriesMap, codes }) {
  const H = 160;
  const plotH = H - PAD.top - PAD.bottom;
  const dataMaxLen = lines.length > 0 ? Math.max(...lines.map((l) => l.series.length)) : 1;
  const maxLen = Math.max(dataMaxLen, FULL_TRADING_DAY_LEN);

  const xScale = (i) => PAD.left + (i / Math.max(1, maxLen - 1)) * plotW;

  if (lines.length === 0) return null;

  const sampleStep = Math.max(1, Math.ceil(maxLen / 100));
  const sampleCount = Math.ceil(maxLen / sampleStep);
  const barW = Math.max(3, (plotW / sampleCount) * 0.6 / lines.length);
  const groupW = barW * lines.length;

  const xTicks = getXTicks(maxLen, xScale);

  return (
    <div className="tline-chart-wrapper" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 4 }}>
      <div style={{ padding: "0 16px", fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>成交额</div>
      <svg viewBox={`0 0 ${W} ${H}`} className="tline-svg" preserveAspectRatio="xMidYMid meet">
        {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
          const y = PAD.top + (1 - pct) * plotH;
          return (
            <g key={pct}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} className="tline-grid-line" />
              <text x={PAD.left - 8} y={y} textAnchor="end" dominantBaseline="middle" className="tline-axis-label">{Math.round(pct * 100)}%</text>
            </g>
          );
        })}

        {lines.map((line, lineIdx) => {
          if (line.series.length === 0) return null;
          const stockMax = Math.max(...line.series.map((pt) => pt.amount), 1);
          return line.series
            .filter((_, i) => i % sampleStep === 0)
            .map((pt, si) => {
              const cx = xScale(si * sampleStep);
              const x = cx - groupW / 2 + lineIdx * barW;
              const ratio = pt.amount / stockMax;
              const barH = Math.max(1.5, ratio * plotH);
              const y = PAD.top + plotH - barH;
              return (
                <rect
                  key={`vol-${line.code}-${si}`}
                  x={x} y={y} width={Math.max(2, barW - 1)} height={barH}
                  fill={line.color} opacity={0.7} rx={0}
                />
              );
            });
        })}

        {xTicks.map((t) => (
          <text key={t.label} x={t.x} y={H - 6} textAnchor="middle" className="tline-axis-label">{t.label}</text>
        ))}
      </svg>
    </div>
  );
}

/* ---- Table ---- */

function TlineTable({ groups, seriesMap, metaMap }) {
  const rows = [];
  const groupEntries = Object.entries(groups);
  for (let gi = 0; gi < groupEntries.length; gi++) {
    const [groupName, codes] = groupEntries[gi];
    for (const code of codes) {
      const series = seriesMap.get(code) || [];
      const last = series.length > 0 ? series[series.length - 1] : null;
      rows.push({
        groupName, code,
        name: metaMap.get(code)?.name || code,
        price: last?.price ?? null,
        changePct: last?.change ?? null,
        volume: last?.amount ?? null,
      });
    }
  }
  return (
    <section className="panel" style={{ marginTop: 16 }}>
      <div className="chart-head">
        <div>
          <div className="chart-title" style={{ fontSize: 22 }}>实时行情</div>
          <div className="chart-note">各股票最新价格和涨跌幅</div>
        </div>
      </div>
      <table className="tline-table">
        <thead>
          <tr>
            <th>分组</th><th>代码</th><th>名称</th><th>最新价</th><th>涨跌幅</th><th>成交额</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const cls = r.changePct != null ? (r.changePct >= 0 ? "up" : "down") : "";
            return (
              <tr key={r.code}>
                <td><span className="badge">{r.groupName}</span></td>
                <td className="muted">{r.code}</td>
                <td><strong>{r.name}</strong></td>
                <td>{r.price != null ? r.price.toFixed(2) : "-"}</td>
                <td className={cls}>{r.changePct != null ? formatChangePct(r.changePct) : "-"}</td>
                <td className="muted">{r.volume != null ? formatAmount(r.volume) : "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

/* ---- Helpers ---- */

function getXTicks(maxLen, xScale) {
  const fullDayTimes = [930, 1000, 1030, 1100, 1130, 1300, 1330, 1400, 1430, 1500, 1530];
  const ticks = [];
  for (const t of fullDayTimes) {
    let idx;
    if (t <= 1130) {
      idx = (Math.floor(t / 100) - 9) * 60 + (t % 100) - 30;
    } else {
      idx = 121 + (Math.floor(t / 100) - 13) * 60 + (t % 100);
    }
    if (idx >= 0 && idx < maxLen) {
      ticks.push({ x: xScale(idx), label: formatTime(t) });
    }
  }
  return ticks;
}

function formatTime(minute) {
  if (minute == null) return "";
  const s = String(minute).padStart(4, "0");
  return `${s.slice(0, 2)}:${s.slice(2, 4)}`;
}
function formatChangePct(value) {
  return value == null ? "-" : `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}
function formatAmount(value) {
  if (value == null) return "-";
  if (value >= 1e8) return `${(value / 1e8).toFixed(2)}亿`;
  if (value >= 1e4) return `${(value / 1e4).toFixed(0)}万`;
  return String(value);
}
