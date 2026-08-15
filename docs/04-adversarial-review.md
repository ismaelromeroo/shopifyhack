# 04 — Adversarial Review: The Case Against This Business

**Date:** 2026-08-15
**Scope:** The strongest available argument that this idea does not work, assembled by its own authors.
Companion to [`00-thesis.md`](00-thesis.md) and [`01-math.md`](01-math.md). It also
**corrects five factual claims and two framing errors we published in earlier drafts** — see
*Corrections to our own published docs*.

---

## The conclusion first

The thesis is now: *every merchant already spends money on discounts, that money buys nothing memorable,
and for roughly the same money you can buy a chance-of-free promo that people actually talk about.* That
reframe is stronger than the one it replaces — it argues from a universal behavior instead of six
anecdotes — but it **imports four new assumptions that are not measured**, and it leaves the old
load-bearing hole exactly where it was.

The single most likely failure is still undramatic: the promo runs, the hedge fills, the refunds settle,
and the merchant compares it to an **equal-cost flat discount** and finds no difference in margin. Everything
else here is a way of losing faster.

Two things the reframe genuinely fixes, and we should say so before attacking it:

- The old frame ("we de-risk a promo merchants already run") was a **safety** pitch to a market of about
  six known merchants. The new frame is an **adoption** pitch to a market of nearly all of them. That is a
  real improvement in market definition, not a rhetorical one.
- Mattress Mack, Jordan's Furniture and the Manhattan bar are correctly **demoted from premise to
  evidence**. They no longer have to be "the market." They only have to prove that the mechanic buys
  attention a flat discount cannot. They do prove that. See §2 for why that is a much weaker claim than
  it sounds.

**Re-ranked failure modes under the new frame.** Rows 1–5 are new attack surface created by the reframe;
rows 6–11 are the structural dependencies, which the reframe does not touch.

| # | Failure mode | Mechanism in one line | Kills the business? | Detectable pre-build? |
|---|---|---|---|---|
| 1 | **No behavioral edge** | Chance-of-free ≈ equal-cost flat discount on margin at real cart values | **Yes** | Yes — one A/B |
| 2 | **Novelty loses to familiarity** | Merchant can predict what 20% off does; it will not gamble a known result on an unknown one | **Yes** — adoption | Partly — sales calls lie |
| 3 | **Attention ≠ margin** | The mechanic demonstrably buys press; nobody has shown press buys profit | Guts the differentiator | Yes — same A/B |
| 4 | **Discount dissatisfaction is our assumption** | Merchants keep discounting; revealed preference says they are fine with it | Guts the wedge | Weakly — see §1 |
| 5 | **The equivalence breaks where the evidence points** | "6% more than your discount" holds at `p`=10% on a marquee book; at `p`=3% on a median book it is **+90%** | **Yes** — pricing | Yes — free, live API |
| 6 | **Liquidity + position limits** | The triggers that market best are the ones you can't hedge | **Yes** | Yes — live API, free |
| 7 | **Rail regulation** | Kalshi's sports rail is losing in most states | **Yes** (that rail) | Yes — dockets |
| 8 | **Unlicensed insurer / IB / CTA** | Guaranteeing or auto-executing the payout is regulated activity in substance | Yes, if structured wrong | Yes — counsel |
| 9 | **Shopify dependence** | Payments policy names "contests, sweepstakes"; 120-day refund window | Yes (distribution) | Yes — written ruling |
| 10 | **Thin moat / DIY** | Merchant opens a Kalshi account and keeps your fee | Caps it | Partly |
| 11 | **Correlation** | Chalk day fires every merchant at once | Only if you hold risk | No — it's a tail |

