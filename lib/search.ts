import { getAllBooks, getLibraryCatalog, isOwned, CATEGORY_LABELS } from "./books";

// v4 (Stage 17): Stage 8 ("Search & Filtering") finally implemented, scoped
// to what Thai actually asked for — search by title or author as another way
// to reach a book, instead of only being able to get there by opening a
// category first. Deliberately covers the *whole* library (all 376 catalog
// titles, not just the ~70 with full written summaries) since the point is
// finding a book fast among hundreds — a written entry links straight to its
// detail page, an unwritten catalog entry links to its category page (the
// closest real destination that exists for it today) and is labeled so it's
// clear it's not a full summary yet. See docs/DESIGN_SYSTEM.md v4 "Search."
export type SearchEntry = {
  key: string;
  code: string;
  title: string;
  author: string;
  href: string;
  written: boolean;
  owned: boolean;
  categoryLabel?: string;
};

function normalize(t: string): string {
  return t.trim().toLowerCase();
}

function categoryHref(categories: string[]): string {
  const first = categories[0];
  return first ? `/category/${first}` : "/";
}

export function getSearchIndex(): SearchEntry[] {
  const books = getAllBooks();
  const catalog = getLibraryCatalog();
  const writtenTitles = new Set(books.map((b) => normalize(b.title)));

  const fromBooks: SearchEntry[] = books.map((b) => ({
    key: `book:${b.id}`,
    code: b.code,
    title: b.title,
    author: b.author,
    href: `/book/${b.id}`,
    written: true,
    owned: isOwned(b),
    categoryLabel: CATEGORY_LABELS[b.categories[0]] ?? b.categories[0],
  }));

  const fromCatalog: SearchEntry[] = catalog
    .filter((c) => !writtenTitles.has(normalize(c.title)))
    .map((c) => ({
      key: `catalog:${c.title}`,
      code: c.code,
      title: c.title,
      author: c.author,
      href: categoryHref(c.categories),
      written: false,
      owned: isOwned(c),
      categoryLabel: CATEGORY_LABELS[c.categories[0]] ?? c.categories[0],
    }));

  return [...fromBooks, ...fromCatalog].sort((a, b) =>
    a.title.localeCompare(b.title)
  );
}
