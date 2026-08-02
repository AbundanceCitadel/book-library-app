import type { RichListEntry } from "@/lib/richlist";
import type { ResolvedRelatedLink } from "@/lib/related";
import SectionTabs from "./SectionTabs";
import RelatedLinks from "./RelatedLinks";
import NotWritten from "./NotWritten";
import { Prose, Timeline, BulletList, QuoteCards, CriticalTakeBlock, RoleList } from "./SectionBlocks";

// Rich List — 7 tabs. See docs/SECTIONS_SCHEMA.md §2.
export default function RichListTabs({
  entry,
  related,
}: {
  entry: RichListEntry;
  related: ResolvedRelatedLink[];
}) {
  return (
    <SectionTabs
      ariaLabel="Rich List entry sections"
      tabs={[
        {
          key: "overview",
          label: "Overview",
          content: (
            <section>
              <div className="elevate-sm rounded-xl border-2 border-orange-600/60 bg-surface p-4">
                <div className="text-2xl font-semibold text-orange-400">
                  ${entry.netWorth.amountUsd}
                </div>
                <p className="mt-1 text-xs text-muted">
                  As of {entry.netWorth.asOfDate} — {entry.netWorth.sourceNote}
                </p>
              </div>
              <div className="mt-6">
                <Prose text={entry.overview} />
              </div>
              <RelatedLinks links={related} />
            </section>
          ),
        },
        {
          key: "timeline",
          label: "Wealth & Career Timeline",
          content: <Timeline events={entry.wealthTimeline} />,
        },
        {
          key: "ventures",
          label: "Ventures & Companies",
          content: <RoleList roles={entry.venturesCompanies} />,
        },
        {
          key: "philanthropy",
          label: "Philanthropy & Causes",
          content: entry.philanthropy ? (
            <BulletList items={entry.philanthropy} />
          ) : (
            <NotWritten label="Philanthropy & Causes" />
          ),
        },
        {
          key: "quotes",
          label: "Notable Quotes",
          content: <QuoteCards quotes={entry.notableQuotes} />,
        },
        {
          key: "playbook",
          label: "Playbook / Lessons",
          content: <BulletList items={entry.playbookLessons} />,
        },
        {
          key: "critical",
          label: "Critical Take",
          content: <CriticalTakeBlock take={entry.criticalTake} />,
        },
      ]}
    />
  );
}
