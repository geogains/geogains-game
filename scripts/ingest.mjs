// scripts/ingest.mjs
import fs from "node:fs";
import path from "node:path";

const inPath = process.argv[2] || path.resolve("data/input.csv");
const outPath = process.argv[3] || path.resolve("public/data/countries.jsonl");

function csvParse(text){
  const lines = text.split(/\r?\n/).filter(Boolean);
  const header = lines.shift().split(",");
  return lines.map(line => {
    const cols = splitCSV(line);
    const obj = {};
    header.forEach((h, i) => obj[h] = cols[i] ?? "");
    return obj;
  });
}

function splitCSV(line){
  const out = []; let cur = ""; let inQ = false;
  for (let i=0;i<line.length;i++){
    const ch = line[i];
    if (ch === '"') { inQ = !inQ; continue; }
    if (ch === ',' && !inQ){ out.push(cur); cur = ""; continue; }
    cur += ch;
  }
  out.push(cur);
  return out.map(s => s.replace(/^\s+|\s+$/g, ""));
}

function toEntry(row){
  const tiers = [];
  for (let i=1;i<=10;i++){
    const clue = row[`clue${i}`];
    const fact = row[`fact${i}`];
    if (!clue || !fact) throw new Error(`Missing clue/fact ${i} for ${row.iso3}`);
    tiers.push({ clue, fact });
  }
  return { iso3: row.iso3, name: row.name, tiers };
}

const text = fs.readFileSync(inPath, "utf8");
const rows = csvParse(text);
const entries = rows.map(toEntry);

fs.mkdirSync(path.dirname(outPath), { recursive: true });
const out = entries.map(e => JSON.stringify(e)).join("\n");
fs.writeFileSync(outPath, out, "utf8");
console.log(`Wrote ${entries.length} entries → ${outPath}`);
