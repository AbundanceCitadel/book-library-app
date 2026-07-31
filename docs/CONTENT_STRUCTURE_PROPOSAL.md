# Content Structure Proposal — Stress-Testing the 5-Tab Book Entry

**Revision 2:** Thai asked for a second pass with two changes — an 8-tab set instead of 7, and "Apply This" built around several concrete actions rather than one. Both are reflected below. The 8th tab (Concepts & Frameworks) was set aside as "not yet" in Revision 1; on reconsideration against chunking/schema research (see §2), it earns a standalone place even before the library is large enough for cross-book lookup, so it's promoted rather than added just to hit a number. Reasoning for that change is in §2 and §4.

**Status:** Proposal only — nothing in `docs/SCHEMA.md`, `docs/CONTENT_PIPELINE.md`, app code, or any book content has been touched. Everything schema-shaped below is marked **PROPOSED, NOT IMPLEMENTED**.

**Why now:** neither the 18-book v2 retrofit nor the 310-book new-content pipeline has produced any content yet. This is the one moment where changing the content structure costs zero rework. Once either effort starts, every structural change becomes a retrofit against real files instead of a documentation edit — so this stress-test happens first, deliberately, while it's free.

**Grounded in:** `PROJECT_BRIEF.md`, `docs/SCHEMA.md`, `docs/CONTENT_PIPELINE.md`, and three real v2 entries — `atomic-habits.json`, `start-with-why.json`, `security-analysis.json` — chosen for type variety (habits/personal-growth, business-strategy, technical/investing).

---

## 1. Verdict

**Don't keep the current 5 as-is. Move to 8 tabs**, changing one and adding three:

| Tab | Status | One-line purpose |
|---|---|---|
| Summary | Unchanged | Whole-book orientation — the map before the details |
| Chapters | Unchanged | Chapter/part-by-part substance — what actually happens in the book |
| Key Lessons | Unchanged | Condensed, whole-book takeaways — the recognition-level "what to know" |
| **Concepts & Frameworks** | **New** | The book's named models, isolated and defined on their own — the reusable vocabulary |
| **Apply This** | **New** | Several concrete actions to try, plus reflection prompts — turns knowing into doing |
| **Highlights & Quotes** | **Changed** (renamed + broadened from Quotes) | Passages worth remembering, whether famous or just useful — not only quotable lines |
| **Critical Take** | **New** | The book's real limitations, contested claims, or how its ideas have aged |
| Author | Unchanged | Who wrote it and what else they've written |

Three additions, one broadened, nothing removed. This is the recommended ceiling — not a floor to build up from. §4 covers the one candidate still set aside (a One-Page Recap tab) and why.

---

## 2. What the research actually says

The app's stated goal is retention and application by one person reading in spare minutes — not completeness, not the feeling of thoroughness. That's a specific, checkable bar, and it points to a fairly narrow, well-established body of research:

**Retrieval beats re-reading.** Karpicke & Roediger's testing-effect research shows that actively retrieving information produces far better long-term retention than re-reading or reviewing it — even though re-reading *feels* more productive in the moment. Recognizing a lesson when you read it is not the same cognitive event as being able to produce it later, and only the second one predicts retention.

**Effort that feels like friction is often the mechanism, not a flaw.** Bjork's "desirable difficulties" research (spacing, retrieval practice, generation, interleaving) shows that conditions which slow down first-pass comprehension — having to generate an answer, having to apply an idea rather than just read it — reliably improve what's retained weeks later, precisely because they're harder in the moment.

**The generation effect specifically favors self-produced answers over given ones.** Content you generate yourself (an answer to a prompt, your own example of a concept) is retained better than the same content handed to you fully formed. A five-item lesson list, however well written, is always the "handed to you" version.

**Passive first-pass reading has a strikingly low real-world retention rate.** Readwise's own user data found the average reader recalls well under 1% of their highlights a month after reading them — a concrete data point for why a single well-written summary, however good, isn't the same as retention.

**Reflection prompts with light scaffolding measurably help, but only if used.** Structured reflection/journaling prompts improve retention and transfer versus unprompted reading, but the research consistently notes this depends on the person actually engaging with the prompt — a reflection field that's never filled in doesn't do anything.

