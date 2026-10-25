import { defineConfig, devices } from "@playwright/test";
import { basePath } from "./base-path.ts";

const port = 4173;

export default defineConfig({
  testDir: "./e2e",
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${port}${basePath}`,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  // Smoke tests run against the built static site, never the dev server.
  webServer: {
    command: `npm run build && npm run preview -- --port ${port} --strictPort`,
    url: `http://localhost:${port}${basePath}`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
