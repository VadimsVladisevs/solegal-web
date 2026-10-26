import { type Page, expect, test } from "@playwright/test";
import { basePath } from "../base-path.ts";
import { indexable, siteUrl } from "../site.ts";

const locales = ["en", "lv", "ru"];
const homeUrl = (locale: string) => `${siteUrl}${basePath}${locale}/`;

async function attr(page: Page, selector: string, name: string) {
  return page.locator(`head ${selector}`).getAttribute(name);
}

for (const locale of locales) {
  test(`/${locale}/ has SEO and link-preview tags`, async ({ page }) => {
    await page.goto(`./${locale}/`);

    await expect(page).toHaveTitle(/SO Legal/);
    expect(
      await attr(page, "meta[name='description']", "content"),
    ).toBeTruthy();
    expect(await attr(page, "link[rel='canonical']", "href")).toBe(
      homeUrl(locale),
    );
    for (const alternate of locales) {
      expect(await attr(page, `link[hreflang='${alternate}']`, "href")).toBe(
        homeUrl(alternate),
      );
    }
    expect(await attr(page, "link[hreflang='x-default']", "href")).toBe(
      homeUrl("en"),
    );

    expect(await attr(page, "meta[property='og:url']", "content")).toBe(
      homeUrl(locale),
    );
    expect(await attr(page, "meta[property='og:image']", "content")).toBe(
      `${siteUrl}${basePath}og-image.png`,
    );
    expect(await attr(page, "meta[name='twitter:card']", "content")).toBe(
      "summary_large_image",
    );
    await expect(page.locator("head meta[name='robots']")).toHaveCount(
      indexable ? 0 : 1,
    );

    const jsonLd = JSON.parse(
      (await page
        .locator("head script[type='application/ld+json']")
        .textContent()) ?? "",
    );
    expect(jsonLd).toMatchObject({
      "@type": "LegalService",
      url: homeUrl(locale),
      inLanguage: locale,
    });
  });
}

test("design variants are noindex with the locale home as canonical", async ({
  page,
}) => {
  await page.goto("./lv/b/");
  expect(await attr(page, "meta[name='robots']", "content")).toBe("noindex");
  expect(await attr(page, "link[rel='canonical']", "href")).toBe(homeUrl("lv"));
});

test("sitemap.xml lists the home page of every locale", async ({ request }) => {
  const response = await request.get("./sitemap.xml");
  expect(response.ok()).toBe(true);
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  expect(urls).toEqual(locales.map(homeUrl));
});

test("robots.txt allows crawling and points to the sitemap", async ({
  request,
}) => {
  const text = await (await request.get("./robots.txt")).text();
  expect(text).toContain("Allow: /");
  expect(text).not.toContain("Disallow");
  expect(text).toContain(`Sitemap: ${siteUrl}${basePath}sitemap.xml`);
});

test("the manifest and icons are served", async ({ page, request }) => {
  await page.goto("./en/");
  const hrefs = await page
    .locator(
      "head link[rel='icon'], head link[rel='apple-touch-icon'], head link[rel='manifest']",
    )
    .evaluateAll((links) =>
      links.map((link) => (link as HTMLLinkElement).href),
    );
  expect(hrefs).toHaveLength(4);
  for (const href of hrefs) {
    expect((await request.get(href)).ok(), href).toBe(true);
  }
  const manifest = await (await request.get("./manifest.webmanifest")).json();
  for (const icon of manifest.icons) {
    expect((await request.get(`./${icon.src}`)).ok(), icon.src).toBe(true);
  }
});
