import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Relocate2Day | Your New Chapter in Europe Starts Here",
  description: "Thinking of moving to Europe? Compare countries, understand your visa options and plan your relocation — all in one place.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon_32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: { url: "/favicon_180.png", sizes: "180x180", type: "image/png" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
