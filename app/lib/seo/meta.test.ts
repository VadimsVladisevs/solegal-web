import { type SeoInput, seoMeta, withNoindex } from "./meta";

// Meta descriptors are a loose union; read them as plain records.
const tags = (input: SeoInput) => seoMeta(input) as Record<string, unknown>[];

const input: SeoInput = {
  siteUrl: "https://example.com",
  basePath: "/solegal-web/",
  locale: "lv",
  title: "Title",
  description: "Description",
  firmName: "SO Legal",
  email: "info@example.com",
  phone: "+371 2000 0000",
  indexable: true,
};

describe("seoMeta", () => {
  it("sets the title, description and canonical of the locale home", () => {
    const meta = seoMeta(input);
    expect(meta).toContainEqual({ title: "Title" });
    expect(meta).toContainEqual({
      name: "description",
      content: "Description",
    });
    expect(meta).toContainEqual({
      tagName: "link",
      rel: "canonical",
      href: "https://example.com/solegal-web/lv/",
    });
  });

  it("links every locale and x-default (the default locale)", () => {
    const alternates = tags(input).filter((tag) => tag.rel === "alternate");
    expect(alternates.map((tag) => [tag.hrefLang, tag.href])).toEqual([
      ["en", "https://example.com/solegal-web/en/"],
      ["lv", "https://example.com/solegal-web/lv/"],
      ["ru", "https://example.com/solegal-web/ru/"],
      ["x-default", "https://example.com/solegal-web/en/"],
    ]);
  });

  it("adds Open Graph tags with an absolute image URL", () => {
    const meta = seoMeta(input);
    expect(meta).toContainEqual({
      property: "og:image",
      content: "https://example.com/solegal-web/og-image.png",
    });
    expect(meta).toContainEqual({ property: "og:locale", content: "lv_LV" });
    expect(
      meta.filter(
        (tag) => "property" in tag && tag.property === "og:locale:alternate",
      ),
    ).toHaveLength(2);
  });

  it("adds noindex only when the page is not indexable", () => {
    const robots = { name: "robots", content: "noindex" };
    expect(seoMeta(input)).not.toContainEqual(robots);
    expect(seoMeta({ ...input, indexable: false })).toContainEqual(robots);
  });

  it("describes the firm as a LegalService", () => {
    const jsonLd = tags(input).find((tag) => "script:ld+json" in tag);
    expect(jsonLd?.["script:ld+json"]).toMatchObject({
      "@type": "LegalService",
      name: "SO Legal",
      url: "https://example.com/solegal-web/lv/",
      telephone: "+37120000000",
    });
  });
});

describe("withNoindex", () => {
  it("keeps the tags and adds a single noindex", () => {
    const meta = withNoindex(seoMeta({ ...input, indexable: false }));
    expect(meta).toContainEqual({ title: "Title" });
    expect(
      meta.filter((tag) => "name" in tag && tag.name === "robots"),
    ).toEqual([{ name: "robots", content: "noindex" }]);
  });
});
