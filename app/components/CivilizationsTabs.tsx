import Link from "next/link";
import type { Civilization } from "@/lib/civilizations";
import type { ResolvedRelatedLink } from "@/lib/related";
import SectionTabs from "./SectionTabs";
import RelatedLinks from "./RelatedLinks";
import NotWritten from "./NotWritten";
import { Prose, CriticalTakeBlock } from "./SectionBlocks";

// Civilizations — 8 tabs. See docs/SECTIONS_SCHEMA.md §6.
export default function CivilizationsTabs({
  civ,
  related,
  notableRulers,
}: {
  civ: Civilization;
  related: ResolvedRelatedLink[];
  // Resolved separately from `related` — Notable Rulers is its own tab
  // (cross-link-heavy), not the outside-tab-count Related field.
  notableRulers: ResolvedRelatedLink[];
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
              <RelatedLinks links={related} />
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
                  <li key={`${r.section}-${r.id}`}>
                    <Link
                      href={r.href}
                      className="tap-target text-sm text-jade-400 hover:underline"
                    >
                      {r.label}
                    </Link>
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
