# Session 17 Continuation Prompt — Personal Book Library App

Continue the personal book library app project. Before doing anything else, read these three files in full:
`D:\BACKUP2026\1. BOOKS LIBRARY\book-library-app\PROJECT_BRIEF.md`
`D:\BACKUP2026\1. BOOKS LIBRARY\book-library-app\ROADMAP.md`
`D:\BACKUP2026\1. BOOKS LIBRARY\book-library-app\DECISIONS.md`
They explain the whole project and exactly what's been done so far. Pay particular attention to the Session 16 log in `ROADMAP.md` and `DECISIONS.md` #144–148.

## 0. Why this prompt exists — read this first

Session 16 verified git state first (local HEAD and `origin/main` both at `0796679` before this session's commit, clean — confirmed via `git rev-parse` comparison, not `git status`'s summary line). Re-derived the true Stage 15 retrofit count programmatically before trusting `ROADMAP.md`'s "33 of 66" note — this time it was accurate (no undocumented uncommitted work found, unlike Session 14). Retrofitted 5 more books via parallel subagents: Same As Ever, Screw It Let's Do It, Security Analysis, Silence, Start With Why — committed (`ab05cbe`) and pushed to `origin/main`, confirmed live on Vercel (deployment `READY`) and via a direct fetch of the production homepage, which lists all 5 new books.

Stage 15 (the v2 content retrofit) now stands at **38 of 66 books**. 28 remain. There is no known blocker and no pending decision — this is a straight continuation of the same batch-by-batch retrofit work as Sessions 10, 12, 13, 14, 15, 16.

