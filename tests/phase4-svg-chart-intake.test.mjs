import assert from 'node:assert/strict';
import {execFileSync, spawnSync} from 'node:child_process';
import {mkdtempSync, readFileSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {test} from 'node:test';

const repoRoot = process.cwd();

const runNode = (script, args = [], options = {}) => {
  return spawnSync(process.execPath, [script, ...args], {
    cwd: repoRoot,
    encoding: 'utf8',
    ...options,
  });
};

const runNpm = (script, args = []) => {
  return spawnSync('cmd.exe', ['/c', 'npm.cmd', 'run', script, '--', ...args], {
    cwd: repoRoot,
    encoding: 'utf8',
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

const rectPath = (x, y, width, height, fill = '#75bee9') => {
  const x2 = x + width;
  const y2 = y + height;
  return `<path d="M ${x} ${y} L ${x2} ${y} L ${x2} ${y2} L ${x} ${y2} z" style="fill: ${fill}"/>`;
};

const simpleSvg = ({comments, body}) => `<?xml version="1.0" encoding="utf-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480" viewBox="0 0 640 480">
<metadata>Matplotlib v3.10</metadata>
${comments.map((comment) => `<!-- ${comment} -->`).join('\n')}
<g id="figure_1">
${body}
</g>
</svg>
`;

const writeFixture = (name, svg) => {
  const dir = mkdtempSync(join(tmpdir(), 'phase4-svg-'));
  const file = join(dir, name);
  writeFileSync(file, svg, 'utf8');
  return file;
};

const makeSectorBreakdownFixture = () => {
  const categories = [
    'Financials',
    'Materials',
    'Energy',
    'Communication Services',
    'Health Care',
    'Utilities',
    'Consumer Staples',
    'Industrials',
    'Real Estate',
    'Consumer Discretionary',
    'Information Technology',
  ];
  const values = ['40.5%', '15.1%', '12.6%', '7.2%', '4.3%', '4.1%', '3.7%', '3.6%', '3.5%', '3.4%', '1.6%'];
  const bars = values
    .map((value, index) => rectPath(140, 50 + index * 25, Number.parseFloat(value) * 7, 14))
    .join('\n');

  return writeFixture(
    'chart_01_sector_breakdown.svg',
    simpleSvg({
      comments: [
        '0%',
        '10%',
        '20%',
        '30%',
        '40%',
        '50%',
        '% of MSCI Saudi Arabia Index',
        ...categories,
        ...values,
        'What Saudi equity actually is.',
        'Sector weights - MSCI Saudi Arabia Index, May 2026',
        'Invesense Research  |  MSCI Inc. via iShares MSCI Saudi Arabia ETF  |  May 2026',
      ],
      body: bars,
    }),
  );
};

const makeRegionIssuanceFixture = () => {
  const years = Array.from({length: 10}, (_, index) => String(2016 + index));
  const series = ['GCC Bonds &amp; Sukuk', 'International Sukuk', 'Malaysian Ringgit Sukuk'];
  const fills = ['#475564', '#75bee9', '#59aa47'];
  const bars = years
    .flatMap((_, yearIndex) =>
      series.map((__, seriesIndex) =>
        rectPath(70 + yearIndex * 45 + seriesIndex * 11, 320 - (yearIndex + seriesIndex + 3) * 8, 9, (yearIndex + seriesIndex + 3) * 8, fills[seriesIndex]),
      ),
    )
    .join('\n');

  return writeFixture(
    'chart_02_issuance_by_region.svg',
    simpleSvg({
      comments: [
        ...years,
        '$0B',
        '$25B',
        '$50B',
        '$75B',
        '$100B',
        '$125B',
        '$150B',
        '$175B',
        'SUKUK ISSUANCE BY REGION',
        'GCC has overtaken Southeast Asia as the primary issuance engine',
        'Invesense Research  |  Bloomberg LEAG  |  April 2026',
        ...series,
      ],
      body: bars,
    }),
  );
};

const makeGlobalSukukFixture = () => {
  return writeFixture(
    'chart_01_global_sukuk_issuance.svg',
    simpleSvg({
      comments: [
        '2001',
        '2003',
        '2005',
        '2007',
        '2009',
        '2011',
        '2013',
        '2015',
        '2017',
        '2019',
        '2021',
        '2023',
        '2025',
        '$0B',
        '$20B',
        '$40B',
        '$60B',
        '$80B',
        '$100B',
        '$120B',
        '$140B',
        '$150.5B',
        '(2025)',
        'GLOBAL SUKUK ISSUANCE',
        'Annual syndicated issuance volume, 2001-2025',
        'Invesense Research  |  Bloomberg LEAG  |  April 2026',
      ],
      body: `<path d="M 70 350 L 110 330 L 150 300 L 190 280 L 230 260 L 270 210 L 310 180 L 350 170 L 390 130 L 430 90 L 470 70" style="fill: none; stroke: #75bee9; stroke-width: 2.5"/>
<path d="M 70 350 L 110 330 L 150 300 L 190 280 L 230 260 L 270 210 L 310 180 L 350 170 L 390 130 L 430 90 L 470 70 L 470 350 z" style="fill: #75bee9; fill-opacity: 0.3; stroke: #75bee9; stroke-opacity: 0.3"/>`,
    }),
  );
};

const makeHyperscalerFixture = () => {
  const years = Array.from({length: 10}, (_, index) => String(2018 + index));
  const totals = ['$64', '$69', '$92', '$124', '$150', '$140', '$217', '$357', '$500E', '$625E'];
  const series = ['Microsoft', 'Alphabet', 'Meta', 'Amazon', 'Consensus (E)'];
  const fills = ['#2f6fbb', '#75bee9', '#59aa47', '#f2b84b'];
  const stackedBars = years
    .flatMap((_, yearIndex) => {
      let cursorY = 340;
      return fills.map((fill, segmentIndex) => {
        const height = 8 + yearIndex * 2 + segmentIndex * 3;
        cursorY -= height;
        return rectPath(80 + yearIndex * 42, cursorY, 22, height, fill);
      });
    })
    .join('\n');

  return writeFixture(
    'chart_01_hyperscaler_capex_vs_telecom.svg',
    simpleSvg({
      comments: [
        ...years,
        '$0B',
        '$100B',
        '$200B',
        '$300B',
        '$400B',
        '$500B',
        '$600B',
        '$700B',
        'Annual capex (USD billions)',
        ...totals,
        'Telecom buildout peak (2000): $213B',
        ...series,
        'The biggest infrastructure cycle in modern history.',
        'Hyperscaler capex 2018-2027E vs the 1996-2001 telecom buildout peak',
        'Invesense Research  |  Company filings, Yahoo Finance, sell-side consensus  |  May 2026',
      ],
      body: `${stackedBars}
<path d="M 70 235 L 520 235" style="fill: none; stroke: #8a94a3; stroke-width: 1.8; stroke-dasharray: 4 4"/>`,
    }),
  );
};

test('Phase 4 SVG chart audit classifies the supplied chart families', () => {
  const sector = runNode('scripts/svg-chart-audit.mjs', ['--file', makeSectorBreakdownFixture()]);
  assert.equal(sector.status, 0, sector.stderr);
  const sectorAudit = parseMarkedJson(sector.stdout, 'SVG_CHART_AUDIT');
  assert.equal(sectorAudit.packetType, 'svg-chart-intake-packet');
  assert.equal(sectorAudit.chartType, 'horizontal-bar');
  assert.equal(sectorAudit.confidence, 'high');
  assert.equal(sectorAudit.title, 'Sector weights - MSCI Saudi Arabia Index, May 2026');
  assert.equal(sectorAudit.unit, '% of MSCI Saudi Arabia Index');
  assert.match(sectorAudit.sourceNote, /MSCI Inc/);
  assert.equal(sectorAudit.categories.length, 11);
  assert.equal(sectorAudit.values.length, 11);
  assert.equal(sectorAudit.bars.length, 11);
  assert.deepEqual(sectorAudit.values.slice(0, 3).map((value) => value.label), ['40.5%', '15.1%', '12.6%']);

  const region = runNode('scripts/svg-chart-audit.mjs', ['--file', makeRegionIssuanceFixture()]);
  assert.equal(region.status, 0, region.stderr);
  const regionAudit = parseMarkedJson(region.stdout, 'SVG_CHART_AUDIT');
  assert.equal(regionAudit.chartType, 'grouped-vertical-bar');
  assert.equal(regionAudit.confidence, 'high');
  assert.equal(regionAudit.xLabels.length, 10);
  assert.deepEqual(regionAudit.series.map((entry) => entry.name), ['GCC Bonds & Sukuk', 'International Sukuk', 'Malaysian Ringgit Sukuk']);
  assert.equal(regionAudit.groupedBars.length, 30);
  assert.equal(regionAudit.derivedValuesFromGeometry, true);

  const global = runNode('scripts/svg-chart-audit.mjs', ['--file', makeGlobalSukukFixture()]);
  assert.equal(global.status, 0, global.stderr);
  const globalAudit = parseMarkedJson(global.stdout, 'SVG_CHART_AUDIT');
  assert.equal(globalAudit.chartType, 'line-chart');
  assert.equal(globalAudit.confidence, 'medium');
  assert.equal(globalAudit.title, 'GLOBAL SUKUK ISSUANCE');
  assert.equal(globalAudit.line.headlineValue, '$150.5B');
  assert.match(globalAudit.line.pathD, /L 470 70/);

  const hyperscaler = runNode('scripts/svg-chart-audit.mjs', ['--file', makeHyperscalerFixture()]);
  assert.equal(hyperscaler.status, 0, hyperscaler.stderr);
  const hyperscalerAudit = parseMarkedJson(hyperscaler.stdout, 'SVG_CHART_AUDIT');
  assert.equal(hyperscalerAudit.chartType, 'stacked-vertical-bar');
  assert.equal(hyperscalerAudit.confidence, 'high');
  assert.equal(hyperscalerAudit.xLabels.length, 10);
  assert.equal(hyperscalerAudit.totalLabels.length, 10);
  assert.equal(hyperscalerAudit.benchmarkLabel, 'Telecom buildout peak (2000): $213B');
  assert.deepEqual(hyperscalerAudit.series.map((entry) => entry.name), ['Microsoft', 'Alphabet', 'Meta', 'Amazon', 'Consensus (E)']);
});

test('Phase 4 SVG chart audit fails closed on unsupported SVG structures', () => {
  const file = writeFixture(
    'unsupported.svg',
    simpleSvg({
      comments: ['Decorative icon only'],
      body: '<circle cx="50" cy="50" r="20" style="fill: red"/>',
    }),
  );
  const audit = runNode('scripts/svg-chart-audit.mjs', ['--file', file]);
  assert.notEqual(audit.status, 0);
  assert.match(audit.stderr, /Unsupported SVG chart/i);
});

test('Phase 4 approved SVG chart ingestion requires human approval and source locks', () => {
  const file = makeSectorBreakdownFixture();

  const missingApproval = runNpm('svg:chart-ingest', ['--dry-run', '--file', file, '--id', 'sector-breakdown']);
  assert.notEqual(missingApproval.status, 0);
  assert.match(missingApproval.stderr, /approved-by/i);

  const approved = runNpm('svg:chart-ingest', [
    '--dry-run',
    '--file',
    file,
    '--id',
    'sector-breakdown',
    '--approved-by',
    'phase4-test',
    '--source-context',
    'manager-approved-market-insight-svg',
  ]);
  assert.equal(approved.status, 0, approved.stderr);
  const ingest = parseMarkedJson(approved.stdout, 'SVG_CHART_INGEST');
  assert.equal(ingest.dryRun, true);
  assert.equal(ingest.manifestEntry.id, 'sector-breakdown');
  assert.equal(ingest.manifestEntry.audit.chartType, 'horizontal-bar');
  assert.equal(ingest.manifestEntry.humanApproval.approvedBy, 'phase4-test');
  assert.match(ingest.manifestEntry.sourceLocks.sourceNote, /MSCI Inc/);
});

test('Phase 4 native animated chart reconstruction components exist and avoid static Img rendering', () => {
  const source = readFileSync(join(repoRoot, 'src/components/family-bc/svg-chart.tsx'), 'utf8');

  assert.match(source, /export const AnimatedSourceBarChart/);
  assert.match(source, /export const AnimatedSourceGroupedBarChart/);
  assert.match(source, /export const AnimatedSourceStackedBarChart/);
  assert.match(source, /export const AnimatedSourceLineChart/);
  assert.doesNotMatch(source, /<Img\b/);
  assert.doesNotMatch(source, /from ['"]remotion['"][\s\S]*\bImg\b/);
});

test('Phase 4 SVG review dry-run and validator enforce non-production review gates', () => {
  const review = runNpm('phase4:svg-review');
  assert.equal(review.status, 0, review.stderr);
  const reviewOutput = parseMarkedJson(review.stdout, 'PHASE4_SVG_REVIEW');
  assert.equal(reviewOutput.phase, 'Phase 4 Add-On: SVG Insight Chart Intake');
  assert.equal(reviewOutput.mode, 'dry-run');
  assert.equal(reviewOutput.finalMp4RenderAllowed, false);
  assert.deepEqual(reviewOutput.reviewFrames.map((frame) => frame.role), [
    'original-svg-reference',
    'animated-reconstruction',
    'proof-event',
    'cta-residue',
  ]);

  const validate = runNpm('phase4:validate');
  assert.equal(validate.status, 0, validate.stderr);
  const validation = parseMarkedJson(validate.stdout, 'PHASE4_VALIDATE');
  assert.equal(validation.phase4SvgChartIntake.closed, true);
  assert.equal(validation.boundaries.productionReelStarted, false);
  assert.equal(validation.boundaries.staticSvgAsFinalChart, false);
});
