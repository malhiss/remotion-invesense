import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const fail = (message) => {
  console.error(`Phase 3 validation failed: ${message}`);
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

const requiredFiles = [
  "src/contracts/family-bc-visual-system-contract.ts",
  "src/data/family-bc-visual-system-calibration.ts",
  "src/compositions/FamilyBCVisualSystemCalibration.tsx",
  "src/components/family-bc/index.ts",
  "src/components/family-bc/charts.tsx",
  "src/components/family-bc/lottie.tsx",
  "scripts/ingest-approved-lottie.mjs",
  "scripts/run-phase3-review.mjs",
];

for (const file of requiredFiles) {
  assert(exists(file), `required Phase 3 file missing: ${file}`);
}

const root = read("src/Root.tsx");
assert(
  /id="FamilyBCVisualSystemCalibration"/u.test(root),
  "Phase 3 calibration composition is not registered.",
);
assert(
  !/ProductionReel|PilotReel/u.test(root),
  "Phase 3 must not register production or pilot compositions.",
);

const lottie = read("src/components/family-bc/lottie.tsx");
assert(/staticFile\(/u.test(lottie), "ApprovedLottie must use staticFile().");
assert(!/https:\/\/|http:\/\//u.test(lottie), "ApprovedLottie must not hardcode remote URLs.");

const manifest = readJson("public/lottie/manifest.json");
for (const asset of manifest.assets) {
  assert(asset.approvedByHuman === true, `Lottie asset is not human-approved: ${asset.id}`);
  assert(Boolean(asset.localPath), `Lottie localPath missing: ${asset.id}`);
  assert(Boolean(asset.licenseNote), `Lottie licenseNote missing: ${asset.id}`);
  assert(Boolean(asset.fallbackNativeRemotionOption), `Lottie fallback missing: ${asset.id}`);
}

const review = spawnSync("node", ["scripts/run-phase3-review.mjs"], {
  cwd: projectRoot,
  encoding: "utf8",
  shell: false,
});
assert(review.status === 0, review.stderr || review.stdout);
const match = review.stdout.match(
  /---PHASE3_REVIEW_JSON_START---\s*([\s\S]+?)\s*---PHASE3_REVIEW_JSON_END---/u,
);
assert(Boolean(match), "Phase 3 review output missing marked JSON.");
const reviewManifest = JSON.parse(match[1]);
assert(
  reviewManifest.productionImplementationAllowed === false,
  "Phase 3 review must block production implementation.",
);
assert(
  reviewManifest.finalRenderApproval === false,
  "Phase 3 review must not approve final renders.",
);

const fixture = read("src/data/family-bc-visual-system-calibration.ts");
assert(/readinessStatus:\s*"calibration-only"/u.test(fixture), "fixture must be calibration-only.");
assert(/productionImplementationAllowed:\s*false/u.test(fixture), "fixture must block production.");

const ledger = read("docs/phase-ledger.md");
assert(/Phase 3: Build The Family B\/C Visual System/u.test(ledger), "Phase 3 ledger section missing.");
assert(/Status: closed/u.test(ledger), "Phase 3 must be marked closed.");
assert(/Phase 4:/u.test(ledger), "Phase 4 next section missing.");
assert(
  /No production reel implementation has started/iu.test(ledger),
  "ledger must preserve no-production statement.",
);

console.log("Phase 3 validation passed: Family B/C visual system foundation is closed.");
