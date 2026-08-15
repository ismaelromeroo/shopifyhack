"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import NumberFlow from "@number-flow/react";
import { RotateCcw } from "lucide-react";
import { PageBackdrop, SimTag } from "./chrome";
import { LiveTag } from "./live-tag";
import { useQuote, isLive } from "@/lib/use-quote";
import { fmtMoney, oneInLabel } from "@/lib/format";
import type { ClaimOrder } from "@/lib/sim";

type Settle = "pending" | "won" | "lost";

/**
 * The customer claim ticket. Mobile-first; the whole product's emotional
 * payoff lives on this screen. Pending = an open question with live odds;
 * won = the card inverts to ink; lost = the card recedes to grey.
 */
export function ClaimTicket({ order }: { order: ClaimOrder }) {
  const reduced = useReducedMotion();
  const [settle, setSettle] = useState<Settle>("pending");
  // deep-link the settled states: /claim/1042?settle=won.
  // URL must be read post-hydration — a lazy initializer would mismatch SSR.
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("settle");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot URL → state hydration
    if (s === "won" || s === "lost") setSettle(s);
  }, []);
  const q = useQuote({ ticker: "KXMLB-26-NYY" });
  const live = isLive(q) && settle === "pending";
  const midPm = q.data?.market.midPm ?? null;

  const spring = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 220, damping: 20, mass: 1 };

  return (
    <main className="flex min-h-dvh flex-1 flex-col items-center px-5 pb-36 pt-10">
      <PageBackdrop />
      <div className="w-full max-w-[390px]">
        <AnimatePresence mode="wait" initial={false}>
          {settle === "won" ? (
            <motion.div
              key="won"
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.12 } }}
              transition={spring}
              className="rounded-card bg-ink p-7 text-surface shadow-raised"
            >
              <div className="caps-label text-surface/40">Order #{order.id} · settled</div>
              <h1 className="mt-5 text-d2 font-semibold">The Yankees won.</h1>
              <p className="mt-1.5 text-title text-surface/75">Your order was free.</p>
              <div className="mt-8 flex items-baseline gap-3">
                <span className="text-title text-surface/40 line-through tnum">
                  {fmtMoney(order.amountCents)}
                </span>
                <span className="text-d1 font-semibold tnum">
                  <NumberFlow
                    value={0}
                    format={{ style: "currency", currency: "USD" }}
                  />
                </span>
              </div>
              <p className="mt-6 border-t border-surface/15 pt-4 text-caption text-surface/50">
                Refunded in full, automatically. Nothing to do — except maybe tell someone.
              </p>
            </motion.div>
          ) : settle === "lost" ? (
            <motion.div
              key="lost"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              transition={spring}
              className="rounded-card border border-ink/[0.06] bg-g100 p-7 text-g600 shadow-pressed"
            >
              <div className="caps-label text-g400">Order #{order.id} · settled</div>
              <h1 className="mt-5 text-d3 font-medium text-g700">
                The Yankees didn’t win it.
              </h1>
              <p className="mt-1.5 text-body text-g500">
                Your order stands as paid — exactly what you agreed to.
              </p>
              <div className="mt-8 text-d2 font-medium tnum text-g500">
                {fmtMoney(order.amountCents)}
              </div>
              <p className="mt-6 border-t border-ink/[0.06] pt-4 text-caption text-g400">
                There’s always next season.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="pending"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.12 } }}
              transition={spring}
              className="relative rounded-card border border-ink/[0.07] bg-surface p-7 shadow-raised"
            >
              <div className="flex items-baseline justify-between">
                <h1 className="text-title font-semibold">Order #{order.id}</h1>
                <span className="text-caption text-g500">{order.placedAt}</span>
              </div>
              <div className="mt-4 text-d1 font-semibold tnum">
                {fmtMoney(order.amountCents)}
              </div>
              <div className="mt-1 text-caption text-g500">
                {order.items} {order.items === 1 ? "item" : "items"} · paid in full
              </div>

              {/* ticket perforation */}
              <div className="relative my-6">
                <div className="border-t border-dashed border-g300" />
                <span className="absolute -left-[38px] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border border-ink/[0.07] bg-paper" />
                <span className="absolute -right-[38px] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border border-ink/[0.07] bg-paper" />
              </div>

              <div className="caps-label text-g400">This order is riding on</div>
              <p className="mt-1.5 text-h font-medium">
                the Yankees winning the World&nbsp;Series
              </p>
              <p className="mt-1 text-caption text-g500">
                If it happens, this order is refunded in full. Automatically.
              </p>

              <div className="mt-6 flex items-end justify-between rounded-ctl bg-g100 p-4">
                <div>
                  <div className="caps-label text-g400">Right now</div>
                  <div className="mt-1 text-d2 font-semibold tnum" key={midPm ?? "–"}>
                    {midPm != null ? (
                      <span className="value-wash inline-block px-1 -mx-1">
                        <NumberFlow
                          value={midPm / 10_000}
                          format={{
                            style: "percent",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }}
                        />
                      </span>
                    ) : (
                      "—"
                    )}
                  </div>
                  <div className="mt-0.5 text-caption text-g500">
                    {midPm != null ? oneInLabel(midPm) : "fetching the odds…"}
                  </div>
                </div>
                <LiveTag
                  live={live}
                  receivedAt={q.receivedAt}
                  asOf={q.data?.market.asOf ?? null}
                  tick={q.tick}
                />
              </div>

              <div className="mt-5 flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full border border-g400" />
                <span className="text-caption text-g600">
                  Pending — settles with the 2026 World Series
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-between px-1">
          <span className="caps-label text-g400">Covered</span>
          <span className="text-caption text-g400 tnum">KXMLB-26-NYY</span>
        </div>
      </div>

      {/* demo settlement — the one panel that floats over content */}
      <div
        className="fixed inset-x-0 bottom-0 flex justify-center px-4 pb-5 pt-2"
        style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}
      >
        <div className="glass flex max-w-full flex-wrap items-center justify-center gap-2 rounded-ctl px-2.5 py-2 shadow-raised">
          <SimTag>simulated</SimTag>
          {settle === "pending" ? (
            <>
              <button
                onClick={() => setSettle("won")}
                className="rounded-ctl bg-ink px-3 py-1.5 text-caption font-semibold text-surface transition-transform active:scale-95"
              >
                Yankees win
              </button>
              <button
                onClick={() => setSettle("lost")}
                className="rounded-ctl border border-ink/[0.12] bg-surface/60 px-3 py-1.5 text-caption font-medium text-g700 transition-colors hover:bg-surface"
              >
                They don’t
              </button>
            </>
          ) : (
            <button
              onClick={() => setSettle("pending")}
              aria-label="Reset to pending"
              className="flex items-center gap-1.5 rounded-ctl border border-ink/[0.12] bg-surface/60 px-3 py-1.5 text-caption font-medium text-g700 transition-colors hover:bg-surface"
            >
              <RotateCcw size={11} strokeWidth={2.25} />
              reset
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
