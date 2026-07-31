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
        // Secondary accent — forest/pine green (v4). Thai's brief: pick a
        // contrasting complement to orange, explicitly not blue/navy. A true
        // wheel-complement of orange sits in blue territory, which was ruled
        // out — pine green is the nearest cool counterpoint that reads as
        // "green," not blue-green/cyan, at every value in this scale (checked
        // hue stays >= 150 throughout, clear of teal/cyan's ~185-200 range).
        // See docs/DESIGN_SYSTEM.md v4 for the full color-theory writeup.
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
