import { createJsonLoader } from "./sectionLoader";
import type { RelatedLinkRef } from "./relatedTypes";
import type { TimelineEvent, RoleRef, SectionQuote, CriticalTake } from "./sectionTypes";

// Carries forward richlist.md's own "this is a snapshot, not a live fact"
// caveat as a required field, not just prose, so the Overview tab can always
// render the staleness warning next to the number.
export type NetWorthSnapshot = {
  amountUsd: string;
  asOfDate: string;
  sourceNote: string;
};

// Rich List — 7 tabs (Overview, Wealth & Career Timeline, Ventures &
// Companies, Philanthropy & Causes, Notable Quotes, Playbook/Lessons,
// Critical Take). See docs/SECTIONS_SCHEMA.md §2 and New Section Research/
// Section_Detail_Tab_Structures.md §3 for the full rationale + worked example
// (Elon Musk). Structure only — no entries exist yet, see
// docs/SECTIONS_SCHEMA.md §10.
export type RichListEntry = {
  id: string;
  name: string;
  wealthSource: string;
  oneLiner: string;

  overview: string;
  netWorth: NetWorthSnapshot;
  wealthTimeline: TimelineEvent[];
  // `RoleRef.role` typically holds "Founder"/"CEO"/etc, `RoleRef.personRef`
  // is unused here (kept for shape reuse); the venture's own id belongs in
  // `related` if/when a matching companies.md entry exists.
  venturesCompanies: RoleRef[];
  // Optional: the proposal explicitly allows a clean skip if genuinely no
  // philanthropy exists, rather than padding.
  philanthropy?: string[];
  notableQuotes: SectionQuote[];
  playbookLessons: string[];
  criticalTake: CriticalTake;

  related?: RelatedLinkRef[];
  sourceNotes?: string;
};

const loader = createJsonLoader<RichListEntry>("richlist");
export const getAllRichListEntries = loader.getAll;
export const getRichListEntryById = loader.getById;
