import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import SearchOverlay from "./SearchOverlay";
import NavDrawer from "./NavDrawer";
import { getSearchIndex } from "@/lib/search";

// v3 (Stage 16, premium redesign): kept the emoji mark (no schema/category
// icon change), but gave it a small orange-glow badge treatment instead of
// sitting bare next to the wordmark, and added an elevate-sm shadow so the
// sticky header reads as a physically layered strip over the content
// scrolling beneath it, not just a flat bar with a border.
// v4 (Stage 17): added the search button Thai asked for, next to the theme
// toggle. Header stays a server component so it can build the search index
// once here (lib/search.ts reads content/books/*.json + catalog.json via
// fs, server-only) and hand it down as a plain prop to the client
// SearchOverlay — see that file's header comment for why this split exists.
// Design Foundation session: the wordmark now links to the global home hub
// ("/") rather than the book library ("/library", which used to be "/") —
// the book emoji is kept as the app's anchor brand mark rather than swapped
// for a new generic logo, a deliberate judgment call since the app grew out
// of the book library and Thai hasn't asked for a rebrand — see
// docs/DESIGN_SYSTEM.md v6. Added NavDrawer (a "Sections" menu button) so
// all 9 sections are reachable from every page without crowding the header
// on a phone screen — see NavDrawer's own header comment for the drawer-
// vs-tab-bar trade-off.
export default function Header() {
  const searchIndex = getSearchIndex();

  return (
    <header className="elevate-sm sticky top-0 z-10 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="tap-target group flex items-center gap-2 text-base font-semibold tracking-tight"
        >
          <span
            className="motion-premium flex h-8 w-8 items-center justify-center rounded-full text-base group-hover:scale-110"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, var(--badge-orange-bg), transparent 70%)",
            }}
            aria-hidden="true"
          >
            📚
          </span>
          Library
        </Link>
        <div className="flex items-center gap-2">
          <SearchOverlay index={searchIndex} />
          <NavDrawer />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
