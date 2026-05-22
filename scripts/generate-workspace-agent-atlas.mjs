import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const readJson = (relativePath) =>
  JSON.parse(fs.readFileSync(path.join(projectRoot, relativePath), "utf8"));

const writeJson = (relativePath, data) => {
  const target = path.join(projectRoot, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(data, null, 2)}\n`);
};

const normalizePath = (value) => value.replaceAll("\\", "/");

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/\.mp4$/u, "")
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-|-$/gu, "")
    .slice(0, 72);

const shortHash = (value) =>
  crypto.createHash("sha1").update(value).digest("hex").slice(0, 8);

const listFiles = (directory, fileName) => {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const entries = fs.readdirSync(directory, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return listFiles(absolutePath, fileName);
    }

    return entry.name === fileName ? [absolutePath] : [];
  });
};

const classifyFamily = (batch, fileName) => {
  if (batch === "batch-01") {
    return "family-b";
  }

  if (fileName.startsWith("WhatsApp Video")) {
    return "family-c";
  }

  return "family-a";
};

const getFamilyProfile = (family) => {
  if (family === "family-b") {
    return {
      assets: [
        "source chart",
        "candlesticks or line chart",
        "moving-average line",
        "direct labels",
        "CTA keyword close",
      ],
      motifs: [
        "chart-as-terrain",
        "support-resistance-as-physical-line",
        "strict-bars-as-measured-objects",
        "cta-residue",
      ],
      analogies: [
        "line as floor or resistance",
        "gap as measurable distance",
        "chart marker as proof trigger",
      ],
      wowEvents: [
        "marker lands on source chart",
        "support line bends or breaks",
        "gap bracket opens from chart points",
      ],
      proofOperators: [
        "chart-to-number-extraction",
        "gap-bracket",
        "endpoint-label",
        "cta-underline-inheritance",
      ],
      chartRole:
        "Primary proof terrain: chart geometry carries the claim and labels attach to source points.",
      ctaBehavior:
        "CTA inherits a chart line, bracket, underline, or final marker residue.",
      financialMechanisms: [
        "support-resistance",
        "chart-proof",
        "spread-gap",
        "ranking-bars",
      ],
      whatToAdapt: [
        "Light editorial background",
        "Mobile-readable chart proof",
        "Direct labels born from chart events",
        "CTA residue connected to the final proof object",
      ],
      whatNotToCopy: [
        "Exact creator layout",
        "Unverified chart values",
        "Detached proof cards",
        "Dashboard panels",
      ],
      copyRisk: "medium",
    };
  }

  if (family === "family-c") {
    return {
      assets: [
        "logo actors",
        "institutional icons",
        "documents",
        "server or rails object",
        "clean CTA mark",
      ],
      motifs: [
        "logo-as-actor",
        "route-rail",
        "stamp-latch",
        "vault-unlock-tokenization",
        "cta-residue",
      ],
      analogies: [
        "settlement route as rail",
        "logo as character in a mechanism",
        "approval as stamp or latch",
      ],
      wowEvents: [
        "route endpoint locks",
        "document receives stamp",
        "gate opens into final proof",
      ],
      proofOperators: [
        "route-endpoint",
        "stamped-readout",
        "proof-latch",
        "cta-underline-inheritance",
      ],
      chartRole:
        "Supporting or absent: chart proof appears only when the source requires it.",
      ctaBehavior:
        "CTA reuses the last route, stamp, latch, or icon residue rather than becoming an end card.",
      financialMechanisms: [
        "logo-infographic",
        "liquidity-flow",
        "settlement-stamp",
        "tokenization-access",
      ],
      whatToAdapt: [
        "Light-background institutional clarity",
        "Logo and icon actors that perform a mechanism",
        "Source-grounded proof attached to an event",
      ],
      whatNotToCopy: [
        "Generic SaaS interface",
        "Decorative logo grids",
        "Pasted proof plates",
        "Overcrowded icon scenes",
      ],
      copyRisk: "medium",
    };
  }

  return {
    assets: [
      "animated hero object",
      "glow accent",
      "coin or token icon",
      "energy trail",
      "motion burst",
    ],
    motifs: [
      "logo-as-actor",
      "route-rail",
      "vault-unlock-tokenization",
      "proof-latch",
    ],
    analogies: [
      "object unlocks access",
      "signal moves through rails",
      "pressure creates visible change",
    ],
    wowEvents: [
      "object snaps into place",
      "energy pulse travels along route",
      "proof latch closes after impact",
    ],
    proofOperators: [
      "endpoint-label",
      "proof-latch",
      "selected-path-proof",
    ],
    chartRole:
      "Secondary or absent: Family A is motion-energy reference, not the house default.",
    ctaBehavior:
      "CTA may inherit the final object residue, but should not bring dark style into Family B/C by default.",
    financialMechanisms: [
      "liquidity-flow",
      "tokenization-access",
      "drag-leak",
      "settlement-stamp",
    ],
    whatToAdapt: [
      "Asset energy",
      "Clear object behavior",
      "Tight kinetic pacing",
    ],
    whatNotToCopy: [
      "Dark cinematic default",
      "Unlicensed assets",
      "Template-like confetti or generic glow",
    ],
    copyRisk: "high",
  };
};

const topicFromFileName = (fileName, family) => {
  const title = fileName.replace(/\.mp4$/u, "");
  if (!title.startsWith("WhatsApp Video")) {
    return title;
  }

  if (family === "family-b") {
    return `Family B light chart-native reference: ${title}`;
  }

  return `Family C light logo/icon reference: ${title}`;
};

const buildSummaryMap = () => {
  const summaries = listFiles(path.join(projectRoot, "benchmarks"), "summary.json");
  const summaryMap = new Map();

  for (const summaryPath of summaries) {
    const summary = JSON.parse(fs.readFileSync(summaryPath, "utf8"));
    if (summary.relativePath) {
      summaryMap.set(normalizePath(summary.relativePath), {
        summary,
        relativeSummaryPath: normalizePath(path.relative(projectRoot, summaryPath)),
      });
    }
  }

  return summaryMap;
};

const indexEntries = (entries, field) =>
  entries.reduce((index, entry) => {
    const values = Array.isArray(entry[field]) ? entry[field] : [entry[field]];
    for (const value of values) {
      if (!index[value]) {
        index[value] = [];
      }
      index[value].push(entry.id);
    }

    return index;
  }, {});

const manifests = [
  readJson("benchmarks/batch-01/manifest.json"),
  readJson("benchmarks/batch-02/manifest.json"),
];

const summaryMap = buildSummaryMap();

const entries = manifests.flatMap((manifest) =>
  manifest.files.map((file) => {
    const sourcePath = normalizePath(file.relativePath);
    const summaryRecord = summaryMap.get(sourcePath);
    const family = classifyFamily(manifest.batch, file.fileName);
    const profile = getFamilyProfile(family);
    const id = `${manifest.batch}-${slugify(file.fileName)}-${shortHash(sourcePath)}`;

    return {
      id,
      batch: manifest.batch,
      sourcePath,
      fileName: file.fileName,
      analysisPath: summaryRecord?.relativeSummaryPath ?? "analysis-not-found",
      contactSheet:
        summaryRecord?.summary.contactSheet ??
        `benchmarks/${manifest.batch}/analysis/contact-sheet-not-found.jpg`,
      transcriptText:
        summaryRecord?.summary.transcriptText ??
        "transcript-not-required-for-phase-1-atlas",
      durationSeconds:
        summaryRecord?.summary.durationSeconds ?? file.durationSeconds ?? 0,
      family,
      topic: topicFromFileName(file.fileName, family),
      ...profile,
    };
  }),
);

const atlas = {
  version: 1,
  generatedFrom: manifests.map((manifest) => `benchmarks/${manifest.batch}/manifest.json`),
  totalVideos: entries.length,
  entries,
};

const index = {
  version: 1,
  totalVideos: entries.length,
  byFamily: indexEntries(entries, "family"),
  byMotif: indexEntries(entries, "motifs"),
  byAsset: indexEntries(entries, "assets"),
  byFinancialMechanism: indexEntries(entries, "financialMechanisms"),
  byProofOperator: indexEntries(entries, "proofOperators"),
};

writeJson("docs/workspace-agent/benchmark-atlas.json", atlas);
writeJson("docs/workspace-agent/benchmark-index.json", index);

console.log(`Generated Workspace Agent benchmark atlas for ${entries.length} videos.`);
