import { z } from "zod";

export const VisualAuditSeveritySchema = z.enum([
  "must-fix",
  "should-fix",
  "experiment",
  "pass",
]);

export const VisualAuditDimensionSchema = z.enum([
  "layout-safe-zone",
  "no-label-mechanism",
  "asset-metaphor-fit",
  "proof-birth-attachment",
  "lottie-role-fit",
  "source-proof",
  "residue-frame",
  "review-scaffolding",
  "benchmark-fit",
]);

export const NoLabelMechanismScoreSchema = z.object({
  intendedRead: z.string().min(1),
  observedRisk: z.string().min(1),
  score: z.number().min(0).max(5),
  passThreshold: z.number().min(0).max(5),
});

export const AssetMetaphorFitSchema = z.object({
  heroAsset: z.string().min(1),
  mechanismRole: z.string().min(1),
  stickerRisk: z.enum(["low", "medium", "high"]),
  requiredUpgrade: z.string().min(1),
});

export const ProofBirthAttachmentSchema = z.object({
  proofLabel: z.string().min(1),
  eventFrame: z.number().int().nonnegative(),
  proofFrame: z.number().int().nonnegative(),
  attachmentRule: z.string().min(1),
  detachedProofAllowed: z.literal(false),
});

export const LottieRoleFitSchema = z.object({
  assetId: z.string().min(1),
  approvedRole: z.string().min(1),
  mechanismSupport: z.string().min(1),
  genericTechRisk: z.enum(["low", "medium", "high"]),
  nativeFallback: z.string().min(1),
  heroMetaphorAllowed: z.literal(false),
});

export const SafeZoneCollisionReportSchema = z.object({
  frameRole: z.string().min(1),
  collisionRisk: z.enum(["none", "low", "medium", "high"]),
  affectedRegions: z.array(z.string().min(1)),
  fixRequired: z.boolean(),
});

export const ResidueFrameScoreSchema = z.object({
  residueObject: z.string().min(1),
  inheritsFromEvent: z.boolean(),
  swapRisk: z.enum(["low", "medium", "high"]),
  score: z.number().min(0).max(5),
});

export const VisualStressAuditFindingSchema = z.object({
  id: z.string().min(1),
  severity: VisualAuditSeveritySchema,
  dimension: VisualAuditDimensionSchema,
  affectedFrameRoles: z.array(z.string().min(1)).min(1),
  issue: z.string().min(1),
  likelySubsystem: z.string().min(1),
  recommendedFixCategory: z.enum([
    "layout-system",
    "visual-primitive",
    "workspace-agent-handoff",
    "review-tooling",
    "lottie-policy",
    "source-proof",
  ]),
});

export const VisualStressAuditPacketSchema = z.object({
  phase: z.literal("Phase 6B.1: System Hardening"),
  composition: z.string().min(1),
  executionScope: z.literal("system-hardening-stills-only"),
  auditDimensions: z.array(VisualAuditDimensionSchema).min(1),
  noLabelMechanism: NoLabelMechanismScoreSchema,
  assetMetaphorFit: AssetMetaphorFitSchema,
  proofBirthAttachment: ProofBirthAttachmentSchema,
  lottieRoleFit: LottieRoleFitSchema,
  safeZoneCollisionReport: z.array(SafeZoneCollisionReportSchema).min(1),
  residueFrameScore: ResidueFrameScoreSchema,
  findings: z.array(VisualStressAuditFindingSchema).min(1),
  renderGate: z.object({
    stillsAllowed: z.literal(true),
    contactSheetAllowed: z.literal(true),
    draftMp4Allowed: z.literal(false),
    finalMp4Allowed: z.literal(false),
  }),
});

export type VisualStressAuditPacket = z.infer<
  typeof VisualStressAuditPacketSchema
>;
