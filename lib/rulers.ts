import { loadJsonEntries } from "./content";

// Design Foundation session — Section 5, Kings, Generals & Presidents.
// Grouped by `country` (see lib/rulersCountries.ts), not a category array —
// a deliberate simplification vs. the book library's multi-category model,
// since a ruler's primary association with one country/civilization is the
// natural browse axis here. See docs/SCHEMA_SECTIONS.md "Ruler."
export type RulerQuote = {
  text: string;
  source?: string;
};

export type Ruler = {
  id: string;
  name: string;
  country: string; // one of RULER_COUNTRY_LABELS' keys
  title: string; // e.g. "King", "General", "President", "Emperor", "Founding Father"
  era: string; // e.g. "356–323 BC" or "1732–1799"
  summary: string;
  reignAchievements: string[];
  legacy: string;
  quotes: RulerQuote[];
  relatedIds?: { section: string; id: string; label: string }[]; // e.g. cross-link to a Civilization entry
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
