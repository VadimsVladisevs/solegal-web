import { type Page, expect, test } from "@playwright/test";

const locales = ["en", "lv", "ru"];
// Canonical URLs end with "/": static hosts redirect `/en/b` to `/en/b/`.
const pages = ["", "b/", "c/"];

function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("response", (response) => {
    const type = response.request().resourceType();
    if ((type === "script" || type === "stylesheet") && !response.ok()) {
      errors.push(`${response.status()} ${response.url()}`);
    }
  });
  return errors;
}

for (const locale of locales) {
  for (const path of pages) {
    test(`/${locale}/${path} is prerendered and loads cleanly`, async ({
      page,
    }) => {
      const errors = trackErrors(page);

      const response = await page.goto(`./${locale}/${path}`);
      expect(response?.ok()).toBe(true);
      // The served HTML must be the prerendered page, not the empty SPA fallback.
      const html = (await response?.text()) ?? "";
      expect(html).toContain(`<html lang="${locale}">`);
      expect(html).toMatch(/<h1>[^<]+<\/h1>/);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await page.waitForLoadState("networkidle");

      expect(errors).toEqual([]);
    });
  }
}

test.describe("root redirect", () => {
  for (const [browserLocale, expected] of [
    ["lv-LV", "lv"],
    ["ru-RU", "ru"],
    ["de-DE", "en"],
  ]) {
    test.describe(`browser language ${browserLocale}`, () => {
      test.use({ locale: browserLocale });

      test(`goes to /${expected}/`, async ({ page, baseURL }) => {
        await page.goto("./");
        await expect(page).toHaveURL(`${baseURL}${expected}/`);
      });
    });
  }

  test.describe("without JavaScript", () => {
    test.use({ javaScriptEnabled: false, locale: "lv-LV" });

    test("goes to /en/", async ({ page, baseURL }) => {
      await page.goto("./");
      await expect(page).toHaveURL(`${baseURL}en/`);
    });
  });
});
