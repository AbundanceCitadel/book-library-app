"use client";

import { useEffect, useState } from "react";

type ThemePref = "light" | "dark" | "system";

// v6 (Design Foundation session): light is now the default look — toggling
// TO dark applies a `.dark` class, the inverse of v2-v5's `.light`-opt-in
// strategy. Same three states as before (Light / Dark / System), just a
// swapped default and inverted class target. See docs/DESIGN_SYSTEM.md v6.
function applyTheme(pref: ThemePref) {
  const isDark =
    pref === "dark" ||
    (pref === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches === true);
  document.documentElement.classList.toggle("dark", isDark);
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
  // Default pref is "light" — matches the no-flash script in
  // app/layout.tsx, which only ever adds `.dark`, never assumes system on
  // first visit. Nobody should see a black/near-black background on first
  // visit per Thai's explicit direction — see docs/DESIGN_SYSTEM.md v6.
  const [pref, setPref] = useState<ThemePref>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme") as ThemePref | null;
    setPref(stored ?? "light");
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
      <span aria-hidden="true">{mounted ? ICON[pref] : ICON.light}</span>
      <span className="ml-1.5 hidden sm:inline">
        {mounted ? LABEL[pref] : LABEL.light}
      </span>
    </button>
  );
}
