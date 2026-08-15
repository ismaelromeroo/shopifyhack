# 00 — Thesis

**Date:** 2026-08-15
**Status:** the venture case is **not ruled out**, but it survives only under conditions nobody has
tested. The prior KILL verdict rested on a bad comparable and should be discarded as an *argument*;
a better argument lands somewhere more interesting. See [Verdict](#verdict).

---

## The idea in one sentence

> **A Shopify app that lets any merchant run a "buy now — get your money back if [a public event]
> happens" promotion, and hedges the refund liability on a prediction market so the merchant's cost is
> fixed and known instead of a gamble.**

Customers get a lottery ticket. The merchant gets cost certainty. Productizing the Mattress Mack trick
for stores without a Mattress Mack.

---

## The core reframe — read this before anything else

**On a prediction market, contract price *is* probability.** A YES contract pays $1 if the event
happens and costs `p`. So a 10%-probability "your whole order is free" offer costs **10% in
expectation**. It is a 10% discount wearing a lottery costume.

**The hedge fixes variance, not the mean.** Buying the contract converts a `{$0 or $20,000}` gamble
into a certain `$2,126`. It does not make the promotion cheaper — it makes it *predictable*, and it
adds fees on top.

This is confirmed in the wild, not just in theory. [Sensible Weather](https://sensiblehelp.zendesk.com/hc/en-us/articles/29198337215635-How-much-does-a-Weather-Guarantee-cost)
sells a literal outcome-contingent refund at checkout and prices it at **8–12% of cart**, varying with
dates and location — i.e. it charges the probability, and it re-prices as the probability moves.

So the entire business collapses to one question:

> ### Does "chance of free" out-sell a flat discount of the same cost — by *more than the fee stack*?

And the uncomfortable sharpening: at equal expected value, the contingent version is **strictly worse
than a flat discount by the amount of the drag**. It doesn't need to tie. The drag runs **11–24% of
premium** on a 1¢ book across the `p` = 3–10% band the product should live in — far worse on a median
5¢ book — which converts to a required **unit lift of ~2–3.4% against exchange friction alone, and
~7–10% once a facilitator takes 2% of order value** ([derivation](01-math.md)). Everything downstream
is a consequence of that sentence.

---

## The hedge math

Kalshi's taker fee is `roundup(0.07 × C × P × (1−P))`, rounded up to the cent on the whole order, with
**no settlement fee, no membership fee, and free ACH** — verified against the
[fee schedule](https://web.archive.org/web/20260218003606if_/https://kalshi.com/docs/kalshi-fee-schedule.pdf)
and reproduced exactly against all 15 rows of Kalshi's published table.

**Worked example — 100 orders × $200, full refund if a 10%-probability event fires. Liability = $20,000.**

Buy 20,000 YES contracts at $0.10 — one contract per dollar of liability, so premium = `L·p` =
**$2,000**. Fee = 0.07 × 20,000 × 0.10 × 0.90 = **$126.00**. (Passive fill, no spread crossed;
crossing a 1¢ spread raises this to $2,231.57 — see [`01-math.md`](01-math.md) §5.)

| | Event fires (p = 10%) | Event misses (p = 90%) |
|---|---|---|
| Refunds paid to customers | −$20,000 | $0 |
| Hedge payout | **+$20,000** | $0 |
| Premium (paid upfront) | −$2,000 | −$2,000 |
| Kalshi fee (paid upfront) | −$126 | −$126 |
| **Net cost to merchant** | **−$2,126** | **−$2,126** |

Either branch costs **$2,126 — a certain 10.63% discount.** Closed form for the all-in cost of $1 of
refund coverage: **`P + 0.07·P·(1−P)`**.

**The drag is worst exactly where the marketing is best.** Add the cost of crossing the spread and the
total load over fair value, as a fraction of premium, is **`0.07(1−p) + (spread/2)/p`**:

| Trigger probability | Drag @ 1¢ spread | Drag @ 5¢ spread |
|---|---|---|
| 3% ("free if this longshot hits") | **23.5%** | 90.1% |
| 5% | 16.7% | 56.7% |
| 10% | 11.3% | 31.3% |
| 20% | 8.1% | 18.1% |
| 50% | 4.5% | 8.5% |

A "3% chance your order is free" promo *sounds* like a 3% discount and costs 3.7% on the deepest book
in the market — and 5.7% on a thin one. **The product must display effective discount, not contract
probability.** Full derivation and the sizing/limits model: [`01-math.md`](01-math.md).

---

## Why Shopify is the right wedge

Not because the hedge is hard. **The hedge is the easy part.** Kalshi's read API is fully public and
unauthenticated, order placement is a documented REST call, and rate limits (~10 orders/sec on the free
tier) are irrelevant at merchant volume. The hard parts all live in the commerce stack:

1. **Cohort tagging at checkout** — which orders are in the promo, persisted by you, because Shopify
   won't remember the condition.
2. **Live liability sizing as orders arrive.** This is the real product. Hedging the *forecast* upfront
   converts demand-forecast error directly into cost error; hedging incrementally as orders land is
   immune to demand error by construction. No merchant does this by hand, and you can't do it without
   order-flow access — which only the platform gives you.
3. **Mass refund at settlement**, with idempotency, reconciliation, and a working-capital story.

The substrate is also unusually sticky: Shopify did **$115.6B GMV in Q2 2026, +32% YoY**, with
**92% merchant retention above $1M GMV and 97% above $10M**
([Q2 2026 8-K](https://www.stocktitan.net/sec-filings/SHOP/8-k-shopify-inc-reports-material-event-a0b40f87136b.html)).
Land a large merchant and the ground doesn't move.

**Honest counterweights, all of which are load-bearing:**

- **The paying-app ceiling is brutal.** Of ~3.59M active stores, only **65,441 spend >$100/mo on apps,
  7,966 spend >$500, and 1,602 spend >$1,000** ([Storeleads panel via eightx](https://eightx.co/blog/average-ecommerce-shopify-app-spend-by-revenue-band-2026), modeled from pricing tiers, ±25%).
  A subscription-priced version of this caps out well under $100M ARR. Percentage-of-promo pricing is
  not a preference; it's the only structure that escapes.
- **Shopify Payments' ~120-day refund window** kills long-dated triggers. A September purchase settling
  on a February Super Bowl is out of bounds. Store credit is instant and cheaper — and is probably the
  default product, not a footnote.
- **Shopify Payments prohibits "gambling products and services, such as sports forecasting, lotteries,
  bidding, contests, or sweepstakes"**
  ([eligibility policy](https://help.shopify.com/en/manual/payments/shopify-payments/onboarding/eligibility)).
  The plain reading targets merchants whose *business* is contests, not a mattress store running a
  promo — but an app whose entire function is attaching a contingent prize to a purchase sits inside the
  wording's blast radius. This needs a written ruling before any real launch.
- **Distribution is saturated** — roughly [500–865 new apps land per
  month](https://www.appjubilee.io/shopify-app-store-report-2026). This product gets sold, not
  discovered.

---

## What has to be true

Falsifiable conditions. If any of the first three fails, there is no business.

| # | Condition | Current evidence |
|---|---|---|
| 1 | **Contingent beats flat at equal all-in cost**, measured on incremental *margin* against a holdout, by more than the fee stack — a required unit lift of ~2–3.4% against exchange friction alone, ~7–10% with a 2% facilitator take ([§7](01-math.md)) | **Never measured by anyone.** Every published number — Forme's 4x traffic, Playably's 18.25x ROAS — is vendor-reported, uncontrolled, and never benchmarked against an equal-EV discount |
| 2 | **The edge survives at real cart values** ($100–500), not just candy | Against. The pro-probabilistic field work ran on $0.75 candy and $4.50 DVDs; at $60–70 baskets only **31.7–44.1%** chose the gamble ([Attari 2022](https://ideas.repec.org/a/eee/jbrese/v143y2022icp366-374.html)) |
| 3 | **The edge survives transparency.** The profit mechanism in the literature is consumers *over*estimating the event probability ([Ailawadi 2014](https://ideas.repec.org/a/eee/ijrema/v31y2014i1p94-106.html)) | Against. When a promo's odds were computable, overestimation vanished entirely — expected 9% vs realized 11% ([Akbari & Wagner](https://link.springer.com/article/10.1007/s41471-021-00110-y)). A publicly-quoted market price is the most transparent mechanic possible |
| 4 | **Someone can legally hold the position.** Either an ISV agreement with Kalshi, or merchant-as-principal | Unresolved. Kalshi's Developer Agreement §3 limits API use to "a members own trading" and §3.2 bars "facilitating trading… by other members." Kalshi separately names ISVs as a sanctioned class, but no ISV terms are public. Merchant-as-principal with auto-execution raises an unexamined **CTA registration** question |
| 5 | **Enough merchants have a hedgeable trigger** | Mixed. Marquee sports and Fed decisions have depth; **weather and CPI cannot absorb even $25,000** ([live orderbook](https://api.elections.kalshi.com/trade-api/v2/markets/KXHIGHNY-26AUG15-B84.5/orderbook?depth=100)) — the most charming local triggers are the least hedgeable |
| 6 | **It doesn't decay.** Merchants run a *second* campaign | **Zero documented second campaigns** by any merchant with any provider, across four tentpole events in 2026. The only counter-claim is one vendor's unaudited "100% retention" |

---

## The honest risks, in brief

- **The mechanic is not new, and it's already being run.** [Playably](https://playably.ai/) does exactly
  this for Shopify brands — 30+ merchants and "100% retention" self-reported after ~2 years, with a
  Shopify App Store listing carrying **2 reviews since Feb 2025**. It underwrote the Forme World Cup
  promo and EGOHOME's Love Island promo. It states it "insure[s] and hedge[s] the payout" — a risk
  intermediary, not a pure balance sheet. Details in [`03-venture-scale.md`](03-venture-scale.md).
- **Liquidity is far thinner than the headline.** Kalshi lists ~13,000 series, but our random sample of
  2,212 open markets found **44% with no two-sided quote, a median 5¢ spread, and a median 200
  contracts at the touch** ([Kalshi read API](https://api.elections.kalshi.com/trade-api/v2/markets?limit=1000&status=open);
  our own measurement, reproducible but not independently audited). And a live re-measure showed
  top-of-book size varying **52x between two markets in the same NFL series on the same day**
  ([orderbook](https://api.elections.kalshi.com/trade-api/v2/markets/KXNFLGAME-26AUG15DALSEA-SEA/orderbook))
  — so "zero slippage" is a property of a moment, not of a market. Refuse to sell a promo whose trigger
  can't demonstrably absorb the liability.
- **The rail is under active litigation.** Outside the Third Circuit, Kalshi is net-losing: PIs denied
  or granted against it in New York (SDNY, July 2026), Washington, Nevada, Maryland, Ohio and
  [Massachusetts](https://commonwealthbeacon.org/courts/clash-with-prediction-market-giant-kalshi-reaches-sjc/)
  — where a Suffolk Superior Court injunction took effect March 8 2026 and the appeal is now before the
  state Supreme Judicial Court; a 20-count Arizona criminal prosecution **proceeded** after a federal
  judge declined to enjoin it. *Correction to a widely-repeated claim: Minnesota's felony ban never took effect — it was
  preliminarily enjoined July 27, 2026, four days before its effective date.*
- **But the trigger taxonomy has a court-drawn safe harbor.** Washington's order — the most hostile in
  the country — **permits commodities, climate, economics and finance** while requiring geofencing of
  sports, elections, politics and entertainment
  ([WA AG](https://www.atg.wa.gov/news/news-releases/judge-orders-kalshi-cease-numerous-washington-operations)).
  The CFTC's June 2026 NPRM points the same way. Macro and weather triggers are defensible; sports and
  awards are not. Liquidity pushes you toward sports; law pushes you away. That tension is the business.
- **The unlicensed-insurance line is bright and close.** Prize indemnity is an *expressly authorized*
  insurance line ([N.Y. Ins. Law §1113(a)(27)](https://www.dfs.ny.gov/insurance/ogco2003/rg030315.htm)),
  and state codes reach conduct "in substance equivalent." The moment the app says "we cover your
  payout," it is an unlicensed insurer in 50 states. Calling it a hedge does not cure it.
- **The lottery defense is the opposite of the intuitive one.** A uniform trigger does *not* remove
  chance — NY-model statutes reach "a future contingent event not under his control." The real defense
  is **no consideration and no risk of loss**: the customer pays market price for goods they keep. That
  makes any promo-linked price uplift legally catastrophic, and it is a hard invariant enforceable in
  code. Full treatment: [`04-adversarial-review.md`](04-adversarial-review.md).

---

## Verdict

**The prior KILL verdict was reached by a bad argument.** It benchmarked against prize indemnity and
concluded the category tops out around $40M. That comparison fails twice: the revenue figure is soft
(third-party scrapes put SCA Promotions at **$22M and $44M** — a 2x disagreement between two unaudited
sources, on a private company that discloses nothing), and cumulative *payouts* were used as a proxy
for business size, which is inverted for an indemnifier. Discard the argument. The *conclusion* — that
this niche caps in the tens of millions when sold as a bespoke quote — survives; the precision does
not.

**The better comparable set does contain unicorns.** Cover Genius (**$1.9B**, July 2026 — though the
$100M came from Vista *Credit* Partners, so the instrument is likely debt and the mark is soft),
Extend (**$1.6B**, but a stale 2021 print never re-tested), Route (**$1.4B**). A $1B outcome in this
shape is not physically impossible.

**But the pattern inside that set is 3-for-3 in both directions.** Every winner owns the **risk** (a
carrier stack) or the **distribution** (its own consumer surface). Every pure-software facilitator in
the middle failed: Clyde asset-acquired in a fire sale alongside 50–60% layoffs, Mulberry in
turnaround, Seel with no round since 2022. **A thin Shopify promo app is the position with the 0-for-3
record.**

And the closest structural analog is the most damaging single fact available: **Sensible Weather** —
outcome-contingent refund, embedded at point of purchase, 1M+ guarantees sold, 8,000+ locations — has
raised ~$22M and **has not raised a Series B in four years**. Excellent product-market fit, no venture
escape velocity. The consumer-paid comps scale; the merchant-paid ones stall.

**So the unicorn case is real but conditional, and the conditions are specific:**

1. **Condition 1 must resolve favorably** — contingent beats flat on incremental margin at real cart
   values. Nobody on earth has run this test. It is cheap, it is the whole thesis, and whoever runs it
   first owns the only genuinely compounding asset in the category.
2. **You must end up owning risk or distribution.** Facilitating is the death seat. That means either a
   licensed underwriting structure (capital, regulation) or being the default inside Shopify — and
   Shopify's own Payments policy currently points away from the category, which is simultaneously the
   moat and the risk.
3. **The mechanic must not be a one-shot.** Zero documented repeat campaigns is the quietest and most
   alarming number in the whole corpus.

**What that means for this build.** The venture question is not the hackathon question. The mechanic is
real, it shipped in 2026, and **no self-serve merchant-side tooling exists for it** — the six
documented 2026 promos ([`02-business.md`](02-business.md) §7) were hand-sized one-off hedges, and the
one live competitor runs a bespoke concierge motion, not a product — and the pre-trade feasibility engine (trigger→contract resolution,
depth and spread gating, effective-discount quoting) can be built and validated entirely against
Kalshi's public read API before anyone signs anything. **Lead with refusing to sell a promo you can't
hedge.** That is a more defensible claim than a checkout badge, and it is true.

Business breakdown: [`02-business.md`](02-business.md) · Unit economics: [`01-math.md`](01-math.md) ·
Comps: [`03-venture-scale.md`](03-venture-scale.md) · Teardown: [`04-adversarial-review.md`](04-adversarial-review.md)

---

*Business analysis, not legal or financial advice. Prediction-market law is moving quarterly and the
sports-contract litigation weekly; re-verify before committing capital.*
