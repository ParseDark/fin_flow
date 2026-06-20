// Auto-generated from main.css — do not edit manually.
export const CSS_CONTENT = `
:root {
  color-scheme: light;
  --bg: #fafafa;
  --bg-2: #ffffff;
  --panel: rgba(255, 255, 255, 0.92);
  --panel-strong: rgba(255, 255, 255, 0.98);
  --line: rgba(39, 39, 42, 0.12);
  --line-soft: rgba(39, 39, 42, 0.08);
  --text: #18181b;
  --muted: rgba(39, 39, 42, 0.62);
  --up: #dc2626;
  --down: #16a34a;
  --gold: #a16207;
  --accent: #3f3f46;
  --shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
}

.dark {
  color-scheme: dark;
  --bg: #09090b;
  --bg-2: #18181b;
  --panel: rgba(24, 24, 27, 0.88);
  --panel-strong: rgba(24, 24, 27, 0.96);
  --line: rgba(244, 244, 245, 0.12);
  --line-soft: rgba(244, 244, 245, 0.08);
  --text: #fafafa;
  --muted: rgba(244, 244, 245, 0.6);
  --up: #f87171;
  --down: #4ade80;
  --gold: #facc15;
  --accent: #e4e4e7;
  --shadow: 0 8px 30px rgba(0, 0, 0, 0.24);
}

* { box-sizing: border-box; }

body {
  margin: 0;
  min-height: 100vh;
  color: var(--text);
  background:
    linear-gradient(180deg, var(--bg), var(--bg-2));
  font-family: "Avenir Next", "Segoe UI", sans-serif;
}

.page {
  width: min(1320px, calc(100% - 28px));
  margin: 0 auto;
  padding: 28px 0 44px;
}

.hero {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr;
  gap: 16px;
  margin-bottom: 18px;
}

h1 {
  margin: 0 0 8px;
  font-size: clamp(34px, 6vw, 64px);
  letter-spacing: -0.05em;
  line-height: 0.94;
}

.lead {
  margin: 0;
  max-width: 760px;
  color: var(--muted);
  line-height: 1.7;
}

.panel {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 24px;
  padding: 18px;
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;
}

.card {
  background: var(--panel);
  border-color: var(--line);
  box-shadow: var(--shadow);
  border-radius: 24px;
}

.card > header h2 {
  margin: 0;
  letter-spacing: -0.02em;
}

.card > header p {
  color: var(--muted);
}

button,
input,
.concept-card,
.panel {
  transition: all 0.2s ease;
}

.panel::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(140deg, rgba(255,255,255,0.45), transparent 34%);
  pointer-events: none;
}

.hero-copy,
.hero-side {
  min-height: 168px;
}

.eyebrow {
  margin-bottom: 10px;
  color: var(--accent);
  font-size: 12px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.hero-side {
  display: grid;
  align-content: space-between;
  gap: 16px;
}

.status-rail {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.status-pill {
  padding: 12px 14px;
  border: 1px solid var(--line-soft);
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.02);
}

.status-pill .label {
  font-size: 11px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 4px;
}

.status-pill .value {
  font-size: 14px;
  color: var(--text);
}

.controls {
  display: grid;
  grid-template-columns: 280px minmax(220px, 1fr) 140px;
  gap: 12px;
  align-items: end;
  margin: 18px 0 16px;
}

.control-field {
  display: grid;
  gap: 8px;
}

.control-label {
  color: var(--muted);
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.select button {
  width: 100%;
  justify-content: space-between;
}

.select {
  position: relative;
}

.select [data-popover] {
  display: none;
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 50;
  background: var(--panel-strong);
  border: 1px solid var(--line);
  border-radius: 18px;
  backdrop-filter: blur(10px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.18);
  overflow: hidden;
  padding: 8px;
}

.select [data-popover][aria-hidden="false"] {
  display: block;
}

.select [data-popover] header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 6px 8px;
  border-bottom: 1px solid var(--line-soft);
  margin-bottom: 4px;
}

.select [data-popover] header input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text);
  font-size: 13px;
}

.select [data-popover] header input::placeholder {
  color: var(--muted);
}

.select [data-popover] header svg {
  flex-shrink: 0;
  color: var(--muted);
}

.select [role="listbox"] {
  max-height: 260px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.select [role="option"] {
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  color: var(--text);
  transition: background 0.12s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.select [role="option"]:hover {
  background: rgba(63, 63, 70, 0.06);
}

.select [role="option"][data-selected] {
  background: rgba(63, 63, 70, 0.1);
}

.select [role="option"][data-highlighted] {
  background: rgba(63, 63, 70, 0.08);
}

.select [role="option"][hidden] {
  display: none;
}

.btn:hover,
.btn-secondary:hover,
.btn-outline:hover,
.select button:hover,
.input:hover {
  transform: translateY(-1px);
}

.btn:focus-visible,
.btn-secondary:focus-visible,
.btn-outline:focus-visible,
.select button:focus-visible,
.input:focus-visible {
  outline: 2px solid rgba(63, 63, 70, 0.18);
  outline-offset: 2px;
}

.btn:active,
.btn-secondary:active,
.btn-outline:active,
.select button:active {
  transform: translateY(0);
}

.metric-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.metric {
  min-height: 112px;
}

.metric-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.metric-label {
  color: var(--muted);
  font-size: 12px;
  margin-bottom: 6px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.metric-value {
  font-size: 32px;
  letter-spacing: -0.05em;
}

.metric-sub {
  margin-top: 6px;
  font-size: 12px;
  color: var(--muted);
}

.chart-panel {
  position: relative;
  margin-bottom: 16px;
  padding: 20px;
}

#chart {
  height: 540px;
}

.chart-custom-legend {
  display: flex;
  gap: 16px;
  padding: 8px 0 0;
  flex-wrap: wrap;
}

.chart-legend-col {
  flex: 1;
  min-width: 200px;
}

.chart-legend-col h4 {
  font-size: 11px;
  font-weight: 600;
  margin: 0 0 4px;
}

.chart-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 2px 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 11px;
  transition: opacity 0.15s;
}

.chart-legend-item:hover {
  background: rgba(63, 63, 70, 0.06);
}

.chart-legend-item.is-hidden {
  opacity: 0.35;
}

.chart-legend-swatch {
  display: inline-block;
  width: 14px;
  height: 4px;
  border-radius: 2px;
  flex-shrink: 0;
}

#chart,
#netflow-chart,
#emotion-chart {
  border: 1px solid rgba(24, 24, 27, 0.14);
  border-radius: 20px;
  background:
    linear-gradient(180deg, rgba(24, 24, 27, 0.96), rgba(39, 39, 42, 0.94)),
    radial-gradient(circle at top, rgba(255,255,255,0.04), transparent 38%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    0 8px 30px rgba(0, 0, 0, 0.08);
}

.dark #chart,
.dark #netflow-chart,
.dark #emotion-chart {
  border-color: rgba(244, 244, 245, 0.08);
  background:
    linear-gradient(180deg, rgba(9, 9, 11, 0.98), rgba(24, 24, 27, 0.96)),
    radial-gradient(circle at top, rgba(255,255,255,0.05), transparent 38%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.03),
    0 8px 30px rgba(0, 0, 0, 0.2);
}

.anchor-stream {
  margin-top: 10px;
  padding: 12px 14px;
  border: 1px solid var(--line-soft);
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(9,9,11,0.92), rgba(24,24,27,0.88));
}

.anchor-stream-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.anchor-stream-title {
  font-size: 12px;
  font-weight: 600;
  color: rgba(244,244,245,0.9);
}

.anchor-stream-meta {
  font-size: 11px;
  color: rgba(244,244,245,0.52);
}

.anchor-stream-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 8px;
}

.anchor-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(244,244,245,0.08);
  background: rgba(255,255,255,0.03);
}

.anchor-item.is-active {
  border-color: rgba(250,204,21,0.48);
  box-shadow: inset 0 0 0 1px rgba(250,204,21,0.14);
}

.anchor-item-main {
  min-width: 0;
}

.anchor-item-time {
  display: inline-block;
  margin-bottom: 4px;
  font-size: 11px;
  color: rgba(244,244,245,0.52);
}

.anchor-item-name {
  font-size: 13px;
  font-weight: 600;
  color: rgba(244,244,245,0.94);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.anchor-badge {
  flex-shrink: 0;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
}

.anchor-badge.up {
  color: #fecaca;
  background: rgba(220,38,38,0.2);
}

.anchor-badge.down {
  color: #bbf7d0;
  background: rgba(22,163,74,0.2);
}

.anchor-badge.flat {
  color: #fde68a;
  background: rgba(245,158,11,0.2);
}

#chart .highcharts-point.top-marker {
  animation: pulse-marker 1.15s ease-in-out infinite;
  transform-origin: center;
  transform-box: fill-box;
}

#chart .highcharts-point.bottom-marker {
  opacity: 0.68;
}

#chart .highcharts-series.trail-series path {
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.16));
  opacity: 0.95;
}

@keyframes pulse-marker {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.58;
    transform: scale(1.28);
  }
}

.chart-head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 16px;
  margin-bottom: 14px;
}

.chart-title {
  font-size: 28px;
  letter-spacing: -0.04em;
}

.chart-note {
  color: var(--muted);
  font-size: 13px;
  max-width: 540px;
}

.chart-stats {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.mini-stat-card {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 6px 12px;
  border: 1px solid var(--line-soft);
  border-radius: 10px;
  background: rgba(15, 23, 42, 0.03);
  min-width: 80px;
}

.dark .mini-stat-card {
  background: rgba(244, 244, 245, 0.04);
}

.mini-stat-label {
  font-size: 10px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.mini-stat-value {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.speed-group {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.speed-btn.is-active {
  border-color: var(--accent);
  background: rgba(63, 63, 70, 0.08);
}

.chart-filter-tags {
  display: inline-flex;
  gap: 4px;
  flex-wrap: wrap;
}

.chart-filter-btn {
  font-size: 11px;
  padding: 2px 8px;
}

.chart-filter-btn.is-active {
  border-color: var(--accent);
  background: rgba(63, 63, 70, 0.08);
}

.toggle-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 12px;
  color: var(--muted);
  user-select: none;
}

.toggle-label input[type="checkbox"] {
  accent-color: var(--accent);
}

.featured-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.featured-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  font-size: 12px;
}

.featured-shape {
  display: inline-block;
  width: 10px;
  height: 10px;
}

.shape-circle {
  border-radius: 999px;
}

.shape-square {
  border-radius: 2px;
}

.shape-triangle {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 10px solid currentColor;
}

.scrubber {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--line-soft);
}

.scrubber-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.timeline {
  width: 100%;
}

input[type="range"].input {
  width: 100%;
}

.concepts-panel {
  position: relative;
  padding: 20px;
}

.concepts-head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 16px;
  margin-bottom: 14px;
}

.concepts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px;
}

.concepts-grid.has-two-columns {
  grid-template-columns: 1fr 1fr;
}

.concept-column {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.concept-column-title {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.02em;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--line-soft);
}

.concept-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 14px;
  border-radius: 12px;
}

.concept-item.flow-in {
  border-color: rgba(220, 38, 38, 0.14);
  background: rgba(220, 38, 38, 0.03);
}

.concept-item.flow-out {
  border-color: rgba(22, 163, 74, 0.14);
  background: rgba(22, 163, 74, 0.03);
}

.concept-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
}

.concept-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.concept-rank {
  color: var(--muted);
  font-size: 10px;
}

.concept-name {
  font-size: 13px;
  line-height: 1.2;
}

.concept-flow {
  margin: 2px 0;
  font-size: 18px;
  letter-spacing: -0.04em;
}

.concept-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  font-size: 11px;
}

.concept-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  padding: 5px 9px;
  border-radius: 999px;
  background: rgba(255,255,255,0.04);
  color: var(--muted);
  font-size: 11px;
}

.concept-item {
  cursor: pointer;
  text-align: left;
}

.concept-action {
  margin-left: auto;
  font-size: 11px;
  color: var(--muted);
}

.drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: none;
  background: rgba(9, 9, 11, 0.42);
  backdrop-filter: blur(4px);
}

.stock-drawer {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 90;
  display: flex;
  flex-direction: column;
  width: min(760px, 100vw);
  height: 100vh;
  padding: 18px;
  border-left: 1px solid var(--line);
  background: var(--panel-strong);
  box-shadow: -24px 0 60px rgba(0, 0, 0, 0.18);
  transform: translateX(100%);
  transition: transform 0.22s ease;
}

body.drawer-open {
  overflow: hidden;
}

body.drawer-open .drawer-backdrop {
  display: block;
}

body.drawer-open .stock-drawer {
  transform: translateX(0);
}

.stock-drawer-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--line-soft);
}

.stock-drawer-title {
  margin: 0;
  font-size: 24px;
  line-height: 1.15;
  letter-spacing: -0.03em;
}

.stock-drawer-meta {
  margin-top: 6px;
  color: var(--muted);
  font-size: 12px;
}

.stock-chart-wrap {
  position: relative;
  margin-top: 14px;
}

#stock-drawer-chart {
  height: 440px;
  border: 1px solid rgba(24, 24, 27, 0.14);
  border-radius: 20px;
  background:
    linear-gradient(180deg, rgba(24, 24, 27, 0.96), rgba(39, 39, 42, 0.94)),
    radial-gradient(circle at top, rgba(255,255,255,0.04), transparent 38%);
  transition: opacity 0.16s ease;
}

.dark #stock-drawer-chart {
  border-color: rgba(244, 244, 245, 0.08);
  background:
    linear-gradient(180deg, rgba(9, 9, 11, 0.98), rgba(24, 24, 27, 0.96)),
    radial-gradient(circle at top, rgba(255,255,255,0.05), transparent 38%);
}

.stock-loading-overlay {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 24px;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(9,9,11,0.72), rgba(24,24,27,0.82));
  backdrop-filter: blur(6px);
}

.stock-drawer.is-loading #stock-drawer-chart {
  opacity: 0.42;
}

.stock-drawer.is-loading .stock-loading-overlay {
  display: flex;
}

.stock-loading-card {
  display: grid;
  gap: 14px;
  width: min(360px, 100%);
  padding: 18px;
  border: 1px solid rgba(244,244,245,0.1);
  border-radius: 16px;
  background: rgba(255,255,255,0.05);
}

.stock-loading-head {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(244,244,245,0.88);
  font-size: 13px;
  font-weight: 600;
}

.stock-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(244,244,245,0.22);
  border-top-color: #ffd36b;
  border-radius: 999px;
  animation: stock-spin 0.8s linear infinite;
}

.stock-loading-lines {
  display: grid;
  gap: 8px;
}

@keyframes stock-spin {
  to {
    transform: rotate(360deg);
  }
}

.stock-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 8px;
  margin-top: 12px;
  overflow-y: auto;
  padding-right: 2px;
}

.stock-row {
  display: grid;
  gap: 4px;
  padding: 10px 12px;
  border: 1px solid var(--line-soft);
  border-radius: 12px;
  background: rgba(63, 63, 70, 0.04);
}

.stock-row-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.stock-name {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 600;
}

.stock-title-line {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.stock-title-line .stock-name {
  flex: 1;
}

.stock-code {
  color: var(--muted);
  font-size: 11px;
}

.stock-tag {
  flex-shrink: 0;
  padding: 1px 6px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 600;
  line-height: 1.5;
}

.stock-tag.core {
  color: #fde68a;
  border: 1px solid rgba(250, 204, 21, 0.34);
  background: rgba(250, 204, 21, 0.12);
}

.stock-empty {
  margin-top: 14px;
  padding: 28px;
  border: 1px dashed var(--line);
  border-radius: 16px;
  color: var(--muted);
  text-align: center;
  font-size: 13px;
}

.stock-row.is-skeleton {
  min-height: 58px;
  pointer-events: none;
}

.muted { color: var(--muted); }
.up { color: var(--up); }
.down { color: var(--down); }
.gold { color: var(--gold); }
.blue { color: var(--blue); }

.loading-overlay {
  position: absolute;
  inset: 0;
  z-index: 15;
  display: none;
  padding: 16px;
  border-radius: inherit;
  background: linear-gradient(180deg, rgba(250, 250, 250, 0.84), rgba(244, 244, 245, 0.78));
  backdrop-filter: blur(6px);
}

.dark .loading-overlay {
  background: linear-gradient(180deg, rgba(9, 9, 11, 0.82), rgba(24, 24, 27, 0.78));
}

body[data-loading="true"] .loading-overlay {
  display: block;
}

body[data-loading="true"] .loading-dim {
  pointer-events: none;
}

.loading-stack {
  display: grid;
  gap: 12px;
  height: 100%;
}

.loading-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  height: 100%;
}

.loading-concepts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  height: 100%;
}

.skeleton-card,
.skeleton-line {
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  background: rgba(63, 63, 70, 0.08);
}

.dark .skeleton-card,
.dark .skeleton-line {
  background: rgba(244, 244, 245, 0.08);
}

.skeleton-card::after,
.skeleton-line::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.36), transparent);
  animation: skeleton-shimmer 1.2s ease-in-out infinite;
}

.dark .skeleton-card::after,
.dark .skeleton-line::after {
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent);
}

.skeleton-card {
  min-height: 112px;
}

.skeleton-line {
  height: 12px;
}

.skeleton-line.lg {
  height: 18px;
}

.skeleton-line.sm {
  width: 38%;
}

.skeleton-line.md {
  width: 62%;
}

.skeleton-line.wide {
  width: 86%;
}

.skeleton-chart {
  min-height: 540px;
}

.skeleton-netflow {
  min-height: 120px;
}

.skeleton-emotion {
  min-height: 180px;
}

.skeleton-concept {
  min-height: 88px;
}

.loading-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  color: var(--muted);
  background: rgba(255,255,255,0.5);
}

.dark .loading-label {
  background: rgba(255,255,255,0.06);
}

@keyframes skeleton-shimmer {
  100% {
    transform: translateX(100%);
  }
}

@media (max-width: 920px) {
  .hero,
  .controls,
  .metric-grid,
  .status-rail,
  .concepts-grid,
  .loading-grid,
  .loading-concepts {
    grid-template-columns: 1fr;
  }

  #chart {
    height: 380px;
  }

  .stock-drawer {
    width: 100vw;
  }

  #stock-drawer-chart {
    height: 360px;
  }
}
`;
