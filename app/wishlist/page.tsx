import {
  getWishlistBooks,
  getWishlistCatalogEntries,
  CATEGORY_LABELS,
} from "@/lib/books";
import BookList from "@/app/components/BookList";
import BackLink from "@/app/components/BackLink";

// v4 (Stage 17): reserved, isolated section for books Thai wants to add to
// the library but doesn't physically own yet. Deliberately kept out of the
// 16 category shelves entirely — his explicit instruction: don't dilute the
// existing sections, which already represent real work (376 owned titles,
// most still unwritten). This page is the "somewhere else" for that future
// expansion, built now so the data model and routing exist before any
// non-owned book is ever added — see docs/SCHEMA.md "Wishlist / owned" and
// DECISIONS.md for the full rationale. Empty today: nothing is marked
// `owned: false` yet in either content/books/*.json or content/catalog.json.
export default function WishlistPage() {
  const books = getWishlistBooks();
  const catalogOnly = getWishlistCatalogEntries();
  const total = books.length + catalogOnly.length;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <BackLink label="Back" fallbackHref="/" />
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Wishlist
      </h1>
      <p className="mt-1 text-sm text-muted">
        Books Thai wants but doesn&rsquo;t own yet — kept separate from his 16
        owned-library shelves.
      </p>

      {total === 0 ? (
        <div className="mt-8 rounded-xl border-2 border-dashed border-border p-6 text-sm text-muted">
          Nothing here yet. This is where books Thai wants to add later —
          without owning a physical or digital copy — will show up, isolated
          from the shelves above so they never get counted as part of the
          376-title owned library.
        </div>
      ) : (
        <>
          {books.length > 0 && (
            <div className="mt-6">
              <BookList books={books} />
            </div>
          )}
          {catalogOnly.length > 0 && (
            <>
              <h2 className="mt-10 text-sm font-semibold text-muted">
                On the wishlist, not yet summarized ({catalogOnly.length})
              </h2>
              <ul className="mt-3 divide-y divide-border text-sm">
                {catalogOnly.map((entry) => (
                  <li
                    key={entry.title}
                    className="flex items-baseline justify-between gap-3 py-2"
                  >
                    <span>{entry.title}</span>
                    <span className="shrink-0 text-xs text-muted">
                      {entry.author}
                      {entry.categories[0] &&
                        ` · ${CATEGORY_LABELS[entry.categories[0]] ?? entry.categories[0]}`}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </main>
  );
}
