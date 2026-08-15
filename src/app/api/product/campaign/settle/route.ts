import { NextRequest, NextResponse } from "next/server";
import { settleCampaign } from "@/lib/product/campaign-store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as {
    id?: string;
    outcome?: "hit" | "miss";
  } | null;
  if (!body?.id || (body.outcome !== "hit" && body.outcome !== "miss")) {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  const result = settleCampaign(body.id, body.outcome);
  if ("error" in result) {
    const status = result.error === "not_found" ? 404 : 400;
    return NextResponse.json({ ok: false, error: result.error }, { status });
  }
  return NextResponse.json({ ok: true, campaign: result });
}
