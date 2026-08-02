// Design Foundation session — category taxonomy for Section 9 (Philosophies,
// Religions & Belief Systems). "religion-spirituality" is intentionally the
// same key used in lib/quotesCategories.ts (not a coincidence — the two
// sections are meant to cross-reference cleanly: a quote collection and a
// philosophy/religion entry about the same tradition should carry the same
// category label). No fs dependency — see lib/peopleCategories.ts header for
// why.
export const PHILOSOPHY_CATEGORY_LABELS: Record<string, string> = {
  "eastern-philosophy": "Eastern Philosophy",
  "western-philosophy": "Western Philosophy",
  "world-religion": "World Religion",
  "spiritual-tradition": "Spiritual Tradition",
};

export function getAllPhilosophyCategories(): string[] {
  return Object.keys(PHILOSOPHY_CATEGORY_LABELS);
}

export const PHILOSOPHY_CATEGORY_ICONS: Record<string, string> = {
  "eastern-philosophy": "☯️",
  "western-philosophy": "🏛️",
  "world-religion": "🕊️",
  "spiritual-tradition": "🪷",
};
