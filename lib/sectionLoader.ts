import fs from "fs";
import path from "path";

// Nine-section expansion (structure only, see docs/SECTIONS_SCHEMA.md §0).
// Same graceful-empty read pattern as lib/books.ts#getAllBooks() — every new
// section reads `content/<dirName>/*.json` synchronously at build/request
// time, and returns `[]` if the directory doesn't exist yet rather than
// throwing. That's the expected state for all eight sections today: no
// content has been written yet, only the schema/loader/UI plumbing (per this
// session's scope, see docs/SECTIONS_SCHEMA.md §10) — these directories get
// created by the future content-gathering pass against `New Section
// Research/*.md`.
export function createJsonLoader<T extends { id: string }>(dirName: string) {
  const DIR = path.join(process.cwd(), "content", dirName);

  function getAll(): T[] {
    if (!fs.existsSync(DIR)) return [];
    const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".json"));
    return files
      .map((file) => {
        const raw = fs.readFileSync(path.join(DIR, file), "utf-8");
        return JSON.parse(raw) as T;
      })
      .sort((a, b) => a.id.localeCompare(b.id));
  }

  function getById(id: string): T | undefined {
    return getAll().find((entry) => entry.id === id);
  }

  return { getAll, getById };
}
