"use client";

import { useEffect } from "react";

/**
 * Lock the document scroll while a modal / drawer is open.
 * Compatible with iOS Safari (no rubber-band background scroll).
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked || typeof document === "undefined") return;

    const html = document.documentElement;
    const scrollY = window.scrollY;
    const prevPaddingRight = document.body.style.paddingRight;

    // Compensate for the scrollbar disappearing on desktop browsers
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    html.classList.add("scroll-locked");
    // iOS: also pin body to current scroll position to fully prevent rubber-band
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      html.classList.remove("scroll-locked");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.paddingRight = prevPaddingRight;
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}
