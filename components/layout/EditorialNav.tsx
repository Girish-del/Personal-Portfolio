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

      {/* Desktop: scrollable inline links from lg */}
      <ul className="relative hidden max-w-[48vw] items-center gap-2 overflow-x-auto scrollbar-none lg:flex xl:max-w-[58vw] xl:gap-2.5 2xl:max-w-none 2xl:gap-3">
        {navItems.map((item) => (
          <li key={item.id} className="shrink-0">
            <button
              type="button"
              onClick={() => smoothScrollTo(item.id)}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "py-2 font-mono text-[0.52rem] uppercase tracking-[0.14em] transition-colors xl:text-[0.55rem] xl:tracking-[0.16em]",
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
