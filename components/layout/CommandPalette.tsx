"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Command as CommandIcon,
  Download,
  Github,
  Linkedin,
  Mail,
  Moon,
  Search,
  Sun,
  ArrowRight,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { navItems, personal } from "@/lib/content";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";
import { smoothScrollTo } from "@/components/providers/LenisProvider";

type Action = {
  id: string;
  label: string;
  group: "Navigate" | "Connect" | "Theme";
  perform: () => void;
  icon: React.ReactNode;
  keywords?: string;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMac, setIsMac] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { resolvedTheme, setTheme } = useTheme();

  useBodyScrollLock(open);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      // Modern: userAgentData; fallback: userAgent
      const platform =
        // @ts-expect-error - navigator.userAgentData not in TS lib by default
        navigator.userAgentData?.platform || navigator.userAgent || "";
      setIsMac(/mac|iphone|ipad|ipod/i.test(platform));
    }
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const goto = useCallback(
    (id: string) => {
      close();
      // Defer until body-scroll-lock is released
      setTimeout(() => smoothScrollTo(id), 80);
    },
    [close],
  );

  const actions = useMemo<Action[]>(() => {
    const navActions: Action[] = navItems.map((item) => ({
      id: `nav-${item.id}`,
      label: `Go to ${item.label}`,
      group: "Navigate",
      perform: () => goto(item.id),
      icon: <ArrowRight className="h-3.5 w-3.5" />,
      keywords: item.label.toLowerCase(),
    }));

    const connect: Action[] = [
      {
        id: "email",
        label: `Email ${personal.email}`,
        group: "Connect",
        perform: () => {
          close();
          setTimeout(() => {
            window.location.href = `mailto:${personal.email}`;
          }, 80);
        },
        icon: <Mail className="h-3.5 w-3.5" />,
        keywords: "email contact mail",
      },
      {
        id: "github",
        label: "Open GitHub",
        group: "Connect",
        perform: () => {
          close();
          setTimeout(
            () => window.open(personal.github, "_blank", "noopener,noreferrer"),
            80,
          );
        },
        icon: <Github className="h-3.5 w-3.5" />,
        keywords: "github code repos",
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        group: "Connect",
        perform: () => {
          close();
          setTimeout(
            () =>
              window.open(personal.linkedin, "_blank", "noopener,noreferrer"),
            80,
          );
        },
        icon: <Linkedin className="h-3.5 w-3.5" />,
        keywords: "linkedin profile professional",
      },
      {
        id: "resume",
        label: "Download Resume",
        group: "Connect",
        perform: () => {
          const a = document.createElement("a");
          a.href = personal.resumeHref;
          a.download = personal.resumeFileName;
          a.click();
          close();
        },
        icon: <Download className="h-3.5 w-3.5" />,
        keywords: "resume cv pdf download",
      },
    ];

    const theme: Action[] = [
      {
        id: "theme-dark",
        label: "Switch to dark mode",
        group: "Theme",
        perform: () => {
          setTheme("dark");
          close();
        },
        icon: <Moon className="h-3.5 w-3.5" />,
        keywords: "theme dark night",
      },
      {
        id: "theme-light",
        label: "Switch to light mode",
        group: "Theme",
        perform: () => {
          setTheme("light");
          close();
        },
        icon: <Sun className="h-3.5 w-3.5" />,
        keywords: "theme light day",
      },
    ];

    return [...navActions, ...connect, ...theme];
  }, [goto, setTheme, close]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) =>
        a.label.toLowerCase().includes(q) ||
        (a.keywords ?? "").includes(q) ||
        a.group.toLowerCase().includes(q),
    );
  }, [actions, query]);

  const grouped = useMemo(() => {
    const groups: Record<string, Action[]> = {};
    filtered.forEach((a) => {
      groups[a.group] = groups[a.group] ?? [];
      groups[a.group].push(a);
    });
    return groups;
  }, [filtered]);

  const activeAction = filtered[activeIndex];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }
      if (!open && e.key === "/" && !isTypingInField(e.target)) {
        e.preventDefault();
        setOpen(true);
      }
      if (open) {
        if (e.key === "Escape") {
          e.preventDefault();
          close();
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          setActiveIndex((idx) => Math.min(idx + 1, filtered.length - 1));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setActiveIndex((idx) => Math.max(idx - 1, 0));
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (activeAction) activeAction.perform();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered.length, activeAction, close]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (open) {
      // Don't auto-focus on touch (would force keyboard open)
      const isTouch =
        typeof window !== "undefined" &&
        window.matchMedia("(pointer: coarse)").matches;
      if (!isTouch) {
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    }
  }, [open]);

  return (
    <>
      {/* Desktop: hint chip bottom-left */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="btn-ghost bottom-safe left-safe fixed z-40 hidden items-center gap-2 md:inline-flex"
      >
        <Search className="h-3.5 w-3.5" />
        <span>Quick nav</span>
        <kbd className="ml-1 rounded bg-white/10 px-1.5 py-0.5 text-[9px] ring-1 ring-[rgb(var(--border))]">
          {isMac ? "⌘" : "Ctrl"}K
        </kbd>
      </button>

      {/* Mobile: small floating search button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open quick navigation"
        className="touch-target bottom-safe fixed left-4 z-40 inline-flex items-center justify-center bg-accent shadow-lg md:hidden"
        style={{ width: 48, height: 48, color: "rgb(var(--bg))" }}
      >
        <Search className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="fixed inset-0 z-[90] flex items-end justify-center sm:items-start sm:pt-[14vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <button
              type="button"
              aria-label="Close palette"
              onClick={close}
              className="absolute inset-0 bg-[rgb(var(--bg))]/70"
              style={{
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.99 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-[min(560px,100vw)] overflow-hidden border border-[rgb(var(--border)/0.4)] bg-[rgb(var(--surface-elev))] shadow-xl sm:rounded-none"
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
              <div className="flex items-center gap-3 border-b border-[rgb(var(--border)/0.3)] px-4 py-3">
                <CommandIcon className="h-4 w-4 shrink-0 text-ink-subtle" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search sections, links, theme…"
                  enterKeyHint="go"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  /* 16px font on iOS prevents focus zoom */
                  className="min-w-0 flex-1 bg-transparent text-base text-ink placeholder:text-ink-subtle focus:outline-none sm:text-sm"
                  aria-label="Search commands"
                />
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="touch-target ml-1 hidden items-center justify-center text-ink-subtle hover:text-ink sm:inline-flex"
                >
                  <kbd className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[9px] uppercase ring-1 ring-[rgb(var(--border))]">
                    esc
                  </kbd>
                </button>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="touch-target inline-flex items-center justify-center text-ink-subtle hover:text-ink sm:hidden"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="max-h-[min(60vh,520px)] overflow-y-auto px-2 py-2 scrollbar-thin">
                {filtered.length === 0 && (
                  <p className="px-3 py-6 text-center text-sm text-ink-subtle">
                    No matches. Try &quot;skills&quot; or &quot;email&quot;.
                  </p>
                )}
                {Object.entries(grouped).map(([group, items]) => (
                  <div key={group} className="mb-1">
                    <p className="px-3 pb-1 pt-2 font-mono text-[9px] uppercase tracking-widest text-ink-subtle">
                      {group}
                    </p>
                    <ul>
                      {items.map((action) => {
                        const flatIdx = filtered.indexOf(action);
                        const isActive = flatIdx === activeIndex;
                        return (
                          <li key={action.id}>
                            <button
                              type="button"
                              onMouseEnter={() => setActiveIndex(flatIdx)}
                              onClick={() => action.perform()}
                              className={`group flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm transition-colors sm:py-2 ${
                                isActive
                                  ? "bg-white/5 text-ink ring-1 ring-[rgb(var(--border-strong))]"
                                  : "text-ink-muted active:bg-white/5"
                              }`}
                            >
                              <span className="flex min-w-0 items-center gap-3">
                                <span
                                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ring-1 ring-[rgb(var(--border))] ${
                                    isActive ? "bg-white/10" : "bg-white/5"
                                  }`}
                                >
                                  {action.icon}
                                </span>
                                <span className="truncate">{action.label}</span>
                              </span>
                              {isActive && (
                                <kbd className="ml-2 hidden shrink-0 rounded bg-white/5 px-1.5 py-0.5 font-mono text-[9px] text-ink-subtle ring-1 ring-[rgb(var(--border))] sm:inline-flex">
                                  ↵
                                </kbd>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-[rgb(var(--border)/0.3)] px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-ink-subtle">
                <span>
                  Theme: {resolvedTheme === "dark" ? "dark" : "light"}
                </span>
                <span className="hidden items-center gap-2 sm:flex">
                  <kbd className="rounded bg-white/5 px-1.5 py-0.5 ring-1 ring-[rgb(var(--border))]">
                    ↑
                  </kbd>
                  <kbd className="rounded bg-white/5 px-1.5 py-0.5 ring-1 ring-[rgb(var(--border))]">
                    ↓
                  </kbd>
                  <span className="ml-1">to move</span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function isTypingInField(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    target.isContentEditable === true
  );
}
