import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllBooks,
  getAllCategories,
  getUnwrittenCatalogEntries,
  CATEGORY_LABELS,
  CATEGORY_ICONS,
} from "@/lib/books";
import BookCard from "@/app/components/BookCard";

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ category }));
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const label = CATEGORY_LABELS[params.category];
  if (!label) notFound();

  const books = getAllBooks().filter((b) =>
    b.categories.includes(params.category)
  );
  const unwritten = getUnwrittenCatalogEntries(params.category);
  const totalInLibrary = books.length + unwritten.length;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="tap-target -ml-1 text-sm text-muted hover:text-gold-400 hover:underline"
      >
        ← All categories
      </Link>
      <h1 className="mt-2 flex items-center gap-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-2xl"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, var(--badge-gold-bg), transparent 70%)",
          }}
          aria-hidden="true"
        >
          {CATEGORY_ICONS[params.category] ?? "📚"}
        </span>
        {label}
      </h1>
      <p className="mt-1 text-sm text-muted">
        {totalInLibrary} book{totalInLibrary === 1 ? "" : "s"} in this section
        {unwritten.length > 0 && ` — ${books.length} with a full summary so far`}
      </p>

      {books.length === 0 ? (
        <p className="mt-8 text-sm text-muted">
          No full summaries in this section yet.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

      {unwritten.length > 0 && (
        <>
          <h2 className="mt-10 text-sm font-semibold text-muted">
            On the shelf, not yet summarized ({unwritten.length})
          </h2>
          <ul className="mt-3 divide-y divide-border text-sm">
            {unwritten.map((entry) => (
              <li
                key={entry.title}
                className="flex items-baseline justify-between gap-3 py-2"
              >
                <span>{entry.title}</span>
                <span className="shrink-0 text-xs text-muted">
                  {entry.author}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
