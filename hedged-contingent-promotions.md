# Outcome-Contingent Refund Promotions: Quantitative Model

**Companion to `docs/01-math.md`. Aligned to the thesis in `README.md`.**

A merchant offers *"buy now — your money back if [event] happens."* The refund liability is hedged on
Kalshi so the cost is fixed and known. This document derives what the mechanic costs, what it must
beat, and how much behavioral lift is required to justify it.

---

## 0. The result, up front

The hedge is exact — variance goes to zero. That is not the question.

Because contract price *is* probability, a $p$-chance of a free purchase costs $pV$ in expectation:
**it is a flat $p$ discount wearing a lottery costume.** The flat discount already has zero variance
and zero fees. So the contingent promo is dominated on both mean and variance unless it *sells more
units*.

$$\boxed{e \;>\; \frac{\phi}{\mu - p - \phi}}$$

where $e$ is the unit lift over an equal-expected-cost flat discount, $\phi$ is total hedge drag, and
$\mu$ is contribution margin. Everything else here is in service of computing $\phi$ and gating
feasibility.

At $\mu = 0.45$: **required lift is 1.7–3.4%** across $p \in [0.03, 0.10]$ against exchange friction
alone, **6.9–9.8%** once a facilitator takes 2% of order value.

---

## Contents

