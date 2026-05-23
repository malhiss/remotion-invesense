export const phase6bSukukStillsHandoff = {
  packetId: "phase6b-sukuk-threshold-rail-stills",
  title: "$1 Trillion. Sukuk Has Arrived.",
  status: "codex-approved-stills-only",
  executionScope: "stills-contact-sheet-source-chart-comparison-only",
  format: {
    width: 1080,
    height: 1920,
    fps: 30,
    durationInFrames: 1440,
  },
  renderPermissions: {
    stillsAllowed: true,
    contactSheetAllowed: true,
    sourceChartComparisonAllowed: true,
    draftMp4Allowed: false,
    finalMp4Allowed: false,
  },
  sourceClaims: [
    {
      claim: "Global sukuk outstanding crossed $1T at year-end 2025.",
      sourceLabel:
        "Invesense Research | Bloomberg LEAG | S&P Global | Fitch Ratings | DJ Indices | 2001-2025",
    },
    {
      claim: "Annual issuance grew from $16B in 2001 to $150.5B in 2025.",
      sourceLabel: "Invesense Research | Bloomberg LEAG | April 2026",
    },
    {
      claim: "GCC accounts for 56%+ of recent global issuance.",
      sourceLabel: "Insight text and Chart 02 reference scope",
    },
  ],
  selectedRoute: {
    name: "Threshold Rail",
    physicalSentence:
      "A source-linked issuance rail keeps advancing until it contacts and unlocks a hard $1T threshold.",
    heroAsset: "source-linked issuance rail derived from Chart 01 geometry",
    constraint: "$1T threshold latch / gate",
    proofBirth: "$1T+ appears only after rail contact unlocks the threshold",
    residue: "unlocked threshold line becomes the CTA underline",
  },
  charts: {
    core: {
      id: "phase6b-global-sukuk-issuance",
      localSvgPath: "source-charts/phase6b-global-sukuk-issuance.svg",
      extractedDataPath: "source-charts/phase6b-global-sukuk-issuance.json",
      staticSvgAsFinalChartAllowed: false,
    },
    supportingReference: {
      id: "phase6b-issuance-by-region-reference",
      localSvgPath: "source-charts/phase6b-issuance-by-region-reference.svg",
      useScope: "reference-only for GCC 56%+ support, not full grouped-value reconstruction",
    },
    optionalBlocked: {
      id: "phase6b-sukuk-vs-global-agg-reference",
      localSvgPath: "source-charts/phase6b-sukuk-vs-global-agg-reference.svg",
      useScope: "excluded from first stills composition until manually audited",
    },
  },
  approvedLottie: {
    id: "phase6b-data-flow-rail-pulse",
    localPath: "lottie/phase6b-data-flow-rail-pulse.json",
    sourceUrl: "https://lottiefiles.com/free-animation/data-flow-XwZ4VYbgwT",
    role: "subtle rail/data-flow pulse",
    placement: "setup and pressure beats only",
    fallback: "native Remotion traveling dot, rail glow, or signal pulse",
  },
  noLabelRead:
    "Before reading labels, the viewer should understand that issuance keeps moving along a rail until it crosses a hard institutional scale threshold.",
  averageViewerTranslation:
    "Translate the advanced sukuk scale insight into an easy visual idea: a market that used to look niche has grown large enough to cross a visible threshold. Assume the viewer has no finance background.",
  transcriptCaptionPlan: {
    required: true,
    source: "Insight-derived plain-language transcript, not a literal paste of the website copy.",
    captionUse:
      "Caption beats can be reused as on-screen labels only if they remain short, source-safe, and synchronized with the visual event.",
    exactNumbers:
      "Use source-locked values exactly: $1T, $16B, $150.5B, 56%+, and approved dates/labels.",
  },
  narrationVisualSync: {
    required: true,
    rule:
      "Asset motion should appear when the narration explains the idea; the threshold gate opens as the narration lands the scale crossing.",
    reviewFrames:
      "Hook, chart, Lottie/asset, threshold event, proof birth, and CTA close must be checked against narration beats before draft MP4.",
  },
  soundFxPlan: {
    requiredBeforeDraftMp4: true,
    allowedPackage: "@remotion/sfx",
    candidateRoles: [
      "soft whoosh for rail movement",
      "subtle switch or ding only after proof birth",
      "no comedic meme SFX",
    ],
    renderGate:
      "No audio or SFX render is approved in stills scope; plan only until draft MP4 permission.",
  },
  proofBirthAttachment: {
    eventFrame: 720,
    proofFrame: 840,
    rule: "$1T+ appears only after the threshold gate opens and stays attached to the event residue.",
    detachedProofAllowed: false,
  },
  lottieRoleFit: {
    mode: "supporting-asset-motion",
    standaloneAnalogySceneAllowed: true,
    currentAssetRisk:
      "Data Flow can look like generic SaaS motion if it is not clipped, masked, or replaced by native rail energy.",
    approvedUse:
      "Use only as rail/flow energy or move to a separately approved analogy scene; never as source proof.",
    nativeFallback: "native Remotion traveling dot, rail glow, or signal pulse",
  },
  cardDriftRisk:
    "Avoid turning the source chart into a dashboard card. The chart is proof terrain; the rail/gate is the mechanism.",
  ctaClosePlan: {
    required: true,
    logoHoldSeconds: 1.5,
    brandText: "INVESENSE",
    callToAction: "Read the research -> invesense.com/insights",
    residueRule:
      "The unlocked threshold line may lead into the close, but it cannot replace the branded logo and website CTA.",
  },
  visualStressAudit: {
    requiredBeforeDraftMp4: true,
    dimensions: [
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
  },
  frameRanges: {
    hook: [0, 89],
    setup: [90, 359],
    pressure: [360, 659],
    thresholdEvent: [660, 899],
    optionalSecondaryProof: [900, 1259],
    ctaResidue: [1260, 1439],
  },
  reviewFrames: {
    hook: 45,
    chartReconstruction: 240,
    railDataFlow: 420,
    thresholdEvent: 720,
    proofBirth: 840,
    lottieQA: 735,
    ctaResidue: 1320,
    sourceChartComparison: 240,
  },
  forbiddenInventions: [
    "No invented claims, numbers, source labels, or chart values.",
    "No chart-only reel; the proof must be born from the threshold asset event.",
    "No dashboard cards, floating proof plates, generic Islamic motifs, or decorative confetti.",
    "No draft MP4 or final MP4 render in this scope.",
  ],
} as const;

export type Phase6BSukukStillsHandoff = typeof phase6bSukukStillsHandoff;
