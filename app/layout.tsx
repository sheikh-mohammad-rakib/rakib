import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/providers/SmoothScroll";
import PersonSchema from "@/components/seo/PersonSchema";

// ─── Fonts ────────────────────────────────────────────────────────────────────
// Playfair Display & Inter are variable fonts — loading without fixed weight arrays
// provides all weights (400–900) while generating a single clean font file query.
const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
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

  title: "Sheikh Mohammad Rakib — Mechatronics & Industrial Engineering Student",
  description:
    "Portfolio of Sheikh Mohammad Rakib — Mechatronics and Industrial Engineering student at CUET bridging low-level edge hardware with high-level software orchestration. Skilled in ROS 2, IIoT, control systems, and full-stack development.",

  keywords: [
    // Core engineering & robotics
    "Mechatronics Engineering",
    "Industrial Engineering",
    "Robotics Engineer",
    "ROS 2 Developer",
    "Control Systems",
    "IIoT and Edge Computing",
    "CUET Mechatronics",
    // Hardware & Embedded
    "ESP32",
    "Arduino",
    "Sensor Interfacing",
    "Gazebo Simulation",
    // Software & AI
    "Python",
    "C++",
    "Machine Learning",
    "Scikit-learn",
    "Next.js",
    "Prisma",
    "TypeScript",
    // Location & Intent
    "Sheikh Mohammad Rakib",
    "Chattogram Bangladesh",
  ],

  authors: [{ name: "Sheikh Mohammad Rakib", url: "https://rakib23.me" }],

  // PWA / browser chrome
  manifest: "/manifest.json",

  openGraph: {
    title: "Sheikh Mohammad Rakib — Mechatronics & Industrial Engineering Student",
    description:
      "Portfolio of Sheikh Mohammad Rakib — Mechatronics and Industrial Engineering student at CUET bridging low-level edge hardware with high-level software orchestration.",
    url: "https://rakib23.me",
    siteName: "Sheikh Mohammad Rakib",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sheikh Mohammad Rakib — Mechatronics & Industrial Engineering Student",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sheikh Mohammad Rakib — Mechatronics & Industrial Engineering Student",
    description:
      "Mechatronics & Industrial Engineering student at CUET skilled in control theory, robotics, IIoT, and software systems.",
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
