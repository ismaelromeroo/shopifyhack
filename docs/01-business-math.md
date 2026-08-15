# 01 — Business Math: Unit Economics & the Hedging Model

> ## ⚠️ SUPERSEDED — do not cite
>
> This July draft has been **replaced by [`01-math.md`](01-math.md)**. It is retained only for
> provenance. It contains at least three claims the current docs correct, catalogued in
> [`04-adversarial-review.md`](04-adversarial-review.md) § *Corrections to our own published docs*:
>
> - **§C's "prize indemnity charges ~2–3× fair value" is not supported** — the 3–15% band is
>   probability-indexed, not a flat load.
> - **§D's "a $6,000 promo generates ~$1,800 of hedged notional" is an arithmetic error** — at
>   `p` = 0.10 the premium is `L·p` = **$600**, as §B of this same document correctly computes.
>   Everything downstream of it in §D (the ~$180/promo and ~550,000-promos figures) inherits the error.
> - **The "SCA ≈ $40M revenue" ceiling is unverified** — two unaudited scrapes disagree by ~2×.
>
> For current unit economics, fees, drag, break-even lift and facilitator P&L, read
> [`01-math.md`](01-math.md).

**Date:** 2026-07-21 · **Status:** superseded by [`01-math.md`](01-math.md)
**Scope:** The complete model behind [`00-thesis.md`](00-thesis.md) — promo unit economics, the Kalshi
hedge mechanics, the facilitator's own P&L, why revenue caps at a niche, the store-credit variant, and
the insurer endgame. One consistent notation throughout.

---

## Notation

| Symbol | Meaning | Example |
|---|---|---|
| `P` | unit sale price | $600 |
| `g` | gross-margin rate | 45% |
| `m = g·P` | gross margin, $ | $270 |
| `Q₀` | baseline units in the window | 10 |
| `R` | refund per buyer if the event hits (`R ≤ P`; full-free `R = P`) | $600 |
| `p` | probability the event occurs = **the Kalshi YES price in dollars** | $0.10 (10%) |
| `Q` | actual units sold in the window (`Q₀ + ΔQ`) | — |
| `L = Q·R` | total refund liability if the event hits | $6,000 |

**The identity that runs everything:** on Kalshi, **contract price = probability.** A YES contract
costs `p` and pays $1 if the event happens.

---

## A. Promo unit economics (merchant view, self-insured)

- **Expected refund cost per unit** = `p·R`
- **Promo margin per unit** = `m' = m − p·R = g·P − p·R` (full-free: `P·(g − p)`, so you need `g > p`)
- **Break-even lift:**

$$\Delta Q_{be} = Q_0 \cdot \frac{p\,R}{\,m - p\,R\,}$$

**Scenario matrix** (`Q₀=10, m=$270, P=R=$600`):

| Structure | `p` | Cost/unit `p·R` | Margin/unit `m'` | Break-even lift | % lift needed |
|---|---|---|---|---|---|
| Full-free longshot | 5% | $30 | $240 | +1.3 | ~13% |
| Full-free standard | 10% | $60 | $210 | +2.9 | **~29%** |
| Full-free favorite | 20% | $120 | $150 | +8.0 | ~80% |
| 25%-back ($150) @ 20% | 20% | $30 | $240 | +1.3 | ~13% |

Low-probability or partial structures need only 1–3 extra sales; a favorite nearly doubles the bar.

---

## B. The hedging math (Kalshi mechanics)

**Instrument.** A YES contract: **$1 if the event hits, $0 if not**, price `p`.

**Sizing.** To cover liability `L`, buy **`N = L` contracts** at cost **`L·p`**.

**Fee.** Kalshi's taker fee = `0.07 · C · P · (1−P)`, computed on the whole order and rounded up to the
cent, **charged once at purchase.** For `C=6,000, P=0.10`: `0.07 × 6,000 × 0.10 × 0.90 = $37.80`.
*(A per-contract-rounding shortcut overstates this as ~$60 — the true aggregate figure is $37.80.)*
Maker (resting limit) orders are often **$0** on non-marquee markets.

**Payoff — the whole point:**

| Cash flow | Event hits (prob `p`) | Event misses (prob `1−p`) |
|---|---|---|
| Refunds paid out | −`L` | 0 |
| Hedge payout | +`L` | 0 |
| Premium (upfront) | −`L·p` | −`L·p` |
| Fee (upfront) | −fee | −fee |
| **Net cost** | **−(`L·p` + fee)** | **−(`L·p` + fee)** |

**Worked ($6,000 liability, `p`=0.10):** premium $600 + fee $37.80 = **$637.80, fixed either way.**

**The key insight:** the *unhedged* expected cost is already `p·L`. Hedged cost is also `p·L` (+ fee).
**Hedging does not lower the mean — it removes the variance.** It converts a `{0 or L}` gamble into a
certain premium. Its value is entirely tail-protection, so it **scales with `L`** — at 10 units the
$6,000 tail is survivable (hedge optional); at 100+ units the $60k+ tail is not (hedge matters).

