import fs from "fs";
import path from "path";

// Design Foundation session: generalizes the fs-read pattern lib/books.ts
// established (read every *.json file in a content/ subfolder, parse, return
// an array) so the 8 new sections don't each re-implement the same few lines
// of boilerplate. Every per-section lib file (lib/people.ts, lib/richlist.ts,
// etc.) calls this instead of rolling its own fs.readdirSync/readFileSync
// pair — see docs/SCHEMA_SECTIONS.md "Shared architecture."
//
// Deliberately NOT used by lib/books.ts itself: books.ts predates this
// helper and its read function has its own book-specific sort
// (`a.title.localeCompare(b.title)`) — refactoring it to use this helper
// would be a pure mechanical change with no behavior difference, and touching
// the book pipeline's data-access code is explicitly out of scope for this
// session (see the session brief's "do not touch the book-specific content
// pipeline"). New sections use it from the start instead.
export function loadJsonEntries<T>(contentDirName: string): T[] {
  const dir = path.join(process.cwd(), "content", contentDirName);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      return JSON.parse(raw) as T;
    });
}

// Design Foundation session — generic grouping helper used by every new
// section's listing page to cluster entries under their category/country/
// region heading (mirrors the book library's category-shelf pattern without
// requiring a fixed category list per section, since some sections group by
// a field other than "category" — e.g. Rulers by country, Civilizations by
// region).
export function groupByKey<T>(items: T[], keyFn: (item: T) => string): Record<string, T[]> {
  return items.reduce<Record<string, T[]>>((acc, item) => {
    const k = keyFn(item);
    (acc[k] ??= []).push(item);
    return acc;
  }, {});
}

// Design Foundation session — shared blurb-truncation helper, extracted from
// BookCard.tsx's original local `firstSentences` (v5, Stage 18) so the 8 new
// sections' listing cards use the exact same truncation behavior instead of
// re-implementing it. BookCard.tsx itself is left with its own local copy
// untouched (out of scope to refactor the book pipeline's own component this
// session) — this is the version everything new should import going forward.
export function firstSentences(text: string, maxSentences = 3, maxLen = 280): string {
  const clean = text.replace(/\s+/g, " ").trim();
  const sentences = clean.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [clean];
  let out = sentences.slice(0, maxSentences).join("").trim();
  if (out.length > maxLen) {
    out = `${out.slice(0, maxLen).replace(/\s+\S*$/, "")}…`;
  } else if (sentences.length > maxSentences) {
    out = `${out}…`.replace(/\.…$/, "…");
  }
  return out;
}
