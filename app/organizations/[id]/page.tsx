import { notFound } from "next/navigation";
import { getAllOrganizations, getOrganizationById, ORG_CATEGORY_LABELS } from "@/lib/organizations";
import BackLink from "@/app/components/BackLink";
import Badge from "@/app/components/Badge";
import OrganizationsTabs from "@/app/components/OrganizationsTabs";

export function generateStaticParams() {
  return getAllOrganizations().map((o) => ({ id: o.id }));
}

// Groups & Organizations detail page. 7 tabs via OrganizationsTabs —
// Overview, History & Founding, Structure & How It Works, Major
// Achievements & Impact, Key People, By the Numbers, Critical Take — per
// the approved nine-section tab structure (see docs/SECTIONS_SCHEMA.md).
export default function OrganizationPage({ params }: { params: { id: string } }) {
  const org = getOrganizationById(params.id);
  if (!org) notFound();

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <BackLink label="Back" fallbackHref="/organizations" />
      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {org.name}
      </h1>
      <p className="mt-1 text-muted">Founded {org.founded}</p>
      <div className="mt-3">
        <Badge tone="orange">{ORG_CATEGORY_LABELS[org.category] ?? org.category}</Badge>
      </div>

      <div className="mt-6">
        <OrganizationsTabs org={org} related={org.relatedIds} />
      </div>
    </main>
  );
}
