// src/components/game/ClueCard.tsx
"use client";

export default function ClueCard({
  tier,
  clue,
  fact,
  isLast,
  showFact = false,
}: {
  tier: number;
  clue: string;
  fact: string;
  isLast?: boolean;
  showFact?: boolean;
}) {
  return (
    // ✅ New outer wrapper using the helper class
    <div className="embed-surface p-3">
      {/* Existing card content remains unchanged inside */}
      <div className="rounded-lg border border-white/10 bg-white/3 p-3">
        <div className="text-xs uppercase tracking-wide opacity-60 mb-1">
          Clue {tier}
        </div>
        <div className="text-base leading-5">{clue}</div>
        {showFact && (
          <div className="mt-2 text-xs opacity-80">{fact}</div>
        )}
        {isLast && (
          <div className="mt-2 text-[10px] uppercase opacity-50">
            (Most recently revealed)
          </div>
        )}
      </div>
    </div>
  );
}
