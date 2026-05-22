import { z } from "zod";

export const FamilyBCVisualTokensSchema = z.object({
  background: z.enum(["white", "warm-white"]),
  ink: z.string().min(1),
  mutedInk: z.string().min(1),
  accent: z.enum(["green", "blue", "red"]),
  gridLine: z.string().min(1),
  safeMarginX: z.number().int().positive(),
  safeMarginTop: z.number().int().positive(),
  safeMarginBottom: z.number().int().positive(),
  displayFont: z.string().min(1),
});

export const ChartNativeSpecSchema = z.object({
  id: z.string().min(1),
  role: z.enum([
    "main-proof",
    "supporting-proof",
    "residue-mark",
    "calibration-only",
  ]),
  chartType: z.enum(["line", "strict-bars", "candlestick", "support-resistance"]),
  title: z.string().min(1),
  sourceNote: z.string().min(1),
  dataIntegrity: z.enum(["fixture", "source-locked", "manager-approved"]),
  proofBirthFrame: z.number().int().nonnegative(),
  valueLabelsRequired: z.boolean(),
  eventAttachmentRule: z.string().min(1),
});

export const LogoIconActorSpecSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  actorType: z.enum(["logo", "institution", "document", "payment", "route-node"]),
  role: z.enum(["hero-support", "mechanism", "proof-support", "residue"]),
  sourcePath: z.string().optional(),
  licenseNote: z.string().min(1),
  behavior: z.string().min(1),
});

export const LottieUsageSchema = z.enum([
  "route-pulse",
  "highlight-sweep",
  "CTA-pulse",
  "proof-burst",
  "chart-accent",
  "payment-transfer",
  "data-transfer",
  "micro-icon",
  "transition-accent",
]);

export const LottieAcquisitionRequestSchema = z.object({
  id: z.string().min(1),
  role: LottieUsageSchema,
  sourceUrl: z.string().url(),
  sourceKind: z.enum(["local-file", "direct-json-url"]),
  licenseNote: z.string().min(1),
  approvedByHuman: z.literal(true),
  approvedBy: z.string().min(1),
  fallbackNativeRemotionOption: z.string().min(1),
  heroMetaphorAllowed: z.literal(false),
  remoteUrlAllowed: z.literal(false),
});

export const ApprovedLottieManifestEntrySchema = z.object({
  id: z.string().min(1),
  sourceUrl: z.string().url(),
  localPath: z.string().min(1),
  licenseNote: z.string().min(1),
  approvedUsage: LottieUsageSchema,
  approvedByHuman: z.literal(true),
  approvedBy: z.string().min(1),
  fallbackNativeRemotionOption: z.string().min(1),
  nonProduction: z.boolean(),
});

export const ReviewFrameManifestSchema = z.object({
  composition: z.literal("FamilyBCVisualSystemCalibration"),
  frameSetId: z.literal("phase3-visual-system-calibration"),
  frames: z.object({
    hook: z.number().int().nonnegative(),
    chart: z.number().int().nonnegative(),
    event: z.number().int().nonnegative(),
    proof: z.number().int().nonnegative(),
    lottie: z.number().int().nonnegative(),
    ctaResidue: z.number().int().nonnegative(),
  }),
  stillsAllowed: z.boolean(),
  contactSheetAllowed: z.boolean(),
  draftMp4Allowed: z.literal(false),
  finalRenderApproval: z.literal(false),
  productionImplementationAllowed: z.literal(false),
});

export const FamilyBCVisualSystemCalibrationSchema = z.object({
  id: z.literal("family-bc-visual-system-calibration"),
  title: z.string().min(1),
  format: z.object({
    width: z.literal(1080),
    height: z.literal(1920),
    fps: z.literal(30),
    durationInFrames: z.number().int().min(900),
  }),
  tokens: FamilyBCVisualTokensSchema,
  charts: z.array(ChartNativeSpecSchema).min(1),
  actors: z.array(LogoIconActorSpecSchema).min(1),
  lottieRequests: z.array(LottieAcquisitionRequestSchema),
  approvedLottieAssets: z.array(ApprovedLottieManifestEntrySchema),
  review: ReviewFrameManifestSchema,
  readinessStatus: z.literal("calibration-only"),
  productionImplementationAllowed: z.literal(false),
  finalRenderApproval: z.literal(false),
});

export type FamilyBCVisualSystemCalibration = z.infer<
  typeof FamilyBCVisualSystemCalibrationSchema
>;
export type ApprovedLottieManifestEntry = z.infer<
  typeof ApprovedLottieManifestEntrySchema
>;
