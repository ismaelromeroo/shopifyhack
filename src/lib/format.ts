export const centsToDollars = (cents: number) => cents / 100;

export function fmtMoney(cents: number, opts?: { round?: boolean }) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: opts?.round ? 0 : 2,
    minimumFractionDigits: opts?.round ? 0 : 2,
  }).format(cents / 100);
}

export const fmtInt = (n: number) => new Intl.NumberFormat("en-US").format(Math.round(n));

/** contracts from contract-hundredths */
export const contracts = (c100: number) => Math.round(c100 / 100);

/** price in permyriad → display cents, e.g. 1070 → "10.7¢" */
export function pmToCentsLabel(pm: number) {
  const cents = pm / 100;
  const digits = Number.isInteger(cents) ? 0 : 1;
  return `${cents.toFixed(digits)}¢`;
}

/** price in permyriad → probability fraction for percent formatting */
export const pmToFraction = (pm: number) => pm / 10_000;

/** "a 1-in-9 shot" */
export function oneInLabel(pm: number) {
  if (pm <= 0) return null;
  const n = Math.round(10_000 / pm);
  return n >= 2 ? `a 1-in-${n} shot` : "better than even odds";
}

export function fmtClock(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
