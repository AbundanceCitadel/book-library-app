# Roadmap — Personal Book Library & Summary App

Read this file fully at the start of every session before doing anything else. Update status/notes at the end of every session.

Legend: **Not Started** / **In Progress** / **Done** / **Blocked**

---

### Stage 0 — Discovery & Planning
**Status:** Done — 2026-07-24
Finalized category taxonomy (12 categories, language as filter), confirmed JSON-only data schema approach, created project folder `book-library-app/`, wrote `PROJECT_BRIEF.md`, `ROADMAP.md`, `DECISIONS.md`.

### Stage 1 — Data Schema & Content Template
**Status:** Done — 2026-07-24
Defined full JSON structure for a book entry in `docs/SCHEMA.md`. Built one fully worked example book (`content/books/atomic-habits.json`) as the reference template, using original synthesis per the copyright policy.

### Stage 2 — Project Scaffold
**Status:** Done (local) / Deploy in progress — 2026-07-24
Next.js 14 App Router project scaffolded (TypeScript, Tailwind). Verified working end-to-end: `npm run build` produces 17 static pages with no errors, `npm start` correctly serves the homepage, category pages, and the Atomic Habits book detail page. ESLint deferred (see `DECISIONS.md` #8) — easy add-back later.
Git repo re-initialized in Session 3 after the previous `.git` became permanently corrupted (see `DECISIONS.md` #28, #31, #43). Pushed to `github.com/AbundanceCitadel/book-library-app` (`main` branch) — repo made **public** (Thai's call, see `DECISIONS.md` #42) to unblock a Vercel Hobby-plan restriction on private-repo collaborators. **Deploy verified live** at `book-library-app-abundance-citadel.vercel.app` — clean build, 18 static pages, confirmed via the Vercel connector's build logs.
**Deploy blocker fully resolved.**

### Stage 3 — Design System
**Status:** Done — 2026-07-24
Typography (sans UI / serif reading content), warm amber accent palette, 3-state dark/light/system mode with no-flash script, mobile-first layout rules (container widths, 44px touch targets, safe-area padding). Documented in `docs/DESIGN_SYSTEM.md`.

### Stage 4 — Core UI Build
**Status:** Done — 2026-07-24
Home page (category grid + book card list), category page (book card grid), book detail page (all content sections with reading-optimized typography) — all rebuilt on shared components (`Header`, `ThemeToggle`, `CategoryCard`, `BookCard`, `Badge`) in `app/components/`. Verified against the one real book entry (Atomic Habits) and empty-category states.

### Stage 5 — PWA Installability
**Status:** Done (build-verified) / Needs a manual on-device check once deployed — 2026-07-24
Generated brand-consistent app icons (192/512/maskable/apple-touch/favicon), `public/manifest.json`, hand-written `public/sw.js` (network-first pages + cache-first static assets, no Workbox/next-pwa dependency), `/offline` fallback page, iOS meta tags. Verified via build + curl: manifest/icons/sw.js all serve correctly, 18 static pages build clean. Actual "Add to Home Screen" / offline behavior needs a real phone hitting the deployed HTTPS URL — can't be verified from this sandbox (see `DECISIONS.md` #27). Revisit once Vercel deploy is unblocked.

### Stage 6 — Content Pipeline
**Status:** Done — 2026-07-24
Documented the repeatable process for turning a book into a full entry in `docs/CONTENT_PIPELINE.md`: slug/file conventions, metadata pass, the non-negotiable original-synthesis requirements per book field (summary, sections, key lessons, quotes, etc.), a pre-commit validation checklist, and the Stage 7+ batch workflow (10–20 books per commit).

### Stage 7 — Pilot Batch (10–20 books) → Ongoing Content Batches
**Status:** In Progress — 2026-07-24
Real book source established and fully cataloged/sorted across BOTH of Thai's bookcases (living room + study room), 12 photos total. `docs/HOME_BOOKCASE_CATALOG.xlsx` now holds 409 books with "All Books" (flat/sortable), "By Section" (grouped by category, mirrors planned app category pages), "By Bookcase" (grouped by physical location), and "Summary" (counts incl. grand total) sheets.

**Session 5 update:** Thai had not yet reviewed/corrected the catalog when asked directly, but told Claude to proceed anyway rather than wait. To manage the risk the review pass was meant to catch, the pilot batch was selected only from rows with no "verify" flag, no duplicate-copy ambiguity, and no wine/mortgage category-question tag — see `DECISIONS.md` #61. 15 books written as full entries (16 total in `content/books/` including the existing Atomic Habits), spanning 5 categories: Business, Business Strategy, Personal Growth, Philosophy & Psychology, Finance & Investing. All entries validated against `docs/SCHEMA.md` (word counts, category values, section ordering, lesson/quote counts) and confirmed with a clean `npm run build` (33 static pages, all new books and category pages render). Batch:
- Business: The Lean Startup, The Hard Thing About Hard Things, Never Eat Alone
- Business Strategy: Good to Great, Start With Why, Zero to One
- Personal Growth: Mindset, Essentialism, Never Split the Difference
- Philosophy & Psychology: Thinking, Fast and Slow, Man's Search for Meaning, The Art of War
- Finance & Investing: The Intelligent Investor, Same As Ever, The Little Book of Common Sense Investing

Still not committed to git as of this update — see Session 5 log for the git-state issue this session hit and how it was resolved (repo re-cloned from the public GitHub remote; a push still needs a PAT from Thai). The full catalog (394 remaining books, plus the ~55 flagged/ambiguous/duplicate ones) is still awaiting Thai's review pass — that hasn't been skipped, just decoupled from this pilot batch.

**Session 6 update:** Full catalog cleanup pass completed per `docs/SESSION_6_CONTINUATION_PROMPT.md` (Thai's explicit direction from Session 5, not judgment calls) — see `DECISIONS.md` #66–74 for the full rationale. Deduplicated 409 rows to 376 unique titles (33 rows collapsed via exact-title, normalized-title, and fuzzy-match passes). Verified 34 flagged/ambiguous titles via web search and corrected the catalog in place. Taxonomy expanded from 12 to 16 categories: split Business into Business/Marketing/Sales (re-sorting the original 92 Business books by actual subject), added dedicated Thich Nhat Hanh (21 titles) and Wine (4 titles) categories, added a `mortgage` tag for Finance & Investing books instead of a new category. Regenerated `docs/HOME_BOOKCASE_CATALOG.xlsx` and `docs/HOME_BOOKCASE_CATALOG_review.docx` against the corrected, deduped, re-categorized data. Updated `docs/SCHEMA.md`, `PROJECT_BRIEF.md` §4, `docs/DESIGN_SYSTEM.md`, and `lib/books.ts` (`CATEGORY_LABELS`/`CATEGORY_ICONS`) for the new taxonomy — checked all 16 existing book entries against it, none needed reassignment. Added a "library scale" feature (`DECISIONS.md` #72): `content/catalog.json` (the full 376-title catalog, metadata only) plus a home-page stats strip and per-category "not yet summarized" lists, so the app reflects the real size of Thai's library (376 titles, 32 with full summaries) rather than only what's been written so far. Wrote a second content batch of 16 books spanning the new taxonomy (3 Business, 2 Marketing, 1 Sales, 1 Business Strategy, 2 Personal Growth, 3 Finance & Investing, 3 Thich Nhat Hanh, 1 Wine) — all validated against `docs/SCHEMA.md` and confirmed via a clean `npm run build` (53 static pages). Library now stands at 32 full entries across 9 of 16 categories. Batch:
- Business: The E-Myth Revisited, Traction, Delivering Happiness
- Marketing: All Marketers Are Liars, Building a StoryBrand
- Sales: Way of the Wolf
- Business Strategy: Built to Last
- Personal Growth: How to Win Friends and Influence People, The One Thing
- Finance & Investing: One Up on Wall Street, The Millionaire Next Door, Think and Grow Rich
- Thich Nhat Hanh: Peace Is Every Step, The Miracle of Mindfulness, How to Love
- Wine: Wine Folly: Magnum Edition

Still awaiting a git commit/push this session — see the Session 6 log entry below for the plan (same `/tmp` mirror workaround as prior sessions). Full catalog now stands corrected at 376 unique titles with 32 written; 344 titles remain for future Stage 7/10 batches.

### Stage 8 — Search & Filtering
**Status:** Not Started
Search by title/author, filters by category/language/tags.

### Stage 9 — Bilingual Support
**Status:** Not Started
Handle Vietnamese-language titles/content.

### Stage 10 — Bulk Content Expansion
**Status:** Not Started
Scale to full catalogue, category by category.

### Stage 11 — Personalization
**Status:** Not Started
Favorites/bookmarks, read status, personal notes field (schema already supports this — Stage 0 decision #4).

### Stage 12 — Polish & QA
**Status:** Not Started
Cross-device testing, performance pass, accessibility check.

### Stage 13 — Launch
**Status:** Not Started
Final deploy, custom domain (if desired), backup/export strategy.

### Stage 14 — Ongoing Maintenance
**Status:** Not Started
Document process for Thai to request new books going forward.

---

## Session Log

**2026-07-24 — Session 6:** Executed the full catalog cleanup handoff from `docs/SESSION_6_CONTINUATION_PROMPT.md` in one session per the "no stopping between stages unless genuinely blocked" rule: deduped the 409-row catalog to 376 unique titles, verified 34 ambiguous/flagged titles via web search, split Business into Business/Marketing/Sales and added Thich Nhat Hanh (21 titles) and Wine (4 titles) as dedicated categories, regenerated both catalog deliverables (`.xlsx` and `.docx`), updated all app taxonomy code and docs, added a library-scale stats feature to the home and category pages backed by a new `content/catalog.json`, and wrote a second 16-book content batch spanning every new category. Full rationale for every judgment call in `DECISIONS.md` #66–74. `npm run build` verified clean at 53 static pages (32 books × detail pages + 16 category pages + home/offline/not-found). Not yet committed to git — next step is the same `/tmp`-mirror commit workaround from decisions #31/#43/#62/#63 (this sandbox's `.git` lock bug is expected to still be present), followed by a push once Thai supplies a PAT (same standing limitation as decisions #38/#62, no GitHub connector exists in Cowork). Full catalog now has 344 titles remaining for future batches — no longer avoiding any of them for "unverified" reasons, per Thai's direction.

**2026-07-24 — Session 5 (continued):** Generated `docs/HOME_BOOKCASE_CATALOG_review.docx` (landscape, by-section, verify-flagged rows shaded amber, pilot batch shaded green) since Thai couldn't easily review the spreadsheet. Thai then gave explicit direction on every open catalog question instead of a manual review pass — dedupe to one row per title, add Wine and Thich Nhat Hanh as dedicated categories, split Business into Business/Marketing/Sales, verify ambiguous titles via internet search, and surface the library's real scale (title counts) in the app. Since the chat had gotten long, wrote this up as a self-contained handoff (`docs/SESSION_6_CONTINUATION_PROMPT.md`) for a fresh session to execute rather than starting the cleanup here — see `DECISIONS.md` #64–65. Next session should read that file first.

**2026-07-24 — Session 5:** Asked Thai directly whether he'd reviewed/corrected `HOME_BOOKCASE_CATALOG.xlsx` per the standing instruction to stop and wait if not — he said he hadn't, but told Claude to proceed anyway. Picked a 15-book pilot batch restricted to rows with no "verify" flag, no duplicate-copy ambiguity, and no wine/mortgage category tag (see `DECISIONS.md` #61), spanning 5 categories. Wrote full JSON entries for all 15 (original synthesis per the copyright policy), validated against `docs/SCHEMA.md` programmatically (word counts, category values, section ordering, lesson/quote counts — all pass) and via a clean `npm run build` (33 static pages). Hit a new git-state problem: this session's sandbox mount showed no `.git` directory at all in the synced project folder (not even a corrupted one, per prior sessions' `index.lock` saga — just absent). Resolved by cloning fresh from the public GitHub remote (`github.com/AbundanceCitadel/book-library-app`, no auth needed for a public-repo read), copying the new content in, and committing there — see `DECISIONS.md` #62. Commit is local to that `/tmp` clone as of this session; **pushing still needs a PAT from Thai** (same standing limitation as decision #38, no GitHub connector exists in Cowork). Full catalog review (394 remaining books) is still Thai's open task, unchanged by this session.

**2026-07-24 — Session 1:** Stages 0, 1, 2 (local scaffold only). See full summary at end of chat. Continuation prompt provided for Stage 3–4.

**2026-07-24 — Session 2:** Stages 3, 4, 5. Design system defined and implemented (typography, color, dark/light mode, mobile-first layout — `docs/DESIGN_SYSTEM.md`); home/category/book pages rebuilt on new shared components. Bumped `next` 14.2.5 → 14.2.35 (security patch, same major). PWA installability added: generated icons, manifest, hand-written service worker, offline fallback page. `npm run build` verified clean (18 static pages), spot-checked rendered output and PWA assets via curl. Not yet pushed/deployed — still blocked on GitHub/Vercel accounts (unchanged from Stage 2); also couldn't commit locally this session due to a stale `.git/index.lock` (see `DECISIONS.md` #21). Next up: Stage 6 (Content Pipeline) — or Stages 7+ content batches once GitHub/Vercel are connected, whichever Thai prefers.

**Blocked, carried into Session 3:** the entire local `.git` directory in the synced project folder has become undeletable from the sandbox — not just `index.lock`, every file under `.git/` (index, HEAD, refs, objects, hooks) now fails to delete with `Operation not permitted`, even via `rm -rf`. This blocks any commit. See `DECISIONS.md` #28 — needs Thai to manually delete the `.git` folder via Windows File Explorer (outside the sandbox) before the next session can commit/push. Thai also reported connecting GitHub + Vercel and creating a `book-library-app` project, but as of this session's tool list, the Vercel connector still shows not-connected and there is no GitHub connector available in Cowork at all — needs re-verification in a fresh session (new sessions pick up newly connected MCPs; this one was already running).

**2026-07-24 — Session 4:** Thai shared 3 photos of his actual home bookcase (`my library at home/533-535.heic`). Cropped each full-resolution (6120×8160) photo into 9 tiles and read every readable spine — ~220 distinct titles identified (mostly business/self-help/investing, heavy Thich Nhat Hanh and classical-Chinese-philosophy sections, plus a large Vietnamese-language contingent). Compiled into `docs/HOME_BOOKCASE_CATALOG.xlsx` (Book Catalog / Summary / Notes sheets), mapped to the existing 12-category taxonomy, flagged 18 titles (incl. already-built Atomic Habits) as the Stage 7 pilot batch. Bottom shelf wasn't visible in any of the 3 photos — not captured. Several Vietnamese spines are marked "verify" where text was small/stylized. **Needs Thai's input:** review the catalog and confirm/correct before Stage 7 content-writing begins (see "Needs Your Input" below).

**2026-07-24 — Session 3:** Deploy blocker resolved without needing another manual round-trip from Thai — found a workaround (build git commits in `/tmp`, copy `.git` back via `mv`+`tar`) for the same stale-lock bug from decision #28, which turned out to still be present and in fact reproduces on every commit attempted directly in the synced folder. See `DECISIONS.md` #31–35 for the full diagnosis and the repeatable process. Two clean commits now exist locally: initial Stage 0–5 snapshot (`dcffba5`) and Stage 6 content pipeline docs (`9ca4519`, pending one more commit for this session's ROADMAP/DECISIONS updates). Vercel MCP connector confirmed live and working; `book-library-app` project confirmed created (no repo linked yet, no deployments — expected). No GitHub connector exists in Cowork, so pushing needs a fine-grained PAT from Thai — asked for at the end of this session. Stage 6 (Content Pipeline) completed: `docs/CONTENT_PIPELINE.md` documents the full process for turning a book into a validated entry. **Update, same session:** Vercel auto-linked to GitHub on the first push (no manual connect step needed) but every deploy came back `BLOCKED` — root cause turned out to be a Vercel Hobby-plan restriction: private-repo deploys are blocked unless the commit author is the team owner (no collaborator seats without Pro). Thai chose to make the repo public rather than upgrade or juggle GitHub identities (see `DECISIONS.md` #42) — confirmed this fully unblocks it, no plan change needed. Deploy is live and verified via the Vercel connector's build logs (clean build, 18 static pages). **Deploy blocker fully resolved — next up: Stage 7 (pilot batch of 10–20 books).**
