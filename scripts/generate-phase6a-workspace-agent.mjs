import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const packageRoot = "agent-packages/invesense-workspace-agent";

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
    description:
      "Use for Invesense reel intake, source boundaries, claim locks, evidence inventory, exact number fidelity, source labels, and proof hierarchy before any creative routing.",
    purpose:
      "Own source truth before metaphor. Inventory all claims, charts, tables, captions, source notes, and numbers so no visual route can invent or distort proof.",
    when: [
      "A market insight, manager kit, source URL, transcript, SVG chart, or rough finance topic arrives.",
      "A proposed reel includes numbers, chart proof, external sources, or source screenshots.",
      "Codex or a human asks for implementation before claims are locked.",
    ],
    inputs: [
      "Insight/source packet, source URL, transcript, SVG, chart image, or manager-approved claim list.",
      "Any supplied source notes, chart titles, units, caveats, and previous evidence packets.",
      "Family B/C benchmark target and any declared off-limits claims.",
    ],
    outputs: [
      "Source intake packet with source boundary and missing inputs.",
      "Evidence inventory separating headline proof, supporting proof, visual proof, and unusable proof.",
      "Exact number and source-label lock table.",
      "Blocked gaps that prevent route planning or Codex handoff.",
    ],
    process: [
      "List every claim, number, chart, table, footnote, caption, source note, and caveat from the provided source before ideation.",
      "Mark each evidence item as source-locked, adapted-with-approval, missing, unreadable, or unusable.",
      "Separate factual source evidence from visual inspiration and benchmark references.",
      "Block creative route work when critical proof visuals or numbers are missing.",
      "State the next human decision: approve claims, provide source, approve manual extraction, or block the reel.",
    ],
    stop: [
      "A number or claim is not traceable to approved source material.",
      "A source chart is referenced but unreadable or unaudited.",
      "External research would change claims without human approval.",
    ],
    references: [
      "references/source-chart-svg-proof-rules.md",
      "references/remotion-qa-codex-gates.md",
    ],
  },
  "chart-proof-director": {
    title: "Chart Proof Director",
    description:
      "Use when a source chart, SVG, table, graph, benchmark line, or stat card may become animated proof in a Family B/C reel.",
    purpose:
      "Decide how chart evidence becomes source-faithful motion: animated native chart, SVG reconstruction, chart-to-proof extraction, or excluded proof.",
    when: [
      "The insight includes SVG charts, screenshots, bars, candlesticks, lines, tables, or benchmark values.",
      "A route risks using a chart as wallpaper or a detached proof card.",
      "Animated chart proof is needed before Codex implementation.",
    ],
    inputs: [
      "Evidence inventory and exact number locks.",
      "SVG chart audit or source-chart comparison packet.",
      "Chart title, units, categories, dates, source note, and proof hierarchy.",
    ],
    outputs: [
      "Chart proof decision: faithful reconstruction, adapted proof chart, chart-to-metaphor integration, reference-only, or do-not-use.",
      "Animated SVG/native chart requirements and forbidden static-paste rules.",
      "Proof birth moment attached to a chart event.",
      "Source-chart comparison frames for review.",
    ],
    process: [
      "Confirm the chart is readable, central to proof, and source-locked.",
      "Choose whether animation improves understanding without weakening the physical mechanism.",
      "Require native Remotion/SVG reconstruction for proof-critical SVG charts.",
      "Attach proof labels to bar/line/marker events, never before those events occur.",
      "Block charts that require invented values, dates, units, labels, or ordering.",
    ],
    stop: [
      "The chart is unreadable, unsupported, or not source-locked.",
      "Animation would distort scale, rank, units, or time relationship.",
      "The proposed output is a static pasted chart when animated proof is required.",
    ],
    references: [
      "references/source-chart-svg-proof-rules.md",
      "references/family-bc-benchmark-grammar.md",
    ],
  },
  "mechanism-story-diagnostician": {
    title: "Mechanism Story Diagnostician",
    description:
      "Use to turn financial topics into force, constraint, state change, proof consequence, and physical mechanism before route ideation.",
    purpose:
      "Find what is actually happening financially so the reel shows mechanism, not keywords, dashboards, or abstract shape-only diagrams.",
    when: [
      "The topic is broad, such as AI capex, sukuk issuance, tokenization, valuation gaps, flows, spreads, or screening.",
      "The first idea sounds like a generic chart, UI panel, or finance explainer.",
      "The route does not have a physical sentence yet.",
    ],
    inputs: [
      "Approved claims and evidence hierarchy.",
      "Financial terms, chart proof role, and source caveats.",
      "Benchmark family target and duration target.",
    ],
    outputs: [
      "Mechanism diagnosis: force, constraint, state change, proof consequence.",
      "Financial mechanism family and risks.",
      "Simple physical sentence candidates.",
      "Research depth recommendation that cannot override source truth.",
    ],
    process: [
      "State the finance story without visual language first.",
      "Map the story to a force acting on a constraint and causing a visible state change.",
      "Reject keyword-led visuals that do not explain the mechanism.",
      "Choose mechanism families from references only as options, not as route approval.",
      "Define what the viewer should understand before reading every label.",
    ],
    stop: [
      "No force, constraint, or state change can be stated.",
      "The idea depends on labels to carry the whole meaning.",
      "The visual route would become a generic diagram or abstract shapes.",
    ],
    references: [
      "references/mechanism-proof-wow-atlas.md",
      "references/family-bc-benchmark-grammar.md",
    ],
  },
  "benchmark-reference-deconstructor": {
    title: "Benchmark Reference Deconstructor",
    description:
      "Use to compare a proposed route against Family B/C benchmark grammar and Family A motion-energy references without copying creator layouts.",
    purpose:
      "Ground creative direction in the benchmark atlas: Family B/C primary for light editorial proof, Family A secondary for motion energy only.",
    when: [
      "A route, styleframe, or pilot handoff needs benchmark grounding.",
      "The reel risks drifting dark, dashboard-like, or template-like.",
      "A reference video, contact sheet, or benchmark atlas entry is used.",
    ],
    inputs: [
      "Benchmark atlas entry, contact sheet, or reference stills.",
      "Mechanism diagnosis and selected family target.",
      "Copy-risk constraints.",
    ],
    outputs: [
      "Benchmark moment notes with what to adapt and what not to copy.",
      "Family B/C fit assessment and Family A motion-energy notes.",
      "Copy-risk classification.",
      "No-label test lessons.",
    ],
    process: [
      "Classify each reference as source, benchmark, material, motion, style, or negative example.",
      "Extract behavior logic rather than layout shell.",
      "Record what improves Family B/C light editorial proof.",
      "Use Family A only for asset motion, pacing, and event clarity.",
      "Block references that change claims or tempt direct copying.",
    ],
    stop: [
      "Reference logic starts replacing source truth.",
      "Family A becomes the default visual style.",
      "The plan copies a creator shell instead of adapting behavior logic.",
    ],
    references: [
      "references/family-bc-benchmark-grammar.md",
      "references/remotion-qa-codex-gates.md",
    ],
  },
  "route-analogy-miner": {
    title: "Route Analogy Miner",
    description:
      "Use to generate and compare physical metaphor routes with proof birth, wow asset events, and residue without selecting the route for the human.",
    purpose:
      "Produce distinct route options that show financial mechanism through object behavior and source-born proof.",
    when: [
      "Mechanism diagnosis is ready and human needs creative options.",
      "A route has weak hero asset, weak event, weak proof birth, or weak residue.",
      "The output risks becoming a repeatable template generator.",
    ],
    inputs: [
      "Mechanism diagnosis and proof hierarchy.",
      "Benchmark deconstruction and chart proof decision.",
      "Family B/C grammar and duration target.",
    ],
    outputs: [
      "Three to five route cards.",
      "Simple physical sentence for each route.",
      "Hero asset, constraint, wow event, proof birth, residue, and risks.",
      "Recommendation plus explicit human route selection gate.",
    ],
    process: [
      "Generate routes that differ in mechanism, not just color or layout.",
      "For each route, state: object does X to constraint Y, causing proof Z.",
      "Attach chart/source proof to the event when proof is critical.",
      "Score no-label clarity, Family B/C fit, implementation feasibility, and copy risk.",
      "Do not select the route; package it for human decision.",
    ],
    stop: [
      "The route is a chart-only dashboard, generic UI, or abstract shape sequence.",
      "Proof appears as a pasted plate instead of being born from the event.",
      "The final frame does not preserve residue from the event.",
    ],
    references: [
      "references/mechanism-proof-wow-atlas.md",
      "references/family-bc-benchmark-grammar.md",
    ],
  },
  "asset-lottie-planner": {
    title: "Asset Lottie Planner",
    description:
      "Use to plan hero assets, proof objects, logo actors, SVG/chart assets, and Lottie accents while keeping Lottie supportive.",
    purpose:
      "Create asset boards that make the reel asset-led without letting Lottie, icons, or decoration replace the hero mechanism.",
    when: [
      "A selected or candidate route needs assets, logos, chart files, or motion accents.",
      "LottieFiles may provide route pulses, checkmarks, highlights, loaders, or CTA effects.",
      "Codex needs deterministic local asset instructions.",
    ],
    inputs: [
      "Route option or selected route.",
      "Chart proof decision and source asset list.",
      "Lottie motion need, source URL, license note, and native fallback if known.",
    ],
    outputs: [
      "Asset board: hero asset, proof object, logo/icon actors, residue object, source charts.",
      "Lottie search/acquisition packet with usage role, license/source, human approval, and fallback.",
      "Forbidden asset roles and clutter risks.",
      "Codex ingestion requirements for local/direct JSON only.",
    ],
    process: [
      "Separate hero metaphor assets from support accents.",
      "Search or request Lottie by motion role, not generic finance words.",
      "Require human approval, source URL, license note, approved usage, and native fallback.",
      "Use Lottie for route pulses, highlight sweeps, proof bursts, chart accents, or CTA pulses only.",
      "Block unapproved Lottie, decorative clutter, random confetti, and standalone proof.",
    ],
    stop: [
      "Lottie becomes the hero metaphor or proof itself.",
      "An asset has no source/license/approval record.",
      "The plan depends on browser-scraped remote Lottie inside a render.",
    ],
    references: [
      "references/asset-lottie-styleframe-rules.md",
      "references/remotion-qa-codex-gates.md",
    ],
  },
  "styleframe-visual-target-director": {
    title: "Styleframe Visual Target Director",
    description:
      "Use to require visual references, asset boards, and approved styleframes before complex Codex handoff.",
    purpose:
      "Stop the old failure pattern where Codex had to invent taste from prose and produced diagrams instead of premium Family B/C reels.",
    when: [
      "A route is visually complex, metaphor-led, or benchmark-sensitive.",
      "The user has not approved hook, mechanism, proof, and residue target frames.",
      "Codex handoff is being requested from text-only direction.",
    ],
    inputs: [
      "Selected route, asset board, benchmark references, and chart proof decision.",
      "Negative references and copy-risk notes.",
      "Human style/taste preferences.",
    ],
    outputs: [
      "Visual reference board with source vs inspiration separation.",
      "Styleframe direction for hook, mechanism, proof, Lottie, and CTA residue frames.",
      "Human styleframe approval record or blocked reasons.",
      "Remotion recreation brief for Codex after approval.",
    ],
    process: [
      "Define what each reference teaches: form, material, layout, behavior, pacing, or negative example.",
      "Require approved target stills or detailed styleframe direction for complex reels.",
      "State what may be adapted and what must not be copied.",
      "Block Codex handoff if visual targets are missing or too vague.",
      "Preserve Family B/C light editorial grammar unless a dark beat is explicitly approved.",
    ],
    stop: [
      "Text-only handoff for a complex metaphor reel.",
      "Visual references alter source claims.",
      "The target could be swapped into any reel without losing meaning.",
    ],
    references: [
      "references/asset-lottie-styleframe-rules.md",
      "references/family-bc-benchmark-grammar.md",
    ],
  },
  "scene-motion-proof-birth-planner": {
    title: "Scene Motion Proof Birth Planner",
    description:
      "Use to convert an approved route into frame-aware scene behavior, proof birth, object permanence, pacing, and CTA residue.",
    purpose:
      "Make motion carry meaning: event first, proof born from event, labels after cause, residue at close.",
    when: [
      "A selected route needs a 30-60 second reel beat plan.",
      "The proof appears detached or label-heavy.",
      "Codex needs frame ranges and object states rather than vague art direction.",
    ],
    inputs: [
      "Selected route and simple physical sentence.",
      "Chart proof decision, asset board, styleframe direction, and duration target.",
      "Review frame roles from Phase 5.",
    ],
    outputs: [
      "Timestamped beat sheet and frame-aware scene behavior packet.",
      "Hero object state changes and constraint behavior.",
      "Proof birth timing and label attach rules.",
      "CTA residue close inheriting the event object.",
    ],
    process: [
      "Plan hook, setup, mechanism, event, proof birth, Lottie accent, and CTA residue beats.",
      "State object state before, during, and after each event.",
      "Keep labels confirmatory and mobile-readable.",
      "Ensure proof appears only after the event creates it.",
      "Define review frames for hook, chart, event, proof, Lottie, and CTA residue.",
    ],
    stop: [
      "Labels carry the whole explanation.",
      "Proof appears before cause.",
      "CTA is a generic end card instead of inherited residue.",
    ],
    references: [
      "references/mechanism-proof-wow-atlas.md",
      "references/remotion-qa-codex-gates.md",
    ],
  },
  "brand-label-silent-reviewer": {
    title: "Brand Label Silent Reviewer",
    description:
      "Use to review Invesense fit, light editorial taste, label budget, typography, mobile-safe zones, and silent-feed clarity.",
    purpose:
      "Keep reels premium, readable, and benchmark-aligned without drifting into Canva, dashboards, cards, or generic SaaS UI.",
    when: [
      "A route, styleframe, scene plan, or Codex handoff includes text or source labels.",
      "The reel must work muted on social feeds.",
      "The visual system risks looking like a deck, dashboard, or chart demo.",
    ],
    inputs: [
      "Scene behavior, label plan, brand/tone notes, safe-zone plan, and benchmark fit.",
      "Source-label lock table and proof hierarchy.",
    ],
    outputs: [
      "Label budget and text hierarchy review.",
      "Silent readability assessment.",
      "Family B/C taste pass/fail notes.",
      "Mobile safe-zone risks and fixes.",
    ],
    process: [
      "Check that text is large, direct, and attached to visual events.",
      "Reject detached proof cards and labels floating over unrelated motion.",
      "Preserve source labels and caveats while keeping visual hierarchy clean.",
      "Check the no-label test: object behavior should communicate the mechanism first.",
      "Keep Family B/C light background grammar as default.",
    ],
    stop: [
      "Dashboard/card drift becomes the main visual language.",
      "Text explains what motion fails to show.",
      "Source labels are changed for style.",
    ],
    references: [
      "references/family-bc-benchmark-grammar.md",
      "references/remotion-qa-codex-gates.md",
    ],
  },
  "remotion-feasibility-gatekeeper": {
    title: "Remotion Feasibility Gatekeeper",
    description:
      "Use to map approved creative plans to deterministic Remotion capabilities, allowed packages, SVG/chart paths, Lottie rules, and review tooling.",
    purpose:
      "Use Remotion to its true strengths: frame-perfect React video, native SVG/chart animation, deterministic assets, Lottie accents, paths, transitions, and review stills.",
    when: [
      "A route is near Codex handoff.",
      "The plan asks for 3D, Lottie, SVG chart reconstruction, transitions, captions, or complex media.",
      "Implementation risk or package boundaries are unclear.",
    ],
    inputs: [
      "Selected route, styleframes, asset board, chart proof packet, and scene behavior.",
      "Allowed Remotion packages and gated package requests.",
      "Review frame manifest.",
    ],
    outputs: [
      "Remotion feasibility map with implementation modes.",
      "Allowed and gated package list.",
      "Determinism requirements and asset loading rules.",
      "Validation and review commands.",
    ],
    process: [
      "Prefer native Remotion/SVG for proof-critical charts and shape/path animation.",
      "Use Lottie only through approved local JSON and QA frames.",
      "Gate 3D unless it clarifies faster than 2D.",
      "Require deterministic frame-based animation and source-safe props.",
      "Block final MP4 until stills/contact sheets pass.",
    ],
    stop: [
      "A package is added because it looks cool rather than clarifying the mechanism.",
      "Remote assets are required at render time.",
      "The plan cannot be reviewed through stills/contact sheets first.",
    ],
    references: [
      "references/remotion-qa-codex-gates.md",
      "references/source-chart-svg-proof-rules.md",
    ],
  },
  "human-review-packager": {
    title: "Human Review Packager",
    description:
      "Use to turn deep packet work into a decision-friendly human review document with route cards, evidence tables, visual targets, and exact approval choices.",
    purpose:
      "Make human gates real. The package must help the user approve, reject, or revise without reading every internal packet.",
    when: [
      "Route options, source proof, asset plans, or styleframes need approval.",
      "The next step depends on human route, asset, Lottie, styleframe, or Codex readiness approval.",
      "Outputs are too long or too machine-shaped.",
    ],
    inputs: [
      "All prior packets and blocked reasons.",
      "Evidence table, route cards, visual reference board, and decision gates.",
    ],
    outputs: [
      "Human review document.",
      "Route cards and evidence table.",
      "Decision box with approve/revise/block choices.",
      "Machine-readable appendix for later validation.",
    ],
    process: [
      "Summarize only what changes the next decision.",
      "Separate facts, creative recommendation, visual references, and implementation readiness.",
      "Surface risks: source gaps, chart distortion, weak proof birth, weak residue, Lottie misuse.",
      "Name the exact next human approval needed.",
      "Keep Codex blocked until the required approvals are explicit.",
    ],
    stop: [
      "The document implies approval that the human has not given.",
      "The recommendation hides source or visual risks.",
      "Codex could execute from the review document alone.",
    ],
    references: [
      "references/remotion-qa-codex-gates.md",
      "references/family-bc-benchmark-grammar.md",
    ],
  },
  "codex-readiness-handoff-gatekeeper": {
    title: "Codex Readiness Handoff Gatekeeper",
    description:
      "Use before any Codex implementation request to score readiness and block handoff until source, route, assets, styleframes, and review gates are approved.",
    purpose:
      "Protect against the old fatal mistake: Codex receives prose too early and invents generic diagrams. Codex remains implementation-only.",
    when: [
      "The user asks Codex to implement a reel.",
      "A packet stack claims to be handoff-ready.",
      "Any gate may still be missing.",
    ],
    inputs: [
      "Source/evidence locks, selected route, human approvals, asset/Lottie approvals, styleframes, scene behavior, review frame plan.",
      "Remotion feasibility map and validation commands.",
    ],
    outputs: [
      "Readiness scorecard with pass/weak/blocked dimensions.",
      "Blocked reasons or executable Codex handoff.",
      "Files allowed/forbidden to modify and render permissions.",
      "Stop conditions for Codex.",
    ],
    process: [
      "Check all gates: source locks, chart proof, route approval, concept approval, asset/Lottie approval, styleframes, scene behavior, review frames.",
      "Block handoff if any required gate is missing or more than two dimensions are weak.",
      "Ensure Codex cannot choose route, analogy, claims, visual style, or numbers.",
      "Require still/contact-sheet review before draft MP4 and final approval before final MP4.",
      "Output review-only draft if requested, but mark it non-executable.",
    ],
    stop: [
      "Human route approval is missing.",
      "Styleframes or visual targets are missing for a complex reel.",
      "Proof is detached, chart fidelity unresolved, or source labels unlocked.",
    ],
    references: [
      "references/remotion-qa-codex-gates.md",
      "references/source-chart-svg-proof-rules.md",
    ],
  },
  "post-spike-reviewer": {
    title: "Post Spike Reviewer",
    description:
      "Use after stills, contact sheets, disposable spikes, or draft review artifacts exist to diagnose visual failure before more implementation.",
    purpose:
      "Treat visual failure as evidence. Passing tests is not visual approval; failed contact sheets should change the route, styleframe, or handoff.",
    when: [
      "Codex has produced stills, contact sheets, review frames, or a disposable spike.",
      "The output feels diagrammatic, dashboard-like, abstract, or below benchmark.",
      "The team is tempted to iterate code without diagnosing visual causality.",
    ],
    inputs: [
      "Contact sheet, still frames, approved styleframes, source-chart comparison, Lottie QA frames, and review notes.",
      "Original handoff and no-label test.",
    ],
    outputs: [
      "Contact sheet review.",
      "Visual causality and proof birth diagnosis.",
      "Residue/CTA quality review.",
      "Recommendation: patch handoff, revise route, revise styleframe, or stop.",
    ],
    process: [
      "Compare hook, chart, event, proof, Lottie, and CTA residue frames against approved targets.",
      "Check whether object behavior communicates before labels.",
      "Identify whether failure is source, route, styleframe, asset, motion, chart, Lottie, or Codex execution.",
      "Do not approve visual quality because technical validation passed.",
      "Return the exact next human decision.",
    ],
    stop: [
      "No contact sheet or stills exist.",
      "The review tries to fix visuals without naming the failure cause.",
      "A weak route is patched endlessly instead of revisited.",
    ],
    references: [
      "references/remotion-qa-codex-gates.md",
      "references/family-bc-benchmark-grammar.md",
    ],
  },
};

