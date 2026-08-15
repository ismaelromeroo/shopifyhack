# 03 — The Venture-Scale Case (Against Our Own Kill)

**Date:** 2026-08-15
**Status:** The prior **KILL** used the wrong comparable set — and still reached a defensible answer.
Revised verdict: **CONDITIONAL, on two conditions, one of which is unproven and one of which is
contradicted-as-stated.**

---

## The decision, first

- **Decision:** upgrade from *KILL* to *conditional*. The prize-indemnity comp is wrong on **sales
  motion** and right on **revenue pool** — swapping in embedded-protection comps raises the ceiling but
  does not change the payer.
- **Blast radius:** nothing shipped. This changes what we *claim*, and what the one cheap test measures.
- **What decides it:** **C1** — does the mechanic beat an equal-EV flat discount at real cart values,
  net of fees. Nobody in a 40-year-old category has published that number.

Read §1 first. If the bear case doesn't land on you, the answer to it won't either.

---

## 1. The bear case, at full strength

The prior analysis graded this KILL by benchmarking against prize-indemnity incumbents. The argument
was three moves, and all three are real.

**Move 1 — the arithmetic.** Revenue = **take rate × volume intermediated**. A $6,000 promo at `p`=0.10
moves $600 of premium; a 10% markup on that is **$60**, and even a 10% fee on *order value* is $600.
Reaching $100M on order-value pricing needs **$1B/yr of promo GMV**, all of it incremental. That is a
denominator problem, not a growth problem.

