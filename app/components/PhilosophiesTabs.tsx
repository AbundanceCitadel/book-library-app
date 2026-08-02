import Link from "next/link";
import type { Philosophy } from "@/lib/philosophies";
import SectionTabs from "./SectionTabs";
import RelatedLinks, { type RelatedId } from "./RelatedLinks";
import NotWritten from "./NotWritten";
import { Prose, BulletList, TextItems, CriticalTakeBlock } from "./SectionBlocks";

// Philosophies — 8 tabs. See docs/SECTIONS_SCHEMA.md and New Section
// Research/Section_Detail_Tab_Structures.md §8.
export default function PhilosophiesTabs({
  philosophy,
  related,
  notableFollowers,
}: {
  philosophy: Philosophy;
  related?: RelatedId[];
  // Resolved server-side by matching philosophy.notableFollowers' plain
  // names against lib/people.ts entries — {name, href} where a real People
  // entry exists, href undefined otherwise.
  notableFollowers: { name: string; href?: string }[];
}) {
  return (
    <SectionTabs
      ariaLabel="Philosophy sections"
      tabs={[
        {
          key: "overview",
          label: "Overview / Core Idea",
          content: (
            <section>
              <Prose text={philosophy.overview} />
              <RelatedLinks items={related} />
            </section>
          ),
        },
        {
          key: "origin",
          label: "Origin & Founder",
          content: <Prose text={philosophy.originFounder} />,
        },
        {
          key: "beliefs",
          label: "Core Beliefs & Principles",
          content: <BulletList items={philosophy.coreBeliefs} label="Core Beliefs & Principles" />,
        },
        {
          key: "texts",
          label: "Key Texts & Teachings",
          content: <TextItems items={philosophy.keyTexts} label="Key Texts & Teachings" />,
        },
        {
          key: "practice",
          label: "Practice Today",
          content: <Prose text={philosophy.practiceToday} />,
        },
        {
          key: "followers",
          label: "Notable Followers & Thinkers",
          content:
            notableFollowers.length > 0 ? (
              <ul className="space-y-2">
                {notableFollowers.map((f) => (
                  <li key={f.name}>
                    {f.href ? (
                      <Link href={f.href} className="tap-target text-sm text-jade-400 hover:underline">
                        {f.name}
                      </Link>
                    ) : (
                      <span className="text-sm">{f.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <NotWritten label="Notable Followers & Thinkers" />
            ),
        },
        {
          key: "legacy",
          label: "Legacy & Global Influence",
          content: <Prose text={philosophy.legacyGlobalInfluence} />,
        },
        {
          key: "critical",
          label: "Critical Take / Debates",
          content: <CriticalTakeBlock take={philosophy.criticalTake} />,
        },
      ]}
    />
  );
}
