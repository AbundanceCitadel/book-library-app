import { notFound } from "next/navigation";
import { getAllCivilizations, getCivilizationById } from "@/lib/civilizations";
import { resolveRelatedLinks } from "@/lib/related";
import CivilizationsTabs from "@/app/components/CivilizationsTabs";
import BackLink from "@/app/components/BackLink";

// Structure only — see docs/SECTIONS_SCHEMA.md §10.
export function generateStaticParams() {
  return getAllCivilizations().map((civ) => ({ id: civ.id }));
}

export default function CivilizationPage({ params }: { params: { id: string } }) {
  const civ = getCivilizationById(params.id);
  if (!civ) notFound();
  const related = resolveRelatedLinks(civ.related);
  const notableRulers = resolveRelatedLinks(civ.notableRulers);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <BackLink label="Back" fallbackHref="/civilizations" />

      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {civ.name}
      </h1>
      <p className="mt-1 text-muted">
        {civ.region} — {civ.period}
      </p>

      <div className="mt-6">
        <CivilizationsTabs civ={civ} related={related} notableRulers={notableRulers} />
      </div>
    </main>
  );
}
