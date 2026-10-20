import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow everything except private API routes
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Explicitly allow major AI crawlers
      { userAgent: "GPTBot",        allow: "/" },
      { userAgent: "Claude-Web",    allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Googlebot",     allow: "/" },
      { userAgent: "Bingbot",       allow: "/" },
    ],
    sitemap: "https://rakib23.me/sitemap.xml",
    host: "https://rakib23.me",
  };
}
