import Link from "next/link";
import type { Book } from "@/lib/books";

// v4 (Stage 17, density redesign): replaces the v3 cover-forward tile
// entirely. Thai's brief: no cover image/icon, no per-card gap — a plain
// rectangular row with exactly three lines (title, author, a short
// description) so a shelf of dozens of books reads as one dense, scannable
// list instead of a grid of boxes with air between them ("sell more space").
// See docs/DESIGN_SYSTEM.md v4 "Density over imagery." Rendered as a single
// row here; the bordered/divided list container that gives rows their
// orange-outlined "box" look lives one level up in `BookList` so many rows
// share one border instead of each row drawing its own.
function firstLine(text: string, maxLen = 140): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLen) return clean;
  return `${clean.slice(0, maxLen).replace(/\s+\S*$/, "")}…`;
}

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link
      href={`/book/${book.id}`}
      className="book-row motion-premium tap-target block px-4 py-3"
    >
      <div className="font-medium leading-snug">{book.title}</div>
      <div className="mt-0.5 text-sm text-muted">{book.author}</div>
      <div className="mt-1 line-clamp-1 text-sm text-muted">
        {firstLine(book.summary)}
      </div>
    </Link>
  );
}
