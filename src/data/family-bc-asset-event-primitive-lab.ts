import type { FamilyBCAssetEventPrimitiveLab } from "../contracts/asset-event-lab-contract";

const reviewFrames = [
  {
    role: "object-state" as const,
    frame: 0,
    purpose: "Initial chart terrain, resistance surface, and incoming asset state.",
  },
  {
    role: "approach-pre-contact" as const,
    frame: 24,
    purpose: "The asset approaches the hard line before contact.",
  },
  {
    role: "contact" as const,
    frame: 45,
    purpose: "Asset touches the resistance line; proof is not visible yet.",
  },
  {
    role: "deformation-reaction" as const,
    frame: 60,
    purpose: "The resistance surface bends and reacts to contact.",
  },
  {
    role: "proof-birth" as const,
    frame: 75,
    purpose: "Proof label is born from the reacted event surface.",
  },
  {
    role: "residue" as const,
    frame: 90,
    purpose: "The changed event surface remains as CTA residue.",
  },
];

export const familyBCAssetEventPrimitiveLab: FamilyBCAssetEventPrimitiveLab = {
  phase: "Phase 6B.2: Benchmark-Targeted Asset Event Primitive Lab",
  executionScope: "non-production-primitive-lab-only",
  compositionId: "FamilyBCAssetEventPrimitiveLab",
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
      "It is the closest Family B/C target for chart terrain plus Family A-level physical event energy: a support/trampoline/safety-net sequence where a financial line behaves like a real object.",
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
