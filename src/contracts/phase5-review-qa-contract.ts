import { z } from "zod";

export const Phase5ReviewFrameRoleSchema = z.enum([
  "hook",
  "chart",
  "event",
  "proof",
  "lottie",
  "cta-residue",
]);

export const Phase5ReviewFrameSchema = z.object({
  role: Phase5ReviewFrameRoleSchema,
  frame: z.number().int().nonnegative(),
  purpose: z.string().min(1),
});

export const BenchmarkComparisonReferenceSchema = z.object({
  atlasId: z.string().min(1),
  family: z.enum(["family-a", "family-b", "family-c", "family-bc-hybrid"]),
  sourcePath: z.string().min(1),
  contactSheetPath: z.string().min(1),
  whatToCompare: z.array(z.string().min(1)).min(1),
  reviewOnly: z.literal(true),
});

export const SourceChartComparisonReferenceSchema = z.object({
  chartId: z.string().min(1),
  reviewOnly: z.literal(true),
  reviewFrames: z.array(
    z.object({
      role: z.enum([
        "original-svg-reference",
        "animated-reconstruction",
        "proof-event",
        "cta-residue",
      ]),
      frame: z.number().int().nonnegative(),
    }),
  ),
  staticSvgAsFinalChartAllowed: z.literal(false),
});

export const SafeZoneQAResultSchema = z.object({
  format: z.object({
    width: z.literal(1080),
    height: z.literal(1920),
  }),
  margins: z.object({
    x: z.number().int().positive(),
    top: z.number().int().positive(),
    bottom: z.number().int().positive(),
  }),
  results: z.array(
    z.object({
      region: z.enum(["hook", "chart", "proof", "source-note", "watermark", "cta"]),
      status: z.enum(["planned", "pass", "fail"]),
      rule: z.string().min(1),
    }),
  ),
});

export const LottieQAFrameSchema = z.object({
  assetId: z.string().min(1),
  frames: z.array(
    z.object({
      role: z.enum(["entry", "peak", "exit"]),
      frame: z.number().int().nonnegative(),
      question: z.string().min(1),
    }),
  ),
  reviewQuestions: z.array(z.string().min(1)).min(1),
  heroMetaphorAllowed: z.literal(false),
});

export const Phase5RenderGateSchema = z.object({
  finalRenderApproval: z.boolean(),
  finalMp4RenderAllowed: z.literal(false),
  productionReelStarted: z.literal(false),
  rule: z.string().min(1),
});

export const Phase5ReviewManifestSchema = z.object({
  phase: z.literal("Phase 5: Review + QA Tooling"),
  mode: z.enum(["dry-run", "execute"]),
  composition: z.string().min(1),
  frameSet: z.string().min(1),
  reviewFrames: z.array(Phase5ReviewFrameSchema).min(1),
  stackMode: z.enum(["vstack", "hstack"]),
  contactSheet: z.string().min(1),
  benchmarkComparison: BenchmarkComparisonReferenceSchema,
  sourceChartComparison: SourceChartComparisonReferenceSchema,
  safeZoneQA: SafeZoneQAResultSchema,
  lottieQA: LottieQAFrameSchema,
  renderGate: Phase5RenderGateSchema,
  finalRenderApproval: z.boolean(),
  finalMp4RenderAllowed: z.literal(false),
  productionReelStarted: z.literal(false),
});

export type Phase5ReviewManifest = z.infer<typeof Phase5ReviewManifestSchema>;

