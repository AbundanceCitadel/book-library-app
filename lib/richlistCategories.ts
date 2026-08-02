// Design Foundation session — industry taxonomy for Section 3 (Rich List).
// Categorizes by primary industry/wealth source rather than by person
// attribute, since that's how Forbes-style rich lists are conventionally
// grouped and it's the most useful cut for "portfolio/holdings breakdown"
// content. No fs dependency — see lib/peopleCategories.ts header for why
// this is split from lib/richlist.ts.
export const RICHLIST_CATEGORY_LABELS: Record<string, string> = {
  technology: "Technology",
  "finance-investment": "Finance & Investment",
  "retail-consumer": "Retail & Consumer Goods",
  "manufacturing-industrial": "Manufacturing & Industrial",
  "media-entertainment": "Media & Entertainment",
  "fashion-luxury": "Fashion & Luxury",
  "energy-resources": "Energy & Resources",
};

export function getAllRichListCategories(): string[] {
  return Object.keys(RICHLIST_CATEGORY_LABELS);
}

export const RICHLIST_CATEGORY_ICONS: Record<string, string> = {
  technology: "💻",
  "finance-investment": "🏦",
  "retail-consumer": "🛍️",
  "manufacturing-industrial": "🏭",
  "media-entertainment": "🎬",
  "fashion-luxury": "👜",
  "energy-resources": "⛽",
};
