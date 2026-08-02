# Section Schemas — Nine-Section Personal Library (Design Foundation session)

This file is the sibling of `docs/SCHEMA.md` (which stays scoped to the book
library only, per the standing rule that the book content pipeline is a
separate, ongoing track — see `PROJECT_BRIEF.md` §6-8 and
`docs/CONTENT_PIPELINE.md`). It documents the eight new sections' content
models, category taxonomies, and the shared architecture they're all built
on. Rigor level matches `docs/SCHEMA.md`'s own bar per the session brief's
explicit instruction, scaled down proportionally — these are scaffolding
schemas with 1-2 real example entries each, not yet a fully populated
content pipeline with the book library's 20-30-quotes-per-book depth
requirements.

## Shared architecture

Every section follows the same shape the book library already proved out
(`content/books/*.json` + `lib/books.ts` + `app/book/[id]/page.tsx` +
`BookTabs`), generalized rather than reinvented:

- **`content/<section>/*.json`** — one file per entry, same convention as
  `content/books/*.json`.
- **`lib/content.ts`** — new shared module. `loadJsonEntries<T>(dirName)` is
  the generic fs-read-and-parse helper every new section's lib file calls,
  extracted from the boilerplate `lib/books.ts`'s `getAllBooks()` had always
  hand-rolled. `groupByKey` and `firstSentences` are the other two shared
  helpers (grouping entries by category/country/region for listing pages;
  truncating a summary field to a short card blurb, extracted from
  `BookCard.tsx`'s original local copy). `lib/books.ts` itself is
  deliberately **not** refactored to use these — touching the book
  pipeline's own data-access code is out of scope for this session.
- **`lib/<section>.ts`** — the section's TypeScript type(s) plus
  `getAll<Section>()`/`get<Section>ById()`, mirroring `lib/books.ts`.
- **`lib/<section>Categories.ts`** — category/country/region label + icon
  maps, split out with zero `fs` dependency, mirroring `lib/categories.ts`'s
  split from `lib/books.ts`. This isn't optional polish: a client component
  importing category labels from a module with a top-level `import fs` gets
  the whole module (including `fs`) bundled into the browser, a real build
  error this project already hit once (`DECISIONS.md` #167) — every new
  section's category maps are split from day one to avoid repeating it.
- **`app/<section>/page.tsx`** — listing page, entries grouped under their
  category/country/region heading (mirrors the book library's category-shelf
  pattern).
- **`app/<section>/[id]/page.tsx`** — detail page, composed against
  `app/components/DetailTabs.tsx` (a new generic extraction of `BookTabs`'
  sticky/scrollable/sliding-pill tab-bar mechanics — see that file's header
  comment). `BookTabs` itself is untouched; it has book-specific logic
  (quote-category filtering, the drop-cap lede, chapter numbering) that
  doesn't generalize cleanly, so it stays the book library's own component.
  Any future new section should build on `DetailTabs`, not fork `BookTabs`
  again.
- **`relatedIds`** — every section's type includes an optional
  `{ section: string; id: string; label: string }[]` field, rendered by
  `app/components/RelatedLinks.tsx` (the one place that maps a `section` key
  to its real URL prefix — `library` → `/book/`, `library-category` →
  `/category/`, `people` → `/people/`, etc.). This is how sections
  cross-link to each other (Steve Jobs → Apple Inc., Julius Caesar → Roman
  Empire) and back into the existing book library (Warren Buffett's quotes →
  his book-library biography; Buddhism → the `thich-nhat-hanh` and
  `philosophy-psychology` book categories) without merging taxonomies.

## Section 2 — Famous People / Profiles (`lib/people.ts`)

| Field | Type | Notes |
|---|---|---|
| `id` | string | kebab-case slug |
| `name` | string | |
| `category` | string | one of the 6 categories below |
| `timeframe` | string | e.g. `"1955–2011"` or `"b. 1961"` |
| `summary` | string | brief life summary, ~150-300 words |
| `achievements` | string[] | |
| `quotes` | `{text, source?}[]` | short, optional per entry |
| `legacy` | string | |
| `relatedIds` | optional, see above | |
| `dateAdded` | string (ISO date) | |
| `sourceNotes` | string, optional | |

**Categories** (`business`, `science-technology`, `arts-entertainment`,
`sports`, `activism-humanitarian`, `exploration-innovation`) — deliberately
scoped to people notable in a field *other than* pure rulership/statecraft
(that's Section 5) or company-founding alone (tracked primarily through the
Company entry, not duplicated here). This is Thai's own suggested starting
split (business, science, arts, etc.) confirmed and refined: split "arts"
into `arts-entertainment` (broader, covers performers/entertainers, not just
fine artists) and added `sports`, `activism-humanitarian`, and
`exploration-innovation` as separate categories since none of the other five
fit an athlete, activist, or explorer/inventor cleanly.

**Tabs:** Bio / Achievements / Quotes / Legacy — the exact set proposed as
the worked example in the session brief itself.

**Example entry:** Steve Jobs (`business`) — cross-linked to Apple Inc.
(Section 7).

## Section 3 — Rich List (`lib/richlist.ts`)

| Field | Type | Notes |
|---|---|---|
| `id` | string | |
| `name` | string | |
| `rank` | number | **Stored, never recomputed from array position** — same principle as the book library's `code` field (`docs/SCHEMA.md` "Book code"), so inserting a new entry doesn't require renumbering every sibling |
| `netWorthUsdBillions` | number | |
| `category` | string | industry, one of 7 below |
| `country` | string | |
| `bio` | string | |
| `portfolio` | `{holding, description, approxStake?}[]` | |
| `asOfDate` | string (ISO date) | **Required** — a rich list is a snapshot, not a stable fact; every entry must declare when its figures were true |
| `relatedIds` | optional | |
| `dateAdded` | string | |
| `sourceNotes` | string, optional | |

**Categories** (`technology`, `finance-investment`, `retail-consumer`,
`manufacturing-industrial`, `media-entertainment`, `fashion-luxury`,
`energy-resources`) — grouped by primary industry/wealth source, the
conventional cut for Forbes-style rankings and the most useful axis for a
"portfolio/holdings breakdown."

**Tabs:** Overview / Portfolio — deliberately only 2, not matching the
3-4-tab depth of other sections. The schema has one bio field and one
portfolio array; a third "Background" tab would just repeat Overview's
content with nothing new to show, and padding the tab count for its own
sake was judged worse than an honest 2-tab set.

**Example entries:** Elon Musk (rank 1, $839B) and Larry Page (rank 2,
$257B) — real figures per Forbes' 2026 real-time World's Billionaires list
(forbes.com, accessed 2026-08-02). **This is a snapshot for scaffolding
purposes only** — these numbers move continuously; a real population pass
should re-verify immediately before publishing, not reuse this session's
figures.

## Section 4 — Quotes (`lib/quotes.ts`)

Deliberately the lightest content model of the eight — one JSON file per
attributed person (a "quote collection"), not a flat wall of individual
quotes or a per-quote file.

| Field | Type | Notes |
|---|---|---|
| `id` | string | |
| `attributedTo` | string | |
| `about` | string | 1-3 sentence blurb on who this person is |
| `quotes` | `{text, category, source?}[]` | same `{text, category}` shape the book library's own `Quote` object already uses (`lib/books.ts`) — reused deliberately rather than inventing a parallel structure |
| `relatedIds` | optional | |
| `dateAdded` | string | |
| `sourceNotes` | string, optional | |

**Categories** (`business`, `marketing`, `motivation`, `religion-spirituality`,
`philosophy`, `leadership`) — the brief's own four (business, marketing,
religion, motivation) plus two added for coverage: `philosophy` (secular
thinkers who don't fit "religion") and `leadership` (military/political
figures' quotes, overlapping with Section 5).

**Tabs:** Quotes / About — only 2, the shallowest of any section. Building a
4-tab shell to match other sections would mean inventing content the
2-field schema doesn't ask for.

**Example entry:** Warren Buffett (5 quotes across `business`/`motivation`/
`leadership`) — cross-linked to his existing book-library biography
(`buffett-the-making-of-an-american-capitalist`).

## Section 5 — Kings, Generals & Presidents (`lib/rulers.ts`)

| Field | Type | Notes |
|---|---|---|
| `id` | string | |
| `name` | string | |
| `country` | string | one of 20 below — the historical civilization a ruler is associated with, not necessarily the modern country occupying similar territory (e.g. Julius Caesar → `rome`, not `italy`) |
| `title` | string | freeform, e.g. `"King"`, `"General"`, `"President"`, `"Emperor"` |
| `era` | string | e.g. `"356–323 BC"` |
| `summary` | string | |
| `reignAchievements` | string[] | |
| `legacy` | string | |
| `quotes` | `{text, source?}[]` | |
| `relatedIds` | optional | e.g. cross-link to a Civilization entry |
| `dateAdded` | string | |
| `sourceNotes` | string, optional | |

**Countries** — a starting set of 20 (`lib/rulersCountries.ts`), explicitly
non-exhaustive per the session brief ("~20 significant countries, not an
exhaustive list"): United States, United Kingdom, France, Russia/Soviet
Union, China, Mongolia, Macedon/Ancient Greece, Rome, Egypt, India, Japan,
Vietnam, Germany/Prussia, Spain, Ottoman Empire/Turkey, Persia/Iran, South
Africa, Cuba, Israel/Judea, Brazil. Chosen for spread across eras/regions
plus deliberate inclusion of Vietnam given its relevance to Thai's own
library. Expandable — a future ruler from an unlisted country just adds a
new key, no migration needed.

**Tabs:** Overview / Reign & Achievements / Legacy / Quotes — 4 tabs,
matching Section 2's depth but with Quotes reordered to last (a ruler's
reign/achievements are the primary content; quotes are a secondary
flourish here, unlike Section 4 where quotes ARE the content).

**Example entries:** George Washington (`united-states`) and Julius Caesar
(`rome`, cross-linked to the Roman Empire civilization entry).

## Section 6 — Groups & Organizations (`lib/organizations.ts`)

| Field | Type | Notes |
|---|---|---|
| `id` | string | |
| `name` | string | |
| `category` | string | one of 6 below |
| `founded` | string | year or date |
| `summary` | string | |
| `history` | string | |
| `impact` | string | |
| `relatedIds` | optional | |
| `dateAdded` | string | |
| `sourceNotes` | string, optional | |

**Categories** (`charity`, `government-body`, `financial-institution`,
`international-body`, `ngo-humanitarian`, `religious-body`) — per the
session brief's own examples (WHO, the Fed, major charities).

**Tabs:** Overview / History / Impact — exactly the 3-tab set proposed as
the worked example for this section in the session brief itself.

**Example entry:** World Health Organization (`international-body`).

## Section 7 — Companies & Brands (`lib/companies.ts`)

| Field | Type | Notes |
|---|---|---|
| `id` | string | |
| `name` | string | |
| `category` | string | one of 7 below |
| `founded` | string | |
| `founders` | string[] | |
| `summary` | string | |
| `foundingStory` | string | |
| `milestones` | `{year, event}[]` | |
| `culture` | string | |
| `relatedIds` | optional | |
| `dateAdded` | string | |
| `sourceNotes` | string, optional | |

**Categories** (`technology`, `retail-consumer`, `finance-banking`,
`automotive`, `media-entertainment`, `manufacturing-industrial`,
`food-beverage`) — deliberately close to Section 3's industry list (they're
meant to pair, per the brief: "pairs with Rich List and the book library's
Business/Finance categories") but not identical; each list can extend
independently.

**Tabs:** Overview / Founding Story / Milestones / Culture — matches the
brief's own description of this section's content almost field-for-field.

**Example entry:** Apple Inc. (`technology`) — cross-linked to Steve Jobs
(Section 2).

## Section 8 — Civilizations & Empires (`lib/civilizations.ts`)

| Field | Type | Notes |
|---|---|---|
| `id` | string | |
| `name` | string | |
| `region` | string | one of 7 below — grouped by region, not a topical category list, since "where and roughly when" is the natural browse axis for an empire spanning centuries and multiple modern countries |
| `era` | string | e.g. `"27 BC – 476 AD (Western)"` |
| `summary` | string | |
| `riseAndFall` | string | |
| `legacy` | string | |
| `notableRulers` | string[] | plain names; cross-linked to a Section 5 entry by exact name match where one exists, plain text otherwise |
| `relatedIds` | optional | |
| `dateAdded` | string | |
| `sourceNotes` | string, optional | |

**Regions** (`mediterranean-europe`, `middle-east`, `east-asia`, `south-asia`,
`central-asia-steppe`, `americas`, `africa`).

**Tabs:** Overview / Rise & Fall / Legacy / Notable Rulers — the fourth tab
is the direct cross-link mechanism back into Section 5, giving "macro
context around Section 5's individual rulers" per the brief's own framing.

**Example entry:** Roman Empire (`mediterranean-europe`) — `notableRulers`
includes Julius Caesar (cross-linked, since he has a full Section 5 entry)
plus five names with no entry yet (rendered as plain badges, not dead
links).

## Section 9 — Philosophies, Religions & Belief Systems (`lib/philosophies.ts`)

| Field | Type | Notes |
|---|---|---|
| `id` | string | |
| `name` | string | |
| `category` | string | one of 4 below |
| `founder` | string | |
| `origin` | string | time/place of origin |
| `summary` | string | |
| `coreTeachings` | string[] | |
| `keyTexts` | string[] | |
| `relatedIds` | optional | |
| `dateAdded` | string | |
| `sourceNotes` | string, optional | |

**Categories** (`eastern-philosophy`, `western-philosophy`, `world-religion`,
`spiritual-tradition`) — `religion-spirituality` intentionally reuses the
same key as `lib/quotesCategories.ts`'s category (not a coincidence: a quote
collection and a philosophy/religion entry about the same tradition should
carry matching labels where the concepts overlap).

**Tabs:** Overview / Core Teachings / Founder & History / Key Texts —
matches the brief's field description (core teachings, founders, key texts)
plus a synthesis Overview tab, same pattern as every other new section.

**Example entry:** Buddhism (`world-religion`) — deliberately chosen (per
the session brief) for its direct tie to Thai's own Thich Nhat Hanh reading;
cross-linked to the book library's `thich-nhat-hanh` and
`philosophy-psychology` categories via `relatedIds` (`section:
"library-category"`).

## What this session did NOT do

Per the session brief's explicit scope (Section 4, "Scope for this
session"): full population of any of the eight sections (100 richest
people, a full quote library, dozens of rulers per country, etc.) is
out of scope — that's separate, larger content-research work for a future
session, tracked the same way the book library's own 310-book pipeline is
tracked (`ROADMAP.md` Stage 19-20). This file and the example entries above
exist to prove the pattern renders correctly end to end, not to represent
real coverage of any section.
