import { notFound } from "next/navigation";
import {
  getAllPhilosophies,
  getPhilosophyById,
  PHILOSOPHY_CATEGORY_LABELS,
} from "@/lib/philosophies";
import BackLink from "@/app/components/BackLink";
import RelatedLinks from "@/app/components/RelatedLinks";
import Badge from "@/app/components/Badge";
import DetailTabs from "@/app/components/DetailTabs";

export function generateStaticParams() {
  return getAllPhilosophies().map((p) => ({ id: p.id }));
}

// Design Foundation session — Section 9 detail page. Tab set: Overview /
// Core Teachings / Founder & History / Key Texts — matches the session
// brief's own field description (core teachings, founders, key texts) with
// one added Overview tab for a short synthesis, same pattern as every other
// new section.
export default function PhilosophyPage({ params }: { params: { id: string } }) {
  const item = getPhilosophyById(params.id);
  if (!item) notFound();

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <BackLink label="Back" fallbackHref="/philosophies" />
      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {item.name}
      </h1>
      <p className="mt-1 text-muted">{item.origin}</p>
      <div className="mt-3">
        <Badge tone="orange">{PHILOSOPHY_CATEGORY_LABELS[item.category] ?? item.category}</Badge>
      </div>

      <div className="mt-6">
        <DetailTabs
          tabs={[
            {
              key: "overview",
              label: "Overview",
              content: (
                <div className="prose-reading">
                  {item.summary.split(/\n\s*\n/).map((p, i) => (
                    <p key={i}>{p.trim()}</p>
                  ))}
                </div>
              ),
            },
            {
              key: "teachings",
              label: "Core Teachings",
              content: (
                <ul className="space-y-3">
                  {item.coreTeachings.map((t, i) => (
                    <li key={i} className="elevate-sm flex gap-3 rounded-lg border-2 border-orange-600/60 bg-surface p-3 text-sm">
                      <span className="mt-0.5 text-orange-500" aria-hidden="true">✓</span>
                      <span className="prose-reading text-sm">{t}</span>
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              key: "founder",
              label: "Founder & History",
              content: (
                <p className="prose-reading">
                  <strong>{item.founder}</strong> — origin: {item.origin}.
                </p>
              ),
            },
            {
              key: "texts",
              label: "Key Texts",
              content: (
                <ul className="flex flex-wrap gap-1.5">
                  {item.keyTexts.map((t) => (
                    <li
                      key={t}
                      className="inline-flex items-center rounded-full bg-[var(--badge-pine-bg)] px-3 py-1 text-xs font-medium text-[var(--badge-pine-fg)]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              ),
            },
          ]}
        />
      </div>

      <RelatedLinks items={item.relatedIds} />
    </main>
  );
}
