# Continuation Prompt — Quote Retrofit Pass, Round 3+ (Highlights & Quotes, 20-30/book target)

Continue the personal book library app project (`book-library-app`,
`github.com/AbundanceCitadel/book-library-app`). Before doing anything else,
read `PROJECT_BRIEF.md`, `ROADMAP.md`, and `DECISIONS.md` in full — pay
particular attention to `ROADMAP.md` Stage 20 (this retrofit pass, round 1-2
done) and `DECISIONS.md` #203-212 (Session 23, the most recent session).

## 0. Why this session exists

Session 23 started a dedicated quote-only research pass to close the gap
between `docs/SCHEMA.md`'s v2 20-30-quotes-per-book target and the library's
actual state. It completed 2 rounds (55 of 195 originally-thin books:
all 27 zero-quote books, plus 28 of the 123-book 1-4-quote bucket) and
stopped there deliberately, per the project's established pacing pattern
of not trying to do 195 books in one sitting. **140 books remain below the
20-30 target.** This is that continuation.

Session 23 also surfaced a data-quality issue worth knowing about before you
start: several *earlier* passes (predating Session 23) had put non-quote
content into some books' `quotes[]` arrays instead of leaving them honestly
empty — publisher blurbs, a book's own title used as a fake "quote,"
explicit paraphrases, and at least 2 lines misattributed to a different book
by the same author. Session 23 caught and fixed 14 of these within the 55
books it touched. **The remaining 140 books have NOT been checked for this
issue yet** — when you pull up each book's existing quote(s), don't assume
a nonzero count means real, verified content. Evaluate every existing quote
the same way Session 23's round 2 subagents were instructed to: if it's
verbatim, correctly attributed, and confirmed to belong to this specific
book, keep it; if it's a paraphrase, a placeholder, a title, or unconfirmed,
discard it and treat the book as needing fresh research.

## 1. Current state (re-verify this programmatically first)

As of Session 23's push, across all 236 books: 50 already have >=20 quotes
(leave these alone), 186 are below target. Regenerate this yourself before
starting (numbers may have shifted if other work touched the repo since):

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

Work worst-first. As of this writing, the breakdown is: 31 at 0, 95 at 1-4
(part of the original 123-book bucket, minus the 28 Session 23 already did),
34 at 5-9, 9 at 10-14, 4 at 15-19, plus the 2 books Session 23 pushed from
15-19 into 20+ territory don't need touching. The 31 zero-quote books
carried forward are genuinely the hardest cases — Session 23's round 1
already spent real effort on them and 17 came back honestly unfindable;
re-attempting those 17 without new information (a better title/author ID,
a newly-digitized source, etc.) is likely to produce the same honest 0
again. Consider deprioritizing pure re-attempts of those 17 in favor of the
95-book 1-4 bucket, which is far larger and likely has a better hit rate.

**Two flagged issues from Session 23, not yet resolved (out of scope for a
narrow quotes pass, but worth a deliberate look if you have spare capacity):**
- `phi-ly-tri-predictably-irrational-vn-ed` and `predictably-irrational-phi-ly-tri-vn-ed` appear to be duplicate entries for the same underlying Dan Ariely book under two different `id`s. Investigate and either confirm they're genuinely distinct (different translations/editions?) or flag clearly for a dedup pass.
- `nghe-thuat-ghi-chep` (attributed to Nguyễn Hiến Lê) couldn't be matched to any real title in his documented ~120-work bibliography. May be mistitled/misattributed in the source catalog.

## 2. Process, per book (same as established)

1. Read the existing entry (`content/books/{id}.json`). If it has any
   existing quotes, evaluate each one per the data-quality note in §0 above
   before deciding whether to keep or discard it.
