"use client";
import { useEffect, useState } from "react";
import type { QuotePayload, QuoteResponse } from "./payload";

export interface QuoteQuery {
  promo?: string;
  ticker?: string;
  orders?: number;
  aov?: number; // dollars
}

export interface QuoteState {
  data: QuotePayload | null;
  /** promo text didn't resolve to a market */
  unresolved: boolean;
  /** consecutive fetch failures — after 2, treat as disconnected */
  failures: number;
  receivedAt: number | null;
  /** increments on every successful poll — drives pulse animations */
  tick: number;
}

const POLL_MS = 10_000;

export function useQuote(query: QuoteQuery | null): QuoteState {
  const [state, setState] = useState<QuoteState>({
    data: null,
    unresolved: false,
    failures: 0,
    receivedAt: null,
    tick: 0,
  });

  // the url IS the identity of the poll — deriving it keeps the effect honest
  let url: string | null = null;
  if (query) {
    const sp = new URLSearchParams();
    if (query.ticker) sp.set("ticker", query.ticker);
    if (query.promo) sp.set("promo", query.promo);
    if (query.orders != null) sp.set("orders", String(query.orders));
    if (query.aov != null) sp.set("aov", String(query.aov));
    url = `/api/quote?${sp}`;
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
        const json = (await res.json()) as QuoteResponse;
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
          return; // don't keep polling a sentence that can't resolve
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

/** live means: the payload says live AND we haven't started failing polls */
export function isLive(s: QuoteState) {
  return !!s.data && s.data.market.live && s.failures < 2;
}
