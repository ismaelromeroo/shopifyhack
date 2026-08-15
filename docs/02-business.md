# 02 — The Business: What's Sold, To Whom, Under What Structure

**Date:** 2026-08-15
**Scope:** The commercial layer on top of [`01-math.md`](01-math.md) — the frame, the product
surface, the facilitator-vs-underwriter fork, pricing, adoption, beachhead, moat, competitors, the
compliant architecture, and what actually breaks.

---

## The decision, up front

**What's sold: a different shape for the discount budget the merchant is already spending.** Not a new
line item. Instead of 10% off for everyone, a 1-in-10 chance the order is free — priced, hedged, and
capped before launch, at roughly the cost of the discount it replaces.

**How it's built: as a FACILITATOR.** The merchant is principal, owns their own Kalshi account, owns
the refund obligation. We sell trigger selection, feasibility gating, live sizing, and refund execution.

That is the only structure buildable without an insurance license or a balance sheet — and it is also
the structure with the **worst survival record in the closest comp set**. In embedded protection, the
companies that cleared $1B own either the **risk** (Cover Genius, Extend) or the **distribution**
(Route's consumer app). The pure software layer in between went 0-for-3: Clyde was
[asset-acquired in a fire sale alongside layoffs of 50–60% of ~45 staff](https://coverager.com/cover-genius-acquires-the-assets-of-clyde/),
Mulberry announced a turnaround, and Seel has
[not raised since a $17M Series A in January 2022](https://fintech.global/2022/01/19/seel-secures-series-a-for-e-commerce-insurance/).

Both things are true and this doc does not resolve them. The facilitator is the *correct build* and the
*wrong-shaped business*. Everything below says how wrong-shaped, and where the narrow version works.

**The central commercial risk is no longer safety. It is adoption.** The old framing — "merchants want
to run contingent promos but the risk is terrifying, so we make it safe" — assumed a behavior that does
not exist at scale. Six documented cases exist. The load-bearing question is now whether a merchant will
run a mechanic they have never run, against a flat discount that is free to configure and takes one
click. §6 is about nothing else.

---

## 1. The frame: this is a discount, and that is the point

**Start from the behavior that actually exists.** Almost no merchant runs contingent promos. Nearly
every merchant discounts, constantly, and has a budget line for it that is already approved.

So the problem being solved is not *"I want to run a lottery promo but it's too risky."* It is
*"I spend real money on discounts and get nothing memorable for it."*

**The three complaints about discounting** — stated as the premise this product tests, not as findings:

| Complaint | What it means |
|---|---|
| **Non-incrementality** | A large share of promo sales go to buyers who were going to purchase anyway. The discount is a transfer, not a purchase driver |
| **Reference-price erosion** | Repeated discounting resets what customers believe the thing costs and trains them to wait for the next sale |
| **Invisibility** | Nobody has ever told a friend about 20% off. A flat discount buys margin reduction and no attention |

> **Provenance, stated plainly:** these three are the standard complaints from the promotions
> literature. This repo's research pass did **not** independently verify them and they carry no
> citation here. Treat them as the premise under test, not as evidence. The one piece of *our own*
> corpus that bears on invisibility is indirect but real: a Manhattan bar's $5,000 contingent promo was
> covered by [CNBC](https://www.cnbc.com/2026/06/03/kalshi-wants-small-businesses-to-hedge-like-wall-street-a-nyc-bar-is-trying-it-with-knicks-promotion.html)
> and Fortune. No bar's 20%-off night has ever been covered by CNBC. That is an inference from a press
> cycle, not a measurement of lift.

**The obstacle, which is the whole reason the product exists.** No merchant can promise "your order is
free if X happens," because if it hits they owe *every* customer at once. A $200 AOV store with 100
promo orders is one Packers win away from a $20,000 unbudgeted liability. That is why almost nobody does
this — **the absence of the behavior is evidence FOR the product, not against it.** You could not price
this promise until there was a liquid, public market in the underlying event. There now is one.

**The mechanism.** A prediction-market contract pays $1 if the event happens and costs approximately the
probability of the event. Buy one contract per dollar of possible liability and an unbounded promise
becomes a fixed, known, pre-paid price. The full derivation, including fees and spread, is in
[`01-math.md`](01-math.md) §3.

**The closing equivalence.** 100 orders × $200 AOV = $20,000 of covered sales. Trigger at `p` = 10%.

| What the merchant runs | Cost | vs. the flat discount |
|---|---|---|
| **Flat 10% off, everyone** | **$2,000** | baseline |
| Contingent, exchange cost only — `p + 0.07·p·(1−p)` = 10.63% | **$2,126** | **+6.3%** |
| + half-spread at a 1c market | $2,226 | +11.3% |
| + 2% platform fee on order value | $2,626 | +31.3% |
| Crossing the **median 5c** book instead, no platform fee | $2,626 | +31.3% |

Read the whole ladder, not just the top rung. **"About 6% more than the discount you already run" is
true of the exchange cost and only the exchange cost.** Add a realistic spread and our fee and the
honest number is roughly a third more, which is a different sentence. Note the last two rows are the
same number by coincidence and it is a useful one: **crossing the median Kalshi book costs the merchant
exactly what our entire fee costs them.** That is the case for the feasibility gate in §3 stated in
dollars. The 6.3% line matters because it
is the *floor* — the irreducible cost of converting a flat discount into a contingent one is small. The
rest is friction we control (fee) or select against (spread; see the feasibility gate in §3).

Two more asymmetries, both small at this size and both real:

- **Processing fees are not refunded.** If the trigger fires, the merchant refunds $20,000 and eats
  ~2.9% + 30c on it (~$610); the flat discount instead avoids processing on the $2,000 not charged
  (~$58). In expectation at `p`=10% that's roughly **$60–120 against the contingent version**. Store
  credit removes it entirely (§2, constraint 3).
- **The float runs backwards.** Refunds leave the merchant's account immediately; Kalshi settles in
  60–300 seconds but ACH out takes 3–5 business days.

**The objection is the thesis.** "Isn't this just a discount with extra steps?" — yes. It is a discount.
It costs about what your discount costs. The difference is that people talk about this one, and the
whole business rests on whether that difference produces more incremental margin than the equal-cost
flat discount. **Nobody has ever measured that.** See §12.

---

## 2. What is sold, and to whom

**Sold:** a promotion *instrument* — a legally-structured, hedge-feasible, machine-executed
"buy now, get your money back if X happens" campaign, with the refund liability continuously matched by
prediction-market contracts in the merchant's own account.

**Bought by:** merchants who are already spending on discounts and are dissatisfied with what that spend
buys them. That is nearly all of them, which is a much larger and much vaguer population than
"merchants who run contingent promos" (~6 documented). The change in customer definition is the point
of this rewrite; it makes the market real and the sales conversation harder, because a vague
dissatisfaction is not a purchase intent.

**Not sold:** the hedge. The hedge is a commodity — Kalshi's trading API is fully public with
[open self-serve onboarding and RSA-signed order placement](https://docs.kalshi.com/api-reference/orders/create-order-v2.md),
and Kalshi markets small-business hedging itself. Anyone who reads the docs can place the trade.

**The four things a merchant genuinely cannot do alone:**

| Job | Why it's hard alone | Hard for us? |
|---|---|---|
| **Trigger → contract resolution** | 13,029 live series; the promo terms and the contract's `rules_primary` settlement text must match or you own uncovered basis risk | **Yes — the real work** |
| **Feasibility gating** | Median Kalshi market: **5c spread, 200 contracts at the touch, 44% with no two-sided quote** ([measured](https://api.elections.kalshi.com/trade-api/v2/markets?limit=1000&status=open)) | **Yes** |
| **Live sizing as orders land** | Liability accrues per checkout; nobody rebalances a hedge by hand at 3am | **Moderate** |
| **Mass refund execution** | Tag cohort → bulk `refundCreate` at settlement, idempotent, reconciled | **No — a weekend** |

Note what the feasibility row does to the pricing ladder in §1: the difference between the median
market's 5c spread and a tentpole's 1c spread is ~2 points of effective discount. **Refusing bad
markets is a pricing feature, not just a safety feature.** The pitch a merchant buys is
**"we will not let you sell a promo we cannot cover at a price that beats your discount."** That is a
refusal product, and refusal is the defensible part.

---

## 3. The product surface on Shopify

| Stage | What it is | Difficulty | The specific trap |
|---|---|---|---|
| **Install / setup** | Remix + Polaris admin, OAuth, `write_orders` scope | Trivial | — |
| **Trigger selection** | Plain-English → exact market ticker + settlement-source confirmation | **Hardest** | A promo saying "if the Packers win" vs a contract with different forfeit/suspension handling = uncovered basis |
| **Feasibility gate** | Live spread/depth/position-limit check; refuse the promo if it fails | **Hard** | The gate must run at *setup*, not at first order |
| **Offer display** | Product-page badge via theme app extension | Easy | Checkout-*step* UI extensions are **Shopify Plus-gated**; only Thank-you / Order-status work on all plans |
| **Order tagging** | Tag or metafield at `orders/paid`, cohort persisted by the app | Easy | Shopify states webhook delivery **"isn't always guaranteed"** and is **not ordered** — [webhook is a hint, reconciliation is truth](https://shopify.dev/docs/apps/build/webhooks) |
| **Live hedge sizing** | Threshold rebalance against `SUM(tagged liability) − Kalshi position` | **Hard** | Never accumulate from events; always hedge to the *difference*. Deterministic `client_order_id` per order or a redelivered webhook double-hedges |
| **Settlement** | Kalshi settles in **60–300 seconds** post-outcome | Easy | ACH out is **3–5 business days**; Shopify refunds debit the merchant immediately |
| **Refund execution** | Bulk `refundCreate` over the tagged cohort | Easy | **`@idempotent` directive is required as of API 2026-04**; Admin GraphQL is a leaky-bucket **point** budget, not a call budget — check the current per-plan bucket size and restore rate in [Shopify's rate-limit docs](https://shopify.dev/docs/api/usage/rate-limits) before sizing a mass refund. It is far tighter than the tens-of-thousands-per-minute some third-party blogs claim |
| **Holdout control** | Random N% of eligible traffic sees the equal-cost flat discount instead | Easy | **Ships on by default.** It is the only way the load-bearing unknown in §12 ever gets answered |

**Three constraints that shape the product, not just the code:**

1. **Shopify Payments refunds run out at ~120 days.**
   [Bank-dependent, not a hard rule](https://help.shopify.com/en/manual/payments/shopify-payments/payouts/refunds) —
   but a September purchase settling on a February Super Bowl is ~150 days and falls outside it. This
   silently kills most season-long sports and most macro horizons on the card rail.
2. **The original processing fee is not refunded.** A "100% refund" costs the merchant ~2.9% + 30c
   *more* than the hedge returns — the asymmetry priced in §1.
3. **The float runs the wrong way.** Refunds leave immediately; hedge proceeds land days later. At
   $6k this is nothing. At $600k it is a working-capital event. This is the strongest argument for
   **store credit as the default reward** — it settles instantly and costs roughly **`r·c` of a cash
   refund**, where `r` is the redemption rate and `c` the COGS rate: `0.50 × 0.35 ≈ 0.18` for a bar,
   `0.70 × 0.55 ≈ 0.39` for merch, i.e. **~2.6–5.7× cheaper**. Note the saving is dominated by
   redeeming at *cost*, **not** by breakage — and escheat law in states like NY and GA can claw the
   breakage term back toward zero. *(Modelled, with assumed `r` and `c`; not measured.)*

---

## 4. Facilitator vs. Underwriter — the fork

| | **FACILITATOR** | **UNDERWRITER** |
|---|---|---|
| Who holds the Kalshi position | Merchant | You |
| Who owes the customer | Merchant | You |
| Capital required | ~None | Balance sheet + reinsurance |
| Licensing | Promotions law only | **Prize indemnity is an authorized insurance line** — [N.Y. Ins. Law §1113(a)(27)](https://www.dfs.ny.gov/insurance/ogco2003/rg030315.htm) — 50-state producer/surplus-lines question |
| Revenue shape | Fee on placement / GMV | Premium minus losses, plus float |
| Value capture | **Thin, DIY-collapsible** | Thick, but slow and capital-bound |
| Merchant experience | Merchant opens a brokerage account, signs exchange terms, holds a position | **One button. No account, no trade, no basis homework** |
| Comp record | Clyde, Mulberry, Seel — 0-for-3 | Cover Genius, Extend — both cleared $1B |

**Seamlessness is what the merchant wants, and it is the direction of travel.** The row that matters
commercially is the second-to-last one. A merchant asked to open a Kalshi account, accept exchange
terms, and hold a live position to run a promotion is being asked to become a trader. Almost none will.
Every $1B comparable in the adjacent category resolved this the same way — **the platform holds the
money and the risk**, and the merchant sees a checkbox. Cover Genius and Extend own the risk; Route owns
the consumer relationship. Nobody cleared $1B selling the seam between them.

So the honest statement of the roadmap is: **the facilitator is the shippable v1 and the instrument that
collects the data; it is not the terminal shape.** Moving to principal costs an insurance license and
capital, and it is a different company with different investors. Two cautions against treating it as an
escape hatch:

- **Cover Genius** is marked at [**US$1.9B on a $100M raise backed by Vista Credit Partners**](https://www.insurancejournal.com/news/national/2026/07/16/877769.htm)
  (July 2026). No source states whether the instrument is debt or equity — the "credit facility" read
  is an *inference* from the counterparty's identity, not a disclosed fact. Treat as a soft mark.
  (The "A$2.71B / $2B+" headline is the same number in AUD, not a second valuation.)
- **Extend's $1.6B is a 2021 print** — [$260M Series C led by SoftBank Vision Fund 2](https://www.extend.com/news-press/extend-announces-260m-series-c-led-by-softbank-vision-fund-2-with-over-1-6b-valuation),
  never re-tested through the rate reset.
- **The structurally closest analog is the weakest result in the set.** Sensible Weather sells a
  literal outcome-contingent refund at checkout, has real traction (1M+ guarantees, 8,000+ locations),
  and has raised only [~$22.2M with no Series B since its $12M Series A in May 2022](https://www.prnewswire.com/news-releases/climate-technology-company-sensible-weather-secures-12m-series-a-301539194.html)
  (led by **Infinity Ventures**). 35 employees as of Feb 2026. Good product, no venture escape.

**The tell nobody in the trade press names:** every $1B+ comp collects a **consumer-paid** premium and
keeps a spread on a pool that scales with GMV. This product is **merchant-paid** and competes against
the discount budget. The embedded-insurance TAM does not transfer, and neither does its take rate.

**Verdict on the fork.** Facilitator for the build. Own the risk later if and only if the §12
measurement comes back positive — and note that the two nearest risk-owning analogs in *this specific*
niche, SCA Promotions and Sensible Weather, both cap in the tens of millions after decades.

---

## 5. Pricing

The merchant's comparison object is **their own flat discount**, so price against that, not against an
insurance quote. Worked on a **$60,000 covered-sales promo, full refund, 1-cent spread.** Hedge all-in
per $1 of coverage = `p + 0.07·p·(1−p) + spread/2` — the closed form derived in
[`01-math.md`](01-math.md) §3–4, verified against
[Kalshi's fee schedule](https://web.archive.org/web/20260218003606if_/https://kalshi.com/docs/kalshi-fee-schedule.pdf)
(no settlement fee, no membership fee, free ACH).

| Trigger `p` | Hedge all-in | + 2% platform fee | **Merchant's effective discount** | The flat discount it replaces |
|---|---|---|---|---|
| 5% | 5.83% | 7.83% | **7.8%** | 5% off |
| 10% | 11.13% | 13.13% | **13.1%** | 10% off |
| 20% | 21.62% | 23.62% | **23.6%** | 20% off |

The UI must display **effective discount** against **the flat discount the merchant would otherwise
run**, not contract probability. The gap is **2.8–3.6 points** across that band — of which **0.8–1.6
points is exchange friction the merchant pays to Kalshi** and 2.0 points is our fee. Only the first part
is invisible to the merchant, and surfacing it is the entire reason the UI exists.

Framed the way a merchant will actually hear it: *"you were going to run 10% off; this costs like
13% off."* That is a legible, checkable sentence, and it is the sentence the product lives or dies on.

**Four pricing models, honestly graded:**

| Model | On the $60k promo | Ceiling / failure mode |
|---|---|---|
| **Flat SaaS** ($99–299/mo) | $99–299 | Only [**7,966 Shopify stores spend >$500/mo on apps; 1,602 spend >$1,000/mo**](https://eightx.co/blog/average-ecommerce-shopify-app-spend-by-revenue-band-2026) (Storeleads panel, modeled ±25%). Hard cap well under $100M ARR |
| **% of covered GMV** (2%) | $1,200 | Shopify's rev share is assessed on **gross with refunds explicitly not deducted** — [15% above the first $1M lifetime, plus 2.9% processing](https://shopify.dev/docs/apps/launch/distribution/revenue-share). Uniquely hostile to a refund business |
| **Markup on hedge premium** (+20%) | $1,200 | **Collapses to zero on DIY.** This is the fee the merchant learns to skip |
| **Underwriting fee** (3–5% of covered sales) | $1,800–3,000 | This is insurance. See §4 |

**Is it cheaper than the incumbent?** Not clearly, and the corpus does not support the claim that it
is. Prize indemnity is quoted at
[**3–15% of prize value**](https://www.supermoney.com/encyclopedia/prize-indemnity-insurance) — but
that band is **probability-indexed**, not a flat load. A `p`=10% trigger carries a 10% expected loss,
so a carrier must price at or above the top of that band; the exchange route's 13.1% all-in is roughly
**at parity**, not a 2–3× saving. The one measured comparison — Game Point Capital pricing an NBA
playoff berth at [**6% on Kalshi vs 12–13% OTC**, and second-round advancement at 2% vs 7–8%](https://defirate.com/news/blanket-kalshi-prediction-market-small-businesses/) —
shows a genuine gap, but at *low* probabilities and from a single firm. **Do not build the pitch on
being cheaper than a carrier.** Build it on being *the same price as the discount they already run*,
plus speed, self-service, and granularity.

---

## 6. Adoption — the central commercial risk

The old risk was *"can we make this safe?"* That question is answered: buy one contract per dollar of
liability and the cost is fixed and known before launch. The live risk is **"will a merchant run a
mechanic they have never run, when the alternative — a flat discount — is free to configure and takes
one click?"**

**The size of the ask, stated without flattery.** The entire documented record is six 2026 promos (§9),
and the most-cited one exists because Kalshi's team cold-reached-out after a Bloomberg story. There is
no template, no agency that pitches this, no benchmark to compare against, and no internal precedent a
marketing lead can point to when it goes sideways. The switching cost is not money — it is attention,
and the discomfort of explaining a novel thing to your own customers in writing.

**Why the sale is nonetheless materially easier than most: it is a REALLOCATION, not a new line item.**

| Dimension | New-line-item sale | This sale |
|---|---|---|
| Budget | Must be created; competes with everything | **Already exists and is already approved** |
| Approver | Finance / new-vendor review | The same marketing or growth owner who signs off on "20% off" |
| ROI question | "Is this worth money?" — unfalsifiable | **"Does this beat the discount I ran last month?" — decidable, and we ship the holdout to decide it** |
| Downside if it flops | Wasted new spend, visible | Spent the discount budget, got a discount's results |

That last row is the whole low-risk story, and it is genuine: the merchant's floor outcome is
approximately the outcome they were already buying. The corresponding hazard is that the same logic
sets the bar at **"worth the extra work,"** not "worth the money" — we are competing with a zero-effort
internal alternative, and inertia wins ties.

**The first-use wedge — six design commitments that make trying it cheap:**

1. **Cap the first promo small.** $10–25k of covered sales. The hedge is a rounding error, the
   $25,000 per-contract position-limit ceiling is never touched (§11), and nobody needs approval.
2. **Spend budget that already exists.** The pitch is "run your next sale in this shape," not "add a
   channel." No new PO.
3. **National tentpole triggers only, at first.** Super Bowl, March Madness, World Series, FOMC —
   where the book is deep, the spread is 1c not the 5c median, and the pricing ladder in §1 stays near
   its floor.
4. **Refuse anything we cannot cover.** The feasibility gate is the trust artifact. A vendor that says
   "no, that trigger is unhedgeable" is the vendor you let near a promise to your customers.
5. **Holdout control on by default.** The merchant's first run produces the number that does not exist
   anywhere in this category (§12). That is the offer: *we will tell you whether it worked, against
   your own equal-cost discount, on your own traffic.*
6. **Store credit as the default reward.** Kills the float problem (§3) and cuts realized cost
   ~2.6–5.7×, which makes the "what if it fires" conversation short.

**The sales conversation changes accordingly.** It is not "want to run a Mattress Mack promo?" It is:
**"what did your last sale actually buy you?"** — followed by "here is the same money in a shape people
repeat." If the merchant can answer the first question with a measured incremental-margin number, they
are a sophisticated buyer and will demand our §12 evidence, which we do not have yet. If they cannot —
and most cannot — the holdout is the product.

**The honest counterweight, kept in front:** the strongest academic result in our corpus cuts against
the value prop. [Gaertig & Simmons](https://academic.oup.com/jcr/article/52/5/1022/8171334) find the
probabilistic-discount edge appears mainly when the sure discount is or *seems* trivial. See §11, row 1.

---

## 7. GTM, beachhead, and honest sizing

Two candidate customers, and they pull in opposite directions.

| | **DTC Shopify brands** | **Local physical retail** |
|---|---|---|
| Reachable via app store | **Yes** | Barely — they're POS or offline |
| AOV | [Median ~$85–92](https://redstagfulfillment.com/average-order-value-for-shopify-stores/) — "your purchase is free" has little teeth | $3,000+ (furniture, mattress, auto) |
| Fan geography | **None** — national by design | **Strong** — the whole Mattress Mack mechanic |
| Can DIY the hedge | Yes, easily | **No** — the real wedge |
| Trigger liquidity | Fine on national tentpoles | Regional triggers are **unhedgeable** |

**The cruel crossing:** the merchant who most needs this (local, big-ticket, fan-identified) is the one
least reachable through Shopify and least served by liquid contracts. The merchant most reachable has
the smallest basket and no geography. The incumbent already knows this — **SCA's best case studies are
college programs** (Texas A&M, Memphis), because there are only
[**45 US DMAs with a major-league team and ~7 true single-team DMAs**](https://www.tvb.org/wp-content/uploads/2021/06/Pro_Sports_by_DMA.pdf),
against ~**134–136 FBS football programs** (NCAA membership shifts each season with realignment —
treat as approximate).

**Beachhead = the overlap, qualified by discount behavior.** Shopify merchants with **AOV ≥ $150** in
home/furniture, mattress, jewelry, or high-ticket apparel, **who already run recurring sitewide
promotions** (observable from the storefront), running **national tentpole triggers** where depth is
real. The qualifying question is the discount cadence, not an interest in prediction markets.

Sell it, don't list it: the App Store adds
[**~500–865 new apps a month**](https://www.appjubilee.io/shopify-app-store-report-2026), so organic
discovery is a dead channel for a mechanic nobody is searching for — and under the new frame that is
doubly true, because the merchant does not know this category exists to search for it. This is an
outbound, ~10-logo, concierge motion — exactly what the incumbent's dormant listing implies
(Playably's Shopify app has [**2 reviews since February 2025**](https://apps.shopify.com/playably)
while its real revenue runs off-platform as bespoke deals).

**Sizing, bottom-up, with the assumptions inline.** The new frame makes it tempting to claim a slice of
all retail promotion spend. **Do not.** Adjacency-to-a-huge-number is the exact reasoning this repo
exists to kill. Build it from merchants:

| Input | Value | Source / assumption |
|---|---|---|
| Shopify stores spending >$500/mo on apps | **7,966** | [Storeleads panel, modeled ±25%](https://eightx.co/blog/average-ecommerce-shopify-app-spend-by-revenue-band-2026) — proxy for "will pay real money for a tool" |
| Share that is AOV ≥ $150 in the target verticals *and* discounts recurringly | **assumed 25%** ≈ 2,000 | **Unmeasured assumption.** No source; the single softest number here |
| Realistic share won in 3 years | **assumed 10%** ≈ 200 merchants | Outbound concierge motion, ~10 logos to start |
| Promos per merchant per year | **assumed 4** | Tentpole calendar: Super Bowl, March Madness, World Series, one macro. [`00-thesis.md`](00-thesis.md) and [`03-venture-scale.md`](03-venture-scale.md) §5 use a more conservative **2**; at 2 the revenue figure below halves to ~$480k. Note the tension with C3 in [`03-venture-scale.md`](03-venture-scale.md): a discount budget is continuous, but the *hedgeable* trigger calendar is episodic, and it is the calendar that caps this number |
| Covered sales per promo | **$60,000** | The §5 worked example |
| Take at 2% of covered GMV | **$1,200 / promo** | §5 |

**200 × 4 × $1,200 ≈ $960k of annual revenue** — before Shopify's
[15% rev share above the first $1M lifetime](https://shopify.dev/docs/apps/launch/distribution/revenue-share).
Double every assumption and it is ~$4M. **This is a small business at the facilitator take rate**, and
that conclusion is stable across any reasonable jiggling of the inputs. The paths out are a higher take
rate (own the risk, §4), a larger covered-sales figure per promo (enterprise / physical retail, which
is off-Shopify), or many more merchants (which requires the mechanic to become normal, which requires
§12 to come back positive). See [`03-venture-scale.md`](03-venture-scale.md).

---

## 8. The moat, ranked by defensibility

1. **Settlement correctness + basis-risk gating.** Hardest to copy: a rules corpus over 13,029 series,
   where errors are financially catastrophic and reputationally fatal. Accretes trust and data.
2. **Cross-merchant incrementality measurement.** The only *compounding* asset — and **nobody has it**.
   No measured, third-party incremental-lift figure exists for this mechanic anywhere; a 35-year-old
   underwriter publishes [one unquantified testimonial](https://www.oddsonpromotions.com/miscellaneous/conditional-rebate-sports)
   and no numbers. Under the new frame this is also the *sales* asset, not just the moat: the only
   thing that converts a discount-fatigued merchant is a credible "it beat your flat discount by X."
   Requires hundreds of promos with holdouts. You will not have it at seed.
3. **Compliance work product.** 50-state registration thresholds, AMOE templates, per-state rules.
   Tedious, not clever, genuinely risky to redo.
4. **Sizing calibration.** The policy is publishable; the calibration (threshold widths, per-series
   depth history) is earned from operating data.
5. **Checkout integration.** A weekend. Not a moat.

**Be honest about the collapse.** A pure hedge-placement fee goes to zero the moment the merchant reads
Kalshi's public docs. The adjacent market already ran this play: Navidium showed Shopify merchants they
could self-fund shipping protection and
[keep 100% of the fees](https://www.shipaid.com/blogs/shopify-app-comparisons/navidium-shipping-protection-vs-route-protection-and-tracking-an-in-depth-comparison),
and the third-party risk-transfer margin compressed *(source is a competing vendor's blog — motivated
framing, but the mechanic is real and uncontested)*. The same logic applies with **more** force here,
because a merchant who understands that a 10% trigger costs 10% has already done the only hard math in
the product. What does not collapse is the measurement layer in #2 — a single merchant cannot build a
cross-merchant benchmark, no matter how well they read the API docs.

---

## 9. Competitive landscape

| Who | What they are | Read |
|---|---|---|
| **[Playably](https://playably.ai/)** | Direct competitor. Charges a "predetermined underwriting percentage," fronts the payout, and states on its own site: *"We insure and hedge the payout."* Self-reports **30+ Shopify brands, 100% retention** | Risk **intermediary**, not a warehouse — which weakens the "unlicensed insurer" read but leaves the licensing question open. Take rate undisclosed. Note they chose the seamless side of §4 |
| **[Blanket](https://fortune.com/2026/08/07/exclusive-kalshi-blanket-small-business-hedge-hypergamblification/)** | Plain-English risk → Kalshi contract matcher. **Executes no trades, holds no funds** | **Not a Kalshi product** — built and owned by Lauris Zminsky; Kalshi's spokesperson calls it "a fully external project" and confirms its compliance team was not involved. Most headlines get this wrong. The no-execution design is the most copyable decision in the space |
| **Kalshi** | Runs a first-party small-business hedging page, has a BD lead for the segment | Not vertically integrated into promos — no SMB desk, no merchant fee schedule. But it is *the supplier*, and it is looking down-market |
| **SCA Promotions / Odds On / IC Group** | The 40-year licensed incumbents already selling "Sports Event Rebates" and explicitly marketing the Mattress Mack story | SCA revenue estimates conflict **$22M–$44M** (two unaudited scrapes). Odds On is now inside a [Goldman-backed DOXA rollup](https://doxa.com/programs/odds-on-promotions/) — slow, durable, a plausible acquirer |
| **Sensible Weather** | Consumer-paid weather guarantee at [**8–12% of cart**](https://sensiblehelp.zendesk.com/hc/en-us/articles/29198337215635-How-much-does-a-Weather-Guarantee-cost) | Closest structural analog; the price-equals-probability identity confirmed in the wild across 1M+ transactions |
| **A flat 20%-off coupon** | **The actual incumbent** | Free, one click, universally understood, requires no counterparty and no disclosure. This is what we lose to, not to Playably |

**The precedent record — demoted from premise to evidence.** These six 2026 promos are **not the market
we serve**; six merchants is not a market. They are useful for exactly one thing: **evidence that the
mechanic generates attention a flat discount cannot buy.** Read them that way and nothing else.

- **The Jeffrey (NYC bar)** — Knicks won Game 1 105-95; **the trigger fired**, tabs were honored, and
  the bar reported [**net profit of $8,514 on a $5,000 hedge**](https://www.cnbc.com/2026/06/03/kalshi-wants-small-businesses-to-hedge-like-wall-street-a-nyc-bar-is-trying-it-with-knicks-promotion.html).
  Covered by CNBC and Fortune, not merely self-reported. This is the only end-to-end proof that exists —
  and it happened because Kalshi's team cold-reached-out after a Bloomberg story. **A press cycle, not a
  market.**
- **TallBoy (DC bar)** — USA beat Paraguay 4-1; fired, ~$4,000 of tabs covered. *(Trade-press
  and operator-reported; we found no independent confirmation of the tab figure.)*
- **[Forme](https://www.modernretail.co/marketing/why-forme-launched-a-world-cup-promotion-hedged-on-kalshi/)**
  — did not fire. Self-reported 4× WoW menswear traffic, ~20× to top styles; **conversion, AOV, revenue,
  and hedge cost all undisclosed.** Note the promo ran June 26–30, *after* the USMNT won Group D, so the
  live probability was roughly **6–10%** (Opta: 10.25% on June 21, 6.06% on July 2) — not the ~3%
  pre-tournament figure often quoted. Traffic multiples with no margin figure are the exact number §12
  exists to replace.
- **EGOHOME (mattress)** — did not fire. $2,500 staked for ~$55,000 of payout = **4.5% implied
  probability** *(both figures vendor-reported, not independently verified)*. Refund liability was
  never disclosed, so the *coverage ratio* is unknown; do not read 4.5% as the promo's cost.
- **Jordan's Furniture** — [~$50M liability on a **compound** trigger (both UConn teams reaching their
  title games)](https://www.wbur.org/news/2026/04/03/march-madness-jordans-furniture-refund-uconn-final),
  did not fire. Critically: hedged with **insurance**, premiums set as a percentage of sales. The
  longest-running real-world operator of this mechanic routes through the insurance market, not a
  prediction market — which is a fact about §4, not a fact about demand.

---

## 10. The compliant architecture — and why

Not a workaround. This is the structure that keeps the product on the right side of four separate
regulators, stated as design invariants enforceable in code.

**1. Merchant is principal, always.** The merchant opens the Kalshi account, holds the position, and
owes the customer. The moment you say "we cover your payout," you are doing an insurance business —
prize indemnification is an **expressly authorized line**, and state codes reach conduct "in substance
equivalent" to insurance, so relabeling an indemnity as a "hedge" does not cure it. Note §1113(a)(27)
conditions coverage on a **"lawful contest"** — the insurance route and the gambling question are
coupled, not independent. This invariant is also the thing the seamlessness argument in §4 wants to
break; breaking it is a licensed-company decision, not a product decision.

**2. Never touch refund money.** Refunds issue as native Shopify refunds on the merchant's own rails;
the app only *instructs*. The agent-of-payee exemption
([recognized in 42 states](https://www.csbs.org/agent-payee-exemption-map)) covers customer→merchant
flows — a promo refund runs merchant→customer, which is the textbook money-transmission fact pattern
and sits outside the exemption's logic entirely.

**3. No price uplift on promo-eligible orders — ever.** The lottery test is prize + chance +
consideration. A uniform external trigger does *not* remove chance: the NY-model statute reaches
staking value on "a future contingent event not under his control." The defense is **no consideration
and no risk of loss** — the buyer pays market price for goods they keep. Charging more for a
promo-eligible order creates the stake and destroys the defense. This is a hard product invariant, and
it is also why the reframe holds together: the merchant's discount budget funds the promise, so there
is never a reason to reach for the customer's wallet.

**4. Say what it is.** [16 C.F.R. §239.3](https://www.ecfr.gov/current/title-16/chapter-I/subchapter-B/part-239/section-239.3)
means a "Money Back Guarantee" is read as **unconditional** unless conditions are disclosed with
clarity and prominence. Use explicitly conditional language, disclose the trigger, the settlement
source, and the timing at the point of purchase. Register where required: **NY** (register + bond above
$5,000), **FL** (register + bond at $5,000+), **RI** (register only, above **$500**, retail-tied).

**5. Scope triggers to where federal and state posture agree.** Washington's court order — from the
most hostile state — is unusually clarifying: it requires geofencing of *sports, elections, politics,
entertainment, culture, tech/science and "mentions"* while
[**expressly permitting commodities, climate, economics and finance**](https://www.atg.wa.gov/news/news-releases/judge-orders-kalshi-cease-numerous-washington-operations).
The CFTC's June 2026 NPRM points the same way, placing economic indicators, financial indicators
(including the federal funds rate) and FX outside gaming review. **Exclude elections entirely** — 32
states restrict election betting, and [four (IA, MA, PA, RI) penalize the *organizer* rather than the
bettor](https://www.pewresearch.org/short-reads/2026/06/23/more-than-half-of-states-restrict-betting-on-elections/),
which is the seat a promo platform occupies.

**6. Two open questions, named not buried.**
- Kalshi's **Developer Agreement §3** limits API use to "facilitating a member's own trading" and
  prohibits facilitating other members' trading. `institutional.kalshi.com` names **ISVs** as a
  sanctioned integration class, but the ISV terms are not public. **Milestone one is a conversation
  with Kalshi, not code.**
- If the software **auto-executes** on the merchant's account, the
  [Commodity Trading Advisor definition](https://www.nfa.futures.org/registration-membership/who-has-to-register/cta.html)
  is technology-neutral and covers algorithmic discretion over commodity-interest accounts. Either keep
  a genuine per-trade authorization step, or treat CTA status as unresolved. It is unresolved.

**The bind, stated plainly.** The liquid triggers are sports; sports is the contested category. The
clean triggers are weather and CPI; those books
[cannot absorb even $25,000 of coverage](https://api.elections.kalshi.com/trade-api/v2/markets/KXHIGHNY-26AUG15-B84.5/orderbook?depth=100).
There is no configuration that gets both. Any honest version of this business picks a side and says so.

---

## 11. Operating risks

| Risk | Severity | Note |
|---|---|---|
| **The value prop may not exist** | **Fatal** | [Gaertig & Simmons, *JCR* 52(5), N=8,969](https://academic.oup.com/jcr/article/52/5/1022/8171334): the probabilistic edge appears only when the sure discount is or *seems* trivial. On their Likert measures every condition favored the sure discount; on binary choice at low stakes the probabilistic offer does win. Framing shifts magnitude; it does not reliably flip the sign at ordinary cart values. **This is the single biggest threat to the reframe** — it is a direct test of "same money, better shape" and it does not clearly pass |
| **Adoption of an unrun mechanic** | **High** | Six documented promos, no template, no benchmark, and a zero-effort incumbent (a coupon). Mitigations in §6 are design commitments, not evidence |
| **The margin source may be self-destructing** | **High** | [Conditional rebates beat certain rebates](https://ideas.repec.org/a/eee/ijrema/v31y2014i1p94-106.html) "mostly because consumers' subjective probability of the event occurring is higher than what market wisdom suggests." A publicly-quoted prediction-market probability is the most transparent possible mechanic — and when the mechanic was transparent in the field, overestimation vanished (expected 9% vs realized 11%) |
| **Kalshi rail availability** | **High** | Third Circuit affirmed a preliminary injunction for Kalshi in [*Flaherty* (Apr 6 2026, 2-1)](https://law.justia.com/cases/federal/appellate-courts/ca3/25-1922/25-1922-2026-04-06.html) — but that binds only NJ, PA, DE and USVI and is interlocutory. Outside it, Kalshi has lost or failed to obtain relief in NY (SDNY, July 7 2026), Washington, Connecticut, Nevada, Maryland and Ohio; Arizona's 20-count criminal prosecution **proceeded** after a federal judge declined to enjoin it |
| **Geofencing decoupling** | **High** | A merchant can be geofenced out of the hedge **mid-promo** while the refund promise stays binding. The promo obligation and the hedge have different jurisdictional triggers. Requires a residency check at promo creation and a kill switch |
| **Shopify platform policy** | **High** | Shopify Payments prohibits ["Products or services related to gambling, such as sports forecasting, lotteries, bidding, contests, or sweepstakes"](https://help.shopify.com/en/manual/payments/shopify-payments/onboarding/eligibility). The wording targets merchants whose *business* is contests, but a reviewer pattern-matching the mechanic could pull a merchant's processing — catastrophic for them, fatal for trust in us |
| **Position limits** | Medium | $25,000 per-contract cost basis remains standard in many contract terms; tiers run $25K / $7M / $50M. Max hedgeable liability = `$25,000/p`, so **$250k at p=10% but only $50k at a coin flip**. This is why the §6 first promo is capped small — the wedge and the constraint happen to agree |
| **Execution quality** | Medium | Slippage is **not** zero at merchant scale. A live re-measure of a deep NFL moneyline showed **+0.93c on a $50,000 hedge**, and top-of-book size varied **52×** between two markets in the same series on the same day. Depth is per-market and per-moment, not a series property. Every cent of spread moves the §1 ladder against the flat discount |
| **Novelty decay + cross-firm contamination** | Medium | A negative-spillover argument runs through this literature: one company's *losing* customers may sour consumers on every other company's probabilistic promo. A platform whose growth thesis is proliferating the mechanic is building its own decay curve. *(Directional; we did not pin this to a specific paper and it should not be cited as a finding.)* |
| **Horizontal-SMB-hedging precedent** | Medium | WeatherBill sold weather hedges to any business and failed — every prospect needed bespoke configuration, so there was no repeatable sales motion. It pivoted to agriculture and, as The Climate Corporation, [sold to Monsanto for ~$1.1B](https://en.wikipedia.org/wiki/The_Climate_Corporation). The escape was radical vertical focus. See [`03-venture-scale.md`](03-venture-scale.md) §5 |

---

## 12. The load-bearing unknown, unchanged

**Nobody has ever measured whether the contingent version produces more incremental margin than the
equal-cost flat discount.** The reframe does not soften this — it sharpens it, because the flat
discount is now the explicit comparison object rather than a background alternative.

One test, and it is cheap: **run a real promo against a plain equal-cost discount at 2–3 ordinary
merchants and measure incremental margin, not traffic, net of the trailing 60 days.**

That measurement does not exist anywhere. Not from a 35-year underwriter, not from Playably, not from
Forme, not from Kalshi. Every published figure in this category is self-reported traffic. This is why
the **holdout control group ships on by default** (§3) — the product is also the instrument.

If the mechanic beats a flat discount by more than the fee stack, this is a real business and the
measurement apparatus is the moat (§8, #2). If it doesn't, you've confirmed the kill for the price of a
weekend — and the weekend still ships a working product.

---

Thesis: [`00-thesis.md`](00-thesis.md) · Unit economics: [`01-math.md`](01-math.md) ·
Comps: [`03-venture-scale.md`](03-venture-scale.md) · Teardown: [`04-adversarial-review.md`](04-adversarial-review.md)

*Business analysis, not legal or financial advice. Prediction-market law is moving quarterly and the
sports-contract litigation weekly; re-verify with counsel before committing capital.*
