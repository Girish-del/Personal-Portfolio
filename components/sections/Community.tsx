"use client";

import { sideQuests } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { QuestCard } from "@/components/ui/QuestCard";

const entries = sideQuests.filter((q) => q.category === "Community");

export function Community() {
  return (
    <section
      id="community"
      aria-labelledby="community-heading"
      className="relative overflow-hidden py-20 md:py-32"
    >
      <div className="gutter-x mx-auto max-w-[1200px]">
        <SectionHeader
          chapter="07"
          label="Community"
          title="Where I've shown up for others."
          description="Mentoring, study groups, and the communities that shaped how I learn."
        />

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
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
