export function Controls() {
  return (
    <section className="controls">
      <div className="control-field">
        <span className="control-label">交易日</span>
        <div id="date-combobox" className="select">
          <button type="button" className="btn" id="date-combobox-trigger" aria-haspopup="listbox" aria-expanded="false" aria-controls="date-combobox-listbox">
            <span className="truncate">选择交易日</span>
            <ChevronSortIcon />
          </button>
          <div id="date-combobox-popover" data-popover="" aria-hidden="true">
            <header>
              <SearchIcon />
              <input
                type="text"
                defaultValue=""
                placeholder="搜索交易日..."
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                aria-autocomplete="list"
                role="combobox"
                aria-expanded="false"
                aria-controls="date-combobox-listbox"
                aria-labelledby="date-combobox-trigger"
              />
            </header>
            <div role="listbox" id="date-combobox-listbox" aria-orientation="vertical" aria-labelledby="date-combobox-trigger" data-empty="暂无交易日数据" />
          </div>
          <input id="date-combobox-value" type="hidden" name="trade-date" value="" readOnly />
        </div>
      </div>

      <div className="panel" style={{ padding: "12px 14px" }}>
        <div className="metric-label">当前市场切片</div>
        <div id="current-time" className="metric-value" style={{ fontSize: 24 }}>--:--:--</div>
      </div>

      <div className="control-field">
        <span className="control-label">最新交易日</span>
        <button id="latest-btn" className="btn-secondary" type="button">跳到最新</button>
      </div>
    </section>
  );
}

function ChevronSortIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

