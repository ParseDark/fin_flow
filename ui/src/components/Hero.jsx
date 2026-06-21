import { DISPLAY_CONCEPT_COUNT, DEFAULT_FLOW_GROUP_SIZE } from "../../../src/constants.js";
import { formatSessionLabel, formatStatusTime } from "../lib/format.js";

export function Hero({ status }) {
  return (
    <section className="hero">
      <article className="panel hero-copy">
        <div className="eyebrow">A-Share Concept Flow / {DISPLAY_CONCEPT_COUNT} Signals</div>
        <h1>
          A股概念资金流
          <br />
          数据可视化回放。
        </h1>
        <p className="lead">
          后台自动采集并按天存储 A 股概念板块主力资金流。当前页面聚焦净流入 Top {DEFAULT_FLOW_GROUP_SIZE} 与净流出 Top {DEFAULT_FLOW_GROUP_SIZE}，
          支持按交易日查看、日内回放、盘面观察与收盘复盘，帮助你更直观地理解题材轮动和资金迁移。
        </p>
        <p className="lead" style={{ marginTop: 14 }}>
          延伸阅读： <a href="/about">关于本站</a> / <a href="/guide/a-share-concept-flow">A股概念资金流怎么看</a> /{" "}
          <a href="/methodology">数据口径与方法说明</a>
        </p>
      </article>

      <article className="panel hero-side">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="metric-label">当前模式</div>
              <div className="metric-value" style={{ fontSize: 34 }}>{DISPLAY_CONCEPT_COUNT} 概念回放</div>
            </div>
            <button
              type="button"
              aria-label="切换明暗主题"
              data-tooltip="切换主题"
              data-side="bottom"
              onClick={() => document.dispatchEvent(new CustomEvent("basecoat:theme"))}
              className="btn-icon-outline size-8"
            >
              <span className="hidden dark:block">
                <SunIcon />
              </span>
              <span className="block dark:hidden">
                <MoonIcon />
              </span>
            </button>
          </div>
        </div>
        <div className="status-rail">
          <StatusPill label="上海时间" id="status-now" value={status?.chinaNow?.isoLike || "--"} badge />
          <StatusPill label="交易阶段" id="status-session" value={formatSessionLabel(status?.currentTradingSession)} badge />
          <StatusPill label="下次采集" id="status-next-run" value={formatStatusTime(status?.nextRunAt)} kbd />
          <StatusPill label="今日样本" id="status-samples" value={String(status?.samplesToday ?? "--")} kbd />
        </div>
      </article>
    </section>
  );
}

function StatusPill({ label, id, value, badge, kbd }) {
  const content = badge ? (
    <span className="badge" id={id}>{value}</span>
  ) : kbd ? (
    <kbd id={id}>{value}</kbd>
  ) : (
    <span id={id}>{value}</span>
  );

  return (
    <div className="status-pill">
      <div className="label">{label}</div>
      <div className="value">{content}</div>
    </div>
  );
}

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

