# shopifyhack — Outcome-Contingent Refund Promotions

Research and design notes for a hackathon build: a **Shopify app that lets any merchant run a
"buy now — get your money back if [a public event] happens" promotion**, and hedges the refund
liability on a prediction market (Kalshi) so the merchant's cost is **fixed and known** instead of a
gamble.

Productizing the "Mattress Mack" trick for ordinary stores.

---

## The one thing to understand first

**On a prediction market, contract price *is* probability.** A YES contract pays $1 if the event
happens and costs `p`. So a 10%-chance "your purchase is free" offer costs **10% in expectation** — it
*is* a 10% discount wearing a lottery costume. Hedging removes the **variance**, never the **mean**,
and it adds fees on top.

A flat discount already has zero variance. So against a flat discount, the hedged contingent promo is
dominated on both mean and variance, and only a **behavioral edge** can rescue it. The whole thesis
reduces to one empirical question:

> **Does "chance of free" out-sell a flat discount of the same cost — by more than the fee stack?**

Quantified: the hedge drag runs **11–24% of premium** on a 1¢ book across the `p` = 3–10% band the
product should live in, which converts to a required **unit lift of ~2–3.4% against exchange friction
alone, and ~7–10% once a facilitator takes 2% of order value**. That threshold is derived in
[`docs/01-math.md`](docs/01-math.md) §7.

## What's here

| Doc | What it covers |
|---|---|
| [`docs/00-thesis.md`](docs/00-thesis.md) | The whole idea in one read — the price-is-probability reframe, the hedge math, the six falsifiable conditions, the honest risks, and the verdict |
| [`docs/01-math.md`](docs/01-math.md) | The complete quantitative model: Kalshi fee formula, drag closed form, break-even lift, the required behavioral edge `e`, liquidity/position limits, facilitator P&L, sensitivity ranking |
| [`docs/02-business.md`](docs/02-business.md) | The commercial layer: product surface on Shopify, facilitator-vs-underwriter fork, pricing, beachhead, moat, competitors, the compliant architecture, operating risks |
| [`docs/03-venture-scale.md`](docs/03-venture-scale.md) | The venture-scale case against our own kill — comparable sets, what the $1B outcomes actually own, and seven conditions graded against evidence |
| [`docs/04-adversarial-review.md`](docs/04-adversarial-review.md) | The strongest case *against* the business, assembled by its own authors — plus corrections to claims we previously published |

`docs/01-business-math.md` is a **superseded** July draft, retained only for provenance. It contains
errors the current docs correct; it is banner-marked and should not be cited.

## Where the evidence actually lands

The earlier verdict was a flat **KILL as a venture-scale thesis**. That verdict has been **revised to
conditional** — not because the business looks better, but because the argument was wrong: it
benchmarked against prize-indemnity incumbents, and that comp measures *the cost of distributing a
bespoke quote*, not the ceiling of demand. The better comp set (embedded protection) does contain
companies past $1B.

But the objection that survives the comp swap is worse than the one it replaced:

- **Every $1B outcome in that set owns the risk or the distribution.** Every pure-software facilitator
  in the middle failed or stalled — Clyde, Mulberry, Seel. A thin Shopify promo app is the 0-for-3
  position.
- **Every $1B outcome collects a consumer-paid premium on every order.** This is merchant-paid, on an
  episodic campaign, benchmarked against a discount the merchant could run for free.
- **The closest structural analog stalled with product-market fit.** Sensible Weather sells a literal
  outcome-contingent refund at checkout, has 1M+ guarantees sold, and has not raised a Series B in
  four years.
- **The core premise has never been measured by anyone.** No third-party, holdout-controlled
  incrementality figure exists for this mechanic at an ordinary merchant, in a ~40-year-old category.
  Every published lift number is self-reported traffic or ad-level ROAS, never benchmarked against an
  equal-EV discount.
- **The strongest study cuts against us.** Gaertig & Simmons (*JCR* 2026, N=8,969, preregistered) find
  the probabilistic edge appears only when the equivalent sure discount is or *seems* trivial.

These docs argue against themselves on purpose. `04` corrects `00` and `01` in public. Read them as
written.

## What that means for the build

The venture question is not the hackathon question. The mechanic is real, it shipped in 2026, and **no
self-serve merchant-side tooling exists for it** — the documented promos were hand-sized one-off
hedges, and the one live competitor runs a bespoke concierge motion.

The buildable, defensible core is the **pre-trade feasibility engine**: trigger-to-contract resolution,
live depth and spread gating, effective-discount quoting. All of it validates against Kalshi's public,
unauthenticated read API before anyone signs anything. **Lead with refusing to sell a promo you can't
hedge** — that is a more defensible claim than a checkout badge, and it is true.

## Scope note

A deeper research trail exists — a prediction-market rail survey, a five-unknown fact-checking pass, a
store-credit refinement, and a **legal-structuring analysis** — and is **not published in this repo.**
The legal-structuring work in particular is deliberately held back.

---

*Business analysis, not legal or financial advice. Prediction-market law is moving quarterly and the
sports-contract litigation weekly; re-verify before committing capital.*
