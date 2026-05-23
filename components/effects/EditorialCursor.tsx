"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Supplementary cursor halo — does NOT hide the system cursor.
 * - Smooth spring follow via rAF + lerp.
 * - Grows on hoverable elements (a, button, [role=button]).
 * - Disabled on touch / reduced-motion / no-hover devices.
 * - Pauses when the tab is hidden so it never freezes.
 */
export function EditorialCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const noHover = window.matchMedia("(hover: none)").matches;
    if (reduce || coarse || noHover) return;

    setEnabled(true);

    const dot = dotRef.current;
    if (!dot) return;

    let rafId = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let running = true;

    const tick = () => {
      if (!running) return;
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      dot.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest("a, button, [role='button'], input, textarea")) {
        dot.classList.add("is-hovering");
      }
    };
    const onOut = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest("a, button, [role='button'], input, textarea")) {
        dot.classList.remove("is-hovering");
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else if (!running) {
        running = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, true);
    document.addEventListener("pointerout", onOut, true);
    document.addEventListener("visibilitychange", onVisibilityChange);
    rafId = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("pointerout", onOut, true);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  if (!enabled) return null;

  return <div ref={dotRef} aria-hidden="true" className="cursor-dot" />;
}
