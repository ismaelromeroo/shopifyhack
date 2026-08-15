"use client";

import { useEffect, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";
import { useReducedMotion } from "motion/react";
import { PanelLabel, SimTag } from "@/components/chrome";
import { TrackChart, type TrackPoint } from "@/components/track-chart";

export function CampaignCurve({
  orders = 100,
  aov = 200,
  onDone,
}: {
  orders?: number;
  aov?: number;
  onDone?: () => void;
}) {
  const rm = useReducedMotion();
  const [series, setSeries] = useState<TrackPoint[]>([
    { t: 0, liabCents: 0, covCents: 0 },
  ]);
  const [liab, setLiab] = useState(0);
  const [cov, setCov] = useState(0);
  const [count, setCount] = useState(0);
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const aovCents = aov * 100;
    doneRef.current = false;

    const paint = (pts: TrackPoint[], L: number, C: number, n: number) => {
      setSeries(pts);
      setLiab(L);
      setCov(C);
      setCount(n);
    };

    const done = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      onDoneRef.current?.();
    };

    if (rm) {
      const pts: TrackPoint[] = [{ t: 0, liabCents: 0, covCents: 0 }];
      const L = orders * aovCents;
      pts.push({ t: 140, liabCents: L, covCents: 0 });
      pts.push({ t: 146, liabCents: L, covCents: L });
      paint(pts, L, L, orders);
      done();
      return;
    }

    let t = 0;
    let L = 0;
    let C = 0;
    let n = 0;
    const pts: TrackPoint[] = [{ t: 0, liabCents: 0, covCents: 0 }];
    const id = window.setInterval(() => {
      n += 1;
      t += 1.4;
      L += aovCents;
      pts.push({ t, liabCents: L, covCents: C });
      if (n % 3 === 0 || n === orders) {
        t += 0.6;
        C = L;
        pts.push({ t, liabCents: L, covCents: C });
      }
      paint([...pts], L, C, n);
      if (n >= orders) {
        window.clearInterval(id);
        done();
      }
    }, 35);
    return () => window.clearInterval(id);
  }, [orders, aov, rm]);

  return (
    <div className="mt-5 border-t border-ink/[0.08] pt-5 font-sans">
      <div className="flex items-center justify-between">
        <PanelLabel>Liability vs. coverage</PanelLabel>
        <SimTag>simulated orders</SimTag>
      </div>
      <div className="mt-1 text-caption text-g500 tnum">
        Orders · {count} of {orders}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
        <div>
          <div className="caps-label text-g400">Liability accrued</div>
          <div className="mt-1 text-d3 font-semibold tnum">
            <NumberFlow
              value={liab / 100}
              format={{ style: "currency", currency: "USD" }}
            />
          </div>
        </div>
        <div>
          <div className="caps-label text-g400">Coverage</div>
          <div className="mt-1 text-d3 font-medium tnum text-g600">
            <NumberFlow
              value={cov / 100}
              format={{ style: "currency", currency: "USD" }}
            />
          </div>
        </div>
        <div className="hidden md:block">
          <div className="caps-label text-g400">Uncovered</div>
          <div className="mt-1 text-d3 font-medium tnum text-g400">
            <NumberFlow
              value={Math.max(0, liab - cov) / 100}
              format={{ style: "currency", currency: "USD" }}
            />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <TrackChart series={series} />
      </div>
    </div>
  );
}
