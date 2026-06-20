import { SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from "../constants.js";
import {
  escapeHtml,
  buildCanonicalUrl,
  renderWebAnalyticsScript,
} from "../helpers.js";

export const STATIC_PAGES = {
  "/about": {
    title: "关于本站 | 题材资金流回放",
    description: "了解题材资金流回放的定位、适合人群和使用场景，帮助你更高效地做 A 股概念板块观察与复盘。",
    heading: "关于题材资金流回放",
    intro: "这是一个面向 A 股交易观察与复盘的轻量工具站，聚焦概念板块主力资金流的数据可视化与日内回放。",
    sections: [
      {
        title: "这个站解决什么问题",
        paragraphs: [
          "盘中看题材轮动，常见问题不是看不到数据，而是很难把一天内的资金迁移过程串起来。本站把概念板块净流入和净流出的变化按时间采样保存下来，让你可以按交易日回看。",
          "它更适合做盘面观察、收盘复盘和思路验证，而不是替代完整行情终端。",
        ],
      },
      {
        title: "适合谁使用",
        paragraphs: [
          "如果你关注 A 股短线题材、概念板块联动、主力资金变化，或者希望用更直观的方式复盘盘面，这个站会比较合适。",
        ],
      },
    ],
  },
  "/guide/a-share-concept-flow": {
    title: "A股概念资金流怎么看 | 题材资金流回放",
    description: "从净流入、净流出、题材轮动和日内回放角度，理解 A 股概念板块资金流数据的观察方法。",
    heading: "A股概念资金流怎么看",
    intro: "看概念板块资金流，不是只盯某个时点的涨跌，而是看板块之间的资金切换节奏、持续性和集中度。",
    sections: [
      {
        title: "先看净流入与净流出",
        paragraphs: [
          "净流入靠前，说明该板块在当前阶段获得更多主力资金关注；净流出靠前，则说明资金在撤离或切换。两个方向要结合着看，才能知道市场是在扩散还是收缩。",
        ],
      },
      {
        title: "再看日内回放",
        paragraphs: [
          "单一快照容易误判。真正有价值的是观察一个概念板块能否在多个时点持续保持强势，还是只在某个时间窗口被短暂拉升。",
          "通过日内回放，可以更直观地看到题材轮动、分歧转一致、高潮后回落等过程。",
        ],
      },
      {
        title: "结合集中度理解盘面",
        paragraphs: [
          "如果资金高度集中在少数概念，说明短线抱团明显；如果资金分布更分散，往往意味着市场主线不够明确，轮动更快。",
        ],
      },
    ],
  },
  "/methodology": {
    title: "数据口径与方法说明 | 题材资金流回放",
    description: "查看本站关于 A 股概念板块资金流的数据来源、采样方式、展示范围和使用边界。",
    heading: "数据口径与方法说明",
    intro: "为了兼顾盘中可用性、数据体积和回放体验，本站对概念板块资金流做了有限采样和筛选。",
    sections: [
      {
        title: "采样范围",
        paragraphs: [
          "当前默认采集并展示概念板块主力资金净流入 Top 10 和净流出 Top 10。这个范围更利于观察主线和资金切换，也能减少无效噪声。",
        ],
      },
      {
        title: "时间粒度",
        paragraphs: [
          "系统按固定间隔抓取盘中样本，并按交易日存储，供页面进行日内回放。回放结果更适合观察趋势和结构变化，而不是精确还原每一笔成交。",
        ],
      },
      {
        title: "使用边界",
        paragraphs: [
          "本站展示的是概念板块层面的观察视角，不构成投资建议。建议结合个股走势、成交额、情绪指标和新闻催化综合判断。",
        ],
      },
    ],
  },
};

export function renderStaticPage(requestUrl, webAnalyticsToken, page) {
  const canonicalUrl = buildCanonicalUrl(requestUrl);
  const webAnalyticsScript = renderWebAnalyticsScript(webAnalyticsToken);
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.heading,
    description: page.description,
    inLanguage: "zh-CN",
    mainEntityOfPage: canonicalUrl,
    url: canonicalUrl,
  });

  return `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <meta property="og:type" content="article" />
    <meta property="og:locale" content="zh_CN" />
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/basecoat-css@0.3.11/dist/basecoat.cdn.min.css">
    <style>
      :root { color-scheme: light; --bg:#fafafa; --panel:#fff; --line:rgba(39,39,42,.12); --text:#18181b; --muted:rgba(39,39,42,.68); }
      * { box-sizing: border-box; }
      body { margin:0; background:linear-gradient(180deg,#fafafa,#f4f4f5); color:var(--text); font-family:"Avenir Next","Segoe UI",sans-serif; }
      .page { width:min(920px,calc(100% - 28px)); margin:0 auto; padding:28px 0 56px; }
      .panel { background:rgba(255,255,255,.96); border:1px solid var(--line); border-radius:24px; padding:24px; box-shadow:0 8px 30px rgba(0,0,0,.04); }
      h1 { margin:0 0 12px; font-size:clamp(32px,5vw,52px); line-height:1; letter-spacing:-.04em; }
      h2 { margin:28px 0 10px; font-size:24px; }
      p { margin:0 0 14px; line-height:1.8; color:var(--muted); }
      .eyebrow { margin-bottom:10px; font-size:12px; letter-spacing:.14em; text-transform:uppercase; color:#a16207; }
      .topnav { display:flex; gap:14px; flex-wrap:wrap; margin-top:16px; }
      a { color:#0f766e; text-decoration:none; }
      a:hover { text-decoration:underline; }
    </style>
    <script type="application/ld+json">${structuredData}</script>
  </head>
  <body>
    <main class="page">
      <article class="panel">
        <div class="eyebrow">${escapeHtml(SITE_NAME)}</div>
        <h1>${escapeHtml(page.heading)}</h1>
        <p>${escapeHtml(page.intro)}</p>
        ${page.sections.map((section) => `
        <section>
          <h2>${escapeHtml(section.title)}</h2>
          ${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
        </section>`).join("")}
        <nav class="topnav">
          <a href="/">返回首页</a>
          <a href="/about">关于本站</a>
          <a href="/guide/a-share-concept-flow">A股概念资金流怎么看</a>
          <a href="/methodology">数据口径与方法说明</a>
        </nav>
      </article>
    </main>
    ${webAnalyticsScript}
  </body>
</html>`;
}
