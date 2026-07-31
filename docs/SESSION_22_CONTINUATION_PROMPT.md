# Session 22 Continuation Prompt — Personal Book Library App

Continue the personal book library app project. Before doing anything else, read
`PROJECT_BRIEF.md`, `ROADMAP.md`, and `DECISIONS.md` in full — they explain the
whole project and exactly what's been done so far. Pay particular attention to the
Stage 16 section (8-Tab Content Structure Rollout, now fully complete) and
`DECISIONS.md` #177–185 (Session 21).

## 0. Where things stand

Two big efforts both shipped and are now live in production:

1. **Stage 16 — Premium Visual Redesign.** Sliding active-tab pill, tab-panel
   transitions, elevation/motion system, generative cover gradients.
2. **The 8-Tab Content Structure Rollout (v2.1) — now fully complete, schema
   *and* UI.** `app/components/BookTabs.tsx` renders all 8 tabs (Summary,
   Chapters, Key Lessons, Concepts & Frameworks, Apply This, Highlights &
   Quotes, Critical Take, Author) in the order specified by
   `docs/CONTENT_STRUCTURE_PROPOSAL.md` §1. Verified live via Chrome browser
   tools against `book-library-app-fawn.vercel.app` — see `DECISIONS.md` #185.

**The gap now is content, not code.** As of this writing: 66 books total, 48 have
full v2 depth (`authorBio` etc.), only **11 of 66 have the three v2.1 fields**
(`conceptsFrameworks`, `applyThis`, `criticalTake`) that power the 3 new tabs —
`advanced-selling-strategies`, `all-marketers-are-liars`, `atomic-habits`,
`being-peace`, `buffett-the-making-of-an-american-capitalist`,
`building-a-story-brand`, `built-to-last`, `charlie-munger-the-complete-investor`,
`delivering-happiness`, `dotcom-secrets`, `start-with-why`. **Re-verify this count
programmatically before trusting it** — a parallel retrofit track has been actively
adding to this list across recent sessions and may have moved again. For the other
55 books, the 3 new tabs render a plain "not written yet" fallback (working as
designed, not a bug).

Thai has not specified this session's priority in advance — **ask him directly**
what to focus on before starting substantive work. Plausible candidates, roughly
in order of how "shovel-ready" they are:

- **Continue the Stage 15 v2.1 retrofit** — write `conceptsFrameworks`/`applyThis`/
  `criticalTake` for more of the 55 books that don't have them yet, following the
  established 5-book-parallel-subagent pattern (`DECISIONS.md` #104 and every
  Stage 15 session since). `docs/SCHEMA.md`'s "ConceptFramework" / "ApplyThis" /
  "CriticalTake" object specs and `docs/CONTENT_STRUCTURE_PROPOSAL.md` §3's worked
  Atomic Habits examples are the reference; `content/books/atomic-habits.json` is
  the concrete in-repo example to match tone/depth against.
- **Finish the remaining pre-v2 books** — 18 of 66 books still don't have
  `authorBio`/v2-depth sections at all (48 have it). These need the full v2 pass
  before v2.1 fields make sense to add on top.
