import { useCallback, useEffect, useMemo, useState } from "react";
import { CSS_CONTENT } from "../../../src/pages/css.js";
import { fetchAggregate } from "../lib/api.js";

const LIMIT_OPTIONS = [10, 15, 20];

export function AggregatePage() {
  const initial = useMemo(() => new URLSearchParams(window.location.search), []);
  const [start, setStart] = useState(initial.get("start") || "");
  const [end, setEnd] = useState(initial.get("end") || "");
  const [limit, setLimit] = useState(initial.get("limit") || "10");
  const [metric, setMetric] = useState("percentile");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (nextStart, nextEnd, nextLimit) => {
    setLoading(true);
    setError(null);
    try {
      const nextData = await fetchAggregate({ start: nextStart, end: nextEnd, limit: nextLimit });
      setData(nextData);
      if (!nextStart) setStart(nextData.range.start);
      if (!nextEnd) setEnd(nextData.range.end);
      setLimit(String(nextData.limit));

      const params = new URLSearchParams();
      params.set("start", nextData.range.start);
      params.set("end", nextData.range.end);
      params.set("limit", String(nextData.limit));
      window.history.replaceState(null, "", "/aggregate?" + params.toString());
    } catch (nextError) {
      setError(nextError);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(start, end, limit);
    // 仅挂载时按 URL 参数加载一次
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.body.dataset.loading = loading ? "true" : "false";
    return () => {
      delete document.body.dataset.loading;
    };
  }, [loading]);

  const mdParams = new URLSearchParams();
  if (data) {
    mdParams.set("start", data.range.start);
    mdParams.set("end", data.range.end);
    mdParams.set("limit", String(data.limit));
  }
  const mdHref = "/aggregate.md?" + mdParams.toString();
  const lists = data ? pickLists(data, metric) : null;

  return (
    <>
      <style>{CSS_CONTENT}</style>
      <main className="page aggregate-page">
        <section className="hero">
          <article className="panel hero-copy">
            <div className="eyebrow">Concept Flow / Range Aggregate</div>
            <h1>
              一段时间里，
              <br />
              资金到底在往哪搬。
            </h1>
            <p className="lead">
              按区间汇总每个交易日的收盘资金快照，用当日横截面分位数消除概念规模差异，
              再对比前后半段找出资金真正的迁移方向。
            </p>
            <p className="lead" style={{ marginTop: 14 }}>
              <a className="nav-link" href="/">← 回到日内回放</a>
              <a className="nav-link aggregate-md-link" href={mdHref}>Markdown 输出 →</a>
            </p>
          </article>

          <article className="panel hero-side">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="metric-label">统计区间</div>
                <div className="metric-value aggregate-range" id="m-range">
                  {data ? `${data.range.start} → ${data.range.end}` : "--"}
                </div>
              </div>
              <button
                type="button"
                aria-label="切换明暗主题"
                data-tooltip="切换主题"
                data-side="bottom"
                onClick={() => document.dispatchEvent(new CustomEvent("basecoat:theme"))}
                className="btn-icon-outline size-8"
              >
                <span className="hidden dark:block"><SunIcon /></span>
                <span className="block dark:hidden"><MoonIcon /></span>
              </button>
            </div>
            <p className="aggregate-note" style={{ marginTop: 14 }} id="m-excluded">
              {data
                ? data.excludedDates.length
                  ? `已剔除 ${data.excludedDates.length} 个采集中断日：${data.excludedDates.join("、")}`
                  : "区间内所有交易日均取到有效收盘快照。"
                : "正在读取区间数据..."}
            </p>
          </article>
        </section>

        <section className="panel aggregate-controls">
          <div className="aggregate-control-field">
            <span className="metric-label">开始日期</span>
            <input type="date" className="input" value={start} onChange={(e) => setStart(e.target.value)} />
          </div>
          <div className="aggregate-control-field">
            <span className="metric-label">结束日期</span>
            <input type="date" className="input" value={end} onChange={(e) => setEnd(e.target.value)} />
          </div>
          <div className="aggregate-control-field">
            <span className="metric-label">榜单条数</span>
            <select className="input" value={limit} onChange={(e) => setLimit(e.target.value)}>
              {LIMIT_OPTIONS.map((value) => (
                <option key={value} value={String(value)}>前后各 {value}</option>
              ))}
            </select>
          </div>
          <div className="aggregate-control-field">
            <span className="metric-label">排序口径</span>
            <select className="input" value={metric} onChange={(e) => setMetric(e.target.value)}>
              <option value="percentile">资金分位（推荐）</option>
              <option value="netflow">累计净额</option>
              <option value="change">区间涨跌幅</option>
            </select>
          </div>
          <div className="aggregate-control-field">
            <span className="metric-label">&nbsp;</span>
            <button type="button" className="btn" onClick={() => load(start, end, limit)}>应用</button>
          </div>
        </section>

        <section className="metric-grid">
          <article className="panel">
            <div className="metric-label">交易日</div>
            <div className="metric-value">{data ? `${data.tradingDays} 天` : "--"}</div>
          </article>
          <article className="panel">
            <div className="metric-label">概念数</div>
            <div className="metric-value">{data ? data.conceptCount : "--"}</div>
          </article>
          <article className="panel">
            <div className="metric-label">区间最强</div>
            <div className="metric-value aggregate-name">{data?.favored?.[0]?.name || "--"}</div>
          </article>
          <article className="panel">
            <div className="metric-label">区间最弱</div>
            <div className="metric-value aggregate-name">{data?.abandoned?.[0]?.name || "--"}</div>
          </article>
        </section>

        {error && (
          <section className="panel aggregate-error">
            {error.message}
          </section>
        )}

        {data && (
          <>
            <BoardPair
              topTitle={lists.topTitle}
              bottomTitle={lists.bottomTitle}
              topNote={lists.topNote}
              bottomNote={lists.bottomNote}
              topRows={lists.top}
              bottomRows={lists.bottom}
            />

            <TrendBoardPair data={data} />

            <section className="panel">
              <div className="aggregate-board-title"><h2>口径说明</h2></div>
              <p className="aggregate-note">
                <strong>资金分位</strong>：每个交易日把当日已保存的概念按主力资金净额排序，取该概念所处位置
                （0 = 当日最差，100 = 当日最好），再对区间内所有交易日求平均。
                之所以不直接累加 <code>mainFundDiff</code>，是因为成分股多的概念绝对净额天然偏大，且全市场主力净额结构性为负，
                直接累加排出来的是“概念规模榜”而非资金偏好榜。<br />
                <strong>数据范围</strong>：本站每个快照只保存主力净额 Top10 + Bottom10 共 20 个信号概念，
                分位排名是在当日已保存概念集合内计算的相对位置，未上榜概念不参与排名。<br />
                <strong>区间涨跌幅</strong>：<code>change</code> 是<strong>单日</strong>盘中涨幅，每日归零重算，
                因此按复利连乘 <code>Π(1+change)-1</code> 计算，简单相加会明显夸大跌幅。<br />
                <strong>收盘口径</strong>：采集在 15:00 停止，每个交易日取最后一个快照作为收盘快照。
                若最后快照早于 14:55（采集中断），当日资金被低估，已从统计中剔除。<br />
                <strong>持续加仓 / 撤退</strong>：把区间等分为前后两段，对比同一概念的平均资金分位变化。
                月末的静态排名说明“钱停在哪”，而分位变化说明“钱在往哪走”。
              </p>
            </section>
          </>
        )}
      </main>
    </>
  );
}

