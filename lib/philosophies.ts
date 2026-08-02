import { loadJsonEntries } from "./content";

// Design Foundation session — Section 9, Philosophies, Religions & Belief
// Systems. Direct overlap with the book library's Philosophy & Psychology
// and Thich Nhat Hanh categories (see lib/categories.ts) — cross-linked via
// relatedIds rather than merged into one taxonomy, since the book library's
// category system is explicitly out of scope to modify this session. See
// docs/SCHEMA_SECTIONS.md "Philosophy."
export type Philosophy = {
  id: string;
  name: string;
  category: string; // one of PHILOSOPHY_CATEGORY_LABELS' keys
  founder: string;
  origin: string; // time/place of origin
  summary: string;
  coreTeachings: string[];
  keyTexts: string[];
  relatedIds?: { section: string; id: string; label: string }[];
  dateAdded: string;
  sourceNotes?: string;
};

export function getAllPhilosophies(): Philosophy[] {
  return loadJsonEntries<Philosophy>("philosophies").sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

export function getPhilosophyById(id: string): Philosophy | undefined {
  return getAllPhilosophies().find((p) => p.id === id);
}

export {
  PHILOSOPHY_CATEGORY_LABELS,
  PHILOSOPHY_CATEGORY_ICONS,
  getAllPhilosophyCategories,
} from "./philosophiesCategories";
