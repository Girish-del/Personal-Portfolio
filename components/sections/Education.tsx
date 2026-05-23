"use client";

import { GraduationCap, MapPin } from "lucide-react";
import { education } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="editorial-panel relative overflow-hidden py-20 md:py-32"
    >
      <div className="gutter-x mx-auto max-w-[1200px]">
        <SectionHeader chapter="06" label="Academia" title="Education" />

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {education.map((edu, idx) => (
            <Reveal key={edu.school} delay={idx * 0.08}>
              <article className="relative min-w-0 overflow-hidden border border-[rgb(var(--border)/0.3)] bg-[rgb(var(--surface-elev)/0.55)] p-5 sm:p-6 md:p-8">
                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-30 blur-3xl"
                  style={{
                    background:
                      idx === 0
                        ? "radial-gradient(circle, rgb(var(--accent-hot) / 0.35), transparent 70%)"
                        : "radial-gradient(circle, rgb(var(--accent-secondary) / 0.3), transparent 70%)",
                  }}
                />
                <div className="relative">
                  <span className="inline-block bg-accent px-3 py-1 font-display text-sm tracking-[0.15em] text-[rgb(var(--bg))]">
                    {edu.emoji}
                  </span>
                  <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-accent-secondary">
                    {edu.period}
                  </p>
                  <h3 className="mt-2 font-display text-2xl leading-tight text-ink sm:text-3xl">
                    {edu.school}
                  </h3>
                  <p className="mt-3 flex items-start gap-2 text-sm text-ink-muted">
                    <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-accent-secondary" />
                    {edu.degree}
                  </p>
                  <p className="mt-2 font-mono text-[0.6rem] text-ink-subtle">
                    <MapPin className="mr-1 inline h-3 w-3" />
                    {edu.location}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <footer className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[rgb(var(--border)/0.2)] pt-8 font-mono text-[0.65rem] tracking-[0.1em] text-ink-subtle md:flex-row">
            <p>© {new Date().getFullYear()} Girish Nalawade</p>
            <p>Next.js · TypeScript · Tailwind · Lenis</p>
          </footer>
        </Reveal>
      </div>
    </section>
  );
}
