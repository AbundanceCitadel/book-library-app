// Shared sub-types reused across People/Rich List/Rulers/Organizations/
// Companies/Civilizations/Philosophies detail-page tabs, so each section's
// own lib file only has to define the fields that are genuinely specific to
// it. Introduced when the approved nine-section tab structure (see
// docs/SECTIONS_SCHEMA.md and New Section Research/
// Section_Detail_Tab_Structures.md) was merged into the sections that were
// already live with an earlier, simpler 4-tab scaffolding.

// A dated event on a Timeline & Career / Reign & Major Events / Growth
// Timeline / Wealth & Career Timeline tab. `period` is a free string (a year,
// a range, "c. 3rd century BCE") rather than a strict date type, since these
// entries span everything from ancient rulers to modern companies.
export type TimelineEvent = {
  period: string;
  event: string;
};

// A named, standalone idea/tenet/principle — reused for People's "Ideas &
// Principles" tab. Same shape as the book schema's `ConceptFramework` (minus
// `sourceSection`, which only makes sense for a book with numbered chapters).
export type NamedIdea = {
  name: string;
  definition: string;
};

// Notable Quotes tab entry.
export type SectionQuote = {
  text: string;
  attribution: string;
};

// Critical Take tab — identical shape to the book schema's `CriticalTake`
// (lib/books.ts), reused as-is: honest, specific, checkable limitations/
// controversies, not generic hedging. Required on every section below except
// Quotes.
export type CriticalTake = {
  points: string[];
  contextNote?: string;
};

// A person tied to an org/company/fortune by role — Key People
// (Organizations), Leadership (Companies).
export type RoleRef = {
  name: string;
  role: string;
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
