import {
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  DISPLAY_CONCEPT_COUNT,
  DEFAULT_FLOW_GROUP_SIZE,
  PRIMARY_SITE_URL,
} from "../constants.js";
import {
  escapeHtml,
  buildCanonicalUrl,
  renderWebAnalyticsScript,
} from "../helpers.js";

// Read CSS and JS content will be imported at build time or inlined.
// For Cloudflare Workers, we inline them as template literals.

function renderStructuredData(canonicalUrl) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: canonicalUrl,
        inLanguage: "zh-CN",
        description: SITE_DESCRIPTION,
      },
      {
        "@type": "Dataset",
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        url: canonicalUrl,
        inLanguage: "zh-CN",
        keywords: [
          "A股", "概念板块", "资金流", "数据可视化",
          "主力资金", "日内回放", "复盘", "题材",
        ],
      },
    ],
  });
}

// ---- Body HTML fragment ----

function renderBody() {
  return `
    <main class="page">
      <section class="hero">
        <article class="panel hero-copy">
          <div class="eyebrow">A-Share Concept Flow / ${DISPLAY_CONCEPT_COUNT} Signals</div>
          <h1>A股概念资金流<br>数据可视化回放。</h1>
          <p class="lead">
            后台自动采集并按天存储 A 股概念板块主力资金流。当前页面聚焦净流入 Top ${DEFAULT_FLOW_GROUP_SIZE} 与净流出 Top ${DEFAULT_FLOW_GROUP_SIZE}，
            支持按交易日查看、日内回放、盘面观察与收盘复盘，帮助你更直观地理解题材轮动和资金迁移。
          </p>
          <p class="lead" style="margin-top:14px;">
            延伸阅读：
            <a href="/about">关于本站</a> /
            <a href="/guide/a-share-concept-flow">A股概念资金流怎么看</a> /
            <a href="/methodology">数据口径与方法说明</a>
          </p>
        </article>
        <article class="panel hero-side">
          <div>
            <div class="flex items-start justify-between gap-3">
              <div>
                <div class="metric-label">当前模式</div>
                <div class="metric-value" style="font-size:34px;">${DISPLAY_CONCEPT_COUNT} 概念回放</div>
              </div>
              <button
                type="button"
                aria-label="切换明暗主题"
                data-tooltip="切换主题"
                data-side="bottom"
                onclick="document.dispatchEvent(new CustomEvent('basecoat:theme'))"
                class="btn-icon-outline size-8"
              >
                <span class="hidden dark:block">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                </span>
                <span class="block dark:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                </span>
              </button>
            </div>
          </div>
          <div class="status-rail">
            <div class="status-pill">
              <div class="label">上海时间</div>
              <div class="value"><span class="badge" id="status-now">--</span></div>
            </div>
            <div class="status-pill">
              <div class="label">交易阶段</div>
              <div class="value"><span class="badge" id="status-session">--</span></div>
            </div>
            <div class="status-pill">
              <div class="label">下次采集</div>
              <div class="value"><kbd id="status-next-run">--</kbd></div>
            </div>
            <div class="status-pill">
              <div class="label">今日样本</div>
              <div class="value"><kbd id="status-samples">--</kbd></div>
            </div>
          </div>
        </article>
      </section>

      <section class="controls">
        <div class="control-field">
          <span class="control-label">交易日</span>
          <div id="date-combobox" class="select">
            <button type="button" class="btn" id="date-combobox-trigger" aria-haspopup="listbox" aria-expanded="false" aria-controls="date-combobox-listbox">
              <span class="truncate">选择交易日</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m7 15 5 5 5-5"></path>
                <path d="m7 9 5-5 5 5"></path>
              </svg>
            </button>
            <div id="date-combobox-popover" data-popover aria-hidden="true">
              <header>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
                <input type="text" value="" placeholder="搜索交易日..." autocomplete="off" autocorrect="off" spellcheck="false" aria-autocomplete="list" role="combobox" aria-expanded="false" aria-controls="date-combobox-listbox" aria-labelledby="date-combobox-trigger">
              </header>
              <div role="listbox" id="date-combobox-listbox" aria-orientation="vertical" aria-labelledby="date-combobox-trigger" data-empty="暂无交易日数据"></div>
            </div>
            <input id="date-combobox-value" type="hidden" name="trade-date" value="">
          </div>
        </div>
        <div class="panel" style="padding:12px 14px;">
          <div class="metric-label">当前市场切片</div>
          <div id="current-time" class="metric-value" style="font-size:24px;">--:--:--</div>
        </div>
        <div class="control-field">
          <span class="control-label">最新交易日</span>
          <button id="latest-btn" class="btn-secondary" type="button">跳到最新</button>
        </div>
      </section>

      <section class="metric-grid loading-dim" aria-busy="true">
        <article class="card metric">
          <header class="metric-row">
            <div><h2 class="metric-label">最近采集时间</h2><p class="sr-only">实时更新</p></div>
            <span class="badge">Live</span>
          </header>
          <section><div class="metric-value" id="updated-at">--:--:--</div></section>
        </article>
        <article class="card metric">
          <header class="metric-row">
            <div><h2 class="metric-label">所选交易日</h2><p class="sr-only">中国市场</p></div>
            <kbd class="kbd">CN</kbd>
          </header>
          <section><div class="metric-value" id="selected-date">--</div></section>
        </article>
        <article class="card metric">
          <header class="metric-row">
            <div><h2 class="metric-label">净流入 / 净流出</h2><p class="sr-only">概念分布</p></div>
            <span class="badge-secondary">分布</span>
          </header>
          <section>
            <div class="metric-value" id="positive-count">--</div>
            <p class="metric-sub" id="positive-sub">--</p>
          </section>
        </article>
        <article class="card metric">
          <header class="metric-row">
            <div><h2 class="metric-label">净流入 Top3</h2><p class="sr-only">流入主力资金</p></div>
            <span class="badge-outline">📈</span>
          </header>
          <section>
            <div class="metric-value up" id="inflow-top3-card">--</div>
            <p class="metric-sub">买入端前三规模</p>
          </section>
        </article>
        <article class="card metric">
          <header class="metric-row">
            <div><h2 class="metric-label">净流出 Top3</h2><p class="sr-only">流出主力资金</p></div>
            <span class="badge-outline">📉</span>
          </header>
          <section>
            <div class="metric-value down" id="outflow-top3-card">--</div>
            <p class="metric-sub">卖出端前三规模</p>
          </section>
        </article>
        <article class="card metric">
          <header class="metric-row">
            <div><h2 class="metric-label">流入集中</h2><p class="sr-only">流入前三占比</p></div>
            <span class="badge-outline up">📈</span>
          </header>
          <section>
            <div class="metric-value" id="top-three-share">--</div>
            <p class="metric-sub">占流入总量比例</p>
          </section>
        </article>
        <article class="card metric">
          <header class="metric-row">
            <div><h2 class="metric-label">流出集中</h2><p class="sr-only">流出前三占比</p></div>
            <span class="badge-outline down">📉</span>
          </header>
          <section>
            <div class="metric-value" id="concentration-badge">--</div>
            <p class="metric-sub">占流出总量比例</p>
          </section>
        </article>
        <article class="card metric">
          <header class="metric-row">
            <div><h2 class="metric-label">市场净资金</h2><p class="sr-only">整体资金强度</p></div>
            <span class="badge-outline">📊</span>
          </header>
          <section>
            <div class="metric-value" id="net-flow-stat">--</div>
            <p class="metric-sub">净流入 + 净流出总和</p>
          </section>
        </article>
        <article class="card metric">
          <header class="metric-row">
            <div><h2 class="metric-label">市场温度</h2><p class="sr-only">市场情绪</p></div>
            <span class="badge-outline">🌡️</span>
          </header>
          <section>
            <div class="metric-value" id="emotion-degree">--</div>
            <p class="metric-sub">成交 <span id="emotion-balance">--</span> <span id="emotion-balchg">--</span> · 预估 <span id="emotion-preview">--</span></p>
          </section>
        </article>
        <article class="card metric">
          <header class="metric-row">
            <div><h2 class="metric-label">涨停板</h2><p class="sr-only">市场强度</p></div>
            <span class="badge-outline">📋</span>
          </header>
          <section>
            <div class="metric-value" id="emotion-updown">--</div>
            <p class="metric-sub">封板率 <span id="emotion-ratio">--</span></p>
          </section>
        </article>
        <article class="card metric">
          <header class="metric-row">
            <div><h2 class="metric-label">昨日涨停表现</h2><p class="sr-only">溢价</p></div>
            <span class="badge-outline">📊</span>
          </header>
          <section>
            <div class="metric-value" id="emotion-perf">--</div>
            <p class="metric-sub">高开 <span id="emotion-open">--</span> · 盈利 <span id="emotion-profit">--</span></p>
          </section>
        </article>
        <article class="card metric">
          <header class="metric-row">
            <div><h2 class="metric-label">上涨 / 下跌</h2><p class="sr-only">涨跌家数</p></div>
            <span class="badge-outline">📈📉</span>
          </header>
          <section>
            <div class="metric-value" id="emotion-risefall">--</div>
            <p class="metric-sub">涨停 <span id="emotion-up">--</span> · 跌停 <span id="emotion-down">--</span></p>
          </section>
        </article>
        <div class="loading-overlay" aria-hidden="true">
          <div class="loading-stack">
            <div class="loading-label">正在加载交易日数据...</div>
            <div class="loading-grid">
              <div class="skeleton-card"></div><div class="skeleton-card"></div>
              <div class="skeleton-card"></div><div class="skeleton-card"></div>
              <div class="skeleton-card"></div><div class="skeleton-card"></div>
              <div class="skeleton-card"></div><div class="skeleton-card"></div>
            </div>
          </div>
        </div>
      </section>

      <section class="panel chart-panel loading-dim" aria-busy="true">
        <div class="chart-head">
          <div>
            <div class="chart-title">日内资金曲线</div>
            <div class="chart-note">当前仅采集并展示主力净流入前 ${DEFAULT_FLOW_GROUP_SIZE} 和净流出前 ${DEFAULT_FLOW_GROUP_SIZE} 的概念。光标所在位置，就是你当前查看的市场切片。</div>
            <div class="chart-stats">
              <span class="chart-filter-tags">
                <button class="btn-outline size-sm chart-filter-btn is-active" data-filter="limit10">前10</button>
                <button class="btn-outline size-sm chart-filter-btn" data-filter="top3">关注前三</button>
                <button class="btn-outline size-sm chart-filter-btn" data-filter="bottom3">关注后三</button>
                <button class="btn-outline size-sm chart-filter-btn" data-filter="inflow">只看净流入</button>
                <button class="btn-outline size-sm chart-filter-btn" data-filter="outflow">只看净流出</button>
              </span>
            </div>
            <div class="featured-legend" id="featured-legend"></div>
          </div>
          <div class="speed-group">
            <button id="play-btn" class="btn" type="button">播放日内轨迹</button>
            <button class="btn-secondary speed-btn" data-speed="20" type="button">20x</button>
            <button class="btn-secondary speed-btn" data-speed="40" type="button">40x</button>
            <button class="btn-secondary speed-btn" data-speed="60" type="button">60x</button>
          </div>
        </div>
        <div id="chart"></div>
        <div class="chart-custom-legend" id="chart-custom-legend"></div>
        <div id="netflow-chart" style="height:120px;margin-top:8px;"></div>
        <div id="emotion-chart" style="height:180px;margin-top:8px;"></div>
        <div class="anchor-stream">
          <div class="anchor-stream-head">
            <div class="anchor-stream-title">大盘联动</div>
            <div class="anchor-stream-meta" id="anchor-stream-meta">等待联动数据...</div>
          </div>
          <div class="anchor-stream-list" id="anchor-stream"></div>
        </div>
        <div class="scrubber">
          <div class="scrubber-head">
            <div class="muted">时间进度</div>
            <kbd id="sample-progress">0 / 0</kbd>
          </div>
          <input id="timeline" class="timeline input w-full" type="range" min="0" max="0" value="0" step="1">
        </div>
        <div class="loading-overlay" aria-hidden="true">
          <div class="loading-stack">
            <div class="loading-label">正在绘制日内资金曲线...</div>
            <div class="skeleton-line wide"></div>
            <div class="skeleton-card skeleton-chart"></div>
            <div class="skeleton-card skeleton-netflow"></div>
            <div class="skeleton-card skeleton-emotion"></div>
            <div class="skeleton-line md"></div>
          </div>
        </div>
      </section>

      <section class="panel concepts-panel loading-dim" aria-busy="true">
        <div class="concepts-head">
          <div>
            <div class="chart-title" style="font-size:24px;">概念板块资金流</div>
            <div class="chart-note">左列为净流入概念，右列为净流出概念。可通过上方筛选器自由选择关注的板块。</div>
          </div>
          <div class="metric-sub">Top ${DISPLAY_CONCEPT_COUNT} Concepts</div>
        </div>
        <div class="concepts-grid" id="concepts-grid"></div>
        <div class="loading-overlay" aria-hidden="true">
          <div class="loading-stack">
            <div class="loading-label">正在整理概念资金流...</div>
            <div class="loading-concepts">
              <div class="skeleton-card skeleton-concept"></div>
              <div class="skeleton-card skeleton-concept"></div>
              <div class="skeleton-card skeleton-concept"></div>
              <div class="skeleton-card skeleton-concept"></div>
              <div class="skeleton-card skeleton-concept"></div>
              <div class="skeleton-card skeleton-concept"></div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <div class="drawer-backdrop" id="stock-drawer-backdrop" aria-hidden="true"></div>
    <aside class="stock-drawer" id="stock-drawer" aria-hidden="true" aria-labelledby="stock-drawer-title">
      <header class="stock-drawer-head">
        <div>
          <h2 class="stock-drawer-title" id="stock-drawer-title">板块个股分时</h2>
          <div class="stock-drawer-meta" id="stock-drawer-meta">选择一个概念板块查看个股资金流。</div>
        </div>
        <button class="btn-icon-outline size-8" id="stock-drawer-close" type="button" aria-label="关闭板块个股分时">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </header>
      <div class="stock-chart-wrap">
        <div id="stock-drawer-chart"></div>
        <div class="stock-loading-overlay" id="stock-loading-overlay" aria-hidden="true">
          <div class="stock-loading-card">
            <div class="stock-loading-head">
              <span class="stock-spinner" aria-hidden="true"></span>
              <span>正在加载板块个股分时</span>
            </div>
            <div class="stock-loading-lines" aria-hidden="true">
              <div class="skeleton-line wide"></div>
              <div class="skeleton-line md"></div>
              <div class="skeleton-line wide"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="stock-list" id="stock-drawer-list"></div>
    </aside>`;
}

