/**
 * Google Analytics 4 helpers.
 *
 * The Measurement ID is read from the NEXT_PUBLIC_GA_ID environment variable so
 * it is never hardcoded in source. Set it locally in `.env.local` and in
 * Netlify > Site settings > Environment variables. See `.env.example`.
 *
 * GA only runs in production with a configured ID — this keeps localhost and
 * preview traffic out of your analytics. GA4 captures utm_* params + referrer
 * automatically, which powers the source/medium (resume QR vs LinkedIn vs
 * search vs direct) breakdown in Acquisition reports.
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

/** True only in a production build with a Measurement ID present. */
export const isGaEnabled =
  process.env.NODE_ENV === "production" && GA_MEASUREMENT_ID.length > 0;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Send a manual page_view (automatic page_view is disabled in the config). */
export function pageview(url: string): void {
  if (!isGaEnabled || typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", "page_view", { page_path: url });
}

/** Send a custom GA4 event. No-ops outside production / before gtag loads. */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (!isGaEnabled || typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", name, params);
}

/**
 * Named conversion-event helpers — keeps event names consistent across the app
 * so they line up cleanly as Key events in GA4.
 */
export const analyticsEvents = {
  /** Fired when the resume PDF is downloaded. `source` = where it was clicked. */
  resumeDownload: (source: string): void =>
    trackEvent("resume_download", { source }),
  /** Fired when a "Say hi" / email link is clicked. */
  emailClick: (source: string): void => trackEvent("email_click", { source }),
  /** Fired when a project's GitHub link is clicked. */
  projectGithubClick: (project: string): void =>
    trackEvent("project_github_click", { project }),
};
