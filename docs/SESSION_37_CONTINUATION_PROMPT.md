# Continuation Prompt — Nine-Section Population Pass, Round 9

Continue `book-library-app` (`github.com/AbundanceCitadel/book-library-app`).
Read `PROJECT_BRIEF.md`, `ROADMAP.md` (Stage 21), and `DECISIONS.md`
(#310-316 especially, and #304-309 for Round 7) in full first, per the
standing rule. **Book pipeline stays parked this pass too** — same scope
restriction as Sessions 29-37, still in effect until Thai says otherwise.

## 1. Where things stand — a clean state

Round 8 (previous session) was a pure depth pass: backfilled the last
remaining empty tab fields, on Rich List's 2 entries (Musk, Page) and
Rulers' 2 entries (Washington, Caesar) — the 2 sections Round 3's original
backfill pass never reached. **Every entry in every one of the 8 launched
sections now has every schema-defined tab field populated with real
content.** There are no more "not written yet" placeholders anywhere in
the nine-section content, and no section is stuck at exactly 1 entry.

Section totals: People 10, Quotes 6, Rich List 2, Rulers 2, Philosophies
2, Civilizations 2, Companies 2, Organizations 2 — 28 entries total
across 8 sections.

This means Round 9 is a genuinely clean slate — there's no longer an
obvious "next default" the way Round 6 had Organizations (last section at
1) or Round 8 had the Rich List/Rulers depth gap. **Round 9 needs its own
real direction decision.** Reasonable options, roughly in order of how
directly they continue this pass's own logic:

- **Breadth on the 6 sections at exactly 2 entries** (Rich List, Rulers,
  Philosophies, Civilizations, Companies, Organizations) — give one of
  them a 3rd entry, picked on research-quality grounds the way Rounds 6-7
  did, from the matching `New Section Research/*.md` candidate list.
  Rich List in particular has 98 more Forbes-sourced candidates sitting
  unused (`New Section Research/richlist.md`), and would need a live
  search for current net-worth figures regardless of which candidate is
  picked, continuing this round's demonstrated discipline on that.
- **A staleness re-check on time-sensitive `criticalTake`/`byTheNumbers`
  entries** written across Rounds 3-8 (WHO's US-withdrawal figures,
  Toyota's CEO transition, IMF's US-China tension, Musk's net-worth
  volatility) — genuinely useful once enough real time has passed since
  they were written for anything to plausibly have changed, but probably
  premature only days after Round 8 (same general week) rather than
  weeks/months out. Worth doing eventually, not necessarily Round 9.
- **The `scripts/validate_sections.py` staleness fix**, flagged as an
  open scoped task since Round 3 (#279) and never picked up — updating
  its `REQUIRED_FIELDS`/`ALLOWED` dicts to match the real current
  `lib/*.ts` shapes would let it replace the manual `tsc --noEmit` +
  field-shape-check workaround every round since has relied on. A
  genuinely different kind of task (tooling, not content) but explicitly
  called out as suitable "for a future session with spare time."

Per Thai's standing instruction, don't stop and wait for an answer — pick
a direction, say why, and keep going.

## 2. One stale-docs trap, now partially resolved

- `docs/SCHEMA_SECTIONS.md` and `New Section Research/
  Section_Detail_Tab_Structures.md` describe the pre-merge schema shape.
  Always read the real `lib/<section>.ts` file on `origin/main` directly
  before writing any new entry.
- `scripts/validate_sections.py`'s required-field lists are stale — see
  the 3rd option in Section 1 above. Still not fixed as of Round 8. Keep
  relying on `npx tsc --noEmit` + a manual type-shape check instead if
  not tackling it this round.

## 3. Environment notes (carried forward, confirmed accurate as of Round 8)

- This prompt may run in a different account/sandbox than the session
  that wrote it. Check whether a local folder for this project is already
  connected/mounted; if so, verify it's the right one via `PROJECT_BRIEF.md`.
  Either way, don't trust the connected folder's own git state — do all
  git work in a fresh `/tmp` clone instead (`git clone
  https://github.com/AbundanceCitadel/book-library-app.git /tmp/<name>`,
  no auth needed, public repo) — the connected local folder's `.git`
  typically blocks `unlink()` (fuse mount) across sessions.
- `New Section Research/*.md` files (the actual candidate lists) live in
  the connected folder alongside `book-library-app/`, not inside the git
  repo itself — read them from the connected-folder mount path, not from
  the `/tmp` clone.
- If your sandbox's file-editing tools (Read/Edit/Write) can't reach
  arbitrary `/tmp` paths, do all `/tmp` clone work (file creation/edits,
  npm, git) through the shell tool instead — including writing/editing
  JSON content files and patching `app/layout.tsx` for the Google Fonts
  stub via a shell heredoc/Python script rather than a file-editing tool.
  A Python `json.load`/`json.dump` round-trip is a reliable way to edit
  specific fields on an existing JSON entry without hand-managing string
  escaping — watch for accidental trailing commas turning a string field
  into a 1-element list (caught and fixed once this round; a quick
  `python3 -c "import json; json.load(open(f))"` plus a `type()` check
  on any edited field catches it immediately).
- `npm install` may not already be present in a fresh `/tmp` clone —
  run it once (`npm install --no-audit --no-fund`, ~8s, well inside the
  tool timeout) before `tsc`/`next build` will work.
- `npx tsc --noEmit` and a full `npx next build` both completed within
  the last several sessions' ~45-second-per-command tool limit (289
  pages as of Round 8; a depth-only round like Round 8 won't add new
  static routes, so page count stays flat — that's expected, not a bug).
  If a future session's build times out partway through, `tsc --noEmit`
  clean + a manual field-shape check is an acceptable fallback (per
  decision #264), but try the full build first.
- Google Fonts (`next/font/google`) can't be fetched from most sandboxes
  — stub `Inter`/`Literata` in the `/tmp` clone only when running a
  build, `git checkout -- app/layout.tsx` before staging so the real file
  is never touched.
- Pushing needs a classic GitHub PAT from Thai, supplied inline, never
  persisted: `git push "https://<PAT>@github.com/AbundanceCitadel/book-library-app.git" main`.
- Verify a push via `git ls-remote origin main` matching local
  `git rev-parse HEAD`. Live-site verification via
  `library.abundancecitadel.app` has been inconsistent immediately after
  a push across recent rounds (Vercel deploy-propagation lag or an
  intermediate fetch-cache layer, most likely) — Round 8's fetch actually
  came back live on the very first attempt, so don't assume a wait is
  always necessary, but if a fetch comes back blank, retry once or twice
  with a real wait (30-40s) and a cache-busting query string (`?v=2`)
  before treating it as a real problem.

## 4. Process reminder

Same mechanics as Rounds 1-8: work in a `/tmp` clone, validate with `tsc
--noEmit` (+ full build), commit only the files actually changed, get a
PAT, push, verify via `git ls-remote` + the live site, log every judgment
call in `DECISIONS.md`, update `ROADMAP.md` Stage 21's status paragraph,
write the next continuation prompt
(`docs/SESSION_38_CONTINUATION_PROMPT.md`) before stopping.