/* ---- Boards ---- */

function BoardPair({ topTitle, bottomTitle, topNote, bottomNote, topRows, bottomRows }) {
  return (
    <section className="aggregate-board-grid">
      <article className="panel">
        <div className="aggregate-board-title"><h2>{topTitle}</h2></div>
        <p className="aggregate-note">{topNote}</p>
        <RankTable rows={topRows} />
      </article>
      <article className="panel">
        <div className="aggregate-board-title"><h2>{bottomTitle}</h2></div>
        <p className="aggregate-note">{bottomNote}</p>
        <RankTable rows={bottomRows} />
      </article>
    </section>
  );
}

function TrendBoardPair({ data }) {
  const trend = data.trend;
  const ready = Boolean(trend && trend.first);
  const label = ready
    ? `前段 ${trend.first.start}~${trend.first.end}（${trend.first.days}天）`
      + ` 对比 后段 ${trend.second.start}~${trend.second.end}（${trend.second.days}天）`
    : "区间过短，无法做前后段对比（至少需要 4 个交易日）。";

  return (
    <section className="aggregate-board-grid">
      <article className="panel">
        <div className="aggregate-board-title"><h2>资金持续加仓</h2></div>
        <p className="aggregate-note">后段资金分位显著抬升的概念。{label}</p>
        <TrendTable rows={ready ? trend.rising : []} />
      </article>
      <article className="panel">
        <div className="aggregate-board-title"><h2>资金持续撤退</h2></div>
        <p className="aggregate-note">后段资金分位显著回落的概念。{label}</p>
        <TrendTable rows={ready ? trend.falling : []} />
      </article>
    </section>
  );
}