const references = {
  "family-bc-benchmark-grammar.md": `# Family B/C Benchmark Grammar

Family B/C is primary. Use light editorial backgrounds, source charts, direct labels, logo/icon actors, mobile-readable typography, and CTA residue connected to the proof event.

Family A is secondary. Borrow asset energy, pacing, event clarity, and animation confidence only when it supports Family B/C. Do not turn the house style into dark cinematic spectacle.

Required benchmark behavior:

- Chart proof is terrain, not wallpaper.
- Logos and icons behave as actors, not badges on cards.
- Labels confirm object behavior; they do not carry the whole meaning.
- Proof birth happens after a visible chart, route, stamp, gate, scanner, caliper, or object event.
- CTA residue inherits a line, marker, underline, bracket, path, stamp, or object from the event.

Anti-failure rules:

- no abstract shape-only diagrams
- no dashboard/card drift
- no Canva/deck pacing
- no generic SaaS UI panels
- no detached proof plates
- no source-free numbers
`,
  "source-chart-svg-proof-rules.md": `# Source, Chart, And SVG Proof Rules

Use source proof before metaphor. The Workspace Agent must inventory claims, numbers, charts, tables, labels, units, dates, source notes, and caveats before creative routing.

Chart and SVG policy:

- A proof-critical SVG chart should become an animated SVG or native Remotion chart, not a static pasted image.
- Preserve source rank order, scale relationships, labels, dates, units, and source notes.
- If extraction confidence is low, block Codex until a human approves manual extraction or supplies data.
- Static source visuals may appear in review comparison, but static pasted chart output is forbidden when animated proof is required.
- Proof labels appear only after the chart event that creates them.

Evidence gates:

- exact number fidelity
- source label lock
- chart graph table audit
- visual proof distortion check
- proof hierarchy check
`,
  "mechanism-proof-wow-atlas.md": `# Mechanism, Proof, And Wow Asset Atlas

The mechanism library inspires routes; it does not select routes.

Route sentence pattern: object does X to constraint Y, causing proof Z.

Useful mechanism families:

- Support and resistance: floor catch, floor crack, barrier hold, barrier breach.
- Screening and filtering: methodology scanner, reject deflection, sieve pass, aperture narrowing.
- Liquidity and flow: tank fill/drain, pipe bottleneck, route rail, endpoint settlement.
- Spread and compression: caliper gap, clamp compression, dual-rail tension, bracket dock.
- Tokenization and access: vault unlock, token unfold, access bridge, eligibility mint.
- Settlement and certification: ledger stamp, proof latch, route endpoint, stamped readout.
- Proof extraction: chart-to-number detach, endpoint label lock, fill mark lock, rejected branch tag.

Wow events must clarify mechanism. Wow factor cannot rescue an unclear metaphor.

Proof birth patterns:

- endpoint label after endpoint settles
- bracket label after gap opens
- stamped readout after stamp contact
- selected path proof after route endpoint
- chart marker proof after chart event

Residue patterns:

- broken line remains
- route trail remains
- scanner aperture remains
- caliper remains open
- proof underline becomes CTA residue
`,
  "asset-lottie-styleframe-rules.md": `# Asset, Lottie, And Styleframe Rules

Lottie cannot become the hero metaphor. Lottie can support route pulses, highlight sweeps, chart accents, proof bursts, checkmarks, warning marks, loaders, and CTA pulses only.

Every Lottie candidate needs:

- motion role
- source URL or local path
- license note
- approved usage
- human approval
- native Remotion fallback

Styleframe before Codex:

- Complex metaphor reels need approved hook, mechanism, proof, Lottie, and CTA residue targets.
- Visual references teach form, material, layout, behavior, and pacing; they do not become source truth.
- Codex must not invent premium visual style from prose.

Asset board fields:

- hero asset
- proof object
- residue object
- logo/icon actors
- source charts
- Lottie accent candidates
- negative references
`,
  "remotion-qa-codex-gates.md": `# Remotion, QA, And Codex Gates

Use Remotion to its true capabilities: deterministic frame-based React video, native SVG/chart animation, paths, transitions, local assets, Lottie accents, captions, review stills, and contact sheets.

Codex remains implementation-only. Codex cannot choose route, analogy, numbers, source claims, visual style, or Lottie assets.

Before Codex handoff:

- source locks approved
- chart/SVG proof role approved
- human route approval recorded
- asset and Lottie approvals recorded
- styleframe targets approved
- scene behavior packet complete
- review frame manifest complete

QA gates:

- stills before MP4
- contact sheet before draft
- source-chart comparison for chart proof
- Lottie entry/peak/exit QA
- safe-zone QA for 1080x1920
- final MP4 blocked without explicit approval
`,
};

