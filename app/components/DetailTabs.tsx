"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

// Design Foundation session — generalizes BookTabs' tab-bar mechanics
// (sticky, horizontally-scrollable, never wraps to two rows, sliding orange
// pill measured via refs, active tab synced to the URL hash) into a reusable
// shell every one of the 8 new sections' detail pages composes against,
// instead of copy-pasting BookTabs 8 times. BookTabs itself is intentionally
// left untouched (it has book-specific logic — quote category filtering,
// the drop-cap lede, chapter numbering — that doesn't generalize cleanly),
// but any future new section should use THIS component, not fork BookTabs
// again. See docs/SCHEMA_SECTIONS.md "Shared architecture."
export type DetailTab = {
  key: string;
  label: string;
  content: ReactNode;
};

export default function DetailTabs({ tabs }: { tabs: DetailTab[] }) {
  const [active, setActive] = useState<string>(tabs[0]?.key ?? "");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const fromHash = window.location.hash.replace("#", "");
    if (tabs.some((t) => t.key === fromHash)) setActive(fromHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    const el = tabRefs.current[active];
    if (el) setPillStyle({ left: el.offsetLeft, width: el.offsetWidth });
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
        aria-label="Sections"
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
