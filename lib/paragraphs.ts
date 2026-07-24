// v2 (Stage 15): long-form content fields are written with real blank-line
// paragraph breaks. This splits a field into paragraphs for rendering as
// separate <p> tags (see .prose-reading p + p in globals.css), while staying
// backward-compatible with pre-v2 entries that were written as one block —
// a single-paragraph field just renders as one <p>, no different from before.
export function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}
