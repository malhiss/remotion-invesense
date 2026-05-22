import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const repoRoot = process.cwd();

const skillIds = [
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

const referenceFiles = [
  "family-bc-benchmark-grammar.md",
  "source-chart-svg-proof-rules.md",
  "mechanism-proof-wow-atlas.md",
  "asset-lottie-styleframe-rules.md",
  "remotion-qa-codex-gates.md",
];

const hardenedTemplates = [
  "intake-evidence.md",
  "chart-proof.md",
  "benchmark-reference.md",
  "route-options.md",
  "asset-lottie-board.md",
  "styleframe-direction.md",
  "scene-behavior.md",
  "human-review-document.md",
  "codex-readiness-handoff.md",
  "post-spike-review.md",
];

const read = (relativePath) => readFileSync(join(repoRoot, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));
const exists = (relativePath) => existsSync(join(repoRoot, relativePath));

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

test("Phase 6A package uses current Codex plugin conventions", () => {
  assert.ok(
    exists("agent-packages/invesense-workspace-agent/.codex-plugin/plugin.json"),
    "canonical .codex-plugin/plugin.json should exist",
  );

  const manifest = readJson(
    "agent-packages/invesense-workspace-agent/.codex-plugin/plugin.json",
  );

  assert.equal(manifest.name, "invesense-workspace-agent");
  assert.match(manifest.version, /^0\.6\.\d+$/);
  assert.equal(manifest.skills, "./skills/");
  assert.equal(manifest.interface.displayName, "Invesense Workspace Agent");
  assert.match(manifest.interface.shortDescription, /creative-director/i);
  assert.match(manifest.interface.longDescription, /Family B\/C/i);
  assert.match(manifest.interface.longDescription, /Lottie/i);
  assert.match(manifest.interface.longDescription, /Codex/i);
});

test("Phase 6A keeps 13 consolidated skills but makes each operational", () => {
  for (const root of ["workspace-agent", "agent-packages/invesense-workspace-agent"]) {
    for (const skillId of skillIds) {
      const skillPath = `${root}/skills/${skillId}/SKILL.md`;
      assert.ok(exists(skillPath), `${skillPath} should exist`);
      const source = read(skillPath);

      assert.match(source, /^---\nname:/m, `${skillPath} needs frontmatter name`);
      assert.match(source, /description:/, `${skillPath} needs frontmatter description`);

      for (const heading of [
        "## Purpose",
        "## When To Use",
        "## Required Inputs",
        "## Required Outputs",
        "## Process",
        "## Stop Conditions",
        "## Human Gates",
        "## References To Load",
      ]) {
        assert.match(source, new RegExp(heading), `${skillPath} missing ${heading}`);
      }

      assert.match(source, /Family B\/C/i, `${skillPath} should preserve Family B/C benchmark priority`);
      assert.match(source, /Codex remains implementation-only/i, `${skillPath} should block Codex creative authority`);
      assert.match(source, /abstract shape-only diagrams/i, `${skillPath} should explicitly reject abstract shape-only diagrams`);
    }
  }
});

test("Phase 6A references distill old-agent depth into the new workflow", () => {
  for (const root of ["workspace-agent", "agent-packages/invesense-workspace-agent"]) {
    for (const fileName of referenceFiles) {
      const referencePath = `${root}/references/${fileName}`;
      assert.ok(exists(referencePath), `${referencePath} should exist`);
    }

    const combinedReferences = referenceFiles
      .map((fileName) => read(`${root}/references/${fileName}`))
      .join("\n");

    for (const requiredPhrase of [
      "Family B/C is primary",
      "Family A is secondary",
      "source proof before metaphor",
      "animated SVG",
      "Lottie cannot become the hero metaphor",
      "styleframe before Codex",
      "no abstract shape-only diagrams",
      "no dashboard/card drift",
      "proof birth",
      "CTA residue",
    ]) {
      assert.match(combinedReferences, new RegExp(requiredPhrase, "i"));
    }
  }
});

test("Phase 6A templates are decision-ready packets, not thin placeholders", () => {
  for (const root of ["workspace-agent", "agent-packages/invesense-workspace-agent"]) {
    for (const templateName of hardenedTemplates) {
      const templatePath = `${root}/templates/${templateName}`;
      assert.ok(exists(templatePath), `${templatePath} should exist`);
      const source = read(templatePath);

      for (const requiredPhrase of [
        "Packet type",
        "Output fields",
        "Human approval",
        "Stop conditions",
        "Codex",
      ]) {
        assert.match(source, new RegExp(requiredPhrase, "i"), `${templatePath} missing ${requiredPhrase}`);
      }
    }
  }
});

test("Phase 6A dry-run proves first pilot handoff remains blocked until approvals exist", () => {
  const result = runNpm("phase6a:dry-run");
  assert.equal(result.status, 0, result.stderr);
  const dryRun = parseMarkedJson(result.stdout, "PHASE6A_DRY_RUN");

  assert.equal(dryRun.phase, "phase-6a-workspace-agent-hardening");
  assert.equal(dryRun.reviewOnly, true);
  assert.equal(dryRun.productionImplementationAllowed, false);
  assert.equal(dryRun.familyBenchmark.primary, "family-bc");
  assert.equal(dryRun.familyBenchmark.familyAUse, "secondary-motion-energy-only");
  assert.equal(dryRun.chartProof.staticPastedChartAllowed, false);
  assert.equal(dryRun.chartProof.animatedSvgOrNativeChartRequiredWhenProofCritical, true);
  assert.equal(dryRun.assetLottiePolicy.heroMetaphorAllowed, false);
  assert.equal(dryRun.styleframeGate.status, "required-before-codex");
  assert.deepEqual(dryRun.reviewFrames.map((frame) => frame.role), [
    "hook",
    "chart",
    "event",
    "proof",
    "lottie",
    "cta-residue",
  ]);
  assert.equal(dryRun.codexHandoff.readinessStatus, "blocked");
  assert.equal(dryRun.codexHandoff.executable, false);
  assert.deepEqual(dryRun.codexHandoff.blockedBy, [
    "human route approval missing",
    "source locks not attached to final claims",
    "asset and Lottie approvals missing",
    "styleframe targets missing",
    "scene behavior packet missing",
    "review frame approval missing",
  ]);
});

test("Phase 6A validator closes hardening and moves first pilot handoff to Phase 6B", () => {
  const result = runNpm("phase6a:validate");
  assert.equal(result.status, 0, result.stderr);
  const validation = parseMarkedJson(result.stdout, "PHASE6A_VALIDATE");

  assert.equal(validation.phase6a.closed, true);
  assert.equal(validation.boundaries.productionReelStarted, false);
  assert.equal(validation.boundaries.codexImplementationAllowed, false);
  assert.equal(validation.next, "Phase 6B: First Approved Pilot Handoff");

  const ledger = read("docs/phase-ledger.md");
  assert.match(ledger, /Phase 6A: Harden The Real Workspace Agent Package/);
  assert.match(ledger, /Status: closed/);
  assert.match(ledger, /Phase 6B: First Approved Pilot Handoff/);
});
