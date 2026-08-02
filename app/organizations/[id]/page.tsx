import { notFound } from "next/navigation";
import { getAllOrganizations, getOrganizationById } from "@/lib/organizations";
import { resolveRelatedLinks } from "@/lib/related";
import Badge from "@/app/components/Badge";
import OrganizationsTabs from "@/app/components/OrganizationsTabs";
import BackLink from "@/app/components/BackLink";

// Structure only — see docs/SECTIONS_SCHEMA.md §10.
export function generateStaticParams() {
  return getAllOrganizations().map((org) => ({ id: org.id }));
}

export default function OrganizationPage({ params }: { params: { id: string } }) {
  const org = getOrganizationById(params.id);
  if (!org) notFound();
  const related = resolveRelatedLinks(org.related);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <BackLink label="Back" fallbackHref="/organizations" />

      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {org.name}
      </h1>
      <p className="mt-1 text-muted">
        Founded {org.founded}
        {org.headquarters ? ` — ${org.headquarters}` : ""}
      </p>

      <div className="mt-3">
        <Badge tone="orange">{org.category}</Badge>
      </div>

      <div className="mt-6">
        <OrganizationsTabs org={org} related={related} />
      </div>
    </main>
  );
}
