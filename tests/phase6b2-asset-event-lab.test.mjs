import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const repoRoot = process.cwd();

const read = (relativePath) => readFileSync(join(repoRoot, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));

const runNpm = (script, args = []) =>
  spawnSync("cmd.exe", ["/c", "npm.cmd", "run", script, "--", ...args], {
    cwd: repoRoot,
    encoding: "utf8",
  });

const parseMarkedJson = (stdout, marker) => {
  const start = `---${marker}_JSON_START---`;
  const end = `---${marker}_JSON_END---`;
  const startIndex = stdout.indexOf(start);
  const endIndex = stdout.indexOf(end);

  assert.notEqual(startIndex, -1, `Missing ${start} marker in:\n${stdout}`);
  assert.notEqual(endIndex, -1, `Missing ${end} marker in:\n${stdout}`);

  return JSON.parse(stdout.slice(startIndex + start.length, endIndex).trim());
};

test("Phase 6B.2 defines an explicit benchmark-targeted asset-event lab contract", () => {
  const contract = read("src/contracts/asset-event-lab-contract.ts");
  const fixture = read("src/data/family-bc-asset-event-primitive-lab.ts");

  for (const schemaName of [
    "AssetEventBenchmarkTargetSchema",
    "AssetEventStructuralAttachmentSchema",
    "FamilyBCAssetEventPrimitiveLabSchema",
  ]) {
    assert.match(contract, new RegExp(`export const ${schemaName}`), `${schemaName} must be exported.`);
  }

  for (const requiredField of [
    "benchmarkTargetId",
    "benchmarkContactSheetPath",
    "referenceFramePath",
    "whyThisTargetWasChosen",
    "whatToRecreateStructurally",
    "whatNotToCopy",
    "copyRisk",
    "eventSurfaceId",
    "proofSurfaceId",
    "proofAttachmentMode",
    "proofBirthFrame",
    "residueObjectId",
    "noLabelReadSelfAssessment",
    "humanNoLabelReview",
  ]) {
    assert.match(contract, new RegExp(requiredField), `contract must include ${requiredField}.`);
    assert.match(fixture, new RegExp(requiredField), `fixture must include ${requiredField}.`);
  }

  assert.match(fixture, /batch-01-whatsapp-video-2026-04-30-at-3-42-34-pm-1-93332d51/);
  assert.match(fixture, /contact\.jpg/);
  assert.match(fixture, /durationInFrames:\s*91/);
  assert.match(fixture, /humanNoLabelReview:\s*"pending"/);
  assert.match(fixture, /draftMp4Allowed:\s*false/);
  assert.match(fixture, /finalMp4Allowed:\s*false/);
});

test("Phase 6B.2 registers a 91-frame non-production Remotion primitive lab", () => {
  const root = read("src/Root.tsx");
  const composition = read("src/compositions/FamilyBCAssetEventPrimitiveLab.tsx");

  assert.match(root, /id="FamilyBCAssetEventPrimitiveLab"/);
  assert.match(root, /durationInFrames=\{familyBCAssetEventPrimitiveLab\.format\.durationInFrames\}/);
  assert.match(root, /FamilyBCAssetEventPrimitiveLabSchema/);

  for (const primitive of [
    "ChartTerrainPath",
    "PhysicalResistanceLine",
    "ImpactPulse",
    "EventAttachedLabel",
    "ProofStampLatch",
    "ResidueCTAAnchor",
  ]) {
    assert.match(composition, new RegExp(primitive), `${primitive} must be used by the lab.`);
  }

  assert.match(composition, /hideLabels/);
  assert.doesNotMatch(composition, /Sukuk/i, "Phase 6B.2 lab must not continue the Sukuk pilot.");
  assert.doesNotMatch(composition, /<Img\b/);
});

test("Phase 6B.2 hardens generic primitives with production-safe attachment rules", () => {
  const charts = read("src/components/family-bc/charts.tsx");
  const cta = read("src/components/family-bc/cta.tsx");
  const assetEventPrimitives = read("src/components/family-bc/asset-event-primitives.tsx");
  const exports = read("src/components/family-bc/index.ts");

  assert.match(charts, /valuePlacement/);
  assert.match(charts, /inside|bar-end/);
  assert.match(charts, /productionMode/);
  assert.match(charts, /attachmentMode/);
  assert.match(charts, /eventSurfaceId/);
  assert.match(charts, /proofSurfaceId/);
  assert.match(charts, /proofAttachmentMode/);
  assert.match(charts, /calibration-only/i);

  assert.match(cta, /residueObjectId/);
  assert.match(cta, /calibration-only/i);
  assert.match(assetEventPrimitives, /eventSurfaceId/);
  assert.match(assetEventPrimitives, /proofBirthFrame/);
  assert.match(assetEventPrimitives, /residueObjectId/);
  assert.match(exports, /asset-event-primitives/);
});

test("Phase 6B.2 review dry run exposes labeled and label-hidden frame sets", () => {
  const packageJson = readJson("package.json");
  assert.equal(packageJson.scripts["phase6b2:review"], "node scripts/run-phase6b2-review.mjs");
  assert.equal(packageJson.scripts["phase6b2:validate"], "node scripts/phase6b2-validate.mjs");

  const result = runNpm("phase6b2:review");
  assert.equal(result.status, 0, result.stderr || result.stdout);
  const manifest = parseMarkedJson(result.stdout, "PHASE6B2_REVIEW");

  assert.equal(manifest.phase, "Phase 6B.2: Benchmark-Targeted Asset Event Primitive Lab");
  assert.equal(manifest.composition, "FamilyBCAssetEventPrimitiveLab");
  assert.equal(manifest.mode, "dry-run");
  assert.deepEqual(manifest.labeledFrames.map((frame) => frame.frame), [0, 24, 45, 60, 75, 90]);
  assert.deepEqual(manifest.labelHiddenFrames.map((frame) => frame.frame), [0, 24, 45, 60, 75, 90]);
  assert.equal(manifest.noLabelReadSelfAssessment, "risk");
  assert.equal(manifest.humanNoLabelReview, "pending");
  assert.equal(manifest.renderGate.draftMp4Allowed, false);
  assert.equal(manifest.renderGate.finalMp4Allowed, false);
  assert.equal(manifest.codexClaims.visualPass, false);
  assert.equal(manifest.codexClaims.premiumPass, false);
  assert.equal(manifest.codexClaims.benchmarkPass, false);
  assert.equal(manifest.codexClaims.finalNoLabelPass, false);
});

test("Phase 6B.2 validator requires rendered contact sheets and keeps MP4 blocked", () => {
  const validate = read("scripts/phase6b2-validate.mjs");
  assert.match(validate, /labeledContactSheet/);
  assert.match(validate, /labelHiddenContactSheet/);
  assert.match(validate, /humanNoLabelReview/);
  assert.match(validate, /pending/);
  assert.match(validate, /draftMp4Allowed/);
  assert.match(validate, /finalMp4Allowed/);

  const blocked = runNpm("phase6b2:review", ["--draft-render"]);
  assert.notEqual(blocked.status, 0);
  assert.match(blocked.stderr + blocked.stdout, /draft and final MP4 renders remain blocked/i);
});

test("Phase 6B.2 ledger records non-production lab status", () => {
  const ledger = read("docs/phase-ledger.md");

  assert.match(ledger, /Phase 6B\.2: Benchmark-Targeted Asset Event Primitive Lab/);
  assert.match(ledger, /Status: closed/);
  assert.match(ledger, /No draft or final MP4/);
  assert.match(ledger, /human no-label review remains pending/i);
});
