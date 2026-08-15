export function BudgetCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <BudgetCard title="10% off everything." />
      <BudgetCard title="1-in-10 chance your order is free." />
    </div>
  );
}

function BudgetCard({ title }: { title: string }) {
  return (
    <div className="flex flex-col rounded-card border border-ink/[0.08] bg-surface p-7 shadow-card">
      <p className="text-title font-medium tracking-tight">{title}</p>
      <div className="mt-8 flex items-end justify-between gap-4">
        <div className="tnum text-d1 font-semibold tracking-tight">$2,000</div>
        <div className="relative h-24 w-11 overflow-hidden rounded-ctl border border-ink/20">
          <div className="absolute inset-x-0 bottom-0 h-[10%] bg-ink" />
        </div>
      </div>
      <p className="mt-3 text-caption text-g500">of $20,000 in orders</p>
    </div>
  );
}
