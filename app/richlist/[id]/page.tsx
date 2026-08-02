import { notFound } from "next/navigation";
import { getAllRichListEntries, getRichListEntryById, RICHLIST_CATEGORY_LABELS } from "@/lib/richlist";
import BackLink from "@/app/components/BackLink";
import Badge from "@/app/components/Badge";
import RichListTabs from "@/app/components/RichListTabs";

export function generateStaticParams() {
  return getAllRichListEntries().map((e) => ({ id: e.id }));
}

// Rich List detail page. 7 tabs via RichListTabs — Overview, Wealth &
// Career Timeline, Ventures & Companies, Philanthropy & Causes, Notable
// Quotes, Playbook/Lessons, Critical Take — per the approved nine-section
// tab structure (see docs/SECTIONS_SCHEMA.md).
export default function RichListEntryPage({ params }: { params: { id: string } }) {
  const entry = getRichListEntryById(params.id);
  if (!entry) notFound();

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <BackLink label="Back" fallbackHref="/richlist" />
      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        #{entry.rank} {entry.name}
      </h1>
      <p className="mt-1 text-muted">{entry.country}</p>
      <div className="mt-3">
        <Badge tone="orange">{RICHLIST_CATEGORY_LABELS[entry.category] ?? entry.category}</Badge>
      </div>

      <div className="mt-6">
        <RichListTabs entry={entry} related={entry.relatedIds} />
      </div>
    </main>
  );
}
