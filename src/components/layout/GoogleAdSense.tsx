import Script from "next/script";

const ADSENSE_CLIENT = "ca-pub-7437600921659787";

/**
 * Google AdSense base loader.
 *
 * Injects the adsbygoogle.js loader using `next/script` with
 * `afterInteractive` strategy — loads after the page becomes interactive.
 * Loads only in production (consistent with GoogleAnalytics).
 *
 * Place this in the root layout, next to <GoogleAnalytics />.
 */
export function GoogleAdSense() {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
