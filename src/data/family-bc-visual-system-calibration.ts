import type { FamilyBCVisualSystemCalibration } from "../contracts/family-bc-visual-system-contract";

export const familyBCVisualSystemCalibration: FamilyBCVisualSystemCalibration = {
  id: "family-bc-visual-system-calibration",
  title: "Phase 3 Family B/C visual-system calibration",
  format: {
    width: 1080,
    height: 1920,
    fps: 30,
    durationInFrames: 1080,
  },
  tokens: {
    background: "warm-white",
    ink: "#111318",
    mutedInk: "#475564",
    accent: "green",
    gridLine: "#e8eef3",
    safeMarginX: 72,
    safeMarginTop: 96,
    safeMarginBottom: 76,
    displayFont: "Tahoma",
  },
  charts: [
    {
      id: "phase3-line-trace",
      role: "main-proof",
      chartType: "line",
      title: "Chart line becomes the proof surface",
      sourceNote: "Fixture only. Replace with source-locked chart in Phase 4.",
      dataIntegrity: "fixture",
      proofBirthFrame: 430,
      valueLabelsRequired: false,
      eventAttachmentRule:
        "The proof label can appear only after the marker touches the chart line.",
    },
    {
      id: "phase3-strict-bars",
      role: "supporting-proof",
      chartType: "strict-bars",
      title: "Strict bars remain measured objects",
      sourceNote: "Fixture bars validate value-label rendering only.",
      dataIntegrity: "fixture",
      proofBirthFrame: 560,
      valueLabelsRequired: true,
      eventAttachmentRule:
        "Values sit on or inside bars; no detached progress-card treatment.",
    },
  ],
  actors: [
    {
      id: "phase3-logo-actor",
      label: "LOGO",
      actorType: "logo",
      role: "mechanism",
      licenseNote: "Procedural placeholder; production requires approved logo source.",
      behavior: "Travels on the rail as an actor, not as a decorative card.",
    },
    {
      id: "phase3-document-stamp",
      label: "DOC",
      actorType: "document",
      role: "proof-support",
      licenseNote: "Procedural placeholder.",
      behavior: "Receives a stamp only after the chart proof event.",
    },
  ],
  lottieRequests: [
    {
      id: "phase3-approved-pulse",
      role: "route-pulse",
      sourceUrl: "https://lottiefiles.com/free-animations/chart",
      sourceKind: "local-file",
      licenseNote:
        "Non-production local fixture used only to validate approved Lottie rendering.",
      approvedByHuman: true,
      approvedBy: "phase-3-calibration",
      fallbackNativeRemotionOption:
        "Use deterministic native LottieAccentLayer pulse if JSON fails QA.",
      heroMetaphorAllowed: false,
      remoteUrlAllowed: false,
    },
  ],
  approvedLottieAssets: [
    {
      id: "phase3-approved-pulse",
      sourceUrl: "https://lottiefiles.com/free-animations/chart",
      localPath: "lottie/phase3-approved-pulse.json",
      licenseNote:
        "Non-production local fixture used only to validate approved Lottie rendering.",
      approvedUsage: "route-pulse",
      approvedByHuman: true,
      approvedBy: "phase-3-calibration",
      fallbackNativeRemotionOption:
        "Use deterministic native LottieAccentLayer pulse if JSON fails QA.",
      nonProduction: true,
    },
  ],
  review: {
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
  },
  readinessStatus: "calibration-only",
  productionImplementationAllowed: false,
  finalRenderApproval: false,
};
