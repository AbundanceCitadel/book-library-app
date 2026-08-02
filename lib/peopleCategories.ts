// Design Foundation session — category taxonomy for Section 2 (Famous People
// / Profiles). No fs dependency, mirrors lib/categories.ts's split so client
// components can use these maps without pulling lib/people.ts's fs import
// into the browser bundle (see DECISIONS.md #167 for the bug class this
// avoids). Rationale for the taxonomy, documented in DECISIONS.md: deliberately
// scoped to people notable in a field OTHER than pure rulership/statecraft
// (that's Section 5, Kings/Generals/Presidents) or company-building alone
// (Section 7, tracked mainly through the company entry, not a duplicate
// person profile) — so this section covers scientists, artists, athletes,
// entertainers, activists, and explorers/inventors, plus general business
// figures not better captured as a company founder story.
export const PEOPLE_CATEGORY_LABELS: Record<string, string> = {
  business: "Business",
  "science-technology": "Science & Technology",
  "arts-entertainment": "Arts & Entertainment",
  sports: "Sports",
  "activism-humanitarian": "Activism & Humanitarian",
  "exploration-innovation": "Exploration & Innovation",
};

export function getAllPeopleCategories(): string[] {
  return Object.keys(PEOPLE_CATEGORY_LABELS);
}

export const PEOPLE_CATEGORY_ICONS: Record<string, string> = {
  business: "💼",
  "science-technology": "🔬",
  "arts-entertainment": "🎭",
  sports: "🏅",
  "activism-humanitarian": "🤲",
  "exploration-innovation": "🧭",
};
