// Honest fallback message for a tab whose backing field is empty for this
// entry — same pattern BookTabs.tsx already uses for its own v2.1 tabs
// (Concepts & Frameworks / Apply This / Critical Take) when a book doesn't
// have that field yet. Used across every new-section tab component so an
// unwritten field renders a clear placeholder instead of an empty panel.
export default function NotWritten({ label }: { label: string }) {
  return (
    <p className="text-sm text-muted">
      {label} not written yet for this entry — part of an upcoming
      content-backfill pass. See <code>ROADMAP.md</code> for status.
    </p>
  );
}
