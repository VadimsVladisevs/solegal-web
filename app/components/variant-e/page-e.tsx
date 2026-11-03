import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type {
  ContactInfo,
  Service,
  SiteSettings,
  TeamMember,
} from "~/content/types";
import { demoImageUrl } from "~/lib/demo-images";
import { useT } from "~/lib/i18n/use-t";
import { Container } from "../container";
import { PlaceholderPhoto } from "../team-member-card";
import { HeroSlideshow } from "./hero-slideshow";
import { useReveal } from "./use-reveal";

interface PageEProps {
  siteSettings: SiteSettings;
  services: Service[];
  team: TeamMember[];
  contactInfo: ContactInfo;
}

/**
 * Variant E, after nossaman.com: the slideshow hero, then sections that fade
 * in on scroll, a parallax round photo, count-up numbers and service rows
 * that fill green on hover.
 */
export function PageE({
  siteSettings,
  services,
  team,
  contactInfo,
}: PageEProps) {
  const t = useT();
  const e = t.variantE;
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);

  return (
    <div ref={root}>
      <HeroSlideshow siteSettings={siteSettings} />

      <section id="about" className="overflow-x-clip py-18 md:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-18">
          <div data-reveal className="relative max-w-md lg:max-w-none">
            <span
              aria-hidden="true"
              className="absolute -right-[6%] -bottom-[4%] aspect-square w-[46%] rounded-full bg-brand"
            />
            <ParallaxCircle />
          </div>
          <div data-reveal className="flex flex-col gap-5">
            <Eyebrow>{siteSettings.aboutLabel}</Eyebrow>
            <h2 className="text-h2 font-semibold text-balance text-ink md:text-serif-h2">
              {siteSettings.aboutTitle}
            </h2>
            {siteSettings.aboutBody.map((paragraph) => (
              <p key={paragraph} className="text-lead">
                {paragraph}
              </p>
            ))}
            <dl className="mt-2 grid grid-cols-3 gap-4 border-t border-line pt-6">
              {e.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse gap-2">
                  <dt className="text-small text-muted">{stat.label}</dt>
                  <dd className="text-stat font-semibold text-brand tabular-nums">
                    <CountUp value={stat.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section id="services" className="bg-ink py-18 text-on-brand md:py-28">
        <Container>
          <div data-reveal>
            <Eyebrow onDark>{t.services.label}</Eyebrow>
            <h2 className="mt-4 text-h2 font-semibold md:text-serif-h2">
              {t.variants.practiceAreas}
            </h2>
          </div>
          <div className="mt-12 border-t border-on-brand-muted/25">
            {services.map((service) => (
              <article
                key={service.title}
                data-reveal
                className="group relative grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 overflow-hidden border-b border-on-brand-muted/25 py-7 md:grid-cols-[1fr_1.2fr_auto]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-bottom scale-y-0 bg-brand-strong transition-transform duration-500 group-hover:scale-y-100"
                />
                <h3 className="relative pl-2 text-row font-semibold transition-transform duration-500 group-hover:translate-x-3">
                  {service.title}
                </h3>
                <p className="relative col-start-1 row-start-2 pl-2 text-small text-on-brand-muted md:col-start-2 md:row-start-1 md:pl-0">
                  {service.description}
                </p>
                <span
                  aria-hidden="true"
                  className="relative row-span-2 grid size-12 place-items-center rounded-full border border-on-brand-muted/40 transition-colors group-hover:border-on-brand-muted group-hover:bg-on-brand-muted group-hover:text-brand-strong md:row-span-1"
                >
                  <ArrowRight className="size-4.5" />
                </span>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="team" className="py-18 md:py-28">
        <Container>
          <div data-reveal>
            <Eyebrow>{t.team.label}</Eyebrow>
            <h2 className="mt-4 text-h2 font-semibold text-balance text-ink md:text-serif-h2">
              {e.teamTitle}
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <article
                key={member.name}
                data-reveal
                style={{ transitionDelay: `${i * 120}ms` }}
                className="group"
              >
                <div className="relative flex aspect-4/5 max-w-85 items-end justify-center overflow-hidden bg-photo-bg transition-transform duration-500 group-hover:-translate-y-1.5 sm:max-w-none">
                  {member.photo ? (
                    <img
                      src={member.photo.src}
                      alt={member.photo.alt}
                      className="size-full object-cover"
                    />
                  ) : (
                    <PlaceholderPhoto />
                  )}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0 bg-brand transition-[height] duration-500 group-hover:h-1.5"
                  />
                </div>
                <h3 className="mt-5 text-h3 font-semibold text-ink">
                  {member.name}
                </h3>
                <p className="mt-1 text-label font-semibold tracking-label text-brand-soft uppercase">
                  {member.role}
                </p>
                <p className="mt-2 text-small text-muted">{member.bio}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section
        id="contact"
        className="relative overflow-hidden bg-brand-strong py-18 text-on-brand md:py-28"
      >
        <img
          src={demoImageUrl("riga")}
          alt=""
          loading="lazy"
          className="absolute inset-0 size-full object-cover opacity-30"
        />
        <span
          aria-hidden="true"
          className="absolute -top-50 -right-80 size-225 rounded-full bg-brand/85"
        />
        <Container className="relative grid items-center gap-12 lg:grid-cols-2">
          <div data-reveal>
            <Eyebrow onDark>{t.contact.label}</Eyebrow>
            <h2 className="mt-4 text-h2 font-semibold text-balance md:text-serif-h2">
              {e.contactTitle}
            </h2>
          </div>
          <dl data-reveal className="flex flex-col gap-6">
            <ContactItem label={t.contact.email}>
              <a href={`mailto:${contactInfo.email}`} className={contactLink}>
                {contactInfo.email}
              </a>
            </ContactItem>
            <ContactItem label={t.contact.phone}>
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className={contactLink}
              >
                {contactInfo.phone}
              </a>
            </ContactItem>
            <ContactItem label={t.variants.office}>
              <span className="text-lead">{t.variants.officeValue}</span>
            </ContactItem>
          </dl>
        </Container>
      </section>
    </div>
  );
}

const contactLink =
  "inline-flex min-h-11 items-center bg-linear-to-r from-on-brand-muted to-on-brand-muted bg-size-[0_2px] bg-bottom-left bg-no-repeat text-contact font-semibold break-all transition-[background-size] duration-500 hover:bg-size-[100%_2px] focus-visible:outline-on-brand";

function Eyebrow({
  children,
  onDark = false,
}: {
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <p
      className={`text-label font-semibold tracking-label uppercase ${onDark ? "text-on-brand-muted" : "text-brand-soft"}`}
    >
      {children}
    </p>
  );
}

function ContactItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-label font-semibold tracking-label text-on-brand-muted uppercase">
        {label}
      </dt>
      <dd className="mt-1">{children}</dd>
    </div>
  );
}

/** The round About photo; it zooms slightly as it scrolls through the screen. */
function ParallaxCircle() {
  const t = useT();
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = img.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    function update() {
      const box = el!.getBoundingClientRect();
      const progress = (box.top + box.height / 2) / window.innerHeight;
      const scale = 1.05 + Math.min(1, Math.max(0, progress)) * 0.2;
      el!.style.transform = `scale(${scale.toFixed(3)})`;
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="relative aspect-square overflow-hidden rounded-full">
      <img
        ref={img}
        src={demoImageUrl("books")}
        alt={t.images.books}
        loading="lazy"
        className="size-full object-cover"
      />
    </div>
  );
}

/** Counts from 0 to `value` once it scrolls into view. Renders the value without JS. */
function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setShown(0);
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / 1200);
        setShown(Math.round(value * (1 - (1 - p) ** 3)));
        if (p < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return <span ref={ref}>{shown}</span>;
}
