"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { EASE } from "@/components/deck/primitives";
import { fmtMoney } from "@/lib/format";
import { useLandingQuote } from "@/components/product/landing-quote";

const minus = (cents: number) =>
  cents === 0 ? "$0" : `−${fmtMoney(cents, { round: true })}`;
const plus = (cents: number) =>
  cents === 0 ? "$0" : `+${fmtMoney(cents, { round: true })}`;

export function CancelTable() {
  const rm = useReducedMotion();
  const q = useLandingQuote();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const play = inView && !rm;

  const rows = [
    { label: "Refunds paid to customers", hit: minus(2_000_000), miss: "$0" },
    { label: "The coupons pay", hit: plus(2_000_000), miss: "$0" },
    {
      label: "20,000 coupons, bought upfront",
      hit: minus(q.premiumCents),
      miss: minus(q.premiumCents),
    },
    {
      label: "Exchange fee, paid upfront",
      hit: minus(q.exchangeFeeCents),
      miss: minus(q.exchangeFeeCents),
    },
    {
      label: "Our fee, paid upfront",
      hit: minus(q.managementFeeCents),
      miss: minus(q.managementFeeCents),
    },
  ] as const;

  const net = minus(q.allInCents);
  const totalDelay = 0.25 + rows.length * 0.32 + 0.65;

  return (
    <div>
      <p className="caps-label text-g500">Either way</p>
      <h2 className="mt-3 max-w-xl text-h font-semibold tracking-tight">
        Refunds and coupon payouts land together, so the merchant never floats
        the gap.
      </h2>
      <p className="mt-2 max-w-lg text-body text-g600">
        The bill is the same either way. That is the whole product.
      </p>

      <div
        ref={ref}
        className="mt-8 rounded-card border border-ink/[0.07] bg-surface shadow-card"
      >
        <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-ink/[0.06] px-5 py-3 text-caption text-g500">
          <span />
          <span className="text-right">They win</span>
          <span className="text-right">They don’t</span>
        </div>
        {rows.map((r, i) => (
          <motion.div
            key={r.label}
            initial={play ? { y: 7 } : false}
            animate={{ y: 0 }}
            transition={{
              delay: play ? 0.25 + i * 0.32 : 0,
              duration: play ? 0.5 : 0,
              ease: EASE,
            }}
            className="grid grid-cols-[1fr_1fr_1fr] border-b border-ink/[0.05] px-5 py-3.5"
          >
            <span className="text-caption text-g600">{r.label}</span>
            <span className="tnum text-right text-body">{r.hit}</span>
            <span className="tnum text-right text-body">{r.miss}</span>
          </motion.div>
        ))}
        <motion.div
          initial={play ? { scale: 0.965 } : false}
          animate={{ scale: 1 }}
          transition={{
            delay: play ? totalDelay : 0,
            duration: play ? 0.5 : 0,
            ease: EASE,
          }}
          className="grid grid-cols-[1fr_1fr_1fr] rounded-b-card bg-ink px-5 py-5 text-surface"
        >
          <span className="caps-label text-surface/55">Total cost of the promo</span>
          <span className="tnum text-right text-d3 font-semibold">{net}</span>
          <span className="tnum text-right text-d3 font-semibold">{net}</span>
        </motion.div>
      </div>
    </div>
  );
}
