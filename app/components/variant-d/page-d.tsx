import {
  Award,
  Building2,
  FileText,
  Home,
  Languages,
  type LucideIcon,
  Mail,
  MapPin,
  Phone,
  Receipt,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
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

const serviceIcons: LucideIcon[] = [
  Building2,
  FileText,
  Scale,
  Users,
  Home,
  ShieldCheck,
];
const whyIcons: LucideIcon[] = [Award, Languages, Receipt, MapPin];

interface PageDProps {
  siteSettings: SiteSettings;
  services: Service[];
  team: TeamMember[];
  contactInfo: ContactInfo;
}

/**
 * Variant D, after rutan.com: a photo hero with a centered serif tagline,
 * bordered service cards with icons, a green "why us" band, team and contact.
 */
export function PageD({
  siteSettings,
  services,
  team,
  contactInfo,
}: PageDProps) {
  const t = useT();
  const d = t.variantD;

  return (
    <>
      <section
        id="top"
        className="relative grid min-h-[min(100svh,54rem)] place-items-center overflow-hidden bg-brand-strong text-center text-on-brand"
      >
        <img
          src={demoImageUrl("riga")}
          alt={t.images.riga}
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover motion-safe:animate-slow-zoom"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-ink/50 via-brand-strong/60 to-ink/65"
        />
        <Container className="relative flex flex-col items-center gap-6 pt-36 pb-32">
          <h1 className="font-serif text-display font-normal text-balance text-on-brand">
            {d.heroTitle}
          </h1>
          <p className="text-small font-medium tracking-wide uppercase">
            {d.heroPlaces}
          </p>
          <div className="mt-6 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <a
              href="#contact"
              className="inline-flex min-h-12 w-full max-w-80 items-center justify-center bg-on-brand-muted px-7 text-label font-semibold tracking-nav text-brand-strong uppercase transition-colors hover:bg-on-brand sm:w-auto focus-visible:outline-on-brand"
            >
              {siteSettings.heroCta}
            </a>
            <a
              href="#team"
              className="inline-flex min-h-12 w-full max-w-80 items-center justify-center bg-brand px-7 text-label font-semibold tracking-nav text-on-brand uppercase transition-colors hover:bg-brand-soft sm:w-auto focus-visible:outline-on-brand"
            >
              {d.heroTeam}
            </a>
            <a
              href="#about"
              className="inline-flex min-h-12 w-full max-w-80 items-center justify-center border border-on-brand-muted px-7 text-label font-semibold tracking-nav text-on-brand uppercase transition-colors hover:bg-on-brand/10 sm:w-auto focus-visible:outline-on-brand"
            >
              {d.heroMore}
            </a>
          </div>
        </Container>
        <a
          href="#about"
          aria-label={d.scrollCue}
          className="absolute bottom-6 left-1/2 flex min-h-11 min-w-11 -translate-x-1/2 flex-col items-center gap-2 focus-visible:outline-on-brand"
        >
          <span
            aria-hidden="true"
            className="h-10 w-px bg-linear-to-b from-on-brand/0 to-on-brand"
          />
          <span
            aria-hidden="true"
            className="relative h-7 w-4.5 rounded-full border-[1.5px] border-on-brand"
          >
            <span className="absolute top-1.5 left-1/2 -ml-px h-1.5 w-0.5 rounded-full bg-on-brand motion-safe:animate-wheel" />
          </span>
        </a>
      </section>

      <section id="about" className="py-16 md:py-24">
        <Container>
          <Title
            label={siteSettings.aboutLabel}
            title={siteSettings.aboutTitle}
          />
          <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-4 text-center text-lead text-muted">
            {siteSettings.aboutBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <section id="services" className="pb-16 md:pb-24">
        <Container>
          <Title label={t.services.label} title={t.variants.practiceAreas} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = serviceIcons[i % serviceIcons.length]!;
              return (
                <article
                  key={service.title}
                  className="group flex flex-col items-center gap-4 border border-brand bg-surface px-8 py-9 text-center transition duration-300 hover:-translate-y-1 hover:bg-brand-strong"
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.25}
                    className="size-11 text-brand-soft transition-colors group-hover:text-on-brand-muted"
                  />
                  <h3 className="text-small font-semibold tracking-nav text-brand uppercase transition-colors group-hover:text-on-brand-muted">
                    {service.title}
                  </h3>
                  <p className="text-small text-muted transition-colors group-hover:text-on-brand">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-brand-strong py-16 text-on-brand md:py-24">
        <span
          aria-hidden="true"
          className="absolute -bottom-16 -left-16 size-64 rotate-45 bg-brand"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-10 left-30 size-16 rotate-45 bg-brand-soft"
        />
        <span
          aria-hidden="true"
          className="absolute -top-24 -right-24 size-56 rotate-45 border border-on-brand-muted/40"
        />
        <Container className="relative">
          <Title label={siteSettings.firmName} title={d.whyTitle} onBrand />
          <div className="mt-12 grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
            {d.why.map((item, i) => {
              const Icon = whyIcons[i % whyIcons.length]!;
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center gap-3"
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.25}
                    className="size-11 text-on-brand-muted"
                  />
                  <h3 className="text-label font-semibold tracking-label uppercase">
                    {item.title}
                  </h3>
                  <p className="text-small text-on-brand">{item.text}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <div className="h-56 overflow-hidden md:h-90">
        <img
          src={demoImageUrl("columns")}
          alt={t.images.columns}
          loading="lazy"
          className="size-full object-cover"
        />
      </div>

      <section id="team" className="py-16 md:py-24">
        <Container>
          <Title label={t.team.label} title={d.teamTitle} />
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <article key={member.name} className="text-center">
                <div className="mx-auto flex aspect-4/5 max-w-80 items-end justify-center overflow-hidden border-b-3 border-brand bg-photo-bg sm:max-w-none">
                  {member.photo ? (
                    <img
                      src={member.photo.src}
                      alt={member.photo.alt}
                      className="size-full object-cover"
                    />
                  ) : (
                    <PlaceholderPhoto />
                  )}
                </div>
                <h3 className="mt-5 font-serif text-h2 font-medium text-ink">
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

      <section id="contact" className="bg-tint py-16 md:py-24">
        <Container>
          <Title label={t.contact.label} title={t.contact.title} />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            <ContactCard icon={Mail} label={t.contact.email}>
              <a href={`mailto:${contactInfo.email}`} className={contactValue}>
                {contactInfo.email}
              </a>
            </ContactCard>
            <ContactCard icon={Phone} label={t.contact.phone}>
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className={contactValue}
              >
                {contactInfo.phone}
              </a>
            </ContactCard>
            <ContactCard icon={MapPin} label={t.variants.office}>
              <p className="text-h3 font-medium text-ink">
                {t.variants.officeValue}
              </p>
            </ContactCard>
          </div>
        </Container>
      </section>
    </>
  );
}

const contactValue =
  "inline-flex min-h-11 items-center text-h3 font-medium break-all text-ink hover:text-brand";

interface TitleProps {
  label: string;
  title: string;
  onBrand?: boolean;
}

/** Centered label, serif H2 and a short vertical rule. */
function Title({ label, title, onBrand = false }: TitleProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <p
        className={`text-label font-semibold tracking-label uppercase ${onBrand ? "text-on-brand-muted" : "text-brand-soft"}`}
      >
        {label}
      </p>
      <h2
        className={`font-serif text-serif-h2 font-normal text-balance ${onBrand ? "text-on-brand" : "text-ink"}`}
      >
        {title}
      </h2>
      <span
        aria-hidden="true"
        className={`mt-2 h-10 w-px ${onBrand ? "bg-on-brand-muted" : "bg-brand"}`}
      />
    </div>
  );
}

interface ContactCardProps {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}

function ContactCard({ icon: Icon, label, children }: ContactCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 border-t-3 border-brand bg-surface px-6 py-8 text-center">
      <Icon
        aria-hidden="true"
        strokeWidth={1.25}
        className="size-9 text-brand-soft"
      />
      <p className="text-label font-semibold tracking-label text-brand-soft uppercase">
        {label}
      </p>
      {children}
    </div>
  );
}
