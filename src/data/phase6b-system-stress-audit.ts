import { VisualStressAuditPacketSchema } from "../contracts/visual-stress-audit-contract";

export const phase6bSystemStressAudit = VisualStressAuditPacketSchema.parse({
  phase: "Phase 6B.1: System Hardening",
  composition: "SukukThresholdRailStills",
  executionScope: "system-hardening-stills-only",
  auditDimensions: [
    "layout-safe-zone",
    "no-label-mechanism",
    "asset-metaphor-fit",
    "proof-birth-attachment",
    "lottie-role-fit",
    "source-proof",
    "residue-frame",
    "review-scaffolding",
    "benchmark-fit",
  ],
  noLabelMechanism: {
    intendedRead:
      "A source-linked issuance rail crosses a hard institutional scale threshold.",
    observedRisk:
      "Without the labels, the stress test read as headline collision, chart card, and lock sticker.",
    score: 2,
    passThreshold: 4,
  },
  assetMetaphorFit: {
    heroAsset: "source-linked issuance rail plus threshold gate",
    mechanismRole:
      "The rail must physically contact and open the threshold, not merely point to a label.",
    stickerRisk: "high",
    requiredUpgrade:
      "Replace literal padlock behavior with an integrated chart-terrain constraint/gate.",
  },
  proofBirthAttachment: {
    proofLabel: "$1T+",
    eventFrame: 720,
    proofFrame: 840,
    attachmentRule:
      "The detached proof birth failure showed why proof labels must appear only after the gate opens and stay anchored to the event residue.",
    detachedProofAllowed: false,
  },
  lottieRoleFit: {
    assetId: "phase6b-data-flow-rail-pulse",
    approvedRole: "subtle rail/data-flow pulse",
    mechanismSupport:
      "Lottie can add energy along the rail corridor only; it cannot become generic-tech lottie risk or proof.",
    genericTechRisk: "high",
    nativeFallback: "Native Remotion traveling pulse along the source path.",
    heroMetaphorAllowed: false,
  },
  safeZoneCollisionReport: [
    {
      frameRole: "hook",
      collisionRisk: "high",
      affectedRegions: ["headline", "chart panel"],
      fixRequired: true,
    },
    {
      frameRole: "threshold-event",
      collisionRisk: "high",
      affectedRegions: ["2025 label", "$1T latch", "threshold note"],
      fixRequired: true,
    },
    {
      frameRole: "cta-residue",
      collisionRisk: "medium",
      affectedRegions: ["cta", "proof label", "source note"],
      fixRequired: true,
    },
  ],
  residueFrameScore: {
    residueObject: "unlocked threshold line",
    inheritsFromEvent: true,
    swapRisk: "medium",
    score: 3,
  },
  findings: [
    {
      id: "headline-collision",
      severity: "must-fix",
      dimension: "layout-safe-zone",
      affectedFrameRoles: ["hook", "chart", "event", "proof", "cta-residue"],
      issue:
        "The headline collision makes the frame look broken before the metaphor is judged.",
      likelySubsystem: "safe-zone-aware editorial stage",
      recommendedFixCategory: "layout-system",
    },
    {
      id: "sticker-metaphor",
      severity: "must-fix",
      dimension: "asset-metaphor-fit",
      affectedFrameRoles: ["hook", "threshold-event"],
      issue:
        "The threshold reads as sticker metaphor rather than a physical chart constraint.",
      likelySubsystem: "physical constraint primitive",
      recommendedFixCategory: "visual-primitive",
    },
    {
      id: "detached-proof-birth",
      severity: "must-fix",
      dimension: "proof-birth-attachment",
      affectedFrameRoles: ["proof"],
      issue:
        "The proof label is visually detached from the event that should create it.",
      likelySubsystem: "event-attached proof primitive",
      recommendedFixCategory: "visual-primitive",
    },
    {
      id: "generic-tech-lottie-risk",
      severity: "should-fix",
      dimension: "lottie-role-fit",
      affectedFrameRoles: ["lottie", "chart"],
      issue:
        "The approved Lottie risks reading as generic-tech lottie risk unless clipped into rail energy.",
      likelySubsystem: "Lottie role-fit policy",
      recommendedFixCategory: "lottie-policy",
    },
    {
      id: "review-text-contamination",
      severity: "must-fix",
      dimension: "review-scaffolding",
      affectedFrameRoles: ["all"],
      issue:
        "review-text contamination makes production-style stills impossible to judge.",
      likelySubsystem: "review-only overlay separation",
      recommendedFixCategory: "review-tooling",
    },
    {
      id: "cta-residue-weakness",
      severity: "should-fix",
      dimension: "residue-frame",
      affectedFrameRoles: ["cta-residue"],
      issue:
        "cta residue weakness means the final line can feel like a generic underline.",
      likelySubsystem: "CTA residue primitive",
      recommendedFixCategory: "visual-primitive",
    },
  ],
  renderGate: {
    stillsAllowed: true,
    contactSheetAllowed: true,
    draftMp4Allowed: false,
    finalMp4Allowed: false,
  },
});

export type Phase6BSystemStressAudit = typeof phase6bSystemStressAudit;
