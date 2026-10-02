import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
const script = layout.match(/const themeScript = `([^`]+)`;/)?.[1];
assert.ok(script, "The before-paint theme script must exist");

for (const [saved, expected] of [[null, "dark"], ["light", "light"], ["dark", "dark"], ["invalid", "dark"]]) {
  const document = { documentElement: { dataset: {} } };
  runInNewContext(script, {
    document,
    localStorage: { getItem: () => saved },
  });
  assert.equal(document.documentElement.dataset.theme, expected);
}

const document = { documentElement: { dataset: {} } };
runInNewContext(script, {
  document,
  localStorage: { getItem() { throw new Error("Storage blocked"); } },
});
assert.equal(document.documentElement.dataset.theme, "dark");
console.log("Theme checks passed: dark default, saved choices, blocked storage.");
