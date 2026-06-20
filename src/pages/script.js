// Auto-generated from scripts/main.js — do not edit manually.
export const MAIN_SCRIPT = `
const REFRESH_MS = 30000;
const FOREGROUND_REFRESH_DEBOUNCE_MS = 5000;
const BASE_PLAY_INTERVAL_MS = 100;
const COLORS = [
  "#38bdf8",
  "#22c55e",
  "#f59e0b",
  "#a78bfa",
  "#f97316",
  "#14b8a6",
  "#8b5cf6",
  "#84cc16",
  "#0ea5e9",
  "#eab308",
  "#10b981",
  "#c084fc",
];
const NEW_ENTRY_MIN_INDEX = 3;
const NEW_ENTRY_MAX_PER_SIDE = 3;

const state = {
  data: null,
  index: 0,
  playing: false,
  timer: null,
  colorMap: {},
  playbackSpeed: 40,
  chartFilter: "limit10",
  foregroundRefreshAt: 0,
  foregroundRefreshing: false,
  selectedConceptCode: null,
  stockDrawerData: null,
  stockDrawerLoading: false,
  stockDrawerCache: {},
};

function setPageLoading(isLoading) {
  document.body.setAttribute("data-loading", isLoading ? "true" : "false");
  document.querySelectorAll(".metric-grid, .chart-panel, .concepts-panel").forEach((section) => {
    section.setAttribute("aria-busy", isLoading ? "true" : "false");
  });
}

function shouldPollLiveData() {
  return document.visibilityState === "visible";
}

readUrlParams();

const dateCombobox = document.getElementById("date-combobox");
const dateTrigger = document.getElementById("date-combobox-trigger");
const datePopover = document.getElementById("date-combobox-popover");
const dateListbox = document.getElementById("date-combobox-listbox");
const dateValueInput = document.getElementById("date-combobox-value");
const dateFilterInput = datePopover ? datePopover.querySelector("input") : null;

const playBtn = document.getElementById("play-btn");
const latestBtn = document.getElementById("latest-btn");
const timeline = document.getElementById("timeline");
const speedButtons = Array.from(document.querySelectorAll(".speed-btn"));
const stockDrawer = document.getElementById("stock-drawer");
const stockDrawerBackdrop = document.getElementById("stock-drawer-backdrop");
const stockDrawerClose = document.getElementById("stock-drawer-close");
let chart;
let netFlowChart;
let emotionChart;
let stockDrawerChart;
let dateController;
function initCombobox({ trigger, popover, listbox, valueInput, filterInput, onSelect }) {
  let open = false;
  let highlightedIndex = -1;

  function getVisibleOptions() {
    return Array.from(listbox.querySelectorAll('[role="option"]:not([hidden])'));
  }

  function openPopover() {
    open = true;
    popover.setAttribute("aria-hidden", "false");
    trigger.setAttribute("aria-expanded", "true");
    highlightedIndex = -1;
    updateHighlight();
    if (filterInput) {
      filterInput.value = "";
      filterOptions("");
      setTimeout(() => filterInput.focus(), 50);
    }
  }

  function closePopover() {
    open = false;
    popover.setAttribute("aria-hidden", "true");
    trigger.setAttribute("aria-expanded", "false");
    highlightedIndex = -1;
    updateHighlight();
  }

  function selectOption(optionEl) {
    const value = optionEl.getAttribute("data-value");
    const label = optionEl.querySelector(".option-label")?.textContent || optionEl.textContent.trim();
    valueInput.value = value;
    const triggerText = trigger.querySelector(".truncate");
    if (triggerText) triggerText.textContent = label;
    closePopover();
    if (onSelect) onSelect(value, label);
  }

  function updateHighlight() {
    const options = getVisibleOptions();
    options.forEach((opt, i) => {
      if (i === highlightedIndex) {
        opt.setAttribute("data-highlighted", "");
      } else {
        opt.removeAttribute("data-highlighted");
      }
    });
  }

  function filterOptions(query) {
    const lower = query.toLowerCase();
    const options = Array.from(listbox.querySelectorAll('[role="option"]'));
    options.forEach((opt) => {
      const text = opt.textContent.toLowerCase();
      if (!lower || text.includes(lower)) {
        opt.removeAttribute("hidden");
      } else {
        opt.setAttribute("hidden", "");
      }
    });
    highlightedIndex = -1;
    updateHighlight();
  }

  function focusOption(direction) {
    const options = getVisibleOptions();
    if (options.length === 0) return;
    if (direction === "next") {
      highlightedIndex = (highlightedIndex + 1) % options.length;
    } else if (direction === "prev") {
      highlightedIndex = highlightedIndex <= 0 ? options.length - 1 : highlightedIndex - 1;
    } else if (direction === "first") {
      highlightedIndex = 0;
    } else if (direction === "last") {
      highlightedIndex = options.length - 1;
    }
    updateHighlight();
    const opt = options[highlightedIndex];
    if (opt) opt.scrollIntoView({ block: "nearest" });
  }

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    if (open) {
      closePopover();
    } else {
      openPopover();
    }
  });

  listbox.addEventListener("click", (e) => {
    const option = e.target.closest('[role="option"]');
    if (!option) return;
    selectOption(option);
  });

  if (filterInput) {
    filterInput.addEventListener("input", () => {
      filterOptions(filterInput.value);
    });

    filterInput.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        focusOption("next");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        focusOption("prev");
      } else if (e.key === "Enter") {
        e.preventDefault();
        const options = getVisibleOptions();
        if (highlightedIndex >= 0 && highlightedIndex < options.length) {
          selectOption(options[highlightedIndex]);
        } else if (options.length > 0) {
          selectOption(options[0]);
        }
      } else if (e.key === "Escape") {
        closePopover();
        trigger.focus();
      }
    });

    filterInput.addEventListener("blur", () => {
      setTimeout(() => {
        if (open && !popover.contains(document.activeElement)) {
          closePopover();
        }
      }, 150);
    });
  }

  document.addEventListener("click", (e) => {
    if (open && !trigger.contains(e.target) && !popover.contains(e.target)) {
      closePopover();
    }
  });

  return {
    open: () => openPopover(),
    close: () => closePopover(),
    selectByValue(value) {
      if (!value) return;
      const option = listbox.querySelector('[role="option"][data-value="' + CSS.escape(value) + '"]');
      if (option) {
        const label = option.textContent.trim();
        const triggerText = trigger.querySelector(".truncate");
        if (triggerText) triggerText.textContent = label;
        valueInput.value = value;
      }
    },
  };
}

function formatFund(value) {
  const abs = Math.abs(value);
  if (abs >= 1e12) return (value / 1e12).toFixed(2) + "万亿";
  if (abs >= 1e8) return (value / 1e8).toFixed(abs >= 1e10 ? 0 : 2) + "亿";
  if (abs >= 1e4) return (value / 1e4).toFixed(2) + "万";
  return String(value);
}

function formatPercent(value) {
  return (value * 100).toFixed(2) + "%";
}

function escapeHtmlText(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatAnchorDirection(direction) {
  if (direction === "up") return "↑ 上涨";
  if (direction === "down") return "↓ 下跌";
  return "→ 联动";
}

function findLastValueAt(dataPoints, index) {
  for (let cursor = index; cursor >= 0; cursor -= 1) {
    const value = dataPoints[cursor];
    if (value != null) return value;
  }
  return null;
}

function buildAnchorScatterData(data) {
  const anchorItems = data.anchors || [];
  const degreeSeries = (data.emotionSeries || {}).degree || [];
  const perIndexCount = {};

  return anchorItems
    .filter((item) => item.index <= state.index)
    .map((item) => {
      const stacked = perIndexCount[item.index] || 0;
      perIndexCount[item.index] = stacked + 1;
      const baseY = findLastValueAt(degreeSeries, item.index) ?? 0;
      const directionFactor = item.direction === "down" ? -1 : 1;
      return {
        x: item.index,
        y: baseY + directionFactor * (3 + stacked * 2),
        name: item.name,
        eventTime: item.time,
        direction: item.direction,
      };
    });
}

function renderAnchorStream(data) {
  const container = document.getElementById("anchor-stream");
  const meta = document.getElementById("anchor-stream-meta");
  const anchors = (data.anchors || []).filter((item) => item.index <= state.index);
  const active = anchors.filter((item) => item.index === state.index);
  const recent = anchors.slice(-6).reverse();

  meta.textContent = active.length > 0
    ? "当前时点 " + active.length + " 条联动事件"
    : "截至当前已发生 " + anchors.length + " 条联动事件";

  if (recent.length === 0) {
    container.innerHTML = '<div class="muted" style="font-size:12px;">当前时点之前暂无联动事件。</div>';
    return;
  }

  container.innerHTML = recent.map((item) =>
    '<article class="anchor-item' + (item.index === state.index ? ' is-active' : '') + '">' +
      '<div class="anchor-item-main">' +
        '<span class="anchor-item-time">' + item.time + '</span>' +
        '<div class="anchor-item-name">' + item.name + '</div>' +
      '</div>' +
      '<span class="anchor-badge ' + item.direction + '">' + formatAnchorDirection(item.direction) + '</span>' +
    '</article>'
  ).join("");
}

function readUrlParams() {
  // No longer store concept filters in URL
}

function syncUrl() {
  const params = new URLSearchParams(window.location.search);
  if (state.data?.requestedDate) {
    params.set("date", state.data.requestedDate);
  } else {
    params.delete("date");
  }
  const newUrl = window.location.pathname + (params.toString() ? "?" + params.toString() : "");
  history.replaceState(null, "", newUrl);
}

function concentrationMeta(sample) {
  const concepts = sample.concepts && sample.concepts.length
    ? sample.concepts
    : [...sample.leaders, ...sample.laggards];
  const { inflow, outflow } = filteredFlowGroups(concepts, sample, state.chartFilter);

  const inflowTop3Abs = inflow.slice(0, 3).reduce((sum, item) => sum + item.mainFundDiff, 0);
  const outflowTop3Abs = outflow.slice(0, 3).reduce((sum, item) => sum + Math.abs(item.mainFundDiff || 0), 0);

  const inflowTotal = inflow.reduce((sum, item) => sum + item.mainFundDiff, 0);
  const outflowTotal = outflow.reduce((sum, item) => sum + Math.abs(item.mainFundDiff || 0), 0);

  const inflowShare = inflowTotal > 0 ? inflowTop3Abs / inflowTotal : 0;
  const outflowShare = outflowTotal > 0 ? outflowTop3Abs / outflowTotal : 0;

  function concentrationLabel(share) {
    if (share > 0.45) return "高集中";
    if (share >= 0.3) return "中等集中";
    return "分散";
  }

  return {
    inflowTop3Abs,
    outflowTop3Abs,
    inflowShare,
    outflowShare,
    inflowLabel: concentrationLabel(inflowShare),
    outflowLabel: concentrationLabel(outflowShare),
  };
}

function limitFromChartFilter(filter) {
  if (filter === "limit10") return 10;
  return 10;
}

function sortedFlowSources(concepts, sample) {
  const inflowSource = sample.leaders && sample.leaders.length
    ? sample.leaders
    : concepts.filter((item) => item.mainFundDiff > 0);
  const outflowSource = sample.laggards && sample.laggards.length
    ? sample.laggards
    : concepts.filter((item) => item.mainFundDiff < 0);

  return {
    inflow: inflowSource
      .filter((item) => item.mainFundDiff > 0)
      .sort((a, b) => b.mainFundDiff - a.mainFundDiff),
    outflow: outflowSource
      .filter((item) => item.mainFundDiff < 0)
      .sort((a, b) => a.mainFundDiff - b.mainFundDiff),
  };
}

function filteredFlowGroups(concepts, sample, filter) {
  const sorted = sortedFlowSources(concepts, sample);
  const limit = limitFromChartFilter(filter);

  if (filter === "top3") {
    return {
      inflow: sorted.inflow.slice(0, 3),
      outflow: sorted.outflow.slice(0, 3),
    };
  }

  if (filter === "bottom3") {
    return {
      inflow: sorted.inflow.slice(-3),
      outflow: sorted.outflow.slice(-3),
    };
  }

  if (filter === "inflow") {
    return {
      inflow: sorted.inflow.slice(0, limit),
      outflow: [],
    };
  }

  if (filter === "outflow") {
    return {
      inflow: [],
      outflow: sorted.outflow.slice(0, limit),
    };
  }

  return {
    inflow: sorted.inflow.slice(0, limit),
    outflow: sorted.outflow.slice(0, limit),
  };
}

function concentrationSeriesData(samples) {
  return samples.map((sample) => {
    const meta = concentrationMeta(sample);
    return {
      inflow: meta.inflowShare * 100,
      outflow: meta.outflowShare * 100,
    };
  });
}

function concentrationAxisRange(seriesData) {
  const allValues = seriesData.flatMap((d) => [d?.inflow ?? 0, d?.outflow ?? 0]);
  const visible = allValues.filter((value) => Number.isFinite(value));
  if (visible.length === 0) {
    return { min: 0, max: 100 };
  }

  const min = Math.min(...visible);
  const max = Math.max(...visible);
  const pad = Math.max(2, (max - min) * 0.35 || 4);
  return {
    min: Math.max(0, Math.floor((min - pad) * 10) / 10),
    max: Math.min(100, Math.ceil((max + pad) * 10) / 10),
  };
}

function formatSessionLabel(session) {
  const map = {
    morning: "早盘",
    afternoon: "午盘",
    lunch_break: "午间休市",
    closed: "休市",
  };
  return map[session] || session || "--";
}

function formatStatusTime(value) {
  if (!value) return "--";
  const date = new Date(value);
  return new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Shanghai",
  }).format(date);
}

function hashCode(value) {
  const input = String(value || "");
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = ((hash << 5) - hash + input.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function stableColorForCode(code) {
  const hash = hashCode(code);
  const hue = hash % 360;
  const saturation = 68 + (hash % 8);
  const lightness = 52 + (hash % 10);
  return "hsl(" + hue + "deg " + saturation + "% " + lightness + "%)";
}

function buildColorMap(data) {
  const conceptCodes = data.chart.series.map((item) => item.code);
  state.colorMap = Object.fromEntries(
    conceptCodes.map((code) => [code, stableColorForCode(code)]),
  );
}

function colorForCode(code) {
  return state.colorMap[code] || stableColorForCode(code) || COLORS[0];
}

function setComboboxValue(value) {
  if (dateController) dateController.selectByValue(value);
}

function renderDateOptions(availableDates, selectedDate) {
  dateListbox.innerHTML = availableDates
    .map((date) => '<div role="option" data-value="' + date + '">' + date + '</div>')
    .join("");
  setComboboxValue(selectedDate);
}

function updateSliderPaint() {
  const min = parseFloat(timeline.min || 0);
  const max = parseFloat(timeline.max || 100);
  const value = parseFloat(timeline.value || 0);
  const percent = max === min ? 0 : ((value - min) / (max - min)) * 100;
  timeline.style.setProperty("--slider-value", percent + "%");
}

function updateSpeedButtons() {
  speedButtons.forEach((button) => {
    button.classList.toggle("is-active", Number(button.dataset.speed) === state.playbackSpeed);
  });
}

async function fetchStatus() {
  if (!shouldPollLiveData()) return false;
  try {
    const response = await fetch("/api/status", { cache: "no-store" });
    if (!response.ok) return false;
    const status = await response.json();
    document.getElementById("status-now").textContent = status.chinaNow?.isoLike || "--";
    document.getElementById("status-session").textContent = formatSessionLabel(status.currentTradingSession);
    document.getElementById("status-next-run").textContent = formatStatusTime(status.nextRunAt);
    document.getElementById("status-samples").textContent = String(status.samplesToday ?? "--");
    return true;
  } catch {
    return false;
  }
}

function stopPlayback() {
  if (state.timer) clearInterval(state.timer);
  state.timer = null;
  state.playing = false;
  playBtn.textContent = "播放日内轨迹";
}

function startPlayback() {
  if (!state.data || state.data.samples.length === 0) return;
  stopPlayback();
  state.playing = true;
  playBtn.textContent = "暂停回放";
  state.timer = setInterval(() => {
    if (state.index >= state.data.samples.length - 1) {
      stopPlayback();
      return;
    }
    setIndex(state.index + 1);
  }, Math.max(8, Math.floor(BASE_PLAY_INTERVAL_MS / state.playbackSpeed)));
}

function togglePlayback() {
  if (state.playing) {
    stopPlayback();
  } else {
    if (state.index >= state.data.samples.length - 1) {
      setIndex(0);
    }
    startPlayback();
  }
}

function ensureNetFlowChart() {
  if (netFlowChart) return netFlowChart;
  netFlowChart = Highcharts.chart("netflow-chart", {
    chart: {
      backgroundColor: "transparent",
      animation: false,
      spacing: [0, 8, 4, 8],
      height: 120,
    },
    title: { text: "市场净资金", align: "left", style: { color: "rgba(244,244,245,0.7)", fontSize: "11px", fontWeight: "400" } },
    credits: { enabled: false },
    exporting: { enabled: false },
    legend: { enabled: true, align: "right", verticalAlign: "top", layout: "horizontal", itemStyle: { color: "rgba(244,244,245,0.7)", fontSize: "10px" }, itemDistance: 14, symbolRadius: 2, symbolWidth: 14, symbolHeight: 3, margin: 0 },
    xAxis: {
      categories: [],
      tickLength: 0,
      lineWidth: 0,
      labels: { enabled: false },
    },
    yAxis: {
      title: { text: null },
      gridLineWidth: 1,
      gridLineColor: "rgba(244,244,245,0.06)",
      labels: {
        style: { color: "rgba(244,244,245,0.5)", fontSize: "10px" },
        formatter() { return formatFund(this.value); },
      },
      plotLines: [{ value: 0, color: "rgba(250,250,250,0.2)", width: 1, zIndex: 4 }],
    },
    tooltip: {
      shared: true,
      backgroundColor: "rgba(9,9,11,0.96)",
      borderColor: "rgba(244,244,245,0.08)",
      style: { color: "#fafafa", fontSize: "11px" },
      useHTML: true,
      formatter() {
        return '<div style="font-size:12px;font-weight:600;margin-bottom:4px;">' + this.x + '</div>' +
          (this.points || []).map((point) =>
            '<div style="display:flex;justify-content:space-between;gap:12px;font-size:11px;">' +
              '<span>' + point.series.name + '</span>' +
              '<span style="font-weight:500;">' + formatFund(point.y) + '</span>' +
            '</div>'
          ).join("");
      },
    },
    plotOptions: {
      column: {
        grouping: false,
        groupPadding: 0,
        pointPadding: 0.05,
        borderWidth: 0,
        animation: { duration: 200 },
      },
    },
    series: [{
      id: "netflow-bars",
      type: "column",
      name: "当日净资金",
      zIndex: 1,
      data: [],
    }, {
      id: "netflow-prev",
      type: "spline",
      name: "昨日净资金",
      color: "rgba(191,219,254,0.42)",
      lineColor: "rgba(191,219,254,0.42)",
      lineWidth: 1.25,
      dashStyle: "ShortDot",
      zIndex: 2,
      data: [],
    }],
  });
  return netFlowChart;
}

function ensureEmotionChart() {
  if (emotionChart) return emotionChart;
  emotionChart = Highcharts.chart("emotion-chart", {
    chart: {
      backgroundColor: "transparent",
      animation: false,
      spacing: [0, 8, 4, 8],
      height: 160,
    },
    title: { text: "市场情绪", align: "left", style: { color: "rgba(244,244,245,0.7)", fontSize: "11px", fontWeight: "400" } },
    credits: { enabled: false },
    exporting: { enabled: false },
    legend: { enabled: true, align: "right", verticalAlign: "top", layout: "horizontal", itemStyle: { color: "rgba(244,244,245,0.7)", fontSize: "10px" }, itemDistance: 14, symbolRadius: 2, symbolWidth: 14, symbolHeight: 3, margin: 0 },
    xAxis: {
      categories: [],
      tickLength: 0,
      lineWidth: 0,
      labels: { enabled: false },
    },
    yAxis: [{
      title: { text: null },
      gridLineWidth: 1,
      gridLineColor: "rgba(244,244,245,0.06)",
      labels: { style: { color: "rgba(244,244,245,0.5)", fontSize: "10px" } },
    }, {
      title: { text: null },
      opposite: true,
      gridLineWidth: 0,
      labels: { style: { color: "rgba(244,244,245,0.4)", fontSize: "10px" }, formatter() { return this.value + "万亿"; } },
    }],
    tooltip: {
      shared: true,
      useHTML: true,
      backgroundColor: "rgba(9,9,11,0.96)",
      borderColor: "rgba(244,244,245,0.08)",
      style: { color: "#fafafa", fontSize: "11px" },
      formatter() {
        const points = this.points || [];
        return '<div style="font-size:12px;font-weight:600;margin-bottom:4px;">' + this.x + '</div>' +
          points.map((p) => {
            if (p.series.options.id.startsWith("emo-anchor")) {
              return '<div style="display:flex;justify-content:space-between;gap:12px;font-size:11px;line-height:1.4;">' +
                '<span>' + (p.point.name || p.series.name) + '</span>' +
                '<span style="font-weight:500;">' + formatAnchorDirection(p.point.direction) + '</span>' +
              '</div>';
            }
            return '<div style="display:flex;justify-content:space-between;gap:12px;font-size:11px;line-height:1.4;">' +
              '<span>' + p.series.name + '</span>' +
              '<span style="font-weight:500;">' + (isEmotionVolumeSeries(p.series.options.id) ? p.y + "万亿" : p.y) + '</span>' +
              '</div>';
          }).join("");
      },
    },
    plotOptions: {
      series: { animation: { duration: 200 }, marker: { enabled: false } },
    },
    series: [{
      id: "emo-degree", type: "spline", name: "市场温度", yAxis: 0, color: "#f59e0b", lineWidth: 2, zIndex: 2, data: [],
    }, {
      id: "emo-degree-prev", type: "spline", name: "昨日温度", yAxis: 0, color: "rgba(245,158,11,0.42)", lineWidth: 1.25, dashStyle: "ShortDot", zIndex: 1, data: [],
    }, {
      id: "emo-balance", type: "area", name: "成交量", yAxis: 1, color: "rgba(59,130,246,0.2)", lineColor: "rgba(59,130,246,0.6)", lineWidth: 1.5, fillOpacity: 0.15, zIndex: 1, data: [],
    }, {
      id: "emo-balance-prev", type: "spline", name: "昨日成交量", yAxis: 1, color: "rgba(147,197,253,0.38)", lineColor: "rgba(147,197,253,0.42)", lineWidth: 1.25, dashStyle: "ShortDot", zIndex: 0, data: [],
    }, {
      id: "emo-preview", type: "spline", name: "预估成交量", yAxis: 1, color: "#93c5fd", lineColor: "#93c5fd", lineWidth: 2, dashStyle: "ShortDash", zIndex: 3, data: [],
    }, {
      id: "emo-anchor-up", type: "scatter", name: "联动上涨", yAxis: 0, color: "#dc2626", zIndex: 5, data: [], showInLegend: false,
      marker: { enabled: true, symbol: "triangle", radius: 5, fillColor: "#dc2626", lineColor: "rgba(255,255,255,0.8)", lineWidth: 1.5 },
      dataLabels: {
        enabled: true,
        allowOverlap: false,
        crop: false,
        overflow: "none",
        x: 8,
        y: -10,
        formatter() { return this.point.name || ""; },
        style: { color: "#fecaca", fontSize: "10px", fontWeight: "600", textOutline: "none" },
      },
      tooltip: { pointFormatter() { return '<span style="color:#dc2626;">▲</span> ' + this.eventTime + ' ' + this.name + ' <b>上涨</b><br/>'; } },
    }, {
      id: "emo-anchor-down", type: "scatter", name: "联动下跌", yAxis: 0, color: "#16a34a", zIndex: 5, data: [], showInLegend: false,
      marker: { enabled: true, symbol: "triangle-down", radius: 5, fillColor: "#16a34a", lineColor: "rgba(255,255,255,0.8)", lineWidth: 1.5 },
      dataLabels: {
        enabled: true,
        allowOverlap: false,
        crop: false,
        overflow: "none",
        x: 8,
        y: 14,
        formatter() { return this.point.name || ""; },
        style: { color: "#bbf7d0", fontSize: "10px", fontWeight: "600", textOutline: "none" },
      },
      tooltip: { pointFormatter() { return '<span style="color:#16a34a;">▼</span> ' + this.eventTime + ' ' + this.name + ' <b>下跌</b><br/>'; } },
    }, {
      id: "emo-anchor-flat", type: "scatter", name: "联动事件", yAxis: 0, color: "#f59e0b", zIndex: 5, data: [], showInLegend: false,
      marker: { enabled: true, symbol: "diamond", radius: 4.5, fillColor: "#f59e0b", lineColor: "rgba(255,255,255,0.8)", lineWidth: 1.5 },
      dataLabels: {
        enabled: true,
        allowOverlap: false,
        crop: false,
        overflow: "none",
        x: 8,
        y: -10,
        formatter() { return this.point.name || ""; },
        style: { color: "#fde68a", fontSize: "10px", fontWeight: "600", textOutline: "none" },
      },
      tooltip: { pointFormatter() { return '<span style="color:#f59e0b;">◆</span> ' + this.eventTime + ' ' + this.name + ' <b>联动</b><br/>'; } },
    }],
  });
  return emotionChart;
}

function ensureStockDrawerChart() {
  if (stockDrawerChart) return stockDrawerChart;
  stockDrawerChart = Highcharts.chart("stock-drawer-chart", {
    chart: {
      backgroundColor: "transparent",
      animation: false,
      spacing: [12, 8, 8, 8],
    },
    title: { text: null },
    credits: { enabled: false },
    exporting: { enabled: false },
    legend: {
      enabled: true,
      align: "left",
      verticalAlign: "bottom",
      itemStyle: { color: "rgba(244,244,245,0.72)", fontSize: "11px" },
      itemHoverStyle: { color: "#fafafa" },
      maxHeight: 86,
    },
    xAxis: {
      categories: [],
      tickLength: 0,
      lineColor: "rgba(244,244,245,0.14)",
      gridLineWidth: 1,
      gridLineColor: "rgba(244,244,245,0.05)",
      labels: {
        formatter() {
          const label = String(this.value || "");
          const parts = label.split(":");
          const mm = parts[1];
          if (this.pos === 0 || this.pos === this.axis.categories.length - 1) return parts[0] + ":" + mm;
          if (mm === "00" || mm === "30") return parts[0] + ":" + mm;
          return "";
        },
        style: { color: "rgba(244,244,245,0.62)" },
      },
    },
    yAxis: {
      title: { text: null },
      gridLineWidth: 1,
      gridLineColor: "rgba(244,244,245,0.08)",
      labels: {
        style: { color: "rgba(244,244,245,0.62)" },
        formatter() { return formatFund(this.value); },
      },
      plotLines: [{ value: 0, color: "rgba(250,250,250,0.24)", width: 1.2, zIndex: 4 }],
    },
    tooltip: {
      shared: true,
      backgroundColor: "rgba(9,9,11,0.96)",
      borderColor: "rgba(244,244,245,0.08)",
      style: { color: "#fafafa" },
      useHTML: true,
      formatter() {
        const rows = (this.points || [])
          .filter((point) => point.y != null)
          .sort((a, b) => Math.abs(b.y) - Math.abs(a.y))
          .map((point) =>
            '<div style="display:flex;justify-content:space-between;gap:14px;font-size:11px;line-height:1.55;">' +
              '<span style="color:' + point.color + ';">● ' + escapeHtmlText(point.series.name) + '</span>' +
              '<span style="color:' + (point.y >= 0 ? '#dc2626' : '#16a34a') + ';font-weight:600;">' + formatFund(point.y) + '</span>' +
            '</div>'
          ).join("");
        return '<div style="font-size:13px;font-weight:600;margin-bottom:6px;">' + this.x + '</div>' + rows;
      },
    },
    plotOptions: {
      series: {
        animation: { duration: 260 },
        marker: { enabled: false },
        lineWidth: 1.8,
        opacity: 0.84,
        connectNulls: false,
        states: { inactive: { opacity: 0.14 } },
      },
    },
    series: [],
  });
  return stockDrawerChart;
}

function currentConcept() {
  const sample = state.data?.samples?.[state.index];
  const concepts = sample?.concepts?.length ? sample.concepts : [...(sample?.leaders || []), ...(sample?.laggards || [])];
  return concepts.find((item) => item.code === state.selectedConceptCode) || null;
}

function stockSnapshotForConcept(conceptCode, index = state.index) {
  if (state.stockDrawerData?.code !== conceptCode) return null;
  return state.stockDrawerData.samples?.[index] || null;
}

function buildStockSeries(conceptCode) {
  if (state.stockDrawerData?.code !== conceptCode) return [];
  return state.stockDrawerData.series || [];
}

async function fetchStockDrawerData(conceptCode, options = {}) {
  const { force = false } = options;
  const date = state.data?.requestedDate || "";
  const cacheKey = date + ":" + conceptCode;
  if (!force && state.stockDrawerCache[cacheKey]) {
    state.stockDrawerData = state.stockDrawerCache[cacheKey];
    return state.stockDrawerData;
  }

  const params = new URLSearchParams();
  if (date) params.set("date", date);
  params.set("code", conceptCode);

  const response = await fetch("/api/plate-stocks?" + params.toString(), { cache: "no-store" });
  if (!response.ok) {
    throw new Error("加载板块个股分时失败");
  }

  const payload = await response.json();
  state.stockDrawerCache[cacheKey] = payload;
  state.stockDrawerData = payload;
  return payload;
}

async function openStockDrawer(conceptCode) {
  state.selectedConceptCode = conceptCode;
  state.stockDrawerData = null;
  state.stockDrawerLoading = true;
  stockDrawer.setAttribute("aria-hidden", "false");
  stockDrawer.classList.add("is-loading");
  document.body.classList.add("drawer-open");
  renderStockDrawer();
  try {
    await fetchStockDrawerData(conceptCode);
  } catch {
    state.stockDrawerData = { code: conceptCode, name: currentConcept()?.name || conceptCode, series: [], samples: [] };
  } finally {
    state.stockDrawerLoading = false;
    stockDrawer.classList.remove("is-loading");
    renderStockDrawer();
    setTimeout(() => {
      if (stockDrawerChart) stockDrawerChart.reflow();
    }, 240);
  }
}

function closeStockDrawer() {
  document.body.classList.remove("drawer-open");
  stockDrawer.setAttribute("aria-hidden", "true");
  state.selectedConceptCode = null;
  state.stockDrawerData = null;
  state.stockDrawerLoading = false;
  stockDrawer.classList.remove("is-loading");
}

function renderStockDrawer() {
  if (!state.data || !state.selectedConceptCode) return;
  const concept = currentConcept();
  const snapshot = stockSnapshotForConcept(state.selectedConceptCode);
  const series = buildStockSeries(state.selectedConceptCode);
  const title = concept?.name || state.stockDrawerData?.name || "板块个股";
  const meta = document.getElementById("stock-drawer-meta");
  const list = document.getElementById("stock-drawer-list");
  const stockChart = ensureStockDrawerChart();

  document.getElementById("stock-drawer-title").textContent = title + " 个股资金流";
  if (state.stockDrawerLoading) {
    meta.textContent = "正在加载板块个股分时...";
  } else {
    meta.textContent = (state.data.sampleTimes[state.index] || "--:--:--") + " · " + series.length + " 只个股 · 按当前板块样本同步回放";
  }
  stockChart.xAxis[0].setCategories(state.data.sampleTimes, false);

  series.forEach((item) => {
    const existing = stockChart.series.find((s) => s.options.id === item.code);
    const color = stableColorForCode(item.code);
    const options = {
      id: item.code,
      type: "spline",
      name: item.name,
      color,
      zoneAxis: "y",
      zones: [
        { value: 0, color: "#22c55e" },
        { color },
      ],
      data: visiblePlaybackData(item.data),
    };
    if (existing) {
      existing.update({ name: options.name, color, zones: options.zones }, false);
      existing.setData(options.data, false, { duration: 220 });
    } else {
      stockChart.addSeries(options, false, { duration: 220 });
    }
  });

  stockChart.series
    .filter((chartSeries) => !series.some((item) => item.code === chartSeries.options.id))
    .forEach((chartSeries) => chartSeries.remove(false));

  stockChart.xAxis[0].removePlotLine("stock-playhead");
  stockChart.xAxis[0].addPlotLine({ id: "stock-playhead", value: state.index, color: "#ffd36b", width: 1.5, zIndex: 5, dashStyle: "Dash" });
  stockChart.redraw();

  if (state.stockDrawerLoading) {
    list.innerHTML = Array.from({ length: 6 }).map(() =>
      '<article class="stock-row is-skeleton">' +
        '<div class="skeleton-line wide"></div>' +
        '<div class="skeleton-line md"></div>' +
      '</article>'
    ).join("");
    return;
  }

  const currentStocks = snapshot?.stocks || [];
  if (currentStocks.length === 0) {
    list.innerHTML = '<div class="stock-empty">当前样本暂未采集到这个板块的个股资金流。</div>';
    return;
  }

  list.innerHTML = currentStocks.map((item) => {
    const flowClass = (item.fundflow || 0) >= 0 ? "up" : "down";
    const changeClass = (item.change || 0) >= 0 ? "up" : "down";
    return '<article class="stock-row">' +
      '<div class="stock-row-main">' +
        '<div class="stock-title-line">' +
          '<span class="stock-name">' + escapeHtmlText(item.name) + '</span>' +
          (item.isCore ? '<span class="stock-tag core">核心</span>' : '') +
        '</div>' +
        '<div class="' + flowClass + '" style="font-size:12px;font-weight:600;">' + formatFund(item.fundflow || 0) + '</div>' +
      '</div>' +
      '<div class="stock-row-main">' +
        '<span class="stock-code">' + escapeHtmlText(item.code) + '</span>' +
        '<span class="' + changeClass + '" style="font-size:12px;">' + formatPercent(item.change || 0) + '</span>' +
      '</div>' +
    '</article>';
  }).join("");
}

function ensureChart() {
  if (chart) return chart;
  chart = Highcharts.chart("chart", {
    chart: {
      backgroundColor: "transparent",
      plotBackgroundColor: "rgba(9, 9, 11, 0.18)",
      animation: false,
      spacing: [12, 8, 8, 8],
      marginBottom: 16,
    },
    title: { text: null },
    credits: { enabled: false },
    exporting: { enabled: false },
    legend: {
      enabled: false,
    },
    xAxis: {
      categories: [],
      tickLength: 0,
      lineColor: "rgba(244,244,245,0.14)",
      gridLineWidth: 1,
      gridLineColor: "rgba(244,244,245,0.05)",
      labels: {
        formatter() {
          const label = String(this.value || "");
          const index = this.pos;
          const total = this.axis.categories.length - 1;
          const parts = label.split(":");
          const hh = parts[0];
          const mm = parts[1];
          if (index === 0 || index === total) return hh + ":" + mm;
          if (mm === "00" || mm === "30") return hh + ":" + mm;
          return "";
        },
        style: { color: "rgba(244,244,245,0.62)" },
      },
    },
    yAxis: [
      {
        title: { text: null },
        gridLineWidth: 1,
        gridLineColor: "rgba(244,244,245,0.08)",
        labels: {
          style: { color: "rgba(244,244,245,0.62)" },
          formatter() { return formatFund(this.value); },
        },
        plotLines: [{ id: "zero-line", value: 0, color: "rgba(250,250,250,0.24)", width: 1.2, zIndex: 4 }],
      },
      {
        title: { text: null },
        opposite: true,
        gridLineWidth: 0,
        labels: {
          style: { color: "rgba(244,244,245,0.52)" },
          formatter() { return this.value + "%"; },
        },
      },
    ],
    tooltip: {
      shared: true,
      backgroundColor: "rgba(9,9,11,0.96)",
      borderColor: "rgba(244,244,245,0.08)",
      style: { color: "#fafafa" },
      useHTML: true,
      formatter() {
        const points = this.points || [];
        const pts = points.filter((p) => p.series.options.id !== "net-flow-bars" && !p.series.options.id?.startsWith("conc-"));
        const concIn = points.find((p) => p.series.options.id === "conc-inflow");
        const concOut = points.find((p) => p.series.options.id === "conc-outflow");
        const inflowPts = pts.filter((p) => p.y > 0).sort((a, b) => b.y - a.y);
        const outflowPts = pts.filter((p) => p.y < 0).sort((a, b) => a.y - b.y);

        let html = '<div style="font-size:13px;font-weight:600;margin-bottom:6px;">' + this.x + '</div>';
        html += '<div style="display:flex;gap:16px;">';

        // Inflow column
        html += '<div style="flex:1;min-width:140px;">';
        html += '<div style="font-size:10px;color:#dc2626;margin-bottom:4px;">📈 净流入</div>';
        inflowPts.forEach((p) => {
          html += '<div style="display:flex;justify-content:space-between;gap:8px;font-size:11px;line-height:1.5;">';
          html += '<span style="color:' + p.color + ';">● ' + p.series.name + '</span>';
          html += '<span style="color:' + (p.y >= 0 ? '#dc2626' : '#16a34a') + ';font-weight:500;">' + formatFund(p.y) + '</span>';
          html += '</div>';
        });
        html += '</div>';

        // Outflow column
        html += '<div style="flex:1;min-width:140px;">';
        html += '<div style="font-size:10px;color:#16a34a;margin-bottom:4px;">📉 净流出</div>';
        outflowPts.forEach((p) => {
          html += '<div style="display:flex;justify-content:space-between;gap:8px;font-size:11px;line-height:1.5;">';
          html += '<span style="color:' + p.color + ';">● ' + p.series.name + '</span>';
          html += '<span style="color:' + (p.y >= 0 ? '#dc2626' : '#16a34a') + ';font-weight:500;">' + formatFund(p.y) + '</span>';
          html += '</div>';
        });
        html += '</div>';

        html += '</div>';
        if (concIn || concOut) {
          html += '<div style="margin-top:8px;padding-top:8px;border-top:1px solid rgba(244,244,245,0.08);display:flex;gap:16px;">';
          html += '<div style="flex:1;min-width:140px;display:flex;justify-content:space-between;gap:8px;font-size:11px;line-height:1.5;">';
          html += '<span style="color:#fca5a5;">流入集中度</span>';
          html += '<span style="color:#dc2626;font-weight:600;">' + (concIn ? Number(concIn.y).toFixed(2) + '%' : '--') + '</span>';
          html += '</div>';
          html += '<div style="flex:1;min-width:140px;display:flex;justify-content:space-between;gap:8px;font-size:11px;line-height:1.5;">';
          html += '<span style="color:#86efac;">流出集中度</span>';
          html += '<span style="color:#16a34a;font-weight:600;">' + (concOut ? Number(concOut.y).toFixed(2) + '%' : '--') + '</span>';
          html += '</div>';
          html += '</div>';
        }
        return html;
      },
    },
    plotOptions: {
      series: {
        animation: { duration: 350 },
        marker: { enabled: false },
        lineWidth: 1.8,
        opacity: 0.82,
        connectNulls: false,
        states: {
          inactive: {
            opacity: 0.12,
          },
        },
      },
    },
    series: [],
  });
  return chart;
}

function isEmotionVolumeSeries(seriesId) {
  return seriesId === "emo-balance" ||
    seriesId === "emo-balance-prev" ||
    seriesId === "emo-preview";
}

function visiblePlaybackData(dataPoints) {
  return dataPoints.map((value, index) => (index <= state.index ? value : null));
}

function trailPlaybackData(dataPoints, windowSize = 5) {
  const start = Math.max(0, state.index - windowSize + 1);
  return dataPoints.map((value, index) => (
    index >= start && index <= state.index ? value : null
  ));
}

function latestDefinedValue(dataPoints) {
  for (let index = dataPoints.length - 1; index >= 0; index -= 1) {
    const value = dataPoints[index];
    if (value != null) return value;
  }
  return null;
}

function detectNewEntryAlerts(seriesList) {
  const alerts = [];

  seriesList.forEach((item) => {
    const firstIndex = item.data.findIndex((value) => value != null);
    if (firstIndex < NEW_ENTRY_MIN_INDEX || firstIndex > state.index) return;

    const y = item.data[firstIndex];
    if (y == null) return;

    const isInflow = y > 0;
    alerts.push({
      code: item.code,
      name: item.name,
      x: firstIndex,
      y,
      isInflow,
      color: colorForCode(item.code),
      tag: item.name,
    });
  });

  const sortAlerts = (a, b) => {
    if (a.x !== b.x) return b.x - a.x;
    return Math.abs(b.y) - Math.abs(a.y);
  };

  const inflow = alerts
    .filter((item) => item.isInflow)
    .sort(sortAlerts)
    .slice(0, NEW_ENTRY_MAX_PER_SIDE);

  const outflow = alerts
    .filter((item) => !item.isInflow)
    .sort(sortAlerts)
    .slice(0, NEW_ENTRY_MAX_PER_SIDE);

  return [...inflow, ...outflow];
}

function featuredSeries(data) {
  const sample = data.samples?.[state.index];
  const concepts = sample?.concepts || [];
  const inflow = concepts.filter((item) => item.mainFundDiff > 0).sort((a, b) => b.mainFundDiff - a.mainFundDiff);
  const outflow = concepts.filter((item) => item.mainFundDiff < 0).sort((a, b) => a.mainFundDiff - b.mainFundDiff);
  const symbols = ["circle", "triangle", "square"];

  return {
    top: inflow.slice(0, 3).map((item, index) => ({
      ...item,
      symbol: symbols[index] || "circle",
    })),
    bottom: outflow.slice(0, 3).map((item, index) => ({
      ...item,
      symbol: symbols[index] || "circle",
    })),
  };
}

function renderFeaturedLegend(data) {
  const featured = featuredSeries(data);
  const items = [
    ...featured.top.map((item, index) => ({
      ...item,
      rankLabel: "Top " + (index + 1),
      tone: "up",
    })),
    ...featured.bottom.map((item, index) => ({
      ...item,
      rankLabel: "Bottom " + (index + 1),
      tone: "down",
    })),
  ];

  document.getElementById("featured-legend").innerHTML = items.map((item) => {
    const shapeClass = item.symbol === "triangle"
      ? "shape-triangle"
      : item.symbol === "square"
        ? "shape-square"
        : "shape-circle";
    const color = colorForCode(item.code);
    return '<div class="featured-item">' +
      '<span class="featured-shape ' + shapeClass + '" style="color:' + color + ';background:' + (item.symbol === "triangle" ? "transparent" : color) + '"></span>' +
      '<span class="' + item.tone + '">' + item.rankLabel + '</span>' +
      '<span>' + item.name + '</span>' +
    '</div>';
  }).join("");
}

function renderCustomLegend(data) {
  const series = data.chart.series;
  const inflow = series.filter((item) => {
    const last = latestDefinedValue(item.data);
    return last != null && last > 0;
  });
  const outflow = series.filter((item) => {
    const last = latestDefinedValue(item.data);
    return last != null && last < 0;
  });

  function legendItem(item) {
    const color = colorForCode(item.code);
    return '<span class="chart-legend-item" data-code="' + item.code + '">' +
      '<span class="chart-legend-swatch" style="background:' + color + ';"></span>' +
      '<span>' + item.name + '</span>' +
    '</span>';
  }

  const container = document.getElementById("chart-custom-legend");
  container.innerHTML =
    '<div class="chart-legend-col">' +
      '<h4 class="up">📈 净流入</h4>' +
      inflow.map(legendItem).join("") +
    '</div>' +
    '<div class="chart-legend-col">' +
      '<h4 class="down">📉 净流出</h4>' +
      outflow.map(legendItem).join("") +
    '</div>';

  // Click to toggle series visibility
  container.querySelectorAll(".chart-legend-item").forEach((el) => {
    el.addEventListener("click", () => {
      const code = el.dataset.code;
      const s = chart.series.find((ser) => ser.options.id === code);
      if (s) {
        if (s.visible) {
          s.hide();
          el.classList.add("is-hidden");
        } else {
          s.show();
          el.classList.remove("is-hidden");
        }
      }
    });
  });
}

function renderChart(data) {
  const currentChart = ensureChart();
  currentChart.xAxis[0].setCategories(data.sampleTimes, false);
  let visibleSeries = data.chart.series;
  const sample = data.samples[state.index];
  const concepts = sample?.concepts || [];
  const { inflow: filteredInflow, outflow: filteredOutflow } = filteredFlowGroups(concepts, sample || {}, state.chartFilter);

  // Apply chart filter
  if (state.chartFilter === "inflow") {
    const inflowCodes = new Set(filteredInflow.map((item) => item.code));
    visibleSeries = visibleSeries.filter((item) => inflowCodes.has(item.code));
  } else if (state.chartFilter === "outflow") {
    const outflowCodes = new Set(filteredOutflow.map((item) => item.code));
    visibleSeries = visibleSeries.filter((item) => outflowCodes.has(item.code));
  } else if (
    state.chartFilter === "top3" ||
    state.chartFilter === "bottom3" ||
    state.chartFilter === "limit10"
  ) {
    const visibleCodes = new Set([
      ...filteredInflow.map((item) => item.code),
      ...filteredOutflow.map((item) => item.code),
    ]);
    visibleSeries = visibleSeries.filter((item) => visibleCodes.has(item.code));
  }
  const featured = featuredSeries(data);
  const newEntryAlerts = detectNewEntryAlerts(visibleSeries);
  const concentrationData = visiblePlaybackData(concentrationSeriesData(data.samples));
  const concentrationRange = concentrationAxisRange(concentrationData);

  currentChart.yAxis[1].setExtremes(concentrationRange.min, concentrationRange.max, false, false);

  visibleSeries.forEach((item) => {
    const existing = currentChart.series.find((series) => series.options.id === item.code);
    const color = colorForCode(item.code);
    const options = {
      id: item.code,
      type: "spline",
      name: item.name,
      color,
      zoneAxis: "y",
      zones: [
        { value: 0, color: "#22c55e" },
        { color },
      ],
      data: visiblePlaybackData(item.data),
    };

    if (existing) {
      existing.update({ name: item.name, color, zones: options.zones }, false);
      existing.setData(options.data, false, { duration: 300 });
    } else {
      currentChart.addSeries(options, false, { duration: 300 });
    }
  });

  // Inflow concentration
  const concInData = concentrationData.map((d) => d?.inflow ?? null);
  const concInPt = concInData[state.index];
  [{id:"conc-inflow",name:"流入集中度",color:"#dc2626",dash:"ShortDash",data:concInData},
   {id:"conc-outflow",name:"流出集中度",color:"#16a34a",dash:"ShortDot",data:concentrationData.map((d) => d?.outflow ?? null)}].forEach((sc) => {
    const ex = currentChart.series.find((s) => s.options.id === sc.id);
    const opts = { id:sc.id, type:"spline", name:sc.name, yAxis:1, color:sc.color, lineWidth:2.4, dashStyle:sc.dash, enableMouseTracking:true, marker:{enabled:false}, data:sc.data, zIndex:5 };
    if (ex) { ex.setData(sc.data, false, { duration: 260 }); }
    else { currentChart.addSeries(opts, false, { duration: 260 }); }
  });
  [{id:"conc-inflow-marker",y:concInPt,symbol:"diamond",color:"#dc2626"},
   {id:"conc-outflow-marker",y:concentrationData[state.index]?.outflow ?? null,symbol:"triangle",color:"#16a34a"}].forEach((sc) => {
    const ex = currentChart.series.find((s) => s.options.id === sc.id);
    const opts = { id:sc.id, type:"scatter", name:sc.id, yAxis:1, showInLegend:false, enableMouseTracking:false, zIndex:8, data:sc.y==null?[]:[{x:state.index,y:sc.y,className:"top-marker"}], marker:{enabled:true,symbol:sc.symbol,radius:5,lineWidth:2,lineColor:"rgba(255,255,255,0.85)",fillColor:sc.color} };
    if (ex) { ex.update({marker:opts.marker},false); ex.setData(opts.data,false,{duration:220}); }
    else { currentChart.addSeries(opts,false,{duration:220}); }
  });

  featured.top.forEach((item) => {
    const baseSeries = visibleSeries.find((series) => series.code === item.code);
    if (!baseSeries) return;

    const markerId = "marker-" + item.code;
    const trailId = "trail-" + item.code;
    const existing = currentChart.series.find((series) => series.options.id === markerId);
    const trailExisting = currentChart.series.find((series) => series.options.id === trailId);
    const markerColor = colorForCode(item.code);
    const visibleData = visiblePlaybackData(baseSeries.data);
    const trailData = trailPlaybackData(baseSeries.data, 6);
    const pointValue = visibleData[state.index];
    const markerSeries = {
      id: markerId,
      type: "scatter",
      name: item.name + " marker",
      linkedTo: item.code,
      enableMouseTracking: false,
      showInLegend: false,
      zIndex: 7,
      data: pointValue == null ? [] : [{
        x: state.index,
        y: pointValue,
        className: "top-marker",
      }],
      marker: {
        enabled: true,
        symbol: item.symbol,
        radius: 7,
        lineWidth: 2,
        lineColor: "rgba(255,255,255,0.85)",
        fillColor: markerColor,
      },
    };
    const trailSeries = {
      id: trailId,
      type: "spline",
      name: item.name + " trail",
      linkedTo: item.code,
      enableMouseTracking: false,
      showInLegend: false,
      zIndex: 6,
      className: "trail-series",
      color: markerColor,
      lineWidth: 4,
      opacity: 0.35,
      data: trailData,
    };

    if (existing) {
      existing.update({ marker: markerSeries.marker }, false);
      existing.setData(markerSeries.data, false, { duration: 240 });
    } else {
      currentChart.addSeries(markerSeries, false, { duration: 240 });
    }

    if (trailExisting) {
      trailExisting.setData(trailSeries.data, false, { duration: 240 });
    } else {
      currentChart.addSeries(trailSeries, false, { duration: 240 });
    }
  });

  featured.bottom.forEach((item) => {
    const baseSeries = visibleSeries.find((series) => series.code === item.code);
    if (!baseSeries) return;

    const markerId = "marker-bottom-" + item.code;
    const existing = currentChart.series.find((series) => series.options.id === markerId);
    const markerColor = colorForCode(item.code);
    const visibleData = visiblePlaybackData(baseSeries.data);
    const pointValue = visibleData[state.index];
    const markerSeries = {
      id: markerId,
      type: "scatter",
      name: item.name + " bottom marker",
      linkedTo: item.code,
      enableMouseTracking: false,
      showInLegend: false,
      zIndex: 6,
      data: pointValue == null ? [] : [{
        x: state.index,
        y: pointValue,
        className: "bottom-marker",
      }],
      marker: {
        enabled: true,
        symbol: item.symbol,
        radius: 4.5,
        lineWidth: 1,
        lineColor: "rgba(255,255,255,0.4)",
        fillColor: markerColor,
      },
    };

    if (existing) {
      existing.update({ marker: markerSeries.marker }, false);
      existing.setData(markerSeries.data, false, { duration: 220 });
    } else {
      currentChart.addSeries(markerSeries, false, { duration: 220 });
    }
  });

  const entryAlertsSeries = currentChart.series.find((series) => series.options.id === "new-entry-alerts");
  const entryAlertOptions = {
    id: "new-entry-alerts",
    type: "scatter",
    name: "新进榜提示",
    showInLegend: false,
    zIndex: 9,
    data: newEntryAlerts.map((item) => ({
      x: item.x,
      y: item.y,
      color: item.color,
      entryTag: item.tag,
      name: item.name,
      dataLabels: {
        enabled: true,
        allowOverlap: true,
        crop: false,
        overflow: "none",
        y: item.isInflow ? -14 : 16,
        padding: 0,
        useHTML: true,
        formatter() {
          const bg = item.isInflow ? "rgba(220,38,38,0.9)" : "rgba(22,163,74,0.9)";
          return '<span style="display:inline-block;padding:2px 6px;border-radius:999px;background:' + bg + ';color:#fff;font-size:10px;font-weight:600;white-space:nowrap;">' + (this.point.entryTag || "") + '</span>';
        },
      },
    })),
    marker: {
      enabled: true,
      symbol: "diamond",
      radius: 5,
      lineWidth: 2,
      lineColor: "rgba(255,255,255,0.9)",
    },
    tooltip: {
      pointFormatter() {
        return '<span style="color:' + this.color + ';">●</span> ' + this.name + ' <b>' + this.entryTag + '</b><br/>';
      },
    },
  };

  if (entryAlertsSeries) {
    entryAlertsSeries.setData(entryAlertOptions.data, false, { duration: 220 });
  } else {
    currentChart.addSeries(entryAlertOptions, false, { duration: 220 });
  }

  currentChart.series
    .filter((series) => {
      const isPrimary = visibleSeries.some((item) => item.code === series.options.id);
      const isConcentration = series.options.id === "conc-inflow" || series.options.id === "conc-outflow";
      const isTopMarker = featured.top.some((item) => ("marker-" + item.code) === series.options.id);
      const isTrail = featured.top.some((item) => ("trail-" + item.code) === series.options.id);
      const isBottomMarker = featured.bottom.some((item) => ("marker-bottom-" + item.code) === series.options.id);
      const isConcentrationMarker = series.options.id === "conc-inflow-marker" || series.options.id === "conc-outflow-marker";
      const isNewEntryAlert = series.options.id === "new-entry-alerts";
      return !isPrimary && !isConcentration && !isConcentrationMarker && !isTopMarker && !isTrail && !isBottomMarker && !isNewEntryAlert;
    })
    .forEach((series) => series.remove(false));

  // Net flow bar chart (separate chart below)
  const nfChart = ensureNetFlowChart();
  const netFlowData = data.chart.netFlow || [];
  const previousNetFlowData = data.chart.previousNetFlow || [];
  const netFlowVisible = visiblePlaybackData(netFlowData);
  const previousNetFlowVisible = visiblePlaybackData(previousNetFlowData);
  nfChart.xAxis[0].setCategories(data.sampleTimes, false);
  const nfSeries = nfChart.series.find((s) => s.options.id === "netflow-bars");
  const nfPrevSeries = nfChart.series.find((s) => s.options.id === "netflow-prev");
  nfSeries.setData(netFlowVisible.map((v, i) => ({
    x: i,
    y: v,
    color: v != null ? (v >= 0 ? "rgba(22,163,74,0.5)" : "rgba(220,38,38,0.5)") : "transparent",
  })), false);
  nfPrevSeries.setVisible(previousNetFlowVisible.some((value) => value != null), false);
  nfPrevSeries.setData(previousNetFlowVisible, false);
  nfChart.redraw();
  // Draw cursor line on net flow chart too
  nfChart.xAxis[0].removePlotLine("nf-playhead");
  nfChart.xAxis[0].addPlotLine({ id: "nf-playhead", value: state.index, color: "#ffd36b", width: 1.5, zIndex: 5 });

  // Remove inline net flow series from main chart if it exists
  const oldNf = currentChart.series.find((s) => s.options.id === "net-flow-bars");
  if (oldNf) oldNf.remove(false);

  // Emotion chart (temperature + volume, shared xAxis)
  const emoChart = ensureEmotionChart();
  const emoData = data.emotionSeries || { degree: [], balance: [] };
  emoChart.xAxis[0].setCategories(data.sampleTimes, false);
  const degreeSeries = emoChart.series.find((s) => s.options.id === "emo-degree");
  const degreePrevSeries = emoChart.series.find((s) => s.options.id === "emo-degree-prev");
  const balanceSeries = emoChart.series.find((s) => s.options.id === "emo-balance");
  const balancePrevSeries = emoChart.series.find((s) => s.options.id === "emo-balance-prev");
  const previewSeries = emoChart.series.find((s) => s.options.id === "emo-preview");
  const anchorUpSeries = emoChart.series.find((s) => s.options.id === "emo-anchor-up");
  const anchorDownSeries = emoChart.series.find((s) => s.options.id === "emo-anchor-down");
  const anchorFlatSeries = emoChart.series.find((s) => s.options.id === "emo-anchor-flat");
  const previousDegreeData = visiblePlaybackData(emoData.previousDegree || []);
  const previousBalanceData = visiblePlaybackData(emoData.previousBalance || []);
  degreeSeries.setData(visiblePlaybackData(emoData.degree), false);
  degreePrevSeries.setVisible(previousDegreeData.some((value) => value != null), false);
  degreePrevSeries.setData(previousDegreeData, false);
  balanceSeries.setData(visiblePlaybackData(emoData.balance), false);
  balancePrevSeries.setVisible(previousBalanceData.some((value) => value != null), false);
  balancePrevSeries.setData(previousBalanceData, false);
  previewSeries.setData(visiblePlaybackData(emoData.previewBalance || []), false);
  const anchorScatter = buildAnchorScatterData(data);
  anchorUpSeries.setData(anchorScatter.filter((item) => item.direction === "up"), false);
  anchorDownSeries.setData(anchorScatter.filter((item) => item.direction === "down"), false);
  anchorFlatSeries.setData(anchorScatter.filter((item) => item.direction !== "up" && item.direction !== "down"), false);
  emoChart.redraw();
  emoChart.xAxis[0].removePlotLine("emo-playhead");
  emoChart.xAxis[0].addPlotLine({ id: "emo-playhead", value: state.index, color: "#ffd36b", width: 1.5, zIndex: 5 });

  currentChart.redraw();
  drawCursor();
  renderFeaturedLegend(data);
  renderCustomLegend(data);
}

function drawCursor() {
  if (!chart || !state.data) return;
  const xAxis = chart.xAxis[0];
  const label = state.data.sampleTimes[state.index];

  xAxis.removePlotLine("playhead");
  xAxis.addPlotLine({
    id: "playhead",
    value: state.index,
    color: "#ffd36b",
    width: 1.5,
    zIndex: 5,
    dashStyle: "Dash",
    label: {
      text: label,
      rotation: 0,
      y: 14,
      style: {
        color: "#ffd36b",
        fontSize: "10px",
      },
    },
  });
}

function renderConceptGrid(sample) {
  const concepts = sample.concepts && sample.concepts.length
    ? sample.concepts
    : [...sample.leaders, ...sample.laggards];
  const filtered = concepts;
  const allInflow = filtered.filter((item) => item.mainFundDiff >= 0);
  const allOutflow = filtered.filter((item) => item.mainFundDiff < 0);
  const inflow = allInflow.slice(0, 10);
  const outflow = allOutflow.slice(0, 10);

  function renderColumn(items, label, colorClass, total) {
    if (items.length === 0) {
      return '<div class="concept-column">' +
        '<h3 class="concept-column-title ' + colorClass + '">' + label + ' (0/' + total + ')</h3>' +
        '<p class="muted" style="padding:20px 0;text-align:center;">暂无数据</p>' +
      '</div>';
    }
    let idx = 0;
    return '<div class="concept-column">' +
      '<h3 class="concept-column-title ' + colorClass + '">' + label + ' (' + items.length + '/' + total + ')</h3>' +
      items.map((item) => {
        idx += 1;
        const flowClass = item.mainFundDiff >= 0 ? "flow-in" : "flow-out";
        const valueClass = item.mainFundDiff >= 0 ? "up" : "down";
        const changeClass = item.change >= 0 ? "up" : "down";
        const sideLabel = item.mainFundDiff >= 0 ? "净流入" : "净流出";
        return '<article class="card concept-item group/item ' + flowClass + '" role="button" tabindex="0" data-concept-code="' + escapeHtmlText(item.code) + '" data-tooltip="' + escapeHtmlText(item.name) + ' · ' + sideLabel + '" data-side="top">' +
          '<header class="concept-top">' +
            '<div><div class="concept-rank">#' + String(idx).padStart(2, "0") + '</div><h2 class="concept-name">' + escapeHtmlText(item.name) + '</h2></div>' +
            '<span class="' + valueClass + '" style="font-weight:600;font-size:11px;">' + sideLabel + '</span>' +
          '</header>' +
          '<section>' +
            '<div class="concept-flow ' + valueClass + '">' + formatFund(item.mainFundDiff) + '</div>' +
            '<div class="' + changeClass + '" style="font-size:12px;">涨跌幅 ' + formatPercent(item.change) + '</div>' +
          '</section>' +
          '<footer class="concept-foot">' +
            '<p class="muted">代表股 ' + escapeHtmlText(item.leaderStock) + '</p>' +
            '<span class="concept-action">查看个股分时</span>' +
          '</footer>' +
        '</article>';
      }).join("") +
    '</div>';
  }

  document.getElementById("concepts-grid").innerHTML =
    renderColumn(inflow, "📈 净流入", "up", allInflow.length) +
    renderColumn(outflow, "📉 净流出", "down", allOutflow.length);

  document.getElementById("concepts-grid").classList.toggle("has-two-columns", inflow.length > 0 && outflow.length > 0);
}

function renderMetrics(sample) {
  const concentration = concentrationMeta(sample);
  document.getElementById("current-time").textContent = state.data.sampleTimes[state.index] || "--:--:--";
  document.getElementById("updated-at").textContent = new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date(state.data.updatedAt));
  document.getElementById("selected-date").textContent = state.data.requestedDate;
  const infCnt = sample.concepts?.filter((c) => c.mainFundDiff > 0).length || 0;
  const outfCnt = sample.concepts?.filter((c) => c.mainFundDiff < 0).length || 0;
  document.getElementById("positive-count").textContent = infCnt + " / " + outfCnt;
  document.getElementById("positive-sub").textContent = "流入 " + infCnt + " 个 · 流出 " + outfCnt + " 个";
  document.getElementById("inflow-top3-card").textContent = formatFund(concentration.inflowTop3Abs);
  document.getElementById("outflow-top3-card").textContent = formatFund(concentration.outflowTop3Abs);
  document.getElementById("top-three-share").textContent = formatPercent(concentration.inflowShare) + " " + concentration.inflowLabel;
  document.getElementById("concentration-badge").textContent = formatPercent(concentration.outflowShare) + " " + concentration.outflowLabel;
  // Net flow
  const all = [...sample.leaders, ...sample.laggards];
  const netFlow = all.reduce((sum, item) => sum + (item.mainFundDiff || 0), 0);
  const netEl = document.getElementById("net-flow-stat");
  netEl.textContent = formatFund(netFlow);
  netEl.className = "metric-value " + (netFlow >= 0 ? "up" : "down");
  document.getElementById("sample-progress").textContent = (state.index + 1) + " / " + state.data.samples.length;
  renderEmotion(state.data);
}

function renderEmotion(data) {
  const emo = data.emotion || {};
  document.getElementById("emotion-degree").textContent = "温度 " + (emo.degree || "--") + "°";
  document.getElementById("emotion-balance").textContent = emo.balanceStr || "--";
  const chgEl = document.getElementById("emotion-balchg");
  const chg = emo.balanceChange || 0;
  chgEl.textContent = (chg >= 0 ? "+" : "") + formatFund(chg);
  chgEl.className = chg >= 0 ? "up" : "down";
  document.getElementById("emotion-preview").textContent = emo.previewBalanceStr || "--";
  document.getElementById("emotion-updown").textContent = (emo.riseNum || "--") + " / " + (emo.fallNum || "--");
  document.getElementById("emotion-ratio").textContent = (emo.upRatio ? emo.upRatio + "%" : "--");
  document.getElementById("emotion-perf").textContent = emo.performance ? emo.performance + "%" : "--";
  document.getElementById("emotion-open").textContent = emo.upOpenRatio ? emo.upOpenRatio + "%" : "--";
  document.getElementById("emotion-profit").textContent = emo.profitRatio ? emo.profitRatio + "%" : "--";
  document.getElementById("emotion-risefall").textContent = (emo.riseNum || "--") + " / " + (emo.fallNum || "--");
  document.getElementById("emotion-up").textContent = emo.upNum || "--";
  document.getElementById("emotion-down").textContent = emo.downNum || "--";
}

function setIndex(index) {
  if (!state.data) return;
  state.index = Math.max(0, Math.min(index, state.data.samples.length - 1));
  timeline.value = String(state.index);
  updateSliderPaint();
  const sample = state.data.samples[state.index];
  renderChart(state.data);
  renderMetrics(sample);
  renderConceptGrid(sample);
  renderAnchorStream(state.data);
  if (state.selectedConceptCode) {
    renderStockDrawer();
  }
}

async function fetchDay(date, options = {}) {
  const { showLoading = false, preserveIndex = false } = options;
  if (showLoading) setPageLoading(true);

  try {
    const previousIndex = state.index;
    const query = date ? "?date=" + encodeURIComponent(date) : "";
    const response = await fetch("/api/finance" + query, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("加载交易日数据失败");
    }

    const data = await response.json();
    buildColorMap(data);
    state.data = data;
    state.index = preserveIndex
      ? Math.min(previousIndex, Math.max(0, data.samples.length - 1))
      : data.initialIndex;

    if (data.availableDates.length > 0) {
      renderDateOptions(data.availableDates, data.requestedDate);
    }
    syncUrl();

    timeline.max = String(Math.max(0, data.samples.length - 1));
    if (state.selectedConceptCode) {
      try {
        await fetchStockDrawerData(state.selectedConceptCode, { force: true });
      } catch {
        state.stockDrawerData = {
          code: state.selectedConceptCode,
          name: currentConcept()?.name || state.selectedConceptCode,
          series: [],
          samples: [],
        };
      }
    }
    renderChart(data);
    setIndex(state.index);
    updateSliderPaint();
    return true;
  } catch {
    return false;
  } finally {
    if (showLoading) setPageLoading(false);
  }
}

async function refreshLiveIfNeeded() {
  if (!state.data) return;
  if (!shouldPollLiveData()) return;
  if (state.data.requestedDate !== state.data.latestDate) return;
  if (state.playing) return;

  const keepAtEnd = state.index >= state.data.samples.length - 1;
  await fetchDay(undefined, { preserveIndex: !keepAtEnd });
}

async function refreshOnForeground() {
  if (!shouldPollLiveData()) return;
  if (state.foregroundRefreshing) return;

  const now = Date.now();
  if (now - state.foregroundRefreshAt < FOREGROUND_REFRESH_DEBOUNCE_MS) return;

  state.foregroundRefreshAt = now;
  state.foregroundRefreshing = true;

  try {
    await Promise.all([
      refreshLiveIfNeeded(),
      fetchStatus(),
    ]);
  } finally {
    state.foregroundRefreshing = false;
  }
}

dateController = initCombobox({
  trigger: dateTrigger,
  popover: datePopover,
  listbox: dateListbox,
  valueInput: dateValueInput,
  filterInput: dateFilterInput,
  onSelect: async (value) => {
    stopPlayback();
    await fetchDay(value, { showLoading: true });
    syncUrl();
  },
});

playBtn.addEventListener("click", togglePlayback);
latestBtn.addEventListener("click", async () => {
  stopPlayback();
  await fetchDay(undefined, { showLoading: true });
});
timeline.addEventListener("input", () => {
  stopPlayback();
  setIndex(Number(timeline.value));
  updateSliderPaint();
});
speedButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextSpeed = Number(button.dataset.speed) || 1;
    state.playbackSpeed = nextSpeed;
    updateSpeedButtons();
    if (state.playing) {
      startPlayback();
    }
  });
});


const filterButtons = Array.from(document.querySelectorAll(".chart-filter-btn"));
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    state.chartFilter = btn.dataset.filter;
    filterButtons.forEach((b) => b.classList.toggle("is-active", b.dataset.filter === state.chartFilter));
    if (state.data) setIndex(state.index);
  });
});

document.getElementById("concepts-grid").addEventListener("click", (event) => {
  const item = event.target.closest(".concept-item[data-concept-code]");
  if (!item) return;
  openStockDrawer(item.dataset.conceptCode);
});

document.getElementById("concepts-grid").addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const item = event.target.closest(".concept-item[data-concept-code]");
  if (!item) return;
  event.preventDefault();
  openStockDrawer(item.dataset.conceptCode);
});

stockDrawerClose.addEventListener("click", closeStockDrawer);
stockDrawerBackdrop.addEventListener("click", closeStockDrawer);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.selectedConceptCode) {
    closeStockDrawer();
  }
});

fetchDay(undefined, { showLoading: true }).then((ok) => {
  fetchStatus();
  updateSpeedButtons();
  updateSliderPaint();
  if (ok) {
    setInterval(refreshLiveIfNeeded, REFRESH_MS);
    setInterval(fetchStatus, REFRESH_MS);
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    refreshOnForeground();
  }
});
window.addEventListener("focus", refreshOnForeground);
window.addEventListener("pageshow", refreshOnForeground);
`;
