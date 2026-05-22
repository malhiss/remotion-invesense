import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const args = new Set(process.argv.slice(2));
const projectRoot = process.cwd();
const composition = valueAfter("--composition") ?? "InvesenseCalibrationReel";
const frameSet = valueAfter("--frame-set") ?? "default";
const frameSets = {
  default: "30,90,148,280",
  "family-bc-calibration": "60,240,510,750,990",
};
const stillFrames = (valueAfter("--frames") ?? frameSets[frameSet] ?? frameSets.default)
  .split(",")
  .map((frame) => Number(frame.trim()))
  .filter((frame) => Number.isInteger(frame) && frame >= 0);
const reviewDir = path.join(projectRoot, "out", "review", composition);
const contactSheet = path.join(reviewDir, "contact-sheet.jpg");
const finalRenderApproval = process.env.FINAL_RENDER_APPROVAL === "true";
const stackMode =
  valueAfter("--stack") ??
  (frameSet === "family-bc-calibration" ? "vstack" : "hstack");
const benchmarkComparison = valueAfter("--benchmark-comparison") ?? null;
const sourceChartComparison = valueAfter("--source-chart-comparison") ?? null;
const remotionCli = path.join(
  projectRoot,
  "node_modules",
  "@remotion",
  "cli",
  "remotion-cli.js",
);

const manifest = {
  composition,
  frameSet,
  stillFrames,
  stackMode,
  contactSheet,
  benchmarkComparison,
  sourceChartComparison,
  finalRenderApproval,
  rule: "Review stills and contact sheet before any final render.",
};

if (args.has("--final-render") && !finalRenderApproval) {
  throw new Error(
    "FINAL_RENDER_APPROVAL=true is required before any final render command.",
  );
}

if (!args.has("--execute")) {
  console.log(JSON.stringify(manifest, null, 2));
  console.log("Dry run only. Add --execute to export review stills.");
  process.exit(0);
}

fs.mkdirSync(reviewDir, { recursive: true });

for (const frame of stillFrames) {
  const output = stillPath(frame);
  run(process.execPath, [
    remotionCli,
    "still",
    "src/index.ts",
    composition,
    output,
    `--frame=${frame}`,
  ]);
}

const stillInputs = stillFrames.map((frame) => stillPath(frame));
if (stillInputs.length === 1) {
  fs.copyFileSync(stillInputs[0], contactSheet);
} else {
  const stackFilter = stackMode === "vstack" ? "vstack" : "hstack";
  run("ffmpeg", [
    "-y",
    ...stillInputs.flatMap((input) => ["-i", input]),
    "-filter_complex",
    `${stillInputs.map((_, index) => `[${index}:v]`).join("")}${stackFilter}=inputs=${stillInputs.length}[out]`,
    "-map",
    "[out]",
    "-frames:v",
    "1",
    "-update",
    "1",
    contactSheet,
  ]);
}

console.log(JSON.stringify(manifest, null, 2));

function valueAfter(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1) {
    return null;
  }

  return process.argv[index + 1] ?? null;
}

function stillPath(frame) {
  return path.join(reviewDir, `frame-${String(frame).padStart(4, "0")}.png`);
}

function run(command, commandArgs) {
  const result = spawnSync(command, commandArgs, {
    cwd: projectRoot,
    stdio: "inherit",
    shell: false,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`${command} ${commandArgs.join(" ")} failed`);
  }
}
