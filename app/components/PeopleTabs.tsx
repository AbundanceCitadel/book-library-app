import type { Person } from "@/lib/people";
import SectionTabs from "./SectionTabs";
import RelatedLinks, { type RelatedId } from "./RelatedLinks";
import NotWritten from "./NotWritten";
import {
  Prose,
  Timeline,
  BulletList,
  NamedIdeas,
  QuoteCards,
  CriticalTakeBlock,
} from "./SectionBlocks";

// People — 7 tabs. See docs/SECTIONS_SCHEMA.md and New Section Research/
// Section_Detail_Tab_Structures.md §2.
export default function PeopleTabs({
  person,
  related,
}: {
  person: Person;
  related?: RelatedId[];
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
              <RelatedLinks items={related} />
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
          content: <BulletList items={person.keyAchievements} label="Key Achievements" />,
        },
        {
          key: "ideas",
          label: "Ideas & Principles",
          content: person.ideasPrinciples && person.ideasPrinciples.length > 0 ? (
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
          content: <Prose text={person.legacyImpact} />,
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
