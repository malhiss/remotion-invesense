import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const requiredFiles = [
  "src/contracts/phase5-review-qa-contract.ts",
  "scripts/review-reel.mjs",
  "scripts/run-phase5-review.mjs",
  "scripts/phase5-validate.mjs",
  "docs/family-bc-system/phase5-review-qa-tooling.md",
];

for (const file of requiredFiles) {
  assert(fs.existsSync(path.join(projectRoot, file)), `Missing required file: ${file}`);
}

const packageJson = readJson("package.json");
assert(packageJson.scripts["phase5:review"] === "node scripts/run-phase5-review.mjs", "Missing phase5:review npm script.");
assert(packageJson.scripts["phase5:validate"] === "node scripts/phase5-validate.mjs", "Missing phase5:validate npm script.");

const reviewEngine = readText("scripts/review-reel.mjs");
for (const requiredSnippet of [
  'printMarkedJson("REVIEW_REEL"',
  "phase5-review",
  "benchmarkComparison",
  "sourceChartComparison",
  "safeZoneQA",
  "lottieQA",
  "finalMp4RenderAllowed: false",
  "productionReelStarted: false",
]) {
  assert(reviewEngine.includes(requiredSnippet), `review-reel.mjs missing ${requiredSnippet}`);
}

const ledger = readText("docs/phase-ledger.md");
for (const requiredSnippet of [
  "Phase 5: Review + QA Tooling",
  "Status: closed",
  "Phase 6: First Approved Pilot Handoff",
  "No production reel implementation has started",
]) {
  assert(ledger.includes(requiredSnippet), `phase ledger missing ${requiredSnippet}`);
}

const phase5Review = spawnSync(process.execPath, ["scripts/run-phase5-review.mjs"], {
  cwd: projectRoot,
  encoding: "utf8",
});

if (phase5Review.error) {
  throw phase5Review.error;
}

assert(phase5Review.status === 0, phase5Review.stderr || phase5Review.stdout);

const manifest = parseMarkedJson(phase5Review.stdout, "PHASE5_REVIEW");

assert(manifest.phase === "Phase 5: Review + QA Tooling", "Phase 5 review manifest has wrong phase.");
assert(manifest.mode === "dry-run", "Phase 5 review must dry-run by default.");
assert(manifest.productionReelStarted === false, "Phase 5 cannot start production reel implementation.");
assert(manifest.finalMp4RenderAllowed === false, "Phase 5 cannot allow final MP4 rendering.");
assert(manifest.benchmarkComparison?.contactSheetPath, "Benchmark comparison must include contact sheet metadata.");
assert(manifest.sourceChartComparison?.staticSvgAsFinalChartAllowed === false, "Source charts cannot be approved as static wallpaper.");
assert(manifest.safeZoneQA?.format?.width === 1080, "Safe-zone QA must target 1080 width.");
assert(manifest.safeZoneQA?.format?.height === 1920, "Safe-zone QA must target 1920 height.");
assert(manifest.lottieQA?.heroMetaphorAllowed === false, "Lottie QA must keep Lottie out of hero-metaphor authority.");

const validation = {
  phase5ReviewQA: {
    closed: true,
    reviewEngine: true,
    benchmarkComparison: true,
    sourceChartComparison: true,
    safeZoneQA: true,
    lottieQA: true,
  },
  boundaries: {
    productionReelStarted: false,
    finalMp4RenderAllowed: false,
  },
  next: "Phase 6: First Approved Pilot Handoff",
};

printMarkedJson("PHASE5_VALIDATE", validation);

function readText(relativePath) {
  return fs.readFileSync(path.join(projectRoot, relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(readText(relativePath));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function parseMarkedJson(stdout, marker) {
  const start = `---${marker}_JSON_START---`;
  const end = `---${marker}_JSON_END---`;
  const startIndex = stdout.indexOf(start);
  const endIndex = stdout.indexOf(end);

  assert(startIndex !== -1, `Missing ${start} marker.`);
  assert(endIndex !== -1, `Missing ${end} marker.`);

  return JSON.parse(stdout.slice(startIndex + start.length, endIndex).trim());
}

function printMarkedJson(marker, payload) {
  console.log(`---${marker}_JSON_START---`);
  console.log(JSON.stringify(payload, null, 2));
  console.log(`---${marker}_JSON_END---`);
}
