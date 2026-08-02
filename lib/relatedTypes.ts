// Nine-section expansion (structure only, see docs/SECTIONS_SCHEMA.md §8).
// Kept dependency-free (no `fs`/`path`, no loader imports) so every section's
// entry type can import `RelatedLinkRef` as a type-only import without any
// risk of a circular runtime import with lib/related.ts (which does import
// every loader to resolve these references).

export type SectionKind =
  | "books"
  | "people"
  | "richlist"
  | "rulers"
  | "organizations"
  | "companies"
  | "civilizations"
  | "philosophies";

// Every entry stores only the reference (section + id), never a denormalized
// label/title — so a renamed target never leaves a stale label behind. See
// lib/related.ts#resolveRelatedLinks() for how these get turned into
// {label, href} at render time, and BookTabs.tsx / lib/books.ts's existing
// `relatedBooks` + `getRelatedBooksInfo()` for the precedent this mirrors.
export type RelatedLinkRef = {
  section: SectionKind;
  id: string;
};
