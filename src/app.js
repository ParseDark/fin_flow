import { Hono } from "hono";

export function createApp({
  staticPages,
  redirectToPrimaryHost,
  withNoIndex,
  handleFinanceApi,
  handlePlateStocksApi,
  triggerCollection,
  resetCollector,
  handleStatusApi,
  renderRobotsTxt,
  renderSitemapXml,
  renderHtml,
  renderStaticPage,
}) {
  const app = new Hono();

  app.use("*", async (c, next) => {
    const redirectResponse = redirectToPrimaryHost(new URL(c.req.url));
    if (redirectResponse) {
      return redirectResponse;
    }

    await next();
  });

  app.get("/api/finance", async (c) => withNoIndex(await handleFinanceApi(c.req.raw, c.env)));

  app.get("/api/plate-stocks", async (c) => withNoIndex(await handlePlateStocksApi(c.req.raw, c.env)));

  app.get("/api/admin/trigger", async (c) => withNoIndex(await triggerCollection(c.env)));

  app.get("/api/admin/reset", async (c) => withNoIndex(await resetCollector(c.env)));

  app.get("/api/status", async (c) => withNoIndex(await handleStatusApi(c.env)));

  app.get("/robots.txt", (c) => {
    const url = new URL(c.req.url);
    return new Response(renderRobotsTxt(url), {
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

  function renderIndexResponse(c) {
    const url = new URL(c.req.url);
    return new Response(renderHtml(url, c.env.WEB_ANALYTICS_TOKEN), {
      headers: {
        "content-type": "text/html; charset=UTF-8",
        "cache-control": "no-store",
      },
    });
  }

  app.get("/", renderIndexResponse);
  app.get("/index.html", renderIndexResponse);

  for (const [pathname, page] of Object.entries(staticPages)) {
    app.get(pathname, (c) => {
      const url = new URL(c.req.url);
      return new Response(renderStaticPage(url, c.env.WEB_ANALYTICS_TOKEN, page), {
        headers: {
          "content-type": "text/html; charset=UTF-8",
          "cache-control": "public, max-age=300",
        },
      });
    });
  }

  app.notFound(() => new Response("Not found", { status: 404 }));

  return app;
}
