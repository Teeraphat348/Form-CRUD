"use client";

import { useState, type ChangeEvent } from "react";
import Link from "next/link";
import CourseForm, { type CourseDraft } from "./CourseForm";

export type Course = CourseDraft & {
  id: string;
};

type CourseExplorerProps = {
  initialCourses: Course[];
};

export default function CourseExplorer({ initialCourses }: CourseExplorerProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [keyword, setKeyword] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleCreate(draft: CourseDraft) {
    const newCourse: Course = {
      id: crypto.randomUUID(),
      ...draft,
    };
    setCourses([...courses, newCourse]);
  }

  function handleDelete(id: string) {
    setCourses(courses.filter((c) => c.id !== id));
  }

  function handleUpdate(id: string, draft: CourseDraft) {
    setCourses(
      courses.map((c) => (c.id === id ? { ...c, ...draft } : c))
    );
    setEditingId(null);
  }

  function handleSave(draft: CourseDraft) {
    if (editingId === null) {
      handleCreate(draft);
      return;
    }
    handleUpdate(editingId, draft);
  }

  const searchText = keyword.trim().toLowerCase();
  const filteredCourses = courses.filter(
    (c) =>
      c.name.toLowerCase().includes(searchText) ||
      c.code.toLowerCase().includes(searchText)
  );

  const editingCourse = courses.find((c) => c.id === editingId);

  return (
    <div>
      {/* Search Bar */}
      <div style={{ marginBottom: "24px", background: "#ffffff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", border: "1px solid #e5e7eb" }}>
        <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", fontWeight: "600", color: "#4b5563" }}>ค้นหารายวิชา</label>
        <input
          type="text"
          placeholder="🔍 ค้นหาด้วยชื่อวิชา หรือรหัสวิชา..."
          value={keyword}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
          style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "0.95rem", outline: "none" }}
        />
      </div>

      {/* Form */}
      <CourseForm
        key={editingId ?? "new"}
        initialCourse={editingCourse}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />

      {/* Course List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {filteredCourses.length === 0 ? (
          <p style={{ textAlign: "center", padding: "40px", color: "#6b7280", background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb" }}>ไม่พบรายการรายวิชา</p>
        ) : (
          filteredCourses.map((course) => (
            <article key={course.id} style={{ border: "1px solid #e5e7eb", padding: "20px 24px", borderRadius: "12px", background: "#ffffff", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: "0.85rem", color: "#2563eb", fontWeight: "bold", background: "#eff6ff", padding: "4px 10px", borderRadius: "20px", display: "inline-block", marginBottom: "8px" }}>
                  {course.code}
                </span>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "1.25rem", fontWeight: "bold", color: "#1f2937" }}>
                  {course.name}
                </h3>
                <p style={{ margin: "0 0 4px 0", color: "#4b5563", fontSize: "0.9rem" }}>📚 หน่วยกิต: <strong>{course.credit}</strong> | 👨‍🏫 ผู้สอน: <strong>{course.instructor}</strong></p>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <Link href={`/courses/${course.id}`} style={{ padding: "8px 14px", background: "#f3f4f6", border: "1px solid #d1d5db", borderRadius: "6px", textDecoration: "none", color: "#374151", fontSize: "0.9rem", fontWeight: "500" }}>
                  🔍 ดูรายละเอียด
                </Link>
                <button type="button" onClick={() => setEditingId(course.id)} style={{ padding: "8px 14px", background: "#2563eb", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.9rem", fontWeight: "500" }}>
                  ✏️ แก้ไข
                </button><button type="button" onClick={() => handleDelete(course.id)} style={{ padding: "8px 14px", background: "#dc2626", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.9rem", fontWeight: "500" }}>
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