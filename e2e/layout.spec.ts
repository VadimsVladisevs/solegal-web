import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const heroTitleLv =
  "Skaidras juridiskās konsultācijas uzņēmumiem un privātpersonām";

// The last one is the 404 page.
const pages = ["en/", "lv/b/", "ru/c/", "ru/missing/"];

for (const path of pages) {
  test(`/${path} has no serious or critical axe violations`, async ({
    page,
  }) => {
    await page.goto(`./${path}`);
    const { violations } = await new AxeBuilder({ page }).analyze();
    const serious = violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
}

test("the skip link is the first tab stop and moves focus to main", async ({
  page,
}) => {
  await page.goto("./en/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});

test("the language switcher keeps the design variant", async ({ page }) => {
  await page.goto("./en/b/");
  // The desktop header or the footer, whichever is visible first.
  await page
    .getByRole("navigation", { name: "Language" })
    .getByRole("link", { name: "lv" })
    .filter({ visible: true })
    .first()
    .click();
  await expect(page).toHaveURL(/\/lv\/b\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "lv");
  // The client-side navigation loaded the page's data (not the 404 page).
  await expect(page.locator("#team")).toBeVisible();
  await expect(page.locator("h1")).toHaveText(heroTitleLv);
});

test("the language switcher shows the page content in the new locale", async ({
  page,
}) => {
  await page.goto("./en/");
  await page
    .getByRole("navigation", { name: "Language" })
    .getByRole("link", { name: "lv" })
    .filter({ visible: true })
    .first()
    .click();
  await expect(page).toHaveURL(/\/lv\/$/);
  // From the page's own loader, not only the :lang layout's dictionary.
  await expect(page.locator("h1")).toHaveText(heroTitleLv);
});

test.describe("at 320px", () => {
  test.use({ viewport: { width: 320, height: 640 } });

  for (const path of pages) {
    test(`/${path} does not scroll horizontally`, async ({ page }) => {
      await page.goto(`./${path}`);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});

test.describe("on mobile", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile project only");

  test("touch targets in the header and menu are at least 44px", async ({
    page,
  }) => {
    await page.goto("./en/");
    await page.getByRole("button", { name: "Menu" }).click();
    const targets = page
      .locator("header")
      .locator("a, button")
      .filter({ visible: true });
    expect(await targets.count()).toBeGreaterThan(0);
    for (const target of await targets.all()) {
      const box = await target.boundingBox();
      const name = (await target.textContent()) ?? "";
      expect(box?.width, name).toBeGreaterThanOrEqual(44);
      expect(box?.height, name).toBeGreaterThanOrEqual(44);
    }
  });

  test("contact links and the design switcher are at least 44px", async ({
    page,
  }) => {
    await page.goto("./en/");
    const targets = page.locator("#contact a, nav[aria-label='Design'] a");
    expect(await targets.count()).toBe(5);
    for (const target of await targets.all()) {
      const box = await target.boundingBox();
      const name = (await target.textContent()) ?? "";
      expect(box?.width, name).toBeGreaterThanOrEqual(44);
      expect(box?.height, name).toBeGreaterThanOrEqual(44);
    }
  });

  test("the menu opens, navigates to a section and closes", async ({
    page,
  }) => {
    // Jump instead of smooth-scrolling, so the final position can be checked.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("./en/");
    // The button's label changes from "Menu" to "Close".
    const button = page.locator("header").getByRole("button");
    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");

    await page
      .getByRole("link", { name: "Contact", exact: true })
      .filter({ visible: true })
      .click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(button).toHaveAttribute("aria-expanded", "false");
    // The section heading lands below the sticky header, not under it.
    const header = await page.locator("header").boundingBox();
    const heading = page.getByRole("heading", { name: "Get in touch" });
    await expect(heading).toBeInViewport();
    expect((await heading.boundingBox())!.y).toBeGreaterThanOrEqual(
      header!.y + header!.height,
    );
  });
});

test.describe("on desktop", () => {
  test.skip(({ isMobile }) => isMobile, "desktop project only");

  test("the header nav is visible and the menu button is not", async ({
    page,
  }) => {
    await page.goto("./en/");
    await expect(
      page.getByRole("navigation", { name: "Main navigation" }).first(),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Menu" })).toBeHidden();
  });
});
