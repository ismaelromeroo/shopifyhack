import { NextRequest, NextResponse } from "next/server";
import { parsePm } from "@/lib/money";
import { resolvePromo } from "@/lib/resolve";
import { clampOrders, clampAovCents, priceTicker } from "@/lib/product/price";
import type { BookLevel } from "@/lib/money";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const promo = (sp.get("promo") ?? "").slice(0, 200);
  const directTicker = sp.get("ticker");
  const orders = clampOrders(Number(sp.get("orders") ?? 100));
  const aovCents = clampAovCents(Number(sp.get("aov") ?? 200) * 100);

  let ticker = directTicker;
  let resolution = null;
  if (!ticker) {
    resolution = resolvePromo(promo);
    if (!resolution) {
      return NextResponse.json({ ok: false, error: "unresolved" }, { status: 200 });
    }
    ticker = resolution.ticker;
  }

  const priced = await priceTicker(ticker, orders, aovCents);
  if (!priced) {
    return NextResponse.json({ ok: false, error: "market_unavailable" }, { status: 200 });
  }

  const { market, askLevels, bidLevels, live, asOf, bidPm, askPm } = priced;
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
      asks: askLevels.slice(0, 8),
      bids: bidLevels.slice(0, 8),
      totalAskC100: sum(askLevels),
      totalBidC100: sum(bidLevels),
    },
    quote: priced.quote,
    feasibility: priced.feasibility,
    view: priced.view,
    params: { orders, aovCents, orderValueCents: priced.orderValueCents },
  });
}
