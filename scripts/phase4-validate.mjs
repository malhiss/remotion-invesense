import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const fail = (message) => {
  console.error(`Phase 4 validation failed: ${message}`);
  process.exit(1);
};

const assert = (condition, message) => {
  if (!condition) {
    fail(message);
  }
};

const read = (relativePath) => fs.readFileSync(path.join(projectRoot, relativePath), "utf8");
const exists = (relativePath) => fs.existsSync(path.join(projectRoot, relativePath));
const readJson = (relativePath) => JSON.parse(read(relativePath));

const requiredFiles = [
  "scripts/svg-chart-audit.mjs",
  "scripts/svg-chart-ingest.mjs",
  "scripts/run-phase4-svg-review.mjs",
  "scripts/phase4-validate.mjs",
  "src/contracts/svg-chart-intake-contract.ts",
  "src/components/family-bc/svg-chart.tsx",
  "docs/family-bc-system/phase4-svg-chart-intake.md",
  "public/source-charts/manifest.json",
];

for (const file of requiredFiles) {
  assert(exists(file), `required Phase 4 file missing: ${file}`);
}

const packageJson = readJson("package.json");
for (const scriptName of ["svg:chart-audit", "svg:chart-ingest", "phase4:svg-review", "phase4:validate"]) {
  assert(Boolean(packageJson.scripts?.[scriptName]), `package script missing: ${scriptName}`);
}

const componentSource = read("src/components/family-bc/svg-chart.tsx");
assert(/AnimatedSourceBarChart/u.test(componentSource), "horizontal source bar chart component missing.");
assert(/AnimatedSourceGroupedBarChart/u.test(componentSource), "grouped source bar chart component missing.");
assert(/AnimatedSourceStackedBarChart/u.test(componentSource), "stacked source bar chart component missing.");
assert(/AnimatedSourceLineChart/u.test(componentSource), "line source chart component missing.");
assert(!/<Img\b/u.test(componentSource), "SVG chart reconstruction must not render the final chart through <Img>.");

const review = spawnSync("node", ["scripts/run-phase4-svg-review.mjs"], {
  cwd: projectRoot,
  encoding: "utf8",
  shell: false,
});
assert(review.status === 0, review.stderr || review.stdout);
const reviewMatch = review.stdout.match(
  /---PHASE4_SVG_REVIEW_JSON_START---\s*([\s\S]+?)\s*---PHASE4_SVG_REVIEW_JSON_END---/u,
);
assert(Boolean(reviewMatch), "Phase 4 SVG review output missing marked JSON.");
const reviewManifest = JSON.parse(reviewMatch[1]);
assert(reviewManifest.finalMp4RenderAllowed === false, "Phase 4 SVG review must block final MP4 renders.");
assert(reviewManifest.productionReelStarted === false, "Phase 4 SVG review must not start production.");

const manifest = readJson("public/source-charts/manifest.json");
assert(Array.isArray(manifest.charts), "source chart manifest must contain charts array.");
for (const chart of manifest.charts) {
  assert(chart.finalStaticSvgAllowed === false, `static SVG final chart allowed for ${chart.id}`);
  assert(chart.productionReelStarted === false, `production reel flag must stay false for ${chart.id}`);
  assert(Boolean(chart.humanApproval?.approvedBy), `human approval missing for ${chart.id}`);
  assert(Boolean(chart.sourceLocks?.sourceNote), `source note lock missing for ${chart.id}`);
}

const docs = read("docs/family-bc-system/phase4-svg-chart-intake.md");
assert(/Workspace Agent audits and approves/iu.test(docs), "Phase 4 docs must preserve Workspace Agent chart approval lane.");
assert(/Codex parses, reconstructs, animates/iu.test(docs), "Phase 4 docs must preserve Codex implementation lane.");
assert(/not static pasted images/iu.test(docs), "Phase 4 docs must forbid static chart pasting.");

const ledger = read("docs/phase-ledger.md");
assert(/Phase 4 Add-On: SVG Insight Chart Intake/u.test(ledger), "Phase 4 SVG add-on ledger section missing.");
assert(/Status: closed/u.test(ledger), "Phase 4 SVG add-on must be marked closed.");
assert(/Phase 5: First Approved Pilot Handoff/u.test(ledger), "Phase 5 next section missing.");

const validation = {
  phase4SvgChartIntake: {
    closed: true,
    scriptsPresent: true,
    nativeChartComponentsPresent: true,
    sourceChartManifestPresent: true,
  },
  boundaries: {
    productionReelStarted: false,
    staticSvgAsFinalChart: false,
    finalMp4RenderAllowed: false,
  },
  next: "Phase 5: First Approved Pilot Handoff",
};

console.log("---PHASE4_VALIDATE_JSON_START---");
console.log(JSON.stringify(validation, null, 2));
console.log("---PHASE4_VALIDATE_JSON_END---");

