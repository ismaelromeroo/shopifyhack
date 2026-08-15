import type { ReactNode } from "react";

/**
 * The deck's backdrop, product-strength: same fine grid and paper grain,
 * minus the halos — data panels sit on top, so the ground stays quieter.
 */
export function PageBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="deck-grid absolute -inset-24" />
      <div className="deck-grain absolute inset-0" />
    </div>
  );
}

/** Card chrome: hairline + layered shadow, the outer radius. */
export function Panel({
  children,
  className = "",
  raised = false,
}: {
  children: ReactNode;
  className?: string;
  raised?: boolean;
}) {
  return (
    <section
      className={`bg-surface rounded-card border border-ink/[0.07] ${
        raised ? "shadow-raised" : "shadow-card"
      } ${className}`}
    >
      {children}
    </section>
  );
}

export function PanelLabel({ children }: { children: ReactNode }) {
  return <h2 className="caps-label text-g500">{children}</h2>;
}

/** The marker for anything not driven by real data. Designed, not apologetic. */
export function SimTag({ children = "simulated" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-ctl border border-dashed border-g300 px-2 py-0.5 caps-label text-g500 select-none">
      {children}
    </span>
  );
}

export function Wordmark({ sub }: { sub?: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="text-title font-semibold tracking-[-0.01em]">Covered</span>
      {sub && <span className="text-caption text-g500">{sub}</span>}
    </div>
  );
}
