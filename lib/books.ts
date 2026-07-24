import fs from "fs";
import path from "path";

export type Section = {
  order: number;
  title: string;
  summary: string;
};

export type Quote = {
  text: string;
  attribution: string;
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
