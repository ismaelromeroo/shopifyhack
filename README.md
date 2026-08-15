# shopifyhack — A Different Shape for the Discount Budget

Research and design notes for a hackathon build: a **Shopify app that spends the discount budget a
merchant is already spending, in a shape people actually talk about** — instead of 10% off for
everyone, a 1-in-10 chance your order is free — and buys the other side of that promise on a
prediction market so the cost is **fixed and known before the promo starts**.

---

## The problem, which is not the one you'd guess

Every merchant discounts. Constantly. It is the one universal, verifiable behavior in commerce, and it
is the largest discretionary line in most merchants' marketing.

And it buys them three bad things. Most promo sales are **non-incremental** — the buyer was coming
anyway. Repeated discounting **erodes reference price** and trains customers to wait for the next sale.
And a flat discount is **invisible** — nobody has ever told a friend about 20% off.

So the problem this addresses is *not* "I want to run a lottery promo but the risk is terrifying."
Almost nobody has that problem. The problem nearly every merchant has is:

> **I spend real money on discounts and get nothing memorable for it.**

## Same money, different shape

**100 orders × $200 = $20,000 of covered sales. Two ways to spend ~$2,000 on it:**

| | Flat 10% off | 1-in-10 your order is free |
|---|---|---|
| What the customer is told | "10% off" | "10% chance your whole order is free" |
| Cost to the merchant | **$2,000** | **$2,126** (passive fill) |
| Premium over the discount already being run | — | **+6.3%** |
| Variance of that cost | zero | zero, once hedged |
| Anyone tells a friend? | no | maybe — that is the entire bet |

**"Isn't this just a discount with extra steps?" is the thesis, not an objection.** Yes. It is a
discount. It costs about what your discount costs. The difference is that people talk about this one.

**So why doesn't anyone do it?** Because unhedged, that promise costs `$0 or $20,000` — a solvency
decision, not a marketing one. **The absence of the behavior is evidence for the product, not against
it:** you could not price this promise until there was a liquid public market in the underlying event.
A prediction-market contract pays $1 if the event happens and costs the probability; buy one per dollar
of liability and the promise acquires a fixed price. That price is the discount you were already
running, plus a fee.

**Read the whole ladder, not the headline.** The 6.3% is a floor, not a quote:

| Same $20,000-covered promo | All-in cost | vs. the flat $2,000 |
|---|---|---|
| Flat 10% off | $2,000 | — |
| Contingent, passive fill on a deep book | $2,126 | **+6.3%** |
| Contingent, crossing a 1¢ spread | $2,226 | +11.3% |
| Contingent, 1¢ spread + a 2% facilitator take | $2,626 | +31.3% |
| Contingent on the **median** Kalshi book (5¢ spread) | $2,626 | +31.3% |

At `p` = 3% on a median book the premium is **+90%**. The behavioral evidence pushes you toward low
`p`; the market structure punishes you there. That tension is the business, and
[`docs/04-adversarial-review.md`](docs/04-adversarial-review.md) §5 argues it is the sharpest hole in
the pitch.

## What's here

| Doc | What it covers |
|---|---|
| [**`docs/05-pitch.md`**](docs/05-pitch.md) | **Start here.** The argument in the order it should be told — problem, idea, the cost equivalence, the mechanism, the product, the fee, and what has to be true |
| [`docs/00-thesis.md`](docs/00-thesis.md) | The argument derived from first principles in six steps: every merchant discounts → discounting buys three bad things → same budget, different shape → why nobody can promise it → buy the other side → the price is the discount you already run. Plus seven falsifiable conditions, bottom-up sizing, and the verdict |
| [`docs/01-math.md`](docs/01-math.md) | The complete quantitative model on one running example: Kalshi's fee formula reproduced against all 15 published rows, the drag closed form `0.07(1−p) + (s/2)/p`, break-even lift, the required behavioral edge `e`, liquidity and position limits, facilitator P&L, sensitivity ranking |
| [`docs/02-business.md`](docs/02-business.md) | The commercial layer: the reallocation sale, product surface, why we hold the risk rather than broker it, pricing against the merchant's own discount, adoption as the central risk, beachhead, moat, competitors |
| [`docs/03-venture-scale.md`](docs/03-venture-scale.md) | The venture case against our own earlier kill — comparable sets, what the $1B outcomes actually own, bottom-up sizing that refuses TAM-by-adjacency, and eight conditions graded against evidence |
| [`docs/04-adversarial-review.md`](docs/04-adversarial-review.md) | The strongest case *against* the business, assembled by its own authors — six attacks on the new frame, seven structural dependencies, and public corrections to claims we previously published |

