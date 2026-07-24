# Book Entry Schema

One JSON file per book at `content/books/{slug}.json`. `{slug}` is a URL-safe kebab-case id (e.g. `atomic-habits`) and doubles as the book's unique id for cross-links.

**v2 (Session 8 / Stage 15):** depth requirements increased substantially per Thai's
design/content feedback — see `docs/SESSION_8_CONTINUATION_PROMPT.md` and
`DECISIONS.md`. New/changed fields are marked **v2** below. This is a real increase
in effort per book, not a documentation-only change — see `docs/CONTENT_PIPELINE.md`
§4 for the updated per-field guidance. Whether the 66 pre-v2 entries get retrofitted
or only new entries use v2 depth is Thai's call, asked directly this session (not
decided here) — see `ROADMAP.md` Stage 15.

## Field Reference

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | kebab-case slug, matches filename |
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
| `quotes` | Quote[] | yes | **v2:** 20–30 curated quotes (was 3–5), exact wording, attributed, grouped by `category` — see `Quote` object below |
| `whoThisIsFor` | string | yes | 1–2 lines |
| `whenToReadThis` | string | yes | 1–2 lines |
| `relatedBooks` | string[] | no | Array of other book `id`s already in the library |
| `authorBio` | AuthorBio | yes **(v2)** | New in Session 8 — see `AuthorBio` object below. Powers the new Author tab |
| `readStatus` | `"unread"` \| `"reading"` \| `"read"` | yes (default `"unread"`) | UI ships Stage 11; field reserved now |
| `personalRating` | number \| null | no | 1–5, null until Thai rates it; UI ships Stage 11 |
| `personalNotes` | string | no | Free text; empty string until Thai writes something; UI ships Stage 11 |
| `dateAdded` | string (ISO date) | yes | When the entry was created |
| `sourceNotes` | string | no | Internal note on synthesis process / sources consulted (not shown in UI) — copyright compliance trail |

### `Section` object (chapter or part)

| Field | Type | Notes |
|---|---|---|
| `order` | number | 1-indexed |
| `title` | string | Chapter/part title |
| `summary` | string | **v2:** ~3 paragraphs (blank-line separated: intro / substance / conclusion arc for that specific chapter), Claude's own words. Was 2–4 sentences pre-v2 |
| `keyLessons` | string[] | **New in v2.** 2–4 bullets: what this *specific* chapter/part teaches, distinct from the book-level `keyLessons` array. Optional on pre-v2 entries (renders nothing if absent), required going forward |

### `Quote` object

| Field | Type | Notes |
|---|---|---|
| `text` | string | Exact wording from the book |
| `attribution` | string | Author name, and chapter/context if useful |
| `category` | string | **New in v2.** Freeform short theme label used to group the Quotes tab (e.g. `"Identity & Self-Image"`, `"Goals vs. Systems"`) — pick 4–6 categories per book, don't invent one category per quote. Optional on pre-v2 entries |

### `AuthorBio` object — new in v2

| Field | Type | Notes |
|---|---|---|
| `name` | string | Usually matches `author`, but spelled out in full if `author` was abbreviated or multi-author |
| `bio` | string | 2–4 short paragraphs (blank-line separated): birth year/place or era if not precisely known, background, and what they're known for. Brief, not exhaustive — this is a tab someone reads in under a minute |
| `notableWorks` | string[] | Other books by this author — titles only. Empty array if the author is genuinely known for only this one book (don't pad) |

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
