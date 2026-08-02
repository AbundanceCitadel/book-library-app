import Link from "next/link";

// Design Foundation session — generic listing-card shell reused by all 8 new
// sections' listing pages, mirroring BookCard's box-in-box treatment
// (docs/DESIGN_SYSTEM.md v5) without depending on the Book type or its
// `code` field, which the new sections don't have. Each section's own
// listing page passes in whatever short blurb text makes sense for its data
// shape rather than this component knowing about 8 different content types.
export default function SectionEntryCard({
  href,
  title,
  meta,
  blurb,
  badge,
}: {
  href: string;
  title: string;
  meta?: string;
  blurb: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="book-row motion-premium tap-target block rounded-xl border-2 border-orange-600/70 bg-surface p-4"
    >
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span className="font-medium leading-snug">{title}</span>
        {meta && <span className="text-sm text-muted">— {meta}</span>}
        {badge && (
          <span className="ml-auto shrink-0 rounded-full bg-[var(--badge-pine-bg)] px-2 py-0.5 text-[10px] font-medium text-[var(--badge-pine-fg)]">
            {badge}
          </span>
        )}
      </div>
      <div className="mt-1.5 text-sm text-muted">{blurb}</div>
    </Link>
  );
}
