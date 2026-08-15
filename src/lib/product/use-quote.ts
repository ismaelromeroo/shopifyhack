"use client";
import { useEffect, useState } from "react";
import type { QuotePayload } from "@/lib/payload";
import type { QuoteView } from "./quote-view";

export type ProductQuotePayload = QuotePayload & { view: QuoteView };
export type ProductQuoteResponse =
  | ProductQuotePayload
  | { ok: false; error: "unresolved" | "market_unavailable" };

export interface QuoteQuery {
  promo?: string;
  ticker?: string;
  orders?: number;
  aov?: number;
}

export interface QuoteState {
  data: ProductQuotePayload | null;
  unresolved: boolean;
  failures: number;
  receivedAt: number | null;
  tick: number;
}

const POLL_MS = 10_000;

export function useProductQuote(query: QuoteQuery | null): QuoteState {
  const [state, setState] = useState<QuoteState>({
    data: null,
    unresolved: false,
    failures: 0,
    receivedAt: null,
    tick: 0,
  });

  let url: string | null = null;
  if (query) {
    const sp = new URLSearchParams();
    if (query.ticker) sp.set("ticker", query.ticker);
    if (query.promo) sp.set("promo", query.promo);
    if (query.orders != null) sp.set("orders", String(query.orders));
    if (query.aov != null) sp.set("aov", String(query.aov));
    url = `/api/product/quote?${sp}`;
  }

  useEffect(() => {
    if (!url) return;
    let stop = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let first = true;

    const poll = async () => {
      if (stop) return;
      if (first) {
        first = false;
        setState((s) => (s.unresolved ? { ...s, unresolved: false } : s));
      }
      try {
        const res = await fetch(url, { cache: "no-store" });
        const json = (await res.json()) as ProductQuoteResponse;
        if (stop) return;
        if (json.ok) {
          setState((s) => ({
            data: json,
            unresolved: false,
            failures: 0,
            receivedAt: Date.now(),
            tick: s.tick + 1,
          }));
        } else if (json.error === "unresolved") {
          setState((s) => ({ ...s, data: null, unresolved: true }));
          return;
        } else {
          setState((s) => ({ ...s, failures: s.failures + 1 }));
        }
      } catch {
        if (!stop) setState((s) => ({ ...s, failures: s.failures + 1 }));
      }
      if (!stop) timer = setTimeout(poll, POLL_MS);
    };

    poll();
    return () => {
      stop = true;
      if (timer) clearTimeout(timer);
    };
  }, [url]);

  return state;
}

export function isLive(s: QuoteState) {
  return !!s.data && s.data.market.live && s.failures < 2;
}
