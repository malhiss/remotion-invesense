# Phase 5: Review + QA Tooling

Phase 5 closes the review and QA tooling layer. It does not start a pilot reel, does not approve a production render, and does not let review artifacts become production assets.

## Purpose

- Turn `scripts/review-reel.mjs` into the shared review engine for still frames, contact sheets, and machine-readable review manifests.
- Add benchmark comparison metadata so every future pilot is judged against the Family B/C benchmark atlas before implementation goes too far.
- Add source-chart comparison metadata so audited SVG charts are checked as animated reconstructions, not pasted wallpaper.
- Add mobile safe-zone QA for 1080x1920 reels.
- Add Lottie QA frames so approved Lottie accents are checked for flicker, timing, color fit, and clutter.
- Keep final MP4 rendering blocked until a future approved pilot passes human review.

## Review Artifacts

- `phase5:review` dry-runs by default and emits `PHASE5_REVIEW` marked JSON.
- `review` remains the shared low-level engine and emits `REVIEW_REEL` marked JSON.
- `--execute` may export stills and contact sheets for review.
- `--final-render` is not allowed in Phase 5; final MP4 work moves to a later approved phase.

## Frame Roles

- `hook`: verifies mobile-readable hook framing and headline clarity.
- `chart`: verifies source-proof visibility and chart-native meaning.
- `event`: verifies the mechanism or physical event is visible before labels do all the work.
- `proof`: verifies proof appears after the event that creates it.
- `lottie`: verifies Lottie is accent/supporting motion only.
- `cta-residue`: verifies the close inherits residue from the event instead of becoming a generic end card.

## Stop Conditions

- No benchmark-free pilot.
- No source-chart wallpaper where an animated reconstruction is required.
- No unsafe top/bottom text placement for social platforms.
- No Lottie-as-hero or Lottie-as-standalone-proof.
- No detached proof plates pretending to be proof birth.
- No final MP4 render without explicit future final approval.

## Phase Boundary

Phase 5 is tooling-only. No production reel implementation has started. Phase 6 is the first approved pilot handoff, and it must begin with Workspace Agent source locks, route approval, styleframes, asset approval, and Codex readiness before implementation.
