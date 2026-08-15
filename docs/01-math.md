# 01 — The Math

**Date:** 2026-08-15 · **Scope:** the complete quantitative model behind [`00-thesis.md`](00-thesis.md). Every number is derived in-line or carries a source. One running example throughout.

## The conclusion, first

Every merchant already spends money on discounts. This document prices **the same money in a different shape** — instead of 10% off for everyone, a 1-in-10 chance the order is free — and the answer is that the two cost **almost exactly the same**.

Running example: **100 orders × $200 = $20,000** of order value, gross margin 45%.

| | Flat discount | Contingent promo | Difference |
|---|---|---|---|
| Offer | 10% off every order | 10% chance your order is free | — |
| Mechanism | reduce price | buy 20,000 YES contracts at $0.10 | — |
| **Cost to merchant** | **$2,000.00** | **$2,126.00** | **+$126.00** |
| As % of order value | 10.00% | 10.63% | +0.63 pt |
| **As % of the discount already being run** | 100% | **106.3%** | **+6.3%** |
| Variance of that cost | zero | zero | none |
| Cost known before the promo starts? | yes | yes | — |

**A contingent promo is a discount. It costs ~6% more than the discount.** That $126 is the entire economic content of the product, and it is why the comparison worth arguing about is not "risky promo vs. safe promo" — it is **flat discount vs. equal-cost contingent discount.** The $2,126 figure assumes a passive fill at $0.10; crossing a 1¢ spread instead makes it **$2,231.57**, an 11.6% premium (§3, exact) — **$2,226 / +11.3%** by the closed form the summary tables elsewhere in this repo use (§3, "Two conventions, reconciled").

Two consequences run through everything below.

1. **"Isn't this just a discount with extra steps?" is the thesis, not an objection.** Yes. It is a discount. It costs what your discount costs. The difference is that a flat 10% off is invisible and this is not.
2. **The premium has to be earned back in units.** For the running example the contingent version must sell **+3.4% more units** than the equal-cost flat discount just to tie — **~10%** once a facilitator takes 2% of order value. §8 derives it. That number is small, which is why the thesis is live rather than dead. **It has also never been measured** (§8, last paragraph), which is why the product ships with a holdout control group.

