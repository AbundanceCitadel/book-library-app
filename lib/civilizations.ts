import { loadJsonEntries } from "./content";

// Design Foundation session — Section 8, Civilizations & Empires. Gives
// macro (region/era-spanning) context around Section 5's individual rulers —
// `notableRulerIds` cross-links to lib/rulers.ts entries where one already
// exists, but is plain text otherwise (most civilizations will have far more
// notable rulers than the Rulers section has entries for at any given time,
// especially during this scaffolding pass). See docs/SCHEMA_SECTIONS.md
// "Civilization."
export type Civilization = {
  id: string;
  name: string;
  region: string; // one of CIVILIZATION_REGION_LABELS' keys
  era: string; // e.g. "27 BC – 476 AD (Western)"
  summary: string;
  riseAndFall: string;
  legacy: string;
  notableRulers: string[]; // plain names; cross-linked to lib/rulers.ts by id match where one exists
  relatedIds?: { section: string; id: string; label: string }[];
  dateAdded: string;
  sourceNotes?: string;
};

export function getAllCivilizations(): Civilization[] {
  return loadJsonEntries<Civilization>("civilizations").sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

export function getCivilizationById(id: string): Civilization | undefined {
  return getAllCivilizations().find((c) => c.id === id);
}

export {
  CIVILIZATION_REGION_LABELS,
  CIVILIZATION_REGION_ICONS,
  getAllCivilizationRegions,
} from "./civilizationsCategories";
