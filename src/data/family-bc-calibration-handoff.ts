import {
  FAMILY_BC_REEL_FORMAT,
  type FamilyBCReelHandoff,
} from "../contracts/family-bc-contract";

const approvedClaim = {
  id: "claim-family-bc-calibration",
  claim:
    "Calibration-only chart proof: the chart marker should create the visible proof readout.",
  value: "CHART",
  source:
    "Internal Family B/C calibration fixture. Not a publication source or investment claim.",
  confidenceTier: "manager-approved" as const,
  onScreen: true,
  visualAttachment:
    "The word CHART appears only after the chart marker lands on the source trace.",
};

const selectedRoute = {
  packetType: "analogy-route-packet" as const,
  routeName: "Chart marker becomes the CTA residue",
  benchmarkFamilyFit: "family-bc-hybrid" as const,
  simplePhysicalSentence:
    "A clean chart line gets marked, the marker extracts proof, and the CTA inherits that mark.",
  heroAsset: "Source chart trace",
  physicalEvent: "Marker lands on the proof point and creates the readout.",
  chartProofRole: "main-proof" as const,
  proofBirth:
    "The proof label is born from the chart marker, not from a detached card.",
  residue:
    "The green chart underline survives into the CTA keyword close.",
  lottieNeed:
    "Use only a subtle route-pulse or highlight-sweep accent after approval.",
  noLabelTest:
    "Muted, the reel should still read as a chart finding becoming an instruction.",
  risks: [
    "If the chart becomes decorative wallpaper, the Family B benchmark is missed.",
    "If the CTA appears as a generic end card, the residue test fails.",
  ],
  humanGate: "approved" as const,
};

const chartProof = {
  packetType: "chart-proof-packet" as const,
  chartProofRole: "main-proof" as const,
  recreationMode: "adapted-with-rationale" as const,
  sourceImageOrVideo: "generated-calibration-chart",
  chartType: "line chart",
  axes: ["x-axis: time", "y-axis: indexed value"],
  units: ["index points"],
  dates: ["calibration sequence"],
  series: ["sample chart trace"],
  labels: ["hook", "proof point", "CTA residue"],
  caveats: ["Calibration fixture only. Do not use as source evidence."],
  proofMoment:
    "A red marker lands on the line and the proof readout appears from that position.",
  adaptationRationale:
    "The calibration uses procedural data so review tooling can be tested without publishing a real claim.",
  fidelityRisks: [
    "Real production reels must replace this fixture with source-locked chart data or source media.",
  ],
  humanGate: "approved" as const,
};

const lottieCandidate = {
  id: "candidate-route-pulse-placeholder",
  motionNeed:
    "A light route pulse or highlight sweep to reinforce the chart marker event.",
  sourceUrl: "https://lottiefiles.com/free-animations/chart",
  localPath: "public/lottie/not-yet-approved.json",
  licenseNote:
    "Candidate only. Actual LottieFiles asset requires per-asset license/source approval before download.",
  approvedUsage: "route-pulse" as const,
  fallbackNativeRemotionOption:
    "Use the procedural LottieAccentLayer pulse until a specific JSON is approved.",
  approved: false,
};

const lottieSearch = {
  packetType: "lottie-search-packet" as const,
  motionNeed:
    "Subtle chart marker pulse and CTA underline energy for Family B/C light editorial reels.",
  searchTerms: [
    "chart pulse",
    "route pulse",
    "highlight sweep",
    "data transfer",
  ],
  candidateUrls: ["https://lottiefiles.com/free-animations/chart"],
  licenseNotes: [
    "Use LottieFiles assets only after asset-level license/source approval.",
  ],
  previewBehavior:
    "Vector pulse should support the marker event without becoming the hero metaphor.",
  approvedUsage: "route-pulse",
  whatNotToCopy: [
    "Do not use random confetti.",
    "Do not replace the chart proof with a generic animated icon.",
  ],
  fallbackNativeRemotionOption:
    "Procedural pulse built with deterministic Remotion primitives.",
  lottieCandidates: [lottieCandidate],
  humanGate: "approved" as const,
};

