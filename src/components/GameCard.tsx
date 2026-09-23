import Link from "next/link";
import type { Game } from "@/types/game";

type GameCardProps = {
  game: Game;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
};

export default function GameCard({ game, onEdit, onDelete, onToggleStatus }: GameCardProps) {
  return (
    <article style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px", marginBottom: "12px", background: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <span style={{ fontSize: "0.85rem", color: "#0f766e", fontWeight: "bold" }}>{game.status}</span>
          <h2 style={{ margin: "4px 0" }}>{game.title}</h2>
          <p style={{ margin: "2px 0", color: "#555" }}>แพลตฟอร์ม: {game.platform}</p>
          <p style={{ margin: "2px 0", color: "#555" }}>ชั่วโมงที่คาดว่าจะเล่น: {game.estimatedHours} ชั่วโมง</p>
        </div>
        <button
          type="button"
          onClick={onToggleStatus}
          style={{ background: "#0f766e", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}
        >
          เปลี่ยนสถานะ
        </button>
      </div>

      <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
        <Link href={`/games/${game.id}`} style={{ padding: "6px 12px", background: "#f0f0f0", border: "1px solid #ccc", borderRadius: "4px", textDecoration: "none", color: "#333" }}>
          ดูรายละเอียด
        </Link>
        <button type="button" onClick={onEdit} style={{ padding: "6px 12px", background: "#15803d", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          แก้ไข
        </button>
        <button type="button" onClick={onDelete} style={{ padding: "6px 12px", background: "#b91c1c", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          ลบ
        </button>
      </div>
    </article>
  );
}