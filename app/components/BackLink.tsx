"use client";

import { useRouter } from "next/navigation";

// v4 (Stage 17, navigation fix): replaces a hardcoded `<Link href="/">` on
// the book-detail and category pages. Thai's exact complaint: "when I click
// backward it goes backward rather than going to the home page" — a link
// that always points at "/" ignores wherever the person actually came from
// (a search result, a category page, another book's related-books list), so
// it can never behave like a real browser back button. This calls
// `router.back()` so it walks the real history stack Next.js already builds
// from normal `<Link>` navigation, falling back to `fallbackHref` only for
// the rare case of a direct link/bookmark with no prior history entry.
export default function BackLink({
  label,
  fallbackHref,
}: {
  label: string;
  fallbackHref: string;
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push(fallbackHref);
        }
      }}
      className="tap-target -ml-1 cursor-pointer text-sm text-muted hover:text-orange-400 hover:underline"
    >
      ← {label}
    </button>
  );
}
