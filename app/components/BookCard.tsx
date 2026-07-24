import Link from "next/link";
import type { Book } from "@/lib/books";
import { CATEGORY_LABELS } from "@/lib/books";
import Badge from "./Badge";

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link
      href={`/book/${book.id}`}
      className="tap-target flex flex-col gap-2 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-gold-700"
    >
      <div>
        <div className="font-medium leading-snug">{book.title}</div>
        <div className="mt-0.5 text-sm text-muted">{book.author}</div>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {book.categories.slice(0, 2).map((cat) => (
          <Badge key={cat} tone="gold">
            {CATEGORY_LABELS[cat] ?? cat}
          </Badge>
        ))}
        <span className="ml-auto whitespace-nowrap text-xs text-muted">
          ~{book.estimatedOriginalReadingTimeMinutes} min
        </span>
      </div>
    </Link>
  );
}
