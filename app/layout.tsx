import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/assets/styles/navbar.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CV Builder",
  description: "Professional Resume Maker",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
