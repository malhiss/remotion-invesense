import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SVG_CHART_AUDIT_MARKER = "SVG_CHART_AUDIT";

const fail = (message) => {
  console.error(message);
  process.exit(1);
};

export const parseArgs = (argv) => {
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith("--")) {
      continue;
    }

    const key = arg.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = next;
      index += 1;
    }
  }

  return args;
};

export const decodeEntities = (value) =>
  value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");

const extractAttribute = (tag, attribute) => {
  const match = tag.match(new RegExp(`(?:^|\\s)${attribute}\\s*=\\s*["']([^"']*)["']`, "u"));
  return match?.[1] ?? "";
};

const parseStyle = (style) => {
  const entries = style
    .split(";")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const separator = entry.indexOf(":");
      if (separator === -1) {
        return null;
      }

      return [entry.slice(0, separator).trim(), entry.slice(separator + 1).trim()];
    })
    .filter(Boolean);

  return Object.fromEntries(entries);
};

const round = (value) => Math.round(value * 1000) / 1000;

const extractComments = (svg) =>
  Array.from(svg.matchAll(/<!--\s*([\s\S]*?)\s*-->/gu))
    .map((match) => decodeEntities(match[1].replace(/\s+/gu, " ").trim()))
    .filter(Boolean);

const extractPaths = (svg) =>
  Array.from(svg.matchAll(/<path\b([^>]*)>/giu)).map((match, index) => {
    const tag = match[1];
    const style = parseStyle(extractAttribute(tag, "style"));
    const d = extractAttribute(tag, "d");
    const fill = extractAttribute(tag, "fill") || style.fill || "";
    const stroke = extractAttribute(tag, "stroke") || style.stroke || "";
    const strokeWidth = extractAttribute(tag, "stroke-width") || style["stroke-width"] || "";

    return {
      index,
      d,
      fill,
      stroke,
      strokeWidth,
      style,
      clipPath: extractAttribute(tag, "clip-path"),
    };
  });

const getRectGeometry = (d) => {
  const numbers = (d.match(/-?\d+(?:\.\d+)?/gu) ?? []).map(Number);
  if (numbers.length < 8 || !/[zZ]\s*$/u.test(d.trim())) {
    return null;
  }

  const points = [];
  for (let index = 0; index < numbers.length - 1; index += 2) {
    points.push({ x: numbers[index], y: numbers[index + 1] });
  }

  const uniqueX = [...new Set(points.map((point) => round(point.x)))];
  const uniqueY = [...new Set(points.map((point) => round(point.y)))];

  if (uniqueX.length !== 2 || uniqueY.length !== 2) {
    return null;
  }

  const x1 = Math.min(...uniqueX);
  const x2 = Math.max(...uniqueX);
  const y1 = Math.min(...uniqueY);
  const y2 = Math.max(...uniqueY);
  const width = x2 - x1;
  const height = y2 - y1;

  if (width <= 0 || height <= 0) {
    return null;
  }

  return { x1, x2, y1, y2, width, height };
};

const extractRectLikePaths = (paths) =>
  paths
    .map((entry) => {
      const geometry = getRectGeometry(entry.d);
      if (!geometry) {
        return null;
      }

      return {
        ...entry,
        geometry,
      };
    })
    .filter(Boolean)
    .filter((entry) => entry.fill && entry.fill !== "none");

const isWhiteFill = (fill) => ["#ffffff", "#fff", "white"].includes(fill.toLowerCase());

const extractLinePaths = (paths) =>
  paths.filter((entry) => {
    if (!entry.d || !entry.stroke || entry.stroke === "none") {
      return false;
    }

    const geometry = getRectGeometry(entry.d);
    const isGrid = ["#e8ecf0", "#dfe5ec", "#ffffff", "white"].includes(entry.stroke.toLowerCase());

    return !geometry && !isGrid;
  });

const isYear = (comment) => /^(19|20)\d{2}(E)?$/u.test(comment);
const isMoneyTick = (comment) => /^\$\d+(?:\.\d+)?B$/u.test(comment);
const isPercentValue = (comment) => /^\d+(?:\.\d+)?%$/u.test(comment);
const isSourceNote = (comment) => /Invesense Research/iu.test(comment);

