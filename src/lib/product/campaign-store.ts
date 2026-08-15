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
  const c: Campaign = {
    ...input,
    id: id(),
    status: "live",
    liabilityCents: 0,
    coverageCents: 0,
    orderCount: 0,
    outcome: "pending",
    createdAt: new Date().toISOString(),
  };
  campaigns.set(c.id, c);
  return c;
}

export function getCampaign(cid: string): Campaign | undefined {
  return campaigns.get(cid);
}

/** Simulated next order: add one AOV of liability and cover it immediately. */
export function tickCampaign(cid: string): Campaign | { error: string } {
  const c = campaigns.get(cid);
  if (!c) return { error: "not_found" };
  if (c.status !== "live") return { error: "settled" };
  if (c.orderCount >= c.ordersTarget) return { error: "complete" };
  c.orderCount += 1;
  c.liabilityCents += c.aovCents;
  c.coverageCents = c.liabilityCents;
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
