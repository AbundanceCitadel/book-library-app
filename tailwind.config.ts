import type { Config } from "tailwindcss";

const config: Config = {
  // v6: default theme flipped to light — `.dark` is now the opt-in class
  // (was `.light` opt-in on a dark default through v2-v5). See
  // docs/DESIGN_SYSTEM.md "Design System v6 — Light-First Color Overhaul."
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
        // v6: light values now on :root (default), overridden inside .dark.
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
        // Secondary accent — forest/pine green (v4). Unchanged by v6 — see
        // docs/DESIGN_SYSTEM.md v4 for the full color-theory writeup.
        pine: {
          50: "#eaf7f0",
          100: "#c8ecd9",
          200: "#99d9b8",
          300: "#63bf91",
          400: "#3da372",
          500: "#2c8a5e", // primary secondary — links, tags, freeform accents
          600: "#226f4a",
          700: "#1b5739",
          800: "#17432d",
          900: "#123423",
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
