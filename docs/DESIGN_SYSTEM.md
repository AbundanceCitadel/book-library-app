# Design System v4 — Density, Navigation & Color Overhaul (Stage 17)

Supersedes v3 below on every point this session touched — v3's cover-forward,
image-heavy tile treatment is explicitly reversed, not kept. Everything v3 didn't
touch (typography, dark-first strategy, elevation/motion tokens, tab structure)
carries forward unchanged. Responds directly to Thai's own numbered feedback in one
session; each subsection below is one of his points.

## 1. Navigation: real pages, not in-place expansion

Thai's exact complaint: selecting a category "doesn't go into business, it still
stays in the library" — v3's `CategoryAccordion` expanded a category's books in
place on the home page with client state (`useState`), never actually navigating.
No URL change, no history entry, so the browser's back button had nothing real to
undo. Fixed by removing `CategoryAccordion` entirely and rendering the category
list as plain `<Link href="/category/[slug]">` rows directly in `app/page.tsx` —
every tap is now a real navigation.

The second half of the complaint — "when I click backward it goes backward rather
than going to the home page" — was a separate bug even before this: `BookPage` and
`CategoryPage` both had a hardcoded `<Link href="/">`, so "back" always jumped to
the home page regardless of where the visitor actually came from (a search result,
a related-book link, another category). Replaced with a new `BackLink` client
component (`app/components/BackLink.tsx`) that calls `router.back()` — a real walk
back through whatever history the browser actually built, falling back to `/` only
when there's no prior entry (e.g. a bookmarked/direct link). This is the literal
"act as a browser" fix: forward always adds a history entry now (real `<Link>`s
everywhere), and every in-app "back" affordance uses that same history instead of
a hardcoded destination.

## 2. Density over imagery — BookCard redesign

Thai's ask: remove every cover image/icon from book listings, keep exactly three
lines per entry (title, author, a short description), and remove the gaps between
cards so a shelf reads as one dense list rather than a grid of separate boxes —
his own framing was that unused space is space that could otherwise show another
title ("sell more space").

v3's `BookCard` was a cover-forward tile: a generative CSS-gradient "cover" panel
(deterministic per book id, see the now-removed `lib/covers.ts`) with a large
category-emoji emblem, category badges, and a reading-time chip below. All of that
is gone. The new `BookCard` renders three lines only — title, author, and the
opening ~140 characters of `book.summary` (no new schema field; a short dedicated
"blurb" field would be a real content-pipeline addition across 70+ books, and the
existing `summary` already opens with a strong single-sentence hook in every
written entry, so truncating it costs nothing and needed no data migration).
Category badges and the reading-time chip are dropped from the list view entirely
(they still show on the book detail page itself) per Thai's explicit "that's it."

Rows no longer draw their own border/radius/shadow — a new `BookList` wrapper
(`app/components/BookList.tsx`) draws one shared container per shelf (`rounded-xl
border-2 border-orange-600`) around a `divide-y` list of rows, so many books share
one border instead of each row being its own boxed card with a gap next to its
neighbor. This is a **single column at every breakpoint**, not a 2-column grid —
a grid still has visible gutters between columns; a single dense list was the more
literal read of "remove the space between them."

## 3. Color: orange primary, a non-blue complement

Thai's explicit, non-negotiable direction this time (v2's "orange+blue,
blue+orange, or gold" question in Stage 15 landed on desaturated gold+slate-teal
instead — this session reopens that specifically): **orange is the primary color**,
full stop, not a desaturated gold standing in for it. He asked for a second color
to complement it, ruled out blue/navy explicitly, and asked for a visible orange
border on "the boxes" as the signature look.

