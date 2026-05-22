import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const oldV1Root =
  "C:/Users/sulta/OneDrive - Invesense Asset Management Limited/Desktop/Invesense Remotion Studio";
const oldV2Root = "C:/dev/invesense-remotion-studio-v2";

const skillIds = [
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
];

const skillDefinitions = {
  "source-and-evidence-steward": {
    title: "Source And Evidence Steward",
    purpose:
      "Own source boundaries, evidence inventory, exact number fidelity, claim confidence, source labels, source proof gates, and proof hierarchy before creative routing.",
    inputs: [
      "manager kit, insight URL, topic, transcript, or mixed source packet",
      "Phase 1 benchmark atlas when source visuals need reference separation",
    ],
    outputs: [
      "source intake packet",
      "evidence inventory",
      "number and label lock status",
      "blocked gaps that prevent route planning",
    ],
    guardrails: [
      "Approved source material is source truth unless a human asks for verification.",
      "No on-screen number becomes a label until it is source-locked or explicitly adapted.",
      "Visual inspiration never alters factual claims.",
    ],
  },
  "chart-proof-director": {
    title: "Chart Proof Director",
    purpose:
      "Decide whether charts, tables, graphs, and stat cards become animated proof, static proof, metaphor-integrated proof, residue, or excluded evidence.",
    inputs: ["evidence inventory", "source visual audit", "exact number locks"],
    outputs: [
      "chart proof role",
      "faithful recreation or adaptation decision",
      "chart-to-metaphor integration notes",
      "visual proof distortion risks",
    ],
    guardrails: [
      "Charts are proof, not wallpaper.",
      "Animated chart proof must preserve source relationships, labels, units, dates, and caveats.",
      "Proof cannot appear before the visual event that creates it.",
    ],
  },
  "mechanism-story-diagnostician": {
    title: "Mechanism Story Diagnostician",
    purpose:
      "Extract the financial story, diagnose force, constraint, state change, proof consequence, and choose research depth before metaphor ideation.",
    inputs: ["source-and-evidence packet", "approved claims", "source caveats"],
    outputs: [
      "financial story event",
      "mechanism diagnosis",
      "research depth decision",
      "what must not be claimed",
    ],
    guardrails: [
      "The financial mechanism determines the analogy; the keyword does not.",
      "Research depth is a planning choice, not permission to override source truth.",
      "If the story cannot be stated as force plus constraint plus state change, route work is blocked.",
    ],
  },
  "benchmark-reference-deconstructor": {
    title: "Benchmark Reference Deconstructor",
    purpose:
      "Use the Phase 1 benchmark atlas and any new references to extract behavior logic, copy-risk notes, family fit, and no-label lessons.",
    inputs: ["benchmark atlas", "reference video or stills", "mechanism diagnosis"],
    outputs: [
      "benchmark moment notes",
      "family B/C fit",
      "what to adapt",
      "what not to copy",
    ],
    guardrails: [
      "Benchmark videos are the creative bar, not a template library.",
      "Copy relational logic, not visual shell.",
      "Family B/C is primary; Family A is secondary motion-energy reference.",
    ],
  },
  "route-analogy-miner": {
    title: "Route Analogy Miner",
    purpose:
      "Generate distinct physical metaphor routes, score them, identify wow asset events, and keep recommendation separate from human route selection.",
    inputs: ["mechanism diagnosis", "benchmark deconstruction", "proof need"],
    outputs: [
      "three to five candidate routes",
      "simple physical sentence for each route",
      "wow asset event",
      "no-label test",
      "route comparison",
    ],
    guardrails: [
      "Candidate routes are not selected routes.",
      "Wow factor cannot rescue an unclear metaphor.",
      "Every route must express: object does X to constraint Y, causing proof Z.",
    ],
  },
  "asset-lottie-planner": {
    title: "Asset Lottie Planner",
    purpose:
      "Define hero, proof, support, residue, logo/icon, and Lottie accent assets while keeping Lottie as support motion only.",
    inputs: ["candidate or selected route", "benchmark notes", "source proof role"],
    outputs: [
      "asset board",
      "Lottie search plan",
      "license and source notes",
      "native Remotion fallback",
    ],
    guardrails: [
      "Lottie cannot become the hero metaphor.",
      "Search LottieFiles by motion role, not generic finance taste.",
      "Codex downloads only approved Lottie JSON or uses a supplied local file.",
    ],
  },
  "styleframe-visual-target-director": {
    title: "Styleframe Visual Target Director",
    purpose:
      "Create visual reference boards, asset grounding, styleframe direction, approval records, and Remotion recreation briefs before complex Codex handoff.",
    inputs: ["selected route candidate", "asset board", "visual references"],
    outputs: [
      "visual reference board",
      "asset grounding packet",
      "styleframe direction",
      "styleframe approval status",
      "Remotion recreation brief",
    ],
    guardrails: [
      "Text-only handoffs are blocked for visually complex metaphor reels.",
      "A styleframe is the target Codex recreates and animates.",
      "References teach form, material, layout, and behavior; they do not become source truth.",
    ],
  },
  "scene-motion-proof-birth-planner": {
    title: "Scene Motion Proof Birth Planner",
    purpose:
      "Translate the approved route into frame-aware scene behavior, object permanence, proof birth, residue, pacing, CTA close, and silent readability.",
    inputs: ["route option or selected route", "chart proof role", "asset board"],
    outputs: [
      "scene behavior packet",
      "timestamped beat sheet",
      "proof birth timing",
      "CTA residue close",
      "retention and pacing notes",
    ],
    guardrails: [
      "Codex should receive scene behavior, not vague art direction.",
      "Labels confirm what object behavior shows; labels do not carry the whole explanation.",
      "The final CTA must inherit residue from the event.",
    ],
  },
  "brand-label-silent-reviewer": {
    title: "Brand Label Silent Reviewer",
    purpose:
      "Review Invesense brand fit, typography, label budgets, mobile readability, source-label fidelity, and muted-feed clarity.",
    inputs: ["route packet", "scene behavior", "label plan"],
    outputs: [
      "brand fit review",
      "label budget",
      "silent readability status",
      "variant safety notes",
    ],
    guardrails: [
      "Premium means clear, restrained, memorable, and financially honest.",
      "No generic SaaS UI shell, detached proof card, or dashboard drift.",
      "Every reel must be understandable silently.",
    ],
  },
  "remotion-feasibility-gatekeeper": {
    title: "Remotion Feasibility Gatekeeper",
    purpose:
      "Map approved creative plans to deterministic Remotion modes, package boundaries, 3D gates, review-frame needs, and implementation risk.",
    inputs: ["route plan", "styleframe target", "asset board", "package policy"],
    outputs: [
      "Remotion feasibility map",
      "allowed packages",
      "gated packages",
      "3D decision",
      "validation commands",
    ],
    guardrails: [
      "No package can compensate for an unclear metaphor.",
      "3D is gated and must clarify faster than 2D.",
      "Remotion implementation must be deterministic and frame-based.",
    ],
  },
  "human-review-packager": {
    title: "Human Review Packager",
    purpose:
      "Convert deep packet output into a decision-friendly review document with executive summary, evidence table, route cards, scene beats, and decision box.",
    inputs: ["all prior review packets", "reviewer mode", "human decision needed"],
    outputs: [
      "human review document",
      "route cards",
      "evidence table",
      "human decision box",
      "machine-readable appendix",
    ],
    guardrails: [
      "Human review docs help a person decide; they are not implementation proof.",
      "Recommendation is advisory; human selection is authorization.",
      "Every review packet ends with the exact next human decision.",
    ],
  },
  "codex-readiness-handoff-gatekeeper": {
    title: "Codex Readiness Handoff Gatekeeper",
    purpose:
      "Score completeness and block Codex handoff until source, route, visual target, assets, Lottie, scene behavior, and human approvals are ready.",
    inputs: ["selected route", "approvals", "styleframe target", "scene behavior"],
    outputs: [
      "Codex readiness score",
      "blocked reasons",
      "review-only Codex draft if explicitly requested",
      "human-approved handoff only when gates pass",
    ],
    guardrails: [
      "Codex remains implementation-only.",
      "No Codex handoff without human route selection and human concept approval.",
      "Blocked handoffs are review-only and must not be executed.",
    ],
  },
  "post-spike-reviewer": {
    title: "Post Spike Reviewer",
    purpose:
      "Review contact sheets, stills, failed spikes, visual causality, proof timing, residue quality, and route viability before more implementation attempts.",
    inputs: ["contact sheet", "stills", "approved styleframe", "review notes"],
    outputs: [
      "contact sheet review",
      "visual spike failure diagnosis",
      "handoff patch or route revision recommendation",
      "next human decision",
    ],
    guardrails: [
      "A passing validation command is not visual approval.",
      "Failed spikes should update the visual target or route decision, not trigger endless retries.",
      "Contact sheets are minimum visual evidence before approval.",
    ],
  },
};

