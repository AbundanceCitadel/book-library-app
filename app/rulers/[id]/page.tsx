import { notFound } from "next/navigation";
import { getAllRulers, getRulerById } from "@/lib/rulers";
import { resolveRelatedLinks } from "@/lib/related";
import Badge from "@/app/components/Badge";
import RulersTabs from "@/app/components/RulersTabs";
import BackLink from "@/app/components/BackLink";

// Structure only — see docs/SECTIONS_SCHEMA.md §10.
export function generateStaticParams() {
  return getAllRulers().map((ruler) => ({ id: ruler.id }));
}

export default function RulerPage({ params }: { params: { id: string } }) {
  const ruler = getRulerById(params.id);
  if (!ruler) notFound();
  const related = resolveRelatedLinks(ruler.related);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <BackLink label="Back" fallbackHref="/rulers" />

      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {ruler.name}
      </h1>
      <p className="mt-1 text-muted">
        {ruler.title} — {ruler.countryOrCivilization}
      </p>

      <div className="mt-3">
        <Badge>{ruler.reignPeriod}</Badge>
      </div>

      <div className="mt-6">
        <RulersTabs ruler={ruler} related={related} />
      </div>
    </main>
  );
}
