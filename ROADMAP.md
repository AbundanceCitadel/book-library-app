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
Git repo re-initialized in Session 3 with one clean commit (35 files, Stages 0–5) after the previous `.git` became permanently corrupted (see `DECISIONS.md` #28, #31). Vercel connector confirmed live, `book-library-app` project confirmed created (see `DECISIONS.md` #33).
**Still open:** push to GitHub (needs a fine-grained PAT from Thai — see session summary), then link the Vercel project to the GitHub repo (one manual step on vercel.com).

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
**Status:** Not Started
Document the repeatable process for turning a book into a full entry, following the copyright policy.

### Stage 7 — Pilot Batch (10–20 books)
**Status:** Not Started
Populate real books across 2–3 categories to validate template + UI end-to-end.

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

**2026-07-24 — Session 1:** Stages 0, 1, 2 (local scaffold only). See full summary at end of chat. Continuation prompt provided for Stage 3–4.

**2026-07-24 — Session 2:** Stages 3, 4, 5. Design system defined and implemented (typography, color, dark/light mode, mobile-first layout — `docs/DESIGN_SYSTEM.md`); home/category/book pages rebuilt on new shared components. Bumped `next` 14.2.5 → 14.2.35 (security patch, same major). PWA installability added: generated icons, manifest, hand-written service worker, offline fallback page. `npm run build` verified clean (18 static pages), spot-checked rendered output and PWA assets via curl. Not yet pushed/deployed — still blocked on GitHub/Vercel accounts (unchanged from Stage 2); also couldn't commit locally this session due to a stale `.git/index.lock` (see `DECISIONS.md` #21). Next up: Stage 6 (Content Pipeline) — or Stages 7+ content batches once GitHub/Vercel are connected, whichever Thai prefers.

**Blocked, carried into Session 3:** the entire local `.git` directory in the synced project folder has become undeletable from the sandbox — not just `index.lock`, every file under `.git/` (index, HEAD, refs, objects, hooks) now fails to delete with `Operation not permitted`, even via `rm -rf`. This blocks any commit. See `DECISIONS.md` #28 — needs Thai to manually delete the `.git` folder via Windows File Explorer (outside the sandbox) before the next session can commit/push. Thai also reported connecting GitHub + Vercel and creating a `book-library-app` project, but as of this session's tool list, the Vercel connector still shows not-connected and there is no GitHub connector available in Cowork at all — needs re-verification in a fresh session (new sessions pick up newly connected MCPs; this one was already running).
