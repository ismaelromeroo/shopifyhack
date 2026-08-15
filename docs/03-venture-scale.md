# 03 — The Venture-Scale Case (Against Our Own Kill)

**Date:** 2026-08-15
**Status:** The prior **KILL** used the wrong comparable set *and* the wrong denominator. Correcting
both raises the ceiling and moves the binding constraint. Revised verdict: **CONDITIONAL — on an
incrementality question nobody has measured and an adoption rate nobody has observed.**

---

## The decision, first

- **Decision:** upgrade from *KILL* to *conditional*. Two things were wrong. The comp set (prize
  indemnity) measured the cost of selling a bespoke quote, not the ceiling of demand. And the
  denominator (merchants who run contingent promos, ~6 documented cases) measured a press cycle, not
  a market. **The addressable behavior is discounting, which every merchant already does.**
- **Blast radius:** nothing shipped. This changes what we *claim*, how we size, and what the one cheap
  test measures.
- **What decides it:** **C1** — does an equal-cost contingent discount produce more incremental margin
  than the flat discount the merchant is already running. Nobody in a 40-year-old category has
  published that number. Under the old frame it gated a small business. Under this frame it gates a
  large one, which makes it **more** load-bearing, not less.

Read §1 first. If the bear case doesn't land on you, the answer to it won't either.

---

## 1. The bear case, at full strength

Two separate bear cases apply. The old one was graded against prize-indemnity incumbents. The new one
is the failure mode of the reframe itself, and it is the more dangerous of the two.

### 1a. The old bear case (mostly survives)

