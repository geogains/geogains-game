// src/app/play/page.tsx
import GameEmbed from "@/components/game/GameEmbed";

export const revalidate = 0;

export default function PlayPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)] p-4 flex items-center justify-center">
      <div className="w-full max-w-[640px]">
        <h1 className="text-2xl font-semibold mb-4">GeoGains — Classic</h1>
        <GameEmbed mode="daily" />
      </div>
    </main>
  );
}
