import Link from "next/link";
import type { Philosophy } from "@/lib/philosophies";
import type { ResolvedRelatedLink } from "@/lib/related";
import SectionTabs from "./SectionTabs";
import RelatedLinks from "./RelatedLinks";
import NotWritten from "./NotWritten";
import { Prose, NamedIdeas, TextItems, CriticalTakeBlock } from "./SectionBlocks";

// Philosophies — 8 tabs. See docs/SECTIONS_SCHEMA.md §7.
export default function PhilosophiesTabs({
  philosophy,
  related,
  notableFollowers,
}: {
  philosophy: Philosophy;
  related: ResolvedRelatedLink[];
  // Resolved separately from `related` — Notable Followers & Thinkers is its
  // own tab (cross-link-heavy into people.md), not the outside-tab-count
  // Related field.
  notableFollowers: ResolvedRelatedLink[];
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
              <RelatedLinks links={related} />
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
          content: <NamedIdeas ideas={philosophy.coreBeliefs} />,
        },
        {
          key: "texts",
          label: "Key Texts & Teachings",
          content: <TextItems items={philosophy.keyTexts} />,
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
                  <li key={`${f.section}-${f.id}`}>
                    <Link
                      href={f.href}
                      className="tap-target text-sm text-jade-400 hover:underline"
                    >
                      {f.label}
                    </Link>
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
