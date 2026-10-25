import { useT } from "~/lib/i18n/use-t";
import { Container } from "./container";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";

interface FooterProps {
  firmName: string;
}

/** The same in every design variant. */
export function Footer({ firmName }: FooterProps) {
  const t = useT();
  return (
    <footer className="border-t border-line bg-surface pb-safe text-small text-muted">
      <Container className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <Logo title={firmName} className="w-16 text-ink" />
        <p>
          © {new Date().getFullYear()} {firmName}. {t.footer.rights}
        </p>
        <LanguageSwitcher className="-ml-3 sm:ml-0" />
      </Container>
    </footer>
  );
}
