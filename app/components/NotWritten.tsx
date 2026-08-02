// Nine-section expansion (structure only, see docs/SECTIONS_SCHEMA.md §10).
// Same fallback-message pattern BookTabs.tsx already uses for its v2.1 tabs
// (Concepts & Frameworks / Apply This / Critical Take) when a book doesn't
// have that field yet — every new-section tab shows this until the future
// content-gathering pass writes real entries.
export default function NotWritten({ label }: { label: string }) {
  return (
    <p className="text-sm text-muted">
      {label} not written yet for this entry — part of the upcoming
      content-gathering pass against <code>New Section Research/</code>, see{" "}
      <code>ROADMAP.md</code> for status.
    </p>
  );
}
