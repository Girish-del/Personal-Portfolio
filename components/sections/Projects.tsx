"use client";

import { projects } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { QuestCard } from "@/components/ui/QuestCard";

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative overflow-hidden py-20 md:py-32"
    >
      <div className="gutter-x mx-auto max-w-[1400px]">
        <SectionHeader
          chapter="04"
          label="Projects"
          title="Things I've built and shipped."
          description="Side projects where I stress-tested agents, CI/CD, and backend patterns outside my day job."
        />

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          {projects.map((p, idx) => (
            <Reveal key={p.slug} delay={(idx % 4) * 0.05}>
              {p.gallery && p.gallery.length > 0 ? (
                <ProjectCard project={{ ...p, gallery: p.gallery }} />
              ) : (
                <QuestCard quest={p} />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
