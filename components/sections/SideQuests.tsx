"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  FileText,
  Github,
  Mic,
  Sparkles,
  Users,
} from "lucide-react";
import { sideQuests, type SideQuest } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

type Category = SideQuest["category"];

const CATEGORIES: { id: Category | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Project", label: "Projects" },
  { id: "Publication", label: "Publications" },
  { id: "Community", label: "Communities" },
  { id: "Talk", label: "Talks" },
];

const ICONS: Record<Category, ReactNode> = {
  Project: <Sparkles className="h-3.5 w-3.5" />,
  Publication: <FileText className="h-3.5 w-3.5" />,
  Community: <Users className="h-3.5 w-3.5" />,
  Talk: <Mic className="h-3.5 w-3.5" />,
};

const COVER_ICONS: Record<Category, ReactNode> = {
  Project: <Sparkles className="h-24 w-24" strokeWidth={1} />,
  Publication: <FileText className="h-24 w-24" strokeWidth={1} />,
  Community: <Users className="h-24 w-24" strokeWidth={1} />,
  Talk: <Mic className="h-24 w-24" strokeWidth={1} />,
};

const COVER_CLASS: Record<Category, string> = {
  Project: "quest-cover--project",
  Publication: "quest-cover--publication",
  Community: "quest-cover--community",
  Talk: "quest-cover--talk",
};

export function SideQuests() {
  const [active, setActive] = useState<Category | "All">("All");
  const visible =
    active === "All" ? sideQuests : sideQuests.filter((q) => q.category === active);

  return (
    <section
      id="side-quests"
      aria-labelledby="side-quests-heading"
      className="relative overflow-hidden py-20 md:py-32"
    >
      <div className="gutter-x mx-auto max-w-[1400px]">
        <SectionHeader
          chapter="05"
          label="Side quests"
          title="Things I built, wrote, and showed up for."
          description="Side projects, publications, communities, and talks — everything outside my day-job that I cared enough to ship."
        />

        <Reveal>
          <div role="tablist" aria-label="Filter side quests" className="mb-8 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = active === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(cat.id)}
                  className={`tag-pill !text-[0.62rem] ${
                    isActive
                      ? "!border-accent !bg-accent !text-[rgb(var(--bg))]"
                      : ""
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          {visible.map((q, idx) => (
            <Reveal key={q.slug} delay={(idx % 4) * 0.05}>
              <QuestCard quest={q} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuestCover({ quest }: { quest: SideQuest }) {
  return (
    <div className={`quest-cover ${COVER_CLASS[quest.category]}`}>
      <span className="quest-cover-icon" aria-hidden="true">
        {COVER_ICONS[quest.category]}
      </span>
      <span className="photo-label relative z-[1]">{quest.period}</span>
    </div>
  );
}

function QuestCard({ quest }: { quest: SideQuest }) {
  const [imageOk, setImageOk] = useState(Boolean(quest.image));
  const showCover = !quest.image || !imageOk;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden border border-[rgb(var(--border)/0.3)] bg-[rgb(var(--surface-elev)/0.45)] transition-colors hover:border-accent">
      {showCover ? (
        <QuestCover quest={quest} />
      ) : (
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={quest.image!}
            alt={quest.imageAlt ?? quest.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 saturate-[0.88] contrast-[1.05] group-hover:scale-[1.04] group-hover:saturate-100"
            onError={() => setImageOk(false)}
          />
          <span className="photo-label">{quest.period}</span>
        </div>
      )}

      <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent">
              {ICONS[quest.category]} {quest.category}
            </p>
            <h3 className="mt-2 font-display text-2xl leading-tight text-ink md:text-3xl">
              {quest.title}
            </h3>
            <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-accent-secondary">
              {quest.subtitle}
            </p>
          </div>
          {quest.github && (
            <a
              href={quest.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${quest.title} on GitHub`}
              className="touch-target inline-flex shrink-0 items-center justify-center border border-[rgb(var(--border)/0.35)] text-ink-muted hover:border-accent hover:text-accent"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>

        <p className="text-sm leading-relaxed text-ink-muted">
          {quest.description}
        </p>

        {quest.tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {quest.tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
        )}

        {quest.href && quest.category === "Publication" && (
          <a
            href={quest.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-accent hover:text-accent-hot"
          >
            Read full paper
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </article>
  );
}
