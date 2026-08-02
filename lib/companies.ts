import { loadJsonEntries } from "./content";

// Design Foundation session — Section 7, Companies & Brands. Tab set
// (Overview / Founding Story / Milestones / Culture) per the session brief's
// own description of this section's content. See docs/SCHEMA_SECTIONS.md
// "Company."
export type Milestone = {
  year: string;
  event: string;
};

export type Company = {
  id: string;
  name: string;
  category: string; // one of COMPANY_CATEGORY_LABELS' keys
  founded: string;
  founders: string[];
  summary: string; // overview
  foundingStory: string;
  milestones: Milestone[];
  culture: string;
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
