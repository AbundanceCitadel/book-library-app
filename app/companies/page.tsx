import {
  getAllCompanies,
  getAllCompanyCategories,
  COMPANY_CATEGORY_LABELS,
  COMPANY_CATEGORY_ICONS,
} from "@/lib/companies";
import { groupByKey, firstSentences } from "@/lib/content";
import SectionEntryCard from "@/app/components/SectionEntryCard";
import BackLink from "@/app/components/BackLink";

export default function CompaniesPage() {
  const companies = getAllCompanies();
  const grouped = groupByKey(companies, (c) => c.category);
  const categories = getAllCompanyCategories();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <BackLink label="All sections" fallbackHref="/" />
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Companies &amp; Brands
      </h1>
      <p className="mt-1 text-sm text-muted">
        Iconic companies — founding story, milestones, culture. Pairs with
        Rich List and the book library&rsquo;s Business/Finance categories.
        Scaffolding pass — 1 example entry.
      </p>

      {categories.map((cat) => {
        const entries = grouped[cat] ?? [];
        if (entries.length === 0) return null;
        return (
          <div key={cat} className="mt-8">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-muted">
              <span aria-hidden="true">{COMPANY_CATEGORY_ICONS[cat]}</span>
              {COMPANY_CATEGORY_LABELS[cat]}
            </h2>
            <div className="mt-3 flex flex-col gap-3">
              {entries.map((c) => (
                <SectionEntryCard
                  key={c.id}
                  href={`/companies/${c.id}`}
                  title={c.name}
                  meta={`Founded ${c.founded}`}
                  blurb={firstSentences(c.summary)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </main>
  );
}
