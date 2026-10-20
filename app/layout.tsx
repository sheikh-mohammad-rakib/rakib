import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/providers/SmoothScroll";
import PersonSchema from "@/components/seo/PersonSchema";

// ─── Fonts ────────────────────────────────────────────────────────────────────
// Playfair Display: display / hero headings and logotype only
const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
});

// Inter: all body text, labels, and UI controls
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// ─── Viewport ─────────────────────────────────────────────────────────────────
// Exported separately per Next.js 14+ convention to avoid metadata conflicts.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111111",
};

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // metadataBase is required for Next.js to generate absolute OG/Twitter URLs.
  // Replace with your live domain before deploying.
  metadataBase: new URL("https://rakib23.me"),

  alternates: {
    canonical: "/",
  },

  title: "Sheikh Mohammad Rakib — Full Stack Creative Developer",
  description:
    "Portfolio of Sheikh Mohammad Rakib — a Full Stack Creative Developer who builds thoughtful digital experiences at the intersection of clean code and compelling design. Based in Bangladesh. Available for remote work.",

  keywords: [
    // Core role keywords
    "Full Stack Developer",
    "Creative Developer",
    "Frontend Developer Bangladesh",
    "Web Developer for hire",
    // Tech stack
    "Next.js developer",
    "React developer",
    "TypeScript developer",
    "GSAP animation developer",
    "Motion Framer Motion developer",
    // Niche / differentiator
    "web animation developer",
    "interactive portfolio",
    "creative web development",
    "motion design developer",
    "scroll animation developer",
    // Portfolio / hire intent
    "hire full stack developer",
    "freelance web developer Bangladesh",
    "creative developer portfolio",
    // General
    "Next.js",
    "React",
    "GSAP",
    "Motion",
    "Portfolio",
  ],

  authors: [{ name: "Sheikh Mohammad Rakib", url: "https://rakib23.me" }],

  // PWA / browser chrome
  manifest: "/manifest.json",

  openGraph: {
    title: "Sheikh Mohammad Rakib — Full Stack Creative Developer",
    description:
      "Portfolio of Sheikh Mohammad Rakib — a Full Stack Creative Developer who builds thoughtful digital experiences at the intersection of clean code and compelling design.",
    url: "https://rakib23.me",
    siteName: "Sheikh Mohammad Rakib",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sheikh Mohammad Rakib — Full Stack Creative Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sheikh Mohammad Rakib — Full Stack Creative Developer",
    description:
      "Full Stack Creative Developer building experiences at the intersection of clean code and compelling design. Based in Bangladesh.",
    images: ["/og-image.jpg"],
    // creator: "@your_twitter_handle", // ← uncomment and replace when you have a handle
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* JSON-LD structured data — Person + WebSite schemas */}
        <PersonSchema />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
