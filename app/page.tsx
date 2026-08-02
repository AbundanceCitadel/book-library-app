import SectionTile from "./components/SectionTile";

// Design Foundation session: the app is expanding from a single-purpose book
// library into a nine-section personal knowledge library. This page is now
// the global entry point — the book library (formerly the entire home page,
// now at /library) is one of nine tiles here, not the whole app. See
// PROJECT_BRIEF.md, docs/DESIGN_SYSTEM.md v6, and docs/SCHEMA_SECTIONS.md
// for the full rationale behind this restructure.
const SECTIONS: {
  href: string;
  title: string;
  description: string;
  icon: string;
  accent: "orange" | "jade";
}[] = [
  {
    href: "/library",
    title: "Book Library",
    description: "Book summaries, chapter breakdowns, and quotes from Thai's own shelves.",
    icon: "📚",
    accent: "orange",
  },
  {
    href: "/people",
    title: "Famous People / Profiles",
    description: "Biographical profiles — life summary, achievements, and legacy.",
    icon: "🧑‍🎓",
    accent: "jade",
  },
  {
    href: "/richlist",
    title: "Rich List",
    description: "The world's richest people, ranked, with a portfolio breakdown per person.",
    icon: "💵",
    accent: "orange",
  },
  {
    href: "/quotes",
    title: "Quotes",
    description: "Quotes by famous people, categorized by theme.",
    icon: "💬",
    accent: "jade",
  },
  {
    href: "/rulers",
    title: "Kings, Generals & Presidents",
    description: "Rulers, military leaders, and statesmen across history, by country.",
    icon: "👑",
    accent: "orange",
  },
  {
    href: "/organizations",
    title: "Groups & Organizations",
    description: "Significant institutions — charities, governments, and international bodies.",
    icon: "🏢",
    accent: "jade",
  },
  {
    href: "/companies",
    title: "Companies & Brands",
    description: "Iconic companies — founding story, milestones, and culture.",
    icon: "🏭",
    accent: "orange",
  },
  {
    href: "/civilizations",
    title: "Civilizations & Empires",
    description: "Major historical civilizations and empires — the macro context around history's rulers.",
    icon: "🏺",
    accent: "jade",
  },
  {
    href: "/philosophies",
    title: "Philosophies, Religions & Belief Systems",
    description: "Core teachings, founders, and key texts — from Stoicism to Buddhism.",
    icon: "☯️",
    accent: "orange",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Personal Library
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Thai&rsquo;s personal knowledge library — nine sections spanning
        books, people, wealth, history, institutions, and belief systems.
        Tap a section to explore it.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SECTIONS.map((s) => (
          <SectionTile key={s.href} {...s} />
        ))}
      </div>
    </main>
  );
}
