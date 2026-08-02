# Continuation Prompt — Quote Retrofit Pass, Round 8 (Highlights & Quotes, 20-30/book target)

Continue the personal book library app project (`book-library-app`,
`github.com/AbundanceCitadel/book-library-app`). Before doing anything else,
read `PROJECT_BRIEF.md`, `ROADMAP.md`, and `DECISIONS.md` in full — pay
particular attention to `ROADMAP.md` Stage 20 (this retrofit pass, rounds
1-7 done) and `DECISIONS.md` #203-251 (Sessions 23, 25, and 26).

This supersedes `docs/SESSION_27_CONTINUATION_PROMPT.md`'s "round 7"
pointer — round 7 happened in the same sitting as rounds 4-6, and **this
round was pushed to `origin/main` and confirmed live** (unlike rounds 4-6,
which were pushed later in the same session once a PAT arrived — see
`DECISIONS.md` #249). If you're starting fresh, `git fetch origin main`
should already show all of rounds 4-7's work; verify the book counts below
match before assuming anything is missing.

## 0. Verify git/environment state before trusting anything below

Standard warning, now well-established for this project: don't trust a
connected local folder's `git status` at face value — `git fetch origin
main`, compare `git rev-parse HEAD` vs `origin/main`, and check the actual
`content/books/*.json` file count (236) before proceeding. As of this
writing, `origin/main` should be at or past commit `8c4ee4d` (or whatever
Session 26's final push landed as — check the log for "Quote retrofit pass
round 7").

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

As of Session 26's final push: 27 at 0, 79 at 1-4, 47 at 5-9, 12 at 10-14,
9 at 15-19, 62 at >=20. **174 of 236 books remain below target.**

The 2-quote bucket has 14 books left untouched after rounds 6-7 (23 were
in it, 9 done in round 6, 8 in round 7, but 2 of round 7's — `mortgage-
free-like-me` at 14 and others — moved further up the distribution rather
than staying at 2, so re-run the script above rather than trusting this
document's arithmetic). Notable remaining 2-quote books, left deliberately
for a session with more room for contamination-check care: the **Brian
Tracy cluster** (`get-smart`, `master-your-time`, `maximum-achievement` —
3 separate 2-quote Tracy books, plus 6 more Tracy titles already in this
library at higher counts — needs careful per-book source verification to
avoid the cross-book contamination this project has hit with prolific
authors before), `like-a-virgin` (Richard Branson, 2 other Branson titles
in the library), `making-space` (Thich Nhat Hanh — 13 other Thanh Hanh
titles in the library, the single highest contamination-risk author here).

## 2. The highest-value pattern from rounds 4 and 7, worth applying
systematically now rather than book-by-book improvisation

**Check whether every below-target Vietnamese-language book is a VN
edition of an identifiable English-original book before assuming it needs
Vietnamese-language sourcing.** Rounds 4 and 7 both found that VN editions
of well-documented English books (Guy Spier, John Maxwell, Geshe Michael
Roach, William O'Neil, David Niven, David Lieberman) reliably yield 15-25
quotes via the much deeper English sourcing ecosystem (Goodreads, primary-
text scans, publisher extracts), while books that are genuinely Vietnamese-
original (no English source to fall back on) reliably yield much less —
0-20 from a single blog at best, often needing to be honestly declined per
this project's exact-wording bar (see `DECISIONS.md` #240). **Before
starting research on any Vietnamese-titled book, spend one search
confirming whether it's a translation and, if so, of what** — this alone
would likely be the single highest-leverage thing a future round could do
given how many of the remaining ~174 books are Vietnamese-language.

## 3. Two ongoing flags, still out of scope for a narrow quotes pass:

- `phi-ly-tri-predictably-irrational-vn-ed` / `predictably-irrational-phi-
  ly-tri-vn-ed`: likely-duplicate catalog rows, flagged 4+ sessions running
  (`DECISIONS.md` #207, #230, #242, #248). Needs explicit catalog-scope
  sign-off, not another quotes-pass flag.
- 17 already-committed books with exactly 3 quotes each, all with empty
  `quote.category` (full list `DECISIONS.md` #243) — category backfill,
  not new research.
- **New this round:** `midas-touch` landed at only 3 of a possible 52
  Goodreads-tagged quotes due to a tool-side page-rendering failure, not
  source scarcity (`DECISIONS.md` #250) — worth a priority re-attempt if
  you have better fetch/browse tooling available.

## 4. Process, per book (unchanged, see `docs/SESSION_26_CONTINUATION_
PROMPT.md` §3 / `docs/SESSION_27_CONTINUATION_PROMPT.md` §3 for the full
version)

Check for an English original first (§2 above). Verify every existing
quote too, not just add new ones — this project has now caught fake
pre-existing "quotes" (subtitles, chapter titles, publisher blurbs,
paraphrase labels) in at least 5 books across rounds 3 and 6. Exact
wording only, cross-book contamination check mandatory, 20-30 target
never padded, researcher-only-subagent pattern with a single merge script.

## 5. Pacing

174 books remain. Same batching pattern: ~4-5 books per subagent batch,
several batches per round, validate/commit incrementally, write your own
continuation prompt when you stop.

## 6. Thai's standing instruction (given during Session 26, still in effect)

Keep working autonomously, round after round / session after session,
without stopping for approval on routine judgment calls. Doesn't cover
irreversible structural changes with no undo path, or anything requiring a
credential only Thai can supply. Flag and continue past those.

## 7. Verification, commit, push

Same mechanics as every recent session (`docs/SESSION_26_CONTINUATION_
PROMPT.md` §6 has the full checklist). Session 26 successfully pushed
using a PAT Thai supplied mid-session — if a fresh PAT is needed for
further pushes, ask for one the same way, used inline, never persisted.

## 8. One more thing

If 174 turns out to be an overestimate, report the honest final numbers.
