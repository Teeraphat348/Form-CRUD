"use client";

import { useState, type FormEvent } from "react";
import type { Game, GameStatus } from "@/types/game";

export type GameDraft = {
  title: string;
  platform: string;
  estimatedHours: string | number;
  status: GameStatus;
};

type GameFormProps = {
  initialGame?: Game;
  onSave: (draft: GameDraft) => void;
  onCancel?: () => void;
};

export default function GameForm({ initialGame, onSave, onCancel }: GameFormProps) {
  const [title, setTitle] = useState(initialGame?.title ?? "");
  const [platform, setPlatform] = useState(initialGame?.platform ?? "");
  const [estimatedHours, setEstimatedHours] = useState(
    initialGame?.estimatedHours ? String(initialGame.estimatedHours) : ""
  );
  const [status, setStatus] = useState<GameStatus>(initialGame?.status ?? "ยังไม่เริ่ม");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !platform.trim() || !estimatedHours) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    setError("");
    onSave({ title, platform, estimatedHours: Number(estimatedHours), status });

    if (!initialGame) {
      setTitle("");
      setPlatform("");
      setEstimatedHours("");
      setStatus("ยังไม่เริ่ม");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: "#ffffff", padding: "24px", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", marginBottom: "24px", border: "1px solid #e5e7eb" }}>
      <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "16px", color: "#1f2937" }}>
        {initialGame ? "✏️ แก้ไขข้อมูลเกม" : "➕ เพิ่มเกมใหม่"}
      </h2>
      {error && <p style={{ color: "#ef4444", marginBottom: "12px", fontSize: "0.9rem" }}>{error}</p>}
      
      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", fontWeight: "600", color: "#4b5563" }}>ชื่อเกม</label>
        <input
          type="text"
          placeholder="เช่น Cyberpunk 2077"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "0.95rem", outline: "none" }}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", fontWeight: "600", color: "#4b5563" }}>แพลตฟอร์ม</label>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "0.95rem", background: "#fff", outline: "none" }}
        >
          <option value="">-- เลือกแพลตฟอร์ม --</option>
          <option value="PC">PC</option>
          <option value="PlayStation 5">PlayStation 5</option>
          <option value="Xbox Series X|S">Xbox Series X|S</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
          <option value="Mobile">Mobile</option>
        </select>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", fontWeight: "600", color: "#4b5563" }}>จำนวนชั่วโมงที่คาดว่าจะใช้เล่น</label>
        <input
          type="number"
          placeholder="เช่น 25"
          value={estimatedHours}
          onChange={(e) => setEstimatedHours(e.target.value)}
          style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "0.95rem", outline: "none" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", fontWeight: "600", color: "#4b5563" }}>สถานะ</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as GameStatus)}
          style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "0.95rem", background: "#fff", outline: "none" }}
        >
          <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
          <option value="กำลังเล่น">กำลังเล่น</option>
          <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
        </select>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button type="submit" style={{ background: "#059669", color: "white", padding: "10px 20px", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "0.95rem" }}>
          {initialGame ? "บันทึกการแก้ไข" : "เพิ่มเกม"}
        </button>
        {initialGame && onCancel && (
          <button type="button" onClick={onCancel} style={{ background: "#e5e7eb", color: "#374151", padding: "10px 20px", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500", fontSize: "0.95rem" }}>
            ยกเลิก
          </button>
        )}
      </div>
    </form>
  );
}