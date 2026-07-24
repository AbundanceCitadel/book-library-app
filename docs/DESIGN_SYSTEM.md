# Design System — Stage 3

Reference for all UI work from Stage 4 onward. Keep this in sync if patterns change.

## Principles

- **Mobile-first, one-handed use.** Design for a phone screen in a queue line first; scale up for tablet/desktop second.
- **Reading comfort over density.** This is a summary-reading app, not a dashboard. Generous line-height, restrained line length, calm color.
- **Zero extra network dependencies.** No Google Fonts or icon-font CDNs — system font stacks and inline SVG/emoji only. Keeps builds fast and avoids the install friction noted in `DECISIONS.md` #8–9.

## Typography

Two font roles, both system-stack (no webfont download):

- **UI / chrome** (`font-sans`, Tailwind default): nav, labels, buttons, metadata, category grid. Optimized for scanning.
- **Reading content** (`font-serif`, Tailwind default Georgia-based stack): whole-book summary, chapter/part summaries, quotes, key lessons. Applied via a `.prose-reading` utility in `globals.css`. Serif improves long-form readability and gives the app a "book" feel distinct from generic app UI.

Scale (Tailwind defaults used throughout, no custom scale needed):

| Role | Class |
|---|---|
| Page title (book title, page h1) | `text-2xl sm:text-3xl font-semibold` |
| Section heading | `text-lg font-semibold` (serif: `font-serif`) |
| Body / reading text | `text-base leading-relaxed font-serif` |
| UI label / metadata | `text-xs sm:text-sm` |

Base size stays at browser default (16px) — never shrink body text below `text-sm` (14px) for reading content.

## Color Palette

Base neutrals: Tailwind's built-in `neutral` scale (already in use since Stage 2) for backgrounds, borders, and secondary text — light mode uses `neutral-50/white` background with `neutral-900` text; dark mode uses `neutral-950` background with `neutral-100` text.

One accent added in `tailwind.config.ts` — `accent` (warm amber/terracotta), used sparingly for links-as-buttons, active states, category chip highlights, and the reading-time badge. Chosen over a cool blue/indigo to feel warmer and more "paper/book" than "SaaS dashboard."

```
accent: {
  50:  '#fdf6ec',
  100: '#faebd2',
  200: '#f3d5a3',
  300: '#eaba6d',
  400: '#dd9a42',
  500: '#c97f2b',   // primary accent
  600: '#ab6521',
  700: '#874f1f',
  800: '#6e421f',
  900: '#5c391d',
}
```

Usage rule: accent is for *emphasis*, not decoration — one accent element per view max (e.g. the active nav state or a single CTA), so it doesn't compete with the calm reading experience. Category cards do **not** get a rainbow of colors; they're distinguished by emoji icon + label, not color-coding, to keep the grid visually calm at 12 categories.

## Dark / Light Mode

- Strategy: Tailwind `darkMode: "class"` (unchanged from Stage 2).
- Default: follows OS preference (`prefers-color-scheme`) on first visit.
- Override: a `ThemeToggle` control (header, all pages) cycles light → dark → system, persisted to `localStorage["theme"]`.
- No-flash: an inline script in `app/layout.tsx` `<head>` reads `localStorage` before paint and sets the `dark` class synchronously, so there's no light-mode flash on a dark-preferring device.

## Mobile-First Layout Rules

- **Breakpoints:** Tailwind defaults (`sm` 640px, `md` 768px, `lg` 1024px). Design at no breakpoint (mobile) first, add `sm:`/`lg:` overrides only where the layout needs to change.
- **Containers:**
  - Reading pages (book detail): `max-w-2xl` — optimal line length for long-form serif text.
  - Browse pages (home, category list): `max-w-5xl` so the category grid can breathe on desktop.
  - Horizontal padding: `px-4` mobile, `sm:px-6` tablet+.
- **Touch targets:** every tappable element (nav links, category cards, book list rows) has a minimum effective height of 44px (`min-h-11` / adequate `py-*`), per iOS/Android accessibility guidance.
- **Spacing scale:** Tailwind default spacing tokens only (4px base unit) — no custom spacing scale.
- **Safe areas:** `globals.css` adds `env(safe-area-inset-*)` padding on the root layout wrapper, ahead of Stage 5 PWA/notch support.
- **Grids:** category grid is `grid-cols-2` on mobile, `sm:grid-cols-3` tablet, `lg:grid-cols-4` desktop — never single-column on phones (wastes vertical scroll for 12 short items), never more than 4 columns (cards get too small to read comfortably).

## Components (Stage 4)

Introduced under `app/components/`:

- `Header.tsx` — sticky top bar, app name/home link, `ThemeToggle`. Shared via `app/layout.tsx` so it renders on every page.
- `ThemeToggle.tsx` — client component, cycles theme, persists to `localStorage`.
- `CategoryCard.tsx` — icon + label + count, used on home page.
- `BookCard.tsx` — title, author, category chips, reading time; used on home and category pages.
- `Badge.tsx` — small pill used for category chips and metadata (language, reading time).

## Category Icons

Emoji chosen per category (no icon-library dependency), defined in `lib/books.ts` alongside `CATEGORY_LABELS`:

| Category | Icon |
|---|---|
| Business | 💼 |
| Business Strategy | ♟️ |
| Personal Growth / Motivational | 🌱 |
| Philosophy & Psychology | 🧠 |
| Finance & Investing | 💰 |
| History | 🏛️ |
| Biographies — Business Figures | 👔 |
| Biographies — Religious / Spiritual Figures | 🕊️ |
| Biographies — Other | 📇 |
| Health & Wellness | 🌿 |
| Fiction & Literature | 📖 |
| Science & Technology | 🔬 |
