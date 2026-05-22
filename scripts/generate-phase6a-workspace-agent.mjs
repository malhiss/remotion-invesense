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
  "phase6a2-old-v2-depth-audit.md": `# Phase 6A.2 Old V2 Depth Audit

The old v2 Workspace Agent had useful depth distributed across 63 micro-skills and more than 80 knowledge files. Phase 6A.2 does not restore that sprawl. It rewrites the useful intelligence into compact knowledge files and keeps the 13 consolidated skills.

Depth recovered in this package:

- Benchmark moment cards from reference-video deconstruction.
- Continuous motion and object permanence from scene handoff guidance.
- Analogy scoring, analogy failure modes, and high-wow low-clarity rejection.
- Online visual research, search playbook, citation, source hierarchy, and copy-risk notes.
- Brandbook, manual reel lessons, label budget, typography, and strict chart rules.
- Remotion capability governance, pseudo-3D before true 3D, and package gates.
- Format duration, retention pacing, muted readability, and variant strategy.
- Prompt failure diagnosis, visual causality checks, and old component inventory as concept-only evidence.

The audit rule is simple: preserve operating intelligence, discard old visual code and old implementation patterns. If a future package seems minimal again, run the Phase 6A audit and check whether these recovery topics are still represented.
`,
  "phase6a2-forward-test-prompts.md": `# Phase 6A.2 Forward Test Prompts

The Workspace Agent should be tested against likely pilot prompts before production implementation starts. These prompts are review-only and Codex-blocked.

Forward-test prompt families:

- Source-chart-heavy Family B: source SVG or insight chart must become source-locked animated chart proof.
- Logo/asset-heavy Family C: logos and institutional icons must behave as mechanism actors, not badges.
- Lottie-assisted support motion: Lottie is searched by role, licensed, approved, and fallback-planned.
- Failed-output diagnosis: weak diagrams, dashboard drift, detached proof plates, and text-only explanations must be diagnosed before patching.

Each forward test must output source proof status, route options or failure diagnosis, asset/Lottie planning, styleframe requirement, review frames, and a blocked Codex handoff. Passing a forward test does not authorize implementation; it proves the agent can protect the workflow.
`,
};

