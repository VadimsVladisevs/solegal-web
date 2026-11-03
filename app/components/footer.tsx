import { useT } from "~/lib/i18n/use-t";
import type { Variant } from "~/lib/variant";
import { FooterD } from "./variant-d/footer-d";
import { FooterE } from "./variant-e/footer-e";
import { Container } from "./container";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";

interface FooterProps {
  firmName: string;
  /** D and E have their own footers; A–C share this one. */
  variant?: Variant;
}

export function Footer({ firmName, variant = "a" }: FooterProps) {
  if (variant === "d") return <FooterD firmName={firmName} />;
  if (variant === "e") return <FooterE firmName={firmName} />;
  return <SharedFooter firmName={firmName} />;
}

function SharedFooter({ firmName }: { firmName: string }) {
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
