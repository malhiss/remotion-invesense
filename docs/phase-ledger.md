# Invesense Remotion Phase Ledger

This ledger is the project-level source of truth for the phased plan.

## Phase 0: Freeze Current Scaffold As Technical Calibration

Status: closed after baseline verification, commit, and push.

Purpose:

- Establish the fresh Remotion-only scaffold outside OneDrive.
- Preserve benchmark material for future deconstruction.
- Keep generated outputs and dependency folders out of Git.
- Keep calibration compositions clearly separated from production reels.

Implemented in Phase 0:

- `InvesenseCalibrationReel` remains a dark wiring calibration only.
- `FamilyBCCalibrationReel` remains a Family B/C system calibration only.
- Family B/C contracts, packet templates, Lottie policy, review tooling, and calibration stills exist as scaffold proof.
- Benchmark raw videos are tracked because the project owner chose to keep them in Git.
- Generated directories stay ignored: `node_modules`, `build`, `out`, `benchmarks/.cache`, and `tools/whisper-models`.

Closure criteria:

- Verification passes with `npm test`, `npm run lint`, `npm run build`, and `npm run review:family-bc`.
- The baseline is committed on `main`.
- The baseline is pushed to `https://github.com/malhiss/remotion-invesense`.

## Phase 1: Build The New Knowledge Layer

Status: closed.

Purpose:

- Rewrite the useful research into a durable Workspace Agent operating pack.
- Keep Workspace Agent as creative director and Codex as implementation-only.
- Make Family B/C the primary house benchmark and Family A a secondary motion-energy reference.
- Convert benchmark analysis into a searchable every-video atlas.
- Add a validated packet stack proving a source-locked, benchmark-linked, asset-boarded, Lottie-planned handoff can exist before Codex implementation.

Implemented in Phase 1:

- `docs/workspace-agent/` now contains the operating manual, family grammar, financial mechanism atlas, motif/proof atlas, Lottie playbook, Codex handoff rules, and human gates.
- `docs/workspace-agent/benchmark-atlas.json` and `docs/workspace-agent/benchmark-index.json` cover every tracked benchmark source video.
- `src/contracts/workspace-agent-contract.ts` adds the Workspace Agent atlas and packet stack contracts.
- `docs/workspace-agent/examples/family-bc-sample-packet-stack.json` provides a Family B/C sample chain with source locks, benchmark links, asset board, Lottie plan, styleframe target, and Codex handoff.
- `npm run phase1:validate` is the CLI smoke gate for Phase 1.

Closure criteria:

- Verification passes with `npm test`, `npm run lint`, `npm run build`, `npm run phase1:validate`, and the dry-run sanity check `npm run review:family-bc`.
- No production reel implementation has started.
- Phase 2 is explicitly marked as next.

## Phase 2: Build The Workspace Agent Creative Director Workflow

Status: closed.

Purpose:

- Turn the Phase 1 knowledge layer into the working creative-director workflow.
- Consolidate the old v1 and v2 Workspace Agent sprawl into fewer stronger skills.
- Add a repo-native Workspace Agent pack and an importable plugin package.
- Add a deterministic dry-run CLI that proves the workflow produces a blocked, review-only packet stack before implementation.

Implemented in Phase 2:

- `workspace-agent/` is the repo-native Workspace Agent artifact.
- `agent-packages/invesense-workspace-agent/` is the importable plugin package.
- The old-system audit register maps every old v1 skill, v2 skill, v2 knowledge file, and v2 template to preserve, merge, redesign, or discard.
- Thirteen consolidated skills replace the old one-file-per-micro-skill maze.
- `src/contracts/workspace-agent-phase2-contract.ts` defines Phase 2 skill, audit, plugin, dry-run, human gate, and blocked handoff contracts.
- `npm run phase2:dry-run` produces a review-only packet stack with blocked Codex handoff.
- `npm run phase2:validate` validates the workflow, plugin package, audit register, dry-run, and no-production boundary.

Closure criteria:

- Verification passes with `npm test`, `npm run lint`, `npm run build`, `npm run phase2:dry-run`, `npm run phase2:validate`, and the dry-run sanity check `npm run review:family-bc`.
- No production reel implementation has started.
- Phase 3 is explicitly marked as next.

## Phase 3: Build The Family B/C Visual System

Status: next.

Phase 3 should build the reusable light editorial Family B/C visual primitives and review tooling that Codex will later use after approved Workspace Agent handoffs. It should still avoid starting a production reel slate until the first pilot handoff is approved.
