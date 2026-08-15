"use client";

import { motion, useReducedMotion } from "motion/react";
import NumberFlow from "@number-flow/react";
import { EASE } from "@/components/deck/primitives";
import { LandingLiveTag, useLandingQuote } from "@/components/product/landing-quote";

export function CouponGlyph() {
  const rm = useReducedMotion();
  const q = useLandingQuote();

  return (
    <div>
      <p className="caps-label text-g500">The coupon</p>
      <p className="mt-3 max-w-xl text-h font-semibold tracking-tight">
        A coupon that pays $1 if the Yankees win the World Series.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <motion.div
          initial={rm ? false : { y: 7 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: rm ? 0 : 0.15, duration: 0.6, ease: EASE }}
          className="relative flex min-h-[220px] flex-col justify-between rounded-card border-[3px] border-ink bg-surface p-7 shadow-raised"
        >
          <p className="caps-label text-g500">If they win</p>
          <p className="tnum text-d0 font-semibold tracking-tight">$1</p>
          <motion.div
            initial={rm ? false : { opacity: 0, scale: 1.15, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            transition={{ duration: rm ? 0 : 0.3, ease: [0.2, 0.9, 0.3, 1] }}
            className="tnum absolute -right-3 -top-4 rounded-ctl border-[3px] border-ink bg-surface/90 px-3 py-1 text-d3 font-black tracking-tight"
          >
            <NumberFlow
              value={q.midPm / 100}
              format={{ maximumFractionDigits: 1 }}
            />
            ¢
          </motion.div>
        </motion.div>
        <motion.div
          initial={rm ? false : { y: 7 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: rm ? 0 : 0.47, duration: 0.6, ease: EASE }}
          className="flex min-h-[220px] flex-col justify-between rounded-card border-[3px] border-dashed border-g400 bg-transparent p-7"
        >
          <p className="caps-label text-g500">If they don’t</p>
          <p className="tnum text-d0 font-semibold tracking-tight text-g300">$0</p>
        </motion.div>
      </div>
      <div className="mt-4">
        <LandingLiveTag />
      </div>
    </div>
  );
}
