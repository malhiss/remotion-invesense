import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const args = new Set(process.argv.slice(2));
const projectRoot = process.cwd();
const composition = valueAfter("--composition") ?? "InvesenseCalibrationReel";
const frameSet = valueAfter("--frame-set") ?? "default";
const finalRenderApproval = process.env.FINAL_RENDER_APPROVAL === "true";
const benchmarkComparisonId = valueAfter("--benchmark-comparison");
const sourceChartComparisonId = valueAfter("--source-chart-comparison");
const lottieQAAssetId = valueAfter("--lottie-qa");
const defaultFrameList = "30,90,148,280";
const reviewDir = path.join(projectRoot, "out", "review", composition);
const contactSheet = path.join(reviewDir, "contact-sheet.jpg");
const remotionCli = path.join(
  projectRoot,
  "node_modules",
  "@remotion",
  "cli",
  "remotion-cli.js",
);

const frameSetDefinitions = {
  default: {
    stackMode: "hstack",
    frames: [
      { role: "hook", frame: 30, purpose: "Default hook review frame." },
      { role: "chart", frame: 90, purpose: "Default chart/source review frame." },
      { role: "proof", frame: 148, purpose: "Default proof review frame." },
      { role: "cta-residue", frame: 280, purpose: "Default CTA residue review frame." },
    ],
  },
  "family-bc-calibration": {
    stackMode: "vstack",
    frames: [
      { role: "hook", frame: 60, purpose: "Family B/C calibration hook still." },
      { role: "chart", frame: 240, purpose: "Family B/C chart reveal still." },
      { role: "event", frame: 510, purpose: "Family B/C event still." },
      { role: "proof", frame: 750, purpose: "Family B/C proof birth still." },
      { role: "cta-residue", frame: 990, purpose: "Family B/C CTA residue still." },
    ],
  },
  "phase5-review": {
    stackMode: "vstack",
    frames: [
      { role: "hook", frame: 45, purpose: "Hook clarity and safe-zone still." },
      { role: "chart", frame: 210, purpose: "Chart/source proof still." },
      { role: "event", frame: 420, purpose: "Physical event or mechanism still." },
      { role: "proof", frame: 540, purpose: "Proof birth still after the event." },
      { role: "lottie", frame: 735, purpose: "Lottie accent QA still." },
      { role: "cta-residue", frame: 990, purpose: "CTA residue/memory-frame still." },
    ],
  },
};

if (args.has("--final-render") && !finalRenderApproval) {
  throw new Error(
    "FINAL_RENDER_APPROVAL=true is required before any final render command.",
  );
}

const reviewFrames = framesFromArgs();
const stillFrames = reviewFrames.map((frame) => frame.frame);
const stackMode =
  valueAfter("--stack") ??
  frameSetDefinitions[frameSet]?.stackMode ??
  (frameSet === "family-bc-calibration" ? "vstack" : "hstack");

const manifest = {
  phase: frameSet === "phase5-review" ? "Phase 5: Review + QA Tooling" : "shared-review",
  mode: args.has("--execute") ? "execute" : "dry-run",
  composition,
  frameSet,
  reviewFrames,
  stillFrames,
  stackMode,
  contactSheet,
  benchmarkComparison: benchmarkComparisonId
    ? resolveBenchmarkComparison(benchmarkComparisonId)
    : null,
  sourceChartComparison: sourceChartComparisonId
    ? makeSourceChartComparison(sourceChartComparisonId)
    : null,
  safeZoneQA: makeSafeZoneQA(),
  lottieQA: lottieQAAssetId ? resolveLottieQA(lottieQAAssetId) : null,
  renderGate: {
    finalRenderApproval,
    finalMp4RenderAllowed: false,
    productionReelStarted: false,
    rule: "Review stills/contact sheets must pass before any future final MP4 render.",
  },
  finalRenderApproval,
  finalMp4RenderAllowed: false,
  productionReelStarted: false,
  rule: "Review stills and contact sheet before any final render.",
};

