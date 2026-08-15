import { NextRequest, NextResponse } from "next/server";
import { clampOrders, clampAovCents, priceTicker } from "@/lib/product/price";
import { createCampaign, getCampaign } from "@/lib/product/campaign-store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "missing_id" }, { status: 400 });
  const c = getCampaign(id);
  if (!c) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  return NextResponse.json({ ok: true, campaign: c });
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as {
    ticker?: string;
    sentence?: string;
    orders?: number;
    aov?: number;
  } | null;
  if (!body?.ticker) {
    return NextResponse.json({ ok: false, error: "missing_ticker" }, { status: 400 });
  }
  const orders = clampOrders(body.orders ?? 100);
  const aovCents = clampAovCents((body.aov ?? 200) * 100);
  const priced = await priceTicker(body.ticker, orders, aovCents);
  if (!priced) {
    return NextResponse.json({ ok: false, error: "market_unavailable" }, { status: 200 });
  }
  if (!priced.feasibility.ok) {
    return NextResponse.json(
      { ok: false, error: "refused", reason: priced.feasibility.reason, feasibility: priced.feasibility },
      { status: 400 }
    );
  }
  const campaign = createCampaign({
    ticker: priced.market.ticker,
    sentence: body.sentence?.slice(0, 200) || `Free if ${priced.market.title}`,
    rules: priced.market.rules_primary ?? null,
    ordersTarget: orders,
    aovCents,
    quote: priced.quote,
    feasibility: priced.feasibility,
    view: priced.view,
  });
  return NextResponse.json({ ok: true, campaign });
}