`docs/01-business-math.md` is a **superseded** July draft, retained only for provenance. It contains
errors the current docs correct; it is banner-marked and should not be cited.

## Where the evidence actually lands

The earlier verdict was a flat **KILL as a venture-scale thesis**. That has been **revised to
conditional** — not because the business looks better, but because the argument was wrong twice. It
benchmarked against prize-indemnity incumbents, which measures *the cost of distributing a bespoke
quote*, not the ceiling of demand. And its denominator was the ~6 documented contingent promos, which
is a press cycle, not a market.

What survives the correction is worse than what it replaced:

- **The core premise has never been measured by anyone.** No third-party, holdout-controlled figure
  exists for whether a contingent promo produces more incremental margin than an **equal-cost flat
  discount**, in a ~40-year-old category. Every published lift number is self-reported traffic or
  ad-level ROAS. This is why the product ships with a **holdout control group on by default**.
- **The strongest study cuts against us.** Gaertig & Simmons (*JCR* 52(5), N=8,969, preregistered) find
  the probabilistic edge appears only when the equivalent sure discount is or *seems* trivial.
- **Every $1B outcome in the closest comp set owns the risk or the distribution.** Every pure-software
  facilitator in the middle failed or stalled — Clyde, Mulberry, Seel. A thin Shopify promo app is the
  0-for-3 position.
- **Every $1B outcome collects a consumer-paid premium on every order.** This is merchant-paid, per
  campaign, benchmarked against a discount that is free to configure and takes one click.
- **The closest structural analog stalled with product-market fit.** Sensible Weather sells a literal
  outcome-contingent refund at checkout, has 1M+ guarantees sold, and has not raised a Series B in four
  years.
- **The risk changed shape, honestly.** The old risk was "can we make it safe?" — answered. The new one
  is "will merchants adopt a mechanic they have never run?" — unanswered, with a discouraging base rate.

The famous cases — Mattress Mack, Jordan's Furniture, a Manhattan bar — are **demoted from premise to
evidence**. They are not the market we serve. They do exactly one job: they prove the mechanic buys
attention a flat discount cannot. Mack won ~$75M on ~$10M of hedges and by his own account did not make
a dime; the return was earned media.

These docs argue against themselves on purpose. `04` corrects `00` and `01` in public. Read them as
written.

## What that means for the build

The venture question is not the hackathon question. The mechanic is real, it shipped in 2026, and **no
self-serve merchant-side tooling exists for it** — the documented promos were hand-sized one-off
hedges, and the one live competitor runs a bespoke concierge motion.

The buildable, defensible core is the **pre-trade feasibility engine**: trigger-to-contract resolution,
live depth and spread gating, and quoting in **effective discount** rather than contract probability.
All of it validates against Kalshi's public, unauthenticated read API before anyone signs anything.

Two claims to lead with, in this order. **This costs about what your discount costs** — say the number,
show the effective discount, never the contract probability. **And we refuse to sell a promo we can't
hedge.** Both are more defensible than a checkout badge, and both are true.

## Scope note

A deeper research trail exists — a prediction-market rail survey, a five-unknown fact-checking pass, a
store-credit refinement, and a **legal-structuring analysis** — and is **not published in this repo.**
The legal-structuring work in particular is deliberately held back.

Liquidity, spread and depth figures throughout these docs are **our own book-walks against Kalshi's
public API on 15 Aug 2026**. Orderbooks are live, so the linked endpoints will not reproduce them —
they are a point-in-time snapshot, and that they are perishable is itself the finding.

---

*Business analysis, not legal or financial advice. Prediction-market law is moving quarterly and the
sports-contract litigation weekly; re-verify before committing capital.*
