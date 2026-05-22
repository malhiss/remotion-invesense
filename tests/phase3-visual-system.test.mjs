import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const projectRoot = process.cwd();

const read = (filePath) =>
  fs.readFileSync(path.join(projectRoot, filePath), "utf8");

const readJson = (filePath) => JSON.parse(read(filePath));

const exists = (filePath) => fs.existsSync(path.join(projectRoot, filePath));

const runNpmScript = (scriptName, extraArgs = []) => {
  const command = process.platform === "win32" ? "cmd.exe" : "npm";
  const args =
    process.platform === "win32"
      ? ["/c", "npm.cmd", "run", scriptName, "--", ...extraArgs]
      : ["run", scriptName, "--", ...extraArgs];

  return spawnSync(command, args, {
    cwd: projectRoot,
    encoding: "utf8",
    shell: false,
  });
};

const parseMarkedJson = (stdout, marker) => {
  const expression = new RegExp(
    `---${marker}_START---\\s*([\\s\\S]+?)\\s*---${marker}_END---`,
    "u",
  );
  const match = stdout.match(expression);

  assert.ok(match, `Missing ${marker} markers in output:\n${stdout}`);
  return JSON.parse(match[1]);
};

test("Phase 3 adds a visual-system contract and non-production calibration fixture", () => {
  const contract = read("src/contracts/family-bc-visual-system-contract.ts");
  const fixture = read("src/data/family-bc-visual-system-calibration.ts");

  for (const exportName of [
    "FamilyBCVisualTokensSchema",
    "ChartNativeSpecSchema",
    "LogoIconActorSpecSchema",
    "LottieAcquisitionRequestSchema",
    "ApprovedLottieManifestEntrySchema",
    "ReviewFrameManifestSchema",
    "FamilyBCVisualSystemCalibrationSchema",
  ]) {
    assert.match(contract, new RegExp(`export const ${exportName}`));
  }

  assert.match(contract, /calibration-only/);
  assert.match(contract, /remoteUrlAllowed:\s*z\.literal\(false\)/);
  assert.match(fixture, /family-bc-visual-system-calibration/);
  assert.match(fixture, /readinessStatus:\s*"calibration-only"/);
  assert.match(fixture, /productionImplementationAllowed:\s*false/);
});

test("Phase 3 visual modules are split by Family B/C responsibility", () => {
  const moduleFiles = [
    "src/components/family-bc/tokens.ts",
    "src/components/family-bc/stage.tsx",
    "src/components/family-bc/typography.tsx",
    "src/components/family-bc/charts.tsx",
    "src/components/family-bc/actors.tsx",
    "src/components/family-bc/lottie.tsx",
    "src/components/family-bc/cta.tsx",
    "src/components/family-bc/review.ts",
    "src/components/family-bc/index.ts",
  ];

  for (const filePath of moduleFiles) {
    assert.ok(exists(filePath), `${filePath} should exist`);
  }

  const charts = read("src/components/family-bc/charts.tsx");
  for (const exportName of [
    "StrictBarSeries",
    "LineTraceChart",
    "CandlestickMiniChart",
    "SupportResistanceEventLine",
    "ChartMarkerCallout",
    "ProofReadoutFromEvent",
  ]) {
    assert.match(charts, new RegExp(`export const ${exportName}`));
  }
  assert.match(charts, /proofBirthFrame/);
  assert.doesNotMatch(charts, /progress\s*bar/i);

  const actors = read("src/components/family-bc/actors.tsx");
  for (const exportName of [
    "LogoActor",
    "ActorRail",
    "InstitutionalIcon",
    "DocumentStampObject",
    "PaymentDataRoute",
  ]) {
    assert.match(actors, new RegExp(`export const ${exportName}`));
  }
});