const styleframes = [
  {
    packetType: "styleframe-direction-packet" as const,
    styleframeName: "Hook: large editorial number on white",
    representedBeat: "Hook",
    framePurpose:
      "Signal Family B/C tone: light background, large readable type, no dashboard shell.",
    layoutProportions:
      "Top-left headline, wide safe margins, source note held low.",
    objectGeometry: "No cards; typography and a slim green rule carry the hook.",
    chartTarget: "Chart appears after hook, not as background decoration.",
    colorMaterialTokens: ["white", "warm-white", "ink", "green", "navy"],
    typographyScale: "Mobile-first 100px+ hook value and 40px+ explanatory line.",
    proofAttachmentRules:
      "No proof label may appear before the chart marker creates it.",
    imageReferences: ["Family B/C benchmark videos stored in benchmarks/"],
    negativeExamples: ["dark calibration reel", "dashboard panel", "Canva card"],
    humanGate: "approved" as const,
  },
  {
    packetType: "styleframe-direction-packet" as const,
    styleframeName: "Proof: marker extracts chart readout",
    representedBeat: "Proof birth",
    framePurpose:
      "Show the source trace creating the proof readout through a physical marker event.",
    layoutProportions:
      "Full-width chart region with text attached to the marker, not floating above it.",
    objectGeometry:
      "The marker is small, red, and anchored to the trace; the proof line grows from it.",
    chartTarget:
      "Adapted calibration line chart with clear axes, strict source-note caveat, and marker.",
    colorMaterialTokens: ["white", "green", "red", "light-gray", "ink"],
    typographyScale: "Chart labels stay secondary; proof readout is large and attached.",
    proofAttachmentRules:
      "Proof readout must be born from the marker and remain visually connected.",
    imageReferences: ["Family B/C chart-native benchmark"],
    negativeExamples: ["floating proof card", "decorative chart wallpaper"],
    humanGate: "approved" as const,
  },
  {
    packetType: "styleframe-direction-packet" as const,
    styleframeName: "CTA: keyword inherits chart residue",
    representedBeat: "CTA residue",
    framePurpose:
      "Keep the final memory image connected to the chart marker event.",
    layoutProportions:
      "Lower-third CTA with green underline inherited from the chart trace.",
    objectGeometry:
      "The underline is the residue object; the CTA is not a detachable end card.",
    chartTarget: "Chart proof fades back but the green mark remains.",
    colorMaterialTokens: ["white", "green", "ink", "navy"],
    typographyScale: "Keyword is dominant and readable on mobile.",
    proofAttachmentRules:
      "CTA copy may say comment \"CHART\" only after the proof marker scene.",
    imageReferences: ["Family C CTA memory frames"],
    negativeExamples: ["generic subscribe card", "detached proof plate"],
    humanGate: "approved" as const,
  },
];

