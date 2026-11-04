"use client";

// Fill Text — Contact section heading
// MCP confirmed APIs: motion, useSpring, useTransform (grade: A)
// Reference: https://examples.motion.dev/react/loading-fill-text
//
// Technique: CSS `background-clip: text` with a two-stop gradient.
//   Left stop = #1A4A2E (forest green), right stop = #111111 (base text colour).
//   `backgroundSize` is animated from "0% 100%" → "100% 100%" via useScroll.
//   As scroll progresses the green fill bleeds left-to-right across the text —
//   like ink soaking into paper. The text itself stays in the DOM and accessible.
//
// Motion best-practices (react.md):
//   - MotionValues only used in useTransform/style, never read in render
//   - Import from motion/react

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionTemplate } from "motion/react";

// ── Portfolio data ────────────────────────────────────────────────────────────
const EYEBROW  = "Get In Touch";
const HEADING  = "Let's build something.";
const SUBTEXT  =
  "Whether you have an industrial automation project, research collaboration, or just want to connect — my inbox is always open.";

// Social & Direct Links — email and phone obfuscated to prevent bot harvesting
interface ContactLinkItem {
  label: string;
  href?: string;
  encodedHref?: string;
  encodedLabel?: string;
  isExternal?: boolean;
}

const LINKS: ContactLinkItem[] = [
  {
    label: "Email",
    // Base64 of mailto:sheikhmdrakib.career@gmail.com
    encodedHref: "bWFpbHRvOnNoZWlraG1kcmFraWIuY2FyZWVyQGdtYWlsLmNvbQ==",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sheikh-mohammad-rakib",
    isExternal: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/sheikh-mohammad-rakib",
    isExternal: true,
  },
  {
    label: "Phone",
    // Base64 of tel:+8801521705856 and +880 1521-705856
    encodedHref: "dGVsOis4ODAxNTIxNzA1ODU2",
    encodedLabel: "Kzg4MCAxNTIxLTcwNTg1Ng==",
  },
];

function ContactLink({ item }: { item: ContactLinkItem }) {
  const [href, setHref] = useState<string>(item.href ?? "#");
  const [label, setLabel] = useState<string>(item.label);

  // Client-side hydration: decode real contact info so static HTML contains no raw addresses
  useEffect(() => {
    if (item.encodedHref) {
      setHref(atob(item.encodedHref));
    }
    if (item.encodedLabel) {
      setLabel(atob(item.encodedLabel));
    }
  }, [item.encodedHref, item.encodedLabel]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (item.encodedHref && href === "#") {
      e.preventDefault();
      const decoded = atob(item.encodedHref);
      setHref(decoded);
      window.location.href = decoded;
    }
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      target={item.isExternal ? "_blank" : undefined}
      rel={item.isExternal ? "noopener noreferrer" : undefined}
      className="border border-[#D8D8D4] text-[#555550] px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm text-center sm:text-left transition-colors"
      whileHover={{ borderColor: "#1A4A2E", color: "#1A4A2E" }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
    >
      {label} -&gt;
    </motion.a>
  );
}

// ── Motion variants — preserved for eyebrow, subtext, links ──────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

// ── FillHeading: scroll-driven ink fill on the H2 ────────────────────────────
// Isolated component so it has its own headingRef for useScroll target.
function FillHeading({ text }: { text: string }) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Scroll progress for THIS element (scoped to its own ref)
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start 0.9", "start 0.4"], // fill completes when top of heading is at 40% viewport
  });

  // Spring-smooth the raw scroll progress for organic ink-bleed feel
  // (useSpring matches the MCP-confirmed pattern: useSpring + useTransform)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // Use a template string to dynamically set the color stop percentage
  const fillPercentage = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const backgroundImage = useMotionTemplate`linear-gradient(to right, #1A4A2E ${fillPercentage}, #111111 ${fillPercentage})`;

  return (
    <motion.h2
      ref={headingRef}
      // Text color is transparent so the background gradient shows through.
      // The gradient has a hard stop between the green fill and the dark gray base.
      style={{
        backgroundImage,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",         // Safari
        color: "transparent",
        WebkitTextFillColor: "transparent",
      }}
      className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight mb-6 sm:mb-8 max-w-3xl"
    >
      {text}
    </motion.h2>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function Contact() {
  return (
    <AnimatePresence>
      <section
        id="contact"
        className="px-5 sm:px-8 md:px-16 py-16 sm:py-24 md:py-32 border-b border-[#D8D8D4]"
      >
        <div className="max-w-7xl mx-auto">

          {/* Container: stagger children on scroll enter (eyebrow, subtext, links) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Eyebrow */}
            <motion.p
              variants={itemVariants}
              className="text-xs font-sans font-medium uppercase tracking-widest text-[#1A4A2E] mb-4 sm:mb-8"
            >
              {EYEBROW}
            </motion.p>

            {/* Heading — ink fill (FillHeading has its own scroll MotionValues) */}
            {/* Not a motion.div child so it isn't driven by the stagger variants */}
            <FillHeading text={HEADING} />

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-[#555550] leading-relaxed max-w-lg mb-8 sm:mb-14"
            >
              {SUBTEXT}
            </motion.p>

            {/* Social links */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-4">
              {LINKS.map((item) => (
                <ContactLink key={item.label} item={item} />
              ))}
            </motion.div>

          </motion.div>
        </div>
      </section>
    </AnimatePresence>
  );
}
