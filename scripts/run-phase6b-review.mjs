import { spawnSync } from "node:child_process";

const DEFAULT_SOURCE_CHART_ID = "phase6b-global-sukuk-issuance";
const DEFAULT_LOTTIE_ID = "phase6b-data-flow-rail-pulse";

const args = process.argv.slice(2);

if (args.includes("--final-render") || args.includes("--draft-render")) {
  throw new Error(
    "Phase 6B is approved for stills/contact-sheet/source-chart comparison only. Draft and final MP4 renders remain blocked.",
  );
}

const reviewArgs = [
  "scripts/review-reel.mjs",
  "--composition",
  valueAfter("--composition") ?? "SukukThresholdRailStills",
  "--frame-set",
  valueAfter("--frame-set") ?? "phase6b-sukuk-stills",
  "--source-chart-comparison",
  valueAfter("--source-chart-comparison") ?? DEFAULT_SOURCE_CHART_ID,
  "--lottie-qa",
  valueAfter("--lottie-qa") ?? DEFAULT_LOTTIE_ID,
];

if (args.includes("--execute")) {
  reviewArgs.push("--execute");
}

const result = spawnSync(process.execPath, reviewArgs, {
  cwd: process.cwd(),
  encoding: "utf8",
});

if (result.error) {
  throw result.error;
}

if (result.status !== 0) {
  process.stdout.write(result.stdout);
  process.stderr.write(result.stderr);
  process.exit(result.status ?? 1);
}

const manifest = parseMarkedJson(result.stdout, "REVIEW_REEL");
manifest.phase = "Phase 6B: First Approved Pilot Handoff Stills";
manifest.executionScope = "stills-contact-sheet-source-chart-comparison-only";
manifest.productionReelStarted = false;
manifest.draftMp4RenderAllowed = false;
manifest.finalMp4RenderAllowed = false;
manifest.renderGate = {
  ...manifest.renderGate,
  productionReelStarted: false,
  draftMp4RenderAllowed: false,
  finalMp4RenderAllowed: false,
  rule: "Phase 6B can export stills, contact sheets, and source-chart comparison artifacts only.",
};

printMarkedJson("PHASE6B_REVIEW", manifest);

if (!args.includes("--execute")) {
  console.log("Phase 6B dry run only. Add --execute for approved still/contact-sheet artifacts.");
}

function valueAfter(flag) {
  const index = args.indexOf(flag);
  if (index === -1) {
    return null;
  }

  return args[index + 1] ?? null;
}

function parseMarkedJson(stdout, marker) {
  const start = `---${marker}_JSON_START---`;
  const end = `---${marker}_JSON_END---`;
  const startIndex = stdout.indexOf(start);
  const endIndex = stdout.indexOf(end);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error(`Missing ${marker} marked JSON in review output.`);
  }

  return JSON.parse(stdout.slice(startIndex + start.length, endIndex).trim());
}

function printMarkedJson(marker, payload) {
  console.log(`---${marker}_JSON_START---`);
  console.log(JSON.stringify(payload, null, 2));
  console.log(`---${marker}_JSON_END---`);
}

