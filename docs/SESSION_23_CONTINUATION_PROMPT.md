# Session 23 Continuation Prompt — Personal Book Library App

Continue the personal book library app project. Before doing anything else, read
`PROJECT_BRIEF.md`, `ROADMAP.md`, and `DECISIONS.md` in full — they explain the
whole project and exactly what's been done so far. Pay particular attention to
Stage 21 (Nine-Section Detail-Page Schema/Architecture, this session) and
`DECISIONS.md` #186–193.

## 0. Where things stand

**Two independent tracks now exist in this project, and they don't block each
other:**

1. **The original book library** (Stages 0–20) — 66 of 377 catalog titles have
   full content, `BookTabs.tsx`'s 8-tab structure is complete and live in
   production. See `docs/SESSION_22_CONTINUATION_PROMPT.md` for that track's own
   detailed status (still accurate as a description of the book-content gap;
   re-verify the specific counts before trusting them, a parallel retrofit track
   may have moved them).
2. **The nine-section expansion** (this session, Stage 21) — schema, types,
   loaders, and detail-page UI now exist for all 8 new sections (People, Rich
   List, Rulers, Organizations, Companies, Civilizations, Philosophies, Quotes),
   matching the approved proposal in `New Section Research/
   Section_Detail_Tab_Structures.md`. **Structure only — zero content has been
   written.** Full field spec in `docs/SECTIONS_SCHEMA.md`.

## 1. What's built (Stage 21) and what isn't

