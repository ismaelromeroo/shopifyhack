/**
 * The single source of slide content. Every headline, number and narration
 * line is verbatim from docs/06-slide-plan.md — edit there first, here second.
 *
 * The deck renders compositions from this file's slides by number; /script
 * renders every field as a rehearsal document.
 */

export interface Slide {
  n: number;
  act: string;
  /** the plan's slide heading (backtick text). Descriptive titles (slide 11,
   * 15, 16, 17) are labels for the script, not on-screen text. */
  title: string;
  /** build on the previous slide, not a new one */
  isBuild?: boolean;
  onScreen: string[];
  narration: string;
  delivery?: string;
  notOnScreen?: string[];
  /** build-time note from this implementation, clearly not plan content */
  productionNote?: string;
}

export const ACTS = [
  "Act I — The problem (0:00–0:35)",
  "Act II — The idea (0:35–1:20)",
  "Act III — Why nobody does it (1:20–1:40)",
  "Act IV — The math, from zero (1:40–3:15)",
  "Act V — The product (3:15–4:05)",
  "Act VI — The model (4:05–4:30)",
] as const;

export const VOCABULARY_RULE = {
  banned: [
    "hedge",
    "prediction market",
    "contract",
    "position",
    "expected value",
    "variance",
    "notional",
    "underwrite",
  ],
  why: "Not because the audience is unsophisticated, but because every one of them asks the listener to import a concept before they need it. The deck introduces exactly one object — a coupon (Slide 7) — and that object carries all the way through: on Slide 14 we say “we hold the coupons,” not “we hold the position.” That continuity does most of the from-zero work.",
  exception:
    "The one concept that cannot be avoided is price equals odds, which is why it gets a slide to itself and an argument a listener can check against their own intuition (Slide 8).",
};

export const CUT_ORDER = [
  "Slide 5 (`It's the same discount`) — fold into Slide 4's narration. Saves ~15s, loses the least.",
  "Slide 2 — fold into Slide 1.",
  "Slide 9 — merge into Slide 10 as a build.",
  "Do not cut 7, 8, 10 or 11. Those four are the argument.",
];

export const BUILD_NOTES = [
  "Slides 8 and 17 share one Kalshi poller. Read API, no auth, ~10s interval, last-updated timestamp visible. If the fetch fails, fall back to a frozen snapshot and drop the `live` tag rather than showing a stale number as current.",
  "Slides 3→4 and 9→10 are builds, not new slides. The objects must persist and animate so the eye tracks continuity.",
  "One number per slide, except 11 and 16.",
  "Type scale: the number is the slide. Headlines are labels at roughly a quarter the size.",
  "Total narration is ~560 words, which lands at 4:20–4:30 spoken with the pauses held.",
];

const MARKET_NOTE =
  "Live-market reality check (2026-08-15): the make-the-playoffs market (KXMLBPLAYOFFS-26-NYY) trades at ~97¢ — the Yankees are near-locks — which breaks the deck's arithmetic (20,000 coupons × 10¢ = $2,000). The Yankees–World-Series market (KXMLB-26-NYY) trades at ~10.5¢, exactly the one-in-ten shot the deck needs. The deck therefore shows the World Series market, and its coupon reads “…if the Yankees win the World Series.” When recording, speak “win the World Series” in place of “make the playoffs” here; every number in the deck then matches the live screen.";

