"use client";

import { useId, useState } from "react";
import Link from "next/link";
import type { Book } from "@/lib/books";
import BookCard from "./BookCard";

// v3 (Stage 16, premium redesign): converted from a native <details>/<summary>
// to a small client component so expand/collapse can be smoothly animated
// (grid-template-rows height transition — see globals.css .accordion-panel).
// This is a deliberate trade-off away from Stage 15's "zero client JS" choice
// — flagged explicitly in docs/DESIGN_SYSTEM.md rather than made silently.
// Accessibility is re-implemented by hand rather than traded away: a real
// <button aria-expanded>, a `role="region"` panel with `aria-labelledby`, and
// full keyboard operability (native <button> gives Enter/Space for free).
export default function CategoryAccordion({
  category,
  icon,
  label,
  count,
  books,
}: {
  category: string;
  icon: string;
  label: string;
  count: number;
  books: Book[];
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface elevate-sm">
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="motion-premium tap-target flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left hover:bg-surface2"
      >
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, var(--badge-gold-bg), transparent 70%)",
          }}
          aria-hidden="true"
        >
          {icon}
        </span>
        <span className="flex-1 text-sm font-medium">{label}</span>
        <span className="whitespace-nowrap text-xs text-muted">
          {count} book{count === 1 ? "" : "s"}
        </span>
        <svg
          className="accordion-chevron h-4 w-4 shrink-0 text-muted"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          style={{ transform: open ? "rotate(180deg)" : undefined }}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className="accordion-panel"
        data-open={open}
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
      >
        <div>
          <div className="border-t border-border px-4 py-4">
            {books.length === 0 ? (
              <p className="text-sm text-muted">
                No full summaries in this section yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {books.map((book, i) => (
                  <div
                    key={book.id}
                    className={open ? "accordion-item-in" : undefined}
                    style={{ animationDelay: open ? `${Math.min(i, 6) * 35}ms` : undefined }}
                  >
                    <BookCard book={book} />
                  </div>
                ))}
              </div>
            )}
            <Link
              href={`/category/${category}`}
              className="tap-target mt-4 inline-block text-sm text-teal-400 hover:underline"
            >
              View full category page →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
