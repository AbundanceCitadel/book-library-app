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
        // Primary accent — gold. Warm, calm on near-black; see DESIGN_SYSTEM.md
        // for the gold+teal pairing rationale.
        gold: {
          50: "#fbf3e0",
          100: "#f6e6bd",
          200: "#eccf85",
          300: "#e0b355",
          400: "#d29a35",
          500: "#c68a2e",
          600: "#a06f22",
          700: "#7d571c",
          800: "#5f421a",
          900: "#493419",
        },
        // Secondary accent — slate-teal. Cool counterpoint for links/tags.
        teal: {
          50: "#e7f4f5",
          100: "#c9e6e9",
          200: "#9ccfd6",
          300: "#6bb3bd",
          400: "#4a97a4",
          500: "#357e8c",
          600: "#2a6470",
          700: "#234f59",
          800: "#1e3e45",
          900: "#1a3138",
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
