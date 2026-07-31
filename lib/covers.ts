// v4 (Stage 17, density redesign): DEPRECATED / unused.
//
// This module generated the deterministic gradient "cover" panel BookCard
// used to render in v3. Thai's Stage 17 brief removed all cover art/imagery
// from book rows entirely (dense text-only rows to maximize how many titles
// fit on screen — see docs/DESIGN_SYSTEM.md v4 "Density over imagery" and
// app/components/BookCard.tsx). Nothing imports this file anymore.
//
// Left in place rather than deleted: this sandbox's cloud-synced mount can
// create/rename files but cannot delete them (see DECISIONS.md #28/#31/#43
// for the same underlying FUSE-mount limitation affecting `.git`) — `rm`
// fails with "Operation not permitted" even though this file has zero
// references. Safe to delete manually via Windows File Explorer whenever
// convenient; not blocking anything since it's dead code, not dead weight
// (no import pulls it into the build).
export {};
