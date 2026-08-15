"use client";
import { createContext, useContext } from "react";
import { useQuote, isLive } from "@/lib/use-quote";
import type { QuotePayload } from "@/lib/payload";

/**
 * The deck's one Kalshi poller (build note: slides 8 and 17 share it).
 * It runs the real product path — the plain-English promo resolves to the
 * live Yankees–World-Series market through /api/quote — so slide 13's
 * console shows genuine resolution, book and quote numbers.
 *
 * Frozen fallbacks are the checked-in snapshot's values (2026-08-15);
 * whenever they are in use, `live` is false and the tag says "snapshot".
 */
export const DECK_PROMO =
  "1-in-10 your order's free if the Yankees win the World Series";

const FROZEN = {
  asOf: "2026-08-15T18:58:30.900Z",
  ticker: "KXMLB-26-NYY",
  midPm: 1050, // 10.5¢
  bidPm: 1030,
  askPm: 1070,
  plain: "the Yankees win the World Series",
};

export interface DeckQuote {
  live: boolean;
  tick: number;
  receivedAt: number | null;
  asOf: string;
  ticker: string;
  midPm: number;
  bidPm: number | null;
  askPm: number | null;
  /** plain-language trigger, e.g. "the Yankees win the World Series" */
  plain: string;
  payload: QuotePayload | null;
}

const Ctx = createContext<DeckQuote | null>(null);

export function DeckQuoteProvider({ children }: { children: React.ReactNode }) {
  const state = useQuote({ promo: DECK_PROMO, orders: 100, aov: 200 });
  const d = state.data;
  const value: DeckQuote = {
    live: isLive(state),
    tick: state.tick,
    receivedAt: state.receivedAt,
    asOf: d?.market.asOf ?? FROZEN.asOf,
    ticker: d?.market.ticker ?? FROZEN.ticker,
    midPm: d?.market.midPm ?? FROZEN.midPm,
    bidPm: d?.market.bidPm ?? FROZEN.bidPm,
    askPm: d?.market.askPm ?? FROZEN.askPm,
    plain: d?.resolution?.plain ?? FROZEN.plain,
    payload: d,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDeckQuote(): DeckQuote {
  const v = useContext(Ctx);
  if (!v) throw new Error("useDeckQuote outside DeckQuoteProvider");
  return v;
}
