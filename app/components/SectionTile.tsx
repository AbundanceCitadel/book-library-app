import Link from "next/link";

// Design Foundation session — homepage hub tile. Per docs/DESIGN_SYSTEM.md
// v6: no per-section background color (confirmed with Thai — 9 full color
// schemes would dilute the orange/pine/cream identity). Wayfinding instead
// comes from two small, consistent marks: an icon badge that alternates
// orange/pine per tile (decorative variety, not a meaningful per-section
// color code) and a thin espresso "grounding" accent stripe along the top
// edge (the one place this session's new warm-neutral scale is used as a
// background fill, and only ever a few pixels tall). Every interior page
// still uses the same shared orange + pine + cream + espresso system.
export default function SectionTile({
  href,
  title,
  description,
  icon,
  accent,
}: {
  href: string;
  title: string;
  description: string;
  icon: string;
  accent: "orange" | "pine";
}) {
  return (
    <Link
      href={href}
      className="motion-premium tap-target group flex flex-col overflow-hidden rounded-xl border-2 border-orange-600/70 bg-surface"
    >
      <span className="h-1.5 w-full bg-espresso-700" aria-hidden="true" />
      <span className="flex flex-1 flex-col gap-1.5 p-4">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full text-xl"
          style={{
            background:
              accent === "orange"
                ? "radial-gradient(circle at 30% 30%, var(--badge-orange-bg), transparent 70%)"
                : "radial-gradient(circle at 30% 30%, var(--badge-pine-bg), transparent 70%)",
          }}
          aria-hidden="true"
        >
          {icon}
        </span>
        <span className="mt-1 text-base font-semibold leading-snug">{title}</span>
        <span className="text-sm text-muted">{description}</span>
      </span>
    </Link>
  );
}
