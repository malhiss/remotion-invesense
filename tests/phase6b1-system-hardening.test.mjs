import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const repoRoot = process.cwd();

const read = (relativePath) => readFileSync(join(repoRoot, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));

const parseMarkedJson = (stdout, marker) => {
  const start = `---${marker}_JSON_START---`;
  const end = `---${marker}_JSON_END---`;
  const startIndex = stdout.indexOf(start);
  const endIndex = stdout.indexOf(end);

  assert.notEqual(startIndex, -1, `Missing ${start} marker in:\n${stdout}`);
  assert.notEqual(endIndex, -1, `Missing ${end} marker in:\n${stdout}`);

  return JSON.parse(stdout.slice(startIndex + start.length, endIndex).trim());
};

test("Phase 6B.1 adds visual stress-audit contracts and fixture coverage", () => {
  const contractPath = "src/contracts/visual-stress-audit-contract.ts";
  const fixturePath = "src/data/phase6b-system-stress-audit.ts";

  assert.ok(existsSync(join(repoRoot, contractPath)), "visual stress-audit contract must exist.");
  assert.ok(existsSync(join(repoRoot, fixturePath)), "Phase 6B.1 stress-audit fixture must exist.");

  const contract = read(contractPath);
  const fixture = read(fixturePath);

  for (const schemaName of [
    "NoLabelMechanismScoreSchema",
    "AssetMetaphorFitSchema",
    "ProofBirthAttachmentSchema",
    "LottieRoleFitSchema",
    "SafeZoneCollisionReportSchema",
    "ResidueFrameScoreSchema",
    "VisualStressAuditPacketSchema",
  ]) {
    assert.match(contract, new RegExp(schemaName), `${schemaName} must be defined.`);
  }

  for (const knownFailure of [
    "headline collision",
    "sticker metaphor",
    "detached proof birth",
    "generic-tech lottie risk",
    "review-text contamination",
    "cta residue weakness",
  ]) {
    assert.match(fixture, new RegExp(knownFailure, "iu"), `Missing known stress-test failure: ${knownFailure}`);
  }
});

test("Phase 6B.1 handoff requires no-label, proof-birth, Lottie-fit, and stress-audit fields", () => {
  const handoff = read("src/data/phase6b-sukuk-stills-handoff.ts");

  for (const requiredField of [
    "noLabelRead",
    "proofBirthAttachment",
    "lottieRoleFit",
    "visualStressAudit",
    "cardDriftRisk",
    "ctaClosePlan",
    "averageViewerTranslation",
    "transcriptCaptionPlan",
    "narrationVisualSync",
    "soundFxPlan",
  ]) {
    assert.match(handoff, new RegExp(requiredField), `handoff must include ${requiredField}.`);
  }

  assert.match(handoff, /draftMp4Allowed:\s*false/u);
  assert.match(handoff, /finalMp4Allowed:\s*false/u);
});

test("Phase 6B.1 production-style visual frame is separated from review scaffolding", () => {
  const composition = read("src/compositions/SukukThresholdRailStills.tsx");

  assert.doesNotMatch(composition, /Phase 6B review:/u, "review scope text must not render inside the production-style frame.");
  assert.doesNotMatch(composition, /not a floating card/u, "internal critique notes must not render inside the visual.");
  assert.doesNotMatch(composition, /The chart is the terrain\. The threshold is the event\./u, "mechanism labels must not carry the whole meaning.");
  assert.match(composition, /ReviewOnlyOverlay/u, "review-only scaffolding should be explicitly isolated.");
  assert.match(composition, /EventAttachedProof/u, "proof should be represented as event-attached, not a detached overlay.");
});

