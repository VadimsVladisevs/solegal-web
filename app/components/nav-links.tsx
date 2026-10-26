import { useT } from "~/lib/i18n/use-t";

interface NavLinksProps {
  /** `row` in the desktop header, `column` in the mobile menu. */
  layout: "row" | "column";
  /** Set on `brand` / `brand-strong` backgrounds. */
  onBrand?: boolean;
  /** Called after a link is followed, e.g. to close the mobile menu. */
  onNavigate?: () => void;
  /** Prefix for the anchors; see `Header`. */
  homeHref?: string;
}

/** Anchor links to the page sections. */
export function NavLinks({
  layout,
  onBrand = false,
  onNavigate,
  homeHref = "",
}: NavLinksProps) {
  const t = useT();
  const links = [
    { href: `${homeHref}#about`, label: t.nav.about },
    { href: `${homeHref}#team`, label: t.nav.team },
    { href: `${homeHref}#contact`, label: t.nav.contact },
  ];
  const colors = onBrand
    ? "text-on-brand hover:text-on-brand-muted focus-visible:outline-on-brand"
    : "text-ink hover:text-brand";

  return (
    <ul
      className={layout === "row" ? "flex items-center gap-6" : "flex flex-col"}
    >
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            onClick={onNavigate}
            className={`flex min-h-11 items-center text-nav font-medium tracking-nav uppercase ${colors} ${layout === "column" ? "py-2" : ""}`}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
