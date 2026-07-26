# Session 19 Continuation Prompt — Personal Book Library App

Continue the personal book library app project. Before doing anything else, read these three files in full:
`D:\BACKUP2026\1. BOOKS LIBRARY\book-library-app\PROJECT_BRIEF.md`
`D:\BACKUP2026\1. BOOKS LIBRARY\book-library-app\ROADMAP.md`
`D:\BACKUP2026\1. BOOKS LIBRARY\book-library-app\DECISIONS.md`
They explain the whole project and exactly what's been done so far. Pay particular attention to the Session 18 log in `ROADMAP.md` and `DECISIONS.md` #156–160.

## 0. Why this prompt exists — read this first

Session 18 verified git state first (local HEAD and `origin/main` both at `90ac05f` before this session's commit, clean — confirmed via `git rev-parse` comparison, not `git status`'s summary line). Re-derived the true Stage 15 retrofit count programmatically before trusting `ROADMAP.md`'s "43 of 66" note — this time it was accurate (no undocumented uncommitted work found). Retrofitted 5 more books via 5 parallel subagents — all launched and completed successfully on the first attempt: The Bitcoin Standard, The E-Myth Revisited, The Hard Thing About Hard Things, The Infinite Game, The Intelligent Investor — independently re-validated (schema checks, full 66-book sweep, clean `/tmp`-mirror build, static-HTML spot-check), committed (`edcf912`) and pushed to `origin/main`, confirmed `READY` in production via the Vercel connector (`library.abundancecitadel.app` alias resolves to this deployment).

Stage 15 (the v2 content retrofit) now stands at **48 of 66 books**. 18 remain. There is no known blocker and no pending decision — this is a straight continuation of the same batch-by-batch retrofit work as Sessions 10, 12, 13, 14, 15, 16, 17, 18.

Standing lesson, worth repeating every session going forward: don't trust `ROADMAP.md`'s last recorded count at face value. Before picking the next batch, re-derive the true retrofit count programmatically (check every `content/books/*.json` for a populated `authorBio` plus real v2 section depth — every section has ≥2 paragraphs and its own `keyLessons`) in case a prior session did real work that never got committed or logged. This has been necessary once (Session 14) and unnecessary in every other session since, including Session 18 — no way to know in advance which case you're in.

On the rate-limit note from Session 16: it has not recurred in Sessions 17 or 18 when 5 agents were launched together on the first attempt. Treat it as a real but intermittent risk, not a reason to default to launching one-at-a-time — if a batch launch does error out with a session/rate-limit message, the recovery that's worked before is: launch one agent alone first to confirm the limit has cleared, then launch the rest together.

## 1. Immediate first step this session

Read the three files above, then verify git state (`git fetch origin main`, compare `git rev-parse HEAD` vs `git rev-parse origin/main` — don't trust `git status`'s summary line alone, see the standing mechanics note below) and re-verify the retrofit count programmatically. Then just continue the retrofit — no need to ask Thai anything first unless something genuinely blocks you.

## 2. Resume the Stage 15 retrofit, alphabetically

Per `DECISIONS.md` #104 (alphabetical order), the next 5 untouched titles as of this writing are:

1. The Lion, the Witch and the Wardrobe (C.S. Lewis) — `content/books/the-lion-the-witch-and-the-wardrobe.json`
2. The Little Book of Common Sense Investing (John C. Bogle) — `content/books/the-little-book-of-common-sense-investing.json`
3. The Millionaire Next Door (Thomas J. Stanley & William D. Danko) — `content/books/the-millionaire-next-door.json`
4. The Miracle of Mindfulness (Thich Nhat Hanh) — `content/books/the-miracle-of-mindfulness.json`
5. The One Thing (Gary Keller & Jay Papasan) — `content/books/the-one-thing.json`

(Re-verify this list is still current before starting — 48 books should show real v2 depth as of this writing.)

Notes on specific titles:

