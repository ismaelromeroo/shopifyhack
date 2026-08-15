"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  contracts,
  fmtInt,
  fmtMoney,
  oneInLabel,
  pmToCentsLabel,
} from "@/lib/format";
import type { MarketCandidate, MarketsPayload } from "@/lib/payload";
import { EASE, SlideLabel, useStages } from "./primitives";
import { useDeckQuote } from "./deck-quote";

/**
 * Slides 14 + 15 — the merchant console, one persistent panel.
 * The demo interaction is a MENU, not plaintext: a list of real events the
 * promo can ride on, each priced by walking its live book (via the product's
 * own /api/markets). A highlight browses the rows, lands on the Yankees–
 * World-Series row, and the market/book/quote flow follows. Rows that can't
 * cover the campaign say why — including the 97¢ playoffs market.
 */

const RUNNING_EXAMPLE = {
  premiumCents: 200_000,
  exchangeFeeCents: 12_600,
  managementFeeCents: 20_000,
  allInCents: 232_600,
};

/** menu order: selection target first, then the strongest supporting rows */
const ROW_PREFERENCE = [
  "KXMLB-26-NYY",
  "KXMLBPLAYOFFS-26-NYY",
  "KXMLB-26-LAD",
  "KXMLB-26-BOS",
];

/** offline stand-ins from the checked-in snapshot (2026-08-15) */
const FALLBACK_ROWS: MenuRow[] = [
  { ticker: "KXMLB-26-NYY", label: "the Yankees win the World Series", midPm: 1050, canCover: true, effectiveBps: 1263, depthC100: 147_869_456, reason: "ok" },
  { ticker: "KXMLBPLAYOFFS-26-NYY", label: "the Yankees make the playoffs", midPm: 9700, canCover: false, effectiveBps: null, depthC100: 140_209, reason: "insufficient_depth" },
  { ticker: "KXMLB-26-LAD", label: "the Dodgers win the World Series", midPm: 3625, canCover: true, effectiveBps: 4201, depthC100: 98_000_000, reason: "ok" },
  { ticker: "KXMLB-26-BOS", label: "the Red Sox win the World Series", midPm: 525, canCover: true, effectiveBps: 684, depthC100: 120_000_000, reason: "ok" },
];

interface MenuRow {
  ticker: string;
  label: string;
  midPm: number | null;
  canCover: boolean;
  effectiveBps: number | null;
  depthC100: number;
  reason: string;
}

function pickRows(candidates: MarketCandidate[]): MenuRow[] {
  const byTicker = new Map(candidates.map((c) => [c.ticker, c]));
  const preferred = ROW_PREFERENCE.map((t) => byTicker.get(t)).filter(
    (c): c is MarketCandidate => !!c
  );
  const rest = candidates.filter((c) => !ROW_PREFERENCE.includes(c.ticker));
  return [...preferred, ...rest].slice(0, 4);
}

function reasonLabel(reason: string): string {
  switch (reason) {
    case "insufficient_depth":
      return "book too thin for this size";
    case "spread_too_wide":
      return "spread too wide";
    case "position_limit":
      return "over position limit";
    default:
      return "no two-sided quote";
  }
}

function MenuRowView({
  row,
  highlighted,
  selected,
  dimmed,
}: {
  row: MenuRow;
  highlighted: boolean;
  selected: boolean;
  dimmed: boolean;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: dimmed ? 0.38 : 1 }}
      transition={{ duration: 0.35 }}
      className={`relative flex items-center justify-between gap-[2vmin] rounded-[0.7vmin] border px-[1.8vmin] py-[1.1vmin] ${
        selected ? "border-ink" : "border-ink/10"
      }`}
    >
      {highlighted && !selected && (
        <motion.div
          layoutId="menu-hl"
          transition={{ duration: 0.35, ease: EASE }}
          className="absolute inset-0 rounded-[0.7vmin] bg-g150"
        />
      )}
      <span className="relative flex min-w-0 items-center gap-[1.4vmin]">
        <span
          className={`h-[0.9vmin] w-[0.9vmin] shrink-0 rounded-full ${
            selected ? "bg-ink" : "border border-g400"
          }`}
        />
        <span className="min-w-0">
          <span
            className={`block truncate font-sans text-[2vmin] font-medium tracking-tight ${
              row.canCover ? "text-ink" : "text-g500"
            }`}
          >
            {row.label}
          </span>
          <span className="tnum block text-[1.6vmin] text-g500">
            {row.midPm != null
              ? `${pmToCentsLabel(row.midPm)} · ${oneInLabel(row.midPm) ?? ""}`
              : "no live quote"}
          </span>
        </span>
      </span>
      <span className="tnum relative shrink-0 text-right">
        {row.canCover && row.effectiveBps != null ? (
          <>
            <span className="block font-sans text-[1.9vmin] font-semibold">
              {(row.effectiveBps / 100).toFixed(1)}% all-in
            </span>
            <span className="block text-[1.5vmin] text-g500">
              {fmtInt(contracts(row.depthC100))} resting
            </span>
          </>
        ) : (
          <span className="block text-[1.6vmin] font-medium text-g500">
            {reasonLabel(row.reason)}
          </span>
        )}
      </span>
      {selected && (
        <span className="relative font-sans text-[1.9vmin] text-ink">✓</span>
      )}
    </motion.div>
  );
}

