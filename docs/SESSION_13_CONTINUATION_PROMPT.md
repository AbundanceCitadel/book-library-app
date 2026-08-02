# Continuation Prompt — Paste This Into a New Chat

Continue the personal book library app project. Before doing anything else, read these three files in full:
`D:\BACKUP2026\1. BOOKS LIBRARY\book-library-app\PROJECT_BRIEF.md`
`D:\BACKUP2026\1. BOOKS LIBRARY\book-library-app\ROADMAP.md`
`D:\BACKUP2026\1. BOOKS LIBRARY\book-library-app\DECISIONS.md`
They explain the whole project and exactly what's been done so far. Pay particular attention to the Session 12 log in `ROADMAP.md` and `DECISIONS.md` #121–128.

## 0. Why this prompt exists — read this first

Session 12 did three things: reconciled this sandbox's local `.git` (it was 6 commits behind `origin/main` with the recurring `index.lock`/`maintenance.lock` bug misreporting ~25 "uncommitted" files that were actually already identical to `origin/main` — see `DECISIONS.md` #121), confirmed Session 11's Stage 12 polish-pass commit was already live in production, and — after Thai confirmed directly (via a multiple-choice question) that he wanted the retrofit to resume rather than reviewing the app himself first — retrofitted 5 more books to v2 depth: **Built to Last, Charlie Munger: The Complete Investor, Delivering Happiness, DotCom Secrets, Expert Secrets**. Committed (`252ecdf`) and pushed using a classic PAT Thai supplied mid-session; confirmed the new deploy is `READY` in production at `library.abundancecitadel.app`.

**Stage 15 (the v2 content retrofit) now stands at 13 of 66 books.** 53 remain. There is no known blocker and no pending decision — this is a straight continuation of the same batch-by-batch retrofit work, same as Sessions 10 and 12.

## 1. Immediate first step this session

