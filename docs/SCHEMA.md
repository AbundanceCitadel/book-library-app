# Book Entry Schema

One JSON file per book at `content/books/{slug}.json`. `{slug}` is a URL-safe kebab-case id (e.g. `atomic-habits`) and doubles as the book's unique id for cross-links.

**v2 (Session 8 / Stage 15):** depth requirements increased substantially per Thai's
design/content feedback — see `docs/SESSION_8_CONTINUATION_PROMPT.md` and
`DECISIONS.md`. New/changed fields are marked **v2** below. This is a real increase
in effort per book, not a documentation-only change — see `docs/CONTENT_PIPELINE.md`
§4 for the updated per-field guidance. Whether the 66 pre-v2 entries get retrofitted
or only new entries use v2 depth is Thai's call, asked directly this session (not
decided here) — see `ROADMAP.md` Stage 15.

**v2.1 (8-Tab Content Structure Rollout):** approved from `docs/CONTENT_STRUCTURE_PROPOSAL.md`
(Revision 2) — three new fields (`conceptsFrameworks`, `applyThis`, `criticalTake`)
and a renaming/broadening of the Quotes tab guidance to "Highlights & Quotes" (no
schema change for that one — same `Quote` object, different curation criteria, see
`docs/CONTENT_PIPELINE.md`). New/changed fields are marked **v2.1** below. Per the
proposal's §5 rollout-cost accounting, this is a further real increase in
content-writing effort per book on top of what v2 already added — three more
synthesis passes, not a documentation-only change. Retrofit sequencing for the
already-written 66 books, the 18 still-open v2 retrofit titles, and the 310 queued
new-book batch prompts is tracked in `ROADMAP.md` Stage 15.

## Field Reference

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | kebab-case slug, matches filename |
| `code` | string | yes | **New in v4 (Stage 17/18).** Permanent, unique 3-digit zero-padded identifier ("001"–"999"). See "Book code" below. |
| `title` | string | yes | |
| `author` | string | yes | Single string; multiple authors comma-separated |
| `categories` | string[] | yes | 1+ values from the fixed category list below |
| `language` | `"en"` \| `"vi"` \| `"other"` | yes | Filter field, not a category |
| `coverImage` | string \| null | no | Path under `/public/covers/` or external URL; null if not sourced yet |
| `estimatedOriginalReadingTimeMinutes` | number | yes | Rough estimate of reading the full original book |
| `tags` | string[] | no | Freeform, lowercase, for cross-cutting search (e.g. `"habits"`, `"leadership"`) |
| `structureType` | `"chapters"` \| `"parts"` | yes | Determines which label the UI uses for `sections` |
| `summary` | string | yes | 300–600 words, whole-book synthesis, Claude's own words. **v2:** written with real blank-line paragraph breaks (3–5 paragraphs), not one block — see `docs/DESIGN_SYSTEM.md` paragraph-spacing rule |
| `sections` | Section[] | yes | Chapter- or part-by-part breakdown, see below — **v2:** each `summary` is now ~3 paragraphs, not 2–4 sentences |
| `keyLessons` | string[] | yes | 5–10 action-oriented bullets, whole-book level |
| `quotes` | Quote[] | yes | **v2:** 20–30 curated quotes (was 3–5), exact wording, attributed, grouped by `category` — see `Quote` object below. **v2.1:** this field powers the renamed **Highlights & Quotes** tab — selection criteria broadened, no schema change, see `docs/CONTENT_PIPELINE.md` |
| `whoThisIsFor` | string | yes | 1–2 lines |
| `whenToReadThis` | string | yes | 1–2 lines |
| `relatedBooks` | string[] | no | Array of other book `id`s already in the library |
| `authorBio` | AuthorBio | yes **(v2)** | New in Session 8 — see `AuthorBio` object below. Powers the new Author tab |
| `conceptsFrameworks` | ConceptFramework[] | yes **(v2.1)** | New — the book's named models, isolated and defined standalone. Powers the new Concepts & Frameworks tab. See object spec below |
| `applyThis` | ApplyThis | yes **(v2.1)** | New — several concrete actions plus reflection prompts. Powers the new Apply This tab. See object spec below |
| `criticalTake` | CriticalTake | yes **(v2.1)** | New — the book's real limitations, contested claims, or how its ideas have aged. Powers the new Critical Take tab. See object spec below |
| `readStatus` | `"unread"` \| `"reading"` \| `"read"` | yes (default `"unread"`) | UI ships Stage 11; field reserved now |
| `personalRating` | number \| null | no | 1–5, null until Thai rates it; UI ships Stage 11 |
| `personalNotes` | string | no | Free text; empty string until Thai writes something; UI ships Stage 11 |
| `dateAdded` | string (ISO date) | yes | When the entry was created |
| `sourceNotes` | string | no | Internal note on synthesis process / sources consulted (not shown in UI) — copyright compliance trail |
| `owned` | boolean | no, default `true` | **New in v4 (Stage 17).** `true`/absent = a book on Thai's actual shelves, part of the 376-title owned library and its 16 category shelves. `false` = a wishlist entry — a book Thai wants but doesn't own — excluded from every category-shelf count/listing and surfaced only on the dedicated `/wishlist` page. See "Wishlist / owned" below. |

