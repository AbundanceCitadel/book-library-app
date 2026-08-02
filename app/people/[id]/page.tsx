import { notFound } from "next/navigation";
import { getAllProfiles, getProfileById, PEOPLE_CATEGORY_LABELS } from "@/lib/people";
import BackLink from "@/app/components/BackLink";
import Badge from "@/app/components/Badge";
import PeopleTabs from "@/app/components/PeopleTabs";

export function generateStaticParams() {
  return getAllProfiles().map((p) => ({ id: p.id }));
}

// Famous People / Profiles detail page. 7 tabs via PeopleTabs — Overview,
// Timeline & Career, Key Achievements, Ideas & Principles, Notable Quotes,
// Legacy & Impact, Critical Take — per the approved nine-section tab
// structure (see docs/SECTIONS_SCHEMA.md).
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
        <PeopleTabs person={profile} related={profile.relatedIds} />
      </div>
    </main>
  );
}
