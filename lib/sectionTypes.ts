// Nine-section expansion (structure only, see docs/SECTIONS_SCHEMA.md §0).
// Shared sub-types reused across People/Rich List/Rulers/Organizations/
// Companies/Civilizations/Philosophies, so each section's own lib file only
// has to define the fields that are genuinely specific to it.

// A dated event on a Timeline & Career / Reign & Major Events / Growth
// Timeline / Wealth & Career Timeline tab. `period` is a free string (a year,
// a range, "c. 3rd century BCE") rather than a strict date type, since these
// entries span everything from ancient rulers to modern companies.
export type TimelineEvent = {
  period: string;
  event: string;
};

// A named, standalone idea/tenet/principle — reused for People's "Ideas &
// Principles" and Philosophies' "Core Beliefs & Principles" tabs. Same shape
// as the book schema's `ConceptFramework` (minus `sourceSection`, which only
// makes sense for a book with numbered chapters).
export type NamedIdea = {
  name: string;
  definition: string;
};

// Notable Quotes tab entry. `quoteRef` is optional and, where present, points
// at a `lib/quotes.ts` entry id so the tab can link out to the fuller
// Quotes browsing list instead of only showing an inline copy.
export type SectionQuote = {
  text: string;
  attribution: string;
  quoteRef?: string;
};

// Critical Take tab — identical shape to the book schema's `CriticalTake`
// (lib/books.ts), reused as-is rather than redefined, since the intent is
// identical: honest, specific, checkable limitations/controversies, not
// generic hedging. Required on every section below except Quotes (§9).
export type CriticalTake = {
  points: string[];
  contextNote?: string;
};

// A person tied to an org/company by role — Key People (Organizations),
// Leadership (Companies), Ventures & Companies (Rich List). `personRef`
// is optional and, where present, cross-links to a `people.md`-derived entry.
export type RoleRef = {
  name: string;
  role: string;
  personRef?: string;
};

// A single labeled stat — Organizations' "By the Numbers" tab.
export type StatItem = {
  label: string;
  value: string;
};

// A foundational text/teaching — Philosophies' "Key Texts & Teachings" tab.
export type TextItem = {
  title: string;
  description?: string;
};
