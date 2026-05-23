"use client";

import { useState } from "react";
import { Download, Github, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import { aboutFlashCards, personal } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="editorial-panel relative overflow-hidden py-20 md:py-32"
    >
      <div className="gutter-x mx-auto max-w-[1280px]">
        <SectionHeader
          chapter="02"
          label="About"
          title="A little more context."
        />

        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.9fr] lg:gap-12 xl:gap-16">
          <Reveal>
            <div className="space-y-4 sm:space-y-5">
              {personal.aboutLong.map((para) => (
                <p
                  key={para.slice(0, 24)}
                  className="text-base leading-[1.85] text-ink-muted sm:text-lg"
                >
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <aside className="border border-[rgb(var(--border)/0.35)] bg-[rgb(var(--surface-elev)/0.55)] p-5 sm:p-6 md:p-8">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent-secondary">
                Find me
              </p>

              <ul className="mt-4 space-y-1">
                <ContactRow
                  icon={<Mail className="h-4 w-4" />}
                  label="Email"
                  value={personal.email}
                  href={`mailto:${personal.email}`}
                />
                <ContactRow
                  icon={<Linkedin className="h-4 w-4" />}
                  label="LinkedIn"
                  value="@girish-nalawade"
                  href={personal.linkedin}
                  external
                />
                <ContactRow
                  icon={<Instagram className="h-4 w-4" />}
                  label="Instagram"
                  value="@girish.codes"
                  href={personal.instagram}
                  external
                />
                <ContactRow
                  icon={<Github className="h-4 w-4" />}
                  label="GitHub"
                  value="@Girish-del"
                  href={personal.github}
                  external
                />
                <ContactRow
                  icon={<MapPin className="h-4 w-4" />}
                  label="Based in"
                  value={personal.location}
                />
              </ul>

              <a
                href={personal.resumeHref}
                download={personal.resumeFileName}
                className="btn-primary mt-6 w-full sm:mt-7"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </aside>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-14 md:mt-20">
            <p className="section-label">Quick cards</p>
            <h3 className="mb-6 font-display text-3xl text-ink sm:text-4xl">
              Tap to flip
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
              {aboutFlashCards.map((card, idx) => (
                <FlashCard key={card.front} card={card} index={idx} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FlashCard({
  card,
  index,
}: {
  card: (typeof aboutFlashCards)[number];
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={flipped}
      onClick={() => setFlipped((f) => !f)}
      className={`flash-card touch-target min-h-[120px] sm:min-h-[140px] ${flipped ? "is-flipped" : ""}`}
      style={{ animationDelay: `${index * 0.04}s` }}
    >
      <span className="flash-card-inner">
        <span className="flash-card-face flash-card-front">
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-accent-secondary">
            {card.front}
          </span>
        </span>
        <span className="flash-card-face flash-card-back">
          <span className="text-xs leading-relaxed text-ink-muted sm:text-sm">
            {card.back}
          </span>
        </span>
      </span>
    </button>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <span className="flex items-center justify-between gap-3 border-b border-[rgb(var(--border)/0.18)] py-2.5 transition-colors group-hover:border-accent">
      <span className="flex min-w-0 items-center gap-2.5 text-ink-muted group-hover:text-accent sm:gap-3">
        <span className="shrink-0 text-accent-secondary">{icon}</span>
        <span className="truncate font-mono text-[0.58rem] uppercase tracking-[0.16em] sm:text-[0.6rem]">
          {label}
        </span>
      </span>
      <span className="hidden truncate text-sm text-ink sm:inline">{value}</span>
    </span>
  );

  if (!href) {
    return <li className="group">{inner}</li>;
  }

  return (
    <li className="group">
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="block"
      >
        {inner}
      </a>
    </li>
  );
}
