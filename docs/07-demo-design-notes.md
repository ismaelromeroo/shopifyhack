# 07 — Demo Design Notes

**Date:** 2026-08-15 · **Scope:** the design decisions behind `/console` and `/claim/[id]`, so they
are legible rather than implicit. The build spec they answer to is [`05-pitch.md`](05-pitch.md) §"The
product"; every displayed number derives from [`01-math.md`](01-math.md).

## References applied

- **Layered shadows** (Josh Comeau, *Designing Beautiful Shadows in CSS*): one implied light source,
  3–4 stacked shadows per elevation — tight/dark near the surface, wide/faint beyond, opacity split
  across layers. Three elevations only (`--shadow-pressed / -card / -raised`), defined once in
  `globals.css`. The verdict and the settled claim card sit at `raised`; nothing else does — elevation
  is rank, not decoration.
- **Apple HIG, materials**: translucency is reserved for surfaces that genuinely float over other
  content. Exactly one glass element exists — the simulated-settlement bar fixed over the claim
  ticket — with backdrop blur *and* saturation plus a 1px hairline. Glass on static cards was
  deliberately not used.
- **Linear/Stripe/Vercel restraint**: labels are small caps at one size; density is allowed only where
  the data earns it (the order-book ladder); everything else gets negative space. Section labels
  describe *content* ("Pays out against"), never instructions ("Enter your promo here").
- **Financial-display convention**: a DOM-style ladder (asks stacked above the spread rule, bids
  below, size bars scaled to the deepest visible level), tabular lining numerals on every figure that
  can change, and prices in cents the way the exchange quotes them.

## The monochrome constraint

No hue anywhere; state is carried by weight, fill, border and motion:

| State | Expression |
|---|---|
| Can cover | solid ink card, white text, `raised` shadow — the judgement lands |
| Can't cover | white card, *dashed* hairline, grey X — present but withheld |
| Live | filled dot + counting timestamp; dot pulses once per poll |
| Snapshot/stale | hollow dot, frozen capture time, "live" wording removed |
| Order hedged / pending | filled vs. hollow 6px dot |
| Claim won | the whole ticket inverts to ink |
| Claim lost | ticket recedes to grey-on-grey, reduced contrast |

The single permitted accent was never needed.

## Type & spacing

Inter (variable, via `next/font`), one modular scale (~1.24) from an 10.5px caps label to a 68px
display size, negative tracking increasing with size (−0.006em → −0.022em). `font-variant-numeric:
tabular-nums` on every mutable figure so ticking prices never shift width. 4px spacing rhythm; two
radii total (14px cards, 7px controls).

## Motion

Springs (`motion`), all consequential: the quote assembles in reading order (resolution → quote →
verdict, the verdict deliberately last and heaviest); digits roll via `@number-flow/react` rather
than popping; the liability/coverage lines draw in once and then extend; the live dot pulses only
when a poll actually lands. `prefers-reduced-motion` collapses all of it (verified with
`--force-prefers-reduced-motion`).

## Honesty rules encoded in the UI

- A probability is never shown bare; the all-in number is always paired with its flat-discount
  equivalent ("12.7% — the same spend as running a 13% off sale").
- If the book cannot fill the whole campaign inside a 3¢ band past the touch, there is **no quote** —
  a partial fill is never priced as if it were one. The verdict states the real reason with the real
  numbers (spread, resting depth, the $25,000 position limit).
- Fee math runs in integer units end-to-end (`fee¢ = ⌈7·C₁₀₀·P_pm·(10000−P_pm)/10¹⁰⌉`, BigInt) and
  reproduces Kalshi's published fee table and the worked examples in `01-math.md` to the cent.
- Simulated things (order arrivals, hedge fills, settlement) wear a designed `simulated` chip; live
  things wear the timestamp. If the live fetch fails, the UI falls back to the checked-in snapshot
  and *drops* the live tag rather than dressing stale data as current.

## The market choice

"Free if the Yankees make the playoffs" resolves to `KXMLBPLAYOFFS-26-NYY`, which in August 2026
trades at ~97¢ with ~1,400 contracts of ask-side depth — a near-certainty the book can't absorb, i.e.
the honest *can't-cover* demo. The happy path is `KXMLB-26-NYY` ("win the World Series") at ~10.5¢
with six figures of resting depth — the pitch's 1-in-10 running example, live. Both sentences ship as
example chips so judges see the gate say no for a real reason.

## Demo deep-links

- `/console?promo=free%20if%20the%20Yankees%20win%20the%20World%20Series` — lands quoted
- append `&run=1` — auto-starts the campaign (chart + simulated orders)
- `/claim/1042` — the deck's $180 order; `?settle=won` / `?settle=lost` for the settled states
