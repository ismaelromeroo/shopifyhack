"use client";
import NumberFlow from "@number-flow/react";
import { Panel, PanelLabel } from "./chrome";
import { LiveTag } from "./live-tag";
import { contracts, fmtInt, pmToCentsLabel } from "@/lib/format";
import type { QuotePayload } from "@/lib/payload";

/**
 * The live market panel. The one place on the page where density is earned:
 * a DOM-style ladder — asks stacked above the spread, bids below, size bars
 * scaled to the deepest visible level.
 */
export function BookPanel({
  data,
  live,
  receivedAt,
  tick,
}: {
  data: QuotePayload;
  live: boolean;
  receivedAt: number | null;
  tick: number;
}) {
  const { market, book } = data;
  const asks = [...book.asks.slice(0, 5)].reverse(); // worst at top, best at spread
  const bids = book.bids.slice(0, 5);
  const maxC100 = Math.max(1, ...asks.map((l) => l.c100), ...bids.map((l) => l.c100));

  return (
    <Panel className="p-5">
      <div className="flex items-center justify-between">
        <PanelLabel>Live market</PanelLabel>
        <LiveTag live={live} receivedAt={receivedAt} asOf={market.asOf} tick={tick} />
      </div>

      <div className="mt-3">
        <div className="caps-label text-g400">{market.ticker}</div>
        <div className="mt-0.5 text-caption text-g600">{market.title}</div>
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-end gap-3">
        <div>
          <div className="caps-label text-g400">Bid</div>
          <div className="text-d3 font-medium tnum mt-1">
            {market.bidPm != null ? (
              <NumberFlow
                value={market.bidPm / 100}
                format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
                suffix="¢"
              />
            ) : (
              "—"
            )}
          </div>
        </div>
        <div className="pb-1.5 text-center">
          <div className="caps-label text-g400">Spread</div>
          <div className="text-caption text-g600 tnum mt-1">
            {market.bidPm != null && market.askPm != null
              ? pmToCentsLabel(market.askPm - market.bidPm)
              : "—"}
          </div>
        </div>
        <div className="text-right">
          <div className="caps-label text-g400">Ask</div>
          <div className="text-d3 font-medium tnum mt-1">
            {market.askPm != null ? (
              <NumberFlow
                value={market.askPm / 100}
                format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
                suffix="¢"
              />
            ) : (
              "—"
            )}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-baseline justify-between">
          <PanelLabel>Depth at the touch</PanelLabel>
          <span className="text-caption text-g500 tnum">contracts</span>
        </div>
        <div className="mt-2 space-y-px">
          {asks.map((l) => (
            <LadderRow key={`a${l.pm}`} pm={l.pm} c100={l.c100} maxC100={maxC100} side="ask" />
          ))}
          <div className="flex items-center py-1.5">
            <div className="h-px flex-1 bg-g300" />
          </div>
          {bids.map((l) => (
            <LadderRow key={`b${l.pm}`} pm={l.pm} c100={l.c100} maxC100={maxC100} side="bid" />
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-ink/[0.06] pt-3 text-caption text-g500">
        <span className="tnum">
          {market.volume != null ? `${fmtInt(market.volume)} traded` : "—"}
        </span>
        <span>pays $1 per contract if it happens</span>
      </div>
    </Panel>
  );
}

function LadderRow({
  pm,
  c100,
  maxC100,
  side,
}: {
  pm: number;
  c100: number;
  maxC100: number;
  side: "ask" | "bid";
}) {
  // cap at 72% so a full-depth bar never runs under the price label
  const w = Math.max(2, (c100 / maxC100) * 72);
  return (
    <div className="relative flex h-7 items-center justify-between overflow-hidden rounded-[3px] px-2">
      {/* size bar behind the figures; asks read heavier than bids — fill vs tint */}
      <div
        className={`absolute inset-y-[3px] right-0 rounded-[2px] ${
          side === "ask" ? "bg-g200" : "bg-g100"
        }`}
        style={{ width: `${w}%` }}
      />
      <span className="relative text-caption text-g700 tnum">{pmToCentsLabel(pm)}</span>
      <span className="relative text-caption tnum font-medium">{fmtInt(contracts(c100))}</span>
    </div>
  );
}
