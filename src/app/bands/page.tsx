import BandExplorer from "@/components/BandExplorer";
import { bands } from "@/data/bands";

export default function BandsPage() {
  return (
    <main style={{ padding: "32px 48px", textAlign: "left" }}>
      <h1 style={{ marginBottom: "20px" }}>วงดนตรีโปรด</h1>
      <BandExplorer bands={bands} />
    </main>
  );
}