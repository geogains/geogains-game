"use client";
import { useEffect } from "react";

const hex = (s?: string | null) => (s ? (s.startsWith("#") ? s : `#${s}`) : undefined);

export default function ThemeBridge() {
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const set = (k: string, v?: string) => v && document.documentElement.style.setProperty(k, v);

    set("--bg",     hex(p.get("bg")));
    set("--fg",     hex(p.get("text")));
    set("--panel",  hex(p.get("panel")));
    set("--border", hex(p.get("border")));
    set("--accent", hex(p.get("accent")));
    const r = p.get("radius"); if (r) set("--radius", `${r}px`);

    const font = p.get("font");
    if (font) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@400;600;700&display=swap`;
      document.head.appendChild(link);
      set("--font", `'${font}', system-ui, sans-serif`);
    }
  }, []);

  return null;
}
