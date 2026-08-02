# Continuation Prompt — Quote Retrofit Pass, Round 9 (Highlights & Quotes, 20-30/book target)

Continue the personal book library app project (`book-library-app`,
`github.com/AbundanceCitadel/book-library-app`). Before doing anything else,
read `PROJECT_BRIEF.md`, `ROADMAP.md`, and `DECISIONS.md` in full — pay
particular attention to `ROADMAP.md` Stage 20 (this retrofit pass, rounds
1-8 done) and `DECISIONS.md` #203-257 (Sessions 23, 25, 26, and 28).

This supersedes the round-8 continuation prompt. Round 8 happened in this
sitting and was pushed to `origin/main` and confirmed live at commit
`bcda41e`. If you're starting fresh, `git fetch origin main` should already
show round 8's work; verify the book counts below match before assuming
anything is missing.

## 0. Verify git/environment state before trusting anything below — read this section fully, it's not boilerplate this time

Round 8 hit two *new* variants of this project's recurring stale-mount git
problem, on top of the usual "don't trust `git status` at face value" rule:

1. **The connected local folder's `book-library-app` checkout may not be on
   `main` at all.** Round 8 found it on `redesign/premium-v3`, a branch
   forked from `main` before the 236-book expansion, carrying a large
   uncommitted in-progress feature (a "premium redesign" — new
   civilizations/companies/organizations/people/philosophies/quotes/
   richlist/rulers/wishlist sections). Always run `git branch -a` and
   `git rev-parse --abbrev-ref HEAD` before assuming the checkout is on
   `main`, and treat any uncommitted changes you find as someone else's
   real work-in-progress, not scratch state to discard — surface it to
   Thai before touching it (see `DECISIONS.md` #252 for exactly how round 8
   handled this; the redesign work is now safely committed and pushed to
   `origin/redesign/premium-v3` at commit `e73bb81`, so this specific
   instance is resolved, but the general risk — an unrelated uncommitted
   feature sitting in the folder — could recur).
2. **This session's sync client blocked the raw `unlink()` syscall
   outright** (not just the usual staleness — `rm`/`python os.remove` both
   returned "Operation not permitted" on `.git/index.lock` and on git's own
   loose-object temp files), which broke `git add`/`git commit` directly in
   any `mnt/`-prefixed path, including `outputs`. Confirmed via `df -T`
   that `/tmp` is real `ext4`, not `fuse` — the fix was doing all git work
   in a `/tmp` clone, never in a `mnt/`-prefixed path. If you hit "unable to
   unlink" / "Operation not permitted" errors on git commands, don't fight
   the mounted folder — clone to `/tmp` (or wherever `df -T` shows a
   non-`fuse` filesystem) and work there instead. Also note: a local clone
   of the synced folder's own repo will pick up *its* local `main` branch
   (which can itself be stale — round 8 found it frozen well before the
   quote-retrofit rounds even started) rather than the real `origin/main` —
   fetch from the actual GitHub remote explicitly to be sure, don't trust a
   clone-of-a-clone's tracking refs.