**Move 1 — the arithmetic.** Revenue = **take rate × volume intermediated**. A $6,000 promo at `p`=0.10
moves $600 of premium; a 10% markup on that is **$60**. At a 2% take on order value — the assumption
carried through [`01-math.md`](01-math.md) §10 — a $20,000 campaign yields **$400**. Reaching $100M of
revenue at 2% needs **$5B/yr of promo GMV routed through the product**, which is ~1.3% of Shopify's
[$378.4B FY2025 GMV](https://s27.q4cdn.com/572064924/files/doc_financials/2025/q4/Shopify_Investor_Press_Release_Q4-25_FINAL.pdf).
That is a real bar. It is not a growth problem, it is a *routing* problem: 1.3% of everything sold on
the platform has to run through one promo mechanic.

**Move 2 — the incumbent ceiling.** [SCA Promotions](https://scapromotions.com/sports-rebates/) has
sold exactly this — *"offer your customers a full refund if your local team wins the Championship"* —
since 1986. Forty years as global #1, and the two third-party revenue scrapes disagree by 2×:
**$22.5M (Kona Equity) vs [$44.2M (ZoomInfo)](https://www.zoominfo.com/c/sca-promotions/105791883)**,
neither audited. Odds On did not compound either — [acquired by DOXA (Goldman Sachs AM-backed), 1 April
2024](https://doxa.com/programs/odds-on-promotions/), inside an insurance-distribution rollup. A
multiple play, not a product play.

**Move 3 — the sandwich.** The facilitator sits between an exchange taking the spread below and a
merchant who can DIY above, with distribution taking a slice sideways — Preferred Hotels takes a
[20% revenue share](https://www.sensibleweather.com/for-business/blog/preferred-hotels-partnership)
on every Sensible Weather guarantee sold through its network, and in adjacent shipping protection
Navidium already showed merchants they can self-insure and
[keep 100% of the fees](https://www.shipaid.com/blogs/shopify-app-comparisons/navidium-shipping-protection-vs-route-protection-and-tracking-an-in-depth-comparison)
*(competitor's blog — motivated framing, real mechanic)*.

Three facts make it worse:

- **The business already exists and is small.** [Playably](https://playably.ai/) runs event-triggered
  100%-cashback promos for Shopify brands and reports **"30+ Shopify brands launched, 100% retention"**
  — while its Shopify listing has **[2 reviews since 27 Feb 2025](https://apps.shopify.com/playably)**
  and is priced Free. The money runs off-platform as bespoke deals.
- **The closest structural analog stalled *with* product-market fit.** Sensible Weather sells a literal
  outcome-contingent refund at checkout — [1M+ guarantees, 8,000+ locations, 1,400+ hotels](https://www.businesswire.com/news/home/20251203904485/en/Sensible-Weather-Expands-Through-Hospitality-Solutions-Partnership-Now-Offering-Weather-Guarantees-at-1400-Hotels)
  — on **[~$22.2M raised, no Series B in four years, 35 employees](https://www.crunchbase.com/organization/sensible-weather)**.
- **The paying-app base is three orders of magnitude below the merchant headline.** Of ~3.59M active
  stores, only [**1,602 spend >$1,000/mo on apps**](https://eightx.co/blog/average-ecommerce-shopify-app-spend-by-revenue-band-2026)
  (modeled, ±25%) — so subscription pricing caps this well below $100M ARR.

### 1b. The new bear case: this reframe has a named failure mode, and it has a name

Widening the denominator from "merchants who run contingent promos" to "merchants who discount" is the
right correction. It is also **exactly the reasoning that killed WeatherBill.**

WeatherBill (2006) sold self-serve outcome-contingent hedging to any business. Founder David Friedberg:
*"The idea was to put the website up and the 70% of businesses with weather problems would show up...
it didn't happen."* Every prospect needed bespoke configuration, there was no repeatable sales motion,
and by late 2009 the balance was heading to zero. The [~$1.1B Monsanto
outcome](https://en.wikipedia.org/wiki/The_Climate_Corporation) came from **abandoning the horizontal
thesis** for corn and soybeans.

"70% of businesses have weather problems" and "100% of merchants discount" are the same sentence. Both
are true. Neither is a market. **A universal problem plus an unfamiliar mechanic equals a sales motion,
not a self-serve funnel** — and a sales motion is precisely the cost structure the comp swap in §2 was
supposed to escape. This is the single strongest argument against everything below, and it should be
read before the affirmative case, not after it.

---

## 2. The reframe: what the product actually is

The old framing was *"businesses run risky money-back promos; we make them safe."* That framing assumes
a behavior that does not exist. The entire documented record is ~6 cases, and the most-cited one — The
Jeffrey, a Manhattan bar — happened because Kalshi's team cold-reached-out after a Bloomberg story.
**That is a press cycle, not a market.** A product whose premise is "we de-risk an existing practice"
is addressing a few dozen merchants.

Here is the frame the rest of this document argues from.

**1. Every merchant discounts.** Constantly, and on a budget that is already allocated. This is the
universal, verifiable behavior.

**2. Discounting is bad in three ways — and grade them honestly, because only one is well-evidenced
here.** Most promo sales are **non-incremental** — the buyer was coming anyway, so the discount is a
transfer, not an acquisition (*widely believed, standard in the promotions literature, and **not**
independently verified in this repo's corpus*). Repeated discounting **erodes reference price** and
trains customers to wait for the next sale (*contested: [Alavi, Bornemann & Wieseke,
JM 79(2):62–78](https://journals.sagepub.com/doi/10.1509/jm.12.0408) find gambled discounts protect
internal reference price where flat ones damage it, but the largest meta-analysis in the area —
[51 studies](https://www.sciencedirect.com/science/article/abs/pii/S0022435906000388) — finds a **null**
average effect on post-promotion preference, so the harm we claim to avoid may not be there to avoid*).
And a flat discount is **invisible** — nobody has ever told a friend about 20% off (*the strongest of
the three, and the only one our own corpus speaks to; see the demotion of the famous cases below and
[`04-adversarial-review.md`](04-adversarial-review.md) §1*).

**3. So the real problem is not "I want to run a lottery promo but it's too risky."** It is *"I spend
real money on discounts and get nothing memorable for it."*

**4. The product is a better way to spend the discount budget the merchant is already spending.** Same
money, different shape: instead of 10% off for everyone, **a 1-in-10 chance your order is free.**

**5. The obstacle — and this is the pivotal move — is that no merchant can promise that.** If it hits,
they owe every customer at once. **This is why almost nobody does it.** The absence of the behavior is
now *evidence for* the product, not against it: you could not price this promise until there was a
liquid market in the underlying event.

**6. The mechanism.** A prediction-market contract pays $1 if the event happens and costs exactly the
probability. Buy one per dollar of possible liability and the promise acquires a fixed, known price.

**7. The closing equivalence — this is the whole pitch in one line.** That price *is* the discount the
merchant was already running.

| 100 orders × $200 = $20,000 revenue | Flat discount | Contingent discount |
|---|---|---|
| Offer | 10% off, everyone | 10% chance your order is free |
| Merchant cost | **$2,000** | **$2,126** ([`00-thesis.md`](00-thesis.md), passive fill at $0.10) |
| Cost as % of revenue | 10.00% | **10.63%** |
| Delta | — | **+6.3%** |
| What the customer tells a friend | nothing | the offer |

**Say it as "6% more than the discount you're already running,"** not as a drag formula. That framing is
legible to a merchant in one sentence; `L·(p + fees)/(R·Q)` is not.

**Consequences that propagate through the rest of this file:**

- The **comparison object** changes. It is no longer *risky promo vs hedged promo*. It is **flat
  discount vs equal-cost contingent discount.** Every table and example below is built on that.
- *"Isn't this just a discount with extra steps?"* stops being an objection and becomes **the thesis.**
  Yes. It is a discount. It costs what your discount costs. The difference is that people talk about
  this one.
- The **customer definition** changes from "merchants who run contingent promos" (~6 known) to
  "merchants who are unhappy with what their discounting buys them" (nearly all of them). That
  materially changes GTM and sizing — see §5, which does *not* claim a slice of total discount spend.
- **Mattress Mack, Jordan's Furniture and The Jeffrey are demoted from premise to evidence.** They are
  no longer the market we serve. They are proof that this mechanic generates attention a flat discount
  cannot buy — Mack's promotions became national news repeatedly; no furniture retailer's 20%-off sale
  ever did. Cite them for **attention generation only**, and say so explicitly when you do.
- The **risk profile** changes honestly. The old risk was *"can we make it safe?"* — a safety question,
  and largely answered. The new risk is *"will merchants adopt a mechanic they have never run?"* — an
  **adoption** question, and unanswered.
- **The core empirical hole is unchanged and must stay prominent.** Nobody has ever measured whether
  the contingent version produces more incremental margin than the equal-cost flat discount. That is
  still the load-bearing unknown and still the reason the product ships with a **holdout control group
  by default.**

---

## 3. Is prize indemnity the right analog?

**No — on sales motion. Yes — on revenue pool.** Both halves matter, and the reframe changes which
half binds.

| Dimension | Prize indemnity (SCA, Odds On) | Platform-distributed embedded product |
|---|---|---|
| **Sales motion** | Phone quote, per event, per merchant | One integration → every merchant on the platform |
| **Pricing unit of work** | Human underwriter prices each deal | Software prices off a live orderbook |
| **Marginal cost of customer N** | Roughly constant | Roughly zero |
| **Customer archetype** | Furniture, auto, HVAC — local, brick-and-mortar | Any storefront on the rail |
| **Learning across customers** | None — each quote is standalone | A cross-merchant incrementality corpus |
| **Retention substrate** | The merchant relationship | Shopify's — [92% at >$1M GMV, 97% at >$10M](https://www.fool.com/earnings/call-transcripts/2026/08/12/shopify-shop-q2-2026-earnings-call-transcript/) |

A 40-year-old relationship underwriter capping at tens of millions tells you about the **cost of
distributing a bespoke quote**, not the ceiling of demand. That is why the comp set deserved re-testing.

**Where the swap fails, and it fails hard.** Every embedded-protection company that cleared $1B sells a
**consumer-paid premium attached to orders** — an attach-rate annuity scaling with GMV. Sensible
Weather charges the shopper [**8–12% of cart**](https://sensiblehelp.zendesk.com/hc/en-us/articles/29198337215635-How-much-does-a-Weather-Guarantee-cost);
Route charges a per-order fee; Extend charges a warranty price. Ours is the inverse — the **merchant**
funds the payout.

**The reframe gives the first real answer to the payer objection, and it is partial.** Under the old
frame the merchant-paid budget was an episodic marketing whim, which is why merchant-paid comps stall.
Under the new frame the budget is the **discount line — recurring, universal, already allocated, and
not a new spend decision.** That is a materially better payer story than "convince a merchant to buy a
promo product." It is *not* a complete answer: the money still has to be re-shaped rather than merely
collected, which means a merchant decision per campaign rather than an attach rate per order. **Neither
comp set is clean, and saying so is the honest position.**

---

## 4. What the embedded-protection comps actually show

This section is unchanged by the reframe. It is the strongest evidence in the repo and none of it
depends on which denominator you use.

| Company | What it sells | Who pays | Last valuation mark | Disclosed funding | Status |
|---|---|---|---|---|---|
| **Cover Genius** | Multi-carrier embedded protection + XCover claims | Consumer | **[US$1.9B / A$2.71B, 14 Jul 2026](https://www.businesswire.com/news/home/20260714199328/en/)** | ~$345M since 2014 | [$3B cumulative GWP, 240M policies, 50+ carriers](https://fintech.global/2026/07/15/cover-genius-lands-100m-to-power-ai-embedded-protection/) (self-reported) |
| **Extend** | Product protection, **owns the carrier stack** | Consumer | **[$1.6B+, 18 May 2021](https://www.extend.com/news-press/extend-announces-260m-series-c-led-by-softbank-vision-fund-2-with-over-1-6b-valuation)** | ~$386M | No round since Aug 2021 — a pre-rate-reset mark, never re-tested |
| **Route** | Shipping protection **inside Shopify checkout** | Consumer | **[$1.4B, Jun 2024](https://www.prnewswire.com/news-releases/post-purchase-boom-route-announces-40-million-series-c-at-a-1-4-billion-valuation-302181158.html)** (from $1.25B, Jan 2022) | ~$340M | [$100M+ revenue 2023, 13,000 brands](https://www.prnewswire.com/news-releases/post-purchase-boom-route-announces-40-million-series-c-at-a-1-4-billion-valuation-302181158.html); self-describes as **profitable** by [Jul 2025](https://www.prnewswire.com/news-releases/route-announces-ceo-transition-as-company-enters-next-phase-of-growth-302502586.html) |
| **Sensible Weather** | **Outcome-contingent refund** (weather) | Consumer, 8–12% of cart | — | [~$22.2M](https://www.crunchbase.com/organization/sensible-weather) | No Series B in ~4 years; 35 employees |
| **Seel** | Return assurance | Consumer | — | ~$23.6M total; last raise a [**$17M Series A, Jan 2022**](https://fintech.global/2022/01/19/seel-secures-series-a-for-e-commerce-insurance/) | Stalled |
| **Clyde** | Warranty **software** | Consumer | — | — | **[Asset-acquired 15 Mar 2023](https://coverager.com/cover-genius-acquires-the-assets-of-clyde/)**, alongside layoffs of 50–60% of ~45 staff |
| **Mulberry** | Warranty | Consumer | — | $22M Series B *(unverified — no primary filing located)* | "Turnaround strategy" + new CFO, Jan 2025 |
| **Descartes** | Parametric underwriting | Commercial | Stale ~$500M (Jan 2022) *(press-reported, never re-tested)* | ≥$141M (Series C amount undisclosed) | [>$200M GWP in 2024](https://www.insurancebusinessmag.com/uk/news/breaking-news/descartes-underwriting-receives-major-investment-539485.aspx) |
| **Arbol** | Parametric | Commercial | — | [$60M Series B, Apr 2024](https://www.prnewswire.com/news-releases/arbol-raises-60-million-in-series-b-funding-to-scale-parametric-insurance-responding-to-increasing-climate-risk-302131746.html) | $250M GWP transacted in 2023 *(company-reported, not independently verified)* |

**Three patterns.** (1) **Three cleared $1B, and all three own risk or a consumer surface** — Extend's
own framing is that it became *"the only tech-based product protection company to own the entire
end-to-end experience"*; Route owns a consumer app; Cover Genius owns the carrier panel and claims
platform. (2) **The pure-software middles went 0-for-3** — Clyde fire-sold, Mulberry is in turnaround,
Seel has not raised since Jan 2022. A facilitator that only routes liability sits in that seat.
(3) **But risk expertise alone did not clear $1B either** — Descartes and Arbol are ~$200–250M GWP with
sub-unicorn marks. The winners had risk **plus** distribution. Owning risk is necessary in this data
and visibly not sufficient.

**Not verified, and it matters:** no source states whether Cover Genius' $100M is debt, structured
credit or equity — the "soft mark" read rests entirely on the counterparty being *Vista **Credit**
Partners*, an inference, not a fact. Descartes' 2025 GWP could not be confirmed at any figure (only
2024's >$200M). And **not one company here discloses a net take rate**, so every margin comparison in
this doc is directional only.

---

## 5. Sizing — bottom-up, and deliberately not by adjacency

**The temptation this reframe creates must be named and refused.** "Every merchant discounts" invites
claiming a slice of total retail promotional spend. That is TAM-by-adjacency, it is the exact reasoning
this repo exists to kill, and the same error already disqualified every prize-indemnity market report
we found: three near-identical content-farm reports put 2024 at
[$1.2B](https://marketintelo.com/report/prize-indemnity-insurance-market), $12.7B and $22.4B — a ~19×
spread, where the top figure would be roughly a third of
[Lloyd's entire FY2025 gross written premium of £57.9bn](https://www.reinsurancene.ws/lloyds-delivers-10-profit-increase-as-2025-gwp-hits-57-9bn/).
The only embedded-insurance forecast with defensible provenance is **BCG's $13B → $70B+ GWP by 2030**,
corroborated by [Conning's >$70B US premium by 2030](https://www.conning.com/about-us/news/ir-pr---embedded-insurance-distribution)
— and GWP is not revenue, and that category is not this one. **None of these numbers are used below.**

So build it from merchant counts. Every assumption is stated inline and every one is arguable.

**Base.** Not 3.59M stores — most cannot configure a promo and do not buy apps. Use the band that
demonstrably pays for tooling: [**65,441 Shopify stores spend >$100/mo on apps**](https://eightx.co/blog/average-ecommerce-shopify-app-spend-by-revenue-band-2026)
(Storeleads panel, modeled from pricing tiers, ±25%).

**Per-campaign revenue.** Assume campaign GMV of **$100k** (a mid-band store running a promo across a
tentpole window) and a **2% take on order value** — the facilitator assumption carried through
[`01-math.md`](01-math.md) §10. That is **$2,000 per campaign**, or ~19% of the merchant's $10.6k hedge
premium on that campaign. Both readings are load-bearing and both are assumptions, not observations.

| Adoption of the >$100/mo band | Adopters | Campaigns/yr each | Promo GMV routed | Revenue @ 2% |
|---|---|---|---|---|
| 5% | 3,272 | 2 | $0.65B | **$13.1M** |
| 10% | 6,544 | 2 | $1.31B | **$26.2M** |
| 25% | 16,360 | 2 | $3.27B | **$65.4M** |
| **38%** | **24,868** | **2** | **$4.97B** | **~$100M** |
| 50% | 32,720 | 2 | $6.54B | **$131M** |

**What this shows, and it is not comfortable.** A $100M business requires roughly **38% of every
Shopify store that spends >$100/mo on apps to run two contingent promos a year.** That is the honest
bar. It is reachable arithmetic and a demanding behavioral claim.

**The result is dominated by assumed campaign size, so state the band, not a point.**
[`00-thesis.md`](00-thesis.md) runs this identical construction off this identical base at a **$60k**
campaign and gets **~64%** of the band; this table's $100k campaign gets **38%**. Nothing separates the
two but one unmeasured assumption. **The defensible statement is 38–64%** — and every figure in this
section moves with that assumption, which is exactly why none of it should be quoted as a forecast.

**The long tail does not rescue it.** Run the same model over the full 3.59M stores at 1% adoption, one
campaign each, $25k campaign GMV: `3.59M × 1% × 1 × $25k × 2% = $17.9M`. The mass of merchants
contributes an order of magnitude less than the mid-band. **Sizing is dominated by adoption rate in a
narrow band, not by total merchant count** — which is exactly why "everyone discounts" does not convert
into "everyone is addressable," and why §1b's WeatherBill precedent is the relevant base rate.

**Cross-check.** The $5B of promo GMV needed for $100M at a 2% take is ~1.3% of Shopify's
[$378.4B FY2025 GMV](https://s27.q4cdn.com/572064924/files/doc_financials/2025/q4/Shopify_Investor_Press_Release_Q4-25_FINAL.pdf).
Two independent constructions land on the same magnitude, which is a consistency check, not a
confirmation.

**The binding constraint is adoption, and adoption is unmeasured.** Not market size. The evidence on
adoption is thin and points down: **zero documented second campaigns** by any merchant with any
provider across four tentpole events in 2026; Playably's [2 Shopify reviews since Feb 2025](https://apps.shopify.com/playably)
against its self-reported 30+ brands; and app-store discovery saturation (~500–865 new apps/month)
meaning this gets **sold, not found** — which quietly reimports SCA's sales motion, the very cost the
comp swap was meant to escape.

---

## 6. Distribution: does the platform change the volume term?

**Yes on reach, no on price, and the counter is severe enough to be a co-equal risk.**

The affirmative is strong. Shopify did [**$115.6B GMV in Q2 2026, +32% YoY**](https://www.fool.com/earnings/call-transcripts/2026/08/12/shopify-shop-q2-2026-earnings-call-transcript/),
and merchants at scale do not churn out from under you. The channel demonstrably carries companies past
$100M: **Klaviyo** guides to [$1.526–1.534B for FY2026](https://investors.klaviyo.com/news/news-details/2026/Klaviyo-Delivers-Outstanding-2025-Results-32-Revenue-Growth-Record-Fourth-Quarter-and-Raised-Fiscal-Year-2026-Outlook/default.aspx),
and **Global-e** — also Shopify-anchored, Shopify's exclusive Managed Markets MoR — did
[$189.9M in Q1 2025 alone](https://www.globenewswire.com/news-release/2025/05/14/3080980/0/en/Global-e-Reports-First-Quarter-2025-Results.html).
SCA cannot phone 3.59M storefronts. That is a difference in kind.

Now the counter:

- **Platform dependence does not decay.** Klaviyo is **~78% Shopify-tied ARR against ~77.5% at its 2023
  IPO** — two years of upmarket effort moved it well under a point *(from Klaviyo's own filings and
  commentary; we did not re-derive either figure from a single primary disclosure — the flatness, not
  the exact level, is the load-bearing claim)*. Shopify is simultaneously the channel, a
  warrant-holding shareholder, and the most plausible competitor.
- **Shopify Payments names the mechanic.** Its eligibility policy prohibits *"products or services
  related to gambling, such as **sports forecasting, lotteries, bidding, contests, or sweepstakes**"*
  ([Shopify](https://help.shopify.com/en/manual/payments/shopify-payments/onboarding/eligibility)).
  The plain target is merchants whose *business* is contests — and the reframe helps here, because a
  discount whose size is contingent is easier to characterize as pricing than as a sweepstakes. But an
  app attaching a contingent prize to a purchase still sits inside the wording's blast radius, and the
  downside is not app removal, it is a merchant losing payment processing. Binary existence risk, needs
  a written ruling.
- **The billing rails are hostile to this specific product.** Revenue share is [assessed on **gross**
  app revenue, with *"refunds aren't taken into account"*](https://shopify.dev/docs/apps/launch/distribution/revenue-share)
  — uniquely bad for a business whose mechanic is issuing refunds. App Pricing supports neither usage
  caps nor one-time charges, which is exactly the shape a variable per-promo fee takes. Presumably why
  the incumbent bills off-platform.
- **Discovery is saturated.** See §5: sold, not found.

**Synthesis:** platform distribution changes the volume term **only if pricing is transaction-linked**,
because the subscription ceiling is 1,602 stores paying >$1k/mo — and transaction-linked pricing is
what Shopify's billing primitives handle worst. Distribution is necessary; on this evidence it is not
sufficient.

---

## 7. The expansion path, once the wedge works

The wedge is discount reallocation. The **second act** is the general primitive:

> **Any commercial term whose price or payout is a function of a verifiable external outcome.**

Instances that already have paying customers — evidence that individual instances monetize, *not* a
market you can add up:

| Instance | Verified evidence of demand |
|---|---|
| Delivery guarantee | Route: **$100M+ revenue in 2023**, 13,000 brands, $15B merchandise protected |
| Weather guarantee | Sensible Weather: **1M+ guarantees**, 8,000+ locations, 1,400+ hotels, priced 8–12% of cart |
| Conditional rebate | SCA / Odds On: a ~40-year, continuously-sold product line |
| Parametric commercial cover | Descartes **>$200M GWP (2024)**; Arbol **$250M GWP (2023)** |
| Product protection | Extend, Cover Genius — both cleared $1B |
| Price protection / event-linked pricing | No verified revenue figure found in this research |

**One instance of this primitive inside Shopify checkout already supports a nine-figure top line**
(Route) — whose valuation still moved only $1.25B → $1.4B over ~2.4 years. That is the realistic shape
of the outcome, and it is worth saying out loud rather than implying a faster one.

**Sequencing matters and §1b says why.** WeatherBill sold the horizontal first and died; Climate Corp
sold one crop vertical and exited at ~$1.1B. Under this reframe the wedge — *reshape the discount
budget you already spend* — is the vertical. The primitive is what you earn the right to sell after the
wedge produces a measured incrementality result. Selling the primitive first is the documented failure.

---

## 8. Where value accrues, and what the underwriter path costs

**The comps say risk + distribution — not risk alone, and definitely not software alone.** §4 is
unambiguous on both the 0-for-3 middle and on Descartes/Arbol failing to clear $1B on risk expertise.

**The counter-evidence nobody should skip.** The one live operator in this exact mechanic is *not*
running a balance sheet. Playably's site answers "who funds the refund?" with **"Playably does. We
insure and hedge the payout"** — insuring *and* hedging is risk **pass-through**, not warehousing. So
the only shipped version of this business occupies the thin-facilitator seat the comps say dies. That
is not evidence *for* the underwriter path; it is evidence the underwriter path is **untested here**.

**The reframe supplies one asset the 0-for-3 middles never had, and it is a hypothesis, not evidence.**
Clyde, Mulberry and Seel were software layers over someone else's risk with nothing accumulating. A
product positioned as *a better shape for the discount budget* accumulates something specific: a
**cross-merchant corpus of contingent-vs-flat incrementality results**, measured against holdouts, that
no incumbent in a 40-year-old category has ever built (§9, C1). If C1 resolves favorably, that corpus is
the defensible asset and the facilitator seat may survive on it. If C1 fails, there is no corpus worth
having and §4's 0-for-3 verdict applies unmodified.

If you follow the underwriter thread anyway, here is what it costs — **structurally**, because the
research did not produce verified capital figures and inventing them would be worse than omitting them:

1. **It is legally an insurance business.** Prize indemnity is an *expressly authorized line*:
   [N.Y. Ins. Law §1113(a)(27)](https://www.dfs.ny.gov/insurance/ogco2003/rg030315.htm), added by
   S.3655-A effective 29 July 1997, covering *"financial loss by reason of payment of any sum or item
   awarded to a participant in any **lawful contest** or sports related event."* The moment the product
   says *"we cover your payout,"* it is doing an insurance business in 50 states — and "in substance
   equivalent... designed to evade" clauses mean relabeling it a *hedge* does not cure it.
2. **The wrappers are coupled.** §1113(a)(27) conditions coverage on a **lawful** contest — if the promo
   is characterized as an unlawful lottery, the insurance wrapper does not attach. Gambling and
   licensing are not independent problems.
3. **Two structures, both slow.** MGA on fronted carrier paper (producer/surplus-lines licensure, a
   carrier partner, fronting collateral) — exactly what
   [Odds On does today, underwritten by Everest National](https://www.oddsonpromotions.com/prize-indemnity-insurance)
   — or own the carrier (statutory surplus, 50-state admission). **Capital, collateral and timeline
   figures were not verified here; treat any number you see for them as unsourced.** Revealed
   preference: [DOXA **bought** the licensed platform rather than building
   one](https://doxa.com/programs/odds-on-promotions/), closing 1 April 2024.

**And the price-compression pitch does not survive verification.** Prize-indemnity premiums run
[**3–15% of prize value, indexed to the odds**](https://www.supermoney.com/encyclopedia/prize-indemnity-insurance)
— a $10,000 prize commonly quoted at $300–$1,500. That is not a flat 2–3× load waiting to be
compressed. For remote triggers, licensed paper can price *below* the corresponding event contract once
Kalshi's fee (`0.07·p·(1−p)` per $1 of coverage) and the spread crossing are counted. The only
load-compression evidence in the corpus is two Game Point Capital quotes at ~6% and ~2% probability.
**The defensible edge is granularity, speed and self-service — not price.** A deck claiming "half the
cost of insurance" is claiming something this research does not support. Note that under the reframe
this matters less than it did: the benchmark is no longer an insurance quote, it is **the merchant's own
flat discount**, and the comparison there is `10.63% vs 10.00%` — a 6% premium, not a load.

---

## 9. The honest conditional

Graded against the evidence above, under the new frame. **Two conditions get easier, one gets harder,
and one is new.**

| # | Condition | Status | Change vs old frame | Why |
|---|---|---|---|---|
| **C1** | An equal-cost contingent discount beats the flat discount the merchant already runs, on incremental **margin**, net of the full fee stack | **Unproven, partly contradicted — and now gates a bigger number** | **Harder** | [Gaertig & Simmons, *JCR* 52(5):1022–1042, N=8,969](https://academic.oup.com/jcr/article/52/5/1022/8171334): the probabilistic edge appears only when the sure discount is or *seems* trivial; at ordinary cart values the sign does not flip. Mazar et al. found 76% preference at 10% probability — on **$0.75 candy and a $4.50 DVD**, with the $200 stimulus failing to replicate. **Zero third-party incrementality figures exist for this mechanic anywhere**, in a 40-year-old category. |
| **C8** | Enough merchants who already discount will actually run a mechanic **nobody has run** | **Unmeasured — and it is the binding constraint on §5** | **New** | §5 needs ~38% adoption of the >$100/mo app-spend band at 2 campaigns/yr for $100M. Observed signal points down: zero documented second campaigns anywhere; Playably at [2 reviews](https://apps.shopify.com/playably) vs 30+ self-reported brands; saturated discovery → sold, not found. WeatherBill is the base rate (§1b). |
| **C2** | Pricing is transaction-linked, not subscription | **Structurally supported, operationally unproven** | Unchanged | The subscription ceiling is [1,602 Shopify stores paying >$1k/mo](https://eightx.co/blog/average-ecommerce-shopify-app-spend-by-revenue-band-2026). But Shopify billing supports neither caps nor one-time charges and assesses revenue share on gross-of-refunds. |
| **C3** | The hedgeable trigger set is broad enough to be non-episodic | **Contradicted for the marketable triggers, and the reframe sharpens the tension** | **Harder in one respect** | Weather and CPI books cannot absorb $25k of coverage; liquidity concentrates in national sports and Fed decisions. A live re-measure found top-of-book depth varying **52×** between two markets in the same NFL series on the same day. New tension: a **discount budget is continuous; the hedgeable trigger calendar is episodic.** Reshaping a year-round budget through a handful of tentpole windows caps campaigns/yr — the "2" in §5 is an assumption this condition governs. |
| **C4** | The regulatory rail holds | **Contradicted for sports; supported for macro/weather** | Unchanged | Kalshi is net-losing at the state level — adverse outcomes in [SDNY (7 Jul 2026, no CEA preemption)](https://www.forbes.com/sites/zennonkapron/2026/08/04/new-york-wants-36-billion-from-kalshi-a-federal-judge-next-door-just-shielded-it/), Connecticut, [Washington](https://www.atg.wa.gov/news/news-releases/judge-orders-kalshi-cease-numerous-washington-operations), Nevada, Maryland, Ohio, and an [Arizona criminal prosecution that proceeded after a federal judge declined to enjoin it](https://azcapitoltimes.com/news/2026/04/09/kalshi-faces-criminal-charges-in-arizona-as-judge-denies-injunction/); NY seeks **$36B and a nationwide bar**. Wins in NJ (3d Cir., interlocutory, binds 4 jurisdictions), MN (preliminary; the judge flagged that permanent relief "may be much narrower"), TN. **But** Washington's order *expressly permits* commodities, climate, economics and finance, and the CFTC's June 2026 NPRM would place economic and financial indicators outside gaming review entirely. |
| **C5** | The company becomes the risk-holder **and** owns distribution | **Plausible, unproven; the reframe offers an alternative but not a proof** | **Slightly easier** | §4 says risk alone (Descartes, Arbol) and software alone (Clyde, Mulberry, Seel) both fail. §8 argues the incrementality corpus is an asset the 0-for-3 middles lacked — a hypothesis contingent on C1, not evidence. |
| **C6** | The wedge generalizes to the broader primitive | **Partially supported; contradicted as a horizontal-first** | **Easier** | Route ($100M+ revenue) and Sensible Weather (1M+ guarantees) prove single instances monetize. Under the reframe the primitive is the *second act*, not the pitch — which is the sequencing WeatherBill got wrong and Climate Corp got right. |
| **C7** | The architecture is permitted at all | **Contradicted for the naive build** | Unchanged | Kalshi's Developer Agreement §3 limits API use to *"facilitating a members own trading,"* §3.2 prohibits *"facilitating trading... by other members,"* §3.7 prohibits sublicensing. An ISV class exists on institutional.kalshi.com; its terms are not public. Position limits are denominated as **maximum loss exposure**, $25,000 standard. |

### What this adds up to

The prior KILL was **right for two partly wrong reasons.** Its comp set understated the ceiling — prize
indemnity's tens-of-millions cap measures the cost of distributing a bespoke quote, and platform
distribution genuinely removes that cost; embedded protection *does* contain three companies past $1B.
And its denominator was the ~6 documented contingent promos, which is a press cycle, not a market. The
real denominator is **discounting**, which is universal, recurring, and already funded.

**But widening the denominator does not make the case easier. It makes C1 more expensive to get wrong.**
Under the old frame, an unmeasured incrementality question gated a niche business. Under this one it
gates a large one — and it now has a companion, C8, which is the adoption rate of a mechanic nobody has
run and which §5 shows is the binding constraint on every revenue figure in this file. A bigger
addressable behavior converts the risk from *"can we make this safe?"* (a safety question, largely
answered) into *"will they run it?"* (an adoption question, unanswered).

**Venture-scale is conditional on C1 and C8.** Both are behavioral, both are unmeasured, and the first
gates the second — no merchant runs a second campaign if the first one did not beat the discount it
replaced. C1 is also **the cheapest item on the list to test:** one contingent promo against a plain
equal-cost flat discount, at 2–3 ordinary non-persona merchants, measuring **incremental margin against
a holdout, net of the trailing 60 days.**

If C1 fails, nothing else matters and the KILL stands on better evidence than it originally had. If C1
holds by a wide margin, **the measurement itself is the most defensible asset in the business** —
nobody in a 40-year-old category has ever published it, which is either a gap worth owning or a
negative result somebody already found and chose not to print. Distinguishing those two is worth more
than any other commercial question in this file. It is also why the product ships with a **holdout
control group on by default** rather than as an option: the corpus is the moat, and a corpus without
controls is not a corpus.

---

Thesis: [`00-thesis.md`](00-thesis.md) · Unit economics: [`01-math.md`](01-math.md) ·
Business breakdown: [`02-business.md`](02-business.md) ·
Teardown: [`04-adversarial-review.md`](04-adversarial-review.md)

*Business analysis, not legal or financial advice. Prediction-market law is moving quarterly and the
sports-contract litigation weekly; several valuation marks here are pre-2022 and untested; no company
in the comparable set discloses a net take rate; and every figure in §5 is a bottom-up construction
from stated assumptions, not an observation. Re-verify before committing capital.*
