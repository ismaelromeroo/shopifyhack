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
  /** the plan's slide heading (backtick text). Descriptive titles (slide 12,
   * 16, 17, 18) are labels for the script, not on-screen text. */
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

// Timings after the 2026-08-15 additions: $75M (now 14), +5 in 100 (now 19),
// and the venue slide (9, +18s). Total ~5:23 against a 5:00 ceiling — see CUT_ORDER.
export const ACTS = [
  "Act I — The problem (0:00–0:35)",
  "Act II — The idea (0:35–1:20)",
  "Act III — Why nobody does it (1:20–1:40)",
  "Act IV — The math, from zero (1:40–3:33)",
  "Act V — The product (3:33–4:38)",
  "Act VI — The model (4:38–5:23)",
] as const;

export const VOCABULARY_RULE = {
  heading: "The vocabulary rule",
  principle:
    "Use the real words — the audience is technical and euphemism reads as condescension. The rule is about ORDER, not vocabulary: show the mechanism, then name it. These terms are earned by the slide listed, and should not appear before it:",
  earned: [
    "contract — slide 7",
    "odds / price — slide 8",
    "prediction market · Kalshi — slide 9",
    "hedging — slide 12",
  ],
  why: "A name given before the thing it names is a concept the listener has to hold on credit. A name given after is a label for something they already understand, and it lands as recognition — which is why “that is what hedging is” belongs at slide 12, once the payoff table has shown both branches costing the same, and not at slide 7 where it would be a prerequisite. By the same rule the venue is named at slide 9 — after the contract has been seen and priced, not before. Said in the right order, the jargon is a service to the viewer; said early, it is a tax.",
  exception:
    "One term stays out entirely: expected value. Not because it is too advanced, but because slide 5 already gives the same idea in counts — ten orders out of a hundred — and counts are easier to follow aloud than a term of art that means exactly the same thing.",
};

/**
 * Who speaks what. Splits fall on act boundaries and never inside an animated
 * build (3→4, 10→11, 15→16) — a voice change mid-composition reads as an edit
 * error. Voice 2 deliberately holds 7–11 whole: that is the contract sequence
 * and the spine of the argument.
 */
export const VOICES = [
  { n: 1, from: 1, to: 5, time: "0:00–1:20", covers: "The problem and the idea" },
  { n: 2, from: 6, to: 11, time: "1:20–2:50", covers: "Why nobody does it, and the mechanism" },
  { n: 3, from: 12, to: 16, time: "2:50–4:00", covers: "The payoff, the proof, the product" },
  { n: 4, from: 17, to: 20, time: "4:00–5:05", covers: "The customer, the model, the close" },
] as const;

export const CUT_ORDER = [
  "Slide 5 (`It's the same discount`) — fold into Slide 4's narration. Saves ~15s, loses the least.",
  "Slide 2 — fold into Slide 1.",
  "Slide 10 — merge into Slide 11 as a build.",
  "Do not cut 7, 8, 11 or 12. Those four are the argument.",
];

export const BUILD_NOTES = [
  "One Kalshi feed serves everything live: the slide-8 price stamp, the console menu and quote (15–16), and the embedded claim ticket (17). Read API, no auth, ~10s interval, last-updated timestamp visible. If the fetch fails, fall back to the frozen snapshot and drop the `live` tag rather than showing a stale number as current.",
  "Slides 3→4, 10→11 and 15→16 are builds, not new slides. The objects must persist and animate so the eye tracks continuity.",
  "One number per slide, except 12 and 18.",
  "Type scale: the number is the slide. Headlines are labels at roughly a quarter the size.",
  "Total narration is ~735 words after the venue slide, landing around 5:23 spoken with the pauses held — OVER the 5:00 ceiling. The cut order buys back ~35s, which is enough; take slide 2 first, not slide 5.",
];

