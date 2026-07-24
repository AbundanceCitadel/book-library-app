"use client";

import { useEffect, useState } from "react";
import type { Book, Quote } from "@/lib/books";
import { splitParagraphs } from "@/lib/paragraphs";
import Badge from "./Badge";

// v2 (Stage 15): replaces the single long-scroll book detail layout. See
// docs/DESIGN_SYSTEM.md "New Components" — sticky, horizontally-scrollable
// tab bar (never wraps to two rows), active tab synced to the URL hash so a
// specific tab is linkable and survives a refresh with no server state.
const TABS = [
  { key: "summary", label: "Summary" },
  { key: "chapters", label: "Chapters" },
  { key: "lessons", label: "Key Lessons" },
  { key: "quotes", label: "Quotes" },
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

export default function BookTabs({ book }: { book: Book }) {
  const [active, setActive] = useState<TabKey>("summary");

  useEffect(() => {
    const fromHash = window.location.hash.replace("#", "");
    if (TABS.some((t) => t.key === fromHash)) setActive(fromHash as TabKey);
  }, []);

  const selectTab = (key: TabKey) => {
    setActive(key);
    window.history.replaceState(null, "", `#${key}`);
  };

  const chapterLabel = book.structureType === "parts" ? "Part" : "Chapter";
  const quotesByCategory = groupQuotesByCategory(book.quotes);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Book sections"
        className="sticky top-[57px] z-[5] -mx-4 flex gap-1 overflow-x-auto border-b border-border bg-bg px-4 py-2 sm:mx-0 sm:px-0"
      >
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={active === tab.key}
            onClick={() => selectTab(tab.key)}
            className={`tap-target shrink-0 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors ${
              active === tab.key
                ? "bg-[var(--badge-gold-bg)] text-[var(--badge-gold-fg)]"
                : "text-muted hover:bg-surface2"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {active === "summary" && (
          <section>
            <div className="prose-reading">
              {splitParagraphs(book.summary).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <h2 className="text-lg font-semibold">Who This Is For</h2>
                <p className="prose-reading mt-2 text-sm">{book.whoThisIsFor}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold">When To Read This</h2>
                <p className="prose-reading mt-2 text-sm">{book.whenToReadThis}</p>
              </div>
            </div>
            {book.relatedBooks.length > 0 && (
              <div className="mt-8 border-t border-border pt-6">
                <h2 className="text-lg font-semibold">Related Books</h2>
                <ul className="mt-3 space-y-1">
                  {book.relatedBooks.map((relId) => (
                    <li key={relId}>
                      <a
                        href={`/book/${relId}`}
                        className="tap-target text-sm text-teal-400 hover:underline"
                      >
                        {relId}
                      </a>
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
                  <li key={section.order}>
                    <div className="text-xs font-semibold uppercase tracking-wide text-gold-400">
                      {chapterLabel} {section.order}
                    </div>
                    <h3 className="mt-0.5 font-medium">{section.title}</h3>
                    <div className="prose-reading mt-2 text-sm">
                      {splitParagraphs(section.summary).map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                    {section.keyLessons && section.keyLessons.length > 0 && (
                      <ul className="mt-3 space-y-1.5 rounded-lg bg-surface p-3">
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
                <li key={i} className="flex gap-2 text-sm">
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
          <section className="space-y-8">
            {Object.entries(quotesByCategory).map(([cat, quotes]) => (
              <div key={cat}>
                <h3 className="text-sm font-semibold text-teal-400">{cat}</h3>
                <div className="mt-3 space-y-4">
                  {quotes.map((q, i) => (
                    <blockquote key={i} className="border-l-2 border-gold-700 pl-4">
                      <p className="prose-reading italic">&ldquo;{q.text}&rdquo;</p>
                      <div className="mt-1 text-xs not-italic text-muted">
                        — {q.attribution}
                      </div>
                    </blockquote>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {active === "author" && (
          <section>
            {book.authorBio ? (
              <>
                <h2 className="text-lg font-semibold">{book.authorBio.name}</h2>
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
