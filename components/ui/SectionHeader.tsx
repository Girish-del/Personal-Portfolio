"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type Props = {
  chapter?: string;
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  chapter,
  label,
  title,
  description,
  align = "left",
  className,
}: Props) {
  return (
    <Reveal
      className={cn(
        "relative mb-10 md:mb-14",
        align === "center" && "text-center",
        className,
      )}
    >
      {chapter && (
        <span className="chapter-num" aria-hidden="true">
          {chapter}
        </span>
      )}
      <p className="section-label">{label}</p>
      <h2 className="section-title">{title}</h2>
      {description && (
        <p
          className={cn(
            "editorial-body",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
