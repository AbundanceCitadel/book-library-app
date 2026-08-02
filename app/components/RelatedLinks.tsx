import Link from "next/link";

// Design Foundation session — generic cross-link renderer. Every new
// section's type includes an optional `relatedIds: {section, id, label}[]`
// field (see lib/*.ts) so entries can point at related entries in other
// sections (Steve Jobs -> Apple Inc., Julius Caesar -> Roman Empire, Warren
// Buffett's quotes -> his book-library biography, Buddhism -> the book
// library's Thich Nhat Hanh category). This component is the one place that
// maps a `section` key to its real URL prefix, so every detail page renders
// cross-links the same way instead of each page hand-rolling its own Link.
const SECTION_HREF_PREFIX: Record<string, string> = {
  library: "/book/",
  "library-category": "/category/",
  people: "/people/",
  richlist: "/richlist/",
  quotes: "/quotes/",
  rulers: "/rulers/",
  organizations: "/organizations/",
  companies: "/companies/",
  civilizations: "/civilizations/",
  philosophies: "/philosophies/",
};

export type RelatedId = { section: string; id: string; label: string };

export default function RelatedLinks({ items }: { items?: RelatedId[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="mt-8 border-t border-border pt-6">
      <h2 className="text-sm font-semibold text-muted">Related</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((r) => {
          const prefix = SECTION_HREF_PREFIX[r.section];
          if (!prefix) return null;
          return (
            <li key={`${r.section}-${r.id}`}>
              <Link
                href={`${prefix}${r.id}`}
                className="tap-target motion-premium inline-flex items-center rounded-full border-2 border-orange-600/60 bg-surface px-3 text-sm hover:border-orange-500"
              >
                {r.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