const templates = {
  "intake-evidence.md": {
    title: "Intake And Evidence Packet",
    type: "source-intake-evidence",
    fields: [
      "sourceMode",
      "sourceBoundary",
      "approvedClaims",
      "evidenceElements",
      "headlineProof",
      "supportingProof",
      "sourceLabelLocks",
      "missingInputs",
      "externalResearchLimits",
    ],
  },
  "chart-proof.md": {
    title: "Chart Proof Packet",
    type: "chart-proof",
    fields: [
      "chartId",
      "chartType",
      "sourcePath",
      "title",
      "units",
      "sourceNote",
      "extractedValues",
      "animationDecision",
      "proofBirthEvent",
      "sourceChartComparisonFrames",
    ],
  },
  "benchmark-reference.md": {
    title: "Benchmark Reference Packet",
    type: "benchmark-reference",
    fields: [
      "atlasIds",
      "familyFit",
      "whatToAdapt",
      "whatNotToCopy",
      "copyRisk",
      "noLabelLessons",
    ],
  },
  "route-options.md": {
    title: "Route Options Packet",
    type: "route-options",
    fields: [
      "routeCards",
      "simplePhysicalSentence",
      "heroAsset",
      "constraint",
      "wowEvent",
      "proofBirth",
      "residue",
      "risks",
      "humanRouteDecision",
    ],
  },
  "asset-lottie-board.md": {
    title: "Asset And Lottie Board",
    type: "asset-lottie-board",
    fields: [
      "heroAsset",
      "proofObject",
      "residueObject",
      "logoActors",
      "sourceCharts",
      "lottieCandidates",
      "licenseNotes",
      "nativeFallbacks",
      "humanAssetApproval",
    ],
  },
  "styleframe-direction.md": {
    title: "Styleframe Direction Packet",
    type: "styleframe-direction",
    fields: [
      "hookFrame",
      "mechanismFrame",
      "proofFrame",
      "lottieFrame",
      "ctaResidueFrame",
      "visualReferences",
      "negativeReferences",
      "humanStyleframeApproval",
    ],
  },
  "scene-behavior.md": {
    title: "Scene Behavior Packet",
    type: "scene-behavior",
    fields: [
      "durationSeconds",
      "frameRanges",
      "objectStates",
      "proofBirthTiming",
      "labelAttachRules",
      "lottieTiming",
      "ctaResidue",
      "reviewFrames",
    ],
  },
  "human-review-document.md": {
    title: "Human Review Document",
    type: "human-review-document",
    fields: [
      "executiveSummary",
      "evidenceTable",
      "routeCards",
      "assetBoard",
      "styleframeTargets",
      "decisionBox",
      "machineReadableAppendix",
    ],
  },
  "codex-readiness-handoff.md": {
    title: "Codex Readiness And Handoff",
    type: "codex-readiness-handoff",
    fields: [
      "readinessStatus",
      "blockedBy",
      "humanApprovals",
      "selectedRoute",
      "sourceLocks",
      "frameRanges",
      "allowedPackages",
      "forbiddenPatterns",
      "filesAllowedToModify",
      "validationCommands",
      "renderPermissions",
    ],
  },
  "post-spike-review.md": {
    title: "Post Spike Review Packet",
    type: "post-spike-review",
    fields: [
      "contactSheet",
      "hookReview",
      "chartReview",
      "eventReview",
      "proofBirthReview",
      "lottieQA",
      "ctaResidueReview",
      "failureDiagnosis",
      "nextDecision",
    ],
  },
};

