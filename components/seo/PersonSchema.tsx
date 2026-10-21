// Server Component — safe to use in layout.tsx (no "use client" needed).
// Injects JSON-LD structured data for both Person and WebSite schemas.
// Search engines and AI crawlers parse these for rich results.

export default function PersonSchema() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sheikh Mohammad Rakib",
    url: "https://rakib23.me",
    jobTitle: "Mechatronics & Industrial Engineering Student",
    description:
      "Mechatronics and Industrial Engineering student at CUET skilled at bridging low-level edge hardware with high-level software orchestration. Focused on control theory, robotics, IIoT, and automated mechatronic platforms.",
    knowsAbout: [
      "Mechatronics Engineering",
      "Industrial Automation",
      "Robotics",
      "ROS 2",
      "Gazebo",
      "Control Theory",
      "Kinematics & Dynamics",
      "PID Controllers",
      "IIoT & Edge Computing",
      "ESP32",
      "Arduino",
      "Python",
      "C++",
      "MATLAB",
      "Machine Learning",
      "Scikit-learn",
      "Next.js",
      "Prisma",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "BD",
      addressLocality: "Chattogram, Bangladesh",
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
      "Portfolio of Sheikh Mohammad Rakib — Mechatronics & Industrial Engineering Student at CUET.",
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
