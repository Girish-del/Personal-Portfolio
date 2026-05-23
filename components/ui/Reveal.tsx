"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** Threshold (0..1) of visibility before triggering. Default 0 = any pixel visible. */
  amount?: number;
};

/**
 * Reliable scroll-reveal: uses native IntersectionObserver with a safety timeout.
 * If IO never fires (rare hydration/timing issue), content force-reveals after 1.5s.
 * Honors prefers-reduced-motion (renders visible immediately).
 */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  amount = 0,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    // Safety net: force-reveal after 1.5s no matter what
    const safety = window.setTimeout(() => setVisible(true), 1500);

    // If already in view at mount, reveal immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      window.clearTimeout(safety);
      return () => window.clearTimeout(safety);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
            window.clearTimeout(safety);
            break;
          }
        }
      },
      { threshold: amount, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, [amount]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
