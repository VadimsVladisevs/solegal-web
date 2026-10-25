import { en } from "~/content/en";
import { lv } from "~/content/lv";
import { ru } from "~/content/ru";
import type { LocaleContent } from "~/content/types";
import type { Locale } from "~/lib/i18n/config";
import type { Dictionary } from "~/lib/i18n/dictionaries/en";
import { en as enDictionary } from "~/lib/i18n/dictionaries/en";
import { lv as lvDictionary } from "~/lib/i18n/dictionaries/lv";
import { ru as ruDictionary } from "~/lib/i18n/dictionaries/ru";
import type { ContentSource } from "./source";

export const localContent: Record<Locale, LocaleContent> = { en, lv, ru };

export const localDictionaries: Record<Locale, Dictionary> = {
  en: enDictionary,
  lv: lvDictionary,
  ru: ruDictionary,
};

/** Reads the typed demo content in the repo (`app/content/`). */
export const localSource: ContentSource = {
  getDictionary: async (locale) => localDictionaries[locale],
  getSiteSettings: async (locale) => localContent[locale].siteSettings,
  getTeam: async (locale) => localContent[locale].team,
  getContactInfo: async (locale) => localContent[locale].contactInfo,
  getPartners: async (locale) => localContent[locale].partners,
};
