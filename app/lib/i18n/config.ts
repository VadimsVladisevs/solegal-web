export const locales = ["en", "lv", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Endonyms for the language switcher; the same in every locale. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  lv: "Latviešu",
  ru: "Русский",
};

export function isLocale(value: unknown): value is Locale {
  return locales.includes(value as Locale);
}

/**
 * Picks the first supported locale from the browser's language list
 * (`lv-LV` → `lv`), or the fallback.
 *
 * Self-contained on purpose: the root redirect page inlines it as a script.
 */
export function pickLocale(
  languages: readonly string[],
  supported: readonly string[],
  fallback: string,
): string {
  for (const language of languages) {
    const code = language.toLowerCase().split("-")[0];
    if (code && supported.includes(code)) return code;
  }
  return fallback;
}

/** The locale a path starts with (`/lv/…` → `lv`), else the default. */
export function localeFromPath(pathname: string): Locale {
  const segment = pathname.split("/")[1];
  return isLocale(segment) ? segment : defaultLocale;
}

/** The same page in another locale: `/en/b` → `/lv/b`. */
export function localizedPath(pathname: string, locale: Locale): string {
  const [, , ...rest] = pathname.split("/");
  return ["", locale, ...rest].join("/");
}
