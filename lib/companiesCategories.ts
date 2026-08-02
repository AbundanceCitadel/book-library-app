// Design Foundation session — category taxonomy for Section 7 (Companies &
// Brands). Deliberately close to lib/richlistCategories.ts's industry list
// (they're meant to pair, per the session brief: "pairs with Rich List and
// the book library's Business/Finance categories") but not identical — this
// list adds food-beverage, which the Rich List examples didn't need yet, and
// omits energy-resources, which had no example company this pass. Both are
// easy to extend independently later. No fs dependency — see
// lib/peopleCategories.ts header for why.
export const COMPANY_CATEGORY_LABELS: Record<string, string> = {
  technology: "Technology",
  "retail-consumer": "Retail & Consumer Goods",
  "finance-banking": "Finance & Banking",
  automotive: "Automotive",
  "media-entertainment": "Media & Entertainment",
  "manufacturing-industrial": "Manufacturing & Industrial",
  "food-beverage": "Food & Beverage",
};

export function getAllCompanyCategories(): string[] {
  return Object.keys(COMPANY_CATEGORY_LABELS);
}

export const COMPANY_CATEGORY_ICONS: Record<string, string> = {
  technology: "💻",
  "retail-consumer": "🛍️",
  "finance-banking": "🏦",
  automotive: "🚗",
  "media-entertainment": "🎬",
  "manufacturing-industrial": "🏭",
  "food-beverage": "🍔",
};
