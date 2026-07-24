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

export function getBookById(id: string): Book | undefined {
  return getAllBooks().find((b) => b.id === id);
}

export const CATEGORY_LABELS: Record<string, string> = {
  business: "Business",
  "business-strategy": "Business Strategy",
  "personal-growth": "Personal Growth / Motivational",
  "philosophy-psychology": "Philosophy & Psychology",
  "finance-investing": "Finance & Investing",
  history: "History",
  "bio-business": "Biographies — Business Figures",
  "bio-religious-spiritual": "Biographies — Religious / Spiritual Figures",
  "bio-other": "Biographies — Other",
  "health-wellness": "Health & Wellness",
  "fiction-literature": "Fiction & Literature",
  "science-technology": "Science & Technology",
};

export function getAllCategories(): string[] {
  return Object.keys(CATEGORY_LABELS);
}

// Emoji icon per category — see docs/DESIGN_SYSTEM.md. No icon-library
// dependency; keeps builds free of extra network/install weight.
export const CATEGORY_ICONS: Record<string, string> = {
  business: "💼",
  "business-strategy": "♟️",
  "personal-growth": "🌱",
  "philosophy-psychology": "🧠",
  "finance-investing": "💰",
  history: "🏛️",
  "bio-business": "👔",
  "bio-religious-spiritual": "🕊️",
  "bio-other": "📇",
  "health-wellness": "🌿",
  "fiction-literature": "📖",
  "science-technology": "🔬",
};