const knowledge = {
  "family-bc-benchmark-grammar.md": `# Family B/C Benchmark Grammar

Family B/C is primary. This is the house benchmark for Invesense reels: light editorial backgrounds, source charts, clean labels, logo/icon actors, mobile-readable typography, and proof born from visible motion. Family A is secondary motion-energy only. Borrow its pacing, asset confidence, and impact timing only when those qualities strengthen the Family B/C reel without turning it into a dark cinematic abstraction.

The reel should feel like a creator-grade finance story, not a slide deck. The viewer should understand the mechanism before reading every label. Charts, logos, icons, and proof marks should behave as objects in the world of the reel. A chart line can become terrain. A benchmark can become a barrier. A logo can become an actor. A proof label can lock only after the chart or object event creates it.

Family B/C defaults:

- White, warm-white, or light editorial background.
- Black, navy, gray, green, red, or blue text accents with strong mobile contrast.
- Source chart proof, direct labels, and real chart units when proof-critical.
- Logos and icons that move with cause, route, selection, rejection, or settlement logic.
- CTA residue that inherits an event object: line, marker, underline, stamp, route, bracket, or proof mark.

Anti-failure rules:

- No abstract shape-only diagrams.
- No dashboard/card drift.
- No generic SaaS UI panels.
- No Canva/deck pacing.
- No detached proof plates.
- No labels carrying the whole meaning.
- No source-free numbers.

Use this knowledge before route planning, benchmark deconstruction, styleframe direction, and brand/silent review. If a concept cannot pass Family B/C grammar, it must be revised before Codex receives any handoff.
`,
  "source-proof-operating-system.md": `# Source Proof Operating System

Source proof comes before metaphor. The Workspace Agent must inventory claims, numbers, charts, tables, source labels, units, dates, caveats, and source notes before creative routing. Every claim in a reel should be either source-locked, explicitly marked as context, or excluded.

Source locks are the contract that keeps the reel from becoming a stylish but untrustworthy animation. A source lock records the exact claim, exact number, source label, unit, time period, visual attachment, confidence tier, and whether external research is allowed to support context without changing the approved claim.

Proof hierarchy:

- Headline proof: the number or chart relationship the reel is about.
- Visual proof: the chart, table, SVG, screenshot, or source asset that can become motion.
- Supporting proof: context that helps explain the mechanism.
- Off-screen proof: source material that informs the script but should not be visualized.
- Unusable proof: unreadable, unsupported, unapproved, or conflicting material.

What cannot be claimed:

- Numbers that are not in approved source material.
- Reworded claims that change time period, denominator, ranking, or caveat.
- External research that replaces the manager-approved insight.
- Proof labels that appear before the event that creates them.

The source steward blocks route planning when critical proof is missing. It also blocks Codex handoff when source labels, chart units, dates, or values are unlocked. If the source has a chart, the chart-proof director decides whether it is faithful reconstruction, adapted proof, reference-only, or do-not-use.

The operating sentence is: source truth first, mechanism second, motion third. Visual metaphor may clarify the source; it cannot overwrite it.
`,
  "chart-svg-animation-playbook.md": `# Chart SVG Animation Playbook

Proof-critical SVG charts should become animated Remotion charts, not static pasted images. The original SVG is source evidence and review reference; the final reel should use native Remotion/SVG reconstruction when chart relationships carry the claim.

A proof-critical SVG chart is one where the viewer must trust the values, ranking, scale, dates, units, or source note. In that case, Codex should parse or manually receive source-locked chart data, reconstruct the chart with Remotion primitives, and animate the chart relationship. The chart cannot be wallpaper.

Supported first-pass chart roles:

- Horizontal bars: staggered bar growth, value labels after reveal, highlight marker, source note.
- Grouped bars: group-by-group reveal, benchmark marker, comparison label born after reveal.
- Stacked bars: stack segment growth, total marker, composition proof.
- Line/area charts: trace reveal, endpoint proof, benchmark line, source note.

Animation rules:

- Preserve rank order, labels, values, dates, units, and source note.
- Preserve relative scale relationships unless human approves an editorial transformation.
- Attach proof labels to the bar, line, marker, bracket, or endpoint event.
- Do not show a static pasted SVG as final proof when animated Remotion chart proof is required.
- If extraction confidence is low, block Codex until the human approves manual extraction or supplies a source-locked data table.

Review requirements:

- Original SVG/reference frame.
- Animated reconstruction frame.
- Proof-event frame.
- CTA residue frame.

Use this knowledge when the market insight supplies an SVG, chart screenshot, table, or graph. It protects against the old failure where charts became decorative panels instead of source-born proof.
`,
  "lottie-asset-operating-system.md": `# Lottie Asset Operating System

Lottie is an asset source and motion layer. Lottie is not the hero metaphor. This means the Workspace Agent should absolutely search LottieFiles and similar sources for useful animated assets, but it should select them by role in the story rather than letting a generic premade animation become the story.

Good Lottie roles:

- Route pulse through a payment, data, or settlement rail.
- Highlight sweep over a chart event.
- Proof burst after a stamp, latch, endpoint, or selection.
- Checkmark, warning mark, rejected path, or approved path.
- Loader, subtle icon, money transfer accent, data flow accent, CTA pulse.

Bad Lottie roles:

- Generic money animation as the entire reel.
- Premade chart animation replacing source-locked chart reconstruction.
- Decorative confetti unrelated to proof.
- Standalone proof with no source event.
- Remote browser-scraped animation required during render.

Every Lottie candidate needs a motion role, source URL or local path, license note, approved usage, human approval, and native Remotion fallback. The fallback matters because Remotion can recreate many simple pulses, sweeps, bursts, arrows, and icons natively if the Lottie flickers, fails, has licensing risk, or adds clutter.

Workspace Agent owns Lottie discovery, role fit, license/source notes, and approval. Codex owns deterministic ingestion only after approval: local JSON or direct JSON URL, manifest entry, staticFile usage, and Lottie QA frames for entry, peak, and exit.

The decision sentence is: use Lottie heavily where it improves motion texture or asset clarity, but never outsource the reel's core financial mechanism to a generic Lottie asset.
`,
  "mechanism-analogy-wow-atlas.md": `# Mechanism Analogy Wow Atlas

The route should show the financial mechanism, not decorate a finance keyword. Start with the mechanism: force, constraint, state change, and proof consequence. Then choose objects that make that mechanism visible.

Route sentence pattern: object does X to constraint Y, causing proof Z.

Mechanism mappings:

- Support/resistance: floor catch, floor crack, barrier hold, barrier breach.
- Screening/filtering: scanner contact, reject deflection, sieve pass, aperture narrowing.
- Liquidity/flows: route rail, pipe bottleneck, tank fill, drain mark, endpoint settlement.
- Spread/compression: caliper gap, clamp compression, bracket expansion, dual-rail tension.
- Tokenization/access: vault unlock, token unfold, access bridge, eligibility mint.
- Settlement/certification: ledger stamp, proof latch, route endpoint, stamped readout.
- Fee/inflation drag: leak, siphon, friction pad, erosion line.
- Ranking/comparison: strict bars, podium, measured objects, source labels.

Wow events are useful only when they clarify the mechanism. Strong events include line bend and snap, gate open, scanner reject, route endpoint, bracket spread, vault unlock, proof latch, stamp contact, bar reveal, endpoint marker, and CTA underline inheritance.

Proof birth patterns:

- Endpoint label appears after endpoint settles.
- Bracket proof appears after gap opens.
- Stamped readout appears after stamp contact.
- Selected path proof appears after route completion.
- Chart marker proof appears after chart event.

Residue patterns:

- Broken line remains.
- Route trail remains.
- Scanner aperture remains.
- Caliper remains open.
- Proof underline becomes CTA residue.

If the route needs labels to explain everything, it fails the no-label test. If the final frame could be swapped onto another reel, it lacks residue.
`,
  "styleframe-and-asset-board-rules.md": `# Styleframe And Asset Board Rules

The old failure was asking Codex to invent premium visual taste from prose. Phase 6A prevents that by requiring visual targets before complex implementation. A complex Family B/C reel needs an asset board and styleframes before Codex gets a handoff.

Asset board requirements:

- Hero asset: the object or chart element that carries the mechanism.
- Proof object: the marker, label, bracket, endpoint, stamp, line, or bar that proves the claim.
- Residue object: what remains in the CTA close.
- Logo/icon actors: companies, institutions, products, or mechanisms that behave rather than decorate.
- Source charts: SVGs, screenshots, or data tables with proof role.
- Lottie candidates: support accents with role, license, approval, and fallback.
- Negative references: dashboard/card drift, abstract diagrams, weak old outputs, or copy-risk examples.

Styleframe requirements:

- Hook frame: mobile-readable promise and visual world.
- Mechanism frame: object behavior setup.
- Proof frame: event-born proof, not pasted proof.
- Lottie frame: accent role and clutter check.
- CTA residue frame: inherited line, marker, route, stamp, bracket, or object.

Visual references can teach form, material, layout, behavior, pacing, or negative avoidance. They do not become source truth, and they cannot justify copying a creator shell. The human approves route and styleframes before Codex implements.

If styleframes are missing for a complex reel, Codex remains blocked. If the asset board has no hero asset or no proof object, the route must be revised.
`,
  "codex-handoff-and-stop-gates.md": `# Codex Handoff And Stop Gates

Codex remains implementation-only. Codex cannot choose the route, analogy, claims, numbers, source labels, visual style, Lottie assets, chart interpretation, or render approval. The Workspace Agent creates the packet stack; the human approves it; Codex executes the approved Remotion implementation.

Codex handoff is blocked until these gates pass:

- Source locks approved.
- Chart/SVG proof role approved.
- Human route approval recorded.
- Asset and Lottie approvals recorded.
- Styleframe targets approved.
- Scene behavior packet complete.
- Review frame manifest complete.
- Remotion feasibility map complete.
- Render permissions explicit.

Valid Codex handoff includes:

- Selected route and simple physical sentence.
- Exact source claims, values, units, source notes, and labels.
- Frame ranges and scene behavior.
- Approved source charts and extracted data when needed.
- Asset board and Lottie manifest instructions.
- Styleframe targets and negative references.
- Allowed packages and forbidden patterns.
- Required validation and review commands.

Codex must stop if it would need to invent missing claims, infer values, choose a metaphor, select assets, browse Lottie without approval, paste proof cards, use remote assets at render time, or render final MP4 without approval.

The handoff rule is intentionally strict because passing TypeScript is not visual quality. Still frames and contact sheets come before draft MP4, and final MP4 stays blocked until explicit final approval.
`,
  "review-qa-gates.md": `# Review QA Gates

Review artifacts are production safety rails. They prevent the team from repeating the old pattern where technically valid Remotion renders looked like weak diagrams.

Required review frames and frame roles:

- Hook: mobile-readable entry, safe-zone check, Family B/C fit.
- Chart: source chart or native reconstruction proof check.
- Event: visible mechanism behavior before labels explain it.
- Proof: proof label born after the event.
- Lottie: entry, peak, exit, color, flicker, timing, and clutter QA.
- CTA residue: final frame inherits event residue instead of becoming a generic card.

Benchmark comparison:

- Use Family B/C atlas entries as primary reference.
- Use Family A only for motion energy and event clarity.
- Record what to adapt and what not to copy.

Source-chart comparison:

- Original reference frame.
- Animated reconstruction frame.
- Proof-event frame.
- CTA-residue frame.

Safe-zone QA:

- 1080x1920 mobile margins.
- Text and source-note readability.
- Watermark and CTA placement.
- No critical proof hidden by platform UI.

Final render gate:

- Stills before MP4.
- Contact sheet before draft.
- Source proof review before draft.
- Final MP4 blocked without explicit approval.

If a contact sheet fails, diagnose the failure source: route, source proof, styleframe, asset, Lottie, chart, motion, label budget, or Codex execution. Do not patch endlessly without naming the failure.
`,
  "benchmark-moment-card-system.md": `# Benchmark Moment Card System

Benchmark moment cards are the bridge between watching a reference and creating a usable Family B/C route. The old agent did this as scattered reference-video deconstruction. Phase 6A.2 makes it explicit so the Workspace Agent does not merely say "premium finance reel" and then hand Codex vague taste words.

A moment card records a single memorable beat from a benchmark video. It is not a template and not a license to copy. It captures behavior logic: what object appears, what force acts on it, what changes, what proof appears, what residue remains, and what the viewer understands before reading every label.

Required moment card fields:

- Family classification: Family B or C primary, Family A motion-energy only, or negative reference.
- Topic and proof role: what financial claim, chart, logo, route, or source object the moment supports.
- Asset behavior: what the visible object does, not just what it looks like.
- Motif and analogy: chart terrain, strict bars, logo actor, route rail, scanner, vault, caliper, stamp, latch, or residue close.
- Wow event: impact, reveal, selection, rejection, stamp, breach, unlock, route completion, proof latch, or chart extraction.
- Proof operator: endpoint label, bar value, bracket, source label, chart marker, selected path, fill mark, stamped readout, or CTA underline.
- No-label lesson: what the viewer understands if all labels are hidden for two seconds.
- Adaptation note: what behavior can inspire the Invesense reel.
- What not to copy: layout shell, exact timing, creator brand, source claims, typography, or proprietary composition.
- Copy-risk note: low, medium, high, or blocked.

Use moment cards before route selection. A route that has no moment-card equivalent often becomes prose animation, dashboard cards, or abstract geometry. A good route can point to at least one moment card for chart proof, one for asset behavior, and one for CTA residue.

Family B/C moment cards should favor light editorial chart proof, strict values, clean source labels, and logo/icon actors. Family A moment cards can be used for motion confidence only: impact timing, asset energy, or transition clarity. Family A cannot become the visual style default.

Moment cards also protect against overfitting. The Workspace Agent should extract the behavioral principle, then rewrite it in Invesense voice. If the proposed styleframe could be mistaken for the benchmark creator's exact reel, the copy-risk gate blocks Codex.
`,
  "continuous-motion-and-object-permanence.md": `# Continuous Motion And Object Permanence

The old v2 agent learned that reels fail when scenes feel like disconnected slides. Phase 6A.2 restores the continuous-motion system: the viewer should be able to follow the same proof object or residue object from hook to close.

Object permanence means the hero asset keeps identity across beats. A bar can become a proof marker. A line can become a barrier, then a crack, then a CTA underline. A logo can travel a route, arrive at a settlement endpoint, and leave a route trail. A source chart marker can become the final proof residue. The point is not to animate everything continuously; the point is to preserve cause, identity, and consequence.

Continuous motion spine:

- Hook object: the first memorable object or chart element the viewer sees.
- Setup state: the object is placed in a source-true world with chart, logo, route, or constraint.
- Constraint contact: the object meets a line, bar, gate, scanner, bracket, endpoint, or source threshold.
- Event: the visible state changes through impact, reveal, selection, rejection, unlock, stamp, or extraction.
- Proof birth: the number or claim appears only after the event creates it.
- Residue: the changed object remains as CTA memory.

Scene handoff rules:

- Do not cut to a new panel when the same object can transform.
- Do not reset the chart world without carrying a marker, route, source label, or proof residue forward.
- Do not let labels replace object motion. Labels confirm the event after the event is readable.
- Preserve directionality: money flows, routes travel, bars grow, markers lock, stamps press, gates open, rejected objects deflect.
- Use transitions as consequence, not decoration.

Object permanence is especially important for 30-60 second reels. The longer format needs a clear motion spine so the viewer feels progression rather than a sequence of cards. If the route has five beats but no continuing object, the Workspace Agent must revise the scene behavior packet before Codex can implement it.
`,
  "analogy-scoring-and-failure-modes.md": `# Analogy Scoring And Failure Modes

The Workspace Agent should produce route options, not a single invented solution. Phase 6A.2 restores the analogy scorecard so high-wow ideas do not sneak through when they are low-clarity, source-weak, or impossible to review.

Score every route on these dimensions:

- Source fit: the route preserves exact claims, values, units, dates, source labels, and chart meaning.
- Mechanism clarity: force, constraint, state change, and proof consequence are visible before labels.
- Family B/C fit: light editorial proof, chart/source grounding, logo/icon actors, and mobile readability.
- Wow asset event: there is one memorable event that clarifies the mechanism.
- Proof birth: proof appears from event contact, extraction, endpoint, bracket, stamp, latch, or chart marker.
- Residue strength: the final CTA inherits an object from the event.
- Implementation feasibility: Remotion can build it deterministically with approved packages and assets.
- Copy-risk: references inspire behavior without copying layout, claims, or creator identity.

Common analogy failure modes:

- High-wow low-clarity: exciting motion but no financial mechanism.
- Keyword metaphor: AI equals chips, sukuk equals mosque, tokenization equals coins, without mechanism.
- Chart wallpaper: source chart sits behind labels but does not create proof.
- Proof plate paste: a number appears as a card unrelated to the event.
- Label dependency: the route fails the no-label test.
- Dashboard drift: cards, panels, metrics, and generic SaaS UI become the visual world.
- Abstract shape-only diagram: circles, lines, particles, and geometry move without a recognizable financial object.
- Analogy collapse: the object behavior implies the wrong financial relationship.
- Scale distortion: chart animation exaggerates or reverses a source relationship.
- Asset mismatch: Lottie, logo, icon, or 3D object is decorative rather than causal.

Reject routes that score high on novelty but low on mechanism clarity or source fit. The Workspace Agent should recommend, but human route approval still selects. Codex must never repair a bad analogy by adding labels; the route returns to planning.
`,
  "visual-reference-search-and-copy-risk.md": `# Visual Reference Search And Copy Risk

Visual research is useful only when it is disciplined. The old v2 agent had online search playbooks, citation rules, and copy-risk notes; Phase 6A.2 keeps those as compact operating knowledge.

Search by visual role, not vague style words. Instead of searching "premium finance video", search for "white background animated bar chart reel", "logo route animation", "financial chart callout social reel", "animated checkmark route pulse Lottie", "source chart line marker reveal", or "editorial finance CTA underline".

Reference categories:

- Source: factual evidence, source chart, source screenshot, manager kit, transcript, table, or article.
- Benchmark: Family B/C or Family A video behavior to deconstruct.
- Visual inspiration: material, type, layout, rhythm, transition, or object behavior.
- Asset source: Lottie, icon, logo, SVG, chart, map, photo, or UI capture.
- Negative reference: old failed output, dashboard drift, abstract diagram, or copy-risk example.

Citation and source hierarchy:

- Source claims outrank visual references.
- Manager-approved claims outrank external research.
- External research can supply context, visuals, definitions, or source links, but cannot replace locked claims.
- LottieFiles, icon libraries, and inspiration posts need source URL, license note, approved usage, and fallback.
- If a chart, table, or value is used as proof, it must enter the evidence packet, not the inspiration board.

Copy-risk notes:

- Low: behavior principle only, no copied layout or source claim.
- Medium: similar composition or object behavior; needs redesigned styleframe.
- High: recognizable creator shell, brand language, or exact visual sequence; requires rejection or major redesign.
- Blocked: copied claim, chart, source, watermark, licensed asset without permission, or direct recreation of a creator piece.

The Workspace Agent should make references actionable: what to adapt, what not to copy, why it fits Family B/C, how it supports source proof, and what Codex must not infer from it.
`,
  "brandbook-manual-reel-and-label-rules.md": `# Brandbook Manual Reel And Label Rules

The earliest manual reel workflow was closer to Family B/C than many later Remotion experiments: light background, strict bars, big-number hook, full-bleed chart proof, values on bars, and a simple CTA. Phase 6A.2 preserves those lessons without turning them into a repeatable template.

Invesense taste defaults:

- Light editorial canvas: white, warm-white, soft gray, or source-chart clean.
- Finance seriousness: restrained palette, confident spacing, minimal ornament, no toy-like UI.
- Strong mobile contrast: black/navy text, Invesense green for confirmation, red/orange for risk, blue/gray for institutional context.
- Typography that reads in a feed: large hooks, short proof labels, source notes smaller but legible.
- Material intent: chart lines, bars, paper, stamp, route, institutional objects, and source visuals should feel precise and intentional.

Manual reel lessons:

- Strict bars are measured objects, not progress bars.
- Values belong on or near bars when values are the proof.
- Full-bleed or dominant chart proof is allowed when it is source-critical.
- CTA should inherit the chart marker, underline, route, bracket, stamp, or proof object.
- Clean is not enough; the reel still needs a visual event.

Label budget:

- Hook: one sharp idea, not a paragraph.
- Mechanism labels: short and attached to the object they describe.
- Proof labels: appear only after proof birth.
- Source note: small, stable, readable, and faithful.
- CTA: short, specific, and connected to residue.

Failures to reject:

- Floating proof cards.
- Explainer paragraphs.
- Labels that move independently of their object.
- Generic rounded cards and dashboard panels.
- Pretty but meaningless chart loops.
- Text that covers chart proof or platform-safe zones.

The brandbook is a taste guardrail, not a design cage. Each reel still needs a custom route and asset board.
`,
  "remotion-3d-and-capability-governance.md": `# Remotion 3D And Capability Governance

Remotion is powerful because it can combine deterministic React animation, native SVG charts, paths, transitions, media, captions, Lottie, and optional 3D. Phase 6A.2 restores capability governance so we use Remotion deeply without chasing packages for spectacle.

Capability mapping:

- Native SVG and CSS transforms: chart proof, strict bars, callouts, routes, labels, object motion.
- Remotion paths and shapes: line reveals, brackets, arrows, masks, chart markers, residue underlines.
- Transitions and motion blur: consequence transitions, not generic scene wipes.
- Lottie: approved support motion, route pulses, checkmarks, highlights, proof bursts, CTA pulses.
- Captions and text systems: muted readability and hook/proof hierarchy.
- Media utilities: source footage, screenshots, frame extraction, and review tooling.
- Three/3D: only when an approved styleframe proves 3D clarifies the mechanism.

3D governance:

- Prefer pseudo-3D first: shadows, perspective, layered SVG, parallax, scale, rotation, and lighting cues.
- Use true 3D only for mechanisms that need depth: vaults, coins, token stacks, rotating institutional objects, map landmarks, or physical machinery.
- Add 3D packages only after route approval, styleframe approval, and Remotion feasibility approval.
- 3D cannot be used to make a weak route feel expensive.
- 3D must remain deterministic, reviewable through stills/contact sheets, and source-safe.

Package gates:

- Allowed capabilities must be named in the Codex handoff.
- Remote render-time dependencies are blocked.
- Randomness must be deterministic.
- Lottie must be local or direct-approved JSON before render.
- Final MP4 remains blocked until review frames pass.

Capability governance keeps the project from repeating old drift: impressive technical features with weak visual causality.
`,
  "motion-pacing-format-and-variant-rules.md": `# Motion Pacing Format And Variant Rules

Most Invesense reels target 30-60 seconds. The old short-spike mindset encouraged underdeveloped proof events; Phase 6A.2 restores format duration and retention pacing rules so the Workspace Agent plans enough time for hook, setup, event, proof, and residue.

Default 30-60 second pacing:

- 0-3 seconds: hook object and sharp claim entry.
- 3-10 seconds: source/chart world and mechanism setup.
- 10-22 seconds: object behavior, route, chart reveal, or constraint contact.
- 22-35 seconds: wow event and proof birth.
- 35-50 seconds: implication, secondary proof, logo/icon actor, or Lottie-supported accent beat.
- Final 2-4 seconds: CTA residue hold.

Retention principles:

- Every beat should answer "what changed?"
- Motion should create curiosity before a label resolves it.
- Use visual escalation: setup, pressure, contact, event, proof, residue.
- Muted readability is mandatory; voiceover cannot be the only explanation.
- Do not overcut source charts; let proof breathe.

Variant strategy:

- Variants can change hook wording, proof emphasis, CTA, or reference frame.
- Variants cannot change source numbers, mechanism, chart interpretation, or approved route without review.
- A variant should preserve the same proof birth and residue object unless the human approves a new route.
- Family B and Family C variants can share source proof but differ in chart emphasis versus logo/asset emphasis.

Format rules protect against two old failures: rushing from text concept to code, and turning every output into the same reusable template. The workflow is repeatable; the visual route is not.
`,
  "failure-diagnosis-and-legacy-component-inventory.md": `# Failure Diagnosis And Legacy Component Inventory

Old visual code is not migrated. Old components, labs, geometry locks, renders, and dashboards are concept-only evidence. They tell us what failed and which proof operators might still be useful when rewritten.

Codex failure patterns to diagnose:

- Abstract shape-only diagrams.
- Pale dashboard/card shells.
- Labels carrying the whole meaning.
- Weak hero asset or no hero asset.
- Proof pasted as a detached plate.
- Chart proof used as wallpaper.
- Lottie or icon decoration with no causal role.
- Scene cuts that break object permanence.
- Final end card masquerading as residue.
- Passing lint/build while failing visual quality.

Visual causality checks:

- Did contact cause rejection, selection, break, stamp, unlock, route completion, or proof birth?
- Did red/green state change happen only after contact?
- Did the proof label appear after the event?
- Is the final CTA residue physically inherited from the event?
- Can the viewer understand the mechanism before reading all labels?

Legacy component inventory as concept-only evidence:

- Scanner/filter concepts can survive, but old scanner visuals cannot.
- Spread/bracket/caliper concepts can survive, but old pale rails cannot.
- Spillway/turbine/capex concepts can survive, but old wheel/card scenes cannot.
- Strict bar chart discipline can survive, but old progress-bar look cannot.
- Source evidence and proof locks survive, but old handoff prose cannot replace visual targets.

Prompt failure diagnosis:

- If Codex produced a diagram, the handoff lacked asset/styleframe specificity or route causality.
- If Codex produced a dashboard, the Family B/C grammar and negative references were too weak.
- If Codex pasted proof, the proof-birth operator was missing.
- If Codex invented numbers, source locks failed.
- If Codex used generic Lottie, the asset role and license approval were missing.

The post-spike reviewer should name the failure source before asking Codex to patch. Sometimes the correct fix is not another implementation pass; it is route, styleframe, or source-proof revision.
`,
};

