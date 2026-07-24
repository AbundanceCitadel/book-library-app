import { getAllBooks, getAllCategories, getLibraryCatalog, CATEGORY_LABELS } from "@/lib/books";
import CategoryCard from "./components/CategoryCard";
import BookCard from "./components/BookCard";
import LibraryStats from "./components/LibraryStats";

export default function HomePage() {
  const books = getAllBooks();
  const categories = getAllCategories();
  const catalog = getLibraryCatalog();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-semibold sm:text-3xl">Book Library</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Every book on Thai&apos;s shelves, in one place.
      </p>
      <LibraryStats books={books} />

      <h2 className="mt-10 text-lg font-semibold">Browse by Category</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => {
          const count = catalog.length
            ? catalog.filter((c) => c.categories.includes(cat)).length
            : books.filter((b) => b.categories.includes(cat)).length;
          return (
            <CategoryCard
              key={cat}
              category={cat}
              label={CATEGORY_LABELS[cat]}
              count={count}
            />
          );
        })}
      </div>

      <h2 className="mt-10 text-lg font-semibold">All Books</h2>
      {books.length === 0 ? (
        <p className="mt-4 text-sm text-neutral-500">
          No books yet — the first entries land in Stage 7.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </main>
  );
}
