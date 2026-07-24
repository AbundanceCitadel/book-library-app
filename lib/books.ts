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

export const CATEGORY_LABELS: Record<string, string> = {
  business: "Business",
  marketing: "Marketing",
  sales: "Sales",
  "business-strategy": "Business Strategy",
  "personal-growth": "Personal Growth / Motivational",
  "philosophy-psychology": "Philosophy & Psychology",
  "thich-nhat-hanh": "Thich Nhat Hanh",
  "finance-investing": "Finance & Investing",
  history: "History",
  "bio-business": "Biographies — Business Figures",
  "bio-religious-spiritual": "Biographies — Religious / Spiritual Figures",
  "bio-other": "Biographies — Other",
  "health-wellness": "Health & Wellness",
  "fiction-literature": "Fiction & Literature",
  "science-technology": "Science & Technology",
  wine: "Wine",
};

export function getAllCategories(): string[] {
  return Object.keys(CATEGORY_LABELS);
}

// Emoji icon per category — see docs/DESIGN_SYSTEM.md. No icon-library
// dependency; keeps builds free of extra network/install weight.
export const CATEGORY_ICONS: Record<string, string> = {
  business: "💼",
  marketing: "📣",
  sales: "🤝",
  "business-strategy": "♟️",
  "personal-growth": "🌱",
  "philosophy-psychology": "🧠",
  "thich-nhat-hanh": "🪷",
  "finance-investing": "💰",
  history: "🏛️",
  "bio-business": "👔",
  "bio-religious-spiritual": "🕊️",
  "bio-other": "📇",
  "health-wellness": "🌿",
  "fiction-literature": "📖",
  "science-technology": "🔬",
  wine: "🍷",
};
