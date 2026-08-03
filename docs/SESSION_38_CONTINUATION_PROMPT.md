# Continuation Prompt — Nine-Section Population Pass, Round 10

Continue `book-library-app` (`github.com/AbundanceCitadel/book-library-app`).
Read `PROJECT_BRIEF.md`, `ROADMAP.md` (Stage 21), and `DECISIONS.md`
(#317-324 especially, and #310-316 for Round 8) in full first, per the
standing rule. **Book pipeline stays parked this pass too** — same scope
restriction as Sessions 29-38, still in effect until Thai says otherwise.

## 1. Where things stand

Round 9 (previous session) picked breadth on Rich List — the section had
98 unused Forbes-sourced candidates sitting ready in `New Section
Research/richlist.md`, removing the "fresh research from scratch" burden
the other five 2-entry sections (Rulers, Philosophies, Civilizations,
Companies, Organizations) still carry. Added **Warren Buffett** (Forbes
rank #9, $149B, Finance & Investments) as Rich List's 3rd entry — chosen
over other strong candidates (Gates, Bezos, Zuckerberg, etc.) for three
reasons: it diversifies Rich List beyond Musk/Page's shared Technology
category; it had an unusually rich, genuinely current 2026 news cycle
(Greg Abel's CEO succession effective January 1, 2026, and the July 2026
Gates Foundation donation break) giving every tab real, checkable
material; and it produced this section's first real, non-forced
`relatedIds` cross-link — to this library's own verified Warren Buffett
biography, `content/books/the-snowball.json`. All 7 tabs fully populated
on write (no placeholder-then-backfill needed this time, unlike the
original Design Foundation entries). See `DECISIONS.md` #317-324.

**Section totals: People 10, Quotes 6, Rich List 3, Rulers 2,
Philosophies 2, Civilizations 2, Companies 2, Organizations 2 — 29
entries total across 8 sections.**

Rich List is now the only section (besides People/Quotes) above 2
entries. 97 Rich List candidates remain unused in `New Section
Research/richlist.md` — Round 9 barely dented that pool, so Rich List
breadth remains a fully valid option for Round 10 too, not just a
one-round fix.

## 2. Round 10 direction — genuinely open, same as Round 9 was

No section is stuck at exactly 1 entry, and no entry has an empty
placeholder field, so there's no forced "next default" again. Reasonable
options, not in a strict priority order this time (Round 9's own ranking
logic — "breadth on the thinnest, easiest-research section" — has now
been exercised once and shouldn't be treated as a standing rule to repeat
mechanically every round):

- **More Rich List breadth** (4th entry from the same 97 remaining
  `richlist.md` candidates) — the path of least resistance again, and
  reasonable, but worth weighing against the alternative below so Rich
  List doesn't run away from the other five 2-entry sections purely
  because its candidate list happens to be pre-researched. If picked,
  look for one with a genuine cross-link opportunity the way Buffett had
  (check `content/books/*.json` and `content/people/*.json` for
  substantive overlap before assuming none exists) and/or a category this
  section doesn't have yet (`technology`, `finance-investment` are both
  now used; `retail-consumer`, `manufacturing-industrial`,
  `media-entertainment`, `fashion-luxury`, `energy-resources` are not —
  see `lib/richlistCategories.ts`). Bernard Arnault (fashion-luxury),
  Amancio Ortega (retail-consumer), or Michael Bloomberg
  (media-entertainment) would each open a new category.
- **Breadth on one of the 5 sections still at exactly 2 entries**
  (Rulers, Philosophies, Civilizations, Companies, Organizations) —
  continues Rounds 4-7's original pattern more directly than another
  Rich List pick does, and starts closing the gap between Rich List and
  the rest of the 2-entry cohort. None of these have a pre-researched
  candidate list sitting in `New Section Research/` the way Rich List
  does (verify this assumption first — a candidate list may exist that
  simply wasn't used yet), so this would need fresh live research
  regardless of which section/entry is picked.
- **A staleness re-check on time-sensitive `criticalTake`/`byTheNumbers`
  entries** written across Rounds 3-9 (WHO's US-withdrawal figures,
  Toyota's CEO transition, IMF's US-China tension, Musk's net-worth
  volatility, and now Buffett's Abel-succession/Gates-Foundation
  material) — genuinely useful, and more days have now passed since the
  earliest of these were written, but still a judgment call on whether
  enough time has passed for anything to have plausibly changed. Worth
  doing eventually; Round 10 can reasonably still defer it if a content
  direction seems more valuable.
- **The `scripts/validate_sections.py` staleness fix** — flagged as an
  open scoped task since Round 3 (#279), still not picked up as of Round
  9. A genuinely different kind of task (tooling, not content), suitable
  "for a future session with spare time." Round 10 is as valid a time as
  any if content directions feel exhausted.

Per Thai's standing instruction, don't stop and wait for an answer — pick
a direction, say why, and keep going.

## 3. One stale-docs trap, still open

- `docs/SCHEMA_SECTIONS.md` and `New Section Research/
  Section_Detail_Tab_Structures.md` describe the pre-merge schema shape.
  Always read the real `lib/<section>.ts` file on `origin/main` directly
  before writing any new entry.
- `scripts/validate_sections.py`'s required-field lists are stale — see
  the last option in Section 2 above. Still not fixed as of Round 9. Keep
  relying on `npx tsc --noEmit` + a manual type-shape check instead if
  not tackling it this round.

## 4. Environment notes (carried forward, confirmed accurate as of Round 9)

- This prompt may run in a different account/sandbox than the session
  that wrote it. Check whether a local folder for this project is already
  connected/mounted; if so, verify it's the right one via `PROJECT_BRIEF.md`.
  Either way, don't trust the connected folder's own git state — do all
  git work in a fresh `/tmp` clone instead (`git clone
  https://github.com/AbundanceCitadel/book-library-app.git /tmp/<name>`,
  no auth needed, public repo) — the connected local folder's `.git`
  typically blocks `unlink()` (fuse mount) across sessions. Confirmed
  again this round: the connected folder's own `DECISIONS.md`/`ROADMAP.md`
  were stale copies (413 lines vs. the real `origin/main`'s much longer
  files) — the `/tmp` clone is the only reliable source of current state.
- `New Section Research/*.md` files (the actual candidate lists) live in
  the connected folder alongside `book-library-app/`, not inside the git
  repo itself — read them from the connected-folder mount path, not from
  the `/tmp` clone.
- If your sandbox's file-editing tools (Read/Edit/Write) can't reach
  arbitrary `/tmp` paths, do all `/tmp` clone work (file creation/edits,
  npm, git) through the shell tool instead — including writing/editing
  JSON content files and patching `app/layout.tsx` for the Google Fonts
  stub via a shell heredoc/Python script rather than a file-editing tool.
  A Python `json.load`/`json.dump` round-trip (via a heredoc `python3`
  script, `indent=2, ensure_ascii=False`, trailing newline) is a reliable
  way to write a brand-new JSON content file or edit specific fields on an
  existing one without hand-managing string escaping — a quick
  `python3 -c "import json; json.load(open(f))"` immediately after
  confirms valid JSON, and checking `type()` on each field against the
  `lib/<section>.ts` type definition catches shape mistakes (e.g. a
  trailing comma turning a string field into a 1-element list) before
  `tsc` would.
- `npm install` may not already be present in a fresh `/tmp` clone —
  run it once (`npm install --no-audit --no-fund`, ~7-8s, well inside the
  tool timeout) before `tsc`/`next build` will work.
- `npx tsc --noEmit` and a full `npx next build` both completed within
  the last several sessions' ~45-second-per-command tool limit (290
  pages as of Round 9 — this round added exactly 1 new static route, so
  the count moved by exactly +1 from Round 8's 289; a depth-only or
  0-new-entry round won't move the count, that's expected, not a bug).
  If a `next build` run fails because a bash tool call re-runs a stale
  build after `app/layout.tsx` was already reverted, that's expected too
  (Google Fonts can't fetch with the real import restored) — just re-stub
  before building again. If a future session's build times out partway
  through, `tsc --noEmit` clean + a manual field-shape check is an
  acceptable fallback (per decision #264), but try the full build first.
  Tip from this round: `.next/prerender-manifest.json`'s route count can
  undercount vs. the build log's own `Generating static pages (N/N)`
  line — trust the build log's own reported total, not the manifest.
- Google Fonts (`next/font/google`) can't be fetched from most sandboxes
  — stub `Inter`/`Literata` in the `/tmp` clone only when running a
  build (as plain functions returning `{variable, className}`, typed
  `(opts: any) =>` to satisfy `tsc`'s implicit-any check under
  `next build`'s stricter lint pass), `git checkout -- app/layout.tsx`
  before staging so the real file is never touched.
- Pushing needs a classic GitHub PAT from Thai, supplied inline, never
  persisted: `git push "https://<PAT>@github.com/AbundanceCitadel/book-library-app.git" main`.
  If no PAT is available in a given sitting, commit locally in the `/tmp`
  clone and clearly flag "committed, push pending" in the session
  wrap-up rather than losing the work or fabricating a push.
- Git commits in the `/tmp` clone need `user.email`/`user.name` set
  (`git config user.email "abundancefinancials99@gmail.com"` /
  `git config user.name "Brave"`) — a fresh clone has no identity
  configured and will fail on first commit without it.
- Verify a push via `git ls-remote origin main` matching local
  `git rev-parse HEAD`. Live-site verification via
  `library.abundancecitadel.app` has been inconsistent immediately after
  a push across recent rounds (Vercel deploy-propagation lag or an
  intermediate fetch-cache layer, most likely) — if a fetch comes back
  blank, retry once or twice with a real wait (30-40s) and a
  cache-busting query string (`?v=2`) before treating it as a real
  problem.

## 5. Process reminder

Same mechanics as Rounds 1-9: work in a `/tmp` clone, validate with `tsc
--noEmit` (+ full build), commit only the files actually changed, get a
PAT, push, verify via `git ls-remote` + the live site, log every judgment
call in `DECISIONS.md`, update `ROADMAP.md` Stage 21's status paragraph,
write the next continuation prompt
(`docs/SESSION_39_CONTINUATION_PROMPT.md`) before stopping.