### Book code — new in v4/v5 (Stage 17/18)

Every book — both a written `content/books/*.json` entry and a `content/catalog.json`
row — has a permanent, unique 3-digit code (`"001"` through `"999"`, zero-padded).
Thai's own framing: "a unique number, and it is a code as well" — it's shown in the
UI as the book's number (BookCard, search results, the book detail page, unwritten-
catalog lists), and it's also a stable internal identifier that never changes once
assigned, separate from `id` (which is a URL slug, not a number).

**How the first 377 got assigned:** a one-time migration script (this session) gave
codes `001`–`376` to `content/catalog.json`'s 376 rows in their existing order (the
same stable order established by the Session 6 cataloging/dedup pass — never
resorted since). One written book, `atomic-habits`, had no matching catalog row at
all (it was the Stage 1 reference/pilot book, written before the 376-title bookcase
catalog existed) — appended as a new 377th catalog row and given code `377` rather
than left uncoded. The other 65 written books' titles include subtitles the shorter
catalog titles don't (e.g. written `"Traction: Get a Grip on Your Business"` vs.
catalog `"Traction"`) — each was matched to its real catalog row by hand-verified
title matching (not blind fuzzy matching — every match was checked to rule out
false positives like `"Mindset"` vs. the unrelated catalog title `"Trend Following
Mindset"`), then that row's code was copied into the book file. Full list of the
matching logic and manual overrides in `DECISIONS.md`.

**Going forward — the rule every future session must follow:**
- **Never resort or reorder `content/catalog.json`'s existing rows.** Codes are
  derived from row identity at the time they were assigned, not recomputed from
  position — but since codes are now a stored field (not implicitly derived from
  array position), reordering the file is safe in principle; the real rule is
  simply **never change an already-assigned `code` value** once it exists, for any
  entry, ever. It is that book's permanent number.
- **Adding a new catalog entry** (a book Thai acquires that isn't already in the
  376/377): append it to the end of `content/catalog.json` and assign it
  `code = (current highest code) + 1`, zero-padded to 3 digits.
- **Writing a full `content/books/*.json` entry for a book already in the
  catalog:** copy that book's existing catalog `code` into the new file's `code`
  field — do not invent a new one.
- **Soft ceiling: 999.** Thai's own stated scope — "up to 999... we will end
  there." Not enforced by validation today (376/377 of 999 used, no near-term
  risk), but flagged here as the intended boundary if the library ever
  approaches it.

### Wishlist / owned — new in v4 (Stage 17)

Thai's stated plan: this app starts as a catalog of books he actually owns (376
titles), but he eventually wants to extend it to books he doesn't own yet — while
keeping that expansion **clearly isolated**, not diluting the 16 existing category
shelves that already represent real, substantial work. `owned` is the field that
draws that line: every book/catalog entry defaults to owned (`true`/absent) unless
explicitly set to `false`. `content/catalog.json` entries get the same optional
field for the same reason (see the `CatalogEntry` type in `lib/books.ts`).

Nothing in either `content/books/*.json` or `content/catalog.json` is marked
`owned: false` today — there's no backfill needed, since every entry so far
genuinely is a book Thai owns. This field exists now, before any non-owned entry
is ever added, specifically so the distinction doesn't require reworking the data
model or every read site later (`isOwned()` in `lib/books.ts` is the single choke
point every category/home/search read goes through). The isolated `/wishlist`
route (`app/wishlist/page.tsx`) is where `owned: false` entries will actually
surface once they exist — it's empty today, not broken.

### `Section` object (chapter or part)

| Field | Type | Notes |
|---|---|---|
| `order` | number | 1-indexed |
| `title` | string | Chapter/part title |
| `summary` | string | **v2:** ~3 paragraphs (blank-line separated: intro / substance / conclusion arc for that specific chapter), Claude's own words. Was 2–4 sentences pre-v2 |
| `keyLessons` | string[] | **New in v2.** 2–4 bullets: what this *specific* chapter/part teaches, distinct from the book-level `keyLessons` array. Optional on pre-v2 entries (renders nothing if absent), required going forward |

### `Quote` object

**v2.1: powers the "Highlights & Quotes" tab (renamed from "Quotes").** No field
change — same object, same `quotes` array — this is a curation-guidance change only.
Selection criteria broadened from "famous, quotable lines" to "passages worth
remembering, whether they're famous one-liners or just useful ideas stated well."
See `docs/CONTENT_PIPELINE.md` §4.4 and `docs/CONTENT_STRUCTURE_PROPOSAL.md` §3.3.
An optional `note` field (one sentence on why a specific line matters) was considered
and deliberately deferred — starting without it per the proposal's recommendation;
revisit later if it turns out to matter in practice.

