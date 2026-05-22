import {
  DEFAULT_FORBIDDEN_PATTERNS,
  VERTICAL_REEL_FORMAT,
  type ReelHandoff,
} from "../contracts/reel-contract";

export const calibrationHandoff: ReelHandoff = {
  reelId: "calibration-token-rail",
  title: "Calibration: proof born from impact",
  format: VERTICAL_REEL_FORMAT,
  renderGate: {
    routeApproval: "calibration-only",
    styleframeApproval: false,
    assetApproval: false,
    codexReadinessApproval: true,
    stillReviewApproval: false,
    finalRenderApproval: false,
    notes:
      "Foundation-only composition. No final render approval and no source claim for publication.",
  },
  humanGates: {
    routeApproved: false,
    visualTargetApproved: false,
    assetBoardApproved: false,
    codexReadinessApproved: true,
    renderApproved: false,
  },
  sourceClaims: [
    {
      id: "claim-calibration-33t",
      label: "Money moved on blockchains",
      value: "$33T",
      source: "SourceClaim: benchmark calibration placeholder, not publication proof",
      confidence: "calibration",
      usageFrame: 148,
      visualAttachment:
        "The number appears only when the moving asset hits the financial rail.",
    },
  ],
  assets: [
    {
      id: "asset-orb",
      kind: "procedural",
      role: "hero",
      approved: true,
      licenseNote: "Generated with Remotion primitives.",
      notes: "Glossy moving asset standing in for value flow.",
    },
    {
      id: "asset-rail",
      kind: "shape",
      role: "constraint",
      approved: true,
      licenseNote: "Generated with Remotion primitives.",
      notes: "Physical wall that absorbs impact and creates proof.",
    },
    {
      id: "asset-lottie-accent",
      kind: "lottie",
      role: "texture",
      approved: false,
      licenseNote:
        "Reserved for approved LottieFiles accents only after asset approval.",
      notes: "Energy flow or CTA accent, never the hero metaphor.",
    },
  ],
  styleframes: [
    {
      id: "styleframe-impact-proof",
      representedBeat: "Impact creates proof",
      targetFrame: 148,
      visualTarget:
        "A dark premium space where a glossy asset strikes a luminous rail and the proof number emerges from the contact scar.",
      approved: false,
      referencePaths: ["benchmarks/batch-02/analysis"],
      forbiddenDrift: DEFAULT_FORBIDDEN_PATTERNS,
    },
  ],
  scenes: [
    {
      id: "scene-hook",
      name: "Numerical hook without chart language",
      startFrame: 0,
      endFrame: 90,
      intent: "Establish that value flow is a moving physical object.",
      heroAssetId: "asset-orb",
      physicalEvent: "transfer",
      startingState: "The asset sits off-axis in a dark field.",
      action: "It wakes, glows, and begins moving toward the rail.",
      proofBirthFrame: null,
      residueFrame: 88,
      sourceClaimIds: [],
      labels: ["Finance should move like light."],
      lottieAccentIds: [],
      noLabelTest:
        "The viewer should see a dormant object becoming active value flow.",
    },
    {
      id: "scene-impact",
      name: "Impact creates source proof",
      startFrame: 90,
      endFrame: 220,
      intent: "Turn an abstract finance claim into a collision event.",
      heroAssetId: "asset-orb",
      physicalEvent: "impact",
      startingState: "The moving asset accelerates toward the rail.",
      action:
        "The asset hits the rail, the rail bends, and proof is born from the contact point.",
      proofBirthFrame: 148,
      residueFrame: 214,
      sourceClaimIds: ["claim-calibration-33t"],
      labels: ["Impact creates proof."],
      lottieAccentIds: ["asset-lottie-accent"],
      noLabelTest:
        "The viewer should understand the number came from the hit, not a floating overlay.",
    },
    {
      id: "scene-residue",
      name: "Memory image",
      startFrame: 220,
      endFrame: 300,
      intent: "Hold the aftermath instead of cutting to an end screen.",
      heroAssetId: "asset-rail",
      physicalEvent: "residue",
      startingState: "The rail remains bent and marked by the collision.",
      action:
        "Fragments settle, the scar glows, and the proof remains attached to the event.",
      proofBirthFrame: null,
      residueFrame: 280,
      sourceClaimIds: ["claim-calibration-33t"],
      labels: ["Residue, not recap."],
      lottieAccentIds: [],
      noLabelTest:
        "The final frame should be remembered as a scarred financial rail.",
    },
  ],
  forbiddenPatterns: DEFAULT_FORBIDDEN_PATTERNS,
  noLabelTest:
    "Mute the text. If the asset does not visibly create proof through contact, the reel fails.",
};
