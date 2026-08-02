import { notFound } from "next/navigation";
import {
  getAllOrganizations,
  getOrganizationById,
  ORG_CATEGORY_LABELS,
} from "@/lib/organizations";
import BackLink from "@/app/components/BackLink";
import RelatedLinks from "@/app/components/RelatedLinks";
import Badge from "@/app/components/Badge";
import DetailTabs from "@/app/components/DetailTabs";

export function generateStaticParams() {
  return getAllOrganizations().map((o) => ({ id: o.id }));
}

// Design Foundation session — Section 6 detail page. Tab set: Overview /
// History / Impact — exactly the 3-tab set proposed as the worked example
// for this section in the session brief itself.
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
        <DetailTabs
          tabs={[
            {
              key: "overview",
              label: "Overview",
              content: <p className="prose-reading">{org.summary}</p>,
            },
            {
              key: "history",
              label: "History",
              content: (
                <div className="prose-reading">
                  {org.history.split(/\n\s*\n/).map((p, i) => (
                    <p key={i}>{p.trim()}</p>
                  ))}
                </div>
              ),
            },
            {
              key: "impact",
              label: "Impact",
              content: (
                <div className="prose-reading">
                  {org.impact.split(/\n\s*\n/).map((p, i) => (
                    <p key={i}>{p.trim()}</p>
                  ))}
                </div>
              ),
            },
          ]}
        />
      </div>

      <RelatedLinks items={org.relatedIds} />
    </main>
  );
}