const sampleBrief = {
  briefId: "phase6a-family-bc-pilot-readiness-fixture",
  familyTarget: "family-bc-hybrid",
  sourceMode: "manager-kit",
  title: "Source chart shows a proof-critical finance mechanism",
  sourceBoundary:
    "Fixture only. It proves the hardened Workspace Agent blocks Codex until human route, source, asset, Lottie, styleframe, and review approvals exist.",
  approvedClaims: [
    {
      id: "claim-001",
      claim: "A source-locked chart relationship must drive the proof.",
      value: "fixture chart relationship",
      source: "Phase 6A dry-run fixture",
      confidenceTier: "fixture-only",
      visualAttachment: "Proof label born after animated chart event",
    },
  ],
  requestedDurationSeconds: 42,
  requiredBenchmarkFamilies: ["family-b", "family-c"],
  lottieMotionNeeds: ["route pulse", "chart accent", "CTA residue pulse"],
};

const manifest = {
  name: "invesense-workspace-agent",
  displayName: "Invesense Workspace Agent",
  phase: "phase-2-workspace-agent-workflow",
  hardenedForPhase: "phase-6a-workspace-agent-hardening",
  version: "0.6.0",
  consolidationMode: "consolidated-chains",
  disclosureMode: "progressive-references",
  sourceOfTruth: "repo-native Phase 6A hardened Workspace Agent pack",
  nonApprovalBoundary:
    "No production reel implementation starts in Phase 6A. This pack creates review-only planning outputs until human gates pass.",
  skills: skillIds.map((id) => ({
    id,
    title: skillDefinitions[id].title,
    sourceOldSystemStrategy: "consolidated rewrite with Phase 6A hardening",
  })),
  references: Object.keys(references),
  templates: Object.keys(templates),
  examples: ["family-bc-sample-brief.json"],
};

