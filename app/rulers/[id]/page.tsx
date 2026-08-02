import { notFound } from "next/navigation";
import { getAllRulers, getRulerById, RULER_COUNTRY_LABELS } from "@/lib/rulers";
import BackLink from "@/app/components/BackLink";
import Badge from "@/app/components/Badge";
import RulersTabs from "@/app/components/RulersTabs";

export function generateStaticParams() {
  return getAllRulers().map((r) => ({ id: r.id }));
}

// Kings, Generals & Presidents detail page. 7 tabs via RulersTabs —
// Overview, Rise to Power, Reign & Major Events, Achievements & Reforms,
// Death & Succession, Notable Quotes, Critical Take — per the approved
// nine-section tab structure (see docs/SECTIONS_SCHEMA.md).
export default function RulerPage({ params }: { params: { id: string } }) {
  const ruler = getRulerById(params.id);
  if (!ruler) notFound();

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <BackLink label="Back" fallbackHref="/rulers" />
      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {ruler.name}
      </h1>
      <p className="mt-1 text-muted">{ruler.title} · {ruler.era}</p>
      <div className="mt-3">
        <Badge tone="orange">{RULER_COUNTRY_LABELS[ruler.country] ?? ruler.country}</Badge>
      </div>

      <div className="mt-6">
        <RulersTabs ruler={ruler} related={ruler.relatedIds} />
      </div>
    </main>
  );
}
