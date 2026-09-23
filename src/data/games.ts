export type GameStatus = "ยังไม่เริ่ม" | "กำลังเล่น" | "เล่นจบแล้ว";

export type Game = {
  id: string;
  title: string;
  platform: string;
  estimatedHours: number;
  status: GameStatus;
};

// กำหนดให้มีทั้งหมด 5 เกมพอดีครับ
export const initialGames: Game[] = [
  {
    id: "1",
    title: "Cyberpunk 2077",
    platform: "PC",
    estimatedHours: 50,
    status: "กำลังเล่น",
  },
  {
    id: "2",
    title: "Elden Ring",
    platform: "PlayStation 5",
    estimatedHours: 80,
    status: "ยังไม่เริ่ม",
  },
  {
    id: "3",
    title: "The Legend of Zelda: Tears of the Kingdom",
    platform: "Nintendo Switch",
    estimatedHours: 60,
    status: "เล่นจบแล้ว",
  },
  {
    id: "4",
    title: "VALORANT",
    platform: "PC",
    estimatedHours: 100,
    status: "กำลังเล่น",
  },
  {
    id: "5",
    title: "Genshin Impact",
    platform: "Mobile",
    estimatedHours: 120,
    status: "กำลังเล่น",
  },
];