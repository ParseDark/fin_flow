export function StockDrawer() {
  return (
    <>
      <div className="drawer-backdrop" id="stock-drawer-backdrop" aria-hidden="true" />
      <aside className="stock-drawer" id="stock-drawer" aria-hidden="true" aria-labelledby="stock-drawer-title">
        <header className="stock-drawer-head">
          <div>
            <h2 className="stock-drawer-title" id="stock-drawer-title">板块个股分时</h2>
            <div className="stock-drawer-meta" id="stock-drawer-meta">选择一个概念板块查看个股资金流。</div>
          </div>
          <button className="btn-icon-outline size-8" id="stock-drawer-close" type="button" aria-label="关闭板块个股分时">
            <CloseIcon />
          </button>
        </header>
        <div className="stock-chart-wrap">
          <div id="stock-drawer-chart" />
          <div className="stock-loading-overlay" id="stock-loading-overlay" aria-hidden="true">
            <div className="stock-loading-card">
              <div className="stock-loading-head">
                <span className="stock-spinner" aria-hidden="true" />
                <span>正在加载板块个股分时</span>
              </div>
              <div className="stock-loading-lines" aria-hidden="true">
                <div className="skeleton-line wide" />
                <div className="skeleton-line md" />
                <div className="skeleton-line wide" />
              </div>
            </div>
          </div>
        </div>
        <div className="stock-list" id="stock-drawer-list" />
      </aside>
    </>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

