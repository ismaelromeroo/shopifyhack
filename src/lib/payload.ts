import type { Quote, Feasibility, FeasibilityReason, BookLevel } from "./money";
import type { Resolution } from "./resolve";

export interface MarketPayload {
  ticker: string;
  title: string;
  subTitle: string | null;
  rules: string | null;
  closeTime: string | null;
  bidPm: number | null;
  askPm: number | null;
  midPm: number | null;
  lastPm: number | null;
  volume: number | null;
  live: boolean;
  asOf: string;
}

export interface QuotePayload {
  ok: true;
  resolution: Resolution | null;
  market: MarketPayload;
  book: {
    asks: BookLevel[];
    bids: BookLevel[];
    totalAskC100: number;
    totalBidC100: number;
  };
  quote: Quote;
  feasibility: Feasibility;
  params: { orders: number; aovCents: number; orderValueCents: number };
}

export interface QuoteError {
  ok: false;
  error: "unresolved" | "market_unavailable";
}

export type QuoteResponse = QuotePayload | QuoteError;

/** one row of the market picker — every number computed from a real book walk */
export interface MarketCandidate {
  ticker: string;
  team: { code: string; city: string; nickname: string };
  trigger: "world_series" | "playoffs";
  /** menu row text: "the Yankees win the World Series" */
  label: string;
  /** campaign sentence: "Free if the Yankees win the World Series" */
  sentence: string;
  local: boolean;
  midPm: number | null;
  askPm: number | null;
  spreadPm: number | null;
  depthC100: number;
  canCover: boolean;
  reason: FeasibilityReason;
  nearCertainty: boolean;
  /** all-in as basis points of order value — null when the book can't cover */
  effectiveBps: number | null;
  live: boolean;
}

export interface MarketsPayload {
  ok: true;
  live: boolean;
  asOf: string;
  neededC100: number;
  candidates: MarketCandidate[];
}
