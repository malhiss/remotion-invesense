import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const publicLottieDir = path.join(projectRoot, "public", "lottie");
const manifestPath = path.join(publicLottieDir, "manifest.json");
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");

const fail = (message) => {
  console.error(message);
  process.exit(1);
};

const valueAfter = (flag) => {
  const index = args.indexOf(flag);
  return index === -1 ? null : args[index + 1] ?? null;
};

const requireValue = (flag) => {
  const value = valueAfter(flag);
  if (!value) {
    fail(`${flag} is required.`);
  }
  return value;
};

const id = requireValue("--id");
const file = valueAfter("--file");
const sourceUrl = requireValue("--source-url");
const licenseNote = requireValue("--license-note");
const approvedUsage = requireValue("--approved-usage");
const approvedBy = requireValue("--approved-by");
const fallbackNativeRemotionOption = requireValue("--fallback");
const sourceKind = file ? "local-file" : "direct-json-url";
const allowedUsage = new Set([
  "route-pulse",
  "highlight-sweep",
  "CTA-pulse",
  "proof-burst",
  "chart-accent",
  "payment-transfer",
  "data-transfer",
  "micro-icon",
  "transition-accent",
]);

if (!/^[a-z0-9-]+$/u.test(id)) {
  fail("--id must use lowercase letters, numbers, and hyphens only.");
}

if (!allowedUsage.has(approvedUsage)) {
  fail(`Unsupported --approved-usage: ${approvedUsage}`);
}

const json = file ? readLocalJson(file) : await readRemoteJson(sourceUrl);
validateLottieJson(json);

const localPath = `lottie/${id}.json`;
const manifestEntry = {
  id,
  sourceUrl,
  localPath,
  licenseNote,
  approvedUsage,
  approvedByHuman: true,
  approvedBy,
  fallbackNativeRemotionOption,
  nonProduction: args.includes("--production") ? false : true,
  sourceKind,
};

if (dryRun) {
  console.log(JSON.stringify({ dryRun: true, manifestEntry }, null, 2));
  process.exit(0);
}

fs.mkdirSync(publicLottieDir, { recursive: true });
fs.writeFileSync(
  path.join(publicLottieDir, `${id}.json`),
  `${JSON.stringify(json, null, 2)}\n`,
);

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
manifest.assets = [
  ...manifest.assets.filter((asset) => asset.id !== id),
  manifestEntry,
].sort((a, b) => a.id.localeCompare(b.id));
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(JSON.stringify({ dryRun: false, manifestEntry }, null, 2));

function readLocalJson(localFile) {
  if (!fs.existsSync(localFile)) {
    fail(`Local Lottie file does not exist: ${localFile}`);
  }

  return JSON.parse(fs.readFileSync(localFile, "utf8"));
}

async function readRemoteJson(url) {
  if (!url.endsWith(".json")) {
    fail("--source-url must be a direct JSON URL when --file is not supplied.");
  }

  const response = await fetch(url);
  if (!response.ok) {
    fail(`Failed to fetch Lottie JSON: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

function validateLottieJson(json) {
  if (
    !json ||
    typeof json !== "object" ||
    typeof json.v !== "string" ||
    typeof json.fr !== "number" ||
    typeof json.ip !== "number" ||
    typeof json.op !== "number" ||
    typeof json.w !== "number" ||
    typeof json.h !== "number" ||
    !Array.isArray(json.layers)
  ) {
    fail(
      "Invalid Lottie JSON: expected v, fr, ip, op, w, h, and layers fields.",
    );
  }
}
