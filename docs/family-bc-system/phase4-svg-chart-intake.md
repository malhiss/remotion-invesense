# Phase 4 Add-On: SVG Insight Chart Intake

Phase 4 adds a source-chart lane before the first approved pilot. It exists because market-insight SVG charts are often source evidence and should become animated Remotion charts, not static pasted images.

Workspace Agent audits and approves the chart meaning first. It decides whether the SVG belongs in the reel, checks the insight/source context, confirms what the chart proves, and blocks the handoff if the source claim is not locked.

Codex parses, reconstructs, animates, and reviews the approved SVG chart mechanically. Codex may not invent labels, values, chart meaning, source notes, or the proof claim. Codex may reject low-confidence extraction and request a source-locked table or manual chart packet.

## Supported V1 Chart Families

- `horizontal-bar`: Matplotlib-style horizontal bar charts with recoverable category comments, value comments, and rectangle-like bar geometry.
- `grouped-vertical-bar`: grouped bars with year/category comments, legend comments, and recoverable bar geometry. Exact values may require Workspace Agent source locks if they are not printed in the SVG.
- `stacked-vertical-bar`: stacked bars with total labels, legend comments, a benchmark or proof line, and recoverable segment geometry.
- `line-chart`: source path reconstruction where the SVG contains the line path and endpoint proof label. Full data tables are still required when exact annual values matter.

## Source Proof Rules

- Original SVGs are source evidence and visual references, not the final chart layer.
- Final reel charts should be native Remotion/SVG reconstruction when extraction confidence is high enough.
- Static SVG fallback is allowed only in review tooling, not as a final production chart.
- Proof labels cannot appear before the bar, line, stack, marker, or benchmark event creates them.
- If comments conflict with the approved source packet, Workspace Agent source locks win.

## CLI Lane

- `npm run svg:chart-audit -- --file <svg>` reads an SVG and emits a deterministic audit report without modifying files.
- `npm run svg:chart-ingest -- --file <svg> --id <id> --approved-by <name> --source-context <context>` copies approved charts into `public/source-charts/` and updates the manifest.
- `npm run phase4:svg-review` dry-runs the planned original/reference, animated reconstruction, proof-event, and CTA-residue review frames.
- `npm run phase4:validate` closes this add-on only if the source-chart lane remains non-production and static SVG pasting is blocked.

## Workspace Agent And Codex Boundary

Workspace Agent owns chart approval, source interpretation, proof role, no-label story, and whether the chart should be animated at all. Codex owns deterministic extraction, native chart reconstruction, frame-based animation, still/contact-sheet review setup, and validation.

This add-on does not start a production reel. It prepares Phase 5 so the first approved pilot can use source-faithful animated charts without repeating the old mistake of either pasting static proof cards or inventing generic chart UI.

