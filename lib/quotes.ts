import { createJsonLoader } from "./sectionLoader";
import type { RelatedLinkRef } from "./relatedTypes";

// Quotes — the one exception, no multi-tab detail page. See
// docs/SECTIONS_SCHEMA.md §9 and New Section Research/
// Section_Detail_Tab_Structures.md §9: a single quote doesn't carry enough
// independent substance to fill 4+ genuinely distinct tabs, so this stays a
// flat, filterable browsing list (app/quotes/page.tsx) instead of `[id]`
// detail routes. Tapping a quote expands a small non-tabbed card in place —
// confirmed with Thai via AskUserQuestion this session (flat list + expand
// card, over a no-expansion alternative). Structure only — no entries exist
// yet, see docs/SECTIONS_SCHEMA.md §10.
export type QuoteEntry = {
  id: string;
  text: string;
  attribution: string;
  category: string; // from quotes.md's 6-category taxonomy
  context?: string; // when/where said, if known
  // Where present, links to that person's own fuller Notable Quotes tab in
  // people.md / rulers.md / philosophies.md.
  speakerRef?: RelatedLinkRef;
};

const loader = createJsonLoader<QuoteEntry>("quotes");
export const getAllQuotes = loader.getAll;
export const getQuoteById = loader.getById;

export function getQuoteCategories(quotes: QuoteEntry[]): string[] {
  return Array.from(new Set(quotes.map((q) => q.category))).sort();
}

export function getQuoteSpeakers(quotes: QuoteEntry[]): string[] {
  return Array.from(new Set(quotes.map((q) => q.attribution))).sort();
}
