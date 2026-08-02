# Continuation Prompt — Nine-Section Population Pass

Continue the personal library app project (`book-library-app`,
`github.com/AbundanceCitadel/book-library-app`). Before doing anything else,
read `PROJECT_BRIEF.md`, `ROADMAP.md` (particularly Stage 21), `DECISIONS.md`
(particularly #213-227), `docs/DESIGN_SYSTEM.md` ("Design System v6"), and
`docs/SCHEMA_SECTIONS.md` in full, per the project's standing rule.

## 0. Why this session exists

Session 24 (Stage 21, "Nine-Section Design Foundation") built the
architecture, color system, and homepage restructure for expanding this app
from a single-purpose book library into a nine-section personal knowledge
library — but deliberately scoped itself to **foundation only**, per its own
brief. It shipped:

- A full color-system flip to light-first (`docs/DESIGN_SYSTEM.md` v6) —
  this part is complete, not scaffolding.
- The reusable architecture every new section is built on: `lib/content.ts`,
  8 `lib/<section>.ts` + `lib/<section>Categories.ts` pairs,
  `DetailTabs.tsx`, `RelatedLinks.tsx`, `SectionEntryCard.tsx`,
  `SectionTile.tsx`, `NavDrawer.tsx` — all reusable, all complete.
- The new homepage hub (`app/page.tsx`) and 8 new section route trees
  (`app/people/`, `app/richlist/`, `app/quotes/`, `app/rulers/`,
  `app/organizations/`, `app/companies/`, `app/civilizations/`,
  `app/philosophies/`), each with a listing page and a `[id]` detail page.
- **Exactly 1-2 example entries per new section** (10 total), real content
  cross-linked to each other and to the existing book library, chosen to
  prove the pattern end to end — **not real coverage of any section.**

**This session's job is population**: writing real, substantial content for
each of the 8 new sections, the same way the book library's own 310-book
pipeline (`ROADMAP.md` Stage 19-20) has been worked in batches over many
sessions. Expect this to take many sessions, the same way the book library
did — don't try to fully populate all 8 sections in one sitting unless Thai
explicitly says to push through.

## 1. What NOT to touch

- `content/books/*.json` and the book-specific content pipeline
  (`docs/CONTENT_PIPELINE.md`, `docs/SCHEMA.md`) — a separate, ongoing
  track that may have in-progress uncommitted work at any time. Use the
  same `/tmp`-clone-and-diff-before-trusting-`git status` pattern every
  recent session has used (see `DECISIONS.md` #213 for this session's own
  version of that check) to identify and leave alone any genuinely
  in-progress parallel content-track files.
- The color system, architecture components (`DetailTabs`, `RelatedLinks`,
  `SectionEntryCard`, `SectionTile`, `NavDrawer`), and homepage/nav
  structure shipped in Session 24 — these are complete, not placeholders.
  If population work reveals a real architectural gap (a section's schema
  is missing a field it turns out to need, a tab set doesn't fit the real
  content), that's a legitimate thing to fix — just don't restructure for
  its own sake.

## 2. What TO do — population, section by section

Full field-level schemas, category taxonomies (with rationale), and tab-set
rationale for every section are in `docs/SCHEMA_SECTIONS.md` — read it
before writing content for any section, the same way a book-content session
reads `docs/SCHEMA.md` first. General guidance:

- **Pick one section and one batch size per session**, the same working
  rhythm the book library established (`PROJECT_BRIEF.md` §7: "content work
  happens in batches"). Ask Thai which section(s) he wants prioritized
  first if it's not obvious — the session brief that produced Session 24
  didn't specify an order for population, so this is a genuine open
  question, not a judgment call to make silently.
- **Original synthesis rule applies identically to every new section** —
  `PROJECT_BRIEF.md` §6's copyright policy (never copy/reword from
  Wikipedia, summary sites, or other sources; only exact quotes are exempt,
  and even those need real verification) is not book-library-specific, it's
  a project-wide standard. Apply it to every field in every new section's
  schema the same way `docs/SCHEMA.md`'s "Copyright Compliance Reminder"
  already does for books.
- **Rich List needs the most active maintenance of any section** — net
  worth figures are snapshots (`asOfDate` field exists specifically for
  this). Re-verify Elon Musk's and Larry Page's existing figures if it's
  been more than a few weeks since 2026-08-02, and source every new entry
  from a live, dated lookup, not memory.
- **Rulers' 20-country list is explicitly non-exhaustive** — if a
  significant ruler doesn't fit one of the 20 countries in
  `lib/rulersCountries.ts`, add a new country key rather than forcing a
  mismatch; this was designed to be extended.
- **Civilizations' `notableRulers` cross-links by exact name match** against
  `lib/rulers.ts` — as you add more Ruler entries, older Civilization
  entries' plain-text names will start auto-resolving into real links with
  zero extra work. Worth periodically checking `civilizations/roman-empire.json`
  specifically (Augustus, Trajan, Marcus Aurelius, Constantine, Diocletian
  are all still plain text as of Session 24 — only Julius Caesar has a real
  entry).
- **Philosophies has deliberate overlap with the book library** — check
  `lib/categories.ts`'s `thich-nhat-hanh` and `philosophy-psychology`
  categories and the existing written books in them before writing a new
  Philosophies entry, so `relatedIds` cross-links land correctly (the
  Buddhism example already links to both).

## 3. Mechanics — same as every recent session

1. Check git state carefully — clone `origin/main` fresh into `/tmp` and
   diff file-by-file rather than trusting `git status` in the synced
   folder (see `DECISIONS.md` #213 for the most recent full write-up of
   this pattern and why it's still necessary). Leave any genuinely
   in-progress parallel book-content-track files untouched.
2. `npx tsc --noEmit` clean, `npm run build` clean (stub `next/font/google`
   in a scratch copy only if the sandbox blocks the Google Fonts endpoint —
   never touch the real committed `app/layout.tsx`).
3. Actually render and check output — `npm run start` + curl/fetch each
   new/changed page, not just "the build succeeded."
4. Ask Thai for a classic GitHub PAT (repo scope) to push — used inline
   once, never persisted to disk or committed.
5. Verify the live deploy after pushing (Vercel MCP connector if available,
   otherwise a direct fetch of the production URL with a cache-busting
   query param).
6. Update `ROADMAP.md` (new stage or a continuation of Stage 21/22...) and
   `DECISIONS.md` (every judgment call) with the same specificity every
   prior session has used.

## 4. Known follow-up from Session 24, not yet fixed

- **PWA icon PNGs still carry the old dark/gold palette** — `manifest.json`'s
  text fields were updated to the new light theme, but the actual icon
  image assets under `public/icons/` were not regenerated. Worth doing
  whenever a session has an image-generation step available, but not
  blocking.
- **Chrome browser tools weren't connected to the Session 24 sandbox's local
  build server** — no true visual/screenshot QA was done on the new
  sections or the color flip, only HTML/CSS-class verification via curl.
  If Chrome tools are available this session (even just against the live
  production URL post-deploy), a real visual check of the light theme, the
  nav drawer, and a few of the new section pages would close a real gap.

## 5. If anything here is a genuine two-way-door decision

Flag it and ask Thai rather than deciding silently — same standing rule as
the rest of this project. Section population order/pacing is the one open
question this handoff doesn't resolve (see §2 above); most other calls
(exact wording, which specific figures to include in a batch, minor tab
content details) are one-way-door-enough to make and document, not stop and
ask about.
