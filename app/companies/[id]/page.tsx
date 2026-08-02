import { notFound } from "next/navigation";
import {
  getAllCompanies,
  getCompanyById,
  COMPANY_CATEGORY_LABELS,
} from "@/lib/companies";
import BackLink from "@/app/components/BackLink";
import RelatedLinks from "@/app/components/RelatedLinks";
import Badge from "@/app/components/Badge";
import DetailTabs from "@/app/components/DetailTabs";

export function generateStaticParams() {
  return getAllCompanies().map((c) => ({ id: c.id }));
}

// Design Foundation session — Section 7 detail page. Tab set: Overview /
// Founding Story / Milestones / Culture — matching the session brief's own
// description of this section's content almost field-for-field.
export default function CompanyPage({ params }: { params: { id: string } }) {
  const company = getCompanyById(params.id);
  if (!company) notFound();

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <BackLink label="Back" fallbackHref="/companies" />
      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {company.name}
      </h1>
      <p className="mt-1 text-muted">
        Founded {company.founded} · {company.founders.join(", ")}
      </p>
      <div className="mt-3">
        <Badge tone="orange">{COMPANY_CATEGORY_LABELS[company.category] ?? company.category}</Badge>
      </div>

      <div className="mt-6">
        <DetailTabs
          tabs={[
            {
              key: "overview",
              label: "Overview",
              content: <p className="prose-reading">{company.summary}</p>,
            },
            {
              key: "founding",
              label: "Founding Story",
              content: (
                <div className="prose-reading">
                  {company.foundingStory.split(/\n\s*\n/).map((p, i) => (
                    <p key={i}>{p.trim()}</p>
                  ))}
                </div>
              ),
            },
            {
              key: "milestones",
              label: "Milestones",
              content: (
                <ol className="space-y-4 border-l-2 border-border pl-4">
                  {company.milestones.map((m, i) => (
                    <li key={i} className="relative">
                      <span
                        aria-hidden="true"
                        className="absolute -left-[1.45rem] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--badge-orange-bg)] text-[10px] font-semibold text-[var(--badge-orange-fg)]"
                      >
                        {i + 1}
                      </span>
                      <div className="text-xs font-semibold uppercase tracking-wide text-orange-400">{m.year}</div>
                      <p className="prose-reading mt-1 text-sm">{m.event}</p>
                    </li>
                  ))}
                </ol>
              ),
            },
            {
              key: "culture",
              label: "Culture",
              content: <p className="prose-reading">{company.culture}</p>,
            },
          ]}
        />
      </div>

      <RelatedLinks items={company.relatedIds} />
    </main>
  );
}