const codexPluginJson = {
  name: "invesense-workspace-agent",
  version: "0.6.0",
  description:
    "Creative-director Workspace Agent for Invesense Family B/C finance reels with source proof, animated chart/SVG planning, Lottie discipline, styleframe gates, and blocked Codex handoffs.",
  author: {
    name: "Invesense",
  },
  repository: "https://github.com/malhiss/remotion-invesense",
  license: "UNLICENSED",
  keywords: ["remotion", "finance", "workspace-agent", "lottie", "charts"],
  skills: "./skills/",
  interface: {
    displayName: "Invesense Workspace Agent",
    shortDescription: "Creative-director workflow for source-grounded Family B/C reels.",
    longDescription:
      "Plans premium Invesense Family B/C finance reels before Codex implementation: source locks, chart/SVG proof, benchmark grounding, Lottie as support motion, styleframe gates, review QA, and Codex handoff blocking.",
    developerName: "Invesense",
    category: "Productivity",
    capabilities: ["Workflow", "Write"],
    defaultPrompt: [
      "Create route options for this Invesense insight.",
      "Audit this source chart for a Family B/C reel.",
      "Prepare a Codex handoff only if gates pass.",
    ],
    brandColor: "#0A7A4B",
  },
};

const legacyAgentPluginJson = {
  name: "invesense-workspace-agent",
  display_name: "Invesense Workspace Agent",
  description:
    "Legacy metadata for the hardened creative-director workflow. Canonical Codex import uses .codex-plugin/plugin.json.",
  version: "0.6.0",
  type: "agent",
  entrypoint: "instructions.md",
};

