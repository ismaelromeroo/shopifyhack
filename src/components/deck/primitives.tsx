"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/** One easing for the whole deck: fast out, long settle, no bounce. */
export const EASE = [0.19, 1, 0.22, 1] as const;

/**
 * Headline-as-label. The number is the slide; this sits bottom-left at
 * roughly a quarter of the primary figure's size.
 */
export function SlideLabel({
  children,
  delay = 0.2,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.6 }}
      className="absolute bottom-[7vh] left-[6vw] text-[2.6vmin] font-medium tracking-tight text-ink"
    >
      {children}
    </motion.div>
  );
}

/**
 * Content pacing inside a slide: returns how many of the given delays (ms,
 * cumulative from mount) have elapsed for the current `key`. State is keyed
 * so a key change resets by derivation — no synchronous setState in effects.
 */
export function useStages(delays: number[], key?: unknown): number {
  const [state, setState] = useState<{ k: unknown; n: number }>({ k: key, n: 0 });
  const delaysKey = delays.join(",");
  useEffect(() => {
    const parsed = delaysKey === "" ? [] : delaysKey.split(",").map(Number);
    const ids = parsed.map((t, i) =>
      setTimeout(
        () =>
          setState((s) => ({
            k: key,
            n: Math.max(s.k === key ? s.n : 0, i + 1),
          })),
        t
      )
    );
    return () => ids.forEach(clearTimeout);
  }, [key, delaysKey]);
  return state.k === key ? state.n : 0;
}

/**
 * Typewriter. When inactive (or reduced motion) the full text shows by
 * derivation; the effect only schedules timers.
 */
export function useTypewriter(
  text: string,
  active: boolean,
  msPerChar = 38,
  startDelay = 400
): { shown: string; done: boolean } {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active || reduced) return;
    let i = 0;
    let interval: ReturnType<typeof setInterval> | null = null;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length && interval) clearInterval(interval);
      }, msPerChar);
    }, startDelay);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text, active, msPerChar, startDelay, reduced]);

  const effective = !active || reduced ? text.length : count;
  return { shown: text.slice(0, effective), done: effective >= text.length };
}
