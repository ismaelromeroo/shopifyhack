"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import NumberFlow from "@number-flow/react";
import { ArrowRight, ArrowUpRight, FastForward } from "lucide-react";
import { PageBackdrop, Panel, PanelLabel, SimTag, Wordmark } from "@/components/chrome";
import { BookPanel } from "@/components/book-panel";
import { MarketMenu } from "@/components/market-menu";
import { Verdict } from "@/components/verdict";
import { TrackChart, type TrackPoint } from "@/components/track-chart";
import { useQuote, isLive } from "@/lib/use-quote";
import { resolvePromo } from "@/lib/resolve";
import { mulberry32, orderAmountCents } from "@/lib/sim";
import { fmtMoney } from "@/lib/format";
import type { QuotePayload } from "@/lib/payload";

interface Selection {
  ticker: string;
  /** campaign sentence: "Free if the Yankees win the World Series" */
  sentence: string;
}

interface SimOrderRow {
  id: number;
  amountCents: number;
  at: number; // seconds since start
  covered: boolean;
}

export default function ConsolePage() {
  const reduced = useReducedMotion();
  const [selection, setSelection] = useState<Selection | null>(null);
  const [orders, setOrders] = useState(100);
  const [aov, setAov] = useState(200);
  const [phase, setPhase] = useState<"idle" | "quoted" | "running">("idle");

  const q = useQuote(selection ? { ticker: selection.ticker, orders, aov } : null);
  const live = isLive(q);
  const data = q.data;

  // ── simulated campaign (order arrivals + hedge fills; labelled in the UI) ──
  // Runs on a virtual clock so fast-forward compresses real time while the
  // chart still reads as one continuous campaign. Arrivals stop at the
  // expected order count; then the season settles.
  const [simOrders, setSimOrders] = useState<SimOrderRow[]>([]);
  const [orderCount, setOrderCount] = useState(0);
  const [liabCents, setLiabCents] = useState(0);
  const [covCents, setCovCents] = useState(0);
  const [series, setSeries] = useState<TrackPoint[]>([]);
  const [simDone, setSimDone] = useState(false);
  const [ffwd, setFfwd] = useState(false);
  const [outcome, setOutcome] = useState<"hit" | "miss" | null>(null);
  const speedRef = useRef(1);
  const kickRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (phase !== "running") return;
    const rng = mulberry32(1337);
    const target = orders; // the campaign's expected order count
    let vt = 0; // virtual campaign clock, seconds
    let liab = 0;
    let cov = 0;
    let nextId = 1042;
    let count = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let arrivalTimer: ReturnType<typeof setTimeout> | null = null;
    speedRef.current = 1;

    const scheduleHedge = (final = false) => {
      const tgt = liab;
      const fillVt = vt + 0.6; // fills land before the next arrival (min gap 1.2s)
      timers.push(
        setTimeout(() => {
          cov = Math.max(cov, tgt);
          setCovCents(cov);
          setSimOrders((rows) => rows.map((r) => ({ ...r, covered: true })));
          setSeries((s) => [...s, { t: fillVt, liabCents: liab, covCents: cov }]);
          if (final) setSimDone(true);
        }, 600 * speedRef.current)
      );
    };

    const arrive = () => {
      const gap = 1.2 + rng() * 1.6;
      arrivalTimer = setTimeout(() => {
        vt += gap;
        const amountCents = nextId === 1042 ? 18_000 : orderAmountCents(rng, aov * 100);
        const row: SimOrderRow = { id: nextId++, amountCents, at: vt, covered: false };
        liab += amountCents;
        count += 1;
        setLiabCents(liab);
        setOrderCount(count);
        setSimOrders((rows) => [row, ...rows].slice(0, 8));
        setSeries((s) => [...s, { t: vt, liabCents: liab, covCents: cov }]);
        if (count >= target) {
          scheduleHedge(true); // cover the tail, then the campaign is fully in
        } else {
          // threshold rebalance: fire when uncovered exceeds ~2.5 average orders
          if (liab - cov >= aov * 100 * 2.5) scheduleHedge();
          arrive();
        }
      }, gap * 1000 * speedRef.current);
      timers.push(arrivalTimer);
    };

    // fast-forward: compress real time 50×; re-arm the pending arrival at the
    // new speed so the burst starts immediately
    kickRef.current = () => {
      speedRef.current = 0.02;
      if (arrivalTimer) clearTimeout(arrivalTimer);
      arrive();
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect -- resets the chart at campaign start; keyed to the phase transition
    setSeries([{ t: 0, liabCents: 0, covCents: 0 }]);
    arrive();

    return () => {
      timers.forEach(clearTimeout);
      kickRef.current = null;
      setSimOrders([]);
      setOrderCount(0);
      setLiabCents(0);
      setCovCents(0);
      setSeries([]);
      setSimDone(false);
      setFfwd(false);
      setOutcome(null);
    };
  }, [phase, aov, orders]);

  // deep-link support: /console?promo=… resolves and lands mid-flow;
  // &run=1 goes live. URL must be read post-hydration (SSR has no search).
  const [autoRun, setAutoRun] = useState(false);
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const p = sp.get("promo");
    const r = p ? resolvePromo(p) : null;
    if (r) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot URL → state hydration
      setSelection({
        ticker: r.ticker,
        sentence: `Free if ${r.plain}`,
      });
      setPhase("quoted");
    }
    if (sp.get("run") === "1") setAutoRun(true);
  }, []);
  useEffect(() => {
    if (autoRun && data?.feasibility.ok && phase === "quoted") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- consumes the one-shot autorun flag
      setAutoRun(false);
      setPhase("running");
    }
  }, [autoRun, data, phase]);

  const springIn = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
    transition: reduced
      ? { duration: 0 }
      : { type: "spring" as const, stiffness: 300, damping: 26, delay },
  });

  return (
    <main className="mx-auto w-full max-w-[1180px] flex-1 px-6 py-8 md:px-10">
      <PageBackdrop />
      <header className="flex items-center justify-between">
        <Wordmark sub="Merchant console" />
      </header>

      <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
        {/* ── left: the flow ─────────────────────────────────────────── */}
        <div className="space-y-5">
          {phase !== "running" && (
            <MarketMenu
              orders={orders}
              aov={aov}
              setOrders={setOrders}
              setAov={setAov}
              selectedTicker={selection?.ticker ?? null}
              onSelect={(c) => {
                setSelection({ ticker: c.ticker, sentence: c.sentence });
                setPhase("quoted");
              }}
            />
          )}

          <AnimatePresence mode="popLayout">
            {data && phase === "quoted" && (
              <motion.div key={`flow-${selection?.ticker}`} className="space-y-5">
                {/* 2 · resolution — the trust moment */}
                <motion.div {...springIn(0.05)}>
                  <Panel className="p-6">
                    <div className="flex items-center justify-between">
                      <PanelLabel>Pays out against</PanelLabel>
                      <span className="caps-label text-g400">{data.market.ticker}</span>
                    </div>
                    <blockquote className="mt-3 border-l-2 border-g200 pl-4 text-title font-medium leading-relaxed">
                      {data.market.rules}
                    </blockquote>
                    <p className="mt-3 text-caption text-g500">
                      Settlement terms, verbatim, from the exchange. If this sentence comes
                      true, your customers’ orders are free — and the contracts pay for them.
                    </p>
                  </Panel>
                </motion.div>

                {/* 3 · the quote */}
                <motion.div {...springIn(0.3)}>
                  <QuoteCard data={data} orders={orders} aov={aov} />
                </motion.div>

                {/* 4 · feasibility — the judgement */}
                <motion.div {...springIn(0.7)}>
                  <Verdict f={data.feasibility} q={data.quote} />
                </motion.div>

                {data.feasibility.ok && (
                  <motion.div {...springIn(0.9)} className="flex justify-end">
                    <button
                      onClick={() => setPhase("running")}
                      className="group inline-flex h-11 items-center gap-2.5 rounded-ctl bg-ink px-5 text-body font-semibold text-surface shadow-raised transition-transform active:scale-[0.98]"
                    >
                      Run this promo
                      <ArrowRight
                        size={15}
                        strokeWidth={2.5}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {data && phase === "running" && (
              <motion.div key="running" className="space-y-5" {...springIn(0)}>
                <Panel className="flex items-center justify-between gap-3 p-5">
                  <div className="min-w-0">
                    <PanelLabel>{simDone ? "Campaign complete" : "Campaign live"}</PanelLabel>
                    <div className="mt-1 truncate text-title font-medium">
                      “{selection?.sentence}”
                    </div>
                    <div className="mt-0.5 text-caption text-g500 tnum">
                      {data.market.ticker} · all-in{" "}
                      {(data.quote.effectiveBps / 100).toFixed(1)}% of order value
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {!simDone && !ffwd && (
                      <button
                        onClick={() => {
                          setFfwd(true);
                          kickRef.current?.();
                        }}
                        className="inline-flex items-center gap-1.5 rounded-ctl border border-ink/[0.1] px-3.5 py-2 text-caption font-medium text-g700 transition-colors hover:bg-g100"
                      >
                        <FastForward size={11} strokeWidth={2.25} />
                        Skip to season end
                      </button>
                    )}
                    <button
                      onClick={() => setPhase("quoted")}
                      className="rounded-ctl border border-ink/[0.1] px-3.5 py-2 text-caption font-medium text-g700 transition-colors hover:bg-g100"
                    >
                      End demo
                    </button>
                  </div>
                </Panel>

                {/* settlement — the season ends, and both branches net the same */}
                <AnimatePresence mode="popLayout">
                  {simDone && !outcome && (
                    <motion.div key="settle-q" {...springIn(0)}>
                      <Panel className="p-5">
                        <div className="flex items-center justify-between">
                          <PanelLabel>Settlement</PanelLabel>
                          <SimTag>simulated</SimTag>
                        </div>
                        <p className="mt-2 text-body text-g700">
                          All {orderCount} orders are in — {fmtMoney(liabCents, { round: true })} of
                          liability, fully covered. The season ends here.
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            onClick={() => setOutcome("hit")}
                            className="rounded-ctl bg-ink px-4 py-2 text-caption font-semibold text-surface shadow-pressed transition-transform active:scale-[0.98]"
                          >
                            The Yankees win it
                          </button>
                          <button
                            onClick={() => setOutcome("miss")}
                            className="rounded-ctl border border-ink/[0.12] px-4 py-2 text-caption font-medium text-g700 transition-colors hover:bg-g100"
                          >
                            They don’t
                          </button>
                        </div>
                      </Panel>
                    </motion.div>
                  )}
                  {outcome && (
                    <motion.div
                      key={`settled-${outcome}`}
                      initial={{ opacity: 0, scale: 0.96, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 240, damping: 22, mass: 1.1 }
                      }
                    >
                      <SettlementCard
                        outcome={outcome}
                        liabCents={liabCents}
                        effectiveBps={data.quote.effectiveBps}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 6 · liability vs coverage */}
                <Panel className="p-6">
                  <div className="flex items-center justify-between">
                    <PanelLabel>Liability vs. coverage</PanelLabel>
                    <SimTag>simulated orders</SimTag>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
                    <div>
                      <div className="caps-label text-g400">Liability accrued</div>
                      <div className="mt-1 text-d3 font-semibold tnum">
                        <NumberFlow
                          value={liabCents / 100}
                          format={{ style: "currency", currency: "USD" }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="caps-label text-g400">Hedge coverage</div>
                      <div className="mt-1 text-d3 font-medium tnum text-g600">
                        <NumberFlow
                          value={covCents / 100}
                          format={{ style: "currency", currency: "USD" }}
                        />
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="caps-label text-g400">Uncovered</div>
                      <div className="mt-1 text-d3 font-medium tnum text-g400">
                        <NumberFlow
                          value={Math.max(0, liabCents - covCents) / 100}
                          format={{ style: "currency", currency: "USD" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5">
                    <TrackChart series={series} />
                  </div>
                </Panel>

                {/* order feed */}
                <Panel className="p-6">
                  <div className="flex items-center justify-between">
                    <PanelLabel>
                      Orders · <span className="tnum">{orderCount}</span> of{" "}
                      <span className="tnum">{orders}</span>
                    </PanelLabel>
                    <SimTag>simulated</SimTag>
                  </div>
                  <div className="mt-3 space-y-px">
                    <AnimatePresence initial={false}>
                      {simOrders.map((o) => (
                        <motion.div
                          key={o.id}
                          initial={reduced ? false : { opacity: 0, y: -10, scale: 0.99 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          className="flex h-9 items-center justify-between rounded-[3px] px-2"
                        >
                          <span className="flex items-center gap-3">
                            <span className="text-caption text-g500 tnum">#{o.id}</span>
                            <span className="text-body font-medium tnum">
                              {fmtMoney(o.amountCents)}
                            </span>
                          </span>
                          <span className="flex items-center gap-2 text-caption text-g500">
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                o.covered ? "bg-ink" : "border border-g400"
                              }`}
                            />
                            {o.covered ? "hedged" : "hedging"}
                          </span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {simOrders.length === 0 && (
                      <div className="py-6 text-center text-caption text-g400">
                        waiting for the first order…
                      </div>
                    )}
                  </div>
                </Panel>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── right: the live market ─────────────────────────────────── */}
        <div className="space-y-5 lg:sticky lg:top-8">
          <AnimatePresence>
            {data && (
              <motion.div key={`book-${data.market.ticker}`} {...springIn(0.18)}>
                <BookPanel data={data} live={live} receivedAt={q.receivedAt} tick={q.tick} />
              </motion.div>
            )}
            {data && phase === "running" && (
              <motion.div key="claimlink" {...springIn(0.4)}>
                <Link href="/claim/1042" className="block">
                  <Panel className="group flex items-center justify-between p-5 transition-shadow hover:shadow-raised">
                    <div>
                      <PanelLabel>Customer view</PanelLabel>
                      <div className="mt-1 text-body font-medium">
                        What order&nbsp;#1042 sees right now
                      </div>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-g400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Panel>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

/* ── settlement: the payoff table — both branches net the same ──────────── */

function SettlementCard({
  outcome,
  liabCents,
  effectiveBps,
}: {
  outcome: "hit" | "miss";
  liabCents: number;
  effectiveBps: number;
}) {
  const hit = outcome === "hit";
  const coverageCost = Math.round((liabCents * effectiveBps) / 10_000);
  const money = (cents: number) =>
    cents === 0 ? "$0" : `${cents < 0 ? "−" : "+"}${fmtMoney(Math.abs(cents))}`;
  const branch = (fires: boolean) => [
    { label: "Refunds to customers", cents: fires ? -liabCents : 0 },
    { label: "Hedge payout", cents: fires ? liabCents : 0 },
    { label: "Coverage cost, upfront", cents: -coverageCost },
  ];
  return (
    <Panel raised className="p-6">
      <div className="flex items-center justify-between">
        <PanelLabel>Settled</PanelLabel>
        <Link
          href={`/claim/1042?settle=${hit ? "won" : "lost"}`}
          className="inline-flex items-center gap-1 text-caption font-medium text-g700 hover:text-ink"
        >
          Customer #1042’s ticket
          <ArrowUpRight size={12} strokeWidth={2.25} />
        </Link>
      </div>
      <div className="mt-2 text-title font-semibold">
        {hit ? "The Yankees won. Every order refunds." : "They didn’t win it. No refunds owed."}
      </div>

      {/* both branches, side by side — the one that happened carries the ink */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {([true, false] as const).map((fires) => {
          const happened = fires === hit;
          return (
            <div
              key={String(fires)}
              className={`rounded-ctl p-4 ${
                happened ? "bg-ink text-surface shadow-pressed" : "bg-g100 text-g600"
              }`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className={`caps-label ${happened ? "text-surface/50" : "text-g400"}`}>
                  {fires ? "They win it" : "They don’t"}
                </span>
                <span className={`text-caption ${happened ? "text-surface/60" : "text-g400"}`}>
                  {happened ? "what happened" : "the other branch"}
                </span>
              </div>
              <div className="mt-3 space-y-1.5">
                {branch(fires).map((r) => (
                  <div key={r.label} className="flex items-baseline justify-between gap-3">
                    <span
                      className={`text-caption ${happened ? "text-surface/65" : "text-g500"}`}
                    >
                      {r.label}
                    </span>
                    <span className="text-caption font-medium tnum">{money(r.cents)}</span>
                  </div>
                ))}
                <div
                  className={`border-t pt-1.5 ${happened ? "border-surface/15" : "border-ink/[0.08]"}`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-body font-semibold">Net</span>
                    <span className="text-body font-semibold tnum">{money(-coverageCost)}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2 border-t border-ink/[0.06] pt-3">
        <span className="text-body font-semibold tnum">
          Either way: {money(-coverageCost)}.
        </span>
        <span className="text-caption text-g500">
          {hit
            ? "The money arrived the moment the bill did — the uncertainty was already gone."
            : "Same number in both columns. That was the point."}
        </span>
      </div>
    </Panel>
  );
}

/* ── the quote: one all-in number, never a bare probability ─────────────── */

function QuoteCard({
  data,
  orders,
  aov,
}: {
  data: QuotePayload;
  orders: number;
  aov: number;
}) {
  const { quote, feasibility } = data;
  // a partial fill has no honest all-in number — say so and let the verdict speak
  if (feasibility.reason === "insufficient_depth" || feasibility.reason === "no_quote") {
    return (
      <Panel className="p-6">
        <PanelLabel>Quote</PanelLabel>
        <div className="mt-4 flex items-baseline gap-4">
          <span className="text-d1 font-semibold text-g300">—</span>
          <span className="text-title text-g500">no all-in quote for this book</span>
        </div>
        <p className="mt-2 max-w-md text-caption text-g500">
          A quote is only real if the whole promotion can be covered at it. This book can
          fill {Math.round((quote.contractsC100 / Math.max(1, feasibility.neededC100)) * 100)}%
          of what this campaign needs. Shrink the campaign in the promotion panel, or pick
          a deeper market — the verdict below has the numbers.
        </p>
      </Panel>
    );
  }
  const lines = [
    { label: "Promo budget — the coverage itself", cents: quote.premiumCents },
    { label: "Exchange fee", cents: quote.exchangeFeeCents },
    { label: "Our management fee — 10% of the budget", cents: quote.managementFeeCents },
  ];
  return (
    <Panel className="p-6">
      <PanelLabel>Quote</PanelLabel>
      <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="text-d1 font-semibold tnum">
          <NumberFlow
            value={quote.effectiveBps / 10_000}
            format={{ style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1 }}
          />
        </span>
        <span className="text-title text-g600">
          — the same spend as running a{" "}
          <span className="font-semibold text-ink tnum">
            {(quote.effectiveBps / 100).toFixed(1)}% off
          </span>{" "}
          sale
        </span>
      </div>
      <p className="mt-1 text-caption text-g500">
        all-in, as a share of expected order value — fixed the moment you start
      </p>

      <div className="mt-5 space-y-2.5">
        {lines.map((l) => (
          <div key={l.label} className="flex items-baseline justify-between gap-4">
            <span className="text-body text-g600">{l.label}</span>
            <span className="text-body font-medium tnum">
              <NumberFlow
                value={l.cents / 100}
                format={{ style: "currency", currency: "USD" }}
              />
            </span>
          </div>
        ))}
        <div className="border-t border-ink/[0.08] pt-2.5">
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-body font-semibold">All-in</span>
            <span className="text-body font-semibold tnum">
              <NumberFlow
                value={quote.allInCents / 100}
                format={{ style: "currency", currency: "USD" }}
              />
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-ink/[0.06] pt-4">
        <span className="text-caption text-g600 tnum">
          for {orders.toLocaleString()} orders × ${aov} average
        </span>
        <span className="text-caption text-g400">repriced against the live book every 10s</span>
      </div>
    </Panel>
  );
}
