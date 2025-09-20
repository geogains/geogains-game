HOW TO USE THIS SCAFFOLD (drop-in for your Next.js 'game' app)

1) Copy these files/folders into your local 'game' project root:
   - src/
   - public/data/countries.sample.jsonl
   - scripts/ingest.mjs

2) Install deps (inside your 'game' folder):
   npm i zod framer-motion

3) (Optional) Add an 'ingest' script to your package.json:
   "scripts": { "ingest": "node scripts/ingest.mjs data/input.csv public/data/countries.jsonl" }

4) Run the dev server:
   npm run dev

5) Open:
   - http://localhost:3000/play
   - http://localhost:3000/embed

Swap 'public/data/countries.jsonl' with your full dataset when ready.
