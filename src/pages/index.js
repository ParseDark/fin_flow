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
    <div id="app"></div>`;
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

import { UI_CSS } from "./ui-build.js";
import { UI_JS } from "./ui-build.js";

// ---- CSS content ----

function renderCss() {
  return UI_CSS;
}

// ---- Frontend JS content ----

function renderFrontendScript() {
  return UI_JS;
}

// ---- Main export ----

export function renderHtml(requestUrl, webAnalyticsToken, meta = {}) {
  const canonicalUrl = buildCanonicalUrl(requestUrl);
  // per-page SEO 覆盖：SPA 页（如 /aggregate）可传 { title, description }，缺省回退全局值。
  const title = meta.title || SITE_TITLE;
  const description = meta.description || SITE_DESCRIPTION;
  const structuredData = renderStructuredData(canonicalUrl);
  const webAnalyticsScript = renderWebAnalyticsScript(webAnalyticsToken);

  return `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="theme-color" content="#fafafa" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="zh_CN" />
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
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
    <script>
${renderFrontendScript()}
    </script>
    ${webAnalyticsScript}
  </body>
</html>`;
}
