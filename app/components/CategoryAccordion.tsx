import Link from "next/link";
import type { Book } from "@/lib/books";
import BookCard from "./BookCard";

// v2 (Stage 15): the home page's primary browse surface. Built on native
// <details>/<summary> rather than a useState accordion — accessible and
// keyboard-operable for free, and needs no client JS at all. See
// docs/DESIGN_SYSTEM.md "New Components."
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
  return (
    <details className="rounded-xl border border-border bg-surface">
      <summary className="tap-target flex cursor-pointer items-center gap-3 px-4 py-3">
        <span className="text-xl" aria-hidden="true">
          {icon}
        </span>
        <span className="flex-1 text-sm font-medium">{label}</span>
        <span className="whitespace-nowrap text-xs text-muted">
          {count} book{count === 1 ? "" : "s"}
        </span>
        <svg
          className="accordion-chevron h-4 w-4 shrink-0 text-muted transition-transform duration-200"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </summary>
      <div className="border-t border-border px-4 py-4">
        {books.length === 0 ? (
          <p className="text-sm text-muted">
            No full summaries in this section yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
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
    </details>
  );
}
