export default function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "orange" | "pine";
}) {
  // v2: orange = category emphasis (primary accent), pine = freeform tags
  // (secondary accent) — see docs/DESIGN_SYSTEM.md accent-pair usage rule.
  // Uses the --badge-*-bg/-fg tokens (globals.css) rather than static Tailwind
  // shades so the chip keeps good contrast in both dark and light mode.
  const toneClasses =
    tone === "orange"
      ? "bg-[var(--badge-orange-bg)] text-[var(--badge-orange-fg)]"
      : tone === "pine"
        ? "bg-[var(--badge-pine-bg)] text-[var(--badge-pine-fg)]"
        : "bg-surface2 text-muted";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${toneClasses}`}
    >
      {children}
    </span>
  );
}
