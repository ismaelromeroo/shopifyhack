"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { DeckQuoteProvider } from "./deck-quote";
import { DeckBackground } from "./background";
import { SceneStore, SceneWasted, SceneCards, SceneYes, SceneZeroOr } from "./scenes-a";
import { CouponSaga } from "./coupon-saga";
import { ConsoleScene } from "./console-scene";
import { PhoneScene } from "./phone-scene";
import {
  ScenePayoffTable,
  SceneSameSale,
  SceneWom,
  SceneBar,
  SceneThreeLines,
  SceneClose,
} from "./scenes-b";

const LAST = 20;

/**
 * Slides that share a visual composition share a group; within a group a
 * keypress changes a prop, never remounts — so 3→4 and 9→10 are builds and
 * the slide-7 coupon is the same element through slide 10.
 */
const GROUP: Record<number, string> = {
  1: "s1", 2: "s2", 3: "s3", 4: "s3", 5: "s5", 6: "s6",
  7: "s7", 8: "s7", 9: "s7", 10: "s7", 11: "s7",
  12: "s11", 13: "s12", 14: "wom", 15: "console", 16: "console",
  17: "phone", 18: "lines", 19: "bar", 20: "close",
};

function Scene({ n }: { n: number }) {
  switch (GROUP[n]) {
    case "s1": return <SceneStore />;
    case "s2": return <SceneWasted />;
    case "s3": return <SceneCards priced={n >= 4} />;
    case "s5": return <SceneYes />;
    case "s6": return <SceneZeroOr />;
    case "s7": return <CouponSaga n={n} />;
    case "s11": return <ScenePayoffTable />;
    case "s12": return <SceneSameSale />;
    case "wom": return <SceneWom />;
    case "console": return <ConsoleScene n={n as 15 | 16} />;
    case "phone": return <PhoneScene />;
    case "lines": return <SceneThreeLines />;
    case "bar": return <SceneBar />;
    case "close": return <SceneClose />;
    default: return null;
  }
}

export default function Deck() {
  // Client-only mount avoids the documented layoutId hydration jump and lets
  // the initial slide come from the hash (#7 → slide 7).
  const [n, setN] = useState<number | null>(null);

  useEffect(() => {
    const fromHash = () => {
      const h = Number(window.location.hash.replace("#", ""));
      setN(h >= 1 && h <= LAST ? h : 1);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  useEffect(() => {
    if (n != null) history.replaceState(null, "", `#${n}`);
  }, [n]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        setN((v) => (v == null ? 1 : Math.min(LAST, v + 1)));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setN((v) => (v == null ? 1 : Math.max(1, v - 1)));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Zero chrome: even the cursor leaves after 2s idle.
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const wake = () => {
      setIdle(false);
      clearTimeout(t);
      t = setTimeout(() => setIdle(true), 2000);
    };
    wake();
    window.addEventListener("mousemove", wake);
    return () => {
      clearTimeout(t);
      window.removeEventListener("mousemove", wake);
    };
  }, []);

  // Prepare everything a later slide needs: the slide-1 photo (deep links can
  // arrive mid-deck and go back) — the Kalshi poller starts with the provider.
  useEffect(() => {
    const img = new window.Image();
    img.src = "/backdrop.jpg";
  }, []);

  if (n === null) return <div className="fixed inset-0 bg-paper" />;

  return (
    <DeckQuoteProvider>
      {/* leading-[1.15] is load-bearing: the shared design tokens give body a
          fixed 21px line-height, which collapses the line box under vmin-scale
          display type — every scene inherits a unitless leading instead. */}
      <div
        className={`fixed inset-0 select-none overflow-hidden bg-paper leading-[1.15] text-ink ${
          idle ? "cursor-hidden" : ""
        }`}
      >
        <DeckBackground />
        <AnimatePresence initial={false}>
          <motion.div
            key={GROUP[n]}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <Scene n={n} />
          </motion.div>
        </AnimatePresence>
      </div>
    </DeckQuoteProvider>
  );
}
