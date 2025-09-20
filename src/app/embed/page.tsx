// src/app/embed/page.tsx
import GameEmbed from "@/components/game/GameEmbed";

export const revalidate = 0; // always fresh

export default function EmbedPage() {
  // Minimal surface for iframe — no nav, no margins
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <GameEmbed mode="daily" />
    </div>
  );
}
