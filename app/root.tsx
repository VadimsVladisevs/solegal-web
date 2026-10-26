import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLocation,
  useRouteLoaderData,
} from "react-router";
import { useSyncExternalStore } from "react";
import { NotFoundPage } from "~/components/not-found-page";
import { content } from "~/lib/content";
import { defaultLocale, localeFromPath, locales } from "~/lib/i18n/config";
import type { Route } from "./+types/root";

import "@fontsource-variable/montserrat";
import "./styles/app.css";

// Runs at build time. 404.html serves every unknown URL and picks its locale
// in the browser, so it carries the strings of every locale.
export async function loader() {
  const entries = await Promise.all(
    locales.map(async (locale) => {
      const [dictionary, siteSettings] = await Promise.all([
        content.getDictionary(locale),
        content.getSiteSettings(locale),
      ]);
      return [locale, { dictionary, firmName: siteSettings.firmName }] as const;
    }),
  );
  return { notFound: Object.fromEntries(entries) };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  return (
    <html lang={localeFromPath(pathname)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

/** Unknown URLs (and unknown locales) show the 404 page in the URL's locale. */
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  // A static site has no other expected errors; anything else is a bug.
  if (!(isRouteErrorResponse(error) && error.status === 404)) {
    console.error(error);
  }
  return <NotFound />;
}

/** The body of 404.html (the SPA fallback), shown before JS runs. */
export function HydrateFallback() {
  return <NotFound />;
}

const subscribe = () => () => {};

function NotFound() {
  const { pathname } = useLocation();
  const data = useRouteLoaderData<typeof loader>("root");
  // 404.html is prerendered in English. Hydrate it unchanged, then switch to
  // the URL's locale.
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const locale = hydrated ? localeFromPath(pathname) : defaultLocale;
  const strings = data?.notFound[locale];
  if (!strings) return null;
  return <NotFoundPage locale={locale} {...strings} />;
}
