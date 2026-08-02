"use client";

import { useEffect, useState } from "react";

type ThemePref = "light" | "dark" | "system";

// v7 (Stage 22, dark luxury reversal): dark is the default look again —
// toggling TO light applies a `.light` class, the inverse of v6's
// `.dark`-opt-in strategy (back to the v2-v5 shape). Same three states as
// before (Light / Dark / System). See docs/DESIGN_SYSTEM.md v7.
function applyTheme(pref: ThemePref) {
  const isLight =
    pref === "light" ||
    (pref === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches === false);
  document.documentElement.classList.toggle("light", isLight);
}

const NEXT: Record<ThemePref, ThemePref> = {
  light: "dark",
  dark: "system",
  system: "light",
};

const ICON: Record<ThemePref, string> = {
  light: "☀️",
  dark: "\u{1F319}", // 🌙
  system: "\u{1F5A5}️", // 🖥️
};

const LABEL: Record<ThemePref, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

export default function ThemeToggle() {
  // Default pref is "dark" again (v7) — matches the no-flash script in
  // app/layout.tsx, which only ever adds `.light`, never assumes system on
  // first visit. See docs/DESIGN_SYSTEM.md v7.
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
