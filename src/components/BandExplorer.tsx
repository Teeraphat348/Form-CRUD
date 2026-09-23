"use client";

import { useState, type ChangeEvent } from "react";
import type { Band } from "@/types/band";

type BandExplorerProps = {
  bands: Band[];
};

export default function BandExplorer({ bands }: BandExplorerProps) {
  const [keyword, setKeyword] = useState("");
  const [followedIds, setFollowedIds] = useState<string[]>([]);
  const [likes, setLikes] = useState<Record<string, number>>({});

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleToggleFollow(id: string | number) {
    const stringId = String(id);
    setFollowedIds((prev) =>
      prev.includes(stringId) ? prev.filter((bandId) => bandId !== stringId) : [...prev, stringId]
    );
  }

  function handleLike(id: string | number) {
    const stringId = String(id);
    setLikes((prev) => ({
      ...prev,
      [stringId]: (prev[stringId] || 0) + 1,
    }));
  }

  function handleReset() {
    setKeyword("");
  }

  const searchText = keyword.trim().toLowerCase();

  const visibleBands = bands.filter(
    (band) =>
      band.name.toLowerCase().includes(searchText) ||
      band.genre.toLowerCase().includes(searchText)
  );

  return (
    <div style={{ padding: "32px 48px", fontFamily: "sans-serif" }}>
      <h1 style={{ marginBottom: "20px", fontSize: "28px", fontWeight: "bold" }}>วงดนตรีโปรด</h1>

      <div style={{ marginBottom: "16px", display: "flex", gap: "12px", alignItems: "center" }}>
        <input
          type="search"
          aria-label="ค้นหาชื่อวงหรือแนวเพลง"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหาชื่อวงหรือแนวเพลง..."
          style={{ padding: "8px 12px", width: "300px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button
          type="button"
          onClick={handleReset}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            borderRadius: "4px",
            border: "1px solid #ccc",
            background: "#f9f9f9",
          }}
        >
          ล้างการค้นหา
        </button>
      </div>

      <p style={{ marginBottom: "24px", fontWeight: "bold" }}>
        จำนวนวงที่ติดตามอยู่: {followedIds.length} วง
      </p>

      {visibleBands.length === 0 ? (
        <p style={{ color: "#d9534f", marginTop: "20px" }}>ไม่พบวงดนตรีที่ตรงกับเงื่อนไข</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "20px" }}>
          {visibleBands.map((band) => {
            const stringId = String(band.id);
            const isFollowed = followedIds.includes(stringId);
            const likeCount = likes[stringId] || 0;

            return (
              <div
                key={band.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "16px",
                  background: "#fff",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                }}
              >
                <img
                  src={band.image}
                  alt={band.name}
                  style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "6px" }}
                />
                <h2 style={{ marginTop: "12px", fontSize: "20px" }}>{band.name}</h2>
                <p style={{ color: "#666", fontSize: "14px" }}>แนวเพลง: {band.genre}</p>
                <p style={{ margin: "8px 0", fontSize: "14px" }}>{band.description}</p>
                <p style={{ fontSize: "14px", fontWeight: "bold" }}>จำนวนสมาชิก: {band.members.length} คน</p>

                <div style={{ marginTop: "12px" }}>
                  <p style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "6px" }}>สมาชิกในวง:</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {band.members.map((member, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          background: "#f9f9f9",
                          padding: "6px 10px",
                          borderRadius: "6px",
                        }}
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }}
                        />
                        <div style={{ fontSize: "13px" }}>
                          <div style={{ fontWeight: "bold" }}>{member.name}</div>
                          <div style={{ color: "#555" }}>({member.role})</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                  <button
                    type="button"
                    onClick={() => handleLike(band.id)}
                    style={{ padding: "6px 12px", cursor: "pointer", borderRadius: "4px", border: "1px solid #ccc", background: "#fff" }}
                  >
                    ❤️ Like ({likeCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleFollow(band.id)}
                    style={{
                      padding: "6px 12px",
                      cursor: "pointer",
                      background: isFollowed ? "#d9534f" : "#f0f0f0",
                      color: isFollowed ? "#fff" : "#000",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  >
                    {isFollowed ? "เลิกติดตาม" : "ติดตาม"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}