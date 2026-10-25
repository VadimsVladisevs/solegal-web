import { render } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { localDictionaries } from "~/lib/content/local-source";
import { type Locale, isLocale } from "~/lib/i18n/config";
import { I18nContext } from "~/lib/i18n/use-t";

/** Renders `ui` at `path` with that path's locale, like the `:lang` layout. */
export function renderAt(path: string, ui: React.ReactNode) {
  const lang = path.split("/")[1];
  const locale: Locale = isLocale(lang) ? lang : "en";
  const Stub = createRoutesStub([
    {
      path: "*",
      Component: () => (
        <I18nContext value={{ locale, dictionary: localDictionaries[locale] }}>
          {ui}
        </I18nContext>
      ),
    },
  ]);
  return render(<Stub initialEntries={[path]} />);
}
