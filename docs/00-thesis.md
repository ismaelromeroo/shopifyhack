# Project 04 — Outcome-Contingent Refund Promotions ("Discount-as-a-Lottery")

**Date:** 2026-07-21
**Status:** KILL as a venture-scale thesis · real as a small specialty business · one cheap test decides it

*This page is the whole idea in one read. It condenses a longer research trail — a prediction-market
rail survey, an adversarial teardown, and a deep fact-checking pass — not published here.*

---

## The idea, in one sentence

> **A service that lets any store run a "buy now — get your money back if [a public event] happens"
> promotion (a game result, a Fed cut), and hedges the payout on a prediction market (Kalshi) so the
> store's cost is fixed and known instead of a gamble — productizing the "Mattress Mack" trick for
> everyone.**

The store offers customers a **chance-based discount** ("you might get it free"); the hedge gives the
store **cost certainty.** That's the product.

---

## The core reframe (read this before anything else)

**"Free if X" is a plain discount wearing a lottery-ticket costume.**

A 10%-probability "your whole purchase is free" offer is, on average, a **10% discount** — because the
market price of the event *is* its probability. The hedge doesn't make it cheaper; it makes the cost
**certain**. So the whole business reduces to one question:

> ### Does a hedged *"chance to get it free"* promotion sell more than a **plain discount of the same cost**?

And here is the uncomfortable sharpening: **at equal expected value, the hedged version is *strictly
worse* than a plain discount — by the amount of the fees** (Kalshi's fee + your facilitation fee). So
the "chance of free" excitement doesn't merely have to *beat* a plain discount — it has to beat it by
**enough to cover the entire fee stack.** Everything else in this project is downstream of that.

---

## The hedge math (why the cost is fixed)

A Kalshi **YES contract** pays **$1 if the event happens, $0 if not**, and costs **`p`** — the
probability itself (10% ⇒ $0.10). To cover a refund liability `L`, buy `N = L` contracts for `L·p`.

**Worked example — 10 orders of $600, full refund if a 10% event hits (`L` = $6,000):**

| | Event hits | Event misses |
|---|---|---|
| Refunds paid to customers | −$6,000 | 0 |
| Hedge payout | +$6,000 | 0 |
| Premium (paid upfront) | −$600 | −$600 |
| Kalshi fee (paid upfront) | −$37.80 | −$37.80 |
| **Net cost** | **−$637.80** | **−$637.80** |

**Either way you're out $637.80** — that's your fixed "10% off," **plus fees = 10.6% all-in.** The
hedge converts a `{0 or $6,000}` gamble into a certain $637.80. *(Kalshi fee = `0.07·C·P·(1−P)`,
charged once at purchase, gone regardless of outcome.)*

**Break-even lift.** Each order now nets $270 margin − $63.80 hedge cost = **~$206**. To recover the
$637.80 you spent on your baseline buyers, you need **~3 extra sales — from 10 to ~13, a ~30% lift.**
A plain 10%-off sale needs *slightly less* lift (no Kalshi fees), which is the whole point: **absent a
behavioral edge, this is a more expensive way to run a discount.**

---

## The central question, restated

**Does "chance of free" out-sell a plain discount by more than the fees?** The honest case on each side:

- **For (the bull case):** it's **newsworthy** — a local store giving merch away if the home team wins
  is earned media a flat discount can't buy; it's **novel**; and **people aren't rational** (it's why
  gambling exists), so a "chance to win it free" may pull harder than the math says.
- **Against (the evidence):** the best study (Gaertig & Simmons, *JCR* 2026, N=8,969) finds the
  probabilistic edge appears **only when the discount is trivial** — gambling psychology works on
  cheap, impulse stakes, and **washes out on planned big-ticket buys** (exactly the goods you need to
  fund the hedge). And the earned-media lift is a **scarcity good** that **decays as the mechanic
  proliferates** — durable for Mattress Mack the *persona*, not for the 50th anonymous store.

**This is genuinely untested for an ordinary merchant** — every impressive number in the record is
self-reported PR from persona-driven monopolists. It is the one thing worth measuring (see below).

---

## The four hurdles (ranked)

1. **The core value prop might not exist.** If "chance of free" nets the same as a flat discount once
   the novelty fades, there's no business — you've built a costlier discount. *(The #1 risk, untested.)*
2. **Thin moat / DIY collapse.** Nothing stops a merchant from opening Kalshi and hedging themselves —
   unless you own the ops (compliance, checkout, live sizing, cross-merchant data).
3. **Regulatory dependence on the rail.** Prediction-market sports contracts are increasingly
   restricted (Minnesota felony ban Aug 1 2026, WA, NV, tribal/IGRA). **If Kalshi's sports rail goes,
   the business goes** — and sportsbooks can't absorb systematic hedge volume (they ban winners).
4. **Unlicensed-insurer risk.** Collecting a merchant's fee to guarantee a payout on an uncertain event
   is **prize-indemnity insurance** in substance; a uniform/"guaranteed" payout doesn't change that —
   only keeping the **merchant as principal** does.

---

## The competitors

- **PlayAbly** ([playably.ai](https://playably.ai/)) — YC-backed startup doing exactly this, but as a
  **self-underwriter** (takes the risk on its own book, hedges on Kalshi) — the legally-riskier lane.
- **SCA Promotions** ([scapromotions.com](https://scapromotions.com/)) — the 40-year, ~$40M-revenue
  incumbent that sells the same conditional rebates the licensed-insurance way (and other prize promos —
  hole-in-one, guess-the-code vault giveaways).

---

## Verdict

**KILL as a venture-scale thesis; real as a small specialty business.** The economics cap at a niche
(the 40-year category leader is ~$40M; value accrues to the risk-holder or the exchange, not a
capital-light facilitator), the behavioral edge is weak-to-absent at the stakes that fund the hedge,
and the demonstrated lift is an earned-media novelty that doesn't transfer to ordinary merchants.

**The one cheap test that decides it:** run one real promo against a **plain equal-cost discount** with
2–3 ordinary (non-persona) merchants, and measure **incremental *margin*** — not traffic — **net of the
trailing 60 days.** If "chance of free" beats a flat discount by more than the fees, the idea is alive;
if not, you've confirmed the kill for the price of a weekend.

---

## Read next

- [`01-business-math.md`](01-business-math.md) — the full unit-economics + hedging model

*All content is business analysis, not legal or financial advice. Prediction-market and
unclaimed-property law move quarterly (the sports-rail litigation weekly); re-verify with counsel
before committing capital.*
