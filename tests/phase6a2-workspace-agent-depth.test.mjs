import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const repoRoot = process.cwd();

const roots = ["workspace-agent", "agent-packages/invesense-workspace-agent"];

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

const phase6a2KnowledgeFiles = [
  "benchmark-moment-card-system.md",
  "continuous-motion-and-object-permanence.md",
  "analogy-scoring-and-failure-modes.md",
  "visual-reference-search-and-copy-risk.md",
  "brandbook-manual-reel-and-label-rules.md",
  "remotion-3d-and-capability-governance.md",
  "motion-pacing-format-and-variant-rules.md",
  "failure-diagnosis-and-legacy-component-inventory.md",
];

const requiredDepthTopics = [
  /moment card/i,
  /no-label/i,
  /asset-led/i,
  /animated chart-only/i,
  /continuous motion/i,
  /object permanence/i,
  /analogy scoring/i,
  /failure mode/i,
  /search playbook/i,
  /citation/i,
  /copy-risk/i,
  /brandbook/i,
  /manual reel/i,
  /3D governance/i,
  /pseudo-3D/i,
  /retention pacing/i,
  /format duration/i,
  /variant/i,
  /visual causality/i,
  /prompt failure/i,
  /legacy component inventory/i,
  /Workspace Agent searches/i,
  /Codex ingests/i,
];

const phase6a2FixtureFiles = [
  "phase6a2-source-chart-heavy-family-b.json",
  "phase6a2-logo-asset-heavy-family-c.json",
  "phase6a2-lottie-support-motion.json",
  "phase6a2-failed-output-diagnosis.json",
];

const read = (relativePath) => readFileSync(join(repoRoot, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));
const exists = (relativePath) => existsSync(join(repoRoot, relativePath));

const parseMarkedJson = (stdout, marker) => {
  const start = `---${marker}_JSON_START---`;
  const end = `---${marker}_JSON_END---`;
  const startIndex = stdout.indexOf(start);
  const endIndex = stdout.indexOf(end);

  assert.notEqual(startIndex, -1, `Missing ${start} marker in:\n${stdout}`);
  assert.notEqual(endIndex, -1, `Missing ${end} marker in:\n${stdout}`);

  return JSON.parse(stdout.slice(startIndex + start.length, endIndex).trim());
};

test("Phase 6A.2 exposes final old-v2 parity knowledge without restoring skill sprawl", () => {
  for (const root of roots) {
    const manifest = readJson(`${root}/manifest.json`);

    assert.equal(manifest.skills.length, 13, `${root} should keep 13 consolidated skills`);
    assert.notEqual(manifest.skills.length, 63, `${root} must not restore old 63-skill sprawl`);

    for (const fileName of phase6a2KnowledgeFiles) {
      const knowledgePath = `${root}/knowledge/${fileName}`;
      assert.ok(exists(knowledgePath), `${knowledgePath} should exist`);
      assert.ok(
        manifest.knowledge.includes(fileName),
        `${root} manifest should list ${fileName}`,
      );

      const source = read(knowledgePath);
      assert.ok(source.length > 1400, `${knowledgePath} should be real backfill knowledge`);
    }
  }
});

test("Phase 6A.2 knowledge covers old-v2 recovery gaps that caused previous drift", () => {
  for (const root of roots) {
    const manifest = readJson(`${root}/manifest.json`);
    const combinedKnowledge = manifest.knowledge
      .map((fileName) => read(`${root}/knowledge/${fileName}`))
      .join("\n");

    for (const topicPattern of requiredDepthTopics) {
      assert.match(combinedKnowledge, topicPattern, `${root} missing ${topicPattern}`);
    }
  }
});

test("Phase 6A.2 skills reference new depth knowledge selectively", () => {
  for (const root of roots) {
    for (const skillId of skillIds) {
      const source = read(`${root}/skills/${skillId}/SKILL.md`);
      const referencedBackfill = phase6a2KnowledgeFiles.filter((fileName) =>
        source.includes(`knowledge/${fileName}`),
      );

      assert.ok(
        referencedBackfill.length >= 1,
        `${root}/${skillId} should reference at least one Phase 6A.2 knowledge file`,
      );
      assert.ok(
        referencedBackfill.length <= 4,
        `${root}/${skillId} should load backfill knowledge selectively, not all at once`,
      );
    }
  }
});

test("Phase 6A.2 adds blocked forward-test fixtures for likely pilot prompts", () => {
  for (const root of roots) {
    for (const fileName of phase6a2FixtureFiles) {
      const fixturePath = `${root}/examples/${fileName}`;
      assert.ok(exists(fixturePath), `${fixturePath} should exist`);

      const fixture = readJson(fixturePath);
      assert.equal(fixture.reviewOnly, true, `${fixturePath} should stay review-only`);
      assert.equal(
        fixture.codexHandoff.readinessStatus,
        "blocked",
        `${fixturePath} should block Codex`,
      );
      assert.equal(
        fixture.productionImplementationAllowed,
        false,
        `${fixturePath} should not start production`,
      );
    }
  }
});

test("Phase 6A.2 captures asset-led Lottie clarification for future agent runs", () => {
  for (const root of roots) {
    const lottieKnowledge = read(`${root}/knowledge/lottie-asset-operating-system.md`);
    const assetKnowledge = read(`${root}/knowledge/styleframe-and-asset-board-rules.md`);
    const familyKnowledge = read(`${root}/knowledge/family-bc-benchmark-grammar.md`);
    const assetSkill = read(`${root}/skills/asset-lottie-planner/SKILL.md`);
    const handoffSkill = read(`${root}/skills/codex-readiness-handoff-gatekeeper/SKILL.md`);
    const assetTemplate = read(`${root}/templates/asset-lottie-board.md`);
    const handoffTemplate = read(`${root}/templates/codex-readiness-handoff.md`);

    const combined = [
      lottieKnowledge,
      assetKnowledge,
      familyKnowledge,
      assetSkill,
      handoffSkill,
      assetTemplate,
      handoffTemplate,
    ].join("\n");

    for (const requiredPhrase of [
      "not an animated chart-only reel",
      "asset-led event",
      "Workspace Agent searches",
      "Codex ingests",
      "candidate URL",
      "search query",
      "scene placement",
      "why it improves the metaphor",
      "license note",
      "native Remotion fallback",
    ]) {
      assert.match(combined, new RegExp(requiredPhrase, "i"), `${root} missing ${requiredPhrase}`);
    }
  }
});

test("Phase 6A.2 audit script reports old-v2 depth parity coverage", () => {
  const result = spawnSync("cmd.exe", ["/c", "npm.cmd", "run", "phase6a:audit"], {
    cwd: repoRoot,
    encoding: "utf8",
  });

  assert.equal(result.status, 0, result.stderr);
  const audit = parseMarkedJson(result.stdout, "PHASE6A_AUDIT");

  assert.equal(audit.phase, "phase-6a-2-depth-audit");
  assert.equal(audit.skillCount.current, 13);
  assert.ok(audit.skillCount.oldV2 >= 60);
  assert.equal(audit.productionImplementationAllowed, false);
  assert.equal(audit.codexHandoffStatus, "blocked");

  for (const topic of audit.coverageTopics) {
    assert.equal(topic.covered, true, `${topic.id} should be covered`);
  }
});
