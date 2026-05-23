import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const args = new Set(process.argv.slice(2));
const composition = "FamilyBCAssetEventPrimitiveLab";
const reviewDir = path.join(projectRoot, "out", "review", composition);
const labeledDir = path.join(reviewDir, "labeled");
const labelHiddenDir = path.join(reviewDir, "label-hidden");
const labeledContactSheet = path.join(reviewDir, "contact-sheet.jpg");
const labelHiddenContactSheet = path.join(reviewDir, "label-hidden-contact-sheet.jpg");
const propsDir = path.join(reviewDir, "props");
const remotionCli = path.join(
  projectRoot,
  "node_modules",
  "@remotion",
  "cli",
  "remotion-cli.js",
);

const reviewFrames = [
  { role: "object-state", frame: 0, purpose: "Initial object and event surface state." },
  { role: "approach-pre-contact", frame: 24, purpose: "Incoming object approaches the resistance line." },
  { role: "contact", frame: 45, purpose: "Object contacts the event surface." },
  { role: "deformation-reaction", frame: 60, purpose: "Resistance line bends and reacts." },
  { role: "proof-birth", frame: 75, purpose: "Proof is born from contact/reaction." },
  { role: "residue", frame: 90, purpose: "Changed event surface remains as residue." },
];

const baseProps = {
  phase: "Phase 6B.2: Benchmark-Targeted Asset Event Primitive Lab",
  executionScope: "non-production-primitive-lab-only",
  compositionId: composition,
  format: {
    width: 1080,
    height: 1920,
    fps: 30,
    durationInFrames: 91,
  },
  benchmarkTarget: {
    benchmarkTargetId:
      "batch-01-whatsapp-video-2026-04-30-at-3-42-34-pm-1-93332d51",
    benchmarkContactSheetPath:
      "benchmarks/batch-01/analysis/whatsapp-video-2026-04-30-at-34234-pm-1-e04c4f9a/contact.jpg",
    referenceFramePath:
      "benchmarks/batch-01/analysis/whatsapp-video-2026-04-30-at-34234-pm-1-e04c4f9a/contact.jpg",
    whyThisTargetWasChosen:
      "It is the closest Family B/C target for chart terrain plus Family A-level physical event energy.",
    whatToRecreateStructurally:
      "A source-like chart terrain approaches a hard line, makes contact, bends the line, births proof from that reaction, and leaves the changed line as residue.",
    whatNotToCopy: [
      "Bitcoin topic",
      "exact creator layout",
      "creator colors",
      "creator text",
      "chart values",
      "watermark",
      "CTA wording",
      "creator identity",
    ],
    copyRisk: "medium",
  },
  structuralAttachment: {
    eventSurfaceId: "asset-event-lab-resistance-line",
    proofSurfaceId: "asset-event-lab-proof-stamp",
    proofAttachmentMode: "latch",
    proofBirthFrame: 75,
    residueObjectId: "asset-event-lab-residue-line",
  },
  labeledReviewFrames: reviewFrames,
  labelHiddenReviewFrames: reviewFrames,
  noLabelReadSelfAssessment: "risk",
  humanNoLabelReview: "pending",
  hideLabels: false,
  lottiePolicy: {
    supportOnly: true,
    heroMetaphorAllowed: false,
    standaloneProofAllowed: false,
  },
  renderGate: {
    stillsAllowed: true,
    contactSheetAllowed: true,
    draftMp4Allowed: false,
    finalMp4Allowed: false,
  },
  codexClaims: {
    visualPass: false,
    premiumPass: false,
    benchmarkPass: false,
    finalNoLabelPass: false,
  },
  visualRisks: [
    "This lab proves structural mechanics only; it does not claim premium visual quality.",
    "Human no-label review must decide whether the physical event reads without labels.",
    "The lab adapts benchmark structure only and must not copy creator identity or topic.",
  ],
};

if (args.has("--draft-render") || args.has("--final-render")) {
  throw new Error(
    "Phase 6B.2 draft and final MP4 renders remain blocked. Use stills/contact sheets only.",
  );
}

const manifest = {
  phase: "Phase 6B.2: Benchmark-Targeted Asset Event Primitive Lab",
  mode: args.has("--execute") ? "execute" : "dry-run",
  composition,
  benchmarkTarget: baseProps.benchmarkTarget,
  structuralAttachment: baseProps.structuralAttachment,
  labeledFrames: reviewFrames,
  labelHiddenFrames: reviewFrames,
  labeledContactSheet,
  labelHiddenContactSheet,
  noLabelReadSelfAssessment: baseProps.noLabelReadSelfAssessment,
  humanNoLabelReview: baseProps.humanNoLabelReview,
  renderGate: baseProps.renderGate,
  codexClaims: baseProps.codexClaims,
  visualRisks: baseProps.visualRisks,
};

if (!args.has("--execute")) {
  printMarkedJson("PHASE6B2_REVIEW", manifest);
  console.log("Phase 6B.2 dry run only. Add --execute for still/contact-sheet artifacts.");
  process.exit(0);
}

fs.mkdirSync(labeledDir, { recursive: true });
fs.mkdirSync(labelHiddenDir, { recursive: true });
fs.mkdirSync(propsDir, { recursive: true });

const labeledPropsPath = path.join(propsDir, "labeled-props.json");
const labelHiddenPropsPath = path.join(propsDir, "label-hidden-props.json");
fs.writeFileSync(labeledPropsPath, JSON.stringify({ ...baseProps, hideLabels: false }, null, 2));
fs.writeFileSync(labelHiddenPropsPath, JSON.stringify({ ...baseProps, hideLabels: true }, null, 2));

renderFrameSet({
  outputDir: labeledDir,
  propsPath: labeledPropsPath,
});
renderFrameSet({
  outputDir: labelHiddenDir,
  propsPath: labelHiddenPropsPath,
});

makeContactSheet({
  outputDir: labeledDir,
  contactSheet: labeledContactSheet,
});
makeContactSheet({
  outputDir: labelHiddenDir,
  contactSheet: labelHiddenContactSheet,
});

printMarkedJson("PHASE6B2_REVIEW", manifest);

function renderFrameSet({ outputDir, propsPath }) {
  for (const frame of reviewFrames) {
    run(process.execPath, [
      remotionCli,
      "still",
      "src/index.ts",
      composition,
      path.join(outputDir, stillName(frame.frame)),
      `--frame=${frame.frame}`,
      `--props=${propsPath}`,
    ]);
  }
}

function makeContactSheet({ outputDir, contactSheet }) {
  const stillInputs = reviewFrames.map((frame) => path.join(outputDir, stillName(frame.frame)));
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
}

function stillName(frame) {
  return `frame-${String(frame).padStart(4, "0")}.png`;
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
