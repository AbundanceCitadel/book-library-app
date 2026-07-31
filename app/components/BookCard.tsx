import Link from "next/link";
import type { Book } from "@/lib/books";
import { CATEGORY_LABELS, CATEGORY_ICONS } from "@/lib/categories";
import { coverGradientCss } from "@/lib/covers";
import Badge from "./Badge";

// v3 (Stage 16, premium redesign): cover-forward tile, replacing the plain
// text-row card. See docs/DESIGN_SYSTEM.md "Visual richness without real
// cover art" — the top panel is a deterministic generative gradient (falls
// back-compatible with a real `coverImage` later, preferred over the
// gradient if/when populated) with the book's primary category emoji
// rendered large as a central emblem, echoing the category-browsing badge
// treatment in CategoryAccordion so browsing-by-book and browsing-by-category
// feel like the same visual system.
export default function BookCard({ book }: { book: Book }) {
  const primaryCategory = book.categories[0];
  const emblem = CATEGORY_ICONS[primaryCategory] ?? "📚";

  return (
    <Link
      href={`/book/${book.id}`}
      className="book-card group flex flex-col overflow-hidden rounded-xl border border-border bg-surface"
    >
      <div
        className="book-cover flex aspect-[5/3] items-center justify-center border-b border-border sm:aspect-[16/9]"
        style={
          book.coverImage
            ? { backgroundImage: `url(${book.coverImage})`, backgroundSize: "cover", backgroundPosition: "center" }
            : { backgroundImage: coverGradientCss(book.id) }
        }
        aria-hidden="true"
      >
        {!book.coverImage && (
          <span className="text-4xl opacity-90 drop-shadow-sm sm:text-5xl">
            {emblem}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <div className="font-medium leading-snug">{book.title}</div>
          <div className="mt-0.5 text-sm text-muted">{book.author}</div>
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-1.5">
          {book.categories.slice(0, 2).map((cat) => (
            <Badge key={cat} tone="gold">
              {CATEGORY_LABELS[cat] ?? cat}
            </Badge>
          ))}
          <span className="ml-auto whitespace-nowrap text-xs text-muted">
            ~{book.estimatedOriginalReadingTimeMinutes} min
          </span>
        </div>
      </div>
    </Link>
  );
}
