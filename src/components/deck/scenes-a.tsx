"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import NumberFlow from "@number-flow/react";
import { EASE, SlideLabel } from "./primitives";

/* ── Slide 1 — Every store is running a sale. ────────────────────────────
   Frosted glass over a monochrome landscape: the headline sits alone on a
   glass pane; the greyscale sea-of-fog behind is mood, not information.
   Photo: Manhattan skyline — public/backdrop.jpg, graded to greyscale here. */

export function SceneStore() {
  const rm = useReducedMotion();
  return (
    <div className="absolute inset-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/backdrop.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover grayscale"
        style={{ objectPosition: "50% 42%" }}
      />
      <div className="absolute inset-0 bg-paper/20" />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={rm ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: EASE }}
          className="rounded-card border border-white/50 px-[8vmin] py-[6vmin]"
          style={{
            background: "rgba(255,255,255,0.42)",
            backdropFilter: "blur(26px) saturate(120%)",
            WebkitBackdropFilter: "blur(26px) saturate(120%)",
            boxShadow: "var(--shadow-raised)",
          }}
        >
          <h1 className="text-center text-[5.5vmin] font-semibold leading-[1.1] tracking-tight">
            Every store is running a sale.
          </h1>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Slide 2 — Most of it is wasted. ─────────────────────────────────── */
export function SceneWasted() {
  const rm = useReducedMotion();
  const line = (text: string, delay: number) => (
    <motion.div
      initial={rm ? { opacity: 0 } : { opacity: 0, y: "0.35em" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: EASE }}
      className="text-[6.6vmin] font-semibold leading-[1.12] tracking-tight"
    >
      {text}
    </motion.div>
  );
  return (
    <div className="absolute inset-0">
      <div className="flex h-full flex-col justify-center gap-[5vmin] pl-[11vw]">
        {line("They were buying anyway.", 0.15)}
        {line("Nobody tells a friend about 10% off.", 2.4)}
      </div>
      <SlideLabel>Most of it is wasted.</SlideLabel>
    </div>
  );
}

/* ── Slides 3 + 4 — Same money. Different shape. (4 is a build) ─────────
   The cards stay put. Each holds an outlined column representing the full
   $20,000 of orders; on the build, the promo spend fills exactly 10% of it
   in both cards while the figure counts up to $2,000. Same slice of the
   same whole — the equality and the smallness land together. */
function OfferCard({
  text,
  priced,
  delay,
}: {
  text: string;
  priced: boolean;
  delay: number;
}) {
  const rm = useReducedMotion();
  const [val, setVal] = useState(0);
  useEffect(() => {
    const t = setTimeout(
      () => setVal(priced ? 2000 : 0),
      priced && !rm ? delay * 1000 : 0
    );
    return () => clearTimeout(t);
  }, [priced, delay, rm]);

  return (
    <div
      className="flex h-[52vmin] w-[36vmin] flex-col rounded-card border border-ink/10 bg-surface px-[3.2vmin] pb-[3.6vmin] pt-[4.2vmin]"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="text-center text-[3vmin] font-medium leading-[1.3] tracking-tight">
        {text}
      </div>
      {/* the whole sale as an outlined column; the promo fills exactly 10% */}
      <div className="mt-auto flex flex-col items-center gap-[1.8vmin]">
        <motion.div
          initial={false}
          animate={{ opacity: priced ? 1 : 0 }}
          transition={{ delay: priced && !rm ? delay : 0, duration: 0.35 }}
          className="tnum text-[5vmin] font-bold tracking-tight"
        >
          <NumberFlow value={val} prefix="$" />
        </motion.div>
        <div className="relative h-[24vmin] w-[13vmin] overflow-hidden rounded-[0.6vmin] border border-ink/25">
          <motion.div
            initial={false}
            animate={{ height: priced ? "10%" : "0%" }}
            transition={{
              delay: priced && !rm ? delay : 0,
              duration: rm ? 0 : 1.05,
              ease: EASE,
            }}
            className="absolute inset-x-0 bottom-0 bg-ink"
          />
        </div>
        <motion.div
          initial={false}
          animate={{ opacity: priced ? 1 : 0 }}
          transition={{ delay: priced && !rm ? delay + 0.4 : 0, duration: 0.4 }}
          className="text-[1.8vmin] text-g500"
        >
          of $20,000 in orders
        </motion.div>
      </div>
    </div>
  );
}

export function SceneCards({ priced }: { priced: boolean }) {
  return (
    <div className="absolute inset-0">
      <div className="flex h-full items-center justify-center gap-[6vmin]">
        <OfferCard text="10% off everything." priced={priced} delay={0.1} />
        <OfferCard
          text="1-in-10 chance your order is free."
          priced={priced}
          delay={1.0}
        />
      </div>
      <SlideLabel>Same money. Different shape.</SlideLabel>
    </div>
  );
}

/* ── Slide 5 — It's the same discount. ───────────────────────────────── */
export function SceneYes() {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-[10vw]">
      <div className="text-center text-[6vmin] font-semibold tracking-tight">
        It&apos;s the same discount.
      </div>
    </div>
  );
}

/* ── Slide 6 — $0 or $20,000 ─────────────────────────────────────────────
   A line connects the two outcomes. A dot oscillates along it, not knowing
   where it will land — then lands on $20,000, which springs out bigger:
   the surprise bill. $0 dims; the promise was never really about it. */
export function SceneZeroOr() {
  const rm = useReducedMotion();
  const [dotDone, setDotDone] = useState(false);
  const landed = dotDone || !!rm;
  // the dot's run: 1.1s delay + 2.7s oscillation → land
  useEffect(() => {
    if (rm) return;
    const t = setTimeout(() => setDotDone(true), 3850);
    return () => clearTimeout(t);
  }, [rm]);

  return (
    <div className="absolute inset-0 flex items-center px-[6vw]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: landed ? 0.3 : 1 }}
        transition={{ duration: 0.6 }}
        className="tnum text-[13.5vmin] font-bold tracking-[-0.03em]"
      >
        $0
      </motion.div>

      <div className="relative mx-[3.5vw] flex-1">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1, opacity: landed ? 0.35 : 1 }}
          transition={{ delay: 0.7, duration: 0.5, ease: EASE }}
          className="h-px w-full origin-left bg-ink/30"
        />
        <AnimatePresence>
          {!rm && !landed && (
            <motion.div
              key="dot"
              className="absolute -top-[0.85vmin] h-[1.8vmin] w-[1.8vmin] rounded-full bg-ink"
              initial={{ left: "0%", opacity: 0 }}
              animate={{
                left: ["0%", "97%", "12%", "84%", "38%", "98%"],
                opacity: 1,
              }}
              exit={{ opacity: 0, scale: 2.4, transition: { duration: 0.3 } }}
              transition={{
                delay: 1.1,
                duration: 2.7,
                times: [0, 0.28, 0.5, 0.7, 0.85, 1],
                ease: "easeInOut",
                opacity: { delay: 1.1, duration: 0.25 },
              }}
            />
          )}
        </AnimatePresence>
      </div>

      <motion.div
        animate={landed && !rm ? { scale: [1, 1.24, 1.14] } : { scale: rm && landed ? 1.14 : 1 }}
        transition={{ duration: 0.55, times: [0, 0.55, 1], ease: [0.2, 0.9, 0.3, 1] }}
        className="tnum origin-center text-[13.5vmin] font-bold tracking-[-0.03em]"
      >
        $20,000
      </motion.div>
    </div>
  );
}
