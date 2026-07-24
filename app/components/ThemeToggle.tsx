"use client";

import { useEffect, useState } from "react";

type ThemePref = "dark" | "light" | "system";

// v2 (Stage 15): dark is the default look — toggling applies a `.light` class,
// the inverse of the old `.dark`-opt-in strategy. See docs/DESIGN_SYSTEM.md.
function applyTheme(pref: ThemePref) {
  const isLight =
    pref === "light" ||
    (pref === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches === false);
  document.documentElement.classList.toggle("light", isLight);
}

const NEXT: Record<ThemePref, ThemePref> = {
  dark: "light",
  light: "system",
  system: "dark",
};

const ICON: Record<ThemePref, string> = {
  dark: "\u{1F319}", // 🌙
  light: "☀️",
  system: "\u{1F5A5}️", // 🖥️
};

const LABEL: Record<ThemePref, string> = {
  dark: "Dark",
  light: "Light",
  system: "System",
};

export default function ThemeToggle() {
  // Default pref is "dark" — matches the no-flash script in app/layout.tsx,
  // which only ever adds `.light`, never assumes system on first visit.
  const [pref, setPref] = useState<ThemePref>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme") as ThemePref | null;
    setPref(stored ?? "dark");
    setMounted(true);
  }, []);

  const cycle = () => {
    const next = NEXT[pref];
    setPref(next);
    window.localStorage.setItem("theme", next);
    applyTheme(next);
  };

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${LABEL[pref]}. Tap to change.`}
      className="tap-target rounded-lg border border-border px-3 text-sm hover:bg-surface2"
    >
      <span aria-hidden="true">{mounted ? ICON[pref] : ICON.dark}</span>
      <span className="ml-1.5 hidden sm:inline">
        {mounted ? LABEL[pref] : LABEL.dark}
      </span>
    </button>
  );
}
