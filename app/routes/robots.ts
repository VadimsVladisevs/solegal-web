import { absoluteUrl } from "~/lib/seo/meta";
import { siteUrl } from "../../site";

/**
 * `robots.txt`. It never disallows crawling: that would hide the `noindex`
 * tag from crawlers and block link-preview bots. Indexing is controlled by
 * `SITE_INDEXABLE` on the pages instead.
 */
export function loader() {
  const sitemap = absoluteUrl(siteUrl, import.meta.env.BASE_URL, "sitemap.xml");
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
