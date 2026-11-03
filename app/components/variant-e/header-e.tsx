import { useScrolled } from "~/lib/use-scrolled";
import { useT } from "~/lib/i18n/use-t";
import { Container } from "../container";
import { LanguageSwitcher } from "../language-switcher";
import { Logo } from "../logo";
import { MobileMenu } from "../mobile-menu";
import { NavLinks } from "../nav-links";

interface HeaderEProps {
  firmName: string;
}

/** Variant E: transparent with light text over the slideshow, white once scrolled. */
export function HeaderE({ firmName }: HeaderEProps) {
  const t = useT();
  const solid = useScrolled();
  const onPhoto = !solid;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b pt-safe transition-colors duration-300 ${solid ? "border-line bg-surface text-ink" : "border-transparent text-on-brand"}`}
    >
      <Container className="flex h-header items-center justify-between gap-6">
        <a
          href="#top"
          className={`-ml-1 p-1 ${onPhoto ? "focus-visible:outline-on-brand" : ""}`}
        >
          <Logo title={firmName} className="w-18" />
        </a>
        <div className="hidden items-center gap-8 md:flex">
          <nav aria-label={t.nav.label}>
            <NavLinks layout="row" onBrand={onPhoto} />
          </nav>
          <LanguageSwitcher onBrand={onPhoto} />
        </div>
        <MobileMenu onBrand={onPhoto} />
      </Container>
    </header>
  );
}
