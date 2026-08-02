import type { Ruler } from "@/lib/rulers";
import type { ResolvedRelatedLink } from "@/lib/related";
import SectionTabs from "./SectionTabs";
import RelatedLinks from "./RelatedLinks";
import { Prose, Timeline, BulletList, QuoteCards, CriticalTakeBlock } from "./SectionBlocks";

// Rulers — 7 tabs. See docs/SECTIONS_SCHEMA.md §3.
export default function RulersTabs({
  ruler,
  related,
}: {
  ruler: Ruler;
  related: ResolvedRelatedLink[];
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
              <RelatedLinks links={related} />
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
          content: <BulletList items={ruler.achievementsReforms} />,
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
