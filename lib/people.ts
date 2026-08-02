import { loadJsonEntries } from "./content";
import type { TimelineEvent, NamedIdea, SectionQuote, CriticalTake } from "./sectionTypes";

// Famous People / Profiles. Field shape follows the approved nine-section
// tab structure (docs/SECTIONS_SCHEMA.md, New Section Research/
// Section_Detail_Tab_Structures.md §2) — 7 tabs: Overview, Timeline &
// Career, Key Achievements, Ideas & Principles, Notable Quotes, Legacy &
// Impact, Critical Take. Supersedes the earlier 4-field "Design Foundation"
// scaffolding (Bio/Achievements/Quotes/Legacy) — the 6 already-live entries
// were migrated onto this shape in the same pass that added these fields;
// `timeline` and `criticalTake` are genuinely new and start empty pending a
// backfill pass (rendered as an honest "not written yet" placeholder, see
// NotWritten.tsx, rather than fabricated).
export type Person = {
  id: string;
  name: string;
  category: string; // one of PEOPLE_CATEGORY_LABELS' keys
  timeframe: string; // e.g. "1955–2011" or "b. 1961"

  overview: string;
  timeline: TimelineEvent[];
  keyAchievements: string[];
  // Optional: the approved proposal explicitly allows skip/shrink where a
  // person has no named, reusable approach — not every entry needs this tab
  // to carry real weight.
  ideasPrinciples?: NamedIdea[];
  notableQuotes: SectionQuote[];
  legacyImpact: string;
  criticalTake: CriticalTake;

  relatedIds?: { section: string; id: string; label: string }[];
  dateAdded: string;
  sourceNotes?: string;
};

export function getAllProfiles(): Person[] {
  return loadJsonEntries<Person>("people").sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

export function getProfileById(id: string): Person | undefined {
  return getAllProfiles().find((p) => p.id === id);
}

export {
  PEOPLE_CATEGORY_LABELS,
  PEOPLE_CATEGORY_ICONS,
  getAllPeopleCategories,
} from "./peopleCategories";
