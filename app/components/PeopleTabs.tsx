import type { Person } from "@/lib/people";
import type { ResolvedRelatedLink } from "@/lib/related";
import SectionTabs from "./SectionTabs";
import RelatedLinks from "./RelatedLinks";
import NotWritten from "./NotWritten";
import {
  Prose,
  Timeline,
  BulletList,
  NamedIdeas,
  QuoteCards,
  CriticalTakeBlock,
} from "./SectionBlocks";

// People — 7 tabs. See docs/SECTIONS_SCHEMA.md §1.
export default function PeopleTabs({
  person,
  related,
}: {
  person: Person;
  related: ResolvedRelatedLink[];
}) {
  return (
    <SectionTabs
      ariaLabel="Person sections"
      tabs={[
        {
          key: "overview",
          label: "Overview",
          content: (
            <section>
              <Prose text={person.overview} />
              <RelatedLinks links={related} />
            </section>
          ),
        },
        {
          key: "timeline",
          label: "Timeline & Career",
          content: <Timeline events={person.timeline} />,
        },
        {
          key: "achievements",
          label: "Key Achievements",
          content: <BulletList items={person.keyAchievements} />,
        },
        {
          key: "ideas",
          label: "Ideas & Principles",
          content: person.ideasPrinciples ? (
            <NamedIdeas ideas={person.ideasPrinciples} />
          ) : (
            <NotWritten label="Ideas & Principles" />
          ),
        },
        {
          key: "quotes",
          label: "Notable Quotes",
          content: <QuoteCards quotes={person.notableQuotes} />,
        },
        {
          key: "legacy",
          label: "Legacy & Impact",
          content: person.legacyImpact ? (
            <Prose text={person.legacyImpact} />
          ) : (
            <NotWritten label="Legacy & Impact" />
          ),
        },
        {
          key: "critical",
          label: "Critical Take",
          content: <CriticalTakeBlock take={person.criticalTake} />,
        },
      ]}
    />
  );
}
