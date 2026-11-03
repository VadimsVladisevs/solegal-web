import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useT } from "~/lib/i18n/use-t";
import { Container } from "../container";
import { LanguageSwitcher } from "../language-switcher";
import { Logo } from "../logo";
import { useScrolled } from "~/lib/use-scrolled";

interface HeaderDProps {
  firmName: string;
}

/**
 * Variant D: the logo on a white chevron plate between diagonal green bands,
 * over the hero photo; solid white once the page scrolls. A "Menu" button
 * opens a full-screen green menu at every width.
 */
export function HeaderD({ firmName }: HeaderDProps) {
  const t = useT();
  const solid = useScrolled();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const openRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const button = openRef.current;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      button?.focus();
    };
  }, [open]);

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#team", label: t.nav.team },
    { href: "#contact", label: t.nav.contact },
  ];
  const onPhoto = !solid;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b pt-safe transition-colors duration-300 ${solid ? "border-line bg-surface" : "border-transparent"}`}
    >
      {/* Diagonal bands either side of the plate (decoration). */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1600 50"
        preserveAspectRatio="none"
        className={`pointer-events-none absolute inset-x-0 top-0 h-12 w-full transition-opacity duration-300 ${solid ? "opacity-0" : ""}`}
      >
        <polygon points="0,0 560,0 520,50 0,50" className="fill-brand-strong" />
        <polygon
          points="1040,0 1600,0 1600,50 1080,50"
          className="fill-brand-strong"
        />
        <polygon points="0,0 380,0 300,50 0,50" className="fill-brand" />
        <polygon
          points="1220,0 1600,0 1600,50 1300,50"
          className="fill-brand"
        />
      </svg>

      <Container className="relative flex h-header items-center justify-between">
        <button
          ref={openRef}
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen(true)}
          className={`-ml-2 flex min-h-11 items-center gap-3 px-2 text-nav font-semibold tracking-nav uppercase ${onPhoto ? "text-on-brand focus-visible:outline-on-brand" : "text-ink"}`}
        >
          <Menu aria-hidden="true" className="size-6" strokeWidth={1.75} />
          <span className="max-sm:sr-only">{t.nav.menu}</span>
        </button>
        {/* On phones the plate covers the right side; the menu has the languages. */}
        <LanguageSwitcher onBrand={onPhoto} className="-mr-3 max-sm:hidden" />
      </Container>

      <a
        href="#top"
        className={`absolute top-0 left-1/2 flex w-[min(23.75rem,56vw)] -translate-x-1/2 justify-center pt-3 transition-[height] duration-300 ${solid ? "h-header" : "h-20 bg-surface [clip-path:polygon(0_0,100%_0,100%_52%,50%_100%,0_52%)] sm:h-24"}`}
      >
        <Logo
          title={firmName}
          className={`text-ink ${solid ? "w-16" : "w-16 sm:w-18"}`}
        />
      </a>

      <div
        id={menuId}
        hidden={!open}
        className="fixed inset-0 z-50 overflow-y-auto bg-brand-strong pt-safe pb-safe text-on-brand"
      >
        <Container className="flex min-h-header items-center justify-end">
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            className="-mr-2 flex min-h-11 items-center gap-2 px-2 text-nav font-semibold tracking-nav uppercase focus-visible:outline-on-brand"
          >
            <X aria-hidden="true" className="size-6" strokeWidth={1.75} />
            {t.nav.close}
          </button>
        </Container>
        <Container className="flex flex-col gap-10 py-8">
          <nav aria-label={t.nav.label}>
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="inline-flex min-h-11 py-2 font-serif text-display hover:text-on-brand-muted focus-visible:outline-on-brand"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <LanguageSwitcher onBrand className="-ml-3" />
        </Container>
      </div>
    </header>
  );
}
