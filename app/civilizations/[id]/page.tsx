import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllCivilizations,
  getCivilizationById,
  CIVILIZATION_REGION_LABELS,
} from "@/lib/civilizations";
import { getAllRulers } from "@/lib/rulers";
import BackLink from "@/app/components/BackLink";
import RelatedLinks from "@/app/components/RelatedLinks";
import Badge from "@/app/components/Badge";
import DetailTabs from "@/app/components/DetailTabs";

export function generateStaticParams() {
  return getAllCivilizations().map((c) => ({ id: c.id }));
}

// Design Foundation session — Section 8 detail page. Tab set: Overview /
// Rise & Fall / Legacy / Notable Rulers — the fourth tab cross-links to
// Section 5 (Rulers) by name match where a full Ruler entry already exists,
// falling back to plain text otherwise, since this scaffolding pass has far
// more named rulers in civilizations.notableRulers than it has full Ruler
// entries. See docs/SCHEMA_SECTIONS.md "Civilization."
export default function CivilizationPage({ params }: { params: { id: string } }) {
  const civ = getCivilizationById(params.id);
  if (!civ) notFound();
  const rulers = getAllRulers();

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <BackLink label="Back" fallbackHref="/civilizations" />
      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {civ.name}
      </h1>
      <p className="mt-1 text-muted">{civ.era}</p>
      <div className="mt-3">
        <Badge tone="orange">{CIVILIZATION_REGION_LABELS[civ.region] ?? civ.region}</Badge>
      </div>

      <div className="mt-6">
        <DetailTabs
          tabs={[
            {
              key: "overview",
              label: "Overview",
              content: (
                <div className="prose-reading">
                  {civ.summary.split(/\n\s*\n/).map((p, i) => (
                    <p key={i}>{p.trim()}</p>
                  ))}
                </div>
              ),
            },
            {
              key: "rise-fall",
              label: "Rise & Fall",
              content: (
                <div className="prose-reading">
                  {civ.riseAndFall.split(/\n\s*\n/).map((p, i) => (
                    <p key={i}>{p.trim()}</p>
                  ))}
                </div>
              ),
            },
            {
              key: "legacy",
              label: "Legacy",
              content: (
                <div className="prose-reading">
                  {civ.legacy.split(/\n\s*\n/).map((p, i) => (
                    <p key={i}>{p.trim()}</p>
                  ))}
                </div>
              ),
            },
            {
              key: "rulers",
              label: "Notable Rulers",
              content: (
                <ul className="flex flex-wrap gap-2">
                  {civ.notableRulers.map((name) => {
                    const match = rulers.find((r) => r.name === name);
                    return (
                      <li key={name}>
                        {match ? (
                          <Link
                            href={`/rulers/${match.id}`}
                            className="tap-target motion-premium inline-flex items-center rounded-full border-2 border-orange-600/60 bg-surface px-3 text-sm hover:border-orange-500"
                          >
                            {name}
                          </Link>
                        ) : (
                          <span className="inline-flex items-center rounded-full border border-dashed border-border px-3 py-1.5 text-sm text-muted">
                            {name}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ),
            },
          ]}
        />
      </div>

      <RelatedLinks items={civ.relatedIds} />
    </main>
  );
}
