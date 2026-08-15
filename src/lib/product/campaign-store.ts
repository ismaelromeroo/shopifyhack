import type { Quote, Feasibility } from "@/lib/money";
import type { QuoteView } from "./quote-view";

export interface Campaign {
  id: string;
  ticker: string;
  sentence: string;
  rules: string | null;
  ordersTarget: number;
  aovCents: number;
  status: "live" | "settled";
  quote: Quote;
  feasibility: Feasibility;
  view: QuoteView;
  liabilityCents: number;
  coverageCents: number;
  orderCount: number;
  outcome: "pending" | "hit" | "miss";
  createdAt: string;
}

const campaigns = new Map<string, Campaign>();

function id() {
  return globalThis.crypto?.randomUUID?.() ?? `c_${Date.now().toString(36)}`;
}

export function createCampaign(
  input: Omit<Campaign, "id" | "status" | "liabilityCents" | "coverageCents" | "orderCount" | "outcome" | "createdAt">
): Campaign {
  const liabilityCents = input.ordersTarget * input.aovCents;
  const c: Campaign = {
    ...input,
    id: id(),
    status: "live",
    liabilityCents,
    coverageCents: liabilityCents,
    orderCount: input.ordersTarget,
    outcome: "pending",
    createdAt: new Date().toISOString(),
  };
  campaigns.set(c.id, c);
  return c;
}

export function getCampaign(cid: string): Campaign | undefined {
  return campaigns.get(cid);
}

/** Simulated orders: fill remaining (or `n` of them). Default is the rest. */
export function tickCampaign(cid: string, n?: number): Campaign | { error: string } {
  const c = campaigns.get(cid);
  if (!c) return { error: "not_found" };
  if (c.status !== "live") return { error: "settled" };
  if (c.orderCount >= c.ordersTarget) return { error: "complete" };
  const left = c.ordersTarget - c.orderCount;
  const steps = Math.min(Math.max(1, n ?? left), left);
  for (let i = 0; i < steps; i++) {
    c.orderCount += 1;
    c.liabilityCents += c.aovCents;
    c.coverageCents = c.liabilityCents;
  }
  return c;
}

export function settleCampaign(cid: string, outcome: "hit" | "miss"): Campaign | { error: string } {
  const c = campaigns.get(cid);
  if (!c) return { error: "not_found" };
  if (c.status === "settled") return { error: "settled" };
  c.status = "settled";
  c.outcome = outcome;
  return c;
}
