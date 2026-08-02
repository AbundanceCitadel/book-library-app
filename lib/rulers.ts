import { createJsonLoader } from "./sectionLoader";
import type { RelatedLinkRef } from "./relatedTypes";
import type { TimelineEvent, SectionQuote, CriticalTake } from "./sectionTypes";

// Rulers — 7 tabs (Overview, Rise to Power, Reign & Major Events,
// Achievements & Reforms, Death & Succession, Notable Quotes, Critical Take).
// See docs/SECTIONS_SCHEMA.md §3 and New Section Research/
// Section_Detail_Tab_Structures.md §4 for the full rationale + worked example
// (Julius Caesar). Structure only — no entries exist yet, see
// docs/SECTIONS_SCHEMA.md §10.
export type Ruler = {
  id: string;
  name: string;
  title: string; // e.g. "Emperor", "Dictator", "Khan"
  countryOrCivilization: string;
  reignPeriod: string;
  oneLiner: string;

  overview: string;
  riseToPower: string;
  reignEvents: TimelineEvent[];
  achievementsReforms: string[];
  deathSuccession: string;
  notableQuotes: SectionQuote[];
  criticalTake: CriticalTake;

  // Typically includes a `civilizations` cross-link, per the shared spine's
  // uniform Related rule (Section_Detail_Tab_Structures.md §1).
  related?: RelatedLinkRef[];
  sourceNotes?: string;
};

const loader = createJsonLoader<Ruler>("rulers");
export const getAllRulers = loader.getAll;
export const getRulerById = loader.getById;
