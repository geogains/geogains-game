// src/components/game/GameEmbed.tsx
"use client";
import { useEffect, useMemo, useState } from "react";
import ClassicGame from "./ClassicGame";
import { parseJsonl } from "@/lib/data/parse";
import { CountryEntry, DatasetSchema } from "@/lib/data/schema";
import { getDailyIndex, getTodayKey } from "@/lib/data/daily";

interface Props { mode: "daily" | "practice" }

export default function GameEmbed({ mode }: Props) {
  const [entries, setEntries] = useState<CountryEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/data/countries.jsonl").catch(() => null);
        const text = res && res.ok ? await res.text() : await (await fetch("/data/countries.sample.jsonl")).text();
        const rows = parseJsonl(text);
        const parsed = DatasetSchema.safeParse(rows);
if (!parsed.success) {
  const detail = parsed.error.issues
    .map(i => `${i.path.join(".")}: ${i.message}`)
    .join("\n");
  throw new Error(detail);
}
        if (!cancelled) setEntries(parsed.data);
      } catch (e: any) {
        if (!cancelled) setError(e.message || "Failed to load dataset");
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const todayKey = useMemo(() => getTodayKey(), []);
  const defaultIndex = useMemo(() => entries ? getDailyIndex(entries.length) : 0, [entries]);

  if (error) return <ErrorBox msg={error} />;
  if (!entries) return <Loading />;

  // Responsive aspect wrapper (9:16 by default)
  return (
    <div className="w-full mx-auto">
      <div className="relative aspect-[9/16] max-w-[600px] mx-auto bg-[var(--panel)] rounded-2xl shadow-lg overflow-hidden">
        <div className="absolute inset-0 p-3 sm:p-4">
          <ClassicGame
            entries={entries}
            mode={mode}
            defaultIndex={defaultIndex}
            storageKeyDone={`classicDailyDone:${todayKey}`}
          />
        </div>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="grid place-items-center min-h-[60vh]">
      <div className="animate-pulse opacity-70">Loading…</div>
    </div>
  );
}

function ErrorBox({ msg }: { msg: string }) {
  return (
    <div className="p-4 text-red-200 bg-red-900/30 border border-red-700 rounded-lg">
      <div className="font-semibold mb-1">Dataset error</div>
      <pre className="whitespace-pre-wrap text-sm opacity-90">{msg}</pre>
    </div>
  );
}
