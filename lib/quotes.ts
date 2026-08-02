import { loadJsonEntries } from "./content";

// Design Foundation session — Section 4, Quotes. Deliberately a lighter
// content model than the other 7 sections: one JSON file per attributed
// person (a "quote collection"), each holding several quotes grouped by
// theme category — the same {text, category} shape already proven out by
// the book library's own Quote object (lib/books.ts), reused here rather
// than inventing a parallel structure. See docs/SCHEMA_SECTIONS.md
// "QuoteCollection" for the judgment call on why this section skips the
// multi-tab detail-page treatment the other 7 sections get.
export type QuoteItem = {
  text: string;
  category: string; // one of QUOTE_CATEGORY_LABELS' keys
  source?: string;
};

export type QuoteCollection = {
  id: string;
  attributedTo: string;
  about: string; // 1-3 sentence blurb on who this person is
  quotes: QuoteItem[];
  relatedIds?: { section: string; id: string; label: string }[];
  dateAdded: string;
  sourceNotes?: string;
};

export function getAllQuoteCollections(): QuoteCollection[] {
  return loadJsonEntries<QuoteCollection>("quotes").sort((a, b) =>
    a.attributedTo.localeCompare(b.attributedTo)
  );
}

export function getQuoteCollectionById(id: string): QuoteCollection | undefined {
  return getAllQuoteCollections().find((q) => q.id === id);
}

export {
  QUOTE_CATEGORY_LABELS,
  QUOTE_CATEGORY_ICONS,
  getAllQuoteCategories,
} from "./quotesCategories";
