"use client";

// Scroll Direction: Hide Header — Motion + GSAP
// Motion: useScroll + useMotionValueEvent to detect scroll direction
//   → motion.nav animates y: 0 ↔ -100% (slides out/in)
// GSAP: ScrollTrigger handles the bg-blur transition (preserved from before)
// Responsive: Desktop horizontal navigation + Mobile editorial drawer overlay

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// ── Register GSAP plugins outside the component (gsap-react skill) ───────────
gsap.registerPlugin(ScrollTrigger, useGSAP);

// ── Placeholder data ──────────────────────────────────────────────────────────
const LOGOTYPE = "Rakib";

const NAV_LINKS = [
  { label: "About",      href: "#about"      },
  { label: "Education",  href: "#education"  },
  { label: "Skills",     href: "#skills"     },
  { label: "Experience", href: "#experience" },
  { label: "Work",       href: "#work"       },
  { label: "Contact",    href: "#contact"    },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ── Motion: track scroll position and direction ───────────────────────────
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // Never hide while mobile menu is open
    if (mobileMenuOpen) return;

    // Hide when scrolling DOWN past 80px; show when scrolling UP
    if (latest > previous && latest > 80) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // ── GSAP: bg-blur transition when hero section leaves viewport ────────────
  useGSAP(() => {
    const heroEl = document.querySelector("#hero");
    if (!heroEl) return;

    ScrollTrigger.create({
      trigger: heroEl,
      start: "bottom top",
      onEnter: () => {
        gsap.to(navRef.current, {
          backgroundColor: "rgba(248,248,246,0.95)",
          backdropFilter: "blur(12px)",
          duration: 0.4,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        if (!mobileMenuOpen) {
          gsap.to(navRef.current, {
            backgroundColor: "transparent",
            backdropFilter: "blur(0px)",
            duration: 0.3,
            ease: "power2.in",
          });
        }
      },
    });
  });

  return (
    <>
      <motion.nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 border-b border-[#D8D8D4] px-5 sm:px-8 md:px-16 py-4 md:py-5 flex items-center justify-between"
        style={{ backgroundColor: mobileMenuOpen ? "#F8F8F6" : "transparent" }}
        variants={{
          visible: { y: 0 },
          hidden:  { y: "-100%" },
        }}
        animate={hidden && !mobileMenuOpen ? "hidden" : "visible"}
        transition={{
          duration: 0.35,
          ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
        }}
      >
        {/* Logotype */}
        <a
          href="#hero"
          onClick={() => setMobileMenuOpen(false)}
          className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-[#111111] hover:text-[#1A4A2E] transition-colors"
        >
          {LOGOTYPE}
        </a>

        {/* Desktop Nav links (hidden on mobile / small screens) */}
        <ul className="hidden lg:flex items-center gap-6 xl:gap-8 list-none m-0 p-0">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm text-[#555550] hover:text-[#111111] transition-colors"
              >
                {label} -&gt;
              </a>
            </li>
          ))}
        </ul>

        {/* Tablet / Medium view (md to lg): compact navigation */}
        <ul className="hidden md:flex lg:hidden items-center gap-4 list-none m-0 p-0">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="text-xs text-[#555550] hover:text-[#111111] transition-colors whitespace-nowrap"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu button (visible below md) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          className="md:hidden flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#111111] px-3 py-1.5 border border-[#D8D8D4] hover:border-[#1A4A2E] hover:text-[#1A4A2E] transition-colors bg-[#F8F8F6]/80"
        >
          <span>{mobileMenuOpen ? "Close" : "Menu"}</span>
          <span className="w-3.5 flex flex-col gap-1 items-center justify-center" aria-hidden="true">
            <span
              className={`block w-3.5 h-[1.5px] bg-current transition-transform duration-200 ${
                mobileMenuOpen ? "rotate-45 translate-y-[2.5px]" : ""
              }`}
            />
            <span
              className={`block w-3.5 h-[1.5px] bg-current transition-transform duration-200 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-[2.5px]" : ""
              }`}
            />
          </span>
        </button>
      </motion.nav>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            className="fixed inset-0 top-[57px] z-40 bg-[#F8F8F6] px-6 py-8 flex flex-col justify-between overflow-y-auto md:hidden border-b border-[#D8D8D4]"
          >
            <div className="flex flex-col gap-2">
              <p className="text-xs font-mono uppercase tracking-widest text-[#555550] mb-4">
                Navigation
              </p>
              <ul className="flex flex-col list-none m-0 p-0 divide-y divide-[#D8D8D4]/60">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={href} className="py-3">
                    <a
                      href={href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-serif text-2xl font-medium text-[#111111] hover:text-[#1A4A2E] transition-colors flex items-center justify-between"
                    >
                      <span>{label}</span>
                      <span className="font-mono text-sm text-[#1A4A2E]">&rarr;</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 border-t border-[#D8D8D4] flex flex-col gap-2">
              <p className="text-xs font-mono uppercase tracking-wider text-[#555550]">
                Sheikh Mohammad Rakib
              </p>
              <p className="text-xs text-[#555550]">
                Mechatronics & Industrial Engineering &bull; CUET
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
