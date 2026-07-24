export default function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "gold" | "teal";
}) {
  // v2: gold = category emphasis (primary accent), teal = freeform tags
  // (secondary accent) — see docs/DESIGN_SYSTEM.md accent-pair usage rule.
  // Uses the --badge-*-bg/-fg tokens (globals.css) rather than static Tailwind
  // shades so the chip keeps good contrast in both dark and light mode.
  const toneClasses =
    tone === "gold"
      ? "bg-[var(--badge-gold-bg)] text-[var(--badge-gold-fg)]"
      : tone === "teal"
        ? "bg-[var(--badge-teal-bg)] text-[var(--badge-teal-fg)]"
        : "bg-surface2 text-muted";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${toneClasses}`}
    >
      {children}
    </span>
  );
}
