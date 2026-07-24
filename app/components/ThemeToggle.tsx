"use client";

import { useEffect, useState } from "react";

type ThemePref = "light" | "dark" | "system";

function applyTheme(pref: ThemePref) {
  const isDark =
    pref === "dark" ||
    (pref === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", isDark);
}

const NEXT: Record<ThemePref, ThemePref> = {
  system: "light",
  light: "dark",
  dark: "system",
};

const ICON: Record<ThemePref, string> = {
  system: "\u{1F5A5}️", // 🖥️
  light: "☀️", // ☀️
  dark: "\u{1F319}", // 🌙
};

const LABEL: Record<ThemePref, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

export default function ThemeToggle() {
  const [pref, setPref] = useState<ThemePref>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme") as ThemePref | null;
    setPref(stored ?? "system");
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
      className="tap-target rounded-lg border border-neutral-200 px-3 text-sm hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
    >
      <span aria-hidden="true">{mounted ? ICON[pref] : ICON.system}</span>
      <span className="ml-1.5 hidden sm:inline">
        {mounted ? LABEL[pref] : LABEL.system}
      </span>
    </button>
  );
}
