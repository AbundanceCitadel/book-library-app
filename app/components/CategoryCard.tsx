import Link from "next/link";
import { CATEGORY_ICONS } from "@/lib/books";

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
      className="tap-target flex flex-col justify-between rounded-xl border border-neutral-200 p-4 transition-colors hover:border-accent-300 hover:bg-accent-50/40 dark:border-neutral-800 dark:hover:border-accent-700 dark:hover:bg-accent-900/10"
    >
      <span className="text-2xl" aria-hidden="true">
        {CATEGORY_ICONS[category] ?? "📚"}
      </span>
      <div className="mt-3">
        <div className="text-sm font-medium leading-snug">{label}</div>
        <div className="mt-1 text-xs text-neutral-500">
          {count} book{count === 1 ? "" : "s"}
        </div>
      </div>
    </Link>
  );
}
