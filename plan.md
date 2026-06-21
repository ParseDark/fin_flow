# Svelte + Vite Single-File UI Migration Plan

## Goal

Move the home page UI from hand-written HTML/CSS/JS string modules to a Svelte UI built by Vite, while keeping the Cloudflare Worker API, Durable Object collector, SEO metadata, and existing routes intact.

Priority: generate a single self-contained page response for the UI path. The Worker should continue returning one HTML document with inline CSS and inline JS, avoiding Cloudflare static assets in the first migration.

## Current State

- `src/index.js` owns the Worker routes and returns the home page from `renderHtml()`.
- `src/pages/index.js` renders the full home page as template strings.
- `src/pages/css.js` and `src/pages/script.js` are generated-style modules that export inline CSS and JS strings.
- There is no Vite config, Svelte app, `index.html`, or static asset serving setup.
- Existing APIs such as `/api/finance` and `/api/status` should remain unchanged.

## Proposed Architecture

Add a separate UI source tree:

```text
ui/
  index.html
  src/
    App.svelte
    main.js
    app.css
    lib/

scripts/
  embed-ui.mjs

src/pages/
  ui-build.js       # generated from Vite output
  index.js          # keeps SEO/head rendering, injects generated UI
```

Build flow:

1. Vite builds the Svelte app into `dist/ui`.
2. `scripts/embed-ui.mjs` reads the built JS and CSS files.
3. The script writes `src/pages/ui-build.js` with string exports:

```js
export const UI_CSS = `...`;
export const UI_JS = `...`;
```

4. `src/pages/index.js` imports `UI_CSS` and `UI_JS`, then emits:

```html
<style>...</style>
<div id="app"></div>
<script type="module">...</script>
```

The final Worker response remains a single HTML document.

## Why Postbuild Embedding Instead Of Serving Vite Assets

This project currently has a simple Worker deployment shape: one Worker script with no static asset binding. Keeping CSS and JS inline means:

- no Cloudflare static asset configuration is needed for the first pass;
- `wrangler dev` and `wrangler deploy` stay close to the current workflow;
- canonical URL, analytics token, structured data, and other SEO head content can stay server-rendered;
- rollback is straightforward because the Worker route structure does not need to change.

The tradeoff is browser caching. A separate hashed `app.js` and `style.css` would cache better, but it requires adding static asset serving. That can be a second phase if the UI grows.

## Vite Configuration Direction

Use Vite with Svelte and bias toward deterministic, minimal output:

```js
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  root: "ui",
  plugins: [svelte()],
  build: {
    outDir: "../dist/ui",
    emptyOutDir: true,
    assetsInlineLimit: 100000000,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        manualChunks: undefined,
      },
    },
  },
});
```

Notes:

- `cssCodeSplit: false` keeps CSS in one emitted CSS file.
- `inlineDynamicImports: true` prevents JS chunk splitting for the initial migration.
- `assetsInlineLimit` should inline small imported assets as data URLs. Large visual assets should be avoided in phase one unless they are intentionally embedded.
- The postbuild script is still the source of truth for the final single HTML response.

## Package Scripts

Update `package.json` in the migration:

```json
{
  "scripts": {
    "build:ui": "vite build && node scripts/embed-ui.mjs",
    "build": "npm run build:ui",
    "dev": "npm run build:ui && wrangler dev",
    "deploy": "npm run build:ui && wrangler deploy --env production"
  }
}
```

Optional later scripts:

```json
{
  "scripts": {
    "dev:ui": "vite --host 127.0.0.1",
    "dev:worker": "wrangler dev"
  }
}
```

The first pass should optimize for deployment correctness over hot module reload. A better dev loop can be added once the migration is stable.

## Migration Steps

1. Add Svelte and Vite dependencies.
   - `vite`
   - `svelte`
   - `@sveltejs/vite-plugin-svelte`

2. Create the `ui/` app.
   - Start with `App.svelte`, `main.js`, and `app.css`.
   - Mount into `#app`.
   - Move the existing interactive DOM behavior from `src/pages/script.js` into Svelte state and components.

3. Build the Svelte component structure.
   - `Hero`
   - `StatusRail`
   - `DateSelector`
   - `MetricGrid`
   - `Charts`
   - `ConceptLists`
   - `StockDrawer`

4. Keep existing API contracts.
   - Continue calling `/api/finance`.
   - Continue calling `/api/status`.
   - Preserve existing query parameter behavior for selected trade date and playback state where applicable.

5. Add `scripts/embed-ui.mjs`.
   - Find built `.js` and `.css` files in `dist/ui/assets`.
   - Escape template literal delimiters safely.
   - Generate `src/pages/ui-build.js`.
   - Fail loudly if more than one JS entry or more than one CSS output appears.

6. Update `src/pages/index.js`.
   - Keep head, SEO metadata, canonical URL, analytics, basecoat CDN links if still needed, and structured data rendering.
   - Replace most body HTML with `<div id="app"></div>`.
   - Inline `UI_CSS` and `UI_JS`.

7. Run and verify.
   - `npm run build:ui`
   - `npm run dev`
   - Check `/`, `/api/status`, `/api/finance`, `/robots.txt`, and `/sitemap.xml`.
   - Verify the final HTML has no required `/assets/...` references.

## Validation Checklist

- Home page renders from the Worker.
- Svelte mounts without console errors.
- Date selector works.
- Latest button works.
- Playback works.
- Charts render.
- Stock drawer works.
- Theme toggle still works.
- Existing SEO metadata remains present.
- Analytics injection still works through `WEB_ANALYTICS_TOKEN`.
- `npm run deploy` always builds UI first.
- Generated `src/pages/ui-build.js` is reproducible.

## Risks

- The existing page script is large and DOM-driven, so direct translation to Svelte should be done in slices.
- Highcharts can increase bundle size. Keep it as a normal dependency first; optimize later if the generated inline script becomes too large.
- Inline assets reduce HTTP requests but weaken long-term browser caching.
- `wrangler dev` will not get Vite HMR in the first pass because the Worker serves embedded build output.
- Generated files can create noisy diffs. Decide whether `src/pages/ui-build.js` should be committed or generated during CI/deploy.

## Recommended First Implementation Slice

Do not migrate the whole dashboard at once.

First slice:

1. Add Vite + Svelte build pipeline.
2. Render a minimal Svelte shell inside the current Worker page.
3. Generate and import `src/pages/ui-build.js`.
4. Confirm single-page inline output works in `wrangler dev`.

Second slice:

1. Move current CSS into `ui/src/app.css`.
2. Port passive layout markup into Svelte components.
3. Keep data loading simple and match the current API response shape.

Third slice:

1. Port playback, chart rendering, date combobox, and stock drawer.
2. Remove old `src/pages/css.js` and `src/pages/script.js` after parity is verified.

