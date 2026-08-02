import { notFound } from "next/navigation";
import {
  getAllRichListEntries,
  getRichListEntryById,
  RICHLIST_CATEGORY_LABELS,
} from "@/lib/richlist";
import BackLink from "@/app/components/BackLink";
import RelatedLinks from "@/app/components/RelatedLinks";
import Badge from "@/app/components/Badge";
import DetailTabs from "@/app/components/DetailTabs";

export function generateStaticParams() {
  return getAllRichListEntries().map((e) => ({ id: e.id }));
}

// Design Foundation session — Section 3 detail page. Tab set: Overview /
// Portfolio — deliberately only 2 (shorter than the 3-4-tab sets elsewhere):
// a rich-list entry's schema (lib/richlist.ts) has one bio field and a
// portfolio array, and a bio-derived "Background" tab would just repeat
// Overview's content with nothing new — padding a tab count for its own
// sake was judged worse than an honest 2-tab set. See
// docs/SCHEMA_SECTIONS.md "RichListEntry."
export default function RichListEntryPage({ params }: { params: { id: string } }) {
  const entry = getRichListEntryById(params.id);
  if (!entry) notFound();

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <BackLink label="Back" fallbackHref="/richlist" />
      <p className="mt-3 font-mono text-xs text-amber-400">Rank #{entry.rank}</p>
      <h1 className="mt-1 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {entry.name}
      </h1>
      <p className="mt-1 text-muted">{entry.country}</p>
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <Badge tone="orange">{RICHLIST_CATEGORY_LABELS[entry.category] ?? entry.category}</Badge>
        <Badge>${entry.netWorthUsdBillions}B — as of {entry.asOfDate}</Badge>
      </div>

      <div className="mt-6">
        <DetailTabs
          tabs={[
            {
              key: "overview",
              label: "Overview",
              content: (
                <div className="prose-reading">
                  {entry.bio.split(/\n\s*\n/).map((p, i) => (
                    <p key={i}>{p.trim()}</p>
                  ))}
                </div>
              ),
            },
            {
              key: "portfolio",
              label: "Portfolio",
              content: (
                <div className="space-y-4">
                  {entry.portfolio.map((h, i) => (
                    <div key={i} className="elevate-sm rounded-xl border-2 border-orange-600/60 bg-surface p-4">
                      <h3 className="text-base font-semibold">{h.holding}</h3>
                      <p className="prose-reading mt-2 text-sm">{h.description}</p>
                      {h.approxStake && (
                        <p className="mt-2 text-xs text-muted">{h.approxStake}</p>
                      )}
                    </div>
                  ))}
                </div>
              ),
            },
          ]}
        />
      </div>

      <RelatedLinks items={entry.relatedIds} />
    </main>
  );
}
