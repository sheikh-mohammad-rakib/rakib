// Server Component — safe to use in layout.tsx (no "use client" needed).
// Injects JSON-LD structured data for both Person and WebSite schemas.
// Search engines and AI crawlers parse these for rich results.

export default function PersonSchema() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sheikh Mohammad Rakib",
    url: "https://rakib23.me",
    jobTitle: "Full Stack Creative Developer",
    description:
      "Full Stack Creative Developer specialising in Next.js, React, TypeScript, GSAP, and Motion — building thoughtful digital experiences at the intersection of clean code and compelling design.",
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "GSAP",
      "Motion",
      "Framer Motion",
      "Full Stack Development",
      "Web Animation",
      "UI/UX Design",
      "Node.js",
      "REST APIs",
      "Design Systems",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "BD",
      addressLocality: "Bangladesh",
    },
    sameAs: [
      "https://github.com/sheikh-mohammad-rakib",
      "https://linkedin.com/in/sheikh-mohammad-rakib",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sheikh Mohammad Rakib",
    url: "https://rakib23.me",
    description:
      "Portfolio of Sheikh Mohammad Rakib — Full Stack Creative Developer based in Bangladesh.",
    author: {
      "@type": "Person",
      name: "Sheikh Mohammad Rakib",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
