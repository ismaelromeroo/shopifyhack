import type { Quote } from "@/lib/money";

export const DEFAULT_MU = 0.45;

export interface QuoteView {
  flatDiscountBps: number;
  /** unit lift vs an equal-cost flat sale; Infinity if no lift can rescue it */
  requiredLift: number;
  mu: number;
}

/**
 * e = φ / (μ − p − φ) with p from the fill, φ = all-in rate minus p.
 * All-in already includes exchange drag and the 10% management fee.
 */
export function quoteView(quote: Quote, mu = DEFAULT_MU): QuoteView {
  const p = quote.avgPm / 10_000;
  const allIn = quote.effectiveBps / 10_000;
  const phi = allIn - p;
  const denom = mu - p - phi;
  return {
    flatDiscountBps: quote.effectiveBps,
    requiredLift: denom <= 0 ? Number.POSITIVE_INFINITY : phi / denom,
    mu,
  };
}
