# Continuation Prompt — Paste This Into a New Chat

Continue the personal book library app project. Before doing anything else, read these three files in full:
`D:\BACKUP2026\1. BOOKS LIBRARY\book-library-app\PROJECT_BRIEF.md`
`D:\BACKUP2026\1. BOOKS LIBRARY\book-library-app\ROADMAP.md`
`D:\BACKUP2026\1. BOOKS LIBRARY\book-library-app\DECISIONS.md`
They explain the whole project and exactly what's been done so far. Pay particular attention to the Stage 15 section and the Session 8 entries in `ROADMAP.md`, and `DECISIONS.md` #86–95.

## 0. Why this prompt exists — read this first

Session 8 executed the full Stage 15 design/content-model overhaul (dark-mode-first design system, new typography, collapsible home page, tabbed book detail page, expanded content schema, and a migrated Atomic Habits example) — all committed, pushed, and confirmed live on Vercel.

Immediately after that, in the same chat, Thai gave three pieces of follow-up feedback:
1. Paragraphs in book content were reading as visually "stuck together" — needs a clearly visible gap between paragraphs, not just a slightly taller line.
2. The reading font wasn't easy enough to read (was **Newsreader**).
3. Reiterated that everything must stay mobile-friendly.

In response, these code changes were made and **saved directly to the real project files** (confirmed via the file-edit tool, independent of the sandbox):
- `app/layout.tsx` / `tailwind.config.ts`: swapped the reading font from **Newsreader** to **Literata** (Google's font built specifically for Play Books' on-screen reading — higher x-height, holds up better on phone screens, weights pinned to 400/500/600 so it never renders thin). UI font (Inter) unchanged.
- `app/globals.css`: bumped `.prose-reading` body size from 16px to 17px with looser line-height (1.8), and increased the paragraph gap from `margin-top: 1.25em` to `1.6em` so paragraph breaks are unmistakable, not subtle.
- `app/components/BookTabs.tsx`: replaced a hardcoded `top-[57px]` sticky offset with the cleaner Tailwind `top-14` for the tab bar.

**None of this has been verified or deployed yet.** Right after making these edits, the sandbox's Linux shell ran out of disk space at the infrastructure level — even `echo hello` failed with "no space left on device," and after 5 identical failures the tool itself flagged the session as wedged and said not to retry. That's why a fresh chat is needed: a new session gets a new sandbox with a clean disk, and since the file edits above are already saved to the real project folder (not the sandbox), the new session should see them immediately without redoing any of this work.

## 1. Immediate first steps this session

1. **Before anything else, check `/tmp` disk usage in the new sandbox and clean up stale build artifacts if space is tight.** Multiple past sessions (5 through 8) left `/tmp` directories behind from the `/tmp`-mirror git workaround and local build-verification passes — names like `blapp_build*`, `blapp_commit*`, `blapp_redeploy`, `blib_work`, `blib_repo.tar`, `blib_git_new.tar`, `blapp_s8commit*`, `blapp_s8v2`, `blapp_s9check`, etc. If a fresh sandbox still shows heavy `/tmp` usage from a prior session's leftover state, clear old ones (`rm -rf /tmp/blapp_* /tmp/blib_*` or similar, being careful not to delete anything the current session just created) before running `npm install`/`npm run build`, since Next.js builds plus repeated `npm install` in `/tmp` mirrors is exactly what filled the disk last time.
2. **Verify the font/spacing/mobile changes described in Section 0 are actually present** in `app/layout.tsx`, `tailwind.config.ts`, `app/globals.css`, and `app/components/BookTabs.tsx` (they should be — this was confirmed saved before the sandbox died). If for some reason they're missing, the changes are also fully described in Section 0 above and can be re-applied from that description.
3. **Run a clean `npm run build`** (via the standard `/tmp` mirror pattern — see Section 3 below) to confirm those changes compile and render correctly. Note: this sandbox's network proxy has, in past sessions, blocked `fonts.googleapis.com`/`fonts.gstatic.com` specifically (confirmed via a direct `curl` 403 test in Session 8) — if `next/font/google`'s fetch fails here again, that's a known sandbox-only limitation, not a real bug; verify the rest of the build by temporarily stubbing the two font-loader calls in a **throwaway `/tmp` copy only** (never the real synced source), the same workaround used in Session 8 (see `DECISIONS.md` #89).
4. **Commit and push** using the standard `/tmp`-mirror-and-copy-back workaround (Section 3). A classic GitHub PAT (`ghp_...` prefix) has worked in every session that's needed one; a fine-grained token (`github_pat_...` prefix) has been rejected with a 403 every time it's been tried (Sessions 3, 7, 8) — ask Thai for a classic PAT if one isn't already available in context, and don't bother retrying a fine-grained one.
5. **Confirm the deploy went live** — Vercel auto-deploys from GitHub pushes; use the Vercel MCP tools (`list_deployments`, `get_deployment`, project ID `prj_Ffqa5Al9DmYUM6R55pinzrUqhauk`, team ID `team_kX9yMR3zOn2rwRiu1Xkr1gXO`) to confirm `READY`, then fetch `https://book-library-app-abundance-citadel.vercel.app` directly (add a `?v=cachebust` query param if the response looks stale) to confirm the new font/spacing actually render in production, the same way Session 8 verified its own deploy.

