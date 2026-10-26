import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useT } from "~/lib/i18n/use-t";
import { Container } from "./container";
import { LanguageSwitcher } from "./language-switcher";
import { NavLinks } from "./nav-links";

/** Wider than this, the header shows the full nav. Mirrors `--breakpoint-md`. */
export const desktopQuery = "(width >= 721px)";

interface MobileMenuProps {
  /** Set when the header is `brand` (variant B). */
  onBrand?: boolean;
  /** Prefix for the section anchors; see `Header`. */
  homeHref?: string;
}

/**
 * The "Menu" button and its dropdown panel under the sticky header. Must sit
 * inside the header: the panel and backdrop are positioned against it.
 */
export function MobileMenu({
  onBrand = false,
  homeHref = "",
}: MobileMenuProps) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    }
    const desktop = window.matchMedia(desktopQuery);
    function onBreakpoint() {
      if (desktop.matches) setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  const close = () => setOpen(false);
  const Icon = open ? X : Menu;

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
        className={`-mr-2 flex min-h-11 items-center gap-2 px-2 text-nav font-medium tracking-nav uppercase ${onBrand ? "text-on-brand focus-visible:outline-on-brand" : "text-ink"}`}
      >
        <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
        {open ? t.nav.close : t.nav.menu}
      </button>

      {open && (
        <div
          aria-hidden="true"
          onClick={close}
          className="absolute inset-x-0 top-full h-dvh bg-ink/40"
        />
      )}
      <div
        id={panelId}
        hidden={!open}
        className={`absolute inset-x-0 top-full border-t pb-safe ${onBrand ? "border-on-brand-muted bg-brand" : "border-line bg-surface"}`}
      >
        <Container className="flex flex-col gap-4 py-4">
          <nav aria-label={t.nav.label}>
            <NavLinks
              layout="column"
              onBrand={onBrand}
              homeHref={homeHref}
              onNavigate={close}
            />
          </nav>
          <LanguageSwitcher onBrand={onBrand} className="-ml-3" />
        </Container>
      </div>
    </div>
  );
}
