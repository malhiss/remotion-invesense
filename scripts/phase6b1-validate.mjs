import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const fail = (message) => {
  console.error(`Phase 6B.1 validation failed: ${message}`);
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

for (const file of [
  "src/contracts/visual-stress-audit-contract.ts",
  "src/data/phase6b-system-stress-audit.ts",
  "scripts/phase6b-audit.mjs",
  "scripts/run-phase6b-review.mjs",
]) {
  assert(exists(file), `required system-hardening file missing: ${file}`);
}

const handoff = read("src/data/phase6b-sukuk-stills-handoff.ts");
for (const field of [
  "noLabelRead",
  "proofBirthAttachment",
  "lottieRoleFit",
  "visualStressAudit",
  "cardDriftRisk",
]) {
  assert(handoff.includes(field), `handoff missing required stress-audit field: ${field}`);
}

const composition = read("src/compositions/SukukThresholdRailStills.tsx");
assert(!composition.includes("Phase 6B review:"), "production-style visual stills contain review scope text.");
assert(!composition.includes("not a floating card"), "production-style visual stills contain internal critique text.");
assert(
  !composition.includes("The chart is the terrain. The threshold is the event."),
  "production-style visual stills still rely on mechanism helper copy.",
);
assert(composition.includes("ReviewOnlyOverlay"), "review scaffolding must be isolated behind ReviewOnlyOverlay.");
assert(composition.includes("EventAttachedProof"), "proof label must use an event-attached primitive.");

const packageJson = readJson("package.json");
assert(packageJson.scripts["phase6b:audit"] === "node scripts/phase6b-audit.mjs", "missing phase6b:audit script.");
assert(packageJson.scripts["phase6b1:validate"] === "node scripts/phase6b1-validate.mjs", "missing phase6b1:validate script.");

const audit = spawnSync(process.execPath, ["scripts/phase6b-audit.mjs"], {
  cwd: projectRoot,
  encoding: "utf8",
});
assert(audit.status === 0, audit.stderr || audit.stdout);
const auditManifest = parseMarkedJson(audit.stdout, "PHASE6B_AUDIT");
assert(auditManifest.renderGate.draftMp4Allowed === false, "draft MP4 must remain blocked.");
assert(auditManifest.renderGate.finalMp4Allowed === false, "final MP4 must remain blocked.");
assert(auditManifest.auditDimensions.includes("no-label-mechanism"), "audit must include no-label mechanism checks.");
assert(auditManifest.auditDimensions.includes("lottie-role-fit"), "audit must include Lottie role-fit checks.");

printMarkedJson("PHASE6B1_VALIDATE", {
  phase: "Phase 6B.1: System Hardening",
  closed: false,
  checks: {
    stressAuditContracts: true,
    workspaceAgentHandoffRules: true,
    reviewScaffoldingSeparated: true,
    draftMp4Allowed: false,
    finalMp4Allowed: false,
  },
  next: "Human review of hardened stills/contact sheet before any draft MP4 approval.",
});

function parseMarkedJson(stdout, marker) {
  const start = `---${marker}_JSON_START---`;
  const end = `---${marker}_JSON_END---`;
  const startIndex = stdout.indexOf(start);
  const endIndex = stdout.indexOf(end);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error(`Missing ${marker} marked JSON in output.`);
  }

  return JSON.parse(stdout.slice(startIndex + start.length, endIndex).trim());
}

function printMarkedJson(marker, payload) {
  console.log(`---${marker}_JSON_START---`);
  console.log(JSON.stringify(payload, null, 2));
  console.log(`---${marker}_JSON_END---`);
}
