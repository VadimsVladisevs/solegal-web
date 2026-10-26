import type { MetaDescriptor } from "react-router";
import { defaultLocale, type Locale, locales } from "~/lib/i18n/config";

/** Open Graph locale codes. */
const ogLocales: Record<Locale, string> = {
  en: "en_US",
  lv: "lv_LV",
  ru: "ru_RU",
};

/** Browser UI color: the brand token (`--color-brand` in app/styles/app.css). */
export const themeColor = "#2d5703";

/** Shared link-preview image in `public/`, 1200 × 630. */
export const ogImage = { path: "og-image.png", width: 1200, height: 630 };

/** The absolute URL of a path under the base path: `https://…/solegal-web/en/`. */
export function absoluteUrl(siteUrl: string, basePath: string, path: string) {
  return `${siteUrl}${basePath}${path}`;
}

/** The absolute URL of a locale's home page. */
export function localeUrl(siteUrl: string, basePath: string, locale: Locale) {
  return absoluteUrl(siteUrl, basePath, `${locale}/`);
}

/** A parent route's meta tags with `noindex` added. */
export function withNoindex(meta: MetaDescriptor[]): MetaDescriptor[] {
  const robots = { name: "robots", content: "noindex" };
  return [
    ...meta.filter((tag) => !("name" in tag && tag.name === "robots")),
    robots,
  ];
}

export interface SeoInput {
  siteUrl: string;
  basePath: string;
  locale: Locale;
  title: string;
  description: string;
  firmName: string;
  email: string;
  phone: string;
  /** False adds `noindex` (the demo). */
  indexable: boolean;
}

/**
 * Meta tags for a locale's home page: title, description, robots, canonical,
 * hreflang alternates, Open Graph, Twitter card and JSON-LD. The site is one
 * page per locale, so the canonical is always the locale home.
 */
export function seoMeta(input: SeoInput): MetaDescriptor[] {
  const { siteUrl, basePath, locale, title, description, firmName } = input;
  const url = localeUrl(siteUrl, basePath, locale);
  const image = absoluteUrl(siteUrl, basePath, ogImage.path);

  return [
    { title },
    { name: "description", content: description },
    ...(input.indexable ? [] : [{ name: "robots", content: "noindex" }]),
    { tagName: "link", rel: "canonical", href: url },
    ...locales.map((alternate) => ({
      tagName: "link",
      rel: "alternate",
      hrefLang: alternate,
      href: localeUrl(siteUrl, basePath, alternate),
    })),
    {
      tagName: "link",
      rel: "alternate",
      hrefLang: "x-default",
      href: localeUrl(siteUrl, basePath, defaultLocale),
    },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: firmName },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:image:width", content: String(ogImage.width) },
    { property: "og:image:height", content: String(ogImage.height) },
    { property: "og:locale", content: ogLocales[locale] },
    ...locales
      .filter((alternate) => alternate !== locale)
      .map((alternate) => ({
        property: "og:locale:alternate",
        content: ogLocales[alternate],
      })),
    { name: "twitter:card", content: "summary_large_image" },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "LegalService",
        name: firmName,
        url,
        email: input.email,
        telephone: input.phone.replace(/\s/g, ""),
        logo: absoluteUrl(siteUrl, basePath, "icon-512.png"),
        image,
        inLanguage: locale,
      },
    },
  ];
}
