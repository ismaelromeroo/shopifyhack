"use client";
import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { fmtMoney } from "@/lib/format";

export interface TrackPoint {
  t: number; // seconds since campaign start
  liabCents: number;
  covCents: number;
}

/**
 * Liability accrued vs. hedge coverage — two step-lines tracking each other.
 * Liability is solid ink; coverage is dashed grey. The lines draw in on
 * mount; appended points extend them.
 */
const W = 640;
const PAD = { t: 10, r: 8, b: 18, l: 8 };

export function TrackChart({ series, height = 180 }: { series: TrackPoint[]; height?: number }) {
  const reduced = useReducedMotion();
  const H = height;

  const { liabPath, covPath, maxV, lastT } = useMemo(() => {
    if (series.length === 0) return { liabPath: "", covPath: "", maxV: 0, lastT: 0 };
    const lastT = Math.max(10, series[series.length - 1].t);
    const maxV = Math.max(100, ...series.map((p) => p.liabCents));
    const x = (t: number) => PAD.l + (t / lastT) * (W - PAD.l - PAD.r);
    const y = (v: number) => H - PAD.b - (v / maxV) * (H - PAD.t - PAD.b);
    // step-after paths: value holds until the next event
    const step = (get: (p: TrackPoint) => number) =>
      series
        .map((p, i) => {
          const px = x(p.t).toFixed(1);
          const py = y(get(p)).toFixed(1);
          if (i === 0) return `M ${px} ${py}`;
          const prev = y(get(series[i - 1])).toFixed(1);
          return `L ${px} ${prev} L ${px} ${py}`;
        })
        .join(" ");
    return { liabPath: step((p) => p.liabCents), covPath: step((p) => p.covCents), maxV, lastT };
  }, [series, H]);

  const last = series[series.length - 1];

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Liability accrued versus hedge coverage over time">
        {/* baseline only — the data is the chart */}
        <line x1={PAD.l} y1={H - PAD.b} x2={W - PAD.r} y2={H - PAD.b} stroke="var(--color-g200)" strokeWidth="1" />
        {covPath && (
          <motion.path
            d={covPath}
            fill="none"
            stroke="var(--color-g500)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            initial={reduced ? undefined : { pathLength: 0 }}
            animate={reduced ? undefined : { pathLength: 1 }}
            transition={{ duration: 1.1, ease: [0.3, 0.1, 0.2, 1] }}
          />
        )}
        {liabPath && (
          <motion.path
            d={liabPath}
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="2"
            initial={reduced ? undefined : { pathLength: 0 }}
            animate={reduced ? undefined : { pathLength: 1 }}
            transition={{ duration: 1.1, ease: [0.3, 0.1, 0.2, 1] }}
          />
        )}
        {/* time axis marks */}
        <text x={PAD.l} y={H - 5} className="fill-g400" fontSize="9">
          0:00
        </text>
        <text x={W - PAD.r} y={H - 5} textAnchor="end" className="fill-g400" fontSize="9">
          {Math.floor(lastT / 60)}:{String(Math.floor(lastT % 60)).padStart(2, "0")}
        </text>
        {/* max value mark — left edge, away from the advancing line */}
        <text x={PAD.l} y={PAD.t + 8} className="fill-g400 tnum" fontSize="9">
          {fmtMoney(maxV, { round: true })}
        </text>
      </svg>
      {last && (
        <div className="mt-2 flex items-center gap-5 text-caption text-g600">
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-[2px] w-4 bg-ink" />
            liability accrued
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className="inline-block h-[2px] w-4"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, var(--color-g500) 0 4px, transparent 4px 8px)",
              }}
            />
            hedge coverage
          </span>
        </div>
      )}
    </div>
  );
}
