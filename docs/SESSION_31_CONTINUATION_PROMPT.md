# Continuation Prompt — Nine-Section Population Pass, Round 3
Continue `book-library-app` (`github.com/AbundanceCitadel/book-library-app`).
Read `PROJECT_BRIEF.md`, `ROADMAP.md` (Stage 21), `DECISIONS.md` (#268-277
especially, and #258-267 for Round 1), and `docs/SCHEMA_SECTIONS.md` in full
first, per the standing rule. **Book pipeline stays parked this pass too**
— same scope restriction as Sessions 29-30
(`docs/SESSION_29_SECTIONS_POPULATION_PROMPT.md` §0), still in effect until
Thai says otherwise.

## 1. Where things stand
`origin/main` is at `f6ed300` as of this writing. Section totals: People 10,
Quotes 6, Rich List 2, Rulers 2, Organizations 1, Companies 1, Civilizations
1, Philosophies 1 — 24 entries across 8 sections. Re-verify this
programmatically first (`python3 scripts/validate_sections.py` from repo
root — also re-run it after any new entries).

## 2. Verify environment before trusting anything
Same lessons as Sessions 29-30 (`DECISIONS.md` #252-253, #258, #264, #267,
#268):
- The connected local folder may still show `redesign/premium-v3` with a
  large staged diff — this is a known, harmless, cosmetic artifact (already
  checkpointed to `origin/redesign/premium-v3` as `e73bb81`, and
  `origin/main` already has everything that diff would add). Don't touch
  it; do all work in a fresh `/tmp` clone of `origin/main` instead
  (`df -T` on the synced mount reports `fuse`, which blocks git's
  `unlink()` calls — `/tmp` is real `ext4`).
- This sandbox's shell tool caps each command at ~45 seconds with no way to
  background a process across calls — a full `npm run build` (287+ pages)
  will not finish in one call. `npx tsc --noEmit` reliably finishes and is
  clean; treat that plus `scripts/validate_sections.py` as the verification
  bar for content-only rounds (no `app`/`lib` changes), and flag rather
  than skip if a future round *does* need a real component/lib change that
  genuinely needs the full build to verify.
- `raw.githubusercontent.com` and `api.github.com` both fail to fetch from
  this sandbox (connection reset) while plain `github.com` works fine —
  check this early with a quick `curl` rather than assuming full GitHub
  access; use `git ls-remote`/the commit page/`git show` against a real
  clone to verify pushes instead of raw-content fetches.
- Pushing needs a classic GitHub PAT from Thai, supplied inline, never
  persisted — same as every push in this project's history.
- Before writing any new entry that copies a quote verbatim from an
  existing `content/books/*.json` file, run a small programmatic exact-
  string check between the new entry's quote text and the source book's
  `quotes[].text` set (see `DECISIONS.md` #272) — Round 2 caught 3 near-miss
  transcription errors this way before committing, not after.

## 3. Round 3 options — Thai's call, not a silent default this time
Rounds 1-2 went depth-first on People (and Quotes in Round 1) using the
authorBio-reuse shortcut. The reuse-shortcut candidate pool is now
thinning out — Round 2 already covered Housel, Cain, Lynch, and Cialdini;
Daniel Kahneman was considered and skipped because `thinking-fast-and-
slow.json`'s `authorBio` is empty (no reuse shortcut exists for him
either). Two directions for Round 3:
- **Keep going depth-first**: re-scan `content/books/*.json` for any
  remaining authors with a substantial `authorBio.bio` (1,000+ characters)
  who don't yet have a People or Quotes entry — there may be a few left,
  but each round finds fewer, and this round would need that fresh scan
  before picking names (no pre-verified candidate list exists anymore,
  unlike Rounds 1-2 which had one handed to them).
- **Switch to breadth-first fresh research** on Rich List, Rulers,
  Civilizations, Organizations, Companies, or Philosophies — these need
  real research (live net-worth lookups for Rich List, historical sources
  for Rulers/Civilizations, corporate history for Companies), no shortcut
  available, and they've had zero net growth across two rounds now while
  People alone has gone 1 → 6 → 10. This is probably the better use of a
  fresh round at this point — the shortcut well for People/Quotes is
  running dry while six sections still sit at scaffolding depth.
Flag which direction to Thai if he hasn't said, but per his standing
instruction (still in effect) don't stop and wait for an answer on this
alone; pick the reasonable default — **breadth-first fresh research on one
of the 6 research-required sections** is the suggested default this round,
given how thin the remaining reuse-shortcut pool looks — and flag the
option to stay depth-first instead, same pattern as Rounds 1-2 did with
section choice.

## 4. Process reminder
Rounds 1-2 both deviated from the originally suggested subagent-per-entry
process and did the authorBio-reshaping directly instead (`DECISIONS.md`
#260, #270), because the source material was already fully verified and
sitting in `content/books/*.json` — a curation/reshaping task, not open
research. Any Round 3 work on the 6 research-required sections should go
back to real subagent-dispatched research per the original process, since
there's no existing verified source material to reshape for those. If
Round 3 does continue depth-first instead, remember there's no longer a
pre-vetted candidate list — budget time for the `content/books/*.json` scan
itself before picking names.

Same mechanics as Rounds 1-2: work in `/tmp` clone, validate with `tsc
--noEmit` + `scripts/validate_sections.py` (+ full build if source files
change), commit, get a PAT, push, verify via `git ls-remote` + the GitHub
commit page, log every judgment call in `DECISIONS.md`, update `ROADMAP.md`
Stage 21's status line, write the next continuation prompt before stopping.
