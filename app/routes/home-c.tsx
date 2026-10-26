import { withNoindex } from "~/lib/seo/meta";
import type { VariantHandle } from "~/lib/variant";
import type { Route } from "./+types/home-c";

// Design variant C: the home page with another treatment (removed in step 11).
export { default, loader, shouldRevalidate } from "./home";

export const handle: VariantHandle = { variant: "c" };

// A duplicate of the home page: the :lang tags (canonical = locale home) plus noindex.
export function meta({ matches }: Route.MetaArgs) {
  return withNoindex(matches.at(-2)?.meta ?? []);
}
