# Session 20 Continuation Prompt — Personal Book Library App

Continue the personal book library app project. Before doing anything else, read these three files in full:
`PROJECT_BRIEF.md`, `ROADMAP.md`, `DECISIONS.md` (paths below — see §1 on locating them). They explain the whole project and exactly what's been done so far. Pay particular attention to the Stage 16 / 8-Tab Content Structure Rollout entries in `ROADMAP.md` (dated 2026-07-31) and `DECISIONS.md` #168–176.

## 0. Why this prompt exists — read this first

Two things shipped in the same recent session and are both live in production right now:

1. **Stage 16 — Premium Visual Redesign.** Sliding active-tab pill, tab-panel transitions, an elevation/motion system, generative cover gradients. Fully built and deployed.
2. **The "8-Tab Content Structure Rollout" (v2.1) — schema and content only, NOT the UI.** `docs/CONTENT_STRUCTURE_PROPOSAL.md` (Revision 2) was approved: the book detail page should have 8 tabs, not 5. Three new fields were added to the data schema (`conceptsFrameworks`, `applyThis`, `criticalTake`), `lib/books.ts` got matching TypeScript types, and content retrofits have started writing real data into these fields for some books. **But `app/components/BookTabs.tsx` was never updated to render three new tabs for that data.** There's an explicit code comment in that file (lines ~17–23) confirming this was a deliberate scope cut, not an oversight:

   > "The three other approved new tabs (Concepts & Frameworks, Apply This, Critical Take) are NOT built here yet — this rollout's scope was schema/pipeline/content, not the UI build... Building the 3 new tabs is a separate follow-up session."

Net effect: Thai (the project owner) looked at the live site expecting 8 tabs and saw 5 — because that's exactly what's actually deployed. Nothing is broken or mis-deployed. **This session's job is to close that gap: build the 3 missing tabs so the app actually has 8.**

## 1. Environment note — read before anything else

This prompt may be running in a different account/sandbox than the one that did the redesign and schema work, so don't assume the exact same local setup.

