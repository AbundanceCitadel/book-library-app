import { loadJsonEntries } from "./content";
import type { TextItem, CriticalTake } from "./sectionTypes";

// Philosophies, Religions & Belief Systems. Direct overlap with the book
// library's Philosophy & Psychology and Thich Nhat Hanh categories (see
// lib/categories.ts) — cross-linked via relatedIds. Field shape follows the
// approved nine-section tab structure — 8 tabs: Overview / Core Idea,
// Origin & Founder, Core Beliefs & Principles, Key Texts & Teachings,
// Practice Today, Notable Followers & Thinkers, Legacy & Global Influence,
// Critical Take / Debates. Supersedes the earlier "Design Foundation"
// scaffolding shape (Overview/Core Teachings/Key Texts) — the 1 already-live
// entry (Buddhism) was migrated onto this shape in the same pass that added
// these fields: old `founder` + `origin` were combined into a real
// `originFounder` sentence (reformatted, not new facts), old `coreTeachings`
// carries over as `coreBeliefs`, old `keyTexts` strings (already written as
// "Title — description") were mechanically split into {title, description}
// pairs. `practiceToday`, `notableFollowers`, `legacyGlobalInfluence`, and
// `criticalTake` are genuinely new and start empty/unwritten pending a
// backfill pass.
export type Philosophy = {
  id: string;
  name: string;
  category: string; // one of PHILOSOPHY_CATEGORY_LABELS' keys
  founder: string;
  origin: string;

  overview: string;
  originFounder: string;
  coreBeliefs: string[];
  keyTexts: TextItem[];
  practiceToday: string;
  notableFollowers: string[]; // plain names; cross-linked to lib/people.ts by name match where one exists
  legacyGlobalInfluence: string;
  criticalTake: CriticalTake;

  relatedIds?: { section: string; id: string; label: string }[];
  dateAdded: string;
  sourceNotes?: string;
};

export function getAllPhilosophies(): Philosophy[] {
  return loadJsonEntries<Philosophy>("philosophies").sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

export function getPhilosophyById(id: string): Philosophy | undefined {
  return getAllPhilosophies().find((p) => p.id === id);
}

export {
  PHILOSOPHY_CATEGORY_LABELS,
  PHILOSOPHY_CATEGORY_ICONS,
  getAllPhilosophyCategories,
} from "./philosophiesCategories";
