"use client";
import { useEffect, useState } from "react";
import { fmtClock } from "@/lib/format";

/**
 * The credibility object. Filled dot + counting timestamp while live;
 * hollow dot + frozen capture time the moment data stops being current.
 */
export function LiveTag({
  live,
  receivedAt,
  asOf,
  tick,
}: {
  live: boolean;
  receivedAt: number | null;
  asOf: string | null;
  tick: number;
}) {
  const [now, setNow] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  // before the first interval tick, the data just arrived — 0s is accurate
  const secs =
    receivedAt != null
      ? now > 0
        ? Math.max(0, Math.floor((now - receivedAt) / 1000))
        : 0
      : null;

  return (
    <span className="inline-flex h-6 items-center gap-2 rounded-ctl border border-ink/[0.08] bg-surface px-2.5 select-none">
      <span
        key={live ? tick : -1}
        className={`h-1.5 w-1.5 rounded-full ${
          live ? "bg-ink live-dot-pulse" : "border border-g400 bg-transparent"
        }`}
      />
      <span className="text-caption text-g600 tnum">
        {live
          ? secs == null
            ? "live"
            : `live · updated ${secs}s ago`
          : asOf
            ? `snapshot · ${fmtClock(asOf)}`
            : "snapshot"}
      </span>
    </span>
  );
}
