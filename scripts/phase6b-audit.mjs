const auditPacket = {
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
  findings: [
    {
      id: "headline-collision",
      severity: "must-fix",
      affectedFrameRoles: ["hook", "chart", "event", "proof", "cta-residue"],
      likelySubsystem: "safe-zone-aware editorial stage",
      recommendedFixCategory: "layout-system",
    },
    {
      id: "sticker-metaphor",
      severity: "must-fix",
      affectedFrameRoles: ["hook", "threshold-event"],
      likelySubsystem: "physical constraint primitive",
      recommendedFixCategory: "visual-primitive",
    },
    {
      id: "detached-proof-birth",
      severity: "must-fix",
      affectedFrameRoles: ["proof"],
      likelySubsystem: "event-attached proof primitive",
      recommendedFixCategory: "visual-primitive",
    },
    {
      id: "generic-tech-lottie-risk",
      severity: "should-fix",
      affectedFrameRoles: ["lottie", "chart"],
      likelySubsystem: "Lottie role-fit policy",
      recommendedFixCategory: "lottie-policy",
    },
    {
      id: "review-text-contamination",
      severity: "must-fix",
      affectedFrameRoles: ["all"],
      likelySubsystem: "review-only overlay separation",
      recommendedFixCategory: "review-tooling",
    },
    {
      id: "cta-residue-weakness",
      severity: "should-fix",
      affectedFrameRoles: ["cta-residue"],
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
};

printMarkedJson("PHASE6B_AUDIT", auditPacket);

function printMarkedJson(marker, payload) {
  console.log(`---${marker}_JSON_START---`);
  console.log(JSON.stringify(payload, null, 2));
  console.log(`---${marker}_JSON_END---`);
}