/**
 * As orders land, what the merchant owes steps up — and the coupons we hold
 * step up one beat behind, closing the gap at the end. Real dollar counters
 * tick alongside so the lines mean something: owed climbs to $20,000, and
 * "covered" is never allowed to fall more than one batch behind it.
 */
function OrdersChart({ running }: { running: boolean }) {
  const rm = useReducedMotion();
  const [rawStep, setRawStep] = useState(0);
  const STEPS = 20; // 5 orders per step, $1,000 of refund liability each
  useEffect(() => {
    if (!running || rm) return;
    const t = setInterval(() => {
      setRawStep((n) => {
        if (n >= STEPS) {
          clearInterval(t);
          return n;
        }
        return n + 1;
      });
    }, 210);
    return () => clearInterval(t);
  }, [running, rm]);
  // reduced motion: the finished chart, by derivation
  const step = rm && running ? STEPS : rawStep;

  const orders = step * 5;
  const owedDollars = orders * 200;
  const coveredDollars =
    step >= STEPS ? owedDollars : Math.max(0, (step - 1) * 5 * 200);
  const done = step >= STEPS;

  const W = 100;
  const H = 40;
  const x = (i: number) => (i / STEPS) * (W - 2) + 1;
  const y = (v: number) => H - 3 - (v / 20_000) * (H - 8);
  const owedAt = (i: number) => i * 1000;
  const coveredAt = (i: number) =>
    i >= STEPS ? 20_000 : Math.max(0, (i - 1) * 1000);
  const stair = (val: (i: number) => number, upto: number) => {
    let d = `M ${x(0)} ${y(0)}`;
    for (let i = 1; i <= upto; i++) d += ` H ${x(i)} V ${y(val(i))}`;
    return d;
  };
  const owedPath = stair(owedAt, step);
  const owedArea =
    step > 0 ? `${owedPath} L ${x(step)} ${y(0)} L ${x(0)} ${y(0)} Z` : "";
  const coveredPath = stair(coveredAt, step);

  return (
    <div className="mt-[1.6vmin] border-t border-ink/8 pt-[1.8vmin]">
      <div className="flex items-baseline justify-between font-mono text-[1.8vmin]">
        <span className="tnum text-g600">orders {orders} / 100</span>
        <span className="tnum flex items-center gap-[1.6vmin]">
          <span className="text-g500">
            owed {fmtMoney(owedDollars * 100, { round: true })}
          </span>
          <span className="text-g300">·</span>
          <span className="font-semibold text-ink">
            covered {fmtMoney(coveredDollars * 100, { round: true })}
          </span>
          {done && <span className="text-ink">✓</span>}
        </span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-[1vmin] h-[16vmin] w-full"
        preserveAspectRatio="none"
      >
        {owedArea && <path d={owedArea} fill="var(--color-g200)" opacity="0.55" />}
        {step > 0 && (
          <path
            d={owedPath}
            fill="none"
            stroke="var(--color-g400)"
            strokeWidth="0.55"
          />
        )}
        {step > 0 && (
          <path
            d={coveredPath}
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="0.9"
          />
        )}
      </svg>
      <div className="flex justify-between font-mono text-[1.6vmin] text-g500">
        <span>grey: refunds owed if it hits</span>
        <span>black: contracts we hold</span>
      </div>
    </div>
  );
}

