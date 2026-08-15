"use client";
import { useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";
import { fmtClock } from "@/lib/format";
import { useDeckQuote } from "./deck-quote";

/**
 * The deck-scaled credibility tag. Same semantics as the console's LiveTag:
 * a filled dot that pulses when a poll lands plus a counting timestamp while
 * live; the word "live" disappears entirely the moment data stops being
 * current — a frozen number is labelled as a snapshot, never as now.
 */
export function DeckLiveTag({
  showTicker = true,
  showPrice = false,
  size = "md",
}: {
  showTicker?: boolean;
  showPrice?: boolean;
  size?: "sm" | "md";
}) {
  const q = useDeckQuote();
  const [secs, setSecs] = useState<number | null>(null);
  useEffect(() => {
    const compute = () =>
      setSecs(
        q.receivedAt != null
          ? Math.max(0, Math.floor((Date.now() - q.receivedAt) / 1000))
          : null
      );
    const first = setTimeout(compute, 0);
    const t = setInterval(compute, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(t);
    };
  }, [q.receivedAt]);

  const fs = size === "sm" ? "1.5vmin" : "1.8vmin";

  return (
    <div
      className="tnum flex items-center gap-[1.1vmin] font-mono text-g500"
      style={{ fontSize: fs }}
    >
      {q.live ? (
        <>
          <span
            key={q.tick}
            className="live-dot-pulse inline-block h-[0.8vmin] w-[0.8vmin] rounded-full bg-ink"
          />
          <span>live · updated {secs ?? 0}s ago</span>
        </>
      ) : (
        <>
          <span className="inline-block h-[0.8vmin] w-[0.8vmin] rounded-full border border-g400" />
          <span>snapshot · {fmtClock(q.asOf)}</span>
        </>
      )}
      {showTicker && (
        <>
          <span className="text-g300">·</span>
          <span>{q.ticker}</span>
        </>
      )}
      {showPrice && (
        <>
          <span className="text-g300">·</span>
          <span>
            <NumberFlow
              value={q.midPm / 100}
              format={{ maximumFractionDigits: 1 }}
            />
            ¢
          </span>
        </>
      )}
    </div>
  );
}
