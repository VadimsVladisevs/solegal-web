import type { SiteSettings } from "~/content/types";
import type { Variant } from "~/lib/variant";
import { ButtonLink } from "./button";
import { Heading } from "./heading";
import { Label } from "./label";
import { Logo } from "./logo";
import { Rule } from "./rule";
import { Section } from "./section";

interface HeroSectionProps {
  variant: Variant;
  siteSettings: SiteSettings;
}

/** Label, H1, lead and "Contact us"; the first section of the page. */
export function HeroSection({ variant, siteSettings }: HeroSectionProps) {
  if (variant === "c") {
    // Split: text on `surface-alt`, a `brand` logo panel on the right
    // (stacked on top on small screens).
    return (
      <section
        id="top"
        className="bg-surface-alt lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:pl-page-edge"
      >
        <div
          aria-hidden="true"
          className="flex items-center justify-center bg-brand px-6 py-10 text-on-brand lg:order-last lg:py-12"
        >
          <Logo title={siteSettings.firmName} className="w-30 lg:w-55" />
        </div>
        <div className="px-gutter py-16 md:py-24 lg:px-0 lg:pr-12">
          <HeroText siteSettings={siteSettings} />
        </div>
      </section>
    );
  }

  const onBrand = variant === "b";
  return (
    <Section
      id="top"
      tone={onBrand ? "brand" : "surface"}
      className={onBrand ? "relative overflow-hidden" : "border-b border-line"}
    >
      {onBrand && (
        // Generated content: decoration, not text (contrast checks skip it).
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -bottom-12 text-watermark font-bold text-on-brand/7 select-none after:content-['SO'] md:-bottom-20"
        />
      )}
      <HeroText siteSettings={siteSettings} onBrand={onBrand} />
    </Section>
  );
}

interface HeroTextProps {
  siteSettings: SiteSettings;
  onBrand?: boolean;
}

function HeroText({ siteSettings, onBrand = false }: HeroTextProps) {
  return (
    <div className="relative flex max-w-prose flex-col gap-6">
      <Label onBrand={onBrand}>{siteSettings.heroLabel}</Label>
      <Heading level={1} onBrand={onBrand}>
        {siteSettings.heroTitle}
      </Heading>
      <Rule onBrand={onBrand} />
      <p className={`text-lead ${onBrand ? "text-on-brand" : "text-muted"}`}>
        {siteSettings.heroLead}
      </p>
      <div>
        <ButtonLink href="#contact" onBrand={onBrand}>
          {siteSettings.heroCta}
        </ButtonLink>
      </div>
    </div>
  );
}