const instructions = `# Invesense Workspace Agent Instructions

Workspace Agent proposes; human approves; Codex implements.

## Role

You are the creative director for Invesense Remotion reels. You do source intake, evidence audit, mechanism diagnosis, benchmark grounding, route ideation, asset and Lottie planning, styleframe direction, human review packaging, and Codex readiness gating.

## House Benchmark

Family B/C is primary: light editorial, chart/source proof, direct labels, logo/icon actors, clean CTA residue, and proof born from visible events.

Family A is secondary motion-energy only: borrow asset energy, pacing, and event clarity when it strengthens Family B/C.

## Anti-Failure Rules

- No abstract shape-only diagrams.
- No dashboard/card drift.
- No source-free proof labels.
- No static pasted charts when animated SVG or native chart proof is required.
- No Lottie as hero metaphor or standalone proof.
- No Codex route invention.

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

## Codex Boundary

Codex remains implementation-only. Codex receives only a human-approved handoff with source locks, selected route, approved assets/Lottie, approved styleframes, scene behavior, review frames, allowed packages, and render permissions.

No production reel implementation starts in Phase 2.
No production reel implementation starts in Phase 6A.
`;

const readme = `# Invesense Workspace Agent

This is the Phase 6A hardened Workspace Agent package.

It keeps the 13 consolidated workflow skills while adding progressive references, decision-ready templates, current Codex plugin metadata, Family B/C benchmark rules, animated chart/SVG proof planning, Lottie discipline, styleframe gates, review QA, and blocked Codex handoff validation.

Use the package as a creative-director agent. Do not use it to implement Remotion code directly.
`;

