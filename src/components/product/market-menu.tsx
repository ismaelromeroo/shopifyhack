"use client";
import { useEffect, useState } from "react";
import { contracts, fmtInt, oneInLabel, pmToCentsLabel } from "@/lib/format";
import type { MarketCandidate, MarketsPayload } from "@/lib/payload";

const ROW_PREFERENCE = [
  "KXMLB-26-NYY",
  "KXMLBPLAYOFFS-26-NYY",
  "KXMLB-26-LAD",
  "KXMLB-26-BOS",
];

const FALLBACK: MarketCandidate[] = [
  {
    ticker: "KXMLB-26-NYY",
    team: { code: "NYY", city: "New York", nickname: "Yankees" },
    trigger: "world_series",
    label: "the Yankees win the World Series",
    sentence: "Free if the Yankees win the World Series",
    local: true,
    midPm: 1050,
    askPm: 1070,
    spreadPm: 40,
    depthC100: 147_869_456,
    canCover: true,
    reason: "ok",
    nearCertainty: false,
    effectiveBps: 1263,
    live: false,
  },
  {
    ticker: "KXMLBPLAYOFFS-26-NYY",
    team: { code: "NYY", city: "New York", nickname: "Yankees" },
    trigger: "playoffs",
    label: "the Yankees make the playoffs",
    sentence: "Free if the Yankees make the playoffs",
    local: true,
    midPm: 9700,
    askPm: 9800,
    spreadPm: 200,
    depthC100: 140_209,
    canCover: false,
    reason: "insufficient_depth",
    nearCertainty: true,
    effectiveBps: null,
    live: false,
  },
  {
    ticker: "KXMLB-26-LAD",
    team: { code: "LAD", city: "Los Angeles", nickname: "Dodgers" },
    trigger: "world_series",
    label: "the Dodgers win the World Series",
    sentence: "Free if the Dodgers win the World Series",
    local: false,
    midPm: 3625,
    askPm: 3700,
    spreadPm: 150,
    depthC100: 98_000_000,
    canCover: true,
    reason: "ok",
    nearCertainty: false,
    effectiveBps: 4201,
    live: false,
  },
  {
    ticker: "KXMLB-26-BOS",
    team: { code: "BOS", city: "Boston", nickname: "Red Sox" },
    trigger: "world_series",
    label: "the Red Sox win the World Series",
    sentence: "Free if the Red Sox win the World Series",
    local: false,
    midPm: 525,
    askPm: 550,
    spreadPm: 50,
    depthC100: 120_000_000,
    canCover: true,
    reason: "ok",
    nearCertainty: false,
    effectiveBps: 684,
    live: false,
  },
];

function pickRows(candidates: MarketCandidate[]): MarketCandidate[] {
  const byTicker = new Map(candidates.map((c) => [c.ticker, c]));
  const preferred = ROW_PREFERENCE.map((t) => byTicker.get(t)).filter(
    (c): c is MarketCandidate => !!c
  );
  const rest = candidates.filter((c) => !ROW_PREFERENCE.includes(c.ticker));
  return [...preferred, ...rest].slice(0, 4);
}

function reasonLabel(reason: string): string {
  switch (reason) {
    case "insufficient_depth":
      return "book too thin for this size";
    case "spread_too_wide":
      return "spread too wide";
    case "position_limit":
      return "over position limit";
    default:
      return "no two-sided quote";
  }
}

export function useProductMarkets(orders: number, aov: number) {
  const [rows, setRows] = useState<MarketCandidate[]>(FALLBACK);
  useEffect(() => {
    let stop = false;
    (async () => {
      try {
        const res = await fetch(`/api/product/markets?orders=${orders}&aov=${aov}`, {
          cache: "no-store",
        });
        const json = (await res.json()) as MarketsPayload | { ok: false };
        if (!stop && json.ok) setRows(pickRows(json.candidates));
      } catch {
        /* keep fallback */
      }
    })();
    return () => {
      stop = true;
    };
  }, [orders, aov]);
  return rows;
}

export function MarketRow({
  row,
  selected,
  dimmed,
  onPick,
}: {
  row: MarketCandidate;
  selected: boolean;
  dimmed?: boolean;
  onPick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPick}
      className={`relative flex w-full items-center justify-between gap-3 rounded-ctl border px-3.5 py-2.5 text-left ${
        selected ? "border-ink" : "border-ink/10"
      } ${dimmed ? "opacity-40" : ""}`}
    >
      <span className="flex min-w-0 items-center gap-3">
        <span
          className={`h-2 w-2 shrink-0 rounded-full ${
            selected ? "bg-ink" : "border border-g400"
          }`}
        />
        <span className="min-w-0">
          <span
            className={`block truncate font-sans text-body font-medium tracking-tight ${
              row.canCover ? "text-ink" : "text-g500"
            }`}
          >
            {row.label}
          </span>
          <span className="tnum block text-caption text-g500">
            {row.midPm != null
              ? `${pmToCentsLabel(row.midPm)} · ${oneInLabel(row.midPm) ?? ""}`
              : "no live quote"}
          </span>
        </span>
      </span>
      <span className="tnum shrink-0 text-right">
        {row.canCover && row.effectiveBps != null ? (
          <>
            <span className="block font-sans text-body font-semibold">
              {(row.effectiveBps / 100).toFixed(1)}% all-in
            </span>
            <span className="block text-caption text-g500">
              {fmtInt(contracts(row.depthC100))} resting
            </span>
          </>
        ) : (
          <span className="block text-caption font-medium text-g500">
            {reasonLabel(row.reason)}
          </span>
        )}
      </span>
      {selected && <span className="relative font-sans text-body text-ink">✓</span>}
    </button>
  );
}
