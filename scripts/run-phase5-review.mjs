import { spawnSync } from "node:child_process";

const DEFAULT_BENCHMARK_ID =
  "batch-02-money-moved-33-trillion-on-blockchains-last-year-more-than-visa-and-mast-4c6c4958";
const DEFAULT_SOURCE_CHART_ID = "chart_01_sector_breakdown";
const DEFAULT_LOTTIE_ID = "phase3-approved-pulse";

const args = process.argv.slice(2);

if (args.includes("--final-render")) {
  throw new Error(
    "Phase 5 cannot render final MP4s. Review stills/contact sheets only; first pilot handoff moves to Phase 6.",
  );
}

const reviewArgs = [
  "scripts/review-reel.mjs",
  "--composition",
  valueAfter("--composition") ?? "FamilyBCVisualSystemCalibration",
  "--frame-set",
  valueAfter("--frame-set") ?? "phase5-review",
  "--benchmark-comparison",
  valueAfter("--benchmark-comparison") ?? DEFAULT_BENCHMARK_ID,
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
manifest.phase = "Phase 5: Review + QA Tooling";
manifest.productionReelStarted = false;
manifest.finalMp4RenderAllowed = false;
manifest.renderGate = {
  ...manifest.renderGate,
  productionReelStarted: false,
  finalMp4RenderAllowed: false,
  rule: "Phase 5 exports review artifacts only. First approved pilot handoff is Phase 6.",
};

printMarkedJson("PHASE5_REVIEW", manifest);

if (!args.includes("--execute")) {
  console.log("Phase 5 dry run only. Add --execute for still/contact-sheet review artifacts.");
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
