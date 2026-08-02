import { notFound } from "next/navigation";
import { getAllCompanies, getCompanyById, COMPANY_CATEGORY_LABELS } from "@/lib/companies";
import BackLink from "@/app/components/BackLink";
import Badge from "@/app/components/Badge";
import CompaniesTabs from "@/app/components/CompaniesTabs";

export function generateStaticParams() {
  return getAllCompanies().map((c) => ({ id: c.id }));
}

// Companies & Brands detail page. 8 tabs via CompaniesTabs — Overview,
// Founding Story, Business Model & Products, Growth Timeline, Leadership,
// Legacy & Impact, Lessons for Entrepreneurs, Critical Take — per the
// approved nine-section tab structure (see docs/SECTIONS_SCHEMA.md).
export default function CompanyPage({ params }: { params: { id: string } }) {
  const company = getCompanyById(params.id);
  if (!company) notFound();

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <BackLink label="Back" fallbackHref="/companies" />
      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {company.name}
      </h1>
      <p className="mt-1 text-muted">Founded {company.founded}</p>
      <div className="mt-3">
        <Badge tone="orange">{COMPANY_CATEGORY_LABELS[company.category] ?? company.category}</Badge>
      </div>

      <div className="mt-6">
        <CompaniesTabs company={company} related={company.relatedIds} />
      </div>
    </main>
  );
}
