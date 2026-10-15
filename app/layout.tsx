import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title:"Mufradatku — Sedikit kata, banyak cerita", description:"Belajar kosakata bahasa Arab dengan kartu interaktif, pelafalan, dan latihan ingatan." };
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="id"><body>{children}</body></html>}
