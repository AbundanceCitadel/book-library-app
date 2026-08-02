# Continuation Prompt — Nine-Section Population Pass, Round 2

Continue `book-library-app` (`github.com/AbundanceCitadel/book-library-app`).
Read `PROJECT_BRIEF.md`, `ROADMAP.md` (Stage 21), `DECISIONS.md` (#252-267
especially), and `docs/SCHEMA_SECTIONS.md` in full first, per the standing
rule. **Book pipeline stays parked this pass too** — same scope restriction
as Session 29 (`docs/SESSION_29_SECTIONS_POPULATION_PROMPT.md` §0), still in
effect until Thai says otherwise.

## 1. Where things stand

`origin/main` is at `34e12a1` as of this writing ("Stage 21 population round
1: 5 People + 5 Quotes entries..."). Section totals: People 6, Quotes 6,
Rich List 2, Rulers 2, Organizations 1, Companies 1, Civilizations 1,
Philosophies 1 — 20 entries across 8 sections. Re-verify this
programmatically first (`python3 scripts/validate_sections.py` from repo
root — new this round, also re-run it after any new entries).

## 2. Verify environment before trusting anything

Same lessons as Session 29 (`DECISIONS.md` #252-253, #258, #264, #267):
- The connected local folder may still show `redesign/premium-v3` with a
  large staged diff — this is a known, harmless, cosmetic artifact (already
  checkpointed to `origin/redesign/premium-v3` as `e73bb81`, and
  `origin/main` already has everything that diff would add). Don't touch
  it; do all work in a fresh `/tmp` clone of `origin/main` instead
  (`df -T` on the synced mount reports `fuse`, which blocks git's
  `unlink()` calls — `/tmp` is real `ext4`).
- This sandbox's shell tool caps each command at ~45 seconds with no way to
  background a process across calls — a full `npm run build` (287 pages)
  will not finish in one call. `npx tsc --noEmit` reliably finishes and is
  clean; treat that plus `scripts/validate_sections.py` as the verification
  bar for content-only rounds (no `app`/`lib` changes), and flag rather
  than skip if a future round *does* need a real component/lib change that
  genuinely needs the full build to verify.
- `raw.githubusercontent.com` and `api.github.com` both failed to fetch
  from this sandbox (connection reset) while plain `github.com` worked
  fine — check this early with a quick `curl` rather than assuming full
  GitHub access; use `git ls-remote`/the commit page/`git show` against a
  real clone to verify pushes instead of raw-content fetches.
- Pushing needs a classic GitHub PAT from Thai, supplied inline, never
  persisted — same as every push in this project's history.

## 3. Round 2 options — Thai's call, not a silent default this time

Round 1 went depth-first on People + Quotes using the authorBio-reuse
shortcut (`DECISIONS.md` #260). Two reasonable directions for Round 2:

- **Continue depth-first on People/Quotes**: more authorBio-reuse
  candidates exist in `content/books/*.json` — Morgan Housel, Susan Cain,
  Peter Lynch, Robert Cialdini (People side — already has a Quotes entry
  but no People entry), Daniel Kahneman (bio is currently empty per
  `docs/SESSION_29...` §4's own findings — would need fresh research, not
  reuse), and others. Fast, high-quality, but doesn't touch the 6 sections
  with zero book-pipeline shortcut.
- **Switch to breadth-first fresh research** on Rich List, Rulers,
  Civilizations, Organizations, Companies, or Philosophies — these need
  real research (live net-worth lookups for Rich List, historical sources
  for Rulers/Civilizations, corporate history for Companies), no shortcut
  available. Given Round 1 already proved the People/Quotes shortcut works
  well, this may be the better use of a fresh round.

Flag which direction to Thai if he hasn't said, but per his standing
instruction (still in effect — `docs/SESSION_29...` §7) don't stop and wait
for an answer on this alone; pick the reasonable default (continue
depth-first, since it's faster and lower-risk) and flag the option to
redirect, same pattern as Round 1 did with section choice.

## 4. Process reminder

Round 1 deviated from the originally suggested subagent-per-entry process
and did the authorBio-reshaping directly instead (`DECISIONS.md` #260),
because the source material was already fully verified and sitting in
`content/books/*.json` — a curation/reshaping task, not open research. Any
Round 2 work on the 6 research-required sections should go back to real
subagent-dispatched research per the original process, since there's no
existing verified source material to reshape for those.

Same mechanics as Round 1: work in `/tmp` clone, validate with `tsc
--noEmit` + `scripts/validate_sections.py` (+ full build if source files
change), commit, get a PAT, push, verify via `git ls-remote` + the GitHub
commit page, log every judgment call in `DECISIONS.md`, update `ROADMAP.md`
Stage 21's status line, write the next continuation prompt before stopping.
