import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const requiredFrames = [0, 24, 45, 60, 75, 90];
const labeledContactSheet = path.join(
  projectRoot,
  "out",
  "review",
  "FamilyBCAssetEventPrimitiveLab",
  "contact-sheet.jpg",
);
const labelHiddenContactSheet = path.join(
  projectRoot,
  "out",
  "review",
  "FamilyBCAssetEventPrimitiveLab",
  "label-hidden-contact-sheet.jpg",
);

const review = spawnSync("cmd.exe", ["/c", "npm.cmd", "run", "phase6b2:review"], {
  cwd: projectRoot,
  encoding: "utf8",
});

if (review.status !== 0) {
  process.stdout.write(review.stdout);
  process.stderr.write(review.stderr);
  process.exit(review.status ?? 1);
}

const manifest = parseMarkedJson(review.stdout, "PHASE6B2_REVIEW");

assertEqual(manifest.phase, "Phase 6B.2: Benchmark-Targeted Asset Event Primitive Lab");
assertEqual(manifest.composition, "FamilyBCAssetEventPrimitiveLab");
assertEqual(
  manifest.benchmarkTarget.benchmarkTargetId,
  "batch-01-whatsapp-video-2026-04-30-at-3-42-34-pm-1-93332d51",
);
assertIncludes(manifest.benchmarkTarget.benchmarkContactSheetPath, "contact.jpg");
assertIncludes(manifest.benchmarkTarget.referenceFramePath, "contact.jpg");
assertEqual(manifest.benchmarkTarget.copyRisk, "medium");
assertEqual(manifest.structuralAttachment.eventSurfaceId, "asset-event-lab-resistance-line");
assertEqual(manifest.structuralAttachment.proofSurfaceId, "asset-event-lab-proof-stamp");
assertEqual(manifest.structuralAttachment.proofAttachmentMode, "latch");
assertEqual(manifest.structuralAttachment.proofBirthFrame, 75);
assertEqual(manifest.structuralAttachment.residueObjectId, "asset-event-lab-residue-line");
assertEqual(manifest.noLabelReadSelfAssessment, "risk");
assertEqual(manifest.humanNoLabelReview, "pending");
assertEqual(manifest.renderGate.draftMp4Allowed, false);
assertEqual(manifest.renderGate.finalMp4Allowed, false);
assertEqual(manifest.codexClaims.visualPass, false);
assertEqual(manifest.codexClaims.premiumPass, false);
assertEqual(manifest.codexClaims.benchmarkPass, false);
assertEqual(manifest.codexClaims.finalNoLabelPass, false);
assertDeepEqual(
  manifest.labeledFrames.map((frame) => frame.frame),
  requiredFrames,
);
assertDeepEqual(
  manifest.labelHiddenFrames.map((frame) => frame.frame),
  requiredFrames,
);

for (const filePath of [
  "src/contracts/asset-event-lab-contract.ts",
  "src/data/family-bc-asset-event-primitive-lab.ts",
  "src/components/family-bc/asset-event-primitives.tsx",
  "src/compositions/FamilyBCAssetEventPrimitiveLab.tsx",
]) {
  assertFileExists(path.join(projectRoot, filePath));
}

const root = read("src/Root.tsx");
const charts = read("src/components/family-bc/charts.tsx");
const cta = read("src/components/family-bc/cta.tsx");
const ledger = read("docs/phase-ledger.md");

for (const requiredText of [
  "FamilyBCAssetEventPrimitiveLab",
  "FamilyBCAssetEventPrimitiveLabSchema",
  "durationInFrames={familyBCAssetEventPrimitiveLab.format.durationInFrames}",
]) {
  assertIncludes(root, requiredText);
}

for (const requiredText of [
  "valuePlacement",
  "attachmentMode",
  "eventSurfaceId",
  "proofSurfaceId",
  "proofAttachmentMode",
  "calibration-only",
]) {
  assertIncludes(charts, requiredText);
}

assertIncludes(cta, "residueObjectId");
assertIncludes(cta, "calibration-only");
assertIncludes(ledger, "Phase 6B.2: Benchmark-Targeted Asset Event Primitive Lab");
assertIncludes(ledger, "Status: closed");
assertIncludes(ledger, "human no-label review remains pending");

assertFileExists(labeledContactSheet);
assertFileExists(labelHiddenContactSheet);

const blocked = spawnSync(
  "cmd.exe",
  ["/c", "npm.cmd", "run", "phase6b2:review", "--", "--final-render"],
  {
    cwd: projectRoot,
    encoding: "utf8",
  },
);

if (blocked.status === 0) {
  throw new Error("phase6b2:review --final-render must remain blocked.");
}

console.log("Phase 6B.2 validation passed.");
printMarkedJson("PHASE6B2_VALIDATE", {
  phase: manifest.phase,
  benchmarkTargetId: manifest.benchmarkTarget.benchmarkTargetId,
  labeledContactSheet,
  labelHiddenContactSheet,
  noLabelReadSelfAssessment: manifest.noLabelReadSelfAssessment,
  humanNoLabelReview: manifest.humanNoLabelReview,
  draftMp4Avoided: true,
  finalMp4Avoided: true,
  codexClaimsVisualPremiumBenchmarkPass: false,
});

function read(relativePath) {
  return fs.readFileSync(path.join(projectRoot, relativePath), "utf8");
}

function assertFileExists(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Expected file to exist: ${filePath}`);
  }
}

function assertIncludes(haystack, needle) {
  if (!haystack.includes(needle)) {
    throw new Error(`Expected text to include: ${needle}`);
  }
}

function assertEqual(actual, expected) {
  if (actual !== expected) {
    throw new Error(`Expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`);
  }
}

function assertDeepEqual(actual, expected) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`Expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`);
  }
}

function parseMarkedJson(stdout, marker) {
  const start = `---${marker}_JSON_START---`;
  const end = `---${marker}_JSON_END---`;
  const startIndex = stdout.indexOf(start);
  const endIndex = stdout.indexOf(end);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error(`Missing ${marker} marked JSON.`);
  }

  return JSON.parse(stdout.slice(startIndex + start.length, endIndex).trim());
}

function printMarkedJson(marker, payload) {
  console.log(`---${marker}_JSON_START---`);
  console.log(JSON.stringify(payload, null, 2));
  console.log(`---${marker}_JSON_END---`);
}
