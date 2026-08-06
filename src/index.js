import { Hono } from "hono";
import { COLLECT_INTERVAL_MS } from "./constants.js";
import { redirectToPrimaryHost, withNoIndex, isTradingTime } from "./helpers.js";
import { CapitalFlowCollector } from "./collector.js";
import { renderHtml } from "./pages/index.js";
import { STATIC_PAGES, renderStaticPage } from "./pages/static.js";
import { renderRobotsTxt, renderSitemapXml } from "./pages/sitemap.js";
import { renderAggregateMarkdown } from "./aggregate.js";

export { CapitalFlowCollector } from "./collector.js";

const app = new Hono();

// ---- Redirect to primary host ----
app.use("*", async (c, next) => {
  const url = new URL(c.req.url);
  const redirect = redirectToPrimaryHost(url);
  if (redirect) return redirect;
  return next();
});

// ---- API routes ----
app.get("/api/finance", async (c) => {
  const url = new URL(c.req.url);
  const requestedDate = url.searchParams.get("date");
  const stub = getCollectorStub(c.env);

  if (!requestedDate) {
    const statusResponse = await stub.fetch("https://collector.internal/status");
    if (statusResponse.ok) {
      const status = await statusResponse.json();
      if (shouldCollectFromStatus(status)) {
        await stub.fetch("https://collector.internal/collect");
      }
    }
  }

  let response = await stub.fetch(
    `https://collector.internal/day${requestedDate ? `?date=${requestedDate}` : ""}`,
  );

  if (response.status === 404) {
    await stub.fetch("https://collector.internal/collect");
    response = await stub.fetch(
      `https://collector.internal/day${requestedDate ? `?date=${requestedDate}` : ""}`,
    );
  }

  return withNoIndex(response);
});

app.get("/api/plate-stocks", async (c) => {
  const url = new URL(c.req.url);
  const code = url.searchParams.get("code") || "";
  if (!code) {
    return withNoIndex(Response.json({ code: "", name: "", stocks: [], error: "missing code" }, { status: 400 }));
  }

  try {
    const upstream = await fetch(
      `https://x-quote.cls.cn/v2/quote/a/plate/stocks?app=CailianpressWeb&os=web&sv=8.4.6&plate_code=${encodeURIComponent(code)}`,
      {
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Origin": "https://www.cls.cn",
          "Referer": "https://www.cls.cn/",
          "User-Agent": "Mozilla/5.0",
        },
      }
    );
    const json = await upstream.json();
    const stocks = (json?.data?.stocks || []).slice(0, 20).map((s) => ({
      code: s.stock_code,
      name: s.stock_name,
      change: parseFloat(String(s.change).replace("%", "")) || 0,
      isCore: s.is_core === 1,
    }));

    return withNoIndex(Response.json({ code, name: code, stocks }));
  } catch (e) {
    return withNoIndex(Response.json({ code, name: code, stocks: [], error: e.message }, { status: 502 }));
  }
});

app.get("/api/admin/trigger", async (c) => {
  const stub = getCollectorStub(c.env);
  return withNoIndex(await stub.fetch("https://collector.internal/collect"));
});

app.get("/api/admin/reset", async (c) => {
  const stub = getCollectorStub(c.env);
  return withNoIndex(await stub.fetch("https://collector.internal/reset"));
});

app.get("/api/status", async (c) => {
  const stub = getCollectorStub(c.env);
  return withNoIndex(await stub.fetch("https://collector.internal/status"));
});

app.get("/api/aggregate", async (c) => {
  const stub = getCollectorStub(c.env);
  const response = await stub.fetch(buildAggregateInternalUrl(c.req.url));
  return withNoIndex(response);
});

// Markdown 输出，供下游 AI / LLM 直接消费。
// ?section=favored|abandoned|trend|netflow|change 可只取其中一段，省 token。
const handleAggregateMarkdown = async (c) => {
  const stub = getCollectorStub(c.env);
  const response = await stub.fetch(buildAggregateInternalUrl(c.req.url));
  const json = await response.json().catch(() => null);
  const section = new URL(c.req.url).searchParams.get("section") || "";

  if (!response.ok || !json || json.error) {
    return new Response(`# 错误\n\n${json?.error || "No closing data in selected range"}\n`, {
      status: 404,
      headers: { "content-type": "text/markdown; charset=UTF-8" },
    });
  }

  return new Response(renderAggregateMarkdown(json, section), {
    headers: {
      "content-type": "text/markdown; charset=UTF-8",
      "cache-control": "public, max-age=60, stale-while-revalidate=120",
    },
  });
};

app.get("/api/aggregate.md", handleAggregateMarkdown);
app.get("/aggregate.md", handleAggregateMarkdown);