test("Approved Lottie rendering is local, manifest-backed, and deterministic", () => {
  const lottie = read("src/components/family-bc/lottie.tsx");
  const manifest = readJson("public/lottie/manifest.json");

  assert.match(lottie, /export const ApprovedLottie/);
  assert.match(lottie, /@remotion\/lottie/);
  assert.match(lottie, /staticFile\(/);
  assert.match(lottie, /delayRender\(/);
  assert.match(lottie, /continueRender\(/);
  assert.match(lottie, /cancelRender\(/);
  assert.doesNotMatch(lottie, /https:\/\/|http:\/\//);

  assert.ok(
    manifest.assets.some(
      (asset) =>
        asset.id === "phase3-approved-pulse" &&
        asset.approvedByHuman === true &&
        asset.nonProduction === true,
    ),
    "manifest should contain one approved non-production Phase 3 fixture asset",
  );
});

test("Lottie ingest rejects unapproved and invalid assets but dry-runs approved JSON", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "phase3-lottie-"));
  const validPath = path.join(tmpDir, "valid.json");
  const invalidPath = path.join(tmpDir, "invalid.json");

  fs.writeFileSync(
    validPath,
    JSON.stringify({
      v: "5.12.0",
      fr: 30,
      ip: 0,
      op: 30,
      w: 120,
      h: 120,
      layers: [],
    }),
  );
  fs.writeFileSync(invalidPath, JSON.stringify({ layers: [] }));

  const approved = runNpmScript("lottie:ingest", [
    "--dry-run",
    "--file",
    validPath,
    "--id",
    "dry-run-valid",
    "--source-url",
    "https://lottiefiles.com/free-animations/test",
    "--license-note",
    "Approved non-production fixture license note.",
    "--approved-usage",
    "route-pulse",
    "--approved-by",
    "phase-3-test",
    "--fallback",
    "Use native route pulse.",
  ]);
  assert.equal(approved.status, 0, approved.stderr || approved.stdout);

  const unapproved = runNpmScript("lottie:ingest", [
    "--dry-run",
    "--file",
    validPath,
    "--id",
    "dry-run-unapproved",
    "--source-url",
    "https://lottiefiles.com/free-animations/test",
    "--license-note",
    "Missing approval should fail.",
    "--approved-usage",
    "route-pulse",
    "--fallback",
    "Use native route pulse.",
  ]);
  assert.notEqual(unapproved.status, 0);
  assert.match(unapproved.stderr + unapproved.stdout, /approved-by/i);

  const invalid = runNpmScript("lottie:ingest", [
    "--dry-run",
    "--file",
    invalidPath,
    "--id",
    "dry-run-invalid",
    "--source-url",
    "https://lottiefiles.com/free-animations/test",
    "--license-note",
    "Invalid JSON should fail.",
    "--approved-usage",
    "route-pulse",
    "--approved-by",
    "phase-3-test",
    "--fallback",
    "Use native route pulse.",
  ]);
  assert.notEqual(invalid.status, 0);
  assert.match(invalid.stderr + invalid.stdout, /Invalid Lottie JSON/i);
});

test("Phase 3 calibration composition and review tooling remain non-production", () => {
  const root = read("src/Root.tsx");
  const composition = read("src/compositions/FamilyBCVisualSystemCalibration.tsx");
  const review = runNpmScript("phase3:review");

  assert.match(root, /id="FamilyBCVisualSystemCalibration"/);
  assert.match(root, /FamilyBCVisualSystemCalibrationSchema/);
  assert.match(composition, /LightEditorialStage/);
  assert.match(composition, /StrictBarSeries/);
  assert.match(composition, /SupportResistanceEventLine/);
  assert.match(composition, /LogoActor/);
  assert.match(composition, /ApprovedLottie/);
  assert.match(composition, /CTAResidueObject/);

  assert.equal(review.status, 0, review.stderr || review.stdout);
  const manifest = parseMarkedJson(review.stdout, "PHASE3_REVIEW_JSON");
  assert.equal(manifest.composition, "FamilyBCVisualSystemCalibration");
  assert.equal(manifest.productionImplementationAllowed, false);
  assert.equal(manifest.finalRenderApproval, false);
  assert.deepEqual(Object.keys(manifest.frames), [
    "hook",
    "chart",
    "event",
    "proof",
    "lottie",
    "ctaResidue",
  ]);
});

test("Phase 3 validator and ledger close the visual-system foundation only", () => {
  const result = runNpmScript("phase3:validate");
  const ledger = read("docs/phase-ledger.md");

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /Phase 3 validation passed/);
  assert.match(ledger, /Phase 3: Build The Family B\/C Visual System/);
  assert.match(ledger, /Status: closed/);
  assert.match(ledger, /Phase 4:/);
  assert.match(ledger, /No production reel implementation has started/i);
});