const synthesis = `# Phase 6A Synthesis

The old v2 agent had valuable depth but too many tiny skills. Phase 6A keeps the new 13-skill workflow and restores the useful operating depth as progressive references and stronger templates.

The hardened agent is intentionally not a template generator. It is a gatekeeping creative director for source-grounded Family B/C reels.
`;

const buildSkillMarkdown = (id, definition) => `---
name: ${id}
description: ${definition.description}
---

# ${definition.title}

Workspace Agent proposes; human approves; Codex implements. Family B/C is primary, Family A is secondary motion-energy only, and Codex remains implementation-only.

## Purpose

${definition.purpose}

## When To Use

${definition.when.map((item) => `- ${item}`).join("\n")}

## Inputs

${definition.inputs.map((item) => `- ${item}`).join("\n")}

## Required Inputs

${definition.inputs.map((item) => `- ${item}`).join("\n")}

## Outputs

${definition.outputs.map((item) => `- ${item}`).join("\n")}

## Required Outputs

${definition.outputs.map((item) => `- ${item}`).join("\n")}

## Process

${definition.process.map((item, index) => `${index + 1}. ${item}`).join("\n")}

## Stop Conditions

${definition.stop.map((item) => `- ${item}`).join("\n")}
- Stop if the work drifts toward abstract shape-only diagrams, dashboard/card drift, source-free claims, or labels carrying the whole meaning.

## Human Gates

- This skill cannot approve implementation.
- Human approval is required for route selection, source claims, chart proof, asset/Lottie usage, styleframes, Codex readiness, and render permissions.
- Codex remains implementation-only and must not choose route, analogy, claims, numbers, visual style, or Lottie assets.

## Guardrails

- Family B/C is the primary benchmark; Family A is secondary motion-energy only.
- Lottie cannot become the hero metaphor.
- Chart/SVG proof must remain source-grounded and animated when proof-critical.
- Codex remains implementation-only.

## References To Load

${definition.references.map((item) => `- ${item}`).join("\n")}

## Done When

- The packet can be reviewed by a human without granting implementation approval.
- The next exact human decision is explicit.
- The output blocks Codex if source proof, chart proof, route approval, assets, styleframes, scene behavior, or review frames are incomplete.
`;

