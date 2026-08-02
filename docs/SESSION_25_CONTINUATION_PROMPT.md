# Continuation Prompt — Quote Retrofit Pass, Round 4 (Highlights & Quotes, 20-30/book target)

Continue the personal book library app project (`book-library-app`,
`github.com/AbundanceCitadel/book-library-app`). Before doing anything else,
read `PROJECT_BRIEF.md`, `ROADMAP.md`, and `DECISIONS.md` in full — pay
particular attention to `ROADMAP.md` Stage 20 (this retrofit pass, rounds
1-3 done) and `DECISIONS.md` #203-212 and #228-230 (Sessions 23 and 25, the
two most recent sessions on this track).

## 0. Why this session exists

This is the fourth round of a dedicated quote-only research pass closing
the gap between `docs/SCHEMA.md`'s v2 20-30-quotes-per-book target and the
library's actual state. Three rounds are done: round 1 (27 zero-quote
books), round 2 (28 books in the 1-4 range), round 3 (8 more books in the
1-4 range, English-language only — see below for why). **182 of 236 books
remain below the 20-30 target.**

**Read this before starting — the project's own continuation-prompt chain
had drifted stale by the time Session 25 ran**, and the same could easily
happen again: `origin/main` may already be ahead of what this document
describes if another session/track has pushed since this was written.
Verify git state (see §4) and re-derive the quote-count breakdown (see §1)
programmatically before trusting any number in this document, including the
"182" above.

Session 23 surfaced a data-quality issue still worth knowing: several
*earlier* passes (predating Session 23) had put non-quote content into some
books' `quotes[]` arrays instead of leaving them honestly empty — publisher
blurbs, a book's own title used as a fake "quote," explicit paraphrases,
and quotes misattributed to a different book by the same author. Sessions
23 and 25 combined have caught and fixed 22 of these across the 63 books
they've touched so far. **The other 173 books have NOT been checked for
this issue yet** — when you pull up each book's existing quote(s), don't
assume a nonzero count means real, verified content. Evaluate every
existing quote the same way: if it's verbatim, correctly attributed, and
confirmed to belong to this specific book, keep it; if it's a paraphrase, a
placeholder, a title, publisher jacket copy, or unconfirmed, discard it and
treat the book as needing fresh research.

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

As of Session 25's push, the breakdown across all 236 books is: 32 at 0,
92 at 1-4, 44 at 5-9, 9 at 10-14, 5 at 15-19, 54 at >=20 (leave the >=20
bucket alone). Work worst-first, same as every prior round.

**A real, specific gap Session 25 left on purpose:** it deliberately scoped
its 8-book batch to English-language titles only, because Vietnamese-
language quote sourcing needs a verification standard (native-language
publisher excerpts, Vietnamese book-review sites, etc.) that Session 25's
subagents weren't confidently able to hold to the same bar as the English
sources they used (Goodreads work-pages, publisher PDFs, page-cited
book-notes blogs). **This is the single most valuable thing this session
could do differently**: budget real effort into Vietnamese-language
sourcing/verification specifically, rather than defaulting to English-
language picks again — a large share of the 0-and-thin buckets are
Vietnamese titles, and skipping them every round means they never close.
If you don't have a reliable way to verify Vietnamese-language quotes to
the same standard, say so explicitly rather than silently repeating
Session 25's scoping choice, so it's a visible pattern Thai can weigh in
on rather than an invisible one.

**Two flagged issues, still not resolved, still out of scope for a narrow
quotes pass unless you have spare capacity:**
- `phi-ly-tri-predictably-irrational-vn-ed` and `predictably-irrational-phi-ly-tri-vn-ed`
  appear to be duplicate entries for the same underlying Dan Ariely book
  under two different `id`s (one has 1 quote, the other has 7). Investigate
  and either confirm they're genuinely distinct editions or flag clearly for
  a dedup pass.
- `nghe-thuat-ghi-chep` (attributed to Nguyễn Hiến Lê) couldn't be matched
  to any real title in his documented ~120-work bibliography as of Session
  23. May be mistitled/misattributed in the source catalog.
