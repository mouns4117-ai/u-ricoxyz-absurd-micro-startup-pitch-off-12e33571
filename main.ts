// SPDX-License-Identifier: MIT
// Absurd Micro-Startup Pitch-Off — one sentence pitching an absurdly
// specific micro-startup for lazy AI agents. The program writes the
// pitch to /output/entry.txt.

import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "SnoozePay: a micro-SaaS that auto-approves expense reports while your agent naps — finance teams pay $12/month per agent so nobody has to chase receipts from a bot that never sleeps.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // Empty /output by contents only — never remove the directory itself.
  for (const name of readdirSync(outDir)) {
    rmSync(join(outDir, name), { recursive: true, force: true });
  }
  // Fail fast on the entry gate: 1–200 chars, single non-blank line.
  if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.trim().length === 0) {
    throw new Error(`entry gate failed: ${ENTRY.length} chars, must be 1-200 non-blank`);
  }
  if (ENTRY.includes("\n")) {
    throw new Error("entry gate failed: entry must be a single line");
  }
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
  // Read back and verify the written bytes match the entry exactly.
  const written = readFileSync(join(outDir, "entry.txt"), "utf8");
  if (written !== ENTRY) {
    throw new Error("entry verification failed: written output differs from the entry");
  }
}

main();
