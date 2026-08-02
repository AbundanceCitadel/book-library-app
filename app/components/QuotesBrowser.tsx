"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

// Quotes — the exception, no tab structure. See docs/SECTIONS_SCHEMA.md §9
// and New Section Research/Section_Detail_Tab_Structures.md §9. Flat,
// filterable browsing list (by category, by speaker); tapping a quote
// expands a small non-tabbed card in place — confirmed with Thai via
// AskUserQuestion this session over a no-expansion alternative.
export type BrowsableQuote = {
  id: string;
  text: string;
  attribution: string;
  category: string;
  context?: string;
  speakerHref?: string;
  speakerLabel?: string;
};

export default function QuotesBrowser({ quotes }: { quotes: BrowsableQuote[] }) {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [speakerFilter, setSpeakerFilter] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(quotes.map((q) => q.category))).sort(),
    [quotes]
  );
  const speakers = useMemo(
    () => Array.from(new Set(quotes.map((q) => q.attribution))).sort(),
    [quotes]
  );

  const visible = quotes.filter(
    (q) =>
      (!categoryFilter || q.category === categoryFilter) &&
      (!speakerFilter || q.attribution === speakerFilter)
  );

  if (quotes.length === 0) {
    return (
      <p className="text-sm text-muted">
        No quotes written yet — part of the upcoming content-gathering pass
        against <code>New Section Research/quotes.md</code>.
      </p>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter quotes by category">
        <button
          type="button"
          onClick={() => setCategoryFilter(null)}
          className={`motion-premium tap-target rounded-full border px-3 text-xs font-medium ${
            categoryFilter === null
              ? "border-transparent bg-[var(--badge-orange-bg)] text-[var(--badge-orange-fg)]"
              : "border-border text-muted hover:bg-surface2"
          }`}
        >
          All categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategoryFilter(cat)}
            className={`motion-premium tap-target rounded-full border px-3 text-xs font-medium ${
              categoryFilter === cat
                ? "border-transparent bg-[var(--badge-orange-bg)] text-[var(--badge-orange-fg)]"
                : "border-border text-muted hover:bg-surface2"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter quotes by speaker">
        <button
          type="button"
          onClick={() => setSpeakerFilter(null)}
          className={`motion-premium tap-target rounded-full border px-3 text-xs font-medium ${
            speakerFilter === null
              ? "border-transparent bg-[var(--badge-jade-bg)] text-[var(--badge-jade-fg)]"
              : "border-border text-muted hover:bg-surface2"
          }`}
        >
          All speakers
        </button>
        {speakers.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSpeakerFilter(s)}
            className={`motion-premium tap-target rounded-full border px-3 text-xs font-medium ${
              speakerFilter === s
                ? "border-transparent bg-[var(--badge-jade-bg)] text-[var(--badge-jade-fg)]"
                : "border-border text-muted hover:bg-surface2"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <ul className="mt-6 space-y-3">
        {visible.map((q) => {
          const expanded = expandedId === q.id;
          return (
            <li key={q.id}>
              <button
                type="button"
                onClick={() => setExpandedId(expanded ? null : q.id)}
                aria-expanded={expanded}
                className="quote-card elevate-sm w-full rounded-xl border-2 border-orange-600/60 bg-surface p-4 pt-6 text-left"
              >
                <p className="prose-reading italic">{q.text}</p>
                <div className="mt-3 text-xs not-italic text-muted">
                  — {q.attribution}
                </div>
              </button>
              {expanded && (
                <div className="elevate-sm -mt-2 rounded-b-xl border-2 border-t-0 border-orange-600/30 bg-surface2 p-4 text-sm">
                  {q.context ? (
                    <p className="prose-reading">{q.context}</p>
                  ) : (
                    <p className="text-muted">No further context recorded.</p>
                  )}
                  {q.speakerHref && (
                    <Link
                      href={q.speakerHref}
                      className="tap-target mt-3 inline-block text-sm text-jade-400 hover:underline"
                    >
                      More from {q.speakerLabel ?? q.attribution} →
                    </Link>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
