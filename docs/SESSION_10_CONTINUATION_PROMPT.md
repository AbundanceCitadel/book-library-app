# Continuation Prompt — Paste This Into a New Chat

Continue the personal book library app project. Before doing anything else, read these three files in full:
`C:\BACKUP2026\1. BOOKS LIBRARY\book-library-app\PROJECT_BRIEF.md`
`C:\BACKUP2026\1. BOOKS LIBRARY\book-library-app\ROADMAP.md`
`C:\BACKUP2026\1. BOOKS LIBRARY\book-library-app\DECISIONS.md`
They explain the whole project and exactly what's been done so far. Pay particular attention to the Session 9 log in `ROADMAP.md` and `DECISIONS.md` #96–102 (git-history reconciliation, JSON bug fix) and Stage 15 (v2 content retrofit, currently 3 of 66 books done).

## 0. Why this prompt exists — read this first

Session 9 verified and pushed the font/spacing/mobile readability fixes from the Session 8 handoff, fixed a real JSON-escaping bug in `content/books/the-lean-startup.json`, and discovered/reconciled a git-history divergence (this sandbox's local `.git` had fallen out of sync with the real GitHub history — see `DECISIONS.md` #100 for the full diagnosis before touching git in this project again). Everything from that session is committed and pushed (`53c86f2`, then `5374840` for doc updates), and the Vercel deploy is confirmed live.

Right after that, in the same chat, Thai asked to add a custom domain — `library.abundancecitadel.app` — to the Vercel project, pointing at his existing VentraIP-registered domain `abundancecitadel.app`. Progress so far:
1. Thai added the domain in the Vercel dashboard (Settings → Domains → Add). Vercel returned a specific CNAME target: `07bea3e5be793602.vercel-dns-017.com` (this is deployment-specific, not the generic `cname.vercel-dns.com` — don't second-guess it if it looks unfamiliar).
2. Thai added the matching CNAME record in VentraIP's DNS Hosting panel: `library.abundancecitadel.app` → `07bea3e5be793602.vercel-dns-017.com`, confirmed correct by inspecting a screenshot of the VentraIP DNS records table.
3. **As of the end of the last session, this had not yet propagated/verified** — `get_project` on `prj_Ffqa5Al9DmYUM6R55pinzrUqhauk` still only listed the default `*.vercel.app` domains (no `library.abundancecitadel.app`), and fetching `https://library.abundancecitadel.app/` returned an empty response. This is expected/normal for a freshly-added DNS record (propagation is usually minutes, sometimes up to a couple hours) — it is NOT a sign anything is misconfigured.

## 1. Immediate first step this session

Check whether the domain has verified and gone live:
1. Call the Vercel MCP `get_project` tool (project ID `prj_Ffqa5Al9DmYUM6R55pinzrUqhauk`, team ID `team_kX9yMR3zOn2rwRiu1Xkr1gXO`) and check whether `domains` now includes `library.abundancecitadel.app`.
2. Fetch `https://library.abundancecitadel.app/` (via `web_fetch` — this sandbox's direct `curl` to production URLs has failed in past sessions due to network egress restrictions, so prefer `web_fetch` first) and confirm it renders the real homepage content (376 titles, 66 summaries, category grid), not an empty/error response.
3. If it's live: tell Thai it's confirmed working, and ask if he wants `library.abundancecitadel.app` set as the **primary** production domain (Vercel lets you mark one domain as primary so the others 308-redirect to it) — this wasn't asked/decided yet, flag it as a quick judgment call for him rather than assuming either way.
4. If it's still not verified: don't re-diagnose the DNS record (it was already confirmed correct against what Vercel asked for) — just tell Thai it's still propagating and it's fine to check back again later, and offer to keep the rest of the session moving on the content retrofit (Section 2) in parallel rather than blocking on it.

## 2. After that's resolved (or in parallel with waiting) — resume the Stage 15 v2 content retrofit

Per Thai's Session 8 decision (`DECISIONS.md` #95, `ROADMAP.md` Stage 15): retrofit all 66 existing book entries to v2 depth before resuming any new-title content batches (Stage 7/10, still paused).

**Current state: 3 of 66 books are already done** — Atomic Habits (Session 8 pilot), and Essentialism + The Lean Startup (discovered mid-Session-9 already partially retrofitted from an earlier unfinished pass, completed and committed that session). **63 books remain.**

What "v2 depth" means per book (full detail in `docs/SCHEMA.md` and `docs/CONTENT_PIPELINE.md`):
- Each section (`sections[].summary`) rewritten to ~3 paragraphs (intro/substance/conclusion arc), blank-line separated.
- New per-section `keyLessons` (2–4 bullets) distinct from the book-level `keyLessons`.
- `quotes` expanded from the old 3–5 to **20–30**, each with a `category` label grouped into 4–6 themes, each quote verified against a real source (author's own site, publisher excerpt, or established quote-aggregator page) via web search — not recalled from memory alone. Use Essentialism's `sourceNotes` field as a model for how to document verification sources.
- New `authorBio` object (`name`, `bio` — 2–4 paragraphs, `notableWorks` — empty array if genuinely a one-book author).

**Treat this as a multi-session content batch, not a one-sitting sweep** — `docs/CONTENT_PIPELINE.md` flags v2 as a multi-x effort increase per book (quote verification research + author-bio research + ~3x the section-writing volume). Pick a manageable batch (5–10 books, not all 63), do each one properly (web search for quotes/author bio, write the paragraphs, validate against `docs/SCHEMA.md`), confirm a clean build, commit, and report progress — then continue in later sessions.

No retrofit order has been fixed yet (candidates: alphabetical, by category, or oldest-written-first) — use judgment, or ask Thai if he has a preference.

## 3. Standing project mechanics (unchanged, read before touching git)

- **This sandbox's local git history can silently diverge from the real GitHub `main`.** Before assuming a local commit history is authoritative, `git fetch origin main` and compare — if `git rev-list --count HEAD..origin/main` is nonzero, the remote has commits the local `.git` doesn't know about (see `DECISIONS.md` #100 for exactly what happened in Session 9 and how it was fixed). **Never force-push** to resolve a divergence without first confirming the working tree's actual file content is a superset of `origin/main` — reconcile with `git reset --mixed origin/main` (keeps working-tree files, moves HEAD/index to match remote) then re-commit the real diff, rather than overwriting remote history.
- **Git mechanics:** mirror the repo to `/tmp` with `tar` (excluding `.git_old*`/`.git_broken*`/`node_modules`/`.next`), commit and push from there, then bring the updated `.git` back into the synced folder via `mv <old .git> .git_old<N>_<timestamp>` (never `rm -rf` — it fails with `Operation not permitted` on this mount) followed by `cp -r` of the fresh `.git`.
- **Push authentication:** needs a classic GitHub PAT (`ghp_...` prefix) from Thai — fine-grained tokens (`github_pat_...`) have been rejected with a 403 in every session that's tried one (Sessions 3, 7, 8, 9). Ask for a classic one directly if you need to push and don't have one in context.
- **Cloud-sync placeholders:** files in the project folder may show as cloud-only placeholders in a fresh sandbox (bash `cat`/`grep` fails with an I/O error). The only fix is calling the `Read` tool on the file's Windows path to force a download — if this affects many files (e.g. all of `content/books/*.json`), delegate that mechanical sync-and-verify step to a subagent rather than doing 60+ Read calls in the main conversation and burning context.
- **Vercel:** project `prj_Ffqa5Al9DmYUM6R55pinzrUqhauk`, team `team_kX9yMR3zOn2rwRiu1Xkr1gXO`. Framework Preset must stay "Next.js" (Session 7 fix, `DECISIONS.md` #83) and Deployment Protection should stay off (`DECISIONS.md` #84) — no need to re-check either unless something regresses.
- **Google Fonts in this sandbox:** `next/font/google` (Inter + Literata) can't fetch here — this sandbox's network proxy blocks `fonts.googleapis.com`/`fonts.gstatic.com`. Verify builds either by trusting Vercel's own build log (unrestricted egress) or by stubbing the two font-loader calls in a throwaway `/tmp` copy only, never the real source.
- Keep updating `ROADMAP.md` and `DECISIONS.md` as you go.