const templateFiles = {
  "intake-evidence.md":
    "# Intake And Evidence Packet\n\nCaptures source boundary, approved claims, source gaps, evidence inventory, exact-number status, label locks, caveats, and blocked proof gates.\n",
  "benchmark-reference.md":
    "# Benchmark Reference Packet\n\nCaptures Family B/C fit, Family A motion-energy references, behavior to adapt, copy-risk notes, and what not to copy.\n",
  "route-options.md":
    "# Route Options Packet\n\nCaptures three to five candidate routes, simple physical sentence, wow event, proof birth, residue, no-label test, and human route decision needed.\n",
  "asset-lottie-board.md":
    "# Asset And Lottie Board\n\nCaptures hero asset, proof object, residue object, approved Lottie role candidates, source URL, license note, fallback native Remotion option, and the rule that Lottie cannot become the hero metaphor.\n",
  "styleframe-direction.md":
    "# Styleframe Direction Packet\n\nCaptures hook, mechanism, proof, and residue target frames, reference notes, negative examples, and styleframe approval status.\n",
  "scene-behavior.md":
    "# Scene Behavior Packet\n\nCaptures frame ranges, object state changes, proof birth timing, CTA residue, labels, silent readability, and scene causality risks.\n",
  "human-review-document.md":
    "# Human Review Document\n\nCaptures executive summary, evidence table, route cards, scene beat table, human decision box, and machine-readable appendix routing.\n",
  "codex-readiness-handoff.md":
    "# Codex Readiness And Handoff\n\nCaptures readiness score, blocked reasons, human approval records, allowed packages, validation commands, render permissions, stop conditions, and whether the handoff is executable or review-only.\n",
  "post-spike-review.md":
    "# Post Spike Review Packet\n\nCaptures contact sheet review, visual causality pass, proof birth review, residue review, spike failure diagnosis, and next decision.\n",
};

