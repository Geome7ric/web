import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  i18n: {
    locales: ["es"],
    defaultLocale: "es",
    localeDetection: false,
  },
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
    ],
  },
};

export default nextConfig;
