import { PageD } from "~/components/variant-d/page-d";
import { withNoindex } from "~/lib/seo/meta";
import type { VariantHandle } from "~/lib/variant";
import type { Route } from "./+types/home-d";

// Design variant D (step 13): its own sections on the home page's data
// (removed in step 11).
export { loader, shouldRevalidate } from "./home";

export const handle: VariantHandle = { variant: "d" };

// A duplicate of the home page: the :lang tags (canonical = locale home) plus noindex.
export function meta({ matches }: Route.MetaArgs) {
  return withNoindex(matches.at(-2)?.meta ?? []);
}

export default function HomeD({ loaderData }: Route.ComponentProps) {
  return <PageD {...loaderData} />;
}
