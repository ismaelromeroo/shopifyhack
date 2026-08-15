import type { Metadata } from "next";
import Link from "next/link";
import { SLIDES, VOICES } from "@/lib/slides";

export const metadata: Metadata = {
  title: "Script — Covered",
};

/**
 * The page you read at the microphone. Spoken words only, grouped by voice.
 * Staging, delivery notes and reasoning live in docs/06-slide-plan.md — none
 * of it helps while recording, and it competes with the lines.
 */
export default function ScriptPage() {
  return (
    <main className="mx-auto max-w-[64ch] px-6 pb-32 pt-16 text-g700">
      <header className="border-b border-ink/10 pb-10">
        <p className="caps-label text-g500">
          <Link href="/deck" className="hover:text-ink">
            open the deck ↗
          </Link>
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
          The script
        </h1>
        <p className="mt-4 text-[16px] leading-[1.75]">
          19 slides · ~5:05 · four voices. Spoken words only — staging and
          delivery notes are in the slide plan.
        </p>

        <ol className="mt-7 space-y-1.5">
          {VOICES.map((v) => (
            <li key={v.n} className="flex gap-4 text-[14.5px]">
              <span className="w-[4.5rem] shrink-0 font-mono text-g400">
                {v.time.split("–")[0]}
              </span>
              <span className="w-[5.5rem] shrink-0 font-medium text-ink">
                Voice {v.n}
              </span>
              <span className="w-[4.5rem] shrink-0 font-mono text-g400">
                {v.from}–{v.to}
              </span>
              <span className="text-g500">{v.covers}</span>
            </li>
          ))}
        </ol>
      </header>

      {VOICES.map((v) => (
        <section key={v.n}>
          <div className="sticky top-0 z-10 -mx-6 mb-2 border-b border-ink/10 bg-paper/85 px-6 py-4 backdrop-blur">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                Voice {v.n}
              </h2>
              <span className="font-mono text-[13px] text-g400">
                slides {v.from}–{v.to} · {v.time}
              </span>
            </div>
            <p className="mt-0.5 text-[14px] text-g500">{v.covers}</p>
          </div>

          {SLIDES.filter((s) => s.n >= v.from && s.n <= v.to).map((s) => (
            <article key={s.n} className="mt-10 flex gap-5">
              <div className="w-[2.5rem] shrink-0 pt-[0.45rem] text-right">
                <div className="font-mono text-[13px] text-g400">
                  {String(s.n).padStart(2, "0")}
                </div>
                {s.isBuild && (
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-g400">
                    build
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="caps-label text-g400">{s.title}</div>
                <p className="mt-2 text-[19px] leading-[1.7] text-ink">
                  {s.narration}
                </p>
              </div>
            </article>
          ))}

          <div className="mt-14 border-b border-ink/10" />
        </section>
      ))}
    </main>
  );
}