// ---- Static assets ----
app.get("/robots.txt", (c) => {
  return new Response(renderRobotsTxt(), {
    headers: {
      "content-type": "text/plain; charset=UTF-8",
      "cache-control": "public, max-age=3600",
    },
  });
});

app.get("/sitemap.xml", (c) => {
  const url = new URL(c.req.url);
  return new Response(renderSitemapXml(url), {
    headers: {
      "content-type": "application/xml; charset=UTF-8",
      "cache-control": "public, max-age=3600",
    },
  });
});

// ---- Static pages ----
for (const [path, page] of Object.entries(STATIC_PAGES)) {
  app.get(path, (c) => {
    const url = new URL(c.req.url);
    return new Response(renderStaticPage(url, c.env.WEB_ANALYTICS_TOKEN, page), {
      headers: {
        "content-type": "text/html; charset=UTF-8",
        "cache-control": "public, max-age=300",
      },
    });
  });
}

// ---- Home page ----
app.get("/", (c) => {
  const url = new URL(c.req.url);
  return new Response(renderHtml(url, c.env.WEB_ANALYTICS_TOKEN), {
    headers: {
      "content-type": "text/html; charset=UTF-8",
      "cache-control": "no-store",
    },
  });
});

// ---- Tline API proxy (bypass CORS) ----
app.get("/api/tline", async (c) => {
  const url = new URL(c.req.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return c.json({ error: "missing code param" }, 400);
  }

  try {
    const upstream = await fetch(
      `https://x-quote.cls.cn/v2/quote/a/tline?app=CailianpressWeb&os=web&secu_code=${encodeURIComponent(code)}&sv=8.7.9`,
      {
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Accept-Language": "en,zh-CN;q=0.9,zh;q=0.8",
          "Content-Type": "application/json",
          "Origin": "https://www.cls.cn",
          "Referer": "https://www.cls.cn/",
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
        },
      }
    );
    const data = await upstream.json();
    return c.json(data);
  } catch (e) {
    return c.json({ error: e.message }, 502);
  }
});

// ---- Tline page (stock timeline comparison) ----
app.get("/tline", (c) => {
  const url = new URL(c.req.url);
  return new Response(renderHtml(url, c.env.WEB_ANALYTICS_TOKEN), {
    headers: {
      "content-type": "text/html; charset=UTF-8",
      "cache-control": "no-store",
    },
  });
});

// ---- Aggregate page (range fund-flow percentile summary) ----
app.get("/aggregate", (c) => {
  const url = new URL(c.req.url);
  return new Response(renderHtml(url, c.env.WEB_ANALYTICS_TOKEN, {
    title: "资金分位汇总：一段时间里资金往哪搬 | 题材资金流回放",
    description:
      "按区间汇总 A 股概念板块主力资金收盘快照，用当日横截面资金分位消除概念规模差异，对比区间前后半段，找出资金真正的迁移方向。",
  }), {
    headers: {
      "content-type": "text/html; charset=UTF-8",
      "cache-control": "no-store",
    },
  });
});

// ---- 404 ----
app.notFound(() => new Response("Not found", { status: 404 }));

// ---- Worker entry points ----

export default {
  fetch: app.fetch,

  async scheduled(controller, env, ctx) {
    ctx.waitUntil(maintainCollector(env, controller.scheduledTime));
  },
};

// ---- Internal helpers ----

function getCollectorStub(env) {
  const id = env.COLLECTOR.idFromName("capital-flow-primary");
  return env.COLLECTOR.get(id);
}

// 把外部请求的 start/end/limit 参数透传给 DO 内部 /aggregate。
function buildAggregateInternalUrl(requestUrl) {
  const source = new URL(requestUrl);
  const params = new URLSearchParams();
  for (const key of ["start", "end", "limit"]) {
    const value = source.searchParams.get(key);
    if (value) params.set(key, value);
  }
  const query = params.toString();
  return `https://collector.internal/aggregate${query ? `?${query}` : ""}`;
}

function shouldCollectFromStatus(status, now = new Date()) {
  if (!status?.isTradingTime) return false;
  if (!status.lastSuccessAt || status.latestSnapshotDate !== status.todayDate) return true;
  const lastSuccessAt = new Date(status.lastSuccessAt);
  if (!Number.isFinite(lastSuccessAt.getTime())) return true;
  return now.getTime() - lastSuccessAt.getTime() > COLLECT_INTERVAL_MS * 2;
}

async function maintainCollector(env, scheduledTime = Date.now()) {
  const stub = getCollectorStub(env);
  await stub.fetch(`https://collector.internal/ensure?t=${scheduledTime}`);

  const statusResponse = await stub.fetch("https://collector.internal/status");
  if (!statusResponse.ok) return;

  const status = await statusResponse.json();
  if (shouldCollectFromStatus(status, new Date(scheduledTime))) {
    await stub.fetch("https://collector.internal/collect");
  }
}
