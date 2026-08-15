export function CouponGlyph() {
  return (
    <div>
      <p className="caps-label text-g500">The coupon</p>
      <p className="mt-3 max-w-xl text-h font-semibold tracking-tight">
        A coupon that pays $1 if the Yankees win the World Series.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="flex min-h-[220px] flex-col justify-between rounded-card border-[3px] border-ink bg-surface p-7 shadow-raised">
          <p className="caps-label text-g500">If they win</p>
          <p className="tnum text-d0 font-semibold tracking-tight">$1</p>
        </div>
        <div className="flex min-h-[220px] flex-col justify-between rounded-card border-[3px] border-dashed border-g400 bg-transparent p-7">
          <p className="caps-label text-g500">If they don’t</p>
          <p className="tnum text-d0 font-semibold tracking-tight text-g300">$0</p>
        </div>
      </div>
    </div>
  );
}
