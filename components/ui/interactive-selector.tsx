"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type GallerySlide = {
  src: string;
  alt: string;
  title: string;
  description?: string;
};

type Props = {
  slides: readonly GallerySlide[];
  period?: string;
  className?: string;
};

export function InteractiveSelector({ slides, period, className }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedSrc, setFailedSrc] = useState<Set<string>>(new Set());

  if (slides.length === 0) return null;

  const total = slides.length;
  const slide = slides[activeIndex];
  const failed = failedSrc.has(slide.src);

  const goTo = (index: number) => {
    setActiveIndex((index + total) % total);
  };

  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  return (
    <div
      className={`project-gallery relative aspect-[4/3] w-full max-w-full min-h-0 overflow-hidden bg-[rgb(var(--surface))] md:min-h-[380px] lg:min-h-[420px] ${className ?? ""}`}
      aria-roledescription="carousel"
      aria-label="Project screenshots"
    >
      <div className="relative h-full w-full max-w-full overflow-hidden">
        <div
          className="project-gallery-track flex h-full w-full max-w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((item, index) => {
            const itemFailed = failedSrc.has(item.src);
            return (
              <div
                key={`${item.src}-${index}`}
                className="relative h-full w-full shrink-0 grow-0 basis-full"
                aria-hidden={index !== activeIndex}
              >
                {itemFailed ? (
                  <div className="project-gallery-placeholder flex h-full w-full flex-col items-center justify-center px-4 text-center leading-7">
                    <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-accent-secondary">
                      {item.title}
                    </p>
                    <code className="mt-2 max-w-full break-all font-mono text-[0.55rem] leading-7 text-accent-hot">
                      {item.src}
                    </code>
                  </div>
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 767px) calc(100vw - 2.5rem), (min-width: 1280px) 700px, 50vw"
                    className="project-gallery-image object-contain object-center"
                    onError={() =>
                      setFailedSrc((prev) => new Set(prev).add(item.src))
                    }
                    priority={index === 0}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous screenshot"
            className="project-gallery-nav project-gallery-nav--prev touch-target"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next screenshot"
            className="project-gallery-nav project-gallery-nav--next touch-target"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="project-gallery-dots" role="tablist" aria-label="Screenshot slides">
            {slides.map((item, index) => (
              <button
                key={`dot-${item.src}-${index}`}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`${item.title}${item.description ? ` — ${item.description}` : ""}`}
                onClick={() => goTo(index)}
                className={`project-gallery-dot ${index === activeIndex ? "is-active" : ""}`}
              />
            ))}
          </div>
        </>
      )}

      {!failed && slide.description && (
        <p className="project-gallery-caption pointer-events-none leading-7">
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] leading-7 text-[rgb(var(--bg))]">
            {slide.title}
          </span>
          <span className="mt-0.5 block text-[0.68rem] leading-7 text-[rgb(var(--bg)/0.85)]">
            {slide.description}
          </span>
        </p>
      )}

      {period && <span className="project-gallery-period">{period}</span>}
    </div>
  );
}
