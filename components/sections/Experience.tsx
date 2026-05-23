"use client";

import { experiences } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative overflow-hidden py-20 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 right-[var(--gutter)] select-none font-mono text-4xl tracking-[0.5em] text-accent/10"
      >
        // // //
      </div>

      <div className="gutter-x relative z-[2] mx-auto max-w-[1300px]">
        <SectionHeader
          chapter="04"
          label="Trajectory"
          title="Experience Journey"
          description="Four years across global payments, distributed infrastructure, and university network operations — newest first."
        />

        <ol className="relative space-y-10 md:space-y-12">
          {/* Vertical rail */}
          <span
            aria-hidden="true"
            className="absolute left-2.5 top-2 bottom-2 w-px bg-gradient-to-b from-accent via-accent-secondary to-[rgb(var(--accent-hot)/0.4)] md:left-3.5"
          />

          {experiences.map((exp, idx) => (
            <Reveal key={`${exp.company}-${exp.period}`} delay={idx * 0.05}>
              <li className="relative grid gap-6 pl-10 md:grid-cols-[minmax(180px,260px)_1fr] md:gap-12 md:pl-14">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-3 inline-flex h-5 w-5 items-center justify-center md:left-1"
                >
                  <span className="absolute h-5 w-5 rounded-full bg-accent/25" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-[rgb(var(--bg))]" />
                </span>

                <div className="min-w-0">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-accent">
                    {exp.period}
                  </p>
                  <h3 className="mt-2 font-display text-3xl leading-tight text-ink sm:text-4xl">
                    {exp.role}
                  </h3>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-accent-secondary">
                    {exp.company}
                  </p>
                  <p className="mt-1 font-mono text-[0.6rem] text-ink-subtle">
                    {exp.location}
                  </p>
                </div>

                <ul className="achievement-list min-w-0 list-none space-y-3 border-t border-[rgb(var(--border)/0.2)] pt-5 md:border-t-0 md:pt-0">
                  {exp.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
