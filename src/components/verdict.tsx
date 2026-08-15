"use client";
import { motion, useReducedMotion } from "motion/react";
import { Check, X } from "lucide-react";
import { contracts, fmtInt, fmtMoney, pmToCentsLabel } from "@/lib/format";
import type { Feasibility, Quote } from "@/lib/money";

/**
 * The feasibility verdict. A judgement, not an error state: it lands with
 * weight (spring, shadow) and states the real reason with the real numbers.
 * Pass/fail is expressed through fill — solid ink vs. dashed outline.
 */
export function Verdict({ f, q }: { f: Feasibility; q: Quote }) {
  const reduced = useReducedMotion();
  const spring = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 240, damping: 22, mass: 1.1 };

  const headline = f.ok ? "The book covers this." : failHeadline(f);
  const detail = f.ok ? okDetail(f, q) : failDetail(f, q);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={spring}
      className={
        f.ok
          ? "rounded-card bg-ink text-surface shadow-raised p-5"
          : "rounded-card bg-surface border border-dashed border-g400 shadow-card p-5"
      }
    >
      <div className="flex items-start gap-3.5">
        <span
          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
            f.ok ? "border-surface/30" : "border-g300"
          }`}
        >
          {f.ok ? <Check size={14} strokeWidth={2.5} /> : <X size={14} strokeWidth={2.5} className="text-g600" />}
        </span>
        <div className="min-w-0">
          <div className="text-title font-semibold">{headline}</div>
          <p className={`mt-1 text-caption ${f.ok ? "text-surface/65" : "text-g600"}`}>{detail}</p>
          {f.nearCertainty && (
            <p className={`mt-2 text-caption ${f.ok ? "text-surface/50" : "text-g500"}`}>
              Note: this event is trading near-certain — you would be funding roughly a{" "}
              {Math.round((q.avgPm || 9_700) / 100)}% off sale. Longer odds make better promos.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function okDetail(f: Feasibility, q: Quote) {
  const parts = [
    `${fmtInt(contracts(f.neededC100))} contracts absorbed at an average ${pmToCentsLabel(q.avgPm)}`,
    `${fmtInt(contracts(f.depthC100))} resting on the ask side`,
  ];
  if (q.slippagePm > 0) parts.push(`${pmToCentsLabel(q.slippagePm)} of slippage`);
  return parts.join(" · ") + ".";
}

function failHeadline(f: Feasibility) {
  switch (f.reason) {
    case "insufficient_depth":
      return "The book can’t absorb this.";
    case "spread_too_wide":
      return "The spread would eat the budget.";
    case "position_limit":
      return "Over the position limit.";
    default:
      return "No live two-sided market.";
  }
}

function failDetail(f: Feasibility, q: Quote) {
  switch (f.reason) {
    case "insufficient_depth":
      return `Covering this needs ${fmtInt(contracts(f.neededC100))} contracts; only ${fmtInt(
        contracts(f.depthC100)
      )} are resting on the ask side right now. Lower the expected order count, or run it on a deeper market.`;
    case "spread_too_wide":
      return `The market is quoted ${f.spreadPm != null ? pmToCentsLabel(f.spreadPm) : "—"} wide. Crossing that spread would add more drag than the promo can carry.`;
    case "position_limit":
      return `This position would cost ${fmtMoney(f.costBasisCents, { round: true })} — over the ${fmtMoney(
        f.positionLimitCents,
        { round: true }
      )} per-market position limit. Shrink the campaign or split markets.`;
    default:
      return `There is no resting bid and ask to price against right now. ${
        q.bestAskPm == null ? "The book is empty on the ask side." : ""
      }`;
  }
}
