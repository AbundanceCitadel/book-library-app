import type { Company } from "@/lib/companies";
import type { ResolvedRelatedLink } from "@/lib/related";
import SectionTabs from "./SectionTabs";
import RelatedLinks from "./RelatedLinks";
import { Prose, Timeline, BulletList, CriticalTakeBlock, RoleList } from "./SectionBlocks";

// Companies — 8 tabs. See docs/SECTIONS_SCHEMA.md §5.
export default function CompaniesTabs({
  company,
  related,
}: {
  company: Company;
  related: ResolvedRelatedLink[];
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
              <RelatedLinks links={related} />
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
          content: <RoleList roles={company.leadership} />,
        },
        {
          key: "legacy",
          label: "Legacy & Impact",
          content: <Prose text={company.legacyImpact} />,
        },
        {
          key: "lessons",
          label: "Lessons for Entrepreneurs",
          content: <BulletList items={company.lessonsForEntrepreneurs} />,
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
