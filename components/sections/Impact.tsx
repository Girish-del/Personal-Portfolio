"use client";

import { impactMetrics } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const HERO_COUNT = 3;

export function Impact() {
  const heroMetrics = impactMetrics.slice(0, HERO_COUNT);
  const chipMetrics = impactMetrics.slice(HERO_COUNT);

  return (
    <section
      id="impact"
      aria-labelledby="impact-heading"
      className="editorial-panel relative overflow-hidden py-20 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[clamp(7rem,20vw,18rem)] text-transparent [-webkit-text-stroke:1px_rgb(var(--accent)/0.08)]"
      >
        IMPACT
      </div>

      <div className="gutter-x relative z-[2] mx-auto max-w-[1300px]">
        <SectionHeader
          chapter="03"
          label="Impact"
          title="Numbers I've shipped against."
          description="Outcomes I've personally moved across employers, side projects, and research."
        />

        <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
          {heroMetrics.map((m, idx) => (
            <Reveal key={m.label} delay={idx * 0.06}>
              <article className="group relative h-full border border-[rgb(var(--border)/0.3)] bg-[rgb(var(--surface-elev)/0.45)] p-5 transition-colors hover:border-accent sm:p-6 md:p-8">
                <p className="font-display text-[clamp(2.75rem,8vw,4rem)] leading-none text-accent-hot">
                  {m.value}
                </p>
                <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-accent-secondary">
                  {m.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {m.context}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-3 grid gap-2 sm:mt-4 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-5">
          {chipMetrics.map((m, idx) => (
            <Reveal key={m.label} delay={0.18 + idx * 0.04}>
              <article
                className="group flex h-full flex-col justify-between border border-[rgb(var(--border)/0.25)] bg-[rgb(var(--surface-elev)/0.35)] px-4 py-3 transition-colors hover:border-accent sm:px-5 sm:py-4"
                title={m.context}
              >
                <p className="font-display text-2xl leading-none text-accent sm:text-[1.75rem]">
                  {m.value}
                </p>
                <p className="mt-2 font-mono text-[0.58rem] uppercase leading-snug tracking-[0.14em] text-accent-secondary">
                  {m.label}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
