// All market math runs in integer units so the fee formula reproduces
// Kalshi's published table to the cent. Floats appear only at display time.
//
//   price  → pm    permyriad of a dollar  (1/10,000 $ — "0.1070" → 1070)
//   size   → c100  hundredths of a contract ("3525.76" → 352576)
//   money  → µ$    micro-dollars (pm × c100 = µ$), or integer cents
//
// Kalshi taker fee (fee schedule, eff. Feb 5 2026):
//   fee = roundup( 0.07 × C × P × (1−P) )  to the cent, per order
// In integer units: fee¢ = ceil( 7 · c100 · pm · (10000 − pm) / 10^10 )

export function parsePm(dollars: string): number {
  const [whole = "0", frac = ""] = dollars.split(".");
  return parseInt(whole, 10) * 10_000 + parseInt(frac.padEnd(4, "0").slice(0, 4) || "0", 10);
}

export function parseC100(size: string): number {
  const [whole = "0", frac = ""] = size.split(".");
  return parseInt(whole, 10) * 100 + parseInt(frac.padEnd(2, "0").slice(0, 2) || "0", 10);
}

function ceilDivBig(a: bigint, b: bigint): bigint {
  return (a + b - 1n) / b;
}

/** Kalshi taker fee in integer cents for a clip of c100 at price pm. */
export function kalshiFeeCents(c100: number, pm: number): number {
  const fee = ceilDivBig(
    7n * BigInt(c100) * BigInt(pm) * BigInt(10_000 - pm),
    10_000_000_000n
  );
  return Number(fee);
}

export interface BookLevel {
  pm: number; // fill price for a YES buyer at this level
  c100: number; // size available
}

export interface WalkResult {
  filledC100: number;
  shortfallC100: number;
  premiumMicro: number; // Σ pm·c100 across fills, µ$
  feeCents: number; // Σ per-level roundup fee
  avgPm: number; // volume-weighted average fill, pm (rounded)
  bestAskPm: number | null;
  worstFillPm: number | null;
  levelsUsed: number;
  fills: { pm: number; c100: number }[];
}

/**
 * Walk the YES ask side (derived from resting NO bids) to buy `needC100`.
 * `levels` must be sorted best (lowest pm) first.
 * The fee is computed per level clip — each price level is one batched order,
 * per the roundup-on-the-whole-order rule.
 */
export function walkBook(levels: BookLevel[], needC100: number): WalkResult {
  let remaining = needC100;
  let premiumMicro = 0;
  let feeCents = 0;
  const fills: { pm: number; c100: number }[] = [];
  for (const lvl of levels) {
    if (remaining <= 0) break;
    const take = Math.min(lvl.c100, remaining);
    premiumMicro += lvl.pm * take;
    feeCents += kalshiFeeCents(take, lvl.pm);
    fills.push({ pm: lvl.pm, c100: take });
    remaining -= take;
  }
  const filled = needC100 - remaining;
  return {
    filledC100: filled,
    shortfallC100: remaining,
    premiumMicro,
    feeCents,
    avgPm: filled > 0 ? Math.round(premiumMicro / filled) : 0,
    bestAskPm: levels.length ? levels[0].pm : null,
    worstFillPm: fills.length ? fills[fills.length - 1].pm : null,
    levelsUsed: fills.length,
    fills,
  };
}

export const microToCents = (micro: number) => Math.round(micro / 10_000);

/** 10% management fee on the premium, rounded half-up to the cent. */
export function managementFeeCents(premiumMicro: number): number {
  return Math.round(premiumMicro / 10 / 10_000);
}

export interface Quote {
  liabilityCents: number; // = contracts needed × $1
  contractsC100: number;
  premiumCents: number;
  exchangeFeeCents: number;
  managementFeeCents: number;
  allInCents: number;
  /** all-in ÷ order value, in basis points — also the equivalent flat-sale
   * rate; display both at the same precision, they are the same quantity */
  effectiveBps: number;
  avgPm: number;
  bestAskPm: number | null;
  slippagePm: number; // avg − best ask
}

export function buildQuote(walk: WalkResult, orderValueCents: number): Quote {
  const premiumCents = microToCents(walk.premiumMicro);
  const mgmt = managementFeeCents(walk.premiumMicro);
  const allIn = premiumCents + walk.feeCents + mgmt;
  const effectiveBps = orderValueCents > 0 ? Math.round((allIn * 10_000) / orderValueCents) : 0;
  return {
    liabilityCents: orderValueCents,
    contractsC100: walk.filledC100,
    premiumCents,
    exchangeFeeCents: walk.feeCents,
    managementFeeCents: mgmt,
    allInCents: allIn,
    effectiveBps,
    avgPm: walk.avgPm,
    bestAskPm: walk.bestAskPm,
    slippagePm: walk.bestAskPm != null ? walk.avgPm - walk.bestAskPm : 0,
  };
}

export type FeasibilityReason =
  | "ok"
  | "no_quote"
  | "spread_too_wide"
  | "insufficient_depth"
  | "position_limit";

export interface Feasibility {
  ok: boolean;
  reason: FeasibilityReason;
  spreadPm: number | null;
  depthC100: number; // total resting on the ask side
  neededC100: number;
  costBasisCents: number; // premium + exchange fee — Kalshi's max-loss measure
  positionLimitCents: number;
  /** true when the trigger is so likely the promo is economically absurd */
  nearCertainty: boolean;
}

export const POSITION_LIMIT_CENTS = 2_500_000; // $25,000 max loss per market
export const MAX_SPREAD_PM = 300; // 3¢ — a 5¢ spread turns an 11% drag into 31%

export function assessFeasibility(
  bidPm: number | null,
  askPm: number | null,
  levels: BookLevel[],
  walk: WalkResult,
  neededC100: number
): Feasibility {
  // depth that matters: resting within 3¢ of the touch, not the far junk levels
  const best = levels.length ? levels[0].pm : null;
  const depthC100 =
    best == null
      ? 0
      : levels.reduce((a, l) => (l.pm - best <= MAX_SPREAD_PM ? a + l.c100 : a), 0);
  const costBasis = microToCents(walk.premiumMicro) + walk.feeCents;
  const spreadPm = bidPm != null && askPm != null ? askPm - bidPm : null;
  const nearCertainty = askPm != null && askPm >= 8_500;

  let reason: FeasibilityReason = "ok";
  if (bidPm == null || askPm == null) reason = "no_quote";
  else if (spreadPm != null && spreadPm > MAX_SPREAD_PM) reason = "spread_too_wide";
  else if (walk.shortfallC100 > 0) reason = "insufficient_depth";
  else if (costBasis > POSITION_LIMIT_CENTS) reason = "position_limit";

  return {
    ok: reason === "ok",
    reason,
    spreadPm,
    depthC100,
    neededC100,
    costBasisCents: costBasis,
    positionLimitCents: POSITION_LIMIT_CENTS,
    nearCertainty,
  };
}
