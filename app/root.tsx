import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useParams,
} from "react-router";
import { defaultLocale, isLocale } from "~/lib/i18n/config";

import "@fontsource-variable/montserrat";
import "./styles/app.css";

export function Layout({ children }: { children: React.ReactNode }) {
  const { lang } = useParams();
  return (
    <html lang={isLocale(lang) ? lang : defaultLocale}>
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
