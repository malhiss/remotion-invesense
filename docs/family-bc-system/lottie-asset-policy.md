# Lottie Asset Policy

LottieFiles is a source for approved motion assets, not a creative director.
Lottie is not the hero metaphor; it supports an already-approved visual event.

## Allowed Roles

- route-pulse
- highlight-sweep
- checkmark
- warning-x
- loader
- chart-accent
- payment-transfer
- data-transfer
- CTA-pulse
- proof-burst
- micro-icon
- transition-accent

## Forbidden Roles

- unapproved hero metaphor
- standalone proof
- decorative clutter
- random confetti
- unlicensed asset
- generic finance wallpaper

## Workspace Agent Search Rule

Workspace Agent searches by motion need, not generic finance taste. Useful searches include `arrow pulse`, `chart`, `financial analysis`, `money transfer`, `payment`, `checkmark`, `warning`, `data transfer`, and `highlight`.

Each candidate must record URL, creator, license, preview behavior, what to use, what not to copy, approved use, and fallback native Remotion option.

## Codex Implementation Rule

Codex downloads only approved Lottie JSON or uses a manually supplied local file. Approved files belong under `public/lottie/` and must be listed in `public/lottie/manifest.json`.

Remotion should load approved assets from `staticFile()` by default. Lottie loading must use `delayRender()`, `continueRender()`, and `cancelRender()` where asynchronous loading is needed.

## QA Rule

Every Lottie must be checked for timing, color fit, render flicker, expression support, and whether it supports the mechanism instead of replacing it.