**Naming and isolating a concept makes it a retrievable unit on its own.** Chunking research (going back to expertise studies in memory research, still standard in cognitive-load and schema theory) shows that experts don't just know more than novices — they've compressed related ideas into fewer, named, self-contained "chunks" that are easier to store and retrieve than the same information left embedded in a longer narrative. A concept that only exists inside three paragraphs of chapter prose is much harder to retrieve later than the same concept given a name, a short standalone definition, and a fixed place to look it up. This is the specific mechanism behind Revision 2's addition of a Concepts & Frameworks tab (§3.1) — it doesn't require a large cross-book library to pay off; it pays off per book, the first time Thai wants to recall "what was that model called again" without re-reading the whole chapter.

**Now, the current 5 tabs against that bar:**

- **Summary** — well-supported as an entry point. Every comparable product (Blinkist, getAbstract, Shortform) leads with this for a reason: you need the whole shape before the parts make sense. But it's pure recognition content, and the research says recognition alone is the weakest form of learning.
- **Chapters** — same category as Summary, just deeper. It's the single largest effort investment per book (three-paragraph sections, per-chapter lessons) and it's good, well-structured recognition content — but per the research above, more recognition content isn't where the marginal retention gain is. This is the tab most likely to feel thorough without actually being what makes something stick.
- **Key Lessons** — the closest thing to condensed, actionable content the current structure has, and it maps directly to what getAbstract calls "key takeaways." Still recognition-level, though: reading "make the cue obvious" is not the same event as doing it.
- **Quotes** — genuinely ambiguous in its current form, and worth flagging on its own (see §2's dedicated note below and §3's worked example). It's supposed to be "famous, quotable lines," but the real v2 quote sets already contain a mix of aphoristic one-liners and dense, idea-carrying passages that aren't quotable in the shareable sense at all.
- **Author** — the weakest link on the app's actual purpose. It's a pleasant, cheap-to-produce context tab, but bio and bibliography have no direct connection to retaining or applying the book's ideas. Not worth cutting (it costs little and Thai clearly wanted it enough to build it in v2), but it's the one tab that would look decorative rather than functional if judged purely against the retention/application bar.

**What comparable products do that this app currently doesn't:**

