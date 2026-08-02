import { createJsonLoader } from "./sectionLoader";
import type { RelatedLinkRef } from "./relatedTypes";
import type { TimelineEvent, RoleRef, CriticalTake } from "./sectionTypes";

// Companies — 8 tabs (Overview, Founding Story, Business Model & Products,
// Growth Timeline, Leadership, Legacy & Impact, Lessons for Entrepreneurs,
// Critical Take). Founding Story is kept as its own tab — not folded into
// Overview — per the original research brief's explicit "founding story
// hook" requirement. See docs/SECTIONS_SCHEMA.md §5 and New Section
// Research/Section_Detail_Tab_Structures.md §6 for the full rationale +
// worked example (Apple). Structure only — no entries exist yet, see
// docs/SECTIONS_SCHEMA.md §10.
export type Company = {
  id: string;
  name: string;
  category: string;
  founded: string;
  headquarters?: string;
  oneLiner: string;

  overview: string;
  foundingStory: string;
  businessModelProducts: string;
  growthTimeline: TimelineEvent[];
  leadership: RoleRef[];
  legacyImpact: string;
  lessonsForEntrepreneurs: string[];
  criticalTake: CriticalTake;

  // Typically includes founders (if they're in people.md) and rivals, per
  // the shared spine's uniform Related rule.
  related?: RelatedLinkRef[];
  sourceNotes?: string;
};

const loader = createJsonLoader<Company>("companies");
export const getAllCompanies = loader.getAll;
export const getCompanyById = loader.getById;
