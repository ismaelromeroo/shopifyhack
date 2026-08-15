"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { fmtMoney } from "@/lib/format";

const STEPS = 20;

export function OrdersChart({
  running,
  ordersTarget = 100,
  aov = 200,
  onDone,
}: {
  running: boolean;
  ordersTarget?: number;
  aov?: number;
  onDone?: () => void;
}) {
  const rm = useReducedMotion();
  const [rawStep, setRawStep] = useState(0);
  const doneRef = useRef(false);
  const perStep = ordersTarget / STEPS;
  const maxLiability = ordersTarget * aov;

  useEffect(() => {
    if (!running) return;
    if (rm) {
      setRawStep(STEPS);
      return;
    }
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

  const step = rm && running ? STEPS : rawStep;
  const done = step >= STEPS;

  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (!done || doneRef.current) return;
    doneRef.current = true;
    onDoneRef.current?.();
  }, [done]);

  const orders = Math.round(step * perStep);
  const owedDollars = orders * aov;
  const coveredDollars =
    step >= STEPS
      ? owedDollars
      : Math.max(0, Math.round((step - 1) * perStep) * aov);

  const W = 100;
  const H = 40;
  const x = (i: number) => (i / STEPS) * (W - 2) + 1;
  const y = (v: number) => H - 3 - (v / maxLiability) * (H - 8);
  const owedAt = (i: number) => i * (maxLiability / STEPS);
  const coveredAt = (i: number) =>
    i >= STEPS ? maxLiability : Math.max(0, (i - 1) * (maxLiability / STEPS));
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
    <div className="mt-4 border-t border-ink/[0.08] pt-4">
      <div className="flex items-baseline justify-between font-mono text-caption">
        <span className="tnum text-g600">
          orders {orders} / {ordersTarget}
        </span>
        <span className="tnum flex items-center gap-3">
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
        className="mt-2 h-28 w-full"
        preserveAspectRatio="none"
      >
        {owedArea && (
          <path d={owedArea} fill="var(--color-g200)" opacity="0.55" />
        )}
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
      <div className="flex justify-between font-mono text-caption text-g500">
        <span>grey: refunds owed if it hits</span>
        <span>black: coupons we hold</span>
      </div>
    </div>
  );
}
