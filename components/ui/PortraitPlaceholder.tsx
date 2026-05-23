"use client";

type Props = {
  label: string;
  path: string;
  hint?: string;
  className?: string;
};

export function PortraitPlaceholder({ label, path, hint, className }: Props) {
  return (
    <div
      className={`flex flex-col items-center justify-center px-6 text-center ${className ?? ""}`}
      style={{ backgroundColor: "rgb(var(--surface))" }}
    >
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-accent">
        {label}
      </p>
      <p className="mt-3 max-w-xs font-mono text-xs leading-relaxed text-ink-muted">
        Add your photo at <code className="text-accent-hot">{path}</code>
        {hint && (
          <span className="mt-2 block text-ink-subtle">{hint}</span>
        )}
      </p>
    </div>
  );
}
