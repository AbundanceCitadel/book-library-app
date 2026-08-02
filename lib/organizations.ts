import { createJsonLoader } from "./sectionLoader";
import type { RelatedLinkRef } from "./relatedTypes";
import type { RoleRef, StatItem, CriticalTake } from "./sectionTypes";

// Organizations — 7 tabs (Overview, History & Founding, Structure & How It
// Works, Major Achievements & Impact, Key People, By the Numbers, Critical
// Take). See docs/SECTIONS_SCHEMA.md §4 and New Section Research/
// Section_Detail_Tab_Structures.md §5 for the full rationale + worked example
// (United Nations). Structure only — no entries exist yet, see
// docs/SECTIONS_SCHEMA.md §10.
export type Organization = {
  id: string;
  name: string;
  category: string;
  founded: string;
  headquarters?: string;
  oneLiner: string;

  overview: string;
  historyFounding: string;
  structureHowItWorks: string;
  majorAchievements: string[];
  keyPeople: RoleRef[];
  byTheNumbers: StatItem[];
  criticalTake: CriticalTake;

  related?: RelatedLinkRef[];
  sourceNotes?: string;
};

const loader = createJsonLoader<Organization>("organizations");
export const getAllOrganizations = loader.getAll;
export const getOrganizationById = loader.getById;
