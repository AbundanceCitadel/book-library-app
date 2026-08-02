import type { Metadata, Viewport } from "next";
import { Inter, Literata } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import ServiceWorkerRegister from "./components/ServiceWorkerRegister";

// v2.1 (Session 9 readability pass) typography — self-hosted via
// next/font/google (downloaded once at build time, zero runtime request to
// Google's CDN, no layout shift). See docs/DESIGN_SYSTEM.md "Typography."
// Inter for UI chrome (small labels, nav, badges — one of the most
// road-tested fonts for on-screen legibility at small sizes).
// Literata for reading content: it's the font Google built specifically for
// Play Books' on-screen reading surfaces (higher x-height, optimized at
// small/medium text sizes, holds up on lower-DPI phone screens far better
// than a typical thin/high-contrast serif) — swapped in from Newsreader after
// Thai found the previous choice harder to read on his phone. Weights pinned
// to 400/500 (never lighter) so body text never renders in a thin, hard-to-
// read weight.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});
const literata = Literata({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-literata",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Book Library",
  description: "Personal library of book summaries",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Book Library",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // v2: dark is the single default theme-color now — light is opt-in via the
  // toggle, not OS-driven, so one static value is correct here (unlike the old
  // prefers-color-scheme pair). v6: updated to the new espresso --color-bg so
  // the OS/browser chrome (mobile address bar tint) matches the page.
  themeColor: "#170f0a",
};

// Runs before paint. v2 (Stage 15): dark is the default for a first-time
// visitor regardless of OS preference — only adds `.light` if the stored
// preference is explicitly "light", or "system" and the OS itself reports
// light. See docs/DESIGN_SYSTEM.md — "Dark / Light Mode."
const NO_FLASH_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var isLight =
      stored === "light" ||
      (stored === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches === false);
    document.documentElement.classList.toggle("light", isLight);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${literata.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
      </head>
      <body>
        <ServiceWorkerRegister />
        <Header />
        {children}
      </body>
    </html>
  );
}
