"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/components/deck/primitives";

const SEATS = [
  {
    who: "Visitor",
    path: "/product",
    copy: "Lands on the idea: a coupon that pays $1 if the event hits.",
  },
  {
    who: "Merchant",
    path: "/product/console",
    copy: "Same budget, two shapes. Picks one, or we refuse it.",
  },
  {
    who: "Customer",
    path: "/product/claim/[id]",
    copy: "Sees the live odds on their own order.",
  },
] as const;

export function ThreeSeats() {
  const rm = useReducedMotion();
  return (
    <div>
      <p className="caps-label text-g500">Three seats</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {SEATS.map((s, i) => (
          <motion.div
            key={s.who}
            initial={rm ? false : { y: 7 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: rm ? 0 : 0.25 + i * 0.32,
              duration: 0.55,
              ease: EASE,
            }}
            className="rounded-card border border-ink/[0.07] bg-surface p-6 shadow-card"
          >
            <div className="text-title font-semibold">{s.who}</div>
            <p className="mt-1 font-mono text-caption text-g400">{s.path}</p>
            <p className="mt-4 text-body text-g700">{s.copy}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
