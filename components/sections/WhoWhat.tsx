"use client";

import Image from "next/image";
import { useState } from "react";
import { Activity, Bot, Cloud, Server, type LucideIcon } from "lucide-react";
import { personal, pillars, type Pillar } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { PortraitPlaceholder } from "@/components/ui/PortraitPlaceholder";

const ICONS: Record<Pillar["icon"], LucideIcon> = {
  server: Server,
  bot: Bot,
  cloud: Cloud,
  activity: Activity,
};

export function WhoWhat() {
  const [imageOk, setImageOk] = useState(true);

  return (
    <section
      id="who"
      aria-labelledby="who-heading"
      className="relative overflow-hidden py-20 md:py-28 lg:py-32"
    >
      <div className="gutter-x mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(260px,0.85fr)_1.15fr] lg:gap-14 xl:gap-20">
          {/* Left — portrait (hero-style) */}
          <Reveal className="relative order-first lg:order-none">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[420px] overflow-hidden lg:sticky lg:top-28 lg:max-w-none">
              {imageOk ? (
                <Image
                  src={personal.whoImage}
                  alt={`${personal.name} — casual portrait`}
                  fill
                  sizes="(min-width: 1024px) 35vw, 90vw"
                  className="object-cover object-[center_35%] saturate-[0.9] contrast-[1.05]"
                  onError={() => setImageOk(false)}
                />
              ) : (
                <PortraitPlaceholder
                  label="Portrait placeholder"
                  path="public/who.jpg"
                  hint="Recommended: 3:4 portrait, min 900×1200px"
                  className="absolute inset-0"
                />
              )}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg))] via-transparent to-transparent opacity-80 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[rgb(var(--bg)/0.15)]"
              />
            </div>
          </Reveal>

          {/* Right — Who I am + What I do */}
          <div className="min-w-0">
            <SectionHeader
              chapter="00"
              label="Who I am"
              title="Engineer. Builder. Generalist."
            />

            <Reveal>
              <p
                id="who-heading"
                className="max-w-[58ch] font-display text-2xl leading-[1.15] text-ink sm:text-3xl md:text-4xl lg:text-[2.75rem]"
              >
                {personal.whoIAm}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-subtle sm:gap-x-8">
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

            <div id="what" className="mt-16 scroll-mt-24 md:mt-20">
              <SectionHeader
                chapter="01"
                label="What I do"
                title="Four areas I keep coming back to."
                description="The disciplines I've built deepest in — and the ones I tend to be most useful around."
                className="mb-8 md:mb-10"
              />

              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                {pillars.map((p, idx) => {
                  const Icon = ICONS[p.icon];
                  return (
                    <Reveal key={p.title} delay={idx * 0.05}>
                      <article className="group relative h-full overflow-hidden border border-[rgb(var(--border)/0.35)] bg-[rgb(var(--surface-elev)/0.55)] p-5 transition-colors hover:border-accent md:p-6">
                        <div className="flex items-start gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-accent text-[rgb(var(--bg))] shadow-[3px_3px_0_rgb(var(--accent-secondary)/0.7)] transition-transform group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]">
                            <Icon className="h-5 w-5" strokeWidth={2} />
                          </div>
                          <div className="min-w-0">
                            <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-accent-secondary">
                              Pillar 0{idx + 1}
                            </p>
                            <h3 className="mt-1 font-display text-xl leading-tight text-ink md:text-2xl">
                              {p.title}
                            </h3>
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                          {p.blurb}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {p.capabilities.slice(0, 5).map((c) => (
                            <span key={c} className="tag-pill">
                              {c}
                            </span>
                          ))}
                          {p.capabilities.length > 5 && (
                            <span className="tag-pill text-ink-subtle">
                              +{p.capabilities.length - 5}
                            </span>
                          )}
                        </div>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
