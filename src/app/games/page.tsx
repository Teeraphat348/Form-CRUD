import { initialGames } from "@/data/games";
import GameExplorer from "@/components/GameExplorer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Game Backlog",
};

export default function GamesPage() {
  return (
    <main style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto", background: "#f9fafb", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2.25rem", marginBottom: "24px", fontWeight: "bold", color: "#111827", textAlign: "center" }}>🎮 Game Backlog</h1>
      <GameExplorer initialGames={initialGames} />
    </main>
  );
}