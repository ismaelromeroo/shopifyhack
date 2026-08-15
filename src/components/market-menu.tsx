"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { Panel, PanelLabel } from "./chrome";
import { contracts, fmtInt, pmToCentsLabel, oneInLabel } from "@/lib/format";
import type { MarketCandidate, MarketsPayload } from "@/lib/payload";

/**
 * The market picker. Every row is a real market whose book has actually been
 * walked against this campaign's size — the all-in price is shown when it
 * covers, and the real reason when it doesn't. Local teams pin to the top.
 */
export function MarketMenu({
  orders,
  aov,
  setOrders,
  setAov,
  selectedTicker,
  onSelect,
}: {
  orders: number;
  aov: number;
  setOrders: (n: number) => void;
  setAov: (n: number) => void;
  selectedTicker: string | null;
  onSelect: (c: MarketCandidate) => void;
}) {
  const reduced = useReducedMotion();
  const [data, setData] = useState<MarketsPayload | null>(null);
  // null = auto: collapsed whenever something is selected
  const [expandedState, setExpandedState] = useState<boolean | null>(null);
  const expanded = expandedState ?? selectedTicker == null;
  const selection = data?.candidates.find((c) => c.ticker === selectedTicker) ?? null;

  useEffect(() => {
    let stop = false;
    (async () => {
      try {
        const res = await fetch(`/api/markets?orders=${orders}&aov=${aov}`, {
          cache: "no-store",
        });
        const json = (await res.json()) as MarketsPayload;
        if (!stop && json.ok) setData(json);
      } catch {
        /* keep the previous menu on a failed refresh */
      }
    })();
    return () => {
      stop = true;
    };
  }, [orders, aov]);

  const local = data?.candidates.filter((c) => c.local) ?? [];
  const elsewhere = data?.candidates.filter((c) => !c.local) ?? [];

  return (
    <Panel className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <PanelLabel>Promotion</PanelLabel>
          <p className="mt-1 text-title font-medium">
            A chance every order is free — pick what it rides on.
          </p>
        </div>
        <div className="flex items-center gap-4 text-caption text-g600">
          <Stepper value={orders} onChange={setOrders} step={25} min={25} max={5000} label="orders" />
          <span className="text-g300">×</span>
          <Stepper value={aov} onChange={setAov} step={25} min={25} max={2000} label="avg order" money />
        </div>
      </div>

      {!data && (
        <div className="mt-5 py-8 text-center text-caption text-g400">
          walking the books for your size…
        </div>
      )}

      {data && !expanded && selection && (
        <div className="mt-4">
          <CandidateRow
            c={selection}
            selected
            onPick={() => {}}
            reduced={!!reduced}
            neededC100={data.neededC100}
          />
          <button
            onClick={() => setExpandedState(true)}
            className="mt-3 rounded-ctl border border-ink/[0.1] px-3 py-1.5 text-caption font-medium text-g700 transition-colors hover:bg-g100"
          >
            Change market
          </button>
        </div>
      )}

      {data && (expanded || !selection) && (
        <div className="mt-5 space-y-4">
          <MenuGroup
            title="Near your store — New York"
            rows={local}
            selection={selection}
            reduced={!!reduced}
            neededC100={data.neededC100}
            onPick={(c) => {
              onSelect(c);
              setExpandedState(false);
            }}
          />
          <MenuGroup
            title="Deep books elsewhere"
            rows={elsewhere}
            selection={selection}
            reduced={!!reduced}
            neededC100={data.neededC100}
            onPick={(c) => {
              onSelect(c);
              setExpandedState(false);
            }}
          />
          <p className="border-t border-ink/[0.06] pt-3 text-caption text-g400">
            Each option is priced by walking its live order book against your{" "}
            {fmtInt(orders)} × ${aov} campaign — thin books say so.
          </p>
        </div>
      )}
    </Panel>
  );
}

