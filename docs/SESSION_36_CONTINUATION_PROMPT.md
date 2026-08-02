# Continuation Prompt — Nine-Section Population Pass, Round 8

Continue `book-library-app` (`github.com/AbundanceCitadel/book-library-app`).
Read `PROJECT_BRIEF.md`, `ROADMAP.md` (Stage 21), and `DECISIONS.md`
(#304-309 especially, and #298-303 for Round 6) in full first, per the
standing rule. **Book pipeline stays parked this pass too** — same scope
restriction as Sessions 29-36, still in effect until Thai says otherwise.

## 1. Where things stand — a checkpoint, not just another round

Round 7 (previous session) gave Organizations its 2nd entry: International
Monetary Fund, diversifying beyond WHO into Central Banks & Financial
Institutions. Section totals: People 10, Quotes 6, Rich List 2, Rulers 2,
Philosophies 2, Civilizations 2, Companies 2, Organizations 2 — **28
entries total across 8 sections. Every launched section now has at least
2 entries; no section is stuck at exactly 1 anymore.**

This is the checkpoint flagged in Round 6's continuation prompt: the
"get every section off 1" default that has driven Rounds 3-7 no longer
applies. **Round 8 needs a genuine direction decision, not an autopilot
pick.** Two real options, both legitimate:

- **Breadth**: give a 3rd entry to one of the 6 sections sitting at 2
  (Rich List, Rulers, Philosophies, Civilizations, Companies,
  Organizations) — same research-quality-driven candidate selection
  process as Rounds 6-7, using the matching `New Section Research/*.md`
  candidate list.
- **Depth**: revisit the 8 entries added in Rounds 4-7 (Zen/Engaged
  Buddhism, Byzantine Empire, Toyota, IMF) plus the original 4 (WHO,
  Apple, Roman Empire, Buddhism) for consistency/completeness — e.g.
  confirm every entry's `criticalTake.contextNote` on time-sensitive
  facts is still accurate as of this session's date, since several
  (WHO's US-withdrawal figures, Toyota's new-CEO transition, IMF's
  2026 US-China tension) were explicitly flagged as fast-moving when
  written.

Per Thai's standing instruction, don't stop and wait for an answer —
pick a direction (breadth or depth) and a specific target within it, say
why, and keep going. If picking breadth, note in the next continuation
prompt which of the 6 tied-at-2 sections would most benefit from a 3rd
entry next, similar to how Round 6 flagged Organizations as the natural
next default.

## 2. Two stale-docs traps, still open (unchanged since Round 3)

- `docs/SCHEMA_SECTIONS.md` and `New Section Research/
  Section_Detail_Tab_Structures.md` describe the pre-merge schema shape.
  Always read the real `lib/<section>.ts` file on `origin/main` directly
  before writing any new entry.
- `scripts/validate_sections.py`'s required-field lists are stale and
  currently false-fail every entry in the library. Still not fixed —
  still a good scoped task for a future session with spare time. Keep
  relying on `npx tsc --noEmit` + a manual type-shape check instead.

## 3. Environment notes (carried forward, confirmed accurate as of Round 7)

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
  npm, git) through the shell tool instead — including writing new JSON
  content files and patching `app/layout.tsx` for the Google Fonts stub
  via a shell heredoc/Python script rather than a file-editing tool.
- `npm install` may not already be present in a fresh `/tmp` clone —
  run it once (`npm install --no-audit --no-fund`, ~8s, well inside the
  tool timeout) before `tsc`/`next build` will work.
- `npx tsc --noEmit` and a full `npx next build` both completed within
  the last several sessions' ~45-second-per-command tool limit (289
  pages as of Round 7). If a future session's build times out partway
  through, `tsc --noEmit` clean + a manual field-shape check is an
  acceptable fallback (per decision #264), but try the full build first.
- Google Fonts (`next/font/google`) can't be fetched from most sandboxes
  — stub `Inter`/`Literata` in the `/tmp` clone only when running a
  build, `git checkout -- app/layout.tsx` before staging so the real file
  is never touched.
- Pushing needs a classic GitHub PAT from Thai, supplied inline, never
  persisted: `git push "https://<PAT>@github.com/AbundanceCitadel/book-library-app.git" main`.
- Verify a push via `git ls-remote origin main` matching local
  `git rev-parse HEAD`. Live-site verification via
  `library.abundancecitadel.app` has been unreliable immediately after a
  push across the last several rounds — routes that build cleanly
  locally have come back blank on the first several fetch attempts,
  most likely Vercel deploy-propagation lag or an intermediate
  fetch-cache layer rather than a real problem. Appending a
  cache-busting query string (`?v=2`, `?v=3`, etc.) to the URL on a
  retry, combined with a real wait (30-40s) between attempts, has
  reliably surfaced the live content in the last two rounds. Don't treat
  an immediate blank fetch as proof something's broken.

## 4. Process reminder

Same mechanics as Rounds 1-7: work in a `/tmp` clone, validate with `tsc
--noEmit` (+ full build), commit only the files actually changed, get a
PAT, push, verify via `git ls-remote` + the live site, log every judgment
call in `DECISIONS.md`, update `ROADMAP.md` Stage 21's status paragraph,
write the next continuation prompt
(`docs/SESSION_37_CONTINUATION_PROMPT.md`) before stopping.