One new operational note from Session 16, worth knowing in advance: **launching several parallel subagents at once can occasionally hit a transient session-level API rate limit** ("You've hit your session limit... resets at [time]"). This happened mid-batch this session with no content loss (the cut-off agents hadn't written any files yet). The recovery that worked: retry immediately rather than waiting for the stated reset time — launch one agent alone first to confirm the limit has actually cleared, then launch the rest together once that succeeds. Don't assume real work was lost just because an agent call errors out this way; check for a partial `agentId` and partial output in the error result first, but if the tool to resume a spawned agent (`SendMessage`) isn't available in your toolset, treat the interrupted agent's work as unsalvageable and just relaunch it fresh.

Standing lesson, worth repeating every session going forward: don't trust `ROADMAP.md`'s last recorded count at face value. Before picking the next batch, re-derive the true retrofit count programmatically (check every `content/books/*.json` for a populated `authorBio` plus real v2 section depth — every section has ≥2 paragraphs and its own `keyLessons`) in case a prior session did real work that never got committed or logged. This has been necessary once (Session 14) and unnecessary in every other session so far — no way to know in advance which case you're in.

## 1. Immediate first step this session

Read the three files above, then verify git state (`git fetch origin main`, compare `git rev-parse HEAD` vs `git rev-parse origin/main` — don't trust `git status`'s summary line alone, see the standing mechanics note below) and re-verify the retrofit count programmatically. Then just continue the retrofit — no need to ask Thai anything first unless something genuinely blocks you.

## 2. Resume the Stage 15 retrofit, alphabetically

Per `DECISIONS.md` #104 (alphabetical order), the next 5 untouched titles as of this writing are:

1. The 4-Hour Body: An Uncommon Guide to Rapid Fat-Loss, Incredible Sex, and Becoming Superhuman (Timothy Ferriss) — `content/books/the-4-hour-body.json`
2. The 7 Habits of Highly Effective People (Stephen R. Covey) — `content/books/the-7-habits-of-highly-effective-people.json`
3. The Alchemist (Paulo Coelho) — `content/books/the-alchemist.json`
4. The Art of the Deal (Donald J. Trump with Tony Schwartz) — `content/books/the-art-of-the-deal.json`
5. The Art of War (Sun Tzu) — `content/books/the-art-of-war.json`

(Re-verify this list is still current before starting — 38 books should show real v2 depth as of this writing.)

Notes on specific titles:

* **The 4-Hour Body** is a Tim Ferriss book with an enormous number of specific, often unusual factual/numeric claims (protocols, dosages, named techniques) — verify chapter structure and any specific claims you plan to reference via web search rather than assuming from general knowledge of the "4-Hour" series, and don't confuse it with The 4-Hour Workweek (a different Ferriss book, not currently in this library as far as this prompt's writer could tell — double check).
* **The Art of the Deal** is a real editorial/political-figure biography-adjacent book (credited to Donald J. Trump with ghostwriter Tony Schwartz) — treat `authorBio` carefully per the established ghostwriter/subject distinction (decisions #107, #126): the book has two credited names on the cover, and Tony Schwartz has been extensively public since publication about his role and later views on the book, which is worth researching directly rather than assuming. This is also a case where `whoThisIsFor`/`whenToReadThis` and the overall tone should stay descriptive and even-handed rather than editorializing — this is a business-book retrofit like any other in this library, not a place to insert political commentary in either direction.
* **The Art of War** is a classical Chinese military text (Sun Tzu, likely 5th century BC) already in this library as v1 — like Records of the Grand Historian and Han So Tranh Hung before it, expect a different verification approach than a modern book: quotes should be checked against a real, well-regarded English translation (Lionel Giles' public-domain translation is the most commonly cited free source; Samuel B. Griffith's is another well-regarded one) rather than a Goodreads work-quotes page for a "book" in the modern sense, and `authorBio` should address the real, substantial scholarly uncertainty about Sun Tzu's historical existence and authorship rather than presenting a confident, novelized biography as settled fact.
* **The 7 Habits of Highly Effective People** and **The Alchemist** are both extremely well-known, heavily-quoted books — expect a much larger available quote pool than usual, which makes the discipline of only including quotes verified against a book-specific source (not a general "inspirational quotes" aggregator) more important, not less.

For each book, follow the same process as Sessions 10, 12, 13, 14, 15, 16:

* Read the existing v1 entry first (`content/books/{slug}.json`).
* Web search for verified quotes (20–30 target, but a smaller fully-verified set beats padding — say so plainly in `sourceNotes` when a book's real quote footprint is thinner, per established precedent). Watch for quotes that trace to a different book by the same author (this has happened repeatedly — decisions #106, #125, #136, #141) or that a general quotes aggregator catalogs under this book but that actually belong to someone else entirely (decision #141) — exclude rather than include on a technicality.
* Web search for author biography (2–4 short paragraphs, `notableWorks` array — empty if genuinely a one-book author).
* Rewrite each section summary to ~3 paragraphs (intro/substance/conclusion arc) with its own 2–4 item `keyLessons`, distinct from the book-level `keyLessons`.
* Check `docs/SCHEMA.md` and `docs/CONTENT_PIPELINE.md` for the full field spec if anything is unclear — `essentialism.json` remains the cleanest reference example of a fully-realized v2 entry.
* For any biography or ghost-written/co-authored book, double-check whether `authorBio` should be about the book's author or its subject — it's about the author who wrote the book, not the subject the book is about (caught and fixed for Buffett/Lowenstein in Session 10, Munger/Griffin in Session 12; The Art of the Deal in this batch is a similar case with a real wrinkle, see above).
* **Verify section titles/structure against the real book, not just the v1 entry's existing labels.** This has been a real, recurring problem, not a hypothetical one — Sessions 15 and 16 both found multiple v1 entries with invented section titles that didn't match the real book's table of contents (No Mud No Lotus, Screw It Let's Do It, Silence, and Start With Why was even missing an entire section). Don't assume a v1 entry's structure is correct just because it's already there; a quick check against a real table of contents (publisher listing, Internet Archive, a reputable chapter-by-chapter summary site) is cheap insurance and has paid off in nearly every batch so far.
* Treat every quote as something to verify, not something to trust because it was already in the file — this has caught real errors in nearly every batch so far.

Sessions 10/12/13/14/15/16 all delegated the actual research-and-writing to parallel subagents (one per book) — this has worked cleanly every time as long as every agent's output gets independently re-validated afterward, not trusted on self-report alone. See the rate-limit note in §0 above if a batch launch errors out.

## 3. Validate before committing

* Programmatic check: JSON parses cleanly, `id` matches filename, `categories` all valid, `summary` 300–600 words, sections sequential with ≥2 paragraphs and 2–4 `keyLessons` each, book-level `keyLessons` 5–10 items, `quotes` all have `category`, `authorBio` has both `bio` and `notableWorks`. Also re-run the full-library sweep: JSON-parse + duplicate-id + non-sequential-section-order + dangling-`relatedBooks`-reference check across all 66 books, not just the 5 new ones.
* Full build verification: mirror to `/tmp` (see mechanics below), fresh `npm install`, `npx tsc --noEmit`, then `npm run build` with the two `next/font/google` calls in `app/layout.tsx` stubbed in the scratch copy only (never the real source) since this sandbox's proxy blocks Google Fonts. Confirm the Session 10 SIGBUS crash still hasn't reproduced (it hasn't in Sessions 11–16) before assuming it's an ongoing risk.
* Spot-check the generated static HTML for each new book to confirm real content rendered, not just that the build succeeded.

## 4. Update ROADMAP.md / DECISIONS.md and commit

Same convention as every prior batch: update Stage 15's status line and running total, add a Session 17 log entry, log any real judgment calls in `DECISIONS.md` with the next sequential number (should start at #149).

## 5. Standing project mechanics (read before touching git)

* This sandbox's local git history can silently diverge from the real GitHub `main`, and the reverse can also happen — always `git fetch origin main` and compare `git rev-parse HEAD` / `git rev-parse origin/main` before assuming either side is authoritative. If local is behind and the working tree already matches `origin/main`, it's safe to `git reset --mixed origin/main` to reconcile — never force-push.
* This sandbox's synced-folder `.git` sometimes shows a stale `index.lock`/`HEAD.lock`/`maintenance.lock`/`tmp_obj_*` that blocks direct file deletion, but Sessions 15 and 16 both found direct `git add`/`git commit`/`git push` worked fine in the synced folder despite warning output about those files — try direct commit/push first (it may just work), and only fall back to the `/tmp`-mirror-and-copy-back workaround (mirror the repo to `/tmp` with `tar`, `rm -f` the lock files there, commit/push from the `/tmp` mirror, then bring the updated `.git` back into the synced folder via `mv .git .git_old_<description>_<timestamp>` — never `rm -rf` — followed by `cp -r` of the fresh `.git`) if a direct commit genuinely fails.
* Push authentication — a classic GitHub PAT is provided in the chat message accompanying this document (not written into this file) so you don't need to stop and ask Thai for one this session. Use it as an inline URL, don't persist it anywhere (no credential helper, don't write it into any file that gets committed):

```
  git push "https://<PAT>@github.com/AbundanceCitadel/book-library-app.git" main
```

If it's expired or rejected with a 403, ask Thai for a fresh one rather than debugging further (fine-grained tokens have consistently failed with 403 across every session; only classic tokens have worked).

* After a push, verify with `git ls-remote origin main` compared to local `git rev-parse HEAD`, not local `git status` — local `git status` has repeatedly misreported "ahead by N commits" even when fully in sync.
* Cloud-sync placeholders: files may show as cloud-only placeholders in a fresh sandbox. Force a download by calling `Read` on the file's Windows path; delegate bulk syncing to a subagent rather than burning main-conversation context if this comes up.
* Vercel: project `prj_Ffqa5Al9DmYUM6R55pinzrUqhauk`, team `team_kX9yMR3zOn2rwRiu1Xkr1gXO`. Framework Preset must stay "Next.js," Deployment Protection stays off. Note: `get_project`'s `domains` array can be incomplete on a deployment that's still `BUILDING` — if `library.abundancecitadel.app` seems to be missing, wait for the deployment to reach `READY` and check again before assuming the domain was dropped (this happened again, harmlessly, in Session 16).
* Live site: `https://library.abundancecitadel.app` — confirmed healthy and serving the new content as of Session 16. Re-verify early this session.
* Google Fonts in this sandbox: `next/font/google` (Inter + Literata) can't fetch here — proxy blocks `fonts.googleapis.com`/`fonts.gstatic.com`. Verify via a stubbed `/tmp` build (see §3) or Vercel's own build log.
* Keep updating `ROADMAP.md` and `DECISIONS.md` as you go, per every prior session's convention.

## 6. Standing instruction from Thai

At the end of every session going forward, write the next session's continuation prompt (this file's pattern) as both a committed doc (`docs/SESSION_<N+1>_CONTINUATION_PROMPT.md`, without the PAT) and as full text in the chat response (with a freshly-supplied PAT included) so Thai can paste it directly into a new chat to keep the project moving with minimal friction.