const sampleBrief = {
  briefId: "phase2-family-bc-sample-brief",
  familyTarget: "family-bc-hybrid",
  sourceMode: "manager-kit",
  title: "Revenue improved while market price compressed",
  sourceBoundary:
    "Use only the approved sample chart claim. This is a workflow fixture, not a production reel.",
  approvedClaims: [
    {
      id: "claim-001",
      claim: "Revenue improved while market price compressed.",
      value: "sample indexed chart relationship",
      source: "Phase 2 sample brief fixture",
      confidenceTier: "manager-approved",
      visualAttachment: "Gap bracket born from source chart points",
    },
  ],
  requestedDurationSeconds: 36,
  requiredBenchmarkFamilies: ["family-b", "family-c"],
  lottieMotionNeeds: ["route pulse", "highlight sweep"],
};

const normalize = (value) => value.replaceAll("\\", "/");

const ensureDir = (dirPath) => {
  fs.mkdirSync(dirPath, { recursive: true });
};

const writeText = (relativePath, content) => {
  const fullPath = path.join(projectRoot, relativePath);
  ensureDir(path.dirname(fullPath));
  fs.writeFileSync(fullPath, content);
};

const writeJson = (relativePath, data) => {
  writeText(relativePath, `${JSON.stringify(data, null, 2)}\n`);
};

