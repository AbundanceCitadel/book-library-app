// Design Foundation session — theme taxonomy for Section 4 (Quotes). Per the
// session brief's own list (business, marketing, religion, motivation, "and
// others as needed") plus two more added for coverage of figures who don't
// fit those four: philosophy (distinct from religion — covers secular
// thinkers) and leadership (distinct from business — covers military/
// political figures' quotes, which overlap with Section 5's rulers). No fs
// dependency — see lib/peopleCategories.ts header for why.
export const QUOTE_CATEGORY_LABELS: Record<string, string> = {
  business: "Business",
  marketing: "Marketing",
  motivation: "Motivation",
  "religion-spirituality": "Religion & Spirituality",
  philosophy: "Philosophy",
  leadership: "Leadership",
};

export function getAllQuoteCategories(): string[] {
  return Object.keys(QUOTE_CATEGORY_LABELS);
}

export const QUOTE_CATEGORY_ICONS: Record<string, string> = {
  business: "💼",
  marketing: "📣",
  motivation: "🔥",
  "religion-spirituality": "🕊️",
  philosophy: "🧠",
  leadership: "🎯",
};
