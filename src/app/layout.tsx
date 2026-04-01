import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Color of Soul - Find Your Color of Soul",
  description:
    "Color of Soul은 보이지 않는 운명의 데이터를 보이는 빛의 언어로 번역합니다. Find your unique wavelength through Mingliology and physics-based spectrum theory.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geist.variable} ${geistMono.variable} ${playfair.variable} font-sans antialiased selection:bg-[#00FF88]/30`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
