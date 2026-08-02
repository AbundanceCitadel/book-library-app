# Project Brief — Personal Book Library & Summary App

**Owner:** Thai (metacitadel@gmail.com)
**Status:** Active — see `ROADMAP.md` for stage-by-stage progress
**Last updated:** 2026-08-02 (Design Foundation session — nine-section expansion)

---

## 0. Nine-section expansion (added Design Foundation session, 2026-08-02)

The app is expanding beyond the book library described in this document into
a **nine-section personal knowledge library**: the book library below
becomes one of nine tabs, not the whole app. The eight new sections (Famous
People / Profiles, Rich List, Quotes, Kings/Generals/Presidents, Groups &
Organizations, Companies & Brands, Civilizations & Empires, Philosophies/
Religions/Belief Systems) have their own content models, documented in
`docs/SCHEMA_SECTIONS.md` — **this file's Sections 1-8 below remain accurate
for the book library specifically** and are intentionally left unchanged.
See `ROADMAP.md` Stage 21 and `docs/DESIGN_SYSTEM.md` "Design System v6" for
the full rationale, the color-system change that shipped alongside the
restructure, and what's scaffolding-only vs. fully built as of that session.

## 1. Vision

A personal, mobile-first web app — installable on phone and desktop like a native app (PWA) — that acts as a searchable library of book summaries. Thai owns hundreds of physical/digital books he doesn't have time to read cover-to-cover. This app lets him absorb the core value of a book in a few spare minutes: whole-book summary, chapter breakdowns, key lessons, and quotes.

Personal use tool first, not a public product (see Section 6, Copyright Policy).

## 2. Core User Story

Standing in line or on a break, Thai opens the app on his phone, browses to a category (e.g. Business), picks a book he owns but hasn't read, reads a 5-minute summary, skims chapter-by-chapter notes, reads a few curated quotes, and notes 3–5 applicable lessons. He can mark it read/favorite and return later.

## 3. Content Model (per book)

See `docs/SCHEMA.md` for the full field-level spec. Summary of sections every book entry has:

- Metadata (title, author, categories, language, cover, est. reading time, tags)
- Whole-book summary (300–600 words)
- Chapter/part-by-part summaries (flexible structure)
- Key lessons / takeaways (5–10)
- Curated quotes (exact wording, attributed)
- Who this is for / when to read it
- Related books (cross-links)
- Personal fields (read status, notes, rating) — schema supports these now, UI ships in Stage 11

## 4. Category Taxonomy

Finalized in Stage 0, expanded in Session 6 (see `DECISIONS.md` for rationale). A book can belong to multiple categories.

1. Business
2. Marketing
3. Sales
4. Business Strategy
5. Personal Growth / Motivational
6. Philosophy & Psychology
7. Thich Nhat Hanh
8. Finance & Investing
9. History
10. Biographies — Business Figures
11. Biographies — Religious / Spiritual Figures
12. Biographies — Other
13. Health & Wellness
14. Fiction & Literature
15. Science & Technology
16. Wine

Session 6 changes: split the original "Business" into Business / Marketing / Sales so Thai can go straight to the right shelf; added dedicated "Thich Nhat Hanh" (pulled out of Philosophy & Psychology, ~20 titles) and "Wine" (pulled out of Biographies — Other, 4 titles) categories. Mortgage books stay in Finance & Investing with a `mortgage` tag rather than their own category.

**Language** (English / Vietnamese / Other) is a separate filter field, not a category — a book can be tagged Vietnamese-language and still belong to any of the above categories.

**Tags** are freeform, cross-cutting labels (e.g. "startups", "leadership", "stoicism") for finer search than categories alone.

## 5. Tech Stack & Deployment

- **Framework:** Next.js (App Router), built as a PWA
- **Live URL:** `https://library.abundancecitadel.app` (custom domain, added Session 9/confirmed live Session 10 — HTTPS cert was still provisioning as of Session 10, fall back to `https://book-library-app-abundance-citadel.vercel.app` if the custom domain isn't resolving yet)
- **Hosting:** Vercel — deployed via `github.com/AbundanceCitadel/book-library-app` (Session 3)
- **Code:** GitHub, **public repo** (changed from private in Session 3 to unblock Vercel Hobby-plan deploys — see `DECISIONS.md` #42; the book summary JSON content is publicly visible as a result, not just app source)
- **Data:** Structured JSON files per book under `content/books/`, validated against `docs/SCHEMA.md`. No database initially.
- **Design:** Mobile-first, dark mode, fast-loading, one-handed use

## 6. Content Sourcing & Copyright Policy — NON-NEGOTIABLE

- All summaries, chapter breakdowns, and lessons are original synthesis in Claude's own words — never copied/reworded from summary sites, Wikipedia, Goodreads, blogs, or the books.
- Quotes are the one exception for exact wording — kept short, few, and clearly attributed.
- Never reproduce full chapters or large passages.
- Personal use only. If this ever becomes a public/monetized product, that requires a separate legal review — must be flagged explicitly, never assumed.

## 7. Working Rules

- `ROADMAP.md` — master log of every stage, status, notes, date. Updated at the end of every session.
- `DECISIONS.md` — every judgment call made without asking Thai, with rationale.
- Session summaries end every session: what was completed, what's next, "Needs Your Input" (only if genuinely blocking).
- Content work happens in batches (10–20 books per session) once the app is in Stage 7+.
- No stopping between stages unless genuinely blocked (missing account/credential or a major two-way-door decision).

## 8. Project Location

All project files live at: `book-library-app/` inside the "1. BOOKS LIBRARY" folder.

- `content/books/*.json` — one file per book
- `docs/` — schema, content pipeline docs
- `app/` (from Stage 2 onward) — Next.js source
- `ROADMAP.md`, `DECISIONS.md`, `PROJECT_BRIEF.md` — project management docs
