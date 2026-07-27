import Script from "next/script";

const GA_MEASUREMENT_ID = "G-RQKGV34BL2";

/**
 * Google Analytics base component.
 *
 * Injects the gtag.js script and configures tracking using `next/script`
 * with `afterInteractive` strategy — loads after the page becomes interactive.
 *
 * Place this in the root layout, close to the opening `<body>` tag.
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries
 */
export function GoogleAnalytics() {
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
