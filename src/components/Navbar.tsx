import Link from "next/link";

export default function Navbar() {
  const linkStyle = {
    color: "#ffffff",
    textDecoration: "none",
    margin: "0 15px",
    fontSize: "16px",
    fontWeight: "500",
  };

  return (
    <nav
      style={{
        backgroundColor: "#064e3b",
        padding: "16px 0",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <Link href="/" style={linkStyle}>
          หน้าแรก
        </Link>
        <Link href="/courses" style={linkStyle}>
          รายวิชา
        </Link>
        <Link href="/about" style={linkStyle}>
          เกี่ยวกับ
        </Link>
        <Link href="/bands" style={linkStyle}>
          วงดนตรีโปรด
        </Link>
        <Link href="/games" style={linkStyle}>
          เกม
        </Link>
      </div>
    </nav>
  );
}