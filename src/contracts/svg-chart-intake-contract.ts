import { z } from "zod";

export const SvgChartTypeSchema = z.enum([
  "horizontal-bar",
  "grouped-vertical-bar",
  "stacked-vertical-bar",
  "line-chart",
]);

export const SvgChartConfidenceSchema = z.enum(["high", "medium", "low", "none"]);

export const SvgChartGeometrySchema = z.object({
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
  fill: z.string().optional(),
});

export const SvgChartValueSchema = z.object({
  label: z.string().min(1),
  value: z.number(),
});

export const SvgChartSeriesSchema = z.object({
  name: z.string().min(1),
  color: z.string().min(1),
});

export const SvgChartIntakePacketSchema = z.object({
  packetType: z.literal("svg-chart-intake-packet"),
  sourceSvgPath: z.string().min(1),
  supported: z.literal(true),
  chartType: SvgChartTypeSchema,
  confidence: SvgChartConfidenceSchema.exclude(["none"]),
  title: z.string().min(1),
  subtitle: z.string().nullable(),
  unit: z.string().nullable(),
  sourceNote: z.string().min(1),
  axisTicks: z.object({
    x: z.array(z.string()),
    y: z.array(z.string()),
  }),
  categories: z.array(z.string()),
  values: z.array(SvgChartValueSchema),
  xLabels: z.array(z.string()),
  series: z.array(SvgChartSeriesSchema),
  bars: z.array(
    SvgChartGeometrySchema.extend({
      category: z.string().min(1),
      valueLabel: z.string().min(1),
      value: z.number(),
    }),
  ),
  groupedBars: z.array(
    SvgChartGeometrySchema.extend({
      xLabel: z.string().min(1),
      seriesName: z.string().min(1),
      derivedValue: z.number().nullable(),
    }),
  ),
  stackedBars: z.array(
    z.object({
      xLabel: z.string().min(1),
      totalLabel: z.string().nullable(),
      segments: z.array(
        SvgChartGeometrySchema.extend({
          seriesName: z.string().min(1),
        }),
      ),
    }),
  ),
  totalLabels: z.array(z.string()),
  line: z
    .object({
      pathD: z.string().min(1),
      stroke: z.string().min(1),
      headlineValue: z.string().nullable(),
      headlineLabel: z.string().nullable(),
    })
    .nullable(),
  benchmarkLabel: z.string().nullable(),
  derivedValuesFromGeometry: z.boolean(),
  extractionNotes: z.array(z.string().min(1)),
  unsupportedElements: z.array(z.string()),
  proofAnimationPlan: z.object({
    reconstruction: z.string().min(1),
    event: z.string().min(1),
    staticSvgAsFinalChartAllowed: z.literal(false),
  }),
});

export const SvgChartIngestManifestEntrySchema = z.object({
  id: z.string().min(1),
  originalSourcePath: z.string().min(1),
  localSvgPath: z.string().min(1),
  extractedDataPath: z.string().min(1),
  audit: SvgChartIntakePacketSchema,
  sourceContext: z.string().min(1),
  sourceLocks: z.object({
    title: z.string().min(1),
    sourceNote: z.string().min(1),
    chartType: SvgChartTypeSchema,
    valueCount: z.number().int().nonnegative(),
    categoryCount: z.number().int().nonnegative(),
    xLabelCount: z.number().int().nonnegative(),
    totalLabelCount: z.number().int().nonnegative(),
  }),
  humanApproval: z.object({
    approvedBy: z.string().min(1),
    approvedFor: z.literal("animated-remotion-chart-reconstruction"),
  }),
  finalStaticSvgAllowed: z.literal(false),
  productionReelStarted: z.literal(false),
});

export const SvgChartReviewFrameManifestSchema = z.object({
  phase: z.literal("Phase 4 Add-On: SVG Insight Chart Intake"),
  mode: z.literal("dry-run"),
  reviewFrames: z.array(
    z.object({
      role: z.enum([
        "original-svg-reference",
        "animated-reconstruction",
        "proof-event",
        "cta-residue",
      ]),
      frame: z.number().int().nonnegative(),
      purpose: z.string().min(1),
    }),
  ),
  finalMp4RenderAllowed: z.literal(false),
  productionReelStarted: z.literal(false),
});

export type SvgChartIntakePacket = z.infer<typeof SvgChartIntakePacketSchema>;
export type SvgChartIngestManifestEntry = z.infer<typeof SvgChartIngestManifestEntrySchema>;
export type SvgChartReviewFrameManifest = z.infer<typeof SvgChartReviewFrameManifestSchema>;

