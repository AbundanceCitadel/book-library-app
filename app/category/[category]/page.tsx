import { notFound } from "next/navigation";
import {
  getAllBooks,
  getAllCategories,
  getUnwrittenCatalogEntries,
  isOwned,
  CATEGORY_LABELS,
  CATEGORY_ICONS,
} from "@/lib/books";
import BookList from "@/app/components/BookList";
import BackLink from "@/app/components/BackLink";

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

  // v4 (Stage 17): category shelves only ever show owned books — see
  // lib/books.ts isOwned() / getWishlistBooks() and docs/SCHEMA.md.
  const books = getAllBooks().filter(
    (b) => isOwned(b) && b.categories.includes(params.category)
  );
  const unwritten = getUnwrittenCatalogEntries(params.category);
  const totalInLibrary = books.length + unwritten.length;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <BackLink label="Back" fallbackHref="/" />
      <h1 className="mt-2 flex items-center gap-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-2xl"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, var(--badge-orange-bg), transparent 70%)",
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
        <div className="mt-6">
          <BookList books={books} />
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
                className="flex items-baseline gap-3 py-2"
              >
                <span className="shrink-0 font-mono text-xs text-orange-400">
                  {entry.code}
                </span>
                <span className="flex-1">{entry.title}</span>
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
