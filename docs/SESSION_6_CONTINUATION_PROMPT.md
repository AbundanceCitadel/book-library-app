# Continuation Prompt — Paste This Into a New Chat

Continue the personal book library app project. Before doing anything else, read these three files in full:
`D:\BACKUP2026\1. BOOKS LIBRARY\book-library-app\PROJECT_BRIEF.md`
`D:\BACKUP2026\1. BOOKS LIBRARY\book-library-app\ROADMAP.md`
`D:\BACKUP2026\1. BOOKS LIBRARY\book-library-app\DECISIONS.md`
They explain the whole project and exactly what's been done so far, including Stage 7's pilot batch of 16 books already written (see `content/books/`).

This session's job is a catalog cleanup pass Thai directed explicitly in the previous chat (not judgment calls — do these directly), followed by resuming content-writing. Work through it in this order, batching the work and not stopping for permission between steps unless genuinely blocked.

## 1. Taxonomy changes (explicit, not a judgment call)

Thai wants the category list expanded and rebalanced:

- **Add a "Wine" category.** He's genuinely interested in wine and wants it as its own section, not folded into Biographies — Other. Move the existing wine reference books (Windows on the World, Wine Folly, Penfolds: Rewards of Patience, The Australian Wine Companion, and any others found during verification) into it.
- **Add a dedicated "Thich Nhat Hanh" category.** He's a fan and wants Thich Nhat Hanh's ~15-20 titles pulled out of Philosophy & Psychology into their own section rather than lumped in generally.
- **Split "Business" into more granular sections.** Thai wants to be able to go straight to the right shelf — add **Marketing** and **Sales** as new categories alongside the existing Business and Business Strategy, and re-sort the ~92 books currently under "Business" into the category that actually fits (e.g. Brian Tracy sales titles → Sales; Building a Story Brand, All Marketers Are Liars → Marketing; general entrepreneurship/consulting/networking → stays Business).
- **Mortgage books do NOT need a new category.** Keep them in Finance & Investing; just make sure they're clearly labeled/tagged (e.g. a `mortgage` tag) so they're easy to find within that section.
- This means updating: `docs/SCHEMA.md` (Fixed Category List), `PROJECT_BRIEF.md` §4 (Category Taxonomy), `lib/books.ts` (`CATEGORY_ICONS`), and any category-page routing/UI that assumes the old 12-category list. Pick sensible emoji icons for the new categories consistent with the existing style (decision #14).
- The 16 already-written pilot book JSON files may need their `categories` field revisited under the new taxonomy (e.g. does anything currently tagged `business` actually belong under a new `marketing` or `sales` category instead?) — check each one.

## 2. Deduplicate — one row per title

Thai wants **one entry per unique title** in the library, not one per physical copy — his point is "do I have this book to read," not inventory count. If a title is duplicated, keep one, drop the rest.

Exact-title duplicates already confirmed in `docs/HOME_BOOKCASE_CATALOG.xlsx` (6 groups, 12 rows — verify these are really the same book, then collapse to one row each):
- Charlie Munger: The Complete Investor — Tren Griffin
- Dao Duc Kinh — Lao Tzu / Laozi (two different translator/author renderings, confirm same book)
- Expert Secrets — Russell Brunson
- The Art of War — Sun Tzu
- The Barefoot Investor — Scott Pape
- Traffic Secrets — Russell Brunson

Also check these **near-duplicates** that weren't caught by exact-string matching — confirm whether each pair is genuinely the same physical book (possibly transcribed twice, or a full title vs. shortened title) before merging:
- "Rich Dad's Guide to Becoming Rich" vs. "Rich Dad's Guide to Becoming Rich Without Cutting Up Your Credit Cards" (both currently listed on Bookcase 2)
- "Think and Grow Rich" vs. "Think and Grow Rich (Deluxe ed.)" (both currently listed on Bookcase 2)

Only exact-string title matches were checked last session — run a broader fuzzy/near-duplicate pass across all 409 rows (case-insensitive, ignoring edition suffixes like "(3rd ed.)", "(Deluxe ed.)", "(Study Guide)") to catch anything else, since the catalog was compiled across two separate cataloging passes and near-duplicates are likely.

## 3. Internet verification pass

For every row currently flagged "verify" in the Notes column (~50 rows total, spread across both bookcases) — and any other title/author that reads as uncertain even without an explicit flag — use web search to confirm the real title and author, and correct the catalog. Thai explicitly said he doesn't mind extra verification effort, so err on the side of double-checking rather than leaving ambiguous rows as-is. Once corrected, clear the "verify" note (or replace it with what was corrected, briefly, for the audit trail).

## 4. Deliverables

- **Updated `docs/HOME_BOOKCASE_CATALOG.xlsx`** — regenerate all sheets (All Books, By Section, By Bookcase, Summary, Notes) reflecting the new taxonomy, deduped titles, and verified titles/authors. Update the Summary sheet's counts accordingly (total will drop from 409 once duplicates are removed).
- **A corrected, final `.docx` list saved in the project folder** (`docs/` — same landscape-table-by-section format as `docs/HOME_BOOKCASE_CATALOG_review.docx` from last session, but with the "verify"/amber flags resolved instead of just called out). This is Thai's "complete list in the folder."
- Updated `PROJECT_BRIEF.md`, `docs/SCHEMA.md`, `lib/books.ts` per the taxonomy changes above.

## 5. "Library mindset" — a real library needs to show its own scale

Thai's framing: this is a *library*, not just a list of summaries — he wants to be able to see how many books are in it and how many are in each section, inside the app itself, not just in a spreadsheet only you and he ever open. Propose and build a simple library overview — total unique title count, count per category — surfaced somewhere in the app (the home page is the natural spot, or a small dedicated section/stats strip). Use your judgment on exact placement and note it as a `DECISIONS.md` entry; this is a legitimate small feature addition, log it in `ROADMAP.md` as part of Stage 7 or a new stage, whichever fits better once you see the shape of the work.

## 6. Then resume content-writing

Once the catalog is deduped, re-categorized, and verified, go back to Stage 7's actual job: writing full book entries in batches of 10-20 per `docs/CONTENT_PIPELINE.md`, picking up where the 16 already-written books leave off. With the catalog now verified, there's no need to avoid "unverified" rows the way the previous batch did — the full corrected catalog is fair game.

## Known environment gotcha

The synced project folder's `.git` has a recurring bug on this sandbox mount: files named `*.lock` can be created but never deleted (`Operation not permitted`), which blocks `git commit`/`git status` run directly in that folder. Last session's workaround: clone fresh from the public GitHub remote (`github.com/AbundanceCitadel/book-library-app`, no auth needed to read a public repo) into `/tmp`, make the commit there, then `tar`-copy the resulting `.git` back into the synced folder. A commit from last session (`a25c669`, the 15-book pilot batch) is sitting locally that way but has **not been pushed** — pushing still needs a PAT from Thai (no GitHub connector exists in Cowork). Worth asking him for one early in this session if you want the deploy to actually reflect the new content.
