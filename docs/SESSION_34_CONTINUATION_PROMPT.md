# Continuation Prompt — Nine-Section Population Pass, Round 6

Continue `book-library-app` (`github.com/AbundanceCitadel/book-library-app`).
Read `PROJECT_BRIEF.md`, `ROADMAP.md` (Stage 21), and `DECISIONS.md`
(#291-297 especially, and #285-290 for Round 4) in full first, per the
standing rule. **Book pipeline stays parked this pass too** — same scope
restriction as Sessions 29-33, still in effect until Thai says otherwise.

## 1. Where things stand

Round 5 (this session) gave Civilizations its 2nd entry: Byzantine Empire,
cross-linked bidirectionally with the existing Roman Empire entry. Section
totals: People 10, Quotes 6, Rich List 2, Rulers 2, Philosophies 2,
Civilizations 2, Organizations 1, Companies 1 — 26 entries total across 8
sections. **Organizations and Companies are now the only 2 sections still
stuck at exactly 1 entry.**

## 2. Two stale-docs traps, still open (unchanged since Round 3)

- `docs/SCHEMA_SECTIONS.md` and `New Section Research/
  Section_Detail_Tab_Structures.md` describe the pre-merge schema shape.
  Always read the real `lib/<section>.ts` file on `origin/main` directly
  before writing any new entry.
- `scripts/validate_sections.py`'s required-field lists are stale and
  currently false-fail every entry in the library. Still not fixed —
  still a good scoped task for a future session with spare time. Keep
  relying on `npx tsc --noEmit` + a manual type-shape check instead.

## 3. Round 6 — suggested default

Give Organizations or Companies their 2nd entry — whichever this session
picks, the other becomes the last 1-entry section standing, a clean
target for Round 7. Both have real, untouched candidate lists:

- **Organizations** (`New Section Research/organizations.md`, 39
  candidates across 8 categories) — WHO is the only entry
  (International/Government Bodies). A 2nd pick from a different
  category would round out the section — the IMF or Federal Reserve
  (Central Banks & Financial Institutions), the ICRC or Doctors Without
  Borders (Major Charities & NGOs), or the IOC (Sports Governing Bodies)
  are all well-documented with real founding-hook material already in
  the candidate file.
- **Companies** (`New Section Research/companies.md`, ~35 candidates
  across 8 industries) — Apple Inc. is the only entry (Tech). Toyota or
  Ford (Automotive), Coca-Cola or LEGO (Consumer Goods/Food), or Walmart
  or Amazon (Retail) all have strong founding-story hooks already
  sketched in the file and would diversify the section beyond a single
  tech giant.

Unlike Round 5's Byzantine Empire pick (a direct continuation of an
existing entry), neither Organizations nor Companies has an equivalent
"obvious pairing" candidate this round — pick based on genuine research
quality/source availability for the specific candidate chosen, same as
Round 3's WHO backfill did. No reuse shortcut exists for either section;
this needs real research (subagent-dispatched or direct, web search for
any fact that might be time-sensitive — e.g. a company's current CEO,
market cap, or an organization's current leadership/member count/budget,
following Round 3's WHO precedent, decision #282).

Per Thai's standing instruction, don't stop and wait for an answer — pick
one section and entry (say which, and why), flag the alternative, and
keep going.

## 4. Environment notes (carried forward, still accurate as of this round)

- Do all git work in a fresh `/tmp` clone (`git clone
  https://github.com/AbundanceCitadel/book-library-app.git /tmp/<name>`,
  no auth needed, public repo) — the connected local folder's `.git`
  blocks `unlink()` (fuse mount).
- `npx tsc --noEmit` and a full `npx next build` both completed within
  this session's ~45-second-per-command tool limit again this round (287
  pages). If a future session's build times out partway through, `tsc
  --noEmit` clean + a manual field-shape check is an acceptable fallback
  (per decision #264), but try the full build first.
- Google Fonts (`next/font/google`) can't be fetched from the sandbox —
  stub `Inter`/`Literata` in the `/tmp` clone only when running a build,
  `git checkout -- app/layout.tsx` before staging so the real file is
  never touched.
- Pushing needs a classic GitHub PAT from Thai, supplied inline, never
  persisted: `git push "https://<PAT>@github.com/AbundanceCitadel/book-library-app.git" main`.
- Verify a push via `git ls-remote origin main` matching local
  `git rev-parse HEAD`. Live-site verification via `library.abundancecitadel.app`
  has been unreliable immediately after a push in recent sessions —
  routes that build cleanly locally sometimes come back blank on the
  first fetch attempt or two, most likely normal Vercel deploy-propagation
  lag rather than a real problem (confirmed: the same routes resolved
  fine on retry in earlier sessions). Don't over-index on an immediate
  blank fetch; retry once or twice with a short wait before flagging it
  as a real issue.

## 5. Process reminder

Same mechanics as Rounds 1-5: work in a `/tmp` clone, validate with `tsc
--noEmit` (+ full build), commit only the files actually changed, get a
PAT, push, verify via `git ls-remote` + the live site, log every judgment
call in `DECISIONS.md`, update `ROADMAP.md` Stage 21's status paragraph,
write the next continuation prompt
(`docs/SESSION_35_CONTINUATION_PROMPT.md`) before stopping.
