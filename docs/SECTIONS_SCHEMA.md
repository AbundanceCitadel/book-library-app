# Nine-Section Expansion — Detail-Page Schema (Structure Only)

**Status:** schema/architecture only. No section content has been written — every
loader below reads from a `content/<section>/` directory that does not exist yet
(loaders return `[]` gracefully until the future content-gathering pass populates
them). See `New Section Research/Section_Detail_Tab_Structures.md` for the full,
approved proposal this schema implements, including the worked example per
section — this doc is the field-level spec that turns that approved structure into
real TypeScript types.

This mirrors `docs/SCHEMA.md` (the book schema) in spirit and format, but covers
the other eight library sections: People, Rich List, Rulers, Organizations,
Companies, Civilizations, Philosophies, and Quotes (the one exception — see §9).

## 0. Shared conventions

- One JSON file per entry at `content/<section>/{slug}.json`, `{slug}` a
  URL-safe kebab-case id, same pattern as `content/books/{slug}.json`.
- **Critical Take is required on every section below except Quotes, no
  exceptions** — same `{ points: string[]; contextNote?: string }` shape as the
  book schema's `CriticalTake` object (`lib/sectionTypes.ts`), reused as-is.
- **Related cross-links are a field, not a tab** — every section entry has an
  optional `related?: RelatedLinkRef[]` field (`lib/relatedTypes.ts`), resolved
  at page-render time via `lib/related.ts#resolveRelatedLinks()` (silently drops
  any reference that doesn't resolve, same pattern as the book schema's
  `getRelatedBooksInfo()`). Rendered inside the Overview tab panel, exactly
  mirroring how `BookTabs.tsx` already renders "Related Books" inside the
  Summary tab rather than as a separate 9th tab.
- Tab counts land at 7 or 8 across all seven tabbed sections — a **ceiling of 9,
  not a target**, per Thai's explicit confirmation. Nothing is padded to reach 9.
- Shared sub-types (`lib/sectionTypes.ts`): `TimelineEvent { period, event }`,
  `NamedIdea { name, definition }`, `SectionQuote { text, attribution, quoteRef? }`,
  `CriticalTake { points, contextNote? }`, `RoleRef { name, role, personRef? }`,
  `StatItem { label, value }`, `TextItem { title, description? }`.
- Loaders use a shared factory (`lib/sectionLoader.ts#createJsonLoader<T>()`),
  the same `fs.existsSync(DIR) ? ... : []` graceful-empty pattern as
  `lib/books.ts#getAllBooks()`.
- Detail-page tab chrome (sticky tab bar, sliding pill, hash-synced active tab)
  is a single shared client component, `app/components/SectionTabs.tsx` —
  extracted from `BookTabs.tsx`'s existing chrome so the 7 new tabbed sections
  don't each reimplement it. `BookTabs.tsx` itself is untouched — the book's own
  8-tab UI keeps its existing bespoke implementation, per the instruction not to
  touch book internals beyond verifying the tab count.

## 1. People — 7 tabs

`lib/people.ts` — `Person` type. Powers `app/people/[id]/page.tsx`.

| Tab | Field(s) | Type | Required |
|---|---|---|---|
| Overview | `overview` | string | yes |
| Timeline & Career | `timeline` | `TimelineEvent[]` | yes |
| Key Achievements | `keyAchievements` | string[] (3–5) | yes |
| Ideas & Principles | `ideasPrinciples` | `NamedIdea[]` | **optional** — proposal explicitly allows skip/shrink where a person has no named approach |
| Notable Quotes | `notableQuotes` | `SectionQuote[]` | yes (may be empty array) |
| Legacy & Impact | `legacyImpact` | string | yes |
| Critical Take | `criticalTake` | `CriticalTake` | yes |

Plus: `id`, `name`, `categories: string[]` (per `people.md`'s 8-category
taxonomy), `eraOrCountry: string`, `oneLiner: string` (list-view teaser),
`related?: RelatedLinkRef[]`, `sourceNotes?: string`.

## 2. Rich List — 7 tabs

`lib/richlist.ts` — `RichListEntry` type. Powers `app/richlist/[id]/page.tsx`.

