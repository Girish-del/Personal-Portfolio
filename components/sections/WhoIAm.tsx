"use client";

import { personal } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function WhoIAm() {
  return (
    <section
      id="who"
      aria-labelledby="who-heading"
      className="relative overflow-hidden py-24 md:py-36"
    >
      <div className="gutter-x mx-auto max-w-[1100px]">
        <SectionHeader chapter="00" label="Who I am" title="Engineer. Builder. Generalist." />

        <Reveal>
          <p className="max-w-[58ch] font-display text-3xl leading-[1.15] text-ink sm:text-4xl md:text-5xl">
            {personal.whoIAm}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-subtle">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Curious by default
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-secondary" />
              Bias toward shipping
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-hot" />
              Allergic to bad observability
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
