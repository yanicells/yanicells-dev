import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

// Apply stored or system appearance before the first paint.
const themeScript = `(function(){var theme;try{theme=localStorage.getItem('portfolio-theme')}catch(e){}document.documentElement.dataset.theme=theme==='light'||theme==='dark'?theme:window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'})()`;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#191b1f" },
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
    <html lang="en" suppressHydrationWarning>
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
