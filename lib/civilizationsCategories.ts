// Design Foundation session — region grouping for Section 8 (Civilizations &
// Empires). Grouped by broad region rather than a topical category list,
// since "where and roughly when" is the natural browse axis for empires that
// often span centuries and several modern countries (e.g. Rome spans what is
// now dozens of nations). No fs dependency — see lib/peopleCategories.ts
// header for why.
export const CIVILIZATION_REGION_LABELS: Record<string, string> = {
  "mediterranean-europe": "Mediterranean & Europe",
  "middle-east": "Middle East & Persia",
  "east-asia": "East Asia",
  "south-asia": "South Asia",
  "central-asia-steppe": "Central Asia & the Steppe",
  americas: "The Americas",
  africa: "Africa",
};

export function getAllCivilizationRegions(): string[] {
  return Object.keys(CIVILIZATION_REGION_LABELS);
}

export const CIVILIZATION_REGION_ICONS: Record<string, string> = {
  "mediterranean-europe": "🏛️",
  "middle-east": "🕌",
  "east-asia": "🏯",
  "south-asia": "🛕",
  "central-asia-steppe": "🐎",
  americas: "🗿",
  africa: "🌍",
};
