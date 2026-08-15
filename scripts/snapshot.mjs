// Captures a point-in-time Kalshi snapshot used as the offline fallback.
// Run: node scripts/snapshot.mjs
import { writeFileSync } from "node:fs";

const BASE = "https://api.elections.kalshi.com/trade-api/v2";

async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`${path} -> ${res.status}`);
  return res.json();
}

const [ws, playoffs, wsNyyBook, poNyyBook, wsNyy, poNyy] = await Promise.all([
  get("/markets?series_ticker=KXMLB&status=open&limit=100"),
  get("/markets?series_ticker=KXMLBPLAYOFFS&status=open&limit=100"),
  get("/markets/KXMLB-26-NYY/orderbook?depth=100"),
  get("/markets/KXMLBPLAYOFFS-26-NYY/orderbook?depth=100"),
  get("/markets/KXMLB-26-NYY"),
  get("/markets/KXMLBPLAYOFFS-26-NYY"),
]);

const snapshot = {
  capturedAt: new Date().toISOString(),
  markets: Object.fromEntries(
    [...ws.markets, ...playoffs.markets, wsNyy.market, poNyy.market]
      .filter(Boolean)
      .map((m) => [m.ticker, m])
  ),
  orderbooks: {
    "KXMLB-26-NYY": wsNyyBook,
    "KXMLBPLAYOFFS-26-NYY": poNyyBook,
  },
};

writeFileSync(
  new URL("../src/lib/snapshot.json", import.meta.url),
  JSON.stringify(snapshot, null, 1)
);
console.log(
  `snapshot captured ${snapshot.capturedAt}: ${Object.keys(snapshot.markets).length} markets, ${Object.keys(snapshot.orderbooks).length} books`
);
