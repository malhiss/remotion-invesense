import { z } from "zod";

export const FamilyBCFormatSchema = z.object({
  width: z.literal(1080),
  height: z.literal(1920),
  fps: z.literal(30),
  durationInFrames: z.number().int().min(900),
});

export const BenchmarkFamilySchema = z.enum([
  "family-b-chart",
  "family-c-infographic",
  "family-a-motion-reference",
  "family-bc-hybrid",
]);

export const SourceClaimLockSchema = z.object({
  id: z.string().min(1),
  claim: z.string().min(1),
  value: z.string().min(1).optional(),
  source: z.string().min(1),
  sourceUrl: z.string().url().optional(),
  confidenceTier: z.enum([
    "source-locked",
    "manager-approved",
    "adapted",
    "visual-inspiration-only",
  ]),
  onScreen: z.boolean(),
  visualAttachment: z.string().min(1),
});

export const SourceIntakePacketSchema = z.object({
  packetType: z.literal("source-intake-packet"),
  inputMode: z.enum(["manager-kit", "insight-url", "topic", "transcript", "mixed"]),
  sourceSummary: z.string().min(1),
  approvedClaims: z.array(SourceClaimLockSchema),
  sourceGaps: z.array(z.string()),
  containsNumericProof: z.boolean(),
  sourceVisualAuditRequired: z.boolean(),
  whatMustNotBeClaimed: z.array(z.string()),
  sourceOfTruth: z.string().min(1),
  visualResearchAllowed: z.boolean(),
  nextRecommendedPacket: z.string().min(1),
  humanGate: z.enum(["approved", "blocked", "not-requested"]),
});

export const EvidenceAuditPacketSchema = z.object({
  packetType: z.literal("evidence-audit-packet"),
  sourceBoundary: z.string().min(1),
  claims: z.array(SourceClaimLockSchema),
  numbers: z.array(z.string()),
  charts: z.array(z.string()),
  tables: z.array(z.string()),
  caveats: z.array(z.string()),
  confidenceTier: z.enum(["complete", "partial", "blocked"]),
  sourceLockStatus: z.enum(["locked", "provisional", "blocked"]),
  headlineProof: z.string().min(1),
  supportingProof: z.array(z.string()),
  visualProof: z.array(z.string()),
  offscreenProof: z.array(z.string()),
  humanGate: z.enum(["approved", "blocked", "not-requested"]),
});

export const MechanismDiagnosisPacketSchema = z.object({
  packetType: z.literal("mechanism-diagnosis-packet"),
  financialMechanism: z.string().min(1),
  mechanismFamily: z.enum([
    "support-resistance",
    "chart-proof",
    "logo-infographic",
    "liquidity-flow",
    "spread-gap",
    "screening-filter",
    "settlement-stamp",
    "tokenization-access",
    "drag-leak",
    "ranking-bars",
  ]),
  force: z.string().min(1),
  constraint: z.string().min(1),
  stateChange: z.string().min(1),
  proofConsequence: z.string().min(1),
  candidateAnalogyFamilies: z.array(z.string()),
  rejectedAnalogyFamilies: z.array(z.string()),
  humanGate: z.enum(["approved", "blocked", "not-requested"]),
});

export const BenchmarkDeconstructionPacketSchema = z.object({
  packetType: z.literal("benchmark-deconstruction-packet"),
  benchmarkFamily: BenchmarkFamilySchema,
  referenceSummary: z.string().min(1),
  hookBehavior: z.string().min(1),
  chartRole: z.string().min(1),
  assetBehavior: z.string().min(1),
  textRhythm: z.string().min(1),
  CTAStyle: z.string().min(1),
  whatToAdapt: z.array(z.string()),
  whatNotToCopy: z.array(z.string()),
  copyRisk: z.enum(["low", "medium", "high"]),
  humanGate: z.enum(["approved", "blocked", "not-requested"]),
});

export const AnalogyRoutePacketSchema = z.object({
  packetType: z.literal("analogy-route-packet"),
  routeName: z.string().min(1),
  benchmarkFamilyFit: BenchmarkFamilySchema,
  simplePhysicalSentence: z.string().min(1),
  heroAsset: z.string().min(1),
  physicalEvent: z.string().min(1),
  chartProofRole: z.enum([
    "main-proof",
    "supporting-proof",
    "residue-mark",
    "excluded-with-rationale",
  ]),
  proofBirth: z.string().min(1),
  residue: z.string().min(1),
  lottieNeed: z.string().min(1),
  noLabelTest: z.string().min(1),
  risks: z.array(z.string()),
  humanGate: z.enum(["approved", "blocked", "not-requested"]),
});

