# 06 — Slide Plan

**Date:** 2026-08-15
**Format:** web deck (Next.js in this repo), screen-recorded for the demo video.
**Target:** 16 slides, ~4:30. Narration carries the argument; the screen carries one idea at a time.

**The rule this deck is built on:** if a slide needs a sentence, the sentence goes in the narration.
Words on screen are labels, not content. The single exception is Slide 11, where the table *is* the
argument.

**Why a web deck:** slides 7 and 8 pull live prices from Kalshi's public read API. A number that is
visibly current is the most persuasive object available and no static format can produce it.

---

## Act I — The problem (0:00–0:35)

### Slide 1 — `Every store is running a sale.`
- **On screen:** full-bleed photo of a storefront sale sign, or a discount-code row in a commerce admin. Headline bottom-left, small.
- **Narration:** "Every store you walk past is running a sale right now."
- **Not on screen:** our name, our logo, any product.

### Slide 2 — `Most of it is wasted.`
- **On screen:** two short lines, stacked, large type. *"They were buying anyway." / "Nobody tells a friend about 10% off."*
- **Narration:** the two defects — a large share of discount takers were coming regardless, so the merchant pays margin for demand it already had; and a flat discount is invisible.
- **Not on screen:** statistics, citations, a third bullet.

---

## Act II — The idea (0:35–1:15)

### Slide 3 — `Same money. Different shape.`
- **On screen:** two cards, side by side, equal weight. Left: **10% off everything.** Right: **1-in-10 chance your order is free.** No prices yet.
- **Narration:** "What if the same budget bought something people actually talked about?"
- **Not on screen:** costs — they are the next reveal and revealing them here spends the build.

### Slide 4 — `$2,000` / `$2,000`  *(build on Slide 3)*
- **On screen:** the same two cards; a price drops into each. Both read **$2,000**. Hold three seconds.
- **Narration:** "On a hundred orders of two hundred dollars, ten percent off costs two thousand. And a one-in-ten chance of giving the order away? Also two thousand. Same promotion. Different story."
- **Not on screen:** the word "expected value," any formula.

### Slide 5 — `Yes — it's a discount.`
- **On screen:** the sentence alone, centred.
- **Narration:** "So yes, this is a discount. That's the point. It costs what your sale costs — the difference is that people talk about this one."
- **Why it's here:** pre-empting the obvious objection is worth more than defending it later, and in a video there is no later.

---

## Act III — Why nobody does it (1:15–1:35)

### Slide 6 — `$0 or $20,000`
- **On screen:** the two figures, very large, with a gap between them.
- **Narration:** "Here's why almost nobody runs this. If it hits, you owe *every* customer at once. That promise costs either nothing or twenty thousand dollars. That's not a marketing decision, it's a solvency decision."
- **Not on screen:** the word "variance."

---

## Act IV — The math, from zero (1:35–2:50)

*Six slides that build the mechanism one step at a time. Nobody should need prior knowledge of
prediction markets, hedging, or finance. Each slide introduces exactly one new idea.*

### Slide 7 — `A coupon worth $1 if the Yankees make the playoffs.`
- **On screen:** a single drawn coupon/ticket object. Nothing else.
- **Narration:** "Start here. Imagine a coupon that pays you one dollar if the Yankees make the playoffs, and nothing if they don't. What should that cost?"

### Slide 8 — `10¢`  *(live)*
- **On screen:** the coupon with a price stamped on it, pulled **live from Kalshi**, with a small `live · updated 2s ago` tag and the real ticker.
- **Narration:** "Exactly the odds. If the Yankees are a one-in-ten shot, it costs ten cents — any cheaper and you'd buy them all day, any pricier and you'd sell them. This is a real market, and that's today's real price."
- **Why it matters:** this is the only conceptual leap in the deck. Give it a slide to itself and let the live tag do the persuading.

### Slide 9 — `20,000 coupons = $2,000`
- **On screen:** the single coupon multiplies into a block; `$2,000` beneath.
- **Narration:** "So two thousand dollars buys twenty thousand of them. Which means twenty thousand dollars arrives — but only if the Yankees make it."

### Slide 10 — `That's exactly when you owe $20,000.`
- **On screen:** the coupon block on the left, a stack of customer refunds on the right, an equals sign between them.
- **Narration:** "And that is precisely when you owe your customers twenty thousand dollars. The money arrives exactly when the bill does."
- **This is the aha.** Hold it. Everything before was setup and everything after is bookkeeping.

### Slide 11 — the payoff table *(the one dense slide)*
- **On screen:** two columns, *Yankees make it* / *they don't*, four rows, and both bottom lines reading **−$2,126** in the largest type on the slide.
- **Narration:** silence for three seconds, then: "Either way, twenty-one twenty-six. The uncertainty is gone."
- **Not on screen:** percentages, fee formulas, footnotes.

### Slide 12 — `$2,000 → $2,126`
- **On screen:** the flat-discount price and the contingent price, side by side, arrow between.
- **Narration:** "Against the two-thousand-dollar sale he was already running. That's the whole cost of turning an invisible discount into something people repeat."

---

## Act V — The product (2:50–3:50)

### Slide 13 — `Type it in English.`
- **On screen:** screen recording of the merchant console — the promo typed, the real ticker resolving, the live book, the all-in quote.
- **Narration:** what the merchant does, in one breath. No feature list.

### Slide 14 — `They never see a contract.`
- **On screen:** continuation — click go, orders arrive, the liability and coverage lines tracking each other.
- **Narration:** "They never open an account, never place a trade, never touch the exchange. We hold the position and we pay the refunds."

### Slide 15 — the customer's phone
- **On screen:** the claim ticket, mobile, live odds ticking. Then settlement: *"The Yankees won. Your order was free."*
- **Narration:** minimal. Let the screen do it.

---

## Act VI — The model (3:50–4:20)

### Slide 16 — three lines
- **On screen:**

  | Promo budget | $2,000 |
  |---|---|
  | Exchange fee | $126 |
  | **Our fee** | **$200** |

- **Narration:** "We charge a management fee on the hedge, the same shape the exchange charges one. Ten percent of the promo budget they were already spending."
- **Not on screen:** ARR projections, TAM, a market-size chart.

### Slide 17 — closing card
- **On screen:** product name, one line, the live Kalshi tag still running in the corner.
- **Narration:** one sentence. Stop talking.

---

## Cut order if it runs long

1. Slide 5 (`Yes — it's a discount`) — fold into Slide 4's narration.
2. Slide 2 — fold into Slide 1.
3. Slide 9 — merge into Slide 10 as a build.

Do not cut 7, 8, 10 or 11. Those four are the argument.

---

## Build notes

- **Slides 8 and 17 share one Kalshi poller.** Read API, no auth, ~10s interval, with the last-updated
  timestamp visible. If the fetch fails, fall back to a frozen snapshot and drop the `live` tag rather
  than showing a stale number as current.
- **Slides 3→4 and 9→10 are builds, not new slides.** The objects must persist and animate so the eye
  tracks continuity.
- **One number per slide** except 11 and 16.
- Type scale: the number is the slide. Headlines are labels at maybe a quarter the size.