| Tab | Field(s) | Type | Required |
|---|---|---|---|
| Overview | `overview`, `netWorth` | string, `NetWorthSnapshot` | yes |
| Wealth & Career Timeline | `wealthTimeline` | `TimelineEvent[]` | yes |
| Ventures & Companies | `venturesCompanies` | `RoleRef[]` (`personRef` unused; reuses shape for name+role+optional `companyRef` via a narrowed alias) | yes |
| Philanthropy & Causes | `philanthropy` | string[] | **optional** — proposal explicitly allows a clean skip if genuinely none exists |
| Notable Quotes | `notableQuotes` | `SectionQuote[]` | yes |
| Playbook / Lessons | `playbookLessons` | string[] | yes |
| Critical Take | `criticalTake` | `CriticalTake` | yes |

`NetWorthSnapshot { amountUsd: string; asOfDate: string; sourceNote: string }` —
carries forward `richlist.md`'s own "this is a snapshot, not a live fact" caveat
as a required field, not just prose, so the UI can always render the staleness
warning. Plus: `id`, `name`, `wealthSource: string`, `oneLiner: string`,
`related?: RelatedLinkRef[]`.

## 3. Rulers — 7 tabs

`lib/rulers.ts` — `Ruler` type. Powers `app/rulers/[id]/page.tsx`.

| Tab | Field(s) | Type | Required |
|---|---|---|---|
| Overview | `overview` | string | yes |
| Rise to Power | `riseToPower` | string | yes |
| Reign & Major Events | `reignEvents` | `TimelineEvent[]` | yes |
| Achievements & Reforms | `achievementsReforms` | string[] | yes |
| Death & Succession | `deathSuccession` | string | yes |
| Notable Quotes | `notableQuotes` | `SectionQuote[]` | yes |
| Critical Take | `criticalTake` | `CriticalTake` | yes |

Plus: `id`, `name`, `title: string` (e.g. "Emperor", "Dictator"),
`countryOrCivilization: string`, `reignPeriod: string`, `oneLiner: string`,
`related?: RelatedLinkRef[]` (typically a `civilizations` cross-link).

## 4. Organizations — 7 tabs

`lib/organizations.ts` — `Organization` type. Powers
`app/organizations/[id]/page.tsx`.

| Tab | Field(s) | Type | Required |
|---|---|---|---|
| Overview | `overview` | string | yes |
| History & Founding | `historyFounding` | string | yes |
| Structure & How It Works | `structureHowItWorks` | string | yes |
| Major Achievements & Impact | `majorAchievements` | string[] | yes |
| Key People | `keyPeople` | `RoleRef[]` | yes |
| By the Numbers | `byTheNumbers` | `StatItem[]` | yes |
| Critical Take | `criticalTake` | `CriticalTake` | yes |

Plus: `id`, `name`, `category: string`, `founded: string`,
`headquarters?: string`, `oneLiner: string`, `related?: RelatedLinkRef[]`.

## 5. Companies — 8 tabs

`lib/companies.ts` — `Company` type. Powers `app/companies/[id]/page.tsx`.

| Tab | Field(s) | Type | Required |
|---|---|---|---|
| Overview | `overview` | string | yes |
| Founding Story | `foundingStory` | string | yes — kept as its own tab per the original research brief's explicit "founding story hook" requirement, not folded into Overview |
| Business Model & Products | `businessModelProducts` | string | yes |
| Growth Timeline | `growthTimeline` | `TimelineEvent[]` | yes |
| Leadership | `leadership` | `RoleRef[]` | yes |
| Legacy & Impact | `legacyImpact` | string | yes |
| Lessons for Entrepreneurs | `lessonsForEntrepreneurs` | string[] | yes |
| Critical Take | `criticalTake` | `CriticalTake` | yes |

Plus: `id`, `name`, `category: string`, `founded: string`,
`headquarters?: string`, `oneLiner: string`, `related?: RelatedLinkRef[]`
(founders in `people.md`, rivals, etc.).

## 6. Civilizations — 8 tabs

`lib/civilizations.ts` — `Civilization` type. Powers
`app/civilizations/[id]/page.tsx`.

