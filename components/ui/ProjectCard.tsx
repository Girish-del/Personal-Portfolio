"use client";

import { Github, Sparkles } from "lucide-react";
import type { SideQuest } from "@/lib/content";
import { InteractiveSelector } from "@/components/ui/interactive-selector";

type Props = {
  project: SideQuest & { gallery: NonNullable<SideQuest["gallery"]> };
};

export function ProjectCard({ project }: Props) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden border border-[rgb(var(--border)/0.3)] bg-[rgb(var(--surface-elev)/0.45)] transition-colors hover:border-accent">
      <InteractiveSelector slides={project.gallery} period={project.period} />

      <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent">
              <Sparkles className="h-3.5 w-3.5" /> Project
            </p>
            <h3 className="mt-2 font-display text-2xl leading-tight text-ink md:text-3xl">
              {project.title}
            </h3>
            <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-accent-secondary">
              {project.subtitle}
            </p>
          </div>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="touch-target inline-flex shrink-0 items-center justify-center border border-[rgb(var(--border)/0.35)] text-ink-muted hover:border-accent hover:text-accent"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>

        <p className="text-sm leading-relaxed text-ink-muted">{project.description}</p>

        {project.tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
