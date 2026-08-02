import type { Company } from "@/lib/companies";
import SectionTabs from "./SectionTabs";
import RelatedLinks, { type RelatedId } from "./RelatedLinks";
import { Prose, Timeline, BulletList, CriticalTakeBlock, RoleList } from "./SectionBlocks";

// Companies — 8 tabs. See docs/SECTIONS_SCHEMA.md and New Section Research/
// Section_Detail_Tab_Structures.md §6.
export default function CompaniesTabs({
  company,
  related,
}: {
  company: Company;
  related?: RelatedId[];
}) {
  return (
    <SectionTabs
      ariaLabel="Company sections"
      tabs={[
        {
          key: "overview",
          label: "Overview",
          content: (
            <section>
              <Prose text={company.overview} />
              <RelatedLinks items={related} />
            </section>
          ),
        },
        {
          key: "founding",
          label: "Founding Story",
          content: <Prose text={company.foundingStory} />,
        },
        {
          key: "business-model",
          label: "Business Model & Products",
          content: <Prose text={company.businessModelProducts} />,
        },
        {
          key: "growth",
          label: "Growth Timeline",
          content: <Timeline events={company.growthTimeline} />,
        },
        {
          key: "leadership",
          label: "Leadership",
          content: <RoleList roles={company.leadership} label="Leadership" />,
        },
        {
          key: "legacy",
          label: "Legacy & Impact",
          content: <Prose text={company.legacyImpact} />,
        },
        {
          key: "lessons",
          label: "Lessons for Entrepreneurs",
          content: <BulletList items={company.lessonsForEntrepreneurs} label="Lessons for Entrepreneurs" />,
        },
        {
          key: "critical",
          label: "Critical Take",
          content: <CriticalTakeBlock take={company.criticalTake} />,
        },
      ]}
    />
  );
}
