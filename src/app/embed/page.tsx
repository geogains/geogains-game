import ThemeBridge from "@/components/theme/Bridge";
import ClassicGame from "@/components/game/ClassicGame";
import { entries, defaultIndex } from "@/lib/data/daily"; // your existing imports

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
        <ClassicGame
          entries={entries}
          mode="daily"
          defaultIndex={defaultIndex}
          storageKeyDone="gg_daily_done"
        />
      </div>
    </div>
  );
}
