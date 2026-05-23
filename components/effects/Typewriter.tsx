"use client";

import { useEffect, useState } from "react";

type Props = {
  words: readonly string[];
  typeSpeed?: number;
  eraseSpeed?: number;
  holdMs?: number;
  className?: string;
};

export function Typewriter({
  words,
  typeSpeed = 75,
  eraseSpeed = 40,
  holdMs = 1400,
  className,
}: Props) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "erasing">("typing");

  useEffect(() => {
    const current = words[index % words.length];

    if (phase === "typing") {
      if (text.length < current.length) {
        const t = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typeSpeed,
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("erasing"), holdMs);
      return () => clearTimeout(t);
    }

    if (phase === "erasing") {
      if (text.length > 0) {
        const t = setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          eraseSpeed,
        );
        return () => clearTimeout(t);
      }
      setIndex((prev) => (prev + 1) % words.length);
      setPhase("typing");
    }
  }, [text, phase, index, words, typeSpeed, eraseSpeed, holdMs]);

  return (
    <span className={className}>
      <span aria-live="polite">{text}</span>
      <span
        className="ml-0.5 inline-block h-[1em] w-[2px] -translate-y-[2px] bg-current align-middle animate-caret"
        aria-hidden="true"
      />
    </span>
  );
}
