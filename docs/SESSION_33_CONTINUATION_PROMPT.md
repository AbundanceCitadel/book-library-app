# Continuation Prompt — Nine-Section Population Pass, Round 5

Continue `book-library-app` (`github.com/AbundanceCitadel/book-library-app`).
Read `PROJECT_BRIEF.md`, `ROADMAP.md` (Stage 21), and `DECISIONS.md`
(#285-290 especially, and #278-284 for Round 3) in full first, per the
standing rule. **Book pipeline stays parked this pass too** — same scope
restriction as Sessions 29-32, still in effect until Thai says otherwise.

## 1. Where things stand

Round 4 (this session) gave Philosophies its 2nd entry: Zen Buddhism /
Engaged Buddhism, cross-linked to `buddhism.json` and to 3 Thich Nhat Hanh
books already in `content/books/`. Section totals: People 10, Quotes 6,
Rich List 2, Rulers 2, Philosophies 2, Organizations 1, Companies 1,
Civilizations 1 — 25 entries total across 8 sections. **Organizations,
Companies, and Civilizations are now the only 3 sections still stuck at
exactly 1 entry** — the natural next target.

## 2. Two stale-docs traps, still open (from Round 3, unchanged)

- `docs/SCHEMA_SECTIONS.md` and `New Section Research/
  Section_Detail_Tab_Structures.md` describe the pre-merge schema shape,
  not what's actually live. Always read the real `lib/<section>.ts` file
  on `origin/main` directly before writing any new entry.
- `scripts/validate_sections.py`'s `REQUIRED_FIELDS`/`ALLOWED` dicts are
  stale (pre-merge field names) and currently false-fail every entry in
  the library. Neither was fixed in Rounds 3-4 — still out of place inside
  a content-only round, but a good scoped task if a future session has
  spare time. Keep relying on `npx tsc --noEmit` + a manual type-shape
  check against the real `lib/*.ts` files in the meantime.

## 3. Round 5 — suggested default

Give one of the 3 remaining 1-entry sections (Organizations, Companies,
Civilizations) its 2nd entry. Real candidate lists already exist and are
untouched beyond each section's single existing example:

- **Organizations** (`New Section Research/organizations.md`, 39
  candidates across 8 categories) — WHO is the only entry so far
  (international/government bodies). A natural 2nd pick from a
  *different* category would round out the section's range — e.g. the
  Federal Reserve System or IMF (central banks/financial institutions),
  ICRC or Doctors Without Borders (charities/NGOs), or the IOC/FIFA
  (sports governing bodies).
- **Companies** (`New Section Research/companies.md`, ~35 candidates
  across 8 industries) — Apple Inc. is the only entry (Tech). A 2nd pick
  from a different industry would do the same rounding-out — Toyota or
  Ford (Automotive), Coca-Cola or LEGO (Consumer Goods), Walmart or
  Amazon (Retail) are all well-documented with strong founding-story
  hooks already sketched in the candidate list.
- **Civilizations** (`New Section Research/civilizations.md`, 21
  candidates) — Roman Empire is the only entry. A 2nd pick — Ancient
  Egypt, the Mongol Empire, or the Byzantine Empire (which shares real
  continuity with the existing Roman Empire entry and could cross-link to
  it) are strong candidates already flagged with founding-hook notes in
  the file.

No reuse shortcut exists for any of these three (unlike People/Quotes'
`authorBio` reuse) — this needs real research, ideally via a
subagent-per-entry dispatch per the section's original process (Rounds
1-2 deviated from this only because verified book-derived source material
already existed; that shortcut doesn't apply here). Pick one section and
one entry, do real research (web search where facts might be time-
sensitive, general knowledge where they're stable — see decision #282 vs.
#288 for when each was actually needed), and write the full entry against
the section's real `lib/<section>.ts` type, not the stale schema doc.

Per Thai's standing instruction, don't stop and wait for an answer — pick
a reasonable default (say which section and entry, and why), flag the
alternatives, and keep going.

## 4. Environment notes (carried forward, still accurate as of this round)

- Do all git work in a fresh `/tmp` clone (`git clone
  https://github.com/AbundanceCitadel/book-library-app.git /tmp/<name>`,
  no auth needed, public repo) — the connected local folder's `.git`
  blocks `unlink()` (fuse mount).
- `npx tsc --noEmit` and a full `npx next build` both completed within
  this session's ~45-second-per-command tool limit again this round
  (286 pages). If a future session's build times out partway through,
  `tsc --noEmit` clean + a manual field-shape check is an acceptable
  fallback (per decision #264), but try the full build first.
- Google Fonts (`next/font/google`) can't be fetched from the sandbox —
  stub `Inter`/`Literata` in the `/tmp` clone only when running a build,
  `git checkout -- app/layout.tsx` before staging so the real file is
  never touched.
- Pushing needs a classic GitHub PAT from Thai, supplied inline, never
  persisted: `git push "https://<PAT>@github.com/AbundanceCitadel/book-library-app.git" main`.
- Verify a push via `git ls-remote origin main` matching local
  `git rev-parse HEAD`, not just the push command's exit status.

## 5. Process reminder

Same mechanics as Rounds 1-4: work in a `/tmp` clone, validate with `tsc
--noEmit` (+ full build), commit only the files actually changed, get a
PAT, push, verify via `git ls-remote` + the live site, log every judgment
call in `DECISIONS.md`, update `ROADMAP.md` Stage 21's status paragraph,
write the next continuation prompt
(`docs/SESSION_34_CONTINUATION_PROMPT.md`) before stopping.
