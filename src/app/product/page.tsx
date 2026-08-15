import Link from "next/link";
import { SimTag } from "@/components/chrome";
import { BudgetCards } from "@/components/product/budget-cards";
import { CouponGlyph } from "@/components/product/coupon-glyph";
import { ThreeSeats } from "@/components/product/three-seats";
import { CancelTable } from "@/components/product/cancel-table";
import { Hero, Reveal } from "@/components/product/hero";
import {
  LandingLiveTag,
  LandingQuoteProvider,
} from "@/components/product/landing-quote";

export default function ProductLanding() {
  return (
    <>
      <Hero />

      <LandingQuoteProvider>
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/nyc-map.png"
              alt=""
              className="h-full w-full object-cover opacity-[0.22]"
            />
            <div className="absolute inset-0 bg-paper/78" />
          </div>

          <main className="relative mx-auto w-full max-w-[1080px] flex-1 px-6 pb-20 pt-16 md:px-10">
            <section>
              <Reveal>
                <p className="caps-label text-g500">Same money</p>
                <p className="mt-3 mb-6 max-w-lg text-body text-g600">
                  A hundred orders, two hundred dollars each. Ten percent off is
                  two thousand dollars. A one-in-ten chance of giving an order
                  away — also two thousand.
                </p>
              </Reveal>
              <BudgetCards />
            </section>

            <section className="mt-20">
              <CouponGlyph />
            </section>

            <section className="mt-20">
              <ThreeSeats />
            </section>

            <section className="mt-20">
              <CancelTable />
            </section>

            <Reveal className="mt-20">
              <section className="rounded-card border border-dashed border-g300 bg-surface/80 px-7 py-8">
                <p className="caps-label text-g500">Refuse</p>
                <p className="mt-3 max-w-xl text-h font-semibold tracking-tight">
                  We will not sell a promo the book cannot cover.
                </p>
                <p className="mt-2 max-w-lg text-body text-g600">
                  We refuse the promo before we fake the plumbing.
                </p>
              </section>
            </Reveal>

            <footer className="mt-24 flex flex-col gap-5 border-t border-ink/[0.06] pt-8 text-caption text-g500 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-xl space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <LandingLiveTag />
                  <span>prices</span>
                  <SimTag>simulated</SimTag>
                  <span>orders / fills</span>
                </div>
                <p className="text-body text-g600">
                  We read prices. We never place trades.
                </p>
              </div>
              <div className="flex gap-5">
                <Link href="/deck" className="hover:text-ink">
                  Deck
                </Link>
                <Link href="/script" className="hover:text-ink">
                  Script
                </Link>
              </div>
            </footer>
          </main>
        </div>
      </LandingQuoteProvider>
    </>
  );
}
