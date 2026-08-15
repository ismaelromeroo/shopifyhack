# shopifyhack — Outcome-Contingent Refund Promotions

Research and design notes for a hackathon build: a **Shopify app that lets any merchant run a
"buy now — get your money back if [a public event] happens" promotion**, and hedges the refund
liability on a prediction market (Kalshi) so the merchant's cost is **fixed and known** instead of a
gamble.

Productizing the "Mattress Mack" trick for ordinary stores.

---

## The idea in one paragraph

A store offers a **chance-based discount** — *"free if the home team wins."* Customers get a lottery
ticket; the store gets cost certainty, because for every dollar of refund liability it buys a matching
Kalshi YES contract that pays out exactly when the refund comes due. Shopify is the natural home for
this: the hard part isn't the hedge, it's checkout integration, live liability sizing as orders arrive,
and settling refunds when the event fires — all of which live in the merchant's commerce stack.

## The one thing to understand first

**On a prediction market, contract price *is* probability.** So a 10%-chance "your purchase is free"
offer costs 10% in expectation — it *is* a 10% discount wearing a lottery costume. Hedging removes the
**variance**, never the **mean**.

That makes the whole thing rest on a single empirical question:

> **Does "chance of free" sell more than a plain discount of the same cost — by enough to cover the fees?**

## What's here

| Doc | What it covers |
|---|---|
| [`docs/00-thesis.md`](docs/00-thesis.md) | The whole idea in one read — the reframe, the hedge math, the four hurdles, competitors, verdict |
| [`docs/01-business-math.md`](docs/01-business-math.md) | Full unit economics: promo margin, Kalshi sizing/fees/limits, facilitator P&L, store-credit variant |

## Honest framing

The research grades this **KILL as a venture-scale thesis, real as a small specialty business** — the
40-year category leader in this space is ~$40M revenue, and the strongest study on probabilistic
promotions finds the behavioral edge disappears once the equivalent flat discount stops feeling
trivial. Those docs argue against themselves on purpose; read them as written.

That verdict is about **not reaching $100M**, which is not the bar for a hackathon. The mechanic is
real, it is genuinely being run today (Kalshi-hedged promos shipped in 2026), and nobody has built the
merchant-side tooling for it. That's the build.

A deeper research trail exists — a prediction-market rail survey, an adversarial teardown, a
five-unknown fact-checking pass, a store-credit refinement, and a legal-structuring analysis — and is
**not published in this repo.**

---

*Business analysis, not legal or financial advice. Prediction-market law is moving quarterly and the
sports-contract litigation weekly; re-verify before committing capital.*
