import { Hono } from "hono";
import { COLLECT_INTERVAL_MS } from "./constants.js";
import { redirectToPrimaryHost, withNoIndex, isTradingTime } from "./helpers.js";
import { CapitalFlowCollector } from "./collector.js";
import { renderHtml } from "./pages/index.js";
import { STATIC_PAGES, renderStaticPage } from "./pages/static.js";
import { renderRobotsTxt, renderSitemapXml } from "./pages/sitemap.js";

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

  return withNoIndex(Response.json({
    code,
    name: code,
    series: [],
    samples: [],
  }));
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
