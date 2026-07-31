import type { Book } from "@/lib/books";
import BookCard from "./BookCard";

// v4 (Stage 17, density redesign): one shared, orange-bordered container for
// every list of BookCard rows (category pages, search results) — a single
// column, divided only by a 1px border between rows, no per-row gap. This is
// the literal "box with an orange border" Thai asked for, drawn once around
// the whole list rather than once per card, so the list reads as one
// continuous shelf, not a stack of separate boxes with visual air between
// them. See docs/DESIGN_SYSTEM.md v4.
export default function BookList({ books }: { books: Book[] }) {
  return (
    <div className="divide-y divide-border overflow-hidden rounded-xl border-2 border-orange-600 bg-surface">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
