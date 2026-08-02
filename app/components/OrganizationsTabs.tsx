import type { Organization } from "@/lib/organizations";
import type { ResolvedRelatedLink } from "@/lib/related";
import SectionTabs from "./SectionTabs";
import RelatedLinks from "./RelatedLinks";
import { Prose, BulletList, CriticalTakeBlock, RoleList, StatGrid } from "./SectionBlocks";

// Organizations — 7 tabs. See docs/SECTIONS_SCHEMA.md §4. No Notable Quotes
// tab here — it isn't part of this section's approved tab list (see the
// shared spine table in Section_Detail_Tab_Structures.md §1).
export default function OrganizationsTabs({
  org,
  related,
}: {
  org: Organization;
  related: ResolvedRelatedLink[];
}) {
  return (
    <SectionTabs
      ariaLabel="Organization sections"
      tabs={[
        {
          key: "overview",
          label: "Overview",
          content: (
            <section>
              <Prose text={org.overview} />
              <RelatedLinks links={related} />
            </section>
          ),
        },
        {
          key: "history",
          label: "History & Founding",
          content: <Prose text={org.historyFounding} />,
        },
        {
          key: "structure",
          label: "Structure & How It Works",
          content: <Prose text={org.structureHowItWorks} />,
        },
        {
          key: "achievements",
          label: "Major Achievements & Impact",
          content: <BulletList items={org.majorAchievements} />,
        },
        {
          key: "people",
          label: "Key People",
          content: <RoleList roles={org.keyPeople} />,
        },
        {
          key: "numbers",
          label: "By the Numbers",
          content: <StatGrid stats={org.byTheNumbers} />,
        },
        {
          key: "critical",
          label: "Critical Take",
          content: <CriticalTakeBlock take={org.criticalTake} />,
        },
      ]}
    />
  );
}
