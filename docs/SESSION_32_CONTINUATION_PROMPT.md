# Continuation Prompt — Nine-Section Population Pass, Round 4

Continue `book-library-app` (`github.com/AbundanceCitadel/book-library-app`).
Read `PROJECT_BRIEF.md`, `ROADMAP.md` (Stage 21), and `DECISIONS.md`
(#278-284 especially, and #258-277 for Rounds 1-2) in full first, per the
standing rule. **Book pipeline stays parked this pass too** — same scope
restriction as Sessions 29-31, still in effect until Thai says otherwise.

## 1. Where things stand

`origin/main` is at (this session's commit, see the chat response for the
hash) as of this writing. Round 3 (this session) did **not** add new
entries — it backfilled the 4 previously-empty tab fields on the 4 sections
still at their original 1-entry Design Foundation depth: World Health
Organization (Organizations), Apple Inc. (Companies), Roman Empire
(Civilizations), Buddhism (Philosophies). All 4 now have every required
field populated with real content instead of `""`/`[]` placeholders.
Section entry counts are **unchanged**: People 10, Quotes 6, Rich List 2,
Rulers 2, Organizations 1, Companies 1, Civilizations 1, Philosophies 1 —
24 entries total across 8 sections.

## 2. Two stale-docs traps to avoid (found the hard way this round)

- **`docs/SCHEMA_SECTIONS.md` and `New Section Research/
  Section_Detail_Tab_Structures.md` describe the *pre-merge* schema
  shape**, not what's actually live in `lib/organizations.ts`/
  `companies.ts`/`civilizations.ts`/`philosophies.ts`/`people.ts` today.
  Concretely: no `oneLiner`/`headquarters` fields, `relatedIds:
  {section,id,label}[]` (denormalized label, not a silently-resolved
  `RelatedLinkRef`), `coreBeliefs`/`notableFollowers`/`notableRulers` as
  plain `string[]`, not `NamedIdea[]`/`RelatedLinkRef[]`, `founders`
  (Companies) and `founder`+`origin` (Philosophies) as their own top-level
  fields. **Always read the actual `lib/<section>.ts` file on `origin/main`
  directly before writing any new entry** — don't trust the docs' field
  shapes without cross-checking.
- **`scripts/validate_sections.py` (added Session 29) is also stale** —
  its `REQUIRED_FIELDS`/`ALLOWED` dicts reference pre-merge field names
  (`summary`/`history`/`impact`/`milestones`/`culture`/`coreTeachings`/
  `riseAndFall`) and currently false-fail *every* entry in the library,
  including already-approved ones like `steve-jobs.json`. Don't treat its
  output as a real regression signal until it's been updated — either fix
  it this round (a genuinely useful, scoped task if there's time) or keep
  relying on `npx tsc --noEmit` + a manual type-shape check against the
  real `lib/*.ts` files instead.

## 3. Round 4 options — Thai's call, not a silent default this time

Same fork Round 3 faced, restated: the reuse-shortcut pool for People/
Quotes (via `authorBio`/`quotes[]` in `content/books/*.json`) may still
have a few uncovered authors left, but is thinning (Round 2 already used
Housel/Cain/Lynch/Cialdini; Kahneman was checked and skipped, empty
`authorBio`). Two directions:

- **Breadth-first: give Rich List, Rulers, Organizations, Companies,
  Civilizations, or Philosophies their 2nd+ entry** — these need real,
  subagent-dispatched research (no reuse shortcut), and every section
  except People/Quotes/Rich List/Rulers is still sitting at exactly 1
  entry. This is probably the better default at this point — Round 3
  deepened the *existing* 4 single-entry sections' single entries rather
  than growing entry *count*, so all 6 non-People/Quotes sections still
  have never had a 2nd entry.
- **Depth-first on People/Quotes** if a fresh scan of `content/books/
  *.json` turns up remaining `authorBio.bio` candidates (1,000+ characters)
  without an existing People/Quotes entry — budget time for that scan
  itself, no pre-vetted candidate list exists anymore (Rounds 1-2 both had
  one handed to them; Round 3 didn't need one since it touched no new
  entries).

Per Thai's standing instruction, don't stop and wait for an answer on this
alone — pick breadth-first fresh research on one of the 6 sections as the
reasonable default (say which one and why), flag the alternative, and keep
going.

## 4. Environment notes (carried forward, re-verify before trusting)

- The connected local folder's `.git` blocks `unlink()` (mount is `fuse`)
  — do all git work in a fresh clone under `/tmp` (confirmed real `ext4`
  in this session), not any `mnt/`-prefixed path. `git clone
  https://github.com/AbundanceCitadel/book-library-app.git /tmp/<name>`
  works with no auth needed (public repo, read-only clone).
- `raw.githubusercontent.com`/`api.github.com` may fail to fetch
  (connection reset) while plain `github.com` works — verify pushes via
  `git ls-remote origin main` + the GitHub commit page, not raw-content
  fetches.
- This session's shell tool capped each command around 45 seconds;
  `npx tsc --noEmit` and a full `npx next build` (285 pages) both
  completed within that window this round — if a future session's build
  times out partway through, `tsc --noEmit` clean + a manual field-shape
  check is an acceptable fallback bar for a content-only round (per
  `DECISIONS.md` #264), but try the full build first since it did finish
  this time.
- Google Fonts (`next/font/google`) can't be fetched from the sandbox —
  stub `Inter`/`Literata` in the `/tmp` clone only when running a build,
  `git checkout -- app/layout.tsx` before staging/committing so the real
  file is never touched.
- Pushing needs a classic GitHub PAT from Thai, supplied inline, never
  persisted: `git push "https://<PAT>@github.com/AbundanceCitadel/book-library-app.git" main`.

## 5. Process reminder

Same mechanics as Rounds 1-3: work in a `/tmp` clone, validate with `tsc
--noEmit` (+ full build if time allows, + `scripts/validate_sections.py`
once it's fixed or with its known-stale output discounted), commit only
the files actually changed (never `git add -A` blindly), get a PAT, push,
verify via `git ls-remote` + the GitHub commit page, log every judgment
call in `DECISIONS.md`, update `ROADMAP.md` Stage 21's status paragraph,
write the next continuation prompt (`docs/SESSION_33_CONTINUATION_PROMPT.md`)
before stopping.
