import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "source.unsplash.com", pathname: "/*" },
      { protocol: "https", hostname: "i.pravatar.cc", pathname: "/*" },
      { protocol: "https", hostname: "cdn.quasar.dev", pathname: "/*" },
      { protocol: "https", hostname: "vuejs.org", pathname: "/**" },
      { protocol: "https", hostname: "firebase.google.com", pathname: "/**" },
      { protocol: "https", hostname: "pinia.esm.dev", pathname: "/**" },
      { protocol: "https", hostname: "nodejs.org", pathname: "/**" },
      { protocol: "https", hostname: "expressjs.com", pathname: "/**" },
      { protocol: "https", hostname: "www.postgresql.org", pathname: "/**" },
      { protocol: "https", hostname: "vercel.com", pathname: "/**" },
      { protocol: "https", hostname: "railway.app", pathname: "/**" },
      { protocol: "https", hostname: "www.woocommerce.com", pathname: "/**" },
      { protocol: "https", hostname: "laravel.com", pathname: "/**" },
      { protocol: "https", hostname: "www.mysql.com", pathname: "/**" },
      { protocol: "https", hostname: "vuex.vuejs.org", pathname: "/**" },
      { protocol: "https", hostname: "upload.wikimedia.org", pathname: "/**" },
      { protocol: "https", hostname: "pbs.twimg.com", pathname: "/**" },
      { protocol: "https", hostname: "www.svgrepo.com", pathname: "/**" },
    ],
  },
};

export default withSentryConfig(withNextIntl(nextConfig), {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "geome7ric-m2",
  project: "web",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