- **The 310-book new-content pipeline** — `docs/NEW_BOOKS_BATCH_MANIFEST.json`
  exists but, per `docs/CONTENT_STRUCTURE_PROPOSAL.md` §5, needs the v2.1 fields
  folded into its batch-prompt template before that work begins in earnest (check
  whether that's already been done — it may have moved since this was written).
- **Something else entirely** — Thai may want a fresh polish/QA pass (Stage 12
  precedent, Session 11), a real cover-art decision (flagged as open in
  `docs/DESIGN_SYSTEM.md`), or anything else. Don't assume; ask.

## 1. Environment note

This prompt may run in a different account/sandbox than Session 21. Don't
hard-code a specific local path — the project's on-disk location has moved more
than once already (currently under a folder path containing "1. ABUNDANCE
CITADEL" / "2. BOOKS LIBRARY"; older docs saying "1. BOOKS LIBRARY" are stale, not
a sign of being in the wrong place).

- Check whether a local folder for this project is already connected/mounted. If
  so, verify it's the right one by opening `PROJECT_BRIEF.md` and confirming it
  says "Owner: Thai (metacitadel@gmail.com)."
- If no local folder is connected, or `book-library-app/` isn't in it, clone fresh
  from GitHub — public repo, no auth needed for a read-only clone:
  `git clone https://github.com/AbundanceCitadel/book-library-app.git`
- Either way, once you have the repo: `git fetch origin main`, then compare
  `git rev-parse HEAD` vs `git rev-parse origin/main` before trusting anything
  else about git state — don't trust `git status`'s summary line alone (it has
  repeatedly misreported state across many past sessions). `origin/main` should
  be at or past commit `b9b0d49` ("Session 21: log post-deploy Chrome visual
  verification") as of this writing.
- Thai will very likely need to supply a fresh **classic** GitHub PAT (not
  fine-grained — fine-grained tokens have failed with 403 in every prior session)
  when you're ready to push. Ask for it if it wasn't included with this prompt.
  Never write it to disk or commit it.
- If you need to run `tsc`/`npm run build` and the synced folder's own
  `node_modules` gives strange errors (e.g. `Cannot find global type 'Object'`,
  `lib.dom.d.ts not found`), don't assume the code is broken — check whether
  `node_modules/typescript/lib/` actually has all its files first. Session 21 hit
  exactly this (a partial/broken cloud-sync copy, `node_modules/.bin` missing
  entirely) and worked around it with the standard `/tmp`-mirror + fresh
  `npm install` (fast, ~6s, since most packages are already in the local npm
  cache) — see `DECISIONS.md` #183.

## 2. Standing project mechanics — read before touching git

- The synced folder's own `.git` has a recurring stale `index.lock` that blocks
  direct `git commit`/`git add` (intermittent, not fixed — has recurred across
  many sessions, reproduced again in Session 21). Try a direct commit first; if
  it fails, use the `/tmp`-clone-and-rsync pattern (now proven reliable across
  at least 3 sessions in a row): fresh `git clone` of `origin/main` into a
  scratch `/tmp` directory, `rsync -a --delete` (excluding `.git`/`node_modules`/
  `.next`) your actual working-tree changes on top, build-verify in that clone,
  commit and push from there.
- **Only stage/commit the files you actually changed** — don't `git add -A`
  blindly. The working tree will very likely have in-progress, uncommitted
  `content/books/*.json` changes from a parallel retrofit track when you start
  (it did in Session 21 — 4 books' worth). Check `git status` and diff against
  `origin/main` file-by-file before assuming something is "your" change; leave
  anything you didn't personally write untouched, per the established pattern
  (`DECISIONS.md` #161, #173, repeated in #177 this session).
- Push authentication: use a classic GitHub PAT supplied inline, never persisted:
  `git push "https://<PAT>@github.com/AbundanceCitadel/book-library-app.git" main`
  If it's expired or rejected with a 403, ask Thai for a fresh classic token
  rather than debugging further.
- After a push, verify with `git ls-remote origin main` (or the unauthenticated
  `git ls-remote https://github.com/AbundanceCitadel/book-library-app.git main`)
  compared to your local `git rev-parse HEAD` — not local `git status`.
- **No Vercel MCP connector was available in Session 21's sandbox** (only
  Netlify/Airtable/registry tools) — this may or may not be true for your
  session; check your own tool list. If a Vercel connector is available, use it
  to confirm the deploy (`list_deployments`/`get_deployment`: latest deployment's
  `meta.githubCommitSha` should match your pushed commit, target `production`,
  alias list including `library.abundancecitadel.app`). If not, verify the
  old-fashioned way like Session 21 did: fetch the live URL directly after
  waiting ~40–80s for the auto-deploy, and if one `.vercel.app` alias returns a
  stale/cached-looking result, try the *other* alias
  (`book-library-app-abundance-citadel.vercel.app` vs
  `book-library-app-fawn.vercel.app`) before concluding something's wrong — one
  simply may not have finished propagating yet.
- `library.abundancecitadel.app` (the custom domain) has intermittently timed out
  on `web_fetch` across multiple past sessions (Sessions 10, 16, 21) — treat this
  as the known DNS/cert flakiness, not a deploy problem, and fall back to the
  `.vercel.app` aliases to confirm the deploy itself is healthy.
- Vercel: project `prj_Ffqa5Al9DmYUM6R55pinzrUqhauk`, team
  `team_kX9yMR3zOn2rwRiu1Xkr1gXO`. Live site: `https://library.abundancecitadel.app`.
- Google Fonts (`next/font/google`, Inter + Literata) can't be fetched from the
  sandbox — verify via the stubbed `/tmp` build or Vercel's own build log, never
  by committing a stub into the real source (`git checkout -- app/layout.tsx` or
  simply never touch the real file, only a `/tmp` copy, before committing).

## 3. If Chrome browser tools are available

Session 21 found that `resize_window` reports success but does **not** actually
shrink the real browser viewport on Thai's machine (`window.innerWidth` stayed at
the desktop value regardless of the requested size) — this may be a persistent
quirk of the extension/OS combination, or session-specific; worth re-testing
rather than assuming it's fixed or still broken. If you need a genuine narrow-
viewport check and `resize_window` doesn't work, the workaround Session 21 used:
inject a CSS width constraint directly onto the element you care about via
`javascript_tool` and read `getBoundingClientRect()`/computed styles off the real
DOM — this validates the actual CSS behavior (e.g. "does this ever wrap") even
without a truly narrow window. Also: **prefer real mouse clicks
(`computer` tool's `left_click`) over synthetic `element.click()` calls** in any
JS you inject to test interactive state — Session 21 found synthetic clicks gave
misleading stale-by-one-step results for state that depends on `useLayoutEffect`,
which trusted clicks didn't.

## 4. Standing instruction from Thai

At the end of this session, write the next session's continuation prompt (this
file's pattern) as both a committed doc (`docs/SESSION_23_CONTINUATION_PROMPT.md`,
without any PAT) and as full text in the chat response (with a freshly-supplied
PAT included) so Thai can paste it directly into a new chat to keep the project
moving with minimal friction.
