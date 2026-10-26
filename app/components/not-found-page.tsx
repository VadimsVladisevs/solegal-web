import { useEffect } from "react";
import { useHref } from "react-router";
import type { Locale } from "~/lib/i18n/config";
import type { Dictionary } from "~/lib/i18n/dictionaries/en";
import { I18nContext } from "~/lib/i18n/use-t";
import { ButtonLink } from "./button";
import { Footer } from "./footer";
import { Header } from "./header";
import { Heading } from "./heading";
import { Label } from "./label";
import { Rule } from "./rule";
import { Section } from "./section";
import { SkipLink } from "./skip-link";

interface NotFoundPageProps {
  locale: Locale;
  dictionary: Dictionary;
  firmName: string;
}

/** The "quiet" 404 page, in the header and footer of variant A. */
export function NotFoundPage({
  locale,
  dictionary,
  firmName,
}: NotFoundPageProps) {
  const t = dictionary.notFound;
  const home = useHref(`/${locale}/`);

  // 404.html is prerendered in English and picks its locale in the browser,
  // where React doesn't patch the <html lang> it hydrates.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <I18nContext value={{ locale, dictionary }}>
      <title>{`${t.title} · ${firmName}`}</title>
      <SkipLink />
      <Header variant="a" firmName={firmName} homeHref={home} />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Section>
          <div className="flex max-w-prose flex-col gap-6">
            <Label>{t.label}</Label>
            <Heading level={1}>{t.title}</Heading>
            <Rule />
            <p className="text-lead text-muted">{t.text}</p>
            <div>
              <ButtonLink href={home}>{t.home}</ButtonLink>
            </div>
          </div>
        </Section>
      </main>
      <Footer firmName={firmName} />
    </I18nContext>
  );
}
