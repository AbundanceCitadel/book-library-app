import type { Organization } from "@/lib/organizations";
import SectionTabs from "./SectionTabs";
import RelatedLinks, { type RelatedId } from "./RelatedLinks";
import { Prose, BulletList, CriticalTakeBlock, RoleList, StatGrid } from "./SectionBlocks";

// Organizations — 7 tabs. See docs/SECTIONS_SCHEMA.md and New Section
// Research/Section_Detail_Tab_Structures.md §5. No Notable Quotes tab —
// isn't part of this section's approved tab list.
export default function OrganizationsTabs({
  org,
  related,
}: {
  org: Organization;
  related?: RelatedId[];
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
              <RelatedLinks items={related} />
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
          content: <BulletList items={org.majorAchievements} label="Major Achievements & Impact" />,
        },
        {
          key: "people",
          label: "Key People",
          content: <RoleList roles={org.keyPeople} label="Key People" />,
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
