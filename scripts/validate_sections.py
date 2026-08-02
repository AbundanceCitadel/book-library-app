#!/usr/bin/env python3
"""
Schema-shape sweep for the nine-section personal library's 8 new sections
(People, Quotes, Rich List, Rulers, Civilizations, Organizations, Companies,
Philosophies). Mirrors the book library's own duplicate-id/duplicate-code/
empty-category sweep pattern, generalized across all 8 new content types.

Checks, per section:
  - every content/<section>/*.json file parses as valid JSON
  - the file's `id` field matches its filename (minus .json)
  - no duplicate `id` values within a section
  - every field required by docs/SCHEMA_SECTIONS.md is present and non-empty
    (empty string / empty list counts as missing for required fields)
  - `category`/`region`/`country` values (where applicable) are in the
    section's own allowed set
  - every `relatedIds[].section`/`id` pair resolves to a real target:
      - "library"          -> content/books/<id>.json exists
      - "library-category" -> <id> is a valid category slug from lib/categories.ts
      - any other section  -> content/<section>/<id>.json exists

Run from the repo root: python3 scripts/validate_sections.py
Exits non-zero if any check fails.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "content"

REQUIRED_FIELDS = {
    "people": ["id", "name", "category", "timeframe", "summary", "achievements", "legacy", "dateAdded"],
    "quotes": ["id", "attributedTo", "about", "quotes", "dateAdded"],
    "richlist": ["id", "name", "rank", "netWorthUsdBillions", "category", "country", "bio", "asOfDate", "dateAdded"],
    "rulers": ["id", "name", "country", "title", "era", "summary", "reignAchievements", "legacy", "dateAdded"],
    "organizations": ["id", "name", "category", "founded", "summary", "history", "impact", "dateAdded"],
    "companies": ["id", "name", "category", "founded", "founders", "summary", "foundingStory", "milestones", "culture", "dateAdded"],
    "civilizations": ["id", "name", "region", "era", "summary", "riseAndFall", "legacy", "notableRulers", "dateAdded"],
    "philosophies": ["id", "name", "category", "founder", "origin", "summary", "coreTeachings", "keyTexts", "dateAdded"],
}

CATEGORY_FIELD = {
    "people": "category",
    "richlist": "category",
    "rulers": "country",
    "organizations": "category",
    "companies": "category",
    "civilizations": "region",
    "philosophies": "category",
}

ALLOWED = {
    "people": ["business", "science-technology", "arts-entertainment", "sports", "activism-humanitarian", "exploration-innovation"],
    "richlist": ["technology", "finance-investment", "retail-consumer", "manufacturing-industrial", "media-entertainment", "fashion-luxury", "energy-resources"],
    "rulers": ["united-states", "united-kingdom", "france", "russia-soviet-union", "china", "mongolia", "macedon-ancient-greece", "rome", "egypt", "india", "japan", "vietnam", "germany-prussia", "spain", "ottoman-empire-turkey", "persia-iran", "south-africa", "cuba", "israel-judea", "brazil"],
    "organizations": ["charity", "government-body", "financial-institution", "international-body", "ngo-humanitarian", "religious-body"],
    "companies": ["technology", "retail-consumer", "finance-banking", "automotive", "media-entertainment", "manufacturing-industrial", "food-beverage"],
    "civilizations": ["mediterranean-europe", "middle-east", "east-asia", "south-asia", "central-asia-steppe", "americas", "africa"],
    "philosophies": ["eastern-philosophy", "western-philosophy", "world-religion", "spiritual-tradition"],
}

QUOTE_CATEGORIES = ["business", "marketing", "motivation", "religion-spirituality", "philosophy", "leadership"]

errors = []
warnings = []


def is_empty(v):
    if v is None:
        return True
    if isinstance(v, (str, list, dict)) and len(v) == 0:
        return True
    return False


def load_book_ids():
    d = CONTENT / "books"
    return {p.stem for p in d.glob("*.json")} if d.exists() else set()


def load_category_slugs():
    f = ROOT / "lib" / "categories.ts"
    if not f.exists():
        return set()
    text = f.read_text()
    return set(re.findall(r'"([a-z0-9-]+)":\s*"', text))


def main():
    book_ids = load_book_ids()
    category_slugs = load_category_slugs()

    all_ids_by_section = {}

    for section, required in REQUIRED_FIELDS.items():
        d = CONTENT / section
        if not d.exists():
            warnings.append(f"[{section}] content/{section}/ does not exist")
            continue
        files = sorted(d.glob("*.json"))
        seen_ids = {}
        for f in files:
            try:
                data = json.loads(f.read_text())
            except Exception as e:
                errors.append(f"[{section}] {f.name}: invalid JSON ({e})")
                continue

            eid = data.get("id")
            if eid != f.stem:
                errors.append(f"[{section}] {f.name}: id field '{eid}' != filename '{f.stem}'")

            if eid in seen_ids:
                errors.append(f"[{section}] duplicate id '{eid}' in {f.name} and {seen_ids[eid]}")
            else:
                seen_ids[eid] = f.name

            for field in required:
                if field not in data or is_empty(data.get(field)):
                    errors.append(f"[{section}] {f.name}: missing/empty required field '{field}'")

            cat_field = CATEGORY_FIELD.get(section)
            if cat_field and cat_field in data:
                val = data[cat_field]
                allowed = ALLOWED.get(section, [])
                if allowed and val not in allowed:
                    errors.append(f"[{section}] {f.name}: {cat_field}='{val}' not in allowed set {allowed}")

            if section == "quotes":
                for i, q in enumerate(data.get("quotes", [])):
                    if not q.get("text") or not q.get("category"):
                        errors.append(f"[{section}] {f.name}: quotes[{i}] missing text/category")
                    elif q["category"] not in QUOTE_CATEGORIES:
                        errors.append(f"[{section}] {f.name}: quotes[{i}] category '{q['category']}' not in {QUOTE_CATEGORIES}")

            for rel in data.get("relatedIds", []) or []:
                rsec = rel.get("section")
                rid = rel.get("id")
                if rsec == "library":
                    if rid not in book_ids:
                        errors.append(f"[{section}] {f.name}: relatedIds -> library/{rid} not found in content/books/")
                elif rsec == "library-category":
                    if category_slugs and rid not in category_slugs:
                        errors.append(f"[{section}] {f.name}: relatedIds -> library-category/{rid} not a known category slug")
                elif rsec in REQUIRED_FIELDS:
                    target_dir = CONTENT / rsec
                    if not (target_dir / f"{rid}.json").exists():
                        errors.append(f"[{section}] {f.name}: relatedIds -> {rsec}/{rid} not found")
                else:
                    warnings.append(f"[{section}] {f.name}: relatedIds -> unknown section '{rsec}'")

        all_ids_by_section[section] = seen_ids

    print(f"Checked sections: {', '.join(all_ids_by_section)}")
    total = sum(len(v) for v in all_ids_by_section.values())
    print(f"Total entries: {total}")
    for s, ids in all_ids_by_section.items():
        print(f"  {s}: {len(ids)}")

    if warnings:
        print("\nWarnings:")
        for w in warnings:
            print(" -", w)

    if errors:
        print("\nErrors:")
        for e in errors:
            print(" -", e)
        print(f"\nFAILED: {len(errors)} error(s)")
        sys.exit(1)
    else:
        print("\nOK: no errors")


if __name__ == "__main__":
    main()
