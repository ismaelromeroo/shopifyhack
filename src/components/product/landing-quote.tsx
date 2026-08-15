"use client";

import { createContext, useContext, type ReactNode } from "react";
import { LiveTag } from "@/components/live-tag";
import {
  isLive,
  useProductQuote,
  type ProductQuotePayload,
} from "@/lib/product/use-quote";

export const LANDING_PROMO =
  "1-in-10 your order's free if the Yankees win the World Series";

const FROZEN = {
  asOf: "2026-08-15T18:58:30.900Z",
  ticker: "KXMLB-26-NYY",
  midPm: 1050,
  bidPm: 1030,
  askPm: 1070,
  plain: "the Yankees win the World Series",
  title: "Will New York Y win the 2026 Pro Baseball Championship?",
  premiumCents: 200_000,
  exchangeFeeCents: 12_600,
  managementFeeCents: 20_000,
  allInCents: 232_600,
  restingC100: 147_869_456,
  feasible: true,
};

export interface LandingQuote {
  live: boolean;
  tick: number;
  receivedAt: number | null;
  asOf: string;
  ticker: string;
  midPm: number;
  bidPm: number | null;
  askPm: number | null;
  plain: string;
  title: string;
  premiumCents: number;
  exchangeFeeCents: number;
  managementFeeCents: number;
  allInCents: number;
  restingC100: number;
  feasible: boolean;
  payload: ProductQuotePayload | null;
}

const Ctx = createContext<LandingQuote | null>(null);

export function LandingQuoteProvider({ children }: { children: ReactNode }) {
  const state = useProductQuote({
    promo: LANDING_PROMO,
    orders: 100,
    aov: 200,
  });
  const d = state.data;
  const q = d?.quote;
  const value: LandingQuote = {
    live: isLive(state),
    tick: state.tick,
    receivedAt: state.receivedAt,
    asOf: d?.market.asOf ?? FROZEN.asOf,
    ticker: d?.market.ticker ?? FROZEN.ticker,
    midPm: d?.market.midPm ?? FROZEN.midPm,
    bidPm: d?.market.bidPm ?? FROZEN.bidPm,
    askPm: d?.market.askPm ?? FROZEN.askPm,
    plain: d?.resolution?.plain ?? FROZEN.plain,
    title: d?.market.title ?? FROZEN.title,
    premiumCents: q?.premiumCents ?? FROZEN.premiumCents,
    exchangeFeeCents: q?.exchangeFeeCents ?? FROZEN.exchangeFeeCents,
    managementFeeCents: q?.managementFeeCents ?? FROZEN.managementFeeCents,
    allInCents: q?.allInCents ?? FROZEN.allInCents,
    restingC100: d?.book.totalAskC100 ?? FROZEN.restingC100,
    feasible: d?.feasibility.ok ?? FROZEN.feasible,
    payload: d,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLandingQuote(): LandingQuote {
  const v = useContext(Ctx);
  if (!v) throw new Error("useLandingQuote outside LandingQuoteProvider");
  return v;
}

export function LandingLiveTag() {
  const q = useLandingQuote();
  return (
    <LiveTag
      live={q.live}
      receivedAt={q.receivedAt}
      asOf={q.asOf}
      tick={q.tick}
    />
  );
}
