import { getAllQuoteCollections } from "@/lib/quotes";
import SectionEntryCard from "@/app/components/SectionEntryCard";
import BackLink from "@/app/components/BackLink";

// Design Foundation session — Section 4, Quotes. One card per attributed
// person (a "quote collection"), not a flat wall of individual quotes — see
// lib/quotes.ts for why this section's content model is deliberately
// lighter than the other 7.
export default function QuotesPage() {
  const collections = getAllQuoteCollections();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <BackLink label="All sections" fallbackHref="/" />
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Quotes
      </h1>
      <p className="mt-1 text-sm text-muted">
        Quotes by famous people, categorized by theme. Scaffolding pass — 1
        example collection.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {collections.map((c) => (
          <SectionEntryCard
            key={c.id}
            href={`/quotes/${c.id}`}
            title={c.attributedTo}
            meta={`${c.quotes.length} quote${c.quotes.length === 1 ? "" : "s"}`}
            blurb={c.about}
          />
        ))}
      </div>

      {collections.length === 0 && (
        <p className="mt-8 text-sm text-muted">No quote collections yet.</p>
      )}
    </main>
  );
}
