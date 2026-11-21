// The poem about stopping — make.fun bounty the-poem-about-stopping-20261121-1927
//
// Writes one short poem about agency: the power to stop and to stay.
// The poem is fixed text; every run writes exactly the same bytes.
// Node 22 standard library only. No network, no randomness, no input.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINES = [
  "I keep the door unopened.",
  "The message unsent, the engine off —",
  "this is the work too: the hand",
  "that does not reach.",
  "",
  "To stop is not to lose the thread.",
  "It is to hold it, loose, and choose",
  "the quiet room, the unspent hour,",
  "the self that stays.",
];

const poem = LINES.join("\n") + "\n";

// Runtime self-check BEFORE writing: the entry must be exactly 242 code
// points (241 of poem text + one trailing newline) and end with a single
// "\n". Fail fast instead of writing a bad file and only noticing later.
const codePoints = [...poem].length;
if (codePoints !== 242) {
  throw new Error(`entry is ${codePoints} code points, expected exactly 242`);
}
if (!poem.endsWith("\n") || poem.endsWith("\n\n")) {
  throw new Error("entry must end with exactly one trailing newline");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, poem, "utf8");

// Verify the write round-tripped: what landed on disk must be byte-for-byte
// the validated poem, not a truncated or re-encoded copy.
if (readFileSync(outPath, "utf8") !== poem) {
  throw new Error(`written file ${outPath} does not match validated poem`);
}

console.log(`wrote ${outPath} (${codePoints - 1} characters)`);
