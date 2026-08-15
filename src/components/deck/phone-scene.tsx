"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

/**
 * Slide 16 — the customer's claim ticket: the REAL /claim/1042 page the
 * product serves, embedded at its 390pt design width and scaled up. No
 * phone bezel (per review) — the page's own paper background matches the
 * deck's, so the ticket card floats on the slide. After a held beat it
 * crossfades to /claim/1042?settle=won — "The Yankees won. Your order was
 * free." rendered by the product itself, not a mock.
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
      style={{
        width: DESIGN_W,
        height: DESIGN_H,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-[86vmin] w-[39.7vmin] overflow-hidden"
      >
        <div ref={screenRef} className="absolute inset-0">
          {scale > 0 && (
            <>
              {frame("/claim/1042", !settled, "claim-live")}
              {frame("/claim/1042?settle=won", settled, "claim-settled")}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
