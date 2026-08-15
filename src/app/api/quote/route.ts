import { NextRequest, NextResponse } from "next/server";
import { resolvePromo } from "@/lib/resolve";
import { getMarketData } from "@/lib/kalshi";
import {
  walkBook,
  buildQuote,
  assessFeasibility,
  parsePm,
  MAX_SPREAD_PM,
  type BookLevel,
} from "@/lib/money";

export const dynamic = "force-dynamic";

const clamp = (n: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, Math.round(n)));

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const promo = (sp.get("promo") ?? "").slice(0, 200);
  const directTicker = sp.get("ticker");
  const orders = clamp(Number(sp.get("orders") ?? 100) || 100, 1, 50_000);
  const aovCents = clamp(Number(sp.get("aov") ?? 200) * 100 || 20_000, 100, 5_000_00);

  let ticker = directTicker;
  let resolution = null;
  if (!ticker) {
    resolution = resolvePromo(promo);
    if (!resolution) {
      return NextResponse.json({ ok: false, error: "unresolved" }, { status: 200 });
    }
    ticker = resolution.ticker;
  }

  const data = await getMarketData(ticker);
  if (!data) {
    return NextResponse.json({ ok: false, error: "market_unavailable" }, { status: 200 });
  }

  const { market, askLevels, bidLevels, live, asOf } = data;
  const orderValueCents = orders * aovCents;
  // $1 payout per contract → contracts needed = liability in dollars,
  // so contract-hundredths = liability in cents.
  const neededC100 = orderValueCents;
  // never fill more than 3¢ past the touch — beyond that the promo economics
  // are dead anyway, so shortfall is the honest verdict
  const bandLevels = askLevels.filter(
    (l) => askLevels.length > 0 && l.pm - askLevels[0].pm <= MAX_SPREAD_PM
  );
  const walk = walkBook(bandLevels, neededC100);
  const quote = buildQuote(walk, orderValueCents);

  const bidPm = market.yes_bid_dollars ? parsePm(market.yes_bid_dollars) : null;
  const askPm = market.yes_ask_dollars ? parsePm(market.yes_ask_dollars) : null;
  const feasibility = assessFeasibility(bidPm, askPm, askLevels, walk, neededC100);

  const topAsks = askLevels.slice(0, 8);
  const topBids = bidLevels.slice(0, 8);
  const sum = (ls: BookLevel[]) => ls.reduce((a, l) => a + l.c100, 0);

  return NextResponse.json({
    ok: true,
    resolution,
    market: {
      ticker: market.ticker,
      title: market.title,
      subTitle: market.yes_sub_title ?? null,
      rules: market.rules_primary ?? null,
      closeTime: market.close_time ?? null,
      bidPm,
      askPm,
      midPm: bidPm != null && askPm != null ? Math.round((bidPm + askPm) / 2) : (askPm ?? bidPm),
      lastPm: market.last_price_dollars ? parsePm(market.last_price_dollars) : null,
      volume: market.volume_fp ? Math.round(parseFloat(market.volume_fp)) : null,
      live,
      asOf,
    },
    book: {
      asks: topAsks,
      bids: topBids,
      totalAskC100: sum(askLevels),
      totalBidC100: sum(bidLevels),
    },
    quote,
    feasibility,
    params: { orders, aovCents, orderValueCents },
  });
}
