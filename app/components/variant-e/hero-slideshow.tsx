import { ArrowRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import type { SiteSettings } from "~/content/types";
import { type DemoImage, demoImageUrl } from "~/lib/demo-images";
import { useT } from "~/lib/i18n/use-t";
import { usePrefersReducedMotion } from "~/lib/use-reduced-motion";
import { Container } from "../container";

/** How long one slide stays, in ms. Matches `--animate-ring`. */
const slideMs = 7000;
/** The text fades out, changes, then fades back in. */
const textSwapMs = 450;

interface Slide {
  image: DemoImage;
  /** Translucent disc color behind the text. */
  disc: string;
  label: string;
  title: string;
  text: string;
  cta: string;
  href: string;
}

const discs = [
  "bg-brand-strong/85",
  "bg-brand/85",
  "bg-ink/80",
  "bg-brand-soft/85",
];
/** Photos and link targets of the dictionary slides (after the hero slide). */
const slideImages: DemoImage[] = ["riga", "stairs", "detail"];
const slideTargets = ["#about", "#services", "#team"];

/**
 * Variant E, after nossaman.com: full-screen photos with a slow zoom and
 * crossfade, behind a large disc that changes color with each slide. Dots
 * with a progress ring and a pause button; no autoplay with reduced motion.
 */
export function HeroSlideshow({
  siteSettings,
}: {
  siteSettings: SiteSettings;
}) {
  const t = useT();
  const e = t.variantE;
  const slides: Slide[] = [
    {
      image: "columns",
      disc: discs[0]!,
      label: siteSettings.heroLabel,
      title: siteSettings.heroTitle,
      text: siteSettings.heroLead,
      cta: siteSettings.heroCta,
      href: "#contact",
    },
    ...e.slides.map((slide, i) => ({
      ...slide,
      image: slideImages[i % slideImages.length]!,
      disc: discs[(i + 1) % discs.length]!,
      href: slideTargets[i % slideTargets.length]!,
    })),
  ];

  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);
  // Reduced motion: paused until the viewer presses play.
  const reducedMotion = usePrefersReducedMotion();
  const [userPaused, setPaused] = useState<boolean | null>(null);
  const paused = userPaused ?? reducedMotion;

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(
      () => setActive((i) => (i + 1) % slides.length),
      slideMs,
    );
    return () => window.clearTimeout(id);
  }, [active, paused, slides.length]);

  useEffect(() => {
    if (active === shown) return;
    const id = window.setTimeout(() => setShown(active), textSwapMs);
    return () => window.clearTimeout(id);
  }, [active, shown]);

  const slide = slides[shown]!;
  const swapping = active !== shown;
  const fade = `transition duration-500 ease-out ${swapping ? "translate-y-4 opacity-0" : ""}`;

  return (
    <section
      id="top"
      aria-roledescription="carousel"
      aria-label={e.carousel}
      className="relative h-svh max-h-[57.5rem] min-h-[35rem] overflow-hidden bg-ink text-on-brand"
    >
      {slides.map((s, i) => (
        <div
          key={s.image}
          aria-hidden="true"
          className={`absolute inset-0 transition-opacity duration-[1400ms] ${i === active ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={demoImageUrl(s.image)}
            alt=""
            fetchPriority={i === 0 ? "high" : "low"}
            className={`size-full object-cover ${i === active ? (i % 2 ? "motion-safe:animate-ken-burns-alt" : "motion-safe:animate-ken-burns") : ""} ${paused ? "[animation-play-state:paused]" : ""}`}
          />
        </div>
      ))}

      {/* Keeps the transparent header readable over bright photos. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-ink/85 to-ink/0"
      />
      <div
        aria-hidden="true"
        className={`hero-disc transition-colors duration-[1200ms] ${slides[active]!.disc}`}
      />

      {/* The page's H1 is the hero title; the slide titles are visual. */}
      <h1 className="sr-only">{siteSettings.heroTitle}</h1>

      <div className="absolute inset-x-0 bottom-28 lg:top-1/2 lg:bottom-auto lg:-translate-y-[38%]">
        <Container>
          <div
            aria-live={paused ? "polite" : "off"}
            className="flex max-w-[min(32rem,82vw)] flex-col gap-4 lg:max-w-[min(32rem,calc(44vw_-_max(2rem,(100vw_-_75rem)/2_+_2rem)))] lg:gap-5"
          >
            <p
              className={`text-label font-semibold tracking-label text-on-brand-muted uppercase ${fade}`}
            >
              {slide.label}
            </p>
            <p
              aria-hidden={shown === 0}
              className={`text-slide font-semibold text-balance delay-75 ${fade}`}
            >
              {slide.title}
            </p>
            <p
              className={`text-small text-on-brand delay-150 md:text-body ${fade}`}
            >
              {slide.text}
            </p>
            <a
              href={slide.href}
              className={`group inline-flex min-h-11 items-center gap-2.5 self-start rounded-full border-[1.5px] border-on-brand-muted px-5 text-label font-semibold tracking-nav uppercase delay-200 hover:bg-on-brand-muted hover:text-brand-strong focus-visible:outline-on-brand ${fade}`}
            >
              {slide.cta}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </Container>
      </div>

      <div className="absolute inset-x-0 bottom-5 md:bottom-10">
        <Container className="flex items-center gap-4">
          <div role="group" aria-label={e.chooseSlide} className="flex">
            {slides.map((s, i) => (
              <button
                key={s.image}
                type="button"
                aria-label={`${i + 1} / ${slides.length}: ${s.label}`}
                aria-current={i === active ? "true" : undefined}
                onClick={() => setActive(i)}
                className="relative size-11 focus-visible:outline-on-brand"
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-1/2 left-1/2 -m-1.25 size-2.5 rounded-full transition ${i === active ? "scale-125 bg-on-brand-muted" : "bg-on-brand/70"}`}
                />
                {i === active && (
                  <svg
                    key={active}
                    aria-hidden="true"
                    viewBox="0 0 26 26"
                    className="absolute top-1/2 left-1/2 -m-3.25 size-6.5 -rotate-90"
                  >
                    <circle
                      cx="13"
                      cy="13"
                      r="12"
                      className={`fill-none stroke-on-brand-muted [stroke-dasharray:76] [stroke-dashoffset:76] [stroke-width:1.5] ${paused ? "" : "motion-safe:animate-ring"}`}
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label={paused ? e.play : e.pause}
            onClick={() => setPaused(!paused)}
            className="grid size-11 place-items-center rounded-full border border-on-brand/50 focus-visible:outline-on-brand"
          >
            {paused ? (
              <Play
                aria-hidden="true"
                className="size-3.5"
                fill="currentColor"
              />
            ) : (
              <Pause
                aria-hidden="true"
                className="size-3.5"
                fill="currentColor"
              />
            )}
          </button>
        </Container>
      </div>
    </section>
  );
}
