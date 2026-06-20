export const API_URL =
  "https://x-quote.cls.cn/web_quote/plate/plate_list?app=CailianpressWeb&os=web&page=1&rever=1&sv=8.4.6&type=concept&way=main_fund_diff&sign=2cfab3ce449fe7f69f25e951003ed082";

export const REVERSE_API_URL =
  "https://x-quote.cls.cn/web_quote/plate/plate_list?app=CailianpressWeb&os=web&page=1&rever=0&sv=8.4.6&type=concept&way=main_fund_diff&sign=4bb3a71eb50aaeff3c50f908503cda5a";

export const EMOTION_API_URL =
  "https://x-quote.cls.cn/v2/quote/a/stock/emotion?app=CailianpressWeb&os=web&sv=7.7.5&sign=bf0f367462d8cd70917ba5eab3853bce";

export const ANCHOR_API_URL =
  "https://www.cls.cn/v3/transaction/anchor?app=CailianpressWeb&os=web&sv=7.7.5&sign=b91a1183a5f82b33ab60e751f26b2825";

export const REQUEST_HEADERS = {
  "Cache-Control": "no-cache",
  "Content-Type": "application/x-www-form-urlencoded",
  Origin: "https://www.cls.cn",
  Pragma: "no-cache",
  Referer: "https://www.cls.cn/",
  "User-Agent": "Mozilla/5.0",
};

export const COLLECT_INTERVAL_MS = 20 * 1000;
export const DAILY_SAMPLE_LIMIT = 1500;
export const DAY_SAMPLE_CHUNK_SIZE = 100;
export const RETAIN_DAYS = 7;
export const API_SAMPLE_WINDOW = 180;
export const CHINA_TZ = "Asia/Shanghai";
export const MAX_FLOW_GROUP_SIZE = 10;
export const DEFAULT_FLOW_GROUP_SIZE = 10;
export const DISPLAY_CONCEPT_COUNT = DEFAULT_FLOW_GROUP_SIZE * 2;

export const SITE_NAME = "题材资金流回放";
export const SITE_TITLE = `A股概念资金流数据可视化 | ${SITE_NAME}`;
export const SITE_DESCRIPTION =
  "提供 A 股概念板块资金流数据可视化，聚焦主力资金净流入 Top 10 与净流出 Top 10，支持日内回放、盘面观察与复盘。";

export const API_NOINDEX_VALUE = "noindex, nofollow, noarchive";
export const PRIMARY_SITE_URL = "https://fin-flow.lingsbot.online";
export const PRIMARY_SITE_ORIGIN = new URL(PRIMARY_SITE_URL).origin;
