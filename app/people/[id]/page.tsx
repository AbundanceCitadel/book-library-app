import { notFound } from "next/navigation";
import { getAllPeople, getPersonById } from "@/lib/people";
import { resolveRelatedLinks } from "@/lib/related";
import Badge from "@/app/components/Badge";
import PeopleTabs from "@/app/components/PeopleTabs";
import BackLink from "@/app/components/BackLink";

// Structure only — see docs/SECTIONS_SCHEMA.md §10. getAllPeople() returns
// [] until content/people/*.json entries exist, so this route currently
// generates zero static pages; the route/schema/UI wiring is in place ahead
// of the future content-gathering pass.
export function generateStaticParams() {
  return getAllPeople().map((person) => ({ id: person.id }));
}

export default function PersonPage({ params }: { params: { id: string } }) {
  const person = getPersonById(params.id);
  if (!person) notFound();
  const related = resolveRelatedLinks(person.related);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <BackLink label="Back" fallbackHref="/people" />

      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {person.name}
      </h1>
      <p className="mt-1 text-muted">{person.eraOrCountry}</p>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {person.categories.map((cat) => (
          <Badge key={cat} tone="orange">
            {cat}
          </Badge>
        ))}
      </div>

      <div className="mt-6">
        <PeopleTabs person={person} related={related} />
      </div>
    </main>
  );
}
