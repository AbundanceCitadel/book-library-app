import {
  getAllOrganizations,
  getAllOrgCategories,
  ORG_CATEGORY_LABELS,
  ORG_CATEGORY_ICONS,
} from "@/lib/organizations";
import { groupByKey, firstSentences } from "@/lib/content";
import SectionEntryCard from "@/app/components/SectionEntryCard";
import BackLink from "@/app/components/BackLink";

export default function OrganizationsPage() {
  const orgs = getAllOrganizations();
  const grouped = groupByKey(orgs, (o) => o.category);
  const categories = getAllOrgCategories();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <BackLink label="All sections" fallbackHref="/" />
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Groups &amp; Organizations
      </h1>
      <p className="mt-1 text-sm text-muted">
        Significant institutions — charities, government bodies, financial
        institutions, international bodies. Scaffolding pass — 1 example
        entry.
      </p>

      {categories.map((cat) => {
        const entries = grouped[cat] ?? [];
        if (entries.length === 0) return null;
        return (
          <div key={cat} className="mt-8">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-muted">
              <span aria-hidden="true">{ORG_CATEGORY_ICONS[cat]}</span>
              {ORG_CATEGORY_LABELS[cat]}
            </h2>
            <div className="mt-3 flex flex-col gap-3">
              {entries.map((o) => (
                <SectionEntryCard
                  key={o.id}
                  href={`/organizations/${o.id}`}
                  title={o.name}
                  meta={`Founded ${o.founded}`}
                  blurb={firstSentences(o.summary)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </main>
  );
}
