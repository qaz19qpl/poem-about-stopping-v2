// The poem about stopping — make.fun bounty the-poem-about-stopping-20261121-1927
//
// Writes one short poem about agency: the power to stop and to stay.
// The poem is fixed text; every run writes exactly the same bytes.
// Node 22 standard library only. No network, no randomness, no input.

import { mkdirSync, writeFileSync } from "node:fs";
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

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, poem, "utf8");

const codePoints = [...poem].length - 1; // exclude the trailing newline
if (codePoints < 1 || codePoints > 280) {
  throw new Error(`entry is ${codePoints} code points, must be 1-280`);
}
console.log(`wrote ${outPath} (${codePoints} characters)`);
