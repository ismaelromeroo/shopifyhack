# 05 — The Pitch

**Date:** 2026-08-15
**Scope:** The argument in the order it should be told. Numbers here are derived in
[`01-math.md`](01-math.md); the commercial layer is [`02-business.md`](02-business.md); the case
against is [`04-adversarial-review.md`](04-adversarial-review.md).

---

## The problem

Every store you walk past is running a sale right now. Most of that money is wasted — a large share of
the people taking the discount were going to buy anyway — and none of it is memorable. **Nobody has
ever told a friend about 10% off.**

That sets the comparison object for everything below. A merchant's real alternative to this product is
not "do nothing." It is **the discount they were going to run anyway.**

---

## The idea

Same budget, different shape.

> Instead of **10% off for everyone** — **a 1-in-10 chance your whole order is free.**

---

## The equivalence

Those two promotions cost the same.

A 10% chance of giving an order away costs 10% in expectation. On **100 orders × $200**, a flat 10% off
costs **$2,000** — and so does the chance-of-free version, plus friction. It is not a gamble the
merchant runs *instead of* a discount. **It is the discount, reshaped.**

| | Flat 10% off | 1-in-10 your order is free |
|---|---|---|
| What the customer is told | "10% off" | "10% chance your whole order is free" |
| Expected cost to merchant | $2,000 | $2,000 |
| Anyone tells a friend | no | that is the entire bet |

**"Isn't this just a discount with extra steps?"** Yes. That is the thesis, not an objection to it. It
costs about what the sale costs. The difference is that people talk about this one.

---

## So why doesn't anyone do it?

Because of the variance. **If the event fires, the merchant owes every customer at once** — a promise
that costs `$0 or $20,000`. That is not a marketing decision, it is a solvency decision, and no ordinary
merchant signs it.

The documented record of this mechanic is **about six merchant promos in 2026**
([`02-business.md`](02-business.md) §7), and the most-cited of them ran inside the exchange's own
small-business press push.

---

## The mechanism

**On a prediction market, contract price *is* probability.** A YES contract pays **$1 if the event
happens** and costs `p`. Buy one contract per dollar of possible liability and the promise stops being
a gamble — whatever the merchant owes customers, the contracts pay.

Unhedged, expected refund outlay is `P(E)·L`. Coverage costs `q` per $1, so `q·L`. When `q = P(E)`
these are identical: the hedge is not a bet, it is **a purchase of the merchant's own expected cost at
the market's price** ([derivation](01-math.md) §2).

**Worked, at the running example** — 100 orders × $200, full refund if a 10%-probability event fires,
liability $20,000:

| | Event fires (10%) | Event misses (90%) |
|---|---|---|
| Refunds paid to customers | −$20,000 | $0 |
| Hedge payout | **+$20,000** | $0 |
| Premium, paid upfront | −$2,000 | −$2,000 |
| Exchange fee, paid upfront | −$126 | −$126 |
| **Net cost** | **−$2,126** | **−$2,126** |

**The hedge fixes variance, not the mean.** It does not make the promotion cheaper. It makes it
knowable — and it adds fees on top.

---

## The product

The merchant picks an event from a list of the ones we can actually cover — each row priced by walking
its own live order book, and the ones too thin to hedge refused inline with the reason. Selecting one
returns **a single all-in number** before they commit, alongside what that same spend would be as a
plain discount. They click go. We hold the coupons, buy them incrementally as orders land, and pay the
refunds if it fires.

**They never open an account, never see a contract, never touch the exchange.**

The two screens that exist:

| Screen | What it shows |
|---|---|
| **Merchant console** | Trigger resolution, live book depth and spread, effective discount, the settlement text being paid against, and — once live — liability accrued against hedge coverage |
| **Customer claim ticket** | *"Your $180 order is riding on the Yankees — currently 34%"*, with odds updating off the same feed |

---

## The business model

**A management fee on the order, in the same shape the exchange charges one.** Not a markup buried in a
quoted price — three visible lines:

| Line | On the running example |
|---|---|
| Promo budget (the coverage itself) | $2,000 |
| Exchange fee | ~$126 |
| **Our management fee — 10% of the promo budget** | **$200** |
| **All-in** | **~$2,330** |

Against the **$2,000** flat sale the merchant was already running. Crossing a wider spread on a thinner
market pushes the all-in nearer **$2,430** — which is why the console quotes the real number for the
real book rather than a rate card.

Three properties worth stating plainly:

- **It is legible.** "We take 10% of the promo budget you're already spending" is a sentence a merchant
  can evaluate in one pass. A spread embedded in a quoted price is not.
- **It scales with the work, not with GMV.** The fee sits on the hedge notional — the thing we actually
  manage — rather than on order value. A 2% take on order value would be **$400** here, twice the
  revenue and twice the drag.
- **It is a real drag and should be sized accordingly.** Every dollar of fee raises the lift the promo
  must produce to justify itself. At a 10%-of-premium fee the contingent version needs roughly **5%
  more units** than the equal-cost flat discount to break even; at a 2%-of-order-value take that rises
  to **~10%** ([`01-math.md`](01-math.md) §8). The fee is a pricing decision with a direct effect on
  whether the product works for the customer.

---

## What has to be true

One thing, and it is measurable: **the contingent version must sell more units than the equal-cost flat
discount** — roughly **2–3% more** to cover exchange friction alone, closer to **5%** with our fee in.

That is a small number. Its size is why this is worth building. It has never been measured by anyone,
which is why every campaign ships with a **holdout control group** by default — the first campaign
either confirms it or kills it, for the price of one promo.

---

## Where it goes

Promos are the wedge. The primitive is **outcome-contingent commerce** — price protection, weather
guarantees, delivery guarantees, anything where what a customer pays should depend on something that
has not happened yet.

The binding constraint is not market size. It is **adoption of a mechanic nobody has run**, and that
failure mode has a name: WeatherBill sold self-serve outcome-contingent hedging to *"the 70% of
businesses with weather problems"* and they did not show up; every prospect needed bespoke
configuration ([`03-venture-scale.md`](03-venture-scale.md) §1b). *"100% of merchants discount"* is the
same sentence.

Which is exactly why the product is built to be **self-served in sixty seconds without a salesperson.**
That is the variable this bet turns on.

---

*Business analysis, not legal or financial advice. Prediction-market law is moving quarterly and the
sports-contract litigation weekly; re-verify before committing capital.*
