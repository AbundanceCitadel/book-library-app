// v4 (Stage 17, navigation fix): DEPRECATED / unused, replaced by real
// `<Link href="/category/[slug]">` rows inline in app/page.tsx.
//
// This component expanded a category's books in place on the home page
// without ever navigating anywhere — no URL change, no history entry. Thai's
// explicit feedback: tapping "Business" should act like a real browser link
// (real navigation, and the back button should return to exactly where you
// were, not to some default home state) — an expand-in-place accordion can
// never do that, since nothing about it is a "page" the browser's history
// stack knows about. Removed from app/page.tsx entirely; see
// docs/DESIGN_SYSTEM.md v4 "Navigation: real pages, not in-place expansion."
//
// Left in place rather than deleted: this sandbox's cloud-synced mount can
// create/rename files but cannot delete them (same limitation as
// lib/covers.ts and DECISIONS.md #28/#31/#43) — safe to delete manually via
// Windows File Explorer whenever convenient; not blocking anything since
// nothing imports it.
export {};
