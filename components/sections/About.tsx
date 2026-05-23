"use client";

import { Download, Github, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import { personal } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden py-20 md:py-32"
    >
      <div className="gutter-x mx-auto max-w-[1200px]">
        <SectionHeader
          chapter="02"
          label="About"
          title="A little more context."
        />

        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <Reveal>
            <div className="space-y-5">
              {personal.aboutLong.map((para) => (
                <p key={para.slice(0, 24)} className="text-base leading-[1.85] text-ink-muted md:text-lg">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <aside className="border border-[rgb(var(--border)/0.35)] bg-[rgb(var(--surface-elev)/0.55)] p-6 md:p-8">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent-secondary">
                Find me
              </p>

              <ul className="mt-4 space-y-3">
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
                className="btn-primary mt-7 w-full"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
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
      <span className="flex items-center gap-3 text-ink-muted group-hover:text-accent">
        <span className="text-accent-secondary">{icon}</span>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em]">
          {label}
        </span>
      </span>
      <span className="truncate text-sm text-ink">{value}</span>
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
