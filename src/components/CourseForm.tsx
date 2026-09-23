"use client";

import { useState, type FormEvent } from "react";

export type CourseDraft = {
  code: string;
  name: string;
  credit: string | number;
  instructor: string;
};

type CourseFormProps = {
  initialCourse?: CourseDraft & { id?: string };
  onSave: (draft: CourseDraft) => void;
  onCancel?: () => void;
};

export default function CourseForm({ initialCourse, onSave, onCancel }: CourseFormProps) {
  const [code, setCode] = useState(initialCourse?.code ?? "");
  const [name, setName] = useState(initialCourse?.name ?? "");
  const [credit, setCredit] = useState(initialCourse?.credit ? String(initialCourse.credit) : "");
  const [instructor, setInstructor] = useState(initialCourse?.instructor ?? "");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!code.trim() || !name.trim() || !credit || !instructor.trim()) {
      setError("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }
    setError("");
    onSave({ code, name, credit: Number(credit), instructor });

    if (!initialCourse) {
      setCode("");
      setName("");
      setCredit("");
      setInstructor("");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: "#ffffff", padding: "24px", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", marginBottom: "24px", border: "1px solid #e5e7eb" }}>
      <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "16px", color: "#1f2937" }}>
        {initialCourse ? "✏️ แก้ไขข้อมูลรายวิชา" : "➕ เพิ่มรายวิชาใหม่"}
      </h2>
      {error && <p style={{ color: "#ef4444", marginBottom: "12px", fontSize: "0.9rem" }}>{error}</p>}
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", fontWeight: "600", color: "#4b5563" }}>รหัสวิชา</label>
          <input
            type="text"
            placeholder="เช่น CS101"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "0.95rem", outline: "none" }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", fontWeight: "600", color: "#4b5563" }}>ชื่อวิชา</label>
          <input
            type="text"
            placeholder="เช่น Web Programming"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "0.95rem", outline: "none" }}
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", fontWeight: "600", color: "#4b5563" }}>หน่วยกิต</label>
          <input
            type="number"
            placeholder="เช่น 3"
            value={credit}
            onChange={(e) => setCredit(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "0.95rem", outline: "none" }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", fontWeight: "600", color: "#4b5563" }}>ผู้สอน</label>
          <input
            type="text"
            placeholder="ชื่ออาจารย์ผู้สอน"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "0.95rem", outline: "none" }}
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button type="submit" style={{ background: "#2563eb", color: "white", padding: "10px 20px", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "0.95rem" }}>
          {initialCourse ? "บันทึกการแก้ไข" : "บันทึกรายวิชา"}
        </button>
        {initialCourse && onCancel && (
          <button type="button" onClick={onCancel} style={{ background: "#e5e7eb", color: "#374151", padding: "10px 20px", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500", fontSize: "0.95rem" }}>
            ยกเลิก
          </button>
        )}
      </div>
    </form>
  );
}