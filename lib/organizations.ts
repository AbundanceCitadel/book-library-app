import { loadJsonEntries } from "./content";

// Design Foundation session — Section 6, Groups & Organizations. Tab set
// (Overview / History / Impact) per the session brief's own worked example
// for this section — see docs/SCHEMA_SECTIONS.md "Organization."
export type Organization = {
  id: string;
  name: string;
  category: string; // one of ORG_CATEGORY_LABELS' keys
  founded: string; // year or date
  summary: string; // overview
  history: string;
  impact: string;
  relatedIds?: { section: string; id: string; label: string }[];
  dateAdded: string;
  sourceNotes?: string;
};

export function getAllOrganizations(): Organization[] {
  return loadJsonEntries<Organization>("organizations").sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

export function getOrganizationById(id: string): Organization | undefined {
  return getAllOrganizations().find((o) => o.id === id);
}

export {
  ORG_CATEGORY_LABELS,
  ORG_CATEGORY_ICONS,
  getAllOrgCategories,
} from "./organizationsCategories";
