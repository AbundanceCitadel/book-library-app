import Link from "next/link";
import { getAllBooks, getAllCategories, getLibraryCatalog, isOwned, CATEGORY_LABELS, CATEGORY_ICONS } from "@/lib/books";
import LibraryStats from "../components/LibraryStats";
import BackLink from "../components/BackLink";

// Design Foundation session: this is the pre-existing home page, relocated
// from app/page.tsx to app/library/page.tsx unchanged in behavior — the book
// library is now one of nine sections reachable from the new global home hub
// (app/page.tsx) rather than being the entire app. Every route this page
// links to (/book/[id], /category/[category], /wishlist) is untouched; only
// this page's own location moved. See the session's ROADMAP.md entry and
// docs/DESIGN_SYSTEM.md v6.
//
// v4 (Stage 17): the category list used to be a client-side accordion that
// expanded books in place (CategoryAccordion, now removed) — tapping
// "Business" never actually navigated anywhere, so the browser's back button
// had nothing real to go back to and the URL bar never changed. Thai's
// explicit ask: "act as a browser" — every tap is a real navigation (a
// `next/link` to `/category/[slug]`), so forward/back both behave exactly
// like a normal website (back returns to this exact scroll position on this
// exact page, not to some default state) with zero custom history handling
// needed — this is just what real `<Link>` navigation already does. See
// docs/DESIGN_SYSTEM.md v4 "Navigation: real pages, not in-place expansion."
export default function LibraryHomePage() {
  // v4 (Stage 17): the 16 shelves only ever reflect what Thai owns — filtered
  // here rather than trusting every data file to already exclude wishlist
  // entries, so a future non-owned book added anywhere never quietly dilutes
  // a shelf count. See lib/books.ts isOwned() and docs/SCHEMA.md.
  const books = getAllBooks().filter(isOwned);
  const categories = getAllCategories();
  const catalog = getLibraryCatalog().filter(isOwned);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <BackLink label="All sections" fallbackHref="/" />
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Book Library
      </h1>
      <p className="mt-1 text-sm text-muted">
        Every book on Thai&apos;s shelves, in one place.
      </p>
      <LibraryStats books={books} />

      <h2 className="mt-10 text-xl font-semibold sm:text-2xl">
        Explore the Shelves
      </h2>
      <p className="mt-1 text-sm text-muted">
        Sixteen sections, each one a shelf — tap to open it.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {categories.map((cat) => {
          const count = catalog.length
            ? catalog.filter((c) => c.categories.includes(cat)).length
            : books.filter((b) => b.categories.includes(cat)).length;
          return (
            <Link
              key={cat}
              href={`/category/${cat}`}
              className="book-row motion-premium tap-target flex flex-col gap-1 rounded-xl border-2 border-orange-600/70 bg-surface p-3 sm:p-4"
            >
              <span className="text-xl" aria-hidden="true">
                {CATEGORY_ICONS[cat] ?? "📚"}
              </span>
              <span className="text-sm font-medium leading-snug">
                {CATEGORY_LABELS[cat]}
              </span>
              <span className="whitespace-nowrap text-xs text-muted">
                {count} book{count === 1 ? "" : "s"}
              </span>
            </Link>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-muted">
        Looking for a book you don&apos;t own yet?{" "}
        <Link href="/wishlist" className="text-pine-400 hover:underline">
          Wishlist →
        </Link>
      </p>
    </main>
  );
}
