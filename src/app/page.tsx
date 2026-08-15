import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageBackdrop } from "@/components/chrome";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-1 flex-col items-center justify-center gap-10 px-6">
      <PageBackdrop />
      <header className="text-center">
        <p className="caps-label text-g500">Covered</p>
        <h1 className="mt-3 max-w-xl text-d3 font-semibold">
          Turn your discount into something worth talking about.
        </h1>
        <p className="mx-auto mt-2 max-w-md text-body text-g600">
          A promo priced by a live market, covered to the cent. Two screens: the
          merchant console, and what their customer sees.
        </p>
      </header>
      <nav className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
        <Link
          href="/deck"
          className="group rounded-card border border-ink/[0.07] bg-surface p-6 shadow-card transition-shadow hover:shadow-raised sm:col-span-2 sm:flex sm:items-center sm:justify-between"
        >
          <div>
            <div className="text-title font-semibold">The deck</div>
            <p className="mt-1.5 text-caption text-g600">
              17 slides, ~4:30 narrated. Advance with → or space; the script lives
              at /script.
            </p>
          </div>
          <ArrowUpRight size={16} className="mt-2 text-g400 sm:mt-0" />
        </Link>
        <Link
          href="/console"
          className="group rounded-card border border-ink/[0.07] bg-surface p-6 shadow-card transition-shadow hover:shadow-raised"
        >
          <div className="flex items-start justify-between">
            <div className="text-title font-semibold">Merchant console</div>
            <ArrowUpRight
              size={16}
              className="mt-1 text-g400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
          <p className="mt-1.5 text-caption text-g600">
            Type a promo in plain English. Watch it price against the live book
            and go live, hedged as orders land.
          </p>
        </Link>
        <Link
          href="/claim/1042"
          className="group rounded-card border border-ink/[0.07] bg-surface p-6 shadow-card transition-shadow hover:shadow-raised"
        >
          <div className="flex items-start justify-between">
            <div className="text-title font-semibold">Customer claim ticket</div>
            <ArrowUpRight
              size={16}
              className="mt-1 text-g400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
          <p className="mt-1.5 text-caption text-g600">
            A $180 order riding on the Yankees, with live odds. Best viewed at
            phone width.
          </p>
        </Link>
        <Link
          href="/script"
          className="group rounded-card border border-ink/[0.07] bg-surface p-6 shadow-card transition-shadow hover:shadow-raised"
        >
          <div className="flex items-start justify-between">
            <div className="text-title font-semibold">The script</div>
            <ArrowUpRight
              size={16}
              className="mt-1 text-g400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
          <p className="mt-1.5 text-caption text-g600">
            Every slide with verbatim narration and delivery notes, for
            rehearsal.
          </p>
        </Link>
      </nav>
    </main>
  );
}
