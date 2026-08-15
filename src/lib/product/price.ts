import { getMarketData, type KalshiMarket } from "@/lib/kalshi";
import {
  walkBook,
  buildQuote,
  assessFeasibility,
  parsePm,
  MAX_SPREAD_PM,
  type Quote,
  type Feasibility,
  type WalkResult,
  type BookLevel,
} from "@/lib/money";
import { quoteView, type QuoteView } from "./quote-view";

export function clampOrders(n: number) {
  const v = Math.round(Number(n) || 100);
  return Math.min(50_000, Math.max(1, v));
}

export function clampAovCents(n: number) {
  const v = Math.round(Number(n) || 20_000);
  return Math.min(500_000, Math.max(100, v));
}

export interface PricedBook {
  walk: WalkResult;
  quote: Quote;
  feasibility: Feasibility;
  neededC100: number;
  orderValueCents: number;
  view: QuoteView;
}

export function priceWalk(
  askLevels: BookLevel[],
  bidPm: number | null,
  askPm: number | null,
  orders: number,
  aovCents: number
): PricedBook {
  const orderValueCents = orders * aovCents;
  const neededC100 = orderValueCents;
  const bandLevels = askLevels.filter(
    (l) => askLevels.length > 0 && l.pm - askLevels[0].pm <= MAX_SPREAD_PM
  );
  const walk = walkBook(bandLevels, neededC100);
  const quote = buildQuote(walk, orderValueCents);
  const feasibility = assessFeasibility(bidPm, askPm, askLevels, walk, neededC100);
  return {
    walk,
    quote,
    feasibility,
    neededC100,
    orderValueCents,
    view: quoteView(quote),
  };
}

export interface PricedMarket extends PricedBook {
  market: KalshiMarket;
  askLevels: BookLevel[];
  bidLevels: BookLevel[];
  live: boolean;
  asOf: string;
  bidPm: number | null;
  askPm: number | null;
}

export async function priceTicker(
  ticker: string,
  orders: number,
  aovCents: number
): Promise<PricedMarket | null> {
  const data = await getMarketData(ticker);
  if (!data) return null;
  const bidPm = data.market.yes_bid_dollars ? parsePm(data.market.yes_bid_dollars) : null;
  const askPm = data.market.yes_ask_dollars ? parsePm(data.market.yes_ask_dollars) : null;
  const priced = priceWalk(data.askLevels, bidPm, askPm, orders, aovCents);
  return {
    ...priced,
    market: data.market,
    askLevels: data.askLevels,
    bidLevels: data.bidLevels,
    live: data.live,
    asOf: data.asOf,
    bidPm,
    askPm,
  };
}
