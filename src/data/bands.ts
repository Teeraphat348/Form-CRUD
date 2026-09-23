import type { Band } from "@/types/band";

export const bands: Band[] = [
  {
    id: "1",
    name: "25hours",
    genre: "Alternative Rock / Britpop",
    image: "/images/bands/25hours.jpg",
    description: "เจ้าของเพลง ทำได้เพียง, ยินดีที่ไม่รู้จัก และ ไม่เคย",
    members: [
      { name: "สมพล รุ่งพาณิชย์ (แหลม)", role: "ร้องนำ", image: "/images/bands/members/25hours/laem.jpg" },
      { name: "ประทีป สิริอิสสระนันท์ (โฟร์)", role: "กีตาร์", image: "/images/bands/members/25hours/four.jpg" },
      { name: "ปิยวัฒน์ มีเครือ (ปู)", role: "กีตาร์", image: "/images/bands/members/25hours/pu.jpg" },
      { name: "เอกศิริ กำบังภัย (ปัง)", role: "เบส", image: "/images/bands/members/25hours/bang.jpg" },
      { name: "กฤตพงศ์ สกุลนามอนนท์ (จ๊อบ)", role: "กลอง", image: "/images/bands/members/25hours/job.jpg" },
    ],
  },
  {
    id: "2",
    name: "Three Man Down",
    genre: "Pop Rock",
    image: "/images/bands/Three Man Down.jpg",
    description: "เจ้าของเพลง ฝนตกไหม และ ถ้าเธอรักฉันจริง",
    members: [
      { name: "กฤตย์ จีรพัฒนานุวงศ์ (กิต)", role: "ร้องนำ", image: "/images/bands/members/Three Man Down/kit.jpg" },
      { name: "วีรภัทร ธรรมจำรัส (ตูน)", role: "กีตาร์", image: "/images/bands/members/Three Man Down/toon.jpg" },
      { name: "เสฏฐนันท์ พรหมจิรพัทธ์ (เต)", role: "กลอง", image: "/images/bands/members/Three Man Down/tay.jpg" },
    ],
  },
  {
    id: "3",
    name: "SERIOUS BACON",
    genre: "Pop",
    image: "/images/bands/SERIOUS BACON.jpg",
    description: "เจ้าของเพลง พี่ๆ ตัดแว่นให้หน่อย และ ไม่พิเศษ",
    members: [
      { name: "เค้ก", role: "ร้องนำ/กีตาร์", image: "/images/bands/members/SERIOUS BACON/cake.jpg" },
      { name: "เมือง", role: "กีตาร์", image: "/images/bands/members/SERIOUS BACON/muang.jpg" },
    ],
  },
];