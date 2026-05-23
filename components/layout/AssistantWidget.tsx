"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";

export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const handleClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    window.addEventListener("mousedown", handleClick);
    window.addEventListener("touchstart", handleClick, { passive: true });
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("touchstart", handleClick);
    };
  }, [open]);

  return (
    <div className="bottom-safe right-safe fixed z-[55]">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={popoverRef}
            role="dialog"
            aria-label="AI assistant message"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-[calc(100%+12px)] right-0 border border-[rgb(var(--border)/0.4)] bg-[rgb(var(--surface-elev))] p-4 shadow-xl"
            style={{ width: "min(300px, calc(100vw - 2rem))" }}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-accent">
                <Sparkles className="h-4 w-4" style={{ color: "rgb(var(--bg))" }} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <p className="truncate font-display text-lg tracking-wide text-ink">
                    AI Assistant
                  </p>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="touch-target inline-flex shrink-0 items-center justify-center text-ink-subtle hover:text-accent"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm leading-relaxed text-ink-muted">
                  Under fine-tuning and deployment stage.
                </p>
                <p className="mt-2 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-ink-subtle">
                  Coming soon
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        aria-label="Open AI assistant"
        className="touch-target flex items-center justify-center bg-accent shadow-lg"
        style={{ width: 56, height: 56, color: "rgb(var(--bg))" }}
      >
        <Sparkles className="h-6 w-6" />
      </button>
    </div>
  );
}
