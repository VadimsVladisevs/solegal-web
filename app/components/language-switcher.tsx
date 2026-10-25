import { Link, useLocation } from "react-router";
import { localeNames, localizedPath, locales } from "~/lib/i18n/config";
import { useLocale, useT } from "~/lib/i18n/use-t";

interface LanguageSwitcherProps {
  /** Set on `brand` / `brand-strong` backgrounds. */
  onBrand?: boolean;
  className?: string;
}

function linkColors(isCurrent: boolean, onBrand: boolean) {
  if (onBrand) {
    return `focus-visible:outline-on-brand ${isCurrent ? "font-semibold text-on-brand" : "font-medium text-on-brand-muted hover:text-on-brand"}`;
  }
  return isCurrent
    ? "font-semibold text-ink"
    : "font-medium text-muted hover:text-ink";
}

/** `EN · LV · RU`: the same page (and design variant) in each locale. */
export function LanguageSwitcher({
  onBrand = false,
  className = "",
}: LanguageSwitcherProps) {
  const t = useT();
  const current = useLocale();
  const { pathname } = useLocation();
  // Canonical URLs end with "/" (pages are prerendered as <path>/index.html).
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;

  return (
    <nav aria-label={t.languageSwitcher.label} className={className}>
      <ul className="flex items-center">
        {locales.map((locale, i) => (
          <li key={locale} className="flex items-center">
            {i > 0 && (
              <span
                aria-hidden="true"
                className={onBrand ? "text-on-brand-muted" : "text-muted"}
              >
                ·
              </span>
            )}
            <Link
              to={localizedPath(path, locale)}
              lang={locale}
              hrefLang={locale}
              title={localeNames[locale]}
              aria-current={locale === current ? "page" : undefined}
              className={`inline-flex min-h-11 min-w-11 items-center justify-center text-nav tracking-nav uppercase ${linkColors(locale === current, onBrand)}`}
            >
              {locale}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
