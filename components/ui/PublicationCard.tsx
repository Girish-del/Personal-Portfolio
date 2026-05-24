"use client";

import Image from "next/image";
import { ArrowUpRight, FileText } from "lucide-react";
import type { SideQuest } from "@/lib/content";
import { PublicationPdfViewer } from "@/components/ui/PublicationPdfViewer";

type Props = {
  publication: SideQuest & {
    pdfHref: NonNullable<SideQuest["pdfHref"]>;
    pdfFileName: NonNullable<SideQuest["pdfFileName"]>;
  };
};

export function PublicationCard({ publication }: Props) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden border border-[rgb(var(--border)/0.3)] bg-[rgb(var(--surface-elev)/0.45)] transition-colors hover:border-accent">
      <PublicationPdfViewer
        src={publication.pdfHref}
        title={publication.title}
        fileName={publication.pdfFileName}
        period={publication.period}
      />

      <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent">
            <FileText className="h-3.5 w-3.5" /> Publication
          </p>
          <h3 className="mt-2 font-display text-2xl leading-tight text-ink md:text-3xl">
            {publication.title}
          </h3>
          <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-accent-secondary">
            {publication.subtitle}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-ink-muted">
          {publication.description}
        </p>

        {publication.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {publication.tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
        )}

        {(publication.href || publication.scholarHref) && (
          <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-2">
            {publication.href && (
              <a
                href={publication.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-accent hover:text-accent-hot"
              >
                Read on IEEE Xplore
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            {publication.scholarHref && (
              <a
                href={publication.scholarHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-accent hover:text-accent-hot"
              >
                <Image
                  src="/logos/google-scholar.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="shrink-0"
                />
                Google Scholar
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
