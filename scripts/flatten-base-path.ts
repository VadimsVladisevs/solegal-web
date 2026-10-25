// React Router writes prerendered pages under the basename (build/client/solegal-web/…),
// while Vite emits assets at build/client/assets. The host serves build/client at
// BASE_PATH, so move the prerendered pages up to the build root.
import { existsSync, readdirSync, renameSync, rmdirSync } from "node:fs";
import { join } from "node:path";
import { basePath } from "../base-path.ts";

const clientDir = "build/client";
const nestedDir = join(clientDir, basePath);

if (basePath !== "/" && existsSync(nestedDir)) {
  // Without a prerendered root, React Router writes its SPA fallback as index.html.
  const rootIndex = join(clientDir, "index.html");
  if (existsSync(rootIndex)) {
    renameSync(rootIndex, join(clientDir, "__spa-fallback.html"));
  }
  for (const entry of readdirSync(nestedDir)) {
    renameSync(join(nestedDir, entry), join(clientDir, entry));
  }
  rmdirSync(nestedDir);
}
