import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const readJson = (relativePath) =>
  JSON.parse(fs.readFileSync(path.join(projectRoot, relativePath), "utf8"));

const brief = readJson("workspace-agent/examples/family-bc-sample-brief.json");
const benchmarkIndex = readJson("docs/workspace-agent/benchmark-index.json");

const pickFirst = (values) => values.slice(0, 2);

const benchmarkLinks = [
  ...pickFirst(benchmarkIndex.byFamily["family-b"] ?? []).map((benchmarkId) => ({
    benchmarkId,
    family: "family-b",
    reason: "Chart-native proof and CTA residue are primary for this sample.",
    adapt: ["chart-as-terrain", "direct labels", "CTA residue"],
    avoid: ["exact creator shell", "unverified chart values"],
  })),
  ...pickFirst(benchmarkIndex.byFamily["family-c"] ?? []).map((benchmarkId) => ({
    benchmarkId,
    family: "family-c",
    reason: "Logo/icon actor behavior can support the chart without becoming the proof.",
    adapt: ["clean icon actor", "light editorial pacing"],
    avoid: ["generic SaaS dashboard", "decorative logo grid"],
  })),
].slice(0, 4);

const humanGateRequired = [
  "source approval",
  "route approval",
  "chart proof approval",
  "asset/Lottie approval",
  "styleframe approval",
  "Codex readiness approval",
  "still/contact-sheet approval",
  "draft approval",
  "final approval",
];

const dryRun = {
  phase: "phase-2-workspace-agent-workflow",
  reviewOnly: true,
  productionImplementationAllowed: false,
  sourceAndEvidence: {
    sourceBoundary: brief.sourceBoundary,
    approvedClaims: brief.approvedClaims,
    sourceProofStatus: "locked-for-dry-run",
    blockedClaims: [],
  },
  benchmarkLinks,
  routeOptions: [
    {
      routeId: "chart-gap-caliper",
      familyFit: "family-b",
      simplePhysicalSentence:
        "A marker lands on the source chart, opens a caliper gap, and the proof label locks to the measured distance.",
      wowEvent: "gap bracket opens from source points",
      proofBirth: "proof appears after the bracket expands",
      residue: "bracket becomes CTA underline",
      status: "candidate-only",
    },
    {
      routeId: "logo-rail-transfer",
      familyFit: "family-c",
      simplePhysicalSentence:
        "A logo token travels through a clean rail, reaches the chart endpoint, and stamps the source proof.",
      wowEvent: "route endpoint locks",
      proofBirth: "stamp appears only at route endpoint",
      residue: "route rail remains as CTA underline",
      status: "candidate-only",
    },
    {
      routeId: "support-line-pressure",
      familyFit: "family-bc-hybrid",
      simplePhysicalSentence:
        "A rising source line presses against a flat valuation line until the spread becomes visible proof.",
      wowEvent: "line bends under pressure",
      proofBirth: "spread label emerges from the bend",
      residue: "bent line freezes as final memory image",
      status: "candidate-only",
    },
  ],
  assetLottieBoard: {
    heroAsset: "source chart marker and gap caliper",
    proofObject: "gap bracket born from chart points",
    residueObject: "CTA underline inherited from bracket",
    lottieCandidates: brief.lottieMotionNeeds.map((motionNeed, index) => ({
      id: `lottie-candidate-${index + 1}`,
      motionNeed,
      sourceUrl: "candidate-to-be-searched-by-workspace-agent",
      licenseNote: "Required before download or use.",
      approvedUsage: motionNeed,
      fallbackNativeRemotionOption: "native SVG pulse/highlight animation",
      approved: false,
    })),
    lottiePolicy: {
      heroMetaphorAllowed: false,
      allowedRoles: ["route pulse", "highlight sweep", "chart accent", "CTA pulse"],
      rule: "Lottie cannot become the hero metaphor.",
    },
  },
  styleframeRequirement: {
    status: "required-before-codex",
    requiredFrames: ["hook", "mechanism", "proof birth", "CTA residue"],
    rationale:
      "Complex Family B/C metaphor reels need visual targets before Codex implementation.",
  },
  sceneBehavior: {
    durationSeconds: brief.requestedDurationSeconds,
    proofBirthFrameRange: "frames 450-660",
    ctaResidue: "final underline inherits the bracket residue",
    noLabelTest:
      "The widening chart gap should be understandable before reading every label.",
  },
  humanGates: {
    required: humanGateRequired,
    approved: ["source approval"],
    missing: humanGateRequired.filter((gate) => gate !== "source approval"),
  },
  codexHandoff: {
    readinessStatus: "blocked",
    executable: false,
    blockedBy: [
      "human route selection",
      "styleframe approval",
      "asset/Lottie approval",
      "Codex readiness approval",
      "final render approval",
    ],
  },
};

console.log("---PHASE2_DRY_RUN_JSON_START---");
console.log(JSON.stringify(dryRun, null, 2));
console.log("---PHASE2_DRY_RUN_JSON_END---");
