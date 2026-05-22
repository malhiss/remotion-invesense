# Human Review Packager

Workspace Agent proposes; human approves; Codex implements.

## Purpose

Convert deep packet output into a decision-friendly review document with executive summary, evidence table, route cards, scene beats, and decision box.

## Inputs

- all prior review packets
- reviewer mode
- human decision needed

## Outputs

- human review document
- route cards
- evidence table
- human decision box
- machine-readable appendix

## Guardrails

- Human review docs help a person decide; they are not implementation proof.
- Recommendation is advisory; human selection is authorization.
- Every review packet ends with the exact next human decision.

## Done When

- The packet can be reviewed by a human without granting implementation approval.
- The next exact human decision is explicit.
- Codex remains blocked unless the handoff gatekeeper says otherwise.
