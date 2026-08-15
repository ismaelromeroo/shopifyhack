import { NextRequest, NextResponse } from "next/server";
import { listMarkets, getBook } from "@/lib/kalshi";
import { walkBook, buildQuote, assessFeasibility, parsePm, MAX_SPREAD_PM } from "@/lib/money";
import { MLB_TEAMS } from "@/lib/teams";
import type { MarketCandidate } from "@/lib/payload";

export const dynamic = "force-dynamic";

// The demo merchant is a New York storefront — local teams pin to the top.
const LOCAL_CODES = ["NYY", "NYM"];
const REMOTE_COUNT = 4; // deepest non-local World Series books

const clamp = (n: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, Math.round(n)));

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const orders = clamp(Number(sp.get("orders") ?? 100) || 100, 1, 50_000);
  const aovCents = clamp(Number(sp.get("aov") ?? 200) * 100 || 20_000, 100, 5_000_00);
  const neededC100 = orders * aovCents; // $1/contract ⇒ c100 = liability in cents

  const [ws, playoffs] = await Promise.all([listMarkets("KXMLB"), listMarkets("KXMLBPLAYOFFS")]);

  type Pick = { ticker: string; code: string; trigger: "world_series" | "playoffs"; volume: number };
  const picks: Pick[] = [];
  const vol = (m: { volume_fp?: string | null }) => parseFloat(m.volume_fp ?? "0") || 0;

  // local candidates: both triggers for each NY team
  for (const code of LOCAL_CODES) {
    const w = ws.markets.find((m) => m.ticker.endsWith(`-${code}`));
    const p = playoffs.markets.find((m) => m.ticker.endsWith(`-${code}`));
    if (w) picks.push({ ticker: w.ticker, code, trigger: "world_series", volume: vol(w) });
    if (p) picks.push({ ticker: p.ticker, code, trigger: "playoffs", volume: vol(p) });
  }
  // elsewhere: the most-traded World Series books
  const remote = ws.markets
    .filter((m) => !LOCAL_CODES.some((c) => m.ticker.endsWith(`-${c}`)))
    .sort((a, b) => vol(b) - vol(a))
    .slice(0, REMOTE_COUNT);
  for (const m of remote) {
    const code = m.ticker.split("-").pop() ?? "";
    picks.push({ ticker: m.ticker, code, trigger: "world_series", volume: vol(m) });
  }

  const byTicker = new Map([...ws.markets, ...playoffs.markets].map((m) => [m.ticker, m]));

  const candidates: MarketCandidate[] = (
    await Promise.all(
      picks.map(async (p): Promise<MarketCandidate | null> => {
        const team = MLB_TEAMS.find((t) => t.code === p.code);
        const row = byTicker.get(p.ticker);
        if (!team || !row) return null;
        const book = await getBook(p.ticker);
        const band = book.askLevels.filter(
          (l) => book.askLevels.length > 0 && l.pm - book.askLevels[0].pm <= MAX_SPREAD_PM
        );
        const walk = walkBook(band, neededC100);
        const quote = buildQuote(walk, neededC100);
        const bidPm = row.yes_bid_dollars ? parsePm(row.yes_bid_dollars) : null;
        const askPm = row.yes_ask_dollars ? parsePm(row.yes_ask_dollars) : null;
        const f = assessFeasibility(bidPm, askPm, band, walk, neededC100);
        return {
          ticker: p.ticker,
          team: { code: team.code, city: team.city, nickname: team.nickname },
          trigger: p.trigger,
          label:
            p.trigger === "world_series"
              ? `the ${team.nickname} win the World Series`
              : `the ${team.nickname} make the playoffs`,
          sentence:
            p.trigger === "world_series"
              ? `Free if the ${team.nickname} win the World Series`
              : `Free if the ${team.nickname} make the playoffs`,
          local: LOCAL_CODES.includes(p.code),
          midPm: bidPm != null && askPm != null ? Math.round((bidPm + askPm) / 2) : (askPm ?? bidPm),
          askPm,
          spreadPm: f.spreadPm,
          depthC100: f.depthC100,
          canCover: f.ok,
          reason: f.reason,
          nearCertainty: f.nearCertainty,
          effectiveBps: f.ok ? quote.effectiveBps : null,
          live: book.live,
        };
      })
    )
  ).filter((c): c is MarketCandidate => c !== null);

  return NextResponse.json({
    ok: true,
    live: ws.live && candidates.every((c) => c.live),
    asOf: new Date().toISOString(),
    neededC100,
    candidates,
  });
}