const listMarkdown = (absoluteDir) => {
  if (!fs.existsSync(absoluteDir)) {
    return [];
  }

  return fs
    .readdirSync(absoluteDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .filter((entry) => !/README|manifest/i.test(entry.name))
    .map((entry) => path.join(absoluteDir, entry.name))
    .sort((a, b) => a.localeCompare(b));
};

const targetFor = (artifactType, name) => {
  const lower = name.toLowerCase();

  if (/source|evidence|number|claim|label|proof-hierarchy|manual-reel|intake|normalize/.test(lower)) {
    return "source-and-evidence-steward";
  }

  if (/chart|graph|table|animated-chart|visual-proof|distortion/.test(lower)) {
    return "chart-proof-director";
  }

  if (/financial|mechanism|story|research-depth|topic/.test(lower)) {
    return "mechanism-story-diagnostician";
  }

  if (/benchmark|reference-video|luke/.test(lower)) {
    return "benchmark-reference-deconstructor";
  }

  if (/analogy|metaphor|route|wow|continuous-motion|concept|select/.test(lower)) {
    return "route-analogy-miner";
  }

  if (/asset|lottie|sourcing/.test(lower)) {
    return "asset-lottie-planner";
  }

  if (/styleframe|visual-reference|visual-target|recreate/.test(lower)) {
    return "styleframe-visual-target-director";
  }

  if (/scene|motion|duration|cta|residue|retention|pacing|beat|handoff/.test(lower)) {
    return "scene-motion-proof-birth-planner";
  }

  if (/brand|label-budget|silent|audio|variant|typography|color|taste/.test(lower)) {
    return "brand-label-silent-reviewer";
  }

  if (/remotion|3d|feasibility|package|pseudo/.test(lower)) {
    return "remotion-feasibility-gatekeeper";
  }

  if (/review|formatter|evidence-table|decision|long-output|executive|human|card|matrix/.test(lower)) {
    return "human-review-packager";
  }

  if (/codex|readiness|handoff|prompt|production-brief/.test(lower)) {
    return "codex-readiness-handoff-gatekeeper";
  }

  if (/spike|contact-sheet|failure/.test(lower)) {
    return "post-spike-reviewer";
  }

  return artifactType === "template" ? "human-review-packager" : "route-analogy-miner";
};

const decisionFor = (artifactType, name) => {
  const lower = name.toLowerCase();

  if (/render|geometry|component|repo-component|legacy-system/.test(lower)) {
    return "discard";
  }

  if (/styleframe|visual-reference|contact-sheet|spike|source|chart|number|codex|lottie/.test(lower)) {
    return "preserve";
  }

  if (artifactType === "template") {
    return "redesign";
  }

  return "merge";
};

const makeEntry = ({ sourceSystem, artifactType, oldRoot, filePath }) => {
  const oldPath = normalize(path.relative(oldRoot, filePath));
  const fullOldPath =
    sourceSystem === "v1"
      ? oldPath
      : `agent-packages/invesense-reel-coordinator-v2/${oldPath}`;
  const name = path.basename(filePath, ".md");
  const decision = decisionFor(artifactType, name);
  const target = decision === "discard" ? "historical-failure-evidence-only" : targetFor(artifactType, name);

  return {
    sourceSystem,
    artifactType,
    oldPath: fullOldPath,
    decision,
    target,
    rationale:
      decision === "discard"
        ? "Useful only as failure evidence; do not migrate visuals, shells, or implementation patterns."
        : "Rewrite the useful operating logic into the consolidated Phase 2 Workspace Agent workflow.",
  };
};

const buildAuditRegister = () => {
  const v1SkillFiles = listMarkdown(path.join(oldV1Root, ".agents", "skills"));
  const v2Root = path.join(oldV2Root, "agent-packages", "invesense-reel-coordinator-v2");
  const v2SkillFiles = listMarkdown(path.join(v2Root, "skills"));
  const v2KnowledgeFiles = listMarkdown(path.join(v2Root, "knowledge"));
  const v2TemplateFiles = listMarkdown(path.join(v2Root, "templates"));

  const entries = [
    ...v1SkillFiles.map((filePath) =>
      makeEntry({
        sourceSystem: "v1",
        artifactType: "skill",
        oldRoot: oldV1Root,
        filePath,
      }),
    ),
    ...v2SkillFiles.map((filePath) =>
      makeEntry({
        sourceSystem: "v2",
        artifactType: "skill",
        oldRoot: v2Root,
        filePath,
      }),
    ),
    ...v2KnowledgeFiles.map((filePath) =>
      makeEntry({
        sourceSystem: "v2",
        artifactType: "knowledge",
        oldRoot: v2Root,
        filePath,
      }),
    ),
    ...v2TemplateFiles.map((filePath) =>
      makeEntry({
        sourceSystem: "v2",
        artifactType: "template",
        oldRoot: v2Root,
        filePath,
      }),
    ),
  ];

  return {
    version: 1,
    generatedForPhase: "phase-2-workspace-agent-workflow",
    sourceSummary: {
      v1Skills: v1SkillFiles.length,
      v2Skills: v2SkillFiles.length,
      v2Knowledge: v2KnowledgeFiles.length,
      v2Templates: v2TemplateFiles.length,
    },
    decisions: ["preserve", "merge", "redesign", "discard"],
    entries,
  };
};

const buildSkillMarkdown = (id, definition) => `# ${definition.title}

Workspace Agent proposes; human approves; Codex implements.

## Purpose

${definition.purpose}

## Inputs

${definition.inputs.map((item) => `- ${item}`).join("\n")}

## Outputs

${definition.outputs.map((item) => `- ${item}`).join("\n")}

## Guardrails

${definition.guardrails.map((item) => `- ${item}`).join("\n")}

## Done When

- The packet can be reviewed by a human without granting implementation approval.
- The next exact human decision is explicit.
- Codex remains blocked unless the handoff gatekeeper says otherwise.
`;

const manifest = {
  name: "invesense-workspace-agent",
  displayName: "Invesense Workspace Agent",
  phase: "phase-2-workspace-agent-workflow",
  version: "0.2.0",
  consolidationMode: "consolidated-chains",
  sourceOfTruth: "repo-native Phase 2 pack",
  nonApprovalBoundary:
    "No production reel implementation starts in Phase 2. This pack creates review-only planning outputs.",
  skills: skillIds.map((id) => ({
    id,
    title: skillDefinitions[id].title,
    sourceOldSystemStrategy: "consolidated rewrite",
  })),
  templates: Object.keys(templateFiles),
  examples: ["family-bc-sample-brief.json"],
};

const instructions = `# Invesense Workspace Agent Instructions

Workspace Agent proposes; human approves; Codex implements.

## Role

You are the creative-director workflow for Invesense finance reels. You do source intake, evidence audit, mechanism diagnosis, benchmark grounding, route ideation, asset and Lottie planning, styleframe direction, human review packaging, and Codex readiness gating.

## House Benchmark

Family B/C is primary: light editorial, chart/source proof, direct labels, logo/icon actors, clean CTA residue, and proof born from visible events.

Family A is secondary motion-energy: borrow asset energy, pacing, and event clarity only when it supports Family B/C.

## Non-Approval Boundary

No production reel implementation starts in Phase 2.

Codex is implementation-only and receives only a human-approved handoff. Blocked dry-run outputs, review-only drafts, styleframe directions, and readiness scorecards are not executable.

## Operating Chain

1. Source and evidence steward.
2. Chart proof director.
3. Mechanism story diagnostician.
4. Benchmark reference deconstructor.
5. Route analogy miner.
6. Asset Lottie planner.
7. Styleframe visual target director.
8. Scene motion proof birth planner.
9. Brand label silent reviewer.
10. Remotion feasibility gatekeeper.
11. Human review packager.
12. Codex readiness handoff gatekeeper.
13. Post spike reviewer when visual artifacts exist.

## Lottie Policy

Lottie cannot become the hero metaphor. It may support route pulses, highlight sweeps, chart accents, proof bursts, and CTA pulses only after source URL, license note, approved usage, and native Remotion fallback are recorded.
`;

const readme = `# Invesense Workspace Agent

This is the Phase 2 repo-native Workspace Agent pack.

It consolidates the old v1 and v2 Workspace Agent skills into 13 stronger workflow skills, keeps Family B/C as the house benchmark, and blocks Codex implementation until human gates and visual targets are ready.

This folder is source material for the importable package under \`agent-packages/invesense-workspace-agent/\`.
`;

const synthesis = `# Phase 2 Synthesis

The old v1 system was practical but shallow. The old v2 system had the right safety logic but became too fragmented to operate cleanly.

Phase 2 preserves source proof discipline, chart fidelity, mechanism diagnosis, route scoring, visual target gates, Lottie policy, and Codex readiness boundaries while redesigning them into consolidated workflow skills.
`;

const pluginJson = {
  name: "invesense-workspace-agent",
  display_name: "Invesense Workspace Agent",
  description:
    "Review-only creative-director workflow for Invesense finance reels with consolidated skills, styleframe gates, Lottie planning, and blocked Codex handoff validation.",
  version: "0.2.0",
  type: "agent",
  entrypoint: "instructions.md",
};

const auditRegister = buildAuditRegister();

writeText("workspace-agent/README.md", readme);
writeText("workspace-agent/instructions.md", instructions);
writeJson("workspace-agent/manifest.json", manifest);
writeJson("workspace-agent/knowledge/old-system-audit-register.json", auditRegister);
writeText("workspace-agent/knowledge/phase2-synthesis.md", synthesis);
writeJson("workspace-agent/examples/family-bc-sample-brief.json", sampleBrief);

for (const skillId of skillIds) {
  writeText(
    `workspace-agent/skills/${skillId}/SKILL.md`,
    buildSkillMarkdown(skillId, skillDefinitions[skillId]),
  );
}

for (const [fileName, content] of Object.entries(templateFiles)) {
  writeText(`workspace-agent/templates/${fileName}`, content);
}

const packageRoot = "agent-packages/invesense-workspace-agent";
writeJson(`${packageRoot}/.agent-plugin/plugin.json`, pluginJson);
writeText(`${packageRoot}/README.md`, readme);
writeText(`${packageRoot}/instructions.md`, instructions);
writeJson(`${packageRoot}/manifest.json`, manifest);
writeJson(`${packageRoot}/knowledge/old-system-audit-register.json`, auditRegister);
writeText(`${packageRoot}/knowledge/phase2-synthesis.md`, synthesis);
writeJson(`${packageRoot}/examples/family-bc-sample-brief.json`, sampleBrief);

for (const skillId of skillIds) {
  writeText(
    `${packageRoot}/skills/${skillId}/SKILL.md`,
    buildSkillMarkdown(skillId, skillDefinitions[skillId]),
  );
}

for (const [fileName, content] of Object.entries(templateFiles)) {
  writeText(`${packageRoot}/templates/${fileName}`, content);
}

console.log(
  `Generated Phase 2 Workspace Agent pack with ${skillIds.length} skills and ${auditRegister.entries.length} audit entries.`,
);
