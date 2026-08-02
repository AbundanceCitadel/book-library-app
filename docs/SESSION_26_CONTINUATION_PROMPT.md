# Continuation Prompt — Quote Retrofit Pass, Round 6 (Highlights & Quotes, 20-30/book target)

Continue the personal book library app project (`book-library-app`,
`github.com/AbundanceCitadel/book-library-app`). Before doing anything else,
read `PROJECT_BRIEF.md`, `ROADMAP.md`, and `DECISIONS.md` in full — pay
particular attention to `ROADMAP.md` Stage 20 (this retrofit pass, rounds
1-5 done) and `DECISIONS.md` #203-244 (Sessions 23, 25, and 26, the three
most recent sessions on this track).

## 0. Verify git/environment state before trusting anything below

**This project's own continuation-prompt chain has now drifted stale
twice in a row** (Session 25 found this, and Session 26 found it again,
worse: the *connected local folder* was on an orphaned branch forked right
after Session 11, 66 books vs. `origin/main`'s 236, missing 15 sessions of
work). Do not assume the local folder — if one is connected — reflects
`origin/main`. Concretely:

1. Check whether a local folder for this project is connected. If so, open
   `PROJECT_BRIEF.md` there and confirm it says "Owner: Thai
   (metacitadel@gmail.com)."
