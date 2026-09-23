import { initialGames } from "@/data/games";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function GameDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const game = initialGames.find((g) => g.id === resolvedParams.id);

  if (!game) {
    notFound();
  }

  return (
    <main style={{ padding: "40px 20px", maxWidth: "600px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <Link href="/games" style={{ color: "#059669", textDecoration: "none", fontWeight: "600", display: "inline-block", marginBottom: "20px" }}>
        ← กลับไปหน้าหลัก
      </Link>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px", color: "#1f2937" }}>{game.title}</h1>
      <div style={{ padding: "24px", border: "1px solid #e5e7eb", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)", background: "#ffffff", display: "flex", flexDirection: "column", gap: "12px" }}>
        <p style={{ fontSize: "1.05rem", margin: 0 }}><strong>แพลตฟอร์ม:</strong> {game.platform}</p>
        <p style={{ fontSize: "1.05rem", margin: 0 }}><strong>เวลาที่คาดว่าจะใช้:</strong> {game.estimatedHours} ชั่วโมง</p>
        <p style={{ fontSize: "1.05rem", margin: 0 }}><strong>สถานะ:</strong> <span style={{ color: "#059669", fontWeight: "bold" }}>{game.status}</span></p>
      </div>
    </main>
  );
}