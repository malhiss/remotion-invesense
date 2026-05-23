import { z } from "zod";

export const AssetEventBenchmarkTargetSchema = z.object({
  benchmarkTargetId: z.string().min(1),
  benchmarkContactSheetPath: z.string().min(1),
  referenceFramePath: z.string().min(1),
  whyThisTargetWasChosen: z.string().min(1),
  whatToRecreateStructurally: z.string().min(1),
  whatNotToCopy: z.array(z.string().min(1)).min(1),
  copyRisk: z.enum(["low", "medium", "high"]),
});

export const AssetEventStructuralAttachmentSchema = z.object({
  eventSurfaceId: z.string().min(1),
  proofSurfaceId: z.string().min(1),
  proofAttachmentMode: z.enum([
    "stamp",
    "latch",
    "endpoint",
    "bar-end",
    "chart-marker",
    "residue-line",
    "surface-plate",
  ]),
  proofBirthFrame: z.number().int().nonnegative(),
  residueObjectId: z.string().min(1),
});

export const AssetEventReviewFrameSchema = z.object({
  role: z.enum([
    "object-state",
    "approach-pre-contact",
    "contact",
    "deformation-reaction",
    "proof-birth",
    "residue",
  ]),
  frame: z.number().int().nonnegative(),
  purpose: z.string().min(1),
});

export const FamilyBCAssetEventPrimitiveLabSchema = z.object({
  phase: z.literal("Phase 6B.2: Benchmark-Targeted Asset Event Primitive Lab"),
  executionScope: z.literal("non-production-primitive-lab-only"),
  compositionId: z.literal("FamilyBCAssetEventPrimitiveLab"),
  format: z.object({
    width: z.literal(1080),
    height: z.literal(1920),
    fps: z.literal(30),
    durationInFrames: z.literal(91),
  }),
  benchmarkTarget: AssetEventBenchmarkTargetSchema,
  structuralAttachment: AssetEventStructuralAttachmentSchema,
  labeledReviewFrames: z.array(AssetEventReviewFrameSchema).length(6),
  labelHiddenReviewFrames: z.array(AssetEventReviewFrameSchema).length(6),
  noLabelReadSelfAssessment: z.enum(["pass", "fail", "risk"]),
  humanNoLabelReview: z.literal("pending"),
  hideLabels: z.boolean().optional(),
  lottiePolicy: z.object({
    supportOnly: z.literal(true),
    heroMetaphorAllowed: z.literal(false),
    standaloneProofAllowed: z.literal(false),
  }),
  renderGate: z.object({
    stillsAllowed: z.literal(true),
    contactSheetAllowed: z.literal(true),
    draftMp4Allowed: z.literal(false),
    finalMp4Allowed: z.literal(false),
  }),
  codexClaims: z.object({
    visualPass: z.literal(false),
    premiumPass: z.literal(false),
    benchmarkPass: z.literal(false),
    finalNoLabelPass: z.literal(false),
  }),
  visualRisks: z.array(z.string().min(1)).min(1),
});

export type FamilyBCAssetEventPrimitiveLab = z.infer<
  typeof FamilyBCAssetEventPrimitiveLabSchema
>;