export const ChartProofPacketSchema = z.object({
  packetType: z.literal("chart-proof-packet"),
  chartProofRole: z.enum([
    "main-proof",
    "supporting-proof",
    "residue-mark",
    "excluded-with-rationale",
  ]),
  recreationMode: z.enum([
    "faithful-svg",
    "faithful-source-video",
    "faithful-source-image",
    "adapted-with-rationale",
    "excluded-with-rationale",
  ]),
  sourceImageOrVideo: z.string().min(1).optional(),
  chartType: z.string().min(1),
  axes: z.array(z.string()),
  units: z.array(z.string()),
  dates: z.array(z.string()),
  series: z.array(z.string()),
  labels: z.array(z.string()),
  caveats: z.array(z.string()),
  proofMoment: z.string().min(1),
  adaptationRationale: z.string().min(1),
  fidelityRisks: z.array(z.string()),
  humanGate: z.enum(["approved", "blocked", "not-requested"]),
});

export const LogoIconAssetSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  role: z.enum(["hero", "supporting", "proof", "residue", "watermark"]),
  sourcePath: z.string().optional(),
  licenseNote: z.string().min(1),
  behavior: z.string().min(1),
});

export const AssetBoardPacketSchema = z.object({
  packetType: z.literal("asset-board-packet"),
  heroAssetTarget: z.string().min(1),
  proofObjectTarget: z.string().min(1),
  residueObjectTarget: z.string().min(1),
  logoIconAssets: z.array(LogoIconAssetSchema),
  labelSurfaceTarget: z.string().min(1),
  materialTarget: z.string().min(1),
  layoutTarget: z.string().min(1),
  negativeExamples: z.array(z.string()),
  referenceLinksOrUploads: z.array(z.string()),
  CodexRecreationNotes: z.string().min(1),
  humanGate: z.enum(["approved", "blocked", "not-requested"]),
});

export const LottieCandidateSchema = z.object({
  id: z.string().min(1),
  motionNeed: z.string().min(1),
  sourceUrl: z.string().url().optional(),
  localPath: z.string().optional(),
  licenseNote: z.string().min(1),
  approvedUsage: z.enum([
    "route-pulse",
    "highlight-sweep",
    "checkmark",
    "warning-x",
    "loader",
    "chart-accent",
    "payment-transfer",
    "data-transfer",
    "CTA-pulse",
    "proof-burst",
    "micro-icon",
    "transition-accent",
  ]),
  fallbackNativeRemotionOption: z.string().min(1),
  approved: z.boolean(),
});

export const LottieSearchPacketSchema = z.object({
  packetType: z.literal("lottie-search-packet"),
  motionNeed: z.string().min(1),
  searchTerms: z.array(z.string()),
  candidateUrls: z.array(z.string()),
  licenseNotes: z.array(z.string()),
  previewBehavior: z.string().min(1),
  approvedUsage: z.string().min(1),
  whatNotToCopy: z.array(z.string()),
  fallbackNativeRemotionOption: z.string().min(1),
  lottieCandidates: z.array(LottieCandidateSchema),
  humanGate: z.enum(["approved", "blocked", "not-requested"]),
});

export const StyleframeDirectionPacketSchema = z.object({
  packetType: z.literal("styleframe-direction-packet"),
  styleframeName: z.string().min(1),
  representedBeat: z.string().min(1),
  framePurpose: z.string().min(1),
  layoutProportions: z.string().min(1),
  objectGeometry: z.string().min(1),
  chartTarget: z.string().min(1),
  colorMaterialTokens: z.array(z.string()),
  typographyScale: z.string().min(1),
  proofAttachmentRules: z.string().min(1),
  imageReferences: z.array(z.string()),
  negativeExamples: z.array(z.string()),
  humanGate: z.enum(["approved", "blocked", "not-requested"]),
});

