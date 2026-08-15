# 02 — The Business: What's Sold, To Whom, Under What Structure

**Date:** 2026-08-15
**Scope:** The commercial layer on top of [`01-math.md`](01-math.md) — the product
surface, the facilitator-vs-underwriter fork, pricing, beachhead, moat, competitors, the compliant
architecture, and what actually breaks.

---

## The decision, up front

**Build the FACILITATOR: the merchant is principal, owns their own Kalshi account, owns the refund
obligation, and you sell trigger selection, feasibility gating, live sizing, and refund execution.**

That is the only structure buildable without an insurance license or a balance sheet — and it is also
the structure with the **worst survival record in the closest comp set**. In embedded protection, the
companies that cleared $1B own either the **risk** (Cover Genius, Extend) or the **distribution**
(Route's consumer app). The pure software layer in between went 0-for-3: Clyde was
[asset-acquired in a fire sale alongside layoffs of 50–60% of ~45 staff](https://coverager.com/cover-genius-acquires-the-assets-of-clyde/),
Mulberry announced a turnaround, and Seel has
[not raised since a $17M Series A in January 2022](https://fintech.global/2022/01/19/seel-secures-series-a-for-e-commerce-insurance/).

Both things are true and the doc does not resolve them. The facilitator is the *correct build* and the
*wrong-shaped business*. Everything below is an attempt to say exactly how wrong-shaped, and where the
narrow version still works.

---

## 1. What is sold, and to whom

**Sold:** a promotion *instrument* — a legally-structured, hedge-feasible, machine-executed
"buy now, get your money back if X happens" campaign, with the refund liability continuously matched by
prediction-market contracts in the merchant's own account.

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

The pitch a merchant actually buys is not "hedged on a prediction market." It's **"we will not let you
sell a promo we cannot cover."** That is a refusal product, and refusal is the defensible part.

---

## 2. The product surface on Shopify

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

**Three constraints that shape the product, not just the code:**

1. **Shopify Payments refunds run out at ~120 days.**
   [Bank-dependent, not a hard rule](https://help.shopify.com/en/manual/payments/shopify-payments/payouts/refunds) —
   but a September purchase settling on a February Super Bowl is ~150 days and falls outside it. This
   silently kills most season-long sports and most macro horizons on the card rail.
2. **The original processing fee is not refunded.** A "100% refund" costs the merchant ~2.9% + 30c
   *more* than the hedge returns.
3. **The float runs the wrong way.** Refunds leave immediately; hedge proceeds land days later. At
   $6k this is nothing. At $600k it is a working-capital event. This is the strongest argument for
   **store credit as the default reward** — it settles instantly and costs roughly **`r·c` of a cash
   refund**, where `r` is the redemption rate and `c` the COGS rate: `0.50 × 0.35 ≈ 0.18` for a bar,
   `0.70 × 0.55 ≈ 0.39` for merch, i.e. **~2.6–5.7× cheaper**. Note the saving is dominated by
   redeeming at *cost*, **not** by breakage — and escheat law in states like NY and GA can claw the
   breakage term back toward zero. *(Modelled, with assumed `r` and `c`; not measured.)*

---

## 3. Facilitator vs. Underwriter — the fork

| | **FACILITATOR** | **UNDERWRITER** |
|---|---|---|
| Who holds the Kalshi position | Merchant | You |
| Who owes the customer | Merchant | You |
| Capital required | ~None | Balance sheet + reinsurance |
| Licensing | Promotions law only | **Prize indemnity is an authorized insurance line** — [N.Y. Ins. Law §1113(a)(27)](https://www.dfs.ny.gov/insurance/ogco2003/rg030315.htm) — 50-state producer/surplus-lines question |
| Revenue shape | Fee on placement / GMV | Premium minus losses, plus float |
| Value capture | **Thin, DIY-collapsible** | Thick, but slow and capital-bound |
| Comp record | Clyde, Mulberry, Seel — 0-for-3 | Cover Genius, Extend — both cleared $1B |

**What the comps say.** Value accrues to the risk-holder. But read the underwriter comps carefully
before treating that as a plan:

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
the discount budget. The embedded-insurance TAM does not transfer.

**Verdict on the fork.** Facilitator for the build; the underwriter path is a different company with
different investors, and the two nearest risk-owning analogs in *this specific* niche —
SCA Promotions and Sensible Weather — both cap in the tens of millions after decades. Do not tell
yourself the underwriter path is the escape hatch; it is a slower, more regulated version of the same
ceiling.

---

## 4. Pricing

Worked on a **$60,000 covered-sales promo, full refund, 1-cent spread.** Hedge all-in per $1 of
coverage = `p + 0.07·p·(1−p) + spread/2` — the closed form derived in
[`01-math.md`](01-math.md) §5, verified against
[Kalshi's fee schedule](https://web.archive.org/web/20260218003606if_/https://kalshi.com/docs/kalshi-fee-schedule.pdf)
(no settlement fee, no membership fee, free ACH).

| Trigger `p` | Hedge all-in | + 2% platform fee | **Merchant's effective discount** | Nominal headline |
|---|---|---|---|---|
| 5% | 5.83% | 7.83% | **7.8%** | "5% off" |
| 10% | 11.13% | 13.13% | **13.1%** | "10% off" |
| 20% | 21.62% | 23.62% | **23.6%** | "20% off" |

The UI must display **effective discount**, not contract probability. The headline-to-effective gap is
**2.8–3.6 points** across that band — of which **0.8–1.6 points is exchange friction the merchant pays
to Kalshi** and 2.0 points is your fee. Only the first part is invisible to the merchant, and it is the
part the UI exists to surface.

**Four pricing models, honestly graded:**

| Model | On the $60k promo | Ceiling / failure mode |
|---|---|---|
| **Flat SaaS** ($99–299/mo) | $99–299 | Only [**7,966 Shopify stores spend >$500/mo on apps; 1,602 spend >$1,000/mo**](https://eightx.co/blog/average-ecommerce-shopify-app-spend-by-revenue-band-2026) (Storeleads panel, modeled ±25%). Hard cap well under $100M ARR |
| **% of covered GMV** (2%) | $1,200 | Shopify's rev share is assessed on **gross with refunds explicitly not deducted** — [15% above the first $1M lifetime, plus 2.9% processing](https://shopify.dev/docs/apps/launch/distribution/revenue-share). Uniquely hostile to a refund business |
| **Markup on hedge premium** (+20%) | $1,200 | **Collapses to zero on DIY.** This is the fee the merchant learns to skip |
| **Underwriting fee** (3–5% of covered sales) | $1,800–3,000 | This is insurance. See §3 |

**Is it cheaper than the incumbent?** Not clearly, and the corpus does not support the claim that it
is. Prize indemnity is quoted at
[**3–15% of prize value**](https://www.supermoney.com/encyclopedia/prize-indemnity-insurance) — but
that band is **probability-indexed**, not a flat load. A `p`=10% trigger carries a 10% expected loss,
so a carrier must price at or above the top of that band; the exchange route's 13.1% all-in is roughly
**at parity**, not a 2–3× saving. The one measured comparison — Game Point Capital pricing an NBA
playoff berth at [**6% on Kalshi vs 12–13% OTC**, and second-round advancement at 2% vs 7–8%](https://defirate.com/news/blanket-kalshi-prediction-market-small-businesses/) —
shows a genuine gap, but at *low* probabilities and from a single firm. **Do not build the pitch on
price.** Build it on speed, self-service, and granularity.

---

## 5. GTM and beachhead

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
the smallest basket and no geography. Note the incumbent already knows this — **SCA's best case
studies are college programs** (Texas A&M, Memphis), because there are only
[**45 US DMAs with a major-league team and ~7 true single-team DMAs**](https://www.tvb.org/wp-content/uploads/2021/06/Pro_Sports_by_DMA.pdf),
against ~**134–136 FBS football programs** (NCAA membership shifts each season with realignment —
treat as approximate).

**Beachhead = the overlap.** Shopify merchants with **AOV ≥ $150** in home/furniture, mattress,
jewelry, or high-ticket apparel, running **national tentpole triggers** (Super Bowl, March Madness,
World Series, FOMC) where depth is real. Sell it, don't list it: the App Store adds
[**~500–865 new apps a month**](https://www.appjubilee.io/shopify-app-store-report-2026), so organic
discovery is a dead channel for a mechanic nobody is searching for. This is an outbound, ~10-logo,
concierge motion — which is exactly what the incumbent's dormant listing implies
(Playably's Shopify app has [**2 reviews since February 2025**](https://apps.shopify.com/playably)
while its real revenue runs off-platform as bespoke deals).

---

## 6. The moat, ranked by defensibility

1. **Settlement correctness + basis-risk gating.** Hardest to copy: a rules corpus over 13,029 series,
   where errors are financially catastrophic and reputationally fatal. Accretes trust and data.
2. **Cross-merchant incrementality measurement.** The only *compounding* asset — and **nobody has it**.
   No measured, third-party incremental-lift figure exists for this mechanic anywhere; a 35-year-old
   underwriter publishes [one unquantified testimonial](https://www.oddsonpromotions.com/miscellaneous/conditional-rebate-sports)
   and no numbers. Requires hundreds of promos with holdouts. You will not have it at seed.
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
framing, but the mechanic is real and uncontested)*. The same logic applies with **more** force here, because a merchant who understands that a
10% trigger costs 10% has already done the only hard math in the product.

---

## 7. Competitive landscape

| Who | What they are | Read |
|---|---|---|
| **[Playably](https://playably.ai/)** | Direct competitor. Charges a "predetermined underwriting percentage," fronts the payout, and states on its own site: *"We insure and hedge the payout."* Self-reports **30+ Shopify brands, 100% retention** | Risk **intermediary**, not a warehouse — which weakens the "unlicensed insurer" read but leaves the licensing question open. Take rate undisclosed |
| **[Blanket](https://fortune.com/2026/08/07/exclusive-kalshi-blanket-small-business-hedge-hypergamblification/)** | Plain-English risk → Kalshi contract matcher. **Executes no trades, holds no funds** | **Not a Kalshi product** — built and owned by Lauris Zminsky; Kalshi's spokesperson calls it "a fully external project" and confirms its compliance team was not involved. Most headlines get this wrong. The no-execution design is the most copyable decision in the space |
| **Kalshi** | Runs a first-party small-business hedging page, has a BD lead for the segment | Not vertically integrated into promos — no SMB desk, no merchant fee schedule. But it is *the supplier*, and it is looking down-market |
| **SCA Promotions / Odds On / IC Group** | The 40-year licensed incumbents already selling "Sports Event Rebates" and explicitly marketing the Mattress Mack story | SCA revenue estimates conflict **$22M–$44M** (two unaudited scrapes). Odds On is now inside a [Goldman-backed DOXA rollup](https://doxa.com/programs/odds-on-promotions/) — slow, durable, a plausible acquirer |
| **Sensible Weather** | Consumer-paid weather guarantee at [**8–12% of cart**](https://sensiblehelp.zendesk.com/hc/en-us/articles/29198337215635-How-much-does-a-Weather-Guarantee-cost) | Closest structural analog; the price-equals-probability identity confirmed in the wild across 1M+ transactions |

**The precedent record, corrected.** Six documented 2026 merchant promos, and the outcomes are more
informative than the coverage suggests:

- **The Jeffrey (NYC bar)** — Knicks won Game 1 105-95; **the trigger fired**, tabs were honored, and
  the bar reported [**net profit of $8,514 on a $5,000 hedge**](https://www.cnbc.com/2026/06/03/kalshi-wants-small-businesses-to-hedge-like-wall-street-a-nyc-bar-is-trying-it-with-knicks-promotion.html).
  Covered by CNBC and Fortune, not merely self-reported. This is the only end-to-end proof that exists.
- **TallBoy (DC bar)** — USA beat Paraguay 4-1; fired, ~$4,000 of tabs covered. *(Trade-press
  and operator-reported; we found no independent confirmation of the tab figure.)*
- **[Forme](https://www.modernretail.co/marketing/why-forme-launched-a-world-cup-promotion-hedged-on-kalshi/)**
  — did not fire. Self-reported 4× WoW menswear traffic, ~20× to top styles; **conversion, AOV, revenue,
  and hedge cost all undisclosed.** Note the promo ran June 26–30, *after* the USMNT won Group D, so the
  live probability was roughly **6–10%** (Opta: 10.25% on June 21, 6.06% on July 2) — not the ~3%
  pre-tournament figure often quoted.
- **EGOHOME (mattress)** — did not fire. $2,500 staked for ~$55,000 of payout = **4.5% implied
  probability** *(both figures vendor-reported, not independently verified)*. Refund liability was
  never disclosed, so the *coverage ratio* is unknown; do not read 4.5% as the promo's cost.
- **Jordan's Furniture** — [~$50M liability on a **compound** trigger (both UConn teams reaching their
  title games)](https://www.wbur.org/news/2026/04/03/march-madness-jordans-furniture-refund-uconn-final),
  did not fire. Critically: hedged with **insurance**, premiums set as a percentage of sales. The longest-running real-world operator of this mechanic routes through the insurance market,
  not a prediction market.

---

## 8. The compliant architecture — and why

Not a workaround. This is the structure that keeps the product on the right side of four separate
regulators, stated as design invariants enforceable in code.

**1. Merchant is principal, always.** The merchant opens the Kalshi account, holds the position, and
owes the customer. The moment you say "we cover your payout," you are doing an insurance business —
prize indemnification is an **expressly authorized line**, and state codes reach conduct "in substance
equivalent" to insurance, so relabeling an indemnity as a "hedge" does not cure it. Note §1113(a)(27)
conditions coverage on a **"lawful contest"** — the insurance route and the gambling question are
coupled, not independent.

**2. Never touch refund money.** Refunds issue as native Shopify refunds on the merchant's own rails;
the app only *instructs*. The agent-of-payee exemption
([recognized in 42 states](https://www.csbs.org/agent-payee-exemption-map)) covers customer→merchant
flows — a promo refund runs merchant→customer, which is the textbook money-transmission fact pattern
and sits outside the exemption's logic entirely.

**3. No price uplift on promo-eligible orders — ever.** The lottery test is prize + chance +
consideration. A uniform external trigger does *not* remove chance: the NY-model statute reaches
staking value on "a future contingent event not under his control." The defense is **no consideration
and no risk of loss** — the buyer pays market price for goods they keep. Charging more for a
promo-eligible order creates the stake and destroys the defense. This is a hard product invariant.

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

## 9. Operating risks

| Risk | Severity | Note |
|---|---|---|
| **The value prop may not exist** | **Fatal** | [Gaertig & Simmons, *JCR* 52(5), N=8,969](https://academic.oup.com/jcr/article/52/5/1022/8171334): the probabilistic edge appears only when the sure discount is or *seems* trivial. On their Likert measures every condition favored the sure discount; on binary choice at low stakes the probabilistic offer does win. Framing shifts magnitude; it does not reliably flip the sign at ordinary cart values |
| **The margin source may be self-destructing** | **High** | [Conditional rebates beat certain rebates](https://ideas.repec.org/a/eee/ijrema/v31y2014i1p94-106.html) "mostly because consumers' subjective probability of the event occurring is higher than what market wisdom suggests." A publicly-quoted prediction-market probability is the most transparent possible mechanic — and when the mechanic was transparent in the field, overestimation vanished (expected 9% vs realized 11%) |
| **Kalshi rail availability** | **High** | Third Circuit affirmed a preliminary injunction for Kalshi in [*Flaherty* (Apr 6 2026, 2-1)](https://law.justia.com/cases/federal/appellate-courts/ca3/25-1922/25-1922-2026-04-06.html) — but that binds only NJ, PA, DE and USVI and is interlocutory. Outside it, Kalshi has lost or failed to obtain relief in NY (SDNY, July 7 2026), Washington, Connecticut, Nevada, Maryland and Ohio; Arizona's 20-count criminal prosecution **proceeded** after a federal judge declined to enjoin it |
| **Geofencing decoupling** | **High** | A merchant can be geofenced out of the hedge **mid-promo** while the refund promise stays binding. The promo obligation and the hedge have different jurisdictional triggers. Requires a residency check at promo creation and a kill switch |
| **Shopify platform policy** | **High** | Shopify Payments prohibits ["Products or services related to gambling, such as sports forecasting, lotteries, bidding, contests, or sweepstakes"](https://help.shopify.com/en/manual/payments/shopify-payments/onboarding/eligibility). The wording targets merchants whose *business* is contests, but a reviewer pattern-matching the mechanic could pull a merchant's processing — catastrophic for them, fatal for trust in us |
| **Position limits** | Medium | $25,000 per-contract cost basis remains standard in many contract terms; tiers run $25K / $7M / $50M. Max hedgeable liability = `$25,000/p`, so **$250k at p=10% but only $50k at a coin flip** |
| **Execution quality** | Medium | Slippage is **not** zero at merchant scale. A live re-measure of a deep NFL moneyline showed **+0.93c on a $50,000 hedge**, and top-of-book size varied **52×** between two markets in the same series on the same day. Depth is per-market and per-moment, not a series property |
| **Novelty decay + cross-firm contamination** | Medium | A negative-spillover argument runs through this literature: one company's *losing* customers may sour consumers on every other company's probabilistic promo. A platform whose growth thesis is proliferating the mechanic is building its own decay curve. *(Directional; we did not pin this to a specific paper and it should not be cited as a finding.)* |
| **Horizontal-SMB-hedging precedent** | Medium | WeatherBill sold weather hedges to any business and failed — every prospect needed bespoke configuration, so there was no repeatable sales motion. It pivoted to agriculture and, as The Climate Corporation, [sold to Monsanto for ~$1.1B](https://en.wikipedia.org/wiki/The_Climate_Corporation). The escape was radical vertical focus. See [`03-venture-scale.md`](03-venture-scale.md) §5 |

---

## 10. What would change the answer

One test, and it is cheap: **run a real promo against a plain equal-cost discount at 2–3 ordinary
merchants and measure incremental margin, not traffic, net of the trailing 60 days.**

That measurement does not exist anywhere. Not from a 35-year underwriter, not from Playably, not from
Forme, not from Kalshi. Every published figure in this category is self-reported traffic. If the
mechanic beats a flat discount by more than the fee stack, this is a real business and the measurement
apparatus is the moat. If it doesn't, you've confirmed the kill for the price of a weekend — and the
weekend still ships a working product.

---

Thesis: [`00-thesis.md`](00-thesis.md) · Unit economics: [`01-math.md`](01-math.md) ·
Comps: [`03-venture-scale.md`](03-venture-scale.md) · Teardown: [`04-adversarial-review.md`](04-adversarial-review.md)

*Business analysis, not legal or financial advice. Prediction-market law is moving quarterly and the
sports-contract litigation weekly; re-verify with counsel before committing capital.*
