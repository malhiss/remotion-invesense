const args = new Set(process.argv.slice(2));

if (args.has("--final-render")) {
  throw new Error("Phase 4 SVG review cannot render final MP4s.");
}

const reviewManifest = {
  phase: "Phase 4 Add-On: SVG Insight Chart Intake",
  mode: "dry-run",
  purpose:
    "Plan source-chart comparison frames before any future pilot implementation uses an animated SVG reconstruction.",
  reviewFrames: [
    {
      role: "original-svg-reference",
      frame: 0,
      purpose: "Show the supplied market-insight SVG as source evidence and visual reference.",
    },
    {
      role: "animated-reconstruction",
      frame: 90,
      purpose: "Review the native Remotion chart reconstruction before the proof event.",
    },
    {
      role: "proof-event",
      frame: 150,
      purpose: "Confirm the proof label is born only after the bar, line, stack, or marker event creates it.",
    },
    {
      role: "cta-residue",
      frame: 210,
      purpose: "Confirm the final CTA inherits the chart marker or proof object instead of becoming an end card.",
    },
  ],
  stillsAllowed: true,
  contactSheetAllowed: true,
  finalMp4RenderAllowed: false,
  productionReelStarted: false,
  rule:
    "Phase 4 SVG review is dry-run infrastructure. Future execution may render stills/contact sheets only; final MP4 remains blocked.",
};

console.log("---PHASE4_SVG_REVIEW_JSON_START---");
console.log(JSON.stringify(reviewManifest, null, 2));
console.log("---PHASE4_SVG_REVIEW_JSON_END---");

