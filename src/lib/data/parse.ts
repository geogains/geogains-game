// src/lib/data/parse.ts
import type { CountryEntry } from "./schema";

export function parseJsonl(text: string): CountryEntry[] {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const out: CountryEntry[] = [];
  for (const line of lines) {
    try {
      out.push(JSON.parse(line));
    } catch (e) {
      throw new Error("Invalid JSONL line: " + line.slice(0, 80));
    }
  }
  return out;
}