Read the three files above, then just continue the retrofit — no need to ask Thai anything first unless something genuinely blocks you (per decision #123, he's already confirmed he wants this to keep going).

## 2. Resume the Stage 15 retrofit, alphabetically

Per `DECISIONS.md` #104 (alphabetical order), the next 5 untouched titles are:

1. **Fast This Way** (Dave Asprey) — `content/books/fast-this-way.json`
2. **Flow: The Psychology of Optimal Experience** (Mihaly Csikszentmihalyi) — `content/books/flow.json`
3. **Good to Great** (Jim Collins) — `content/books/good-to-great.json`
4. **Grit: The Power of Passion and Perseverance** (Angela Duckworth) — `content/books/grit.json`
5. **Han So Tranh Hung (The Chu-Han Contention)** (Mong Binh Son, compiler/translator) — `content/books/han-so-tranh-hung.json`

(Verify this list is still current by re-checking which files already have `authorBio` — 13 should show it as of this writing: Atomic Habits, Essentialism, The Lean Startup, Advanced Selling Strategies, All Marketers Are Liars, Being Peace, Buffett: The Making of an American Capitalist, Building a StoryBrand, Built to Last, Charlie Munger: The Complete Investor, Delivering Happiness, DotCom Secrets, Expert Secrets.)

**Note on Han So Tranh Hung specifically**: this is a Vietnamese-language historical text (a compilation/translation of Chu-Han Contention era history, not a typical modern nonfiction book with a living author and a Goodreads quotes page). It'll need a different research approach than the usual web-search-for-quotes pattern — expect to lean more on historical-record synthesis and less on a "verified quotes from Goodreads" pass, and flag honestly in `sourceNotes` if the usual 20-30 quote target genuinely isn't achievable for a book like this, the same way Session 12 flagged DotCom Secrets and Expert Secrets for having a thinner quote footprint (`DECISIONS.md` #125). Don't force English-language marketing-book conventions onto a book that doesn't fit them.

For each book, follow the same process as Sessions 10 and 12:
- Read the existing v1 entry first (`content/books/{slug}.json`).
- Web search for verified quotes (20-30 target, but a smaller fully-verified set beats padding — see `DECISIONS.md` #125 for the precedent of saying so plainly when a book's real quote footprint is thinner).
- Web search for author biography (2-4 short paragraphs, `notableWorks` array — empty if genuinely a one-book author).
- Rewrite each section summary to ~3 paragraphs (intro/substance/conclusion arc) with its own 2-4 item `keyLessons`, distinct from the book-level `keyLessons`.
- Check `docs/SCHEMA.md` and `docs/CONTENT_PIPELINE.md` for the full field spec if anything is unclear — `essentialism.json` remains the cleanest reference example of a fully-realized v2 entry.
- **For any biography**, double-check whether `authorBio` should be about the book's author or its subject — it's about the author who wrote the book, not the subject the book is about (this has been an easy mistake to make twice already: Buffett/Lowenstein in Session 10, Munger/Griffin in Session 12).

## 3. Validate before committing

- Programmatic check: JSON parses cleanly, `id` matches filename, `categories` all valid, `summary` 300-600 words, sections sequential with ≥2 paragraphs and 2-4 `keyLessons` each, book-level `keyLessons` 5-10 items, `quotes` all have `category`, `authorBio` has both `bio` and `notableWorks`.
- Full build verification: mirror to `/tmp` (see mechanics below), fresh `npm install`, `npx tsc --noEmit`, then `npm run build` with the two `next/font/google` calls in `app/layout.tsx` stubbed **in the scratch copy only** (never the real source) since this sandbox's proxy blocks Google Fonts — same pattern as `DECISIONS.md` #89/#111/#128. Confirm the SIGBUS crash from Session 10 still hasn't reproduced (it didn't in Sessions 11 or 12) before assuming it's an ongoing risk.
- Spot-check the generated static HTML for each new book to confirm real content rendered, not just that the build succeeded.
- Full JSON-parse + dangling-`relatedBooks`-reference sweep across all 66 books.

## 4. Update ROADMAP.md / DECISIONS.md and commit

Same convention as every prior batch: update Stage 15's status line and running total, add a Session 13 log entry, log any real judgment calls in `DECISIONS.md` with the next sequential number (should start at #129).

## 5. Standing project mechanics (read before touching git)

- **This sandbox's local git history can silently diverge from the real GitHub `main`, and the reverse can also happen** (Session 12: local was stale/behind, not ahead) — always `git fetch origin main` and compare `git rev-list --count HEAD..origin/main` / `git rev-list --count origin/main..HEAD` before assuming either side is authoritative. If local is behind and the working tree already matches `origin/main` (check with `git diff origin/main --stat` after a `git add -A` equivalent), it's safe to `git reset --mixed origin/main` to reconcile — never force-push.
- **Git mechanics:** mirror the repo to `/tmp` with `tar` (excluding `.git_old*`/`.git_broken*`/`node_modules`/`.next` — don't let the exclude pattern eat `.gitignore`), commit/reconcile there, then bring the updated `.git` back into the synced folder via `mv <old .git> .git_old_<description>_<timestamp>` (never `rm -rf`) followed by `cp -r` of the fresh `.git`. The `index.lock`/`maintenance.lock` files can usually just be `rm -f`'d directly inside the `/tmp` mirror (that filesystem doesn't have the synced-folder lock bug) — this worked cleanly in Session 12 and is faster than past sessions' full mirror-rebuild dance.
- **Push authentication:** needs a classic GitHub PAT (`ghp_...`) from Thai — fine-grained tokens get a 403 every time. Ask directly if you need to push; don't leave the token in git config/credential helpers afterward (this project has never configured a credential helper — pushes use an inline `https://<token>@github.com/...` URL that isn't persisted anywhere).
- **After a push, local `git status` may misreport "ahead by 1 commit" even though the push succeeded** — this happened in Session 12 (the synced-folder lock bug interferes with local ref-tracking updates after a push completes). Verify the real state with `git ls-remote origin main` and compare to local `git rev-parse HEAD` rather than trusting local `git status` alone.
- **Cloud-sync placeholders:** files may show as cloud-only placeholders in a fresh sandbox. Force a download by calling `Read` on the file's Windows path; delegate bulk syncing (e.g. all 66 book JSONs) to a subagent rather than burning main-conversation context if this comes up.
- **Vercel:** project `prj_Ffqa5Al9DmYUM6R55pinzrUqhauk`, team `team_kX9yMR3zOn2rwRiu1Xkr1gXO`. Framework Preset must stay "Next.js," Deployment Protection stays off.
- **Live site:** `https://library.abundancecitadel.app` — confirmed healthy and serving the latest commit as of Session 12.
- **Google Fonts in this sandbox:** `next/font/google` (Inter + Literata) can't fetch here — proxy blocks `fonts.googleapis.com`/`fonts.gstatic.com`. Verify via a stubbed `/tmp` build (see §3) or Vercel's own build log.
- Keep updating `ROADMAP.md` and `DECISIONS.md` as you go, per every prior session's convention.
