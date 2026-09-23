"use client";

import { useState } from "react";

// ข้อมูลตัวอย่างรายวิชา
type Course = {
  id: string;
  code: string;
  name: string;
  credit: number;
  status: "เปิดสอน" | "ปิดสอน";
  isFavorite: boolean;
};

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", code: "10301231", name: "เว็บเทคโนโลยี", credit: 3, status: "เปิดสอน", isFavorite: false },
    { id: "2", code: "10301202", name: "โครงสร้างข้อมูล", credit: 3, status: "เปิดสอน", isFavorite: false },
    { id: "3", code: "10301245", name: "ระบบฐานข้อมูล", credit: 3, status: "ปิดสอน", isFavorite: false },
    { id: "4", code: "10301321", name: "วิศวกรรมซอฟต์แวร์", credit: 3, status: "เปิดสอน", isFavorite: false },
  ]);

  const [searchKeyword, setSearchKeyword] = useState("");

  // ฟังก์ชันสลับสถานะรายวิชาโปรด
  const toggleFavorite = (id: string) => {
    setCourses(
      courses.map((c) => (c.id === id ? { ...c, isFavorite: !c.isFavorite } : c))
    );
  };

  // กรองข้อมูลตามคำค้นหา
  const filteredCourses = courses.filter(
    (c) =>
      c.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      c.code.includes(searchKeyword)
  );

  const favoriteCount = courses.filter((c) => c.isFavorite).length;

  return (
    <div style={{ padding: "30px 40px", maxWidth: "1200px", margin: "0 auto", fontFamily: "sans-serif", background: "#f9fafb", minHeight: "100vh" }}>
      {/* หัวข้อหน้า */}
      <h1 style={{ fontSize: "1.75rem", fontWeight: "bold", color: "#111827", marginBottom: "20px" }}>
        รายวิชาทั้งหมด
      </h1>

      {/* แถบค้นหาและปุ่มล้างเงื่อนไข */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", alignItems: "center" }}>
        <input
          type="text"
          placeholder="ค้นหาชื่อวิชาหรือรหัสวิชา..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          style={{ width: "300px", padding: "10px 14px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "0.95rem", outline: "none", background: "#fff" }}
        />
        <button
          onClick={() => setSearchKeyword("")}
          style={{ padding: "10px 16px", background: "#f3f4f6", border: "1px solid #d1d5db", borderRadius: "6px", cursor: "pointer", color: "#374151", fontSize: "0.9rem", fontWeight: "500" }}
        >
          ล้างเงื่อนไข
        </button>
      </div>

      {/* จำนวนรายวิชาโปรด */}
      <p style={{ color: "#4b5563", fontSize: "0.95rem", marginBottom: "20px" }}>
        จำนวนรายวิชาโปรด: <strong>{favoriteCount} วิชา</strong>
      </p>

      {/* แสดงการ์ดรายวิชาแบบ Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
        {filteredCourses.map((course) => {
          const isOpen = course.status === "เปิดสอน";
          return (
            <div
              key={course.id}
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "20px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* ส่วนบน: รหัสวิชา และป้ายสถานะ */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                  <span style={{ fontSize: "0.9rem", color: "#4b5563", fontWeight: "600" }}>
                    {course.code}
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      padding: "3px 10px",
                      borderRadius: "12px",
                      background: isOpen ? "#ecfdf5" : "#fef2f2",
                      color: isOpen ? "#059669" : "#dc2626",
                    }}
                  >
                    {course.status}
                  </span>
                </div>

                {/* ชื่อวิชา */}
                <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#1f2937", margin: "0 0 8px 0" }}>
                  {course.name}
                </h3>

                {/* หน่วยกิต */}
                <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "0 0 20px 0" }}>
                  จำนวนหน่วยกิต: {course.credit} หน่วยกิต
                </p>
              </div>

              {/* ปุ่มเพิ่มเป็นรายวิชาโปรด */}
              <button
                onClick={() => toggleFavorite(course.id)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #d1d5db",
                  background: course.isFavorite ? "#fce7f3" : "#f9fafb",
                  color: course.isFavorite ? "#be185d" : "#374151",
                  fontSize: "0.85rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <span>{course.isFavorite ? "💜" : "🤍"}</span>
                {course.isFavorite ? "ลอกจากรายวิชาโปรด" : "เพิ่มเป็นรายวิชาโปรด"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}