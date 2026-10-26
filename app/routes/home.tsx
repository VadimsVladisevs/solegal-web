import { AboutSection } from "~/components/about-section";
import { ContactSection } from "~/components/contact-section";
import { HeroSection } from "~/components/hero-section";
import { TeamSection } from "~/components/team-section";
import { content } from "~/lib/content";
import { isLocale } from "~/lib/i18n/config";
import { type VariantHandle, useVariant } from "~/lib/variant";
import type { Route } from "./+types/home";

export async function loader({ params }: Route.LoaderArgs) {
  // The :lang layout already rejects unknown locales; this narrows the type.
  if (!isLocale(params.lang)) throw new Error(`Unknown locale ${params.lang}`);
  const [siteSettings, team, contactInfo] = await Promise.all([
    content.getSiteSettings(params.lang),
    content.getTeam(params.lang),
    content.getContactInfo(params.lang),
  ]);
  return { siteSettings, team, contactInfo };
}

export const handle: VariantHandle = { variant: "a" };

/** The one-page site: Hero → About → Team → Contact. */
export default function Home({ loaderData }: Route.ComponentProps) {
  const { siteSettings, team, contactInfo } = loaderData;
  const variant = useVariant();

  return (
    <>
      <HeroSection variant={variant} siteSettings={siteSettings} />
      <AboutSection siteSettings={siteSettings} />
      <TeamSection variant={variant} team={team} />
      <ContactSection variant={variant} contactInfo={contactInfo} />
    </>
  );
}
