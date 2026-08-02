import { loadJsonEntries } from "./content";
import type { TimelineEvent, RoleRef, CriticalTake } from "./sectionTypes";

// Companies & Brands. Field shape follows the approved nine-section tab
// structure — 8 tabs: Overview, Founding Story, Business Model & Products,
// Growth Timeline, Leadership, Legacy & Impact, Lessons for Entrepreneurs,
// Critical Take. Supersedes the earlier "Design Foundation" scaffolding
// shape (Overview/Founding Story/Milestones/Culture) — the 1 already-live
// entry (Apple) was migrated onto this shape in the same pass that added
// these fields: old `milestones` carries over unchanged as `growthTimeline`
// (already the same {year/period, event} shape), old `culture` was folded
// into `overview` (real content kept, not dropped, since Culture isn't one
// of the approved tabs), and `founders` seeds `leadership` directly (each
// founder becomes a real "Co-Founder" entry, not fabricated). `businessModelProducts`,
// `legacyImpact`, `lessonsForEntrepreneurs`, and `criticalTake` are
// genuinely new and start empty/unwritten pending a backfill pass.
export type Company = {
  id: string;
  name: string;
  category: string; // one of COMPANY_CATEGORY_LABELS' keys
  founded: string;
  founders: string[];

  overview: string;
  foundingStory: string;
  businessModelProducts: string;
  growthTimeline: TimelineEvent[];
  leadership: RoleRef[];
  legacyImpact: string;
  lessonsForEntrepreneurs: string[];
  criticalTake: CriticalTake;

  relatedIds?: { section: string; id: string; label: string }[];
  dateAdded: string;
  sourceNotes?: string;
};

export function getAllCompanies(): Company[] {
  return loadJsonEntries<Company>("companies").sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

export function getCompanyById(id: string): Company | undefined {
  return getAllCompanies().find((c) => c.id === id);
}

export {
  COMPANY_CATEGORY_LABELS,
  COMPANY_CATEGORY_ICONS,
  getAllCompanyCategories,
} from "./companiesCategories";
