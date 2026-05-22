import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

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

const requiredHumanGates = [
  "route approval",
  "source approval",
  "chart proof approval",
  "asset/Lottie approval",
  "styleframe approval",
  "Codex readiness approval",
  "still/contact-sheet approval",
  "draft approval",
  "final approval",
];

const read = (relativePath) =>
  fs.readFileSync(path.join(projectRoot, relativePath), "utf8");

const readJson = (relativePath) => JSON.parse(read(relativePath));

const exists = (relativePath) => fs.existsSync(path.join(projectRoot, relativePath));

const fail = (message) => {
  console.error(`Phase 1 validation failed: ${message}`);
  process.exit(1);
};

const assert = (condition, message) => {
  if (!condition) {
    fail(message);
  }
};

const assertText = (relativePath, pattern, message) => {
  const content = read(relativePath);
  assert(pattern.test(content), message);
};

const requireArray = (value, message) => {
  assert(Array.isArray(value) && value.length > 0, message);
};

for (const docName of requiredDocs) {
  assert(
    exists(`docs/workspace-agent/${docName}`),
    `Workspace Agent doc missing: docs/workspace-agent/${docName}`,
  );
}

assertText(
  "docs/workspace-agent/operating-manual.md",
  /Workspace Agent is the creative director/u,
  "Workspace Agent creative-director authority must be explicit.",
);
assertText(
  "docs/workspace-agent/operating-manual.md",
  /Codex is implementation-only/u,
  "Codex implementation-only boundary must be explicit.",
);
assert(
  !/Codex chooses the route/iu.test(read("docs/workspace-agent/operating-manual.md")),
  "Codex must not be granted creative-director authority.",
);
assertText(
  "docs/workspace-agent/family-grammar.md",
  /Family B\/C.*primary/iu,
  "Family B/C must be primary.",
);
assertText(
  "docs/workspace-agent/family-grammar.md",
  /Family A.*motion-energy.*secondary/iu,
  "Family A must be secondary motion-energy reference only.",
);
assertText(
  "docs/workspace-agent/codex-handoff-rules.md",
  /text-only handoffs are blocked/iu,
  "Complex text-only handoffs must be blocked.",
);

const atlas = readJson("docs/workspace-agent/benchmark-atlas.json");
const index = readJson("docs/workspace-agent/benchmark-index.json");
const batch01 = readJson("benchmarks/batch-01/manifest.json");
const batch02 = readJson("benchmarks/batch-02/manifest.json");
const sourcePaths = [...batch01.files, ...batch02.files].map(
  (file) => file.relativePath,
);

assert(atlas.version === 1, "benchmark-atlas.json version must be 1.");
assert(
  atlas.totalVideos === sourcePaths.length,
  "benchmark-atlas.json must cover every benchmark source video.",
);
assert(
  atlas.entries.length === sourcePaths.length,
  "benchmark-atlas.json entry count must match source video count.",
);

const atlasPaths = new Set(atlas.entries.map((entry) => entry.sourcePath));
for (const sourcePath of sourcePaths) {
  assert(atlasPaths.has(sourcePath), `Missing atlas entry for ${sourcePath}.`);
}

for (const entry of atlas.entries) {
  assert(entry.id, "Every benchmark atlas entry needs an id.");
  assert(entry.topic, `${entry.id} needs a topic.`);
  assert(
    ["family-a", "family-b", "family-c", "family-bc-hybrid"].includes(
      entry.family,
    ),
    `${entry.id} has invalid family classification.`,
  );
  requireArray(entry.assets, `${entry.id} needs assets.`);
  requireArray(entry.motifs, `${entry.id} needs motifs.`);
  requireArray(entry.analogies, `${entry.id} needs analogies.`);
  requireArray(entry.wowEvents, `${entry.id} needs wow events.`);
  requireArray(entry.proofOperators, `${entry.id} needs proof operators.`);
  assert(entry.chartRole, `${entry.id} needs chartRole.`);
  assert(entry.ctaBehavior, `${entry.id} needs ctaBehavior.`);
  requireArray(entry.whatToAdapt, `${entry.id} needs whatToAdapt.`);
  requireArray(entry.whatNotToCopy, `${entry.id} needs whatNotToCopy.`);
  assert(["low", "medium", "high"].includes(entry.copyRisk), `${entry.id} copyRisk invalid.`);
}

assert(index.byFamily["family-b"]?.length > 0, "Family B index cannot be empty.");
assert(index.byFamily["family-c"]?.length > 0, "Family C index cannot be empty.");
assert(index.byFamily["family-a"]?.length > 0, "Family A index cannot be empty.");
assert(
  index.byMotif["chart-as-terrain"]?.length > 0,
  "chart-as-terrain motif must be searchable.",
);
assert(
  index.byProofOperator["cta-underline-inheritance"]?.length > 0,
  "cta-underline-inheritance proof operator must be searchable.",
);

const contract = read("src/contracts/workspace-agent-contract.ts");
assert(
  /export const BenchmarkAtlasEntrySchema/u.test(contract),
  "BenchmarkAtlasEntrySchema export missing.",
);
assert(
  /export const WorkspaceAgentPacketStackSchema/u.test(contract),
  "WorkspaceAgentPacketStackSchema export missing.",
);
assert(
  /export type WorkspaceAgentPacketStack/u.test(contract),
  "WorkspaceAgentPacketStack type export missing.",
);

const fixture = readJson(
  "docs/workspace-agent/examples/family-bc-sample-packet-stack.json",
);
assert(
  fixture.productionImplementationAllowed === false,
  "productionImplementationAllowed must remain false in Phase 1.",
);
assert(
  fixture.workspaceAgentRole === "creative-director",
  "Fixture must keep Workspace Agent as creative director.",
);
assert(
  fixture.codexRole === "implementation-only",
  "Fixture must keep Codex implementation-only.",
);
assert(
  fixture.codexHandoff?.readinessStatus === "ready",
  "Sample Codex handoff should be ready for schema-level validation.",
);
assert(
  fixture.codexHandoff?.renderPermissions?.finalRenderApproval === false,
  "Phase 1 fixture must not grant final render approval.",
);
for (const gate of requiredHumanGates) {
  assert(
    fixture.requiredHumanGates.includes(gate),
    `Required human gate missing from fixture: ${gate}`,
  );
}

const ledger = read("docs/phase-ledger.md");
assert(
  /Phase 1: Build The New Knowledge Layer[\s\S]*?Status: closed/u.test(ledger),
  "Phase ledger must mark Phase 1 as closed.",
);
assert(
  /Phase 2: Build The Workspace Agent Creative Director Workflow[\s\S]*?Status: next/u.test(
    ledger,
  ),
  "Phase ledger must mark Phase 2 as next.",
);
assert(
  /No production reel implementation has started/iu.test(ledger),
  "Phase ledger must state that no production implementation has started.",
);

console.log("Phase 1 validation passed: Workspace Agent knowledge layer is closed.");
