import {
  getAllProfiles,
  getAllPeopleCategories,
  PEOPLE_CATEGORY_LABELS,
  PEOPLE_CATEGORY_ICONS,
} from "@/lib/people";
import { groupByKey, firstSentences } from "@/lib/content";
import SectionEntryCard from "@/app/components/SectionEntryCard";
import BackLink from "@/app/components/BackLink";

// Design Foundation session — Section 2, Famous People / Profiles. Listing
// page groups the (currently 1) example entry by category, mirroring the
// book library's shelf pattern. See docs/SCHEMA_SECTIONS.md "Profile" for
// the taxonomy rationale and docs/DESIGN_SYSTEM.md v6 for the homepage tile
// this section is reached from.
export default function PeoplePage() {
  const profiles = getAllProfiles();
  const grouped = groupByKey(profiles, (p) => p.category);
  const categories = getAllPeopleCategories();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <BackLink label="All sections" fallbackHref="/" />
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Famous People / Profiles
      </h1>
      <p className="mt-1 text-sm text-muted">
        Biographical profiles — brief life summary, achievements, and
        timeframe. This section is a scaffolding pass with example entries
        only; full population is a future session.
      </p>

      {categories.map((cat) => {
        const entries = grouped[cat] ?? [];
        if (entries.length === 0) return null;
        return (
          <div key={cat} className="mt-8">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-muted">
              <span aria-hidden="true">{PEOPLE_CATEGORY_ICONS[cat]}</span>
              {PEOPLE_CATEGORY_LABELS[cat]}
            </h2>
            <div className="mt-3 flex flex-col gap-3">
              {entries.map((p) => (
                <SectionEntryCard
                  key={p.id}
                  href={`/people/${p.id}`}
                  title={p.name}
                  meta={p.timeframe}
                  blurb={firstSentences(p.summary)}
                />
              ))}
            </div>
          </div>
        );
      })}

      {profiles.length === 0 && (
        <p className="mt-8 text-sm text-muted">No profiles written yet.</p>
      )}
    </main>
  );
}
