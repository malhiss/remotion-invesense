import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const projectRoot = process.cwd();

const read = (filePath) =>
  fs.readFileSync(path.join(projectRoot, filePath), "utf8");

test("root registers a vertical schema-driven calibration reel", () => {
  const root = read("src/Root.tsx");

  assert.match(root, /id="InvesenseCalibrationReel"/);
  assert.match(root, /width=\{1080\}/);
  assert.match(root, /height=\{1920\}/);
  assert.match(root, /fps=\{30\}/);
  assert.match(root, /schema=\{ReelHandoffSchema\}/);
  assert.match(root, /defaultProps=\{calibrationHandoff\}/);
});

test("fresh production contract defines the required handoff model", () => {
  const contract = read("src/contracts/reel-contract.ts");

  for (const exportName of [
    "SourceClaimSchema",
    "SceneBeatSchema",
    "AssetSpecSchema",
    "StyleframeTargetSchema",
    "ReelHandoffSchema",
    "RenderGateSchema",
  ]) {
    assert.match(contract, new RegExp(`export const ${exportName}`));
  }

  for (const fieldName of [
    "proofBirthFrame",
    "residueFrame",
    "humanGates",
    "forbiddenPatterns",
    "noLabelTest",
  ]) {
    assert.match(contract, new RegExp(fieldName));
  }
});

test("event primitives exist without dashboard vocabulary", () => {
  const primitives = read("src/components/reel-primitives.tsx");

  for (const exportName of [
    "HeroObject",
    "PhysicalConstraint",
    "ImpactEvent",
    "ProofBirth",
    "ResidueFrame",
    "KineticCaption",
    "LogoActor",
    "ChartAsObject",
  ]) {
    assert.match(primitives, new RegExp(`export const ${exportName}`));
  }

  assert.doesNotMatch(primitives, /Dashboard|Panel|Card/);
});

test("calibration handoff encodes event-born proof and residue", () => {
  const handoff = read("src/data/calibration-handoff.ts");

  assert.match(handoff, /routeApproval: "calibration-only"/);
  assert.match(handoff, /proofBirthFrame/);
  assert.match(handoff, /residueFrame/);
  assert.match(handoff, /impact/);
  assert.match(handoff, /residue/);
  assert.match(handoff, /SourceClaim/);
});

test("package exposes tests and approved Remotion capability packages", () => {
  const packageJson = JSON.parse(read("package.json"));

  assert.equal(packageJson.scripts.test, "node --test tests/*.test.mjs");

  for (const dependencyName of [
    "zod",
    "@remotion/zod-types",
    "@remotion/fonts",
    "@remotion/google-fonts",
    "@remotion/media",
    "@remotion/media-utils",
    "@remotion/captions",
    "@remotion/transitions",
    "@remotion/light-leaks",
    "@remotion/motion-blur",
    "@remotion/noise",
    "@remotion/shapes",
    "@remotion/paths",
    "@remotion/layout-utils",
    "@remotion/sfx",
    "@remotion/preload",
  ]) {
    assert.ok(
      packageJson.dependencies[dependencyName],
      `${dependencyName} should be installed`,
    );
  }
});

test("review utilities require stills and contact sheets before final render", () => {
  const utility = read("scripts/review-reel.mjs");
  const checklist = read("docs/visual-qa-checklist.md");

  assert.match(utility, /"30,90,148,280"/);
  assert.match(utility, /stillFrames/);
  assert.match(utility, /contactSheet/);
  assert.match(utility, /finalRenderApproval/);
  assert.match(utility, /hstack/);
  assert.match(utility, /"-update"/);
  assert.doesNotMatch(utility, /frame-%04d/);
  assert.match(utility, /process\.execPath/);
  assert.match(utility, /@remotion/);
  assert.match(utility, /result\.error/);
  assert.match(checklist, /no-label test/i);
  assert.match(checklist, /proof birth/i);
  assert.match(checklist, /residue frame/i);
});
