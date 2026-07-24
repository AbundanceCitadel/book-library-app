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