function RankTable({ rows }) {
  if (!rows || !rows.length) return <div className="aggregate-empty">该区间暂无数据</div>;

  return (
    <table className="aggregate-table">
      <thead>
        <tr>
          <th>概念</th>
          <th>资金分位</th>
          <th className="aggregate-bar-cell"></th>
          <th>累计净额</th>
          <th>涨跌幅</th>
          <th>正流入</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          const pctWidth = Math.max(0, Math.min(100, row.percentile));
          return (
            <tr key={row.code || row.name}>
              <td>
                <span className="aggregate-rank">{index + 1}</span>
                <span className="aggregate-cname">{row.name}</span>
                {row.leaderStock && <span className="aggregate-cleader">{row.leaderStock}</span>}
              </td>
              <td>{row.percentile.toFixed(1)}</td>
              <td className="aggregate-bar-cell">
                <div className="aggregate-bar"><span style={{ width: `${pctWidth}%` }} /></div>
              </td>
              <td className={signClass(row.netFlow)}>{formatYi(row.netFlow)}</td>
              <td className={signClass(row.change)}>{formatPercent(row.change)}</td>
              <td className="muted">{row.positiveDays}/{row.days}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function TrendTable({ rows }) {
  if (!rows || !rows.length) return <div className="aggregate-empty">该区间暂无数据</div>;

  return (
    <table className="aggregate-table">
      <thead>
        <tr>
          <th>概念</th>
          <th>分位变化</th>
          <th>前段</th>
          <th>后段</th>
          <th>涨跌幅</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={row.code || row.name}>
            <td>
              <span className="aggregate-rank">{index + 1}</span>
              <span className="aggregate-cname">{row.name}</span>
            </td>
            <td className={row.delta > 0 ? "up" : "down"}>
              {row.delta > 0 ? "+" : ""}{row.delta.toFixed(1)}
            </td>
            <td className="muted">{row.firstHalf.toFixed(1)}</td>
            <td>{row.secondHalf.toFixed(1)}</td>
            <td className={signClass(row.change)}>{formatPercent(row.change)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ---- Helpers ---- */

function pickLists(data, metric) {
  if (metric === "netflow") {
    return {
      top: data.topNetFlow,
      bottom: data.bottomNetFlow,
      topTitle: `净流入 TOP${data.limit}`,
      bottomTitle: `净流出 BOTTOM${data.limit}`,
      topNote: "按区间累计主力资金净额排序。注意该口径受概念规模影响，成分股越多绝对值越大。",
      bottomNote: "按区间累计主力资金净额倒序。绝对值大的多为大型概念，不代表相对弱势。",
    };
  }
  if (metric === "change") {
    return {
      top: data.topChange,
      bottom: data.bottomChange,
      topTitle: `区间涨幅 TOP${data.limit}`,
      bottomTitle: `区间跌幅 BOTTOM${data.limit}`,
      topNote: "按日涨幅复利连乘计算的区间收益，与资金口径互相独立，可用于交叉验证。",
      bottomNote: "按日涨幅复利连乘计算的区间收益。价格跌但资金分位高，属于背离信号。",
    };
  }
  return {
    top: data.favored,
    bottom: data.abandoned,
    topTitle: `资金最青睐 TOP${data.limit}`,
    bottomTitle: `资金最抛弃 BOTTOM${data.limit}`,
    topNote: "按日均横截面分位数排序，已消除概念规模影响。分位越高代表几乎每天都比同批信号概念强。",
    bottomNote: "日均分位最低的概念，代表在区间内被资金持续冷落。",
  };
}

function formatYi(value) {
  if (!Number.isFinite(value)) return "--";
  const yi = value / 1e8;
  if (Math.abs(yi) >= 1000) return yi.toFixed(0) + "亿";
  return yi.toFixed(1) + "亿";
}

function formatPercent(value) {
  if (!Number.isFinite(value)) return "--";
  return (value * 100).toFixed(1) + "%";
}

function signClass(value) {
  if (!Number.isFinite(value) || value === 0) return "muted";
  return value > 0 ? "up" : "down";
}

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}
