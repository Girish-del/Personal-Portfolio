"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { experiences } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

function CompanyLogo({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState(true);

  if (!ok) {
    return (
      <span
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-[rgb(var(--border)/0.35)] bg-[rgb(var(--surface-elev)/0.6)] font-mono text-[0.5rem] uppercase tracking-wider text-accent-secondary"
        title={alt}
      >
        Logo
      </span>
    );
  }

  return (
    <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden border border-[rgb(var(--border)/0.3)] bg-[rgb(var(--surface-elev)/0.6)] p-1.5">
      <Image
        src={src}
        alt={alt}
        width={40}
        height={40}
        className="h-full w-full object-contain"
        onError={() => setOk(false)}
      />
    </span>
  );
}

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [hovering, setHovering] = useState(false);

  const updateFromPointer = useCallback((clientY: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const y = Math.min(Math.max(clientY - rect.top, 0), rect.height);
    setProgress(rect.height > 0 ? y / rect.height : 0);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => {
      if (hovering) return;
      const rect = el.getBoundingClientRect();
      const viewportMid = window.innerHeight * 0.55;
      const traveled = viewportMid - rect.top;
      const ratio = Math.min(Math.max(traveled / rect.height, 0), 1);
      setProgress(ratio);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hovering]);

  const activeIndex = Math.min(
    experiences.length - 1,
    Math.floor(progress * experiences.length),
  );

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="editorial-panel relative overflow-hidden py-20 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 right-[var(--gutter)] select-none font-mono text-4xl tracking-[0.5em] text-accent/10"
      >
        // // //
      </div>

      <div className="gutter-x relative z-[2] mx-auto max-w-[1300px]">
        <SectionHeader
          chapter="05"
          label="Trajectory"
          title="Experience Journey"
          description="Four years across global payments, distributed infrastructure, and university network operations — newest first."
        />

        <div
          ref={trackRef}
          className="timeline-track relative"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onMouseMove={(e) => updateFromPointer(e.clientY)}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            if (touch) updateFromPointer(touch.clientY);
          }}
        >
          {/* Background rail */}
          <span
            aria-hidden="true"
            className="timeline-rail timeline-rail--bg absolute left-2.5 top-2 bottom-2 w-px md:left-3.5"
          />
          {/* Animated progress fill */}
          <span
            aria-hidden="true"
            className="timeline-rail timeline-rail--fill absolute left-2.5 top-2 w-px md:left-3.5"
            style={{ height: `calc((100% - 1rem) * ${progress})` }}
          />

          <ol className="relative space-y-10 md:space-y-12">
            {experiences.map((exp, idx) => {
              const isActive = idx <= activeIndex;
              return (
                <Reveal key={`${exp.company}-${exp.period}`} delay={idx * 0.05}>
                  <li className="relative grid gap-5 pl-10 md:grid-cols-[minmax(180px,260px)_1fr] md:gap-12 md:pl-14">
                    <span
                      aria-hidden="true"
                      className={`timeline-node absolute left-0 top-3 inline-flex h-5 w-5 items-center justify-center md:left-1 ${isActive ? "is-active" : ""}`}
                    >
                      <span className="timeline-node-ring absolute h-5 w-5 rounded-full" />
                      <span className="timeline-node-dot relative h-2.5 w-2.5 rounded-full ring-2 ring-[rgb(var(--bg))]" />
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-start gap-3">
                        <CompanyLogo src={exp.logo} alt={exp.logoAlt} />
                        <div className="min-w-0">
                          <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-accent">
                            {exp.period}
                          </p>
                          <h3 className="mt-2 font-display text-2xl leading-tight text-ink sm:text-3xl md:text-4xl">
                            {exp.role}
                          </h3>
                          <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-accent-secondary">
                            {exp.company}
                          </p>
                          <p className="mt-1 font-mono text-[0.6rem] text-ink-subtle">
                            {exp.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    <ul className="achievement-list min-w-0 list-none space-y-3 border-t border-[rgb(var(--border)/0.2)] pt-5 md:border-t-0 md:pt-0">
                      {exp.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
