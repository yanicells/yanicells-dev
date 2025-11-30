import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/home/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "yanicells",
  description: "Personal portfolio website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <Navigation />
        <Analytics />
      </body>
    </html>
  );
}
