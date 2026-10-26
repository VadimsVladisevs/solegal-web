import {
  isLocale,
  localeFromPath,
  localizedPath,
  locales,
  pickLocale,
} from "./config";

describe("isLocale", () => {
  it("accepts supported locales only", () => {
    expect(isLocale("lv")).toBe(true);
    expect(isLocale("de")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });
});

describe("pickLocale", () => {
  const pick = (languages: string[]) => pickLocale(languages, locales, "en");

  it("matches a region tag to its language", () => {
    expect(pick(["lv-LV"])).toBe("lv");
    expect(pick(["RU"])).toBe("ru");
  });

  it("takes the first supported language", () => {
    expect(pick(["de-DE", "ru", "lv"])).toBe("ru");
  });

  it("falls back when nothing matches", () => {
    expect(pick(["de", "fr"])).toBe("en");
    expect(pick([])).toBe("en");
  });

  it("works as a standalone function (inlined by the root redirect)", () => {
    const inlined = new Function(`return (${pickLocale.toString()})`)();
    expect(inlined(["lv"], locales, "en")).toBe("lv");
  });
});

describe("localizedPath", () => {
  it("swaps the locale segment and keeps the rest", () => {
    expect(localizedPath("/en/", "lv")).toBe("/lv/");
    expect(localizedPath("/en/b", "ru")).toBe("/ru/b");
    expect(localizedPath("/lv", "en")).toBe("/en");
  });
});

describe("localeFromPath", () => {
  it("reads the first path segment, else the default locale", () => {
    expect(localeFromPath("/lv/missing")).toBe("lv");
    expect(localeFromPath("/ru/")).toBe("ru");
    expect(localeFromPath("/xyz/")).toBe("en");
    expect(localeFromPath("/")).toBe("en");
  });
});
