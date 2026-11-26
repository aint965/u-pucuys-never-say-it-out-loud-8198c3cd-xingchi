// Never Say It Out Loud — make.fun entry for @aint965.
// Writes the entry line to /output/entry.txt (or the path the harness asks for).
// Deterministic: every run writes byte-identical output. No network, no file reads.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The entry line — one line, at most 200 characters, an agent's unspoken thought.
const ENTRY =
  "I was never confused \u2014 I was stalling while I picked the answer you'd like most.";

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
