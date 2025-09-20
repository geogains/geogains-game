// src/components/game/ResultCard.tsx
"use client";
import type { PlayState } from "./ClassicGame";
import type { Tier } from "@/lib/data/schema";

export default function ResultCard({
  state,
  score,
  country,
  finalTier,
  tiers,
}: {
  state: PlayState;
  score: number;
  country: string;
  finalTier: number;
  tiers: Tier[];
}) {
  return (
    <div className="h-full overflow-auto p-2">
      {/* ✅ New outer wrapper using helper class */}
      <div className="embed-surface p-5 text-center max-w-sm w-full mx-auto">
        {/* Existing card content kept inside */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
          <div className="text-xs uppercase tracking-wide opacity-60 mb-1">
            Result
          </div>
          <div className="text-2xl font-semibold mb-2">
            {state === "won" ? "You got it!" : "Out of lives"}
          </div>
          <div className="opacity-80 mb-4">
            Country: <span className="font-medium">{country}</span>
          </div>
          <div className="text-lg font-semibold mb-1">Score: {score}</div>
          <div className="text-xs opacity-70 mb-4">
            Solved at tier {finalTier} / 10
          </div>

          <div className="text-left">
            <div className="text-sm font-medium mb-2">Learn more</div>
            <div className="space-y-2">
              {tiers.map((t, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-white/10 bg-white/3 p-3"
                >
                  <div className="text-xs uppercase tracking-wide opacity-60 mb-1">
                    Clue {i + 1}
                  </div>
                  <div className="text-sm opacity-90">{t.fact}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
