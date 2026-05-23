"use client";

/**
 * Tiled Warli folk-art line motif rendered as a fixed background layer.
 * Stays UNDER all page content (z-index < main). Pointer-events disabled.
 * The .warli-tile utility lives in globals.css with the SVG embedded as a data-URI.
 */
export function WarliBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base warm gradient — theme-aware via tokens */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--bg))] via-[rgb(var(--bg))] to-[rgb(var(--surface))]" />

      {/* Soft warm radial glows */}
      <div
        className="absolute -top-[18%] left-[-12%] h-[60vw] w-[60vw] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--accent-secondary) / 0.45) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-[-15%] right-[-12%] h-[55vw] w-[55vw] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--accent-hot) / 0.4) 0%, transparent 65%)",
        }}
      />

      {/* Warli folk-art tile */}
      <div className="warli-tile absolute inset-0" />
    </div>
  );
}