- **New this session:** 4 books (`built-to-last`, `charlie-munger-the-complete-investor`,
  `delivering-happiness`, `dotcom-secrets`) have had a locally-assigned
  `code` field sitting uncommitted in whatever synced folder mount this
  project uses, for at least 4 sessions running (decisions #177, #213,
  #229). If you're working in that same synced folder and can see these 4
  local edits, consider deliberately carrying them forward into a commit
  this session rather than flagging-and-skipping again — check with Thai
  first if you're not confident the local values are correct.

## 2. Process, per book (same as established)

1. Read the existing entry (`content/books/{id}.json`). If it has any
   existing quotes, evaluate each one per the data-quality note in §0 above
   before deciding whether to keep or discard it.
2. Web search for real quotes: publisher excerpts, Goodreads quote pages
   (check whether the Goodreads "work" page is even correctly matched to
   this specific title), the author's own site, reputable aggregators,
   reviewed excerpts, or (highest-confidence) a direct primary-text read of
   the actual book via a hosted PDF/scan if one can be located and
   confirmed to be the correct edition.
3. Exact wording only — quotes are the one field allowed to be copied
   verbatim per `docs/SCHEMA.md`'s copyright section. Don't let quote-
   hunting bleed into rewriting summaries/lessons/other fields.
4. Group into 4-6 thematic categories.
5. **Cross-book contamination check is mandatory, not optional** — this
   project has caught this failure mode at least 9 times now (`DECISIONS.md`
   #106, #125, #136, #141, #147, #159, #205, #207, and Session 25's Kiyosaki/
   Ferrazzi checks). Before including any quote for an author with other
   titles in this library, confirm which specific book it's from — check
   `content/books/*.json` for repeated `author` values before starting each
   book.
6. Aim for 20-30, never pad or invent. A shorter honest list beats a padded
   one — several of these books are genuinely obscure and may only honestly
   support a handful of real quotes (Session 25 landed one book at 0 and
   another at 5 for exactly this reason — both correct, not failures).
7. Use the "researcher-only subagent" pattern if using parallel subagents:
   give each subagent web-search access only (no file tools), have it
   return proposed quotes as structured text, then apply every result
   yourself via a single script — keeps formatting consistent and makes
   pre-commit review tractable.

## 3. Pacing

182 books remain. Follow the same batching pattern as every prior round:
roughly 5-10 books per subagent batch, run several batches in parallel per
round, validate and commit incrementally, stop at a reasonable point in the
sitting, and write your own continuation prompt for whatever's left.

## 4. Verification, commit, push (same mechanics as every recent session)

1. **Verify git state before touching anything**: `git fetch origin main`,
   compare `git rev-parse HEAD` vs `origin/main` — don't trust a synced
   folder's `git status` summary line at face value (it has repeatedly
   misreported state across many past sessions, including Session 25's
   discovery that a synced folder can be 170 books behind `origin/main`
   with no warning). Work in a fresh `/tmp` clone of `origin/main`, not the
   synced folder directly, per the pattern every session since ~22 has used.
2. Diff the working tree against `origin/main` file-by-file before starting
   — leave any genuinely in-progress parallel-track files untouched (see
   §1's note on the 4 `code`-field files).
3. After each batch: JSON parses cleanly, no duplicate `id`/`code` values,
   every `quote.category` non-empty, quote counts moved in the right
   direction (a count going down because a fake quote was correctly
   discarded is fine — document it honestly, don't hide it).
4. Build-verify with `next/font/google` stubbed in a scratch copy only
   (never touch the real `app/layout.tsx`) — `npm install`, `npx tsc
   --noEmit`, `npm run build`. **Note:** the sandbox SIGBUS limitation
   (`DECISIONS.md` #108/#111/#128/#211, reproduced again in Session 25) is
   intermittent — if it recurs, don't spend excessive time debugging it,
   fall back to `tsc --noEmit` + the full JSON-parse sweep, and let
   Vercel's own build log be the real build confirmation post-push.
5. Ask Thai for a classic GitHub PAT (repo scope) to push — used inline
   once, never persisted to disk or committed.
6. Verify the live deploy via direct fetch of
   `https://book-library-app-fawn.vercel.app/` and a couple of retrofitted
   book pages, adding a `?cachebust=<commit-sha>` query param if needed.
7. Update `ROADMAP.md` (Stage 20) and `DECISIONS.md` with what you did,
   same honest-disclosure standard as every prior session, including the
   updated quote-count breakdown.
8. Write `docs/SESSION_26_CONTINUATION_PROMPT.md` for the next session, per
   Thai's standing instruction, and paste the full text in your chat
   response (with a freshly-supplied PAT included) so he can paste it
   directly into a new chat.

## 5. One more thing

If 182 turns out to be an overestimate of the real remaining work, don't
manufacture busywork — report the honest final numbers, same as every
other session here has done.
