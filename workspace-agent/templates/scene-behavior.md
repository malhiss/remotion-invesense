# Scene Behavior Packet

Packet type: `scene-behavior`

## Purpose

Create a decision-ready Workspace Agent packet for Family B/C-first Remotion reel planning. Codex must not execute from this packet unless the Codex readiness handoff explicitly allows it.

## Output fields

- `durationSeconds`
- `frameRanges`
- `objectStates`
- `proofBirthTiming`
- `labelAttachRules`
- `lottieTiming`
- `ctaResidue`
- `reviewFrames`

## Human approval

- Required approval owner: project human.
- Approval status: pending, approved, revision requested, or blocked.
- Approval record must include date, approved route/scope, and unresolved risks.

## Stop conditions

- Stop if source proof, chart fidelity, asset/Lottie approval, styleframe targets, scene behavior, review frames, or Codex readiness are missing.
- Stop if the packet permits abstract shape-only diagrams, dashboard/card drift, static pasted charts as final proof, Lottie as hero metaphor, or Codex creative invention.

## Codex boundary

Codex receives this packet as context only. It becomes executable only when the codex-readiness-handoff packet says `readinessStatus: approved`, `executable: true`, and render permissions are explicit.