2. `git fetch origin main`, then compare `git rev-parse HEAD` vs
   `git rev-parse origin/main` — don't trust `git status`'s summary line.
   If they differ by more than a handful of commits, or if `content/books/`
   has a wildly different file count than 236, **don't build on the local
   checkout** — clone `origin/main` fresh instead (this sandbox: outside
   any `mnt/`-prefixed mount, e.g. the sandbox's own home directory —
   `npm install`/`next build` against a cloud-synced mount's `node_modules`
   has repeatedly produced spurious errors across many past sessions,
   `DECISIONS.md` #183/#192).
3. If the local folder turns out stale and has real uncommitted work sitting
   in it, don't silently discard it — surface what you found to Thai and
   let him decide (per `DECISIONS.md` #238's precedent), unless he's
   already given you a standing instruction to just proceed (see §5 below
   for exactly that instruction from Session 26).
4. This session (26) did all work in a fresh `origin/main` clone and
   **committed locally only — there was no GitHub PAT available**, so
   `origin/main` as of this writing does NOT yet include Session 26's 21
   book updates or its `ROADMAP.md`/`DECISIONS.md`/this-file changes. If
   you're starting fresh from `origin/main`, re-check whether those changes
   already made it in (maybe Thai pushed them via another route) before
   redoing any of Session 26's work — diff against the specific book ids
   listed in §1 below to confirm.

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

As of Session 26's (uncommitted-to-`origin/main`) state: 25 at 0, 92 at
1-4, 46 at 5-9, 11 at 10-14, 5 at 15-19, 57 at >=20 (leave the >=20 bucket
alone). **179 of 236 books remain below target.** Work worst-first (the
1-4 bucket next, then re-sweep the small remaining 0-bucket in case new
sources have surfaced since).

Session 26 specifically closed out every exactly-1-quote book except the
two flagged `phi-ly-tri`/`predictably-irrational` duplicates (see §3) and
touched 17 books total in the 0-quote bucket (7 gained real quotes, 10
stayed honestly at zero after genuine research — including a second
independent failed attempt at `nghe-thuat-ghi-chep`, now checked twice with
the same result: this title likely doesn't exist in Nguyễn Hiến Lê's real
bibliography. A third attempt on the same book without new search leads is
probably not worth the effort).

**A real, specific gap Session 26 made a genuine effort on, worth
continuing:** Vietnamese-language sourcing. Of the 4 VN-track books
attempted, 2 succeeded well (both were VN editions of well-documented
English-original books — Guy Spier's *Education of a Value Investor*, and
identifying which Maxwell book a vague Vietnamese title mapped to), 1 was
excluded on quality grounds (single-source, uncross-verified Vietnamese
blog quotes), and 1 was reconfirmed unmatchable. **The highest-value next
step for Vietnamese titles specifically is checking whether each 0-or-thin
Vietnamese book is itself a VN edition of an identifiable English original**
— that unlocks the much deeper English quote-sourcing ecosystem (Goodreads,
publisher excerpts, blogs) that pure-Vietnamography-language sourcing does
not have. Check the book's title/author/cover copy for hints before
assuming it's a Vietnamese-original work with no English equivalent.

## 2. Two flagged issues, still not resolved, still out of scope for a
narrow quotes pass unless you have spare capacity and Thai's go-ahead:

- `phi-ly-tri-predictably-irrational-vn-ed` (code 196) and
  `predictably-irrational-phi-ly-tri-vn-ed` (code 202) are confirmed (via
  `content/catalog.json` directly, not just the book JSONs) to be two
  separate catalog rows for what looks like the same physical Dan Ariely
  book — same author/category/language, title words simply reordered.
  Flagged three sessions running now (`DECISIONS.md` #207, #230, #242)
  without anyone merging/deleting either entry, since that's a real,
  potentially irreversible structural change (unlike additive quote work)
  that deserves either Thai's explicit sign-off or a session specifically
  scoped to catalog correction.
- **New this session:** 17 already-committed books (full list in
  `DECISIONS.md` #243 — `the-lion-the-witch-and-the-wardrobe`,
  `the-little-book-of-common-sense-investing`,
  `the-millionaire-next-door`, `the-miracle-of-mindfulness`,
  `the-one-thing`, `the-snowball`, `the-virgin-way`,
  `think-and-grow-rich`, `thinking-fast-and-slow`, `traction`,
  `traffic-secrets`, `trillion-dollar-coach`, `unlimited-sales-success`,
  `virtual-society`, `way-of-the-wolf`,
  `windows-on-the-world-complete-wine-course`, `zero-to-one`) each have
  exactly 3 quotes, all 3 with an empty `category` field — a suspiciously
  uniform pattern from what's probably one earlier batch. None are in the
  0-1-4 buckets (they all have exactly 3, so they're in this document's
  own "1-4" bucket and would come up naturally in a worst-first pass — but
  since they already have real quotes, the fix here is just backfilling a
  `category` value per quote, not new research). Worth either folding into
  the next quotes-pass session or a dedicated small fix pass.

## 3. Process, per book (same as established)

1. Read the existing entry (`content/books/{id}.json`). If it has any
   existing quotes, evaluate each one per the data-quality note in prior
   sessions' notes before deciding whether to keep or discard it.
2. **Check whether this is a Vietnamese edition/translation of an
   identifiable English-original book first** (per §1's note above) —
   changes your sourcing strategy entirely if so.
3. Web search for real quotes: publisher excerpts, Goodreads quote pages
   (check whether the Goodreads "work" page is even correctly matched to
   this specific title), the author's own site, reputable aggregators,
   reviewed excerpts, or (highest-confidence) a direct primary-text read of
   the actual book via a hosted PDF/scan if one can be located and
   confirmed to be the correct edition.
4. Exact wording only — quotes are the one field allowed to be copied
   verbatim per `docs/SCHEMA.md`'s copyright section. Don't let quote-
   hunting bleed into rewriting summaries/lessons/other fields.
5. Group into 4-6 thematic categories.
6. **Cross-book contamination check is mandatory, not optional** — this
   project has caught this failure mode at least 12 times now
   (`DECISIONS.md` #106, #125, #136, #141, #147, #159, #205, #207, Session
   25's Kiyosaki/Ferrazzi checks, and Session 26's Kiyosaki/Sobel/Zyman/
   Deitch/Pearson checks). Before including any quote for an author with
   other titles in this library, confirm which specific book it's from —
   check `content/books/*.json` for repeated `author` values before
   starting each book.
7. Aim for 20-30, never pad or invent. A shorter honest list beats a padded
   one — several of these books are genuinely obscure and may only honestly
   support a handful of real quotes, or zero. A single uncross-verified
   source (one blog, one aggregator with no page citation) is not enough on
   its own — Session 26 explicitly declined to use exactly this kind of
   source for a Vietnamese title on quality grounds, and the same standard
   should apply in either language.
8. Use the "researcher-only subagent" pattern if using parallel subagents:
   give each subagent web-search access only (no file tools), have it
   return proposed quotes as structured text, then apply every result
   yourself via a single script — keeps formatting consistent and makes
   pre-commit review tractable.

## 4. Pacing

179 books remain. Follow the same batching pattern as every prior round:
roughly 4-5 books per subagent batch, run several batches in parallel per
round, validate and commit incrementally, stop at a reasonable point in
the sitting, and write your own continuation prompt for whatever's left.

## 5. Standing instruction from Thai (given mid-Session-26)

Thai told this session directly: keep doing whatever the roadmap needs,
round after round / session after session, without stopping to ask for
approval — he's stepping away and doesn't want to be interrupted for
routine judgment calls. This covers pacing and scoping decisions (how many
books per round, which bucket to prioritize, whether to use subagents,
etc.) — it does **not** cover irreversible structural changes with no
undo path (e.g., merging/deleting the `phi-ly-tri`/`predictably-irrational`
duplicate pair) or things Claude has no way to do without a credential
only Thai can supply (pushing to GitHub). Keep working autonomously within
those bounds; flag-and-continue (don't stop-and-wait) for anything outside
them, same as this session did.

## 6. Verification, commit, push (same mechanics as every recent session)

1. **Verify git state before touching anything** — see §0 above, this is
   now the most-repeated lesson in this project's history.
2. Diff the working tree against `origin/main` file-by-file before
   starting — leave any genuinely in-progress parallel-track files
   untouched (check for the 4 `code`-field-only books flagged since
   Session 21: `built-to-last`, `charlie-munger-the-complete-investor`,
   `delivering-happiness`, `dotcom-secrets` — still unresolved as of
   Session 26, still nobody's explicit task).
3. After each batch: JSON parses cleanly, no duplicate `id`/`code` values,
   every `quote.category` non-empty (for genuinely new quotes — the 17
   pre-existing empty-category books in §2 are a separate, already-flagged
   backlog item, don't let that check block new work), quote counts moved
   in the right direction.
4. Build-verify with `next/font/google` stubbed in a scratch copy only
   (never touch the real `app/layout.tsx`) — `npm install`, `npx tsc
   --noEmit`, `npm run build`. **Note:** the sandbox SIGBUS limitation
   (`DECISIONS.md` #108/#111/#128/#211/#230/#239) reproduced immediately
   and unconditionally in Session 26, even with reduced worker/CPU
   settings — if it recurs, don't spend excessive time debugging it, fall
   back to `tsc --noEmit` + the full JSON-parse sweep, and let Vercel's own
   build log be the real build confirmation post-push.
5. Ask Thai for a classic GitHub PAT (repo scope) to push — used inline
   once, never persisted to disk or committed. **Session 26 had none
   available and committed locally only** — if you're continuing directly
   from Session 26's local commit rather than a fresh `origin/main` clone,
   you already have those 21 books + doc updates committed; just need a PAT
   to push them (plus whatever new work you do) in one go.
6. Verify the live deploy via direct fetch of
   `https://book-library-app-fawn.vercel.app/` and a couple of retrofitted
   book pages, adding a `?cachebust=<commit-sha>` query param if needed.
7. Update `ROADMAP.md` (Stage 20) and `DECISIONS.md` with what you did,
   same honest-disclosure standard as every prior session, including the
   updated quote-count breakdown.
8. Write `docs/SESSION_27_CONTINUATION_PROMPT.md` for the next session, per
   Thai's standing instruction, and paste the full text in your chat
   response (with a freshly-supplied PAT included, if pushing) so he can
   paste it directly into a new chat.

## 7. One more thing

If 179 turns out to be an overestimate of the real remaining work, don't
manufacture busywork — report the honest final numbers, same as every
other session here has done.
