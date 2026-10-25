import { defaultLocale, locales, pickLocale } from "~/lib/i18n/config";

const base = import.meta.env.BASE_URL;

// Runs while the prerendered HTML is parsed, before the meta refresh fires.
const redirectScript = `location.replace(${JSON.stringify(base)} + (${pickLocale.toString()})(navigator.languages || [navigator.language], ${JSON.stringify(locales)}, ${JSON.stringify(defaultLocale)}) + "/");`;

export function meta() {
  return [
    { name: "robots", content: "noindex" },
    // Without JS (and for crawlers): the default locale.
    { httpEquiv: "refresh", content: `0; url=${base}${defaultLocale}/` },
  ];
}

/** `/`: sends the visitor to their browser language, else `/en/`. */
export default function RootRedirect() {
  return <script dangerouslySetInnerHTML={{ __html: redirectScript }} />;
}