As of this writing, `origin/main` is at commit `bcda41e` ("Quote retrofit
pass round 8"), 236 books.

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

As of the last push: 27 at 0, 79 at 1-4, 43 at 5-9, 12 at 10-14, 9 at 15-19,
66 at >=20. 170 of 236 books remain below target.

**Don't re-attempt these 5 without better tooling/access — they're
genuinely exhausted, not untried:** `encyclopedia-of-chart-patterns-3rd-ed`,
`payback-time`, `multiply-your-business`, `golf-anatomy`,
`rentons-understanding-the-stock-exchange`. Round 8 re-attempted all 5 and
independently re-confirmed 0 — most had already been through 2-4 prior
independent attempts per their own `sourceNotes`. **Check every candidate
book's existing `sourceNotes` before spending a subagent on it** — round
8's own batch A wasted a full round doing exactly what this note is now
warning against (see `DECISIONS.md` #254).

Notable remaining 2-4-quote books still left deliberately for a session
with more contamination-check room: the Brian Tracy cluster (`get-smart`,
`master-your-time`, `maximum-achievement` — 3 separate 2-4-quote Tracy
books, plus 6 more Tracy titles already in this library at higher counts),
`like-a-virgin` (Richard Branson, 2 other Branson titles in the library),
`making-space` (Thich Nhat Hanh — 13 other Thich Nhat Hanh titles in the
library, the single highest contamination-risk author here).

## 2. The highest-value pattern from rounds 4 and 7, still worth applying systematically

Check whether every below-target Vietnamese-language book is a VN edition
of an identifiable English-original book before assuming it needs
Vietnamese-language sourcing. Rounds 4 and 7 both found that VN editions of
well-documented English books reliably yield 15-25 quotes via the much
deeper English sourcing ecosystem, while genuinely Vietnamese-original
books yield much less. 23 of the 79 books in the 1-4 bucket and 14 of the
43 in the 5-9 bucket are Vietnamese-language — worth a systematic pass
checking English-original status before picking targets.

## 3. A second pattern round 8 surfaced, worth checking before every batch

Some books in the below-20 buckets have *never* been through the Stage 20
Goodreads/page-cited verification standard at all — they're pre-Stage-20
entries whose `sourceNotes` already self-disclose lower confidence
("approximate," "not exhaustive," "not... through available search results
in this session"). These are a better use of a research subagent than
already-exhausted 0-quote titles: round 8's 4 such books (`basic-economics`,
`pre-suasion`, `crushing-it`, `drive`) all landed 26-30 fully verified
quotes, catching real misattribution/terminology errors in every single one
along the way (see `DECISIONS.md` #255). Worth scanning the 5-9 and 1-4
buckets for more of this pattern — any `sourceNotes` phrase like
"approximate," "widely and independently attested" (without a specific
source named), or "was not able to verify... through available search
results" is a signal this book hasn't had a real Stage-20-standard pass
yet, as distinct from a book that's genuinely source-exhausted.

## 4. Three ongoing flags, still out of scope for a narrow quotes pass

- `phi-ly-tri-predictably-irrational-vn-ed` / `predictably-irrational-phi-
  ly-tri-vn-ed`: likely-duplicate catalog rows, flagged 5+ sessions running
  (`DECISIONS.md` #207, #230, #242, #248). Needs explicit catalog-scope
  sign-off, not another quotes-pass flag.
- 17 already-committed books with exactly 3 quotes each, all with empty
  `quote.category` (full list `DECISIONS.md` #243) — category backfill,
  not new research. Unchanged this round.
- 10 already-committed books with at least one malformed `quotes[]` entry
  (empty `attribution` and/or `text` — the same "verification-note or
  blurb stuffed into quotes[]" pattern as decision #205), found via round
  8's schema sweep but not fixed: `quyet-doan-trong-tu-duy-logic-1-phut`,
  `quyen-nang-lam-giau`, `manh-tu-tu-tuong-sach-luoc`,
  `ngay-doi-no-payback-time-vn-ed`,
  `nghe-thuat-xay-dung-khach-hang-7l-the-seven-levels-of-communication-vn-ed`,
  `rockefeller-gui-con-trai-38-la-thu`, `start-your-own-corporation`,
  `steal-the-show`, `quyen-luc-dich-thuc-true-power`,
  `qbq-the-question-behind-the-question` (`DECISIONS.md` #257). If a
  future round happens to pick one of these for quote research anyway, fix
  the malformed entry as part of that pass rather than carrying it forward
  again.
- `midas-touch` landed at only 3 of a possible 52 Goodreads-tagged quotes
  due to a tool-side page-rendering failure, not source scarcity
  (`DECISIONS.md` #250) — worth a priority re-attempt if you have better
  fetch/browse tooling available. Unchanged this round.

## 5. Process, per book (unchanged)

Check `sourceNotes` first (§1, §3 above) before picking a book. Check for
an English original first if Vietnamese (§2). Verify every existing quote
too, not just add new ones — round 8 alone dropped 15 of 22 pre-existing
"quotes" across just 4 books after re-verification. Exact wording only,
cross-book contamination check mandatory, 20-30 target never padded,
researcher-only-subagent pattern with a single merge script.

## 6. Pacing

170 books remain. Same batching pattern: ~4-5 books per subagent batch,
several batches per round, validate/commit incrementally, write your own
continuation prompt when you stop.

## 7. Thai's standing instruction (given during Session 26, still in effect)

Keep working autonomously, round after round / session after session,
without stopping for approval on routine judgment calls. Doesn't cover
irreversible structural changes with no undo path (like round 8's branch
discovery — that was correctly escalated, not a routine call), or anything
requiring a credential only Thai can supply. Flag and continue past those.

## 8. Verification, commit, push

Same mechanics as recent sessions, with the `/tmp`-clone git workaround
from §0 now the standing approach rather than a one-off. A classic GitHub
PAT will be needed to push — ask for one, used inline, never persisted.

## 9. One more thing

If 170 turns out to be an overestimate, report the honest final numbers.
