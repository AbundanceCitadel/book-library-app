import { loadJsonEntries } from "./content";

// Design Foundation session — Section 3, Rich List. `rank` is stored on the
// entry rather than derived from array order, same "stored, never
// recomputed from position" principle docs/SCHEMA.md's book-code system
// uses — a future entry can be inserted without renumbering every sibling.
// See docs/SCHEMA_SECTIONS.md "RichListEntry."
export type PortfolioHolding = {
  holding: string; // company/asset name
  description: string;
  approxStake?: string; // freeform, e.g. "~12% stake" or "founder, majority owner"
};

export type RichListEntry = {
  id: string;
  name: string;
  rank: number;
  netWorthUsdBillions: number;
  category: string; // one of RICHLIST_CATEGORY_LABELS' keys
  country: string;
  bio: string;
  portfolio: PortfolioHolding[];
  asOfDate: string; // snapshot date for the net-worth figure — this list moves constantly
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