| Field | Type | Notes |
|---|---|---|
| `text` | string | Exact wording from the book |
| `attribution` | string | Author name, and chapter/context if useful |
| `category` | string | **New in v2.** Freeform short theme label used to group the **Highlights & Quotes** tab (renamed from "Quotes" in v2.1, see below) (e.g. `"Identity & Self-Image"`, `"Goals vs. Systems"`) — pick 4–6 categories per book, don't invent one category per quote. Optional on pre-v2 entries |

### `AuthorBio` object — new in v2

| Field | Type | Notes |
|---|---|---|
| `name` | string | Usually matches `author`, but spelled out in full if `author` was abbreviated or multi-author |
| `bio` | string | 2–4 short paragraphs (blank-line separated): birth year/place or era if not precisely known, background, and what they're known for. Brief, not exhaustive — this is a tab someone reads in under a minute |
| `notableWorks` | string[] | Other books by this author — titles only. Empty array if the author is genuinely known for only this one book (don't pad) |

### `ConceptFramework` object — new in v2.1

Powers the **Concepts & Frameworks** tab. 3–6 entries per book — named, standalone
models only, not every idea in the book. See `docs/CONTENT_STRUCTURE_PROPOSAL.md` §3.1
for the full rationale and a worked example (Atomic Habits).

| Field | Type | Notes |
|---|---|---|
| `name` | string | The model's name, as the author coined it (e.g. "The Four Laws of Behavior Change") — not a paraphrase Thai has to guess later |
| `definition` | string | 2–4 sentences, standalone — understandable with zero other context, unlike the same idea embedded in a `sections[].summary` paragraph |
| `sourceSection` | string | Optional. Which chapter/part introduces it, for a jump-back reference to the Chapters tab |

### `ApplyThis` object — new in v2.1

Powers the **Apply This** tab. See `docs/CONTENT_STRUCTURE_PROPOSAL.md` §3.2 for the
full rationale and a worked example.

| Field | Type | Notes |
|---|---|---|
| `actionSteps` | string[] | 3–5 concrete, **distinct** actions to try, each tied to a different mechanism/lesson from the book so they don't overlap — each one specific enough to actually do this week, not a restated lesson |
| `reflectionQuestions` | string[] | 2–4 generation-effect prompts aimed at the reader's own life, meant to be answered (e.g. in the existing `personalNotes` field once its Stage 11 UI ships) |

### `CriticalTake` object — new in v2.1

Powers the **Critical Take** tab. See `docs/CONTENT_STRUCTURE_PROPOSAL.md` §3.4 for
the full rationale and a worked example.

| Field | Type | Notes |
|---|---|---|
| `points` | string[] | 3–5 bullets: known limitations, contested claims, methodological weaknesses, or credible counterarguments **specific to this book** — not generic "no book is perfect" hedging |
| `contextNote` | string | Optional. 1–2 sentences on how the book's claims have aged or what's changed since publication, when relevant (more relevant for older or heavily-cited books than brand-new ones) |

## Fixed Category List

`business`, `marketing`, `sales`, `business-strategy`, `personal-growth`, `philosophy-psychology`, `thich-nhat-hanh`, `finance-investing`, `history`, `bio-business`, `bio-religious-spiritual`, `bio-other`, `health-wellness`, `fiction-literature`, `science-technology`, `wine`

Expanded from the original 12 to 16 in Session 6: `business` split into `business` / `marketing` / `sales` (re-sorted by actual subject — brand/positioning/advertising books to `marketing`, selling-technique/sales-career books to `sales`), plus two new dedicated categories: `thich-nhat-hanh` (pulled out of `philosophy-psychology`) and `wine` (pulled out of `bio-other`). Mortgage books stay in `finance-investing`, distinguished with a `mortgage` tag rather than a new category — see `DECISIONS.md`.

## Copyright Compliance Reminder

`summary`, every `sections[].summary` (and `sections[].keyLessons`), every item in
`keyLessons`, and `authorBio.bio` must be original synthesis — never copied or
lightly reworded from the book, Wikipedia, Goodreads, or any summary site. Only
`quotes[].text` may use exact original wording — **v2 raises the count to 20–30 per
book, not the exemption itself**: every quote still needs to be genuinely
well-known/notable and verifiable (cross-check against a real source — e.g. the
author's own site, a publisher excerpt, or a quote-aggregator page — rather than
recalled from memory alone when in doubt), not padded to hit the count with filler
lines invented to sound plausible.

**v2.1:** the same original-synthesis rule applies without exception to
`conceptsFrameworks[].definition`, `applyThis.actionSteps`, `applyThis.reflectionQuestions`,
and `criticalTake.points`/`criticalTake.contextNote` — a concept definition, an
action step, or a critique is exactly as capable of being lightly-reworded
plagiarism as a summary paragraph is, even though none of them "feel like" prose
lifted from the book. `criticalTake` deserves particular care in the opposite
direction too: points must be genuine, specific, and (where they rely on a factual
claim about the book, its reception, or its research basis) checkable — not invented
just to fill 3–5 bullets.
