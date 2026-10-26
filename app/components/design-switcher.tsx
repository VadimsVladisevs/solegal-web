import { Link } from "react-router";
import { useLocale, useT } from "~/lib/i18n/use-t";
import { type Variant, useVariant } from "~/lib/variant";

// Variant A is the home page; B and C are sub-pages (removed in step 11).
const variants: { variant: Variant; path: string }[] = [
  { variant: "a", path: "" },
  { variant: "b", path: "b/" },
  { variant: "c", path: "c/" },
];

/** Floating "Design A · B · C" links between the variants for the customer. */
export function DesignSwitcher() {
  const t = useT();
  const locale = useLocale();
  const current = useVariant();

  return (
    <>
      {/* Keeps the end of the page (the footer) clear of the floating pill. */}
      <div aria-hidden="true" className="h-20" />
      <nav
        aria-label={t.designSwitcher.label}
        className="fixed z-30 flex items-center gap-0.5 border border-line bg-surface py-1 pr-1 pl-3.5 corner-safe"
      >
        <span
          aria-hidden="true"
          className="mr-1.5 text-label font-semibold tracking-label text-muted uppercase"
        >
          {t.designSwitcher.label}
        </span>
        {variants.map(({ variant, path }) => {
          const isCurrent = variant === current;
          return (
            <Link
              key={variant}
              to={`/${locale}/${path}`}
              aria-current={isCurrent ? "page" : undefined}
              className={`flex size-11 items-center justify-center text-nav font-semibold ${isCurrent ? "bg-brand text-on-brand" : "text-ink hover:text-brand"}`}
            >
              {variant.toUpperCase()}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