## 2. After that's confirmed — resume the v2 content retrofit

Thai's decision from Session 8 (`DECISIONS.md` #95, `ROADMAP.md` Stage 15): **retrofit all 66 existing book entries to v2 depth**, pausing any new-title content batches (Stage 7/10) until that's done. This has **not started yet** beyond the Atomic Habits pilot migration itself.

What "v2 depth" means per book (see `docs/SCHEMA.md` and `docs/CONTENT_PIPELINE.md` for full detail):
- Each section (`sections[].summary`) rewritten to ~3 paragraphs (intro/substance/conclusion arc), blank-line separated.
- New per-section `keyLessons` (2–4 bullets) distinct from the book-level `keyLessons`.
- `quotes` expanded from the old 3–5 to **20–30**, each with a `category` label, grouped into 4–6 themes — and each quote verified against a real source (the author's own site, a publisher excerpt, or an established quote-aggregator page) rather than recalled from memory alone, exactly like the Atomic Habits pilot did against jamesclear.com.
- New `authorBio` object (`name`, `bio` — 2–4 paragraphs, `notableWorks` — empty array if genuinely a one-book author).

**Treat this exactly like a content batch, not a one-sitting sweep.** `docs/CONTENT_PIPELINE.md` explicitly flags v2 as a multi-x effort increase per book (quote verification research + author-bio research + ~3x the section-writing volume) — the original 66 were written across multiple sessions in batches of 10–20, and retrofitting at this depth will realistically go slower than that per session. Pick a manageable batch (a handful of books, not all 66), do each one properly (web search for quotes/author bio, write the paragraphs, validate against `docs/SCHEMA.md`), confirm a clean build, commit, and report progress — then continue in later sessions rather than promising all 66 in one pass.

No retrofit order has been fixed yet. Reasonable options: alphabetical, by category (e.g. start with a thin category so it's fully "v2-consistent" sooner), or oldest-written-first. Use judgment, or ask Thai if he has a preference — it wasn't specified.

## 3. Standing project mechanics (unchanged from prior sessions)

- **Git:** use the `/tmp` mirror workaround — mirror the repo (**including** `.gitignore`, which past sessions have accidentally excluded with an overly broad `.git*` tar exclude pattern — exclude `.git`/`.git_old*`/`.git.old*` specifically, not `.git*`), commit and push from there, then `mv` the synced folder's `.git` aside and `tar`-copy the fresh one back in. This works even with the synced folder's recurring stale `index.lock`/`maintenance.lock` bug, which is expected to still be present.
- **Vercel:** project is on the Next.js framework preset (confirmed correct as of Session 7) with deployment protection intentionally off (Session 7, `DECISIONS.md` #82–84) — no need to re-check either unless something regresses.
- Keep updating `ROADMAP.md` and `DECISIONS.md` as you go, including logging this session's font/readability fix and however much of the retrofit gets done.
