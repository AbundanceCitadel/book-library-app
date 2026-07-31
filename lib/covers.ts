// v3 (Stage 16, premium redesign): generative "cover" treatment for BookCard.
// Every book entry has `coverImage: null` today (see docs/SCHEMA.md — the
// field already exists in the schema, unchanged by this pass). Rather than
// render every book as a plain text row, this derives a deterministic
// gradient from the book's own `id` string so the same book always renders
// the same "cover" across visits (recognizable, not random), turning a grid
// of near-identical cards into something closer to a shelf of distinct
// spines — see docs/DESIGN_SYSTEM.md "Visual richness without real cover
// art." If a real `coverImage` is populated later, components should prefer
// it and fall back to this only when null — no schema or data change needed
// to support that later.

// Small, fast, deterministic string hash (djb2) — no crypto dependency needed,
// this only needs to be stable and reasonably well-distributed, not secure.
function hashString(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return Math.abs(hash);
}

export type CoverGradient = {
  angle: number;
  fromHsl: string;
  toHsl: string;
};

// Hue ranges deliberately biased toward the gold/teal accent family already
// in the palette (see tailwind.config.ts) rather than a full rainbow, so
// generated covers feel like they belong to this app's palette rather than
// looking like random confetti swatches. Each book gets one of a small set
// of hue "families," then a per-book variation within that family.
const HUE_FAMILIES = [
  { base: 38, spread: 18 }, // gold / amber
  { base: 190, spread: 20 }, // teal / cyan
  { base: 265, spread: 22 }, // muted violet (a third, restrained accent for
  // cover variety only — never used for UI chrome/buttons/text, so it doesn't
  // violate the "two accents, used deliberately" rule from DESIGN_SYSTEM.md)
  { base: 10, spread: 16 }, // muted terracotta
];

export function getCoverGradient(id: string): CoverGradient {
  const h = hashString(id);
  const family = HUE_FAMILIES[h % HUE_FAMILIES.length];
  const hueOffset = (h >> 3) % family.spread;
  const hue = family.base + hueOffset;
  const angle = 105 + ((h >> 6) % 60);
  const fromHsl = `hsl(${hue}, 46%, 22%)`;
  const toHsl = `hsl(${(hue + 24) % 360}, 38%, 11%)`;
  return { angle, fromHsl, toHsl };
}

export function coverGradientCss(id: string): string {
  const { angle, fromHsl, toHsl } = getCoverGradient(id);
  return `linear-gradient(${angle}deg, ${fromHsl}, ${toHsl})`;
}
