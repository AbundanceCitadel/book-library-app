import { notFound } from "next/navigation";
import { getAllRulers, getRulerById, RULER_COUNTRY_LABELS } from "@/lib/rulers";
import BackLink from "@/app/components/BackLink";
import RelatedLinks from "@/app/components/RelatedLinks";
import Badge from "@/app/components/Badge";
import DetailTabs from "@/app/components/DetailTabs";

export function generateStaticParams() {
  return getAllRulers().map((r) => ({ id: r.id }));
}

// Design Foundation session — Section 5 detail page. Tab set: Overview /
// Reign & Achievements / Legacy / Quotes — 4 tabs, matching the depth of
// Section 2's Bio/Achievements/Quotes/Legacy set but reordering Quotes to
// last (a ruler's reign/achievements are the primary content people come
// for; quotes are a secondary flourish here, unlike Section 4 where quotes
// ARE the content). See docs/SCHEMA_SECTIONS.md "Ruler."
export default function RulerPage({ params }: { params: { id: string } }) {
  const ruler = getRulerById(params.id);
  if (!ruler) notFound();

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <BackLink label="Back" fallbackHref="/rulers" />
      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {ruler.name}
      </h1>
      <p className="mt-1 text-muted">{ruler.title} · {ruler.era}</p>
      <div className="mt-3">
        <Badge tone="orange">{RULER_COUNTRY_LABELS[ruler.country] ?? ruler.country}</Badge>
      </div>

      <div className="mt-6">
        <DetailTabs
          tabs={[
            {
              key: "overview",
              label: "Overview",
              content: (
                <div className="prose-reading">
                  {ruler.summary.split(/\n\s*\n/).map((p, i) => (
                    <p key={i}>{p.trim()}</p>
                  ))}
                </div>
              ),
            },
            {
              key: "reign",
              label: "Reign & Achievements",
              content: (
                <ul className="space-y-3">
                  {ruler.reignAchievements.map((a, i) => (
                    <li key={i} className="elevate-sm flex gap-3 rounded-lg border-2 border-orange-600/60 bg-surface p-3 text-sm">
                      <span className="mt-0.5 text-orange-500" aria-hidden="true">✓</span>
                      <span className="prose-reading text-sm">{a}</span>
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              key: "legacy",
              label: "Legacy",
              content: (
                <div className="prose-reading">
                  {ruler.legacy.split(/\n\s*\n/).map((p, i) => (
                    <p key={i}>{p.trim()}</p>
                  ))}
                </div>
              ),
            },
            {
              key: "quotes",
              label: "Quotes",
              content: ruler.quotes.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {ruler.quotes.map((q, i) => (
                    <blockquote key={i} className="quote-card elevate-lg rounded-xl border-2 border-orange-600/60 bg-surface p-5 pt-7">
                      <p className="prose-reading italic">{q.text}</p>
                      {q.source && <div className="mt-3 text-xs not-italic text-muted">— {q.source}</div>}
                    </blockquote>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted">No quotes recorded yet.</p>
              ),
            },
          ]}
        />
      </div>

      <RelatedLinks items={ruler.relatedIds} />
    </main>
  );
}
