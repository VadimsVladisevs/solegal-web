import { createContext, useContext } from "react";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/en";

export interface I18n {
  locale: Locale;
  dictionary: Dictionary;
}

/** Provided by the `:lang` layout route from its loader data. */
export const I18nContext = createContext<I18n | null>(null);

function useI18n(): I18n {
  const i18n = useContext(I18nContext);
  if (!i18n) throw new Error("useT() must be used under the :lang route");
  return i18n;
}

/** UI strings of the current locale: `const t = useT(); t.nav.about`. */
export function useT(): Dictionary {
  return useI18n().dictionary;
}

export function useLocale(): Locale {
  return useI18n().locale;
}
