"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { PanelLabel, SimTag } from "@/components/chrome";
import { MarketRow, useProductMarkets } from "@/components/product/market-menu";
import { OrdersChart } from "@/components/product/orders-chart";
import { useProductQuote, isLive } from "@/lib/product/use-quote";
import {
  contracts,
  fmtInt,
  fmtMoney,
  pmToCentsLabel,
} from "@/lib/format";
import type { Campaign } from "@/lib/product/campaign-store";
import type { MarketCandidate } from "@/lib/payload";

const ORDERS = 100;
const AOV = 200;

export default function ProductConsolePage() {
  const [selection, setSelection] = useState<MarketCandidate | null>(null);
  const [phase, setPhase] = useState<"pick" | "running">("pick");
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [busy, setBusy] = useState(false);
  const [armed, setArmed] = useState(false);
  const campaignRef = useRef(campaign);
  campaignRef.current = campaign;

  useEffect(() => {
    const t = window.setTimeout(() => setArmed(true), 450);
    return () => window.clearTimeout(t);
  }, []);

  const rows = useProductMarkets(ORDERS, AOV);
  const q = useProductQuote(
    selection ? { ticker: selection.ticker, orders: ORDERS, aov: AOV } : null
  );
  const data = q.data;
  const live = isLive(q);

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
          orders: ORDERS,
          aov: AOV,
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

  const fill = useCallback(async () => {
    const c = campaignRef.current;
    if (!c) return;
    const left = c.ordersTarget - c.orderCount;
    if (left <= 0) return;
    setBusy(true);
    try {
      const res = await fetch("/api/product/campaign/tick", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: c.id, n: left }),
      });
      const json = (await res.json()) as { ok: boolean; campaign?: Campaign };
      if (json.ok && json.campaign) setCampaign(json.campaign);
    } finally {
      setBusy(false);
    }
  }, []);

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

  const quote = data?.quote;
  const restingC100 = data?.book.totalAskC100 ?? 0;
  const feasible = data?.feasibility.ok ?? false;
  const title = data?.market.title ?? "";
  const bidPm = data?.market.bidPm ?? null;
  const askPm = data?.market.askPm ?? null;

  return (
    <main className="mx-auto flex w-full max-w-[720px] flex-1 flex-col px-6 pb-16 pt-10 md:px-10">
      <p className="caps-label text-g500">Merchant console</p>
      <h1 className="mt-2 text-d3 font-semibold tracking-tight">Price a promo.</h1>

      <div className="mt-8 rounded-card border border-ink/10 bg-surface shadow-raised">
        <div className="flex items-center gap-1.5 border-b border-ink/[0.08] px-5 py-3">
          <span className="h-2 w-2 rounded-full bg-g300" />
          <span className="h-2 w-2 rounded-full bg-g300" />
          <span className="h-2 w-2 rounded-full bg-g300" />
          <span className="ml-3 caps-label text-g500">Merchant console</span>
        </div>

        <div className="px-5 py-5 font-mono text-body leading-relaxed text-g700">
          {phase === "pick" && (
            <>
              <div className="font-sans">
                <div className="caps-label text-g500">Promotion</div>
                <div className="mt-1 text-title font-medium tracking-tight text-ink">
                  A chance every order is free — pick what it rides on.
                </div>
              </div>

              <div
                className={`mt-4 flex flex-col gap-2 ${armed ? "" : "pointer-events-none"}`}
              >
                {rows.map((row) => (
                  <MarketRow
                    key={row.ticker}
                    row={row}
                    selected={selection?.ticker === row.ticker}
                    dimmed={!!selection && selection.ticker !== row.ticker}
                    onPick={() => {
                      if (!armed) return;
                      setSelection(row);
                    }}
                  />
                ))}
              </div>

              {selection && data && (
                <>
                  <div className="mt-4">
                    <span className="mr-3 text-g400">market</span>
                    <span className="text-ink">{data.market.ticker}</span>
                    {title ? <span className="text-g500"> · {title}</span> : null}
                  </div>
                  <div className="mt-1">
                    <span className="mr-3 text-g400">book</span>
                    <span className="tnum text-ink">
                      {bidPm != null ? pmToCentsLabel(bidPm) : "—"} /{" "}
                      {askPm != null ? pmToCentsLabel(askPm) : "—"}
                    </span>
                    <span className="tnum text-g500">
                      {" "}
                      · {fmtInt(contracts(restingC100))} coupons resting ·{" "}
                      {feasible ? "covers 20,000 ✓" : "too thin — blocked"}
                    </span>
                  </div>
                  {quote && (
                    <div className="mt-4 border-t border-ink/[0.08] pt-4">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="tnum font-sans text-d3 font-bold tracking-tight text-ink">
                          {fmtMoney(quote.allInCents, { round: true })}
                        </span>
                        <span className="text-caption text-g500">all-in</span>
                        {live ? (
                          <span className="ml-auto rounded-ctl bg-ink px-4 py-1.5 font-sans text-caption font-semibold text-paper">
                            Live
                          </span>
                        ) : null}
                      </div>
                      <div className="tnum mt-1 text-caption text-g600">
                        coupons {fmtMoney(quote.premiumCents, { round: true })} ·
                        exchange fee {fmtMoney(quote.exchangeFeeCents, { round: true })}{" "}
                        · our fee {fmtMoney(quote.managementFeeCents, { round: true })}
                      </div>
                    </div>
                  )}
                  {feasible && (
                    <div className="mt-5 flex justify-end">
                      <button
                        type="button"
                        onClick={run}
                        disabled={busy}
                        className="inline-flex h-11 items-center gap-2.5 rounded-ctl bg-ink px-5 text-body font-semibold text-surface shadow-raised disabled:opacity-50"
                      >
                        Run this promo
                        <ArrowRight size={15} strokeWidth={2.5} />
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {phase === "running" && campaign && (
            <RunningBody
              campaign={campaign}
              sentence={selection?.sentence ?? campaign.sentence}
              busy={busy}
              onFill={fill}
              onSettle={settle}
              onEnd={() => {
                setPhase("pick");
                setCampaign(null);
              }}
            />
          )}
        </div>
      </div>
    </main>
  );
}

function RunningBody({
  campaign,
  sentence,
  busy,
  onFill,
  onSettle,
  onEnd,
}: {
  campaign: Campaign;
  sentence: string;
  busy: boolean;
  onFill: () => void;
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
    <div className="space-y-5 font-sans">
      <div className="flex items-center justify-between gap-3">
        <div>
          <PanelLabel>{settled ? "Campaign settled" : "Campaign live"}</PanelLabel>
          <div className="mt-1 text-title font-medium">“{sentence}”</div>
          <div className="mt-0.5 text-caption text-g500 tnum">
            {campaign.ticker} · simulated orders
          </div>
        </div>
        <SimTag>simulated orders</SimTag>
      </div>

      <OrdersChart
        running
        ordersTarget={campaign.ordersTarget}
        aov={campaign.aovCents / 100}
        onDone={onFill}
      />

      {full && !settled && (
        <div>
          <PanelLabel>Settlement</PanelLabel>
          <p className="mt-2 text-body text-g700">
            All {campaign.orderCount} orders are in — fully covered. The season
            ends here.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onSettle("hit")}
              disabled={busy}
              className="rounded-ctl bg-ink px-4 py-2 text-caption font-semibold text-surface"
            >
              They win it
            </button>
            <button
              type="button"
              onClick={() => onSettle("miss")}
              disabled={busy}
              className="rounded-ctl border border-ink/[0.12] px-4 py-2 text-caption font-medium text-g700"
            >
              They don’t
            </button>
          </div>
        </div>
      )}

      {settled && (
        <div>
          <PanelLabel>Either way</PanelLabel>
          <p className="mt-3 text-d3 font-semibold tnum">{fmtMoney(-scaled)}</p>
          <p className="mt-2 text-body text-g600">
            {campaign.outcome === "hit"
              ? "The money arrived the moment the bill did."
              : "Same number in both columns. That was the point."}
          </p>
          <button
            type="button"
            onClick={onEnd}
            className="mt-5 rounded-ctl border border-ink/[0.1] px-3.5 py-2 text-caption font-medium text-g700"
          >
            End demo
          </button>
        </div>
      )}
    </div>
  );
}
