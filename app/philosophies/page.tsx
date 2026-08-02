import {
  getAllPhilosophies,
  getAllPhilosophyCategories,
  PHILOSOPHY_CATEGORY_LABELS,
  PHILOSOPHY_CATEGORY_ICONS,
} from "@/lib/philosophies";
import { groupByKey, firstSentences } from "@/lib/content";
import SectionEntryCard from "@/app/components/SectionEntryCard";
import BackLink from "@/app/components/BackLink";

export default function PhilosophiesPage() {
  const items = getAllPhilosophies();
  const grouped = groupByKey(items, (p) => p.category);
  const categories = getAllPhilosophyCategories();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <BackLink label="All sections" fallbackHref="/" />
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Philosophies, Religions &amp; Belief Systems
      </h1>
      <p className="mt-1 text-sm text-muted">
        Core teachings, founders, and key texts. Direct overlap with the book
        library&rsquo;s Philosophy &amp; Psychology and Thich Nhat Hanh
        categories. Scaffolding pass — 1 example entry.
      </p>

      {categories.map((cat) => {
        const entries = grouped[cat] ?? [];
        if (entries.length === 0) return null;
        return (
          <div key={cat} className="mt-8">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-muted">
              <span aria-hidden="true">{PHILOSOPHY_CATEGORY_ICONS[cat]}</span>
              {PHILOSOPHY_CATEGORY_LABELS[cat]}
            </h2>
            <div className="mt-3 flex flex-col gap-3">
              {entries.map((p) => (
                <SectionEntryCard
                  key={p.id}
                  href={`/philosophies/${p.id}`}
                  title={p.name}
                  meta={p.founder}
                  blurb={firstSentences(p.summary)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </main>
  );
}
