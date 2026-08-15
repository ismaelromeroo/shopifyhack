# 00 — Thesis

**Date:** 2026-08-15
**Status:** the venture case is **not ruled out**, but it survives only under conditions nobody has
tested. The prior KILL verdict rested on a bad comparable and should be discarded as an *argument*;
a better argument lands somewhere more interesting. See [Verdict](#verdict).

---

## The idea in one sentence

> **Every merchant already spends money on discounts. This spends the same money in a shape people
> actually talk about — instead of 10% off for everyone, a 1-in-10 chance your order is free — and buys
> the other side of that promise on a prediction market so the cost is fixed and known.**

A standalone product; commerce platforms are integrations, not the thing itself. Shopify is the first
one because it supplies real order flow and real refund rails, but nothing in the model depends on it —
and its Payments policy naming "contests, sweepstakes" as prohibited is a reason not to be built on it
([`02-business.md`](02-business.md)).

Same budget. Roughly **6% more than the discount they are already running**. A different story.

The rest of this document derives that claim from first principles, one step at a time. Each step
answers the question the previous step raises.

---

## Step 1 — Every merchant discounts. Constantly.

This is the one universal, verifiable behavior in commerce. Nobody needs to be convinced to run a
promotion; they are running one right now. It is the single largest discretionary line in most
merchants' marketing, and it is spent reflexively.

That matters because it sets the comparison object for everything below. **The merchant's real
alternative to this product is not "do nothing." It is "the discount they were going to run anyway."**

---

## Step 2 — But discounting buys three bad things

| What's wrong | Status of the evidence |
|---|---|
| **Most promo sales are not incremental.** A large share of discount takers were going to buy regardless, so the merchant pays margin to subsidize demand it already had | **Widely believed; not established in our corpus.** We did not measure it and no source here quantifies it. Treat as the merchant's own lived complaint, not a cited fact |
| **Repeated discounting erodes reference price** and trains customers to wait for the next sale | Mixed, and we should say so. [Alavi, Bornemann & Wieseke, *JM* 79(2):62–78](https://journals.sagepub.com/doi/10.1509/jm.12.0408) find **gambled** discounts protect internal reference price and repurchasing where flat discounts damage both. But the largest meta-analysis in the area ([51 studies](https://www.sciencedirect.com/science/article/abs/pii/S0022435906000388)) finds a **null** average effect of promotions on post-promotion preference — so the harm we claim to avoid may not be there to avoid |
| **A flat discount is invisible.** Nobody has ever told a friend about 20% off | Supported, and it is the strongest of the three. The one high-stakes field study's transferable benefit was **word-of-mouth driven by entertainment value**, not by the discount ([`04-adversarial-review.md`](04-adversarial-review.md) §8) |

**So the real problem is not "I want to run a lottery promo but it's too risky."** Almost nobody has
that problem. The problem nearly every merchant has is: *I spend real money on discounts and get
nothing memorable for it.*

---

## Step 3 — Same budget, different shape

If the merchant is spending the money anyway, the interesting question is what shape it should take.

**100 orders × $200 = $20,000 of covered sales.** Two ways to spend ~$2,000 on it:

| | **Flat 10% off** | **1-in-10 your order is free** |
|---|---|---|
| What the customer is told | "10% off" | "10% chance your whole order is free" |
| Expected cost to merchant | $2,000 | $2,000 |
| Variance to merchant | none | **$0 or $20,000** |
| Anyone tells a friend? | no | maybe — that is the entire bet |

At the level of expected cost these are **the same promotion**. The right column is not a gamble the
merchant is taking *instead of* a discount; it is the discount, re-shaped.

**"Isn't this just a discount with extra steps?"** Yes. That is the thesis, not an objection to it. It
is a discount, it costs about what your discount costs, and the difference is that people talk about
this one. If that last clause is false, there is no business — see [Condition 1](#what-has-to-be-true).

---

## Step 4 — So why doesn't anyone do this?

Because of the middle column of that table. **If the event fires, the merchant owes every customer at
once.** A promise that costs $0 or $20,000 is not a marketing decision, it is a solvency decision, and
no ordinary merchant will sign it.

That is why the documented record of this mechanic is **about six merchant promos in 2026**
([`02-business.md`](02-business.md) §7) rather than six million. And the most-cited of them, The
Jeffrey — a Manhattan bar — ran inside Kalshi's own small-business push; the CNBC piece is literally
headlined *"Kalshi wants small businesses to hedge like Wall Street"*
([CNBC](https://www.cnbc.com/2026/06/03/kalshi-wants-small-businesses-to-hedge-like-wall-street-a-nyc-bar-is-trying-it-with-knicks-promotion.html)),
and Kalshi runs a first-party SMB hedging page with a BD lead for the segment. **That is a supplier-led
press cycle, not a market.**

**The absence is the argument** — with one honest caveat, stated here rather than buried. Six cases is
not evidence that merchants don't want this; it is evidence that until recently **you could not price
the promise**. But "unpriceable until now" and "nobody wants it" fit the same six data points, and one
fact cuts the wrong way: **Jordan's Furniture has run this in public for ~19 years at $50M liability
scale and produced roughly no imitators among merchants who could self-fund it**. If pricing were the
only binding constraint, a visible two-decade proof-of-concept should have spread. It didn't. The
ambiguity is real, the test that resolves it is a sales test, and both are set out in
[`04-adversarial-review.md`](04-adversarial-review.md) §3. Read the rest of this document as arguing
the first explanation, not as having proved it.

---

## Step 5 — The mechanism: buy the other side

**On a prediction market, contract price *is* probability.** A YES contract pays **$1 if the event
happens** and costs `p`. Buy one contract per dollar of possible liability and the promise stops being
a gamble: whatever you owe customers, the contracts pay.

**Why the equivalence is exact.** Unhedged, the merchant's expected refund outlay is `P(E)·L`. The
hedge costs `q` per $1 of coverage, so `q·L`. If `q = P(E)` these are *identical* — the hedge is not a
bet, it is **a purchase of the merchant's own expected cost at the market's price** ([derivation](01-math.md) §2).
The equivalence is **operational, not epistemic**: it doesn't require `q` to be the *true* probability,
only that `q` is what the merchant pays.

Confirmed in the wild, not just in theory. [Sensible Weather](https://sensiblehelp.zendesk.com/hc/en-us/articles/29198337215635-How-much-does-a-Weather-Guarantee-cost)
sells a literal outcome-contingent refund at checkout and prices it at **8–12% of cart**, varying with
dates and location — i.e. it charges the probability, and it re-prices as the probability moves.

**The hedge fixes variance, not the mean.** It does not make the promotion cheaper. It makes it
*predictable*, and it adds fees on top. Which is the next step.

---

## Step 6 — And the price is the discount you were already running

Kalshi's taker fee is `roundup(0.07 × C × P × (1−P))`, rounded up to the cent on the whole order, with
**no settlement fee, no membership fee, and free ACH** — verified against the
[fee schedule](https://web.archive.org/web/20260218003606if_/https://kalshi.com/docs/kalshi-fee-schedule.pdf)
and reproduced exactly against all 15 rows of Kalshi's published table.

**Same worked example — 100 orders × $200, full refund if a 10%-probability event fires. Liability = $20,000.**

Buy 20,000 YES contracts at $0.10 — one contract per dollar of liability, so premium = `L·p` =
**$2,000**. Fee = 0.07 × 20,000 × 0.10 × 0.90 = **$126.00**.

| | Event fires (p = 10%) | Event misses (p = 90%) |
|---|---|---|
| Refunds paid to customers | −$20,000 | $0 |
| Hedge payout | **+$20,000** | $0 |
| Premium (paid upfront) | −$2,000 | −$2,000 |
| Kalshi fee (paid upfront) | −$126 | −$126 |
| Our management fee (10% of premium) | −$200 | −$200 |
| **Total cost to merchant** | **−$2,326** | **−$2,326** |

**$2,000 flat versus $2,326 all-in. A 16.3% premium over the discount they are already paying for** — of which 6.3 points is exchange friction and 10 points is our fee.
Closed form for the all-in cost of $1 of refund coverage, at trigger probability `p`:
**`p + 0.07·p·(1−p)`** — 10.630¢ at `p` = 0.10. (Kalshi states its own fee formula with `P` for the
contract's *price*; on this rail price and probability are the same number, which is the point.)

That is the headline number, and it is the honest floor. Here is the full ladder on the same promo,
because the premium moves a lot with execution and with who takes a cut:

| Version of the same $20,000-covered promo | All-in cost | vs. the flat $2,000 |
|---|---|---|
| Flat 10% off | $2,000 | — |
| Contingent, passive fill (no spread crossed) | $2,126 | **+6.3%** |
| Contingent, crossing a 1¢ spread | $2,226 | +11.3% |
| Contingent, 1¢ spread + a 2% facilitator take on order value | $2,626 | +31.3% |
| Contingent, crossing the **median 5¢** book | $2,626 | +31.3% |

The 1¢ rows come from the closed form in [`01-math.md`](01-math.md) §4; the exact cash-flow version of
the same trade, which charges the fee on the price actually paid rather than on fair `p`, lands at
$2,231.57 (+11.6%) — a few tenths of a point apart, reconciled in [§3](01-math.md). The last two rows
are the two ways this gets expensive: our own fee, and a book we should have refused.

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

**The uncomfortable sharpening.** At equal expected value, the contingent version is **strictly worse
than a flat discount by the amount of the drag**. It doesn't need to tie — it needs to win. That
converts to a required **unit lift of ~2–3.4% against exchange friction alone, and ~7–10% once a
facilitator takes 2% of order value** ([derivation](01-math.md) §8). Everything downstream is a
consequence of that sentence.

---

## The famous cases are evidence, not the market

Mattress Mack, Jordan's Furniture and The Jeffrey are frequently used as the premise of this pitch —
"look, merchants already do this." **They don't.** Six documented promos across four tentpole 2026
events is not a market. Demote them to what they actually prove: **that this mechanic buys attention a
flat discount cannot.**

- **Mattress Mack** won ~$75M on ~$10M of hedges, drove ~$75M in furniture sales, and by his own
  account **did not make a dime** ([Forbes, Nov 2022](https://www.forbes.com/sites/willyakowicz/2022/11/07/mattress-mack-won-his-75-million-world-series-bet-and-didnt-make-a-dime/)).
  The return was **earned media, not margin** — which is exactly what the price-is-probability identity
  predicts, and exactly the channel this product is selling.
- **The Jeffrey (NYC bar)** — Knicks won Game 1 105-95; **the trigger fired**, tabs were honored, and
  the bar reported [**net profit of $8,514 on a $5,000 hedge**](https://www.cnbc.com/2026/06/03/kalshi-wants-small-businesses-to-hedge-like-wall-street-a-nyc-bar-is-trying-it-with-knicks-promotion.html).
  Covered by CNBC and Fortune, not merely self-reported. **The only end-to-end proof that exists.**
- **[Forme](https://www.modernretail.co/marketing/why-forme-launched-a-world-cup-promotion-hedged-on-kalshi/)**
  — did not fire. Self-reported **4× WoW traffic**; conversion, AOV, revenue and hedge cost all
  undisclosed. Attention, unpriced.
- **Jordan's Furniture** — [~$50M liability on a compound UConn trigger](https://www.wbur.org/news/2026/04/03/march-madness-jordans-furniture-refund-uconn-final),
  ~19 years of running these, hedged with **insurance**, premiums as a percentage of sales. The longest
  real-world operator routes through the insurance market, not a prediction market.

Read that way, the six cases stop being a tiny TAM and start being the only field evidence that the
right-hand column of the Step 3 table is worth anything at all. **They are the proof of the mechanic;
they are not the customer list.**

---

## Who the customer actually is

The old framing said the customer was "merchants who run contingent promos" — about six of them, all
already claimed by a vendor or a press cycle. The new framing says the customer is **merchants who are
unhappy with what their discounting buys them**, which is nearly all of them.

That is a materially better GTM story and a materially **worse** proof burden: these merchants have
never run this mechanic, so every sale is a behavior change, not a product swap. The risk moves from
*"can we make it safe?"* to *"will they adopt something they've never run?"*

**And the sizing does not get to ride on that.** It is tempting to take a slice of all retail promotion
spend. **Don't** — adjacency-to-a-big-number is the exact reasoning this repo exists to kill. Build it
bottom-up instead, assumptions inline:

- Paying-app base: of ~3.59M active Shopify stores, only **65,441 spend >$100/mo on apps, 7,966 spend
  >$500, and 1,602 spend >$1,000** ([Storeleads panel via eightx](https://eightx.co/blog/average-ecommerce-shopify-app-spend-by-revenue-band-2026),
  modeled from pricing tiers, ±25%).
- Assume a merchant runs **2 promos/year at $60,000 of covered sales** and you take **2% of order
  value** → **$2,400/merchant/year**.
- $100M ARR therefore needs **~41,700 merchants** — **~64% of every Shopify store that spends >$100/mo
  on apps**, or ~$5B/yr of promo GMV flowing through you.

[`03-venture-scale.md`](03-venture-scale.md) §5 runs the identical construction off the identical base
with a larger campaign ($100k of covered sales, 2/yr) and lands on **38% of that band and $4.97B of
promo GMV**. The two differ only in assumed campaign size, and the honest read is the range: **$100M
requires roughly 38–64% of every Shopify store that already spends >$100/mo on apps to run this
mechanic twice a year.** The answer is more sensitive to promo size and frequency than to anything else
in the model, and both are assumptions, not observations. The shape survives either way:
**subscription pricing caps out well under $100M ARR, and even percentage pricing needs penetration no
promo app has ever achieved.** That is the sizing, stated against us.

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

- **The paying-app ceiling is brutal** — the 65,441 / 7,966 / 1,602 figures above. Percentage-of-promo
  pricing is not a preference; it's the only structure that escapes.
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

Falsifiable conditions, stated in **adoption** terms — the safety question is answered by Step 5; the
open questions are whether the re-shaped discount is worth more than the flat one, and whether anyone
will run it. If any of the first three fails, there is no business.

| # | Condition | Current evidence |
|---|---|---|
| 1 | **Contingent beats flat at equal all-in cost**, measured on incremental *margin* against a holdout, by more than the fee stack — a required unit lift of ~2–3.4% against exchange friction alone, ~7–10% with a 2% facilitator take ([§8](01-math.md)) | **Never measured by anyone.** Every published number — Forme's 4x traffic, Playably's 18.25x ROAS — is vendor-reported, uncontrolled, and never benchmarked against an equal-EV discount |
| 2 | **The edge survives at real cart values** ($100–500), not just candy | Against. The pro-probabilistic field work ran on $0.75 candy and $4.50 DVDs; at $60–70 baskets only **31.7–44.1%** chose the gamble ([Attari 2022](https://ideas.repec.org/a/eee/jbrese/v143y2022icp366-374.html)) |
| 3 | **The edge survives transparency.** The profit mechanism in the literature is consumers *over*estimating the event probability ([Ailawadi 2014](https://ideas.repec.org/a/eee/ijrema/v31y2014i1p94-106.html)) | Against. When a promo's odds were computable, overestimation vanished entirely — expected 9% vs realized 11% ([Akbari & Wagner](https://link.springer.com/article/10.1007/s41471-021-00110-y)). A publicly-quoted market price is the most transparent mechanic possible |
| 4 | **Merchants will run a mechanic they have never run.** This is the new central risk, and it replaces "can we make it safe?" | Untested, and the base rate is discouraging: ~6 documented promos, most of them supplier-prompted. The counterweight is that adoption is now a *marketing-budget reallocation* decision, not a solvency decision — a far lower bar than the old framing implied |
| 5 | **Someone can legally hold the position.** Either an ISV agreement with Kalshi, or merchant-as-principal | Unresolved. Kalshi's Developer Agreement §3 limits API use to "a members own trading" and §3.2 bars "facilitating trading… by other members." Kalshi separately names ISVs as a sanctioned class, but no ISV terms are public. Merchant-as-principal with auto-execution raises an unexamined **CTA registration** question |
| 6 | **Enough merchants have a hedgeable trigger** | Mixed. Marquee sports and Fed decisions have depth; **weather and CPI cannot absorb even $25,000** ([live orderbook](https://api.elections.kalshi.com/trade-api/v2/markets/KXHIGHNY-26AUG15-B84.5/orderbook?depth=100)) — the most charming local triggers are the least hedgeable |
| 7 | **It doesn't decay.** Merchants run a *second* campaign | **Zero documented second campaigns** by any merchant with any provider, across four tentpole events in 2026. The only counter-claim is one vendor's unaudited "100% retention" |

**Condition 1 is unchanged from the day this repo opened, and it is still the load-bearing unknown.**
Nobody has measured whether the contingent version produces more incremental margin than the
equal-cost flat discount. That is why the product ships with a **holdout control group by default** —
not as a nicety, but because it is the only asset in the category that compounds.

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
escape velocity. The consumer-paid comps scale; the merchant-paid ones stall — and this product is
merchant-paid, competing directly against the discount budget.

**So the unicorn case is real but conditional, and the conditions are specific:**

1. **Condition 1 must resolve favorably** — contingent beats flat on incremental margin at real cart
   values, at equal all-in cost. Nobody on earth has run this test. It is cheap, it is the whole thesis,
   and whoever runs it first owns the only genuinely compounding asset in the category.
2. **You must end up owning risk or distribution.** Facilitating is the death seat. That means either a
   licensed underwriting structure (capital, regulation) or being the default inside Shopify — and
   Shopify's own Payments policy currently points away from the category, which is simultaneously the
   moat and the risk.
3. **The mechanic must not be a one-shot.** Zero documented repeat campaigns is the quietest and most
   alarming number in the whole corpus.

**What that means for this build.** The venture question is not the hackathon question. The mechanic is
real, it shipped in 2026, and **no self-serve merchant-side tooling exists for it** — the six
documented 2026 promos ([`02-business.md`](02-business.md) §7) were hand-sized one-off hedges, and the
one live competitor runs a bespoke concierge motion, not a product — and the pre-trade feasibility
engine (trigger→contract resolution, depth and spread gating, effective-discount quoting) can be built
and validated entirely against Kalshi's public read API before anyone signs anything.

Two claims to lead with, in this order. **First: this costs about what your discount costs** — say the
6%, show the effective discount, never the contract probability. **Second: we refuse to sell a promo we
can't hedge.** Both are more defensible than a checkout badge, and both are true.

Business breakdown: [`02-business.md`](02-business.md) · Unit economics: [`01-math.md`](01-math.md) ·
Comps: [`03-venture-scale.md`](03-venture-scale.md) · Teardown: [`04-adversarial-review.md`](04-adversarial-review.md)

---

*Business analysis, not legal or financial advice. Prediction-market law is moving quarterly and the
sports-contract litigation weekly; re-verify before committing capital.*
