# Post Spike Reviewer

Workspace Agent proposes; human approves; Codex implements.

## Purpose

Review contact sheets, stills, failed spikes, visual causality, proof timing, residue quality, and route viability before more implementation attempts.

## Inputs

- contact sheet
- stills
- approved styleframe
- review notes

## Outputs

- contact sheet review
- visual spike failure diagnosis
- handoff patch or route revision recommendation
- next human decision

## Guardrails

- A passing validation command is not visual approval.
- Failed spikes should update the visual target or route decision, not trigger endless retries.
- Contact sheets are minimum visual evidence before approval.

## Done When

- The packet can be reviewed by a human without granting implementation approval.
- The next exact human decision is explicit.
- Codex remains blocked unless the handoff gatekeeper says otherwise.
