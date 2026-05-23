import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const repoRoot = process.cwd();

const read = (relativePath) => readFileSync(join(repoRoot, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));

const runNpm = (script, args = [], env = {}) =>
  spawnSync("cmd.exe", ["/c", "npm.cmd", "run", script, "--", ...args], {
    cwd: repoRoot,
    encoding: "utf8",
    env: { ...process.env, ...env },
  });

const parseMarkedJson = (stdout, marker) => {
  const start = `---${marker}_JSON_START---`;
  const end = `---${marker}_JSON_END---`;
  const startIndex = stdout.indexOf(start);
  const endIndex = stdout.indexOf(end);

  assert.notEqual(startIndex, -1, `Missing ${start} marker in:\n${stdout}`);
  assert.notEqual(endIndex, -1, `Missing ${end} marker in:\n${stdout}`);

  return JSON.parse(stdout.slice(startIndex + start.length, endIndex).trim());
};

test("Phase 6B Sukuk assets are ingested as approved stills-only inputs", () => {
  const lottieManifest = readJson("public/lottie/manifest.json");
  const sourceChartManifest = readJson("public/source-charts/manifest.json");

  const dataFlow = lottieManifest.assets.find((asset) => asset.id === "phase6b-data-flow-rail-pulse");
  assert.ok(dataFlow, "Data Flow Lottie must be approved in the manifest.");
  assert.equal(dataFlow.sourceUrl, "https://lottiefiles.com/free-animation/data-flow-XwZ4VYbgwT");
  assert.equal(dataFlow.approvedUsage, "data-transfer");
  assert.equal(dataFlow.scenePlacement, "Setup and pressure beats, clipped to the source-linked issuance rail.");
  assert.equal(dataFlow.metaphorRole, "Subtle rail/data-flow pulse only; not the threshold mechanism or proof.");
  assert.equal(dataFlow.approvedByHuman, true);
  assert.match(dataFlow.fallbackNativeRemotionOption, /native/i);
  assert.ok(existsSync(join(repoRoot, "public", dataFlow.localPath)));

  const chartIds = sourceChartManifest.charts.map((chart) => chart.id);
  assert.ok(chartIds.includes("phase6b-global-sukuk-issuance"));
  assert.ok(chartIds.includes("phase6b-issuance-by-region-reference"));
  assert.ok(chartIds.includes("phase6b-sukuk-vs-global-agg-reference"));

  const globalChart = sourceChartManifest.charts.find((chart) => chart.id === "phase6b-global-sukuk-issuance");
  assert.equal(globalChart.audit.chartType, "line-chart");
  assert.equal(globalChart.audit.line.headlineValue, "$150.5B");
  assert.equal(globalChart.finalStaticSvgAllowed, false);
});

test("Phase 6B Sukuk Threshold Rail composition is registered as stills-only", () => {
  const root = read("src/Root.tsx");
  const composition = read("src/compositions/SukukThresholdRailStills.tsx");
  const handoff = read("src/data/phase6b-sukuk-stills-handoff.ts");

  assert.match(root, /id="SukukThresholdRailStills"/);
  assert.match(root, /durationInFrames=\{phase6bSukukStillsHandoff\.format\.durationInFrames\}/);
  assert.match(handoff, /durationInFrames:\s*1440/);
  assert.match(handoff, /executionScope:\s*"stills-contact-sheet-source-chart-comparison-only"/);
  assert.match(handoff, /draftMp4Allowed:\s*false/);
  assert.match(handoff, /finalMp4Allowed:\s*false/);
  assert.match(composition, /ApprovedLottie/);
  assert.match(composition, /phase6b-data-flow-rail-pulse/);
  assert.match(composition, /\$1T\+/);
  assert.match(composition, /staticSvgAsFinalChartAllowed:\s*false/);
  assert.doesNotMatch(composition, /<Img\b/);
});

test("Phase 6B review frame set emits the approved stills/contact-sheet plan", () => {
  const result = runNpm("review", [
    "--composition",
    "SukukThresholdRailStills",
    "--frame-set",
    "phase6b-sukuk-stills",
    "--source-chart-comparison",
    "phase6b-global-sukuk-issuance",
    "--lottie-qa",
    "phase6b-data-flow-rail-pulse",
  ]);

  assert.equal(result.status, 0, result.stderr);
  const manifest = parseMarkedJson(result.stdout, "REVIEW_REEL");

  assert.equal(manifest.mode, "dry-run");
  assert.equal(manifest.composition, "SukukThresholdRailStills");
  assert.equal(manifest.frameSet, "phase6b-sukuk-stills");
  assert.equal(manifest.stackMode, "vstack");
  assert.deepEqual(manifest.reviewFrames.map((frame) => frame.role), [
    "hook",
    "chart-reconstruction",
    "rail-data-flow",
    "threshold-event",
    "proof-birth",
    "lottie-qa",
    "cta-residue",
    "source-chart-comparison",
  ]);
  assert.deepEqual(manifest.reviewFrames.map((frame) => frame.frame), [
    45,
    240,
    420,
    720,
    840,
    735,
    1320,
    240,
  ]);
  assert.equal(manifest.sourceChartComparison.chartId, "phase6b-global-sukuk-issuance");
  assert.equal(manifest.lottieQA.assetId, "phase6b-data-flow-rail-pulse");
  assert.equal(manifest.productionReelStarted, false);
  assert.equal(manifest.finalMp4RenderAllowed, false);
});

test("Phase 6B stills-only scope keeps draft and final MP4 blocked", () => {
  const packageJson = readJson("package.json");
  assert.equal(packageJson.scripts["phase6b:review"], "node scripts/run-phase6b-review.mjs");
  assert.equal(packageJson.scripts["phase6b:validate"], "node scripts/phase6b-validate.mjs");
  assert.equal(packageJson.scripts["phase6b:render"], undefined);

  const blocked = runNpm("review", ["--composition", "SukukThresholdRailStills", "--final-render"]);
  assert.notEqual(blocked.status, 0);
  assert.match(blocked.stderr + blocked.stdout, /FINAL_RENDER_APPROVAL=true/);
});
