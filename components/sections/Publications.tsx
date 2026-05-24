"use client";

import { publications } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { PublicationCard } from "@/components/ui/PublicationCard";
import { QuestCard } from "@/components/ui/QuestCard";

export function Publications() {
  return (
    <section
      id="publications"
      aria-labelledby="publications-heading"
      className="editorial-panel relative overflow-hidden py-20 md:py-32"
    >
      <div className="gutter-x mx-auto max-w-[1200px]">
        <SectionHeader
          chapter="06"
          label="Publications"
          title="Research I've put on paper."
          description="Peer-reviewed work on knowledge graphs, semantic web, and applied AI systems."
        />

        <div className="grid gap-4 sm:gap-5">
          {publications.map((pub, idx) => (
            <Reveal key={pub.slug} delay={idx * 0.06}>
              {pub.pdfHref && pub.pdfFileName ? (
                <PublicationCard
                  publication={{
                    ...pub,
                    pdfHref: pub.pdfHref,
                    pdfFileName: pub.pdfFileName,
                  }}
                />
              ) : (
                <QuestCard quest={pub} />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
