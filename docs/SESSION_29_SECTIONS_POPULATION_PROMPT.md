# Continuation Prompt — Nine-Section Population Pass, Round 1 (Sections Only — Book Pipeline Parked)

Continue the personal library app project (`book-library-app`,
`github.com/AbundanceCitadel/book-library-app`). Before doing anything
else, read `PROJECT_BRIEF.md`, `ROADMAP.md` (particularly Stage 21),
`DECISIONS.md` (particularly #213-227, and #252-257 for this session's
environment/git lessons), `docs/DESIGN_SYSTEM.md` ("Design System v6"),
and `docs/SCHEMA_SECTIONS.md` in full, per this project's standing rule.

This supersedes `docs/SESSION_24_CONTINUATION_PROMPT.md`, which set up this
exact population pass back in Session 24 (Stage 21) but was never
executed — Sessions 25-28 all continued the parallel book-quotes track
(Stage 20) instead. Thai has now explicitly redirected: **park the book
pipeline entirely for this pass and focus only on the 8 new sections.**

## 0. Scope for this pass — read this before picking up any book-related task

**Do not touch `content/books/*.json`, `docs/CONTENT_PIPELINE.md`,
`docs/SCHEMA.md`, or anything in the Stage 20 quote-retrofit track**, even
if you notice something that looks like a quick fix (e.g. the 10-book
malformed-quote flag or the 17-book empty-category flag from
`DECISIONS.md` #257/#243). Flag it if you see it, don't fix it — this pass
is scoped to the 8 non-book sections only, the same explicit narrowing
this project has applied to the book track in reverse (`DECISIONS.md`
#207/#230/#243 all flagged-not-fixed things outside a pass's stated scope).
The one exception: **read-only reuse of already-written book content**
(`authorBio`, verified `quotes[]`) as a *source* for section entries — see
§2 below. Reading from `content/books/` is fine; writing to it is not.

## 1. Verify git/environment state before trusting anything — this bit repeatedly this project

`origin/main` is at commit `a2d8a52` as of this writing ("Add Session 28
continuation prompt"), 236 books, 8 new sections each still at their
Session-24 scaffolding depth (1-2 example entries; see §3 below for the
exact count per section).

This same session (Session 28) hit two git/environment problems worth
knowing about before you start:

1. **The connected local folder's checkout may not be on `main` at all.**
   Session 28 found it on a stale, long-diverged branch
   (`redesign/premium-v3`) with a large uncommitted unrelated feature in
   it. Run `git branch -a` and `git rev-parse --abbrev-ref HEAD` first. If
   it's not on `main`, or has uncommitted changes that aren't yours, surface
   it to Thai before touching anything — don't assume it's safe to discard
   or safe to build on top of (`DECISIONS.md` #252).
2. **This sandbox's sync client may block the raw `unlink()` syscall**,
   which breaks `git add`/`git commit` directly in any `mnt/`-prefixed
   path. Check with `df -T <path>` — if it reports `fuse`, don't fight it:
   clone to `/tmp` (confirmed real `ext4`) and do all git work there
   instead (`DECISIONS.md` #253). Fetch from the real `origin` explicitly
   rather than trusting a local clone-of-a-clone's tracking refs.

## 2. The single highest-value insight for this pass: mine the book pipeline's own research before doing fresh research

The book-content pipeline has already independently researched and
verified a huge amount of exactly the raw material the People and Quotes
sections need — don't redo that work from scratch.

- **`authorBio.bio` is populated on 218 of 236 books (170 unique authors)**,
  each written from real biographical research during a prior book
  retrofit pass. Many are 1,500-3,000+ characters of substantive, sourced
  biography — e.g. Dale Carnegie (`how-to-win-friends-and-influence-people`,
  2,392 chars), James Clear (`atomic-habits`, 1,688 chars, explicitly
  sourced via web search per that book's own `sourceNotes`), Peter Lynch,
  Angela Duckworth, Jim Collins, Viktor Frankl, Benjamin Graham, Richard
  Branson, Susan Cain, Carol Dweck, Simon Sinek, and dozens more. Read the
  relevant book file's `authorBio` field first for any People-section
  candidate — it's very often 80% of a Profile entry already written,
  needing reshaping into the Profile schema (`summary`/`achievements`/
  `legacy`/`quotes`) rather than fresh research. Still re-verify anything
  you reuse against a live source if the original `sourceNotes` flags lower
  confidence — same standard as every other field in this project.
- **Books with 20-30 Stage-20-verified quotes are a ready-made source for
  the Quotes section**, the same way `content/quotes/warren-buffett.json`'s
  own example entry already reuses quotes verified during the book track
  rather than re-researching them (see that file's `relatedIds` back to
  `buffett-the-making-of-an-american-capitalist`). A book author with a
  deep, already-verified `quotes[]` array is close to a complete Quotes
  entry — pick a representative 5-8 across the book's existing categories,
  write the `about` blurb, done. Don't blindly copy all 20-30 into the
  Quotes section; curate a representative subset the way the Warren Buffett
  example does.
- This doesn't apply to Rulers, Civilizations, Organizations, Companies,
  Rich List, or Philosophies — those need real fresh research (historical
  sources, corporate history, live net-worth data), same as the Session 24
  prompt already described.

## 3. Current section state (re-verify programmatically first)

```python
import json, glob
for section in ["people","quotes","companies","richlist","rulers","civilizations","organizations","philosophies"]:
    files = glob.glob(f"content/{section}/*.json")
    print(section, len(files), [f.split('/')[-1] for f in files])
```

As of the last push: 1 entry each in people (`steve-jobs`), quotes
(`warren-buffett`), companies (`apple-inc`), civilizations
(`roman-empire`), organizations (`world-health-organization`),
philosophies (`buddhism`); 2 entries each in richlist (`elon-musk`,
`larry-page`) and rulers (`george-washington`, `julius-caesar`). 10 entries
total across 8 sections — still scaffolding depth, not real coverage of
any section (per `docs/SCHEMA_SECTIONS.md`'s own closing note).

## 4. Suggested Round 1 (a concrete starting point, not a mandate — see §7 if you want to redirect)

Given §2's efficiency insight, Round 1 should lean into **People** and
**Quotes**, picking authors who are both well-documented in this library's
own `authorBio`/`quotes[]` data *and* would meaningfully cross-link back
into the book library (the app's actual stated purpose per
`PROJECT_BRIEF.md` — helping Thai connect a quote or bio back to a book he
owns). Strong candidates already sitting in `content/books/*.json` with
rich `authorBio.bio`: Dale Carnegie, James Clear, Peter Lynch, Angela
Duckworth, Jim Collins, Viktor E. Frankl, Benjamin Graham, Richard Branson,
Susan Cain, Carol Dweck, Simon Sinek, Morgan Housel, Daniel Kahneman,
Robert Cialdini, Thomas Sowell, Gary Vaynerchuk, Daniel H. Pink — several
of which (Cialdini, Sowell, Vaynerchuk, Pink) also just got a fresh,
Stage-20-verified `quotes[]` array in round 8, making them equally strong
Quotes-section candidates in the same batch. A natural first batch: 4-5
People entries + 4-5 Quotes entries drawn from this list, cross-linked to
each other and back to their book-library entries via `relatedIds`.

Flag to Thai if he'd rather start somewhere else (Rulers, Civilizations,
and Rich List have no book-pipeline shortcut and are genuinely fresh
research — worth asking whether he wants breadth-first across all 8
sections instead of depth-first on the two sections with a head start).

## 5. Sourcing/rigor standard — identical to the book pipeline, applied per-field

- **Original synthesis only** for prose fields (`summary`, `history`,
  `foundingStory`, `riseAndFall`, `legacy`, `bio`, `culture`,
  `coreTeachings`, etc.) — never copy or lightly reword Wikipedia, a
  summary site, or any other source. This is `PROJECT_BRIEF.md` §6's
  copyright policy, project-wide, not book-specific (`docs/SCHEMA_SECTIONS.md`
  says this explicitly). Reusing/reshaping this project's *own*
  already-written `authorBio` text (§2) is fine — it's original synthesis
  this project already produced, not a third-party source.
  Non-negotiable: never copy/reword Wikipedia or any single external
  source — do web research broadly (multiple sources), then write in your
  own words, exactly like every book `summary` field already does.
- **Exact wording only** for every `quotes[]` field (People, Rulers,
  Quotes-section entries) — same standard as the book pipeline's quotes
  (`docs/SCHEMA.md`'s bar, explicitly extended to every new section per
  `docs/SCHEMA_SECTIONS.md`). Verify against a real source; never quote
  from memory alone; contamination-check any person with multiple entries
  across sections (e.g. a Ruler who's also mentioned in a Civilization's
  `notableRulers`).
- **Rich List entries need a live-sourced, dated figure** — `asOfDate` is
  required, not decorative. Re-verify Elon Musk's and Larry Page's existing
  figures if it's been more than a few weeks since 2026-08-02 (they will
  be stale), and source every new entry from a live lookup, not memory.
- **Cross-link via `relatedIds` wherever a real connection exists** —
  back into the book library (`section: "library"` for a specific book,
  `"library-category"` for a book-library category), and across the new
  sections themselves (a Ruler → their Civilization, a Company → its
  founder's People entry, a Quotes entry → the person's People entry if
  both exist). Check `lib/categories.ts` and `content/books/*.json` for
  matching book-library entries before writing a new section entry, the
  same way the Buddhism/Apple/Julius Caesar examples already do.

## 6. Process, pacing, and mechanics — same shape as the book-quotes rounds

- Researcher-only subagents, one book/person/entry per subagent, each
  writing structured output to a scratch file rather than editing
  `content/<section>/*.json` directly; merge via a single script for
  consistent formatting (identical pattern to the quote-retrofit rounds,
  see any `docs/SESSION_2*_CONTINUATION_PROMPT.md` for the exact shape).
  For §2's authorBio-reuse candidates, a subagent's job is "read this
  book's `authorBio`/`quotes[]`, reshape into the Profile/Quotes-collection
  schema, re-verify anything flagged low-confidence" rather than starting
  research from zero — say so explicitly in its brief.
- ~4-6 entries per batch, several batches per round, validate and commit
  incrementally.
- Verify with `npx tsc --noEmit` and `npm run build` this time (unlike the
  content-only book-quotes rounds, section population may touch new
  `lib/<section>.ts` files if a schema gap turns up) — both should be
  clean; fall back to the established JSON-parse sweep only if the sandbox
  hits its known SIGBUS build limitation (`DECISIONS.md` #108/#111/#128).
  Also run a JSON-schema-shape sweep (every entry has its section's
  required fields, `relatedIds` targets actually exist) — no such sweep
  exists yet for the new sections; worth writing one this round, mirroring
  the book library's duplicate-id/duplicate-code/empty-category sweep.
- Commit and push using the `/tmp`-clone workaround from §1, a classic
  GitHub PAT supplied inline by Thai (never persisted), verified live via
  direct fetch of a new section page post-deploy.
- Log every judgment call in `DECISIONS.md`, update `ROADMAP.md` Stage 21's
  status line, and write the next continuation prompt before stopping.

## 7. Thai's standing instruction (given Session 26, still in effect)

Keep working autonomously, round after round / session after session,
without stopping for approval on routine judgment calls (which specific
entry to pick next, minor tab-content wording, etc.). Two things this
prompt deliberately leaves open rather than deciding silently, per Session
24's own precedent (`docs/SESSION_24_CONTINUATION_PROMPT.md` §5): **which
section(s) to prioritize** (§4 proposes a default — People + Quotes,
depth-first — but flag it if Thai wants breadth-first instead) and
**anything that's an irreversible structural change with no undo path**
(a schema field change, a taxonomy restructure) or **requires a credential
only Thai can supply** (the GitHub PAT). Flag and continue past those,
same as every other round.
