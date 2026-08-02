import { notFound } from "next/navigation";
import { getAllRichListEntries, getRichListEntryById } from "@/lib/richlist";
import { resolveRelatedLinks } from "@/lib/related";
import Badge from "@/app/components/Badge";
import RichListTabs from "@/app/components/RichListTabs";
import BackLink from "@/app/components/BackLink";

// Structure only — see docs/SECTIONS_SCHEMA.md §10.
export function generateStaticParams() {
  return getAllRichListEntries().map((entry) => ({ id: entry.id }));
}

export default function RichListEntryPage({ params }: { params: { id: string } }) {
  const entry = getRichListEntryById(params.id);
  if (!entry) notFound();
  const related = resolveRelatedLinks(entry.related);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <BackLink label="Back" fallbackHref="/richlist" />

      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {entry.name}
      </h1>
      <p className="mt-1 text-muted">{entry.wealthSource}</p>

      <div className="mt-3">
        <Badge tone="orange">{entry.wealthSource}</Badge>
      </div>

      <div className="mt-6">
        <RichListTabs entry={entry} related={related} />
      </div>
    </main>
  );
}
