"use client";

import { sideQuests } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { QuestCard } from "@/components/ui/QuestCard";

const entries = sideQuests.filter((q) => q.category === "Talk");

export function Talks() {
  return (
    <section
      id="talks"
      aria-labelledby="talks-heading"
      className="editorial-panel relative overflow-hidden py-20 md:py-32"
    >
      <div className="gutter-x mx-auto max-w-[1200px]">
        <SectionHeader
          chapter="08"
          label="Talks"
          title="Things I've stood up and said out loud."
          description="Lightning talks and internal sessions on systems, migrations, and observability."
        />

        <div className="grid gap-4 sm:gap-5">
          {entries.map((entry, idx) => (
            <Reveal key={entry.slug} delay={idx * 0.06}>
              <QuestCard quest={entry} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