export const familyBCCalibrationHandoff: FamilyBCReelHandoff = {
  // CTA literal: comment "CHART"
  reelId: "family-bc-calibration",
  title: "Family B/C calibration: chart proof to CTA residue",
  benchmarkFamily: "family-bc-hybrid",
  format: FAMILY_BC_REEL_FORMAT,
  sourceIntake: {
    packetType: "source-intake-packet",
    inputMode: "mixed",
    sourceSummary:
      "Calibration-only packet that tests the new Family B/C light editorial system without publication claims.",
    approvedClaims: [approvedClaim],
    sourceGaps: [
      "Production reels must supply a real source chart, manager kit, or approved claim table.",
    ],
    containsNumericProof: false,
    sourceVisualAuditRequired: true,
    whatMustNotBeClaimed: [
      "Do not imply the calibration chart is real market data.",
      "Do not publish this reel as investment evidence.",
    ],
    sourceOfTruth:
      "The current chat plan, Family B/C benchmark direction, and calibration fixture.",
    visualResearchAllowed: false,
    nextRecommendedPacket: "evidence-audit-packet",
    humanGate: "approved",
  },
  evidenceAudit: {
    packetType: "evidence-audit-packet",
    sourceBoundary:
      "Internal fixture only. It can validate workflow mechanics but not factual claims.",
    claims: [approvedClaim],
    numbers: [],
    charts: ["procedural calibration line chart"],
    tables: [],
    caveats: ["Not publication proof."],
    confidenceTier: "complete",
    sourceLockStatus: "locked",
    headlineProof: "CHART is a CTA keyword, not a financial number.",
    supportingProof: [],
    visualProof: ["Marker-born chart readout"],
    offscreenProof: ["Calibration caveat in source note"],
    humanGate: "approved",
  },
  mechanismDiagnosis: {
    packetType: "mechanism-diagnosis-packet",
    financialMechanism:
      "Family B/C calibration of chart-native proof and CTA residue.",
    mechanismFamily: "chart-proof",
    force: "The chart trace leads viewer attention toward a proof point.",
    constraint: "Proof cannot appear until the marker touches the chart.",
    stateChange:
      "The proof point changes from an ordinary chart point into an instruction.",
    proofConsequence:
      "The CTA keyword is visually justified by the chart event.",
    candidateAnalogyFamilies: ["chart as terrain", "marker as proof latch"],
    rejectedAnalogyFamilies: ["dark cinematic impact", "dashboard card"],
    humanGate: "approved",
  },
  benchmarkDeconstruction: {
    packetType: "benchmark-deconstruction-packet",
    benchmarkFamily: "family-bc-hybrid",
    referenceSummary:
      "Light editorial reel grammar: white background, chart proof, large kinetic text, clean CTA memory frame.",
    hookBehavior:
      "Big readable phrase lands immediately without dark cinematic atmosphere.",
    chartRole:
      "Chart is the proof object and stage terrain, not a decorative background.",
    assetBehavior:
      "Marker, underline, and small logo/icon actors behave as proof/residue objects.",
    textRhythm:
      "Short stacked lines, strong keyword emphasis, minimal explanatory labels.",
    CTAStyle:
      "CTA inherits the chart underline and uses the keyword comment \"CHART\".",
    whatToAdapt: [
      "Light background",
      "Chart-native proof",
      "Mobile-readable type",
      "CTA residue",
    ],
    whatNotToCopy: [
      "Benchmark-specific layouts",
      "Exact source charts",
      "Any unlicensed asset",
    ],
    copyRisk: "low",
    humanGate: "approved",
  },
  route: selectedRoute,
  chartProof,
  assetBoard: {
    packetType: "asset-board-packet",
    heroAssetTarget: "Source chart trace with anchored marker.",
    proofObjectTarget: "Marker-born proof label.",
    residueObjectTarget: "Green underline that carries into the CTA.",
    logoIconAssets: [
      {
        id: "asset-invesense-watermark",
        label: "Invesense",
        role: "watermark",
        licenseNote: "Internal brand text only.",
        behavior: "Stays quiet in the top safe zone.",
      },
      {
        id: "asset-chart-marker",
        label: "Proof marker",
        role: "hero",
        licenseNote: "Generated procedurally in Remotion.",
        behavior: "Lands on the trace and creates proof.",
      },
    ],
    labelSurfaceTarget:
      "Labels attach to chart points, bars, or residue marks; no floating source cards.",
    materialTarget: "White editorial surface, crisp ink text, restrained green/red marks.",
    layoutTarget:
      "Family B/C vertical reel with safe margins and chart-first middle section.",
    negativeExamples: ["dark rail", "dashboard panel", "generic progress bars"],
    referenceLinksOrUploads: ["benchmarks/"],
    CodexRecreationNotes:
      "Codex should implement this as deterministic Remotion primitives only; do not invent new claims or old repo visuals.",
    humanGate: "approved",
  },
  lottieSearch,
  styleframes,
  codexReadiness: {
    packetType: "codex-readiness-scorecard",
    sourceBoundaryReady: true,
    evidenceAuditReady: true,
    chartFidelityReady: true,
    routeSelectionReady: true,
    assetBoardReady: true,
    lottiePolicyReady: true,
    styleframeReady: true,
    sceneBehaviorReady: true,
    proofBirthReady: true,
    residueReady: true,
    packageBoundaryReady: true,
    renderPermissionReady: false,
    overallReadiness: "calibration-only",
    blockedBy: ["No final render approval; calibration reel only."],
    humanGate: "approved",
  },
  codexHandoff: {
    packetType: "codex-handoff-packet",
    humanRouteSelectionRecord:
      "User approved Family B/C as primary benchmark and Family A as secondary motion-energy reference.",
    humanConceptApprovalRecord:
      "Calibration-only implementation approved by the current plan.",
    selectedRoute,
    frameRanges: [
      "0-150 hook",
      "150-420 chart reveal",
      "420-660 proof marker",
      "660-870 icon/asset beat",
      "870-1080 CTA residue",
    ],
    approvedAssets: ["asset-chart-marker", "asset-invesense-watermark"],
    chartSpecs: [chartProof],
    lottieSpecs: [lottieCandidate],
    styleframeTargets: styleframes,
    allowedPackages: [
      "remotion",
      "@remotion/lottie",
      "@remotion/transitions",
      "@remotion/paths",
      "@remotion/shapes",
      "@remotion/layout-utils",
      "zod",
    ],
    gatedPackages: ["@remotion/three", "three", "@react-three/fiber"],
    forbiddenInventions: [
      "No invented financial numbers.",
      "No old repo visual code.",
      "No dark cinematic dashboard shell.",
      "No proof label before chart event.",
    ],
    filesAllowedToModify: [
      "src/contracts/family-bc-contract.ts",
      "src/components/family-bc-primitives.tsx",
      "src/compositions/FamilyBCCalibrationReel.tsx",
      "src/data/family-bc-calibration-handoff.ts",
      "scripts/review-reel.mjs",
      "docs/family-bc-system/",
      "public/lottie/manifest.json",
    ],
    renderPermissions: {
      stills: true,
      contactSheet: true,
      draftMp4: false,
      finalRenderApproval: false,
    },
    validationCommands: [
      "npm run test",
      "npm run lint",
      "npm run build",
      "npm run review:family-bc",
    ],
    stopConditions: [
      "Chart becomes decorative wallpaper.",
      "CTA becomes a generic end card.",
      "Codex invents a source claim.",
    ],
    readinessStatus: "calibration-only",
    humanGate: "approved",
  },
  scenes: [
    {
      id: "scene-family-bc-hook",
      startFrame: 0,
      endFrame: 150,
      beat: "Light editorial hook",
      visualRole: "hook",
      chartProofRole: "supporting-proof",
      text: ["Family B/C first", "Chart proof, not dashboard proof"],
      sourceClaimIds: [],
      lottieCandidateIds: [],
    },
    {
      id: "scene-chart-reveal",
      startFrame: 150,
      endFrame: 420,
      beat: "Chart becomes terrain",
      visualRole: "chart-proof",
      chartProofRole: "main-proof",
      text: ["The chart is the stage"],
      sourceClaimIds: ["claim-family-bc-calibration"],
      lottieCandidateIds: [],
    },
    {
      id: "scene-proof-birth",
      startFrame: 420,
      endFrame: 660,
      beat: "Marker creates proof",
      visualRole: "proof-birth",
      chartProofRole: "main-proof",
      text: ["Proof appears after contact"],
      sourceClaimIds: ["claim-family-bc-calibration"],
      lottieCandidateIds: ["candidate-route-pulse-placeholder"],
    },
    {
      id: "scene-family-c-asset-beat",
      startFrame: 660,
      endFrame: 870,
      beat: "Logo/icon actor support",
      visualRole: "asset-event",
      chartProofRole: "supporting-proof",
      text: ["Actors support the chart, they do not replace it"],
      sourceClaimIds: [],
      lottieCandidateIds: ["candidate-route-pulse-placeholder"],
    },
    {
      id: "scene-cta-residue",
      startFrame: 870,
      endFrame: 1080,
      beat: "CTA inherits the chart mark",
      visualRole: "cta-residue",
      chartProofRole: "residue-mark",
      text: ["comment \"CHART\""],
      sourceClaimIds: ["claim-family-bc-calibration"],
      lottieCandidateIds: [],
    },
  ],
  reviewFrames: {
    frameSetId: "family-bc-calibration",
    hook: 60,
    firstChartReveal: 240,
    proofMarker: 510,
    assetEvent: 750,
    ctaResidue: 990,
  },
  ctaKeyword: "CHART",
  watermark: "INVESENSE",
  finalRenderApproval: false,
};
