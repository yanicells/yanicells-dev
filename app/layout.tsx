import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

// Restore the saved choice before paint; first-time visits follow the system setting.
const themeScript = `(function(){var theme;try{theme=localStorage.getItem('portfolio-theme')}catch(e){}if(theme!=='light'&&theme!=='dark'){theme=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=theme})()`;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6f3" },
    { media: "(prefers-color-scheme: dark)", color: "#171417" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://yanicells.dev"),
  verification: { google: "RF2l99SOCq0azS151q2VTwDBU7eZOcslKbdRiv_8OpE" },
  title: {
    default: "Yani Capistrano | Software & AI engineering",
    template: "%s | Yani Capistrano",
  },
  description:
    "Selected work by Edrian Miguel E. Capistrano (Yani): web applications, AI tools, and software for real teams. Computer Science student at Ateneo de Manila University.",
  authors: [
    { name: "Edrian Miguel E. Capistrano", url: "https://yanicells.dev" },
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yanicells.dev",
    siteName: "Yani Capistrano",
    title: "Yani Capistrano | Software & AI engineering",
    description:
      "Web applications, AI tools, and selected work. Computer Science at Ateneo de Manila University.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@yanicells",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={hankenGrotesk.variable}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
