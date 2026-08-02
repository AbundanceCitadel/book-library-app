# Continuation Prompt — Nine-Section Population Pass, Round 7

Continue `book-library-app` (`github.com/AbundanceCitadel/book-library-app`).
Read `PROJECT_BRIEF.md`, `ROADMAP.md` (Stage 21), and `DECISIONS.md`
(#298-303 especially, and #291-297 for Round 5) in full first, per the
standing rule. **Book pipeline stays parked this pass too** — same scope
restriction as Sessions 29-34, still in effect until Thai says otherwise.

## 1. Where things stand

Round 6 (previous session) gave Companies its 2nd entry: Toyota Motor
Corporation (Automotive category, diversifying beyond the Apple/Tech-only
example). No forced cross-link — no existing People or Books entry is
substantively about Toyota, so `relatedIds` was left genuinely empty.
Section totals: People 10, Quotes 6, Rich List 2, Rulers 2, Philosophies 2,
Civilizations 2, Companies 2, Organizations 1 — 27 entries total across 8
sections. **Organizations is now the only section still stuck at exactly
1 entry** (World Health Organization only, from the original Design
Foundation scaffolding pass).

## 2. Two stale-docs traps, still open (unchanged since Round 3)

- `docs/SCHEMA_SECTIONS.md` and `New Section Research/
  Section_Detail_Tab_Structures.md` describe the pre-merge schema shape.
  Always read the real `lib/<section>.ts` file on `origin/main` directly
  before writing any new entry.
- `scripts/validate_sections.py`'s required-field lists are stale and
  currently false-fail every entry in the library. Still not fixed —
  still a good scoped task for a future session with spare time. Keep
  relying on `npx tsc --noEmit` + a manual type-shape check instead.

## 3. Round 7 — suggested default

Give Organizations its 2nd entry — it's now the sole section still at 1
entry, so this round has no "which section" decision to make, only
"which candidate." `New Section Research/organizations.md` has 39
candidates across 8 categories, all with founding years/dates verified
via web search on 2026-08-02. WHO is the only entry so far
(International/Government Bodies category). Real, well-documented
candidates flagged but not picked in Round 6 (`DECISIONS.md` #299)
include the IMF or Federal Reserve (Central Banks & Financial
Institutions) and the ICRC (Major Charities & NGOs) — all three have
rich founding-hook material already sketched in the candidate file and
would pair naturally with WHO's International/Government Bodies category
or diversify into a new one. The IOC (Sports Governing Bodies) is another
well-documented option if a fully different category is preferred.

Once Organizations reaches 2 entries, **all 8 launched sections will be
tied at 2 entries each except People (10) and Quotes (6)** — worth
flagging to Thai as a natural checkpoint: the next default after that
shifts from "get every section off 1" to either continuing breadth
(3rd entries across sections) or a depth pass revisiting thin fields on
newer entries, similar to Round 3's WHO/Apple/Roman Empire/Buddhism
backfill. Don't assume which — flag both options in the next
continuation prompt rather than picking one automatically, since (unlike
this round) there's no longer a single obviously-thinnest section to
default to.

Per Thai's standing instruction, don't stop and wait for an answer — pick
one Organizations candidate (say which, and why), and keep going.

## 4. Environment notes (carried forward, confirmed accurate as of Round 6)

- This prompt may run in a different account/sandbox than the session
  that wrote it. Check whether a local folder for this project is already
  connected/mounted; if so, verify it's the right one via `PROJECT_BRIEF.md`.
  Either way, don't trust the connected folder's own git state — do all
  git work in a fresh `/tmp` clone instead (`git clone
  https://github.com/AbundanceCitadel/book-library-app.git /tmp/<name>`,
  no auth needed, public repo) — the connected local folder's `.git`
  typically blocks `unlink()` (fuse mount) across sessions.
- **`New Section Research/*.md` files (the actual candidate lists,
  including `organizations.md`) live in the connected folder alongside
  `book-library-app/`, not inside the git repo itself** — read them from
  the connected-folder mount path, not from the `/tmp` clone.
- Note on this session's sandbox: file-editing tools (Read/Edit/Write)
  could only reach the connected folder and the tool-specific outputs
  directory, not arbitrary `/tmp` paths — all `/tmp` clone work (file
  creation/edits, npm, git) had to go through the shell tool instead,
  including writing new JSON content files and patching `app/layout.tsx`
  for the Google Fonts stub via a Python heredoc rather than the Edit
  tool. If a future session's sandbox has the same restriction, plan
  tool usage accordingly from the start.
- `npm install` was NOT already present in the fresh `/tmp` clone this
  round and had to be run once (`npm install --no-audit --no-fund`,
  ~8s, well inside the tool timeout) before `tsc`/`next build` would
  work — don't assume `node_modules` carries over from a prior session's
  clone.
- `npx tsc --noEmit` and a full `npx next build` both completed within
  the last session's ~45-second-per-command tool limit (288 pages). If a
  future session's build times out partway through, `tsc --noEmit` clean
  + a manual field-shape check is an acceptable fallback (per decision
  #264), but try the full build first.
- Google Fonts (`next/font/google`) can't be fetched from most sandboxes
  — stub `Inter`/`Literata` in the `/tmp` clone only when running a
  build, `git checkout -- app/layout.tsx` before staging so the real file
  is never touched.
- Pushing needs a classic GitHub PAT from Thai, supplied inline, never
  persisted: `git push "https://<PAT>@github.com/AbundanceCitadel/book-library-app.git" main`.
- Verify a push via `git ls-remote origin main` matching local
  `git rev-parse HEAD`. Live-site verification via
  `library.abundancecitadel.app` has been unreliable immediately after a
  push in recent sessions — routes that build cleanly locally have come
  back blank on the first (and sometimes second/third) fetch attempt in
  each of the last several rounds, most likely Vercel deploy-propagation
  lag or an intermediate fetch-cache layer rather than a real problem.
  This round, appending a cache-busting query string (`?v=2`) to the URL
  on a retry attempt was what finally surfaced the live content after
  plain retries alone hadn't — try that trick if repeated plain retries
  still come back blank. Don't treat an immediate blank fetch as proof
  something's broken.

## 5. Process reminder

Same mechanics as Rounds 1-6: work in a `/tmp` clone, validate with `tsc
--noEmit` (+ full build), commit only the files actually changed, get a
PAT, push, verify via `git ls-remote` + the live site, log every judgment
call in `DECISIONS.md`, update `ROADMAP.md` Stage 21's status paragraph,
write the next continuation prompt
(`docs/SESSION_36_CONTINUATION_PROMPT.md`) before stopping.