Note what moved. **Rail regulation rose** (was #4, now #7 of 11 but unchanged in severity) and **moat fell**
(was #3, now #10) — because under a reallocation pitch the binding question is whether anyone runs the
first campaign, not whether they run the second one themselves. You cannot be disintermediated from a
product nobody adopted.

---

# Part I — Attacks on the new frame

## 1. "Merchants are unhappy with what discounting buys them" is a founder assumption

**Mechanism.** The reframe's whole load rests on a stated dissatisfaction. But merchants discount
constantly, deliberately, and at increasing intensity. **Revealed preference is the strongest form of
evidence there is**, and it says they keep buying the thing we claim they resent. A pitch that opens by
telling a merchant they are wrong about their own budget starts underwater.

**The honest version of our case.** The three defects we cite are real and documented, and none of them is
the same as dissatisfaction:

| Our claim | What the evidence actually supports |
|---|---|
| Most promo sales are non-incremental | Well established in the promotions literature; merchants **also know this** and run promos anyway, for traffic, clearance, calendar and competitive-parity reasons that have nothing to do with incrementality |
| Repeated discounting erodes reference price | Supported for *flat* discounts by [Alavi, Bornemann & Wieseke, *JM* 79(2):62–78](https://journals.sagepub.com/doi/10.1509/jm.12.0408) — but the largest meta-analysis in the area ([51 studies](https://www.sciencedirect.com/science/article/abs/pii/S0022435906000388)) finds a **null** average effect of promotions on post-promotion preference |
| A flat discount is invisible | True and unarguable — and merchants have never expected a discount to be memorable. Invisibility is not a complaint if nobody was buying visibility |

Read the third row carefully, because it is the one that hurts. Merchants may be perfectly satisfied with
discounts **as a price lever** and simply buy attention somewhere else — ads, influencers, email. In that
world our product is not a better-shaped discount at all. It is a **marketing spend competing with Meta
and Klaviyo**, priced against a CAC benchmark, and it has to win that comparison instead of the easy one.

**Early detection.** Weak, and we should say so rather than pretend otherwise. Merchant interviews about
budget dissatisfaction are exactly the interviews that produce false positives — "yes, discounting is a
race to the bottom" is a free thing to agree with. The only interview that carries signal is a
**price-and-close** conversation, and it is not cheaper than just running the decisive experiment below (*The cheapest decisive experiment*).

**What would have to be true.** That there is a segment — plausibly DTC brands with strong identity, local
followings, or premium positioning who *hate* discounting and do it anyway — for whom the dissatisfaction
is real and volunteered without prompting. That segment may exist. We have not found it, counted it, or
priced it.

---

## 2. Attention is not revenue, and our best cases only prove attention

**Mechanism.** The reframe's differentiator is "people talk about this one." That claim is *supported*.
The next claim — that talk becomes margin — is **not**, and it is the one being sold.

**Evidence, stated against ourselves.** The Manhattan bar promo got onto
[CNBC](https://www.cnbc.com/2026/06/03/kalshi-wants-small-businesses-to-hedge-like-wall-street-a-nyc-bar-is-trying-it-with-knicks-promotion.html)
and is reported to have cleared **$8,514 net on a $5,000 Knicks hedge**. Read what that number is and is
not: it is a **gross-vs-hedge arithmetic on one promo**, not an incrementality measurement. There is no
counterfactual, no control, no equal-cost flat-discount arm, and no evidence the bar would have taken less
money on a normal Knicks playoff night with a normal happy-hour special. The single most-cited proof point
in this entire space **cannot distinguish the promo from the playoffs.**

[Forme](https://www.modernretail.co/marketing/why-forme-launched-a-world-cup-promotion-hedged-on-kalshi/)
reports **4× week-over-week traffic**. Traffic is the easiest metric in commerce to move and the least
informative; it is also, tellingly, the metric every published case in this space reports. Nobody reports
margin. That is not an accident of disclosure — it is what happens when the flattering number is the
available one.

And the demoted-but-retained anchor cuts the same way: **Mattress Mack**'s 2022 Astros promo was, by his
own account, "pretty much a wash." What paid was national earned media attached to a personal brand built
over decades. **Neither productizes.** Jordan's Furniture has run these for ~19 years including a
[~$50M-liability UConn promo in 2026](https://www.wbur.org/news/2026/04/03/march-madness-jordans-furniture-refund-uconn-final)
— strong evidence the mechanic is *survivable and repeatable*, zero evidence about what it earns versus
the equal-cost alternative, because Jordan's has never published one and never will.

**The transferability problem.** The one high-stakes field study's benefit ran through **word-of-mouth
driven by entertainment value**, not through the discount. Word-of-mouth is a real channel with real
economics — but it is *the* channel most sensitive to novelty decay. A mechanic is talkable **the first
time a merchant's audience sees it**. The second campaign at the same store is a promotion.

**Early detection.** Yes, and cheaply: the decisive experiment below already measures margin per exposed session and 60-day
repeat rate. Add nothing. Just refuse to accept traffic as an answer.

---

## 3. "Nobody could price this until now" and "nobody wants this" fit the same fact

**Mechanism.** The reframe makes the near-total absence of contingent promos into **evidence for** the
product: you could not credibly promise "your order is free if X" until there was a liquid market in X,
because a hit means you owe every customer at once. That is a genuinely good argument. It is also
**exactly the argument every founder makes about every absent behavior**, and it has a competing
explanation that fits the identical evidence:

| Fact | Our explanation | The competing explanation |
|---|---|---|
| ~6 documented contingent promos, ever | The liability was unpriceable | Merchants evaluated it and don't want it |
| The most-cited case (The Jeffrey) began with a **Kalshi cold outreach after a Bloomberg story** | Merchants didn't know it was possible | Demand had to be manufactured; it was a press cycle, not a pull |
| Jordan's Furniture ran it for ~19 years anyway | Proof the mechanic works for those who can absorb it | Proof the constraint was never pricing — they self-funded and nobody copied them |

That third row is the sharpest one and it is ours to answer. **Jordan's Furniture did not need a prediction
market.** They ran the mechanic uninsured or insured for nearly two decades in full public view, at $50M
liability scale, with national coverage — and the practice did not spread. If unpriceable liability were
the binding constraint, a visible 19-year proof-of-concept should have produced imitators among merchants
who *could* self-fund. It produced roughly none. **That is a data point for "merchants don't want it,"
not for "merchants couldn't price it."**

**What evidence would distinguish the two.** State this precisely, because "both stories fit" is only an
honest position if you name the test:

1. **Offer the mechanic at a price merchants can say yes to, to merchants who have never heard of it, and
   count the close rate against an equal-cost flat-discount alternative.** If pricing was the constraint,
   removing it converts. If taste was the constraint, it doesn't. This is a sales test, not a product test,
   and it is runnable before any build.
2. **Ask declining merchants for the reason and check whether it is liability or appetite.** "I couldn't
   cover the payout" supports us. "I don't want my brand associated with a gamble," "my customers will
   think it's a trick," "I can't explain it in an email subject line" supports the competing story. Those
   three objections are cheap to elicit and we have not elicited them.
3. **Look for merchants who tried it and stopped.** Absence of *attempts* is ambiguous; abandonment after
   attempt is not. We have not searched for this and should.

Until one of those runs, we should describe the absence as **ambiguous evidence**, not supporting evidence.
Any doc that presents it as supporting is overclaiming.

---

## 4. Reallocation is an easier sale to *describe* and a harder sale to *win*

**Mechanism.** "Use budget you're already spending" removes the budget objection. It does not remove the
comparison — it **creates** one. A new-budget sale competes against nothing. A reallocation sale competes
against a **known quantity the merchant has run dozens of times and can forecast**.

The merchant's actual decision is:

| | Flat 10% off | Contingent equivalent |
|---|---|---|
| Cost | Known: ~$2,000 per 100 × $200 orders | Known-ish: **$2,126–$2,626** depending on the book (§5) |
| Result | **Predicted from their own history** — they have the data | **Unknown to them and to us** — nobody has measured it |
| Downside if wrong | Familiar, bounded, already priced into the plan | Unfamiliar, explains badly to a boss, and is the merchant's fault |
| Explaining it | One line in an email subject | A probability, a trigger, a refund mechanic, and a settlement date |

Novelty must beat familiarity **by enough to justify the variance**, and the merchant is not risk-neutral
about their own promotional calendar. A brand that runs four promos a year is not choosing between two
draws from the same distribution; it is choosing whether to spend one of four slots on something it cannot
forecast. Even a mechanic with a genuinely higher mean can lose that decision rationally.

There is also an ugly asymmetry in how failure gets attributed. A flat discount that underperforms is
"the market was soft." A chance-of-free promo that underperforms is "we tried that weird lottery thing."
**The mechanic is blamed for its own variance in a way the default option never is** — which raises the
bar for adoption above the bar for performance.

**Early detection.** Partly. Close rate on cold merchants is measurable in weeks and is the same test as
§3's item 1. But a paid pilot with a hand-held merchant will not surface this — the concierge motion hides
exactly the friction being tested. Note that
[Playably](https://playably.ai/) reports **30+ Shopify brands** after roughly two years with a
[Shopify listing carrying 2 reviews since Feb 2025](https://apps.shopify.com/playably) — a hand-sold
concierge motion, not self-serve pull. That is the closest available read on adoption velocity for a
gamified-promo mechanic, and it is slow.

---

## 5. The closing equivalence is true in the best case and false where the evidence points

This is the most important new finding in this document and it comes from numbers already in
[`01-math.md`](01-math.md) — no new research required.

**Mechanism.** The reframe closes on "**~6% more than the discount you're already running.**" That figure
is real: 100 orders × $200, 10% trigger, flat discount = **$2,000**; contingent = **$2,326** all-in, a **+16.3%**
premium ([`01-math.md`](01-math.md) §4). But $2,126 assumes a **passive fill at $0.10** on a deep book.
Change either assumption and the sentence stops being true.

| How the hedge actually fills, `p` = 10%, $20,000 liability | All-in cost | Premium over the $2,000 flat discount |
|---|---|---|
| Passive fill at $0.10, fees only (the quoted figure) | **$2,126** | **+6.3%** |
| Crossing a **1¢** spread (marquee market, realistic) | **$2,226** | **+11.3%** |
| Crossing a **5¢** spread (**the median Kalshi market**) | **$2,626** | **+31.3%** |

Now apply the behavioral evidence, which says push `p` **down** so the equal-EV sure discount reads as
trivial ([`01-math.md`](01-math.md) §6). The all-in drag as a fraction of premium is
`0.07·(1−p) + (spread/2)/p` — **the fee term is flat and the crossing term explodes as `p → 0`**:

| Trigger `p` | Flat-discount cost (100 × $200) | Premium at **1¢** spread | Premium at **5¢** spread (median) |
|---|---|---|---|
| 3% ("your 3% longshot is free") | $600 | **+23.5%** | **+90.1%** |
| 5% | $1,000 | +16.7% | +56.7% |
| 10% | $2,000 | +11.3% | +31.3% |
| 20% | $4,000 | +8.1% | +18.1% |

**Read the two tables together and the pitch has a hole in it.** The regime where the behavioral evidence
says the mechanic works (`p` low) is the regime where the equivalence claim fails (`p` low ⇒ premium
23–90%). The regime where "6% more than your discount" is honest (`p` = 10–20%, marquee book, passive
fill) is the regime where Gaertig & Simmons say the sure discount starts winning. **We are quoting the
price from one end of the range and the efficacy from the other.**

This does not kill the product. It kills the *sentence*. The defensible version is narrower and less
quotable: "*on a deep, liquid trigger at around a 10% probability, this costs about 6–12% more than the
flat discount you're already running*" — with the median-market and low-`p` cases stated, not omitted.
Any doc that quotes 6% without the conditions is overclaiming, and one question punctures it.

**Early detection.** Free and immediate. The read API is unauthenticated; quote the actual book for the
actual trigger before quoting a price to a merchant. Which is also §6.

---

## 6. Reference-price protection is an argument, not a measurement — grade it accordingly

**Mechanism.** The reframe's second pillar (after talkability) is that a contingent discount **protects
the reference price** a flat discount erodes — the customer never sees a lower number, so they are not
trained to wait for the next sale. It is a clean, plausible, mechanistically satisfying story. It is also
**the least-evidenced claim in the entire thesis**, and it is currently doing structural work.

**Grade the evidence explicitly:**

| Component of the claim | Evidence grade | Basis |
|---|---|---|
| Flat discounts erode internal reference price | **Supported, indirect** | [Alavi, Bornemann & Wieseke, *JM* 79(2):62–78](https://journals.sagepub.com/doi/10.1509/jm.12.0408) find gambled discounts protect internal reference price and repurchasing where flat discounts damage both |
| ...but the average promo effect on later preference | **Null** | [51-study meta-analysis](https://www.sciencedirect.com/science/article/abs/pii/S0022435906000388) — **the harm we claim to avoid may not be there to avoid** |
| An *externally attributed* trigger (a game, a Fed print) protects reference price the same way an internal gamble does | **Untested. Zero studies.** | This is the specific claim our product makes, and nobody has run it |
| We have measured it | **No.** Not once, not at any scale | — |

That third row is the load-bearing gap. Alavi et al. tested a **gambled** discount — the randomness sits
inside the transaction. Our randomness sits **outside** it, in a public event with a public probability,
attributed to a third party. There is a plausible argument it works *better* (the brand never chose to
discount, so the anchor is even safer) and an equally plausible argument it works *worse* (the customer
learns "this store does free-order promos" and waits for the next game). **We do not know which, and we
have written as if we do.**

**Early detection.** Yes — and it is nearly free, because it is a **secondary readout on the experiment
we are already running**. 60-day repeat rate and post-promo AOV by arm. See *The cheapest decisive experiment*.

---

# Part II — Structural dependencies the reframe does not touch

## 7. The core value prop may not exist

**Mechanism.** On a prediction market, price *is* probability, so the promo's mean cost equals a flat
discount of the same size — plus fees. The entire business is a bet that the *framing* is worth more than
the fee stack. If it isn't, you have shipped a more expensive discount with counterparty risk. **The
reframe changes nothing here.** It changes the comparison object from "unhedged promo" to "equal-cost flat
discount," which is the right comparison — and makes this failure mode *easier to test*, not less likely.

**Evidence.** The flagship study is
[Gaertig & Simmons, *JCR* 52(5):1022–1042, N=8,969](https://academic.oup.com/jcr/article/52/5/1022/8171334),
five preregistered studies. Its finding is **conditional, and the condition cuts against us**:
probabilistic promotions win **only when the competing sure discount is or seems trivial**. Across their
Likert-scaled studies, the reported condition means sit **below the scale midpoint** — i.e. participants
preferred the sure discount in absolute terms. *(Cell-level means are read from the article's results
tables and we have not re-derived them from the published data; treat the exact figures as reported, not
verified. The direction is what the paper's own abstract asserts.)* (Be precise: in their *binary-choice*
supplementals at low stakes, probabilistic does win outright. The defensible claim is that **nobody has
shown it winning at ordinary e-commerce cart values.**)

At moderate stakes it inverts. [Attari et al. 2022](https://ideas.repec.org/a/eee/jbrese/v143y2022icp366-374.html):
on a $60 coffeemaker only **44.1%** chose the gamble; on $70 pens, **31.7%**. The pro-probabilistic
literature ran on [$0.75 candy and $4.50 DVDs](http://www-2.rotman.utoronto.ca/facbios/file/Mazar_ProbabilisticPricePromotions_mnsc.2017.pdf),
and its one big-ticket result (a $200 hotel) **failed to replicate** in Gaertig & Simmons' supplement.
The best measured field lift, [+54% spending](https://www.journals.uchicago.edu/doi/10.1086/701901),
was a **1%** promotion among **cash/debit** shoppers — a pain-of-paying mechanism that stored cards and
one-click checkout have already anesthetized.

Worse, the actual profit engine in the conditional-rebate literature is **consumer overestimation** of the
event probability — [Ailawadi et al. 2014](https://ideas.repec.org/a/eee/ijrema/v31y2014i1p94-106.html)
finds conditional rebates beat certain rebates "mostly because consumers' subjective probability of the
event occurring is higher than what market wisdom suggests." And
[Akbari & Wagner](https://link.springer.com/article/10.1007/s41471-021-00110-y) accidentally showed that
wedge **vanishing under transparency**: shoppers at an opaque wheel-of-fortune expected 36% and got 6%,
but at a transparent, computable dice game expected 9% and got 11% — no overestimation at all. A publicly
quoted prediction-market probability is the most transparent mechanic possible. **The product may be
engineered to destroy its own margin source.**

**Early detection.** A single equal-EV A/B against a flat discount, measured on margin. See *The cheapest decisive experiment*. This is
cheap, and it is the only test that matters.

**What would have to be true.** That the earned-media and reference-price channels carry the promo where
conversion does not. Both of those channels are now graded in §2 and §6, and neither grades well.

---

## 8. Liquidity and position limits, on exactly the beachhead the behavioral evidence implies

This is the sharpest structural failure mode and it is a **pincer**: the behavioral evidence says use
**deep longshots** (so the equal-EV sure discount feels trivial), and the market structure says longshots
are **the most expensive things to hedge**. §5 shows this pincer is now also a *pricing-claim* problem,
not just a cost problem.

**Evidence — our own measurement, not a citation.** A random live sample of **2,212 open markets** found a
**median spread of 5¢**, **44% with no two-sided quote at all**, and **83% with under 1,000 contracts at
the touch**. Filling just **$25,000** of coverage was **impossible** on NYC daily-high-temperature (44% of
need, sweeping from $0.15 to an average $0.84) and on CPI (62% of need), and cost **+56%** on a single
regional EPL match and **+126%** on the Emmys.

> *Provenance: these figures are book-walks we ran against Kalshi's public
> [markets](https://api.elections.kalshi.com/trade-api/v2/markets?limit=1000&status=open) and orderbook
> endpoints on **15 Aug 2026**. Orderbooks are live, so the endpoint links show current state and will
> **not** reproduce these numbers. They are a snapshot, not a published dataset — reproducing them means
> re-running the sweep, and the point being made is precisely that the result varies by market and by
> moment.* Far-dated Fed strikes quote **17–48¢ wide**
([live](https://api.elections.kalshi.com/trade-api/v2/markets?series_ticker=KXFED)); near-dated Fed
strikes are almost all already pinned at 0.00/0.01 or 0.98/1.00.

And marquee depth is **not stable**. Our own zero-slippage measurement **did not reproduce on re-measure**:
a $50,000 hedge on the same NFL market slipped **+0.93¢** across two levels, and top-of-book size varied
**52×** between two markets in the same series on the same day
([orderbook](https://api.elections.kalshi.com/trade-api/v2/markets/KXNFLGAME-26AUG15DALSEA-SEA/orderbook)).
Do not build a promise of fixed cost on a single snapshot of a book. Under the new frame this is worse than
before: **you are now quoting the merchant a premium over a discount they can compute exactly**, so hedge
slippage does not just eat margin, it makes the pitch retroactively false.

Then the cap. Kalshi's default position limit is **$25,000 per strike, per Member**, defined as *maximum
loss exposure* ([product certification](https://assets.kalshi.com/regulatory/product-certifications/FEDDECISION.pdf)),
so max hedgeable liability is `25,000/p` — $500k at p=0.05, but only **$50k at a coin flip**. Larger tiers
($7M, $50M) exist only on select markets. And the rulebook aggregates positions across every account a
person "directly or indirectly holds positions or controls trading" in — which, if the app controls
execution, plausibly means **one $25,000 limit for the entire platform, not one per merchant.** (Caveat
honestly: the rulebook text we read is v1.15, superseded when Kalshi self-certified a margined rulebook
around April 2026. The clause is standard DCM boilerplate and probably survives, but **re-verify before
treating it as settled.**)

**Early detection.** Free. The read API is unauthenticated; a pre-trade depth-and-spread gate can be built
and validated before signing anything.

**What would have to be true.** That the viable trigger set is a few dozen marquee sports and macro markets
— and that a business exists inside that constraint. It might. It is much smaller than "12,000+ markets"
implies; the overwhelming majority of that catalogue is auto-generated parlay combos with zero open
interest.

---

## 9. Regulatory dependence on the prediction-market rail

**Mechanism.** Liquidity forces the product onto sports triggers (§8). Sports is the contract class under
the heaviest legal attack. If the rail is geofenced in a merchant's state, the **promo obligation remains
binding while the hedge becomes unavailable** — the two have different jurisdictional triggers and can
decouple on weeks of notice.

**Evidence, current as of August 2026.** The headline win —
[*KalshiEX v. Flaherty*, 3d Cir. No. 25-1922 (Apr. 6, 2026)](https://law.justia.com/cases/federal/appellate-courts/ca3/25-1922/25-1922-2026-04-06.html)
— is **2-1, interlocutory, binds four jurisdictions**, and expressly declined to decide whether the CEA
preempts all state gambling regulation. Outside it, Kalshi is **net-losing**: SDNY denied its injunction
and held New York's gambling law not preempted (Torres, July 7, 2026);
[Connecticut denied a PI](https://readwrite.com/connecticut-judge-rejects-kalshi-injunction/) holding the
contracts likely aren't swaps; Nevada, Maryland, Ohio and Washington have all produced rulings for the
state; and [Massachusetts](https://www.insurancejournal.com/news/east/2026/05/05/868519.htm) enjoined
Kalshi's sports contracts effective March 8 2026, with the appeal argued before the state Supreme Judicial
Court — a state high court, not a trial judge, now sits on the question. New York's AG and Governor
[sued for $36B+ on July 31, 2026](https://cryptobriefing.com/cftc-kalshi-new-york-gambling-lawsuit/) —
seeking a **nationwide** bar — and the CFTC responded with an **emergency order** directing Kalshi to keep
operating. A federal agency ordering a company to keep trading against a state action is maximum
instability, not stability.

The most useful ruling for us is the most hostile one. Washington's court
[ordered geofencing](https://www.atg.wa.gov/news/news-releases/judge-orders-kalshi-cease-numerous-washington-operations)
of **sports, elections, politics, entertainment, culture, tech/science and "mentions"** — while expressly
permitting **commodities, climate, economics and finance**, at $120,000/day. That is a court-drawn line
straight through our trigger taxonomy.

**Early detection.** Docket monitoring plus a per-merchant residency check *at promo creation*, not at
checkout, plus a kill switch. All cheap.

**What would have to be true.** Either the CFTC's June 2026 rulemaking lands favorably — it would place
**economic and financial indicators, including the federal funds rate, outside gaming review entirely**
([CFTC](https://www.cftc.gov/PressRoom/PressReleases/9249-26);
[analysis](https://www.ropesgray.com/en/insights/alerts/2026/06/rewriting-the-rulebook-cftc-proposes-rule-changes-for-prediction-market-contracts))
— or the product scopes to the permitted bucket. Weight the first modestly: the **prior** event-contracts
NPRM was withdrawn in Feb 2026 with no final rule, and the Commission is currently **four seats short**,
which the same analysts flag as a validity risk.

---

## 10. The unlicensed-insurer line (and a second one nobody talks about)

**Mechanism.** Charging a merchant a fee to guarantee a payout on an uncertain event is, in substance,
**prize-indemnity insurance**. It is not a regulatory gap — it is an **expressly authorized line**:
[N.Y. Ins. Law §1113(a)(27)](https://www.dfs.ny.gov/insurance/ogco2003/rg030315.htm), added in 1997. State
codes reach conduct "in substance equivalent" to insurance done to evade the statutes, so calling it a
*hedge* does not cure it. Note the statute covers a payout in any **"lawful contest"** — which couples the
insurance question to the gambling question rather than separating them.

**The second line.** Our recommended escape — merchant brings their own Kalshi key, we only size and
execute — dodges Introducing Broker registration but walks into
[**Commodity Trading Advisor**](https://www.nfa.futures.org/registration-membership/who-has-to-register/cta.html)
territory. The CTA definition is **technology-neutral**: advising others on the advisability of trading
commodity interests, including via algorithms and APIs, and exercising discretion over customer accounts,
is registrable. Threshold rebalancing that fires ~76 unattended orders over a 72-hour window in response to
webhooks is discretionary execution. **You cannot have both the automation and the "we're just software"
defense** without answering this.

Separately, Kalshi's own [Developer Agreement §3](https://kalshi-public-docs.s3.amazonaws.com/Kalshi-Developer-Agreement.pdf)
limits API use to "facilitating a members own trading," prohibits "facilitating trading… by other members,"
and bars sublicensing. That is the default retail terms; an ISV agreement would have to displace them.

**Evidence that this is the binding constraint.** *Both* structures that have actually shipped route around
it in the same direction. Playably **underwrites** and hedges on its own book (so it trades only for
itself); [Blanket](https://fortune.com/2026/08/07/exclusive-kalshi-blanket-small-business-hedge-hypergamblification/)
**only recommends** and executes nothing, with no money flowing through it. **Nobody has shipped "app
places orders in the merchant's account."** That is consistent with it being prohibited, not merely unbuilt.

**On lottery law, be scrupulous in both directions.** Prize + chance + consideration makes an illegal
lottery, and a uniform external trigger does *not* remove chance — the NY-model statute reaches "a future
contingent event not under his control." The real defense is **no risk of loss**: the customer pays market
price for goods they keep. That theory is practitioner commentary with **no controlling case we could
find**. But the practical record cuts the other way: Jordan's Furniture has run these for **~19 years**,
including a [~$50M-liability UConn promo in 2026](https://www.wbur.org/news/2026/04/03/march-madness-jordans-furniture-refund-uconn-final),
with no enforcement action. The most-cited adverse expert opinion is from a **2007** trade-press discussion,
not current analysis.

**What would have to be true.** Merchant is principal on both the Kalshi account *and* the customer
obligation; you never promise, guarantee, or touch refund money; every trade has genuine authorization; and
no promo is ever priced as a surcharge (a price uplift converts the delta into a stake). **The reframe makes
that last condition load-bearing in a new way:** "reallocate your existing discount budget" is safe, but
"add this on top and raise the price to fund it" is a stake. The GTM line and the legal line are the same
line. Registration/bonding still applies above thresholds —
[NY and FL at $5,000, Rhode Island at **$500**](https://kleinmoynihan.com/sweepstakes-registration-and-bonding-requirements-2/).
And if an AMOE is required, free entrants create **unhedged liability**, which breaks the sizing model.

---

## 11. Platform dependence on Shopify

**Mechanism.** Shopify is simultaneously the channel, the rule-setter, and the most plausible competitor —
and its rules are pointed away from this mechanic.

**Evidence.** Shopify Payments' eligibility policy prohibits "**Products or services related to gambling,
such as sports forecasting, lotteries, bidding, contests, or sweepstakes**"
([policy](https://help.shopify.com/en/manual/payments/shopify-payments/onboarding/eligibility)). The
wording plainly targets merchants whose *business* is contests — but an app whose entire function is
attaching an outcome-contingent prize to a purchase sits inside the blast radius, and the failure mode
isn't app rejection, it's **a merchant losing payment processing**. That is a fatal trust problem, and it is
worse under a reallocation pitch: you are asking a merchant to move money from a mechanism with zero
platform risk to one with nonzero platform risk.

Three more constraints, all verifiable in the docs:

| Constraint | Effect |
|---|---|
| [~120-day refund window](https://help.shopify.com/en/manual/payments/shopify-payments/payouts/refunds), bank-dependent | A September purchase settling on a February Super Bowl (~150 days) **cannot be refunded to the card**. Kills most season-long and macro-horizon triggers on the native rail. |
| Original processing fee **not refunded**; refunds irreversible; negative balance **debits the merchant's bank** | A "100% refund" costs ~2.9%+30¢ more than the hedge covers, and a mass refund is exactly the event that drives the balance negative. **This is an unpriced addition to the §5 premium** — the "6% more than your discount" figure does not include it. |
| [App revenue share assessed on **gross**, refunds not deducted](https://shopify.dev/docs/apps/launch/distribution/revenue-share) | Uniquely hostile to a business whose mechanic *is* issuing refunds, for any fee billed through Shopify. |

And the paying-app base is far smaller than the merchant headline: of ~3.59M active stores, **65,441** spend
>$100/mo on apps, **7,966** >$500, and **1,602** >$1,000
([Storeleads-derived, ±25%](https://eightx.co/blog/average-ecommerce-shopify-app-spend-by-revenue-band-2026)).
A subscription-priced version of this caps out well below $100M. Note also that Shopify dependence does not
decay with scale: Klaviyo was **~78% Shopify-tied at IPO in 2023 and ~78% two years later** *(drawn from
Klaviyo's own filings/commentary; we did not re-derive it from a single primary disclosure — treat the level
as approximate and the flatness as the load-bearing part).*

**On sizing, and this is a warning to ourselves.** The new frame makes it *very* tempting to size the market
as a slice of total retail discount spend. **Do not.** That is adjacency reasoning and it is precisely what
this repo exists to kill. Any number must be built bottom-up — **merchant count × promos per year ×
liability per promo × take rate**, with every assumption stated inline — and the merchant count that
matters is the paying-app base above (65,441 at >$100/mo), not 3.59M stores. Every step of that chain has a
number we do not have: nobody knows what fraction of >$100/mo app spenders would run a contingent promo,
how many times a year, or at what liability. Those are the three unknowns that decide the size of this, and
a discount-spend-slice number would paper over all three.

**Early detection.** Get a **written** Partner/App Review ruling on the mechanic before building
distribution assumptions. Binary answer, zero cost.

---

## 12. Correlation — only if you ever hold the risk

**Mechanism.** A merchant-funded, event-contingent promo is **100% correlated across all customers of one
merchant** by construction — everyone wins together. If you pool merchants, a "chalk day" (all favorites
win) triggers many books at once. Diversification across *independent* events reduces variance as ~1/N; a
single Super Bowl is N=1 for every merchant riding it.

**Evidence.** The contrast that makes this vivid: Hyundai Assurance is reported to have driven a **+14% YoY**
January 2009 against a US auto market down roughly a third *(widely repeated in contemporaneous trade
coverage; we did not independently verify either figure)*, and ever took back only
[**350 cars**](https://www.consumerreports.org/cro/news/2011/03/the-hyundai-assurance-car-return-program-will-end/index.htm)
— because the trigger (individual job loss) was **idiosyncratic and diversifiable**. Public-event triggers
are the opposite risk shape and must be **fully funded**, not pooled. This is precisely why the endgame
requires concentration limits and tail reinsurance — i.e. capital and a license, the two things the thesis
rejects.

**Early detection.** Not detectable in normal operation; it is a tail. Bound it structurally instead: never
net exposures across merchants, cap per-event aggregate liability, hold every hedge to settlement rather
than trading it.

**What would have to be true.** That you never hold risk — merchant is principal, always, and the platform's
balance sheet is never on the hook. Which also happens to be the answer to §10.

---

## 13. Thin moat and DIY collapse

**Mechanism.** The merchant learns the identity — *a 10% trigger costs about 10%* — and then asks what your
fee buys. Kalshi's read API is public, onboarding is self-serve, and hedge *discovery* is already free.
**The reframe makes this worse in one specific way**: teaching the merchant that a contingent promo costs the
same as their flat discount is *the pitch*, and it is also the exact piece of knowledge that lets them do it
themselves.

**Evidence.** [Blanket](https://fortune.com/2026/08/07/exclusive-kalshi-blanket-small-business-hedge-hypergamblification/)
turns a plain-English business exposure into matching Kalshi contracts at no charge (it deliberately
executes nothing — see §10). Kalshi runs a small-business hedging page with a named BD lead. In the adjacent
shipping-protection market, [Navidium](https://www.shipaid.com/blogs/shopify-app-comparisons/navidium-shipping-protection-vs-route-protection-and-tracking-an-in-depth-comparison)
showed merchants they could **self-insure and keep 100% of the fees**, collapsing the third-party margin
*(source is a competing vendor's blog — motivated framing, uncontested mechanic)* — and promos are an easier
case, because the merchant already understands expected value.

The structural pattern in embedded protection is brutal and clean: every company that owns the **risk** or
the **distribution** cleared $1B; every pure-software facilitator in between **died or stalled** —
[Clyde asset-acquired in a fire sale with 50–60% layoffs](https://coverager.com/cover-genius-acquires-the-assets-of-clyde/),
Mulberry in turnaround, Seel with no round since 2022. The closest structural analog,
[Sensible Weather](https://www.crunchbase.com/organization/sensible-weather), has genuine product-market fit
(1M+ guarantees sold) and **still has not raised a Series B in four years**.

**Why this ranks lower now.** Under the old frame, DIY was the near-term threat because the customer already
wanted the thing. Under the new frame, **adoption precedes disintermediation**: you cannot be routed around
on a mechanic nobody has run. Keep it on the list, drop it down the list.

**Early detection.** Ask a pilot merchant, after their first campaign, whether they'd run the second one
themselves. The answer arrives in one cycle — but only after §2/§4 have been survived.

**What would have to be true.** That the defensible layer is **settlement correctness and refusal** —
matching a merchant's plain-English trigger to an exact contract, reading its settlement rules, and
**declining promos whose market can't absorb the liability** — plus cross-merchant incrementality data
nobody else can collect. Both are real. Neither is a weekend to copy, and neither exists yet. The
incrementality dataset is the better of the two under the new frame, because **the reframe's central claim
is an empirical one nobody has data on**, and the first party to accumulate that data owns the answer.

---

## The double bind

The two survivable answers point in opposite directions, and this is the honest heart of the teardown. The
reframe does not resolve it — it adds a third arm.

**Pivot to non-sports triggers to survive gambling law.** Washington's court expressly permits
**commodities, climate, economics, finance**; the CFTC's proposal puts economic and financial indicators
outside gaming review; even the most hostile pending federal bills reportedly leave bona fide weather and
economic hedging instruments untouched. Macro and weather is the clean lane.

**But that lane has no liquidity and no fandom.** NYC daily-high temperature could not absorb even **$25,000**
of coverage; CPI filled 62% of need sweeping to $0.97; far-dated Fed strikes quote **17–48¢** wide. And the
only lift anyone has observed — 4× week-over-week traffic at
[Forme](https://www.modernretail.co/marketing/why-forme-launched-a-world-cup-promotion-hedged-on-kalshi/), a
bar clearing **$8,514** net on a $5,000 Knicks hedge
([CNBC](https://www.cnbc.com/2026/06/03/kalshi-wants-small-businesses-to-hedge-like-wall-street-a-nyc-bar-is-trying-it-with-knicks-promotion.html))
— ran on **fandom**: a team, a rivalry, a reason to tell someone. Nobody roots for a CPI print. The
transferable benefit in the one high-stakes field study was **word-of-mouth driven by entertainment value**,
not by the discount. Strip the fandom and you strip the engine.

**And the new third arm: the price claim and the efficacy claim want opposite probabilities** (§5). The
behavioral evidence pushes `p` down toward longshots; the equivalence pitch — "about 6% more than your
current discount" — only holds up near `p` = 10% on the deepest books. At `p` = 3% on a median market the
premium is **+90%**, and no reallocation story survives that.

So: the legally durable product is the commercially inert one, the commercially alive one is the legally
exposed one, and the version that is cheapest to defend on price is the version the evidence likes least.
**We do not have an answer to this.** The least-bad candidate is regional weather with a *self-insured* tail
(accept basis risk and thin books, cap liability hard) — which abandons the core promise that cost is fixed
and known.

---

## Corrections to our own published docs

Intellectual honesty demands these run in the same repo as the claims they fix. The **current** docs
([`00-thesis.md`](00-thesis.md), [`01-math.md`](01-math.md)) already reflect every correction below; the
"we wrote" column records what earlier drafts said, including the superseded `01-business-math.md`, which is
retained in this directory for provenance and **should not be read as current**.

| Where (as originally published) | We wrote | Actually |
|---|---|---|
| `00-thesis.md` §What has to be true | "Minnesota felony ban Aug 1 2026" | The ban was **preliminarily enjoined July 27, 2026, four days before its effective date**, and never took effect ([Courthouse News](https://www.courthousenews.com/judge-blocks-minnesota-ban-on-prediction-markets/)). The judge also warned permanent relief "may be much narrower." |
| `00-thesis.md`; `01-business-math.md` §D *(superseded)* | SCA Promotions is "~$40M revenue" | **Unverified and contested.** Two third-party scrapers disagree by ~2× ($22M vs $44M); SCA is private and discloses nothing. Its cumulative-payout figures appear on its own site in three different amounts. The niche-ceiling *conclusion* survives; the precision does not. |
| `01-business-math.md` §B *(superseded by [`01-math.md`](01-math.md) §9)* | Kalshi cap "$25,000 cost-basis per market… flagship $7M/$50M" | Correct, but incomplete in a way that matters: the rulebook **aggregates across accounts a person controls**, so a platform executing hedges may face **one** $25,000 limit, not one per merchant. Verify against the current (post-April-2026) rulebook. |
| `01-business-math.md` §C *(superseded)* | Prize indemnity carries a "~2–3× fair value" load | **Not supported.** The 3–15%-of-prize-value band is **probability-indexed**, not a flat multiple; at remote triggers carrier paper can price *below* the exchange route once Kalshi fees and spread crossing are counted. See [`01-math.md`](01-math.md) §10. |
| `01-business-math.md` §D *(superseded)* | "A $6,000 promo generates ~$1,800 of hedged notional" | **Arithmetic error.** At `p` = 0.10 a $6,000 liability generates `L·p` = **$600** of premium, as that same doc's own §B worked example states. The $1,800 figure corresponds to `p` = 0.30 and should be ignored; [`03-venture-scale.md`](03-venture-scale.md) §1 uses the correct $600. |

**Two corrections of framing, not facts**, both produced by the reframe:

1. **Earlier drafts led with "businesses already run these promos; we make it safe."** That premise does not
   survive its own evidence base: the documented record is roughly **six cases**, and the most-cited one
   (The Jeffrey, a Manhattan bar) exists because **Kalshi's team cold-reached-out after a Bloomberg story**.
   That is a press cycle, not a market. The correct framing is that the mechanic is **near-absent**, and
   near-absence is **ambiguous** — it supports both "unpriceable until now" and "nobody wants it" (§3).
2. **We cite Mattress Mack as the origin story.** He is a **counterexample**. His promos ran at ~45–50%
   implied probability on $3,000–$6,000 minimum baskets, at least one explicitly **uninsured** — exactly
   where the 2026 evidence says probabilistic promotions *lose* — and by his own account the 2022 Astros
   promo was "pretty much a wash." What paid was national earned media and a personal brand.
   **Neither productizes.** Under the new frame he is retained as **evidence that the mechanic buys
   attention**, and nothing more. That is the only work those cases should ever do again.

---

## The cheapest decisive experiment

One test kills or validates the thesis, and it is not a build. **It is unchanged by the reframe — because
the reframe's central claim is exactly what it measures.** The comparison object was always supposed to be
an equal-cost flat discount; the reframe just makes that explicit.

**Design.** Two to three **ordinary, non-persona** merchants. Within each, randomize the storefront offer
between:

- **Arm A —** "chance your order is free" at probability `p`, all-in cost `p + drag`
- **Arm B —** a plain discount of **identical expected cost**, `p + drag`, percentage-framed
- **Arm C —** no promotion (holdout)

The holdout is not optional and it is not a nicety. Arm B alone tells you which promo is better; only Arm C
tells you whether **either** produced incremental margin, which is the documented default failure of
discounting and the thing the whole reframe accuses flat discounts of. **The product should ship with a
holdout on by default for the same reason.**

**Measure incremental *margin*, not traffic** — traffic is the easiest metric to move and the least
informative, and it is the only thing every published case study reports (§2). Net every arm against the
**trailing 60 days** for that merchant and season-match. Report gross margin dollars per exposed session,
plus AOV and units, plus **60-day repeat rate — which is the only measurement anyone will have of the
reference-price claim in §6.**

**Give the mechanic its best shot, or the test isn't fair.** Use a **low `p` with a 100% refund** so the
equal-EV sure discount reads as trivial, **percentage-frame** the comparison discount (the one lever
Gaertig & Simmons found worth `b=0.523, p<.001`), and pick a **liquid** trigger with genuine local fandom.
Add one cell that **hides the quoted odds** — the overestimation evidence says transparency may be what
kills the wedge, and that is a free second finding.

**Run §3's sales test alongside it, because it is nearly free.** Pitch the reallocation to cold merchants
who have never heard of the mechanic, record close rate against an equal-cost flat-discount alternative, and
**record the verbatim reason for every decline**. "I couldn't cover the payout" supports the reframe's
central story. "My customers will think it's a trick" refutes it. Two weeks of calls, no code.

**Cost.** No hedge is required to run the A/B. Cap liability at a level the merchant can self-insure, or
hedge a single marquee contract for a few hundred dollars. Nothing needs to be built beyond a discount code
and a landing page.

**Decision rule.** Arm A must beat Arm B on incremental margin by **more than the full fee stack** — the
premium over the flat discount at the trigger and book you actually used, which §5 puts at **+6% in the best
case and +90% in the realistic-longshot-on-a-median-book case**, plus any facilitator fee, plus the
unrefunded Shopify processing fee on every refunded order (§11). Not by "a nice increase." By a measured,
seasonally-netted margin difference that clears the whole stack.

If it does, this is a business and the adoption question (§4) becomes the thing worth arguing about. If it
doesn't — and the weight of the published evidence says it won't at ordinary cart values — **you have
confirmed the kill for the price of a weekend**, which is the best outcome available here short of being
right.

---

Thesis: [`00-thesis.md`](00-thesis.md) · Unit economics: [`01-math.md`](01-math.md) ·
Business breakdown: [`02-business.md`](02-business.md) · Comps: [`03-venture-scale.md`](03-venture-scale.md)

*Business analysis, not legal or financial advice. Prediction-market law is moving quarterly and the
sports-contract litigation weekly; several claims above rest on documents that were superseded during the
research window. Re-verify with counsel before committing capital.*
