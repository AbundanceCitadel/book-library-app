import { loadJsonEntries } from "./content";
import type { TimelineEvent, SectionQuote, CriticalTake } from "./sectionTypes";

// Kings, Generals & Presidents. Grouped by `country` (see
// lib/rulersCountries.ts), not a category array. Field shape follows the
// approved nine-section tab structure — 7 tabs: Overview, Rise to Power,
// Reign & Major Events, Achievements & Reforms, Death & Succession, Notable
// Quotes, Critical Take. Supersedes the earlier "Design Foundation"
// scaffolding shape — the 2 already-live entries were migrated onto this
// shape in the same pass that added these fields; `riseToPower`,
// `reignEvents`, and `criticalTake` are genuinely new and start
// empty/unwritten pending a backfill pass rather than fabricated.
export type Ruler = {
  id: string;
  name: string;
  country: string; // one of RULER_COUNTRY_LABELS' keys
  title: string; // e.g. "King", "General", "President", "Emperor"
  era: string; // e.g. "356–323 BC" or "1732–1799"

  overview: string;
  riseToPower: string;
  reignEvents: TimelineEvent[];
  achievementsReforms: string[];
  deathSuccession: string;
  notableQuotes: SectionQuote[];
  criticalTake: CriticalTake;

  relatedIds?: { section: string; id: string; label: string }[];
  dateAdded: string;
  sourceNotes?: string;
};

export function getAllRulers(): Ruler[] {
  return loadJsonEntries<Ruler>("rulers").sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

export function getRulerById(id: string): Ruler | undefined {
  return getAllRulers().find((r) => r.id === id);
}

export {
  RULER_COUNTRY_LABELS,
  RULER_COUNTRY_ICONS,
  getAllRulerCountries,
} from "./rulersCountries";
