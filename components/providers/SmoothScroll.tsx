"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const smoother = ScrollSmoother.create({
        wrapper: wrapper.current,
        content: content.current,
        smooth: 1.5,
        effects: true,
      });

      // Handle internal anchor link clicks smoothly via ScrollSmoother
      const handleAnchorClick = (e: MouseEvent) => {
        const target = (e.target as HTMLElement).closest("a");
        if (!target) return;
        const href = target.getAttribute("href");
        if (href && href.startsWith("#") && href.length > 1) {
          const targetElem = document.querySelector(href);
          if (targetElem) {
            e.preventDefault();
            if (wrapper.current) wrapper.current.scrollTop = 0;
            smoother.scrollTo(targetElem, true);
            history.pushState(null, "", href);
          }
        }
      };

      document.addEventListener("click", handleAnchorClick);

      // Handle direct landing with hash in URL (e.g. /#work)
      if (window.location.hash) {
        const targetElem = document.querySelector(window.location.hash);
        if (targetElem) {
          requestAnimationFrame(() => {
            if (wrapper.current) wrapper.current.scrollTop = 0;
            smoother.scrollTo(targetElem, false);
            ScrollTrigger.refresh();
          });
        }
      }

      return () => {
        document.removeEventListener("click", handleAnchorClick);
      };
    },
    { scope: wrapper }
  );

  return (
    <div id="smooth-wrapper" ref={wrapper}>
      <div id="smooth-content" ref={content}>
        {children}
      </div>
    </div>
  );
}
