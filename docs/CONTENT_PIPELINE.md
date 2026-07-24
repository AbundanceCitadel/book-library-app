# Content Pipeline — Turning a Book Into a Library Entry

The repeatable process for adding one book to the library, from title to a validated
`content/books/{slug}.json` file. Follows the schema in `docs/SCHEMA.md` and the
copyright policy in `PROJECT_BRIEF.md` §6 without exception.

**v2 (Session 8 / Stage 15):** the depth of every content field increased
substantially — three-paragraph section summaries, per-section key lessons,
20–30 categorized quotes, and a new author-bio research step. **This is a real
multi-x increase in effort per book**, not a documentation update: a v1 entry
(the 66 already written) took roughly one focused pass per book; a v2 entry adds a
verified-quote research pass, an author-bio research pass, and roughly 3x the
writing volume for sections alone. Say this plainly in any session-planning
conversation rather than quietly absorbing the new scope into the old "10–20 books
per batch" pace from `PROJECT_BRIEF.md` §7 — that pace was calibrated to v1 depth.

## 1. Pick the Book

Thai supplies the title (and author, if there's ambiguity — e.g. multiple books with
the same title). No book gets added speculatively; every entry corresponds to a book
Thai actually owns.

## 2. Slug & File

- Slug: kebab-case, derived from the title, ASCII only (e.g. `The Lean Startup` →
  `the-lean-startup`). If a slug collision would occur (rare — different books,
  same title), disambiguate with the author's last name (`dune-herbert` vs. a
  hypothetical `dune-other-author`).
- File: `content/books/{slug}.json`. One file per book, never edited by hand outside
  this pipeline once published (corrections go through the same validation pass).

## 3. Metadata Pass

Fill in the fields that don't require synthesis first — they're fast and catch
categorization questions early:

- `title`, `author` (comma-separated if multiple)
- `categories` — 1 or more from the fixed 12-category list in `docs/SCHEMA.md`.
  Multi-category is normal and encouraged (e.g. a business biography is both
  `bio-business` and often `business`).
- `language` — `en` / `vi` / `other`, independent of category.
- `tags` — 3–6 freeform lowercase cross-cutting labels.
- `structureType` — `chapters` or `parts`, based on the book's actual internal
  structure.
- `estimatedOriginalReadingTimeMinutes` — rough estimate (avg. reading speed × page
  count, or a reasonable estimate from known book length).
- `coverImage` — `null` for now; cover sourcing isn't part of this pipeline yet
  (candidate for a later stage if Thai wants real cover art).
- `dateAdded` — today's date, ISO format.
- `readStatus: "unread"`, `personalRating: null`, `personalNotes: ""` — always these
  defaults; Stage 11 UI is what lets Thai change them later.

## 4. Content Synthesis — the Non-Negotiable Part

Everything in this step must be **original synthesis in Claude's own words**, drawn
from general knowledge of the book's ideas and structure — never copied or lightly
reworded from summary sites, Wikipedia, Goodreads, blogs, or the book's actual text.
This is the copyright policy from `PROJECT_BRIEF.md` §6 and it is not optional.

1. **`summary`** — 300–600 words. The whole-book synthesis: core thesis/argument,
   how the book supports it, and how it resolves or concludes. Written as a standalone
   piece someone could read with no other context and understand what the book argues.
   **v2:** write it as 3–5 real paragraphs (blank line between them in the JSON
   string) — never one unbroken block. See `docs/DESIGN_SYSTEM.md` paragraph-spacing.
2. **`sections`** — one entry per chapter/part, in order (`order` starting at 1).
   **v2: each `summary` is now ~3 paragraphs** (blank-line separated), not 2–4
   sentences — structure each chapter's paragraphs as an intro (what this chapter
   sets out to do), a middle (the actual substance — the specific ideas, examples,
   or arguments in that chapter), and a conclusion (how it resolves or what it hands
   off to the next chapter). Specific enough that someone could understand what
   actually happens in that chapter without reading the book. Section count should
   roughly match the book's real structure (don't collapse 20 chapters into 3, don't
   invent structure that isn't there). **v2, also new:** each section gets its own
   `keyLessons` (2–4 bullets) — what *this specific chapter* is trying to teach,
   distinct from the whole-book `keyLessons` array. This is a distinct writing pass
   from the section summary, not a rephrasing of its last sentence.
3. **`keyLessons`** — 5–10 action-oriented bullets, whole-book level. Each one should
   be usable on its own without the rest of the entry — a takeaway Thai could apply,
   not just a restated fact.
