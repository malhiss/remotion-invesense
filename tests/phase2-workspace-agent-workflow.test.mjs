import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const projectRoot = process.cwd();

const consolidatedSkills = [
  "source-and-evidence-steward",
  "chart-proof-director",
  "mechanism-story-diagnostician",
  "benchmark-reference-deconstructor",
  "route-analogy-miner",
  "asset-lottie-planner",
  "styleframe-visual-target-director",
  "scene-motion-proof-birth-planner",
  "brand-label-silent-reviewer",
  "remotion-feasibility-gatekeeper",
  "human-review-packager",
  "codex-readiness-handoff-gatekeeper",
  "post-spike-reviewer",
];

const read = (filePath) =>
  fs.readFileSync(path.join(projectRoot, filePath), "utf8");

const readJson = (filePath) => JSON.parse(read(filePath));

const exists = (filePath) => fs.existsSync(path.join(projectRoot, filePath));

const parseMarkedJson = (stdout) => {
  const match = stdout.match(/---PHASE2_DRY_RUN_JSON_START---\s*([\s\S]+?)\s*---PHASE2_DRY_RUN_JSON_END---/u);
  assert.ok(match, `Expected marked dry-run JSON in stdout:\n${stdout}`);
  return JSON.parse(match[1]);
};

const runNpmScript = (scriptName) => {
  if (process.platform === "win32") {
    return spawnSync("cmd.exe", ["/c", "npm.cmd", "run", scriptName], {
      cwd: projectRoot,
      encoding: "utf8",
      shell: false,
    });
  }

  return spawnSync("npm", ["run", scriptName], {
    cwd: projectRoot,
    encoding: "utf8",
    shell: false,
  });
};

