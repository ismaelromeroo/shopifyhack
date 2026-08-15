import type { Metadata } from "next";
import Link from "next/link";
import {
  ACTS,
  BUILD_NOTES,
  CUT_ORDER,
  SLIDES,
  VOCABULARY_RULE,
} from "@/lib/slides";

export const metadata: Metadata = {
  title: "Script — A Different Shape for the Discount Budget",
};

/**
 * The working document for rehearsal: every slide's number, headline,
 * on-screen elements, verbatim narration, and delivery notes — a page to
 * read, not a slide to look at.
 */
export default function ScriptPage() {
  const byAct = ACTS.map((act) => ({
    act,
    slides: SLIDES.filter((s) => s.act === act),
  }));

  return (
    <main className="mx-auto max-w-[68ch] px-6 py-16 text-[16px] leading-[1.75] text-g700">
      <header>
        <p className="caps-label text-g500">
          <Link href="/deck" className="hover:text-ink">
            open the deck ↗
          </Link>
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
          The script
        </h1>
        <p className="mt-4">
          19 slides, ~5:05, screen-recorded from the web deck. Narration
          carries the argument; the screen carries one idea at a time.{" "}
          <strong className="font-semibold text-ink">
            If a slide needs a sentence, the sentence goes in the narration.
          </strong>{" "}
          Words on screen are labels, not content — the single exception is
          Slide&nbsp;11, where the table <em>is</em> the argument.
        </p>
      </header>

      <section className="mt-12 rounded-card border border-ink/10 bg-surface p-6">
        <h2 className="text-lg font-semibold tracking-tight text-ink">
          The vocabulary rule
        </h2>
        <p className="mt-3">
          These words never appear, on screen or in narration:
        </p>
        <p className="mt-3 font-mono text-[14px] text-ink">
          {VOCABULARY_RULE.banned.join(" · ")}
        </p>
        <p className="mt-3">{VOCABULARY_RULE.why}</p>
        <p className="mt-3">{VOCABULARY_RULE.exception}</p>
      </section>

      {byAct.map(({ act, slides }) => (
        <section key={act} className="mt-16">
          <h2 className="caps-label border-b border-ink/10 pb-3 text-g500">
            {act}
          </h2>

          {slides.map((s) => (
            <article key={s.n} className="mt-12">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[13px] text-g400">
                  {String(s.n).padStart(2, "0")}
                </span>
                {s.isBuild && (
                  <span className="rounded-full border border-ink/15 px-2 py-0.5 text-[11px] uppercase tracking-wider text-g500">
                    build on slide {s.n - 1}
                  </span>
                )}
              </div>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight text-ink">
                {s.title}
              </h3>

              <div className="mt-4">
                <div className="caps-label text-g400">On screen</div>
                <ul className="mt-1.5 list-disc pl-5">
                  {s.onScreen.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-5">
                <div className="caps-label text-g400">Narration — verbatim</div>
                <blockquote className="mt-2 border-l-2 border-ink/60 pl-5 text-[17px] leading-[1.85] text-ink">
                  {s.narration}
                </blockquote>
              </div>

              {s.delivery && (
                <div className="mt-5">
                  <div className="caps-label text-g400">Delivery</div>
                  <p className="mt-1.5">{s.delivery}</p>
                </div>
              )}

              {s.notOnScreen && (
                <div className="mt-5">
                  <div className="caps-label text-g400">Not on screen</div>
                  <p className="mt-1.5 text-g500">{s.notOnScreen.join(" ")}</p>
                </div>
              )}

              {s.productionNote && (
                <div className="mt-5 rounded-card border border-dashed border-ink/25 bg-surface p-4 text-[14.5px] leading-[1.7]">
                  <div className="caps-label text-g500">
                    Production note (this build, not the plan)
                  </div>
                  <p className="mt-1.5">{s.productionNote}</p>
                </div>
              )}
            </article>
          ))}
        </section>
      ))}

      <section className="mt-16 border-t border-ink/10 pt-10">
        <h2 className="text-lg font-semibold tracking-tight text-ink">
          Cut order if it runs long
        </h2>
        <ol className="mt-3 list-decimal pl-5">
          {CUT_ORDER.slice(0, 3).map((c) => (
            <li key={c} className="mt-1">
              {c}
            </li>
          ))}
        </ol>
        <p className="mt-3 font-medium text-ink">{CUT_ORDER[3]}</p>
      </section>

      <section className="mt-12 border-t border-ink/10 pt-10 pb-16">
        <h2 className="text-lg font-semibold tracking-tight text-ink">
          Build notes
        </h2>
        <ul className="mt-3 list-disc pl-5">
          {BUILD_NOTES.map((b) => (
            <li key={b} className="mt-1">
              {b}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
