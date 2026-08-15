# 06 — Slide Plan

**Date:** 2026-08-15
**Format:** web deck (Next.js in this repo), screen-recorded for the demo video.
**Target:** 17 slides, ~4:30. Narration carries the argument; the screen carries one idea at a time.

**The rule this deck is built on:** if a slide needs a sentence, the sentence goes in the narration.
Words on screen are labels, not content. The single exception is Slide 11, where the table *is* the
argument.

**Why a web deck:** slides 8 and 17 pull live prices from Kalshi's public read API. A number that is
visibly current is the most persuasive object available and no static format can produce it.

Narration below is **verbatim** — written to be spoken, not read. Timings are cumulative.

---

## The vocabulary rule

These words **never appear**, on screen or in narration:

> hedge · prediction market · contract · position · expected value · variance · notional · underwrite

Not because the audience is unsophisticated, but because every one of them asks the listener to import
a concept before they need it. The deck introduces **exactly one object — a coupon** (Slide 7) — and
that object carries all the way through: on Slide 14 we say *"we hold the coupons,"* not *"we hold the
position."* That continuity does most of the from-zero work.

The one concept that cannot be avoided is *price equals odds*, which is why it gets a slide to itself
and an argument a listener can check against their own intuition (Slide 8).

---

## Act I — The problem (0:00–0:35)

### Slide 1 — `Every store is running a sale.`
- **On screen:** full-bleed photo of a storefront sale sign, or a discount-code row in a commerce admin. Headline bottom-left, small.
- **Narration:** *"Every store you walk past is running a sale right now."*
- **Not on screen:** our name, our logo, any product.

### Slide 2 — `Most of it is wasted.`
- **On screen:** two short lines, stacked, large type. *"They were buying anyway." / "Nobody tells a friend about 10% off."*
- **Narration:** *"And most of that money does nothing. The people taking the discount were mostly going to buy anyway — so you've handed margin to customers you already had. And nobody, ever, has told a friend about ten percent off."*
- **Not on screen:** statistics, citations, a third bullet.

---

## Act II — The idea (0:35–1:20)

### Slide 3 — `Same money. Different shape.`
- **On screen:** two cards, side by side, equal weight. Left: **10% off everything.** Right: **1-in-10 chance your order is free.** No prices yet.
- **Narration:** *"So what if the same money bought something people actually talked about? Instead of ten percent off for everyone — a one-in-ten chance your whole order is free."*
- **Not on screen:** costs — they are the next reveal, and showing them here spends the build.

### Slide 4 — `$2,000` / `$2,000`  *(build on Slide 3)*
- **On screen:** the same two cards; a price drops into each. Both read **$2,000**. Hold three seconds.
- **Narration:** *"Here's the part that surprised us. Those two cost the same. A hundred orders, two hundred dollars each. Ten percent off is two thousand dollars. And a one-in-ten chance of giving an order away — also two thousand. Same money. Completely different story."*
- **Not on screen:** the phrase "expected value," any formula.

### Slide 5 — `It's the same discount.`
- **On screen:** the sentence alone, centred.
- **Narration:** *"That's the objection everyone's about to have, so let's not dodge it. And it's exactly the point — nobody has ever repeated a ten-percent-off sale. Somebody repeats this one."*
- **Why it's here:** pre-empting the obvious objection is worth more than defending it later, and in a video there is no later.
- **Delivery:** the narration must **not restate the sentence on screen.** The screen makes the claim; the voice names it as *the objection* and supplies the differentiator the screen can't show. Narration that duplicates visible text measurably hurts comprehension rather than reinforcing it.

---

## Act III — Why nobody does it (1:20–1:40)

### Slide 6 — `$0 or $20,000`
- **On screen:** the two figures, very large, with a gap between them.
- **Narration:** *"So why doesn't anyone do it? Because if it hits, you owe every customer at once. That promise costs you nothing — or twenty thousand dollars. That's not a marketing decision. That's a bet you can't afford to lose. And no ordinary store signs it."*
- **Not on screen:** the word "variance."

---

## Act IV — The math, from zero (1:40–3:15)

*Six slides that build the mechanism one step at a time. No prior knowledge of markets, hedging or
finance. Each slide introduces exactly one new idea.*

### Slide 7 — `A coupon worth $1 if the Yankees win the World Series.`
- **On screen:** a single drawn coupon object. Nothing else.
- **Narration:** *"Which is where this gets interesting. Picture a coupon. It pays you one dollar if the Yankees win the World Series, and nothing if they don't. What should that coupon cost?"*

