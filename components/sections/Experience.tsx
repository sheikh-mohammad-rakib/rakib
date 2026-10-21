"use client";

import { motion } from "motion/react";

// ── Portfolio data ────────────────────────────────────────────────────────────
const SECTION_LABEL = "Industrial Experience";

interface ExperienceItem {
  id: number;
  role: string;
  org: string;
  period: string;
  bullets: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 1,
    role: "Industrial Attachment Trainee",
    org: "Transcom Beverages Limited",
    period: "January 2026",
    bullets: [
      "Analyzed the automation architecture of high-speed beverage bottling lines, gaining practical exposure to the integration of PLCs, Variable Frequency Drives (VFDs), and synchronized pneumatic actuators.",
      "Investigated real-time process control and fault diagnostics through the plant’s SCADA interfaces, bridging theoretical knowledge of control systems with industrial-scale manufacturing workflows.",
      "Shadowed maintenance engineering teams during routine preventive maintenance, participating in root-cause analysis for electromechanical faults to minimize downtime on production conveyors.",
    ],
  },
  {
    id: 2,
    role: "Industrial Visit",
    org: "Shikalbaha 225 MW Combined Cycle Power Plant, Chattogram",
    period: "2025",
    bullets: [
      "Gained comprehensive knowledge of Combined Cycle Power Plant (CCPP) operations, including the working principles of Gas Turbines, Steam Turbines, and Heat Recovery Steam Generators (HRSG).",
    ],
  },
];

// ── Motion variant — editorial fade-up ─────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14 },
  },
};

// ─────────────────────────────────────────────────────────────────────────────

export default function Experience() {
  return (
    <section
      id="experience"
      className="px-8 md:px-16 py-24 md:py-32 border-b border-[#D8D8D4]"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section label */}
        <motion.p
          className="text-xs font-sans font-medium uppercase tracking-widest text-[#555550] mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
        >
          {SECTION_LABEL}
        </motion.p>

        {/* Experiences list */}
        <motion.div
          className="flex flex-col gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
        >
          {EXPERIENCES.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              className="border border-[#D8D8D4] bg-[#F8F8F6]"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-[#D8D8D4] flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
                  <h3 className="text-base font-medium text-[#111111]">
                    {item.role}
                  </h3>
                  <span className="hidden sm:inline text-xs text-[#D8D8D4]">/</span>
                  <p className="text-xs font-medium uppercase tracking-wider text-[#1A4A2E]">
                    {item.org}
                  </p>
                </div>
                <span className="self-start md:self-auto text-xs font-mono text-[#555550] border border-[#D8D8D4] px-3 py-1 bg-transparent">
                  {item.period}
                </span>
              </div>

              {/* Bullet points */}
              <div className="p-6 flex flex-col gap-4">
                {item.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="text-xs text-[#1A4A2E] mt-1 shrink-0 font-mono"
                    >
                      &mdash;
                    </span>
                    <p className="text-sm text-[#555550] leading-relaxed">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
