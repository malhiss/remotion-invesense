import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const projectRoot = process.cwd();

const read = (filePath) =>
  fs.readFileSync(path.join(projectRoot, filePath), "utf8");

const readJson = (filePath) => JSON.parse(read(filePath));

const exists = (filePath) => fs.existsSync(path.join(projectRoot, filePath));

test("Phase 1 creates a canonical Workspace Agent operating pack", () => {
  const requiredDocs = [
    "README.md",
    "operating-manual.md",
    "family-grammar.md",
    "financial-mechanism-atlas.md",
    "motif-proof-atlas.md",
    "lottie-research-playbook.md",
    "codex-handoff-rules.md",
    "human-gates.md",
  ];

  for (const docName of requiredDocs) {
    assert.ok(
      exists(`docs/workspace-agent/${docName}`),
      `docs/workspace-agent/${docName} should exist`,
    );
  }

  const operatingManual = read("docs/workspace-agent/operating-manual.md");
  const familyGrammar = read("docs/workspace-agent/family-grammar.md");
  const handoffRules = read("docs/workspace-agent/codex-handoff-rules.md");

  assert.match(operatingManual, /Workspace Agent is the creative director/);
  assert.match(operatingManual, /Codex is implementation-only/);
  assert.doesNotMatch(operatingManual, /Codex chooses the route/i);
  assert.match(familyGrammar, /Family B\/C.*primary/i);
  assert.match(familyGrammar, /Family A.*motion-energy.*secondary/i);
  assert.match(handoffRules, /text-only handoffs are blocked/i);
  assert.match(handoffRules, /Codex may reject/i);
});

test("Phase 1 every-video benchmark atlas covers each source benchmark", () => {
  const atlas = readJson("docs/workspace-agent/benchmark-atlas.json");
  const index = readJson("docs/workspace-agent/benchmark-index.json");
  const batch01 = readJson("benchmarks/batch-01/manifest.json");
  const batch02 = readJson("benchmarks/batch-02/manifest.json");
  const sourcePaths = [...batch01.files, ...batch02.files].map(
    (file) => file.relativePath,
  );

  assert.equal(atlas.version, 1);
  assert.equal(atlas.totalVideos, sourcePaths.length);
  assert.equal(atlas.entries.length, sourcePaths.length);

  const atlasPaths = new Set(atlas.entries.map((entry) => entry.sourcePath));
  for (const sourcePath of sourcePaths) {
    assert.ok(atlasPaths.has(sourcePath), `${sourcePath} should have atlas entry`);
  }

  for (const entry of atlas.entries) {
    assert.ok(["family-a", "family-b", "family-c", "family-bc-hybrid"].includes(entry.family));
    assert.ok(entry.topic.length > 0, `${entry.id} topic required`);
    assert.ok(entry.assets.length > 0, `${entry.id} assets required`);
    assert.ok(entry.motifs.length > 0, `${entry.id} motifs required`);
    assert.ok(entry.analogies.length > 0, `${entry.id} analogies required`);
    assert.ok(entry.wowEvents.length > 0, `${entry.id} wow events required`);
    assert.ok(entry.proofOperators.length > 0, `${entry.id} proof operators required`);
    assert.ok(entry.chartRole.length > 0, `${entry.id} chart role required`);
    assert.ok(entry.ctaBehavior.length > 0, `${entry.id} CTA behavior required`);
    assert.ok(entry.whatToAdapt.length > 0, `${entry.id} adapt notes required`);
    assert.ok(entry.whatNotToCopy.length > 0, `${entry.id} copy guardrails required`);
    assert.ok(["low", "medium", "high"].includes(entry.copyRisk));
  }

  assert.ok(index.byFamily["family-b"].length > 0);
  assert.ok(index.byFamily["family-c"].length > 0);
  assert.ok(index.byFamily["family-a"].length > 0);
  assert.ok(index.byMotif["chart-as-terrain"].length > 0);
  assert.ok(index.byProofOperator["cta-underline-inheritance"].length > 0);
});

test("Phase 1 adds a composed Workspace Agent packet stack contract and sample fixture", () => {
  const contract = read("src/contracts/workspace-agent-contract.ts");
  const fixture = readJson("docs/workspace-agent/examples/family-bc-sample-packet-stack.json");

  assert.match(contract, /export const BenchmarkAtlasEntrySchema/);
  assert.match(contract, /export const WorkspaceAgentPacketStackSchema/);
  assert.match(contract, /export type WorkspaceAgentPacketStack/);

  assert.equal(fixture.stackId, "family-bc-sample-source-chart-to-residue");
  assert.equal(fixture.phase, "phase-1-knowledge-layer");
  assert.equal(fixture.workspaceAgentRole, "creative-director");
  assert.equal(fixture.codexRole, "implementation-only");
  assert.equal(fixture.productionImplementationAllowed, false);
  assert.ok(fixture.benchmarkLinks.length >= 2);
  assert.ok(fixture.requiredHumanGates.includes("route approval"));
  assert.ok(fixture.codexHandoff.readinessStatus === "ready");
  assert.ok(fixture.codexHandoff.renderPermissions.finalRenderApproval === false);
});

test("Phase 1 validator is exposed as a CLI smoke gate", () => {
  const packageJson = readJson("package.json");
  const validator = read("scripts/phase1-validate.mjs");

  assert.equal(packageJson.scripts["phase1:validate"], "node scripts/phase1-validate.mjs");
  assert.match(validator, /benchmark-atlas\.json/);
  assert.match(validator, /Workspace Agent/);
  assert.match(validator, /productionImplementationAllowed/);

  const result = spawnSync("node", ["scripts/phase1-validate.mjs"], {
    cwd: projectRoot,
    encoding: "utf8",
    shell: false,
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /Phase 1 validation passed/);
});

test("Phase ledger marks Phase 1 as closed and Phase 2 as next without starting production", () => {
  const ledger = read("docs/phase-ledger.md");

  assert.match(ledger, /Phase 1: Build The New Knowledge Layer/);
  assert.match(ledger, /Status: closed/);
  assert.match(ledger, /Phase 2: Build The Workspace Agent Creative Director Workflow/);
  assert.match(ledger, /Status: next/);
  assert.match(ledger, /No production reel implementation has started/i);
});
