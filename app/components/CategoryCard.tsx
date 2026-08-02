import Link from "next/link";
import { CATEGORY_ICONS } from "@/lib/books";

// v2: no longer used on the home page (replaced by CategoryAccordion, see
// docs/DESIGN_SYSTEM.md), kept in case a future grid view wants it again.
export default function CategoryCard({
  category,
  label,
  count,
}: {
  category: string;
  label: string;
  count: number;
}) {
  return (
    <Link
      href={`/category/${category}`}
      className="tap-target flex flex-col justify-between rounded-xl border border-border bg-surface p-4 transition-colors hover:border-orange-700"
    >
      <span className="text-2xl" aria-hidden="true">
        {CATEGORY_ICONS[category] ?? "📚"}
      </span>
      <div className="mt-3">
        <div className="text-sm font-medium leading-snug">{label}</div>
        <div className="mt-1 text-xs text-muted">
          {count} book{count === 1 ? "" : "s"}
        </div>
      </div>
    </Link>
  );
}
