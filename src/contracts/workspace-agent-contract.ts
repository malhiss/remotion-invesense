import { z } from "zod";
import {
  AssetBoardPacketSchema,
  BenchmarkDeconstructionPacketSchema,
  ChartProofPacketSchema,
  CodexHandoffPacketSchema,
  CodexReadinessScorecardSchema,
  EvidenceAuditPacketSchema,
  LottieSearchPacketSchema,
  MechanismDiagnosisPacketSchema,
  SourceIntakePacketSchema,
  StyleframeDirectionPacketSchema,
} from "./family-bc-contract";

export const BenchmarkAtlasFamilySchema = z.enum([
  "family-a",
  "family-b",
  "family-c",
  "family-bc-hybrid",
]);

export const CopyRiskSchema = z.enum(["low", "medium", "high"]);

export const BenchmarkAtlasEntrySchema = z.object({
  id: z.string().min(1),
  batch: z.string().min(1),
  sourcePath: z.string().min(1),
  fileName: z.string().min(1),
  analysisPath: z.string().min(1),
  contactSheet: z.string().min(1),
  transcriptText: z.string().min(1),
  durationSeconds: z.number().nonnegative(),
  family: BenchmarkAtlasFamilySchema,
  topic: z.string().min(1),
  assets: z.array(z.string()).min(1),
  motifs: z.array(z.string()).min(1),
  analogies: z.array(z.string()).min(1),
  wowEvents: z.array(z.string()).min(1),
  proofOperators: z.array(z.string()).min(1),
  chartRole: z.string().min(1),
  ctaBehavior: z.string().min(1),
  financialMechanisms: z.array(z.string()).min(1),
  whatToAdapt: z.array(z.string()).min(1),
  whatNotToCopy: z.array(z.string()).min(1),
  copyRisk: CopyRiskSchema,
});

export const BenchmarkAtlasSchema = z.object({
  version: z.literal(1),
  generatedFrom: z.array(z.string()).min(1),
  totalVideos: z.number().int().nonnegative(),
  entries: z.array(BenchmarkAtlasEntrySchema),
});

export const WorkspaceAgentRoleSchema = z.enum(["creative-director"]);

export const CodexRoleSchema = z.enum(["implementation-only"]);

const BenchmarkLinkSchema = z.object({
  benchmarkId: z.string().min(1),
  family: BenchmarkAtlasFamilySchema,
  reason: z.string().min(1),
  adapt: z.array(z.string()).min(1),
  avoid: z.array(z.string()).min(1),
});

export const WorkspaceAgentPacketStackSchema = z.object({
  stackId: z.string().min(1),
  phase: z.literal("phase-1-knowledge-layer"),
  workspaceAgentRole: WorkspaceAgentRoleSchema,
  codexRole: CodexRoleSchema,
  productionImplementationAllowed: z.literal(false),
  sourceIntake: SourceIntakePacketSchema,
  evidenceAudit: EvidenceAuditPacketSchema,
  mechanismDiagnosis: MechanismDiagnosisPacketSchema,
  benchmarkDeconstruction: BenchmarkDeconstructionPacketSchema,
  routeOptions: z.array(z.unknown()).min(1),
  selectedRouteId: z.string().min(1),
  chartProof: ChartProofPacketSchema,
  assetBoard: AssetBoardPacketSchema,
  lottieSearch: LottieSearchPacketSchema,
  styleframes: z.array(StyleframeDirectionPacketSchema).min(1),
  codexReadiness: CodexReadinessScorecardSchema,
  codexHandoff: CodexHandoffPacketSchema,
  benchmarkLinks: z.array(BenchmarkLinkSchema).min(1),
  requiredHumanGates: z.array(z.string()).min(1),
});

export type BenchmarkAtlasEntry = z.infer<typeof BenchmarkAtlasEntrySchema>;
export type BenchmarkAtlas = z.infer<typeof BenchmarkAtlasSchema>;
export type WorkspaceAgentPacketStack = z.infer<
  typeof WorkspaceAgentPacketStackSchema
>;
