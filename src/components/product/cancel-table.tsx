const ROWS = [
  { label: "Customer refunds", hit: "−$20,000", miss: "$0" },
  { label: "Coupons pay", hit: "+$20,000", miss: "$0" },
  { label: "Paid up front", hit: "−$2,126", miss: "−$2,126" },
] as const;

export function CancelTable() {
  return (
    <div>
      <p className="caps-label text-g500">Either way</p>
      <h2 className="mt-3 max-w-xl text-h font-semibold tracking-tight">
        Refunds and coupon payouts land together, so the merchant never floats
        the gap.
      </h2>
      <p className="mt-2 max-w-lg text-body text-g600">
        The bill is the same either way. That is the whole product.
      </p>

      <div className="mt-8 overflow-hidden rounded-card border border-ink/[0.07] bg-surface shadow-card">
        <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-ink/[0.06] px-5 py-3 text-caption text-g500">
          <span />
          <span className="text-right">They win</span>
          <span className="text-right">They don’t</span>
        </div>
        {ROWS.map((r) => (
          <div
            key={r.label}
            className="grid grid-cols-[1fr_1fr_1fr] border-b border-ink/[0.05] px-5 py-3.5 last:border-0"
          >
            <span className="text-caption text-g600">{r.label}</span>
            <span className="tnum text-right text-body">{r.hit}</span>
            <span className="tnum text-right text-body">{r.miss}</span>
          </div>
        ))}
        <div className="grid grid-cols-[1fr_1fr_1fr] bg-ink px-5 py-5 text-surface">
          <span className="caps-label text-surface/55">Net</span>
          <span className="tnum text-right text-d3 font-semibold">−$2,126</span>
          <span className="tnum text-right text-d3 font-semibold">−$2,126</span>
        </div>
      </div>
    </div>
  );
}