const MARKET_NOTE =
  "Live-market reality check (2026-08-15): the make-the-playoffs market (KXMLBPLAYOFFS-26-NYY) trades at ~97¢ — the Yankees are near-locks — which breaks the deck's arithmetic (20,000 contracts × 10¢ = $2,000). The Yankees–World-Series market (KXMLB-26-NYY) trades at ~10.5¢, exactly the one-in-ten shot the deck needs. The deck therefore shows the World Series market, and its contract reads “…if the Yankees win the World Series.” When recording, speak “win the World Series” in place of “make the playoffs” here; every number in the deck then matches the live screen.";

export const SLIDES: Slide[] = [
  {
    n: 1,
    act: ACTS[0],
    title: "Every store is running a sale.",
    onScreen: [
      "Full-bleed monochrome photo — Manhattan skyline — behind a frosted-glass pane.",
      "The headline centred on the pane. This is the one slide where the headline is the hero object, not a corner label.",
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
      "A hundred orders, two hundred dollars each. Ten percent off is two thousand dollars. And a one-in-ten chance of giving an order away — also two thousand. Same money. Completely different story.",
    notOnScreen: ["The phrase “expected value,” any formula."],
  },
  {
    n: 5,
    act: ACTS[1],
    title: "It's the same discount.",
    onScreen: ["The sentence alone, centred."],
    narration:
      "One order in ten goes free. So across a hundred orders, you've given away ten of them — that's the same ten percent. All that changed is where it lands: everything on one customer, instead of a little on everyone.",
    delivery:
      "This slide EARNS the claim on screen; it does not defend it. Explain the arithmetic, never pre-empt an objection — signalling that you expect to be doubted invites the doubt. Frequency (“ten orders out of a hundred”) is far easier to follow aloud than probability, so give the equivalence in counts, not percentages. The closing clause introduces concentration — the real difference between the two promos — as an observation rather than an argument.",
    productionNote:
      "On-screen sentence updated from the plan's “Yes — it's a discount.” to “It's the same discount.” per Victor's review, 2026-08-15. Narration rewritten 2026-08-15 to stop speaking the on-screen words (redundancy effect: narration duplicating visible text measurably hurts comprehension).",
  },
  {
    n: 6,
    act: ACTS[2],
    title: "$0 or $20,000",
    onScreen: ["The two figures, very large, with a gap between them."],
    narration:
      "So why doesn't anyone do it? Because if it hits you owe every customer at once, which makes that promise cost you either nothing or twenty thousand dollars — and a swing that size isn't a marketing decision, it's a bet you can't afford to lose. No ordinary store signs it.",
    notOnScreen: ["The word “variance.”"],
  },
  {
    n: 7,
    act: ACTS[3],
    title: "A contract that pays $1 if the Yankees win the World Series.",
    onScreen: ["A single drawn coupon object. Nothing else."],
    narration:
      "Which is where this gets interesting, because there's a contract that pays you one dollar if the Yankees win the World Series and nothing at all if they don't. What should it cost?",
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
      "Exactly the odds — a one-in-ten shot costs ten cents, which means the price of the contract is simply the price of the promise you're making.",
    delivery:
      "This is where you lose people or don't. It is the only genuine conceptual leap in the deck. It works out loud because the arbitrage argument (any cheaper and you'd buy every one) is checkable against ordinary haggling intuition and requires no finance. Do not rush it. Let the live price sit on screen while you say it.",
  },
  {
    n: 9,
    act: ACTS[3],
    title: "Kalshi · Polymarket",
    onScreen: [
      "The same contract from 7–8, shrunk to make room. Beneath it the two venue names, Kalshi weighted heavier because it is where the live price comes from.",
    ],
    narration:
      "We buy those on Kalshi, a prediction market, and Polymarket is the other one — and that's the only moving part in any of this that lives outside your store.",
    delivery:
      "Name the venue, do not explain the institution. The viewer does not need to know what a prediction market is, how it clears, or why the price is efficient — only where we buy the contracts and that it is one outside dependency. Anything more is a lecture the pitch does not need.",
    notOnScreen: ["Logos, volume figures, a regulatory explainer."],
  },
  {
    n: 10,
    act: ACTS[3],
    title: "20,000 contracts = $2,000",
    onScreen: ["The single coupon multiplies into a block; $2,000 beneath."],
    narration:
      "So two thousand dollars buys you twenty thousand of them, which means twenty thousand dollars arrives — but only if they win it.",
  },
  {
    n: 11,
    act: ACTS[3],
    title: "That's exactly when you owe $20,000.",
    isBuild: true,
    onScreen: [
      "The coupon block on the left, a stack of customer refunds on the right, an equals sign between them.",
    ],
    narration:
      "And that is exactly when you owe your customers twenty thousand dollars, so the money arrives at the same moment the bill does.",
    delivery:
      "The load-bearing sentence of the entire deck. If a listener retains one line, it is “the money arrives at the same moment the bill does.” Make it the slowest sentence in the recording. Everything before it is setup; everything after it is bookkeeping.",
  },
  {
    n: 12,
    act: ACTS[3],
    title: "the payoff table (the one dense slide)",
    onScreen: [
      "Two columns, Yankees win it / they don't, five rows (the fifth is Our fee, −$200), both bottom lines reading −$2,326 — labelled “Total cost of the promo” — in the largest type on the slide.",
    ],
    narration:
      "(three full seconds of silence) — then: “Either way, twenty-three twenty-six — win or lose, the same number, and the uncertainty is simply gone.” — then, once the table has landed: “That's all hedging is: you're not betting on the Yankees, you're buying certainty about what this promotion costs.”",
    delivery:
      "The silence is not a stylistic flourish. The table resolves itself faster than narration can describe it, and talking over it competes with the only slide where reading is the point.",
    notOnScreen: ["Percentages, fee formulas, footnotes."],
    productionNote:
      "Per Victor's review 2026-08-15: the table now carries a fifth row — Our fee, −$200 — and labels the bottom line “Total cost of the promo,” so both totals read −$2,326. When recording, speak “twenty-three twenty-six” in place of the plan's “twenty-one twenty-six.”",
  },
  {
    n: 13,
    act: ACTS[3],
    title: "10% off = 1-in-10 free",
    onScreen: [
      "The two offers, side by side, with an equals sign between them — the same equality slide 3 set up, now earned.",
    ],
    narration: "Which means the merchant isn't deciding whether to spend the money — he's already spending it — he's deciding what shape it takes.",
    productionNote:
      "Per Victor's review 2026-08-15: the deck no longer advertises the premium here. On screen it now reads “10% off = 1-in-10 free” — reiterating that this is the same discount, reshaped — while the narration line stays as written.",
  },
  {
    n: 14,
    act: ACTS[4],
    title: "$75M",
    onScreen: [
      "The figure alone, very large. Small label beneath: “what one furniture store sold on one of these.”",
    ],
    narration:
      "Does anyone actually talk about these? At the extreme, a Houston furniture store ran exactly this promise on the World Series and sold seventy-five million dollars of furniture, making national news twice: once when he promised it, and again when everyone got paid. Nobody has ever written a headline about ten percent off.",
    delivery:
      "Source: Mattress Mack, Gallery Furniture, 2022 World Series — ~$75M in promo-driven sales (Forbes, Nov 2022). Be ready for the follow-up: by his own account the promo itself was roughly a wash on margin — the return was the attention. That is the point, not a weakness: this is the only promotion type with a documented case of making national news.",
    notOnScreen: ["The source citation, his name, a photo."],
    productionNote:
      "Added 2026-08-15 per Victor's direction to quantify the word-of-mouth value. Not in the original 17-slide plan; adds ~15s — the cut order still applies if the runtime matters.",
  },
  {
    n: 15,
    act: ACTS[4],
    title: "Pick an event.",
    onScreen: [
      "Screen recording of the merchant console — the live market picker, each row priced off its own book, thin books refused inline, then the all-in quote on the selected row.",
    ],
    narration:
      "So here's what we built: every event that can actually be covered, priced off the live market, so you pick one and get a single number before you commit — what it costs, and what that same money is as a plain sale. The ones we can't cover, it tells you.",
    delivery:
      "The narration must match the picker, not a text box. The refusals are visible on screen as rows are priced, so the last clause is describing something the viewer can see rather than a claim.",
    productionNote:
      "Per Victor's review 2026-08-15: the demo is a MENU of runnable events, not plaintext entry. The console shows the product's real market picker (via /api/markets) — each row priced by walking its live book, thin books refused with the reason (including the 97¢ make-the-playoffs market: “book too thin for this size”) — and the highlight lands on the Yankees–World-Series row. Narration corrected 2026-08-15: the plan's “types the promo in plain English” described a product that was never built, and narrating it over a menu would have been visibly false.",
  },
  {
    n: 16,
    act: ACTS[4],
    title: "They never place a trade.",
    onScreen: [
      "Continuation — click go, orders arrive, the liability and coverage lines tracking each other.",
    ],
    narration:
      "They click go, and from there they never open an account and never place a trade — we hold the contracts, and we pay the refunds.",
    delivery:
      "Note the word choice: coupons, not position. Slide 7's object is still doing work eight slides later.",
  },
  {
    n: 17,
    act: ACTS[4],
    title: "the customer's phone",
    onScreen: [
      "The claim ticket, mobile, live odds ticking. Then settlement: “The Yankees won. Your order was free.”",
    ],
    narration:
      "And the customer gets this: their order, riding on the Yankees, with live odds — and when it hits, the Yankees won, your order was free. A hundred customers just became a hundred people telling that story.",
    delivery:
      "The last sentence is the word-of-mouth payoff — land it after the settlement flip, not over it.",
    productionNote:
      "The phone embeds the real product page — /claim/1042, then the /claim/1042?settle=won deep-link for the settlement beat — so the deck shows exactly the UI a customer gets. Closing narration sentence added 2026-08-15 per Victor's direction to stress the word-of-mouth value at the customer moment.",
  },
  {
    n: 18,
    act: ACTS[5],
    title: "three lines",
    onScreen: ["Promo budget $2,000 · Exchange fee $126 · Our fee $200 (bold)."],
    narration:
      "We make money the way the exchange does, with a management fee on the coverage — ten percent of the promo budget they were already spending.",
    notOnScreen: ["ARR projections, TAM, a market-size chart."],
  },
  {
    n: 19,
    act: ACTS[5],
    title: "+5 in 100",
    onScreen: [
      "“+5” very large; beneath it, a row of 100 order dots with the last five filling in. Label: “in 100 orders.”",
    ],
    narration:
      "So here's the bet, made precise: with every fee in, this beats the flat sale it replaces if it sells five more orders in a hundred, and that's the whole bar. You don't take it on faith either — every campaign runs with a built-in holdout, half the traffic keeps the plain sale, so your first promo measures its own lift against the discount you'd have run anyway.",
    delivery:
      "The figure is the required behavioral edge from docs/01-math.md §8: ~3.4% extra units to tie with exchange friction only, ~5% with our 10%-of-premium fee included (docs/05-pitch.md, “What has to be true”). If pressed: nobody has ever measured this properly, which is exactly why the holdout ships on by default — the first campaign answers it with the merchant's own numbers.",
    notOnScreen: ["The percent sign, the formula, the word “lift.”"],
    productionNote:
      "Added 2026-08-15 per Victor's direction to put the lift calculation in the deck. Not in the original 17-slide plan; adds ~18s.",
  },
  {
    n: 20,
    act: ACTS[5],
    title: "closing card",
    onScreen: [
      "Product name, one line, the live Kalshi tag still running in the corner.",
    ],
    narration: "Covered.",
    productionNote:
      "The deck renders the product name as “Covered” with the tagline “Discounts worth talking about”; per Victor's review 2026-08-15 the corner live tag was removed from this slide. Change either in one place: SceneClose in src/components/deck/scenes-b.tsx.",
  },
];
