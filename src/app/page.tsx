export default function HomePage() {
  const siteName: string = "Student Course Hub";
  const description: string = "ศูนย์รวมข้อมูลรายวิชาและแหล่งเรียนรู้สำหรับนักศึกษา";

  const courseCount: number = 3;
  const isOpen: boolean = true;

  const topics: string[] = ["HTML", "CSS", "TypeScript", "Next.js"];

  return (
    <main style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>{siteName}</h1>
      
      <p>{description}</p>

      <section style={{ marginTop: "20px", marginBottom: "20px" }}>
        <h2>กลุ่มผู้ใช้งานที่เหมาะสม</h2>
        <p>เว็บไซต์นี้เหมาะสำหรับนักศึกษาที่ต้องการค้นหารายวิชาและติดตามเนื้อหาการเรียน</p>
      </section>

      <div>
        <p>จำนวนรายวิชา: {courseCount}</p>
        <p>สถานะระบบ: {isOpen ? "เปิดใช้งาน" : "ปิดใช้งาน"}</p>

        <h3>หัวข้อการเรียนรู้</h3>
        <ul>
          {topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}