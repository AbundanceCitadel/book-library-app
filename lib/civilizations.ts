import { createJsonLoader } from "./sectionLoader";
import type { RelatedLinkRef } from "./relatedTypes";
import type { CriticalTake } from "./sectionTypes";

// Civilizations — 8 tabs (Overview, Rise & Origins, Golden Age/Peak, Society
// & Culture, Decline & Fall, Legacy — What It Left Behind, Notable Rulers,
// Critical Take). See docs/SECTIONS_SCHEMA.md §6 and New Section Research/
// Section_Detail_Tab_Structures.md §7 for the full rationale + worked
// example (Roman Empire). Structure only — no entries exist yet, see
// docs/SECTIONS_SCHEMA.md §10.
export type Civilization = {
  id: string;
  name: string;
  region: string;
  period: string;
  oneLiner: string;

  overview: string;
  riseOrigins: string;
  goldenAgePeak: string;
  societyCulture: string;
  declineFall: string;
  legacy: string;
  // Its own tab (cross-link-heavy summary list into rulers.md) — distinct
  // from the general `related` field below, which is for other cross-links
  // (e.g. a dominant philosophy).
  notableRulers: RelatedLinkRef[];
  criticalTake: CriticalTake;

  related?: RelatedLinkRef[];
  sourceNotes?: string;
};

const loader = createJsonLoader<Civilization>("civilizations");
export const getAllCivilizations = loader.getAll;
export const getCivilizationById = loader.getById;