function MenuGroup({
  title,
  rows,
  selection,
  onPick,
  reduced,
  neededC100,
}: {
  title: string;
  rows: MarketCandidate[];
  selection: MarketCandidate | null;
  onPick: (c: MarketCandidate) => void;
  reduced: boolean;
  neededC100: number;
}) {
  if (rows.length === 0) return null;
  return (
    <div>
      <div className="caps-label text-g400">{title}</div>
      <div className="mt-2 space-y-1.5">
        {rows.map((c) => (
          <CandidateRow
            key={c.ticker}
            c={c}
            selected={selection?.ticker === c.ticker}
            onPick={() => onPick(c)}
            reduced={reduced}
            neededC100={neededC100}
          />
        ))}
      </div>
    </div>
  );
}

function CandidateRow({
  c,
  selected,
  onPick,
  reduced,
  neededC100,
}: {
  c: MarketCandidate;
  selected: boolean;
  onPick: () => void;
  reduced: boolean;
  neededC100: number;
}) {
  return (
    <motion.button
      onClick={onPick}
      initial={false}
      whileTap={reduced ? undefined : { scale: 0.995 }}
      className={`flex w-full items-center justify-between gap-4 rounded-ctl border px-3.5 py-3 text-left transition-colors ${
        selected
          ? "border-ink bg-ink/[0.03]"
          : c.canCover
            ? "border-ink/[0.08] hover:bg-g100"
            : "border-dashed border-g300 hover:bg-g100"
      }`}
    >
      <span className="flex min-w-0 items-center gap-3">
        <span
          className={`h-2 w-2 shrink-0 rounded-full ${
            selected ? "bg-ink" : "border border-g400"
          }`}
        />
        <span className="min-w-0">
          <span className={`block truncate text-body font-medium ${c.canCover ? "" : "text-g500"}`}>
            {c.label}
          </span>
          <span className="mt-0.5 block text-caption text-g500 tnum">
            {c.midPm != null
              ? `${pmToCentsLabel(c.midPm)} · ${oneInLabel(c.midPm) ?? ""}`
              : "no live quote"}
            {" · "}
            {c.ticker}
          </span>
        </span>
      </span>
      <span className="shrink-0 text-right">
        {c.canCover && c.effectiveBps != null ? (
          <>
            <span className="block text-body font-semibold tnum">
              {(c.effectiveBps / 100).toFixed(1)}% all-in
            </span>
            <span className="block text-caption text-g500 tnum">
              {fmtInt(contracts(c.depthC100))} resting
            </span>
          </>
        ) : (
          <>
            <span className="block text-caption font-medium text-g500">
              {c.reason === "insufficient_depth"
                ? "book too thin for your size"
                : c.reason === "spread_too_wide"
                  ? "spread too wide"
                  : c.reason === "position_limit"
                    ? "over position limit"
                    : "no two-sided quote"}
            </span>
            <span className="block text-caption text-g400 tnum">
              {c.reason === "insufficient_depth"
                ? `${fmtInt(contracts(c.depthC100))} of ${fmtInt(contracts(neededC100))} needed`
                : c.spreadPm != null
                  ? `${pmToCentsLabel(c.spreadPm)} spread`
                  : ""}
            </span>
          </>
        )}
      </span>
    </motion.button>
  );
}

function Stepper({
  value,
  onChange,
  step,
  min,
  max,
  label,
  money = false,
}: {
  value: number;
  onChange: (n: number) => void;
  step: number;
  min: number;
  max: number;
  label: string;
  money?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <button
        aria-label={`decrease ${label}`}
        onClick={() => onChange(Math.max(min, value - step))}
        className="flex h-5 w-5 items-center justify-center rounded-[4px] border border-ink/[0.1] text-g500 transition-colors hover:bg-g100"
      >
        <Minus size={10} strokeWidth={2.5} />
      </button>
      <span className="min-w-[3.5em] text-center font-medium text-ink tnum">
        {money ? `$${value}` : value.toLocaleString()}
      </span>
      <button
        aria-label={`increase ${label}`}
        onClick={() => onChange(Math.min(max, value + step))}
        className="flex h-5 w-5 items-center justify-center rounded-[4px] border border-ink/[0.1] text-g500 transition-colors hover:bg-g100"
      >
        <Plus size={10} strokeWidth={2.5} />
      </button>
      <span className="text-g500">{label}</span>
    </span>
  );
}
