import { DEFAULT_SITE_URL, resolveIndexable, resolveSiteUrl } from "./site";

describe("resolveSiteUrl", () => {
  it("defaults to the GitHub Pages origin", () => {
    expect(resolveSiteUrl({})).toBe(DEFAULT_SITE_URL);
  });

  it("uses SITE_URL when set", () => {
    expect(resolveSiteUrl({ SITE_URL: "https://example.com" })).toBe(
      "https://example.com",
    );
  });

  it("rejects a value with a path or trailing slash", () => {
    expect(() =>
      resolveSiteUrl({ SITE_URL: "https://example.com/" }),
    ).toThrow();
    expect(() =>
      resolveSiteUrl({ SITE_URL: "https://example.com/solegal-web" }),
    ).toThrow();
    expect(() => resolveSiteUrl({ SITE_URL: "example.com" })).toThrow();
  });
});

describe("resolveIndexable", () => {
  it("is off by default", () => {
    expect(resolveIndexable({})).toBe(false);
    expect(resolveIndexable({ SITE_INDEXABLE: "1" })).toBe(false);
  });

  it('is on only for "true"', () => {
    expect(resolveIndexable({ SITE_INDEXABLE: "true" })).toBe(true);
  });
});
