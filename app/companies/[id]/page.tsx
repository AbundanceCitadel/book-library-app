import { notFound } from "next/navigation";
import { getAllCompanies, getCompanyById } from "@/lib/companies";
import { resolveRelatedLinks } from "@/lib/related";
import Badge from "@/app/components/Badge";
import CompaniesTabs from "@/app/components/CompaniesTabs";
import BackLink from "@/app/components/BackLink";

// Structure only — see docs/SECTIONS_SCHEMA.md §10.
export function generateStaticParams() {
  return getAllCompanies().map((company) => ({ id: company.id }));
}

export default function CompanyPage({ params }: { params: { id: string } }) {
  const company = getCompanyById(params.id);
  if (!company) notFound();
  const related = resolveRelatedLinks(company.related);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <BackLink label="Back" fallbackHref="/companies" />

      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {company.name}
      </h1>
      <p className="mt-1 text-muted">
        Founded {company.founded}
        {company.headquarters ? ` — ${company.headquarters}` : ""}
      </p>

      <div className="mt-3">
        <Badge tone="orange">{company.category}</Badge>
      </div>

      <div className="mt-6">
        <CompaniesTabs company={company} related={related} />
      </div>
    </main>
  );
}