4. **`quotes`** — **v2: 20–30 quotes** (was 3–5), exact original wording, each with
   `attribution` and a `category` label (see `docs/SCHEMA.md`). This is the *only*
   field allowed to use verbatim text from the book. At this volume, don't rely on
   memory alone — verify quotes against a real source (the author's own site/quote
   page, a publisher excerpt, an interview, or a well-established quote-aggregator
   page) before including them, and note the verification basis in `sourceNotes`.
   Group into 4–6 `category` themes that make sense for that specific book (e.g.
   "Identity & Self-Image," "Goals vs. Systems") — don't invent a category per quote,
   and don't pad the count with forgettable filler lines just to hit 20; a strong
   18 beats a padded 30.
5. **`whoThisIsFor`** / **`whenToReadThis`** — 1–2 lines each, practical and specific
   enough to help Thai decide whether to open the book right now.
6. **`relatedBooks`** — array of other `id`s already in `content/books/`. Only link
   books that are genuinely thematically related; leave empty (`[]`) rather than
   force a weak connection. Revisit older entries when a new related book gets added
   (a light cross-linking pass, not a hard requirement every time).
7. **`authorBio`** — new in v2. A short research pass distinct from the book-content
   synthesis above: when/where the author was born (or approximate era/background if
   exact details aren't well established — don't guess a specific date if sources
   disagree or are thin), what they're known for, and other notable books
   (`notableWorks: []` if the author is genuinely a one-book figure — don't invent
   a bibliography to avoid an empty array). 2–4 short paragraphs, original synthesis
   like everything else except `quotes`.
8. **`sourceNotes`** — one or two sentences, internal only (never shown in the UI):
   what the synthesis was based on (e.g. "general knowledge of the book's
   well-documented framework"), confirmation no source text was reproduced, how many
   quotes were used, and **v2: the verification basis for the expanded quote set**
   (e.g. "quotes cross-checked against the author's own published quote archive").
   This is the copyright compliance trail — always fill it in.

## 5. Validate Before Committing

Before a book entry counts as done:

- [ ] File parses as valid JSON and matches every field in `docs/SCHEMA.md` (right
      types, no missing required fields).
- [ ] `id` matches the filename exactly.
- [ ] `categories` are all from the fixed 12-item list — no typos, no new categories
      invented ad hoc (if a book genuinely doesn't fit, that's a two-way-door
      decision to flag to Thai, not something to solve by adding a 13th category
      unilaterally).
- [ ] `summary` word count is in the 300–600 range, written as multiple real
      paragraphs (blank-line separated), not one block.
- [ ] `sections` order is sequential starting at 1, count roughly matches the real
      book structure. **v2:** each `summary` reads as ~3 paragraphs with a real
      intro/substance/conclusion arc, and each section has its own `keyLessons`
      (2–4 items) distinct from the book-level list.
- [ ] `keyLessons` (book-level) has 5–10 items.
- [ ] `quotes` — **v2 target 20–30**, all verbatim, all attributed, all tagged with
      a `category`, grouped into 4–6 sensible categories total. Each quote's
      well-known/notable status checked against a real source, not assumed from
      memory alone.
- [ ] `authorBio` present: `bio` (2–4 paragraphs) and `notableWorks` (empty array
      is fine if genuinely a one-book author — not left out entirely).
- [ ] No copied/lightly-reworded text anywhere outside `quotes[].text` — spot-check
      against memory of the book's actual phrasing if anything reads suspiciously
      close to a known passage.
- [ ] `npm run build` still produces a clean static build with the new book included
      (catches JSON syntax errors, broken category links, etc. immediately).

## 6. Batch Workflow (Stage 7+)

Once past the single pilot entry (Atomic Habits), books are added in batches of
10–20 per `PROJECT_BRIEF.md` §7 working rules. **v2 note:** that 10–20 figure was
calibrated to v1 depth. At v2 depth (3-paragraph sections, 20–30 verified quotes,
author bio research per book), expect meaningfully smaller batches per session for
the same quality bar — flag the realistic batch size at the start of a v2 content
session rather than forcing the old number.

1. Thai (or a standing list) supplies the batch of titles.
2. Process books one at a time through steps 2–5 above — don't parallelize synthesis
   across many books in a way that risks quality dropping (each summary deserves a
   real read-through of what's known about that book, not a templated fill-in).
3. After the full batch is validated and builds clean, one commit per batch (not one
   commit per book) — e.g. `Add 12 books: Business Strategy + Finance categories`.
4. Update `ROADMAP.md` Stage 7 progress notes with running book count and category
   coverage after each batch.

## 7. Ongoing Additions (Stage 14)

After the initial pilot/expansion stages, new books get added the same way,
one-off or in small batches, whenever Thai requests them — this pipeline doesn't
change, just the cadence.