- Check whether a local folder for this project is already connected/mounted. If so, verify it's the right one by opening `PROJECT_BRIEF.md` and confirming it says "Owner: Thai (metacitadel@gmail.com)."
- **Don't hard-code a specific local path.** The project's on-disk location has moved at least once already (it now lives under a folder literally named "1. ABUNDANCE CITADEL" / "2. BOOKS LIBRARY" — earlier docs in this repo still say "1. BOOKS LIBRARY" in a couple of places, which is stale, not a sign you're in the wrong place). If no local folder is connected, or you can't find `book-library-app/` in it, clone fresh from GitHub instead — it's a public repo, no auth needed for a read-only clone:
  ```
  git clone https://github.com/AbundanceCitadel/book-library-app.git
  ```
- Either way, once you have the repo: `git fetch origin main`, then compare `git rev-parse HEAD` vs `git rev-parse origin/main` before trusting anything else about git state — don't trust `git status`'s summary line alone (it has repeatedly misreported state in past sessions — see the standing mechanics note in §6). `origin/main` should be at or past commit `98a4245` ("Log deploy: Stage 16 redesign + v2.1 rollout pushed live") as of this writing.
- Thai will very likely need to supply a fresh **classic** GitHub PAT (not fine-grained — fine-grained tokens have failed with 403 in every prior session) when you're ready to push. Ask for it if it wasn't included with this prompt. Never write it to disk or commit it.

## 2. Read these before writing any code

- `app/components/BookTabs.tsx` — the exact file you're changing. Read it in full, including the code comment at the top explaining what's already done and what isn't.
- `lib/books.ts` — has the `ConceptFramework`, `ApplyThis`, `CriticalTake` TypeScript types already defined (search for them), plus the optional fields on `Book`. Nothing here needs to change; this is your data contract.
- `docs/SCHEMA.md` — the `ConceptFramework` / `ApplyThis` / `CriticalTake` object specs (field-by-field), under "Field Reference."
- `docs/CONTENT_STRUCTURE_PROPOSAL.md` — the full rationale and **worked examples** (using Atomic Habits) for exactly what each new tab should contain and why. This is the design brief; treat §1 (tab order) and §3 (per-tab content/rationale) as close to normative.
- `docs/DESIGN_SYSTEM.md` — the Stage 16 "Design System v3" section: elevation scale (`--shadow-sm/md/lg`), motion system (`--ease-premium`, `--duration-fast/base/slow`), typography scale, and "Quotes get special treatment" as the precedent for how a tab can get bespoke visual treatment within the shared system. Match this, don't invent a new visual language.
- `content/books/atomic-habits.json` — has real, populated `conceptsFrameworks`/`applyThis`/`criticalTake` data you can render against immediately. As of this writing, 7 books have this data: `atomic-habits`, `start-with-why`, `advanced-selling-strategies`, `all-marketers-are-liars`, `being-peace`, `buffett-the-making-of-an-american-capitalist`, `building-a-storybrand`. Re-verify this list — the parallel content-retrofit track may have added more by the time you run this.

## 3. The task: build the 3 missing tabs

**Target tab order (8 tabs total), per `docs/CONTENT_STRUCTURE_PROPOSAL.md` §1:**

1. Summary (unchanged)
2. Chapters (unchanged)
3. Key Lessons (unchanged)
4. **Concepts & Frameworks (new)**
5. **Apply This (new)**
6. Highlights & Quotes (unchanged — already renamed)
7. **Critical Take (new)**
8. Author (unchanged)

Update the `TABS` array in `BookTabs.tsx` to this order and add the 3 new entries, then add a corresponding render block for each new `active === "..."` case, following the existing pattern used for `summary`/`lessons`/`author`.

**Concepts & Frameworks tab** — renders `book.conceptsFrameworks` (array of `{ name, definition, sourceSection? }`). Each entry as its own card/block: `name` as a heading, `definition` as body text, `sourceSection` (when present) as a small label — consider making it a real jump-back link to the Chapters tab using the existing `selectTab()` function (nice-to-have, not required). 3–6 entries per book typically.

**Apply This tab** — renders `book.applyThis` (`{ actionSteps: string[], reflectionQuestions: string[] }`). Two clearly distinct sub-sections: Action Steps (visually consistent with the existing Key Lessons tab's checkmark-bullet treatment, but numbered/sequential since these are meant to be done one at a time) and Reflection Questions (a visually distinct sub-heading — these are prompts, not statements, so don't style them identically to the action steps).

**Critical Take tab** — renders `book.criticalTake` (`{ points: string[], contextNote?: string }`). `points` as a bulleted list, `contextNote` (when present) as a short callout at the end. Pick a treatment that reads as "a different, considered perspective," not as a warning or error state — this app already uses gold for its primary accent and teal for secondary/link-style elements (see Related Books links); teal or a similar cooler tone is a reasonable fit here, but use your own judgment against the existing palette in `docs/DESIGN_SYSTEM.md` rather than introducing a new color.

**Backward compatibility — this is important, most books don't have this data yet.** All three fields are optional on `Book` (`conceptsFrameworks?`, `applyThis?`, `criticalTake?`). Only 7 of 48 v2 books have them as of this writing; the other 41 v2 books, the 18 pre-v2 books, and the entire 310-book new-content pipeline don't. **Follow the exact precedent already established by the Author tab's fallback** (see the `book.authorBio ? ... : (...)` block already in `BookTabs.tsx`): always show the tab in the tab bar, and when the field is missing, render a plain fallback message in the same style (`className="text-sm text-muted"`), e.g. "Concepts & Frameworks not written yet for this entry — part of the ongoing v2.1 content rollout, see `ROADMAP.md` for retrofit status." Do the same for all three new tabs individually — a book could plausibly have some of the three fields populated and not others, so don't assume they're all-or-nothing (though in practice all 7 current examples have all three).

**Tab bar mechanics — test this, don't assume it.** The sliding-pill measurement code (`tabRefs`, `pillStyle`, the `useLayoutEffect`) is already generic over the `TABS` array and should work unmodified for 8 tabs. But the new labels are longer than the old ones ("Concepts & Frameworks" is the longest label in the bar by a wide margin) and the sticky tab bar has a hard existing requirement (per its own code comment) that it "never wraps to two rows" on mobile — it relies on `overflow-x-auto` horizontal scroll instead. Actually test this at a narrow viewport (~375px) before considering the tab bar done, not just at desktop width.

**Scope boundary.** This is a UI-only session — don't write new content into any `content/books/*.json` file. Content retrofit (writing `conceptsFrameworks`/`applyThis`/`criticalTake` for more books) is a separate, ongoing track (Stage 15 in `ROADMAP.md`) that may have its own uncommitted work sitting in the working tree when you start — check `git status` first and leave any `content/books/*.json` changes you didn't make yourself untouched, per the established pattern from the Stage 16 redesign session (`DECISIONS.md` #161, #173).

## 4. Validate before committing

- `npx tsc --noEmit` — must be clean.
- `npm run build` — use the established `/tmp`-mirror workaround if you hit the sandbox's Google Fonts network block: mirror the repo to a fresh `/tmp` directory, stub the two `next/font/google` calls in `app/layout.tsx` **in that scratch copy only**, build there, then `git checkout -- app/layout.tsx` (or just don't commit the stub) so the real source is never touched. See `DECISIONS.md` #174 for the exact process if `/tmp` needs a fresh, never-used directory name due to leftover files from a different sandbox user.
- Spot-check the generated static HTML for **two** book pages: one with v2.1 data (`atomic-habits`) — confirm all 3 new tabs' real content appears in the output — and one without it (any pre-v2 or not-yet-retrofitted book) — confirm the fallback message renders cleanly with no crash, no `undefined` leaking into the markup.
- If Chrome browser tools or a screenshot capability are available this session, do a real visual check of the 8-tab bar at both mobile and desktop width — confirm the sliding pill still measures correctly on all 8 positions and the bar doesn't wrap. If that capability isn't available this session, say so explicitly in your summary rather than silently skipping it (per the precedent set in Session 11 — see `DECISIONS.md` #109–120 and `ROADMAP.md`'s Session 11 log entry).

## 5. Update ROADMAP.md / DECISIONS.md and commit

- Update the Stage 16 section (or add a new dated entry under it) in `ROADMAP.md` marking the 3-tab UI build complete, and add a Session Log entry describing what was built.
- Log any real judgment calls (visual treatment choices, jump-link decision, fallback copy wording, anything not explicitly prescribed above) in `DECISIONS.md` with the next sequential number — check the current file for the actual next number before assuming; it was #176 as of this writing but may have moved.
- Commit and push per the mechanics in §6 below.

## 6. Standing project mechanics (read before touching git)

- This sandbox's local git history can silently diverge from the real GitHub `main`, and the synced folder's `.git` has a recurring stale `index.lock` that blocks direct `git commit` (intermittent, not fixed — has recurred across many sessions). Try a direct commit/push first; if it fails, use the `/tmp`-clone-and-rsync pattern from `DECISIONS.md` #174, which has now proven reliable twice in a row: fresh `git clone` of `origin/main` into a scratch `/tmp` directory, `rsync -a --delete` (excluding `.git`/`node_modules`/`.next`) your actual working-tree changes on top, build-verify in that clone, commit and push from there.
- Push authentication: use a classic GitHub PAT supplied inline, never persisted:
  ```
  git push "https://<PAT>@github.com/AbundanceCitadel/book-library-app.git" main
  ```
  If it's expired or rejected with a 403, ask Thai for a fresh classic token rather than debugging further — fine-grained tokens have consistently failed 403 across every session.
- After a push, verify with `git ls-remote origin main` (or the unauthenticated `git ls-remote https://github.com/AbundanceCitadel/book-library-app.git main`) compared to your local `git rev-parse HEAD` — not local `git status`, which has repeatedly misreported sync state. Cross-check against the Vercel connector's `list_deployments`/`get_deployment`: the latest deployment's `meta.githubCommitSha` should match your pushed commit, `target` should be `production`, and its alias list should include `library.abundancecitadel.app`.
- After deploy, verify by **fetching the live URL directly**, not just trusting the Vercel API's `READY` status — confirm a book page with populated v2.1 data (e.g. `/book/atomic-habits`) actually shows the 3 new tabs in its rendered output.
- Vercel: project `prj_Ffqa5Al9DmYUM6R55pinzrUqhauk`, team `team_kX9yMR3zOn2rwRiu1Xkr1gXO`. Live site: `https://library.abundancecitadel.app`, with `.vercel.app` fallbacks if the custom domain fetch times out (an intermittent DNS/cert issue noted in multiple past sessions, not a deploy problem).
- Google Fonts (`next/font/google`, Inter + Literata) can't be fetched from this sandbox — verify via the stubbed `/tmp` build or Vercel's own build log, not a direct sandbox build of the real source.

## 7. Standing instruction from Thai

At the end of this session, write the next session's continuation prompt (this file's pattern) as both a committed doc (`docs/SESSION_21_CONTINUATION_PROMPT.md`, without any PAT) and as full text in the chat response (with a freshly-supplied PAT included) so Thai can paste it directly into a new chat to keep the project moving with minimal friction.
