import { useT } from "~/lib/i18n/use-t";
import { Container } from "../container";
import { LanguageSwitcher } from "../language-switcher";
import { Logo } from "../logo";

interface FooterDProps {
  firmName: string;
}

/** Variant D: a dark footer with the white logo. */
export function FooterD({ firmName }: FooterDProps) {
  const t = useT();
  return (
    <footer className="bg-ink pb-safe text-small text-on-brand-muted">
      <Container className="flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Logo title={firmName} className="w-18 text-on-brand" />
        <p>
          © {new Date().getFullYear()} {firmName}. {t.footer.rights}
        </p>
        <LanguageSwitcher onBrand className="-ml-3 sm:ml-0" />
      </Container>
    </footer>
  );
}
