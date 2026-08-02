import { getAllQuoteCollections } from "@/lib/quotes";
import { getAllProfiles } from "@/lib/people";
import BackLink from "@/app/components/BackLink";
import QuotesBrowser, { type BrowsableQuote } from "@/app/components/QuotesBrowser";

// Quotes — the exception, no per-entry tab structure or [id] detail routes,
// per the approved nine-section tab proposal (New Section Research/
// Section_Detail_Tab_Structures.md §9): a single flat, filterable list
// instead of individual "quote collection" pages. Supersedes the earlier
// "Design Foundation" scaffolding (one card per attributed person, linking
// to a 2-tab detail page) — the 6 already-live quote collections are
// flattened into individual browsable quotes here at render time; no
// content migration was needed since the underlying content/quotes/*.json
// shape (one file per person, quotes grouped by category) already carries
// everything this flat view needs.
export default function QuotesPage() {
  const collections = getAllQuoteCollections();
  const profiles = getAllProfiles();

  const browsable: BrowsableQuote[] = collections.flatMap((c) => {
    const matchedProfile = profiles.find((p) => p.name === c.attributedTo);
    return c.quotes.map((q, i) => ({
      id: `${c.id}-${i}`,
      text: q.text,
      attribution: c.attributedTo,
      category: q.category,
      context: c.about,
      speakerHref: matchedProfile ? `/people/${matchedProfile.id}` : undefined,
      speakerLabel: matchedProfile?.name,
    }));
  });

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <BackLink label="All sections" fallbackHref="/" />
      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        Quotes
      </h1>
      <p className="mt-1 text-muted">
        A flat, filterable collection — not individual profile pages. Tap a
        quote for context and, where available, a link to the speaker&apos;s
        own fuller profile.
      </p>

      <div className="mt-6">
        <QuotesBrowser quotes={browsable} />
      </div>
    </main>
  );
}
