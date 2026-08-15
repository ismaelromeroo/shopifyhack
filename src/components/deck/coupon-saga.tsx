"use client";
import { useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import NumberFlow from "@number-flow/react";
import { EASE, SlideLabel } from "./primitives";
import { DeckLiveTag } from "./deck-live-tag";
import { useDeckQuote } from "./deck-quote";

/**
 * Slides 7–11 are one component so the contract never remounts:
 *   7  a single drawn contract
 *   8  the same contract, live price stamped on it
 *   9  the same contract, still there — the venues that price it appear beneath
 *   10 the same contract (layoutId) shrinks into a block of 20,000
 *   11 the block travels left, the refund stack arrives, they resolve: =
 */

const COLS = 20;
const ROWS = 10;
const CENTER = { r: 4, c: 9 };

function BigCoupon({ stamped }: { stamped: boolean }) {
  const q = useDeckQuote();
  const rm = useReducedMotion();
  return (
    <motion.div
      layoutId="coupon"
      transition={{ duration: rm ? 0 : 0.8, ease: EASE }}
      className="relative flex h-[30vmin] w-[54vmin] max-w-[86vw] items-center justify-center rounded-[1.3vmin] border-[0.32vmin] border-ink bg-surface"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="pointer-events-none absolute inset-[1.2vmin] rounded-[0.8vmin] border border-dashed border-g300" />
      <div className="px-[6vmin] text-center">
        <div className="text-[4.6vmin] font-bold tracking-tight">Pays $1</div>
        <div className="mt-[1.2vmin] text-[2.5vmin] leading-[1.35] text-g600">
          if the Yankees win the World&nbsp;Series
        </div>
      </div>
      <AnimatePresence>
        {stamped && (
          <motion.div
            initial={rm ? { opacity: 0 } : { opacity: 0, scale: 1.5, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.3, ease: [0.2, 0.9, 0.3, 1] }}
            className="tnum absolute -right-[5vmin] -top-[6vmin] rounded-[1vmin] border-[0.45vmin] border-ink bg-surface/90 px-[2.6vmin] py-[1.1vmin] text-[7.5vmin] font-black tracking-tight"
          >
            <NumberFlow
              value={q.midPm / 100}
              format={{ maximumFractionDigits: 1 }}
            />
            ¢
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MiniCoupon({ core }: { core?: boolean }) {
  const rm = useReducedMotion();
  const cls =
    "h-[1.9vmin] w-[3.1vmin] rounded-[0.3vmin] border border-ink/60 bg-surface";
  if (core) {
    return (
      <motion.div
        layoutId="coupon"
        transition={{ duration: rm ? 0 : 0.8, ease: EASE }}
        className={cls}
      />
    );
  }
  return <div className={cls} />;
}

function RefundSlip({ i }: { i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: "3vw" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ delay: 0.12 + i * 0.055, duration: 0.7, ease: EASE }}
      className="flex h-[2.5vmin] w-[24vmin] items-center gap-[1.1vmin] rounded-[0.35vmin] border border-ink/60 bg-surface px-[1.2vmin]"
    >
      <span className="h-[0.45vmin] w-[28%] rounded bg-g300" />
      <span className="h-[0.45vmin] w-[16%] rounded bg-g300" />
      <span className="ml-auto h-[0.45vmin] w-[14%] rounded bg-g400" />
    </motion.div>
  );
}

/* ── Slide 9 — where the price comes from ────────────────────────────────
   The contract from 7–8 is still on screen, shrunk. Two regulated venues
   arrive beneath it, Kalshi first and weighted heavier because it is the
   one the deck's live price is actually pulled from. The rule beneath each
   name draws left-to-right so the pair reads as a list being written, not
   a logo wall fading in. */
function Venues() {
  const rm = useReducedMotion();
  const row = (
    name: string,
    note: string,
    delay: number,
    primary: boolean
  ) => (
    <motion.div
      initial={rm ? { opacity: 0 } : { opacity: 0, y: "0.35em" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay, duration: 0.6, ease: EASE }}
      className="flex flex-col items-center gap-[0.9vmin]"
    >
      <div
        className={
          primary
            ? "text-[5.4vmin] font-bold tracking-tight text-ink"
            : "text-[5.4vmin] font-light tracking-tight text-g500"
        }
      >
        {name}
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: delay + 0.25, duration: 0.5, ease: EASE }}
        style={{ transformOrigin: "left" }}
        className={`h-[0.22vmin] w-full ${primary ? "bg-ink" : "bg-g400"}`}
      />
      <div className="text-[1.9vmin] leading-[1.4] text-g500">{note}</div>
    </motion.div>
  );

  return (
    <motion.div
      key="venues"
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="flex items-start gap-[9vmin]"
    >
      {row("Kalshi", "where we buy", 0.15, true)}
      {row("Polymarket", "the other one", 0.55, false)}
    </motion.div>
  );
}

export function CouponSaga({ n }: { n: number }) {
  const rm = useReducedMotion();
  const q = useDeckQuote();
  const resolved = n >= 11;

  const cells = useMemo(() => {
    const out: { r: number; c: number; dist: number }[] = [];
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        out.push({
          r,
          c,
          dist: Math.max(Math.abs(r - CENTER.r), Math.abs(c - CENTER.c)),
        });
    return out;
  }, []);

  if (n <= 9) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-[3.5vmin]">
        {/* the card shrinks on 9 to make room for the venues that price it */}
        <motion.div
          animate={{ scale: n === 9 ? 0.72 : 1 }}
          transition={{ duration: rm ? 0 : 0.7, ease: EASE }}
        >
          <BigCoupon stamped={n >= 8} />
        </motion.div>

        <AnimatePresence mode="popLayout">
          {n === 8 && (
            <motion.div
              key="tag"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <DeckLiveTag />
            </motion.div>
          )}
          {n === 9 && <Venues key="venues" />}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <div
        className={`flex h-full items-center justify-center ${
          resolved ? "gap-[5vmin]" : ""
        }`}
      >
        {/* the coupon mass */}
        <motion.div
          layout
          transition={{ duration: rm ? 0 : 0.85, ease: EASE }}
          className="flex flex-col items-center gap-[2.6vmin]"
        >
          <motion.div
            layout
            transition={{ duration: rm ? 0 : 0.85, ease: EASE }}
            animate={{ scale: resolved ? 0.74 : 1 }}
            className="flex flex-col items-center gap-[2.6vmin]"
          >
            <div className="text-[2.2vmin] text-g500">20,000 contracts</div>
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                gap: "0.55vmin",
              }}
            >
              {cells.map(({ r, c, dist }) =>
                r === CENTER.r && c === CENTER.c ? (
                  <MiniCoupon key="core" core />
                ) : (
                  <motion.div
                    key={`${r}-${c}`}
                    initial={rm ? { opacity: 0 } : { opacity: 0, scale: 0.35 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: rm ? 0 : 0.1 + dist * 0.07,
                      duration: 0.4,
                      ease: EASE,
                    }}
                  >
                    <MiniCoupon />
                  </motion.div>
                )
              )}
            </div>
            <AnimatePresence>
              {!resolved && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.25 } }}
                  transition={{ delay: rm ? 0 : 1.15, duration: 0.6 }}
                  className="tnum text-[6.4vmin] font-bold tracking-tight"
                >
                  $2,000
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* the deck's aha: mass and refunds travel toward each other, resolve */}
        <AnimatePresence>
          {resolved && (
            <motion.div
              key="eq"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ delay: 0.8, duration: 0.45, ease: EASE }}
              className="text-[9vmin] font-light text-ink"
            >
              =
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {resolved && (
            <motion.div
              key="refunds"
              initial={{ opacity: 0, x: "16vw" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "8vw", transition: { duration: 0.25 } }}
              transition={{ duration: rm ? 0 : 0.85, ease: EASE }}
              className="flex flex-col gap-[0.8vmin]"
            >
              {Array.from({ length: 10 }, (_, i) => (
                <RefundSlip key={i} i={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {resolved && (
        <SlideLabel delay={1.25}>
          That&apos;s exactly when you owe $20,000.
        </SlideLabel>
      )}
      {/* keep the shared poller warm through the saga */}
      <span className="hidden">{q.ticker}</span>
    </div>
  );
}