* **The Lion, the Witch and the Wardrobe** is the only fiction/children's-literature title in this batch and possibly in the whole library so far — check how (or whether) prior sessions have handled fiction in this nonfiction-leaning schema (`keyLessons`, `categories` framing) before assuming the nonfiction template applies unmodified. If no fiction precedent exists yet, treat this as a real judgment call worth logging in `DECISIONS.md`, not something to force into the standard business-book mold silently.
* **The Little Book of Common Sense Investing** and **The Millionaire Next Door** are both finance/investing titles — this library already has several v2 finance books (`security-analysis.json`, `the-intelligent-investor.json` as of Session 18, `one-up-on-wall-street.json`). Check those for overlapping investing-philosophy quotes/concepts (index-fund advocacy, frugality) before assuming a given quote is unique to the book at hand — the project has repeatedly found cross-book contamination risk wherever authors share a topic or era, not just wherever they share an author (see decisions #106, #125, #136, #141, #147, #159).
* **The Millionaire Next Door** has two credited co-authors (Stanley & Danko) — decide `authorBio` scope deliberately (both authors, like the `security-analysis.json` precedent for Graham & Dodd) rather than defaulting to just one.
* **The Miracle of Mindfulness** is a second Thich Nhat Hanh book in this library alongside the already-v2 `being-peace.json` (Session 10) and `peace-is-every-step.json` (Session 15, if that title is Thich Nhat Hanh — verify) — apply the same cross-book quote-contamination check used for the Sinek and Graham titles.
* **The One Thing** is a well-known, frequently-quoted business/productivity book — expect a healthy public quote pool, but still verify each against a book-specific source (Goodreads work-quotes page, publisher excerpt) rather than a general productivity-quotes aggregator.

For each book, follow the same process as Sessions 10, 12, 13, 14, 15, 16, 17, 18:

* Read the existing v1 entry first (`content/books/{slug}.json`).
* Web search for verified quotes (20–30 target, but a smaller fully-verified set beats padding — say so plainly in `sourceNotes` when a book's real quote footprint is thinner, per established precedent).
* Web search for author biography (2–4 short paragraphs, `notableWorks` array — empty if genuinely a one-book author; both authors' names/scope decided deliberately for co-authored books).
* Rewrite each section summary to ~3 paragraphs (intro/substance/conclusion arc) with its own 2–4 item `keyLessons`, distinct from the book-level `keyLessons`.
* Check `docs/SCHEMA.md` and `docs/CONTENT_PIPELINE.md` for the full field spec if anything is unclear — `essentialism.json` remains the cleanest reference example of a fully-realized v2 entry.
* For any biography or ghost-written/co-authored book, double-check whether `authorBio` should be about the book's author(s) or its subject.
* **Verify section titles/structure against the real book, not just the v1 entry's existing labels.** This has been a real, recurring problem in nearly every batch — Session 18 alone found invented or incomplete v1 section structures in all 5 books (missing chapters, wrong labels, collapsed parts). Don't assume a v1 entry's structure is correct just because it's already there; a quick check against a real table of contents (publisher listing, Internet Archive, Library of Congress catalog record, a reputable chapter-by-chapter summary site) is cheap insurance and has paid off in nearly every batch so far.
* Treat every quote as something to verify, not something to trust because it was already in the file — this has caught real errors in nearly every batch so far.

Sessions 10/12/13/14/15/16/17/18 all delegated the actual research-and-writing to parallel subagents (one per book) — this has worked cleanly every time as long as every agent's output gets independently re-validated afterward, not trusted on self-report alone. See the rate-limit note in §0 above if a batch launch errors out.

## 3. Validate before committing

* Programmatic check: JSON parses cleanly, `id` matches filename, `categories` all valid (check against `lib/books.ts`'s `CATEGORY_LABELS` slugs, not display names — a plain string match against the display-name list will produce false positives), `summary` 300–600 words, sections sequential with ≥2 paragraphs and 2–4 `keyLessons` each, book-level `keyLessons` 5–10 items, `quotes` all have `category`, `authorBio` has both `bio` and `notableWorks`. Also re-run the full-library sweep: JSON-parse + duplicate-id + non-sequential-section-order + dangling-`relatedBooks`-reference check across all 66 books, not just the 5 new ones.
* Full build verification: mirror to `/tmp` (see mechanics below), fresh `npm install`, `npx tsc --noEmit`, then `npm run build` with the two `next/font/google` calls in `app/layout.tsx` stubbed in the scratch copy only (never the real source) since this sandbox's proxy blocks Google Fonts. Confirm the Session 10 SIGBUS crash still hasn't reproduced (it hasn't in Sessions 11–18) before assuming it's an ongoing risk. Note: `/tmp` may have leftover directories from a prior session's subagents owned by a different sandbox user (`nobody`) that can't be `rm -rf`'d — just pick a fresh, never-used directory name (e.g. `/tmp/blapp_build_<session>`) rather than fighting the permission error.
* Spot-check the generated static HTML for each new book to confirm real content rendered (e.g. author name appearing dozens of times, page size comparable to other v2 pages), not just that the build succeeded.

## 4. Update ROADMAP.md / DECISIONS.md and commit

Same convention as every prior batch: update Stage 15's status line and running total, add a Session 19 log entry (both in the Stage 15 narrative section and the bottom-of-file Session Log), log any real judgment calls in `DECISIONS.md` with the next sequential number (should start at #161).

## 5. Standing project mechanics (read before touching git)

* This sandbox's local git history can silently diverge from the real GitHub `main`, and the reverse can also happen — always `git fetch origin main` and compare `git rev-parse HEAD` / `git rev-parse origin/main` before assuming either side is authoritative. If local is behind and the working tree already matches `origin/main`, it's safe to `git reset --mixed origin/main` to reconcile — never force-push.
* This sandbox's synced-folder `.git` has a recurring stale `index.lock` that blocks direct `git commit` — it's intermittent, not fixed (hit again in Session 18). Try direct commit/push first (it may work), and if it fails, fall back to the `/tmp`-mirror-and-copy-back workaround: mirror the repo to `/tmp` with `tar` (excluding `.git` is optional — the `.git` directory itself mirrors fine and carries correct history), commit/push from the `/tmp` mirror, then bring the updated `.git` back into the synced folder via `mv .git .git_old_<description>_<timestamp>` (never `rm -rf`) followed by `cp -r` of the fresh `.git`. Re-run `git fetch origin main` afterward and confirm `git rev-parse HEAD` matches `origin/main` before considering the reconciliation done.
* Push authentication — a classic GitHub PAT is provided in the chat message accompanying this document (not written into this file) so you don't need to stop and ask Thai for one this session. Use it as an inline URL, don't persist it anywhere (no credential helper, don't write it into any file that gets committed):

```
  git push "https://<PAT>@github.com/AbundanceCitadel/book-library-app.git" main
```

If it's expired or rejected with a 403, ask Thai for a fresh one rather than debugging further (fine-grained tokens have consistently failed with 403 across every session; only classic tokens have worked).

* After a push, verify with `git ls-remote origin main` (or `git ls-remote https://github.com/AbundanceCitadel/book-library-app.git main`, which doesn't need auth for a public repo) compared to local `git rev-parse HEAD`, not local `git status` — local `git status` has repeatedly misreported "ahead by N commits" even when fully in sync. Also worth cross-checking against the Vercel connector's `list_deployments`/`get_deployment` — the latest deployment's `meta.githubCommitSha` should match your pushed commit, and its `alias` array should include `library.abundancecitadel.app`.
* Cloud-sync placeholders: files may show as cloud-only placeholders in a fresh sandbox. Force a download by calling `Read` on the file's Windows path; delegate bulk syncing to a subagent rather than burning main-conversation context if this comes up.
* Vercel: project `prj_Ffqa5Al9DmYUM6R55pinzrUqhauk`, team `team_kX9yMR3zOn2rwRiu1Xkr1gXO`. Framework Preset must stay "Next.js," Deployment Protection stays off.
* Live site: `https://library.abundancecitadel.app` — confirmed healthy as of Session 18 (production deployment `READY`, matches the pushed commit `edcf912`). Re-verify early this session.
* Google Fonts in this sandbox: `next/font/google` (Inter + Literata) can't fetch here — proxy blocks `fonts.googleapis.com`/`fonts.gstatic.com`. Verify via a stubbed `/tmp` build (see §3) or Vercel's own build log.
* Keep updating `ROADMAP.md` and `DECISIONS.md` as you go, per every prior session's convention.

## 6. Standing instruction from Thai

At the end of every session going forward, write the next session's continuation prompt (this file's pattern) as both a committed doc (`docs/SESSION_<N+1>_CONTINUATION_PROMPT.md`, without the PAT) and as full text in the chat response (with a freshly-supplied PAT included) so Thai can paste it directly into a new chat to keep the project moving with minimal friction.