**Three frictions:**
1. **Real-time sizing** — `L` grows as sales arrive; hedge incrementally (buy `R` contracts per sale).
   If `p` drifts up between sale and hedge, realized cost exceeds the priced-in premium.
2. **Position-limit capacity** — Kalshi default cap = **$25,000 cost-basis per market**. Since cost =
   `N·p`, max coverable payout `L_max = 25,000 / p` (→ $250k at `p`=0.10, $100k at 0.25, $50k at 0.50).
   Flagship markets carry $7M/$50M caps. *(This is why Mattress Mack's ~$75M needed six sportsbooks.)*
3. **Basis risk** — if the refund trigger *is* the contract's settlement, basis = 0 (perfect hedge). A
   trigger with no matching contract (e.g. "Corvette wins its GT class") is **unhedgeable** → self-insure.

---

## C. Facilitator P&L (the actual business)

In the clean model the **merchant funds their own hedge**, so the hedge is *not* your cost. You sell
structuring + compliant terms + placement + software.

- **Revenue** = fee — either % of order value (e.g. 15% of `Q·P`) or a markup on hedge notional.
- **Cost** = software/ops + 50-state compliance + amortized CAC. *(Not the hedge.)*

**The fee is squeezed between two floors:**

$$\underbrace{p}_{\text{fair hedge}} + \underbrace{f}_{\text{your fee}} \;<\; \underbrace{0.03\text{–}0.15}_{\text{loaded insurer premium}} \qquad\text{and}\qquad f < \text{(hassle the merchant avoids by not DIYing)}$$

Your only structural cost edge is the insurer's **load** (prize-indemnity charges ~2–3× fair value).
On a `p`=20% trigger: insurer ≈ 30–40% of exposure, your all-in ≈ 22% → a ~10-point fee still
undercuts. **But** that gap exists only where a liquid contract matches the event; on small liquid
promos the merchant just DIYs and `f → 0`.

---

## D. Why revenue caps at a niche

$$\text{Revenue} = (\text{take rate}) \times (\text{volume intermediated})$$

- A $6,000 promo generates ~$1,800 of hedged notional; at a 10% markup that's **~$180/promo** →
  $100M revenue needs **~550,000 promos/year.**
- On order value: a 10% fee needs **$1B/yr of promo GMV** flowing through you, all of it incremental.
- **Incumbent ceiling:** SCA intermediates ~$400M/yr of prize value at 3–15% → **~$40M after 40 years**
  as the global #1. $100M means being **2.5× the 40-year leader** in a stunt-shaped niche.
- **Supply constraint:** high-conversion promos cluster on a handful of marquee events/year.

The `take × volume` product doesn't reach $100M capital-light. The only >$100M paths are **becoming the
underwriter** (balance sheet + license + capital) or **the exchange** (Kalshi's turf) — the two roles
the thesis rejects.

---

## E. Store-credit variant (breakage-adjusted)

Pay the reward as store credit of face value `R`, redemption rate `r`, COGS rate `c`:

$$\text{cost/unit} \approx p \cdot \big[\,r \cdot c \cdot R - \text{overspend margin} + \text{escheat}\cdot(1-r)\cdot R\,\big]$$

Ratio to a cash refund ≈ `r·c`:

| `r` | `c` | store-credit ÷ cash | multiple cheaper |
|---|---|---|---|
| 0.50 | 0.35 (bar) | 0.175 | ~5.7× |
| 0.70 | 0.55 (merch) | 0.385 | ~2.6× |

→ the **~2.5–6× cheaper** band. Note it's dominated by `c` (redeeming at *cost*), **not** by breakage
`(1−r)`, and the `escheat·(1−r)·R` term is where a New York / Georgia market claws the breakage back to
zero.

---

## F. The insurer endgame (why scale flips the economics)

At volume, stop hedging 1:1 and run a **portfolio**:

- **Load:** `premium = (1+λ)·expected payout`; `λ` is the margin.
- **Underwriting profit** = `Σ premiums − Σ payouts − hedge − reinsurance`.
- **Netting:** merchants on opposite sides of one event cancel internally → save the Kalshi spread.
- **Diversification:** across `N` *independent* events, variance ~ `1/N` → retain the predictable
  middle, hedge only net concentration.
- **Float:** invest premiums held before payout.
- **The killer — correlation:** a "chalk day" (all favorites win) triggers many promos at once; that
  day the book is concentrated, not diversified. Requires concentration limits + tail reinsurance —
  the layer that needs capital + a license (you've become PlayAbly/Descartes).

---

## The one-line synthesis

**Hedging fixes cost *variance* for ~`L·p` + pennies, but never lowers the *mean* — so the merchant's
question is never "can I hedge?" (yes, trivially) but "does the promo drive `ΔQ > ΔQ_be` incremental
units?" And the facilitator's question is never the hedge either — it's whether `take × volume` clears
a venture bar, which the incumbent ceiling says it doesn't. The money and the math both live in
incrementality, not in the hedge.**
