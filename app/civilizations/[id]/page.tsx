import { notFound } from "next/navigation";
import { getAllCivilizations, getCivilizationById, CIVILIZATION_REGION_LABELS } from "@/lib/civilizations";
import { getAllRulers } from "@/lib/rulers";
import BackLink from "@/app/components/BackLink";
import Badge from "@/app/components/Badge";
import CivilizationsTabs from "@/app/components/CivilizationsTabs";

export function generateStaticParams() {
  return getAllCivilizations().map((c) => ({ id: c.id }));
}

// Civilizations & Empires detail page. 8 tabs via CivilizationsTabs —
// Overview, Rise & Origins, Golden Age/Peak, Society & Culture, Decline &
// Fall, Legacy — What It Left Behind, Notable Rulers, Critical Take — per
// the approved nine-section tab structure (see docs/SECTIONS_SCHEMA.md).
export default function CivilizationPage({ params }: { params: { id: string } }) {
  const civ = getCivilizationById(params.id);
  if (!civ) notFound();

  const allRulers = getAllRulers();
  const notableRulers = civ.notableRulers.map((name) => {
    const match = allRulers.find((r) => r.name === name);
    return { name, href: match ? `/rulers/${match.id}` : undefined };
  });

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
        <CivilizationsTabs civ={civ} related={civ.relatedIds} notableRulers={notableRulers} />
      </div>
    </main>
  );
}
