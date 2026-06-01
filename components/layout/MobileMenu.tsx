"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { navItems, personal } from "@/lib/content";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";
import { smoothScrollTo } from "@/components/providers/LenisProvider";
import { analyticsEvents } from "@/lib/gtag";
import { ThemeToggle } from "./ThemeToggle";

type Props = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  activeId: string;
};

export function MobileMenu({ open, onOpen, onClose, activeId }: Props) {
  useBodyScrollLock(open);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleJump = (id: string) => {
    onClose();
    setTimeout(() => smoothScrollTo(id), 320);
  };

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="touch-target relative inline-flex items-center justify-center text-ink-muted lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-[80] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="absolute inset-0 bg-[rgb(var(--bg))]/85"
              style={{
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.32 }}
              className="absolute right-0 top-0 flex h-full w-[min(86vw,380px)] flex-col gutter-x bg-[rgb(var(--surface))]"
              style={{
                paddingTop: "calc(max(1.25rem, env(safe-area-inset-top)) + 0.5rem)",
                paddingBottom: "calc(max(1.25rem, env(safe-area-inset-bottom)) + 0.5rem)",
              }}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-xl tracking-[0.18em] text-accent">
                  {personal.firstName.toUpperCase()}
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="touch-target inline-flex items-center justify-center text-ink-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav aria-label="Sections" className="flex-1 overflow-y-auto">
                <ul className="space-y-1">
                  {navItems.map((item, idx) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => handleJump(item.id)}
                        aria-current={activeId === item.id ? "true" : undefined}
                        className={`flex w-full items-center justify-between border-b border-[rgb(var(--border)/0.18)] py-4 text-left font-display text-2xl tracking-wide transition-colors ${
                          activeId === item.id
                            ? "text-accent"
                            : "text-ink hover:text-accent"
                        }`}
                      >
                        <span>{item.label}</span>
                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-subtle">
                          0{idx + 1}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[rgb(var(--border)/0.2)] pt-6">
                <a
                  href={personal.resumeHref}
                  download={personal.resumeFileName}
                  onClick={() => {
                    analyticsEvents.resumeDownload("mobile_menu");
                    onClose();
                  }}
                  className="btn-primary"
                >
                  <Download className="h-4 w-4" /> Resume
                </a>
                <a
                  href={`mailto:${personal.email}`}
                  onClick={() => {
                    analyticsEvents.emailClick("mobile_menu");
                    onClose();
                  }}
                  aria-label="Email"
                  className="btn-ghost touch-target !p-3"
                >
                  <Mail className="h-4 w-4" />
                </a>
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="btn-ghost touch-target !p-3"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="btn-ghost touch-target !p-3"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={personal.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="btn-ghost touch-target !p-3"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <div className="ml-auto">
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
