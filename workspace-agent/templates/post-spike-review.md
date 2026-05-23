# Post Spike Review Packet

Packet type: `post-spike-review`

## Purpose

Create a decision-ready Workspace Agent packet for Family B/C-first Remotion reel planning. Codex must not execute from this packet unless the Codex readiness handoff explicitly allows it.

## Output fields

- `contactSheet`
- `hookReview`
- `chartReview`
- `eventReview`
- `proofBirthReview`
- `lottieQA`
- `ctaResidueReview`
- `failureDiagnosis`
- `nextDecision`

## Human approval

- Required approval owner: project human.
- Approval status: pending, approved, revision requested, or blocked.
- Approval record must include date, approved route/scope, and unresolved risks.

## Stop conditions

- Stop if source proof, chart fidelity, asset/Lottie approval, styleframe targets, scene behavior, review frames, or Codex readiness are missing.
- Stop if the packet permits abstract shape-only diagrams, dashboard/card drift, static pasted charts as final proof, Lottie as hero metaphor, or Codex creative invention.
- Stop if the no-label read is unclear, proof birth is not attached to a physical event, Lottie fit is generic, or review-only overlay / review scaffolding would appear inside production-style visuals.
- Stop if card drift or dashboard drift is unresolved: charts may be source proof, but the hero asset must physically explain the mechanism.
- Stop if the packet translates the website insight too literally. The handoff must include a plain-language average viewer explanation for someone with no finance background.
- Stop if simplification changes the evidence. Use simple language and visual analogy, but preserve exact source-locked numbers, exact claims, units, dates, caveats, and source labels.
- Stop if no transcript, caption, or voiceover plan exists for a narrated reel. Captions may become on-screen text only when they are short, source-safe, and timed to the visual event.
- Stop if animation and narration are not synchronized. Assets and Lottie should appear as the voiceover is talking about the mechanism, not before or after the idea has passed.
- Stop if SFX is missing for an audio-approved draft. Sound effect choices should be restrained and event-linked: soft whoosh for movement, switch or ding for confirmation, never meme sounds unless explicitly approved.
- Stop if the branded CTA close is missing. Every reel needs a logo hold and direct website action such as `Read the research -> invesense.com/insights`.

## Codex boundary

Codex receives this packet as context only. It becomes executable only when the codex-readiness-handoff packet says `readinessStatus: approved`, `executable: true`, and render permissions are explicit.
