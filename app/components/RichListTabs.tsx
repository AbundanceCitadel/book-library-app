import type { RichListEntry } from "@/lib/richlist";
import SectionTabs from "./SectionTabs";
import RelatedLinks, { type RelatedId } from "./RelatedLinks";
import { Prose, Timeline, BulletList, QuoteCards, CriticalTakeBlock } from "./SectionBlocks";

// Rich List — 7 tabs. See docs/SECTIONS_SCHEMA.md and New Section Research/
// Section_Detail_Tab_Structures.md §3.
export default function RichListTabs({
  entry,
  related,
}: {
  entry: RichListEntry;
  related?: RelatedId[];
}) {
  const ventureItems = entry.portfolio.map(
    (h) => `${h.holding} — ${h.description}${h.approxStake ? ` (${h.approxStake})` : ""}`
  );

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
                  ${entry.netWorthUsdBillions}B
                </div>
                <p className="mt-1 text-xs text-muted">As of {entry.asOfDate}</p>
              </div>
              <div className="mt-6">
                <Prose text={entry.overview} />
              </div>
              <RelatedLinks items={related} />
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
          content: <BulletList items={ventureItems} label="Ventures & Companies" />,
        },
        {
          key: "philanthropy",
          label: "Philanthropy & Causes",
          content:
            entry.philanthropy && entry.philanthropy.length > 0 ? (
              <BulletList items={entry.philanthropy} label="Philanthropy & Causes" />
            ) : (
              <BulletList items={[]} label="Philanthropy & Causes" />
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
          content: <BulletList items={entry.playbookLessons} label="Playbook / Lessons" />,
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
