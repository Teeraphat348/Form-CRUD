import type { Game } from "@/types/game";

export const initialGames: Game[] = [
  {
    id: "1",
    title: "Cyberpunk 2077",
    platform: "PC",
    estimatedHours: 60,
    status: "กำลังเล่น",
  },
  {
    id: "2",
    title: "Baldur's Gate 3",
    platform: "PC",
    estimatedHours: 100,
    status: "ยังไม่เริ่ม",
  },
  {
    id: "3",
    title: "Hades",
    platform: "PC",
    estimatedHours: 35,
    status: "เล่นจบแล้ว",
  },
];