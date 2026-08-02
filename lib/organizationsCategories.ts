// Design Foundation session — category taxonomy for Section 6 (Groups &
// Organizations). Per the session brief's own examples (WHO, the Fed, major
// charities). No fs dependency — see lib/peopleCategories.ts header for why.
export const ORG_CATEGORY_LABELS: Record<string, string> = {
  charity: "Charity",
  "government-body": "Government Body",
  "financial-institution": "Financial Institution",
  "international-body": "International Body",
  "ngo-humanitarian": "NGO / Humanitarian",
  "religious-body": "Religious Body",
};

export function getAllOrgCategories(): string[] {
  return Object.keys(ORG_CATEGORY_LABELS);
}

export const ORG_CATEGORY_ICONS: Record<string, string> = {
  charity: "❤️",
  "government-body": "🏛️",
  "financial-institution": "🏦",
  "international-body": "🌐",
  "ngo-humanitarian": "🤝",
  "religious-body": "🕊️",
};
