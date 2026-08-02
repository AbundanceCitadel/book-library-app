import { createJsonLoader } from "./sectionLoader";
import type { RelatedLinkRef } from "./relatedTypes";
import type { NamedIdea, TextItem, CriticalTake } from "./sectionTypes";

// Philosophies — 8 tabs (Overview/Core Idea, Origin & Founder, Core Beliefs &
// Principles, Key Texts & Teachings, Practice Today, Notable Followers &
// Thinkers, Legacy & Global Influence, Critical Take/Debates). See
// docs/SECTIONS_SCHEMA.md §7 and New Section Research/
// Section_Detail_Tab_Structures.md §8 for the full rationale + worked
// example (Buddhism). Structure only — no entries exist yet, see
// docs/SECTIONS_SCHEMA.md §10.
export type Philosophy = {
  id: string;
  name: string;
  category: string;
  oneLiner: string;

  overview: string;
  originFounder: string;
  coreBeliefs: NamedIdea[];
  keyTexts: TextItem[];
  practiceToday: string;
  // Its own tab (cross-link-heavy into people.md) — distinct from the
  // general `related` field below.
  notableFollowers: RelatedLinkRef[];
  legacyGlobalInfluence: string;
  criticalTake: CriticalTake;

  related?: RelatedLinkRef[];
  sourceNotes?: string;
};

const loader = createJsonLoader<Philosophy>("philosophies");
export const getAllPhilosophies = loader.getAll;
export const getPhilosophyById = loader.getById;
