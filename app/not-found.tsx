import Link from "next/link";

// v2 polish pass (Stage 12): the app previously fell back to Next's default,
// unstyled 404 (plain black-on-white "This page could not be found") — jarring
// against the rest of the dark-first app shell. Styled to match the /offline
// page's pattern (icon, heading, muted body copy, one way back).
export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      <div
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, var(--badge-orange-bg), transparent 70%)",
        }}
        aria-hidden="true"
      >
        🔖
      </div>
      <h1 className="mt-4 text-xl font-semibold">Page not found</h1>
      <p className="prose-reading mt-3 text-sm text-muted">
        This book or section isn&rsquo;t on the shelf — the link may be out of
        date, or the page may have moved.
      </p>
      <Link
        href="/"
        className="tap-target mt-6 inline-flex text-sm text-jade-400 hover:underline"
      >
        ← Back to the library
      </Link>
    </main>
  );
}
