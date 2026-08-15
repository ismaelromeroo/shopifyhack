import { NextRequest, NextResponse } from "next/server";
import { tickCampaign } from "@/lib/product/campaign-store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as { id?: string; n?: number } | null;
  if (!body?.id) return NextResponse.json({ ok: false, error: "missing_id" }, { status: 400 });
  const result = tickCampaign(body.id, body.n ?? 1);
  if ("error" in result) {
    const status = result.error === "not_found" ? 404 : 400;
    return NextResponse.json({ ok: false, error: result.error }, { status });
  }
  return NextResponse.json({ ok: true, campaign: result });
}