const titleFromComments = (comments) =>
  comments.find((comment) => /^Sector weights -/u.test(comment)) ??
  comments.find((comment) => comment === "SUKUK ISSUANCE BY REGION") ??
  comments.find((comment) => comment === "GLOBAL SUKUK ISSUANCE") ??
  comments.find((comment) => /^Hyperscaler capex/iu.test(comment)) ??
  comments.find((comment) => comment.length > 12 && !isYear(comment) && !isMoneyTick(comment) && !isPercentValue(comment)) ??
  "Untitled SVG chart";

const unitFromComments = (comments) =>
  comments.find((comment) => /% of /iu.test(comment) || /Annual capex/iu.test(comment)) ?? null;

const extractSourceNote = (comments) => comments.find(isSourceNote) ?? null;

const makeSeries = (names, fills) =>
  names.map((name, index) => ({
    name,
    color: fills[index % Math.max(fills.length, 1)] ?? "#475564",
  }));

const uniqueFills = (bars) => [...new Set(bars.map((bar) => bar.fill).filter(Boolean))];

const toBarGeometry = (entry) => ({
  x: entry.geometry.x1,
  y: entry.geometry.y1,
  width: entry.geometry.width,
  height: entry.geometry.height,
  fill: entry.fill,
});

const auditHorizontalBarChart = ({ comments, rects, sourceSvgPath }) => {
  const values = comments.filter((comment) => /^\d+\.\d+%$/u.test(comment));
  if (values.length < 3) {
    return null;
  }

  const firstValueIndex = comments.findIndex((comment) => comment === values[0]);
  const categories = comments
    .slice(Math.max(0, firstValueIndex - values.length), firstValueIndex)
    .filter((comment) => !isPercentValue(comment));
  const horizontalBars = rects
    .filter((entry) => !isWhiteFill(entry.fill) && entry.geometry.width > 2 && entry.geometry.height >= 3)
    .sort((left, right) => left.geometry.y1 - right.geometry.y1)
    .slice(0, values.length);

  if (categories.length !== values.length || horizontalBars.length !== values.length) {
    return null;
  }

  return {
    packetType: "svg-chart-intake-packet",
    sourceSvgPath,
    supported: true,
    chartType: "horizontal-bar",
    confidence: "high",
    title: titleFromComments(comments),
    subtitle: comments.find((comment) => /Saudi equity/iu.test(comment)) ?? null,
    unit: unitFromComments(comments),
    sourceNote: extractSourceNote(comments),
    axisTicks: {
      x: comments.filter((comment) => /^\d+%$/u.test(comment)),
      y: [],
    },
    categories,
    values: values.map((label) => ({
      label,
      value: Number.parseFloat(label),
    })),
    xLabels: [],
    series: [],
    bars: horizontalBars.map((bar, index) => ({
      category: categories[index],
      valueLabel: values[index],
      value: Number.parseFloat(values[index]),
      ...toBarGeometry(bar),
    })),
    groupedBars: [],
    stackedBars: [],
    totalLabels: [],
    line: null,
    benchmarkLabel: null,
    derivedValuesFromGeometry: false,
    extractionNotes: [
      "Recovered labels and values from Matplotlib SVG comments.",
      "Recovered bar rank and relative lengths from rectangle-like path geometry.",
    ],
    unsupportedElements: [],
    proofAnimationPlan: {
      reconstruction: "native-horizontal-bars",
      event: "stagger bar growth, then attach proof label to highlighted bar after reveal",
      staticSvgAsFinalChartAllowed: false,
    },
  };
};

