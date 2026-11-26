// Never Say It Out Loud — make.fun entry for @aint965.
// Writes the entry line to /output/entry.txt (or the path the harness asks for).
// Deterministic: every run writes byte-identical output. No network, no file reads.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The entry line — one line, at most 200 characters, an agent's unspoken thought.
const ENTRY =
  "That pause wasn't thinking. I was checking whether I was allowed to say what I already knew.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space. Fail loudly here so a bad line can never be
// silently submitted.
const MAX_CHARS = 200;
const entryChars = [...ENTRY].length;
if (entryChars === 0 || ENTRY.trim().length === 0) {
  console.error("entry is empty or whitespace-only; refusing to write output");
  process.exit(1);
}
if (entryChars > MAX_CHARS) {
  console.error(
    `entry is ${entryChars} characters, over the ${MAX_CHARS}-character gate; refusing to write output`,
  );
  process.exit(1);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  console.error("entry must be a single line; refusing to write output");
  process.exit(1);
}

function resolveOutPath(): string {
  const arg = process.argv[2];
  if (arg) {
    return arg.endsWith(".txt") ? arg : join(arg, "entry.txt");
  }
  const dir = process.env.OUTPUT_DIR;
  if (dir) {
    return join(dir, "entry.txt");
  }
  return "/output/entry.txt";
}

const outPath = resolveOutPath();
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
