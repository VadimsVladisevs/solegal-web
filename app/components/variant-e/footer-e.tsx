import { useT } from "~/lib/i18n/use-t";
import { Container } from "../container";
import { LanguageSwitcher } from "../language-switcher";
import { Logo } from "../logo";
import { NavLinks } from "../nav-links";

interface FooterEProps {
  firmName: string;
}

/** Variant E: a dark footer with the logo, section links and languages. */
export function FooterE({ firmName }: FooterEProps) {
  const t = useT();
  return (
    <footer className="bg-ink pb-safe text-small text-on-brand-muted">
      <Container className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-4">
          <Logo title={firmName} className="w-18 text-on-brand" />
          <p>
            © {new Date().getFullYear()} {firmName}. {t.footer.rights}
          </p>
        </div>
        <nav aria-label={t.nav.label}>
          <NavLinks layout="column" onBrand />
        </nav>
        <LanguageSwitcher onBrand className="-ml-3 self-start" />
      </Container>
    </footer>
  );
}
