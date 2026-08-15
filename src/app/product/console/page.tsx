"use client";
import { useState } from "react";
import NumberFlow from "@number-flow/react";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Panel, PanelLabel, SimTag } from "@/components/chrome";
import { BookPanel } from "@/components/book-panel";
import { Verdict } from "@/components/verdict";
import { ProductMarketMenu } from "@/components/product/market-menu";
import { OrdersChart } from "@/components/product/orders-chart";
import { EASE } from "@/components/deck/primitives";
import { useProductQuote, isLive, type ProductQuotePayload } from "@/lib/product/use-quote";
import { fmtMoney } from "@/lib/format";
import type { Campaign } from "@/lib/product/campaign-store";
import type { MarketCandidate } from "@/lib/payload";

export default function ProductConsolePage() {
  const rm = useReducedMotion();
  const [selection, setSelection] = useState<{ ticker: string; sentence: string } | null>(null);
  const [orders, setOrders] = useState(100);
  const [aov, setAov] = useState(200);
  const [phase, setPhase] = useState<"idle" | "quoted" | "running">("idle");
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [busy, setBusy] = useState(false);

  const q = useProductQuote(selection ? { ticker: selection.ticker, orders, aov } : null);
  const live = isLive(q);
  const data = q.data;

  const run = async () => {
    if (!selection || !data?.feasibility.ok) return;
    setBusy(true);
    try {
      const res = await fetch("/api/product/campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticker: selection.ticker,
          sentence: selection.sentence,
          orders,
          aov,
        }),
      });
      const json = (await res.json()) as { ok: boolean; campaign?: Campaign };
      if (json.ok && json.campaign) {
        setCampaign(json.campaign);
        setPhase("running");
      }
    } finally {
      setBusy(false);
    }
  };

  const tick = async () => {
    if (!campaign) return;
    setBusy(true);
    try {
      const res = await fetch("/api/product/campaign/tick", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: campaign.id }),
      });
      const json = (await res.json()) as { ok: boolean; campaign?: Campaign };
      if (json.ok && json.campaign) setCampaign(json.campaign);
    } finally {
      setBusy(false);
    }
  };

  const settle = async (outcome: "hit" | "miss") => {
    if (!campaign) return;
    setBusy(true);
    try {
      const res = await fetch("/api/product/campaign/settle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: campaign.id, outcome }),
      });
      const json = (await res.json()) as { ok: boolean; campaign?: Campaign };
      if (json.ok && json.campaign) setCampaign(json.campaign);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-[1180px] flex-1 px-6 pb-16 pt-10 md:px-10">
      <p className="caps-label text-g500">Merchant console</p>
      <h1 className="mt-2 text-d3 font-semibold tracking-tight">Price a promo.</h1>

      <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div className="space-y-5">
          {phase !== "running" && (
            <ProductMarketMenu
              orders={orders}
              aov={aov}
              setOrders={setOrders}
              setAov={setAov}
              selectedTicker={selection?.ticker ?? null}
              onSelect={(c: MarketCandidate) => {
                setSelection({ ticker: c.ticker, sentence: c.sentence });
                setPhase("quoted");
              }}
            />
          )}

          {data && phase === "quoted" && (
            <motion.div
              initial={rm ? false : { y: 8 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: rm ? 0 : 0.5, ease: EASE }}
              className="space-y-5"
            >
              <Panel className="p-6">
                <div className="flex items-center justify-between">
                  <PanelLabel>Pays out against</PanelLabel>
                  <span className="caps-label text-g400">{data.market.ticker}</span>
                </div>
                <blockquote className="mt-3 border-l-2 border-g200 pl-4 text-title font-medium leading-relaxed">
                  {data.market.rules}
                </blockquote>
                <p className="mt-3 text-caption text-g500">
                  Settlement terms, verbatim. If this sentence comes true, the
                  orders are free — and the coupons pay for them.
                </p>
              </Panel>

              <QuoteCard data={data} orders={orders} aov={aov} />
              <Verdict f={data.feasibility} q={data.quote} />

              {data.feasibility.ok && (
                <div className="flex justify-end">
                  <button
                    onClick={run}
                    disabled={busy}
                    className="inline-flex h-11 items-center gap-2.5 rounded-ctl bg-ink px-5 text-body font-semibold text-surface shadow-raised transition-transform active:scale-[0.98] disabled:opacity-50"
                  >
                    Run this promo
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {campaign && phase === "running" && (
            <RunningPanel
              campaign={campaign}
              sentence={selection?.sentence ?? campaign.sentence}
              busy={busy}
              onTick={tick}
              onSettle={settle}
              onEnd={() => {
                setPhase("quoted");
                setCampaign(null);
              }}
            />
          )}
        </div>

        {data && (
          <motion.div
            initial={rm ? false : { y: 8 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: rm ? 0 : 0.5, delay: rm ? 0 : 0.15, ease: EASE }}
          >
            <BookPanel data={data} live={live} receivedAt={q.receivedAt} tick={q.tick} />
          </motion.div>
        )}
      </div>
    </main>
  );
}

function QuoteCard({
  data,
  orders,
  aov,
}: {
  data: ProductQuotePayload;
  orders: number;
  aov: number;
}) {
  const { quote, feasibility, view } = data;
  if (feasibility.reason === "insufficient_depth" || feasibility.reason === "no_quote") {
    return (
      <Panel className="p-6">
        <PanelLabel>Quote</PanelLabel>
        <div className="mt-4 text-d1 font-semibold text-g300">—</div>
        <p className="mt-2 text-caption text-g500">
          No all-in number until the book can cover the whole promo.
        </p>
      </Panel>
    );
  }

  const liftPct =
    Number.isFinite(view.requiredLift) ? (view.requiredLift * 100).toFixed(1) : "—";

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
          the same spend as a{" "}
          <span className="font-semibold text-ink tnum">
            {(view.flatDiscountBps / 100).toFixed(1)}% off
          </span>{" "}
          sale
        </span>
      </div>
      <p className="mt-2 text-body text-g700">
        Needs about <span className="font-semibold tnum">{liftPct}%</span> more
        orders than that sale to come out ahead.
      </p>

      <div className="mt-5 space-y-2.5">
        {lines.map((l) => (
          <div key={l.label} className="flex items-baseline justify-between gap-4">
            <span className="text-body text-g600">{l.label}</span>
            <span className="text-body font-medium tnum">{fmtMoney(l.cents)}</span>
          </div>
        ))}
        <div className="flex items-baseline justify-between gap-4 border-t border-ink/[0.08] pt-2.5">
          <span className="text-body font-semibold">All-in</span>
          <span className="text-body font-semibold tnum">{fmtMoney(quote.allInCents)}</span>
        </div>
      </div>
      <p className="mt-4 text-caption text-g500 tnum">
        for {orders.toLocaleString()} orders × ${aov} average
      </p>
    </Panel>
  );
}

function RunningPanel({
  campaign,
  sentence,
  busy,
  onTick,
  onSettle,
  onEnd,
}: {
  campaign: Campaign;
  sentence: string;
  busy: boolean;
  onTick: () => void;
  onSettle: (o: "hit" | "miss") => void;
  onEnd: () => void;
}) {
  const full = campaign.orderCount >= campaign.ordersTarget;
  const settled = campaign.status === "settled";
  const allIn = campaign.quote.allInCents;
  const scaled =
    campaign.ordersTarget > 0
      ? Math.round((allIn * campaign.orderCount) / campaign.ordersTarget)
      : 0;

  return (
    <div className="space-y-5">
      <Panel className="p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <PanelLabel>{settled ? "Campaign settled" : "Campaign live"}</PanelLabel>
            <div className="mt-1 text-title font-medium">“{sentence}”</div>
            <div className="mt-0.5 text-caption text-g500 tnum">
              {campaign.ticker} · {campaign.orderCount} / {campaign.ordersTarget} orders
            </div>
          </div>
          <SimTag>simulated orders</SimTag>
        </div>
      </Panel>

      <Panel className="p-6">
        <PanelLabel>Liability vs. coverage</PanelLabel>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <div className="caps-label text-g400">Liability</div>
            <div className="mt-1 text-d3 font-semibold tnum">
              {fmtMoney(campaign.liabilityCents, { round: true })}
            </div>
          </div>
          <div>
            <div className="caps-label text-g400">Covered</div>
            <div className="mt-1 text-d3 font-semibold tnum">
              {fmtMoney(campaign.coverageCents, { round: true })}
            </div>
          </div>
        </div>
        <OrdersChart
          running={!settled}
          ordersTarget={campaign.ordersTarget}
          aov={campaign.aovCents / 100}
        />
      </Panel>

      {!settled && !full && (
        <button
          onClick={onTick}
          disabled={busy}
          className="h-11 rounded-ctl bg-ink px-5 text-body font-semibold text-surface shadow-raised disabled:opacity-50"
        >
          Next order
        </button>
      )}

      {!settled && full && (
        <Panel className="p-5">
          <PanelLabel>Settlement</PanelLabel>
          <p className="mt-2 text-body text-g700">
            All {campaign.orderCount} orders are in — fully covered. The season ends here.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => onSettle("hit")}
              disabled={busy}
              className="rounded-ctl bg-ink px-4 py-2 text-caption font-semibold text-surface"
            >
              They win it
            </button>
            <button
              onClick={() => onSettle("miss")}
              disabled={busy}
              className="rounded-ctl border border-ink/[0.12] px-4 py-2 text-caption font-medium text-g700"
            >
              They don’t
            </button>
          </div>
        </Panel>
      )}

      {settled && (
        <Panel className="p-6">
          <PanelLabel>Either way</PanelLabel>
          <p className="mt-3 text-d3 font-semibold tnum">{fmtMoney(-scaled)}</p>
          <p className="mt-2 text-body text-g600">
            {campaign.outcome === "hit"
              ? "The money arrived the moment the bill did."
              : "Same number in both columns. That was the point."}
          </p>
          <button
            onClick={onEnd}
            className="mt-5 rounded-ctl border border-ink/[0.1] px-3.5 py-2 text-caption font-medium text-g700"
          >
            End demo
          </button>
        </Panel>
      )}
    </div>
  );
}
