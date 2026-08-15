"use client";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "./primitives";

/* ── Slide 11 — the payoff table (the one dense slide) ───────────────────
   Four rows cascade; then, after a held beat, BOTH bottom lines land in a
   single motion element — one animation, one instant. The equality is the
   point; asynchronous arrival would destroy it. */
const ROWS: [string, string, string][] = [
  ["Refunds paid to customers", "−$20,000", "$0"],
  ["The contracts pay", "+$20,000", "$0"],
  ["20,000 contracts, bought upfront", "−$2,000", "−$2,000"],
  ["Exchange fee, paid upfront", "−$126", "−$126"],
  ["Our fee, paid upfront", "−$200", "−$200"],
];
const TOTAL_DELAY = 0.25 + ROWS.length * 0.32 + 0.65;

export function ScenePayoffTable() {
  const rm = useReducedMotion();
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[82vmin] max-w-[92vw]">
        <div className="grid grid-cols-[1.15fr_1fr_1fr] gap-x-[2.5vmin] pb-[1.6vmin] text-[1.9vmin] uppercase tracking-[0.09em] text-g500">
          <div />
          <div className="text-center">Yankees make it</div>
          <div className="text-center">they don&apos;t</div>
        </div>
        {ROWS.map(([label, a, b], i) => (
          <motion.div
            key={label}
            initial={rm ? { opacity: 0 } : { opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.32, duration: 0.5, ease: EASE }}
            className="grid grid-cols-[1.15fr_1fr_1fr] items-center gap-x-[2.5vmin] border-t border-ink/8 py-[1.8vmin] text-[2.5vmin]"
          >
            <div className="text-g600">{label}</div>
            <div className="tnum text-center">{a}</div>
            <div className="tnum text-center">{b}</div>
          </motion.div>
        ))}
        <motion.div
          initial={rm ? { opacity: 0 } : { opacity: 0, scale: 0.965 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: TOTAL_DELAY, duration: 0.5, ease: EASE }}
          className="mt-[0.4vmin] grid grid-cols-[1.15fr_1fr_1fr] items-center gap-x-[2.5vmin] border-t-[0.4vmin] border-ink pt-[2.6vmin]"
        >
          <div className="text-[2.5vmin] font-medium">
            Total cost of the promo
          </div>
          <div className="tnum whitespace-nowrap text-center text-[4.4vmin] font-bold tracking-tight">
            −$2,326
          </div>
          <div className="tnum whitespace-nowrap text-center text-[4.4vmin] font-bold tracking-tight">
            −$2,326
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Slide 12 — the two offers, equal ─────────────────────────────────────
   Reiterates the thesis rather than advertising the premium: the offer from
   slide 3's left card equals the offer from its right card. */
export function SceneSameSale() {
  const rm = useReducedMotion();
  const side = (text: string, delay: number) => (
    <motion.div
      initial={rm ? { opacity: 0 } : { opacity: 0, y: "0.12em" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: EASE }}
      className="whitespace-nowrap text-[7.5vmin] font-bold tracking-tight"
    >
      {text}
    </motion.div>
  );
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[4.5vmin]">
      {side("10% off", 0.1)}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.85, duration: 0.45, ease: EASE }}
        className="text-[7.5vmin] font-light text-g500"
      >
        =
      </motion.div>
      {side("1-in-10 free", 0.45)}
    </div>
  );
}

/* ── Slide 13 — $75M — the word-of-mouth proof ───────────────────────────
   The documented extreme of this mechanic: Mattress Mack's 2022 World
   Series promo, ~$75M of promo-driven furniture sales. The number is the
   slide; the source lives in the script, not on screen. */
export function SceneWom() {
  const rm = useReducedMotion();
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-[4vmin]">
      <motion.div
        initial={
          rm
            ? { opacity: 0 }
            : { opacity: 0, scale: 0.96, filter: "blur(10px)" }
        }
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ delay: 0.2, duration: 0.85, ease: EASE }}
        className="tnum text-[18vmin] font-bold leading-none tracking-[-0.03em]"
      >
        $75M
      </motion.div>
      <motion.div
        initial={rm ? { opacity: 0 } : { opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: EASE }}
        className="text-[2.4vmin] leading-normal text-g600"
      >
        what one furniture store sold on one of these
      </motion.div>
    </div>
  );
}

/* ── Slide 18 — +5 in 100 — the bar, made visible ────────────────────────
   A hundred order dots ripple in as outlines, wave running left to right;
   then the figure lands and the five that decide the whole business fill
   in, one by one, along the bottom-right. */
export function SceneBar() {
  const rm = useReducedMotion();
  const COLS = 20;
  const ROWS = 5;
  const EXTRA = 5;
  const DOTS = COLS * ROWS;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <motion.div
        initial={
          rm ? { opacity: 0 } : { opacity: 0, scale: 0.94, filter: "blur(8px)" }
        }
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ delay: rm ? 0 : 1.15, duration: 0.6, ease: EASE }}
        className="tnum text-[15vmin] font-bold leading-none tracking-tight"
      >
        +5
      </motion.div>
      <div
        className="mt-[7vmin] grid gap-[1.6vmin]"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: DOTS }, (_, i) => {
          const col = i % COLS;
          const row = Math.floor(i / COLS);
          const extra = i >= DOTS - EXTRA;
          return (
            <motion.div
              key={i}
              initial={rm ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={
                extra
                  ? {
                      delay: rm ? 0 : 1.35 + (i - (DOTS - EXTRA)) * 0.18,
                      duration: 0.4,
                      ease: EASE,
                    }
                  : {
                      delay: rm ? 0 : 0.2 + col * 0.035 + row * 0.05,
                      duration: 0.45,
                      ease: EASE,
                    }
              }
              className={`h-[2.1vmin] w-[2.1vmin] rounded-full ${
                extra ? "bg-ink" : "border-[0.18vmin] border-g300"
              }`}
            />
          );
        })}
      </div>
      <motion.div
        initial={rm ? { opacity: 0 } : { opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: rm ? 0 : 2.5, duration: 0.6, ease: EASE }}
        className="mt-[6vmin] text-[2.4vmin] leading-normal text-g500"
      >
        in 100 orders
      </motion.div>
    </div>
  );
}

/* ── Slide 17 — three lines ─────────────────────────────────────────── */
const LINES: [string, string, boolean][] = [
  ["Promo budget", "$2,000", false],
  ["Exchange fee", "$126", false],
  ["Our fee", "$200", true],
];

export function SceneThreeLines() {
  const rm = useReducedMotion();
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[58vmin] max-w-[86vw]">
        {LINES.map(([label, value, strong], i) => (
          <motion.div
            key={label}
            initial={rm ? { opacity: 0 } : { opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.32, duration: 0.55, ease: EASE }}
            className={`flex items-baseline justify-between py-[2.6vmin] text-[3.9vmin] tracking-tight ${
              i > 0 ? "border-t border-ink/8" : ""
            } ${strong ? "font-bold" : ""}`}
          >
            <div className={strong ? "" : "text-g600"}>{label}</div>
            <div className="tnum">{value}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Slide 17 — closing card ─────────────────────────────────────────────
   Product name (the console build in this repo calls it "Covered" — change
   it here), one line, the live tag still running in the corner. */
export function SceneClose() {
  return (
    <div className="absolute inset-0">
      <div className="flex h-full flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="text-[9vmin] font-bold leading-none tracking-tight"
        >
          Covered
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-[5vmin] text-[2.6vmin] text-g600"
        >
          Discounts worth talking about
        </motion.div>
      </div>
    </div>
  );
}