- **Primary — true orange** (`tailwind.config.ts` `orange` scale, primary
  `#ed6c11`). Meaningfully more saturated than v2/v3's gold (`#c68a2e`), which was
  gold specifically *because* it was deliberately desaturated to avoid vibrating on
  near-black — this session accepts that trade-off in the other direction since
  Thai was explicit ("I just find our orange is attractive... orange will be the
  primary color of this design," not "something orange-adjacent that's easier on a
  dark screen"). Checked against both surface colors: readable at 400/500 weight on
  `--color-surface` (`#16171b` dark / `#ffffff` light) for text and border use; not
  used as a full-bleed background fill anywhere (see the callout below on why).
- **Secondary — pine (forest) green** (`pine` scale, primary `#2c8a5e`). The literal
  wheel-complement of orange sits in blue territory (~210°) — the one option Thai
  explicitly excluded. Pine's hue sits at ~150-155° across its whole scale,
  which reads unambiguously as **green**, not blue-green/cyan/teal (that range
  starts around 185-200°, where v2/v3's old "slate-teal" secondary actually lived —
  part of why it read close enough to "blue" to be worth replacing, not just a
  naming change). Green is the nearest fully-committed *cool* counterpoint to a
  warm orange that isn't blue: it sits on the opposite side of the color wheel from
  red (orange's neighbor) without crossing into blue's territory at all, so it
  still reads as a genuine temperature contrast against orange rather than a
  same-family variation (compare to keeping something orange-adjacent like a
  reds/yellows secondary, which wouldn't contrast at all).
- **Borders on boxes:** every card-like container (the category-shelf list,
  `BookList`, the stat tiles, the Who-This-Is-For/When-To-Read cards, key-lesson
  and action-step rows, concept cards, quote cards) now draws a visible 2px orange
  border (`border-orange-600/60` on content cards, solid `border-orange-600` on the
  two full-width list containers) instead of the previous neutral
  `border-border`. The Critical Take tab's context-note callout deliberately kept
  its pine-colored left border rather than switching to orange — the one place in
  the app that intentionally signals "this is the contrasting/critical content," a
  natural home for the secondary color instead of the primary one.
- **Not done:** literally painting the whole page background orange. Thai's message
  reads as wanting orange to be *the* dominant color of the design, but a solid
  orange fill behind 17px/1.8-line-height reading text would directly fight the
  dark-mode reading-comfort work every prior session did (Stage 15's whole
  rationale for the warm-near-black background). Interpreted "orange as the main
  color" as "orange is the color that shows up everywhere as the deliberate accent
  and every box gets an orange border," not a literal background-color swap —
  flagging this interpretation explicitly rather than silently deciding it, since
  it's the one place this session second-guessed a literal reading of the brief.
  Easy to revisit if that's not what Thai meant.
- **Rename, not just re-tint:** the old `gold`/`teal` Tailwind keys and
  `--badge-gold-*`/`--badge-teal-*` CSS variables are renamed to `orange`/`pine`
  throughout (mechanical, ~45 call sites across every component) rather than kept
  under their old names with new values — a future session grepping for "why is
  this called gold when it's rendering orange" was judged a worse outcome than a
  same-session rename while every touched file was already open.

## 4. Header search (Stage 8 finally implemented)

Stage 8 ("Search & Filtering") had been "Not Started" since the roadmap was
written. Thai's ask this session was concrete enough to just build it: a search
icon in the header, search by title or author, results list, tap a result to go
straight to that book instead of drilling into a category first.

- `lib/search.ts` — `getSearchIndex()` builds one flat list from **both**
  `getAllBooks()` (full written entries, linked straight to `/book/[id]`) and
  `content/catalog.json` (the other ~300+ owned titles with no full entry yet,
  linked to their category page and labeled "not yet summarized"). Deliberately
  covers the whole 376-title catalog, not just the ~70 written so far — Thai's own
  framing was that search is "another way to access the book" across "300 or 400
  books already," not a shortcut only for finished entries.
- `app/components/SearchOverlay.tsx` — a client modal (button in `Header`, opens a
  full-text filter over the index, Escape/backdrop-click to close). Filters on a
  plain case-insensitive substring match against title OR author — no fuzzy
  matching added; the library is small enough (low hundreds) that substring match
  on real titles/authors is sufficient, and it's simple enough to have zero
  failure modes to debug later.
- Selecting a result calls `router.push`, a real navigation (adds a history entry),
  consistent with point 1 above rather than a special case.
- The index is computed server-side in `Header.tsx` (a server component, free to
  use `lib/search.ts`'s `fs`-backed reads) and passed to `SearchOverlay` as a plain
  prop — the same client/server split `lib/categories.ts` established in Stage 16
  for the same reason (keep `fs`/`path` out of the browser bundle).

## 5. Wishlist / owned — scaffold for books Thai doesn't own yet

Thai flagged this as something he's genuinely unsure how to solve, not a spec to
implement literally: he wants to eventually add books he doesn't own, but doesn't
want that to dilute the 16 existing category shelves (already substantial,
376-title work), and doesn't want it to feel "rude" to mix owned/non-owned books
together once it happens. He asked for the **data model** to be right now even
though there's nothing to migrate yet, specifically so a later session doesn't have
to rework the whole app to bolt this on.

- `Book.owned` and `CatalogEntry.owned` — both optional `boolean`, default `true`
  via a single `isOwned()` helper in `lib/books.ts`. No backfill needed: every one
  of the ~70 written books and 376 catalog rows genuinely is a book Thai owns, so
  leaving the field absent (rather than writing `"owned": true` into 400+ JSON
  entries) is correct, not lazy — `isOwned()` is the one choke point every
  category/home/search read goes through, so a future `owned: false` entry
  automatically excludes itself everywhere it should without touching this code
  again.
- Every read site that powers the 16 shelves (`app/page.tsx`, `app/category/
  [category]/page.tsx`, `getUnwrittenCatalogEntries`) now filters through
  `isOwned()` explicitly, so a future non-owned entry can never quietly show up
  mixed into "the library" even if some other part of the code forgets to filter.
- A new, isolated `/wishlist` route (`app/wishlist/page.tsx`) is the "somewhere
  else" Thai was looking for — `getWishlistBooks()`/`getWishlistCatalogEntries()`
  surface only `owned: false` entries. Reachable via a single low-key text link
  under the home page's shelf list ("Looking for a book you don't own yet? →
  Wishlist"), not a header nav item competing for attention with the 16 real
  shelves. Empty today (real empty state copy, not a broken page) since nothing is
  marked non-owned yet.
- **On "not rude":** the mechanism itself (a separate page, not a badge stamped on
  every wishlist book everywhere it appears) is the answer to Thai's own concern —
  a non-owned book never appears next to an owned one on a shared shelf where a
  visible "you don't own this" tag would feel pointed. The one exception is inside
  search results, which deliberately cut across every section — there, a plain
  "· Wishlist" suffix (same visual weight as the "· not yet summarized" suffix
  already used for unwritten catalog entries) marks a non-owned result, since
  search is the one place owned and non-owned entries can legitimately appear side
  by side and Thai should be able to tell which is which.

---

# Design System v3 — Premium Redesign (Stage 16)

Supersedes v2 below (v2's palette/typography/tokens are **kept, not replaced** —
see "What's kept from v2, deliberately" below). Built on a new branch
(`redesign/premium-v3`), review-only, not merged to `main` — see
`docs/PREMIUM_REDESIGN_SESSION_PROMPT.md` for the brief this responds to. This pass
covers visual/interaction/layout only: no schema changes, no new required data
fields, `content/books/*.json` untouched.

## Why this pass exists

After Session 11's Stage 12 polish pass and the ongoing Stage 15 content retrofit,
Thai reviewed the deployed v2 app and judged it "very basic" — functional and
readable, but not "professional, premium, luxurious." v2 solved real problems (dense
text blocks, light-mode-first, thin content) but didn't yet solve for *visual
richness* or *tactility*: every surface is the same flat `--color-surface` slab, no
shadows/elevation exist anywhere in the CSS, every book renders as a plain bordered
rectangle with no visual distinction (no cover art, so nothing breaks up a wall of
near-identical cards), and interactions are binary (hover = border color change,
nothing else) rather than layered. This pass targets that gap specifically, without
re-litigating the color/typography decisions Thai already signed off on.

## Research basis — v3 additions

v2's research (Kindle, Apple Books, Readwise Reader, Blinkist — see below) was about
**reading comfort and information architecture**. It never addressed **browsing
tactility** — how a grid of titles with no real cover art can still feel rich rather
than like a settings list — because none of those four are cover-forward browsing
apps in the way Audible, Spotify, or Libro.fm are. This pass adds:

- **Audible / Spotify / Libro.fm — cover-forward grids as the reference for
  "browsing," not "reading."** All three make a grid of titles feel like a shelf by
  giving every tile a strong, consistent visual anchor (the cover) plus a small
  vocabulary of hover/press micro-interactions (lift, scale, glow) that make static
  tiles feel touchable. This app has no real cover art yet (`coverImage` is null on
  every entry — see "Open question: real cover art" below) — the concrete borrow
  is: **give every `BookCard` a deterministic, generative "cover" panel** (a
  gradient seeded from the book's `id`, with its category emoji rendered large as a
  central emblem) instead of a plain text row, so the grid reads as a shelf of
  distinct spines even with zero image assets. This needed no schema change — the
  gradient is computed client-side from the existing `id` string.
- **Linear, Stripe, Vercel's own marketing site — general "expensive-feeling"
  product craft**, picked as the outside-category benchmark the brief asked for.
  The common thread across all three isn't more decoration, it's more
  **restraint applied consistently**: one accent color used sparingly, a small
  fixed set of type sizes, one motion curve and a short list of durations reused
  everywhere rather than ad hoc transitions, and real elevation (shadow, not just a
  border) used deliberately to create hierarchy between "the page" and "a thing on
  the page." Concretely borrowed: a **shared easing curve and duration scale**
  (`--ease-premium`, 150/250/400ms — see Motion below) applied to every hover/press/
  expand/tab-switch interaction in the app instead of one-off `transition-colors`
  calls, and a **real shadow/elevation system** (see Elevation below) so cards,
  the sticky tab bar, and the header read as physically layered rather than flat
  rectangles with borders.
- **Kindle / Apple Books, revisited** — v2 borrowed "restrained line length, serif
  body text, minimal chrome" from these already. This pass adds one more: Apple
  Books' book-detail screens use a confident type-size jump between chrome (nav,
  labels) and the actual reading surface, plus a subtle "page" elevation
  (background shifts, faint shadow) around the reading well itself — borrowed here
  as a slightly more pronounced heading hierarchy and a soft card elevation around
  the Summary tab's opening paragraph, rather than every heading in the app reading
  at nearly the same visual weight (a real, honest gap in the v2 pass — see
  "Reading comfort: honest reassessment" below).

## What's kept from v2, deliberately

Per the brief's explicit instruction: the gold + slate-teal accent pair and
Inter/Literata typefaces came out of a real feedback cycle with Thai (Sessions 8–9),
not a first draft, and this pass's research didn't turn up a case for replacing
either — Audible/Spotify/Libro.fm's cover-forward pattern is a **layout and
elevation** lesson, not a color-palette one, and Linear/Stripe's lesson is about
**restraint and consistency**, which argues for using the existing two accents more
deliberately, not adding a third. Kept unchanged: both color scales in
`tailwind.config.ts`, both font choices and their roles, dark-as-default behavior,
the `.light` opt-in strategy, and the CSS-custom-property theming approach. What
changed is what sits on top of that foundation: shadows/elevation, motion, cover
treatment, and a few component-level interaction and layout decisions detailed
below — evolution, not a re-skin.

## Reading comfort: honest reassessment

The brief asked this to be a real judgment call, not an assumed pass. Verdict: v2's
dark palette itself (`#0b0c0e` background, warm `#f2ede4` foreground) is genuinely
comfortable — the warm-neutral choice over pure black/white was correct and this
pass doesn't touch it. What was landing as "just dark" rather than "comfortable" is
**flatness and thin hierarchy**, not the color values: every heading level uses
similar weight/size jumps, there's no visual "arrival" moment at the start of a
book's summary (Apple Books and Kindle both give the opening of a chapter a bit more
visual ceremony — a drop cap, extra top space, something that says "you've started
reading" rather than the text just beginning at the same rhythm as everything
else), and quotes — this app's actual differentiator, 20–30 curated ones per book —
were rendered as a visually flat bulleted-blockquote list with no more ceremony than
a plain paragraph. Fixes for these are in the component sections below (drop-cap
lede treatment, quote cards, heading-scale rework) — kept as CSS/layout changes
only, no content or schema impact.

## Translating "premium / luxurious" into decisions

- **Visual richness without real cover art:** generative gradient "cover" panel on
  every `BookCard`, seeded from `book.id` (deterministic — same book always renders
  the same gradient, so it's recognizable on repeat visits, not random noise on
  every load). See `lib/covers.ts`.
- **Interactivity:** hover lift + shadow bloom + subtle cover-gradient shift on
  `BookCard`; a sliding gold pill under the active tab in `BookTabs` (measured via
  ref, animated with the shared easing curve) instead of a static underline; a
  smooth height/opacity expand-collapse on `CategoryAccordion` (see the accordion
  judgment call below); press states (`active:scale-[0.98]`) on every tappable
  surface so touch feels acknowledged, not just clicked.
- **Reading comfort:** heading-scale rework (see Typography below), a drop-cap lede
  on the whole-book summary's opening paragraph, more breathing room between major
  page sections (`space-y` bumped at the page-layout level, not just paragraph
  level).
- **Quotes get special treatment:** redesigned as a two-column (desktop) / single-
  column (mobile) card grid, each quote in its own elevated card with a large
  decorative serif quotation glyph, category filter chips above the grid (client-
  side filter, no new data) instead of one long scroll through every category in
  sequence.
- **Category browsing as discovery:** `CategoryAccordion` header redesigned with the
  category emoji inside a soft gradient badge (echoes the new book-cover treatment,
  ties browsing-by-category to browsing-by-book visually), animated expand instead
  of the instant native snap, and a staggered fade-in of the revealed book cards
  rather than everything appearing at once.

## Elevation (new)

No shadow existed anywhere in v2 — every surface was a flat fill plus a 1px border.
Added a 3-step shadow scale as CSS custom properties (tuned separately per theme,
since a shadow that reads correctly on `#0b0c0e` is far too subtle on `#faf8f4` and
vice versa):

```
--shadow-sm   card resting state
--shadow-md   card hover / raised state, sticky tab bar
--shadow-lg   quote cards, the book-cover gradient panel
```

Usage rule: resting cards use `--shadow-sm` (barely-there, just enough to lift a
card off the page); hover/press/active states step up to `--shadow-md`; the
generative cover panels and quote cards (the two places this pass wants the most
visual "weight") use `--shadow-lg`. Never more than one step of elevation change per
interaction, so the effect reads as physical rather than flashy.

## Motion (new)

One easing curve, three durations, used everywhere instead of ad hoc
`transition-colors`:

```
--ease-premium: cubic-bezier(0.16, 1, 0.3, 1);   /* borrowed from the
  Linear/Stripe research above — a fast-out, gentle-settle curve that reads as
  "quality" rather than linear/mechanical */
--duration-fast:   150ms   hover/press micro-states
--duration-base:   250ms   tab switches, accordion chevron
--duration-slow:   400ms   accordion expand/collapse height animation
```

## Typography — heading-scale rework

Kept Inter/Literata (see "What's kept from v2" above). Changed: the scale between
heading levels, which read too close together in v2 (page title and section heading
were both "text-lg/text-2xl semibold," easy to mistake for the same level at a
glance). New scale adds one more visible step and a small letter-spacing pull on the
largest size for a more editorial, less "default Tailwind" feel:

```
Page title (h1)      text-3xl sm:text-4xl font-semibold tracking-tight  (Inter)
Section heading (h2) text-xl sm:text-2xl font-semibold                  (Inter)
Sub-heading (h3)      text-base font-semibold                           (Inter)
Tab label             text-sm font-medium                               (Inter)
Body / reading text   17px / line-height 1.8 (.prose-reading, Literata) — unchanged
UI label / metadata   text-xs sm:text-sm                                (Inter)
```

Drop-cap: the first paragraph of `book.summary` on the Summary tab gets a large
(`text-5xl` line-height-none), gold, serif first letter floated left — a single,
restrained "you've arrived" cue at the top of every book page, not applied anywhere
else (not to every section, not to every paragraph — one moment of ceremony, not a
running motif that would fight the reading-comfort goal).

## Judgment call: `CategoryAccordion` moves from native `<details>` to a small
## client component

Stage 15 deliberately chose native `<details>`/`<summary>` for **zero client JS and
free keyboard/ARIA support**. That trade-off is worth revisiting now that animated
expand/collapse is part of the "premium interactivity" ask: `<details>` cannot
animate its open/close height with CSS alone in a way that works reliably across
Safari/Chrome today (the `interpolate-size`/`@starting-style` approach that would
keep it CSS-only is not yet reliable enough cross-browser for something Thai will
open on his phone). This pass converts `CategoryAccordion` to a small `"use client"`
component using `useState` + a measured-height CSS transition, **but keeps the
accessibility Stage 15 valued on purpose** rather than trading it away for
animation: real `<button aria-expanded>` trigger, `role="region"` on the revealed
panel with `aria-labelledby`, and full keyboard operability (Enter/Space toggles,
focus-visible ring retained). Net effect: a few hundred bytes of client JS in
exchange for animated, premium-feeling expand/collapse — flagged explicitly as the
trade-off it is, not decided silently.

## Open question flagged for Thai: real cover art

This pass leans hard on generative gradients *because* `coverImage` is null on
every entry (see `docs/SCHEMA.md` — the field already exists, schema is unchanged).
If Thai wants to pursue real cover art later (scanned spines from his own physical
copies, or a licensed cover-art API), that's a genuinely separate decision with its
own scope (sourcing, rights, storage, a `coverImage` population pass across 66+
entries) — flagged here as a future option, not started, and not required for this
pass to look "premium" now. The generative-cover system is built so a real
`coverImage`, when/if populated, would simply take visual priority over the
gradient (component-level fallback), no rework needed later.

## Mobile + desktop

Both checked per the project's standing rule (not mobile-only) — see the Session
log entry in `ROADMAP.md` for this stage for the actual viewport sizes verified and
whether Chrome browser tools were available this session.

---

# Design System v2 — Stage 15

Supersedes the Stage 3 version below the divider. Rewritten in Session 8 per Thai's
first-look feedback on the deployed app (too plain, light-mode-first, dense text) —
see `docs/SESSION_8_CONTINUATION_PROMPT.md` and `DECISIONS.md` #86+.

## Research basis

Before rewriting the palette/typography, briefly reviewed patterns from Kindle, Apple
Books, Readwise Reader, and Blinkist:

- **Readwise Reader** uses a hybrid model (dark chrome, light reading well) because
  pure dark-on-dark long-form reading measures worse for sustained reading comfort —
  but its dark *mode* itself leans on a warm, near-black (not pure #000) background
  with a warm off-white foreground, generous margins, ~65-character line length, and
  warm "highlighter" accent colors (soft yellow, coral, blue) rather than saturated
  neon accents. That warm-neutral-on-near-black combination, not stark white-on-black,
  is what this redesign borrows — Thai was explicit that he wants dark-first as the
  primary look (not a hybrid), so the trade-off is accepted deliberately; the warm
  off-white foreground and generous type scale is how the dark-first choice avoids
  the readability cost a pure white-on-black scheme would otherwise carry.
- **Blinkist** organizes long content behind a small number of persistent tabs
  (its three-tab Discover/Library/You shell, and swipeable sections within a single
  book) rather than one long scroll — the direct precedent for Stage 15's tabbed book
  detail page.
- **Kindle / Apple Books** confirm the basics worth keeping: restrained line length,
  a serif or literary-feeling type for body text, minimal chrome around the reading
  area itself.

## Principles (unchanged)

- **Mobile-first, one-handed use.** Design for a phone screen in a queue line first.
- **Reading comfort over density.** Generous line-height, restrained line length,
  calm color, and — new in v2 — real paragraph breaks instead of dense blocks.
- **Zero extra *runtime* network dependencies.** Fonts are loaded via `next/font/google`,
  which downloads and self-hosts the font files at build time — the browser never
  makes a request to Google's font CDN at runtime. This preserves the Stage 3 rule
  (no external font requests slowing down or phoning home on every page load) while
  finally allowing real typographic personality instead of system-stack fonts only.

## Color Palette — dark-mode-first

Dark is now the **default, primary look** — not a `prefers-color-scheme` fallback.
A first-time visitor sees the dark theme regardless of OS setting; light mode is
still available as an explicit opt-in via the theme toggle (see below), for anyone
who wants it in bright daylight.

Colors are defined as CSS custom properties in `globals.css` (`--color-bg`,
`--color-surface`, `--color-surface-2`, `--color-fg`, `--color-muted`,
`--color-border`), dark values by default on `:root`, overridden inside a `.light`
class on `<html>`. Tailwind's `bg-bg`, `bg-surface`, `text-fg`, `text-muted`,
`border-border` utility classes (extended in `tailwind.config.ts`) reference these
variables, so **no component needs a `dark:` prefix anymore** — one set of classes
renders correctly in both themes because the variables themselves change.

```
Dark (default):
  --color-bg:        #0b0c0e   near-black, slightly warm-neutral (not pure #000)
  --color-surface:   #16171b   cards, accordion panels
  --color-surface-2: #1e2024   hover / pressed state
  --color-border:    #2a2c31
  --color-fg:        #f2ede4   warm off-white body text ("paper," not stark #fff)
  --color-muted:     #9a978d   secondary text / metadata

Light (opt-in via toggle):
  --color-bg:        #faf8f4   warm paper white, not stark #ffffff
  --color-surface:   #ffffff
  --color-surface-2: #f1ede6
  --color-border:    #e5e0d6
  --color-fg:        #201f1c
  --color-muted:     #6b6860
```

### Accent pair: gold + slate-teal

Thai floated orange+blue, blue+orange, or gold-on-dark and explicitly invited a
better-reasoned alternative. Landed on **gold (primary) + slate-teal (secondary)**
— a refined version of his "orange+blue" instinct, tuned for a near-black
background:

- A fully saturated orange+blue pairing reads as sporty/corporate (a sports-team or
  SaaS-dashboard combination) on pure black. Desaturating orange toward **gold**
  keeps the warmth Thai wants (candlelight/reading-lamp association — fits a book
  app much better than "alert orange") while sitting calmly on near-black instead of
  vibrating against it.
- Desaturating blue toward a **muted slate-teal** (rather than a bright blue) gives
  a genuine cool counterpoint for secondary elements — links, tag chips, category
  icon backgrounds — without competing with gold for visual priority. Two full-
  saturation accents on the same dark surface fight each other; one warm/dominant +
  one cool/muted gives clear hierarchy.
- Usage rule (kept from Stage 3): gold = primary emphasis (active tab, primary
  action, category badge, key-lesson checkmarks). Slate-teal = secondary emphasis
  (links inside body text, freeform tag chips, the Author tab's "notable works"
  list) — this also finally gives Thai's `tags` field its own visual identity,
  distinct from `categories` (gold), which the Stage 3 single-accent system never
  had room for.

```
gold (primary):
  50: #fbf3e0  100: #f6e6bd  200: #eccf85  300: #e0b355  400: #d29a35
  500: #c68a2e  ← primary    600: #a06f22  700: #7d571c  800: #5f421a  900: #493419

teal (secondary):
  50: #e7f4f5  100: #c9e6e9  200: #9ccfd6  300: #6bb3bd  400: #4a97a4
  500: #357e8c  ← primary    600: #2a6470  700: #234f59  800: #1e3e45  900: #1a3138
```

Category icons stay emoji-based (Stage 3 decision, unchanged) — the accent pair is
for UI chrome (buttons, active states, links, tags), not a per-category color code.

## Typography — v2, updated Session 9

Two font roles, both **self-hosted via `next/font/google`** (build-time download,
zero runtime CDN request, zero layout-shift since `next/font` inlines `font-display`
and size-adjust metrics automatically):

- **UI / chrome — Inter.** Replaces the Stage 3 system-sans stack. Chosen for
  excellent legibility at small sizes (nav, badges, metadata, tab labels) and
  because it's purpose-built for screens, not print — a meaningfully different feel
  from the default OS font stack Thai found "very normal."
- **Reading content — Literata.** Session 8 originally shipped Newsreader here;
  Session 9 swapped it for **Literata** after Thai found Newsreader harder to read
  on his phone. Literata is the font Google built specifically for Play Books'
  on-screen reading surfaces — higher x-height, optimized for small/medium sizes,
  and holds up better on lower-DPI phone screens than a typical thin/high-contrast
  serif. Weights pinned to 400/500/600 (never lighter) so body text never renders
  in a thin, hard-to-read weight. Applied via `.prose-reading` in `globals.css`.

```
Scale (Session 9 readability pass bumped body text off Tailwind's default scale):
  Page title (h1)      text-2xl sm:text-3xl font-semibold   (Inter)
  Section heading      text-lg font-semibold                (Inter)
  Tab label            text-sm font-medium                  (Inter)
  Body / reading text  17px / line-height 1.8 (.prose-reading, Literata)
  UI label / metadata  text-xs sm:text-sm                    (Inter)
```

### Paragraph spacing (new in v2, bumped again in Session 9)

The single biggest content-formatting complaint: dense unbroken text blocks (e.g.
the whole-book summary rendered as one `whitespace-pre-line` paragraph). Fixed at
the rendering layer, not just the content layer: any long-form field that contains
multiple logical paragraphs (`summary`, each `sections[].summary`, `authorBio.bio`)
is now split on blank lines and rendered as separate `<p>` tags inside
`.prose-reading` (see `lib/paragraphs.ts`). `.prose-reading p + p { margin-top: 1.6em }`
in `globals.css` — Session 8 shipped this at `1.25em`; Session 9 bumped it to `1.6em`
after Thai flagged that paragraphs still read as visually stuck together on a small
phone screen, especially now that several books have 3-paragraph sections. This also
means content going forward should be *written* with real paragraph breaks (blank
line between paragraphs in the JSON string), not as one long sentence run — see
`docs/CONTENT_PIPELINE.md`.

## Dark / Light Mode — v2 behavior change

- Strategy: still `class`-based, but the class is now `.light` (opt-in), not
  `.dark` (opt-in) — dark is the unclassed default. This is the concrete
  implementation of "dark-first, not light-first-with-a-dark-toggle."
- Default for a first-time visitor: **dark**, regardless of OS `prefers-color-scheme`.
  (Stage 3's behavior — follow OS preference on first visit — is exactly the
  "light-mode-first-with-dark-as-fallback" framing Thai pushed back on, since a
  visitor on a light-mode OS would have seen the light theme first.)
- Override: `ThemeToggle` still cycles **Dark → Light → System**, persisted to
  `localStorage["theme"]`. "System" is available for anyone who wants OS-linked
  behavior, but it's no longer the default state.
- No-flash: inline `<head>` script in `app/layout.tsx` reads `localStorage` before
  paint; only adds the `.light` class if the stored value is `"light"`, or if it's
  `"system"` and the OS reports light — otherwise (including on a totally fresh
  visit with nothing stored) it stays dark.

## Mobile-First Layout Rules (unchanged from Stage 3)

- Breakpoints: Tailwind defaults (`sm` 640px, `md` 768px, `lg` 1024px).
- Containers: `max-w-2xl` reading pages (book detail), `max-w-5xl` browse pages
  (home, category).
- Touch targets: 44px minimum (`.tap-target` / `min-h-11`).
- Safe areas: `env(safe-area-inset-*)` padding, unchanged.

## New Components — Stage 15

- **`CategoryAccordion.tsx`** (client) — replaces the home-page category grid.
  Built on native `<details>`/`<summary>` (not a hand-rolled `useState` accordion)
  so it's accessible and keyboard-operable for free, works with zero JS if
  hydration is ever delayed, and needs no custom open/close state management.
  Collapsed: icon + label + count (`{count} books`). Expanded: the category's
  written `BookCard`s inline, plus a "View full category page →" link for anyone
  who wants the dedicated page (see the home-page IA note below).
- **`BookTabs.tsx`** (client) — replaces the single long-scroll book detail layout.
  Five tabs — **Summary, Chapters, Key Lessons, Quotes, Author** — rendered as a
  horizontally-scrollable, sticky-under-header segmented control on mobile (never
  wraps to two rows; scrolls sideways instead, one-handed-reachable). Active tab is
  gold-underlined; tab state is synced to the URL hash (`#chapters`, `#quotes`,
  etc.) so a specific tab is linkable/shareable and survives a refresh, without
  needing any server state.

### Home-page information architecture — flagged trade-off

Thai's brief said "replace... or restructure" the category grid and left it to
judgment whether category pages still exist separately. Kept the dedicated
`/category/[slug]` pages rather than removing them: the accordion is the fast
*browse* surface (quick scan + expand in place), while the category page is still
needed for its "on the shelf, not yet summarized" list (376-title catalog feature
from Session 6) and as a shareable/bookmarkable per-category URL. Each expanded
accordion section links to its category page rather than duplicating the unwritten-
list there — flagging this as the judgment call the brief asked to have surfaced
rather than decided silently.

## Category Icons (unchanged from Stage 3)

See `lib/books.ts` `CATEGORY_ICONS` — no changes in Session 8; icons stay
emoji-based per category, only the surrounding chrome/accent changed.

---

# Design System v1 — Stage 3 (superseded above, kept for history)

Reference for all UI work from Stage 4 onward. Keep this in sync if patterns change.

## Principles

- **Mobile-first, one-handed use.** Design for a phone screen in a queue line first; scale up for tablet/desktop second.
- **Reading comfort over density.** This is a summary-reading app, not a dashboard. Generous line-height, restrained line length, calm color.
- **Zero extra network dependencies.** No Google Fonts or icon-font CDNs — system font stacks and inline SVG/emoji only. Keeps builds fast and avoids the install friction noted in `DECISIONS.md` #8–9.

## Typography

Two font roles, both system-stack (no webfont download):

- **UI / chrome** (`font-sans`, Tailwind default): nav, labels, buttons, metadata, category grid. Optimized for scanning.
- **Reading content** (`font-serif`, Tailwind default Georgia-based stack): whole-book summary, chapter/part summaries, quotes, key lessons. Applied via a `.prose-reading` utility in `globals.css`. Serif improves long-form readability and gives the app a "book" feel distinct from generic app UI.

## Color Palette

Base neutrals: Tailwind's built-in `neutral` scale for backgrounds, borders, and secondary text — light mode uses `neutral-50/white` background with `neutral-900` text; dark mode uses `neutral-950` background with `neutral-100` text.

One accent, warm amber/terracotta (`accent` scale in `tailwind.config.ts`), used sparingly.

## Dark / Light Mode

Tailwind `class` strategy (`.dark` opt-in via toggle), default follows OS preference on first visit, 3-state toggle (light/dark/system), no-flash inline script.

(See v2 above for what changed and why.)
