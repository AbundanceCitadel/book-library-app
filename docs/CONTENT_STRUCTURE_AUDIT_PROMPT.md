# Content Structure Stress-Test — Personal Book Library App

**Where to run this:** a new Cowork session with folder access to the `2. BOOKS LIBRARY` folder (same setup as the redesign session running in parallel). It needs to read real project docs and real book files to ground its analysis in something concrete, not abstract guessing.

## 0. Read first

Read in full: `book-library-app/PROJECT_BRIEF.md`, `book-library-app/docs/SCHEMA.md`, `book-library-app/docs/CONTENT_PIPELINE.md`. Then read three real, already-written v2 book entries as concrete grounding — `content/books/atomic-habits.json`, `content/books/start-with-why.json`, `content/books/security-analysis.json` (deliberately different types: personal-growth/habits, business-strategy, technical/investing) — so every judgment below is checked against real content, not a hypothetical.

## 1. What this session is for — analysis and a recommendation only

**Do not modify `docs/SCHEMA.md`, `docs/CONTENT_PIPELINE.md`, any app code, or any book content.** This is a stress-test and proposal pass, nothing gets implemented yet. A separate session is doing a visual redesign in parallel right now — don't touch any component/CSS files, and don't assume anything about that session's output. Deliverable is a written document Thai reviews before anything changes.

Timing note: neither the 18-book retrofit nor the 310-book new-content pipeline has actually started producing content yet — this is deliberately happening first, while the cost of changing structure is still zero. Say this plainly in your summary so Thai knows why the sequencing matters.

## 2. The actual question

The app currently has 5 tabs per book: **Summary, Chapters, Key Lessons, Quotes, Author**. The entire point of this app is for Thai to *learn and retain* a book's real lessons and ideas without reading the whole thing — not just skim a plot summary. Stress-test whether 5 tabs actually accomplishes that, as rigorously as a professional in reading comprehension / knowledge retention would. Thai is open to 1–2 more tabs (6–7 total) if genuinely justified by the goal — he is **not** attached to a specific number, and doesn't want tabs added just to add them either. Weak or redundant tabs are worse than no tab.

## 3. Research phase — ground this in real practice, not vibes

- **Learning-retention principles**: active recall, spaced repetition, the difference between recognition (reading a lesson) and application (actually using it) — what does the research say meaningfully improves whether someone retains and applies what they read, versus what just feels thorough?
- **Comparable premium knowledge products**: Blinkist (already partly referenced in this project), Shortform, getAbstract, Farnam Street's book write-ups, Founders podcast-style notes, Readwise/highlight-first philosophy, and classic study-guide structures (Sparknotes/CliffsNotes) for what they include that this app currently doesn't, and why.
- Note explicitly which of the *current* 5 tabs are well-supported by this research and which might be weaker than they look.

## 4. Specific candidates to seriously weigh (not a checklist to rubber-stamp)

Evaluate each on its actual merit for *this app's specific goal* (retention + application, one person, spare-minute reading) — recommend for or against each with reasoning, don't default to "yes, add more":

- **Practical Application / How to Apply This** — concrete action steps or an implementation prompt per book. Turns passive reading into doing, which is usually where retention actually happens.
- **Concepts & Frameworks** — a standalone glossary of the book's named models/frameworks (e.g. Atomic Habits' "habit loop," Start With Why's "Golden Circle"), reusable as a cross-book reference over time as the library grows.
- **Critical Take / Counterpoints** — the book's real limitations, known critiques, or how well its claims have aged. Avoids one-sided absorption — arguably important for a library this heavy in business/self-help, where strong claims often go unchallenged.
- **One-Page Recap / Cheat Sheet** — an ultra-condensed version for a *second* pass once Thai has already read the full entry once, built for spaced re-review rather than first-read comprehension.
- **Reflection Questions** — a small set of prompts aimed at active recall / personal application, rather than passive information.
- Also explicitly weigh: should **Quotes** stay a pure "famous, quotable lines" tab, or broaden into **Highlights & Quotes** — genuinely useful passages/ideas worth remembering even if they're not a famous quotable line? These serve different goals (quotability vs. retention) and the current tab may be quietly serving the wrong one for this app's actual purpose.

Feel free to surface a genuinely better idea not listed here if the research points that way — this list is a floor, not a ceiling.

## 5. Deliverable

Write a proposal document (save it as `docs/CONTENT_STRUCTURE_PROPOSAL.md`) containing:

1. **Verdict** — keep the current 5, or the exact recommended tab set (names + one-line purpose each), stated plainly up front.
2. **For each new or changed tab**: what data fields it would need (schema-shaped, clearly marked "proposed, not yet implemented" — don't touch the real schema file), and why it earns its place against the research in step 3.
3. **A fully worked mini-example** of every new/changed tab's actual content, written out for **one real already-written book** (pick whichever of the three read in step 0 fits best) — Thai needs to be able to read it and judge for himself, not take it on faith.
4. **Rollout cost, stated explicitly**: any schema addition means updating all 66 already-v2 books, the 18 still-open retrofit titles, and all 310 queued new-book batch prompts before real content work resumes. Since nothing has started yet, this is the cheapest possible moment to make this change — say so, and ask Thai to confirm before anything (schema, pipeline docs, the 31 batch prompts) actually gets updated. Don't decide this silently — it's exactly the kind of two-way-door call this project's standing rules say to surface, not resolve.

## 6. End of session

Report back with the proposal doc's location and a short plain-language summary of the verdict and why. Wait for Thai's decision — no schema, pipeline, or prompt-file changes happen until he signs off.
