import fs from "node:fs";
import path from "node:path";
import { auditSvgChartFromFile, parseArgs } from "./svg-chart-audit.mjs";

const projectRoot = process.cwd();
const manifestPath = path.join(projectRoot, "public", "source-charts", "manifest.json");

const fail = (message) => {
  console.error(message);
  process.exit(1);
};

const printMarkedJson = (marker, payload) => {
  console.log(`---${marker}_JSON_START---`);
  console.log(JSON.stringify(payload, null, 2));
  console.log(`---${marker}_JSON_END---`);
};

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-|-$/gu, "");

const readManifest = () => {
  if (!fs.existsSync(manifestPath)) {
    return { charts: [] };
  }

  return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
};

const writeManifest = (manifest) => {
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
};

const assertSourceLocked = (audit) => {
  if (!audit.supported) {
    fail("Cannot ingest unsupported SVG chart.");
  }

  if (!audit.title || audit.title === "Untitled SVG chart") {
    fail("Cannot ingest SVG chart without a source-locked title.");
  }

  if (!audit.sourceNote) {
    fail("Cannot ingest SVG chart without a source note.");
  }

  const hasSourceLockedValues =
    audit.values?.length > 0 ||
    audit.totalLabels?.length > 0 ||
    audit.groupedBars?.length > 0 ||
    Boolean(audit.line?.pathD);

  if (!hasSourceLockedValues) {
    fail("Cannot ingest SVG chart without recoverable values, totals, grouped bars, or line geometry.");
  }
};

const args = parseArgs(process.argv.slice(2));

if (!args.file) {
  fail("Usage: npm run svg:chart-ingest -- --file <svg> --id <id> --approved-by <name> --source-context <context>");
}

if (!args.id) {
  fail("svg:chart-ingest requires --id.");
}

if (!args["approved-by"]) {
  fail("svg:chart-ingest requires --approved-by human approval metadata.");
}

if (!args["source-context"]) {
  fail("svg:chart-ingest requires --source-context so the chart stays tied to the market insight.");
}

const audit = auditSvgChartFromFile(args.file);
assertSourceLocked(audit);

const id = slugify(args.id);
const dryRun = Boolean(args["dry-run"]);
const sourceFileName = `${id}.svg`;
const dataFileName = `${id}.json`;
const sourceChartsDir = path.join(projectRoot, "public", "source-charts");
const sourceTargetPath = path.join(sourceChartsDir, sourceFileName);
const dataTargetPath = path.join(sourceChartsDir, dataFileName);

const manifestEntry = {
  id,
  originalSourcePath: path.resolve(args.file),
  localSvgPath: `source-charts/${sourceFileName}`,
  extractedDataPath: `source-charts/${dataFileName}`,
  audit,
  sourceContext: args["source-context"],
  sourceLocks: {
    title: audit.title,
    sourceNote: audit.sourceNote,
    chartType: audit.chartType,
    valueCount: audit.values?.length ?? 0,
    categoryCount: audit.categories?.length ?? 0,
    xLabelCount: audit.xLabels?.length ?? 0,
    totalLabelCount: audit.totalLabels?.length ?? 0,
  },
  humanApproval: {
    approvedBy: args["approved-by"],
    approvedFor: "animated-remotion-chart-reconstruction",
  },
  finalStaticSvgAllowed: false,
  productionReelStarted: false,
};

if (!dryRun) {
  fs.mkdirSync(sourceChartsDir, { recursive: true });
  fs.copyFileSync(path.resolve(args.file), sourceTargetPath);
  fs.writeFileSync(dataTargetPath, `${JSON.stringify(audit, null, 2)}\n`, "utf8");

  const manifest = readManifest();
  manifest.charts = manifest.charts.filter((entry) => entry.id !== id);
  manifest.charts.push(manifestEntry);
  writeManifest(manifest);
}

printMarkedJson("SVG_CHART_INGEST", {
  dryRun,
  wouldWrite: !dryRun,
  manifestEntry,
});

