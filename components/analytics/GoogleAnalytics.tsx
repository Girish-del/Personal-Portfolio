"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { GA_MEASUREMENT_ID, isGaEnabled, pageview } from "@/lib/gtag";

/**
 * Sends a page_view on every route/query change. We disable gtag's automatic
 * page_view (`send_page_view: false`) and fire it here so the count is correct
 * if more pages are ever added. On the current single-page site this fires once
 * on load — which still carries the utm_* params for source/medium attribution.
 *
 * useSearchParams requires a Suspense boundary in the App Router, so this is
 * split into its own component wrapped in <Suspense> below.
 */
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    pageview(url);
  }, [pathname, searchParams]);

  return null;
}

/**
 * Loads gtag.js and initializes GA4. Renders nothing unless we're in a
 * production build with NEXT_PUBLIC_GA_ID set (see lib/gtag.ts).
 */
export function GoogleAnalytics() {
  if (!isGaEnabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}
