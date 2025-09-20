// src/components/game/ClassicGame.tsx
"use client";
import { useEffect, useMemo, useState } from "react";
import { CountryEntry } from "@/lib/data/schema";
import { normalize } from "@/lib/utils/normalize";
import ClueCard from "./ClueCard";
import Lives from "./Lives";
import ResultCard from "./ResultCard";

export type PlayState = "playing" | "won" | "lost";

interface Props {
  entries: CountryEntry[];
  mode: "daily" | "practice";
  defaultIndex: number;
  storageKeyDone: string;
}

export default function ClassicGame({ entries, mode, defaultIndex, storageKeyDone }: Props) {
  const [idx, setIdx] = useState(defaultIndex);
  const entry = entries[idx];

  const [visibleCount, setVisibleCount] = useState(1);
  const [lives, setLives] = useState(3);
  const [guess, setGuess] = useState("");
  const [state, setState] = useState<PlayState>("playing");
  const [score, setScore] = useState(0);
  const [bubble, setBubble] = useState<string | null>(null);

  // Build valid names list (exact + simple alts)
  const altMap: Record<string, string[]> = {
    "United Kingdom": ["uk", "great britain", "britain", "united kingdom of great britain and northern ireland"],
    "United States": ["usa", "united states of america", "us", "america"],
  };
  const validNames = useMemo(() => {
    const names = new Set<string>();
    entries.forEach(e => {
      names.add(normalize(e.name));
      (altMap[e.name] || []).forEach(a => names.add(normalize(a)));
    });
    return names;
  }, [entries]);

  useEffect(() => {
    // reset when entry changes
    setVisibleCount(1);
    setLives(3);
    setGuess("");
    setState("playing");
    setScore(0);
    setBubble(null);
  }, [idx]);

  function showBubble(msg: string) {
    setBubble(msg);
    setTimeout(() => setBubble(null), 1400);
  }

  function isValidCountry(input: string) {
    return validNames.has(normalize(input));
  }

  function checkWin(input: string) {
    return (
      normalize(input) === normalize(entry.name) ||
      (altMap[entry.name] || []).some(a => normalize(a) === normalize(input))
    );
  }

  function onSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (state !== "playing") return;
    if (!isValidCountry(guess)) {
      showBubble("Please enter a valid country.");
      return;
    }
    if (checkWin(guess)) {
      const tier = visibleCount; // 1..10
      const earned = Math.max(0, 1000 - (tier - 1) * 100); // 1000 → 100
      setScore(earned);
      setState("won");
      try {
        localStorage.setItem(storageKeyDone, "1");
      } catch {}
    } else {
      const next = lives - 1;
      setLives(next);
      showBubble("Incorrect. Reveal another clue or guess again.");
      if (next <= 0) setState("lost");
    }
  }

  function revealNext() {
    if (state !== "playing") return;
    setVisibleCount(v => Math.min(10, v + 1)); // no life cost
  }

  function nextPractice() {
    const r = Math.floor(Math.random() * entries.length);
    setIdx(r);
  }

  const datalistId = "countries-list";

  return (
    <div className="h-full flex flex-col">
      {/* HUD */}
      <div className="flex items-center justify-between mb-2 text-sm opacity-90">
        <div className="font-medium">Classic Mode</div>
        <div className="flex items-center gap-3">
          <Lives lives={lives} max={3} />
          <div className="tabular-nums">Tier {visibleCount}/10</div>
        </div>
      </div>

      {/* Board */}
      {state === "playing" ? (
        <div className="flex-1 overflow-auto rounded-xl border border-white/10 bg-black/10 p-2">
          <div className="space-y-2">
            {entry.tiers.slice(0, visibleCount).map((t, i) => (
              <ClueCard
                key={i}
                tier={i + 1}
                clue={t.clue}
                fact={t.fact}
                isLast={i + 1 === visibleCount}
                showFact={false}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1">
          <ResultCard
            state={state}
            score={score}
            country={entry.name}
            finalTier={visibleCount}
            tiers={entry.tiers}
          />
        </div>
      )}

      {/* Controls */}
      {state === "playing" ? (
        <>
          <form onSubmit={onSubmit} className="mt-2 grid grid-cols-[1fr_auto] gap-2 relative">
            <input
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Type your guess…"
              className="h-11 rounded-lg bg-white/5 border border-white/15 px-3 outline-none focus:border-white/30"
              list={datalistId}
            />
            <datalist id={datalistId}>
              {entries.map((e) => (<option key={e.iso3} value={e.name} />))}
            </datalist>

            {/* Primary Guess button */}
            <button
              type="submit"
              className="btn-primary h-11 px-4 font-medium hover:opacity-90"
            >
              Guess
            </button>

            {bubble && (
              <div className="absolute -top-8 left-0 text-[12px] bg-white text-black px-2 py-1 rounded shadow">
                {bubble}
              </div>
            )}
          </form>

          {/* Reveal button using design tokens for border + radius */}
          <button
            type="button"
            onClick={revealNext}
            disabled={visibleCount >= 10}
            className="h-10 mt-2 rounded-lg hover:opacity-90 disabled:opacity-50"
            style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)" }}
          >
            Reveal next clue
          </button>
        </>
      ) : (
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button onClick={() => setIdx(defaultIndex)} className="h-10 rounded-lg bg-white/90 text-black font-medium hover:bg-white">
            Play Daily Again
          </button>
          <button onClick={nextPractice} className="h-10 rounded-lg border border-white/20 hover:bg-white/5">
            Practice (preview)
          </button>
          <a href="#" className="col-span-2 text-center text-sm opacity-80">
            Practice will be shown only after daily on your website UI
          </a>
        </div>
      )}
    </div>
  );
}