### Slide 8 — `10¢`  *(live)*
- **On screen:** the coupon with a price stamped on it, pulled **live from Kalshi**, with a small `live · updated 2s ago` tag and the real ticker.
- **Narration:** *"Exactly the odds. If the Yankees are a one-in-ten shot, it's worth ten cents. Any cheaper and you'd buy every one you could find. Any more and you'd sell them. And this isn't hypothetical — that's a real market, and that's the real price, right now."*
- **Delivery — this is where you lose people or don't.** It is the only genuine conceptual leap in the deck. It works out loud because the arbitrage argument (*any cheaper and you'd buy every one*) is checkable against ordinary haggling intuition and requires no finance. Do not rush it. Let the live price sit on screen while you say it.

### Slide 9 — `20,000 coupons = $2,000`
- **On screen:** the single coupon multiplies into a block; `$2,000` beneath.
- **Narration:** *"So two thousand dollars buys you twenty thousand of those coupons. Which means twenty thousand dollars shows up — but only if the Yankees make it."*

### Slide 10 — `That's exactly when you owe $20,000.`
- **On screen:** the coupon block on the left, a stack of customer refunds on the right, an equals sign between them.
- **Narration:** *"And that is exactly when you owe your customers twenty thousand dollars. The money arrives at the same moment the bill does."*
- **Delivery — the load-bearing sentence of the entire deck.** If a listener retains one line, it is *"the money arrives at the same moment the bill does."* Make it the slowest sentence in the recording. Everything before it is setup; everything after it is bookkeeping.

### Slide 11 — the payoff table *(the one dense slide)*
- **On screen:** two columns, *Yankees make it* / *they don't*, four rows, both bottom lines reading **−$2,126** in the largest type on the slide.
- **Narration:** *(three full seconds of silence)* — then *"Either way: twenty-one twenty-six. Win or lose, the same number. The uncertainty is just gone."*
- **Delivery:** the silence is not a stylistic flourish. The table resolves itself faster than narration can describe it, and talking over it competes with the only slide where reading is the point.
- **Not on screen:** percentages, fee formulas, footnotes.

### Slide 12 — `$2,000 → $2,126`
- **On screen:** the flat-discount price and the contingent price, side by side, arrow between.
- **Narration:** *"Against the two-thousand-dollar sale he was already running."*

---

## Act V — The product (3:15–4:05)

### Slide 13 — `Pick an event.`
- **On screen:** screen recording of the merchant console — the live market picker, each row priced off its own book, thin books refused inline with the reason, then the all-in quote on the selected row.
- **Narration:** *"So here's what we built. Every event that can actually be covered, priced off the live market. Pick one, and you get a single number before you commit — what it costs, and what that is as a plain sale. The ones that can't be covered, it says so."*
- **Delivery:** the narration must match **the picker, not a text box.** The refusals are visible on screen as rows price, so the last clause describes something the viewer can see rather than a claim they have to take on trust.

### Slide 14 — `They never see a contract.`
- **On screen:** continuation — click go, orders arrive, the liability and coverage lines tracking each other.
- **Narration:** *"They click go. They never open an account, never place a trade, never see a contract. We hold the coupons, and we pay the refunds."*
- **Note the word choice:** *coupons*, not *position*. Slide 7's object is still doing work eight slides later.

### Slide 15 — the customer's phone
- **On screen:** the claim ticket, mobile, live odds ticking. Then settlement: *"The Yankees won. Your order was free."*
- **Narration:** *"And the customer gets this. Their order, riding on the Yankees, with live odds. And when it hits — the Yankees won, your order was free."*

---

## Act VI — The model (4:05–4:30)

### Slide 16 — three lines
- **On screen:**

  | Promo budget | $2,000 |
  |---|---|
  | Exchange fee | $126 |
  | **Our fee** | **$200** |

- **Narration:** *"We make money the way the exchange does: a management fee on the coverage. Ten percent of the promo budget they were already spending."*
- **Not on screen:** ARR projections, TAM, a market-size chart.

### Slide 17 — closing card
- **On screen:** product name, one line, the live Kalshi tag still running in the corner.
- **Narration:** *"[Name]. Turn your discount into something worth talking about."* Then stop talking.

---

## Cut order if it runs long

1. **Slide 5** (`It's the same discount`) — fold into Slide 4's narration. Saves ~15s, loses the least.
2. **Slide 2** — fold into Slide 1.
3. **Slide 9** — merge into Slide 10 as a build.

Do not cut 7, 8, 10 or 11. Those four are the argument.

---

## Build notes

- **Slides 8 and 17 share one Kalshi poller.** Read API, no auth, ~10s interval, last-updated timestamp
  visible. If the fetch fails, fall back to a frozen snapshot and **drop the `live` tag** rather than
  showing a stale number as current.
- **Slides 3→4 and 9→10 are builds, not new slides.** The objects must persist and animate so the eye
  tracks continuity.
- **One number per slide**, except 11 and 16.
- Type scale: the number *is* the slide. Headlines are labels at roughly a quarter the size.
- Total narration is ~560 words, which lands at 4:20–4:30 spoken with the pauses held.
