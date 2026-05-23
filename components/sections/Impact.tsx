"use client";

import { impactMetrics } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const TICKER_ITEMS = [...impactMetrics, ...impactMetrics, ...impactMetrics];

export function Impact() {
  return (
    <section
      id="impact"
      aria-labelledby="impact-heading"
      className="relative overflow-hidden py-20 md:py-32"
    >
      <div className="gutter-x relative z-[2] mx-auto max-w-[1400px]">
        <SectionHeader
          chapter="03"
          label="Impact"
          title="Numbers I've shipped against."
          description="Outcomes I've personally moved across employers, side projects, and research."
        />
      </div>

      <Reveal>
        <div
          className="impact-marquee relative mt-2 border-y border-[rgb(var(--border)/0.25)] bg-[rgb(var(--surface-elev)/0.35)] py-6 md:py-8"
          aria-label="Impact metrics scrolling ticker"
        >
          <div className="impact-marquee-track animate-ticker flex w-max items-stretch gap-0">
            {TICKER_ITEMS.map((m, idx) => (
              <article
                key={`${m.label}-${idx}`}
                className="impact-marquee-item flex shrink-0 flex-col justify-center border-r border-[rgb(var(--border)/0.2)] px-8 md:px-12"
                title={m.context}
              >
                <p className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-none text-accent-hot">
                  {m.value}
                </p>
                <p className="mt-2 max-w-[16ch] font-mono text-[0.62rem] uppercase leading-snug tracking-[0.16em] text-accent-secondary">
                  {m.label}
                </p>
                <p className="mt-2 hidden max-w-[28ch] text-xs leading-relaxed text-ink-muted lg:block">
                  {m.context}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
