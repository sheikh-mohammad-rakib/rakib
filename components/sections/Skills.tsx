"use client";

// Phase 4b — GSAP ScrollTrigger.batch() stagger on skill tags
// gsap-scrolltrigger skill: batch staggers elements that fire near same time
// gsap-react skill: useGSAP with scope ref, plugins registered outside

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ── Portfolio data ────────────────────────────────────────────────────────────
const SECTION_LABEL = "Technical Skills";

interface SkillCategory {
  category: string;
  items: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Industrial Controls & Robotics",
    items: [
      "ROS 2",
      "Gazebo",
      "Control Theory",
      "Kinematics & Dynamics",
      "PID Controllers",
    ],
  },
  {
    category: "IIoT & Edge Computing",
    items: [
      "Arduino",
      "ESP32",
      "Sensor Interfacing (I2C/SPI)",
      "Real-Time Telemetry",
    ],
  },
  {
    category: "Programming Languages",
    items: [
      "Python",
      "C++",
      "MATLAB",
      "SQL",
      "JavaScript",
      "TypeScript",
    ],
  },
  {
    category: "DevOps & Deployment",
    items: [
      "Git",
      "Linux",
      "Docker",
    ],
  },
  {
    category: "Web Architecture & ML Frameworks",
    items: [
      "Scikit-learn",
      "Pandas",
      "Next.js",
      "Prisma",
    ],
  },
  {
    category: "Professional Skills",
    items: [
      "Cross-Functional Collaboration",
      "Multidisciplinary Coordination",
      "Technical Communication",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  // ── GSAP ScrollTrigger.batch() — stagger tags as they enter viewport ──────
  // gsap-scrolltrigger skill: batch fires one callback for all elements
  // that enter within the interval window, then staggers them together
  useGSAP(
    () => {
      // Set initial invisible state for all tags
      gsap.set("[data-skill]", { opacity: 0, y: 12 });

      ScrollTrigger.batch("[data-skill]", {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.04,
            overwrite: true,  // gsap-core: prevent conflicts
          });
        },
        onLeaveBack: (elements) => {
          gsap.to(elements, {
            opacity: 0,
            y: 12,
            duration: 0.3,
            ease: "power2.in",
            stagger: 0.02,
            overwrite: true,
          });
        },
        start: "top 88%",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="px-8 md:px-16 py-24 md:py-32 border-b border-[#D8D8D4]"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section label */}
        <p className="text-xs font-sans font-medium uppercase tracking-widest text-[#555550] mb-14">
          {SECTION_LABEL}
        </p>

        {/* Editorial tiled grid — Design.md §4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#D8D8D4] border border-[#D8D8D4]">
          {SKILL_CATEGORIES.map((group) => (
            <div key={group.category} className="bg-[#F8F8F6] flex flex-col">
              <div className="px-5 py-3.5 border-b border-[#D8D8D4] flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-widest text-[#555550]">
                  {group.category}
                </span>
              </div>
              <div className="p-5 flex flex-wrap gap-2 flex-1">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    data-skill
                    className="border border-[#D8D8D4] text-[#555550] px-3 py-1.5 text-xs hover:border-[#1A4A2E] hover:text-[#1A4A2E] transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
