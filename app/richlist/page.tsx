import {
  getAllRichListEntries,
  RICHLIST_CATEGORY_LABELS,
} from "@/lib/richlist";
import SectionEntryCard from "@/app/components/SectionEntryCard";
import BackLink from "@/app/components/BackLink";

// Design Foundation session — Section 3, Rich List. Sorted by rank (see
// lib/richlist.ts) rather than grouped by category on the listing page —
// unlike the other sections, rank order is the whole point of a "rich list,"
// so a category-grouped view would bury the thing visitors actually come
// for. Category still shows as a badge per entry. See
// docs/SCHEMA_SECTIONS.md "RichListEntry."
export default function RichListPage() {
  const entries = getAllRichListEntries();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <BackLink label="All sections" fallbackHref="/" />
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Rich List
      </h1>
      <p className="mt-1 text-sm text-muted">
        The world&rsquo;s richest people, ranked, with a portfolio/holdings
        breakdown per person. Scaffolding pass — 2 example entries, real
        Forbes 2026 figures, snapshot dated per entry.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {entries.map((e) => (
          <SectionEntryCard
            key={e.id}
            href={`/richlist/${e.id}`}
            title={`#${e.rank} ${e.name}`}
            meta={`$${e.netWorthUsdBillions}B`}
            badge={RICHLIST_CATEGORY_LABELS[e.category] ?? e.category}
            blurb={`${e.country} · as of ${e.asOfDate}`}
          />
        ))}
      </div>

      {entries.length === 0 && (
        <p className="mt-8 text-sm text-muted">No entries yet.</p>
      )}
    </main>
  );
}
