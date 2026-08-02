import {
  getAllRulers,
  getAllRulerCountries,
  RULER_COUNTRY_LABELS,
  RULER_COUNTRY_ICONS,
} from "@/lib/rulers";
import { groupByKey, firstSentences } from "@/lib/content";
import SectionEntryCard from "@/app/components/SectionEntryCard";
import BackLink from "@/app/components/BackLink";

// Design Foundation session — Section 5, Kings, Generals & Presidents.
// Grouped by country/civilization (see lib/rulersCountries.ts), spanning all
// of history, not just modern heads of state.
export default function RulersPage() {
  const rulers = getAllRulers();
  const grouped = groupByKey(rulers, (r) => r.country);
  const countries = getAllRulerCountries();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <BackLink label="All sections" fallbackHref="/" />
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Kings, Generals &amp; Presidents
      </h1>
      <p className="mt-1 text-sm text-muted">
        Historically significant rulers, military leaders, and statesmen
        across history, grouped by country. Scaffolding pass — 2 example
        entries.
      </p>

      {countries.map((c) => {
        const entries = grouped[c] ?? [];
        if (entries.length === 0) return null;
        return (
          <div key={c} className="mt-8">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-muted">
              <span aria-hidden="true">{RULER_COUNTRY_ICONS[c]}</span>
              {RULER_COUNTRY_LABELS[c]}
            </h2>
            <div className="mt-3 flex flex-col gap-3">
              {entries.map((r) => (
                <SectionEntryCard
                  key={r.id}
                  href={`/rulers/${r.id}`}
                  title={r.name}
                  meta={`${r.title}, ${r.era}`}
                  blurb={firstSentences(r.summary)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </main>
  );
}