**Why almost nobody runs this promo today is not evidence against it.** A merchant cannot promise "1-in-10 your order is free" unpriced, because if it hits they owe *every* customer at once — a `{$0 or $20,000}` gamble on a $20,000 promo, and a `{$0 or $2,000,000}` one at scale. The promise was unpriceable until there was a liquid market in the underlying event. The ~6 documented cases of merchants doing it anyway (Mattress Mack, Jordan's Furniture, a Manhattan bar) are **evidence that the mechanic buys attention a flat discount cannot** — not a market we are entering.

## 1. Notation

| Symbol | Meaning | Running example |
|---|---|---|
| `P` | unit sale price | $200 |
| `g` | gross-margin rate | 45% |
| `m = g·P` | gross margin per unit, dollars | $90 |
| `Q₀` | baseline units in the promo window | 100 |
| `R` | refund per buyer if the event fires (`R ≤ P`; full-free ⇒ `R = P`) | $200 |
| `p` | probability of the event = **the Kalshi YES price, in dollars** | $0.10 |
| `Q` | actual units sold (`Q₀ + ΔQ`) | — |
| `L = Q·R` | total refund liability if the event fires | $20,000 |
| `s` | bid–ask spread, dollars per contract | $0.01 |
| `δ(p)` | hedge **drag** — all-in cost per $1 of coverage, *minus* `p` | $0.011578 |
| `f` | facilitator take, as a fraction of order value | 0–2% |
| `φ` | total fee stack per unit = `R·δ(p) + f·P` | $2.32 |
| `m″` | net margin per unit after promo cost and all fees | $67.68 |
| `e` | **required behavioral edge** vs. an equal-cost flat discount | 3.42% |

The flat-discount comparator is `d = p·R` off every unit — for the running example, `0.10 × $200 = $20` off a $200 item, i.e. 10% off. **`p` and the discount rate are the same number** whenever `R = P`. That identity is the whole design.

## 2. Why the two cost the same: contract price *is* probability

A Kalshi **YES contract** pays **$1 if the event settles yes, $0 otherwise**, and trades at a price `q` between $0 and $1. For a small, idiosyncratic, dollar-bounded payoff there is no meaningful risk premium to embed, so `q` is the market's probability estimate.

**Why the equivalence is exact.** Unhedged, the merchant's expected refund outlay is `P(E)·L`. Coverage costs `q` per $1, so `q·L`. If `q = P(E)` these are *identical* — the contract is not a bet, it is **a purchase of the merchant's own expected cost at the market's price.** That is why "10% chance your order is free" is not priced at some unknown level: it is **a 10% discount, priced by an exchange, to the cent.**

The equivalence is **operational, not epistemic.** It does not require `q` to be the *true* probability, only that `q` is what the merchant pays. If `q ≠ P(E)` the cost is still fixed and known — just fixed at a price the merchant did not set.

Confirmed in the wild: **Sensible Weather** sells a literal outcome-contingent refund at checkout at **8–12% of cart**, varying with dates and location ([help center](https://sensiblehelp.zendesk.com/hc/en-us/articles/29198337215635-How-much-does-a-Weather-Guarantee-cost)) — it charges the probability, and re-prices as the probability moves.

> **Caveat, graded:** betting markets are widely reported to show a favorite–longshot bias, in which low-probability contracts trade above their realized frequency. If it holds on Kalshi, the merchant *overpays* precisely in the low-`p` regime where the marketing is best. **Not measured in our corpus** — an untested direction of error, not a fact.

## 3. So why isn't it *exactly* equal? The fee stack

Two frictions, and only two, separate $2,000 from $2,126.

**Sizing.** A YES contract pays $1, so covering liability `L` takes **`N = L` contracts** — one per dollar of exposure — at cost `L·p`. That term is the discount itself and is not a cost of the mechanism.

**Fee.** Kalshi's taker fee is `roundup(0.07 × C × P × (1−P))`, rounded up to the cent **on the whole order**, not per contract. Maker fee is exactly one quarter of that and applies only on series flagged `quadratic_with_maker_fees` — 130 of ~13,000, and they are the flagship Fed, CPI and championship markets, i.e. the promo-relevant ones. **No settlement fee, no membership fee**, free ACH ([fee schedule, eff. Feb 5 2026](https://web.archive.org/web/20260218003606if_/https://kalshi.com/docs/kalshi-fee-schedule.pdf)). The formula reproduces all 15 rows of Kalshi's published fee table exactly in decimal arithmetic.

| Quantity | Closed form | At `p` = 0.10 |
|---|---|---|
| Fee ÷ **premium** (i.e. ÷ the discount) | `0.07·(1 − p)` | 6.30% |
| Fee ÷ **liability** | `0.07·p·(1 − p)` | 0.63% |
| All-in per $1 of coverage, no cross | `p + 0.07·p·(1 − p)` | $0.10630 |

Tabulated: `p` = 0.02 → **2.1372¢**; 0.05 → **5.3325¢**; 0.10 → **10.630¢**; 0.20 → **21.120¢**; 0.50 → **51.750¢** per $1 of coverage.

**Spread.** The second friction is crossing the book. `L = $20,000`, fair `p = $0.10`, 1¢ spread so you cross and fill at **$0.105**. `N = 20,000`. Fee = `roundup(0.07 × 20,000 × 0.105 × 0.895)` = `roundup(131.565)` = **$131.57**.

| Cash flow | Event **fires** (10%) | Event **misses** (90%) |
|---|---|---|
| Refunds paid to customers | −$20,000.00 | $0 |
| Hedge payout (20,000 × $1) | **+$20,000.00** | $0 |
| Premium, paid upfront | −$2,100.00 | −$2,100.00 |
| Kalshi taker fee, paid upfront | −$131.57 | −$131.57 |
| **Net promo cost** | **−$2,231.57** | **−$2,231.57** |

**Identical in both branches — that is the entire mechanism.** A `{$0 or $20,000}` gamble becomes a certain $2,231.57, **11.158% of liability** against a flat 10% discount's 10.000%. Filling passively at $0.10 gives $2,000 + $126.00 = **$2,126.00 = 10.630%**, the headline figure. The 1¢ cross costs **11.58% over the flat discount**; at `p` = 0.05 the same 1¢ cross costs **17.28%**, because a fixed $0.005 half-spread is divided by a shrinking `p`.

**Drag, closed form** — the premium over the equal flat discount, as a fraction of that discount:

$$\boxed{\;\delta_{\%}(p) \;=\; 0.07\,(1-p) \;+\; \frac{s/2}{p}\;}$$

> **Two conventions, reconciled.** This closed form evaluates the fee coefficient at *fair* `p`; the worked example above charges the fee on the price actually paid, `p + s/2`. The closed form is therefore a slight under-estimate — **11.3% vs the exact 11.58%** at `p` = 0.10, **16.65% vs 17.28%** at `p` = 0.05. **Convention across the repo:** every summary ladder and drag table — §4 and §6 below, and the quoted all-in figures in [`00-thesis.md`](00-thesis.md), [`02-business.md`](02-business.md), [`03-venture-scale.md`](03-venture-scale.md) and [`04-adversarial-review.md`](04-adversarial-review.md) — uses the **closed form**. Only the exact cash-flow table above, `δ(p)` in §1, and the `φ`/`e` table in §8 use the **exact** figure, because those are per-unit derivations where the rounding is load-bearing. The gap is a few tenths of a point and never changes a decision, but the two numbers are not typos of each other.

## 4. The equal-cost comparison, generalized

For **any** trigger probability `p`, the contingent promo costs

$$\text{contingent} \;=\; \bigl(1 + 0.07(1-p) + \tfrac{s/2}{p}\bigr)\times\text{the equivalent flat discount}$$

Everything to the right of the `1` is the premium. Evaluated at `Q₀ = 100`, `R = P = $200` (so the flat discount is `p × $20,000`):

| `p` | Equivalent flat discount | Flat cost | Multiplier, **passive fill** | Multiplier, **1¢ cross** | Contingent cost @ 1¢ | Multiplier, 5¢ spread |
|---|---|---|---|---|---|---|
| 3% | 3% off | $600 | 1.068× | **1.235×** | $741 | 1.901× |
| 5% | 5% off | $1,000 | 1.067× | **1.1665×** | $1,167 | 1.5665× |
| **10%** | **10% off** | **$2,000** | **1.063×** | **1.113×** | **$2,226** | 1.313× |
| 20% | 20% off | $4,000 | 1.056× | **1.081×** | $4,324 | 1.181× |
| 50% | 50% off | $10,000 | 1.035× | **1.045×** | $10,450 | 1.085× |

Read the passive column as *the exchange's cut of a promo you were running anyway*: **3.5–6.8%, everywhere.** Read the 1¢ column as what you actually pay if you cross the book.

**The premium is worst exactly where the marketing is best.** At `p` = 3% — the regime with the best story ("1-in-33 your order is free") — a 1¢ cross costs 23.5% over the flat discount, because the half-spread is a fixed $0.005 divided by a tiny `p`. Two implications the product must respect: **display effective discount, not contract probability**, and **gate on live book depth** (§9), because spread is the only term in the model that can double.

## 5. Promo unit economics and the break-even lift

Against **no promo at all**, both offers must pull units. **Expected cost per unit** = `p·R`, which depends only on the *product*, so `(p=10%, R=$200)` and `(p=20%, R=$100)` cost the merchant identically. **Promo margin per unit** before fees is `m′ = m − p·R`; for a full-free promo that is `P·(g − p)`, which requires **`g > p`**.

Profit without the promo is `Π₀ = Q₀·m`; with it, selling `Q` units, `Π₁ = Q·m′`. Setting `Π₁ = Π₀`:

```
Q · m′ = Q₀ · m
Q      = Q₀ · m / m′
ΔQ     = Q − Q₀ = Q₀ · (m − m′) / m′        and    m − m′ = p·R
```

$$\boxed{\;\Delta Q_{be} \;=\; Q_0 \cdot \frac{p\,R}{\,m - p\,R\,}\;}$$

**Running example:** `100 × 20 / 70 = 28.6 units` → sell **128.6 instead of 100, a +28.6% lift**, just to break even, *before* fees. It is scale-free for full-free promos: `ΔQ_be/Q₀ = p/(g − p)`. Price and volume cancel; only **trigger probability relative to gross margin** matters.

**This bar is identical for the flat discount.** A merchant running 10% off faces the same +28.6%. It is the cost of discounting, not the cost of this mechanic — which is why it is *not* the number that decides anything (§8 is).

## 6. Scenario matrix

`Q₀ = 100`, `P = $200`, `g = 45%` (`m = $90`). Break-even lift = `p·R/(m − p·R)`, fees excluded.

| Structure | `R` | `p` | Equivalent flat discount | Cost/unit `p·R` | Margin `m′` | Break-even lift |
|---|---|---|---|---|---|---|
| Full-free, deep longshot | $200 | 3% | 3% off | $6.00 | $84.00 | **+7.1%** |
| Full-free, longshot | $200 | 5% | 5% off | $10.00 | $80.00 | +12.5% |
| **Full-free, standard (running example)** | **$200** | **10%** | **10% off** | **$20.00** | **$70.00** | **+28.6%** |
| Full-free, favorite | $200 | 20% | 20% off | $40.00 | $50.00 | +80.0% |
| Full-free, near-coinflip | $200 | 35% | 35% off | $70.00 | $20.00 | +350% |
| 50% rebate ($100 back) | $100 | 10% | 5% off | $10.00 | $80.00 | +12.5% |
| 50% rebate | $100 | 20% | 10% off | $20.00 | $70.00 | +28.6% |
| 25% rebate ($50 back) | $50 | 20% | 5% off | $10.00 | $80.00 | +12.5% |
| 25% rebate | $50 | 35% | 8.75% off | $17.50 | $72.50 | +24.1% |

**Read the iso-cost diagonals.** `(10%, full-free)`, `(20%, 50%-back)` and `(40%, 25%-back)` all cost $20/unit — all equal to a 10% flat discount — and all demand +28.6%. **The merchant is indifferent between them; the customer is not.** That asymmetry is the only design freedom in the model, and the evidence says which way to use it: a probabilistic promo beats a sure discount **only when the equivalent sure discount is, or seems, trivial** ([Gaertig & Simmons, *JCR* 52(5):1022–1042, 2026, N=8,969, preregistered](https://academic.oup.com/jcr/article/52/5/1022/8171334)). A 3% full-free offer has a $6 sure-equivalent on a $200 item — trivial. A 35% offer has a $70 sure-equivalent, and there the same paper finds the sure discount preferred. **Push `p` down and `R` up:** identical cost, better story, and the only regime the evidence supports.

## 7. The honest crux: buying certainty does not lower the mean

- **Unhedged contingent promo:** expected cost `p·L`, with variance — outcomes are `{0, L}`.
- **Covered contingent promo:** cost `p·L + fees`, **certain**.
- **Flat discount:** cost `p·L`, **already certain**, no fees.

So `E[covered] − E[unhedged] = fees > 0`, and `E[covered] − E[flat discount] = fees > 0` as well. Against the *unhedged* version, buying the contracts is a good trade once `L` threatens solvency — its value scales with `L`, not with `p`. At $20,000 it is optional; at $2,000,000 it is not. **But that is the wrong comparison**, because virtually no merchant is running the unhedged version; they are running a flat discount. Therefore:

> **A covered contingent promo is EV-worse than an equal-cost flat discount by exactly the fee stack, and ties it on variance. On the numbers alone, it is dominated.**

This is the sentence to put in front of anyone who thinks the contract-buying is the clever part. It is not clever; it is plumbing that makes an impossible promise quotable. Every pitch in this category — ours included — is a claim that an *unmeasured behavioral edge* exceeds a *known, computable fee*.

The canonical case agrees, and this is exactly how it should be used: Mattress Mack won ~$75M on ~$10M of contracts and drove ~$75M in furniture sales, and by his own account **did not make a dime** ([Forbes, Nov 2022](https://www.forbes.com/sites/willyakowicz/2022/11/07/mattress-mack-won-his-75-million-world-series-bet-and-didnt-make-a-dime/)). The return was earned media, not margin — precisely what the identity predicts, and precisely the thing a flat 10% off has never once produced.

## 8. The required behavioral edge — the falsifiable threshold

Compare two promos of equal *pre-fee* cost `p·R` per unit. **Flat discount:** `d = p·R` off every unit, margin `m′ = m − p·R`, no fees. **Contingent:** same expected cost plus fee stack `φ = R·δ(p) + f·P`, margin `m″ = m′ − φ`. With `Q_flat` and `Q_cont` the units each produces, equal profit requires:

```
Q_cont · m″     =  Q_flat · m′
Q_cont / Q_flat =  m′ / m″  =  m′ / (m′ − φ)
```

$$\boxed{\;e \;=\; \frac{Q_{cont}}{Q_{flat}} - 1 \;=\; \frac{\varphi}{\,m' - \varphi\,} \;=\; \frac{\varphi}{m''}\;}$$

**The required behavioral edge equals the fee stack divided by the net margin that survives it** — the whole business in one fraction. **Running example:** `φ = $2.32` (crossing $1.00 + fee $1.32), `m″ = $67.68`, so **`e = 3.42%`** — 133.0 units against the flat discount's 128.6, merely to tie.

`P = R = $200`, `g = 45%`, 1¢ spread. Left: exchange friction only. Right: with a 2% facilitator take.

| `p` | `φ` exchange only | **`e` (exchange only)** | `φ` with 2% take | **`e` (with take)** |
|---|---|---|---|---|
| 3% | $1.47 | **+1.8%** | $5.47 | **+7.0%** |
| 5% | $1.73 | **+2.2%** | $5.73 | **+7.7%** |
| **10%** | **$2.32** | **+3.4%** | **$6.32** | **+9.9%** |
| 20% | $3.28 | **+7.0%** | $7.28 | **+17.0%** |
| 35% | $4.21 | **+26.6%** | $8.21 | **+69.6%** |

1. **Exchange friction alone is a low bar** — **1.8–3.4% incremental units** at the longshot probabilities the product should live in. That is the number that makes this worth building: the contingent framing does not have to be a phenomenon, it has to beat "20% off" by three points. **With a 2% facilitator take the bar is ~7–10%** — still ordinary-promotion territory, but no longer trivial.
2. **The facilitator's fee, not the exchange's, makes the bar hard.** A 2% take roughly **triples** the required edge: the intermediary competes against its own value prop, since every point it charges raises the behavioral hurdle its product must clear.
3. **The bar explodes as `p·R → m`.** At `p` = 35% the promo has eaten 78% of gross margin, so `m″` is tiny and any fixed fee is enormous relative to it. **Stay far from `p = g`** — which is also where the behavioral evidence says the sure discount wins anyway (§6).

| Study | Setting | Finding | Bearing |
|---|---|---|---|
| [Mazar, Shampanier & Ariely 2017](http://www-2.rotman.utoronto.ca/facbios/file/Mazar_ProbabilisticPricePromotions_mnsc.2017.pdf) | Field, n=325, $4.50 DVD | **76%** chose 10%-chance-free over 10%-off at EV parity; not significant at 90% probability | Supports — at $0.75–$4.50 stakes |
| [Gaertig & Simmons 2026](https://academic.oup.com/jcr/article/52/5/1022/8171334) | 5 studies, N=8,969, $11–$480 | Probabilistic wins **only when the sure discount is or seems trivial**; on Likert measures the sure discount won *every* cell of studies 3–5 | Constrains — the edge is conditional |
| [Lee et al. 2019](https://www.journals.uchicago.edu/doi/10.1086/701901) | Field, grocery | **+54% spending** for 1% probabilistic vs 1% fixed, among **cash/debit** shoppers | Supports — but the mechanism is pain-of-paying, which one-click checkout has anesthetized |

**No measured, third-party, holdout-controlled incrementality figure exists for this mechanic at an ordinary merchant.** Every published lift number is self-reported traffic or ad-level ROAS, never benchmarked against an equal-EV discount. That absence is itself the finding: `e` is not merely the key parameter, it is an **unmeasured** one, in a category ~40 years old — and it is the reason the product ships with a **holdout control group on by default**, not as a feature but as the only way this question ever gets answered.

## 9. Frictions, with real numbers

**Live sizing and price drift.** `L` grows as orders arrive. Covering the *forecast* upfront kills drift risk but converts demand-forecast error directly into cost error — over-cover and you unwind at the bid, under-cover and you buy at a drifted price. Covering **incrementally** is immune to demand error by construction and carries only drift risk. Threshold rebalancing (fire only when uncovered liability exceeds ~5% of total) matches per-order risk with **~76 trades instead of ~500** on a 500-order promo. *(Own Monte Carlo; drift volatility assumed and uncalibrated — direction sound, magnitudes not published here.)*

**Batch the clips.** Because the fee rounds up on the whole order, small clips bleed: at `p` = 0.10 the effective fee is **10.0% of premium on a 1-contract clip, 7.0% at 10, and 6.3% at 100+**. Never trade per order.

**Liquidity is bimodal and top-of-book is unstable.** Season-championship books are genuinely deep — `KXSB-27-HOU` showed **2,028,833 contracts resting at the $0.05 ask** when we sampled it ([endpoint](https://api.elections.kalshi.com/trade-api/v2/markets/KXSB-27-HOU/orderbook?depth=100) — live, so it will not return that figure again), enough to absorb $250k instantly. Single-game books are not: on the same day two markets in the same NFL series differed **52×** in top-of-book size, and a $50,000 order on the thinner one slipped **+0.93¢** on a nominally 1¢ spread — roughly doubling the crossing term in §4. Across a random sample of 2,212 open markets the median spread was **5¢** and median top-of-book **200 contracts**; 44% had no two-sided quote at all. *(All liquidity figures in this section are our own book-walks against the public API on 15 Aug 2026 — a point-in-time snapshot, not a published dataset. That they are perishable is the finding.)* **Depth must be a live pre-trade gate, not a static allowlist** — a 5¢-spread market turns the §4 premium from 11.3% into 31.3% and eats the behavioral edge before the promo runs.

**Position limits.** The default is **$25,000 per strike, per Member, defined as maximum loss exposure** — cost basis, not contract count ([product certifications](https://assets.kalshi.com/regulatory/product-certifications/FEDDECISION.pdf)). So `L_max = 25,000 / p`:

| `p` | 2% | 5% | 10% | 20% | 50% |
|---|---|---|---|---|---|
| `L_max` | $1.25M | $500k | $250k | $125k | $50k |

**The cap binds least where the marketing is best** — the opposite of what "$25,000 limit" sounds like. Higher tiers exist ($7M on election markets, $50M on some contracts). **Caveat:** whether one platform executing for many merchants faces a *single aggregated* $25k limit turns on Rulebook 5.17(e), and the only retrievable copy predates Kalshi's April 2026 margined-rulebook self-certification. **Re-verify** — it is the difference between a per-merchant cap and a platform-wide one.

**Basis risk.** If the refund trigger *is* the contract's settlement condition, basis is zero. Any gap — a different settlement source, or an edge case (forfeit, suspension, cancellation) handled differently by the promo terms than by the contract's `rules_primary` — is uncovered tail, and it is the one place the contingent promo is genuinely riskier than a flat discount. **Compound triggers are the sharp case:** covering "A **and** B" with separate A and B contracts is not coverage, it is an overpay plus correlation risk. Kalshi supports native multivariate contracts, but sampled ones showed **zero volume and no quotes** — expressible, not executable. Ship single-leg triggers only.

**Settlement timing.** Contracts settle **60–300 seconds** after the outcome is known, but cash reaches a bank via ACH in **3–5 business days**, while a Shopify refund debits the merchant **immediately** — a working-capital gap, not a solvency problem, but somebody floats it, and at scale that somebody has a balance sheet. Separately, Shopify Payments refunds are capped at roughly **120 days** from the original transaction ([Shopify Help Center](https://help.shopify.com/en/manual/payments/shopify-payments/payouts/refunds)), structurally eliminating any trigger settling more than ~4 months out. Store credit settles instantly and sidesteps both.

## 10. Facilitator P&L

In the clean structure the **merchant funds and owns their own position**, so the contract cost is not the facilitator's cost. Revenue is a take on notional or order value; cost is software, 50-state compliance, and amortized CAC.

**Name the denominator.** The running example produces three, and a take rate is meaningless without saying which: **order value $20,000** (100 × $200), **liability $20,000** (equal only because `R = P`), and **premium $2,000** (`L·p`, which is also the flat-discount budget). Confusing premium with notional turns a "10% take" into a 1% take.

| Pricing basis | Rate | Revenue/promo | Promos/yr for $100M | Promo GMV/yr for $100M |
|---|---|---|---|---|
| % of premium | 10% | $200 | 500,000 | — |
| % of order value | 2% | $400 | 250,000 | $5.0B |
| % of order value | 10% | $2,000 | 50,000 | $1.0B |

**Read that as a merchant-count problem, bottom-up, and state the assumptions.** A merchant running **one promo a month** at this size contributes 12 promos/yr, so $100M of revenue at a 2% take on order value needs **~21,000 such merchants running monthly** — not a slice of retail discount spend, a countable roster with a countable promo cadence. Both the merchant count and the cadence are assumptions, not measurements. **Do not size this by taking a percentage of total US promotional spend**; adjacency to a large number is not a market, and [`03-venture-scale.md`](03-venture-scale.md) builds the sizing bottom-up for exactly this reason.

$$\underbrace{p + \delta(p)}_{\text{merchant's DIY all-in}} \;+\; \underbrace{f}_{\text{your take}} \;<\; \underbrace{0.03\text{–}0.15 \text{ of prize value}}_{\text{loaded prize-indemnity premium}} \qquad\text{and}\qquad f \;<\; \text{hassle avoided}$$

**Above — the insurer's load.** Prize-indemnity quotes run **3–15% of prize value** and are **priced by odds**, so the load is *not* a uniform multiple over fair value; at genuinely remote triggers carrier paper can price *below* the corresponding contract plus fees. The one directly comparable pair of quotes puts Kalshi at 6% vs OTC 12–13%, and 2% vs 7–8% — roughly half, **at those two probabilities only** ([Game Point Capital, via DeFi Rate](https://defirate.com/news/blanket-kalshi-prediction-market-small-businesses/)). Do not generalize a "2× load" to mid-probability events; the corpus does not support it.

**Below — DIY collapse.** Kalshi read access is public and unauthenticated, onboarding is self-serve, and Basic-tier limits sustain ~10 orders/second, orders of magnitude beyond any promo ([rate limits](https://docs.kalshi.com/getting_started/rate_limits)). **Nothing technical stops a merchant doing this themselves**, so `f` is bounded by hassle avoided and decays as merchants learn — the collapse that already hit third-party shipping protection.

**One platform tax to price in:** Shopify's app revenue share is 0% on the first $1M of gross app revenue and 15% above, plus a 2.9% processing fee — assessed on **gross, with refunds explicitly not deducted** ([Shopify docs](https://shopify.dev/docs/apps/launch/distribution/revenue-share)). For a business whose mechanic *is* issuing refunds, billing a percentage of promo GMV through Shopify means paying platform fees on money that later flows back out.

## 11. Sensitivity — what actually moves the outcome

| Rank | Parameter | Plausible range | Effect | Why |
|---|---|---|---|---|
| 1 | **`e_actual`** — the real behavioral edge vs. the flat discount | −20% to +50%, **unmeasured** | Binary: business exists or it doesn't | The only term that can beat a flat discount; everything else is a cost |
| 2 | **`p / g`** — probability vs. margin | 0.07 to 0.78 | `e` moves 1.8% → 26.6% | `m″` is the denominator of `e`; as it shrinks, fixed fees explode |
| 3 | **`s`** — spread | 1¢ to 5¢ | Premium over the flat discount 11.3% → 31.3% at `p` = 10% | Half-spread is fixed in dollars, so `(s/2)/p` blows up at low `p` |
| 4 | **`f`** — facilitator take | 0% to 2% | `e` 3.4% → 9.9% | Dominates exchange fees at any `f` above ~0.5% |
| 5 | Depth / slippage | 0 to +0.93¢ measured | Can double the crossing term | Bimodal and unstable; must be gated live, per market, per moment |
| 6 | Kalshi fee coefficient (0.07) | Fixed, deterministic | 6.3% of premium at `p` = 10% | The most-discussed lever is the smallest one |

**The ranking is the strategy.** Parameters 2–6 are engineering: choose low `p`, high `R`, deep books, a thin take, batched clips — and the cost side is solved to the cent, offline, against a public unauthenticated API, before anyone signs anything with anyone. That is why the pitch can state "**this costs ~6% more than the discount you already run**" as a fact rather than a projection.

Parameter 1 is not engineering. It is an experiment nobody has run in forty years of this category existing: **one contingent promo, one equal-cost flat-discount control, incremental *margin* measured against a holdout, net of the trailing 60 days.** The honest statement of the risk is not "can we make this safe" — the cost is fixed and known — it is "**will merchants adopt a mechanic none of them has ever run, and does it outsell the discount it replaces by three points.**" If it clears `e`, this is a business. If not, it is a more expensive discount with counterparty risk attached. That test costs a weekend; every other number here is either computable from a public API or explicitly flagged above as unverified.

---

Thesis: [`00-thesis.md`](00-thesis.md) · Business breakdown: [`02-business.md`](02-business.md) ·
Comps: [`03-venture-scale.md`](03-venture-scale.md) · Teardown: [`04-adversarial-review.md`](04-adversarial-review.md)

*Business analysis, not legal or financial advice. Market prices, fee schedules, position limits and prediction-market law all move — the sports-contract litigation weekly. Re-verify before committing capital.*
