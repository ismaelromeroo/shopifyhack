// Simulated pieces of the demo — order arrivals, hedge fills, claim lookups.
// Everything simulated is labelled as such in the UI chrome; market prices
// are never simulated.

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** approx normal via sum of uniforms */
export function normalish(rng: () => number, mean: number, sd: number) {
  const u = rng() + rng() + rng() + rng() - 2; // ~N(0,1)·0.577
  return mean + u * sd * 1.73;
}

export function orderAmountCents(rng: () => number, aovCents: number) {
  const raw = normalish(rng, aovCents, aovCents * 0.35);
  const clamped = Math.min(aovCents * 2.2, Math.max(aovCents * 0.35, raw));
  return Math.round(clamped / 100) * 100; // whole-dollar order totals
}

function hashId(id: string) {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export interface ClaimOrder {
  id: string;
  amountCents: number;
  items: number;
  placedAt: string; // display date
}

/** Deterministic simulated order for /claim/[id]. #1042 is the deck's $180 order. */
export function claimOrderFromId(id: string): ClaimOrder {
  if (id === "1042") {
    return { id, amountCents: 18_000, items: 2, placedAt: "Aug 15, 2026" };
  }
  const rng = mulberry32(hashId(id));
  const amount = Math.round((6_000 + rng() * 36_000) / 100) * 100;
  return {
    id,
    amountCents: amount,
    items: 1 + Math.floor(rng() * 4),
    placedAt: "Aug 15, 2026",
  };
}
