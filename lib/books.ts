import fs from "fs";
import path from "path";

export type Section = {
  order: number;
  title: string;
  summary: string;
  // v2 (Stage 15): per-chapter key lessons, distinct from the book-level
  // keyLessons array. Optional so pre-v2 entries (written before this field
  // existed) still validate — the UI just renders nothing for those.
  keyLessons?: string[];
};

export type Quote = {
  text: string;
  attribution: string;
  // v2: theme label used to group the Quotes tab. Optional for the same
  // backward-compatibility reason as Section.keyLessons.
  category?: string;
};

// v2 (Stage 15): brief author-bio tab content. See docs/SCHEMA.md.
export type AuthorBio = {
  name: string;
  bio: string;
  notableWorks: string[];
};

// v2.1 (8-Tab Content Structure Rollout): a named, standalone model/framework from
// the book. See docs/SCHEMA.md and docs/CONTENT_STRUCTURE_PROPOSAL.md §3.1.
export type ConceptFramework = {
  name: string;
  definition: string;
  sourceSection?: string;
};

// v2.1: several concrete actions plus reflection prompts. See docs/SCHEMA.md and
// docs/CONTENT_STRUCTURE_PROPOSAL.md §3.2.
export type ApplyThis = {
  actionSteps: string[];
  reflectionQuestions: string[];
};

// v2.1: the book's real limitations, contested claims, or how its ideas have aged.
// See docs/SCHEMA.md and docs/CONTENT_STRUCTURE_PROPOSAL.md §3.4.
export type CriticalTake = {
  points: string[];
  contextNote?: string;
};

export type ReadStatus = "unread" | "reading" | "read";

export type Book = {
  id: string;
  title: string;
  author: string;
  categories: string[];
  language: "en" | "vi" | "other";
  coverImage: string | null;
  estimatedOriginalReadingTimeMinutes: number;
  tags: string[];
  structureType: "chapters" | "parts";
  summary: string;
  sections: Section[];
  keyLessons: string[];
  quotes: Quote[];
  whoThisIsFor: string;
  whenToReadThis: string;
  relatedBooks: string[];
  readStatus: ReadStatus;
  personalRating: number | null;
  personalNotes: string;
  dateAdded: string;
  sourceNotes?: string;
  // v2: optional so the 66 pre-v2 entries still type-check and render (Author
  // tab just shows a "not written yet" state for them) until the backfill
  // question is resolved — see ROADMAP.md Stage 15.
  authorBio?: AuthorBio;
  // v2.1: optional so entries without the 8-tab retrofit yet still type-check.
  // UI rendering for these three (Concepts & Frameworks / Apply This / Critical
  // Take tabs) is a separate follow-up, not yet built as of this addition — see
  // ROADMAP.md Stage 15 and DECISIONS.md.
  conceptsFrameworks?: ConceptFramework[];
  applyThis?: ApplyThis;
  criticalTake?: CriticalTake;
};

const BOOKS_DIR = path.join(process.cwd(), "content", "books");
const CATALOG_PATH = path.join(process.cwd(), "content", "catalog.json");

export function getAllBooks(): Book[] {
  if (!fs.existsSync(BOOKS_DIR)) return [];
  const files = fs.readdirSync(BOOKS_DIR).filter((f) => f.endsWith(".json"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(BOOKS_DIR, file), "utf-8");
      return JSON.parse(raw) as Book;
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

// The physical library catalog (title/author/category only, no synthesized
// content) — see docs/HOME_BOOKCASE_CATALOG.xlsx, the source of truth Thai
// reviewed in Session 6. This is what "surfaces the library's real scale":
// most of these titles don't have a full content/books/*.json entry yet
// (that's Stage 10, bulk content expansion), but Thai owns all of them and
// wants the app to reflect that scale rather than only what's been written
// so far. Cross-referenced against getAllBooks() by title match at read
// time (not a stored flag) so it never goes stale as new entries are added.
export type CatalogEntry = {
  title: string;
  author: string;
  categories: string[];
  language: "en" | "vi" | "other";
};

function normalizeTitle(t: string): string {
  return t.trim().toLowerCase();
}

export function getLibraryCatalog(): CatalogEntry[] {
  if (!fs.existsSync(CATALOG_PATH)) return [];
  const raw = fs.readFileSync(CATALOG_PATH, "utf-8");
  return JSON.parse(raw) as CatalogEntry[];
}

// Catalog entries that don't yet have a written content/books/*.json entry.
export function getUnwrittenCatalogEntries(category?: string): CatalogEntry[] {
  const written = new Set(getAllBooks().map((b) => normalizeTitle(b.title)));
  return getLibraryCatalog().filter(
    (c) =>
      !written.has(normalizeTitle(c.title)) &&
      (!category || c.categories.includes(category))
  );
}

export function getBookById(id: string): Book | undefined {
  return getAllBooks().find((b) => b.id === id);
}

// v2 polish pass (Stage 12): BookTabs' Related Books list used to render the
// raw relatedBooks id/slug (e.g. "atomic-habits") as the link text instead of
// the actual title. Resolves each id to {id, title} here so the UI can show
// real titles, and silently drops any id that doesn't match a written book
// (e.g. a relatedBooks reference added before its target was retrofitted/
// written yet) rather than rendering a dead link with a raw slug for text.
export function getRelatedBooksInfo(
  relatedIds: string[]
): { id: string; title: string }[] {
  const all = getAllBooks();
  return relatedIds
    .map((id) => all.find((b) => b.id === id))
    .filter((b): b is Book => Boolean(b))
    .map((b) => ({ id: b.id, title: b.title }));
}

// v3 (Stage 16): CATEGORY_LABELS/CATEGORY_ICONS/getAllCategories moved to
// lib/categories.ts (a plain-data module with no `fs`/`path` import) so
// client components can use them without pulling this file's Node-only file
// reads into the browser bundle. Re-exported here so every existing import
// of `@/lib/books` keeps working unchanged.
export { CATEGORY_LABELS, CATEGORY_ICONS, getAllCategories } from "./categories";