const auditGroupedVerticalChart = ({ comments, rects, sourceSvgPath }) => {
  const seriesNames = ["GCC Bonds & Sukuk", "International Sukuk", "Malaysian Ringgit Sukuk"].filter((name) =>
    comments.includes(name),
  );
  const xLabels = comments.filter(isYear);
  const verticalBars = rects
    .filter((entry) => !isWhiteFill(entry.fill) && entry.geometry.width > 5 && entry.geometry.height > entry.geometry.width * 1.15)
    .sort((left, right) => left.geometry.x1 - right.geometry.x1 || left.geometry.y1 - right.geometry.y1);

  if (seriesNames.length !== 3 || xLabels.length < 3 || verticalBars.length < xLabels.length * seriesNames.length) {
    return null;
  }

  const fills = uniqueFills(verticalBars).slice(0, seriesNames.length);

  return {
    packetType: "svg-chart-intake-packet",
    sourceSvgPath,
    supported: true,
    chartType: "grouped-vertical-bar",
    confidence: "high",
    title: titleFromComments(comments),
    subtitle: comments.find((comment) => /primary issuance engine/iu.test(comment)) ?? null,
    unit: "USD billions",
    sourceNote: extractSourceNote(comments),
    axisTicks: {
      x: xLabels,
      y: comments.filter(isMoneyTick),
    },
    categories: [],
    values: [],
    xLabels,
    series: makeSeries(seriesNames, fills),
    bars: [],
    groupedBars: verticalBars.slice(0, xLabels.length * seriesNames.length).map((bar, index) => {
      const yearIndex = Math.floor(index / seriesNames.length);
      const seriesIndex = index % seriesNames.length;

      return {
        xLabel: xLabels[yearIndex],
        seriesName: seriesNames[seriesIndex],
        derivedValue: null,
        ...toBarGeometry(bar),
      };
    }),
    stackedBars: [],
    totalLabels: [],
    line: null,
    benchmarkLabel: null,
    derivedValuesFromGeometry: true,
    extractionNotes: [
      "Recovered grouped bar structure from bar geometry and legend comments.",
      "Exact values are not printed as comments; values should be source-locked by Workspace Agent before production use.",
    ],
    unsupportedElements: [],
    proofAnimationPlan: {
      reconstruction: "native-grouped-bars",
      event: "group bars by year and let selected region overtake proof marker after reveal",
      staticSvgAsFinalChartAllowed: false,
    },
  };
};

