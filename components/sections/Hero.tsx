"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowDown, Download, Mail } from "lucide-react";
import { personal, roleCycle } from "@/lib/content";
import { Typewriter } from "@/components/effects/Typewriter";

export function Hero() {
  const [heroOk, setHeroOk] = useState(true);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative grid grid-cols-1 overflow-hidden lg:min-h-[100svh] lg:grid-cols-[1.05fr_0.95fr]"
    >
      {/* Left — copy */}
      <div className="relative z-[2] flex flex-col gutter-x pb-16 pt-28 sm:pt-32 lg:justify-end lg:pb-24 lg:pt-40">
        <div className="relative z-[1] w-full max-w-full">
          <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-accent sm:tracking-[0.3em]">
            Software Engineer · {personal.location}
          </p>

          <h1
            id="hero-heading"
            className="font-display text-5xl leading-[0.92] text-ink sm:text-6xl md:text-7xl xl:text-8xl"
          >
            {personal.name.split(" ")[0]}
            <br />
            <span className="text-accent">
              {personal.name.split(" ").slice(1).join(" ")}
            </span>
          </h1>

          <p className="mt-5 max-w-[38ch] text-base leading-relaxed text-accent-secondary sm:text-lg md:text-xl">
            <Typewriter words={roleCycle} className="text-accent-secondary" />
          </p>

          <p className="editorial-body mt-5 mb-8 sm:mb-10">
            Backend systems, LLM agents, and cloud infrastructure — built to
            survive production. Currently completing my MS at Arizona State.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <a
              href={personal.resumeHref}
              download={personal.resumeFileName}
              className="btn-primary"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
            <a href={`mailto:${personal.email}`} className="btn-ghost">
              <Mail className="h-4 w-4" />
              Say hi
            </a>
            <a href="#about" className="btn-ghost">
              <ArrowDown className="h-4 w-4" />
              About me
            </a>
          </div>
        </div>
      </div>

      {/* Right — portrait */}
      <div className="relative order-first h-[55vh] min-h-[280px] w-full overflow-hidden sm:h-[60vh] lg:order-last lg:h-auto lg:min-h-[100svh]">
        {heroOk ? (
          <Image
            src={personal.heroImage}
            alt={`Portrait of ${personal.name}`}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[center_45%] saturate-[0.92] contrast-[1.05]"
            onError={() => setHeroOk(false)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ backgroundColor: "rgb(var(--surface))" }}>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-accent">
              Portrait placeholder
            </p>
            <p className="mt-3 max-w-xs font-mono text-xs leading-relaxed text-ink-muted">
              Add your photo at{" "}
              <code className="text-accent-hot">public/hero.jpg</code>
              <span className="mt-2 block text-ink-subtle">
                Recommended: 3:4 portrait, min 900×1200px
              </span>
            </p>
          </div>
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgb(var(--bg))] lg:bg-gradient-to-r lg:from-[rgb(var(--bg))] lg:via-transparent lg:to-transparent"
        />
        <span className="absolute bottom-8 right-8 z-10 hidden font-display text-sm tracking-[0.25em] text-accent-hot [writing-mode:vertical-rl] lg:block">
          BUILD · SHIP · LEARN
        </span>
      </div>
    </section>
  );
}
