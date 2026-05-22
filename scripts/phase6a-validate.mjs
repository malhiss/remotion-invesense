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
const knowledgeFiles = [
  "family-bc-benchmark-grammar.md",
  "source-proof-operating-system.md",
  "chart-svg-animation-playbook.md",
  "lottie-asset-operating-system.md",
  "mechanism-analogy-wow-atlas.md",
  "styleframe-and-asset-board-rules.md",
  "codex-handoff-and-stop-gates.md",
  "review-qa-gates.md",
  "benchmark-moment-card-system.md",
  "continuous-motion-and-object-permanence.md",
  "analogy-scoring-and-failure-modes.md",
  "visual-reference-search-and-copy-risk.md",
  "brandbook-manual-reel-and-label-rules.md",
  "remotion-3d-and-capability-governance.md",
  "motion-pacing-format-and-variant-rules.md",
  "failure-diagnosis-and-legacy-component-inventory.md",
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
  const manifest = readJson(`${root}/manifest.json`);
  assert(
    JSON.stringify(manifest.knowledge) === JSON.stringify(knowledgeFiles),
    `${root} manifest must list canonical knowledge files.`,
  );

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
      "knowledge/",
      "references/",
      "Family B/C",
      "Codex remains implementation-only",
    ]) {
      assert(source.includes(required), `${root}/${skillId} missing ${required}`);
    }
  }

  const combinedKnowledge = knowledgeFiles.map((fileName) => {
    const source = read(`${root}/knowledge/${fileName}`);
    assert(source.length > 1200, `${root}/knowledge/${fileName} is too small to be operating knowledge.`);
    return source;
  }).join("\n");
  for (const required of [
    "Family B/C is primary",
    "Family A is secondary motion-energy",
    "source locks",
    "proof-critical SVG",
    "animated Remotion chart",
    "Lottie is an asset source",
    "not the hero metaphor",
    "styleframe",
    "asset board",
    "Codex remains implementation-only",
    "blocked",
    "review frames",
    "moment card",
    "continuous motion",
    "object permanence",
    "analogy scoring",
    "copy-risk",
    "brandbook",
    "manual reel",
    "3D governance",
    "retention pacing",
    "visual causality",
    "prompt failure",
  ]) {
    assert(new RegExp(required, "iu").test(combinedKnowledge), `${root} knowledge missing ${required}`);
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
    knowledgeVisible: true,
    finalDepthAuditReady: true,
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
