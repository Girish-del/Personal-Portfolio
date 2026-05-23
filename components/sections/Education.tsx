"use client";

import Image from "next/image";
import { useState } from "react";
import { GraduationCap, MapPin } from "lucide-react";
import { education } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

function SchoolImage({
  src,
  alt,
  emoji,
}: {
  src: string;
  alt: string;
  emoji: string;
}) {
  const [ok, setOk] = useState(true);

  if (!ok) {
    return (
      <div className="relative mb-5 aspect-[16/10] w-full overflow-hidden border border-[rgb(var(--border)/0.25)] bg-[rgb(var(--surface)/0.5)]">
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <span className="font-display text-2xl tracking-[0.2em] text-accent">{emoji}</span>
          <p className="mt-2 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ink-subtle">
            Add campus photo
          </p>
          <code className="mt-1 font-mono text-[0.55rem] text-accent-hot">{src}</code>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mb-5 aspect-[16/10] w-full overflow-hidden border border-[rgb(var(--border)/0.25)]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover saturate-[0.88] contrast-[1.05]"
        onError={() => setOk(false)}
      />
      <span className="photo-label">{emoji}</span>
    </div>
  );
}

export function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="relative overflow-hidden py-20 md:py-32"
    >
      <div className="gutter-x mx-auto max-w-[1200px]">
        <SectionHeader chapter="09" label="Academia" title="Education" />

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {education.map((edu, idx) => (
            <Reveal key={edu.school} delay={idx * 0.08}>
              <article className="relative flex h-full min-w-0 flex-col overflow-hidden border border-[rgb(var(--border)/0.3)] bg-[rgb(var(--surface-elev)/0.55)] p-5 sm:p-6 md:p-8">
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
                <div className="relative flex flex-1 flex-col">
                  <SchoolImage src={edu.image} alt={edu.imageAlt} emoji={edu.emoji} />
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-accent-secondary">
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
