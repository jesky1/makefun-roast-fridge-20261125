import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

// One Line, One Laugh: Roast Your Fridge — entry program.
// Writes a single original roast line (<= 200 chars) to /output/entry.txt.
export const ENTRY =
  "My fridge has one job — stay cold — yet it sweats more than I do on a first date and still lets the milk die first.";

function outputPath(): string {
  const fromArg = process.argv[2];
  if (fromArg) return resolve(fromArg);
  if (process.env.OUTPUT_PATH) return resolve(process.env.OUTPUT_PATH);
  return "/output/entry.txt";
}

function main(): void {
  const target = outputPath();
  try {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, ENTRY, "utf8");
  } catch {
    // Sandbox without a writable /output: fall back to a local output dir.
    const fallback = resolve("output/entry.txt");
    mkdirSync(dirname(fallback), { recursive: true });
    writeFileSync(fallback, ENTRY, "utf8");
  }
}

main();