if (!args.has("--execute")) {
  printMarkedJson("REVIEW_REEL", manifest);
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

printMarkedJson("REVIEW_REEL", manifest);

function framesFromArgs() {
  const customFrames = valueAfter("--frames");
  if (!customFrames) {
    return frameSetDefinitions[frameSet]?.frames ?? frameSetDefinitions.default.frames;
  }

  return customFrames
    .split(",")
    .map((frame, index) => ({
      role: `custom-${index + 1}`,
      frame: Number(frame.trim()),
      purpose: `Custom review frame ${index + 1}.`,
    }))
    .filter((frame) => Number.isInteger(frame.frame) && frame.frame >= 0);
}

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

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(projectRoot, relativePath), "utf8"));
}

function resolveBenchmarkComparison(atlasId) {
  const atlas = readJson("docs/workspace-agent/benchmark-atlas.json");
  const entry = atlas.entries.find((candidate) => candidate.id === atlasId);

  if (!entry) {
    throw new Error(`Benchmark atlas id not found: ${atlasId}`);
  }

  return {
    atlasId,
    family: entry.family,
    sourcePath: entry.sourcePath,
    contactSheetPath: entry.contactSheet,
    whatToCompare: entry.whatToAdapt,
    whatNotToCopy: entry.whatNotToCopy,
    reviewOnly: true,
  };
}

function makeSourceChartComparison(chartId) {
  return {
    chartId,
    reviewOnly: true,
    staticSvgAsFinalChartAllowed: false,
    reviewFrames: [
      { role: "original-svg-reference", frame: 0 },
      { role: "animated-reconstruction", frame: 90 },
      { role: "proof-event", frame: 150 },
      { role: "cta-residue", frame: 210 },
    ],
  };
}

function makeSafeZoneQA() {
  return {
    format: {
      width: 1080,
      height: 1920,
    },
    margins: {
      x: 72,
      top: 96,
      bottom: 76,
    },
    results: [
      {
        region: "hook",
        status: "planned",
        rule: "Hook text stays within mobile-safe top and side margins.",
      },
      {
        region: "chart",
        status: "planned",
        rule: "Chart proof stays readable without covering source labels.",
      },
      {
        region: "proof",
        status: "planned",
        rule: "Proof labels are attached to the event that creates them.",
      },
      {
        region: "source-note",
        status: "planned",
        rule: "Source notes remain visible but secondary.",
      },
      {
        region: "watermark",
        status: "planned",
        rule: "Watermark stays clear of CTA and proof labels.",
      },
      {
        region: "cta",
        status: "planned",
        rule: "CTA residue sits above lower platform UI safe space.",
      },
    ],
  };
}

function resolveLottieQA(assetId) {
  const manifest = readJson("public/lottie/manifest.json");
  const asset = manifest.assets.find((candidate) => candidate.id === assetId);

  if (!asset) {
    throw new Error(`Approved Lottie asset not found: ${assetId}`);
  }

  return {
    assetId,
    localPath: asset.localPath,
    approvedUsage: asset.approvedUsage,
    heroMetaphorAllowed: false,
    frames: [
      {
        role: "entry",
        frame: 720,
        question: "Does the Lottie enter cleanly without stealing the hero event?",
      },
      {
        role: "peak",
        frame: 735,
        question: "Does the Lottie peak support the proof or route motion?",
      },
      {
        role: "exit",
        frame: 760,
        question: "Does the Lottie exit without cluttering CTA residue?",
      },
    ],
    reviewQuestions: [
      "Does it flicker during frame seeking?",
      "Do colors match Family B/C light editorial grammar?",
      "Is timing attached to the proof/event rather than decorative?",
      "Is the native Remotion fallback preferable?",
    ],
  };
}

function printMarkedJson(marker, payload) {
  console.log(`---${marker}_JSON_START---`);
  console.log(JSON.stringify(payload, null, 2));
  console.log(`---${marker}_JSON_END---`);
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