1. [Framing: what the benchmark actually is](#1-framing-what-the-benchmark-actually-is)
2. [Notation](#2-notation)
3. [The instrument](#3-the-instrument)
4. [Exposure and the hedge](#4-exposure-and-the-hedge)
5. [The feasibility gate](#5-the-feasibility-gate)
6. [The drag stack](#6-the-drag-stack)
7. [The required-lift condition](#7-the-required-lift-condition)
8. [Where the band lives](#8-where-the-band-lives)
9. [Facilitator economics](#9-facilitator-economics)
10. [Liquidity, depth, position limits](#10-liquidity-depth-position-limits)
11. [Trigger-to-contract resolution](#11-trigger-to-contract-resolution)
12. [Levers on the constraint](#12-levers-on-the-constraint)
13. [Incremental hedging and timing](#13-incremental-hedging-and-timing)
14. [Sensitivity ranking](#14-sensitivity-ranking)
15. [The feasibility engine](#15-the-feasibility-engine)
16. [Appendix A: perishable-inventory case](#appendix-a-perishable-inventory-case)
17. [Appendix B: formula reference](#appendix-b-formula-reference)

---

## 1. Framing: what the benchmark actually is

The naive analysis asks whether the promotion is profitable. It is, easily, over a wide band. That
question is not load-bearing.

The correct counterfactual is **the flat discount the merchant could run instead, for free.** A
merchant choosing to run a contingent promo at $p = 0.08$ is choosing it *over* an 8% storewide sale
that costs the same in expectation, carries no variance, no fees, no counterparty, and no regulatory
surface.

This inverts the burden of proof. The mechanic does not need to be profitable — it needs to be
*better than a discount*, and it starts from behind by exactly the drag stack.

Three consequences:

**$p$ is not a free parameter.** $p$ *is* the discount depth. A merchant at 45% gross margin cannot
offer a 50%-probability "free purchase" for the same reason they cannot run a 50% off sale.

**Hedging removes variance, never the mean.** The expected cost of the promotion is $pV$ hedged or
unhedged. The hedge buys certainty and costs $\phi V$ for it.

**The entire thesis rests on one unmeasured empirical parameter.** Whether "chance of free" out-sells
an equal-cost flat discount is a behavioral question. No third-party, holdout-controlled
incrementality figure exists for this mechanic at an ordinary merchant. The model below can tell you
exactly how large that edge must be; it cannot tell you whether it exists.

---

## 2. Notation

| Symbol | Meaning | Example |
|---|---|---|
| $E$, $\mathbb{1}_E$ | The trigger event; indicator | — |
| $p$ | Kalshi YES price — pays \$1 on $E$ | 0.06 |
| $V$ | Order value (AOV) | \$120 |
| $R$ | Refund amount per order | $= V$ |
| $\gamma$ | Variable cost ratio (COGS + fulfilment + payment) | 0.55 |
| $\mu = 1-\gamma$ | Contribution margin | 0.45 |
| $N_c$, $N_d$ | Units sold — contingent promo vs flat discount | — |
| $e$ | Unit lift, $N_c/N_d - 1$ | **unknown** |
| $d$ | Flat discount depth, benchmark | $= p$ |
| $\delta$ | Half-spread, in dollars per contract | 0.005 |
| $f_x$ | Exchange fee per contract | — |
| $\phi$ | Total drag per \$1 of notional | — |
| $\tau$ | Facilitator take, as fraction of order value | 0.02 |
| $q$, $\Lambda$ | Contracts held; exposure | — |

Note $p$, $\delta$, $\phi$, $\mu$, $d$, $\tau$ are all dimensionless fractions of order value, so they
add and compare directly. This is deliberate — it is what makes §7 a one-line comparison.

---

## 3. The instrument

A Kalshi YES contract on $E$: costs $p \in (0,1)$, pays exactly \$1 if $E$ resolves YES, \$0 otherwise.

Three properties matter.

**Price is probability.** $p = 0.06$ means the market prices $E$ at 6%. This is the reframe the whole
document turns on: the merchant is not buying insurance against an unlikely event, they are buying a
6% discount and paying a spread for the privilege of making it feel like a lottery.

**Payoff is denominated in dollars.** To cover $\Lambda$ dollars of refund liability, hold $\Lambda$
contracts. Sizing is a division by one — no delta, no rebalancing against price moves.

**Discrete, bounded, hold-to-resolution.** No margin calls, no path dependence.

---

## 4. Exposure and the hedge

Per order sold under the promotion:

$$
\begin{aligned}
\text{No trigger:} \quad & V - \gamma V = \mu V \\
\text{Trigger:} \quad & V - \gamma V - R = \mu V - R
\end{aligned}
$$

With $R = V$ (full refund): $\;\mu V - V = -\gamma V$. The merchant eats COGS and returns the cash.

$$\Pi = N\mu V - \mathbb{1}_E\, NR, \qquad \Lambda = NR$$

Adding $q$ contracts at all-in cost $c$ per contract:

$$\Pi = N\mu V - qc + \mathbb{1}_E(q - NR)$$

The uncertain term vanishes identically at

$$\boxed{q^\star = \Lambda = NR}$$

One contract per dollar of refund exposure. This is exact cancellation — $\text{Var}(\Pi) = 0$, not
minimized in expectation — and it is the one piece of the model that is genuinely clean.

$$\Pi = N\big(\mu V - Rc\big)$$

**Direction check.** The merchant is short the event: they owe money when $E$ occurs. They buy YES.
Buying NO doubles exposure instead of neutralizing it, and produces a plausible-looking number. §15
includes the regression test.

---

## 5. The feasibility gate

With $R = V$ and ignoring drag, $\Pi > 0$ requires $p < \mu$.

**This is a gate, not a decision rule.** It was the headline result in the naive framing; under the
correct benchmark it is close to non-binding. At $\mu = 0.45$ the gate permits $p$ up to 0.45, while
the economically viable band tops out near 0.10 — the gate is never the constraint that binds.

Keep it in the code as an assertion. Do not put it in the pitch as the insight.

---

## 6. The drag stack

Drag is everything the merchant pays above the expected refund cost $pV$.

### 6.1 Exchange fee

Kalshi's trading fee is approximately

$$f_x = \lceil 0.07 \cdot p(1-p) \rceil \;\text{per contract}$$

The $p(1-p)$ shape means fees peak at $p = 0.50$ and fall toward both tails. Working in the low-$p$
band is fee-favorable.

### 6.2 Half-spread

On a 1¢-tick book, crossing costs roughly half a tick: $\delta \approx 0.005$. This is a **fixed
absolute cost**, independent of $p$ — which is the single most important structural fact in this
section.

### 6.3 Total

$$\boxed{\phi(p) = \delta + 0.07\,p(1-p)}$$

| $p$ | $\delta$ | fee | $\phi$ | **$\phi/p$** |
|---|---|---|---|---|
| 0.03 | 0.0050 | 0.0020 | 0.0070 | **23.5%** |
| 0.05 | 0.0050 | 0.0033 | 0.0083 | **16.6%** |
| 0.06 | 0.0050 | 0.0039 | 0.0089 | **14.9%** |
| 0.08 | 0.0050 | 0.0052 | 0.0102 | **12.7%** |
| 0.10 | 0.0050 | 0.0063 | 0.0113 | **11.3%** |

Reproduces the README's **11–24% of premium** band.

### 6.4 The composition matters more than the total

At $p = 0.03$ the spread is 71% of drag; at $p = 0.10$ it is 44%. Drag is **spread-dominated at low
$p$**.

This is the observation that changes the targeting conclusion. "23% of premium" makes $p = 0.03$ look
like the worst place to operate. But the required-lift threshold in §7 depends on **absolute** $\phi$,
not $\phi/p$ — and absolute $\phi$ is *monotonically increasing* in $p$ across the whole band.

> **Low $p$ looks worst on the percentage framing and is in fact the easiest region to clear.**

The percentage-of-premium figure is the wrong denominator for the decision. It is worth quoting for
honesty; it should not drive event selection.

---

## 7. The required-lift condition

### 7.1 Setup

**Flat discount at depth $d$**, selling $N_d$ units:

$$\Pi_d = N_d\big[V(1-d) - \gamma V\big] = N_d V(\mu - d)$$

**Contingent promo at price $p$**, selling $N_c$ units, hedged, with $R = V$:

$$\Pi_c = N_c\big[V - \gamma V - V(p + \phi)\big] = N_c V(\mu - p - \phi)$$

### 7.2 Equal-expected-cost benchmark

Set $d = p$ — the discount the merchant could run for the same expected outlay. Then $\Pi_c > \Pi_d$
iff

$$N_c(\mu - p - \phi) > N_d(\mu - p)$$

$$\frac{N_c}{N_d} > \frac{\mu - p}{\mu - p - \phi}$$

$$\boxed{e \;>\; \frac{\phi}{\mu - p - \phi}}$$

### 7.3 Reading it

The threshold is drag divided by *net margin after the discount*. Both terms are small; the ratio is
what matters.

- Rises with $\phi$ — every basis point of friction must be earned back
- Rises with $p$ — deeper discounts leave less margin to absorb drag, and $\phi$ itself grows
- **Falls with $\mu$** — high-margin merchants clear far more easily

### 7.4 The numbers

At $\mu = 0.45$:

| $p$ | $\phi$ | $\mu - p - \phi$ | **required $e$** |
|---|---|---|---|
| 0.03 | 0.0070 | 0.4130 | **1.70%** |
| 0.05 | 0.0083 | 0.3917 | **2.12%** |
| 0.06 | 0.0089 | 0.3811 | **2.35%** |
| 0.08 | 0.0102 | 0.3598 | **2.83%** |
| 0.10 | 0.0113 | 0.3387 | **3.34%** |

Matches the README's **~2–3.4%** against exchange friction alone.

### 7.5 With a facilitator

If a platform takes $\tau$ of order value, the merchant's condition becomes

$$e \;>\; \frac{\phi + \tau}{\mu - p - \phi - \tau}$$

At $\tau = 0.02$:

| $p$ | required $e$ |
|---|---|
| 0.03 | **6.88%** |
| 0.06 | **8.02%** |
| 0.10 | **9.82%** |

Matches the README's **~7–10%**.

**The facilitator take is 3–4× the entire exchange friction.** At $p = 0.06$: exchange drag 0.89% of
order value, facilitator 2%. The platform is by far the largest cost in the stack, which is an
uncomfortable but load-bearing fact — see §9 and §14.

---

## 8. Where the band lives

Two independent arguments converge on the same region, and they converge from opposite directions.

**From the drag side (§6.4):** absolute $\phi$ is monotonically increasing in $p$. Low $p$ minimizes
the threshold.

**From the behavioral side:** Gaertig & Simmons (*JCR* 2026, N = 8,969, preregistered) find the
probabilistic-discount edge appears **only when the equivalent sure discount is or seems trivial.** A
consumer weighing 3% off versus a 3% shot at free finds the sure thing negligible and the lottery
salient. At 30% versus a 30% shot, the sure discount is real money and the lottery loses.

That is a statement about low $d$ — hence low $p$.

$$\underbrace{\text{drag minimized}}_{\text{low } p} \quad\longleftrightarrow\quad \underbrace{\text{behavioral edge exists}}_{\text{low } p}$$

**The Gaertig & Simmons result does not kill the mechanic. It localizes it — to the same region where
absolute drag is lowest.** The README files it under evidence against; it belongs in the targeting
section. It is the only published evidence that tells you *where* to point the product, and it points
somewhere the cost structure independently favors.

The operating band is $p \in [0.03, 0.06]$, requiring $e \in [1.7\%, 2.4\%]$ merchant-side.

Two caveats worth stating rather than burying. The study establishes a *direction*, not a magnitude,
and certainly not a magnitude at an ordinary merchant under a holdout. And "trivial" is a perceptual
threshold that scales with basket size — 3% of \$40 and 3% of \$400 are not the same psychological
object, which suggests low-AOV categories as the beachhead.

---

## 9. Facilitator economics

Per order, the facilitator collects $\tau V$ and bears execution and infrastructure. At $\tau = 0.02$,
$V = \$120$: \$2.40 per order.

The tension is structural. §7.5 shows the take *triples to quadruples* the required lift. Every basis
point charged raises the empirical bar for the merchant, on a mechanic whose core premise is
unmeasured.

Three responses, in increasing order of honesty:

**Take less.** At $\tau = 0.005$, required lift at $p=0.06$ falls from 8.0% to 3.7%. Viable, but the
unit economics of a thin promo app at 50bps are difficult.

**Charge for the gate, not the flow.** The feasibility engine (§15) has value independent of order
volume: it tells a merchant which promos are hedgeable *before* they commit. Subscription pricing
decouples revenue from $\tau$ and does not tax the merchant's break-even.

**Own the risk instead of facilitating it.** The README's central finding is that every \$1B outcome
in the comp set owns the risk or the distribution, and every pure-software facilitator in the middle
failed or stalled. If the platform underwrites — taking the other side and running its own hedge book
— $\tau$ disappears from the merchant's condition entirely and the platform earns the spread it was
previously charging for. That is a categorically different company with a categorically different
regulatory surface, and it is outside hackathon scope. It is also, per the comp set, the only version
that has ever worked.

---

## 10. Liquidity, depth, position limits

Sizing is trivially $q = NR$; **executing it is the binding operational constraint.**

### 10.1 Scale

$N = 500$ orders at $R = \$120$ requires **60,000 contracts**. That is serious size in most Kalshi
markets and well beyond typical resting depth at the touch.

### 10.2 Walking the book

With resting size $s_i$ at price $p_i$, filling $q$ costs

$$\bar{p} = \frac{1}{q}\sum_i s_i p_i, \qquad q = \sum_i s_i$$

Effective drag becomes $\phi_{\text{eff}} = \bar{p} - p_{\text{mid}} + f_x$. On a thin book this can
exceed the modeled $\phi$ by several multiples, which propagates directly into §7 and can flip a
feasible campaign infeasible.

**Gate on depth, not just price.** Cap campaign size at a fraction of visible depth:

$$N_{\max} = \frac{\kappa \cdot \text{depth}_{\text{within } \delta}}{R}, \qquad \kappa \approx 0.25$$

### 10.3 Position limits

Kalshi enforces per-market position limits. A single large campaign can exhaust the limit outright,
independent of liquidity. The cap is

$$N_{\max} = \min\left(\frac{L}{R},\; \frac{\kappa\,\text{depth}}{R},\; \frac{B}{R(p+\phi)}\right)$$

three ceilings — regulatory, liquidity, budget — and the engine must surface which one binds.

**This is a genuine differentiator.** A merchant cannot discover any of these from a Kalshi screen.
"We will tell you this promo cannot be hedged at your volume, before you announce it" is a real
product claim and it validates entirely against the public read API.

---

## 11. Trigger-to-contract resolution

The merchant writes marketing copy. The hedge needs a contract. Bridging those is the least glamorous
and most failure-prone part of the system.

### 11.1 Exact matching, non-negotiable

Under exact matching residual risk is identically zero. Under proxy hedging it is governed by a
correlation estimate — and correlation estimates fail precisely when they are needed.

**If the exact market does not exist, refuse the campaign.** A system that can decline is more
trustworthy than one that always finds a way, and this is the concrete content of the README's *"lead
with refusing to sell a promo you can't hedge."*

### 11.2 The failure modes

| Mode | Example | Handling |
|---|---|---|
| **Wording drift** | Copy says "if it snows"; contract resolves on ≥1.0" at a named station | Bind copy to contract language; surface exact resolution text to the merchant |
| **Timing mismatch** | Promo runs through Sunday; contract resolves Friday | Require resolution ≥ promo close |
| **Source mismatch** | "Knicks win" vs. contract on a postponed game | Verify resolution source and postponement rules |
| **Partial resolution** | Multi-leg trigger, single-leg contract | Refuse |

### 11.3 Copy is a contract

The merchant's public promise is what customers will hold them to; the Kalshi contract is what pays.
Any gap between them is unhedged liability that appears nowhere in the model.

Practical rule: **generate the promo copy from the contract's resolution criteria**, never the reverse.
This is a product decision as much as a technical one, and it is the right default even though
merchants will push back on the language.

---

## 12. Levers on the constraint

Ranked by effect on the §7 threshold.

### 12.1 Contribution margin — largest structural lever

$\mu$ sits in the denominator. Required lift at $p = 0.06$:

| $\mu$ | required $e$ | with $\tau = 0.02$ |
|---|---|---|
| 0.30 | 3.86% | 13.4% |
| 0.45 | 2.35% | 8.0% |
| 0.60 | 1.69% | 5.5% |
| 0.75 | 1.31% | 4.2% |

**High-margin merchants clear at roughly a third the lift of low-margin ones.** Beachhead selection
should weight $\mu$ heavily — DTC beauty, supplements, digital goods, apparel over electronics,
grocery, or marketplace resale.

Use *contribution* margin, not accounting margin: these are incremental units, so overhead does not
scale. Merchants who enter net margin will conclude nothing qualifies.

### 12.2 Store credit instead of cash refund

Refunding \$$V$ in **store credit** rather than cash changes the liability from cash out to goods out.
With redemption rate $\psi$, exposure per order becomes $\psi\gamma V$ rather than $V$:

$$\Lambda = N\psi\gamma R$$

At $\psi = 0.70$, $\gamma = 0.55$: exposure falls by a factor of **2.6×**, and hedge cost with it.
Every liquidity and position-limit ceiling in §10 loosens by the same factor.

The offsetting cost is customer-perceived value: "your money back" and "\$120 in store credit" are not
the same offer, and the behavioral edge $e$ — the parameter the entire thesis rests on — is presumably
smaller for the weaker promise. Whether the exposure reduction outruns the $e$ reduction is
unmeasured, and it is a distinct empirical question from the base one.

Flagging rather than resolving: the README notes store-credit refinement sits in the unpublished
trail.

### 12.3 Event selection

Target $p \in [0.03, 0.06]$ per §8. Secondary criteria: high resting depth, headroom under position
limits, resolution ≥ 24h after promo close, unambiguous resolution source, and no political events.

---

## 13. Incremental hedging and timing

$N$ is unknown at launch; orders arrive over $[0,T]$. Hedging as they arrive:

$$\text{Cost} = R\int_0^T P_t\,dN_t = R\,N_T\,\bar{P}$$

$P_t$ is a martingale, so with arrivals independent of price, $\mathbb{E}[\bar P] = P_0$. They are not
independent: the promotion's salience rises as the event becomes more likely, so order intensity
correlates with $P_t$:

$$\mathbb{E}\!\left[\int_0^T P_t\,dN_t\right] = P_0\,\mathbb{E}[N_T] + \underbrace{\int_0^T \mathrm{Cov}\big(P_t, \lambda(P_t)\big)dt}_{>\,0}$$

**This does not break the hedge** — the position covers realized exposure, so it is always exactly
right. It raises average cost, appearing as an addition to $\phi$ and flowing into §7.

Mitigations: hedge on every order rather than on a schedule (the gap is unhedged exposure); close the
promo well before resolution; re-check the §5 gate before every fill and pause on breach; track
$\bar{P}$ vs $P_0$ as a first-class KPI.

For $p$ moving from 0.05 to 0.07 over a campaign with intensity-weighted arrivals, the effect is on
the order of 0.5–1.0¢ — comparable to the entire exchange fee. Not negligible.

---

## 14. Sensitivity ranking

Effect on required $e$, ordered by magnitude, at baseline $\mu = 0.45$, $p = 0.06$, $\tau = 0.02$:

| Rank | Parameter | Perturbation | $\Delta e$ | Notes |
|---|---|---|---|---|
| 1 | $\tau$ | $0.02 \to 0$ | **−5.7pp** | Largest single term. §9. |
| 2 | $\mu$ | $0.45 \to 0.30$ | +5.4pp | Beachhead selection |
| 3 | $\mu$ | $0.45 \to 0.60$ | −2.5pp | — |
| 4 | Book depth | thin, $2\times$ spread | +1.6pp | §10 |
| 5 | $p$ | $0.06 \to 0.10$ | +1.8pp | §8 |
| 6 | $p$ | $0.06 \to 0.03$ | −1.1pp | — |
| 7 | Timing drag | +0.75¢ | +0.7pp | §13 |
| 8 | Exchange fee | ±50% | ±0.3pp | Smallest |

**The exchange fee — the thing that looks like the cost — ranks last.** The facilitator take and the
merchant's margin dominate, and both are choices rather than market conditions.

Two conclusions follow, and they are the ones to carry into the business docs. Beachhead selection on
$\mu$ is worth more than any amount of execution optimization. And the pricing decision is the single
largest determinant of whether the merchant's break-even is reachable — which is an argument for
subscription over take-rate, or for owning the risk outright.

---

## 15. The feasibility engine

The buildable, defensible core. Validates entirely against Kalshi's public unauthenticated read API
before anything is signed.

```python
from dataclasses import dataclass
from math import ceil

KAPPA = 0.25          # max fraction of visible depth to consume
TICK  = 0.01
HALF_SPREAD = TICK / 2


@dataclass
class Market:
    ticker: str
    title: str
    yes_bid: float
    yes_ask: float
    depth_at_touch: int          # contracts within one tick
    position_limit: int
    resolves_at: str
    resolution_text: str

    @property
    def mid(self) -> float:
        return (self.yes_bid + self.yes_ask) / 2

    @property
    def spread(self) -> float:
        return self.yes_ask - self.yes_bid


def exchange_fee(p: float) -> float:
    """Kalshi trading fee per contract, ≈ 0.07·p(1−p)."""
    return 0.07 * p * (1 - p)


def drag(p: float, half_spread: float = HALF_SPREAD) -> float:
    """Total friction per $1 of notional, in the same units as p."""
    return half_spread + exchange_fee(p)


def required_lift(p: float, mu: float, phi: float, tau: float = 0.0) -> float:
    """THE central result.

    Unit lift the contingent promo must achieve over an equal-expected-cost
    flat discount. e > (φ + τ) / (μ − p − φ − τ)

    Returns inf when the denominator is non-positive: no lift can rescue it.
    """
    denom = mu - p - phi - tau
    if denom <= 0:
        return float("inf")
    return (phi + tau) / denom


@dataclass
class Campaign:
    n: int            # orders
    v: float          # AOV
    r: float          # refund amount per order
    mu: float         # contribution margin
    p: float          # contract price
    phi: float        # drag

    @property
    def exposure(self) -> float:
        return self.n * self.r

    @property
    def contracts(self) -> int:
        """q* = Λ. Round UP — never under-hedge."""
        return ceil(self.exposure)

    @property
    def hedge_cost(self) -> float:
        return self.contracts * (self.p + self.phi)

    @property
    def locked_pnl(self) -> float:
        return self.n * self.mu * self.v - self.hedge_cost

    def pnl(self, triggered: bool) -> float:
        """Computed from primitives, both states. Must be equal."""
        revenue = self.n * self.v
        cogs    = self.n * (1 - self.mu) * self.v
        refunds = self.n * self.r if triggered else 0.0
        payout  = self.contracts if triggered else 0.0
        return revenue - cogs - refunds - self.hedge_cost + payout

    def verify(self, tol: float = 1.0) -> bool:
        return abs(self.pnl(True) - self.pnl(False)) < tol


def feasible(mkt: Market, mu: float, aov: float, refund: float,
             target_orders: int, budget: float, tau: float = 0.0) -> dict:
    """Pre-trade feasibility. Refusing is a valid, first-class answer."""

    p   = mkt.mid
    phi = drag(p, mkt.spread / 2)

    reasons = []

    # --- gates ---------------------------------------------------------
    if p >= mu:
        reasons.append(f"price {p:.3f} exceeds margin {mu:.2f}")

    cap_limit  = mkt.position_limit // refund
    cap_depth  = int(KAPPA * mkt.depth_at_touch) // refund
    cap_budget = int(budget // (refund * (p + phi)))
    cap = min(cap_limit, cap_depth, cap_budget)

    if cap < target_orders:
        binding = min(
            [("position limit", cap_limit),
             ("book depth", cap_depth),
             ("budget", cap_budget)],
            key=lambda t: t[1])[0]
        reasons.append(
            f"capacity {cap} < target {target_orders} (binding: {binding})")

    if mkt.spread > 2 * TICK:
        reasons.append(f"spread {mkt.spread:.3f} too wide")

    e_req = required_lift(p, mu, phi, tau)

    n = min(cap, target_orders)
    camp = Campaign(n=max(n, 1), v=aov, r=refund, mu=mu, p=p, phi=phi)
    assert camp.verify(), f"hedge invariant violated: {mkt.ticker}"

    return {
        "ticker": mkt.ticker,
        "title": mkt.title,
        "feasible": not reasons,
        "reasons": reasons,
        "price": round(p, 4),
        "drag": round(phi, 4),
        "drag_pct_of_premium": round(phi / p, 3) if p else None,
        "effective_discount": round(p + phi + tau, 4),
        "required_lift": round(e_req, 4),
        "max_orders": cap,
        "contracts": camp.contracts,
        "hedge_cost": round(camp.hedge_cost, 2),
        "resolution_text": mkt.resolution_text,   # bind copy to this
    }
```

### 15.1 Invariants

```python
def test_hedge_neutral():
    c = Campaign(n=500, v=120, r=120, mu=0.45, p=0.06, phi=0.0089)
    assert c.contracts == 60_000
    assert abs(c.pnl(True) - c.pnl(False)) < 1.0     # the whole hedge


def test_hedge_direction():
    """Buying NO instead of YES doubles exposure. Plausible-looking,
    catastrophic, invisible to code review. Test it."""
    c = Campaign(n=500, v=120, r=120, mu=0.45, p=0.06, phi=0.0089)
    wrong = abs(-c.exposure - c.contracts)
    assert wrong == 2 * c.exposure


def test_required_lift_matches_readme():
    for p, expected in [(0.03, 0.017), (0.06, 0.024), (0.10, 0.033)]:
        e = required_lift(p, mu=0.45, phi=drag(p))
        assert abs(e - expected) < 0.002


def test_facilitator_take_dominates():
    """τ = 2% raises the bar ~3.4×. The platform is the largest cost."""
    base = required_lift(0.06, 0.45, drag(0.06))
    with_fee = required_lift(0.06, 0.45, drag(0.06), tau=0.02)
    assert with_fee / base > 3
```

### 15.2 What to show

The quote surface is three numbers, and the third is the one nobody else can produce:

| | Example |
|---|---|
| Effective discount | 6.9% (6.0% expected refund + 0.9% friction) |
| Max hedgeable orders | 1,240 — **binding: book depth** |
| Required lift vs. 6.9% flat discount | **2.4%** |

Showing the third number is showing the merchant the case *against* the product. That is the correct
posture: it is the only claim in the stack that is both true and unavailable anywhere else, and a tool
that quantifies its own break-even is more credible than one that asserts a lift figure it cannot
source.

---

## Appendix A: Perishable-inventory case

The dominance argument in §1 assumes the flat discount is a real alternative. There is one class of
merchant where it is not, and it is worth carving out because the economics differ structurally rather
than in degree.

**Setup.** A restaurant with a terrace loses substantial revenue when it rains. That exposure is
uninsured and simply absorbed. Consider: *"free brunch if it rains Sunday."*

- **Rains** → the terrace was empty regardless. The promo fills the indoor room; the Kalshi payout
  covers the comps.
- **Doesn't rain** → terrace full at full price. The premium is paid out of a good day.

**The hedge payoff is negatively correlated with baseline revenue.** Total business variance falls by
more than the campaign's own variance. A flat discount provides none of this.

Three differences from the Shopify case:

**Margin.** Incremental covers carry $\mu \approx 0.70$ vs 0.35–0.45 in e-commerce. Per §12.1 and §14,
this is the highest-ranked lever, and it roughly halves the required lift.

**Perishability.** An unsold seat-night is destroyed, not carried. The opportunity cost of *not*
running a promotion is real in a way it is not for shelf inventory.

**The merchant should pay $\phi$ on the merits.** In the e-commerce case, drag is pure friction
justified only by the unmeasured behavioral edge. Here it purchases a genuine reduction in
pre-existing operational variance — a real economic service, priced. It is the only version of the
argument that does not route through $e$.

The mechanics carry over unchanged: $q^\star = \Lambda$, exact resolution matching, incremental
hedging, depth gating. The benchmark changes, and with it the burden of proof.

Whether this is a wedge or a distraction is a strategy question, not a modeling one. It is a different
sales motion — local, high-touch, low-AOV — against the Shopify app-store distribution the main thesis
assumes. Noted here so the carve-out is not lost, not argued for.

---

## Appendix B: Formula reference

$$
\begin{aligned}
\text{Exposure:} \quad & \Lambda = NR \\[4pt]
\textbf{Hedge:} \quad & \boxed{q^\star = \Lambda = NR} \\[4pt]
\text{Exchange fee:} \quad & f_x = 0.07\,p(1-p) \\[4pt]
\textbf{Drag:} \quad & \boxed{\phi = \delta + 0.07\,p(1-p)} \\[4pt]
\text{Effective discount:} \quad & p + \phi + \tau \\[4pt]
\text{Feasibility gate:} \quad & p < \mu \quad \text{(necessary, rarely binding)} \\[4pt]
\textbf{Required lift:} \quad & \boxed{e > \dfrac{\phi + \tau}{\mu - p - \phi - \tau}} \\[4pt]
\text{Capacity:} \quad & N_{\max} = \min\!\left(\tfrac{L}{R},\ \tfrac{\kappa\,\text{depth}}{R},\ \tfrac{B}{R(p+\phi)}\right) \\[4pt]
\text{Book-walk cost:} \quad & \bar p = \tfrac{1}{q}\textstyle\sum_i s_i p_i \\[4pt]
\text{Store credit:} \quad & \Lambda = N\psi\gamma R
\end{aligned}
$$

### Baseline

$\mu = 0.45$, $V = R = \$120$, $p = 0.06$, $\delta = 0.005$, $N = 500$

| Quantity | Value |
|---|---|
| Exposure | \$60,000 |
| Contracts | 60,000 |
| Drag $\phi$ | 0.0089 (14.9% of premium) |
| Effective discount | 6.89% |
| Hedge cost | \$4,134 |
| **Required lift, merchant-side** | **2.35%** |
| **Required lift, $\tau = 0.02$** | **8.02%** |

### The three lines

$$\boxed{q^\star = NR} \qquad \boxed{\phi = \delta + 0.07p(1-p)} \qquad \boxed{e > \frac{\phi + \tau}{\mu - p - \phi - \tau}}$$

Hedge one contract per dollar of refund. Drag is spread plus fee, spread-dominated at low $p$. The
promo beats a flat discount only if it lifts units by more than drag over post-discount margin.

**And the honest closing line:** $e$ is the only parameter here that has never been measured, and it
is the only one that decides the question.
