import { notFound } from "next/navigation";
import { getAllPhilosophies, getPhilosophyById } from "@/lib/philosophies";
import { resolveRelatedLinks } from "@/lib/related";
import Badge from "@/app/components/Badge";
import PhilosophiesTabs from "@/app/components/PhilosophiesTabs";
import BackLink from "@/app/components/BackLink";

// Structure only — see docs/SECTIONS_SCHEMA.md §10.
export function generateStaticParams() {
  return getAllPhilosophies().map((p) => ({ id: p.id }));
}

export default function PhilosophyPage({ params }: { params: { id: string } }) {
  const philosophy = getPhilosophyById(params.id);
  if (!philosophy) notFound();
  const related = resolveRelatedLinks(philosophy.related);
  const notableFollowers = resolveRelatedLinks(philosophy.notableFollowers);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <BackLink label="Back" fallbackHref="/philosophies" />

      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {philosophy.name}
      </h1>

      <div className="mt-3">
        <Badge tone="orange">{philosophy.category}</Badge>
      </div>

      <div className="mt-6">
        <PhilosophiesTabs
          philosophy={philosophy}
          related={related}
          notableFollowers={notableFollowers}
        />
      </div>
    </main>
  );
}
