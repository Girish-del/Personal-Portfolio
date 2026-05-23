"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems, personal } from "@/lib/content";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import { smoothScrollTo } from "@/components/providers/LenisProvider";
import { cn } from "@/lib/utils";

export function EditorialNav() {
  const [active, setActive] = useState(navItems[0].id);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-0 top-0 z-[60] flex items-center justify-between gutter-x pb-4"
      style={{
        paddingTop: "calc(max(1rem, env(safe-area-inset-top)) + 0.25rem)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgb(var(--bg))]/95 via-[rgb(var(--bg))]/85 to-transparent"
      />

      <Link
        href="#hero"
        className="relative font-display text-lg tracking-[0.18em] text-accent sm:text-xl"
      >
        {personal.firstName.toUpperCase()}
      </Link>

      {/* Desktop: inline links */}
      <ul className="relative hidden items-center gap-4 lg:flex">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => smoothScrollTo(item.id)}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "py-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] transition-colors",
                active === item.id
                  ? "text-accent"
                  : "text-ink-muted hover:text-accent",
              )}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="relative flex items-center gap-2 sm:gap-3">
        <span className="hidden md:inline-block">
          <ThemeToggle />
        </span>

        <MobileMenu
          open={menuOpen}
          onOpen={() => setMenuOpen(true)}
          onClose={() => setMenuOpen(false)}
          activeId={active}
        />
      </div>
    </nav>
  );
}
