import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {test} from 'node:test';

const repoRoot = process.cwd();

const read = (relativePath) => readFileSync(join(repoRoot, relativePath), 'utf8');

const runNpm = (script, args = [], env = {}) => {
  return spawnSync('cmd.exe', ['/c', 'npm.cmd', 'run', script, '--', ...args], {
    cwd: repoRoot,
    encoding: 'utf8',
    env: {...process.env, ...env},
  });
};

const parseMarkedJson = (stdout, marker) => {
  const start = `---${marker}_JSON_START---`;
  const end = `---${marker}_JSON_END---`;
  const startIndex = stdout.indexOf(start);
  const endIndex = stdout.indexOf(end);

  assert.notEqual(startIndex, -1, `Missing ${start} marker in:\n${stdout}`);
  assert.notEqual(endIndex, -1, `Missing ${end} marker in:\n${stdout}`);

  return JSON.parse(stdout.slice(startIndex + start.length, endIndex).trim());
};

test('Phase 5 review contracts define benchmark, source-chart, safe-zone, Lottie QA, and render gates', () => {
  const contract = read('src/contracts/phase5-review-qa-contract.ts');

  for (const exportName of [
    'Phase5ReviewFrameRoleSchema',
    'BenchmarkComparisonReferenceSchema',
    'SourceChartComparisonReferenceSchema',
    'SafeZoneQAResultSchema',
    'LottieQAFrameSchema',
    'Phase5RenderGateSchema',
    'Phase5ReviewManifestSchema',
  ]) {
    assert.match(contract, new RegExp(`export const ${exportName}`));
  }

  assert.match(contract, /finalMp4RenderAllowed:\s*z\.literal\(false\)/);
  assert.match(contract, /productionReelStarted:\s*z\.literal\(false\)/);
});

test('review-reel emits marked dry-run JSON with frame roles, comparisons, and final render blocking', () => {
  const result = runNpm('review', [
    '--composition',
    'FamilyBCVisualSystemCalibration',
    '--frame-set',
    'phase5-review',
    '--benchmark-comparison',
    'batch-02-money-moved-33-trillion-on-blockchains-last-year-more-than-visa-and-mast-4c6c4958',
    '--source-chart-comparison',
    'chart_01_sector_breakdown',
    '--lottie-qa',
    'phase3-approved-pulse',
  ]);

  assert.equal(result.status, 0, result.stderr);
  const manifest = parseMarkedJson(result.stdout, 'REVIEW_REEL');

  assert.equal(manifest.mode, 'dry-run');
  assert.equal(manifest.composition, 'FamilyBCVisualSystemCalibration');
  assert.equal(manifest.frameSet, 'phase5-review');
  assert.deepEqual(manifest.reviewFrames.map((frame) => frame.role), [
    'hook',
    'chart',
    'event',
    'proof',
    'lottie',
    'cta-residue',
  ]);
  assert.equal(manifest.stackMode, 'vstack');
  assert.equal(manifest.benchmarkComparison.atlasId, 'batch-02-money-moved-33-trillion-on-blockchains-last-year-more-than-visa-and-mast-4c6c4958');
  assert.match(manifest.benchmarkComparison.contactSheetPath, /contact\.jpg$/);
  assert.equal(manifest.sourceChartComparison.chartId, 'chart_01_sector_breakdown');
  assert.equal(manifest.sourceChartComparison.reviewOnly, true);
  assert.equal(manifest.lottieQA.assetId, 'phase3-approved-pulse');
  assert.deepEqual(manifest.lottieQA.frames.map((frame) => frame.role), ['entry', 'peak', 'exit']);
  assert.equal(manifest.finalRenderApproval, false);
  assert.equal(manifest.finalMp4RenderAllowed, false);
});

test('review-reel blocks final render unless explicit approval is present even in dry-run mode', () => {
  const blocked = runNpm('review', ['--final-render']);
  assert.notEqual(blocked.status, 0);
  assert.match(blocked.stderr + blocked.stdout, /FINAL_RENDER_APPROVAL=true/);

  const approvedButStillReviewOnly = runNpm('review', ['--final-render'], {
    FINAL_RENDER_APPROVAL: 'true',
  });
  assert.equal(approvedButStillReviewOnly.status, 0, approvedButStillReviewOnly.stderr);
  const manifest = parseMarkedJson(approvedButStillReviewOnly.stdout, 'REVIEW_REEL');
  assert.equal(manifest.finalRenderApproval, true);
  assert.equal(manifest.finalMp4RenderAllowed, false);
});

test('Phase 5 review dry-run outputs full QA artifacts and keeps production blocked', () => {
  const result = runNpm('phase5:review');
  assert.equal(result.status, 0, result.stderr);
  const manifest = parseMarkedJson(result.stdout, 'PHASE5_REVIEW');

  assert.equal(manifest.phase, 'Phase 5: Review + QA Tooling');
  assert.equal(manifest.mode, 'dry-run');
  assert.equal(manifest.productionReelStarted, false);
  assert.equal(manifest.finalMp4RenderAllowed, false);
  assert.equal(manifest.safeZoneQA.format.width, 1080);
  assert.equal(manifest.safeZoneQA.format.height, 1920);
  assert.equal(manifest.safeZoneQA.results.every((result) => result.status === 'planned'), true);
  assert.ok(manifest.benchmarkComparison.contactSheetPath);
  assert.equal(manifest.sourceChartComparison.reviewFrames.length, 4);
  assert.equal(manifest.lottieQA.reviewQuestions.length, 4);
});

test('Phase 5 validator and ledger close QA tooling and move pilot handoff to Phase 6', () => {
  const result = runNpm('phase5:validate');
  assert.equal(result.status, 0, result.stderr);
  const validation = parseMarkedJson(result.stdout, 'PHASE5_VALIDATE');

  assert.equal(validation.phase5ReviewQA.closed, true);
  assert.equal(validation.boundaries.productionReelStarted, false);
  assert.equal(validation.boundaries.finalMp4RenderAllowed, false);
  assert.equal(validation.next, 'Phase 6: First Approved Pilot Handoff');

  const ledger = read('docs/phase-ledger.md');
  assert.match(ledger, /Phase 5: Review \+ QA Tooling/);
  assert.match(ledger, /Status: closed/);
  assert.match(ledger, /Phase 6: First Approved Pilot Handoff/);
});

