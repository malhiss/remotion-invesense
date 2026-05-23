# Phase Progress And System Coherence Audit

Date: 2026-05-22

Purpose: compare the original phased plan against the current project state, capture what changed during Phase 6B/6B.1, and keep the next plan explicit so the system does not drift into the same failure mode as the old repo.

## Current Position

We are in Phase 6B / Phase 6B.1.

- Phase 6B started as the first approved pilot handoff, but remains limited to stills, contact sheets, and source-chart comparison.
- Draft MP4 and final MP4 remain blocked.
- Phase 6B.1 started because the first Sukuk stills stress test exposed system-level weaknesses that should not be patched only in one composition.
- The current Sukuk stills are a validation fixture for system hardening, not final approved creative.

## Original Plan Versus Current Reality

| Phase | Original intent | Current status | What changed |
| --- | --- | --- | --- |
| Phase 0 | Fresh Remotion baseline outside OneDrive, push to GitHub | Closed | No change. Baseline and repo hygiene were established. |
| Phase 1 | Workspace Agent knowledge layer | Closed | No change. The knowledge layer became the planning source of truth. |
| Phase 2 | Workspace Agent creative-director workflow | Closed | No change. The 13-skill workflow replaced old skill sprawl. |
| Phase 3 | Family B/C visual system foundation | Closed | No change in status. Later stress tests showed this layer needs stronger anti-card and anti-sticker primitives. |
| Phase 4 | SVG insight chart intake | Closed | Expanded from one SVG type to multiple supplied chart families. Current rule remains: source charts should become animated Remotion proof, not pasted screenshots. |
| Phase 5 | Review + QA tooling | Closed | No change in status. It now feeds Phase 6B review and audit scripts. |
| Phase 6A | Harden real Workspace Agent package | Closed | Expanded through 6A.1 and 6A.2: visible knowledge, old-v2 depth backfill, importable package, and generator-backed package source. |
| Phase 6B | First approved pilot handoff | In progress | Re-scoped to stills/contact-sheet/source-chart comparison only. Sukuk Threshold Rail exists as a stills-only implementation fixture. |
| Phase 6B.1 | Not in original plan | In progress | Added as a hardening phase after visual stress-test failures. It upgrades contracts, Workspace Agent rules, primitives, and validators. |

## Phase 6B.1 Source-Of-Truth Clarifications

These are now system rules, not one-off comments:

- Reels must explain advanced website insights visually for average viewers with no finance background.
- Simplification must not alter evidence: exact source-locked numbers, units, dates, caveats, and source labels remain mandatory.
- Lottie is allowed as a meaningful asset source and can carry a standalone analogy scene when approved; it does not always need to sit on top of a graph.
- Lottie cannot replace source truth, invent proof, or become a generic disconnected template.
- Every reel needs a branded Invesense CTA close, typically a logo hold plus `Read the research -> invesense.com/insights`.
- CTA residue can lead into the close, but it cannot replace the company logo and website action.
- Manager kits are source and planning inputs, not Canva templates to recreate one-to-one.
- Manual reference reels and manual stills are separate benchmark/CTA references unless included in a manager kit.
- Narrated reels need transcript, caption, voiceover, animation-sync, and sound-effect planning.
- Assets and Lottie should appear when narration is talking about the mechanism.
- Top-of-scene internal metadata such as investor-note labels or source-chart IDs must not contaminate production-style visuals.

## What Was Upgraded In Phase 6B.1

System contracts:

- Added `VisualStressAuditPacket`, `NoLabelMechanismScore`, `AssetMetaphorFit`, `ProofBirthAttachment`, `LottieRoleFit`, `SafeZoneCollisionReport`, and `ResidueFrameScore`.
- Added a stress-audit fixture that records the known failures: headline collision, sticker metaphor, detached proof birth, generic-tech Lottie risk, review-text contamination, and weak CTA residue.

Workspace Agent:

- Expanded Codex handoff requirements with `noLabelRead`, `averageViewerTranslation`, `transcriptCaptionPlan`, `narrationVisualSync`, `soundFxPlan`, `proofBirthAttachment`, `lottieRoleFit`, `visualStressAudit`, `cardDriftRisk`, `ctaClosePlan`, and `reviewOnlyOverlayPlan`.
- Added manager-kit intake rules as supplemental knowledge in both repo-native and importable packages.
- Updated Lottie knowledge so standalone analogy scenes are allowed when mechanism-mapped, source-safe, licensed, approved, and backed by native Remotion fallback.
- Updated the Phase 6A package generator so future package regeneration preserves these new rules.

