import type { Config } from "tailwindcss";

const config: Config = {
  // Kept for compatibility (no component uses a `dark:` prefix anymore — v2 uses
  // CSS custom properties flipped by a `.light` class instead; see globals.css
  // and docs/DESIGN_SYSTEM.md v2 "Dark / Light Mode").
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic tokens backed by CSS custom properties in globals.css — dark
        // values on :root, overridden inside .light.
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        surface2: "var(--color-surface-2)",
        fg: "var(--color-fg)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
        // Primary accent — true orange (Stage 17 / v4 palette, Thai's explicit
        // call: "orange will be the primary color of this design"). A real,
        // saturated orange rather than v2/v3's deliberately desaturated gold —
        // see docs/DESIGN_SYSTEM.md v4 for the full rationale and contrast
        // checks against the near-black/warm-white surfaces.
        orange: {
          50: "#fff1e2",
          100: "#ffdcb3",
          200: "#ffbc70",
          300: "#ff9a3d",
          400: "#fa8324",
          500: "#ed6c11", // primary — buttons, active tab, borders, key emphasis
          600: "#c2560d",
          700: "#96420c",
          800: "#71330e",
          900: "#4a2209",
        },
        // Secondary accent — jade/emerald green (v6, replaces v4's pine).
        // Thai's brief this round: keep the dark theme, but make it read as
        // luxury rather than flat — v4's pine was deliberately desaturated
        // forest green (muted, "earthy"), which was the right call for a
        // dense reading UI but reads closer to "hunting jacket" than
        // "jewel" at a glance. Jade keeps the same hue family (still clearly
        // green, still nowhere near blue/teal territory — hue stays >= 150
        // throughout, same guardrail as v4) but raises saturation and
        // lightness so it has some visual "pop"/glow against the new warm
        // espresso background, the way a cut gemstone reads brighter than a
        // painted wall of the same base hue. See docs/DESIGN_SYSTEM.md v6.
        jade: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399", // links, tags, freeform accents on dark bg
          500: "#10b981", // primary secondary — borders, active states
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        // Tertiary highlight — amber (v6, new). Used sparingly: book-code
        // numbering, small badges, a highlight glow — never a second
        // full-coverage accent alongside orange/jade. Sits between orange and
        // gold on the wheel, which is what gives the "luxury" cue Thai asked
        // for (amber/gold-adjacent chips read as premium detailing) without
        // reintroducing the literal gold+navy pairing from the Citadel
        // project. See docs/DESIGN_SYSTEM.md v6.
        amber: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b", // primary highlight — badges, code numbers, glow
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        // Literata — Google's e-reading font (built for Play Books), swapped
        // in from Newsreader for better legibility on phone screens. See
        // app/layout.tsx and docs/DESIGN_SYSTEM.md "Typography."
        serif: ["var(--font-literata)", "ui-serif", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
