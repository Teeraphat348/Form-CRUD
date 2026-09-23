"use client";

import { useState } from "react";
import type { Band } from "@/types/band";

type BandCardProps = {
  band: Band;
  isFollowed?: boolean;
  onToggleFollow?: (id: string | number) => void; // ใส่ ? ให้เป็น optional
};

export default function BandCard({ 
  band, 
  isFollowed = false, 
  onToggleFollow = () => {} // กำหนดค่าเริ่มต้นเป็นฟังก์ชันเปล่าๆ ป้องกัน Error
}: BandCardProps) {
  const [likes, setLikes] = useState(0);

  return (
    <article style={{ 
      border: "1px solid #ccc", 
      padding: "16px", 
      borderRadius: "8px", 
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      width: "100%",
      maxWidth: "500px"
    }}>
      {band.image && (
        <img
          src={band.image}
          alt={band.name}
          style={{ 
            width: "100%", 
            height: "200px", 
            objectFit: "cover", 
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
            marginBottom: "12px",
            border: "1px solid #eee"
          }}
        />
      )}

      <div style={{ padding: "0 4px" }}>
        <h2 style={{ margin: "0 0 8px 0", fontSize: "1.5rem" }}>{band.name}</h2>
        <p style={{ margin: "4px 0" }}><strong>แนวเพลง:</strong> {band.genre}</p>
        <p style={{ margin: "4px 0" }}>{band.description}</p>
        <p style={{ margin: "4px 0" }}><strong>จำนวนสมาชิก:</strong> {band.members.length} คน</p>

        <div style={{ marginTop: "16px" }}>
          <h4 style={{ margin: "0 0 8px 0" }}>สมาชิกในวง:</h4>
          <ul style={{ 
            listStyle: "none", 
            padding: 0, 
            margin: 0, 
            display: "flex", 
            flexDirection: "column", 
            gap: "8px" 
          }}>
            {band.members.map((member, index) => (
              <li key={index} style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "10px", 
                background: "#f9f9f9", 
                padding: "6px 10px", 
                borderRadius: "20px", 
                fontSize: "0.9rem",
                border: "1px solid #eaeaea"
              }}>
                {member.image && (
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{ 
                      width: "35px", 
                      height: "35px", 
                      borderRadius: "50%", 
                      objectFit: "cover" 
                    }}
                  />
                )}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontWeight: "600" }}>{member.name}</span>
                  <span style={{ fontSize: "0.8rem", color: "#666" }}>({member.role})</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ margin: "20px 0 0 0", display: "flex", gap: "10px" }}>
          <button type="button" onClick={() => setLikes(likes + 1)} style={{ padding: "8px 16px", cursor: "pointer", background: "#f0f0f0", border: "1px solid #ccc", borderRadius: "4px" }}>
            ❤️ Like ({likes})
          </button>
          <button
            type="button"
            aria-pressed={isFollowed}
            onClick={() => onToggleFollow(band.id)} // เรียกใช้งานฟังก์ชันอย่างปลอดภัย
            style={{ padding: "8px 16px", cursor: "pointer", background: isFollowed ? "#e6e6e6" : "white", border: "1px solid #ccc", borderRadius: "4px" }}
          >
            {isFollowed ? "กำลังติดตาม" : "ติดตาม"}
          </button>
        </div>
      </div>
    </article>
  );
}