2. Web search for real quotes: publisher excerpts, Goodreads quote pages
   (check whether the Goodreads "work" page is even correctly matched to
   this specific title — Session 23 caught one real mismerge, see
   `DECISIONS.md` #207), the author's own site, reputable aggregators,
   reviewed excerpts, or (highest-confidence, used successfully several
   times in Session 23) a direct primary-text read of the actual book via
   a hosted PDF/scan if one can be located and confirmed to be the correct
   edition.
3. Exact wording only — quotes are the one field allowed to be copied
   verbatim per `docs/SCHEMA.md`'s copyright section. Don't let quote-
   hunting bleed into rewriting summaries/lessons/other fields.
4. Group into 4-6 thematic categories.
5. **Cross-book contamination check is mandatory, not optional** — this
   project has caught this failure mode at least 8 times now (`DECISIONS.md`
   #106, #125, #136, #141, #147, #159, #205, #207). Before including any
   quote for an author with other titles in this library, confirm which
   specific book it's from. Authors with multiple library titles not yet
   fully swept for this in Session 23's touched books: Thich Nhat Hanh (12
   of 15 titles still untouched by the retrofit — `at-home-in-the-world`,
   `fear`, `how-to-eat`, `making-space`, `free-where-you-are` are all in
   this session's worklist), Robert Kiyosaki (multiple Rich Dad titles),
   Zig Ziglar, and others — check `content/books/*.json` for repeated
   `author` values before starting each book.
6. Aim for 20-30, never pad or invent. A shorter honest list beats a padded
   one — several of these 140 books are genuinely obscure and may only
   honestly support a handful of real quotes.
7. Use the "researcher-only subagent" pattern from Session 23 if using
   parallel subagents: give each subagent web-search access only (no file
   tools), have it return proposed quotes as structured text, then apply
   every result yourself via a single script — keeps formatting consistent
   and makes pre-commit review tractable. See Session 23's transcript for
   the exact prompt template used (in `DECISIONS.md` #204's description, or
   ask Thai for the chat log if useful).

## 3. Pacing

140 books remain. Follow the same batching pattern as Session 23 and every
prior retrofit pass: 5-10 books per subagent batch, run several batches in
parallel per round, validate and commit incrementally (don't hold everything
for one giant commit), stop at a reasonable point in the sitting, and write
your own continuation prompt for whatever's left.

## 4. Verification, commit, push (same mechanics as every recent session)

1. Work in a fresh `/tmp` clone of `origin/main`, not the synced folder
   directly.
2. After each batch: JSON parses cleanly, no duplicate `id`/`code` values,
   every `quote.category` non-empty, quote counts moved in the right
   direction (watch for the same "count went down because a fake quote was
   correctly discarded" pattern Session 23 hit — that's fine, just document
   it honestly, don't treat it as a bug to hide).
3. Build-verify with `next/font/google` stubbed in a scratch copy (real
   `app/layout.tsx` never touched) — `npm install`, `npx tsc --noEmit`,
   `npm run build`. **Note:** Session 23 hit the known pre-existing sandbox
   SIGBUS limitation (`DECISIONS.md` #108/#111/#128/#211) on `npm run
   build` — this has been intermittent across many prior sessions (absent
   for 9+ sessions, then present again in Session 23). If it recurs, don't
   spend excessive time debugging it — fall back to `tsc --noEmit` + a full
   JSON-parse sweep, exactly as documented, and let Vercel's own build log
   be the real build confirmation post-push.
4. Ask Thai for a classic GitHub PAT (repo scope) to push — used inline
   once, never persisted to disk or committed.
5. Verify the live deploy via direct fetch of
   `https://book-library-app-fawn.vercel.app/` (check the home page's "full
   summaries written" counter) and a couple of retrofitted book pages,
   adding a `?cachebust=N` query param if needed.
6. Update `ROADMAP.md` (Stage 20 or a new stage) and `DECISIONS.md` with
   what you did, same honest-disclosure standard as every prior session.

## 5. One more thing

If 140 turns out to be an overestimate of the real remaining work, don't
manufacture busywork — report the honest final numbers, same as every
other session here has done.
