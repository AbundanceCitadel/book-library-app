import { getAllBooks, getAllCategories, getLibraryCatalog, CATEGORY_LABELS, CATEGORY_ICONS } from "@/lib/books";
import CategoryAccordion from "./components/CategoryAccordion";
import LibraryStats from "./components/LibraryStats";

export default function HomePage() {
  const books = getAllBooks();
  const categories = getAllCategories();
  const catalog = getLibraryCatalog();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-semibold sm:text-3xl">Book Library</h1>
      <p className="mt-1 text-sm text-muted">
        Every book on Thai&apos;s shelves, in one place.
      </p>
      <LibraryStats books={books} />

      {/* v2 (Stage 15): collapsible category sections replace the old grid +
          separate flat "All Books" list — collapsed shows name + count,
          expanded shows the written books inline. See docs/DESIGN_SYSTEM.md
          "New Components" for the judgment call on keeping /category pages
          alongside this. */}
      <h2 className="mt-10 text-lg font-semibold">Browse by Category</h2>
      <div className="mt-4 space-y-2">
        {categories.map((cat) => {
          const count = catalog.length
            ? catalog.filter((c) => c.categories.includes(cat)).length
            : books.filter((b) => b.categories.includes(cat)).length;
          const booksInCategory = books.filter((b) => b.categories.includes(cat));
          return (
            <CategoryAccordion
              key={cat}
              category={cat}
              icon={CATEGORY_ICONS[cat] ?? "📚"}
              label={CATEGORY_LABELS[cat]}
              count={count}
              books={booksInCategory}
            />
          );
        })}
      </div>
    </main>
  );
}
