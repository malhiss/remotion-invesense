import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const fail = (message) => {
  console.error(`Phase 6B validation failed: ${message}`);
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
  "src/compositions/SukukThresholdRailStills.tsx",
  "src/data/phase6b-sukuk-stills-handoff.ts",
  "public/lottie/phase6b-data-flow-rail-pulse.json",
  "public/source-charts/phase6b-global-sukuk-issuance.svg",
  "public/source-charts/phase6b-global-sukuk-issuance.json",
  "public/source-charts/phase6b-issuance-by-region-reference.svg",
  "public/source-charts/phase6b-sukuk-vs-global-agg-reference.svg",
  "scripts/run-phase6b-review.mjs",
];

for (const file of requiredFiles) {
  assert(exists(file), `required Phase 6B file missing: ${file}`);
}

const root = read("src/Root.tsx");
assert(/id="SukukThresholdRailStills"/u.test(root), "SukukThresholdRailStills composition is not registered.");

const handoff = read("src/data/phase6b-sukuk-stills-handoff.ts");
assert(/executionScope:\s*"stills-contact-sheet-source-chart-comparison-only"/u.test(handoff), "handoff scope must be stills-only.");
assert(/draftMp4Allowed:\s*false/u.test(handoff), "draft MP4 must remain blocked.");
assert(/finalMp4Allowed:\s*false/u.test(handoff), "final MP4 must remain blocked.");

const lottieManifest = readJson("public/lottie/manifest.json");
const dataFlow = lottieManifest.assets.find((asset) => asset.id === "phase6b-data-flow-rail-pulse");
assert(dataFlow?.approvedByHuman === true, "Data Flow Lottie must be human-approved.");
assert(dataFlow?.approvedUsage === "data-transfer", "Data Flow Lottie must remain a support-motion asset.");
assert(Boolean(dataFlow?.fallbackNativeRemotionOption), "Data Flow Lottie must keep a native fallback.");

const chartManifest = readJson("public/source-charts/manifest.json");
const globalChart = chartManifest.charts.find((chart) => chart.id === "phase6b-global-sukuk-issuance");
const regionChart = chartManifest.charts.find((chart) => chart.id === "phase6b-issuance-by-region-reference");
const chart03 = chartManifest.charts.find((chart) => chart.id === "phase6b-sukuk-vs-global-agg-reference");
assert(globalChart?.audit?.chartType === "line-chart", "Chart 01 must be the core line-chart proof.");
assert(globalChart?.finalStaticSvgAllowed === false, "Chart 01 cannot be a final static SVG.");
assert(/reference-only/iu.test(regionChart?.phase6bScope ?? ""), "Chart 02 must remain reference-only.");
assert(chart03?.audit?.supported === false, "Chart 03 must stay blocked until parser/manual extraction support exists.");

const review = spawnSync(process.execPath, ["scripts/run-phase6b-review.mjs"], {
  cwd: projectRoot,
  encoding: "utf8",
  shell: false,
});
assert(review.status === 0, review.stderr || review.stdout);

const manifest = parseMarkedJson(review.stdout, "PHASE6B_REVIEW");
assert(manifest.mode === "dry-run", "Phase 6B review should dry-run by default.");
assert(manifest.composition === "SukukThresholdRailStills", "Phase 6B review targets the wrong composition.");
assert(manifest.finalMp4RenderAllowed === false, "Phase 6B final MP4 must remain blocked.");
assert(manifest.draftMp4RenderAllowed === false, "Phase 6B draft MP4 must remain blocked.");
assert(manifest.productionReelStarted === false, "Phase 6B validation must not mark production as started.");

printMarkedJson("PHASE6B_VALIDATE", {
  phase6b: {
    closed: false,
    implementationScope: "stills-contact-sheet-source-chart-comparison-only",
    composition: "SukukThresholdRailStills",
  },
  boundaries: {
    draftMp4RenderAllowed: false,
    finalMp4RenderAllowed: false,
    productionReelStarted: false,
  },
  next: "Human review of stills/contact sheet before any draft MP4 approval.",
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

