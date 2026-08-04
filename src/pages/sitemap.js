import { SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, PRIMARY_SITE_ORIGIN } from "../constants.js";
import {
  escapeHtml,
  escapeXml,
  buildCanonicalUrl,
} from "../helpers.js";
import { STATIC_PAGES } from "./static.js";

export function renderRobotsTxt() {
  return [
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    "Disallow: /api/admin/",
    `Sitemap: ${PRIMARY_SITE_ORIGIN}/sitemap.xml`,
  ].join("\n");
}

export function renderSitemapXml(url) {
  const lastmod = new Date().toISOString();
  const urls = ["/", "/aggregate", ...Object.keys(STATIC_PAGES)];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map((path) => `  <url>
    <loc>${escapeXml(buildCanonicalUrl(url, path))}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${path === "/" ? "hourly" : "weekly"}</changefreq>
    <priority>${path === "/" ? "1.0" : "0.8"}</priority>
  </url>`).join("\n")}
</urlset>`;
}
