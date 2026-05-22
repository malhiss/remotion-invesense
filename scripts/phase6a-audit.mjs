import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const packageRoot = "agent-packages/invesense-workspace-agent";

const requiredCoverage = [
  { id: "moment-cards", patterns: [/moment card/i, /no-label/i] },
  { id: "continuous-motion", patterns: [/continuous motion/i, /object permanence/i] },
  { id: "analogy-scoring", patterns: [/analogy scoring/i, /failure mode/i] },
  { id: "visual-search-copy-risk", patterns: [/search playbook/i, /citation/i, /copy-risk/i] },
  { id: "brand-manual-labels", patterns: [/brandbook/i, /manual reel/i, /label budget/i] },
  { id: "remotion-3d-governance", patterns: [/3D governance/i, /pseudo-3D/i] },
  { id: "pacing-variants", patterns: [/retention pacing/i, /format duration/i, /variant/i] },
  { id: "failure-diagnosis", patterns: [/visual causality/i, /prompt failure/i, /legacy component inventory/i] },
];

const read = (relativePath) => fs.readFileSync(path.join(projectRoot, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));

const manifest = readJson(`${packageRoot}/manifest.json`);
const oldSystemAudit = readJson(`${packageRoot}/knowledge/old-system-audit-register.json`);
const combinedKnowledge = manifest.knowledge
  .map((fileName) => read(`${packageRoot}/knowledge/${fileName}`))
  .join("\n");
const combinedSkills = manifest.skills
  .map((skill) => read(`${packageRoot}/skills/${skill.id}/SKILL.md`))
  .join("\n");

const coverageTopics = requiredCoverage.map((topic) => ({
  id: topic.id,
  covered: topic.patterns.every((pattern) => pattern.test(combinedKnowledge) || pattern.test(combinedSkills)),
}));

const audit = {
  phase: "phase-6a-2-depth-audit",
  skillCount: {
    current: manifest.skills.length,
    oldV2: oldSystemAudit.sourceSummary.v2Skills,
  },
  knowledgeCount: manifest.knowledge.length,
  referenceCount: manifest.references.length,
  coverageTopics,
  productionImplementationAllowed: false,
  codexHandoffStatus: "blocked",
  next: "Phase 6B: First Approved Pilot Handoff",
};

const uncovered = coverageTopics.filter((topic) => topic.covered === false);
if (manifest.skills.length !== 13 || oldSystemAudit.sourceSummary.v2Skills < 60 || uncovered.length > 0) {
  console.error(
    JSON.stringify(
      {
        error: "Phase 6A.2 depth audit failed",
        uncovered,
      },
      null,
      2,
    ),
  );
  process.exit(1);
}

console.log("---PHASE6A_AUDIT_JSON_START---");
console.log(JSON.stringify(audit, null, 2));
console.log("---PHASE6A_AUDIT_JSON_END---");