// ---- Theme init script (before CSS to avoid FOUC) ----

function renderThemeInit() {
  return `<script>
      (() => {
        try {
          const stored = localStorage.getItem('themeMode');
          if (stored ? stored === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
          }
        } catch (_) {}

        const apply = dark => {
          document.documentElement.classList.toggle('dark', dark);
          try { localStorage.setItem('themeMode', dark ? 'dark' : 'light'); } catch (_) {}
        };

        document.addEventListener('basecoat:theme', (event) => {
          const mode = event.detail?.mode;
          apply(
            mode === 'dark'
              ? true
              : mode === 'light'
                ? false
                : !document.documentElement.classList.contains('dark')
          );
        });
      })();
    </script>`;
}

import { CSS_CONTENT } from "./css.js";
import { MAIN_SCRIPT } from "./script.js";

// ---- CSS content ----

function renderCss() {
  return CSS_CONTENT;
}

// ---- Frontend JS content ----

function renderFrontendScript() {
  return MAIN_SCRIPT;
}

// ---- Main export ----

export function renderHtml(requestUrl, webAnalyticsToken) {
  const canonicalUrl = buildCanonicalUrl(requestUrl);
  const structuredData = renderStructuredData(canonicalUrl);
  const webAnalyticsScript = renderWebAnalyticsScript(webAnalyticsToken);

  return `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(SITE_TITLE)}</title>
    <meta name="description" content="${escapeHtml(SITE_DESCRIPTION)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="theme-color" content="#fafafa" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="zh_CN" />
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
    <meta property="og:title" content="${escapeHtml(SITE_TITLE)}" />
    <meta property="og:description" content="${escapeHtml(SITE_DESCRIPTION)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(SITE_TITLE)}" />
    <meta name="twitter:description" content="${escapeHtml(SITE_DESCRIPTION)}" />
    ${renderThemeInit()}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/basecoat-css@0.3.11/dist/basecoat.cdn.min.css">
    <script src="https://cdn.jsdelivr.net/npm/basecoat-css@0.3.11/dist/js/basecoat.min.js" defer></script>
    <style>
${renderCss()}
    </style>
    <script type="application/ld+json">${structuredData}</script>
  </head>
  <body data-loading="true">
${renderBody()}
    <script src="https://code.highcharts.com/12/highcharts.js"></script>
    <script>
${renderFrontendScript()}
    </script>
    ${webAnalyticsScript}
  </body>
</html>`;
}
