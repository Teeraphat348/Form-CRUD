import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { courses } from "@/data/courses";

type CoursePageProps = {
  params: Promise<{ id: string }>;
};

// กำหนด Metadata ตามชื่อรายวิชาจริง
export async function generateMetadata(
  { params }: CoursePageProps
): Promise<Metadata> {
  const { id } = await params;
  const course = courses.find((item) => item.id === id);
  return {
    title: course ? course.name : "ไม่พบรายวิชา",
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = courses.find((item) => item.id === id);

  // ถ้าไม่พบรายวิชา ให้แสดงหน้า 404
  if (!course) {
    notFound();
  }

  return (
    <article>
      <h1>{course.name}</h1>
      <p>รหัสวิชา: {course.code}</p>
      <p>หน่วยกิต: {course.credit}</p>
      <p>ผู้สอน: {course.instructor}</p>
    </article>
  );
}