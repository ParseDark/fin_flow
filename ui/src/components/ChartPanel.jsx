import { DEFAULT_FLOW_GROUP_SIZE } from "../../../src/constants.js";

const FILTERS = [
  ["limit10", "前10"],
  ["top3", "关注前三"],
  ["bottom3", "关注后三"],
  ["inflow", "只看净流入"],
  ["outflow", "只看净流出"],
];

const SPEEDS = [20, 40, 60];

export function ChartPanel({ loading }) {
  return (
    <section className="panel chart-panel loading-dim" aria-busy={loading ? "true" : "false"}>
      <div className="chart-head">
        <div>
          <div className="chart-title">日内资金曲线</div>
          <div className="chart-note">
            当前仅采集并展示主力净流入前 {DEFAULT_FLOW_GROUP_SIZE} 和净流出前 {DEFAULT_FLOW_GROUP_SIZE} 的概念。光标所在位置，就是你当前查看的市场切片。
          </div>
          <div className="chart-stats">
            <span className="chart-filter-tags">
              {FILTERS.map(([filter, label], index) => (
                <button
                  className={`btn-outline size-sm chart-filter-btn${index === 0 ? " is-active" : ""}`}
                  data-filter={filter}
                  type="button"
                  key={filter}
                >
                  {label}
                </button>
              ))}
            </span>
          </div>
          <div className="featured-legend" id="featured-legend" />
        </div>
        <div className="speed-group">
          <button id="play-btn" className="btn" type="button">播放日内轨迹</button>
          {SPEEDS.map((speed) => (
            <button className="btn-secondary speed-btn" data-speed={speed} type="button" key={speed}>{speed}x</button>
          ))}
        </div>
      </div>

      <div id="chart" />
      <div className="chart-custom-legend" id="chart-custom-legend" />
      <div id="netflow-chart" style={{ height: 120, marginTop: 8 }} />
      <div id="emotion-chart" style={{ height: 180, marginTop: 8 }} />
      <AnchorStream />
      <Scrubber />
      <LoadingOverlay />
    </section>
  );
}

function AnchorStream() {
  return (
    <div className="anchor-stream">
      <div className="anchor-stream-head">
        <div className="anchor-stream-title">大盘联动</div>
        <div className="anchor-stream-meta" id="anchor-stream-meta">等待联动数据...</div>
      </div>
      <div className="anchor-stream-list" id="anchor-stream" />
    </div>
  );
}

function Scrubber() {
  return (
    <div className="scrubber">
      <div className="scrubber-head">
        <div className="muted">时间进度</div>
        <kbd id="sample-progress">0 / 0</kbd>
      </div>
      <input id="timeline" className="timeline input w-full" type="range" min="0" max="0" defaultValue="0" step="1" />
    </div>
  );
}

function LoadingOverlay() {
  return (
    <div className="loading-overlay" aria-hidden="true">
      <div className="loading-stack">
        <div className="loading-label">正在绘制日内资金曲线...</div>
        <div className="skeleton-line wide" />
        <div className="skeleton-card skeleton-chart" />
        <div className="skeleton-card skeleton-netflow" />
        <div className="skeleton-card skeleton-emotion" />
        <div className="skeleton-line md" />
      </div>
    </div>
  );
}

