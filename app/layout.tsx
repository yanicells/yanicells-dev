import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const siteUrl = "https://yanicells.dev";

export const viewport: Viewport = {
  themeColor: "#1e1e2e",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "yanicells — full-stack web developer",
    template: "%s | Yanicells",
  },
  description:
    "portfolio of edrian miguel e. capistrano (yanicells) — full-stack web developer, cs student at ateneo de manila university. building with next.js, react, and modern web technologies.",
  keywords: [
    "yanicells",
    "edrian miguel capistrano",
    "full-stack developer",
    "web developer",
    "next.js developer",
    "react developer",
    "ateneo de manila",
    "portfolio",
    "software engineer",
    "philippines developer",
  ],
  authors: [{ name: "Edrian Miguel E. Capistrano", url: siteUrl }],
  creator: "yanicells",
  publisher: "yanicells",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "yanicells",
    title: "yanicells — full-stack web developer",
    description:
      "portfolio of edrian miguel e. capistrano (yanicells) — full-stack web developer and cs student at ateneo de manila university.",
    images: [
      {
        url: "/yanicells-image.png",
        width: 1200,
        height: 630,
        alt: "yanicells — full-stack web developer portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "yanicells — full-stack web developer",
    description:
      "portfolio of edrian miguel e. capistrano (yanicells) — full-stack web developer and cs student at ateneo de manila university.",
    images: ["/yanicells-image.png"],
    creator: "@yanicells",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