test("Phase 6B.1 Workspace Agent templates require visual stress-audit decisions", () => {
  const repoTemplate = read("workspace-agent/templates/codex-readiness-handoff.md");
  const packageTemplate = read("agent-packages/invesense-workspace-agent/templates/codex-readiness-handoff.md");
  const knowledge = read("workspace-agent/knowledge/codex-handoff-and-stop-gates.md");
  const lottieKnowledge = read("workspace-agent/knowledge/lottie-asset-operating-system.md");
  const managerKitKnowledge = read("workspace-agent/knowledge/manager-kit-intake-rules.md");

  for (const text of [repoTemplate, packageTemplate, knowledge]) {
    assert.match(text, /no-label read/iu);
    assert.match(text, /proof birth/iu);
    assert.match(text, /lottie role-fit|lottie fit/iu);
    assert.match(text, /card drift|dashboard drift/iu);
    assert.match(text, /review-only overlay|review scaffolding/iu);
    assert.match(text, /branded CTA close|logo hold|Read the research/iu);
    assert.match(text, /average viewer|no finance background|plain-language/iu);
    assert.match(text, /exact source-locked numbers|exact claims|source-locked numbers/iu);
    assert.match(text, /transcript|caption|voiceover/iu);
    assert.match(text, /animation.*narration|narration.*animation|asset.*talking/iu);
    assert.match(text, /sound effect|SFX|whoosh|ding/iu);
  }

  assert.match(lottieKnowledge, /standalone analogy scene/iu);
  assert.match(lottieKnowledge, /not "Lottie must always sit on top of the graph/iu);
  assert.match(managerKitKnowledge, /not to recreate Canva one-to-one/iu);
  assert.match(managerKitKnowledge, /manual reels are separate benchmark or CTA references/iu);
  assert.match(managerKitKnowledge, /Remotion-upgraded route/iu);
});

test("Phase 6B.1 audit scripts emit structured critique metadata and keep MP4 blocked", () => {
  const packageJson = readJson("package.json");
  assert.equal(packageJson.scripts["phase6b:audit"], "node scripts/phase6b-audit.mjs");
  assert.equal(packageJson.scripts["phase6b1:validate"], "node scripts/phase6b1-validate.mjs");

  const audit = spawnSync("cmd.exe", ["/c", "npm.cmd", "run", "phase6b:audit"], {
    cwd: repoRoot,
    encoding: "utf8",
  });

  assert.equal(audit.status, 0, audit.stderr || audit.stdout);
  const manifest = parseMarkedJson(audit.stdout, "PHASE6B_AUDIT");

  assert.equal(manifest.phase, "Phase 6B.1: System Hardening");
  assert.equal(manifest.executionScope, "system-hardening-stills-only");
  assert.equal(manifest.renderGate.draftMp4Allowed, false);
  assert.equal(manifest.renderGate.finalMp4Allowed, false);
  assert.ok(manifest.findings.some((finding) => finding.severity === "must-fix"));
  assert.ok(manifest.auditDimensions.includes("no-label-mechanism"));
  assert.ok(manifest.auditDimensions.includes("lottie-role-fit"));
  assert.ok(manifest.auditDimensions.includes("review-scaffolding"));
});

test("Phase 6B.1 preserves system-wide coherence across new source-of-truth clarifications", () => {
  const sourceFiles = [
    "workspace-agent/knowledge/codex-handoff-and-stop-gates.md",
    "agent-packages/invesense-workspace-agent/knowledge/codex-handoff-and-stop-gates.md",
    "workspace-agent/knowledge/lottie-asset-operating-system.md",
    "agent-packages/invesense-workspace-agent/knowledge/lottie-asset-operating-system.md",
    "workspace-agent/knowledge/manager-kit-intake-rules.md",
    "agent-packages/invesense-workspace-agent/knowledge/manager-kit-intake-rules.md",
    "src/data/phase6b-sukuk-stills-handoff.ts",
  ];

  const combined = sourceFiles.map(read).join("\n");

  for (const requiredTruth of [
    /average viewer|no finance background/iu,
    /exact source-locked numbers|exact claims/iu,
    /standalone analogy scene/iu,
    /branded CTA close|Read the research/iu,
    /transcript|caption|voiceover/iu,
    /sound effect|SFX|whoosh|ding/iu,
    /manual reels are separate benchmark or CTA references/iu,
    /not to recreate Canva one-to-one/iu,
    /system-wide coherence|source-of-truth/iu,
  ]) {
    assert.match(combined, requiredTruth);
  }
});
