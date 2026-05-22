import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const args = new Set(process.argv.slice(2));
const reviewDir = path.join(
  projectRoot,
  "out",
  "review",
  "FamilyBCVisualSystemCalibration",
);
const contactSheet = path.join(reviewDir, "phase3-contact-sheet.jpg");
const remotionCli = path.join(
  projectRoot,
  "node_modules",
  "@remotion",
  "cli",
  "remotion-cli.js",
);
const reviewManifest = {
  phase: "phase-3-family-bc-visual-system",
  composition: "FamilyBCVisualSystemCalibration",
  frameSetId: "phase3-visual-system-calibration",
  frames: {
    hook: 45,
    chart: 210,
    event: 420,
    proof: 540,
    lottie: 735,
    ctaResidue: 990,
  },
  stillsAllowed: true,
  contactSheetAllowed: true,
  draftMp4Allowed: false,
  finalRenderApproval: false,
  productionImplementationAllowed: false,
  contactSheet,
  rule: "Phase 3 review exports stills/contact sheets only; final MP4 is blocked.",
};

if (args.has("--final-render")) {
  throw new Error("Phase 3 cannot render final MP4s.");
}

if (!args.has("--execute")) {
  printManifest();
  console.log("Dry run only. Add --execute to export stills and contact sheet.");
  process.exit(0);
}

fs.mkdirSync(reviewDir, { recursive: true });

const stillInputs = Object.entries(reviewManifest.frames).map(([label, frame]) => {
  const output = path.join(reviewDir, `${label}-${String(frame).padStart(4, "0")}.png`);
  run(process.execPath, [
    remotionCli,
    "still",
    "src/index.ts",
    reviewManifest.composition,
    output,
    `--frame=${frame}`,
  ]);
  return output;
});

run("ffmpeg", [
  "-y",
  ...stillInputs.flatMap((input) => ["-i", input]),
  "-filter_complex",
  `${stillInputs.map((_, index) => `[${index}:v]`).join("")}vstack=inputs=${stillInputs.length}[out]`,
  "-map",
  "[out]",
  "-frames:v",
  "1",
  "-update",
  "1",
  contactSheet,
]);

printManifest();

function printManifest() {
  console.log("---PHASE3_REVIEW_JSON_START---");
  console.log(JSON.stringify(reviewManifest, null, 2));
  console.log("---PHASE3_REVIEW_JSON_END---");
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
