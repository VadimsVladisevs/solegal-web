import { content } from "~/lib/content";
import { isLocale } from "~/lib/i18n/config";
import type { Route } from "./+types/home";

export async function loader({ params }: Route.LoaderArgs) {
  // The :lang layout already rejects unknown locales; this narrows the type.
  if (!isLocale(params.lang)) throw new Error(`Unknown locale ${params.lang}`);
  return { siteSettings: await content.getSiteSettings(params.lang) };
}

// Placeholder until the real page arrives (steps 04–05).
export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <main>
      <h1>{loaderData.siteSettings.heroTitle}</h1>
    </main>
  );
}
