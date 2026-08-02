import Link from "next/link";
import type { ResolvedRelatedLink } from "@/lib/related";

// Nine-section expansion (structure only, see docs/SECTIONS_SCHEMA.md §0/§8).
// Renders the "Related" cross-link element — a field, not a tab, per the
// approved proposal's uniform rule (Section_Detail_Tab_Structures.md §1).
// Rendered inside each section's Overview tab panel, mirroring exactly how
// BookTabs.tsx already renders "Related Books" inside the Summary tab rather
// than as a separate 9th tab.
export default function RelatedLinks({
  links,
  heading = "Related",
}: {
  links: ResolvedRelatedLink[];
  heading?: string;
}) {
  if (links.length === 0) return null;

  return (
    <div className="mt-8 border-t border-border pt-6">
      <h2 className="text-xl font-semibold">{heading}</h2>
      <ul className="mt-3 space-y-1">
        {links.map((rel) => (
          <li key={`${rel.section}-${rel.id}`}>
            <Link
              href={rel.href}
              className="tap-target text-sm text-jade-400 hover:underline"
            >
              {rel.label}
            </Link>
            <span className="ml-2 text-xs text-muted">{rel.sectionLabel}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
