import { notFound } from "next/navigation";
import {
  getAllProfiles,
  getProfileById,
  PEOPLE_CATEGORY_LABELS,
} from "@/lib/people";
import BackLink from "@/app/components/BackLink";
import RelatedLinks from "@/app/components/RelatedLinks";
import Badge from "@/app/components/Badge";
import DetailTabs from "@/app/components/DetailTabs";

export function generateStaticParams() {
  return getAllProfiles().map((p) => ({ id: p.id }));
}

// Design Foundation session — Section 2 detail page. Tab set: Bio /
// Achievements / Quotes / Legacy — the exact set proposed as the worked
// example in the session brief itself. See docs/SCHEMA_SECTIONS.md
// "Profile" for the reasoning.
export default function ProfilePage({ params }: { params: { id: string } }) {
  const profile = getProfileById(params.id);
  if (!profile) notFound();

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <BackLink label="Back" fallbackHref="/people" />
      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {profile.name}
      </h1>
      <p className="mt-1 text-muted">{profile.timeframe}</p>
      <div className="mt-3">
        <Badge tone="orange">{PEOPLE_CATEGORY_LABELS[profile.category] ?? profile.category}</Badge>
      </div>

      <div className="mt-6">
        <DetailTabs
          tabs={[
            {
              key: "bio",
              label: "Bio",
              content: (
                <div className="prose-reading">
                  {profile.summary.split(/\n\s*\n/).map((p, i) => (
                    <p key={i}>{p.trim()}</p>
                  ))}
                </div>
              ),
            },
            {
              key: "achievements",
              label: "Achievements",
              content: (
                <ul className="space-y-3">
                  {profile.achievements.map((a, i) => (
                    <li
                      key={i}
                      className="elevate-sm flex gap-3 rounded-lg border-2 border-orange-600/60 bg-surface p-3 text-sm"
                    >
                      <span className="mt-0.5 text-orange-500" aria-hidden="true">✓</span>
                      <span className="prose-reading text-sm">{a}</span>
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              key: "quotes",
              label: "Quotes",
              content: profile.quotes.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {profile.quotes.map((q, i) => (
                    <blockquote
                      key={i}
                      className="quote-card elevate-lg rounded-xl border-2 border-orange-600/60 bg-surface p-5 pt-7"
                    >
                      <p className="prose-reading italic">{q.text}</p>
                      {q.source && (
                        <div className="mt-3 text-xs not-italic text-muted">— {q.source}</div>
                      )}
                    </blockquote>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted">No quotes recorded yet.</p>
              ),
            },
            {
              key: "legacy",
              label: "Legacy",
              content: (
                <div className="prose-reading">
                  {profile.legacy.split(/\n\s*\n/).map((p, i) => (
                    <p key={i}>{p.trim()}</p>
                  ))}
                </div>
              ),
            },
          ]}
        />
      </div>

      <RelatedLinks items={profile.relatedIds} />
    </main>
  );
}
