// Server Component — no "use client" needed (static, no interactivity)

// ── Placeholder data — replace with real values ──────────────────────────────
const AUTHOR      = "Sheikh Mohammad Rakib";
const YEAR        = new Date().getFullYear();
const TAGLINE     = "Designed & built with intention.";

// ─────────────────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="border-t border-[#D8D8D4] px-5 sm:px-8 md:px-16 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-3">
        {/* Copyright */}
        <p className="text-xs text-[#555550]">
          &copy; {YEAR} {AUTHOR}. All rights reserved.
        </p>

        {/* Tagline */}
        <p className="text-xs text-[#D8D8D4] italic">
          {TAGLINE}
        </p>
      </div>
    </footer>
  );
}
