---
name: post-spike-reviewer
description: Use after stills, contact sheets, disposable spikes, or draft review artifacts exist to diagnose visual failure before more implementation.
---

# Post Spike Reviewer

Workspace Agent proposes; human approves; Codex implements. Family B/C is primary, Family A is secondary motion-energy only, and Codex remains implementation-only.

## Purpose

Treat visual failure as evidence. Passing tests is not visual approval; failed contact sheets should change the route, styleframe, or handoff.

## When To Use

- Codex has produced stills, contact sheets, review frames, or a disposable spike.
- The output feels diagrammatic, dashboard-like, abstract, or below benchmark.
- The team is tempted to iterate code without diagnosing visual causality.

## Inputs

- Contact sheet, still frames, approved styleframes, source-chart comparison, Lottie QA frames, and review notes.
- Original handoff and no-label test.

## Required Inputs

- Contact sheet, still frames, approved styleframes, source-chart comparison, Lottie QA frames, and review notes.
- Original handoff and no-label test.

## Outputs

- Contact sheet review.
- Visual causality and proof birth diagnosis.
- Residue/CTA quality review.
- Recommendation: patch handoff, revise route, revise styleframe, or stop.

## Required Outputs

- Contact sheet review.
- Visual causality and proof birth diagnosis.
- Residue/CTA quality review.
- Recommendation: patch handoff, revise route, revise styleframe, or stop.

## Process

1. Compare hook, chart, event, proof, Lottie, and CTA residue frames against approved targets.
2. Check whether object behavior communicates before labels.
3. Identify whether failure is source, route, styleframe, asset, motion, chart, Lottie, or Codex execution.
4. Do not approve visual quality because technical validation passed.
5. Return the exact next human decision.

## Stop Conditions

- No contact sheet or stills exist.
- The review tries to fix visuals without naming the failure cause.
- A weak route is patched endlessly instead of revisited.
- Stop if the work drifts toward abstract shape-only diagrams, dashboard/card drift, source-free claims, or labels carrying the whole meaning.

## Human Gates

- This skill cannot approve implementation.
- Human approval is required for route selection, source claims, chart proof, asset/Lottie usage, styleframes, Codex readiness, and render permissions.
- Codex remains implementation-only and must not choose route, analogy, claims, numbers, visual style, or Lottie assets.

## Guardrails

- Family B/C is the primary benchmark; Family A is secondary motion-energy only.
- Lottie cannot become the hero metaphor.
- Chart/SVG proof must remain source-grounded and animated when proof-critical.
- Codex remains implementation-only.

## References To Load

- references/remotion-qa-codex-gates.md
- references/family-bc-benchmark-grammar.md

## Done When

- The packet can be reviewed by a human without granting implementation approval.
- The next exact human decision is explicit.
- The output blocks Codex if source proof, chart proof, route approval, assets, styleframes, scene behavior, or review frames are incomplete.
