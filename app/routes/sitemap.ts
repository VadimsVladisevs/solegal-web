import { locales } from "~/lib/i18n/config";
import { localeUrl } from "~/lib/seo/meta";
import { siteUrl } from "../../site";

/** `sitemap.xml`: the home page of every locale, with hreflang alternates. */
export function loader() {
  const base = import.meta.env.BASE_URL;
  const alternates = locales
    .map(
      (locale) =>
        `    <xhtml:link rel="alternate" hreflang="${locale}" href="${localeUrl(siteUrl, base, locale)}"/>`,
    )
    .join("\n");
  const urls = locales
    .map(
      (locale) =>
        `  <url>\n    <loc>${localeUrl(siteUrl, base, locale)}</loc>\n${alternates}\n  </url>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
