import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

// v3 (Stage 16, premium redesign): kept the emoji mark (no schema/category
// icon change), but gave it a small gold-glow badge treatment instead of
// sitting bare next to the wordmark, and added an elevate-sm shadow so the
// sticky header reads as a physically layered strip over the content
// scrolling beneath it, not just a flat bar with a border.
export default function Header() {
  return (
    <header className="elevate-sm sticky top-0 z-10 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="tap-target group flex items-center gap-2 text-base font-semibold tracking-tight"
        >
          <span
            className="motion-premium flex h-8 w-8 items-center justify-center rounded-full text-base group-hover:scale-110"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, var(--badge-gold-bg), transparent 70%)",
            }}
            aria-hidden="true"
          >
            📚
          </span>
          Book Library
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
