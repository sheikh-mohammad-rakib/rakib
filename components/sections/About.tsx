"use client";

// Phase 4b — Motion whileInView fade-up on both columns
import Image from "next/image";
import { motion } from "motion/react";

// ── Portfolio data ────────────────────────────────────────────────────────────
const EYEBROW    = "About";
const PULL_QUOTE =
  "Bridging low-level edge hardware with high-level software orchestration.";
const BIO = [
  "Based in Chattogram, Bangladesh, I'm a Mechatronics and Industrial Engineering student at CUET with a strong foundation in control theory, robotics, and IIoT. I apply sharp debugging instincts and systems-level thinking to the design, integration, and optimisation of automated mechatronic platforms.",
  "When I'm not in the lab, I'm building full-stack web tools, training RL agents in simulation, or exploring the intersection of ML and industrial fault detection.",
];
const STATS = [
  { label: "University",   value: "CUET — Batch 2022" },
  { label: "Location",     value: "Chattogram, Bangladesh" },
  { label: "Currently",    value: "Open to opportunities" },
];

// ── Motion variant — subtle fade-up (Motion docs: y:8 is the editorial amount)
const fadeUp = {
  hidden:  { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

// ─────────────────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <section
      id="about"
      className="px-8 md:px-16 py-24 md:py-32 border-b border-[#D8D8D4]"
    >
      <div className="max-w-7xl mx-auto">

        {/* Eyebrow */}
        <motion.p
          className="text-xs font-sans font-medium uppercase tracking-widest text-[#555550] mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
        >
          {EYEBROW}
        </motion.p>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* Left: text — fades up slightly delayed */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-medium italic text-[#111111] leading-[1.2] mb-8 border-b border-[#D8D8D4] pb-8">
              &ldquo;{PULL_QUOTE}&rdquo;
            </h2>
            <div className="flex flex-col gap-5">
              {BIO.map((para, i) => (
                <p key={i} className="text-base text-[#555550] leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Right: avatar + stats — fades up with more delay */}
          <motion.div
            className="flex flex-col gap-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
            transition={{ delay: 0.22 }}
          >
            {/* Avatar */}
            <div className="border border-[#D8D8D4] aspect-square overflow-hidden bg-[#F0F0EC] relative">
              <Image
                src="/images/avatar.png"
                alt="Portrait of Sheikh Mohammad Rakib — Mechatronics & Industrial Engineering Student at CUET"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Stats panel */}
            <div className="border border-[#D8D8D4]">
              <div className="px-5 py-3 border-b border-[#D8D8D4]">
                <span className="text-xs font-medium uppercase tracking-widest text-[#555550]">
                  At a Glance
                </span>
              </div>
              {STATS.map(({ label, value }, i) => (
                <div
                  key={label}
                  className={`flex items-center justify-between px-5 py-4 ${
                    i < STATS.length - 1 ? "border-b border-[#D8D8D4]" : ""
                  }`}
                >
                  <p className="text-xs uppercase tracking-widest text-[#555550]">
                    {label}
                  </p>
                  <p className="text-sm font-medium text-[#111111]">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