export function ConsoleScene({ n }: { n: 14 | 15 }) {
  const q = useDeckQuote();
  const rm = useReducedMotion();
  // On 14 the console assembles itself; entering 15 directly shows it built.
  const [startedOn14] = useState(n === 14);

  // the product's own menu data, priced against the 100 × $200 campaign
  const [menu, setMenu] = useState<MenuRow[] | null>(null);
  useEffect(() => {
    let stop = false;
    (async () => {
      try {
        const res = await fetch("/api/markets?orders=100&aov=200", {
          cache: "no-store",
        });
        const json = (await res.json()) as MarketsPayload | { ok: false };
        if (!stop && json.ok) setMenu(pickRows(json.candidates));
      } catch {
        /* fall back to the snapshot rows */
      }
    })();
    return () => {
      stop = true;
    };
  }, []);
  const rows = menu ?? FALLBACK_ROWS;

  // stages: 1–4 browse the menu, 5 select, 6 market, 7 book, 8 quote
  const stage =
    useStages(
      startedOn14 ? [1200, 1650, 2100, 2550, 3150, 3900, 4500, 5500] : [],
      startedOn14
    ) + (startedOn14 ? 0 : 8);
  const browseOrder = [1, 2, 3, 0];
  const highlightIdx =
    stage >= 1 && stage <= 4
      ? Math.min(browseOrder[stage - 1], rows.length - 1)
      : -1;
  const selected = stage >= 5;
  const go = n === 15;

  const quote = q.payload?.quote ?? null;
  const premium = quote?.premiumCents ?? RUNNING_EXAMPLE.premiumCents;
  const exchangeFee = quote?.exchangeFeeCents ?? RUNNING_EXAMPLE.exchangeFeeCents;
  const ourFee = quote?.managementFeeCents ?? RUNNING_EXAMPLE.managementFeeCents;
  const allIn = quote?.allInCents ?? RUNNING_EXAMPLE.allInCents;
  const restingC100 = q.payload?.book.totalAskC100 ?? 147_869_456;
  const feasible = q.payload?.feasibility.ok ?? true;
  const title =
    q.payload?.market.title ?? "Will New York Y win the 2026 Pro Baseball Championship?";

  return (
    <div className="absolute inset-0">
      <div className="flex h-full items-center justify-center">
        <motion.div
          layout
          transition={{ duration: 0.55, ease: EASE }}
          className="w-[78vmin] max-w-[92vw] rounded-card border border-ink/10 bg-surface"
          style={{ boxShadow: "var(--shadow-raised)" }}
        >
          <div className="flex items-center gap-[1vmin] border-b border-ink/8 px-[2.6vmin] py-[1.6vmin]">
            <span className="h-[1.1vmin] w-[1.1vmin] rounded-full bg-g300" />
            <span className="h-[1.1vmin] w-[1.1vmin] rounded-full bg-g300" />
            <span className="h-[1.1vmin] w-[1.1vmin] rounded-full bg-g300" />
            <span className="ml-[1.6vmin] text-[1.5vmin] uppercase tracking-[0.1em] text-g500">
              Merchant console
            </span>
          </div>

          <div className="px-[3vmin] py-[2.4vmin] font-mono text-[2vmin] leading-[1.9] text-g700">
            <div className="font-sans">
              <div className="text-[1.5vmin] uppercase tracking-[0.1em] text-g500">
                Promotion
              </div>
              <div className="mt-[0.4vmin] text-[2.3vmin] font-medium tracking-tight text-ink">
                A chance every order is free — pick what it rides on.
              </div>
            </div>

            <div className="mt-[1.6vmin] flex flex-col gap-[0.9vmin]">
              <AnimatePresence initial={false}>
                {(go ? rows.slice(0, 1) : rows).map((row, i) => (
                  <motion.div
                    key={row.ticker}
                    layout
                    initial={
                      startedOn14 && !rm ? { opacity: 0, y: 6 } : { opacity: 1, y: 0 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.25 } }}
                    transition={{ delay: 0.25 + i * 0.12, duration: 0.45, ease: EASE }}
                  >
                    <MenuRowView
                      row={row}
                      highlighted={highlightIdx === i}
                      selected={selected && i === 0}
                      dimmed={selected && i !== 0 && !go}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {!go && stage >= 6 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45 }}
                className="mt-[1.6vmin]"
              >
                <span className="mr-[1.2vmin] text-g400">market</span>
                <span className="text-ink">{q.ticker}</span>
                <span className="text-g500"> · {title}</span>
              </motion.div>
            )}

            {!go && stage >= 7 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45 }}
                className="mt-[0.4vmin]"
              >
                <span className="mr-[1.2vmin] text-g400">book</span>
                <span className="tnum text-ink">
                  {q.bidPm != null ? pmToCentsLabel(q.bidPm) : "—"} /{" "}
                  {q.askPm != null ? pmToCentsLabel(q.askPm) : "—"}
                </span>
                <span className="tnum text-g500">
                  {" "}
                  · {fmtInt(contracts(restingC100))} contracts resting ·{" "}
                  {feasible ? "covers 20,000 ✓" : "too thin — blocked"}
                </span>
              </motion.div>
            )}

            {stage >= 8 && (
              <motion.div
                layout
                initial={rm ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="mt-[1.6vmin] border-t border-ink/8 pt-[1.6vmin]"
              >
                <div className="flex items-baseline gap-[1.6vmin]">
                  <span className="tnum font-sans text-[3.4vmin] font-bold tracking-tight text-ink">
                    {fmtMoney(allIn, { round: true })}
                  </span>
                  <span className="text-[1.9vmin] text-g500">all-in</span>
                  <AnimatePresence>
                    {go && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: [0.92, 1.02, 1] }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        className="ml-auto rounded-ctl bg-ink px-[3vmin] py-[0.7vmin] font-sans text-[2vmin] font-semibold text-paper"
                      >
                        Live
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <div className="tnum mt-[0.4vmin] text-[1.9vmin] text-g600">
                  contracts {fmtMoney(premium, { round: true })} · exchange fee{" "}
                  {fmtMoney(exchangeFee, { round: true })} · our fee{" "}
                  {fmtMoney(ourFee, { round: true })}
                </div>
              </motion.div>
            )}

            {go && <OrdersChart running={go} />}
          </div>
        </motion.div>
      </div>
      <SlideLabel>
        {n === 14 ? "Pick an event." : "They never see a contract."}
      </SlideLabel>
    </div>
  );
}
