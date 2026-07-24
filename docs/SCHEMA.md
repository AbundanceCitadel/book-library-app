# Book Entry Schema

One JSON file per book at `content/books/{slug}.json`. `{slug}` is a URL-safe kebab-case id (e.g. `atomic-habits`) and doubles as the book's unique id for cross-links.

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
| `summary` | string | yes | 300–600 words, whole-book synthesis, Claude's own words |
| `sections` | Section[] | yes | Chapter- or part-by-part breakdown, see below |
| `keyLessons` | string[] | yes | 5–10 action-oriented bullets |
| `quotes` | Quote[] | yes | Small curated set, exact wording, attributed |
| `whoThisIsFor` | string | yes | 1–2 lines |
| `whenToReadThis` | string | yes | 1–2 lines |
| `relatedBooks` | string[] | no | Array of other book `id`s already in the library |
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
| `summary` | string | Short synthesis of that chapter/part, Claude's own words |

### `Quote` object

| Field | Type | Notes |
|---|---|---|
| `text` | string | Exact wording from the book |
| `attribution` | string | Author name, and chapter/context if useful |

## Fixed Category List

`business`, `business-strategy`, `personal-growth`, `philosophy-psychology`, `finance-investing`, `history`, `bio-business`, `bio-religious-spiritual`, `bio-other`, `health-wellness`, `fiction-literature`, `science-technology`

## Copyright Compliance Reminder

`summary` and every `sections[].summary` and every item in `keyLessons` must be original synthesis — never copied or lightly reworded from the book, Wikipedia, Goodreads, or any summary site. Only `quotes[].text` may use exact original wording, and only a small curated handful per book.
