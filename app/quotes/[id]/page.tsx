import { notFound } from "next/navigation";
import {
  getAllQuoteCollections,
  getQuoteCollectionById,
  QUOTE_CATEGORY_LABELS,
} from "@/lib/quotes";
import BackLink from "@/app/components/BackLink";
import RelatedLinks from "@/app/components/RelatedLinks";
import DetailTabs from "@/app/components/DetailTabs";

export function generateStaticParams() {
  return getAllQuoteCollections().map((c) => ({ id: c.id }));
}

// Design Foundation session — Section 4 detail page. Tab set: Quotes / About
// — deliberately just 2, the shallowest of any of the 8 new sections. The
// schema (lib/quotes.ts) only has two real fields worth separate tabs
// (the quotes themselves, grouped by theme category the same way BookTabs'
// Highlights & Quotes tab already groups book quotes; and a short "about
// this person" blurb) — building a 4-tab shell to match the other sections
// would mean inventing content the schema doesn't ask for. See
// docs/SCHEMA_SECTIONS.md "QuoteCollection."
export default function QuoteCollectionPage({ params }: { params: { id: string } }) {
  const collection = getQuoteCollectionById(params.id);
  if (!collection) notFound();

  const byCategory = collection.quotes.reduce<Record<string, typeof collection.quotes>>(
    (acc, q) => {
      (acc[q.category] ??= []).push(q);
      return acc;
    },
    {}
  );

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <BackLink label="Back" fallbackHref="/quotes" />
      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {collection.attributedTo}
      </h1>

      <div className="mt-6">
        <DetailTabs
          tabs={[
            {
              key: "quotes",
              label: "Quotes",
              content: (
                <div className="space-y-8">
                  {Object.entries(byCategory).map(([cat, quotes]) => (
                    <div key={cat}>
                      <h3 className="mb-3 text-sm font-semibold text-jade-400">
                        {QUOTE_CATEGORY_LABELS[cat] ?? cat}
                      </h3>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {quotes.map((q, i) => (
                          <blockquote
                            key={i}
                            className="quote-card elevate-lg rounded-xl border-2 border-orange-600/60 bg-surface p-5 pt-7"
                          >
                            <p className="prose-reading italic">{q.text}</p>
                            {q.source && (
                              <div className="mt-3 text-xs not-italic text-muted">— {q.source}</div>
                            )}
                          </blockquote>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ),
            },
            {
              key: "about",
              label: "About",
              content: <p className="prose-reading">{collection.about}</p>,
            },
          ]}
        />
      </div>

      <RelatedLinks items={collection.relatedIds} />
    </main>
  );
}
