import { loadJsonEntries } from "./content";
import type { RoleRef, StatItem, CriticalTake } from "./sectionTypes";

// Groups & Organizations. Field shape follows the approved nine-section tab
// structure — 7 tabs: Overview, History & Founding, Structure & How It
// Works, Major Achievements & Impact, Key People, By the Numbers, Critical
// Take. Supersedes the earlier "Design Foundation" scaffolding shape
// (Overview/History/Impact only) — the 1 already-live entry (WHO) was
// migrated onto this shape in the same pass that added these fields; its
// old `impact` paragraph was folded into `overview` (real content kept, not
// dropped) since "Major Achievements & Impact" here expects a bullet list,
// not prose. `structureHowItWorks`, `majorAchievements`, `keyPeople`,
// `byTheNumbers`, and `criticalTake` are genuinely new and start
// empty/unwritten pending a backfill pass rather than fabricated.
export type Organization = {
  id: string;
  name: string;
  category: string; // one of ORG_CATEGORY_LABELS' keys
  founded: string;

  overview: string;
  historyFounding: string;
  structureHowItWorks: string;
  majorAchievements: string[];
  keyPeople: RoleRef[];
  byTheNumbers: StatItem[];
  criticalTake: CriticalTake;

  relatedIds?: { section: string; id: string; label: string }[];
  dateAdded: string;
  sourceNotes?: string;
};

export function getAllOrganizations(): Organization[] {
  return loadJsonEntries<Organization>("organizations").sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

export function getOrganizationById(id: string): Organization | undefined {
  return getAllOrganizations().find((o) => o.id === id);
}

export {
  ORG_CATEGORY_LABELS,
  ORG_CATEGORY_ICONS,
  getAllOrgCategories,
} from "./organizationsCategories";
