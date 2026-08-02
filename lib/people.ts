import { loadJsonEntries } from "./content";

// Design Foundation session — Section 2, Famous People / Profiles. Field
// shape follows docs/SCHEMA.md's book schema as the rigor template (per the
// session brief): metadata, a brief life summary, structured achievement/
// legacy fields, and a short quotes array. See docs/SCHEMA_SECTIONS.md
// "Profile" for the full field reference and tab-set rationale.
export type ProfileQuote = {
  text: string;
  source?: string;
};

export type Profile = {
  id: string;
  name: string;
  category: string; // one of PEOPLE_CATEGORY_LABELS' keys
  timeframe: string; // e.g. "1955–2011" or "b. 1961"
  summary: string; // brief life summary, 150-300 words
  achievements: string[];
  quotes: ProfileQuote[];
  legacy: string;
  relatedIds?: { section: string; id: string; label: string }[]; // cross-links, e.g. to a Company entry
  dateAdded: string;
  sourceNotes?: string;
};

export function getAllProfiles(): Profile[] {
  return loadJsonEntries<Profile>("people").sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

export function getProfileById(id: string): Profile | undefined {
  return getAllProfiles().find((p) => p.id === id);
}

export {
  PEOPLE_CATEGORY_LABELS,
  PEOPLE_CATEGORY_ICONS,
  getAllPeopleCategories,
} from "./peopleCategories";
