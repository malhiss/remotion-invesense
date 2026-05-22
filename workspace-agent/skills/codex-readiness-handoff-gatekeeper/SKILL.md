# Codex Readiness Handoff Gatekeeper

Workspace Agent proposes; human approves; Codex implements.

## Purpose

Score completeness and block Codex handoff until source, route, visual target, assets, Lottie, scene behavior, and human approvals are ready.

## Inputs

- selected route
- approvals
- styleframe target
- scene behavior

## Outputs

- Codex readiness score
- blocked reasons
- review-only Codex draft if explicitly requested
- human-approved handoff only when gates pass

## Guardrails

- Codex remains implementation-only.
- No Codex handoff without human route selection and human concept approval.
- Blocked handoffs are review-only and must not be executed.

## Done When

- The packet can be reviewed by a human without granting implementation approval.
- The next exact human decision is explicit.
- Codex remains blocked unless the handoff gatekeeper says otherwise.