| Tab | Field(s) | Type | Required |
|---|---|---|---|
| Overview | `overview` | string | yes |
| Rise & Origins | `riseOrigins` | string | yes |
| Golden Age / Peak | `goldenAgePeak` | string | yes |
| Society & Culture | `societyCulture` | string | yes |
| Decline & Fall | `declineFall` | string | yes |
| Legacy — What It Left Behind | `legacy` | string | yes |
| Notable Rulers | `notableRulers` | `RelatedLinkRef[]` | yes (may be empty) — its own tab (cross-link-heavy summary list into `rulers.md`), distinct from the general `related` field below |
| Critical Take | `criticalTake` | `CriticalTake` | yes |

Plus: `id`, `name`, `region: string`, `period: string`, `oneLiner: string`,
`related?: RelatedLinkRef[]` (other cross-links — e.g. a dominant philosophy).

## 7. Philosophies — 8 tabs

`lib/philosophies.ts` — `Philosophy` type. Powers
`app/philosophies/[id]/page.tsx`.

| Tab | Field(s) | Type | Required |
|---|---|---|---|
| Overview / Core Idea | `overview` | string | yes |
| Origin & Founder | `originFounder` | string | yes |
| Core Beliefs & Principles | `coreBeliefs` | `NamedIdea[]` | yes |
| Key Texts & Teachings | `keyTexts` | `TextItem[]` | yes |
| Practice — How It's Lived Today | `practiceToday` | string | yes |
| Notable Followers & Thinkers | `notableFollowers` | `RelatedLinkRef[]` | yes (may be empty) — its own tab (cross-link-heavy into `people.md`), distinct from the general `related` field below |
| Legacy & Global Influence | `legacyGlobalInfluence` | string | yes |
| Critical Take / Debates | `criticalTake` | `CriticalTake` | yes |

Plus: `id`, `name`, `category: string`, `oneLiner: string`,
`related?: RelatedLinkRef[]`.

## 8. Related cross-link resolution

`lib/relatedTypes.ts` defines `SectionKind` (`"books" | "people" | "richlist" |
"rulers" | "organizations" | "companies" | "civilizations" | "philosophies"`)
and `RelatedLinkRef { section: SectionKind; id: string }` — entries store only
the reference, never a denormalized label, so a renamed/retitled target entry
never leaves a stale label behind. `lib/related.ts#resolveRelatedLinks()` looks
the reference up against the relevant section's loader at render time and
silently drops anything that doesn't resolve (e.g. a reference added before its
target was written) — the same pattern `getRelatedBooksInfo()` already
established for `Book.relatedBooks`.

## 9. Quotes — the exception, no tab structure

Per `Section_Detail_Tab_Structures.md` §9 and Thai's explicit confirmation
(2026-08-02): `quotes.md` does **not** get a multi-tab detail page. Instead:

- `lib/quotes.ts` — flat `QuoteEntry { id, text, attribution, category,
  context?, speakerRef?: RelatedLinkRef }` list, loaded via the same
  `createJsonLoader` factory.
- `app/quotes/page.tsx` — a single flat, filterable browsing list (filter by
  `category` and by `attribution`/speaker), **not** an `[id]` detail route.
- Tapping a quote expands a small non-tabbed card in place: exact `text`,
  `context` if known, and — where `speakerRef` resolves — a link out to that
  person's own Notable Quotes tab in `people.md`/`rulers.md`/`philosophies.md`.
  Confirmed with Thai via `AskUserQuestion` this session (flat-list-only was
  the alternative offered; he chose flat list + expand card).

## 10. Deliberately not built this session

Per the session brief's scope (§5, "structure only"): no real section content
(the eight candidate lists in `New Section Research/` stay untouched as future
source material), no top-level navigation/home-page wiring for the new
sections, no category/browse-listing pages beyond what each `[id]` detail route
needs to compile (`generateStaticParams` against an empty loader returns `[]`,
so these routes currently produce zero static pages — expected until the
content-gathering pass adds real JSON entries). All of that is future
"nine-section architecture" scope per `ROADMAP.md` Stage 20's own explicit
deferral, not an oversight here.
