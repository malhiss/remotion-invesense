import { z } from "zod";

export const Phase2WorkflowSkillIdSchema = z.enum([
  "source-and-evidence-steward",
  "chart-proof-director",
  "mechanism-story-diagnostician",
  "benchmark-reference-deconstructor",
  "route-analogy-miner",
  "asset-lottie-planner",
  "styleframe-visual-target-director",
  "scene-motion-proof-birth-planner",
  "brand-label-silent-reviewer",
  "remotion-feasibility-gatekeeper",
  "human-review-packager",
  "codex-readiness-handoff-gatekeeper",
  "post-spike-reviewer",
]);

export const WorkspaceAgentSkillSchema = z.object({
  id: Phase2WorkflowSkillIdSchema,
  title: z.string().min(1),
  sourceOldSystemStrategy: z.literal("consolidated rewrite"),
});

export const WorkflowStageSchema = z.object({
  id: z.string().min(1),
  skillId: Phase2WorkflowSkillIdSchema,
  gate: z.string().min(1),
  outputTemplate: z.string().min(1),
});

export const PluginManifestSchema = z.object({
  name: z.literal("invesense-workspace-agent"),
  display_name: z.literal("Invesense Workspace Agent"),
  description: z.string().min(1),
  version: z.string().min(1),
  type: z.literal("agent"),
  entrypoint: z.literal("instructions.md"),
});

export const OldSystemAuditEntrySchema = z.object({
  sourceSystem: z.enum(["v1", "v2"]),
  artifactType: z.enum(["skill", "knowledge", "template"]),
  oldPath: z.string().min(1),
  decision: z.enum(["preserve", "merge", "redesign", "discard"]),
  target: z.string().min(1),
  rationale: z.string().min(1),
});

export const OldSystemAuditRegisterSchema = z.object({
  version: z.literal(1),
  generatedForPhase: z.literal("phase-2-workspace-agent-workflow"),
  sourceSummary: z.object({
    v1Skills: z.literal(5),
    v2Skills: z.literal(63),
    v2Knowledge: z.literal(84),
    v2Templates: z.literal(70),
  }),
  decisions: z.array(z.enum(["preserve", "merge", "redesign", "discard"])),
  entries: z.array(OldSystemAuditEntrySchema).length(222),
});

export const DryRunInputSchema = z.object({
  briefId: z.string().min(1),
  familyTarget: z.enum(["family-b", "family-c", "family-bc-hybrid"]),
  sourceMode: z.enum(["manager-kit", "insight-url", "topic", "transcript", "mixed"]),
  title: z.string().min(1),
  sourceBoundary: z.string().min(1),
  approvedClaims: z.array(
    z.object({
      id: z.string().min(1),
      claim: z.string().min(1),
      value: z.string().min(1),
      source: z.string().min(1),
      confidenceTier: z.string().min(1),
      visualAttachment: z.string().min(1),
    }),
  ),
  requestedDurationSeconds: z.number().positive(),
  requiredBenchmarkFamilies: z.array(z.string().min(1)),
  lottieMotionNeeds: z.array(z.string().min(1)),
});

export const HumanGateRecordSchema = z.object({
  required: z.array(z.string().min(1)),
  approved: z.array(z.string().min(1)),
  missing: z.array(z.string().min(1)),
});

export const BlockedCodexHandoffStatusSchema = z.object({
  readinessStatus: z.literal("blocked"),
  executable: z.literal(false),
  blockedBy: z.array(z.string().min(1)),
});

export const Phase2DryRunOutputSchema = z.object({
  phase: z.literal("phase-2-workspace-agent-workflow"),
  reviewOnly: z.literal(true),
  productionImplementationAllowed: z.literal(false),
  sourceAndEvidence: z.object({
    sourceBoundary: z.string().min(1),
    approvedClaims: z.array(z.unknown()).min(1),
    sourceProofStatus: z.literal("locked-for-dry-run"),
  }),
  benchmarkLinks: z.array(z.unknown()).min(2),
  routeOptions: z.array(z.unknown()).min(3),
  assetLottieBoard: z.object({
    heroAsset: z.string().min(1),
    proofObject: z.string().min(1),
    residueObject: z.string().min(1),
    lottiePolicy: z.object({
      heroMetaphorAllowed: z.literal(false),
      allowedRoles: z.array(z.string().min(1)),
    }),
  }),
  styleframeRequirement: z.object({
    status: z.literal("required-before-codex"),
    requiredFrames: z.array(z.string().min(1)),
  }),
  sceneBehavior: z.object({
    durationSeconds: z.number().positive(),
    proofBirthFrameRange: z.string().min(1),
    ctaResidue: z.string().min(1),
  }),
  humanGates: HumanGateRecordSchema,
  codexHandoff: BlockedCodexHandoffStatusSchema,
});

export type WorkspaceAgentSkill = z.infer<typeof WorkspaceAgentSkillSchema>;
export type OldSystemAuditEntry = z.infer<typeof OldSystemAuditEntrySchema>;
export type OldSystemAuditRegister = z.infer<
  typeof OldSystemAuditRegisterSchema
>;
export type DryRunInput = z.infer<typeof DryRunInputSchema>;
export type Phase2DryRunOutput = z.infer<typeof Phase2DryRunOutputSchema>;
