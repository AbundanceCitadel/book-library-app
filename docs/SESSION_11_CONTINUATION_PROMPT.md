# Continuation Prompt — Paste This Into a New Chat

Continue the personal book library app project. Before doing anything else, read these three files in full:
`C:\BACKUP2026\1. BOOKS LIBRARY\book-library-app\PROJECT_BRIEF.md`
`C:\BACKUP2026\1. BOOKS LIBRARY\book-library-app\ROADMAP.md`
`C:\BACKUP2026\1. BOOKS LIBRARY\book-library-app\DECISIONS.md`
They explain the whole project and exactly what's been done so far. Pay particular attention to the Session 10 log in `ROADMAP.md` (domain check, 5-book retrofit batch, the Stage 12 pivot decided at the end of that session) and `DECISIONS.md` #103–108.

## 0. Why this prompt exists — read this first

Session 10 did three things: confirmed the custom domain `library.abundancecitadel.app` is attached and resolving over HTTP (HTTPS cert still provisioning as of that session — recheck, don't re-diagnose the DNS), retrofitted 5 more books to v2 depth (Advanced Selling Strategies, All Marketers Are Liars, Being Peace, Buffett: The Making of an American Capitalist, Building a StoryBrand — **Stage 15 now at 8 of 66**), and hit a new sandbox-environment problem: `npm run build` now crashes with `SIGBUS` in this sandbox, reproduced even on a from-scratch blank Next.js app, so it's an environment issue, not a content problem (see `DECISIONS.md` #108). Fell back to `npx tsc --noEmit` (clean) plus a JSON-parse pass over all 66 book files (clean) for verification, and confirmed the real build via Vercel's own build log once pushed. Everything from that session is committed and pushed.

**Right after that session, Thai changed direction.** Rather than continuing the book-by-book retrofit against a template/design that might still need changes, he asked to **park the retrofit** and instead do a full review-and-fix pass across the whole app first — every page, every tab, every template, all design details — so the app reaches a genuinely finished state. His words: he wants "all templates and apps to be done perfectly" so that from that point on, "all we need is to retrofit and continue with our books" — i.e., no more app/template changes should be needed once this pass is done, only content work.

**Thai also said he has specific things he wants looked at** ("we got a few to have a look at") but didn't list them in the chat that produced this prompt. **Do not guess what they are — ask him directly, first thing, before making any changes.**

## 1. Immediate first step this session

Ask Thai (in plain conversation, not necessarily a multi-choice tool) what specific pages, books, or issues he wants reviewed first — he flagged that he already has particular things in mind. Get his list before starting a broad audit, so his actual concerns don't get buried under a generic sweep.

While waiting on that, or alongside it, it's reasonable to independently pull up the live site yourself and look for obvious problems — but treat Thai's list as the priority once he gives it, not something to review after your own pass.

## 2. Do a full, systematic app/template/design audit

The goal is a genuine "nothing left to fix" bar, not a quick skim. Cover at minimum:

- **Home page:** stats strip accuracy, category accordion (all 16 categories expand/collapse correctly, book counts match `content/catalog.json` + written entries), mobile layout, dark mode (the default) and light mode toggle.
- **Category pages (`/category/[slug]`):** for a full category and a thin/empty one (e.g. `bio-religious-spiritual`), the "not yet summarized" list, book card grid layout.
- **Book detail page, all 5 tabs**, checked on **both** a fully-retrofitted v2 book (e.g. `atomic-habits`, `being-peace`) **and** a still-v1 book (e.g. `good-to-great`, any not yet retrofitted) — v1 books need to degrade gracefully (no broken empty states) since 58 of them still lack `authorBio`/`keyLessons` per section/quote categories:
  - Summary tab
  - Chapters tab (paragraph spacing, per-section key lessons rendering or graceful absence)
  - Key Lessons tab
  - Quotes tab (category grouping on v2 books, sensible fallback on v1 books)
  - Author tab (v2 books show the bio; v1 books need a real "not written yet" state, not a broken layout)
- **Typography and readability:** re-check the Literata/Inter font swap and paragraph-spacing fixes from Sessions 8–9 are still holding, especially now with several books having much longer v2 content (28-quote lists, 3-paragraph sections) — do long quote lists or long author bios overflow, truncate awkwardly, or need their own layout treatment at this new length?
- **PWA behavior:** manifest/icons/service worker still serving correctly; if there's any way to get a real on-device "Add to Home Screen" check this session, that's still an open item from Stage 5 that's never been verified on a real phone (`DECISIONS.md` #27).
- **Navigation/links:** spot-check `relatedBooks` cross-links resolve, category links from book cards work, back-to-library links work.
- **Any known open items to fold in:**
  - `essentialism.json` section 2 ("Explore") is only 1 paragraph, not the v2 3-paragraph structure the other 3 sections in that same file have — real inconsistency inside a book already marked "done," worth fixing as part of this pass.
  - The Session 10 SIGBUS build crash (`DECISIONS.md` #108) — worth a real attempt to root-cause or work around properly this session, since reliable build verification matters a lot more once you're making template/design changes (not just content) — a broken build-verification loop is a bigger risk during a design pass than during content-only batches. Things not yet tried: a different Node version if one can be installed, checking whether `next dev` (not `build`) also crashes, checking Next.js's GitHub issues for this exact signal with SWC, or simply accepting `tsc --noEmit` + a Vercel preview deploy as the verification loop for this session if a real fix isn't found quickly — don't burn the whole session on this one issue if it resists a fast fix.

## 3. Fix what needs fixing, then confirm "done"

For anything found (from Thai's list or your own audit): fix it, validate, and don't consider the pass complete until you can point to specific evidence per item (a rendered page, a passing check) that it's actually resolved — not just that a change was made. Batch related fixes into logical commits rather than one commit per tiny tweak, same as the content-batch convention.

## 4. Only after that — resume Stage 15 retrofit

Once Thai confirms the app/template/design pass is genuinely done, resume the v2 retrofit alphabetically (`DECISIONS.md` #104) starting from **"Built to Last"** (the next untouched title after Session 10's batch) — 58 books remain. Don't restart this until Thai has actually signed off that the polish pass is finished; that was the whole point of pausing it.

## 5. Standing project mechanics (read before touching git)

- **This sandbox's local git history can silently diverge from the real GitHub `main`.** Before assuming a local commit history is authoritative, `git fetch origin main` and compare — if `git rev-list --count HEAD..origin/main` is nonzero, the remote has commits the local `.git` doesn't know about (`DECISIONS.md` #100). **Never force-push** — reconcile with `git reset --mixed origin/main` then re-commit the real diff.
- **Git mechanics:** mirror the repo to `/tmp` with `tar` (excluding `.git_old*`/`.git_broken*`/`node_modules`/`.next` — **and don't let the exclude pattern also eat `.gitignore`**, that's bitten this project twice now, `DECISIONS.md` #32 and again in Session 10), commit and push from there, then bring the updated `.git` back into the synced folder via `mv <old .git> .git_old<N>_<timestamp>` (never `rm -rf`) followed by `cp -r` of the fresh `.git`.
- **Push authentication:** needs a classic GitHub PAT (`ghp_...`) from Thai — fine-grained tokens get a 403 every time (Sessions 3, 7, 8, 9, 10). Ask directly if you need to push.
- **Cloud-sync placeholders:** files may show as cloud-only placeholders in a fresh sandbox. Force a download by calling `Read` on the file's Windows path; delegate bulk syncing (e.g. all 66 book JSONs) to a subagent rather than burning main-conversation context.
- **The synced folder's `node_modules` may itself be stale/incomplete** — Session 10 found it had only 92 top-level packages with `next` entirely missing, and had to run a fresh `npm install` in the `/tmp` mirror before `next build`/`tsc` would even resolve. Check `node_modules/.bin/next` exists before assuming the synced copy is usable.
- **Vercel:** project `prj_Ffqa5Al9DmYUM6R55pinzrUqhauk`, team `team_kX9yMR3zOn2rwRiu1Xkr1gXO`. Framework Preset must stay "Next.js" (`DECISIONS.md` #83), Deployment Protection stays off (`DECISIONS.md` #84).
- **Custom domain:** `https://library.abundancecitadel.app` — attached and resolving over HTTP as of Session 10; recheck HTTPS status (likely just needs the TLS cert to finish provisioning) but don't re-touch the DNS record itself unless something actually changes.
- **Google Fonts in this sandbox:** `next/font/google` (Inter + Literata) can't fetch here — proxy blocks `fonts.googleapis.com`/`fonts.gstatic.com`. Verify via Vercel's build log, or stub the two font-loader calls in a **throwaway `/tmp` copy only**, never the real source.
- **New this session (Session 10):** `npm run build` crashes with `SIGBUS` in this sandbox — see item in Section 2 above. Confirm whether this is still happening before assuming the old build-verification workflow works as documented.
- Keep updating `ROADMAP.md` and `DECISIONS.md` as you go.
