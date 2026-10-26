import type { Variant } from "~/lib/variant";
import { useT } from "~/lib/i18n/use-t";
import { Container } from "./container";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";

const variantClasses: Record<Variant, string> = {
  a: "border-b border-line bg-surface text-ink",
  b: "bg-brand text-on-brand",
  c: "bg-surface text-ink",
};

interface HeaderProps {
  variant: Variant;
  firmName: string;
  /** Prefix for the section anchors when not on the home page, e.g. on the 404. */
  homeHref?: string;
}

/** Sticky header: logo, section nav and language switcher; a menu on mobile. */
export function Header({ variant, firmName, homeHref = "" }: HeaderProps) {
  const t = useT();
  const onBrand = variant === "b";

  return (
    <header className={`sticky top-0 z-40 pt-safe ${variantClasses[variant]}`}>
      <Container className="flex h-header items-center justify-between gap-6">
        <a
          href={`${homeHref}#top`}
          className={`-ml-1 p-1 ${onBrand ? "focus-visible:outline-on-brand" : ""}`}
        >
          <Logo title={firmName} className="w-18" />
        </a>
        <div className="hidden items-center gap-8 md:flex">
          <nav aria-label={t.nav.label}>
            <NavLinks layout="row" onBrand={onBrand} homeHref={homeHref} />
          </nav>
          <LanguageSwitcher onBrand={onBrand} />
        </div>
        <MobileMenu onBrand={onBrand} homeHref={homeHref} />
      </Container>
    </header>
  );
}
