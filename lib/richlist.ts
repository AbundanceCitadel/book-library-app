import { loadJsonEntries } from "./content";
import type { TimelineEvent, SectionQuote, CriticalTake } from "./sectionTypes";

// Rich List. `rank` is stored on the entry rather than derived from array
// order, same "stored, never recomputed from position" principle
// docs/SCHEMA.md's book-code system uses. Field shape follows the approved
// nine-section tab structure — 7 tabs: Overview, Wealth & Career Timeline,
// Ventures & Companies, Philanthropy & Causes (optional), Notable Quotes,
// Playbook/Lessons, Critical Take. Supersedes the earlier "Design
// Foundation" scaffolding shape (bio/portfolio only) — the 2 already-live
// entries were migrated onto this shape in the same pass that added these
// fields; `wealthTimeline`, `notableQuotes`, `playbookLessons`, and
// `criticalTake` are genuinely new and start empty pending a backfill pass
// (rendered as an honest "not written yet" placeholder rather than
// fabricated). `portfolio` carries over unchanged as the real source for the
// Ventures & Companies tab.
export type PortfolioHolding = {
  holding: string;
  description: string;
  approxStake?: string;
};

export type RichListEntry = {
  id: string;
  name: string;
  rank: number;
  netWorthUsdBillions: number;
  category: string; // one of RICHLIST_CATEGORY_LABELS' keys
  country: string;
  asOfDate: string; // snapshot date for the net-worth figure

  overview: string;
  wealthTimeline: TimelineEvent[];
  portfolio: PortfolioHolding[];
  philanthropy?: string[];
  notableQuotes: SectionQuote[];
  playbookLessons: string[];
  criticalTake: CriticalTake;

  relatedIds?: { section: string; id: string; label: string }[];
  dateAdded: string;
  sourceNotes?: string;
};

export function getAllRichListEntries(): RichListEntry[] {
  return loadJsonEntries<RichListEntry>("richlist").sort(
    (a, b) => a.rank - b.rank
  );
}

export function getRichListEntryById(id: string): RichListEntry | undefined {
  return getAllRichListEntries().find((e) => e.id === id);
}

export {
  RICHLIST_CATEGORY_LABELS,
  RICHLIST_CATEGORY_ICONS,
  getAllRichListCategories,
} from "./richlistCategories";
