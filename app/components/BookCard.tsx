import Link from "next/link";
import type { Book } from "@/lib/books";

// v5 (Stage 18): each book is now its own separate box (own border, gap to
// its neighbor) rather than one row inside a shared-border list — Thai's
// explicit ask: "each one is a separate box," "box in box." Two rows inside
// the box: row 1 is the code + title + author together, row 2 is a short
// (2-3 sentence) description — replaces v4's three-stacked-lines layout.
// See docs/DESIGN_SYSTEM.md v5 and app/components/BookList.tsx (the grid
// wrapper that gives each card its gap).
function firstSentences(text: string, maxSentences = 3, maxLen = 280): string {
  const clean = text.replace(/\s+/g, " ").trim();
  const sentences = clean.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [clean];
  let out = sentences.slice(0, maxSentences).join("").trim();
  if (out.length > maxLen) {
    out = `${out.slice(0, maxLen).replace(/\s+\S*$/, "")}…`;
  } else if (sentences.length > maxSentences) {
    out = `${out}…`.replace(/\.…$/, "…");
  }
  return out;
}

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link
      href={`/book/${book.id}`}
      className="book-row motion-premium tap-target block rounded-xl border-2 border-orange-600/70 bg-surface p-4"
    >
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span className="shrink-0 font-mono text-xs text-orange-400">
          {book.code}
        </span>
        <span className="font-medium leading-snug">{book.title}</span>
        <span className="text-sm text-muted">— {book.author}</span>
      </div>
      <div className="mt-1.5 text-sm text-muted">
        {firstSentences(book.summary)}
      </div>
    </Link>
  );
}
