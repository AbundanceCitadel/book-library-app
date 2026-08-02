import Link from "next/link";
import type { Civilization } from "@/lib/civilizations";
import SectionTabs from "./SectionTabs";
import RelatedLinks, { type RelatedId } from "./RelatedLinks";
import NotWritten from "./NotWritten";
import { Prose, CriticalTakeBlock } from "./SectionBlocks";

// Civilizations — 8 tabs. See docs/SECTIONS_SCHEMA.md and New Section
// Research/Section_Detail_Tab_Structures.md §7.
export default function CivilizationsTabs({
  civ,
  related,
  notableRulers,
}: {
  civ: Civilization;
  related?: RelatedId[];
  // Resolved server-side by matching civ.notableRulers' plain names against
  // lib/rulers.ts entries — {name, href} where a real Rulers-section entry
  // exists, href undefined otherwise (rendered as plain text).
  notableRulers: { name: string; href?: string }[];
}) {
  return (
    <SectionTabs
      ariaLabel="Civilization sections"
      tabs={[
        {
          key: "overview",
          label: "Overview",
          content: (
            <section>
              <Prose text={civ.overview} />
              <RelatedLinks items={related} />
            </section>
          ),
        },
        {
          key: "rise",
          label: "Rise & Origins",
          content: <Prose text={civ.riseOrigins} />,
        },
        {
          key: "peak",
          label: "Golden Age / Peak",
          content: <Prose text={civ.goldenAgePeak} />,
        },
        {
          key: "society",
          label: "Society & Culture",
          content: <Prose text={civ.societyCulture} />,
        },
        {
          key: "decline",
          label: "Decline & Fall",
          content: <Prose text={civ.declineFall} />,
        },
        {
          key: "legacy",
          label: "Legacy — What It Left Behind",
          content: <Prose text={civ.legacy} />,
        },
        {
          key: "rulers",
          label: "Notable Rulers",
          content:
            notableRulers.length > 0 ? (
              <ul className="space-y-2">
                {notableRulers.map((r) => (
                  <li key={r.name}>
                    {r.href ? (
                      <Link href={r.href} className="tap-target text-sm text-jade-400 hover:underline">
                        {r.name}
                      </Link>
                    ) : (
                      <span className="text-sm">{r.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <NotWritten label="Notable Rulers" />
            ),
        },
        {
          key: "critical",
          label: "Critical Take",
          content: <CriticalTakeBlock take={civ.criticalTake} />,
        },
      ]}
    />
  );
}