export const CodexReadinessScorecardSchema = z.object({
  packetType: z.literal("codex-readiness-scorecard"),
  sourceBoundaryReady: z.boolean(),
  evidenceAuditReady: z.boolean(),
  chartFidelityReady: z.boolean(),
  routeSelectionReady: z.boolean(),
  assetBoardReady: z.boolean(),
  lottiePolicyReady: z.boolean(),
  styleframeReady: z.boolean(),
  sceneBehaviorReady: z.boolean(),
  proofBirthReady: z.boolean(),
  residueReady: z.boolean(),
  packageBoundaryReady: z.boolean(),
  renderPermissionReady: z.boolean(),
  overallReadiness: z.enum(["ready", "blocked", "calibration-only"]),
  blockedBy: z.array(z.string()),
  humanGate: z.enum(["approved", "blocked", "not-requested"]),
});

export const ReviewFrameSetSchema = z.object({
  frameSetId: z.string().min(1),
  hook: z.number().int().nonnegative(),
  firstChartReveal: z.number().int().nonnegative(),
  proofMarker: z.number().int().nonnegative(),
  assetEvent: z.number().int().nonnegative(),
  ctaResidue: z.number().int().nonnegative(),
});

export const CodexHandoffPacketSchema = z.object({
  packetType: z.literal("codex-handoff-packet"),
  humanRouteSelectionRecord: z.string().min(1),
  humanConceptApprovalRecord: z.string().min(1),
  selectedRoute: AnalogyRoutePacketSchema,
  frameRanges: z.array(z.string()),
  approvedAssets: z.array(z.string()),
  chartSpecs: z.array(ChartProofPacketSchema),
  lottieSpecs: z.array(LottieCandidateSchema),
  styleframeTargets: z.array(StyleframeDirectionPacketSchema),
  allowedPackages: z.array(z.string()),
  gatedPackages: z.array(z.string()),
  forbiddenInventions: z.array(z.string()),
  filesAllowedToModify: z.array(z.string()),
  renderPermissions: z.object({
    stills: z.boolean(),
    contactSheet: z.boolean(),
    draftMp4: z.boolean(),
    finalRenderApproval: z.boolean(),
  }),
  validationCommands: z.array(z.string()),
  stopConditions: z.array(z.string()),
  readinessStatus: z.enum(["ready", "blocked", "calibration-only"]),
  humanGate: z.enum(["approved", "blocked", "not-requested"]),
});

export const FamilyBCSceneSchema = z.object({
  id: z.string().min(1),
  startFrame: z.number().int().nonnegative(),
  endFrame: z.number().int().positive(),
  beat: z.string().min(1),
  visualRole: z.enum(["hook", "chart-proof", "asset-event", "proof-birth", "cta-residue"]),
  chartProofRole: AnalogyRoutePacketSchema.shape.chartProofRole,
  text: z.array(z.string()),
  sourceClaimIds: z.array(z.string()),
  lottieCandidateIds: z.array(z.string()),
});

export const FamilyBCReelHandoffSchema = z.object({
  reelId: z.string().min(1),
  title: z.string().min(1),
  benchmarkFamily: BenchmarkFamilySchema,
  format: FamilyBCFormatSchema,
  sourceIntake: SourceIntakePacketSchema,
  evidenceAudit: EvidenceAuditPacketSchema,
  mechanismDiagnosis: MechanismDiagnosisPacketSchema,
  benchmarkDeconstruction: BenchmarkDeconstructionPacketSchema,
  route: AnalogyRoutePacketSchema,
  chartProof: ChartProofPacketSchema,
  assetBoard: AssetBoardPacketSchema,
  lottieSearch: LottieSearchPacketSchema,
  styleframes: z.array(StyleframeDirectionPacketSchema),
  codexReadiness: CodexReadinessScorecardSchema,
  codexHandoff: CodexHandoffPacketSchema,
  scenes: z.array(FamilyBCSceneSchema),
  reviewFrames: ReviewFrameSetSchema,
  ctaKeyword: z.string().min(1),
  watermark: z.string().min(1),
  finalRenderApproval: z.boolean(),
});

export type FamilyBCReelHandoff = z.infer<typeof FamilyBCReelHandoffSchema>;
export type ChartProofPacket = z.infer<typeof ChartProofPacketSchema>;
export type LottieCandidate = z.infer<typeof LottieCandidateSchema>;

export const FAMILY_BC_REEL_FORMAT = {
  width: 1080,
  height: 1920,
  fps: 30,
  durationInFrames: 1080,
} satisfies z.infer<typeof FamilyBCFormatSchema>;