export const SLIDES: Slide[] = [
  {
    n: 1,
    act: ACTS[0],
    title: "Every store is running a sale.",
    onScreen: [
      "Full-bleed photo of a storefront sale sign, or a discount-code row in a commerce admin.",
      "Headline bottom-left, small.",
    ],
    narration: "Every store you walk past is running a sale right now.",
    notOnScreen: ["Our name, our logo, any product."],
  },
  {
    n: 2,
    act: ACTS[0],
    title: "Most of it is wasted.",
    onScreen: [
      "Two short lines, stacked, large type: “They were buying anyway.” / “Nobody tells a friend about 10% off.”",
    ],
    narration:
      "And most of that money does nothing. The people taking the discount were mostly going to buy anyway — so you've handed margin to customers you already had. And nobody, ever, has told a friend about ten percent off.",
    notOnScreen: ["Statistics, citations, a third bullet."],
  },
  {
    n: 3,
    act: ACTS[1],
    title: "Same money. Different shape.",
    onScreen: [
      "Two cards, side by side, equal weight. Left: 10% off everything. Right: 1-in-10 chance your order is free. No prices yet.",
    ],
    narration:
      "So what if the same money bought something people actually talked about? Instead of ten percent off for everyone — a one-in-ten chance your whole order is free.",
    notOnScreen: [
      "Costs — they are the next reveal, and showing them here spends the build.",
    ],
  },
  {
    n: 4,
    act: ACTS[1],
    title: "$2,000 / $2,000",
    isBuild: true,
    onScreen: [
      "The same two cards; a price drops into each. Both read $2,000. Hold three seconds.",
    ],
    narration:
      "Here's the part that surprised us. Those two cost the same. A hundred orders, two hundred dollars each. Ten percent off is two thousand dollars. And a one-in-ten chance of giving an order away — also two thousand. Same money. Completely different story.",
    notOnScreen: ["The phrase “expected value,” any formula."],
  },
  {
    n: 5,
    act: ACTS[1],
    title: "It's the same discount.",
    onScreen: ["The sentence alone, centred."],
    narration:
      "That's the objection everyone's about to have, so let's not dodge it. And it's exactly the point — nobody has ever repeated a ten-percent-off sale. Somebody repeats this one.",
    delivery:
      "Why it's here: pre-empting the obvious objection is worth more than defending it later, and in a video there is no later. The narration must NOT restate the on-screen sentence — the screen makes the claim, the voice names it as the objection and supplies the differentiator the screen cannot show.",
    productionNote:
      "On-screen sentence updated from the plan's “Yes — it's a discount.” to “It's the same discount.” per Victor's review, 2026-08-15. Narration rewritten 2026-08-15 to stop speaking the on-screen words (redundancy effect: narration duplicating visible text measurably hurts comprehension).",
  },
  {
    n: 6,
    act: ACTS[2],
    title: "$0 or $20,000",
    onScreen: ["The two figures, very large, with a gap between them."],
    narration:
      "So why doesn't anyone do it? Because if it hits, you owe every customer at once. That promise costs you nothing — or twenty thousand dollars. That's not a marketing decision. That's a bet you can't afford to lose. And no ordinary store signs it.",
    notOnScreen: ["The word “variance.”"],
  },
  {
    n: 7,
    act: ACTS[3],
    title: "A coupon worth $1 if the Yankees win the World Series.",
    onScreen: ["A single drawn coupon object. Nothing else."],
    narration:
      "Which is where this gets interesting. Picture a coupon. It pays you one dollar if the Yankees win the World Series, and nothing if they don't. What should that coupon cost?",
    productionNote: MARKET_NOTE,
  },
  {
    n: 8,
    act: ACTS[3],
    title: "10¢ (live)",
    onScreen: [
      "The coupon with a price stamped on it, pulled live from Kalshi, with a small “live · updated 2s ago” tag and the real ticker.",
    ],
    narration:
      "Exactly the odds. If the Yankees are a one-in-ten shot, it's worth ten cents. Any cheaper and you'd buy every one you could find. Any more and you'd sell them. And this isn't hypothetical — that's a real market, and that's the real price, right now.",
    delivery:
      "This is where you lose people or don't. It is the only genuine conceptual leap in the deck. It works out loud because the arbitrage argument (any cheaper and you'd buy every one) is checkable against ordinary haggling intuition and requires no finance. Do not rush it. Let the live price sit on screen while you say it.",
  },
  {
    n: 9,
    act: ACTS[3],
    title: "20,000 coupons = $2,000",
    onScreen: ["The single coupon multiplies into a block; $2,000 beneath."],
    narration:
      "So two thousand dollars buys you twenty thousand of those coupons. Which means twenty thousand dollars shows up — but only if the Yankees make it.",
  },
  {
    n: 10,
    act: ACTS[3],
    title: "That's exactly when you owe $20,000.",
    isBuild: true,
    onScreen: [
      "The coupon block on the left, a stack of customer refunds on the right, an equals sign between them.",
    ],
    narration:
      "And that is exactly when you owe your customers twenty thousand dollars. The money arrives at the same moment the bill does.",
    delivery:
      "The load-bearing sentence of the entire deck. If a listener retains one line, it is “the money arrives at the same moment the bill does.” Make it the slowest sentence in the recording. Everything before it is setup; everything after it is bookkeeping.",
  },
  {
    n: 11,
    act: ACTS[3],
    title: "the payoff table (the one dense slide)",
    onScreen: [
      "Two columns, Yankees make it / they don't, four rows, both bottom lines reading −$2,126 in the largest type on the slide.",
    ],
    narration:
      "(three full seconds of silence) — then: “Either way: twenty-one twenty-six. Win or lose, the same number. The uncertainty is just gone.”",
    delivery:
      "The silence is not a stylistic flourish. The table resolves itself faster than narration can describe it, and talking over it competes with the only slide where reading is the point.",
    notOnScreen: ["Percentages, fee formulas, footnotes."],
    productionNote:
      "Per Victor's review 2026-08-15: the table now carries a fifth row — Our fee, −$200 — and labels the bottom line “Total cost of the promo,” so both totals read −$2,326. When recording, speak “twenty-three twenty-six” in place of the plan's “twenty-one twenty-six.”",
  },
  {
    n: 12,
    act: ACTS[3],
    title: "$2,000 → $2,126",
    onScreen: [
      "The flat-discount price and the contingent price, side by side, arrow between.",
    ],
    narration: "Against the two-thousand-dollar sale he was already running.",
    productionNote:
      "Per Victor's review 2026-08-15: the deck no longer advertises the premium here. On screen it now reads “10% off = 1-in-10 free” — reiterating that this is the same discount, reshaped — while the narration line stays as written.",
  },
  {
    n: 13,
    act: ACTS[4],
    title: "Pick an event.",
    onScreen: [
      "Screen recording of the merchant console — the live market picker, each row priced off its own book, thin books refused inline, then the all-in quote on the selected row.",
    ],
    narration:
      "So here's what we built. Every event that can actually be covered, priced off the live market. Pick one, and you get a single number before you commit — what it costs, and what that is as a plain sale. The ones that can't be covered, it says so.",
    delivery:
      "The narration must match the picker, not a text box. The refusals are visible on screen as rows are priced, so the last clause is describing something the viewer can see rather than a claim.",
    productionNote:
      "Per Victor's review 2026-08-15: the demo is a MENU of runnable events, not plaintext entry. The console shows the product's real market picker (via /api/markets) — each row priced by walking its live book, thin books refused with the reason (including the 97¢ make-the-playoffs market: “book too thin for this size”) — and the highlight lands on the Yankees–World-Series row. Narration corrected 2026-08-15: the plan's “types the promo in plain English” described a product that was never built, and narrating it over a menu would have been visibly false.",
  },
  {
    n: 14,
    act: ACTS[4],
    title: "They never see a contract.",
    onScreen: [
      "Continuation — click go, orders arrive, the liability and coverage lines tracking each other.",
    ],
    narration:
      "They click go. They never open an account, never place a trade, never see a contract. We hold the coupons, and we pay the refunds.",
    delivery:
      "Note the word choice: coupons, not position. Slide 7's object is still doing work eight slides later.",
  },
  {
    n: 15,
    act: ACTS[4],
    title: "the customer's phone",
    onScreen: [
      "The claim ticket, mobile, live odds ticking. Then settlement: “The Yankees won. Your order was free.”",
    ],
    narration:
      "And the customer gets this. Their order, riding on the Yankees, with live odds. And when it hits — the Yankees won, your order was free.",
    productionNote:
      "The phone embeds the real product page — /claim/1042, then the /claim/1042?settle=won deep-link for the settlement beat — so the deck shows exactly the UI a customer gets.",
  },
  {
    n: 16,
    act: ACTS[5],
    title: "three lines",
    onScreen: ["Promo budget $2,000 · Exchange fee $126 · Our fee $200 (bold)."],
    narration:
      "We make money the way the exchange does: a management fee on the coverage. Ten percent of the promo budget they were already spending.",
    notOnScreen: ["ARR projections, TAM, a market-size chart."],
  },
  {
    n: 17,
    act: ACTS[5],
    title: "closing card",
    onScreen: [
      "Product name, one line, the live Kalshi tag still running in the corner.",
    ],
    narration:
      "“[Name]. Turn your discount into something worth talking about.” Then stop talking.",
    productionNote:
      "The deck renders the product name as “Covered” with the tagline “Discounts worth talking about”; per Victor's review 2026-08-15 the corner live tag was removed from this slide. Change either in one place: SceneClose in src/components/deck/scenes-b.tsx.",
  },
];
