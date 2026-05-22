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

Status: next.

Phase 1 starts only after Phase 0 is committed and pushed. It should refine and operationalize the research/docs into the durable Workspace Agent knowledge base. It should not start production reel implementation.
