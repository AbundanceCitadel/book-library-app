import { notFound } from "next/navigation";
import { getAllPhilosophies, getPhilosophyById, PHILOSOPHY_CATEGORY_LABELS } from "@/lib/philosophies";
import { getAllProfiles } from "@/lib/people";
import BackLink from "@/app/components/BackLink";
import Badge from "@/app/components/Badge";
import PhilosophiesTabs from "@/app/components/PhilosophiesTabs";

export function generateStaticParams() {
  return getAllPhilosophies().map((p) => ({ id: p.id }));
}

// Philosophies, Religions & Belief Systems detail page. 8 tabs via
// PhilosophiesTabs — Overview / Core Idea, Origin & Founder, Core Beliefs &
// Principles, Key Texts & Teachings, Practice Today, Notable Followers &
// Thinkers, Legacy & Global Influence, Critical Take / Debates — per the
// approved nine-section tab structure (see docs/SECTIONS_SCHEMA.md).
export default function PhilosophyPage({ params }: { params: { id: string } }) {
  const philosophy = getPhilosophyById(params.id);
  if (!philosophy) notFound();

  const allProfiles = getAllProfiles();
  const notableFollowers = philosophy.notableFollowers.map((name) => {
    const match = allProfiles.find((p) => p.name === name);
    return { name, href: match ? `/people/${match.id}` : undefined };
  });

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <BackLink label="Back" fallbackHref="/philosophies" />
      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {philosophy.name}
      </h1>
      <p className="mt-1 text-muted">{philosophy.origin}</p>
      <div className="mt-3">
        <Badge tone="orange">{PHILOSOPHY_CATEGORY_LABELS[philosophy.category] ?? philosophy.category}</Badge>
      </div>

      <div className="mt-6">
        <PhilosophiesTabs philosophy={philosophy} related={philosophy.relatedIds} notableFollowers={notableFollowers} />
      </div>
    </main>
  );
}
