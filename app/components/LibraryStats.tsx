import { Book, getLibraryCatalog } from "@/lib/books";

function StatTile({ value, label }: { value: string; label: string }) {
  // v4 (Stage 17): orange-bordered tile, matching the new book-list/box
  // treatment used everywhere else — see docs/DESIGN_SYSTEM.md v4.
  return (
    <div className="elevate-sm rounded-xl border-2 border-orange-600/60 bg-surface p-4 text-center">
      <div className="text-2xl font-semibold text-orange-400 sm:text-3xl">
        {value}
      </div>
      <div className="mt-1 text-xs text-muted">{label}</div>
    </div>
  );
}

// Session 6 "library mindset" feature — see DECISIONS.md and ROADMAP.md Stage 7.
// Thai's framing: this is a *library*, not just a list of summaries — he wants
// to see its real scale in the app, not only in the catalog spreadsheet. So
// the headline numbers here come from the full physical catalog (content/catalog.json,
// 376 titles as of Session 6), not just the books.length that have full
// synthesized entries so far — the "full summaries written" count is shown
// alongside it as progress, not the headline.
export default function LibraryStats({ books }: { books: Book[] }) {
  const catalog = getLibraryCatalog();
  const totalTitles = catalog.length || books.length;
  const categoriesWithCatalogEntries = new Set(catalog.flatMap((c) => c.categories))
    .size;

  return (
    <div className="mt-4 grid grid-cols-3 gap-3">
      <StatTile value={String(totalTitles)} label="titles in the library" />
      <StatTile
        value={String(categoriesWithCatalogEntries || new Set(books.flatMap((b) => b.categories)).size)}
        label="sections"
      />
      <StatTile
        value={String(books.length)}
        label={`full summar${books.length === 1 ? "y" : "ies"} written`}
      />
    </div>
  );
}
