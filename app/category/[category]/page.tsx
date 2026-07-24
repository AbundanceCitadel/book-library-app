import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBooks, getAllCategories, CATEGORY_LABELS, CATEGORY_ICONS } from "@/lib/books";
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

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="tap-target -ml-1 text-sm text-neutral-500 hover:text-accent-600 hover:underline dark:hover:text-accent-400"
      >
        ← All categories
      </Link>
      <h1 className="mt-2 flex items-center gap-2 text-2xl font-semibold sm:text-3xl">
        <span aria-hidden="true">{CATEGORY_ICONS[params.category] ?? "📚"}</span>
        {label}
      </h1>
      <p className="mt-1 text-sm text-neutral-500">
        {books.length} book{books.length === 1 ? "" : "s"}
      </p>

      {books.length === 0 ? (
        <p className="mt-8 text-sm text-neutral-500">
          No books in this category yet.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </main>
  );
}
