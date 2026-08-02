import type { Config } from "tailwindcss";

const config: Config = {
  // v7: default theme flipped back to dark — `.light` is the opt-in class
  // again (v6 had briefly made `.dark` opt-in on a light default). See
  // docs/DESIGN_SYSTEM.md "Design System v7 — Dark Luxury Palette Reversal."
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic tokens backed by CSS custom properties in globals.css —
        // v7: dark values back on :root (default), overridden inside .light.
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        surface2: "var(--color-surface-2)",
        fg: "var(--color-fg)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
        // Primary accent — true orange (Stage 17 / v4 palette, Thai's explicit
        // call: "orange will be the primary color of this design"). Unchanged
        // by v6 — see docs/DESIGN_SYSTEM.md v4 for the full rationale and
        // contrast checks against the near-black/warm-white surfaces.
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
        // Secondary accent — jade/emerald green (v7, replaces v4/v6's pine).
        // Same role (cool contrast to orange, never drifting toward
        // blue/teal — hue stays >= 150 throughout, same guardrail v4
        // established), but brighter and more saturated: v4's pine was
        // deliberately desaturated forest green, the right call for a dense
        // reading UI but read closer to "hunting jacket" than "jewel" once
        // the background got richer in v7. See docs/DESIGN_SYSTEM.md v7.
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
        // Tertiary highlight — amber (v7, new). Confined to exactly one job:
        // the book/entry-code number (previously orange, which competed with
        // orange's primary-emphasis role) — never a second full-coverage
        // accent, to avoid the "too many hues, hard to keep looking premium"
        // risk the nine-section homepage already avoided by not giving each
        // section its own color. See docs/DESIGN_SYSTEM.md v7.
        amber: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        // v6: new warm-neutral third scale — "the little bit of dark" Thai
        // asked for as a grounding element (section headers/footers, small
        // chrome, dividers). A warm dark brown, not a cool gray or true
        // black, so it reads as part of the orange/pine warm family rather
        // than a generic UI-kit neutral. NEVER used as a full-page or
        // full-section background fill — see docs/DESIGN_SYSTEM.md v6 for
        // the contrast checks and usage rule.
        espresso: {
          50: "#f5efe9",
          100: "#e8dcd0",
          200: "#d3bfa9",
          300: "#b89a7e",
          400: "#96775c",
          500: "#6b4f3b", // primary — dividers, small chrome text/borders on light bg
          600: "#543d2d",
          700: "#402f22", // section header/footer chrome fills (with off-white text)
          800: "#2f2219",
          900: "#1f160f",
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
