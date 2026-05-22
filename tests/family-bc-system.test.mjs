import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const projectRoot = process.cwd();

const read = (filePath) =>
  fs.readFileSync(path.join(projectRoot, filePath), "utf8");

const exists = (filePath) => fs.existsSync(path.join(projectRoot, filePath));

test("Family B/C knowledge layer rewrites old research as new operating rules", () => {
  const audit = read("docs/family-bc-system/full-audit.md");
  const knowledge = read("docs/family-bc-system/knowledge-library.md");
  const workflow = read("docs/family-bc-system/workspace-agent-workflow.md");
  const lottie = read("docs/family-bc-system/lottie-asset-policy.md");
  const qa = read("docs/family-bc-system/review-and-qa-gates.md");

  assert.match(audit, /Family B and Family C are the house benchmark/);
  assert.match(audit, /Family A is a motion\/asset-energy reference/);
  assert.match(audit, /no old visual code is migrated/i);

  for (const phrase of [
    "Chart as terrain",
    "Strict bars as measured objects",
    "Logo as actor",
    "CTA residue",
    "chart-to-number extraction",
    "ledger stamp",
    "vault unlock",
  ]) {
    assert.match(knowledge, new RegExp(phrase, "i"));
  }

  assert.match(workflow, /Workspace Agent is the creative director/);
  assert.match(workflow, /Codex is the implementation specialist/);
  assert.match(workflow, /Codex may reject a handoff/i);

  assert.match(lottie, /LottieFiles/);
  assert.match(lottie, /manifest/i);
  assert.match(lottie, /staticFile\(\)/);
  assert.match(lottie, /delayRender\(\)/);
  assert.match(lottie, /not.*hero metaphor/i);

  assert.match(qa, /source-chart comparison/i);
  assert.match(qa, /side-by-side/i);
  assert.match(qa, /final render approval/i);
});

test("packet templates exist for the Workspace Agent to produce Codex-ready handoffs", () => {
  const templates = [
    "source-intake-packet.md",
    "evidence-audit-packet.md",
    "mechanism-diagnosis-packet.md",
    "benchmark-deconstruction-packet.md",
    "analogy-route-packet.md",
    "chart-proof-packet.md",
    "asset-board-packet.md",
    "lottie-search-packet.md",
    "styleframe-direction-packet.md",
    "codex-readiness-scorecard.md",
    "codex-handoff-packet.md",
  ];

  for (const template of templates) {
    const filePath = `docs/family-bc-system/packets/${template}`;

    assert.ok(exists(filePath), `${filePath} should exist`);
    assert.match(read(filePath), /packetType|Required fields|Human gate/i);
  }
});

test("Family B/C contracts model charts, Lottie, review frames, and render gates", () => {
  const contract = read("src/contracts/family-bc-contract.ts");

  for (const exportName of [
    "SourceIntakePacketSchema",
    "EvidenceAuditPacketSchema",
    "MechanismDiagnosisPacketSchema",
    "BenchmarkDeconstructionPacketSchema",
    "AnalogyRoutePacketSchema",
    "ChartProofPacketSchema",
    "AssetBoardPacketSchema",
    "LottieSearchPacketSchema",
    "StyleframeDirectionPacketSchema",
    "CodexReadinessScorecardSchema",
    "CodexHandoffPacketSchema",
    "FamilyBCReelHandoffSchema",
  ]) {
    assert.match(contract, new RegExp(`export const ${exportName}`));
  }

  for (const requiredField of [
    "chartProofRole",
    "recreationMode",
    "lottieCandidates",
    "reviewFrames",
    "ctaKeyword",
    "watermark",
    "finalRenderApproval",
  ]) {
    assert.match(contract, new RegExp(requiredField));
  }
});

test("Family B/C visual primitives provide light editorial chart and logo systems", () => {
  const primitives = read("src/components/family-bc-primitives.tsx");

  for (const exportName of [
    "LightEditorialStage",
    "MetricHook",
    "KineticWordStack",
    "FullBleedChartStage",
    "SourceChartTrace",
    "ChartMarkerCallout",
    "BarComparisonScene",
    "LogoActorGrid",
    "InfrastructureIconScene",
    "LottieAccentLayer",
    "CTAKeywordClose",
  ]) {
    assert.match(primitives, new RegExp(`export const ${exportName}`));
  }

  const tokens = read("src/components/family-bc/tokens.ts");
  assert.match(tokens, /#ffffff|#fbfbfa/);
  assert.doesNotMatch(primitives, /Dashboard|SaaS|Progress/);
});

test("Family B/C calibration reel is registered separately from the dark wiring test", () => {
  const root = read("src/Root.tsx");
  const handoff = read("src/data/family-bc-calibration-handoff.ts");
  const composition = read("src/compositions/FamilyBCCalibrationReel.tsx");

  assert.match(root, /id="FamilyBCCalibrationReel"/);
  assert.match(root, /FamilyBCReelHandoffSchema/);
  assert.match(handoff, /family-bc-calibration/);
  assert.match(handoff, /chartProofRole/);
  assert.match(handoff, /comment \"CHART\"/i);
  assert.match(composition, /LightEditorialStage/);
  assert.match(composition, /FullBleedChartStage/);
  assert.match(composition, /CTAKeywordClose/);
});

test("Lottie manifest keeps policy metadata and only allows approved assets", () => {
  const manifest = JSON.parse(read("public/lottie/manifest.json"));

  assert.equal(manifest.policy, "family-bc-approved-lottie-assets");
  assert.ok(Array.isArray(manifest.allowedRoles));
  assert.ok(manifest.allowedRoles.includes("route-pulse"));
  assert.ok(manifest.forbiddenRoles.includes("unapproved-hero-metaphor"));
  assert.ok(Array.isArray(manifest.assets));
  for (const asset of manifest.assets) {
    assert.equal(asset.approvedByHuman, true);
    assert.ok(asset.localPath);
    assert.ok(asset.licenseNote);
    assert.ok(asset.fallbackNativeRemotionOption);
  }
});

test("review utility supports named Family B/C frame sets and comparison outputs", () => {
  const utility = read("scripts/review-reel.mjs");

  assert.match(utility, /--frame-set/);
  assert.match(utility, /family-bc-calibration/);
  assert.match(utility, /vstack/);
  assert.match(utility, /benchmarkComparison/);
  assert.match(utility, /sourceChartComparison/);
});
