"use client";

import { useState, type ChangeEvent } from "react";
import type { Game, GameStatus } from "@/types/game";
import GameForm, { type GameDraft } from "@/components/GameForm";
import Link from "next/link";

type GameExplorerProps = {
  initialGames: Game[];
};

export default function GameExplorer({ initialGames }: GameExplorerProps) {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ทั้งหมด");
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleCreate(draft: GameDraft) {
    const newGame: Game = {
      id: crypto.randomUUID(),
      title: draft.title.trim(),
      platform: draft.platform,
      estimatedHours: Number(draft.estimatedHours),
      status: draft.status,
    };
    setGames([...games, newGame]);
  }

  function handleDelete(id: string) {
    setGames(games.filter((g) => g.id !== id));
  }

  function handleUpdate(id: string, draft: GameDraft) {
    setGames(
      games.map((g) =>
        g.id === id
          ? {
              ...g,
              title: draft.title.trim(),
              platform: draft.platform,
              estimatedHours: Number(draft.estimatedHours),
              status: draft.status,
            }
          : g
      )
    );
    setEditingId(null);
  }

  function handleStatusToggle(id: string) {
    const statusCycle: GameStatus[] = ["ยังไม่เริ่ม", "กำลังเล่น", "เล่นจบแล้ว"];
    setGames(
      games.map((g) => {
        if (g.id === id) {
          const currentIndex = statusCycle.indexOf(g.status);
          const nextStatus = statusCycle[(currentIndex + 1) % statusCycle.length];
          return { ...g, status: nextStatus };
        }
        return g;
      })
    );
  }

  function handleSave(draft: GameDraft) {
    if (editingId === null) {
      handleCreate(draft);
      return;
    }
    handleUpdate(editingId, draft);
  }

  const searchText = keyword.trim().toLowerCase();
  const filteredGames = games.filter((g) => {
    const matchesKeyword = g.title.toLowerCase().includes(searchText);
    const matchesStatus = statusFilter === "ทั้งหมด" || g.status === statusFilter;
    return matchesKeyword && matchesStatus;
  });

  const editingGame = games.find((g) => g.id === editingId);

  return (
    <div>
      {/* Search & Filter Bar */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "24px", alignItems: "center", background: "#ffffff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", border: "1px solid #e5e7eb" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", fontWeight: "600", color: "#4b5563" }}>ค้นหาชื่อเกม</label>
          <input
            type="text"
            placeholder="พิมพ์ชื่อเกมที่ต้องการค้นหา..."
            value={keyword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "0.95rem", outline: "none" }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", fontWeight: "600", color: "#4b5563" }}>กรองสถานะ</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: "10px 12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "0.95rem", background: "#fff", outline: "none" }}
          >
            <option value="ทั้งหมด">ทั้งหมด</option>
            <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
            <option value="กำลังเล่น">กำลังเล่น</option>
            <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
          </select>
        </div>
      </div>

      {/* Form */}
      <GameForm
        key={editingId ?? "new"}
        initialGame={editingGame}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />

      {/* Game List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {filteredGames.length === 0 ? (
          <p style={{ textAlign: "center", padding: "40px", color: "#6b7280", background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb" }}>ไม่พบรายการเกม</p>
        ) : (
          filteredGames.map((game) => (
            <article key={game.id} style={{ border: "1px solid #e5e7eb", padding: "24px", borderRadius: "12px", background: "#ffffff", position: "relative", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}>
              {/* Top-right Status Button */}
              <button
                type="button"
                onClick={() => handleStatusToggle(game.id)}
                style={{ position: "absolute", top: "24px", right: "24px", background: "#059669", color: "white", padding: "8px 16px", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "0.85rem", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
              >
                🔄เปลี่ยนสถานะ
              </button>

              <div style={{ paddingRight: "140px", marginBottom: "16px" }}>
                <span style={{ fontSize: "0.85rem", color: "#047857", fontWeight: "bold", background: "#ecfdf5", padding: "4px 10px", borderRadius: "20px", display: "inline-block", marginBottom: "8px" }}>
                  ● {game.status}
                </span>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "1.35rem", fontWeight: "bold", color: "#1f2937" }}>{game.title}</h3>
                <p style={{ margin: "0 0 4px 0", color: "#4b5563", fontSize: "0.95rem" }}>🎮 แพลตฟอร์ม: <strong>{game.platform}</strong></p>
                <p style={{ margin: "0", color: "#4b5563", fontSize: "0.95rem" }}>⏱️ ชั่วโมงที่คาดว่าจะเล่น: <strong>{game.estimatedHours} ชั่วโมง</strong></p>
              </div>

              <div style={{ display: "flex", gap: "8px", borderTop: "1px solid #f3f4f6", paddingTop: "16px" }}>
                <Link href={`/games/${game.id}`} style={{ padding: "8px 16px", background: "#f3f4f6", border: "1px solid #d1d5db", borderRadius: "6px", textDecoration: "none", color: "#374151", fontSize: "0.9rem", fontWeight: "500" }}>
                  🔍 ดูรายละเอียด
                </Link>
                <button type="button" onClick={() => setEditingId(game.id)} style={{ padding: "8px 16px", background: "#2563eb", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.9rem", fontWeight: "500" }}>
                  ✏️ แก้ไข
                </button>
                <button type="button" onClick={() => handleDelete(game.id)} style={{ padding: "8px 16px", background: "#dc2626", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.9rem", fontWeight: "500" }}>
                  🗑️ ลบ
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}