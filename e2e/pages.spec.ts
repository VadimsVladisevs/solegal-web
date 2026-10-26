import { type Page, expect, test } from "@playwright/test";

const locales = ["en", "lv", "ru"];
const variants = [
  { name: "A", path: "" },
  { name: "B", path: "b/" },
  { name: "C", path: "c/" },
];

for (const locale of locales) {
  for (const { name, path } of variants) {
    test(`/${locale}/${path} shows every section`, async ({ page }) => {
      await page.goto(`./${locale}/${path}`);
      for (const id of ["top", "about", "team", "contact"]) {
        await expect(page.locator(`#${id}`)).toBeVisible();
      }
      await expect(page.locator("#team article")).toHaveCount(3);
      await expect(page.locator("#contact a[href^='mailto:']")).toHaveAttribute(
        "href",
        "mailto:info@example.com",
      );
      await expect(page.locator("#contact a[href^='tel:']")).toHaveAttribute(
        "href",
        "tel:+37120000000",
      );
      await expect(
        page.locator("nav a[aria-current='page']", { hasText: name }),
      ).toBeVisible();
    });
  }
}

test("the design switcher keeps the locale", async ({ page }) => {
  await page.goto("./lv/");
  const linkC = page
    .getByRole("navigation", { name: "Dizains" })
    .getByRole("link", { name: "C", exact: true });
  await linkC.click();
  await expect(page).toHaveURL(/\/lv\/c\/$/);
  await expect(linkC).toHaveAttribute("aria-current", "page");
});

// The page's own 404 response is logged as a console error; ignore only that.
function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    if (msg.text().includes("status of 404")) return;
    errors.push(msg.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

test.describe("404 page", () => {
  for (const [path, lang, title] of [
    ["en/missing", "en", "Page not found"],
    ["lv/missing/", "lv", "Lapa nav atrasta"],
    ["ru/a/b/", "ru", "Страница не найдена"],
  ] as const) {
    test(`/${path} answers 404 in ${lang}`, async ({ page }) => {
      const errors = trackErrors(page);
      const response = await page.goto(`./${path}`);
      expect(response?.status()).toBe(404);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      await page.waitForLoadState("networkidle");
      expect(errors).toEqual([]);
    });
  }

  test("an unknown first segment falls back to English", async ({ page }) => {
    const response = await page.goto("./xyz/");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Page not found",
    );
  });

  test("links back to the home page of its locale", async ({ page }) => {
    await page.goto("./lv/missing");
    await page.getByRole("link", { name: "Uz sākumlapu" }).click();
    await expect(page).toHaveURL(/\/lv\/$/);
  });

  test.describe("without JavaScript", () => {
    test.use({ javaScriptEnabled: false });

    test("shows the English page", async ({ page }) => {
      await page.goto("./lv/missing");
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Page not found",
      );
    });
  });
});