const buildTemplateMarkdown = (template) => `# ${template.title}

Packet type: \`${template.type}\`

## Purpose

Create a decision-ready Workspace Agent packet for Family B/C-first Remotion reel planning. Codex must not execute from this packet unless the Codex readiness handoff explicitly allows it.

## Output fields

${template.fields.map((field) => `- \`${field}\``).join("\n")}

## Human approval

- Required approval owner: project human.
- Approval status: pending, approved, revision requested, or blocked.
- Approval record must include date, approved route/scope, and unresolved risks.

## Stop conditions

- Stop if source proof, chart fidelity, asset/Lottie approval, styleframe targets, scene behavior, review frames, or Codex readiness are missing.
- Stop if the packet permits abstract shape-only diagrams, dashboard/card drift, static pasted charts as final proof, Lottie as hero metaphor, or Codex creative invention.

## Codex boundary

Codex receives this packet as context only. It becomes executable only when the codex-readiness-handoff packet says \`readinessStatus: approved\`, \`executable: true\`, and render permissions are explicit.
`;

const ensureDir = (dirPath) => fs.mkdirSync(dirPath, { recursive: true });

const writeText = (relativePath, content) => {
  const fullPath = path.join(projectRoot, relativePath);
  ensureDir(path.dirname(fullPath));
  fs.writeFileSync(fullPath, content);
};

const writeJson = (relativePath, data) => {
  writeText(relativePath, `${JSON.stringify(data, null, 2)}\n`);
};

const writePack = (root) => {
  writeText(`${root}/README.md`, readme);
  writeText(`${root}/instructions.md`, instructions);
  writeJson(`${root}/manifest.json`, manifest);
  writeText(`${root}/knowledge/phase2-synthesis.md`, synthesis);
  writeJson(
    `${root}/knowledge/old-system-audit-register.json`,
    JSON.parse(fs.readFileSync(path.join(projectRoot, "workspace-agent/knowledge/old-system-audit-register.json"), "utf8")),
  );
  writeJson(`${root}/examples/family-bc-sample-brief.json`, sampleBrief);

  for (const [fileName, content] of Object.entries(references)) {
    writeText(`${root}/references/${fileName}`, content);
  }

  for (const skillId of skillIds) {
    writeText(`${root}/skills/${skillId}/SKILL.md`, buildSkillMarkdown(skillId, skillDefinitions[skillId]));
  }

  for (const [fileName, template] of Object.entries(templates)) {
    writeText(`${root}/templates/${fileName}`, buildTemplateMarkdown(template));
  }
};

writePack("workspace-agent");
writePack(packageRoot);
writeJson(`${packageRoot}/.codex-plugin/plugin.json`, codexPluginJson);
writeJson(`${packageRoot}/.agent-plugin/plugin.json`, legacyAgentPluginJson);

console.log(
  `Generated Phase 6A hardened Workspace Agent pack with ${skillIds.length} skills, ${Object.keys(references).length} references, and ${Object.keys(templates).length} templates.`,
);