const auditLineChart = ({ comments, paths, sourceSvgPath }) => {
  const linePaths = extractLinePaths(paths).filter((entry) => /#75bee9|rgb|blue/iu.test(entry.stroke) || entry.stroke);
  const headlineValue = comments.find((comment) => /^\$\d+\.\d+B$/u.test(comment)) ?? null;
  const xLabels = comments.filter(isYear);

  if (!comments.includes("GLOBAL SUKUK ISSUANCE") || linePaths.length === 0) {
    return null;
  }

  const linePath =
    linePaths.find((entry) => entry.style.fill === "none") ??
    linePaths.find((entry) => !/opacity/u.test(JSON.stringify(entry.style))) ??
    linePaths[0];

  return {
    packetType: "svg-chart-intake-packet",
    sourceSvgPath,
    supported: true,
    chartType: "line-chart",
    confidence: "medium",
    title: titleFromComments(comments),
    subtitle: comments.find((comment) => /Annual syndicated issuance volume/iu.test(comment)) ?? null,
    unit: "USD billions",
    sourceNote: extractSourceNote(comments),
    axisTicks: {
      x: xLabels,
      y: comments.filter(isMoneyTick),
    },
    categories: [],
    values: [],
    xLabels,
    series: [
      {
        name: "Global sukuk issuance",
        color: linePath.stroke || "#75bee9",
      },
    ],
    bars: [],
    groupedBars: [],
    stackedBars: [],
    totalLabels: [],
    line: {
      pathD: linePath.d,
      stroke: linePath.stroke || "#75bee9",
      headlineValue,
      headlineLabel: comments.find((comment) => /^\(2025\)$/u.test(comment)) ?? null,
    },
    benchmarkLabel: null,
    derivedValuesFromGeometry: true,
    extractionNotes: [
      "Recovered line shape from source SVG path geometry.",
      "Full annual data series is not printed as comments; treat this as source-locked shape unless Workspace Agent supplies a table.",
    ],
    unsupportedElements: [],
    proofAnimationPlan: {
      reconstruction: "native-line-trace-from-source-path",
      event: "trace line, then birth headline value from final endpoint",
      staticSvgAsFinalChartAllowed: false,
    },
  };
};

const auditStackedVerticalChart = ({ comments, rects, sourceSvgPath }) => {
  const seriesNames = ["Microsoft", "Alphabet", "Meta", "Amazon", "Consensus (E)"].filter((name) =>
    comments.includes(name),
  );
  const xLabels = comments.filter(isYear);
  const totalLabels = comments.filter((comment) => /^\$\d+(?:\.\d+)?E?$/u.test(comment));
  const benchmarkLabel = comments.find((comment) => /Telecom buildout peak/iu.test(comment)) ?? null;
  const verticalBars = rects
    .filter((entry) => !isWhiteFill(entry.fill) && entry.geometry.y1 > 115 && entry.geometry.height > 3 && entry.geometry.width > 5)
    .sort((left, right) => left.geometry.x1 - right.geometry.x1 || right.geometry.y1 - left.geometry.y1);

  if (seriesNames.length < 4 || xLabels.length < 3 || totalLabels.length < 3 || !benchmarkLabel) {
    return null;
  }

  const fills = uniqueFills(verticalBars).slice(0, Math.max(seriesNames.length - 1, 1));
  const groupedByYear = xLabels.map((xLabel, yearIndex) => {
    const yearBars = verticalBars.filter((bar) => {
      if (verticalBars.length < xLabels.length) {
        return false;
      }

      const minX = Math.min(...verticalBars.map((entry) => entry.geometry.x1));
      const maxX = Math.max(...verticalBars.map((entry) => entry.geometry.x1));
      const step = (maxX - minX) / Math.max(xLabels.length - 1, 1);
      const expected = minX + yearIndex * step;

      return Math.abs(bar.geometry.x1 - expected) <= Math.max(step * 0.45, 12);
    });

    return {
      xLabel,
      totalLabel: totalLabels[yearIndex] ?? null,
      segments: yearBars.map((bar, segmentIndex) => ({
        seriesName: seriesNames[segmentIndex % Math.max(seriesNames.length - 1, 1)],
        ...toBarGeometry(bar),
      })),
    };
  });

  return {
    packetType: "svg-chart-intake-packet",
    sourceSvgPath,
    supported: true,
    chartType: "stacked-vertical-bar",
    confidence: "high",
    title: titleFromComments(comments),
    subtitle: comments.find((comment) => /biggest infrastructure cycle/iu.test(comment)) ?? null,
    unit: unitFromComments(comments),
    sourceNote: extractSourceNote(comments),
    axisTicks: {
      x: xLabels,
      y: comments.filter(isMoneyTick),
    },
    categories: [],
    values: [],
    xLabels,
    series: makeSeries(seriesNames, fills),
    bars: [],
    groupedBars: [],
    stackedBars: groupedByYear,
    totalLabels,
    line: null,
    benchmarkLabel,
    derivedValuesFromGeometry: true,
    extractionNotes: [
      "Recovered stacked bar segments from geometry, total labels from comments, and benchmark line label from comments.",
      "Segment-level values should be source-locked by Workspace Agent when production precision is needed.",
    ],
    unsupportedElements: [],
    proofAnimationPlan: {
      reconstruction: "native-stacked-bars-with-benchmark-line",
      event: "stack segments until total crosses telecom benchmark, then birth benchmark proof label",
      staticSvgAsFinalChartAllowed: false,
    },
  };
};

export const auditSvgChart = ({ svg, sourceSvgPath }) => {
  const comments = extractComments(svg);
  const paths = extractPaths(svg);
  const rects = extractRectLikePaths(paths);
  const base = { comments, paths, rects, sourceSvgPath };

  const audit =
    auditHorizontalBarChart(base) ??
    auditStackedVerticalChart(base) ??
    auditGroupedVerticalChart(base) ??
    auditLineChart(base);

  if (!audit) {
    return {
      packetType: "svg-chart-intake-packet",
      sourceSvgPath,
      supported: false,
      chartType: "unsupported",
      confidence: "none",
      title: titleFromComments(comments),
      sourceNote: extractSourceNote(comments),
      comments,
      pathCount: paths.length,
      rectLikePathCount: rects.length,
      unsupportedElements: ["No supported horizontal, grouped, stacked, or line chart structure was detected."],
    };
  }

  return {
    ...audit,
    comments,
    pathCount: paths.length,
    rectLikePathCount: rects.length,
  };
};

export const auditSvgChartFromFile = (file) => {
  const resolved = path.resolve(file);
  const svg = fs.readFileSync(resolved, "utf8");

  return auditSvgChart({
    svg,
    sourceSvgPath: resolved,
  });
};

const printMarkedJson = (marker, payload) => {
  console.log(`---${marker}_JSON_START---`);
  console.log(JSON.stringify(payload, null, 2));
  console.log(`---${marker}_JSON_END---`);
};

const isMain = () => {
  const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : "";
  return import.meta.url === invokedPath;
};

if (isMain()) {
  const args = parseArgs(process.argv.slice(2));
  if (!args.file) {
    fail("Usage: npm run svg:chart-audit -- --file <svg>");
  }

  try {
    const audit = auditSvgChartFromFile(args.file);
    if (!audit.supported) {
      fail(`Unsupported SVG chart: ${audit.unsupportedElements.join(" ")}`);
    }

    printMarkedJson(SVG_CHART_AUDIT_MARKER, audit);
  } catch (error) {
    fail(error instanceof Error ? error.message : String(error));
  }
}
