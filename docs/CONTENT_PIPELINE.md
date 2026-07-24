# Content Pipeline — Turning a Book Into a Library Entry

The repeatable process for adding one book to the library, from title to a validated
`content/books/{slug}.json` file. Follows the schema in `docs/SCHEMA.md` and the
copyright policy in `PROJECT_BRIEF.md` §6 without exception.

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
2. **`sections`** — one entry per chapter/part, in order (`order` starting at 1).
   Each `summary` is a short (2–4 sentence) synthesis of what that chapter/part covers
   — specific enough to be useful, short enough to skim. Section count should roughly
   match the book's real structure (don't collapse 20 chapters into 3, don't invent
   structure that isn't there).
3. **`keyLessons`** — 5–10 action-oriented bullets. Each one should be usable on its
   own without the rest of the entry — a takeaway Thai could apply, not just a
   restated fact.
4. **`quotes`** — 3–5 quotes, exact original wording, each with `attribution`. This is
   the *only* field allowed to use verbatim text from the book. Pick quotes that are
   genuinely memorable/central, not arbitrary sentences — and keep them short.
5. **`whoThisIsFor`** / **`whenToReadThis`** — 1–2 lines each, practical and specific
   enough to help Thai decide whether to open the book right now.
6. **`relatedBooks`** — array of other `id`s already in `content/books/`. Only link
   books that are genuinely thematically related; leave empty (`[]`) rather than
   force a weak connection. Revisit older entries when a new related book gets added
   (a light cross-linking pass, not a hard requirement every time).
7. **`sourceNotes`** — one or two sentences, internal only (never shown in the UI):
   what the synthesis was based on (e.g. "general knowledge of the book's
   well-documented framework"), confirmation no source text was reproduced, and how
   many quotes were used. This is the copyright compliance trail — always fill it in.

## 5. Validate Before Committing

Before a book entry counts as done:

- [ ] File parses as valid JSON and matches every field in `docs/SCHEMA.md` (right
      types, no missing required fields).
- [ ] `id` matches the filename exactly.
- [ ] `categories` are all from the fixed 12-item list — no typos, no new categories
      invented ad hoc (if a book genuinely doesn't fit, that's a two-way-door
      decision to flag to Thai, not something to solve by adding a 13th category
      unilaterally).
- [ ] `summary` word count is in the 300–600 range.
- [ ] `sections` order is sequential starting at 1, count roughly matches the real
      book structure.
- [ ] `keyLessons` has 5–10 items.
- [ ] `quotes` has at least 1 (target 3–5), all verbatim, all attributed.
- [ ] No copied/lightly-reworded text anywhere outside `quotes[].text` — spot-check
      against memory of the book's actual phrasing if anything reads suspiciously
      close to a known passage.
- [ ] `npm run build` still produces a clean static build with the new book included
      (catches JSON syntax errors, broken category links, etc. immediately).

## 6. Batch Workflow (Stage 7+)

Once past the single pilot entry (Atomic Habits), books are added in batches of
10–20 per `PROJECT_BRIEF.md` §7 working rules:

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
