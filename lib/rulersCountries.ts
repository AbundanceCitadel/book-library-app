// Design Foundation session — country/civilization grouping for Section 5
// (Kings, Generals & Presidents). Per the session brief: "grouped by country
// (~20 significant countries, not an exhaustive list)," spanning all of
// history, not just modern nation-states — several entries below are the
// historical civilization a ruler is associated with (e.g. "Macedon," "Rome")
// rather than the modern country occupying similar territory, since that's
// how a figure like Alexander the Great or Julius Caesar is actually
// discussed. Starting set of 20, documented as a deliberately non-exhaustive
// judgment call in DECISIONS.md — chosen for spread across eras/regions plus
// a few of particular relevance to Thai's own library (Vietnam). Expandable:
// a future ruler from a country not yet listed just adds a new key here,
// no migration needed.
export const RULER_COUNTRY_LABELS: Record<string, string> = {
  "united-states": "United States",
  "united-kingdom": "United Kingdom",
  france: "France",
  russia: "Russia / Soviet Union",
  china: "China",
  mongolia: "Mongolia",
  macedon: "Macedon / Ancient Greece",
  rome: "Rome",
  egypt: "Egypt",
  india: "India",
  japan: "Japan",
  vietnam: "Vietnam",
  "germany-prussia": "Germany / Prussia",
  spain: "Spain",
  "ottoman-empire": "Ottoman Empire / Turkey",
  persia: "Persia / Iran",
  "south-africa": "South Africa",
  cuba: "Cuba",
  israel: "Israel / Judea",
  brazil: "Brazil",
};

export function getAllRulerCountries(): string[] {
  return Object.keys(RULER_COUNTRY_LABELS);
}

// Flag emoji where a clean modern equivalent exists; a neutral glyph for
// historical entities with no single modern flag (Rome, Macedon, Persia).
export const RULER_COUNTRY_ICONS: Record<string, string> = {
  "united-states": "🇺🇸",
  "united-kingdom": "🇬🇧",
  france: "🇫🇷",
  russia: "🇷🇺",
  china: "🇨🇳",
  mongolia: "🇲🇳",
  macedon: "🏛️",
  rome: "🏛️",
  egypt: "🇪🇬",
  india: "🇮🇳",
  japan: "🇯🇵",
  vietnam: "🇻🇳",
  "germany-prussia": "🇩🇪",
  spain: "🇪🇸",
  "ottoman-empire": "🇹🇷",
  persia: "🇮🇷",
  "south-africa": "🇿🇦",
  cuba: "🇨🇺",
  israel: "🇮🇱",
  brazil: "🇧🇷",
};
