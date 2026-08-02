import type { RelatedLinkRef, SectionKind } from "./relatedTypes";
import { getAllBooks } from "./books";
import { getAllPeople } from "./people";
import { getAllRichListEntries } from "./richlist";
import { getAllRulers } from "./rulers";
import { getAllOrganizations } from "./organizations";
import { getAllCompanies } from "./companies";
import { getAllCivilizations } from "./civilizations";
import { getAllPhilosophies } from "./philosophies";

// Nine-section expansion (structure only, see docs/SECTIONS_SCHEMA.md §8).
// Resolves a stored {section, id} reference into a real {label, href} at
// render time, the same pattern lib/books.ts#getRelatedBooksInfo() already
// established for Book.relatedBooks — silently drops any reference that
// doesn't resolve (e.g. added before its target was written) rather than
// rendering a dead link. Call this server-side (in a page component, not a
// client component) and pass the resolved plain objects down as props.

const SECTION_PATH: Record<SectionKind, string> = {
  books: "book",
  people: "people",
  richlist: "richlist",
  rulers: "rulers",
  organizations: "organizations",
  companies: "companies",
  civilizations: "civilizations",
  philosophies: "philosophies",
};

const SECTION_LABEL: Record<SectionKind, string> = {
  books: "Book",
  people: "Person",
  richlist: "Rich List",
  rulers: "Ruler",
  organizations: "Organization",
  companies: "Company",
  civilizations: "Civilization",
  philosophies: "Philosophy",
};

export type ResolvedRelatedLink = {
  section: SectionKind;
  sectionLabel: string;
  id: string;
  label: string;
  href: string;
};

function lookupLabel(ref: RelatedLinkRef): string | undefined {
  switch (ref.section) {
    case "books":
      return getAllBooks().find((b) => b.id === ref.id)?.title;
    case "people":
      return getAllPeople().find((p) => p.id === ref.id)?.name;
    case "richlist":
      return getAllRichListEntries().find((r) => r.id === ref.id)?.name;
    case "rulers":
      return getAllRulers().find((r) => r.id === ref.id)?.name;
    case "organizations":
      return getAllOrganizations().find((o) => o.id === ref.id)?.name;
    case "companies":
      return getAllCompanies().find((c) => c.id === ref.id)?.name;
    case "civilizations":
      return getAllCivilizations().find((c) => c.id === ref.id)?.name;
    case "philosophies":
      return getAllPhilosophies().find((p) => p.id === ref.id)?.name;
    default:
      return undefined;
  }
}

export function resolveRelatedLinks(
  refs: RelatedLinkRef[] | undefined
): ResolvedRelatedLink[] {
  if (!refs || refs.length === 0) return [];
  return refs
    .map((ref) => {
      const label = lookupLabel(ref);
      if (!label) return null;
      return {
        section: ref.section,
        sectionLabel: SECTION_LABEL[ref.section],
        id: ref.id,
        label,
        href: `/${SECTION_PATH[ref.section]}/${ref.id}`,
      };
    })
    .filter((r): r is ResolvedRelatedLink => Boolean(r));
}
