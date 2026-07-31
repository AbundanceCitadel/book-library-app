"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Book, Quote } from "@/lib/books";
import { splitParagraphs } from "@/lib/paragraphs";
import Badge from "./Badge";

// v2 (Stage 15): replaces the single long-scroll book detail layout. See
// docs/DESIGN_SYSTEM.md "New Components" — sticky, horizontally-scrollable
// tab bar (never wraps to two rows), active tab synced to the URL hash so a
// specific tab is linkable and survives a refresh with no server state.
// v3 (Stage 16): sliding active-tab pill (measured via refs, not a static
// underline), tab-panel fade/slide transition on switch, and a full redesign
// of the Quotes tab — see docs/DESIGN_SYSTEM.md "Quotes get special
// treatment."
// v2.1 (8-Tab Content Structure Rollout): "Quotes" renamed to "Highlights &
// Quotes" below (label-only change, same data/tab). The three other approved
// new tabs (Concepts & Frameworks, Apply This, Critical Take) are NOT built
// here yet — this rollout's scope was schema/pipeline/content, not the UI
// build. `Book.conceptsFrameworks` / `applyThis` / `criticalTake` (lib/books.ts)
// exist and are being populated by content retrofits, but nothing renders them
// yet. Building the 3 new tabs is a separate follow-up session.
const TABS = [
  { key: "summary", label: "Summary" },
  { key: "chapters", label: "Chapters" },
  { key: "lessons", label: "Key Lessons" },
  { key: "quotes", label: "Highlights & Quotes" },
  { key: "author", label: "Author" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

function groupQuotesByCategory(quotes: Quote[]): Record<string, Quote[]> {
  return quotes.reduce<Record<string, Quote[]>>((acc, q) => {
    const cat = q.category ?? "General";
    (acc[cat] ??= []).push(q);
    return acc;
  }, {});
}

export default function BookTabs({
  book,
  relatedBooksInfo,
}: {
  book: Book;
  relatedBooksInfo: { id: string; title: string }[];
}) {
  const [active, setActive] = useState<TabKey>("summary");
  const [quoteFilter, setQuoteFilter] = useState<string | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const fromHash = window.location.hash.replace("#", "");
    if (TABS.some((t) => t.key === fromHash)) setActive(fromHash as TabKey);
  }, []);

  useLayoutEffect(() => {
    const el = tabRefs.current[active];
    if (el) {
      setPillStyle({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [active]);

  const selectTab = (key: TabKey) => {
    setActive(key);
    window.history.replaceState(null, "", `#${key}`);
  };

  const chapterLabel = book.structureType === "parts" ? "Part" : "Chapter";
  const quotesByCategory = groupQuotesByCategory(book.quotes);
  const quoteCategories = Object.keys(quotesByCategory);
  const visibleQuoteEntries = quoteFilter
    ? [[quoteFilter, quotesByCategory[quoteFilter]] as [string, Quote[]]]
    : Object.entries(quotesByCategory);

  const summaryParagraphs = splitParagraphs(book.summary);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Book sections"
        className="sticky top-14 z-[5] elevate-sm relative -mx-4 flex gap-1 overflow-x-auto border-b border-border bg-bg px-4 py-2 sm:mx-0 sm:rounded-lg sm:px-1"
      >
        {pillStyle && (
          <span
            aria-hidden="true"
            className="motion-premium absolute bottom-1.5 top-1.5 rounded-full bg-[var(--badge-gold-bg)]"
            style={{
              left: pillStyle.left,
              width: pillStyle.width,
              transitionProperty: "left, width",
              transitionDuration: "var(--duration-base)",
            }}
          />
        )}
        {TABS.map((tab) => (
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
                ? "text-[var(--badge-gold-fg)]"
                : "text-muted hover:bg-surface2"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div key={active} className="tab-panel-in mt-6">
        {active === "summary" && (
          <section>
            <div className="prose-reading">
              {summaryParagraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "lede-dropcap" : undefined}>
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="elevate-sm rounded-xl border border-border bg-surface p-4">
                <h2 className="text-base font-semibold">Who This Is For</h2>
                <p className="prose-reading mt-2 text-sm">{book.whoThisIsFor}</p>
              </div>
              <div className="elevate-sm rounded-xl border border-border bg-surface p-4">
                <h2 className="text-base font-semibold">When To Read This</h2>
                <p className="prose-reading mt-2 text-sm">{book.whenToReadThis}</p>
              </div>
            </div>
            {relatedBooksInfo.length > 0 && (
              <div className="mt-8 border-t border-border pt-6">
                <h2 className="text-xl font-semibold">Related Books</h2>
                <ul className="mt-3 space-y-1">
                  {relatedBooksInfo.map((rel) => (
                    <li key={rel.id}>
                      <Link
                        href={`/book/${rel.id}`}
                        className="tap-target text-sm text-teal-400 hover:underline"
                      >
                        {rel.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {active === "chapters" && (
          <section>
            <ol className="space-y-8 border-l-2 border-border pl-4">
              {book.sections
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((section) => (
                  <li key={section.order} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[1.45rem] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--badge-gold-bg)] text-[10px] font-semibold text-[var(--badge-gold-fg)]"
                    >
                      {section.order}
                    </span>
                    <div className="text-xs font-semibold uppercase tracking-wide text-gold-400">
                      {chapterLabel} {section.order}
                    </div>
                    <h3 className="mt-0.5 text-base font-semibold">{section.title}</h3>
                    <div className="prose-reading mt-2 text-sm">
                      {splitParagraphs(section.summary).map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                    {section.keyLessons && section.keyLessons.length > 0 && (
                      <ul className="elevate-sm mt-3 space-y-1.5 rounded-lg bg-surface p-3">
                        {section.keyLessons.map((l, i) => (
                          <li key={i} className="flex gap-2 text-sm">
                            <span className="mt-0.5 text-gold-500" aria-hidden="true">
                              ›
                            </span>
                            <span>{l}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
            </ol>
          </section>
        )}

        {active === "lessons" && (
          <section>
            <ul className="space-y-3">
              {book.keyLessons.map((lesson, i) => (
                <li
                  key={i}
                  className="elevate-sm flex gap-3 rounded-lg border border-border bg-surface p-3 text-sm"
                >
                  <span className="mt-0.5 text-gold-500" aria-hidden="true">
                    ✓
                  </span>
                  <span className="prose-reading text-sm">{lesson}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {active === "quotes" && (
          <section>
            {quoteCategories.length > 1 && (
              <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter quotes by theme">
                <button
                  type="button"
                  onClick={() => setQuoteFilter(null)}
                  className={`motion-premium tap-target rounded-full border px-3 text-xs font-medium ${
                    quoteFilter === null
                      ? "border-transparent bg-[var(--badge-gold-bg)] text-[var(--badge-gold-fg)]"
                      : "border-border text-muted hover:bg-surface2"
                  }`}
                >
                  All ({book.quotes.length})
                </button>
                {quoteCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setQuoteFilter(cat)}
                    className={`motion-premium tap-target rounded-full border px-3 text-xs font-medium ${
                      quoteFilter === cat
                        ? "border-transparent bg-[var(--badge-gold-bg)] text-[var(--badge-gold-fg)]"
                        : "border-border text-muted hover:bg-surface2"
                    }`}
                  >
                    {cat} ({quotesByCategory[cat].length})
                  </button>
                ))}
              </div>
            )}
            <div className="space-y-8">
              {visibleQuoteEntries.map(([cat, quotes]) => (
                <div key={cat}>
                  {!quoteFilter && (
                    <h3 className="mb-3 text-sm font-semibold text-teal-400">{cat}</h3>
                  )}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {quotes.map((q, i) => (
                      <blockquote
                        key={i}
                        className="quote-card elevate-lg rounded-xl border border-border bg-surface p-5 pt-7"
                      >
                        <p className="prose-reading italic">{q.text}</p>
                        <div className="mt-3 text-xs not-italic text-muted">
                          — {q.attribution}
                        </div>
                      </blockquote>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {active === "author" && (
          <section>
            {book.authorBio ? (
              <>
                <h2 className="text-xl font-semibold">{book.authorBio.name}</h2>
                <div className="prose-reading mt-3">
                  {splitParagraphs(book.authorBio.bio).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                {book.authorBio.notableWorks.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold">Other Notable Works</h3>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {book.authorBio.notableWorks.map((w) => (
                        <Badge key={w} tone="teal">
                          {w}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-muted">
                Author bio not written yet for this entry — this is a pre-v2 book,
                see <code>ROADMAP.md</code> Stage 15 for the backfill plan.
              </p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
