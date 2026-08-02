import { createJsonLoader } from "./sectionLoader";
import type { RelatedLinkRef } from "./relatedTypes";
import type {
  TimelineEvent,
  NamedIdea,
  SectionQuote,
  CriticalTake,
} from "./sectionTypes";

// People — 7 tabs (Overview, Timeline & Career, Key Achievements, Ideas &
// Principles, Notable Quotes, Legacy & Impact, Critical Take). See
// docs/SECTIONS_SCHEMA.md §1 and New Section Research/
// Section_Detail_Tab_Structures.md §2 for the full rationale + worked example
// (Marie Curie). Structure only — no entries exist yet, see
// docs/SECTIONS_SCHEMA.md §10.
export type Person = {
  id: string;
  name: string;
  categories: string[]; // from people.md's 8-category taxonomy
  eraOrCountry: string;
  oneLiner: string; // list-view teaser

  overview: string;
  timeline: TimelineEvent[];
  keyAchievements: string[];
  // Optional: the proposal explicitly allows skip/shrink where a person has
  // no named, reusable approach — not every entry needs this tab to carry
  // real weight.
  ideasPrinciples?: NamedIdea[];
  notableQuotes: SectionQuote[];
  legacyImpact: string;
  criticalTake: CriticalTake;

  related?: RelatedLinkRef[];
  sourceNotes?: string;
};

const loader = createJsonLoader<Person>("people");
export const getAllPeople = loader.getAll;
export const getPersonById = loader.getById;
