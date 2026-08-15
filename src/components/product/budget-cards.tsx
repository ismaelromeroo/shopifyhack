"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import NumberFlow from "@number-flow/react";
import { EASE } from "@/components/deck/primitives";

export function BudgetCards() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-2">
      <BudgetCard
        title="10% off everything."
        play={inView}
        delay={0.1}
      />
      <BudgetCard
        title="1-in-10 chance your order is free."
        play={inView}
        delay={1.0}
      />
    </div>
  );
}

function BudgetCard({
  title,
  play,
  delay,
}: {
  title: string;
  play: boolean;
  delay: number;
}) {
  const rm = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!play || rm) return;
    const t = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(t);
  }, [play, delay, rm]);

  const counting = play && !rm && !started;
  const val = counting ? 0 : 2000;
  const filled = !counting;

  return (
    <div className="flex flex-col rounded-card border border-ink/[0.08] bg-surface p-7 shadow-card">
      <p className="text-title font-medium tracking-tight">{title}</p>
      <div className="mt-8 flex items-end justify-between gap-4">
        <div className="relative tnum text-d1 font-semibold tracking-tight">
          <span className={play && !rm ? "invisible" : undefined}>$2,000</span>
          {play && !rm ? (
            <span className="absolute inset-0">
              <NumberFlow value={val} prefix="$" />
            </span>
          ) : null}
        </div>
        <div className="relative h-24 w-11 overflow-hidden rounded-ctl border border-ink/20">
          <motion.div
            initial={false}
            animate={{ height: filled ? "10%" : "0%" }}
            transition={{
              duration: rm ? 0 : 1.05,
              ease: EASE,
            }}
            className="absolute inset-x-0 bottom-0 bg-ink"
          />
        </div>
      </div>
      <p className="mt-3 text-caption text-g500">of $20,000 in orders</p>
    </div>
  );
}
