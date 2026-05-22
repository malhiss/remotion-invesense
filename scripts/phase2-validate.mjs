import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

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

const fail = (message) => {
  console.error(`Phase 2 validation failed: ${message}`);
  process.exit(1);
};

const assert = (condition, message) => {
  if (!condition) {
    fail(message);
  }
};

const read = (relativePath) =>
  fs.readFileSync(path.join(projectRoot, relativePath), "utf8");

const readJson = (relativePath) => JSON.parse(read(relativePath));

const exists = (relativePath) => fs.existsSync(path.join(projectRoot, relativePath));

const parseMarkedJson = (stdout) => {
  const match = stdout.match(/---PHASE2_DRY_RUN_JSON_START---\s*([\s\S]+?)\s*---PHASE2_DRY_RUN_JSON_END---/u);
  assert(Boolean(match), "Dry-run output did not include marked JSON.");
  return JSON.parse(match[1]);
};

// Required invariant text. Keep these literals for grep-friendly validation:
// No production reel implementation starts in Phase 2.
// Lottie cannot become the hero metaphor.
// Family B/C is primary.

assert(exists("workspace-agent/instructions.md"), "workspace-agent instructions missing.");
assert(exists("workspace-agent/manifest.json"), "workspace-agent manifest missing.");
assert(
  exists("workspace-agent/knowledge/old-system-audit-register.json"),
  "old-system audit register missing.",
);
assert(
  exists("agent-packages/invesense-workspace-agent/.agent-plugin/plugin.json"),
  "plugin manifest missing.",
);

const manifest = readJson("workspace-agent/manifest.json");
assert(
  manifest.phase === "phase-2-workspace-agent-workflow",
  "workspace-agent manifest has wrong phase.",
);
assert(
  manifest.consolidationMode === "consolidated-chains",
  "workspace-agent must use consolidated chains.",
);
assert(
  JSON.stringify(manifest.skills.map((skill) => skill.id)) === JSON.stringify(skillIds),
  "workspace-agent skill list does not match Phase 2 consolidated set.",
);

const instructions = read("workspace-agent/instructions.md");
assert(/Workspace Agent proposes; human approves; Codex implements/u.test(instructions), "role split missing.");
assert(/Family B\/C is primary/u.test(instructions), "Family B/C primary rule missing.");
assert(/Family A is secondary motion-energy/u.test(instructions), "Family A secondary rule missing.");
assert(
  /No production reel implementation starts in Phase 2/u.test(instructions),
  "Phase 2 no-production boundary missing.",
);

for (const skillId of skillIds) {
  assert(exists(`workspace-agent/skills/${skillId}/SKILL.md`), `skill missing: ${skillId}`);
  assert(
    exists(`agent-packages/invesense-workspace-agent/skills/${skillId}/SKILL.md`),
    `plugin skill missing: ${skillId}`,
  );
}

const audit = readJson("workspace-agent/knowledge/old-system-audit-register.json");
assert(audit.sourceSummary.v1Skills === 5, "v1 skill count changed.");
assert(audit.sourceSummary.v2Skills === 63, "v2 skill count changed.");
assert(audit.sourceSummary.v2Knowledge === 84, "v2 knowledge count changed.");
assert(audit.sourceSummary.v2Templates === 70, "v2 template count changed.");
assert(audit.entries.length === 222, "audit register must cover all historical entries.");

for (const entry of audit.entries) {
  assert(["preserve", "merge", "redesign", "discard"].includes(entry.decision), "invalid audit decision.");
  assert(entry.target.length > 0, `audit target missing: ${entry.oldPath}`);
}

const pluginManifest = readJson(
  "agent-packages/invesense-workspace-agent/.agent-plugin/plugin.json",
);
assert(pluginManifest.name === "invesense-workspace-agent", "plugin name mismatch.");
assert(pluginManifest.type === "agent", "plugin type mismatch.");
assert(pluginManifest.entrypoint === "instructions.md", "plugin entrypoint mismatch.");

const dryRunResult = spawnSync("node", ["scripts/run-phase2-dry-run.mjs"], {
  cwd: projectRoot,
  encoding: "utf8",
  shell: false,
});
assert(dryRunResult.status === 0, dryRunResult.stderr || dryRunResult.stdout);

const dryRun = parseMarkedJson(dryRunResult.stdout);
assert(dryRun.reviewOnly === true, "dry run must be review-only.");
assert(
  dryRun.productionImplementationAllowed === false,
  "dry run must not allow production implementation.",
);
assert(
  dryRun.codexHandoff.readinessStatus === "blocked",
  "dry-run Codex handoff must be blocked.",
);
assert(
  dryRun.assetLottieBoard.lottiePolicy.heroMetaphorAllowed === false,
  "Lottie cannot become the hero metaphor.",
);
assert(
  dryRun.styleframeRequirement.status === "required-before-codex",
  "styleframe target must be required before Codex.",
);

for (const forbiddenPath of [
  "src/mechanism-labs",
  "src/pattern-labs",
  "src/geometry-locks",
  "src/styleframes",
]) {
  assert(!exists(forbiddenPath), `forbidden old implementation path exists: ${forbiddenPath}`);
}

const ledger = read("docs/phase-ledger.md");
assert(/Phase 2: Build The Workspace Agent Creative Director Workflow/u.test(ledger), "Phase 2 ledger section missing.");
assert(/Status: closed/u.test(ledger), "Phase 2 must be closed in ledger.");
assert(/Phase 3:/u.test(ledger), "Phase 3 next section missing.");
assert(/No production reel implementation has started/iu.test(ledger), "No-production ledger statement missing.");

console.log("Phase 2 validation passed: Workspace Agent workflow is closed.");
