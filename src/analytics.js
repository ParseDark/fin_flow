const ACCOUNT_TAG = "b01c38cdbde6badc45f3c084e2a05485";
const SITE_TAG = "77cf5a1dc22f4cf1bfb882035a07ad7f";
const CACHE_TTL_SECONDS = 300;

async function queryRum(token, dateGeq, dateLeq) {
  const query = `query {
    viewer {
      accounts(filter: {accountTag: "${ACCOUNT_TAG}"}) {
        rumPageloadEventsAdaptiveGroups(
          limit: 1,
          filter: {siteTag: "${SITE_TAG}", date_geq: "${dateGeq}", date_leq: "${dateLeq}"}
        ) {
          count
          sum { visits }
        }
      }
    }
  }`;

  const response = await fetch("https://api.cloudflare.com/client/v4/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`Cloudflare GraphQL API 错误: ${response.status}`);
  }

  const json = await response.json();
  const rows = json?.data?.viewer?.accounts?.[0]?.rumPageloadEventsAdaptiveGroups || [];
  const pageviews = rows.reduce((sum, r) => sum + (r.count || 0), 0);
  const visits = rows.reduce((sum, r) => sum + (r.sum?.visits || 0), 0);
  return { pageviews, visits };
}

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

export async function fetchAnalyticsSummary(token) {
  const now = new Date();
  const today = isoDate(now);
  const monthAgo = isoDate(new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000));

  const [daily, monthly] = await Promise.all([
    queryRum(token, today, today),
    queryRum(token, monthAgo, today),
  ]);

  return {
    dailyActive: daily.visits,
    dailyPageviews: daily.pageviews,
    monthlyActive: monthly.visits,
    monthlyPageviews: monthly.pageviews,
    updatedAt: now.toISOString(),
  };
}

export async function fetchAnalyticsSummaryCached(token, ctx) {
  const cache = caches.default;
  const cacheKey = new Request("https://internal.cache/analytics-summary");
  const cached = await cache.match(cacheKey);
  if (cached) return cached.json();

  const summary = await fetchAnalyticsSummary(token);
  const response = new Response(JSON.stringify(summary), {
    headers: {
      "content-type": "application/json",
      "cache-control": `public, max-age=${CACHE_TTL_SECONDS}`,
    },
  });
  if (ctx?.waitUntil) {
    ctx.waitUntil(cache.put(cacheKey, response.clone()));
  } else {
    await cache.put(cacheKey, response.clone());
  }
  return summary;
}
