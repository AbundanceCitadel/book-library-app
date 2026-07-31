// v3 (Stage 16, premium redesign): split out of lib/books.ts. Pure data, no
// `fs`/`path` dependency — needed so client components (CategoryAccordion,
// BookCard, both now used inside a "use client" tree for the animated
// accordion) can import the category label/icon maps without pulling
// lib/books.ts's Node-only file-reading code into the browser bundle
// (that caused a real "Module not found: Can't resolve 'fs'" build error
// during this pass — client components importing anything from a module
// that has a top-level `import fs from "fs"`, even unused parts of it, get
// that whole module bundled). lib/books.ts re-exports these for backward
// compatibility so no other file needs to change its import path.
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
