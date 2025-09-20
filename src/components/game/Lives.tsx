// src/components/game/Lives.tsx
"use client";

export default function Lives({ lives, max = 3 }: { lives: number; max?: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Lives ${lives} of ${max}`}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} role="img" aria-hidden className="text-lg leading-none">
          {i < lives ? "❤️" : "🤍"}
        </span>
      ))}
    </div>
  );
}
