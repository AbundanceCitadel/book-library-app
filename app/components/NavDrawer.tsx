"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Design Foundation session — nine-section navigation. Judgment call/
// trade-off (flagged per the project's standing practice, see
// docs/DESIGN_SYSTEM.md v6 "Header nav — drawer vs. tab bar"): a horizontal
// tab bar (the pattern BookTabs/DetailTabs already use for in-page tabs)
// doesn't fit 9 top-level sections on a phone header without either
// wrapping to two rows or requiring sideways scrolling to discover items
// past the fold — bad for global nav, acceptable for in-page tabs where the
// visitor already knows what page they're on. A single slide-in drawer,
// reused at every breakpoint rather than a responsive hybrid (bar on
// desktop, drawer on mobile), keeps one nav pattern to maintain and test —
// same reasoning SearchOverlay already established as a modal for the same
// header. See app/components/SearchOverlay.tsx for the precedent.
const SECTIONS = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/library", label: "Book Library", icon: "📚" },
  { href: "/people", label: "Famous People / Profiles", icon: "🧑‍🎓" },
  { href: "/richlist", label: "Rich List", icon: "💵" },
  { href: "/quotes", label: "Quotes", icon: "💬" },
  { href: "/rulers", label: "Kings, Generals & Presidents", icon: "👑" },
  { href: "/organizations", label: "Groups & Organizations", icon: "🏢" },
  { href: "/companies", label: "Companies & Brands", icon: "🏭" },
  { href: "/civilizations", label: "Civilizations & Empires", icon: "🏺" },
  { href: "/philosophies", label: "Philosophies, Religions & Belief Systems", icon: "☯️" },
];

export default function NavDrawer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label="Open sections menu"
        onClick={() => setOpen(true)}
        className="tap-target rounded-lg border border-border px-3 text-sm hover:bg-surface2"
      >
        <span aria-hidden="true">☰</span>
        <span className="ml-1.5 hidden sm:inline">Sections</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="All sections"
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="elevate-lg flex h-full w-full max-w-xs flex-col overflow-y-auto border-l-2 border-orange-600 bg-surface"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="espresso-chrome flex items-center justify-between px-4 py-3">
              <span className="text-sm font-semibold">All Sections</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="tap-target"
              >
                ✕
              </button>
            </div>
            <nav className="flex flex-1 flex-col divide-y divide-border">
              {SECTIONS.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={() => setOpen(false)}
                  className="book-row motion-premium tap-target flex items-center gap-3 px-4 py-3 text-sm font-medium"
                >
                  <span aria-hidden="true">{s.icon}</span>
                  {s.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
