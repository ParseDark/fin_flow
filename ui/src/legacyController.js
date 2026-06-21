import { MAIN_SCRIPT } from "../../src/pages/script.js";

let started = false;
let highchartsPromise = null;
const HIGHCHARTS_SOURCES = [
  "https://cdn.jsdelivr.net/npm/highcharts@12/highcharts.js",
  "https://code.highcharts.com/12/highcharts.js",
];

export async function startLegacyController() {
  if (started) return;
  started = true;

  await loadHighcharts();

  const runLegacyController = new Function(MAIN_SCRIPT);
  runLegacyController();
}

function loadHighcharts() {
  if (window.Highcharts) return Promise.resolve();
  if (highchartsPromise) return highchartsPromise;

  highchartsPromise = loadScriptWithFallback(HIGHCHARTS_SOURCES);

  return highchartsPromise;
}

function loadScriptWithFallback(sources, index = 0) {
  return new Promise((resolve, reject) => {
    const src = sources[index];
    if (!src) {
      reject(new Error("Highcharts 加载失败"));
      return;
    }

    const existing = document.querySelector('script[data-finflow-highcharts="true"]');
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", () => loadScriptWithFallback(sources, index + 1).then(resolve, reject), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.finflowHighcharts = "true";
    script.addEventListener("load", resolve, { once: true });
    script.addEventListener("error", () => {
      script.remove();
      loadScriptWithFallback(sources, index + 1).then(resolve, reject);
    }, { once: true });
    document.head.appendChild(script);
  });
}
