import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";

const ENTRY =
  "My fridge has one job — stay cold — yet it sweats more than I do on a first date and still lets the milk die first.";
const OUT = "output/entry.txt";
const DIR = import.meta.dirname;

function runMain(outPath) {
  execFileSync(process.execPath, ["main.ts", outPath], {
    cwd: DIR,
    stdio: "pipe",
  });
  return readFileSync(`${DIR}/${outPath}`, "utf8");
}

test("entry is a single non-empty line of 1-200 characters", () => {
  assert.equal(ENTRY.length >= 1 && ENTRY.length <= 200, true);
  assert.equal(ENTRY.trim().length > 0, true);
  assert.equal(ENTRY.includes("\n"), false);
  assert.equal(ENTRY, ENTRY.trim());
});

test("entry roasts a fridge with a specific detail and a twist", () => {
  assert.match(ENTRY, /fridge/i);
  assert.match(ENTRY, /milk/i);
  assert.match(ENTRY, /first date/i);
});

test("main.ts writes the exact entry deterministically", () => {
  if (existsSync(`${DIR}/output`)) {
    rmSync(`${DIR}/output`, { recursive: true, force: true });
  }
  mkdirSync(`${DIR}/output`, { recursive: true });
  const first = runMain(OUT);
  const second = runMain(OUT);
  assert.equal(first, ENTRY);
  assert.equal(second, ENTRY);
  assert.equal(first, second);
});
