import { z } from "zod";

export const ReelFormatSchema = z.object({
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  fps: z.number().int().positive(),
  durationInFrames: z.number().int().positive(),
});

export const SourceClaimSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  value: z.string().min(1),
  source: z.string().min(1),
  sourceUrl: z.string().url().optional(),
  confidence: z.enum(["source-locked", "adapted", "calibration"]),
  usageFrame: z.number().int().nonnegative(),
  visualAttachment: z.string().min(1),
});

export const AssetSpecSchema = z.object({
  id: z.string().min(1),
  kind: z.enum([
    "procedural",
    "svg",
    "lottie",
    "image",
    "video",
    "audio",
    "shape",
  ]),
  role: z.enum([
    "hero",
    "constraint",
    "proof",
    "texture",
    "caption",
    "sfx",
    "reference",
  ]),
  approved: z.boolean(),
  path: z.string().optional(),
  licenseNote: z.string().min(1),
  notes: z.string().min(1),
});

export const StyleframeTargetSchema = z.object({
  id: z.string().min(1),
  representedBeat: z.string().min(1),
  targetFrame: z.number().int().nonnegative(),
  visualTarget: z.string().min(1),
  approved: z.boolean(),
  referencePaths: z.array(z.string()),
  forbiddenDrift: z.array(z.string().min(1)),
});

export const RenderGateSchema = z.object({
  routeApproval: z.enum(["calibration-only", "approved", "blocked"]),
  styleframeApproval: z.boolean(),
  assetApproval: z.boolean(),
  codexReadinessApproval: z.boolean(),
  stillReviewApproval: z.boolean(),
  finalRenderApproval: z.boolean(),
  notes: z.string().min(1),
});

export const HumanGatesSchema = z.object({
  routeApproved: z.boolean(),
  visualTargetApproved: z.boolean(),
  assetBoardApproved: z.boolean(),
  codexReadinessApproved: z.boolean(),
  renderApproved: z.boolean(),
});

export const SceneBeatSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  startFrame: z.number().int().nonnegative(),
  endFrame: z.number().int().positive(),
  intent: z.string().min(1),
  heroAssetId: z.string().min(1),
  physicalEvent: z.enum([
    "compression",
    "impact",
    "break",
    "filter",
    "unlock",
    "stamp",
    "transfer",
    "residue",
    "none",
  ]),
  startingState: z.string().min(1),
  action: z.string().min(1),
  proofBirthFrame: z.number().int().nonnegative().nullable(),
  residueFrame: z.number().int().nonnegative(),
  sourceClaimIds: z.array(z.string().min(1)),
  labels: z.array(z.string().min(1)),
  lottieAccentIds: z.array(z.string().min(1)),
  noLabelTest: z.string().min(1),
});

export const ReelHandoffSchema = z.object({
  reelId: z.string().min(1),
  title: z.string().min(1),
  format: ReelFormatSchema,
  renderGate: RenderGateSchema,
  humanGates: HumanGatesSchema,
  sourceClaims: z.array(SourceClaimSchema),
  assets: z.array(AssetSpecSchema),
  styleframes: z.array(StyleframeTargetSchema),
  scenes: z.array(SceneBeatSchema),
  forbiddenPatterns: z.array(z.string().min(1)),
  noLabelTest: z.string().min(1),
});

export type ReelFormat = z.infer<typeof ReelFormatSchema>;
export type SourceClaim = z.infer<typeof SourceClaimSchema>;
export type AssetSpec = z.infer<typeof AssetSpecSchema>;
export type StyleframeTarget = z.infer<typeof StyleframeTargetSchema>;
export type RenderGate = z.infer<typeof RenderGateSchema>;
export type SceneBeat = z.infer<typeof SceneBeatSchema>;
export type ReelHandoff = z.infer<typeof ReelHandoffSchema>;

export const VERTICAL_REEL_FORMAT: ReelFormat = {
  width: 1080,
  height: 1920,
  fps: 30,
  durationInFrames: 300,
};

export const DEFAULT_FORBIDDEN_PATTERNS = [
  "animated slide deck",
  "generic SaaS surface",
  "floating proof plate",
  "labels carrying the mechanism alone",
  "detached end screen without event residue",
];
