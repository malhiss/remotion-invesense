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

Status: closed.

Phase 3 should build the reusable light editorial Family B/C visual primitives and review tooling that Codex will later use after approved Workspace Agent handoffs. It should still avoid starting a production reel slate until the first pilot handoff is approved.

Purpose:

- Translate the Phase 1 and Phase 2 Workspace Agent workflow into reusable Remotion visual foundations.
- Keep Family B/C primary with a light editorial stage, chart-native proof, logo/icon actors, approved Lottie accents, and review tooling.
- Keep Lottie discovery and approval in the Workspace Agent lane while Codex owns deterministic local ingestion and rendering.
- Prove the system through a calibration composition only; no production reel implementation starts in Phase 3.

Implemented in Phase 3:

- `FamilyBCVisualSystemCalibration` is registered as a non-production calibration composition.
- `src/contracts/family-bc-visual-system-contract.ts` defines visual tokens, chart specs, logo/icon actor specs, Lottie acquisition requests, approved Lottie manifest entries, review frame manifests, and calibration-only handoff status.
- `src/components/family-bc/` splits the visual system into stage, typography, charts, actors, Lottie, CTA, and review helper modules.
- `ApprovedLottie` renders local, manifest-approved JSON through Remotion and blocks remote render dependencies.
- `npm run lottie:ingest` validates approved local or direct JSON Lottie assets before updating `public/lottie/manifest.json`.
- `npm run phase3:review` dry-runs hook, chart, event, proof, Lottie, and CTA residue review frames by default.
- `npm run phase3:validate` enforces the no-production boundary, approved-Lottie policy, and Phase 3 ledger state.

Closure criteria:

- Verification passes with `npm test`, `npm run lint`, `npm run build`, `npm run phase2:validate`, `npm run phase3:review`, and `npm run phase3:validate`.
- Phase 3 adds one calibration composition only.
- No production reel implementation has started.

## Phase 4: SVG Insight Chart Intake Add-On

Status: closed.

Alias: Phase 4 Add-On: SVG Insight Chart Intake.

Purpose:

- Add a formal lane for market-insight SVG charts so they become animated Remotion charts, not static pasted images.
- Preserve Workspace Agent as chart/source/proof approver and Codex as parser, reconstructor, animator, and reviewer.
- Support the supplied chart families before the first pilot: horizontal bars, grouped vertical bars, line/area charts, and stacked bars with benchmark lines.
- Keep this as non-production infrastructure; no pilot or production reel implementation starts in this add-on.

Implemented in Phase 4 Add-On:

- `npm run svg:chart-audit` emits deterministic SVG chart intake packets without modifying files.
- `npm run svg:chart-ingest` ingests only human-approved, source-locked charts into `public/source-charts/`.
- `AnimatedSourceBarChart`, `AnimatedSourceGroupedBarChart`, `AnimatedSourceStackedBarChart`, and `AnimatedSourceLineChart` reconstruct source charts with native Remotion/SVG primitives instead of final `<Img>` rendering.
- `npm run phase4:svg-review` dry-runs source-reference, animated reconstruction, proof-event, and CTA-residue review frames.
- `npm run phase4:validate` enforces the no-production boundary and static-SVG-as-final-chart block.

Closure criteria:

- Verification passes with `npm test`, `npm run lint`, `npm run build`, `npm run phase3:validate`, `npm run phase4:svg-review`, and `npm run phase4:validate`.
- The four supplied chart families audit successfully.
- No production reel implementation has started.

## Phase 5: Review + QA Tooling

Status: closed.

Purpose:

- Turn the review seed into enforceable still/contact-sheet QA tooling.
- Add benchmark comparison metadata from the Workspace Agent benchmark atlas.
- Add source-chart comparison metadata for audited SVG chart reconstructions.
- Add mobile safe-zone QA for 1080x1920 Family B/C reels.
- Add Lottie QA frames and review questions for approved accent assets.
- Keep final MP4 rendering blocked until a future approved pilot passes review.

Implemented in Phase 5:

- `scripts/review-reel.mjs` emits marked JSON, supports named frame sets, keeps dry-run as default, supports vertical contact sheets, and blocks final MP4 rendering without approval.
- `src/contracts/phase5-review-qa-contract.ts` defines review frame roles, benchmark comparison, source-chart comparison, safe-zone QA, Lottie QA, and render gates.
- `npm run phase5:review` produces a Phase 5 QA manifest with hook, chart, event, proof, Lottie, and CTA residue frames.
- `npm run phase5:validate` verifies the Phase 5 review tooling, ledger state, no-production boundary, and final-render block.
- `docs/family-bc-system/phase5-review-qa-tooling.md` documents review artifacts and stop conditions.

Closure criteria:

- Verification passes with `npm test`, `npm run lint`, `npm run build`, `npm run phase4:validate`, `npm run phase5:review`, and `npm run phase5:validate`.
- No production reel implementation has started.
- Phase 6 is explicitly marked as next.

## Phase 6A: Harden The Real Workspace Agent Package

Status: closed.

Legacy Phase 5 next-stage alias: Phase 6: First Approved Pilot Handoff is now split into Phase 6A package hardening and Phase 6B first approved pilot handoff.

Purpose:

- Upgrade the Workspace Agent from a minimal scaffold into a real importable creative-director package.
- Keep the 13 consolidated workflow skills while restoring useful depth from the old v1/v2 agents as progressive references and decision-ready templates.
- Make `.codex-plugin/plugin.json` the canonical Codex import manifest.
- Preserve the new workflow: Family B/C benchmark first, source/chart proof first, animated SVG/native chart proof when proof-critical, Lottie as support motion, styleframe gates, review QA, and Codex blocked until human approval.

Implemented in Phase 6A:

- `npm run phase6a:generate` regenerates both `workspace-agent/` and `agent-packages/invesense-workspace-agent/` from the hardened package generator.
- `agent-packages/invesense-workspace-agent/.codex-plugin/plugin.json` is the canonical import manifest.
- All 13 Workspace Agent skills now include frontmatter, operational sections, stop conditions, human gates, and reference-loading guidance.
- `workspace-agent/references/` and package references distill Family B/C benchmark grammar, source/chart/SVG proof rules, mechanism/proof/wow events, asset/Lottie/styleframe rules, and Remotion/QA/Codex gates.
- Templates are decision-ready packet forms with output fields, human approval, stop conditions, and Codex boundaries.
- `npm run phase6a:dry-run` proves the first pilot handoff remains blocked until human route, source, asset/Lottie, styleframe, scene behavior, and review approvals exist.
- `npm run phase6a:validate` verifies import readiness, skill hardening, references, templates, no-production boundary, and blocked Codex handoff.

Closure criteria:

- Verification passes with `npm test`, `npm run lint`, `npm run build`, `npm run phase5:validate`, and `npm run phase6a:validate`.
- No production reel implementation has started.
- Phase 6B is explicitly marked as next.

## Phase 6B: First Approved Pilot Handoff

Status: next.

Phase 6B should start only after the hardened Workspace Agent is imported/usable and a Workspace Agent packet stack selects a real Family B/C pilot route, locks source claims, approves visual/styleframe targets, approves any Lottie or local assets, approves any SVG chart intake packet, and produces a Codex-ready handoff. Phase 6B is the first stage where a pilot reel may be implemented, but it should still begin with stills/contact sheets before any draft MP4.
