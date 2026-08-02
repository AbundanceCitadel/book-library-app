import {
  getAllCivilizations,
  getAllCivilizationRegions,
  CIVILIZATION_REGION_LABELS,
  CIVILIZATION_REGION_ICONS,
} from "@/lib/civilizations";
import { groupByKey, firstSentences } from "@/lib/content";
import SectionEntryCard from "@/app/components/SectionEntryCard";
import BackLink from "@/app/components/BackLink";

export default function CivilizationsPage() {
  const civs = getAllCivilizations();
  const grouped = groupByKey(civs, (c) => c.region);
  const regions = getAllCivilizationRegions();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <BackLink label="All sections" fallbackHref="/" />
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Civilizations &amp; Empires
      </h1>
      <p className="mt-1 text-sm text-muted">
        Major historical civilizations and empires, giving macro context
        around the Kings, Generals &amp; Presidents section&rsquo;s
        individual rulers. Scaffolding pass — 1 example entry.
      </p>

      {regions.map((r) => {
        const entries = grouped[r] ?? [];
        if (entries.length === 0) return null;
        return (
          <div key={r} className="mt-8">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-muted">
              <span aria-hidden="true">{CIVILIZATION_REGION_ICONS[r]}</span>
              {CIVILIZATION_REGION_LABELS[r]}
            </h2>
            <div className="mt-3 flex flex-col gap-3">
              {entries.map((c) => (
                <SectionEntryCard
                  key={c.id}
                  href={`/civilizations/${c.id}`}
                  title={c.name}
                  meta={c.era}
                  blurb={firstSentences(c.summary)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </main>
  );
}
