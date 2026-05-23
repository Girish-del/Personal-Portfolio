"use client";

import { Activity, Bot, Cloud, Server, type LucideIcon } from "lucide-react";
import { pillars, type Pillar } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const ICONS: Record<Pillar["icon"], LucideIcon> = {
  server: Server,
  bot: Bot,
  cloud: Cloud,
  activity: Activity,
};

export function WhatIDo() {
  return (
    <section
      id="what"
      aria-labelledby="what-heading"
      className="editorial-panel relative overflow-hidden py-20 md:py-32"
    >
      <div className="gutter-x mx-auto max-w-[1400px]">
        <SectionHeader
          chapter="01"
          label="What I do"
          title="Four areas I keep coming back to."
          description="The disciplines I've built deepest in — and the ones I tend to be most useful around."
        />

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          {pillars.map((p, idx) => {
            const Icon = ICONS[p.icon];
            return (
              <Reveal key={p.title} delay={idx * 0.06}>
                <article className="group relative h-full overflow-hidden border border-[rgb(var(--border)/0.35)] bg-[rgb(var(--surface-elev)/0.55)] p-6 transition-colors hover:border-accent md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-accent text-[rgb(var(--bg))] shadow-[3px_3px_0_rgb(var(--accent-secondary)/0.7)] transition-transform group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]">
                      <Icon className="h-6 w-6" strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent-secondary">
                        Pillar 0{idx + 1}
                      </p>
                      <h3 className="mt-1 font-display text-2xl leading-tight text-ink md:text-3xl">
                        {p.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-muted">
                    {p.blurb}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.capabilities.map((c) => (
                      <span key={c} className="tag-pill">
                        {c}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
