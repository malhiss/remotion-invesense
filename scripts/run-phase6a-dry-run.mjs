const dryRun = {
  phase: "phase-6a-workspace-agent-hardening",
  reviewOnly: true,
  productionImplementationAllowed: false,
  familyBenchmark: {
    primary: "family-bc",
    familyAUse: "secondary-motion-energy-only",
    rule: "Family B/C light editorial proof is the house benchmark; Family A contributes motion energy only.",
  },
  sourceEvidence: {
    status: "fixture-review-only",
    sourceProofBeforeMetaphor: true,
    requiredLocks: ["claims", "numbers", "source labels", "chart units", "source note"],
  },
  chartProof: {
    staticPastedChartAllowed: false,
    animatedSvgOrNativeChartRequiredWhenProofCritical: true,
    reviewRequired: ["original-svg-reference", "animated-reconstruction", "proof-event", "cta-residue"],
  },
  assetLottiePolicy: {
    heroMetaphorAllowed: false,
    allowedRoles: ["route-pulse", "chart-accent", "highlight-sweep", "proof-burst", "cta-pulse"],
    requiredFields: ["sourceUrl", "licenseNote", "approvedUsage", "humanApproval", "nativeFallback"],
  },
  styleframeGate: {
    status: "required-before-codex",
    requiredFrames: ["hook", "mechanism", "proof", "lottie", "cta-residue"],
  },
  reviewFrames: [
    { role: "hook", purpose: "Hook clarity and mobile safe-zone review." },
    { role: "chart", purpose: "Source chart proof and animated SVG/native chart decision." },
    { role: "event", purpose: "Visible object behavior and mechanism clarity." },
    { role: "proof", purpose: "Proof birth after event." },
    { role: "lottie", purpose: "Lottie accent QA only." },
    { role: "cta-residue", purpose: "CTA inherits residue from event." },
  ],
  codexHandoff: {
    readinessStatus: "blocked",
    executable: false,
    blockedBy: [
      "human route approval missing",
      "source locks not attached to final claims",
      "asset and Lottie approvals missing",
      "styleframe targets missing",
      "scene behavior packet missing",
      "review frame approval missing",
    ],
  },
};

console.log("---PHASE6A_DRY_RUN_JSON_START---");
console.log(JSON.stringify(dryRun, null, 2));
console.log("---PHASE6A_DRY_RUN_JSON_END---");
