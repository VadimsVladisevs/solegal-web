import { type RefObject, useEffect } from "react";

const pending = "reveal-pending";

/**
 * Fades `[data-reveal]` elements under `root` in as they scroll into view.
 * Only elements below the fold at mount are hidden first, so prerendered HTML
 * and no-JS visitors see the full page. Skipped with reduced motion.
 */
export function useReveal(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = root.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = [
      ...container.querySelectorAll<HTMLElement>("[data-reveal]"),
    ].filter((el) => el.getBoundingClientRect().top > window.innerHeight);
    for (const el of elements) el.classList.add(pending);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.remove(pending);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    for (const el of elements) observer.observe(el);
    return () => {
      observer.disconnect();
      for (const el of elements) el.classList.remove(pending);
    };
  }, [root]);
}
