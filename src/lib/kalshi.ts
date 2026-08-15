// Server-side Kalshi read client. Public API, no auth. A short-TTL cache
// dedupes polling across clients; the checked-in snapshot is the fallback
// so the demo degrades to a labelled snapshot instead of an error.
import snapshotJson from "./snapshot.json";
import { parsePm, parseC100, type BookLevel } from "./money";

const BASE = "https://api.elections.kalshi.com/trade-api/v2";
const TTL_MS = 5_000;

export interface KalshiMarket {
  ticker: string;
  title: string;
  yes_sub_title?: string;
  rules_primary?: string;
  close_time?: string;
  yes_bid_dollars?: string | null;
  yes_ask_dollars?: string | null;
  last_price_dollars?: string | null;
  volume_fp?: string | null;
  open_interest_fp?: string | null;
}

interface RawBook {
  orderbook_fp?: {
    yes_dollars?: [string, string][] | null;
    no_dollars?: [string, string][] | null;
  };
}

interface Snapshot {
  capturedAt: string;
  markets: Record<string, KalshiMarket>;
  orderbooks: Record<string, RawBook>;
}
const snapshot = snapshotJson as unknown as Snapshot;

const cache = new Map<string, { at: number; data: unknown }>();

async function getJson<T>(path: string): Promise<T> {
  const hit = cache.get(path);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.data as T;
  const res = await fetch(`${BASE}${path}`, {
    cache: "no-store",
    signal: AbortSignal.timeout(6_000),
  });
  if (!res.ok) throw new Error(`kalshi ${path} -> ${res.status}`);
  const data = (await res.json()) as T;
  cache.set(path, { at: Date.now(), data });
  return data;
}

export interface MarketData {
  live: boolean;
  asOf: string; // when this data was fetched (or snapshot capture time)
  market: KalshiMarket;
  /** YES ask ladder (from resting NO bids), best first */
  askLevels: BookLevel[];
  /** YES bid ladder, best first */
  bidLevels: BookLevel[];
}

function toLadders(book: RawBook): { askLevels: BookLevel[]; bidLevels: BookLevel[] } {
  const no = book.orderbook_fp?.no_dollars ?? [];
  const yes = book.orderbook_fp?.yes_dollars ?? [];
  // Buying YES crosses resting NO bids: fill price = 1 − NO price, best = highest NO bid.
  const askLevels = no
    .map(([p, s]) => ({ pm: 10_000 - parsePm(p), c100: parseC100(s) }))
    .sort((a, b) => a.pm - b.pm);
  const bidLevels = yes
    .map(([p, s]) => ({ pm: parsePm(p), c100: parseC100(s) }))
    .sort((a, b) => b.pm - a.pm);
  return { askLevels, bidLevels };
}

/** List a series' open markets (cached; snapshot fallback). */
export async function listMarkets(
  seriesTicker: string
): Promise<{ live: boolean; markets: KalshiMarket[] }> {
  try {
    const d = await getJson<{ markets: KalshiMarket[] }>(
      `/markets?series_ticker=${seriesTicker}&status=open&limit=100`
    );
    return { live: true, markets: d.markets ?? [] };
  } catch {
    return {
      live: false,
      markets: Object.values(snapshot.markets).filter((m) =>
        m.ticker.startsWith(`${seriesTicker}-`)
      ),
    };
  }
}

/** Order book only — for menu candidates, where the list row covers the rest. */
export async function getBook(
  ticker: string
): Promise<{ live: boolean; askLevels: BookLevel[]; bidLevels: BookLevel[] }> {
  try {
    const b = await getJson<RawBook>(`/markets/${ticker}/orderbook?depth=100`);
    return { live: true, ...toLadders(b) };
  } catch {
    return { live: false, ...toLadders(snapshot.orderbooks[ticker] ?? {}) };
  }
}

export async function getMarketData(ticker: string): Promise<MarketData | null> {
  try {
    const [m, b] = await Promise.all([
      getJson<{ market: KalshiMarket }>(`/markets/${ticker}`),
      getJson<RawBook>(`/markets/${ticker}/orderbook?depth=100`),
    ]);
    return { live: true, asOf: new Date().toISOString(), market: m.market, ...toLadders(b) };
  } catch {
    const market = snapshot.markets[ticker];
    const book = snapshot.orderbooks[ticker];
    if (!market) return null;
    return {
      live: false,
      asOf: snapshot.capturedAt,
      market,
      ...toLadders(book ?? {}),
    };
  }
}