Visual primitives:

- Added safe-zone and review-only overlay primitives.
- Added event-attached proof and branded CTA close primitives.
- Reworked the Sukuk stress fixture to remove visible review strings, remove chart-ID contamination, include a branded CTA, and attach proof to the threshold event.

Review tooling:

- Added `phase6b:audit` and `phase6b1:validate`.
- Regenerated Phase 6B stills/contact sheet with draft/final MP4 still blocked.

## Visual Audit Of Current Sukuk Stress Fixture

What improved:

- The top investor-note / source-chart metadata no longer dominates every frame.
- Review-only strings are isolated from production-style visuals.
- The final frame now includes a branded Invesense CTA and website action.
- The proof label appears after the threshold event and uses source-like wording.
- The duplicated padlock/sticker latch was reduced into a chart-integrated threshold gate.

What is still not good enough:

- The composition still feels too much like a chart card inside a large white page.
- The threshold gate is cleaner, but not yet a memorable Family B/C asset-led event.
- The chart still carries more of the meaning than the metaphor.
- The Data Flow Lottie is subtle; it does not yet explain the analogy by itself.
- The CTA is present, but the exact logo treatment should eventually use the approved Invesense logo asset rather than text-only reconstruction.
- The reel needs a transcript/caption/voiceover pass before motion timing can be judged against benchmark audio-visual synchronization.

Severity:

- Must fix before draft MP4: chart-card dominance, weak physical event, transcript/caption/voiceover absence, and real logo asset handling.
- Should fix before draft MP4: stronger standalone or semi-standalone Lottie/asset analogy beat, less explanatory helper text, stronger CTA residue continuity.
- Experiment: use a standalone Lottie-powered analogy scene between setup and proof if it makes the threshold concept clearer than chart-only motion.

## New Plan From Here

### Step 1: Close Phase 6B.1 As System Hardening

- Keep Phase 6B.1 limited to system rules, primitives, validators, and stills/contact-sheet review.
- Do not render a draft MP4 yet.
- Run full verification: `npm test`, `npm run lint`, `npm run build`, `npm run phase6a:validate`, `npm run phase6b:validate`, `npm run phase6b:audit`, `npm run phase6b1:validate`, and `npm run phase6b:review -- --execute`.
- Human reviews the updated contact sheet and this audit.

### Step 2: Ask Workspace Agent For A Revised Phase 6B Handoff

The revised handoff should explicitly include:

- A plain-language transcript for a 30-50 second narrated reel.
- Caption timing and visual timing linked to narration beats.
- SFX roles such as rail whoosh, latch switch, and proof confirmation only if approved.
- A stronger asset-led threshold event, not merely a chart card.
- A Lottie plan that may include a standalone analogy scene, not only overlay pulses.
- The approved branded CTA close and logo asset requirements.
- A no-label mechanism read for each beat.

### Step 3: Implement Revised Stills Only

- Codex implements updated stills/contact sheet only after the revised handoff is approved.
- Use chart/source proof exactly, but reduce chart-card dominance.
- Treat the chart as terrain or evidence, not the whole reel.
- Keep draft/final MP4 blocked.

### Step 4: Human Review Before Draft MP4

- Review hook, mechanism, Lottie/asset, threshold event, proof birth, CTA, source-chart comparison, and safe-zone frames.
- Reject if the no-label read fails or if the reel is still only an animated chart.
- Approve draft MP4 only after stills/contact sheet pass.

### Step 5: Future Phase 6C / Draft MP4

- Render draft MP4 only after explicit approval.
- Add approved voiceover/audio/caption/SFX implementation.
- Run post-spike review before final render.

## Pending System Work

- Add a first-class transcript/caption packet and schema to the Workspace Agent contracts.
- Add audio/SFX review gates beyond textual planning.
- Add real Invesense logo asset handling for CTA closes.
- Add a manager-kit intake CLI or validator if kits become a recurring input.
- Add image-level safe-zone/collision checks if we want automated visual warnings beyond manifest checks.
- Add stronger anti-card visual primitives for chart-as-terrain layouts.
- Add optional standalone Lottie analogy scene primitives with role-fit validation.

## Current Gate

Current recommendation: do not move to draft MP4. Close Phase 6B.1 only after human review of this system audit and the regenerated contact sheet, then send the Workspace Agent a revised Phase 6B prompt that asks for transcript/caption/audio-synced, asset-led, Lottie-aware stills handoff.