- **Shortform** is the most directly relevant comparison: its distinguishing features over Blinkist/getAbstract are exactly the two gaps here — counterarguments (challenging the author's claims) and interactive exercises (turning concepts into action). Shortform's own positioning is explicitly "for people serious about applying what they read, not just consuming it," which is a near-exact match for this app's stated goal.
- **Farnam Street's** whole philosophy of mental models rests on a four-step "learning loop": experience → reflection → abstraction (naming the model) → action. The current 5 tabs cover only the first step (experience, via Summary/Chapters) — nothing names the abstraction, nothing forces the reflection, nothing forces the action. Concepts & Frameworks, Apply This's reflection questions, and Apply This's action steps map onto exactly the three missing steps, in order.
- **Readwise** exists specifically to fix the low-retention problem of highlight-and-forget reading, and its core insight is that what's worth resurfacing is "genuinely useful," not necessarily famous — a direct argument for broadening Quotes.
- **Classic study guides** (Sparknotes/CliffsNotes) universally close with study/discussion questions — the reflection mechanism — and typically annotate key quotations with why they matter, rather than presenting them as a bare list.

---

## 3. New and changed tabs — fields, rationale, and worked examples

All fields below are **PROPOSED, NOT YET IMPLEMENTED** — none of this exists in the real `docs/SCHEMA.md` yet. Worked examples use **Atomic Habits** (the read-first-in-line-for-this-stress-test book, and the one where a concrete action prompt is easiest to make genuinely specific).

### 3.1 Concepts & Frameworks (new tab)

**Proposed schema addition:**

```
"conceptsFrameworks": [{
  "name": string,          // the model's name, as the author coined it (e.g. "The Four Laws of
                            // Behavior Change") — not a paraphrase Thai has to guess later
  "definition": string,    // 2-4 sentences, standalone — understandable with zero other context,
                            // unlike the same idea embedded in a Chapters paragraph
  "sourceSection": string  // OPTIONAL: which chapter/part introduces it, for a jump-back link to Chapters
}]
// 3-6 entries per book — named, standalone models only, not every idea in the book
```

**Why it earns its place:** chunking research (§2) is specific about the mechanism — a concept embedded in three paragraphs of narrative is harder to retrieve later than the same concept given a name, a short standalone definition, and one fixed place to find it. This is true at the single-book level, before the library is anywhere near large enough for cross-book search to matter — the payoff is the first time Thai wants "what was that model called again" without re-opening the whole Chapters tab. It also directly operationalizes the "abstraction" step of Farnam Street's experience → reflection → abstraction → action loop, which nothing in the other 7 tabs does explicitly. Cross-book value (a searchable glossary spanning the whole library) is a genuine bonus as the library grows, but it isn't required to justify the tab today.

**Worked example — Atomic Habits:**

> - **The Habit Loop** — The four-part cycle (cue, craving, response, reward) that Clear argues underlies every habit, good or bad. Cue triggers the brain to notice an opportunity for reward; craving is the motivational pull toward it; response is the actual behavior; reward is what satisfies the craving and reinforces the loop for next time.
> - **The Four Laws of Behavior Change** — Clear's operating framework, one law per stage of the habit loop: make it obvious (cue), make it attractive (craving), make it easy (response), make it satisfying (reward). Building a habit means applying all four; breaking one means inverting all four.
> - **The Two-Minute Rule** — Any new habit should be scaled down to a version that takes two minutes or less to start (e.g. "read before bed" becomes "read one page"), on the logic that consistently showing up at a trivial scale matters more early on than performing well.
> - **The Plateau of Latent Potential** — The idea that a habit's visible payoff is often delayed well past the point most people give up, because early effort accumulates invisibly before crossing a threshold — Clear's explanation for why consistent effort can look like it's "not working" right up until it visibly does.
> - **The Goldilocks Rule** — Motivation and engagement peak when a task sits right at the edge of current ability: not so easy it's boring, not so hard it's discouraging.

### 3.2 Apply This (new tab)

**Proposed schema addition (revised in this pass to hold several actions, not one):**

```
"applyThis": {
  "actionSteps": string[],         // 3-5 concrete, DISTINCT actions to try, each tied to a different
                                    // mechanism/lesson from the book so they don't overlap — each one
                                    // specific enough to actually do this week, not a restated lesson
  "reflectionQuestions": string[]  // 2-4 questions, generation-effect prompts aimed at the reader's
                                    // own life, meant to be answered (e.g. in the existing
                                    // `personalNotes` field, once its Stage 11 UI ships)
}
```

**Why it earns its place:** this is the single most research-backed gap in the current structure. Every other tab is recognition content — read it, understand it, move on. Testing effect, generation effect, and the application-vs-recognition distinction all point to the same conclusion: retention that survives past the reading session requires either retrieving the idea yourself or acting on it, and nothing in the current 5 tabs does either. This is also the tab most directly aligned with the app's own core user story ("notes 3–5 applicable lessons"). Moving from one action to several (per this revision) is itself defensible, not just a nicer feature: a book like Atomic Habits has four distinct, independently useful mechanisms (environment design, temptation bundling, friction reduction, tracking) — collapsing them into a single action would force an arbitrary choice and throw away three perfectly good, unrelated entry points. The one constraint that keeps this from becoming a padded checklist: each action step has to map to a genuinely different mechanism, not a rephrasing of the same one.

**Worked example — Atomic Habits:**

> **Action Steps:**
> 1. Run your own Habits Scorecard: for one full day, write down every routine action you take — waking, eating, phone checks, commute, work breaks — and mark each one +, –, or = for whether it moves you toward or away from a goal you actually care about right now. Don't change anything yet, just notice.
> 2. Pick one habit you want to build and shrink it to a two-minute version (e.g. "go to the gym" becomes "put on my gym shoes"), then anchor it with habit stacking to something you already do without fail — "after I plug in my phone charger, I will put on my gym shoes."
> 3. Pick one habit you're trying to do but keep avoiding, and pair it with something you already enjoy using temptation bundling — for example, only allow yourself a favorite podcast or show while doing it.
> 4. Start a visible habit tracker (a calendar X, a checkbox app, anything you'll actually see daily) for one habit already in progress, and adopt the "never miss twice" rule as your only failure condition.
>
> **Reflection Questions:**
> - Look at the last 6 months honestly: which one habit has been shaped more by your environment — what's easy or visible around you — than by willpower or motivation? What would it take to redesign that environment instead of trying harder?
> - Clear argues identity-level change ("who I'm becoming") sticks better than outcome-level change ("what I want to achieve"). Pick a goal you have right now — what identity would make that goal's habits feel automatic instead of effortful?
> - Where are you currently in a "plateau of latent potential" — putting in consistent effort with no visible payoff yet? What's the actual evidence you're on a trajectory, versus just stuck?

### 3.3 Highlights & Quotes (changed — renamed and broadened from Quotes)

**Proposed change:** this one doesn't need a schema field addition to work — it's primarily a renaming and a curation-guidance change in `docs/CONTENT_PIPELINE.md`, from "select famous, quotable lines" to "select passages worth remembering, whether they're famous one-liners or just useful ideas stated well." The existing `Quote` object (`text`, `attribution`, `category`) already supports this.

*Optional, deeper version (only if Thai wants it):* add one new optional field per quote —

```
"quotes": [{
  "text": string,
  "attribution": string,
  "category": string,
  "note": string   // OPTIONAL, PROPOSED: one sentence on why this specific line matters —
                    // closer to Sparknotes' "important quotations explained"
}]
```

This deeper version has a real cost: applied consistently, it means writing ~20–30 one-sentence annotations per book, on top of the already-larger v2 quote workload. Recommend starting with the free version (rename + curation guidance only) and only adding `note` later if it turns out to matter in practice.

**Why it earns its place:** the current "Quotes" framing asks for famous, quotable lines — which is a *quotability* goal (would this look good shared out of context), not a *retention* goal (is this an idea worth remembering and using). Those are genuinely different selection criteria, and the real v2 data shows the tab is already unconsciously serving both without deciding which one matters more for this app.

**Worked example — Atomic Habits (using entries already in the real file, no schema change):**

Three real quotes from the existing file, read against the "quotable vs. idea-highlight" question the current framing never asks:

- *"Habits are the compound interest of self-improvement."* — **Quotable**: short, aphoristic, works as a pull-quote out of context, but doesn't by itself teach or remind you to do anything differently.
- *"Your outcomes are a lagging measure of your habits... You get what you repeat."* — **Idea-highlight**: dense and genuinely useful as a reminder to check your systems, not your results, but it's a paragraph of reasoning, not a shareable one-liner — under the old "famous quotable lines" framing this quote is arguably mis-filed.
- *"You do not rise to the level of your goals. You fall to the level of your systems."* — **Both**: the rare case that's genuinely quotable *and* a retrievable, applicable idea.

Under the current tab, all three sit in an undifferentiated list labeled "Quotes." Under "Highlights & Quotes," the label and selection guidance stop pretending they're all doing the same job — no data changes, only what the tab is honestly for.

### 3.4 Critical Take (new tab)

**Proposed schema addition:**

```
"criticalTake": {
  "points": string[],       // 3-5 bullets: known limitations, contested claims, methodological
                             // weaknesses, or credible counterarguments — specific to this book,
                             // not generic "no book is perfect" hedging
  "contextNote": string     // OPTIONAL: 1-2 sentences on how the book's claims have aged or what's
                             // changed since publication, when relevant (more relevant for older or
                             // heavily-cited books than brand-new ones)
}
```

**Why it earns its place:** this library skews heavily toward business, strategy, and personal-growth titles — genres where strong, confident claims are the norm and get absorbed uncritically far more often than they get checked. The research risk here isn't abstract: `start-with-why.json`'s summary leans on a specific neuroscience claim (why/how map to the limbic brain, what maps to the neocortex) that is a popularized simplification of contested science, and business-strategy books built around "these companies succeeded because of X" are a textbook setup for survivorship bias — Jim Collins' *Good to Great*, one of this book's closest genre neighbors, is the standard example: two of its profiled "great" companies (Circuit City, Fannie Mae) later went bankrupt, and critics have specifically flagged the book's reliance on retrospective, halo-effect-prone sourcing. Reading confident claims without ever seeing where they've been challenged is exactly the "recognition without scrutiny" failure mode a personal library this dense in one genre is most exposed to.

**Worked example — Atomic Habits:**

> - Clear's habit-loop and craving/dopamine claims draw on real behavioral psychology, but the book compresses genuinely contested, still-evolving research (including the popular "habits take 21/66 days" idea, which Clear himself pushes back on) into confident, simple rules. Treat the Four Laws as a useful heuristic framework, not settled neuroscience.
> - The book's flagship case study — Dave Brailsford and British Cycling's "marginal gains" — is a single, celebrated anecdote. Organizations that tried aggregating small optimizations without similar results don't get airtime, which is the same survivorship-bias pattern common to books built around one hero example.
> - Atomic Habits is strongest for habits that are simple, repeatable, and low-stakes (exercise, reading, tidiness). It has much less to offer for behavior entangled with trauma, addiction, complex relationships, or systemic constraints like poverty or health conditions — it's a toolkit for the habit layer of change, not a general theory of it.
> - Most of the book's supporting examples are drawn from elite athletes, successful entrepreneurs, and relatively motivated lab volunteers. Worth asking whether a specific tactic (temptation bundling, habit stacking) has evidence behind it for people without those starting advantages before assuming it transfers identically.

---

## 4. Candidate seriously considered and set aside (for now)

**One-Page Recap / Cheat Sheet — recommend against, as a tab.** The underlying mechanism it's chasing — spaced, second-pass review — is arguably the *single best-supported* technique in all the research above (Cepeda et al.'s spacing research, Readwise's entire product). But a static "recap" tab sitting inside the book entry doesn't actually deliver spacing; it just adds a more-condensed, redundant copy of Key Lessons that Thai has to remember to go back and open. The genuinely better version of this idea is a resurfacing *feature* — something that proactively re-shows a few existing `keyLessons` or highlights from already-read books at intervals, the way Readwise does — which needs no new content field at all (the data already exists) and is a UI/notification feature question, not a content-structure one. Flagging this for Thai to consider separately; recommend not solving it with a new tab here. This is the one candidate from the original brief that still doesn't earn a tab, even at 8.

**Note on Concepts & Frameworks:** Revision 1 of this proposal set this one aside too, on the reasoning that its payoff needed a large, cross-linked library to matter. On reconsideration (prompted by Thai's request for an 8th tab, which forced a harder second look rather than an arbitrary pick), that reasoning didn't hold up against the chunking research in §2 — naming and isolating a concept helps retrieval at the single-book level, immediately, not just once there's a library-wide glossary to search. It's promoted to a full tab in §3.1 on that basis, not because 7 needed to become 8.

---

## 5. Rollout cost — needs your explicit sign-off before anything changes

This section is deliberately not a recommendation to proceed — it's the two-way-door decision the project's standing rules say to surface, not resolve.

If Thai approves the tab set in §1, four schema fields get added (`conceptsFrameworks`, `applyThis`, `criticalTake`, and optionally `quotes[].note`), and every one of the following needs updating before real content work resumes:

- `docs/SCHEMA.md` — add the four field specs above to the real schema.
- `docs/CONTENT_PIPELINE.md` — add a synthesis step and validation checklist items for `conceptsFrameworks`, `applyThis`, and `criticalTake`, and update the quote-curation guidance for the Highlights & Quotes broadening.
- All **66 already-v2 books** — need `conceptsFrameworks`, `applyThis`, and `criticalTake` retrofitted (a real, non-trivial content-writing pass per book, not a documentation-only change — the same kind of effort increase the v2 migration itself already called out for quotes and author bios; three new fields per book is a larger addition than Revision 1's two).
- The **18 still-open retrofit titles** — get the new fields folded into their still-pending v2 pass, which is close to free timing-wise since that work hasn't started.
- All **310 queued new-book batch prompts** — need the new fields added to the prompt template before any of that batch work begins.

Because none of the 18-book retrofit or the 310-book pipeline has produced a single entry yet, this is the cheapest this change will ever be — every day it waits, the retrofit-vs-write-fresh math gets worse. But "cheapest possible moment" is not the same as "should definitely happen," and this is exactly the kind of structural, hard-to-reverse-later call this project's rules say goes to Thai, not gets decided in the background.

**Nothing — not `SCHEMA.md`, not `CONTENT_PIPELINE.md`, not the 310 batch prompts — gets touched until Thai confirms which parts of §1's verdict he wants to move forward with.**