Built this session:
- `lib/people.ts`, `lib/richlist.ts`, `lib/rulers.ts`, `lib/organizations.ts`,
  `lib/companies.ts`, `lib/civilizations.ts`, `lib/philosophies.ts`,
  `lib/quotes.ts` — one TypeScript type + loader pair each, reading
  `content/<section>/*.json` (directories don't exist yet).
- `lib/sectionTypes.ts`, `lib/relatedTypes.ts`, `lib/related.ts`,
  `lib/sectionLoader.ts` — shared plumbing (see `docs/SECTIONS_SCHEMA.md` §0/§8).
- `app/components/SectionTabs.tsx`, `SectionBlocks.tsx`, `RelatedLinks.tsx`,
  `NotWritten.tsx`, plus one `*Tabs.tsx` per section
  (`PeopleTabs`/`RichListTabs`/`RulersTabs`/`OrganizationsTabs`/
  `CompaniesTabs`/`CivilizationsTabs`/`PhilosophiesTabs`) and
  `QuotesBrowser.tsx`.
- Routes: `app/people/[id]/page.tsx` through `app/philosophies/[id]/page.tsx`
  (7 routes) + `app/quotes/page.tsx`.
- `docs/SECTIONS_SCHEMA.md` — the field-level spec, mirroring `docs/SCHEMA.md`'s
  format.

**Not built, deliberately** (per this session's own scope — see
`docs/SECTIONS_SCHEMA.md` §10):
- No real content — the 8 candidate lists in `New Section Research/`
  (`people.md`, `richlist.md`, `quotes.md`, `rulers.md`, `organizations.md`,
  `companies.md`, `civilizations.md`, `philosophies.md`) are untouched, still
  one-line candidate entries, not full JSON content.
- No home-page/nav wiring — there's no link anywhere in the live app to
  `/people`, `/richlist`, etc. yet. Only direct URLs work, and only once content
  exists (`generateStaticParams()` returns `[]` today, so these routes currently
  render `notFound()` for every id).
- No category/browse-listing pages for the 8 sections (e.g. an `/people` index
  page listing all people) — only the `[id]` detail-page shape was in scope.
- `content/<section>/` directories don't exist on disk at all yet.

## 2. Suggested next step — ask Thai, don't assume

Two genuinely different directions are both "shovel-ready" from here. **Ask Thai
directly which he wants** rather than picking for him:

- **(A) Continue the nine-section track: start the content-gathering pass.**
  Turn `New Section Research/people.md`'s 52 one-line candidates (or another of
  the 7 non-Quotes files) into real `content/people/*.json` entries matching
  `lib/people.ts`'s `Person` type — likely a parallel-subagent batch pattern
  similar to the book retrofit's established 5-at-a-time approach
  (`DECISIONS.md` #104). Each entry needs Overview, Timeline & Career, Key
  Achievements, Notable Quotes, Legacy & Impact, and Critical Take at minimum
  (Ideas & Principles optional per §1's schema notes) — same copyright/
  original-synthesis discipline as book content (`PROJECT_BRIEF.md` §6), quotes
  the one exception for exact wording. Once a few sections have real entries,
  build the home-page/nav wiring and category/browse pages that were
  deliberately skipped this session.
- **(B) Continue the original book library track** — see
  `docs/SESSION_22_CONTINUATION_PROMPT.md` §0 for that track's own candidate
  next steps (v2.1 retrofit, remaining pre-v2 books, or the 310-book pipeline).
  Still valid, this session didn't touch it.

Don't start bulk content-writing for the nine-section track without Thai's
explicit go-ahead on which section(s) to prioritize first — `richlist.md`'s
README already flags its net-worth figures as needing a refresh pass before
becoming real app data, which may affect sequencing.

## 3. Environment note

This prompt may run in a different account/sandbox than Session 22/23's own
authors. Don't hard-code a specific local path.

- Check whether a local folder for this project is already connected/mounted.
  If so, verify it's the right one by opening `PROJECT_BRIEF.md` and confirming
  it says "Owner: Thai (metacitadel@gmail.com)."
- If no local folder is connected, or `book-library-app/` isn't in it, clone
  fresh from GitHub — public repo, no auth needed for a read-only clone:
  `git clone https://github.com/AbundanceCitadel/book-library-app.git`
- Either way, once you have the repo: `git fetch origin main`, then compare
  `git rev-parse HEAD` vs `git rev-parse origin/main` before trusting anything
  else about git state.
- **This session did not commit or push** (no PAT available) — the working
  tree has real, uncommitted Stage 21 changes (every file listed in §1 above,
  plus updates to `ROADMAP.md`/`DECISIONS.md`) sitting on top of whatever
  `origin/main` was at when this session started. Check `git status` /
  `git diff --stat` carefully before assuming a clean start; don't discard
  these changes.
- Thai will very likely need to supply a fresh **classic** GitHub PAT (not
  fine-grained — fine-grained tokens have failed with 403 in every prior
  session) when you're ready to push. Never write it to disk or commit it.
- **If `tsc`/`next build` gives strange errors against the synced folder's own
  `node_modules`** (missing `.bin`, `Cannot find module 'next/navigation'`,
  `lib.dom.d.ts not found`, etc.), don't assume the code is broken — this has
  now recurred across multiple sessions (`DECISIONS.md` #183, #192). This
  session found the previously-standard `/tmp`-mirror workaround itself
  blocked (permission errors), and that the scratch/outputs mount shared the
  same rename/delete restriction as the cloud-synced project folder. What
  worked: mirroring the project into the sandbox's home directory *outside*
  any `mnt/`-prefixed mount (i.e. not under the path containing "BOOKS
  LIBRARY" or "outputs") and running `npm install` there instead — see
  `DECISIONS.md` #192 for the full diagnosis. Try that location first if you
  hit the same wall; it may or may not still apply depending on your sandbox.

## 4. Standing project mechanics — read before touching git

- The synced folder's own `.git` has a recurring stale `index.lock` that
  blocks direct `git commit`/`git add` (intermittent, recurring across many
  sessions). Try a direct commit first; if it fails, use the clone-and-rsync
  pattern: fresh `git clone` of `origin/main` into a scratch directory (see §3
  above for where that scratch directory should live this session),
  `rsync -a --delete` (excluding `.git`/`node_modules`/`.next`) your actual
  working-tree changes on top, build-verify there, commit and push from there.
- **Only stage/commit the files you actually changed** — don't `git add -A`
  blindly. Check `git status`/diff against `origin/main` file-by-file before
  assuming something is "your" change.
- Push authentication: use a classic GitHub PAT supplied inline, never
  persisted: `git push "https://<PAT>@github.com/AbundanceCitadel/book-library-app.git" main`
- After a push, verify with `git ls-remote origin main` compared to your local
  `git rev-parse HEAD` — not local `git status`.
- Vercel: project `prj_Ffqa5Al9DmYUM6R55pinzrUqhauk`, team
  `team_kX9yMR3zOn2rwRiu1Xkr1gXO`. Live site:
  `https://library.abundancecitadel.app`. `library.abundancecitadel.app` has
  intermittently timed out on `web_fetch` across multiple past sessions — fall
  back to the `.vercel.app` aliases to confirm the deploy itself is healthy.
- Google Fonts (`next/font/google`, Inter + Literata) can't be fetched from the
  sandbox — verify via a stubbed scratch-copy build only, never by committing a
  stub into the real `app/layout.tsx`.

## 5. Standing instruction from Thai

At the end of this session, write the next session's continuation prompt
(this file's pattern) as both a committed doc
(`docs/SESSION_24_CONTINUATION_PROMPT.md`, without any PAT) and as full text
in the chat response (with a freshly-supplied PAT included, if pushing) so
Thai can paste it directly into a new chat to keep the project moving with
minimal friction.
