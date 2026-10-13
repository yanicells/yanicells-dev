import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
const script = layout.match(/const themeScript = `([^`]+)`;/)?.[1];
assert.ok(script, "The before-paint theme script must exist");

// Runs the script with a saved value (or a throwing getItem) and a system preference.
function run(getItem, systemLight) {
  const document = { documentElement: { dataset: {} } };
  const window = { matchMedia: () => ({ matches: systemLight }) };
  runInNewContext(script, { document, window, localStorage: { getItem } });
  return document.documentElement.dataset.theme;
}

for (const systemLight of [true, false]) {
  const system = systemLight ? "light" : "dark";
  assert.equal(run(() => null, systemLight), system);
  assert.equal(run(() => "invalid", systemLight), system);
  assert.equal(run(() => { throw new Error("Storage blocked"); }, systemLight), system);
  assert.equal(run(() => "light", systemLight), "light");
  assert.equal(run(() => "dark", systemLight), "dark");
}
console.log("Theme checks passed: system default, saved choices, blocked storage.");
