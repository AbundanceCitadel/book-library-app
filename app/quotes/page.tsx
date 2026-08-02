import { getAllQuotes } from "@/lib/quotes";
import { resolveRelatedLinks } from "@/lib/related";
import BackLink from "@/app/components/BackLink";
import QuotesBrowser, { type BrowsableQuote } from "@/app/components/QuotesBrowser";

// Quotes — the exception, no [id] detail routes. See docs/SECTIONS_SCHEMA.md
// §9. Structure only — getAllQuotes() returns [] until content/quotes/*.json
// entries exist (see docs/SECTIONS_SCHEMA.md §10); QuotesBrowser renders an
// explicit empty state in that case rather than a blank page.
export default function QuotesPage() {
  const quotes = getAllQuotes();

  const browsable: BrowsableQuote[] = quotes.map((q) => {
    const [resolvedSpeaker] = q.speakerRef ? resolveRelatedLinks([q.speakerRef]) : [];
    return {
      id: q.id,
      text: q.text,
      attribution: q.attribution,
      category: q.category,
      context: q.context,
      speakerHref: resolvedSpeaker?.href,
      speakerLabel: resolvedSpeaker?.label,
    };
  });

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <BackLink label="Back" fallbackHref="/" />

      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        Quotes
      </h1>
      <p className="mt-1 text-muted">
        A flat, filterable collection — not individual multi-tab profile
        pages. Tap a quote for its context and, where available, a link to
        the speaker&apos;s own fuller profile.
      </p>

      <div className="mt-6">
        <QuotesBrowser quotes={browsable} />
      </div>
    </main>
  );
}
