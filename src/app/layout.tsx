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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Studio COS | 당신 안의 빛을 마주하는 시간",
  description:
    "퍼스널 컬러와 빛을 통해 진정한 나를 발견하는 스튜디오, COS",
  openGraph: {
    title: "Studio COS | 당신 안의 빛을 마주하는 시간",
    description:
      "퍼스널 컬러와 빛을 통해 진정한 나를 발견하는 스튜디오, COS",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio COS | 당신 안의 빛을 마주하는 시간",
    description:
      "퍼스널 컬러와 빛을 통해 진정한 나를 발견하는 스튜디오, COS",
    images: ["/og-image.jpg"],
  },
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
