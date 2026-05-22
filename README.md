# Invesense Remotion Reels

Fresh Remotion-only foundation for premium Invesense finance reels.

This project starts from a blank Remotion scaffold. Old repos, old renders, old docs, old agent packages, old component ideas, and old geometry locks are failure evidence only. They are not migration sources.

## Creative Standard

- Family B/C is the house benchmark: light-background creator finance reels with chart proof, logos/icons, kinetic text, and CTA residue.
- Family A is secondary: use its asset energy and animation ideas only when they strengthen the Family B/C direction.
- Show the financial mechanism, not a generic dashboard.
- Build around a memorable asset and a physical event.
- Make proof emerge from impact, break, gate, stamp, unlock, or transformation.
- Preserve a residue frame instead of cutting to a recap screen.
- Use labels to support the event, not to carry the whole meaning.

## Workflow Boundary

- Workspace Agent: source truth, mechanism diagnosis, visual references, asset board, styleframes, route approval, Codex handoff.
- Codex: deterministic Remotion implementation from approved handoff only.
- Human gates: route, styleframe, assets, Codex readiness, still/contact-sheet review, final render.
- LottieFiles: Workspace Agent selects motion-role candidates first; Codex downloads only approved JSON assets and keeps them in `public/lottie/manifest.json`.
- Complex reels: no Codex implementation until source locks, visual references, styleframes, chart specs, Lottie decisions, and review frames are explicit.

## Family B/C System

The new workflow lives in `docs/family-bc-system/`:

- `full-audit.md`: what we learned from the chat, PDFs, old repos, benchmark review, Remotion research, and Lottie research.
- `knowledge-library.md`: rewritten motifs, analogies, wow asset events, proof operators, and chart/source rules.
- `workspace-agent-workflow.md`: the creative-director packet chain from source intake to Codex handoff.
- `lottie-asset-policy.md`: allowed/forbidden Lottie roles, licensing checks, and implementation rules.
- `review-and-qa-gates.md`: stills, contact sheets, source proof, no-label test, and final approval gates.

## Commands

```console
npm run dev
npm test
npm run lint
npm run build
node scripts/review-reel.mjs
npm run review:family-bc
```

To export review stills and a contact sheet:

```console
node scripts/review-reel.mjs --execute
node scripts/review-reel.mjs --composition FamilyBCCalibrationReel --frame-set family-bc-calibration --execute
```

The review utility does not approve a final render. Final renders require an explicit human gate.

## Current Composition

- Composition id: `InvesenseCalibrationReel`
- Format: `1080x1920`
- FPS: `30`
- Purpose: calibration foundation only, not a publishable reel
- Composition id: `FamilyBCCalibrationReel`
- Format: `1080x1920`
- FPS: `30`
- Purpose: Family B/C light editorial calibration only, not a publishable reel

## Package Policy

Core Remotion packages are installed for fonts, captions, media, transitions, Lottie, light leaks, motion blur, noise, shapes, paths, layout, SFX, preload, and Zod schemas.

3D remains gated. Do not add `@remotion/three`, `three`, or React Three Fiber until an approved styleframe requires 3D.