test("Phase 2 creates a consolidated repo-native Workspace Agent pack", () => {
  assert.ok(exists("workspace-agent/README.md"));
  assert.ok(exists("workspace-agent/instructions.md"));
  assert.ok(exists("workspace-agent/manifest.json"));
  assert.ok(exists("workspace-agent/knowledge/old-system-audit-register.json"));

  const manifest = readJson("workspace-agent/manifest.json");
  const instructions = read("workspace-agent/instructions.md");

  assert.equal(manifest.phase, "phase-2-workspace-agent-workflow");
  assert.equal(manifest.consolidationMode, "consolidated-chains");
  assert.deepEqual(manifest.skills.map((skill) => skill.id), consolidatedSkills);
  assert.match(instructions, /Workspace Agent proposes; human approves; Codex implements/u);
  assert.match(instructions, /Family B\/C is primary/u);
  assert.match(instructions, /Family A is secondary motion-energy/u);
  assert.match(instructions, /No production reel implementation starts in Phase 2/u);

  for (const skill of consolidatedSkills) {
    const skillPath = `workspace-agent/skills/${skill}/SKILL.md`;
    assert.ok(exists(skillPath), `${skillPath} should exist`);
    const text = read(skillPath);
    assert.match(text, /## Purpose/u, `${skill} needs Purpose`);
    assert.match(text, /## Inputs/u, `${skill} needs Inputs`);
    assert.match(text, /## Outputs/u, `${skill} needs Outputs`);
    assert.match(text, /## Guardrails/u, `${skill} needs Guardrails`);
  }
});

test("Phase 2 old-system audit register covers v1 and v2 historical assets", () => {
  const audit = readJson("workspace-agent/knowledge/old-system-audit-register.json");

  assert.equal(audit.version, 1);
  assert.equal(audit.sourceSummary.v1Skills, 5);
  assert.equal(audit.sourceSummary.v2Skills, 63);
  assert.equal(audit.sourceSummary.v2Knowledge, 84);
  assert.equal(audit.sourceSummary.v2Templates, 70);
  assert.equal(audit.entries.length, 222);

  const keyByOldPath = new Map(audit.entries.map((entry) => [entry.oldPath, entry]));
  for (const oldPath of [
    ".agents/skills/select-analogy.md",
    "agent-packages/invesense-reel-coordinator-v2/skills/visual-reference-collector.md",
    "agent-packages/invesense-reel-coordinator-v2/knowledge/styleframe-before-codex-rules.md",
    "agent-packages/invesense-reel-coordinator-v2/templates/codex-handoff-packet.md",
  ]) {
    assert.ok(keyByOldPath.has(oldPath), `Missing audit entry for ${oldPath}`);
  }

  for (const entry of audit.entries) {
    assert.ok(["v1", "v2"].includes(entry.sourceSystem));
    assert.ok(["skill", "knowledge", "template"].includes(entry.artifactType));
    assert.ok(["preserve", "merge", "redesign", "discard"].includes(entry.decision));
    assert.ok(entry.target.length > 0, `${entry.oldPath} needs target`);
    assert.ok(entry.rationale.length > 0, `${entry.oldPath} needs rationale`);
  }
});

test("Phase 2 adds an importable plugin package matching the repo-native pack", () => {
  const pluginManifest = readJson(
    "agent-packages/invesense-workspace-agent/.agent-plugin/plugin.json",
  );

  assert.equal(pluginManifest.name, "invesense-workspace-agent");
  assert.equal(pluginManifest.type, "agent");
  assert.equal(pluginManifest.entrypoint, "instructions.md");
  assert.ok(exists("agent-packages/invesense-workspace-agent/instructions.md"));
  assert.ok(exists("agent-packages/invesense-workspace-agent/manifest.json"));

  for (const skill of consolidatedSkills) {
    assert.ok(
      exists(`agent-packages/invesense-workspace-agent/skills/${skill}/SKILL.md`),
      `plugin skill missing: ${skill}`,
    );
  }

  assert.ok(exists("agent-packages/invesense-workspace-agent/knowledge/old-system-audit-register.json"));
  assert.ok(exists("agent-packages/invesense-workspace-agent/templates/codex-readiness-handoff.md"));
  assert.ok(exists("agent-packages/invesense-workspace-agent/examples/family-bc-sample-brief.json"));
});

test("Phase 2 dry run outputs a blocked review-only Workspace Agent packet stack", () => {
  const packageJson = readJson("package.json");
  assert.equal(packageJson.scripts["phase2:dry-run"], "node scripts/run-phase2-dry-run.mjs");

  const result = runNpmScript("phase2:dry-run");

  assert.equal(result.status, 0, result.stderr || result.stdout);
  const dryRun = parseMarkedJson(result.stdout);

  assert.equal(dryRun.phase, "phase-2-workspace-agent-workflow");
  assert.equal(dryRun.reviewOnly, true);
  assert.equal(dryRun.productionImplementationAllowed, false);
  assert.equal(dryRun.codexHandoff.readinessStatus, "blocked");
  assert.ok(dryRun.codexHandoff.blockedBy.includes("human route selection"));
  assert.ok(dryRun.codexHandoff.blockedBy.includes("styleframe approval"));
  assert.ok(dryRun.sourceAndEvidence.approvedClaims.length > 0);
  assert.ok(dryRun.benchmarkLinks.length >= 2);
  assert.ok(dryRun.routeOptions.length >= 3);
  assert.equal(dryRun.assetLottieBoard.lottiePolicy.heroMetaphorAllowed, false);
  assert.equal(dryRun.styleframeRequirement.status, "required-before-codex");
  assert.ok(dryRun.sceneBehavior.proofBirthFrameRange.length > 0);
  assert.ok(dryRun.humanGates.required.includes("route approval"));
  assert.ok(dryRun.humanGates.required.includes("styleframe approval"));
});

test("Phase 2 contracts, validator, and phase ledger enforce no-production boundaries", () => {
  const contract = read("src/contracts/workspace-agent-phase2-contract.ts");
  const packageJson = readJson("package.json");
  const validator = read("scripts/phase2-validate.mjs");
  const ledger = read("docs/phase-ledger.md");

  assert.match(contract, /export const WorkspaceAgentSkillSchema/u);
  assert.match(contract, /export const OldSystemAuditEntrySchema/u);
  assert.match(contract, /export const Phase2DryRunOutputSchema/u);
  assert.match(contract, /export const BlockedCodexHandoffStatusSchema/u);
  assert.match(contract, /export type Phase2DryRunOutput/u);

  assert.equal(packageJson.scripts["phase2:validate"], "node scripts/phase2-validate.mjs");
  assert.match(validator, /No production reel implementation starts in Phase 2/u);
  assert.match(validator, /Lottie cannot become the hero metaphor/u);
  assert.match(validator, /Family B\/C is primary/u);

  const result = runNpmScript("phase2:validate");

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /Phase 2 validation passed/);

  assert.match(ledger, /Phase 2: Build The Workspace Agent Creative Director Workflow/);
  assert.match(ledger, /Status: closed/);
  assert.match(ledger, /Phase 3:/);
  assert.match(ledger, /Status: next/);
  assert.match(ledger, /No production reel implementation has started/i);
});