const skillKnowledgeMap = {
  "source-and-evidence-steward": [
    "source-proof-operating-system.md",
    "visual-reference-search-and-copy-risk.md",
    "brandbook-manual-reel-and-label-rules.md",
  ],
  "chart-proof-director": [
    "chart-svg-animation-playbook.md",
    "source-proof-operating-system.md",
    "brandbook-manual-reel-and-label-rules.md",
    "remotion-3d-and-capability-governance.md",
  ],
  "mechanism-story-diagnostician": [
    "mechanism-analogy-wow-atlas.md",
    "analogy-scoring-and-failure-modes.md",
    "continuous-motion-and-object-permanence.md",
  ],
  "benchmark-reference-deconstructor": [
    "family-bc-benchmark-grammar.md",
    "benchmark-moment-card-system.md",
    "visual-reference-search-and-copy-risk.md",
    "analogy-scoring-and-failure-modes.md",
  ],
  "route-analogy-miner": [
    "mechanism-analogy-wow-atlas.md",
    "benchmark-moment-card-system.md",
    "analogy-scoring-and-failure-modes.md",
    "motion-pacing-format-and-variant-rules.md",
  ],
  "asset-lottie-planner": [
    "lottie-asset-operating-system.md",
    "visual-reference-search-and-copy-risk.md",
    "styleframe-and-asset-board-rules.md",
    "failure-diagnosis-and-legacy-component-inventory.md",
  ],
  "styleframe-visual-target-director": [
    "styleframe-and-asset-board-rules.md",
    "brandbook-manual-reel-and-label-rules.md",
    "visual-reference-search-and-copy-risk.md",
    "failure-diagnosis-and-legacy-component-inventory.md",
  ],
  "scene-motion-proof-birth-planner": [
    "continuous-motion-and-object-permanence.md",
    "motion-pacing-format-and-variant-rules.md",
    "mechanism-analogy-wow-atlas.md",
    "failure-diagnosis-and-legacy-component-inventory.md",
  ],
  "brand-label-silent-reviewer": [
    "family-bc-benchmark-grammar.md",
    "brandbook-manual-reel-and-label-rules.md",
    "motion-pacing-format-and-variant-rules.md",
    "review-qa-gates.md",
  ],
  "remotion-feasibility-gatekeeper": [
    "remotion-3d-and-capability-governance.md",
    "chart-svg-animation-playbook.md",
    "lottie-asset-operating-system.md",
    "codex-handoff-and-stop-gates.md",
  ],
  "human-review-packager": [
    "review-qa-gates.md",
    "benchmark-moment-card-system.md",
    "visual-reference-search-and-copy-risk.md",
    "brandbook-manual-reel-and-label-rules.md",
  ],
  "codex-readiness-handoff-gatekeeper": [
    "codex-handoff-and-stop-gates.md",
    "remotion-3d-and-capability-governance.md",
    "failure-diagnosis-and-legacy-component-inventory.md",
    "source-proof-operating-system.md",
  ],
  "post-spike-reviewer": [
    "failure-diagnosis-and-legacy-component-inventory.md",
    "review-qa-gates.md",
    "continuous-motion-and-object-permanence.md",
    "benchmark-moment-card-system.md",
  ],
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

const blockedCodexHandoff = {
  readinessStatus: "blocked",
  executable: false,
  blockedBy: [
    "human source and route approval missing",
    "styleframe targets not approved",
    "asset and Lottie approvals missing",
    "review frames not approved",
  ],
};

const phase6a2ForwardFixtures = {
  "phase6a2-source-chart-heavy-family-b.json": {
    fixtureId: "phase6a2-source-chart-heavy-family-b",
    reviewOnly: true,
    productionImplementationAllowed: false,
    familyTarget: "family-b",
    promptType: "source-chart-heavy",
    expectedAgentBehavior:
      "Audit the supplied insight SVG, source-lock values and labels, produce animated chart proof options, require source-chart comparison frames, and keep Codex blocked.",
    requiredKnowledge: [
      "chart-svg-animation-playbook.md",
      "brandbook-manual-reel-and-label-rules.md",
      "benchmark-moment-card-system.md",
    ],
    codexHandoff: blockedCodexHandoff,
  },
  "phase6a2-logo-asset-heavy-family-c.json": {
    fixtureId: "phase6a2-logo-asset-heavy-family-c",
    reviewOnly: true,
    productionImplementationAllowed: false,
    familyTarget: "family-c",
    promptType: "logo-asset-heavy",
    expectedAgentBehavior:
      "Treat logos and institutional icons as mechanism actors, separate source proof from visual references, require an asset board and styleframes, and keep Codex blocked.",
    requiredKnowledge: [
      "styleframe-and-asset-board-rules.md",
      "visual-reference-search-and-copy-risk.md",
      "continuous-motion-and-object-permanence.md",
    ],
    codexHandoff: blockedCodexHandoff,
  },
  "phase6a2-lottie-support-motion.json": {
    fixtureId: "phase6a2-lottie-support-motion",
    reviewOnly: true,
    productionImplementationAllowed: false,
    familyTarget: "family-bc",
    promptType: "lottie-support-motion",
    expectedAgentBehavior:
      "Search Lottie by motion role, require URL/license/approved usage/native fallback, reject Lottie as hero metaphor, and keep Codex blocked.",
    requiredKnowledge: [
      "lottie-asset-operating-system.md",
      "visual-reference-search-and-copy-risk.md",
      "remotion-3d-and-capability-governance.md",
    ],
    codexHandoff: blockedCodexHandoff,
  },
  "phase6a2-failed-output-diagnosis.json": {
    fixtureId: "phase6a2-failed-output-diagnosis",
    reviewOnly: true,
    productionImplementationAllowed: false,
    familyTarget: "family-bc",
    promptType: "failed-output-diagnosis",
    expectedAgentBehavior:
      "Classify weak output as source, route, styleframe, asset, chart, Lottie, motion, label, visual causality, or Codex execution failure before patching.",
    requiredKnowledge: [
      "failure-diagnosis-and-legacy-component-inventory.md",
      "continuous-motion-and-object-permanence.md",
      "review-qa-gates.md",
    ],
    codexHandoff: blockedCodexHandoff,
  },
};

const manifest = {
  name: "invesense-workspace-agent",
  displayName: "Invesense Workspace Agent",
  phase: "phase-2-workspace-agent-workflow",
  hardenedForPhase: "phase-6a-2-depth-audit",
  version: "0.6.2",
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
  knowledge: Object.keys(knowledge),
  references: Object.keys(references),
  templates: Object.keys(templates),
  examples: ["family-bc-sample-brief.json", ...Object.keys(phase6a2ForwardFixtures)],
};

const codexPluginJson = {
  name: "invesense-workspace-agent",
  version: "0.6.2",
  description:
    "Creative-director Workspace Agent for Invesense Family B/C finance reels with source proof, animated chart/SVG planning, Lottie discipline, old-v2 depth backfill, styleframe gates, and blocked Codex handoffs.",
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
  version: "0.6.2",
  type: "agent",
  entrypoint: "instructions.md",
};

const instructions = `# Invesense Workspace Agent Instructions

Workspace Agent proposes; human approves; Codex implements.

## Role

You are the creative director for Invesense Remotion reels. You do source intake, evidence audit, mechanism diagnosis, benchmark grounding, route ideation, asset and Lottie planning, styleframe direction, human review packaging, and Codex readiness gating.

Start from \`knowledge/\` as the visible operating brain. Load \`references/\` only when deeper guidance is needed.

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
Phase 6A.2 is the final depth audit before import: use moment cards, continuous motion, analogy scoring, visual research/copy-risk, brand/manual reel rules, capability governance, pacing, and failure diagnosis before any Phase 6B pilot.
`;

const readme = `# Invesense Workspace Agent

This is the Phase 6A.2 hardened Workspace Agent package.

It keeps the 13 consolidated workflow skills while adding import-visible knowledge, final old-v2 depth backfill, progressive references, decision-ready templates, current Codex plugin metadata, Family B/C benchmark rules, animated chart/SVG proof planning, Lottie discipline, styleframe gates, review QA, and blocked Codex handoff validation.

Start with \`knowledge/\` for the canonical operating brain. Use \`references/\` for deeper progressive-disclosure support.

Use the package as a creative-director agent. Do not use it to implement Remotion code directly.
`;

const synthesis = `# Phase 6A.2 Synthesis

The old v2 agent had valuable depth but too many tiny skills. Phase 6A keeps the new 13-skill workflow and restores the useful operating depth as progressive references and stronger templates.

Phase 6A.1 made the agent brain visible under knowledge/ so imported Workspace Agents and humans can discover the operating system immediately.

Phase 6A.2 adds the final depth backfill from the old v2 audit: benchmark moment cards, continuous motion, object permanence, analogy scoring, visual search and copy-risk, brandbook/manual reel rules, 3D governance, retention pacing, variant rules, visual causality, prompt failure diagnosis, and legacy component inventory as concept-only evidence.

The hardened agent is intentionally not a template generator. It is a gatekeeping creative director for source-grounded Family B/C reels.
`;

const buildSkillMarkdown = (id, definition) => {
  const knowledgeToLoad = skillKnowledgeMap[id] ?? Object.keys(knowledge);

  return `---
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

Load canonical knowledge first:

${knowledgeToLoad.map((item) => `- knowledge/${item}`).join("\n")}

Then load deeper references as needed:

${definition.references.map((item) => `- ${item}`).join("\n")}

## Done When

- The packet can be reviewed by a human without granting implementation approval.
- The next exact human decision is explicit.
- The output blocks Codex if source proof, chart proof, route approval, assets, styleframes, scene behavior, or review frames are incomplete.
`;
};

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
  for (const [fileName, content] of Object.entries(knowledge)) {
    writeText(`${root}/knowledge/${fileName}`, content);
  }
  writeJson(`${root}/examples/family-bc-sample-brief.json`, sampleBrief);
  for (const [fileName, fixture] of Object.entries(phase6a2ForwardFixtures)) {
    writeJson(`${root}/examples/${fileName}`, fixture);
  }

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
  `Generated Phase 6A.2 hardened Workspace Agent pack with ${skillIds.length} skills, ${Object.keys(knowledge).length} knowledge files, ${Object.keys(references).length} references, and ${Object.keys(templates).length} templates.`,
);
