"use client";

import { motion } from "motion/react";

// ── Portfolio data ────────────────────────────────────────────────────────────
const SECTION_LABEL = "Education & Credentials";

const DEGREES = [
  {
    degree: "Bachelor of Science in Mechatronics and Industrial Engineering",
    institution: "Chittagong University of Engineering and Technology (CUET)",
    period: "March 2022 – Present",
    score: null,
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Chattogram Govt. Model School and College",
    period: "2018 – 2020",
    score: "GPA: 5.00 / 5.00",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Govt. Muslim High School",
    period: "2018",
    score: "GPA: 5.00 / 5.00",
  },
];

const CERTIFICATIONS = [
  {
    title: "Machine Learning Engineer (Career Track)",
    issuer: "DataCamp",
    description:
      "Comprehensive training in end-to-end machine learning engineering pipelines, model deployment, and MLOps principles.",
  },
  {
    title: "Associate AI Engineer for Developers (Career Track)",
    issuer: "DataCamp",
    description:
      "Focused on integrating AI models into robust software architectures utilizing modern APIs and open-source libraries.",
  },
];

const AWARD = {
  title: "Winner (Codex $100 Credit) — Hack Days CUET",
  period: "July 2026",
  project: "MedClarify AI",
  description:
    "Engineered an AI agent utilizing Large Language Models (LLMs) to reduce medical diagnostic uncertainty through systematic, information-theoretic follow-up questioning.",
};

// ── Motion variant ────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────

export default function Education() {
  return (
    <section
      id="education"
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

        {/* Two-column layout: Left = Degrees, Right = Award & Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left: Academic Degrees */}
          <motion.div
            className="flex flex-col gap-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
          >
            <div className="border border-[#D8D8D4]">
              <div className="px-5 py-3.5 border-b border-[#D8D8D4]">
                <h3 className="text-xs font-medium uppercase tracking-widest text-[#555550]">
                  Academic Degrees
                </h3>
              </div>

              <div className="divide-y divide-[#D8D8D4]">
                {DEGREES.map((item, idx) => (
                  <div key={idx} className="p-6 flex flex-col gap-2 bg-[#F8F8F6]">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <h4 className="text-sm font-medium text-[#111111] leading-snug">
                        {item.degree}
                      </h4>
                      <span className="self-start sm:self-auto shrink-0 text-xs font-mono text-[#555550]">
                        {item.period}
                      </span>
                    </div>

                    <p className="text-xs text-[#555550]">
                      {item.institution}
                    </p>

                    {item.score && (
                      <span className="inline-block mt-2 self-start text-xs font-mono text-[#1A4A2E] border border-[#1A4A2E] px-2.5 py-0.5">
                        {item.score}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Honors & Certifications */}
          <motion.div
            className="flex flex-col gap-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
            transition={{ delay: 0.15 }}
          >
            {/* Honors & Awards Panel */}
            <div className="border border-[#D8D8D4]">
              <div className="px-5 py-3.5 border-b border-[#D8D8D4] flex items-center justify-between">
                <h3 className="text-xs font-medium uppercase tracking-widest text-[#555550]">
                  Honors & Awards
                </h3>
                <span className="text-xs font-mono text-[#1A4A2E]">
                  {AWARD.period}
                </span>
              </div>
              <div className="p-6 bg-[#F8F8F6] flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#1A4A2E]" aria-hidden="true" />
                  <h4 className="text-sm font-medium text-[#111111]">
                    {AWARD.title}
                  </h4>
                </div>
                <p className="text-xs font-mono text-[#1A4A2E] uppercase tracking-wider">
                  Project: {AWARD.project}
                </p>
                <p className="text-sm text-[#555550] leading-relaxed">
                  {AWARD.description}
                </p>
              </div>
            </div>

            {/* Certifications Panel */}
            <div className="border border-[#D8D8D4]">
              <div className="px-5 py-3.5 border-b border-[#D8D8D4]">
                <h3 className="text-xs font-medium uppercase tracking-widest text-[#555550]">
                  Professional Certifications
                </h3>
              </div>
              <div className="divide-y divide-[#D8D8D4]">
                {CERTIFICATIONS.map((cert, idx) => (
                  <div key={idx} className="p-6 bg-[#F8F8F6] flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-sm font-medium text-[#111111]">
                        {cert.title}
                      </h4>
                      <span className="shrink-0 text-xs font-mono text-[#555550] border border-[#D8D8D4] px-2 py-0.5">
                        {cert.issuer}
                      </span>
                    </div>
                    <p className="text-xs text-[#555550] leading-relaxed mt-1">
                      {cert.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
