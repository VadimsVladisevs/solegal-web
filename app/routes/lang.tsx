import { Outlet, data } from "react-router";
import { content } from "~/lib/content";
import { isLocale } from "~/lib/i18n/config";
import { I18nContext } from "~/lib/i18n/use-t";
import type { Route } from "./+types/lang";

export async function loader({ params }: Route.LoaderArgs) {
  if (!isLocale(params.lang)) throw data(null, { status: 404 });
  const locale = params.lang;
  return { locale, dictionary: await content.getDictionary(locale) };
}

export default function LangLayout({ loaderData }: Route.ComponentProps) {
  return (
    <I18nContext value={loaderData}>
      <Outlet />
    </I18nContext>
  );
}
