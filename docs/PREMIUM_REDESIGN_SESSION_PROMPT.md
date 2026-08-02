# Premium Visual Redesign Audit — Personal Book Library App

**Where to run this:** a new **Cowork session with folder access to the `2. BOOKS LIBRARY` folder** (the same kind of session this prompt was written in) — **not** a plain browser chat with no tools. This work needs to read and edit real source files, run a build, and produce a live preview Thai can actually open on his phone and desktop, not just a written description.

## 0. Read first, before touching anything

Read these in full: `book-library-app/PROJECT_BRIEF.md`, `book-library-app/ROADMAP.md`, `book-library-app/docs/DESIGN_SYSTEM.md`, `book-library-app/docs/SCHEMA.md`. They explain the app, the content model, and the current (v2) design system in detail — don't re-derive from scratch or guess at the current state.

## 1. What this session is for

A **visual, interaction, and layout redesign pass only** — home page, category pages, the book detail page's 5-tab interface, header/nav, empty/offline/404 states. Goal, in Thai's own words: make it feel **professional, premium, luxurious** — something that's genuinely comfortable and inviting to read and browse, not "very basic." More visual, more interactive, easier to read, friendlier — not just a color tweak.

## 2. Hard constraints — read before you start building

- **Do not touch `content/books/*.json` or write any book content.** Two other tracks are running in parallel right now: an 18-book retrofit (in a separate session, editing only `content/books/*.json`) and a 310-book new-content pipeline (browser-chat batches, not yet merged in). Don't collide with either.
- **Do not change `docs/SCHEMA.md` or require new/renamed data fields without asking Thai first and flagging it loudly.** Both parallel tracks above are actively producing JSON against the *current* schema — a schema change now would invalidate in-flight work from both. If the redesign genuinely wants something the schema doesn't have yet (e.g. real cover images), propose it as a flagged, separate decision — don't just add the field and start requiring it.
- **Work on a new branch. Do not merge to `main`. Do not deploy to production.** Same standing rule as every other stage in this project — this is a review-first pass. Thai wants to see it before anything goes further.
- Both **mobile and desktop/vertical-desktop** need to look right — this project's standing rule, don't design mobile-only and call it done.

## 3. Research phase — do this before designing anything

The current v2 design system (see `docs/DESIGN_SYSTEM.md` "Research basis") was already informed by Kindle, Apple Books, Readwise Reader, and Blinkist — go further than that, with a genuinely premium bar in mind, not just "another reading app":

- **Reading/library apps:** revisit the above, plus anything else genuinely well-regarded for on-screen reading comfort.
- **Premium browsing/media apps** for cover-forward, tactile browsing patterns worth borrowing even though this app has no real cover art yet: Audible, Spotify, Libro.fm — how do they make a grid of titles feel rich and inviting rather than a plain list?
- **General premium digital product craft** as an outside benchmark — pick 1–2 products broadly regarded as "expensive-feeling" in their UI (typography, spacing, motion, restraint) even outside the book/reading category.

Write up a short, concrete "what's being borrowed and why" — extend the existing "Research basis" section in `docs/DESIGN_SYSTEM.md` rather than replacing it.

## 4. Translate "premium / luxurious / comfortable" into real decisions

Adjectives aren't a spec — turn them into buildable choices, e.g.:

- **Visual richness without real cover art yet:** can placeholder treatment (generative gradients, refined iconography beyond plain emoji, textured surfaces) make the browse experience feel less like a settings list and more like browsing a real shelf?
- **Interactivity:** hover/press micro-interactions, smoother tab transitions, a more satisfying accordion expand/collapse, subtle motion that reads as quality rather than gimmicky.
- **Reading comfort:** revisit whether the current dark palette, spacing, and density are actually landing as "comfortable" or just "dark" — this is a judgment call worth being honest about, not assuming the current v2 pass nailed it.
- **Quotes deserve a genuinely special treatment** — they're one of this app's real differentiators (20–30 curated quotes per book); a plain bulleted list undersells them.
- **Category browsing should feel like discovery**, not a settings menu.

## 5. Judgment on the existing palette/typography

The current gold + slate-teal accent pair and Inter/Literata typography came out of a real feedback cycle with Thai (see `DESIGN_SYSTEM.md`), not a first draft — treat that as a considered starting point, not something to casually replace. If your research and the "premium" bar genuinely point toward evolving it further (not just re-skinning), that's fine — but say so explicitly and explain why, the same way past sessions have flagged material design changes rather than making them silently.

## 6. Build it for real, then show Thai

1. Do the research + translate-to-decisions passes above, in writing.
2. Build the redesign in the actual shared components/CSS (`globals.css`, `Header`, `CategoryAccordion`, `BookCard`, `BookTabs`, etc.) so it propagates everywhere consistently — not a one-off mockup.
3. Push to a new branch. Confirm the build is clean (`npx tsc --noEmit`, `npm run build`).
4. Get it somewhere Thai can actually open on his phone and desktop — push the branch, confirm the Vercel Preview build goes `READY` (use the Vercel MCP connector if you have it this session), and give Thai the Preview URL directly. If you don't have Vercel access this session, say so plainly and tell Thai exactly what to check once he has a minute.
5. **Stop there.** Don't cascade into applying this everywhere blindly or start a second stage — once the shared components plus one real example of each page type (home, category, book detail — pick a book that's already fully written) look right on a verified live preview, report back and wait for Thai's review before anything merges, deploys, or continues.

## 7. Report back with

- The Preview URL.
- What changed and why, plainly — not just "redesigned," the actual decisions and the reasoning.
- Any judgment calls or open questions flagged for Thai, not resolved silently.
- Confirmation the build is clean and both mobile and desktop were actually checked (screenshots if you have Claude in Chrome / computer-use access this session — an eyes-on check beats reading generated HTML).
- Update `ROADMAP.md` with a new stage/session entry per the project's standing logging practice, and log any real judgment calls in `DECISIONS.md`.
