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
  // v4 (Stage 17): permanent, unique 3-digit identifier (e.g. "001", "377") —
  // see docs/SCHEMA.md "Book code" and DECISIONS.md for the full system.
  // Required, not optional: every one of the 377 catalog/book entries as of
  // this addition already has one (a one-time migration script assigned
  // 001-376 from `content/catalog.json`'s existing stable row order, plus
  // 377 for `atomic-habits`, the one written book that predated the catalog
  // and had no matching row), so making this required going forward is a
  // deliberate enforcement choice, not an oversight — a future book entry
  // missing this field should fail type-checking, not render with a blank
  // number.
  code: string;
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
  // v4 (Stage 17): scaffold for a future expansion beyond Thai's own shelves —
  // see docs/SCHEMA.md and DECISIONS.md. Optional, defaults to `true` via
  // `isOwned()` below rather than requiring every one of the ~70 existing
  // `content/books/*.json` files to be edited right now — every book written
  // so far genuinely is one Thai owns, so there's nothing to backfill, just a
  // field to check going forward once non-owned entries start getting added.
  owned?: boolean;
};

// A book/catalog entry counts as "owned" unless explicitly marked otherwise.
// Centralized here so every read site (category pages, home, search) applies
// the same rule instead of repeating `!== false` checks inline.
export function isOwned(entry: { owned?: boolean }): boolean {
  return entry.owned !== false;
}

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
  // v4 (Stage 17): same permanent code system as `Book.code` above — every
  // catalog row (001-377) already has one after the migration, so this is
  // required rather than optional. See docs/SCHEMA.md "Book code."
  code: string;
  title: string;
  author: string;
  categories: string[];
  language: "en" | "vi" | "other";
  // v4 (Stage 17): same scaffold/rationale as `Book.owned` above — every one
  // of the 376 catalog rows today is a book on Thai's actual shelves, so this
  // is left absent (treated as owned via `isOwned()`) rather than backfilled
  // across the whole catalog file for a distinction that doesn't exist yet.
  owned?: boolean;
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
// v4: excludes wishlist (non-owned) entries by default — the 16 category
// shelves are meant to stay exactly what Thai already owns, per his explicit
// "don't dilute the sections" instruction. Wishlist entries surface only on
// /wishlist (see getWishlistCatalogEntries below).
export function getUnwrittenCatalogEntries(category?: string): CatalogEntry[] {
  const written = new Set(getAllBooks().map((b) => normalizeTitle(b.title)));
  return getLibraryCatalog().filter(
    (c) =>
      isOwned(c) &&
      !written.has(normalizeTitle(c.title)) &&
      (!category || c.categories.includes(category))
  );
}

// v4 (Stage 17): the isolated home for books Thai wants but doesn't own yet —
// see docs/SCHEMA.md "Wishlist / owned" and DECISIONS.md for the full
// rationale. Deliberately kept separate from every `getAllBooks()`/
// `getLibraryCatalog()` consumer that powers the 16 category shelves, so
// future non-owned entries never quietly show up mixed into "his library."
// Returns both written entries (full summaries he had already queued/written
// before deciding not to buy the book) and catalog-only entries (title/author
// only, no summary yet) — both empty today since nothing is marked
// `owned: false` yet.
export function getWishlistBooks(): Book[] {
  return getAllBooks().filter((b) => !isOwned(b));
}

export function getWishlistCatalogEntries(): CatalogEntry[] {
  const writtenWishlistTitles = new Set(
    getWishlistBooks().map((b) => normalizeTitle(b.title))
  );
  return getLibraryCatalog().filter(
    (c) => !isOwned(c) && !writtenWishlistTitles.has(normalizeTitle(c.title))
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
