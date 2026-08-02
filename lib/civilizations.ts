import { loadJsonEntries } from "./content";
import type { CriticalTake } from "./sectionTypes";

// Civilizations & Empires. Gives macro (region/era-spanning) context around
// the Rulers section's individual rulers. Field shape follows the approved
// nine-section tab structure — 8 tabs: Overview, Rise & Origins, Golden
// Age/Peak, Society & Culture, Decline & Fall, Legacy — What It Left Behind,
// Notable Rulers, Critical Take. Supersedes the earlier "Design Foundation"
// scaffolding shape — the 1 already-live entry (Roman Empire) was migrated
// onto this shape in the same pass that added these fields: old
// `riseAndFall` (which covered both eras in one field) carries over
// unchanged into `riseOrigins`; `goldenAgePeak`, `societyCulture`,
// `declineFall`, and `criticalTake` are genuinely new and start
// empty/unwritten pending a backfill pass rather than fabricated or
// force-split from the old combined field.
export type Civilization = {
  id: string;
  name: string;
  region: string; // one of CIVILIZATION_REGION_LABELS' keys
  era: string;

  overview: string;
  riseOrigins: string;
  goldenAgePeak: string;
  societyCulture: string;
  declineFall: string;
  legacy: string; // "Legacy — What It Left Behind"
  notableRulers: string[]; // plain names; cross-linked to lib/rulers.ts by name match where one exists

  criticalTake: CriticalTake;
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
