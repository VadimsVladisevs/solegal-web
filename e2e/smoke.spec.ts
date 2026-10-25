import { expect, test } from "@playwright/test";

test("home page loads with all assets and no console errors", async ({
  page,
}) => {
  const consoleErrors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  const failedAssets: string[] = [];
  page.on("response", (response) => {
    const type = response.request().resourceType();
    if ((type === "script" || type === "stylesheet") && !response.ok()) {
      failedAssets.push(`${response.status()} ${response.url()}`);
    }
  });

  const response = await page.goto("./");
  expect(response?.ok()).toBe(true);
  // The served HTML must be the prerendered page, not the empty SPA fallback.
  expect(await response?.text()).toContain("<main>");
  await expect(page.getByRole("main")).toBeAttached();
  await page.waitForLoadState("networkidle");

  expect(failedAssets).toEqual([]);
  expect(consoleErrors).toEqual([]);
});
