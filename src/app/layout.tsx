// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css"; // keep this path exactly as-is

export const metadata: Metadata = {
  title: "GeoGains",
  description: "Classic geography guessing game",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
        {children}
      </body>
    </html>
  );
}
