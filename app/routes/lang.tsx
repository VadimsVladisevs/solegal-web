import { Outlet, data } from "react-router";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { SkipLink } from "~/components/skip-link";
import { content } from "~/lib/content";
import { isLocale } from "~/lib/i18n/config";
import { I18nContext } from "~/lib/i18n/use-t";
import { useVariant } from "~/lib/variant";
import type { Route } from "./+types/lang";

export async function loader({ params }: Route.LoaderArgs) {
  if (!isLocale(params.lang)) throw data(null, { status: 404 });
  const locale = params.lang;
  const [dictionary, siteSettings] = await Promise.all([
    content.getDictionary(locale),
    content.getSiteSettings(locale),
  ]);
  return { locale, dictionary, firmName: siteSettings.firmName };
}

// A minimal title for now; step 06 adds per-page titles and SEO tags.
export function meta({ loaderData }: Route.MetaArgs) {
  return [{ title: loaderData?.firmName }];
}

export default function LangLayout({ loaderData }: Route.ComponentProps) {
  const variant = useVariant();
  return (
    <I18nContext value={loaderData}>
      <SkipLink />
      <Header variant={variant} firmName={loaderData.firmName} />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Outlet />
      </main>
      <Footer firmName={loaderData.firmName} />
    </I18nContext>
  );
}
