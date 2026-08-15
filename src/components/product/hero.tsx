"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/components/deck/primitives";

const SNAP_Y = [0.22, 1.45, 0.36, 1] as const;

function SnapIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const rm = useReducedMotion();
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        initial={rm ? false : { y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={
          rm
            ? { duration: 0 }
            : {
                y: { duration: 0.18, delay, ease: SNAP_Y },
                opacity: { duration: 0.12, delay, ease: "easeOut" },
              }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}

export function Hero() {
  const rm = useReducedMotion();

  return (
    <section className="relative min-h-[calc(100dvh-5rem)] overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/backdrop.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover grayscale"
        style={{ objectPosition: "50% 42%" }}
      />
      <div className="absolute inset-0 bg-paper/30" />

      <div className="relative flex min-h-[calc(100dvh-5rem)] items-center justify-center px-6">
        <div
          className="w-full max-w-2xl rounded-card border border-white/50 px-8 py-12 text-center md:px-14 md:py-16"
          style={{
            background: "rgba(255,255,255,0.42)",
            backdropFilter: "blur(26px) saturate(120%)",
            WebkitBackdropFilter: "blur(26px) saturate(120%)",
            boxShadow: "var(--shadow-raised)",
          }}
        >
          <SnapIn>
            <h1 className="text-d1 font-semibold tracking-tight md:text-d0">
              Covered
            </h1>
          </SnapIn>

          <SnapIn className="mt-5" delay={rm ? 0 : 0.28}>
            <p className="text-h text-g800 md:text-d3">
              Same discount. Different shape.
            </p>
          </SnapIn>

          <SnapIn className="mt-5" delay={rm ? 0 : 0.42}>
            <p className="caps-label text-g500">how a promo gets a price.</p>
          </SnapIn>
        </div>
      </div>
    </section>
  );
}

export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const rm = useReducedMotion();
  return (
    <motion.div
      initial={rm ? false : { opacity: 0, y: "0.35em" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: rm ? 0 : 0.7, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
