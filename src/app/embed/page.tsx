import ThemeBridge from "@/components/theme/Bridge";
import GameEmbed from "@/components/game/GameEmbed";
export default function EmbedPage() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "var(--bg)",
        color: "var(--fg)",
        fontFamily: "var(--font)",
        display: "grid",
        placeItems: "center",
        padding: "16px"
      }}
    >
      <ThemeBridge />
      <div className="w-full max-w-[640px]">
        <GameEmbed />
      </div>
    </div>
  );
}
