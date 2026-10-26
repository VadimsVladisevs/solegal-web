import type { Config } from "@react-router/dev/config";
import { locales } from "./app/lib/i18n/config.ts";
import { basePath } from "./base-path.ts";

// Pages under each locale: "" is the home page; "b/" and "c/" are the design
// variants (removed in step 11).
const pages = ["", "b/", "c/"];

export default {
  // Static site: no server at runtime, every route is prerendered at build time.
  ssr: false,
  prerender: [
    "/",
    "/sitemap.xml",
    "/robots.txt",
    "/manifest.webmanifest",
    ...locales.flatMap((locale) => pages.map((page) => `/${locale}/${page}`)),
  ],
  basename: basePath,
} satisfies Config;
