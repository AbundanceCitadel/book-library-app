export default function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "orange" | "jade" | "amber";
}) {
  // v2: orange = category emphasis (primary accent), jade = freeform tags
  // (secondary accent) — see docs/DESIGN_SYSTEM.md accent-pair usage rule.
  // v6: renamed pine -> jade (same role, brighter jewel-tone green), added
  // amber as a sparing tertiary highlight tone (book codes, small callouts).
  // Uses the --badge-*-bg/-fg tokens (globals.css) rather than static Tailwind
  // shades so the chip keeps good contrast in both dark and light mode.
  const toneClasses =
    tone === "orange"
      ? "bg-[var(--badge-orange-bg)] text-[var(--badge-orange-fg)]"
      : tone === "jade"
        ? "bg-[var(--badge-jade-bg)] text-[var(--badge-jade-fg)]"
        : tone === "amber"
          ? "bg-[var(--badge-amber-bg)] text-[var(--badge-amber-fg)]"
          : "bg-surface2 text-muted";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${toneClasses}`}
    >
      {children}
    </span>
  );
}
