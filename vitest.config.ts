import { defineConfig } from "vitest/config";

// Separate from vite.config.ts so the React Router plugin does not run under Vitest.
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["app/**/*.test.{ts,tsx}", "*.test.ts"],
  },
});
