import { locales } from "~/lib/i18n/config";
import { localContent, localDictionaries, localSource } from "./local-source";

/** Every leaf path of an object, e.g. `nav.about` or `team.0.name`. */
function paths(value: unknown, prefix = ""): string[] {
  if (value === null || typeof value !== "object") return [prefix];
  return Object.entries(value).flatMap(([key, child]) =>
    paths(child, prefix ? `${prefix}.${key}` : key),
  );
}

function emptyStrings(value: unknown): string[] {
  return paths(value).filter((path) => {
    const leaf = path
      .split(".")
      .reduce<unknown>(
        (node, key) => (node as Record<string, unknown>)[key],
        value,
      );
    return typeof leaf === "string" && leaf.trim() === "";
  });
}

describe.each(locales.filter((locale) => locale !== "en"))(
  "locale %s",
  (locale) => {
    it("has every dictionary key that en has, and no others", () => {
      expect(paths(localDictionaries[locale]).sort()).toEqual(
        paths(localDictionaries.en).sort(),
      );
    });

    it("has every content item that en has", () => {
      expect(paths(localContent[locale]).sort()).toEqual(
        paths(localContent.en).sort(),
      );
    });
  },
);

describe.each(locales)("locale %s", (locale) => {
  it("has no empty strings", () => {
    expect(emptyStrings(localDictionaries[locale])).toEqual([]);
    expect(emptyStrings(localContent[locale])).toEqual([]);
  });

  it("is served by localSource", async () => {
    expect(await localSource.getDictionary(locale)).toBe(
      localDictionaries[locale],
    );
    expect(await localSource.getSiteSettings(locale)).toBe(
      localContent[locale].siteSettings,
    );
    expect(await localSource.getServices(locale)).toBe(
      localContent[locale].services,
    );
    expect(await localSource.getTeam(locale)).toBe(localContent[locale].team);
    expect(await localSource.getContactInfo(locale)).toBe(
      localContent[locale].contactInfo,
    );
    expect(await localSource.getPartners(locale)).toBe(
      localContent[locale].partners,
    );
  });
});
