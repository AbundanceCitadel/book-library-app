"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { SearchEntry } from "@/lib/search";

// v4 (Stage 17): the search button + modal living in the Header. Only a
// `type`-only import of `SearchEntry` is pulled in here (erased at compile
// time) — the actual index is computed server-side in Header.tsx (which can
// use lib/search.ts's `fs`-backed `getAllBooks()`/`getLibraryCatalog()`
// freely, being a server component) and passed down as a plain prop, the
// same pattern lib/categories.ts already established for client components
// that need book/category data without pulling Node's `fs` into the browser
// bundle. Clicking a result uses `router.push`, a real navigation (adds a
// history entry — consistent with the rest of Stage 17's "act like a
// browser" fix), not a client-side state change.
export default function SearchOverlay({ index }: { index: SearchEntry[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
    document.body.style.overflow = "";
    setQuery("");
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index
      .filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.author.toLowerCase().includes(q)
      )
      .slice(0, 40);
  }, [query, index]);

  function goTo(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <>
      <button
        type="button"
        aria-label="Search books by title or author"
        onClick={() => setOpen(true)}
        className="tap-target rounded-lg border border-border px-3 text-sm hover:bg-surface2"
      >
        <span aria-hidden="true">🔍</span>
        <span className="ml-1.5 hidden sm:inline">Search</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search the library"
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-[8vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="elevate-lg w-full max-w-lg overflow-hidden rounded-xl border-2 border-orange-600 bg-surface"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span aria-hidden="true" className="text-muted">
                🔍
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                inputMode="search"
                placeholder="Search by title or author…"
                className="w-full bg-transparent text-base text-fg outline-none placeholder:text-muted"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close search"
                className="tap-target text-muted hover:text-fg"
              >
                ✕
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {query.trim() === "" ? (
                <p className="px-4 py-6 text-sm text-muted">
                  Start typing a title or author…
                </p>
              ) : results.length === 0 ? (
                <p className="px-4 py-6 text-sm text-muted">
                  No matches in the library.
                </p>
              ) : (
                <div className="divide-y divide-border">
                  {results.map((r) => (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => goTo(r.href)}
                      className="book-row motion-premium flex w-full flex-col items-start px-4 py-3 text-left"
                    >
                      <span className="font-medium leading-snug">
                        {r.title}
                      </span>
                      <span className="mt-0.5 text-sm text-muted">
                        {r.author}
                      </span>
                      <span className="mt-1 text-xs text-muted">
                        {r.categoryLabel}
                        {!r.written && " · not yet summarized"}
                        {!r.owned && " · Wishlist"}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
