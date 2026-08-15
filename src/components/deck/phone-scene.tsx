"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

/**
 * Slide 15 — the customer's phone, showing the REAL claim ticket: the same
 * /claim/1042 page the product serves, embedded 1:1 in a phone frame (390pt
 * design width, scaled to fit). After a held beat it crossfades to the
 * settled deep-link, /claim/1042?settle=won — "The Yankees won. Your order
 * was free." rendered by the product itself, not a mock.
 */
const DESIGN_W = 390;
const DESIGN_H = 844;

export function PhoneScene() {
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setSettled(true), 5600);
    return () => clearTimeout(t);
  }, []);

  const screenRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / DESIGN_W);
    const raf = requestAnimationFrame(update);
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  const frame = (src: string, visible: boolean, key: string) => (
    <motion.div
      key={key}
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.55 }}
      className="pointer-events-none absolute left-0 top-0"
      style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})`, transformOrigin: "top left" }}
      aria-hidden={!visible}
    >
      <iframe
        src={src}
        tabIndex={-1}
        className="h-full w-full border-0"
        title={key}
      />
    </motion.div>
  );

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="relative h-[76vmin] w-[35.1vmin] overflow-hidden rounded-[5vmin] border-[0.4vmin] border-ink/80 bg-surface"
        style={{ boxShadow: "var(--shadow-raised)" }}
      >
        <div ref={screenRef} className="absolute inset-0">
          {scale > 0 && (
            <>
              {frame("/claim/1042", !settled, "claim-live")}
              {frame("/claim/1042?settle=won", settled, "claim-settled")}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
