import type { Ruler } from "@/lib/rulers";
import SectionTabs from "./SectionTabs";
import RelatedLinks, { type RelatedId } from "./RelatedLinks";
import { Prose, Timeline, BulletList, QuoteCards, CriticalTakeBlock } from "./SectionBlocks";

// Rulers — 7 tabs. See docs/SECTIONS_SCHEMA.md and New Section Research/
// Section_Detail_Tab_Structures.md §4.
export default function RulersTabs({
  ruler,
  related,
}: {
  ruler: Ruler;
  related?: RelatedId[];
}) {
  return (
    <SectionTabs
      ariaLabel="Ruler sections"
      tabs={[
        {
          key: "overview",
          label: "Overview",
          content: (
            <section>
              <Prose text={ruler.overview} />
              <RelatedLinks items={related} />
            </section>
          ),
        },
        {
          key: "rise",
          label: "Rise to Power",
          content: <Prose text={ruler.riseToPower} />,
        },
        {
          key: "reign",
          label: "Reign & Major Events",
          content: <Timeline events={ruler.reignEvents} />,
        },
        {
          key: "achievements",
          label: "Achievements & Reforms",
          content: <BulletList items={ruler.achievementsReforms} label="Achievements & Reforms" />,
        },
        {
          key: "succession",
          label: "Death & Succession",
          content: <Prose text={ruler.deathSuccession} />,
        },
        {
          key: "quotes",
          label: "Notable Quotes",
          content: <QuoteCards quotes={ruler.notableQuotes} />,
        },
        {
          key: "critical",
          label: "Critical Take",
          content: <CriticalTakeBlock take={ruler.criticalTake} />,
        },
      ]}
    />
  );
}
