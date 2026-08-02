import type {
  TimelineEvent,
  NamedIdea,
  SectionQuote,
  CriticalTake,
  RoleRef,
  StatItem,
  TextItem,
} from "@/lib/sectionTypes";
import { splitParagraphs } from "@/lib/paragraphs";
import NotWritten from "./NotWritten";

// Nine-section expansion (structure only, see docs/SECTIONS_SCHEMA.md §0).
// Small, reusable presentational blocks shared by the seven new section-tab
// components (PeopleTabs, RichListTabs, RulersTabs, OrganizationsTabs,
// CompaniesTabs, CivilizationsTabs, PhilosophiesTabs) — same visual language
// as BookTabs.tsx's own bullet/timeline/quote-card treatments, factored out
// once instead of re-implemented seven times.

export function Prose({ text }: { text: string }) {
  return (
    <div className="prose-reading">
      {splitParagraphs(text).map((p, i) => (
        <p key={i} className={i === 0 ? "lede-dropcap" : undefined}>
          {p}
        </p>
      ))}
    </div>
  );
}

export function Timeline({ events }: { events: TimelineEvent[] }) {
  if (events.length === 0) return <NotWritten label="Timeline" />;
  return (
    <ol className="space-y-6 border-l-2 border-border pl-4">
      {events.map((e, i) => (
        <li key={i} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[1.45rem] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--badge-orange-bg)] text-[10px] font-semibold text-[var(--badge-orange-fg)]"
          >
            {i + 1}
          </span>
          <div className="text-xs font-semibold uppercase tracking-wide text-orange-400">
            {e.period}
          </div>
          <p className="prose-reading mt-1 text-sm">{e.event}</p>
        </li>
      ))}
    </ol>
  );
}

export function BulletList({ items }: { items: string[] }) {
  if (items.length === 0) return <NotWritten label="This" />;
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="elevate-sm flex gap-3 rounded-lg border-2 border-orange-600/60 bg-surface p-3 text-sm"
        >
          <span className="mt-0.5 text-orange-500" aria-hidden="true">
            ›
          </span>
          <span className="prose-reading text-sm">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function NamedIdeas({ ideas }: { ideas: NamedIdea[] }) {
  if (ideas.length === 0) return <NotWritten label="This" />;
  return (
    <div className="space-y-4">
      {ideas.map((idea, i) => (
        <div
          key={i}
          className="elevate-sm rounded-xl border-2 border-orange-600/60 bg-surface p-4"
        >
          <h3 className="text-base font-semibold">{idea.name}</h3>
          <p className="prose-reading mt-2 text-sm">{idea.definition}</p>
        </div>
      ))}
    </div>
  );
}

export function QuoteCards({ quotes }: { quotes: SectionQuote[] }) {
  if (quotes.length === 0) return <NotWritten label="Notable Quotes" />;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {quotes.map((q, i) => (
        <blockquote
          key={i}
          className="quote-card elevate-lg rounded-xl border-2 border-orange-600/60 bg-surface p-5 pt-7"
        >
          <p className="prose-reading italic">{q.text}</p>
          <div className="mt-3 text-xs not-italic text-muted">
            — {q.attribution}
          </div>
        </blockquote>
      ))}
    </div>
  );
}

export function CriticalTakeBlock({ take }: { take: CriticalTake | undefined }) {
  if (!take || take.points.length === 0)
    return <NotWritten label="Critical Take" />;
  return (
    <>
      <ul className="space-y-3">
        {take.points.map((point, i) => (
          <li
            key={i}
            className="flex gap-3 rounded-lg border border-[var(--badge-jade-bg)] bg-surface p-3 text-sm"
          >
            <span className="mt-0.5 text-jade-400" aria-hidden="true">
              ◆
            </span>
            <span className="prose-reading text-sm">{point}</span>
          </li>
        ))}
      </ul>
      {take.contextNote && (
        <div className="elevate-sm mt-6 rounded-xl border-l-4 border-jade-400 bg-surface p-4">
          <h3 className="text-sm font-semibold text-jade-400">Since Then</h3>
          <p className="prose-reading mt-2 text-sm">{take.contextNote}</p>
        </div>
      )}
    </>
  );
}

export function RoleList({ roles }: { roles: RoleRef[] }) {
  if (roles.length === 0) return <NotWritten label="This" />;
  return (
    <ul className="space-y-2">
      {roles.map((r, i) => (
        <li
          key={i}
          className="elevate-sm flex items-baseline justify-between gap-3 rounded-lg bg-surface p-3 text-sm"
        >
          <span className="font-medium">{r.name}</span>
          <span className="text-xs text-muted">{r.role}</span>
        </li>
      ))}
    </ul>
  );
}

export function StatGrid({ stats }: { stats: StatItem[] }) {
  if (stats.length === 0) return <NotWritten label="By the Numbers" />;
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {stats.map((s, i) => (
        <div
          key={i}
          className="elevate-sm rounded-xl border-2 border-orange-600/60 bg-surface p-4 text-center"
        >
          <div className="text-lg font-semibold text-orange-400">{s.value}</div>
          <div className="mt-1 text-xs text-muted">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export function TextItems({ items }: { items: TextItem[] }) {
  if (items.length === 0) return <NotWritten label="Key Texts & Teachings" />;
  return (
    <ul className="space-y-3">
      {items.map((t, i) => (
        <li
          key={i}
          className="elevate-sm rounded-lg border-2 border-orange-600/60 bg-surface p-3"
        >
          <div className="text-sm font-semibold">{t.title}</div>
          {t.description && (
            <p className="prose-reading mt-1 text-sm">{t.description}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
