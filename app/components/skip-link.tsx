import { useT } from "~/lib/i18n/use-t";

/** First tab stop: jumps past the header to `#main`. */
export function SkipLink() {
  const t = useT();
  return (
    <a
      href="#main"
      className="fixed top-2 left-2 z-50 -translate-y-24 bg-brand px-4 py-3 text-nav font-semibold tracking-nav text-on-brand uppercase focus:translate-y-0"
    >
      {t.skipLink}
    </a>
  );
}