**Move 2 — the incumbent ceiling.** [SCA Promotions](https://scapromotions.com/sports-rebates/) has
sold exactly this — *"offer your customers a full refund if your local team wins the Championship"* —
since 1986, marketing the Mattress Mack story to do it. Forty years as global #1, and the two
third-party revenue scrapes disagree by 2×: **$22.5M (Kona Equity) vs
[$44.2M (ZoomInfo)](https://www.zoominfo.com/c/sca-promotions/105791883)**, neither audited. Odds On
did not compound either — [acquired by DOXA (Goldman Sachs AM-backed), 1 April
2024](https://doxa.com/programs/odds-on-promotions/), inside an insurance-distribution rollup. A
multiple play, not a product play.

**Move 3 — the sandwich.** The facilitator sits between an exchange taking the spread below and a
merchant who can DIY above, with distribution taking a slice sideways — Preferred Hotels takes a
[20% revenue share](https://www.sensibleweather.com/for-business/blog/preferred-hotels-partnership)
on every Sensible Weather guarantee sold through its network, and in adjacent shipping protection
Navidium already showed merchants they can self-insure and
[keep 100% of the fees](https://www.shipaid.com/blogs/shopify-app-comparisons/navidium-shipping-protection-vs-route-protection-and-tracking-an-in-depth-comparison)
*(competitor's blog — motivated framing, real mechanic)*.

Three facts make it worse, none of which were in the original kill:

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

That is the bear case. It is not a strawman, and most of it survives everything below.

---

## 2. Is prize indemnity the right analog?

**No — on sales motion. Yes — on revenue pool.** Both halves matter.

Where the comp genuinely breaks:

| Dimension | Prize indemnity (SCA, Odds On) | Platform-distributed embedded product |
|---|---|---|
| **Sales motion** | Phone quote, per event, per merchant | One integration → every merchant on the platform |
| **Pricing unit of work** | Human underwriter prices each deal | Software prices off a live orderbook |
| **Marginal cost of customer N** | Roughly constant | Roughly zero |
| **Customer archetype** | Furniture, auto, HVAC — local, brick-and-mortar | Any storefront on the rail |
| **Learning across customers** | None — each quote is standalone | A cross-merchant incrementality corpus |
| **Retention substrate** | The merchant relationship | Shopify's — [92% at >$1M GMV, 97% at >$10M](https://www.fool.com/earnings/call-transcripts/2026/08/12/shopify-shop-q2-2026-earnings-call-transcript/) |

A 40-year-old relationship underwriter capping at tens of millions tells you about the **cost of
distributing a bespoke quote**, not the ceiling of the demand. That is a real objection, and it is why
the comp set deserved re-testing.

**Where the swap fails, and it fails hard.** Every embedded-protection company that cleared $1B sells a
**consumer-paid premium attached to orders** — an attach-rate annuity scaling with GMV. Sensible
Weather charges the shopper [**8–12% of cart**](https://sensiblehelp.zendesk.com/hc/en-us/articles/29198337215635-How-much-does-a-Weather-Guarantee-cost);
Route charges a per-order fee; Extend charges a warranty price. Ours is the inverse — Playably's own
copy is *"You charge full price and keep 80%+ no matter what"* — the **merchant** funds up to ~20% of
campaign revenue out of a promo budget, benchmarked against *"just run 20% off."*

So the embedded-insurance TAM does not transfer. You inherit their **distribution** and their **payer
problem in reverse**. Neither comp set is clean, and saying so is the honest position.

---

## 3. What the embedded-protection comps actually show

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

## 4. Distribution: does the platform change the volume term?

**Yes on reach, no on price, and the counter is severe enough to be a co-equal risk.**

The affirmative is strong. Shopify did [**$115.6B GMV in Q2 2026, +32% YoY**](https://www.fool.com/earnings/call-transcripts/2026/08/12/shopify-shop-q2-2026-earnings-call-transcript/)
on [$378.4B for FY2025](https://s27.q4cdn.com/572064924/files/doc_financials/2025/q4/Shopify_Investor_Press_Release_Q4-25_FINAL.pdf),
and merchants at scale do not churn out from under you. The channel demonstrably carries companies past
$100M: **Klaviyo** guides to [$1.526–1.534B for FY2026](https://investors.klaviyo.com/news/news-details/2026/Klaviyo-Delivers-Outstanding-2025-Results-32-Revenue-Growth-Record-Fourth-Quarter-and-Raised-Fiscal-Year-2026-Outlook/default.aspx),
and **Global-e** — also filed, also Shopify-anchored, Shopify's exclusive Managed Markets MoR — did
[$189.9M in Q1 2025 alone](https://www.globenewswire.com/news-release/2025/05/14/3080980/0/en/Global-e-Reports-First-Quarter-2025-Results.html).
SCA cannot phone 3.59M storefronts. That is a difference in kind.

Now the counter, which is what a skeptical investor will press:

- **Platform dependence does not decay.** Klaviyo is **~78% Shopify-tied ARR against ~77.5% at its 2023
  IPO** — two years of upmarket effort moved it well under a point *(from Klaviyo's own filings and
  commentary; we did not re-derive either figure from a single primary disclosure — the flatness, not
  the exact level, is the load-bearing claim)*. Shopify is simultaneously the channel, a
  warrant-holding shareholder, and the most plausible competitor.
- **Shopify Payments names the mechanic.** Its eligibility policy prohibits *"products or services
  related to gambling, such as **sports forecasting, lotteries, bidding, contests, or sweepstakes**"*
  ([Shopify](https://help.shopify.com/en/manual/payments/shopify-payments/onboarding/eligibility)).
  The plain target is merchants whose *business* is contests — but an app whose entire function is
  attaching a contingent prize to a purchase sits inside the wording's blast radius, and the downside
  is not app removal, it is a merchant losing payment processing. Binary existence risk, needs a
  written ruling.
- **The billing rails are hostile to this specific product.** Revenue share is [assessed on **gross**
  app revenue, with *"refunds aren't taken into account"*](https://shopify.dev/docs/apps/launch/distribution/revenue-share)
  — uniquely bad for a business whose mechanic is issuing refunds. App Pricing supports neither usage
  caps nor one-time charges, which is exactly the shape a variable per-promo fee takes. Presumably why
  the incumbent bills off-platform.
- **Discovery is saturated** (~500–865 new apps/month). This gets *sold*, not found — which quietly
  reimports SCA's sales motion, the very thing the comp swap was supposed to escape.

**Synthesis:** platform distribution changes the volume term **only if pricing is transaction-linked**,
because the subscription ceiling is 1,602 stores paying >$1k/mo — and transaction-linked pricing is
what Shopify's billing primitives handle worst. Distribution is necessary; on this evidence it is not
sufficient.

---

## 5. The wedge: outcome-contingent commerce as a primitive

Event-contingent refund promos are almost certainly **not** the whole market. The primitive is:

> **Any commercial term whose price or payout is a function of a verifiable external outcome.**

Instances that already have paying customers:

| Instance | Verified evidence of demand |
|---|---|
| Delivery guarantee | Route: **$100M+ revenue in 2023**, 13,000 brands, $15B merchandise protected |
| Weather guarantee | Sensible Weather: **1M+ guarantees**, 8,000+ locations, 1,400+ hotels, priced 8–12% of cart |
| Conditional rebate | SCA / Odds On: a ~40-year, continuously-sold product line |
| Parametric commercial cover | Descartes **>$200M GWP (2024)**; Arbol **$250M GWP (2023)** |
| Product protection | Extend, Cover Genius — both cleared $1B |
| Price protection / event-linked pricing | No verified revenue figure found in this research |

**Sizing it honestly.** No prize-indemnity market report is usable: three near-identical content-farm
reports put 2024 at [$1.2B](https://marketintelo.com/report/prize-indemnity-insurance-market), $12.7B
and $22.4B — a ~19× spread, and the top figure would be roughly a third of
[Lloyd's entire FY2025 gross written premium of £57.9bn](https://www.reinsurancene.ws/lloyds-delivers-10-profit-increase-as-2025-gwp-hits-57-9bn/).
The only forecast with defensible provenance is **BCG's $13B → $70B+ embedded-insurance GWP by 2030**,
corroborated independently by [Conning's >$70B US premium by 2030](https://www.conning.com/about-us/news/ir-pr---embedded-insurance-distribution)
— but GWP is not revenue and the category is not addressable. So size bottom-up instead: **one instance
of this primitive inside Shopify checkout already supports a nine-figure top line** (Route), whose
valuation still moved only $1.25B → $1.4B over ~2.4 years.

**The graveyard entry is the most on-point precedent in the file.** WeatherBill (2006) sold exactly the
horizontal version — self-serve outcome-contingent hedging for any business. Founder David Friedberg:
*"The idea was to put the website up and the 70% of businesses with weather problems would show up...
it didn't happen."* Every prospect needed bespoke configuration, there was no repeatable sales motion,
and by late 2009 the balance was heading to zero. The [~$1.1B Monsanto
outcome](https://en.wikipedia.org/wiki/The_Climate_Corporation) came from **abandoning the horizontal
thesis** for corn and soybeans. The primitive is real and the wedge framing is directionally right, but
the one clean attempt to horizontalize it failed for the same reason SCA sells by phone. Not fatal —
Shopify is a substrate WeatherBill did not have — but it is the base rate.

---

## 6. Where value accrues, and what the underwriter path costs

**The comps say risk + distribution — not risk alone, and definitely not software alone.** §3 is
unambiguous on both the 0-for-3 middle and on Descartes/Arbol failing to clear $1B on risk expertise.

**The counter-evidence nobody should skip.** The one live operator in this exact mechanic is *not*
running a balance sheet. Playably's site answers "who funds the refund?" with **"Playably does. We
insure and hedge the payout"** — insuring *and* hedging is risk **pass-through**, not warehousing. So
the only shipped version of this business occupies the thin-facilitator seat the comps say dies. That
is not evidence *for* the underwriter path; it is evidence the underwriter path is **untested here**.

If you follow the thread anyway, here is what it costs — **structurally**, because the research did not
produce verified capital figures and inventing them would be worse than omitting them:

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

**And the pricing pitch does not survive verification.** Prize-indemnity premiums run
[**3–15% of prize value, indexed to the odds**](https://www.supermoney.com/encyclopedia/prize-indemnity-insurance)
— a $10,000 prize commonly quoted at $300–$1,500. That is not a flat 2–3× load waiting to be
compressed. For remote triggers, licensed paper can price *below* the corresponding event contract once
Kalshi's fee (`0.07·p·(1−p)` per $1 of coverage) and the spread crossing are counted. The only
load-compression evidence in the corpus is two Game Point Capital quotes at ~6% and ~2% probability.
**The defensible edge is granularity, speed and self-service — not price.** A deck claiming "half the
cost of insurance" is claiming something this research does not support.

---

## 7. The honest conditional

For this to be a >$1B company, all of the following must be true. Status is graded against the evidence
above, not against enthusiasm.

| # | Condition | Status | Why |
|---|---|---|---|
| **C1** | The mechanic beats an equal-EV flat discount at real cart values, by more than the full fee stack | **Unproven, partly contradicted** | [Gaertig & Simmons, *JCR* 52(5):1022–1042, N=8,969](https://academic.oup.com/jcr/article/52/5/1022/8171334): the probabilistic edge appears only when the sure discount is or *seems* trivial; at ordinary cart values the sign does not flip. Mazar et al. found 76% preference at 10% probability — on **$0.75 candy and a $4.50 DVD**, with the $200 stimulus failing to replicate. **Zero third-party incrementality figures exist for this mechanic anywhere**, in a 40-year-old category. |
| **C2** | Pricing is transaction-linked, not subscription | **Structurally supported, operationally unproven** | The subscription ceiling is [1,602 Shopify stores paying >$1k/mo](https://eightx.co/blog/average-ecommerce-shopify-app-spend-by-revenue-band-2026). But Shopify billing supports neither caps nor one-time charges and assesses revenue share on gross-of-refunds. |
| **C3** | The hedgeable trigger set is broad enough to be non-episodic | **Contradicted for the marketable triggers** | Weather and CPI books cannot absorb $25k of coverage; liquidity concentrates in national sports and Fed decisions. A live re-measure found top-of-book depth varying **52×** between two markets in the same NFL series on the same day — depth is a per-market, per-moment fact, not a structural threshold. |
| **C4** | The regulatory rail holds | **Contradicted for sports; supported for macro/weather** | Kalshi is net-losing at the state level — adverse outcomes in [SDNY (7 Jul 2026, no CEA preemption)](https://www.forbes.com/sites/zennonkapron/2026/08/04/new-york-wants-36-billion-from-kalshi-a-federal-judge-next-door-just-shielded-it/), Connecticut, [Washington](https://www.atg.wa.gov/news/news-releases/judge-orders-kalshi-cease-numerous-washington-operations), Nevada, Maryland, Ohio, and an [Arizona criminal prosecution that proceeded after a federal judge declined to enjoin it](https://azcapitoltimes.com/news/2026/04/09/kalshi-faces-criminal-charges-in-arizona-as-judge-denies-injunction/); NY seeks **$36B and a nationwide bar**. Wins in NJ (3d Cir., interlocutory, binds 4 jurisdictions), MN (preliminary; the judge flagged that permanent relief "may be much narrower"), TN. **But** Washington's order *expressly permits* commodities, climate, economics and finance, and the CFTC's June 2026 NPRM would place economic and financial indicators outside gaming review entirely. |
| **C5** | The company becomes the risk-holder **and** owns distribution | **Plausible, unproven, and it negates the original thesis** | §3 says risk alone (Descartes, Arbol) and software alone (Clyde, Mulberry, Seel) both fail. Risk-holding is a licensed insurance business; distribution-owning means depending on a platform that prohibits contests in Payments. |
| **C6** | The wedge generalizes to the broader primitive | **Partially supported; contradicted as a horizontal** | Route ($100M+ revenue) and Sensible Weather (1M+ guarantees) prove single instances monetize. WeatherBill proves the horizontal packaging failed once, cleanly. |
| **C7** | The architecture is permitted at all | **Contradicted for the naive build** | Kalshi's Developer Agreement §3 limits API use to *"facilitating a members own trading,"* §3.2 prohibits *"facilitating trading... by other members,"* §3.7 prohibits sublicensing. An ISV class exists on institutional.kalshi.com; its terms are not public. Position limits are denominated as **maximum loss exposure**, $25,000 standard. |

### What this adds up to

The prior KILL was **right for a partly wrong reason.** Its comp set understated the ceiling — prize
indemnity's tens-of-millions cap measures the cost of distributing a bespoke quote, and platform
distribution genuinely removes that cost; embedded protection *does* contain three companies past $1B.
But the objection that survives the comp swap is the **payer**, not the ceiling. Every $1B outcome in
the alternative set collects a consumer-paid premium on every order. Ours collects a merchant-paid fee
on an episodic campaign, benchmarked against a discount the merchant could run for free, on a rail
whose sports leg is losing in most courts that have reached it, inside a platform whose payments policy
names the mechanic by category.

**Venture-scale is conditional on C1 and C5.** C5 requires becoming the underwriter — the thing the
original thesis rejected — and even then the comps say risk alone is insufficient. C1 is load-bearing,
unproven, and the cheapest item on the list to test: one promo against a plain equal-cost discount, at
2–3 ordinary non-persona merchants, measuring **incremental margin net of the trailing 60 days**. If C1
fails, nothing else matters and the KILL stands on better evidence than it originally had. If C1 holds
by a wide margin, **the measurement itself is the most defensible asset in the business** — nobody in a
40-year-old category has ever published it, which is either a gap worth owning or a negative result
somebody already found and chose not to print. Distinguishing those two is worth more than any other
commercial question in this file.

---

Thesis: [`00-thesis.md`](00-thesis.md) · Unit economics: [`01-math.md`](01-math.md) ·
Business breakdown: [`02-business.md`](02-business.md) ·
Teardown: [`04-adversarial-review.md`](04-adversarial-review.md)

*Business analysis, not legal or financial advice. Prediction-market law is moving quarterly and the
sports-contract litigation weekly; several valuation marks here are pre-2022 and untested, and no
company in the comparable set discloses a net take rate. Re-verify before committing capital.*
