import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const packageRoot = "agent-packages/invesense-workspace-agent";
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
const templateFiles = [
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

const fail = (message) => {
  throw new Error(`Phase 6A validation failed: ${message}`);
};

const assert = (condition, message) => {
  if (!condition) {
    fail(message);
  }
};

const fullPath = (relativePath) => path.join(projectRoot, relativePath);
const exists = (relativePath) => fs.existsSync(fullPath(relativePath));
const read = (relativePath) => fs.readFileSync(fullPath(relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));

assert(exists(`${packageRoot}/.codex-plugin/plugin.json`), "canonical Codex plugin manifest missing.");
const plugin = readJson(`${packageRoot}/.codex-plugin/plugin.json`);
assert(plugin.name === "invesense-workspace-agent", "plugin name mismatch.");
assert(plugin.skills === "./skills/", "plugin skills path mismatch.");
assert(/Family B\/C/u.test(plugin.interface.longDescription), "plugin interface must mention Family B/C.");

for (const root of ["workspace-agent", packageRoot]) {
  for (const skillId of skillIds) {
    const source = read(`${root}/skills/${skillId}/SKILL.md`);
    for (const required of [
      "---",
      "description:",
      "## When To Use",
      "## Required Inputs",
      "## Required Outputs",
      "## Process",
      "## Stop Conditions",
      "## Human Gates",
      "## References To Load",
      "Family B/C",
      "Codex remains implementation-only",
    ]) {
      assert(source.includes(required), `${root}/${skillId} missing ${required}`);
    }
  }

  const combinedReferences = referenceFiles.map((fileName) => read(`${root}/references/${fileName}`)).join("\n");
  for (const required of [
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
    assert(new RegExp(required, "iu").test(combinedReferences), `${root} references missing ${required}`);
  }

  for (const templateFile of templateFiles) {
    const source = read(`${root}/templates/${templateFile}`);
    for (const required of ["Packet type", "Output fields", "Human approval", "Stop conditions", "Codex"]) {
      assert(new RegExp(required, "iu").test(source), `${root}/${templateFile} missing ${required}`);
    }
  }
}

const dryRunResult = spawnSync(process.execPath, ["scripts/run-phase6a-dry-run.mjs"], {
  cwd: projectRoot,
  encoding: "utf8",
});
assert(dryRunResult.status === 0, dryRunResult.stderr || dryRunResult.stdout);
const dryRun = parseMarkedJson(dryRunResult.stdout, "PHASE6A_DRY_RUN");
assert(dryRun.productionImplementationAllowed === false, "Phase 6A must not allow production implementation.");
assert(dryRun.codexHandoff.readinessStatus === "blocked", "Phase 6A dry-run must block Codex.");
assert(dryRun.chartProof.staticPastedChartAllowed === false, "Phase 6A must forbid static pasted chart proof.");
assert(dryRun.assetLottiePolicy.heroMetaphorAllowed === false, "Phase 6A must forbid Lottie as hero metaphor.");

const ledger = read("docs/phase-ledger.md");
assert(/Phase 6A: Harden The Real Workspace Agent Package/u.test(ledger), "ledger missing Phase 6A.");
assert(/Phase 6B: First Approved Pilot Handoff/u.test(ledger), "ledger missing Phase 6B.");

const validation = {
  phase6a: {
    closed: true,
    importReady: true,
    skillsHardened: true,
    referencesAdded: true,
    templatesHardened: true,
  },
  boundaries: {
    productionReelStarted: false,
    codexImplementationAllowed: false,
  },
  next: "Phase 6B: First Approved Pilot Handoff",
};

console.log("---PHASE6A_VALIDATE_JSON_START---");
console.log(JSON.stringify(validation, null, 2));
console.log("---PHASE6A_VALIDATE_JSON_END---");

function parseMarkedJson(stdout, marker) {
  const start = `---${marker}_JSON_START---`;
  const end = `---${marker}_JSON_END---`;
  const startIndex = stdout.indexOf(start);
  const endIndex = stdout.indexOf(end);
  assert(startIndex !== -1, `missing ${start}`);
  assert(endIndex !== -1, `missing ${end}`);
  return JSON.parse(stdout.slice(startIndex + start.length, endIndex).trim());
}
