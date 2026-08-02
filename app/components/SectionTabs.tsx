"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Nine-section expansion (structure only, see docs/SECTIONS_SCHEMA.md §0).
// Generic tab-bar chrome (sticky, horizontally-scrollable, sliding active
// pill, hash-synced active tab) extracted from BookTabs.tsx so the seven new
// tabbed sections (People/Rich List/Rulers/Organizations/Companies/
// Civilizations/Philosophies) share one implementation instead of each
// reimplementing the same ~80 lines. BookTabs.tsx itself is left untouched —
// the book's own 8-tab UI keeps its existing bespoke implementation.
export type SectionTab = {
  key: string;
  label: string;
  content: React.ReactNode;
};

export default function SectionTabs({
  tabs,
  ariaLabel,
}: {
  tabs: SectionTab[];
  ariaLabel: string;
}) {
  const [active, setActive] = useState<string>(tabs[0]?.key ?? "");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number } | null>(
    null
  );

  useEffect(() => {
    const fromHash = window.location.hash.replace("#", "");
    if (tabs.some((t) => t.key === fromHash)) setActive(fromHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    const el = tabRefs.current[active];
    if (el) {
      setPillStyle({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [active]);

  const selectTab = (key: string) => {
    setActive(key);
    window.history.replaceState(null, "", `#${key}`);
  };

  const activeTab = tabs.find((t) => t.key === active) ?? tabs[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="sticky top-14 z-[5] elevate-sm relative -mx-4 flex gap-1 overflow-x-auto border-b border-border bg-bg px-4 py-2 sm:mx-0 sm:rounded-lg sm:px-1"
      >
        {pillStyle && (
          <span
            aria-hidden="true"
            className="motion-premium absolute bottom-1.5 top-1.5 rounded-full bg-[var(--badge-orange-bg)]"
            style={{
              left: pillStyle.left,
              width: pillStyle.width,
              transitionProperty: "left, width",
              transitionDuration: "var(--duration-base)",
            }}
          />
        )}
        {tabs.map((tab) => (
          <button
            key={tab.key}
            ref={(el) => {
              tabRefs.current[tab.key] = el;
            }}
            type="button"
            role="tab"
            aria-selected={active === tab.key}
            onClick={() => selectTab(tab.key)}
            className={`motion-premium tap-target relative z-[1] shrink-0 whitespace-nowrap rounded-full px-3 text-sm font-medium ${
              active === tab.key
                ? "text-[var(--badge-orange-fg)]"
                : "text-muted hover:bg-surface2"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div key={active} className="tab-panel-in mt-6">
        {activeTab?.content}
      </div>
    </div>
  );
}
