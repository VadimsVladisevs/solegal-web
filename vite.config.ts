import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { type Plugin, defineConfig } from "vite";
import { basePath } from "./base-path.ts";

function isFile(path: string) {
  return statSync(path, { throwIfNoEntry: false })?.isFile() ?? false;
}

/** `vite preview` only: like the static hosts, answer unknown URLs with 404.html. */
function previewNotFound(): Plugin {
  return {
    name: "preview-not-found",
    configurePreviewServer(server) {
      const outDir = resolve(server.config.root, server.config.build.outDir);
      server.middlewares.use((req, res, next) => {
        // Page loads only; the prerender build also runs on a preview server.
        if (!req.headers.accept?.includes("text/html")) return next();
        const url = decodeURIComponent(req.url?.split("?")[0] ?? "/");
        if (!url.startsWith(basePath)) return next();
        const path = join(outDir, url.slice(basePath.length));
        if (isFile(path) || isFile(join(path, "index.html"))) return next();
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end(readFileSync(join(outDir, "404.html")));
      });
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [tailwindcss(), reactRouter(), previewNotFound()],
  resolve: {
    tsconfigPaths: true,
  },
});
