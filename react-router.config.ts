import type { Config } from "@react-router/dev/config";
import { basePath } from "./base-path.ts";

export default {
  // Static site: no server at runtime, every route is prerendered at build time.
  ssr: false,
  prerender: ["/"],
  basename: basePath,
} satisfies Config;
