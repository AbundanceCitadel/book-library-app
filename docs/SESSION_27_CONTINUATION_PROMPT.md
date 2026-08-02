# Continuation Prompt — Quote Retrofit Pass, Round 7 (Highlights & Quotes, 20-30/book target)

Continue the personal book library app project (`book-library-app`,
`github.com/AbundanceCitadel/book-library-app`). Before doing anything else,
read `PROJECT_BRIEF.md`, `ROADMAP.md`, and `DECISIONS.md` in full — pay
particular attention to `ROADMAP.md` Stage 20 (this retrofit pass, rounds
1-6 done) and `DECISIONS.md` #203-248 (Sessions 23, 25, and 26).

This supersedes `docs/SESSION_26_CONTINUATION_PROMPT.md`'s "round 6"
pointer — round 6 happened in the same sitting Session 26's round-4/5 work
did, so that file's numbers are one round stale. Everything in that file's
§0 (verify git state), §5 (Thai's standing autonomy instruction), and §6
(verification/commit/push mechanics) still applies unchanged — read it too
if you want the fuller version of those sections; this file focuses on
what's new/different.

## 0. Verify git/environment state before trusting anything below

Same warning as every recent session: this project's continuation-prompt
chain and the connected local folder (if one exists) have both drifted
stale before, more than once. `git fetch origin main`, compare
`git rev-parse HEAD` vs `git rev-parse origin/main`, and check the actual
`content/books/*.json` file count (should be 236) before trusting anything
else. **Session 26 committed all of rounds 4-6 locally only, in a scratch
clone outside any `mnt/`-prefixed mount — there was no GitHub PAT available,
so none of it is on `origin/main` yet as of this writing.** If you're
starting fresh, check whether Thai pushed it via another route before
redoing any of this work — the specific book ids touched are listed below
and in `DECISIONS.md` #238-248.

## 1. Current state (re-verify this programmatically first)

```python
import json, glob
books = []
for f in glob.glob("content/books/*.json"):
    b = json.load(open(f, encoding="utf-8"))
    books.append((b["id"], b.get("title"), b.get("author"), len(b.get("quotes", [])), b.get("language")))
books.sort(key=lambda x: x[3])
for b in books:
    if b[3] < 20:
        print(b)
```

As of Session 26's (not-yet-pushed) state: 27 at 0, 86 at 1-4, 46 at 5-9,
11 at 10-14, 5 at 15-19, 61 at >=20. **175 of 236 books remain below
target.** The 0-bucket grew slightly this round (25->27) not from new gaps
but from 2 correct data-quality removals (see §2) — don't treat that as a
regression to chase.

Session 26 (rounds 4-6 combined) touched 30 books total: the full
remaining English 0-quote bucket, a 4-book Vietnamese-sourcing attempt, all
seven exactly-1-quote books, and 9 of the 31 exactly-2-quote books. **The
2-quote bucket has 22 books left untouched** — a natural next target,
worst-first as always (technically all "2," so pick by lowest contamination
risk first, same approach Session 26 used, or just work through the rest
of the list — see `ROADMAP.md`'s round-6 entry for exactly which 9 are
already done).

## 2. Two ongoing flags, still out of scope for a narrow quotes pass:

- `phi-ly-tri-predictably-irrational-vn-ed` (code 196) /
  `predictably-irrational-phi-ly-tri-vn-ed` (code 202): likely-duplicate
  catalog rows, flagged four sessions running now (`DECISIONS.md` #207,
  #230, #242, #248). Needs Thai's explicit sign-off or a session scoped to
  catalog correction, not another quotes-pass flag.
- 17 already-committed books with exactly 3 quotes each, all with an empty
  `quote.category` field (full list in `DECISIONS.md` #243) — a
  category-backfill task, not new research, still unaddressed.

**New this round, worth applying going forward:** re-verify existing
quotes against fresh research even on books that already have some,
not just 0-quote ones — round 6 caught 3 pre-existing books (`get-a-grip-
verify-title`, `payback-time`, `encyclopedia-of-chart-patterns-3rd-ed`)
whose "quotes" were actually a subtitle, a chapter title, a paraphrase
label, and two self-labeled "publisher descriptions" masquerading as
quotes. This suggests other already-quoted books in this library may have
the same issue and haven't been checked yet — if you have spare capacity
beyond the worst-first bucket work, a systematic re-verification pass
across all 236 books' existing quotes (not just the ones below 20) would
likely surface more of these. Not required, just flagged as a real,
possibly wider gap.

## 3. Process, per book (same as established, unchanged from Session 26)

1. Read the existing entry. Evaluate every existing quote, not just add
   new ones — check it's genuinely verbatim book text, not a title,
   subtitle, chapter heading, paraphrase, or "publisher description"/blurb
   mislabeled as a quote (see §2 above for why this matters).
2. Check whether the book is a Vietnamese edition/translation of an
   identifiable English-original book first — changes sourcing strategy
   entirely (use the English original, per the `con-lam-giau-rich-dad-
   poor-dad-vn-ed.json` convention).
3. Web search: Goodreads quote pages (verify the "work" page matches this
   exact title), publisher excerpts, full-text scans (archive.org, PDF
   hosts — verify edition match), author's own site, page-cited review/
   summary blogs. A single uncross-verified aggregator with no page
   citation is not enough on its own.
4. Exact wording only. Group into 4-6 thematic categories.
5. **Cross-book contamination check is mandatory** — check
   `content/books/*.json` for repeated `author` values before starting
   each book. This project has caught this failure mode well over a dozen
   times now across every session on this track.
6. Aim for 20-30, never pad. A shorter honest list (or zero) beats padding.
7. Use the researcher-only subagent pattern: web search access only, no
   file tools, structured text output, applied via a single merge script.

## 4. Pacing

175 books remain. Same batching pattern: ~4-5 books per subagent batch,
several batches per round, validate and commit incrementally, write your
own continuation prompt for whatever's left when you stop.

## 5. Thai's standing instruction (given during Session 26, still in effect)

Keep working autonomously, round after round / session after session,
without stopping to ask for approval on routine judgment calls (pacing,
bucket prioritization, subagent use, etc.). This does not cover
irreversible structural changes with no undo path (e.g., merging/deleting
the `phi-ly-tri`/`predictably-irrational` duplicate pair) or anything
requiring a credential only Thai can supply (a GitHub PAT to push). Flag
and continue past those, don't stop and wait.

## 6. Verification, commit, push

Same mechanics as every recent session — see `docs/SESSION_26_CONTINUATION_
PROMPT.md` §6 for the full checklist (git-state verification, diff-before-
starting, JSON/dup/category sweep, `tsc --noEmit` + SIGBUS fallback,
requesting a PAT, live-deploy verification, doc updates, writing the next
prompt). One addition: **Session 26's rounds 4-6 (30 books, plus
`ROADMAP.md`/`DECISIONS.md` updates) are sitting as local-only commits in a
scratch clone as of this writing** — if you're continuing that same clone,
you already have them; you just need a PAT to push everything in one go.
If you're starting a fresh clone of `origin/main` instead, re-verify none
of this got lost first (see §0).

## 7. One more thing

If 175 turns out to be an overestimate, report the honest final numbers —
same as every prior session here.
